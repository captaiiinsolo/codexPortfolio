import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  root: __dirname,
  plugins: [react()],
  cacheDir: resolve(__dirname, 'node_modules/.vite'),
  server: {
    host: true,
    port: 5173,
    strictPort: true,
  },
})
