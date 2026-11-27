# Mirel – documentation and support site

Landing page, documentation and support for the **Mirel** Shopify theme (Aurelle Studio).
Next.js (App Router) · TypeScript · Tailwind CSS. Every page is prerendered as static HTML, with no demo-store links.

The art direction of the site: cream and black, Cormorant Garamond headings, Assistant body,
hairline borders, sharp corners, generous whitespace.

| Route      | What it is                                                                                 |
| ---------- | ------------------------------------------------------------------------------------------ |
| `/`        | Editorial landing: the theme, what is included, the Mirel style, links to docs / support |
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

## Support form

`/support` has a contact form that sends its messages to the support mailbox. The browser posts to `/api/contact`
(`src/app/api/contact/route.ts`), which validates the fields, blocks simple spam (a hidden field, a minimum fill time,
a same-origin check and a per-visitor limit) and sends the email through [Resend](https://resend.com).

To switch it on, set these in Vercel (Project Settings, Environment Variables) and redeploy; see `.env.example`:

- `RESEND_API_KEY`: an API key from Resend.
- `CONTACT_FROM`: the sender, for example `Mirel support <support@aurelletheme.com>`. Verify the domain in Resend first.
- `CONTACT_TO` (optional): defaults to the support address in `src/config/site.ts`.

Until the key is set, the form answers that it is unavailable and points visitors to the email address.

## Deploy to Vercel

1. Push this folder to its own Git repository.
2. In Vercel: **Add New… → Project**, import the repository. The Next.js preset is detected automatically; no environment variables are needed.
3. Add the custom domain under **Settings → Domains**.

## Performance

Lighthouse (local production build): desktop 100 / 100 / 100 / 100 on all three pages; mobile accessibility, best
practices and SEO 100, performance 97–99 (the remainder is the React runtime, which an App Router site cannot drop).
