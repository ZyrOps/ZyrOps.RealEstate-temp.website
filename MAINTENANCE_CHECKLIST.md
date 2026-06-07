# Maintenance Checklist

- Run `npm audit --omit=dev` monthly.
- Run `npm outdated` monthly and test major upgrades in a branch.
- Rebuild with `npm run build` after every content or config change.
- Test core pages at 320px, 768px, and 1440px before release.
- Review Nginx access/error logs weekly.
- Renew and verify TLS certificates before expiry.
- Check `/health` after deployments.
- Verify `sw.js` cache version after major asset or routing changes.
- Re-compress video and image assets whenever media changes.
- Review `sitemap.xml` whenever pages are added or removed.
- Keep legal/contact email addresses current.
