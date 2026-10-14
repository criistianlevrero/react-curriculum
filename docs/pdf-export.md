# PDF export and printing

There are two ways to get a printable resume. They use different styles.

| | `npm run pdf` | Browser print (Ctrl+P) |
|---|---|---|
| Output | One tall page, sized to the content, 1440 px wide | Paginated, paper size chosen by the user |
| Styles | Screen styles (`emulateMediaType('screen')`) | `@media print` rules |
| Background | Static vector version (`?export` mode) | Animated canvases, printed as images |

## `npm run pdf`

```bash
npm run pdf                # default resume → exports/default.pdf
npm run pdf -- <slug>      # /cv/<slug>     → exports/<slug>.pdf
```

`scripts/export-pdf.mjs`:

1. Builds the app with `vite build`, so it reads `.env.local`. `VITE_CONTENTFUL_ENVIRONMENT` decides which Contentful environment is exported.
2. Serves `dist/` with `vite preview` on a free port.
3. Opens `/<route>?export` in Puppeteer at 1440 px, waits for network idle, fonts and images, and fails if no `<main>` rendered (for example an unknown slug).
4. Prints one page with the full document height and no margins.
5. Recompresses it with Ghostscript (`gs`) when installed: deduplicates images and downsamples the blurred shadow masks. Without `gs` the raw PDF is kept and a warning is printed.

Requirements: Puppeteer's bundled Chrome (installed with `npm install`) and, optionally, Ghostscript. `exports/` is gitignored.

Only published entries appear, because the site reads the Delivery API. Publish drafts before exporting.

## `?export` mode

`src/pages/resume/resume.jsx` reads the `export` query parameter:

- `LiveBackground` renders `StaticPicture` instead of the animated canvases. It rebuilds the same drawing with DOM elements, CSS `clip-path` and gradients, frozen at the scroll position where each picture reaches the top of the viewport. The result stays vector in the PDF.
- The sticky "source code" button is hidden.

Anyone can open `/?export` in the browser to preview what the PDF will look like.

## Things that break the PDF

- **CSS `filter` (for example `drop-shadow`)** makes Chrome rasterize the element when printing, so text becomes an image. Use `box-shadow` with the `vars.$effect-*` tokens instead.
- **New visual layers** must keep `.main` above the background (it has `position: relative`).
- **Canvas drawings** print as bitmaps. Anything new drawn on a canvas needs a static counterpart for `?export`.
- **Animation or lazy loading** that depends on scrolling: the export does not scroll, it only waits for network idle.

After visual changes, run `npm run pdf` and open the file to check it.

## Browser print styles

`@media print` rules are spread across the component styles: base font size of 9pt (`src/index.scss`), the layout switching to a single block (`main-with-aside.module.scss`), project rows (`project.module.scss`), the header and side information, and the sticky button hidden (`resume.module.scss`). `project.allowPageBreak` in Contentful controls whether a project may be split across pages. These rules do not affect `npm run pdf`.
