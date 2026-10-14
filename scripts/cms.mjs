// Small Contentful Management API client to inspect and edit resumes.
// Usage: npm run cms -- <command> [args] [--env <environment>]   (see `npm run cms -- help`)
// Every write leaves entries as drafts; nothing reaches the site until `publish`.
import { readFileSync } from 'node:fs'

const LOCALE = 'en-US'
const BLOCK_FIELDS = ['personalData', 'qualifications', 'projects']
const LIST_FIELDS = ['qualifications', 'projects', 'replacements']
const DISPLAY_FIELDS = { resume: 'title', personalData: 'name', qualifications: 'name', project: 'entryTitle', company: 'companyName' }

const HELP = `Usage: npm run cms -- <command> [args] [--env <environment>]  (default env: master)

Read
  list                                    Resumes with slug, status and base
  show <slug>                             Resolved resume: every block, where it comes from, its status
  entry <entryId>                         Fields of any entry as JSON (rich text included)

Write (entries stay as drafts until published)
  create-resume <slug> --title <title> [--based-on <slug>]
  variant <slug> <entryId> [--set field=value]...
                                          Duplicate a block, point its "replaces" at the original
                                          and add it to the resume replacements
  set <entryId> <field> <value>           Set a text, number, boolean or date field
  set <entryId> <field> --file <path>     Rich text from a .json document or a .txt/.md file
                                          (blank line = paragraph, "- " = bullet, **bold**)
  add <slug> <qualifications|projects|replacements> <entryId>
  remove <slug> <qualifications|projects|replacements> <entryId>
                                          An inherited list is copied from the base first

Publish
  publish <entryId>...                    Publish entries (variants before the resume that uses them)
`

// --- CLI arguments ---------------------------------------------------------

const positional = []
const flags = {}
const sets = []
for (let args = process.argv.slice(2); args.length > 0;) {
  const arg = args.shift()
  if (arg === '--set') sets.push(args.shift())
  else if (arg.startsWith('--')) flags[arg.slice(2)] = args.shift()
  else positional.push(arg)
}
const [command, ...params] = positional
const environment = flags.env ?? 'master'

// --- API -------------------------------------------------------------------

const { VITE_CONTENTFUL_SPACE_ID: spaceId, CMA_CONTENTFUL_TOKEN: token } = process.env
const baseUrl = `https://api.contentful.com/spaces/${spaceId}/environments/${environment}`

async function api(method, path, { body, headers } = {}) {
  const response = await fetch(baseUrl + path, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/vnd.contentful.management.v1+json',
      ...headers,
    },
    body: body && JSON.stringify(body),
  })
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    const details = error.details?.errors ? ` ${JSON.stringify(error.details.errors)}` : ''
    throw new Error(`${method} ${path} → ${response.status} ${error.message ?? response.statusText}${details}`)
  }
  return response.status === 204 ? null : response.json()
}

const getEntry = (id) => api('GET', `/entries/${id}`)

async function getEntries(ids) {
  if (ids.length === 0) return new Map()
  const { items } = await api('GET', `/entries?sys.id[in]=${[...new Set(ids)].join(',')}&limit=1000`)
  return new Map(items.map((entry) => [entry.sys.id, entry]))
}

async function getResume(slug) {
  const { items } = await api('GET', `/entries?content_type=resume&fields.slug=${encodeURIComponent(slug)}`)
  if (items.length === 0) throw new Error(`No resume with slug "${slug}" in ${environment}`)
  return items[0]
}

async function updateEntry(entry) {
  return api('PUT', `/entries/${entry.sys.id}`, {
    body: { fields: entry.fields },
    headers: { 'X-Contentful-Version': entry.sys.version },
  })
}

// --- Entry helpers ---------------------------------------------------------

const link = (id) => ({ sys: { type: 'Link', linkType: 'Entry', id } })
const field = (entry, name) => entry.fields[name]?.[LOCALE]
const setField = (entry, name, value) => { entry.fields[name] = { [LOCALE]: value } }
const linkIds = (entry, name) => (field(entry, name) ?? []).map((item) => item.sys.id)
const contentType = (entry) => entry.sys.contentType.sys.id
const label = (entry) => field(entry, DISPLAY_FIELDS[contentType(entry)]) ?? field(entry, 'projectName') ?? '(untitled)'

function status(entry) {
  const { version, publishedVersion, archivedVersion } = entry.sys
  if (archivedVersion) return 'archived'
  if (!publishedVersion) return 'draft'
  return version > publishedVersion + 1 ? 'changed' : 'published'
}

// --- Rich text -------------------------------------------------------------

function inlineNodes(text) {
  return text.split(/(\*\*[^*]+\*\*)/).filter(Boolean).map((part) => {
    const bold = part.startsWith('**') && part.endsWith('**')
    return { nodeType: 'text', value: bold ? part.slice(2, -2) : part, marks: bold ? [{ type: 'bold' }] : [], data: {} }
  })
}

const paragraph = (text) => ({ nodeType: 'paragraph', data: {}, content: inlineNodes(text) })

function textToRichText(text) {
  const content = text.trim().split(/\n\s*\n/).map((block) => {
    const lines = block.split('\n').map((line) => line.trim())
    if (lines.every((line) => line.startsWith('- '))) {
      return {
        nodeType: 'unordered-list',
        data: {},
        content: lines.map((line) => ({ nodeType: 'list-item', data: {}, content: [paragraph(line.slice(2))] })),
      }
    }
    return paragraph(lines.join(' '))
  })
  return { nodeType: 'document', data: {}, content }
}

const richTextToText = (node) =>
  node.nodeType === 'text' ? node.value : (node.content ?? []).map(richTextToText).join(node.nodeType === 'document' ? '\n' : '')

// --- Field values ----------------------------------------------------------

async function parseValue(entry, name, raw) {
  const { fields } = await api('GET', `/content_types/${contentType(entry)}`)
  const definition = fields.find((f) => f.id === name)
  if (!definition) throw new Error(`${contentType(entry)} has no field "${name}". Fields: ${fields.map((f) => f.id).join(', ')}`)
  switch (definition.type) {
    case 'Symbol':
    case 'Text':
      return raw
    case 'Integer':
    case 'Number':
      return Number(raw)
    case 'Boolean':
      return raw === 'true'
    case 'Date':
      return raw
    case 'RichText':
      return raw.trim().startsWith('{') ? JSON.parse(raw) : textToRichText(raw)
    default:
      throw new Error(`Field "${name}" is a ${definition.type}: edit it in the Contentful web app`)
  }
}

// --- Commands --------------------------------------------------------------

async function list() {
  const { items } = await api('GET', '/entries?content_type=resume&limit=1000')
  const bySlug = new Map(items.map((resume) => [resume.sys.id, field(resume, 'slug')]))
  for (const resume of items) {
    const base = field(resume, 'basedOn')
    console.log([
      field(resume, 'slug').padEnd(24),
      status(resume).padEnd(10),
      field(resume, 'isDefault') ? 'default' : '',
      base ? `based on ${bySlug.get(base.sys.id) ?? base.sys.id}` : '',
      `"${field(resume, 'title')}"`,
      resume.sys.id,
    ].filter(Boolean).join('  '))
  }
}

async function show(slug) {
  const resume = await getResume(slug)
  const base = field(resume, 'basedOn') && (await getEntry(field(resume, 'basedOn').sys.id))
  const replacements = await getEntries(linkIds(resume, 'replacements'))
  const replacementFor = new Map([...replacements.values()].filter((r) => field(r, 'replaces')).map((r) => [field(r, 'replaces').sys.id, r]))

  const sources = {}
  for (const name of BLOCK_FIELDS) {
    const own = name === 'personalData' ? [field(resume, name)].filter(Boolean) : field(resume, name) ?? []
    const inherited = base && (name === 'personalData' ? [field(base, name)].filter(Boolean) : field(base, name) ?? [])
    sources[name] = own.length > 0 || !base ? { ids: own.map((l) => l.sys.id), from: 'own' } : { ids: inherited.map((l) => l.sys.id), from: 'inherited' }
  }
  const blocks = await getEntries(Object.values(sources).flatMap((s) => s.ids))

  console.log(`${field(resume, 'title')} (/${field(resume, 'isDefault') ? '' : `cv/${slug}`})  ${resume.sys.id}  ${status(resume)}`)
  if (base) console.log(`based on: ${field(base, 'slug')} ${base.sys.id}`)
  for (const [name, { ids, from }] of Object.entries(sources)) {
    console.log(`\n${name} (${from})`)
    for (const id of ids) {
      const original = blocks.get(id)
      if (!original) { console.log(`  ${id}  missing or archived`); continue }
      const replacement = replacementFor.get(id)
      const shown = replacement ?? original
      console.log(`  ${shown.sys.id}  ${status(shown).padEnd(9)}  ${label(shown)}${replacement ? `  (replaces ${id} "${label(original)}")` : ''}`)
    }
  }
  const unused = [...replacements.values()].filter((r) => !Object.values(sources).some((s) => s.ids.includes(field(r, 'replaces')?.sys.id)))
  for (const r of unused) console.log(`\nwarning: replacement ${r.sys.id} "${label(r)}" does not replace any block of this resume`)
}

async function entry(id) {
  const found = await getEntry(id)
  const fields = Object.fromEntries(Object.entries(found.fields).map(([name, value]) => [name, value[LOCALE]]))
  console.log(JSON.stringify({ id, contentType: contentType(found), status: status(found), fields }, null, 2))
}

async function createResume(slug) {
  if (!flags.title) throw new Error('--title is required')
  const fields = { slug: { [LOCALE]: slug }, title: { [LOCALE]: flags.title } }
  if (flags['based-on']) fields.basedOn = { [LOCALE]: link((await getResume(flags['based-on'])).sys.id) }
  const created = await api('POST', '/entries', { body: { fields }, headers: { 'X-Contentful-Content-Type': 'resume' } })
  console.log(`created resume ${created.sys.id} (draft)`)
}

async function variant(slug, originalId) {
  const resume = await getResume(slug)
  const original = await getEntry(originalId)
  if (field(original, 'replaces')) throw new Error(`${originalId} is already a variant; create the variant from the original block`)
  const copy = { sys: original.sys, fields: structuredClone(original.fields) }
  setField(copy, 'replaces', link(originalId))
  for (const assignment of sets) {
    const [name, ...rest] = assignment.split('=')
    setField(copy, name, await parseValue(original, name, rest.join('=')))
  }
  const created = await api('POST', '/entries', { body: { fields: copy.fields }, headers: { 'X-Contentful-Content-Type': contentType(original) } })
  setField(resume, 'replacements', [...(field(resume, 'replacements') ?? []), link(created.sys.id)])
  await updateEntry(resume)
  console.log(`created variant ${created.sys.id} of ${originalId} "${label(original)}" (draft), added to ${slug} replacements`)
  console.log(`publish with: npm run cms -- publish ${created.sys.id} ${resume.sys.id}${flags.env ? ` --env ${flags.env}` : ''}`)
}

async function set(id, name, value) {
  const found = await getEntry(id)
  const raw = flags.file ? readFileSync(flags.file, 'utf8') : value
  if (raw === undefined) throw new Error('Missing value')
  setField(found, name, await parseValue(found, name, raw))
  await updateEntry(found)
  console.log(`updated ${id} ${name} (draft changes)`)
}

async function changeList(slug, name, id, action) {
  if (!LIST_FIELDS.includes(name)) throw new Error(`List must be one of: ${LIST_FIELDS.join(', ')}`)
  const resume = await getResume(slug)
  let ids = linkIds(resume, name)
  if (ids.length === 0 && name !== 'replacements' && field(resume, 'basedOn')) {
    ids = linkIds(await getEntry(field(resume, 'basedOn').sys.id), name)
    console.log(`copied ${ids.length} ${name} from the base resume: ${slug} no longer inherits this list`)
  }
  ids = action === 'add' ? [...ids.filter((existing) => existing !== id), id] : ids.filter((existing) => existing !== id)
  setField(resume, name, ids.map(link))
  await updateEntry(resume)
  console.log(`${action === 'add' ? 'added' : 'removed'} ${id} ${action === 'add' ? 'to' : 'from'} ${slug} ${name} (draft changes)`)
}

async function publish(ids) {
  for (const id of ids) {
    const found = await getEntry(id)
    await api('PUT', `/entries/${id}/published`, { headers: { 'X-Contentful-Version': found.sys.version } })
    console.log(`published ${id} "${label(found)}"`)
  }
}

const commands = {
  list: () => list(),
  show: () => show(params[0]),
  entry: () => entry(params[0]),
  'create-resume': () => createResume(params[0]),
  variant: () => variant(params[0], params[1]),
  set: () => set(params[0], params[1], params[2]),
  add: () => changeList(params[0], params[1], params[2], 'add'),
  remove: () => changeList(params[0], params[1], params[2], 'remove'),
  publish: () => publish(params),
}

if (!commands[command]) {
  console.log(HELP)
  process.exit(command && command !== 'help' ? 1 : 0)
}
if (!spaceId || !token) {
  console.error('Missing VITE_CONTENTFUL_SPACE_ID (.env.local) or CMA_CONTENTFUL_TOKEN (.env.cma)')
  process.exit(1)
}
console.error(`[${environment}]`)
await commands[command]().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
