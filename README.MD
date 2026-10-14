# My personal resume
this is a react project created as a technology and architecture playground. Im using some cutting edge technologies here as vite, react, contentfull and figma integration.

## figma integration
the figma design file for this project is also the source true for the scss library. All the parameters like font familes, colors, spacing, gradients, shadows, etc are exported from figma to a json token file and then converted into a css library.
Take a look into src/style-foundations

[design tokens for figma](https://www.figma.com/community/plugin/888356646278934516/design-tokens) plugin to export tokens file from figma.

[This project Design File](https://www.figma.com/file/zROAVu7e3a3ru9ULSFDDgb/Curriculum-web?type=design&node-id=0-1&mode=design).

[Style dictionary](https://amzn.github.io/style-dictionary/#/). is a library 
for convert design tokens to scss. 

## environment variables

Create a `.env.local` file at project root with:

VITE_CONTENTFUL_SPACE_ID=your_contentful_space_id
VITE_CONTENTFUL_TOKEN=your_contentful_delivery_token
VITE_CONTENTFUL_ENVIRONMENT=master (optional, defaults to master)

To run content model migrations, also create a `.env.cma` file with a Content Management API token:

CMA_CONTENTFUL_TOKEN=your_contentful_management_token

Never prefix this token with `VITE_`, or it will be bundled into the client.

## multiple resumes

Each CV is a `resume` entry in Contentful:

- `/` shows the resume with `isDefault` enabled.
- `/cv/<slug>` shows any other resume.

A resume can be `basedOn` another one: its empty block fields (personal data, qualifications, projects) are inherited. To change a single block, duplicate the entry, edit it, point its `replaces` field to the original and add it to the resume `replacements`.

## content migrations

Content model changes live in `migrations/`. Try them on a sandbox environment first:

```bash
npm run migrate -- dev migrations/01-create-resume.cjs
```

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