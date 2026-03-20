import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

// Recreate __dirname for ESM so Vite can resolve paths from the project root.
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  // Pin the root and cache directory explicitly so local tooling behaves
  // consistently no matter where Vite is launched from.
  root: __dirname,
  plugins: [react()],
  cacheDir: resolve(__dirname, 'node_modules/.vite'),
  server: {
    // Bind to the configured dev port and fail fast instead of silently
    // choosing a different one.
    host: true,
    port: 5173,
    strictPort: true,
  },
})
