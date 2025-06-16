import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,      // позволяет Docker отдавать сайт наружу
    port: 3000       // внутренний порт в контейнере (он проброшен на 4000)
  }
})
