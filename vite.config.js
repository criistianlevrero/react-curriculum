import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@components", replacement: path.resolve(__dirname, "src/components") },
      { find: "@foundations", replacement: path.resolve(__dirname, "src/foundations") },
      { find: "@layouts", replacement: path.resolve(__dirname, "src/layouts") },
      { find: "@pages", replacement: path.resolve(__dirname, "src/pages") },
      { find: "@services", replacement: path.resolve(__dirname, "src/services") },
    ],
  },
})
