import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: '/logistics-uk-fullstack-exercise/', 
  plugins: [react()], 
  build: { 
    outDir: 'dist', 
    assetsDir: 'assets', 
  },
})
