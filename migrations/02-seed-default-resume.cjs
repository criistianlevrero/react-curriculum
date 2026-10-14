// Creates the default resume from the content the site showed before resumes
// existed: the single personalData entry, every published qualification and
// every published project.
const PERSONAL_DATA_ID = '2wscO3EoyDEFK5PPX4R424'
const DEFAULT_SLUG = 'default'

const link = (id) => ({ sys: { type: 'Link', linkType: 'Entry', id } })

module.exports = async function (migration, { makeRequest }) {
  const existing = await makeRequest({
    method: 'GET',
    url: `/entries?content_type=resume&fields.slug=${DEFAULT_SLUG}`,
  })
  if (existing.total > 0) return

  // Same order the GraphQL API used for the old unordered collection query.
  const publishedIds = async (contentType) => {
    const { items } = await makeRequest({
      method: 'GET',
      url: `/entries?content_type=${contentType}&sys.publishedAt[exists]=true&order=-sys.publishedAt,sys.id&limit=1000`,
    })
    return items.map((entry) => entry.sys.id)
  }

  const entry = await makeRequest({
    method: 'POST',
    url: '/entries',
    headers: { 'X-Contentful-Content-Type': 'resume' },
    data: {
      fields: {
        title: { 'en-US': 'Default' },
        slug: { 'en-US': DEFAULT_SLUG },
        isDefault: { 'en-US': true },
        personalData: { 'en-US': link(PERSONAL_DATA_ID) },
        qualifications: { 'en-US': (await publishedIds('qualifications')).map(link) },
        projects: { 'en-US': (await publishedIds('project')).map(link) },
      },
    },
  })

  await makeRequest({
    method: 'PUT',
    url: `/entries/${entry.sys.id}/published`,
    headers: { 'X-Contentful-Version': entry.sys.version },
  })
}
