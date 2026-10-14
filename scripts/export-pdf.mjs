// Exports a resume as a single-page PDF sized to its content.
// Usage: npm run pdf [-- <slug>]   (no slug = default resume)
import { execFileSync } from 'node:child_process';
import { mkdirSync, renameSync, rmSync, statSync } from 'node:fs';
import { build, preview } from 'vite';
import puppeteer from 'puppeteer';

const VIEWPORT_WIDTH = 1440;
const OUTPUT_DIR = 'exports';

const slug = process.argv[2];
const resumePath = slug ? `/cv/${encodeURIComponent(slug)}` : '/';
const outputFile = `${OUTPUT_DIR}/${slug ?? 'default'}.pdf`;
const rawFile = `${OUTPUT_DIR}/.${slug ?? 'default'}.raw.pdf`;

const kb = (file) => `${Math.round(statSync(file).size / 1024)} KB`;

// Recompresses images and dedupes resources. Returns false if Ghostscript is not available.
const optimize = (input, output) => {
  try {
    execFileSync('gs', [
      '-sDEVICE=pdfwrite',
      '-dCompatibilityLevel=1.7',
      '-dPDFSETTINGS=/printer',
      // The default sRGB conversion drops the soft masks Chrome uses for blurred shadows
      '-dColorConversionStrategy=/LeaveColorUnchanged',
      '-dDetectDuplicateImages=true',
      // Grayscale images are the shadow masks: a blur, so low resolution is enough
      '-dDownsampleGrayImages=true',
      '-dGrayImageDownsampleType=/Bicubic',
      '-dGrayImageResolution=72',
      '-dGrayImageDownsampleThreshold=1.0',
      '-dNOPAUSE', '-dBATCH', '-dQUIET',
      `-sOutputFile=${output}`,
      input,
    ]);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') return false;
    throw error;
  }
};

await build({ logLevel: 'warn' });
const server = await preview({ preview: { port: 0 }, logLevel: 'warn' });
const baseUrl = server.resolvedUrls.local[0].replace(/\/$/, '');

const browser = await puppeteer.launch();
try {
  const page = await browser.newPage();
  await page.setViewport({ width: VIEWPORT_WIDTH, height: 900 });
  await page.emulateMediaType('screen');
  await page.goto(`${baseUrl}${resumePath}?export`, { waitUntil: 'networkidle0' });

  const failure = await page.evaluate(() => (document.querySelector('main') ? null : document.body.innerText.trim()));
  if (failure) throw new Error(`Resume "${slug ?? 'default'}" could not be rendered: ${failure}`);

  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map((img) => img.decode().catch(() => {})));
  });

  const height = await page.evaluate(() => Math.ceil(document.documentElement.scrollHeight));

  mkdirSync(OUTPUT_DIR, { recursive: true });
  await page.pdf({
    path: rawFile,
    width: `${VIEWPORT_WIDTH}px`,
    height: `${height}px`,
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
} finally {
  await browser.close();
  server.httpServer.close();
}

if (optimize(rawFile, outputFile)) {
  console.log(`${outputFile}: ${kb(rawFile)} -> ${kb(outputFile)}`);
  rmSync(rawFile);
} else {
  console.warn('Ghostscript (gs) not found, skipping optimization.');
  renameSync(rawFile, outputFile);
  console.log(`${outputFile}: ${kb(outputFile)}`);
}
