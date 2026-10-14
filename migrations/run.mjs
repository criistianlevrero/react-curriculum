// Usage: npm run migrate -- <environment> <migration file...>
// Reads VITE_CONTENTFUL_SPACE_ID from .env.local and CMA_CONTENTFUL_TOKEN from .env.cma.
import { resolve } from 'node:path'
import { runMigration } from 'contentful-migration'

const [environmentId, ...files] = process.argv.slice(2)

if (!environmentId || files.length === 0) {
  console.error('Usage: npm run migrate -- <environment> <migration file...>')
  process.exit(1)
}

for (const filePath of files) {
  console.log(`\n▶ ${filePath} → ${environmentId}`)
  await runMigration({
    filePath: resolve(filePath),
    spaceId: process.env.VITE_CONTENTFUL_SPACE_ID,
    accessToken: process.env.CMA_CONTENTFUL_TOKEN,
    environmentId,
    yes: true,
  })
}
