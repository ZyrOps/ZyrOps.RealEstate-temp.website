# Performance Report

## Current Build
- `npm run build` completes successfully.
- Gzipped HTML entries remain small for a static site.
- Vite emits static assets with hashed filenames in `dist/assets`.
- Largest asset remains `hero-video.mp4` at about 14.86 MB.

## Optimizations In Place
- Images include `loading`, `decoding`, and priority hints where appropriate.
- Nginx config enables gzip/brotli, immutable long-cache headers for static assets, no-cache HTML, and low-memory worker settings.
- PM2 config limits runtime memory with `NODE_OPTIONS=--max-old-space-size=400` and `max_memory_restart=800M`.
- Added `public/sw.js` for same-origin static caching and offline fallback.
- Service worker avoids caching `.mp4` files to protect storage and memory on low-resource devices.

## Recommended Next Media Target
- Replace `hero-video.mp4` with responsive variants:
  - Mobile target: under 3 MB.
  - Desktop target: under 8 MB.
- Keep the existing poster image so the hero remains fast before video playback.

## 1GB VPS Fit
- The site is static and should run comfortably on a 1GB VPS when served by Nginx.
- Node/Vite preview should only be used as a fallback runtime; Nginx direct static serving is preferred for production.
