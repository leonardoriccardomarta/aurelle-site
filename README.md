# Aurelle – documentation and support site

Landing page, documentation and support for the **Aurelle** Shopify theme (Aurelle Studio).
Next.js (App Router) · TypeScript · Tailwind CSS. Every page is prerendered as static HTML, with no demo-store links.

The art direction of the site: cream and black, Cormorant Garamond headings, Assistant body,
hairline borders, sharp corners, generous whitespace.

| Route      | What it is                                                                                 |
| ---------- | ------------------------------------------------------------------------------------------ |
| `/`        | Editorial landing: the theme, what is included, the Clinical Skincare style, links to docs / support |
| `/docs`    | Full documentation, sticky sidebar, scroll-spy, search, changelog at the bottom            |
| `/support` | Email, hours, response time, what is and is not covered, FAQ                               |

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build (must pass before every deploy)
npm run typecheck
npm run lint
```

## Content

All text comes from the theme's own documents, copied into `content/`:

- `content/documentation.md` → `/docs`
- `content/support.md` → `/support`
- `content/changelog.md` → bottom of `/docs`

They are parsed at build time (`src/lib/content.ts`), which fails loudly if the structure changes. When the theme docs
change (`tema/docs/*.md`), copy the files over again and rebuild. The submission checklist is intentionally not published.

## Final launch step: domain and email

Everything that depends on the real domain and support address lives in **one file**: `src/config/site.ts`.

1. Set `url` (for example `https://aurelle.example`, no trailing slash) and `supportEmail`.
2. Run `npm run check:launch`. It fails while placeholders remain and prints the exact values to paste into the theme:
   - `config/settings_schema.json` → `theme_documentation_url` = `<url>/docs`, `theme_support_url` = `<url>/support`
   - `docs/support.md` → the support email line (then copy that file to `content/support.md`)
3. `npm run build`, commit, deploy.

The URL feeds the canonical URLs, Open Graph metadata, `sitemap.xml` and `robots.txt`.

## Deploy to Vercel

1. Push this folder to its own Git repository.
2. In Vercel: **Add New… → Project**, import the repository. The Next.js preset is detected automatically; no environment variables are needed.
3. Add the custom domain under **Settings → Domains**.

## Performance

Lighthouse (local production build): desktop 100 / 100 / 100 / 100 on all three pages; mobile accessibility, best
practices and SEO 100, performance 97–99 (the remainder is the React runtime, which an App Router site cannot drop).
