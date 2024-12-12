import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Output directory for build artifacts
    sourcemap: true, // Generate sourcemap for debugging
  },
  base: '/', // Ensures correct base path for deployment
});
