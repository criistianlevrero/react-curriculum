# Content model and multiple resumes

All resume content lives in Contentful. The site can show several resumes (CVs) that share most of their content: a new CV is usually the default one with a different profile text or a reworded experience.

## Content types

| Type | Purpose | Key fields |
|---|---|---|
| `resume` | A CV. Composes the blocks below | `title`, `slug`, `isDefault`, `basedOn`, `personalData`, `qualifications`, `projects`, `replacements` |
| `personalData` | Name, subheading, profile text, contact, picture | `name`, `subheading`, `profile` (rich text), `email`, `location`, `mediaLinks`, `profilePicture`, `replaces` |
| `qualifications` | One skill with a 1–5 rating | `name`, `description` (rich text), `rating`, `replaces` |
| `project` | One position or project inside a company | `entryTitle` (internal name), `projectName`, `year`, `company`, `positionDescription` (rich text), `allowPageBreak`, `replaces` |
| `company` | Employer with dates | `companyName`, `startDate`, `finishDate` |
| `mediaLinks` | Contact and social links of `personalData` | `linkLabel`, `url`, `iconId`, `iconWithLabel` |
| `siteStrings` | Global strings (fetched, currently unused) | `identifier`, `content` |

Locales: `en-US` (default, the only one the site reads) and `es-AR`.

## How a resume is resolved

`src/services/resume.js` turns the GraphQL result into what the page renders:

1. **Inheritance.** For `personalData`, `qualifications` and `projects`, the resume uses its own value when it has one, otherwise the value of `basedOn`. A list is inherited or replaced as a whole: if a resume sets its own `projects`, none of the base projects are inherited.
2. **Replacements.** Every entry in `replacements` has a `replaces` field pointing at an original block. Wherever the original appears in the resolved resume, the replacement is shown instead, in the same position.
3. **Unpublished links are dropped.** The Delivery API returns `null` for draft or archived entries, so they silently disappear.
4. **Experience grouping.** Projects are grouped by their `company`. Companies are sorted by `startDate` descending and projects by `year` descending, so the order of the `projects` list does not matter. Qualifications keep the order of their list.

Inheritance is one level deep: the query fetches `basedOn` but not the base's own `basedOn`, so always base new resumes on the default one.

### Routing

- `/` shows the resume with `isDefault = true`. Keep exactly one.
- `/cv/<slug>` shows the resume with that slug, or "Resume not found".

## Common changes

`npm run cms` covers all of these. The agent workflow is in [`.claude/skills/edit-resume/SKILL.md`](../.claude/skills/edit-resume/SKILL.md).

| Goal | How |
|---|---|
| New CV, identical to the default | `npm run cms -- create-resume <slug> --title "<title>" --based-on default`, then publish it |
| Different profile or subheading | `variant <slug> <personalDataId>`, then `set` the fields on the new entry |
| Reword or emphasize one experience | `variant <slug> <projectId> --set projectName=...`, then `set <newId> positionDescription --file text.md` |
| Hide an experience or skill | `remove <slug> projects <id>` (copies the base list first) |
| Change the default resume itself | Edit the original entries: every resume that inherits them changes too |

## Migrations

The content model is versioned in `migrations/` and applied with [contentful-migration](https://github.com/contentful/contentful-migration):

```bash
npm run migrate -- dev migrations/03-something.cjs   # try on the sandbox
npm run migrate -- master migrations/03-something.cjs
```

| File | Change |
|---|---|
| `01-create-resume.cjs` | Adds `resume` and the `replaces` field on `personalData`, `qualifications` and `project` |
| `02-seed-default-resume.cjs` | Creates the `default` resume from the pre-existing content. Skips if it exists |

Rules for new migrations:

- Number them and never edit one that already ran on `master`.
- Run them on `dev` first, update the query and `resolveResume`, check the site against `dev` (`VITE_CONTENTFUL_ENVIRONMENT=dev`), then run on `master` before deploying the code that needs them.
- The `dev` environment is a clone of `master` and drifts over time. Recreate it from `master` when it matters (Contentful web app → Settings → Environments). The Delivery API key must list `dev` among its environments to read it.

## Design decision

Each resume could list all its blocks explicitly. That is simpler to read, but creating a CV would mean selecting every block again. Inheritance plus replacements keeps a new CV down to the few blocks that differ, and editing a shared block updates every CV that uses it.
