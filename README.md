# BitRush Click — V2 / Lazerflow

Independent website for `bitrush.click` with original art direction. Vanilla JS + Vite; no UI framework.

## Local development

```bash
npm install
npm run dev
```

## Production / Cloudflare Pages

- Build command: `npm run build`
- Output directory: `dist`
- Production branch: `main`
- Root: `/`

Contact URL: `https://batols.click/asxfzs6pzlsu`. Search for this URL in `index.html` and `src/main.js` to replace it later. No fictitious live rates are displayed. The form only creates a text message; it doesn't submit personal information to a server. Visitors manually copy their request and initiate contact.

## Structure

- `index.html` — layout, SEO, CTA links
- `src/styles.css` — design, animation and responsive states
- `src/main.js` — mobile menu, form, FAQ, copy action
- `public/exchange-sculpture.svg` — custom graphical sculpture for hero
- `public/favicon.svg` — custom icon
- `public/og-cover.png` — social preview

No GTM installed: add your own container ID to `index.html` only when you're ready to publish.
