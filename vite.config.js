import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
  build: {
    sourcemap: false,
    minify: 'oxc',
    target: 'esnext',
    chunkSizeWarningLimit: 1500,
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom') || id.includes('/react/')) {
              return 'react-vendor';
            }
            if (id.includes('react-router')) {
              return 'router-vendor';
            }
            if (id.includes('react-bootstrap') || id.includes('bootstrap')) {
              return 'bootstrap-vendor';
            }
            if (id.includes('@supabase')) {
              return 'supabase-vendor';
            }
            if (id.includes('react-icons') || id.includes('bootstrap-icons')) {
              return 'icons-vendor';
            }
            if (
              id.includes('jspdf') ||
              id.includes('html2canvas') ||
              id.includes('xlsx')
            ) {
              return 'utils-vendor';
            }
          }
        },
      },
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-bootstrap',
      '@supabase/supabase-js',
    ],
  },
})