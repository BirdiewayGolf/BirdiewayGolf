import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Output directory for build artifacts
    sourcemap: true, // Enables source maps for easier debugging
  },
  base: '/', // Ensures the correct base path for assets
});
