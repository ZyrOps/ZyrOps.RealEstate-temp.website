import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      // Each HTML file is a standalone entry in this static multi-page site.
      input: {
        main: resolve(__dirname, 'index.html'),
        realEstate: resolve(__dirname, 'real-estate.html'),
        villas: resolve(__dirname, 'villas.html'),
        propertyDetail: resolve(__dirname, 'property-detail.html'),
        privacyPolicy: resolve(__dirname, 'privacy-policy.html'),
        terms: resolve(__dirname, 'terms.html'),
        cookies: resolve(__dirname, 'cookies.html'),
      },
    },
  },
  // Allow Vite dev/preview to serve root-level media files.
  server: {
    fs: {
      allow: ['.'],
    },
  },
});
