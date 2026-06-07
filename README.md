# THOTH SPARKZ Website

Static Vite website for the THOTH SPARKZ real estate and private villas experience.

## Quick Start

```bash
npm install
npm run dev
```

Build production output:

```bash
npm run build
```

Preview the built site:

```bash
npm run preview
```

## Source Map

- `index.html` - homepage, hero image/video, real estate/villas entry cards, contact modal.
- `real-estate.html` - real estate listing page.
- `villas.html` - villa listing page.
- `property-detail.html` - dynamic detail page for both real estate and villa records.
- `privacy-policy.html`, `terms.html`, `cookies.html` - lightweight legal pages.
- `public/sw.js` - conservative service worker cache for same-origin static pages/assets.
- `public/js/register-sw.js` - shared service worker registration used by all pages.
- `vite.config.js` - Vite multi-page build inputs.
- `nginx.conf` - low-memory production Nginx config for a 1GB VPS.
- `ecosystem.config.js` - PM2 fallback runtime config.
- `.env.example` - production environment variables.

See `docs/CODEBASE_MAP.md` for a fuller module-by-module guide.

## Important Conventions

- Keep visual changes local to the page being edited unless a shared component pattern is intentionally updated.
- Listing cards use `data-href` plus JavaScript handlers instead of inline `onclick`.
- Property detail content is sanitized before rendering because it is generated with `innerHTML`.
- Do not cache or preload `hero-video.mp4` aggressively; it is the largest asset in the project.
- `dist/`, `node_modules/`, logs, and local environment files are generated/local and should not be committed.

## Verification Checklist

Run these before handing off changes:

```bash
npm run build
npm audit --omit=dev
```

Also test the main pages at desktop and mobile widths:

- `/`
- `/real-estate.html`
- `/villas.html`
- `/property-detail.html?id=palazzo-grande`
- `/property-detail.html?id=villa-cypress`
