# react-curriculum

Personal resume site: React 18 + Vite, content from Contentful over GraphQL (Apollo), deployed on Netlify from `master`. One codebase serves several resumes (CVs) and exports them as PDF.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` / `npm run lint` | Production build / ESLint (zero warnings allowed) |
| `npx jest --watchAll=false` | Tests once (`npm test` runs in watch mode) |
| `npm run cms -- <command>` | Inspect and edit resumes in Contentful (`npm run cms -- help`) |
| `npm run pdf [-- <slug>]` | Export a resume to `exports/<slug>.pdf` |
| `npm run migrate -- <env> <files...>` | Run Contentful content model migrations |

Node 22 (`.nvmrc`). npm is the package manager (`package-lock.json`); `yarn.lock` is legacy and gets rewritten by npm.

## Environment

- `.env.local`: `VITE_CONTENTFUL_SPACE_ID`, `VITE_CONTENTFUL_TOKEN` (Delivery, read-only), optional `VITE_CONTENTFUL_ENVIRONMENT` (default `master`).
- `.env.cma`: `CMA_CONTENTFUL_TOKEN` (Management, read-write). Used only by `npm run cms` and `npm run migrate`.
- Both files are gitignored. Never read or print token values; load them with `node --env-file`.

## Architecture

- Routes (`src/App.jsx`): `/` renders the resume with `isDefault`, `/cv/:slug` any other. `public/_redirects` sends every path to `index.html` on Netlify.
- `src/services/api/content/content.js`: the single GraphQL query. It fetches one `resume`, its `basedOn` resume and its `replacements`.
- `src/services/resume.js` (`resolveResume`): inheritance and replacement rules, then groups projects by company. Components receive resolved data only.
- `src/pages/resume/`: the page and its sections. `?export` switches to the static, print-friendly rendering used by the PDF export.
- `src/style-foundations/`: SCSS tokens generated from Figma; do not edit generated files by hand.

Details: [docs/content-model.md](docs/content-model.md) (Contentful model, inheritance, migrations) and [docs/pdf-export.md](docs/pdf-export.md) (PDF and print).

## Rules

- **Editing resume content** (texts, new CV, emphasis on an experience): use the `edit-resume` skill and `npm run cms`. Content lives in Contentful, not in the code.
- **Never give the CMA token a `VITE_` prefix**: Vite bundles every `VITE_` variable into the public client.
- **Content model changes** go through a new numbered script in `migrations/`, run on the `dev` environment first, verified, and only then on `master`. Never change the model by hand in the web app.
- **`master` is production** for both Contentful and git (Netlify deploys on push). Ask before publishing entries, running migrations or pushing to it.
- If you change the query or `resolveResume`, check that the default resume still renders exactly as before (same blocks, same order).
