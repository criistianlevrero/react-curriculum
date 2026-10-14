---
name: edit-resume
description: Change resume (CV) content stored in Contentful - create a new CV, tailor the profile or subheading, reword or emphasize an experience, hide or add skills and projects, publish changes, export the PDF. Use whenever the user asks to modify what a resume says rather than how the site works.
---

# Edit resume content

Resume content lives in Contentful, not in the repo. Edit it with `npm run cms`, which wraps the Content Management API. Read [docs/content-model.md](../../../docs/content-model.md) for the model and the inheritance rules.

## Ground rules

- **Every write is a draft.** The live site changes only after `npm run cms -- publish`. Show the user what changed and ask before publishing anything on `master`.
- **Do not edit the default resume's blocks** unless the user explicitly wants every CV to change. To tailor one CV, create a variant.
- **Commands default to `master`.** Add `--env dev` to rehearse on the sandbox, which is a clone of `master`.
- Never read `.env.local` or `.env.cma` or print tokens; the npm scripts load them.
- If the user's request is ambiguous about which CV, ask. `npm run cms -- list` shows them all.

## Workflow

1. **Inspect.** `npm run cms -- list`, then `npm run cms -- show <slug>`. `show` prints every block with its entry id, whether the list is own or inherited, and which blocks are replaced. `npm run cms -- entry <id>` prints the full fields of one entry, rich text included.
2. **Change.** Use the recipes below. Note every entry id the commands print.
3. **Review.** Run `show <slug>` again and `entry <id>` on the changed entries. Summarize the changes for the user, quoting the new texts.
4. **Publish** once the user confirms: `npm run cms -- publish <variantIds...> <resumeId>`. Publish variants before the resume that references them; drafts are invisible to the site.
5. **Verify** at `/cv/<slug>` (or `/` for the default), or export with `npm run pdf -- <slug>`.

## Recipes

### New CV for an application

```bash
npm run cms -- create-resume acme-frontend --title "Acme - Frontend" --based-on default
```

It starts identical to the default. Slugs are lowercase words joined by dashes. It shows at `/cv/acme-frontend` once published.

### Tailor the profile or subheading

```bash
npm run cms -- show acme-frontend                     # find the personalData id
npm run cms -- variant acme-frontend <personalDataId> --set "subheading=Senior Frontend Engineer"
npm run cms -- set <newId> profile --file /path/profile.md
```

### Reword or emphasize an experience

```bash
npm run cms -- variant acme-frontend <projectId>
npm run cms -- set <newId> positionDescription --file /path/description.md
npm run cms -- set <newId> projectName "Lead frontend developer"
```

The variant keeps the company and year of the original, so it stays in the same place.

### Hide or add a skill or project

```bash
npm run cms -- remove acme-frontend projects <projectId>
npm run cms -- add acme-frontend qualifications <qualificationId>
```

The first change copies the inherited list into the CV, so later edits to the default list no longer reach it. Say so to the user. Projects are sorted by date automatically; qualifications keep the list order.

### Change something for every CV

Edit the original entry (`set <originalId> ...`). Every CV that inherits it changes once it is published.

## Rich text

`set ... --file` accepts:

- `.md` or `.txt`: a blank line starts a paragraph, lines starting with `- ` make a bullet list, `**text**` is bold.
- A Contentful rich text JSON document (starts with `{`), for anything richer. Get an example from `npm run cms -- entry <id>`.

Write a scratch file outside the repo for the text.

## Limits

`npm run cms` cannot delete entries, change pictures, links or companies, or edit the `es-AR` locale. Point the user to the Contentful web app for those. Changing the content model itself (new fields or types) is a code change: see the migrations section in `docs/content-model.md`.
