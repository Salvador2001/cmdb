import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  //  workaround para codespaces, eliminar en prod
  //  source: https://github.com/4Min4m/proxyDemo
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true, 
        secure: false,
      }
    }
  }
})
