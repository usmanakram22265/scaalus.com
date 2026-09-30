# CLAUDE.md — Frontend Website Rules

## Always Do First

- **Invoke the `ui-ux-pro-max` skill** before writing any frontend code, every session, no exceptions.

## Local Server

- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the dev server: `node serve.mjs` (serves the project root at `http://localhost:3000`)
- `serve.mjs` lives in the project root. Start it in the background before taking any screenshots.
- If the server is already running, do not start a second instance.

## Screenshot Workflow

- Puppeteer is installed at `C:/Users/nateh/AppData/Local/Temp/puppeteer-test/`. Chrome cache is at `C:/Users/nateh/.cache/puppeteer/`.
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:3000`
- Screenshots are saved automatically to `./temporary screenshots/screenshot-N.png` (auto-incremented, never overwritten).
- Optional label suffix: `node screenshot.mjs http://localhost:3000 label` → saves as `screenshot-N-label.png`
- `screenshot.mjs` lives in the project root. Use it as-is.
- After screenshotting, read the PNG from `temporary screenshots/` with the Read tool — Claude can see and analyze the image directly.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing

## Output Defaults

- Use Next.js (App Router) with TypeScript and Server Components by default; mark Client Components explicitly with `"use client"` only when interactivity, hooks, or browser APIs are required
- Prefer Server-Side Rendering (SSR) via async Server Components and `fetch()` with appropriate caching (`{ cache: "no-store" }` for dynamic, `{ next: { revalidate: N } }` for ISR)
- Create `.tsx` files using functional components with typed props (`type Props = { ... }`); colocate components under `app/` or `components/`
- Styling with Tailwind CSS installed via the official Next.js setup (`npm install -D tailwindcss postcss autoprefixer` + `tailwind.config.ts`), imported through `globals.css` — avoid the CDN script in production
- Use `next/image` for images with explicit `width`, `height`, and `alt`; placeholders via `https://placehold.co/WIDTHxHEIGHT` (whitelist the domain in `next.config.ts` under `images.remotePatterns`)
- Use `next/font` for self-hosted, optimized fonts; use `next/link` for client-side navigation
- Define metadata via the `metadata` export (or `generateMetadata`) in `layout.tsx`/`page.tsx` for SEO
- Handle loading and error states with `loading.tsx` and `error.tsx` route segments; use Suspense boundaries for streaming
- Data mutations via Server Actions (`"use server"`); validate inputs with Zod; revalidate with `revalidatePath` / `revalidateTag`
- Keep secrets in `.env.local` (server-only); only expose variables prefixed with `NEXT_PUBLIC_` to the client
- Mobile-first responsive design using Tailwind breakpoints (`sm:`, `md:`, `lg:`)
- Accessibility: semantic HTML, proper ARIA where needed, keyboard navigation, sufficient color contrast
- Code quality: ESLint (`next/core-web-vitals`) + Prettier; strict TypeScript (`"strict": true`); no `any` unless justified

## Brand Assets

- Always check the `brand_assets/` folder before designing. It may contain logos, color guides, style guides, or images.
- If assets exist there, use them. Do not use placeholders where real assets are available.
- If a logo is present, use it. If a color palette is defined, use those exact values — do not invent brand colors.

## Anti-Generic Guardrails

- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Pick a custom brand color and derive from it.
- **Shadows:** Never use flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Typography:** Never use the same font for headings and body. Pair a display/serif with a clean sans. Apply tight tracking (`-0.03em`) on large headings, generous line-height (`1.7`) on body.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Images:** Add a gradient overlay (`bg-gradient-to-t from-black/60`) and a color treatment layer with `mix-blend-multiply`.
- **Spacing:** Use intentional, consistent spacing tokens — not random Tailwind steps.
- **Depth:** Surfaces should have a layering system (base → elevated → floating), not all sit at the same z-plane.

## Hard Rules

- Do not add sections, features, or content not in the reference
- Do not "improve" a reference design — match it
- Do not stop after one screenshot pass
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color

## Next.js version notes
@AGENTS.md
