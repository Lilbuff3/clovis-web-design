# Clovis Web Design — cloviswebdesign.com

Adam Youssef's web design site. Astro 7 (static output) + Tailwind v4 + a few small inline scripts (no framework runtime), hosted on Vercel.

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

- `src/data/fovea.ts` holds **every word on the homepage**, one export per section. Change copy there, not in components.
- `src/pages/index.astro` is one long page. Section order is deliberate: proof → price → comparison → process → FAQ. Keep pricing near the top. Section ids (`work`, `pricing`, `cost-of-slow`, `ledger`, `receipt`, `process`, `exam`, `services`, `about`, `faq`) are checked by `dist-check` and linked from the case study breadcrumb.
- `src/pages/work/[slug].astro` generates one page per entry in `src/data/caseStudies.ts`.
- `src/data/calculator.ts` is the **only** place prices live. `PRICING_CONSTANTS` is derived from the tier arrays. The FAQ, schema, eye exam, ticker and `dist-check` all read from it. It also holds `smsUri()`, `formatSmsUri()` and `BRIEF_MAILTO`.
- `src/lib/schema.ts` holds all JSON-LD. The homepage describes only the agency. Case studies are an `Article` pointing at the client's `url`/`@id`. Never redeclare a client's business entity here.
- `src/components/SpeedCost.astro` renders the cost-of-a-slow-site calculator at build time; a small script recalculates with `src/lib/speedCost.ts` (Google/SOASTA bounce data, tested in `tests/speedCost.test.ts`).
- `src/styles/global.css` holds the `@theme` color tokens. `dist-check` enforces WCAG contrast on them.

## Rules

- **Pages must work with JS off.** Prefer native HTML (`<details>`, `popover`, radios + `:has()`, anchors) over scripts. Total JS must stay ≤ 15 KB gzipped, counting inline scripts (enforced by `dist-check`).
- **Case study claims must be true.** Only use facts Adam confirmed or that are visible on the live client site.
- **Check client sites in a real browser, not curl or fetch.** Both are JS-driven; e.g. bigbrosdumpster.com's Spanish is swapped in by `js/i18n.js`.
- **Voice:** first person singular, plain English, no agency jargon.
- **Geography:** lead with Fresno. Adam is *based* in Clovis.
- **Phone:** (559) 575-3014. Links are `tel:+15595753014`, and texts go through `smsUri()`.

## FOVEA design system

The site is framed as an eye doctor for websites: a blurry message coming into focus is the promise (clarity, speed) made visible.

- **Metaphor supplies names and a few signature moments only:** the eye-chart hero, the duochrome slider, prescriptions (case studies), the lens tray, the examination dial, the eye exam quiz. Prices, the text/call buttons, the FAQ and all facts stay literal and plain.
- **Acuity labels** on section headers run down the Snellen chart (20/100 → 20/10) as you scroll; set in `fovea.ts`. Acuity is never presented as a measured client fact — case studies use their real metrics.
- **Colors** (`global.css`): off-white `paper`, cool `ink`, one accent `cobalt`. `butter` only for the featured price tier. `duo-red` / `duo-green` only inside the duochrome slider. Keep the site visibly different from the clients' cream-and-terracotta sites.
- **Type:** Archivo (variable width) for the heavy wide eye-chart letters (`.optotype`) and body; Instrument Serif for headlines and italic accents; DM Mono for small `.label` text, never below 11px. All self-hosted via @fontsource.
- **Logo:** the Landolt C (`Mark.astro`), the ring-with-a-gap letter from real eye charts.
- **Motion:** content is sharp and visible by default; effects are added on top (CSS focus pull, scroll-driven ruler and reveals, the pointer lens on mouse devices ≥ 640px). Everything stops under `prefers-reduced-motion`. No loading screens, custom cursors or background video.
- **Phones first:** no sideways scroll at 320px, tap targets ≥ 48px, and the Text / Call / Fees bar stays in thumb reach.
