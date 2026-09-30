# scaalus.com

Next.js (App Router) + TypeScript + Tailwind CSS v3. Project rules for Claude live in [`CLAUDE.md`](./CLAUDE.md).

## Getting started

```bash
npm install
cp .env.example .env.local   # optional
node serve.mjs               # http://localhost:3000 (no-op if already running)
```

## Scripts

| Command                             | What it does                                                             |
| ----------------------------------- | ------------------------------------------------------------------------ |
| `node serve.mjs`                    | Start the dev server on :3000 unless one is already running              |
| `node screenshot.mjs <url> [label]` | Full-page screenshot to `temporary screenshots/screenshot-N[-label].png` |
| `npm run build`                     | Production build                                                         |
| `npm run lint`                      | ESLint (`next/core-web-vitals` + TypeScript + Prettier compat)           |
| `npm run typecheck`                 | `tsc --noEmit` (strict)                                                  |
| `npm run format`                    | Prettier (with Tailwind class sorting)                                   |

`screenshot.mjs` uses a full `puppeteer` install if it finds one (in the project or the
temp install path in `CLAUDE.md`), otherwise `puppeteer-core` with Chrome from
`CHROME_PATH`, `~/.cache/puppeteer`, or a standard system location.

## Structure

```
app/            routes, layout, loading/error states, globals.css (brand tokens)
components/     shared components
brand_assets/   logos, color guides, imagery — check before designing
```

Brand colors in `app/globals.css` are placeholders until a palette is added to `brand_assets/`.
The default Tailwind color palette is disabled; use `brand-*`, `ink`, and `surface-*`.
