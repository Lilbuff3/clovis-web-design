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
- **Type:** Archivo (variable width) for the heavy wide eye-chart letters (`.optotype`) and body; Fraunces for headlines, with the italic word in SOFT 80 / WONK 1; DM Mono for small `.label` text, never below 11px, and `.btn-label` (13px) inside buttons. All self-hosted. Archivo and Fraunces live in `src/assets/fonts/`, trimmed from the @fontsource files to what the site uses (Archivo 400–800 at 100–118% width, Fraunces 400–500, the italic's SOFT/WONK baked in, optical size kept): same look, about half the bytes. `scripts/trim-fonts.py` regenerates them; a new weight or width needs its range widened there first. DM Mono comes straight from @fontsource. Helper classes (`.label`, `.btn-label`, `.optotype`, `.paper`…) sit in `@layer components`, so a Tailwind utility on the same element wins.
- **Logo:** the Landolt C (`Mark.astro`), the ring-with-a-gap letter from real eye charts. It stands in wherever the prototype used a Snellen E.
- **The glasses** (`GuideGlasses.astro`, placed on the hero chart) are the concept, so keep them. The page opens foggy and the chart comes into focus as they drop onto it; the headline is never left blurry. Then they travel with the reader: on scroll they glide (a spring, with a little tilt) to the headline nearest the reading line and land on its `data-focus` word, which comes into focus as they arrive. The spots are the italic word in `SectionHead`, the Practice headline, and last the footer wordmark (butter rims there). Anything on screen for 0.9s comes into focus anyway. Without script or with reduced motion they rest on the chart and every headline is sharp. They land on headlines only, never on body text or buttons; to add a spot, put `data-focus` on a headline word.
- **Motion:** the original's effects are on: the opening fog (CSS only, in `Hero.astro`; it replaced the opening curtain, which read as a loading screen and delayed the page by about a second), the paper grain, the reading-depth ruler, the side rail (from 1640px, where it clears the text), scroll reveals, the travelling glasses, and two ambient videos. No custom cursor: it competed with the glasses. Videos are AI-generated clips (Gemini, made for this site: a phone on a small-town street in the hero, hands at a laptop in The practice), cut to 9-second muted loops with a crossfaded seam in `public/video/` (under ~300 KB each, with a WebP poster); `AmbientVideo.astro` plays them only while on screen and only after the page has loaded. No faces, and blur any on-screen text so AI gibberish never shows. Never hotlink stock video, and never put a clip where it can't be seen (two faint background clips were cut for that). Under `prefers-reduced-motion` everything stops: no fog, no travel, posters instead of video, sharp chart. With Save-Data on, no video.
- **Pictures:** every photo and clip on the site is Adam's own or made for this site. No stock, and nothing borrowed from the prototype.
- **Phones first:** no sideways scroll at 320px, tap targets ≥ 48px, and the Text / Call / Fees bar stays in thumb reach.
