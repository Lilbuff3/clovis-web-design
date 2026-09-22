# Clovis Web Design — cloviswebdesign.com

Adam Youssef's web design site. Astro 7 (static output) + Tailwind v4 + one Preact island, hosted on Vercel.

## Commands

```bash
npm run dev        # http://localhost:4321
npm test           # speedCost formula test → astro build → tests/dist-check.mjs on dist/
npx astro check    # types
```

## Deploy: a push to `main` is a production deploy

- Vercel builds `main` to production in about 15s. Other branches get preview URLs (behind Vercel login; curl gets a 302).
- Do work on a branch, check the preview, then fast-forward `main`.
- `vercel.json` sets `"framework": "astro"` and overrides the dashboard preset (which still says Vite). It also 308-redirects www → apex.

## Where things live

- `src/pages/index.astro` is one long page. Section order is deliberate: proof → price → comparison → process → FAQ. Keep pricing near the top.
- `src/pages/work/[slug].astro` generates one page per entry in `src/data/caseStudies.ts`.
- `src/data/calculator.ts` is the **only** place prices live. The FAQ, schema and `dist-check` all read from it. It also holds `smsUri()`, `formatSmsUri()` and `BRIEF_MAILTO`.
- `src/lib/schema.ts` holds all JSON-LD. The homepage describes only the agency. Case studies are an `Article` pointing at the client's `url`/`@id`. Never redeclare a client's business entity here.
- `src/components/SpeedCost.tsx` is the only client JS (`client:visible`). The formula is in `src/lib/speedCost.ts` (Google/SOASTA bounce data) and is tested in `tests/speedCost.test.ts`.
- `src/styles/global.css` holds the `@theme` color tokens. `dist-check` enforces WCAG contrast on them.

## Rules

- **Pages must work with JS off.** Prefer native HTML (`<details>`, `popover`, anchors) over islands. Total JS must stay ≤ 15 KB gzipped (enforced by `dist-check`).
- **Case study claims must be true.** Only use facts Adam confirmed or that are visible on the live client site.
- **Check client sites in a real browser, not curl or fetch.** Both are JS-driven; e.g. bigbrosdumpster.com's Spanish is swapped in by `js/i18n.js`.
- **Voice:** first person singular, plain English, no agency jargon.
- **Geography:** lead with Fresno. Adam is *based* in Clovis.
- **Phone:** (559) 575-3014. Links are `tel:+15595753014`, and texts go through `smsUri()`.
