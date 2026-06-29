import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Honour a PORT env var when set (e.g. the preview harness) and fall back
  // to Vite's default for a normal `npm run dev`.
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
  },
})
