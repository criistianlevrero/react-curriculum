# My personal resume
this is a react project created as a technology and architecture playground. Im using some cutting edge technologies here as vite, react, contentfull and figma integration.

## figma integration
the figma design file for this project is also the source true for the scss library. All the parameters like font familes, colors, spacing, gradients, shadows, etc are exported from figma to a json token file and then converted into a css library.
Take a look into src/style-foundations

[design tokens for figma](https://www.figma.com/community/plugin/888356646278934516/design-tokens) plugin to export tokens file from figma.

[This project Design File](https://www.figma.com/file/zROAVu7e3a3ru9ULSFDDgb/Curriculum-web?type=design&node-id=0-1&mode=design).

[Style dictionary](https://amzn.github.io/style-dictionary/#/). is a library 
for convert design tokens to scss. 

## getting started

Create a `.env.local` file at project root (see `.env.example`):

```
VITE_CONTENTFUL_SPACE_ID=your_contentful_space_id
VITE_CONTENTFUL_TOKEN=your_contentful_delivery_token
VITE_CONTENTFUL_ENVIRONMENT=master   # optional, defaults to master
```

To edit content from the terminal or run migrations, also create `.env.cma` with a Content Management API token. Never prefix it with `VITE_`, or it will be bundled into the client:

```
CMA_CONTENTFUL_TOKEN=your_contentful_management_token
```

```bash
npm install
npm run dev
```

## multiple resumes

Each CV is a `resume` entry in Contentful. `/` shows the default one and `/cv/<slug>` any other. A CV can be based on another and replace only the blocks that differ.

```bash
npm run cms -- list            # resumes in Contentful
npm run cms -- show default    # blocks of one resume
npm run cms -- help            # every command
```

See [docs/content-model.md](docs/content-model.md).

## PDF export

```bash
npm run pdf                    # exports/default.pdf
npm run pdf -- <slug>          # exports/<slug>.pdf
```

See [docs/pdf-export.md](docs/pdf-export.md).

## working with AI agents

[CLAUDE.md](CLAUDE.md) is the guide for coding agents, and `.claude/skills/edit-resume` teaches Claude how to change resume content safely.

## node version

This project is configured to use Node.js 22.

Using nvm:

```bash
nvm install 22
nvm use 22
```

You can also use the pinned project version:

```bash
nvm use
```