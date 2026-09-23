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
- `src/pages/index.astro` is one long page in the original FOVEA prototype's order (Adam's call): hero → duochrome → the work → examination → eye exam → stats strip → the practice → fees → letters → reception → FAQ. Section ids (`work`, `pricing`, `cost-of-slow`, `ledger`, `process`, `exam`, `services`, `about`, `letters`, `book`, `faq`) are checked by `dist-check` and linked from the case study breadcrumb.
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

The site is framed as an eye doctor for websites: a blurry message coming into focus is the promise (clarity, speed) made visible. It follows the original FOVEA prototype (a React app Adam picked; source in his Downloads, `proto/next-gen-web-design-portfolio`) as closely as the rules above allow, with his names, words and real facts.

- **Metaphor supplies names and a few signature moments only:** the eye-chart hero, the duochrome slider, the frame shelf (case studies), the examination dial, the eye exam and its prescription slip, the letters, reception. Prices, the text/call buttons, the FAQ and all facts stay literal and plain.
- **Clients appear in two places only:** as frames (`Work.astro`: a pair of glasses per client on a shelf, their real screenshot seen through the lenses, a case sheet beside it) and as letters (`Letters.astro`: their own quotes). No client screenshots in the hero or anywhere else on the homepage.
- **Section headers** carry a number (01–09) and put the italic word on its own line (`SectionHead.astro`). **Acuity** (20/200 → 20/15) lives on the top ruler and the side rail (`chrome` in `fovea.ts`). Acuity is never presented as a measured client fact; case studies use their real metrics, and the stats strip only shows numbers from `caseStudies.ts`.
- **Colors** (`global.css`): warm `bone` paper with a grain overlay, cool `ink`, one accent `vermilion` (the prototype's `#cf4327` darkened to `#b93b21` so small text passes 4.5:1 on bone and bone-2). `butter` marks the featured price tier and the stats strip. `optic` green is the duochrome's other half. Small grey text is `muted`; on butter use `ink-2` instead (muted fails there).
- **Type:** Archivo (variable width) for the heavy wide eye-chart letters (`.optotype`) and body; Fraunces for headlines, with the italic word in SOFT 80 / WONK 1 (roman loads the `standard` file, italic the `full` one); DM Mono for small `.label` text, never below 11px. All self-hosted via @fontsource. Helper classes (`.label`, `.optotype`, `.paper`…) sit in `@layer components`, so a Tailwind utility on the same element wins.
- **Logo:** the Landolt C (`Mark.astro`), the ring-with-a-gap letter from real eye charts. It stands in wherever the prototype used a Snellen E.
- **The glasses** (`Hero.astro`) are the concept, so keep them. On load the eye chart starts blurry, a pair of glasses drops onto it, and it comes into focus as they land. On phones they then rest on the chart. On mouse devices ≥ 640px they follow the pointer: blurry chart, sharp through the lenses, with a "Glasses off" switch.
- **Motion:** the original's effects are on: the opening curtain (CSS only, in `index.astro`), the paper grain, the reading-depth ruler and side rail, the trial-lens cursor (mouse devices only), scroll reveals, and four ambient videos. Videos are Pexels clips compressed to 10-second muted loops in `public/video/` (under 600 KB each, with a WebP poster); `AmbientVideo.astro` plays them only while on screen and only after the page has loaded. Never hotlink stock video. Under `prefers-reduced-motion` everything stops: no curtain, no cursor, posters instead of video, sharp chart. With Save-Data on, no video.
- **Phones first:** no sideways scroll at 320px, tap targets ≥ 48px, and the Text / Call / Fees bar stays in thumb reach.
