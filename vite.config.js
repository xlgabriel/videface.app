import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,       // abre el reporte automáticamente
      gzipSize: true,   // muestra tamaño real comprimido
      brotliSize: true, // muestra tamaño brotli
    })
  ],
})