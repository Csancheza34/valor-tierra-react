import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Esto le dice a Vite: si ves una petición a '/api'...
      '/api': {
        // ...envíala a esta dirección (el servidor de Domus)
        target: 'https://api.domus.la/3.0',
        // ...reescribe la petición para quitar '/api' del inicio
        rewrite: (path) => path.replace(/^\/api/, ''),
        // ...y cambia el origen para que Domus crea que la petición es segura
        changeOrigin: true,
      }
    }
  }
})
