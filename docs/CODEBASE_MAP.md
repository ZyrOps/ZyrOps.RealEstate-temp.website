# Codebase Map

This project is a static multi-page Vite site. Each major page currently owns its HTML, CSS, and page script inline. That keeps deployment simple, but it makes naming and section boundaries important.

## Runtime Flow

1. Vite serves or builds the HTML entry files listed in `vite.config.js`.
2. The browser loads each page's inline styles and page script.
3. GSAP, ScrollTrigger, and Lenis are loaded from CDN for animation and smooth scrolling.
4. `public/js/register-sw.js` registers `public/sw.js` after page load.
5. Production should serve `dist/` directly through Nginx.

## Main Pages

### `index.html`

Purpose: homepage and category gateway.

Important sections:

- Head metadata and schema.
- Design system variables and shared layout styles.
- Fixed header and mobile overlay menu.
- Contact modal.
- Hero image/video crossfade.
- Real Estate and Villas entry cards.
- Footer.
- Page script: menu behavior, contact modal, scroll reveals, GSAP animations, hero video activation.

### `real-estate.html`

Purpose: listing page for property ownership/residences.

Important sections:

- Shared head, typography, header, contact modal, footer.
- Hero banner.
- Intro section.
- Alternating `.property-block` listing cards.
- Page script: menu/modal behavior, `data-href` card navigation, GSAP image/text reveal, card tilt.

### `villas.html`

Purpose: listing page for private villa stays.

Important sections mirror `real-estate.html`:

- Hero banner.
- Intro section.
- Alternating `.property-block` listing cards.
- Page script: same interaction pattern as real estate.

### `property-detail.html`

Purpose: detail view for both Real Estate and Villas.

Important sections:

- Shared head, typography, header, contact modal, footer.
- `properties` data object inside the page script.
- Sanitization helpers:
  - `escapeHTML`
  - `safeImageUrl`
  - `safeLocalHref`
  - `sanitizeProperty`
- Dynamic rendering for:
  - Full-screen hero.
  - Property intro.
  - Detail carousel.
  - Gallery.
  - Accordions.
  - Related properties.
- Page script: carousel controls, contact actions, scroll reveals, `data-href` related card navigation.

## Shared Public Modules

### `public/sw.js`

Conservative static cache.

- Caches core same-origin pages/assets.
- Uses network-first behavior for documents.
- Skips `.mp4` to avoid storing the large hero video.

### `public/js/register-sw.js`

Single owner for service worker registration.

- Does nothing for `file:` URLs.
- Registers `/sw.js` after page load.
- Swallows registration failures so service worker issues never break the site.

## Deployment Files

### `nginx.conf`

Production config for a low-memory VPS.

- Serves `dist/` directly.
- Gzip and brotli enabled.
- Long immutable cache for static assets.
- No-cache HTML.
- Basic security headers and request rate limiting.

### `ecosystem.config.js`

PM2 fallback runtime for `vite preview`.

Use Nginx static serving as the preferred production path. PM2 preview is only a fallback when a Node process is required.

### `deployment.sh`

Builds the site, syncs `dist/` to `/var/www/tuscan-villas-estates/dist`, copies Nginx config, tests/reloads Nginx, and reloads PM2 if available.

## Editing Guidelines

- Prefer small, page-local changes unless a pattern is clearly shared.
- If a snippet appears on every page, move it to `public/js/` rather than copying more inline scripts.
- Keep generated output out of source changes: `dist/`, logs, and `node_modules/` are ignored.
- After editing dynamic content in `property-detail.html`, run `npm run build` and test at least one Real Estate ID and one Villa ID.
- When changing assets, update `PERFORMANCE_REPORT.md` if the asset size meaningfully changes.
