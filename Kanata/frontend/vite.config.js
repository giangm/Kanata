import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from 'tailwindcss';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.join(path.resolve(), 'src'),
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
  plugins: [react()],
})
