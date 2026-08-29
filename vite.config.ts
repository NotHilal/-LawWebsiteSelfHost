import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // In dev, forward API calls to the Express server (npm run dev:server).
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})
