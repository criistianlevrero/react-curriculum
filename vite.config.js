import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@assets", replacement: path.resolve(__dirname, "src/assets") },
      { find: "@svg-library", replacement: path.resolve(__dirname, "src/style-foundations/svg-library/_sprites.svg") },
      { find: "@components", replacement: path.resolve(__dirname, "src/components") },
      { find: "@foundations", replacement: path.resolve(__dirname, "src/style-foundations/scss") },
      { find: "@layouts", replacement: path.resolve(__dirname, "src/layouts") },
      { find: "@pages", replacement: path.resolve(__dirname, "src/pages") },
      { find: "@services", replacement: path.resolve(__dirname, "src/services") },
    ],
  },
})
