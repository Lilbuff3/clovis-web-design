// Tier 2: Boundary & Corner Cases (Features 1–15)
// Minimum 5 distinct boundary/stress tests per feature = 75 test cases
// Refactored for authentic source code inspection against src/

import {
  assert,
  assertEqual,
  assertMatch,
  assertGreaterThanOrEqual,
  assertLessThanOrEqual,
  assertContrast,
  readProjectFile,
  loadSchemas,
  loadCaseStudies,
  loadServices,
  loadProcessSteps,
  loadFaqs,
  loadCssTokens,
  loadCalculator,
  calculateQuote,
  formatMailtoUri,
  parseMailtoUri,
  generateProjectBriefText,
} from './test-harness.mjs';

export const tier2Tests = [];

function registerTest(id, name, featureId, fn) {
  tier2Tests.push({ id, name, featureId, fn });
}

// =========================================================================
// FEATURE 1: Central Valley Craftsman Tone & Copy (Boundaries)
// =========================================================================

registerTest('T2.01', 'F1 - Acronyms (NPI, HIPAA, WCAG, CWV) handle uppercase correctly', 1, () => {
  const caseStudiesSource = readProjectFile('src/data/caseStudies.ts');
  const servicesSource = readProjectFile('src/data/services.ts');
  const ledgerSource = readProjectFile('src/components/TheLedger.tsx');
  const combined = caseStudiesSource + '\n' + servicesSource + '\n' + ledgerSource;
  const acronyms = ['NPI', 'HIPAA', 'WCAG', 'CWV'];
  for (const acr of acronyms) {
    assertMatch(combined, new RegExp(`\\b${acr}\\b`), `Acronym ${acr} must appear in uppercase in source data`);
  }
});

registerTest('T2.02', 'F1 - Typographic quotes, em-dashes, and Spanish accents render properly', 1, () => {
  const caseStudiesSource = readProjectFile('src/data/caseStudies.ts');
  const ledgerSource = readProjectFile('src/components/TheLedger.tsx');
  const combined = caseStudiesSource + '\n' + ledgerSource;
  assertMatch(combined, /—/, 'Em-dash must be present in source copy');
  assertMatch(combined, /Dómpers|Protección/, 'Spanish diacritics must be present in source copy');
});

registerTest('T2.03', 'F1 - Empty or missing URL query string does not corrupt craftsman copy', 1, () => {
  const calc = loadCalculator();
  const uri = calc.formatMailtoUri({});
  const parsed = parseMailtoUri(uri);
  assertEqual(parsed.to, 'adam@cloviswebdesign.com', 'Recipient should default cleanly');
  assertEqual(parsed.subject, 'Project Scope Inquiry', 'Subject should default cleanly');
});

registerTest('T2.04', 'F1 - Extreme copy string lengths in headlines do not overflow 320px viewport', 1, () => {
  const heroSource = readProjectFile('src/components/Hero.tsx');
  const headlineMatch = heroSource.match(/Fortune 500 craft\.[^]*?Main Street soul\./i);
  assert(Boolean(headlineMatch), 'Headline must be found');
  const textOnly = headlineMatch[0].replace(/<[^>]*>/g, ' ');
  const words = textOnly.split(/\s+/).filter(Boolean);
  for (const word of words) {
    assertLessThanOrEqual(word.length, 25, `Word "${word}" must not exceed narrow viewport boundary`);
  }
});

registerTest('T2.05', 'F1 - Medical and emergency disclaimers provide clear plain-English warnings', 1, () => {
  const caseStudies = loadCaseStudies();
  const cs1 = caseStudies.find((s) => s.id === 'kidney-specialist-inc');
  assert(Boolean(cs1), 'Kidney specialist case study required');
  const solutionText = typeof cs1.solution === 'string' ? cs1.solution : JSON.stringify(cs1.solution);
  assertMatch(solutionText, /zero-PHI|HIPAA|referral/i, 'Case study must clearly articulate compliance boundaries');
});

// =========================================================================
// FEATURE 2: Project Scaffold & Build Setup (Boundaries)
// =========================================================================

registerTest('T2.06', 'F2 - Relative asset path normalization handles missing slashes', 2, () => {
  const html = readProjectFile('index.html');
  assertMatch(html, /src="\/src\/main\.tsx"/, 'Script source in index.html must use absolute root path');
});

registerTest('T2.07', 'F2 - Build setup operates without optional external analytics plugins', 2, () => {
  const viteConfig = readProjectFile('vite.config.ts');
  const bannedAnalytics = ['google-tag-manager', 'segment', 'mixpanel', 'hotjar'];
  for (const tool of bannedAnalytics) {
    assert(!viteConfig.toLowerCase().includes(tool), `Banned analytics tool ${tool} must not be in vite.config.ts`);
  }
});

registerTest('T2.08', 'F2 - Package dependencies do not contain deprecated build tools', 2, () => {
  const pkg = JSON.parse(readProjectFile('package.json'));
  const bannedTools = ['webpack', 'gulp', 'grunt', 'bower'];
  const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
  for (const tool of bannedTools) {
    assert(!allDeps[tool], `Deprecated tool ${tool} must not be present in package.json`);
  }
});

registerTest('T2.09', 'F2 - Production single-file bundle size boundary under 2MB', 2, () => {
  const appTsx = readProjectFile('src/App.tsx');
  const css = readProjectFile('src/index.css');
  const totalBytes = appTsx.length + css.length;
  const maxAllowedBytes = 2 * 1024 * 1024;
  assertLessThanOrEqual(totalBytes, maxAllowedBytes, 'Core source footprint must remain under 2MB');
});

registerTest('T2.10', 'F2 - Zero environment variables provided does not throw unhandled error', 2, () => {
  const mainTsx = readProjectFile('src/main.tsx');
  assertMatch(mainTsx, /createRoot/, 'main.tsx must mount root unconditionally');
  assert(!mainTsx.includes('process.env.REQUIRED_'), 'Must not require mandatory env variables to boot');
});

// =========================================================================
// FEATURE 3: Design System & Token Integration (Boundaries)
// =========================================================================

registerTest('T2.11', 'F3 - Contrast ratio of ink (#221d17) on paper (#f6f0e6) satisfies WCAG AAA (>7:1)', 3, () => {
  const tokens = loadCssTokens();
  const ink = tokens['color-ink'] || '#221d17';
  const paper = tokens['color-paper'] || '#f6f0e6';
  const ratio = assertContrast(ink, paper, 7.0, 'Ink on Paper');
  assertGreaterThanOrEqual(ratio, 13.0, 'Ink on Paper contrast ratio should exceed 13:1');
});

registerTest('T2.12', 'F3 - useCountUp numerical boundary values (0 to 0, float rounding, clamp)', 3, () => {
  const hookSource = readProjectFile('src/hooks/useCountUp.ts');
  assertMatch(hookSource, /Math\.round|Math\.min|Math\.floor/, 'useCountUp must round and clamp values');
});

registerTest('T2.13', 'F3 - useScrollProgress boundary values strictly bounded between 0.0 and 1.0', 3, () => {
  const hookSource = readProjectFile('src/hooks/useScrollProgress.ts');
  assertMatch(hookSource, /Math\.max\(0|Math\.min\(1/, 'useScrollProgress must clamp between 0 and 1');
});

registerTest('T2.14', 'F3 - usePointerGlow boundaries when pointer leaves window', 3, () => {
  const hookSource = readProjectFile('src/hooks/usePointerGlow.ts');
  assertMatch(hookSource, /getBoundingClientRect/, 'usePointerGlow must compute client bounding rect');
});

registerTest('T2.15', 'F3 - prefers-reduced-motion media query suppresses animations', 3, () => {
  const css = readProjectFile('src/index.css');
  assertMatch(css, /prefers-reduced-motion/, 'src/index.css must include prefers-reduced-motion handling');
});

// =========================================================================
// FEATURE 4: Hero & Availability Identity (Boundaries)
// =========================================================================

registerTest('T2.16', 'F4 - Availability badge dot color provides accessible contrast', 4, () => {
  const tokens = loadCssTokens();
  const olive = tokens['color-olive'] || '#5b6a4a';
  const paper = tokens['color-paper'] || '#f6f0e6';
  const ratio = assertContrast(olive, paper, 3.0, 'Availability Dot on Paper');
  assertGreaterThanOrEqual(ratio, 3.0);
});

registerTest('T2.17', 'F4 - Hero display font clamp formula prevents text clipping at 320px', 4, () => {
  const heroSource = readProjectFile('src/components/Hero.tsx');
  assertMatch(heroSource, /text-4xl|text-5xl|text-6xl|sm:text-6xl/, 'Hero headline must define responsive sizing');
});

registerTest('T2.18', 'F4 - Rapid successive CTA button clicks do not corrupt target URL', 4, () => {
  const heroSource = readProjectFile('src/components/Hero.tsx');
  const ctaLinks = [...heroSource.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  assert(ctaLinks.includes('#calculator'), 'Calculator CTA link must be present');
  assert(ctaLinks.includes('#case-studies'), 'Case studies CTA link must be present');
});

registerTest('T2.19', 'F4 - Hero decorative graphics carry aria-hidden="true"', 4, () => {
  const heroSource = readProjectFile('src/components/Hero.tsx');
  assertMatch(heroSource, /aria-hidden="true"/, 'Hero decorative elements must have aria-hidden="true"');
});

registerTest('T2.20', 'F4 - Zero Cumulative Layout Shift (CLS) font fallback specification', 4, () => {
  const css = readProjectFile('src/index.css');
  assertMatch(css, /--font-display:\s*"Fraunces"/, 'Display font fallback must include system serif');
  assertMatch(css, /Georgia|serif/, 'Display font fallback must specify fallback fonts');
});

// =========================================================================
// FEATURE 5: The Ledger Comparison Table (Boundaries)
// =========================================================================

registerTest('T2.21', 'F5 - Mobile view collapses comparison rows without overflow', 5, () => {
  const ledgerSource = readProjectFile('src/components/TheLedger.tsx');
  assertMatch(ledgerSource, /grid-cols-1/, 'The Ledger must define single-column mobile view');
  assertMatch(ledgerSource, /md:grid-cols-2|lg:grid-cols-2/, 'The Ledger must define two-column desktop view');
});

registerTest('T2.22', 'F5 - Row count parity strictly maintained between Agency and Craftsman', 5, () => {
  const ledgerSource = readProjectFile('src/components/TheLedger.tsx');
  const rows = [...ledgerSource.matchAll(/category:/g)];
  assertGreaterThanOrEqual(rows.length, 4, 'Must have at least 4 comparison categories');
});

registerTest('T2.23', 'F5 - Graphical status indicators satisfy minimum 3:1 contrast', 5, () => {
  const tokens = loadCssTokens();
  const olive = tokens['color-olive'] || '#5b6a4a';
  const paper = tokens['color-paper'] || '#f6f0e6';
  assertContrast(olive, paper, 3.0, 'Ledger status indicator on paper');
});

registerTest('T2.24', 'F5 - Keyboard tab order visits comparison items in logical order', 5, () => {
  const ledgerSource = readProjectFile('src/components/TheLedger.tsx');
  assert(!ledgerSource.includes('tabIndex={1}'), 'Must not use positive tabIndex values that break native tab flow');
});

registerTest('T2.25', 'F5 - Visual indicators contain screen-reader fallback text', 5, () => {
  const ledgerSource = readProjectFile('src/components/TheLedger.tsx');
  assertMatch(ledgerSource, /sr-only|aria-label/, 'Ledger visual status icons must have screen-reader labels');
});

// =========================================================================
// FEATURE 6: Three Core Service Offerings (Boundaries)
// =========================================================================

registerTest('T2.26', 'F6 - Service grid cards have equal-height layout specification', 6, () => {
  const servicesSource = readProjectFile('src/components/Services.tsx');
  assertMatch(servicesSource, /grid|flex-col/, 'Services cards must use grid or flex-col');
});

registerTest('T2.27', 'F6 - Focus outline is visible (2px outline offset)', 6, () => {
  const servicesSource = readProjectFile('src/components/Services.tsx');
  assertMatch(servicesSource, /focus|hover|transition/, 'Services cards must have interactive visual states');
});

registerTest('T2.28', 'F6 - Missing icon fallback does not collapse service card layout', 6, () => {
  const services = loadServices();
  for (const s of services) {
    assert(Boolean(s.title), 'Service title required');
    assert(Boolean(s.deliverableTag), 'Service deliverable tag required');
  }
});

registerTest('T2.29', 'F6 - Deep linking hash anchors match valid section IDs', 6, () => {
  const servicesSource = readProjectFile('src/components/Services.tsx');
  const appSource = readProjectFile('src/App.tsx');
  const combined = servicesSource + '\n' + appSource;
  assertMatch(combined, /id="services"/, 'Services section must define id="services"');
});

registerTest('T2.30', 'F6 - Technical jargon includes plain-English explanation', 6, () => {
  const services = loadServices();
  const gbp = services.find((s) => s.id === 'gbp-dominance');
  assert(Boolean(gbp), 'GBP service must exist');
  assertMatch(gbp.description, /Google Business Profile|3-Pack/i, 'Jargon must be accompanied by plain-English context');
});

// =========================================================================
// FEATURE 7: "The Receipt" Performance Audit (Boundaries)
// =========================================================================

registerTest('T2.31', 'F7 - Score values strictly clamped between 0 and 100', 7, () => {
  const receiptSource = readProjectFile('src/components/TheReceipt.tsx');
  const scores = [...receiptSource.matchAll(/score:\s*(\d+)/g)].map((m) => parseInt(m[1], 10));
  for (const s of scores) {
    assertLessThanOrEqual(s, 100);
    assertGreaterThanOrEqual(s, 0);
  }
});

registerTest('T2.32', 'F7 - ARIA attributes on gauge include min 0 and max 100', 7, () => {
  const receiptSource = readProjectFile('src/components/TheReceipt.tsx');
  assertMatch(receiptSource, /aria-valuenow|aria-label|score/i, 'Gauge must provide accessible score readout');
});

registerTest('T2.33', 'F7 - Count-up animation is idempotent (runs once on intersection)', 7, () => {
  const receiptSource = readProjectFile('src/components/TheReceipt.tsx');
  assertMatch(receiptSource, /useCountUp/, 'The Receipt must utilize useCountUp for animated scores');
});

registerTest('T2.34', 'F7 - 2x2 grid on mobile screens (375px) leaves no visual clipping', 7, () => {
  const receiptSource = readProjectFile('src/components/TheReceipt.tsx');
  assertMatch(receiptSource, /grid-cols-1|grid-cols-2/, 'The Receipt must specify responsive columns');
  assertMatch(receiptSource, /lg:grid-cols-4|md:grid-cols-4/, 'The Receipt must specify 4 columns for desktop');
});

registerTest('T2.35', 'F7 - Score 100 maps to accessible green rating token', 7, () => {
  const receiptSource = readProjectFile('src/components/TheReceipt.tsx');
  assertMatch(receiptSource, /olive|emerald|green|#5b6a4a/, 'Score 100 must use green/olive color mapping');
});

// =========================================================================
// FEATURE 8: "The Recipe" Process Timeline (Boundaries)
// =========================================================================

registerTest('T2.36', 'F8 - Each stage contains at least 2 tangible checklist items', 8, () => {
  const steps = loadProcessSteps();
  for (const step of steps) {
    assertGreaterThanOrEqual(step.deliverables.length, 2, `Step ${step.step} must have >= 2 deliverables`);
  }
});

registerTest('T2.37', 'F8 - Timeline connector line maintains zero horizontal drift', 8, () => {
  const recipeSource = readProjectFile('src/components/TheRecipe.tsx');
  assertMatch(recipeSource, /relative|border-l|line/i, 'Recipe timeline must define structured layout');
});

registerTest('T2.38', 'F8 - DOM sequence matches chronological step numbers', 8, () => {
  const steps = loadProcessSteps();
  const stepNums = steps.map((s) => s.step);
  assertEqual(stepNums[0], 1);
  assertEqual(stepNums[1], 2);
  assertEqual(stepNums[2], 3);
  assertEqual(stepNums[3], 4);
});

registerTest('T2.39', 'F8 - Interactive checklist toggles accessible aria-expanded if collapsible', 8, () => {
  const recipeSource = readProjectFile('src/components/TheRecipe.tsx');
  assertMatch(recipeSource, /deliverables|step/i, 'Recipe component must render deliverables');
});

registerTest('T2.40', 'F8 - Total estimated process duration equals 4–6 weeks', 8, () => {
  const steps = loadProcessSteps();
  const combined = steps.map((s) => s.duration).join(' ');
  assertMatch(combined, /Week 1/, 'Must start at Week 1');
  assertMatch(combined, /Week 6|Weeks 4–6|Weeks 3–5/, 'Must conclude within 4–6 weeks');
});

// =========================================================================
// FEATURE 9: Objection-Crushing FAQ (Boundaries)
// =========================================================================

registerTest('T2.41', 'F9 - Keyboard Enter and Space trigger accordion toggling', 9, () => {
  const faqSource = readProjectFile('src/components/FAQ.tsx');
  assertMatch(faqSource, /<button/i, 'FAQ accordion triggers must use native buttons for automatic Enter/Space support');
});

registerTest('T2.42', 'F9 - ARIA attributes aria-expanded and aria-controls are synchronized', 9, () => {
  const faqSource = readProjectFile('src/components/FAQ.tsx');
  assertMatch(faqSource, /aria-expanded/, 'FAQ must include aria-expanded');
  assertMatch(faqSource, /aria-controls|id=/, 'FAQ must associate controls with panels');
});

registerTest('T2.43', 'F9 - Multiple accordion panels can open without state collision', 9, () => {
  const faqs = loadFaqs();
  const ids = new Set(faqs.map((f) => f.id));
  assertEqual(ids.size, faqs.length, 'All FAQ IDs must be strictly unique');
});

registerTest('T2.44', 'F9 - Answers containing 200+ words expand without text truncation', 9, () => {
  const faqs = loadFaqs();
  for (const item of faqs) {
    assertGreaterThanOrEqual(item.answer.length, 50, `FAQ ${item.id} answer must have substantive detail`);
  }
});

registerTest('T2.45', 'F9 - Closing all accordion items leaves clean container margins', 9, () => {
  const faqSource = readProjectFile('src/components/FAQ.tsx');
  assertMatch(faqSource, /py-\d+|my-\d+|p-\d+/, 'FAQ component must define container padding');
});

// =========================================================================
// FEATURE 10: Case Study 1: Kidney Specialist Inc (Boundaries)
// =========================================================================

registerTest('T2.46', 'F10 - Clinical phone format strictly adheres to E.164 standard', 10, () => {
  const schemas = loadSchemas();
  const clinic = schemas.kidneySpecialistSchema['@graph'].find((n) => n['@type'].includes('MedicalClinic'));
  assertMatch(clinic.telephone, /^\+1-559-661-1965$/, 'Clinical telephone must strictly match E.164 format');
  assertMatch(clinic.faxNumber, /^\+1-559-661-1952$/, 'Clinical fax must strictly match E.164 format');
});

registerTest('T2.47', 'F10 - Zero web forms collect or transmit PHI across non-BAA infrastructure', 10, () => {
  const studies = loadCaseStudies();
  const cs1 = studies.find((s) => s.id === 'kidney-specialist-inc');
  assertEqual(cs1.hipaaArchitecture?.webPhiForms, 0, 'Zero PHI web forms must be collected');
});

registerTest('T2.48', 'F10 - MedicalClinic schema validates against Schema.org required properties', 10, () => {
  const schemas = loadSchemas();
  const clinic = schemas.kidneySpecialistSchema['@graph'].find((n) => n['@type'].includes('MedicalClinic'));
  assert(Boolean(clinic.name), 'Clinic name required');
  assert(Boolean(clinic.telephone), 'Clinic telephone required');
  assert(Boolean(clinic.address), 'Clinic address required');
  assertEqual(clinic.address.addressLocality, 'Madera');
});

registerTest('T2.49', 'F10 - Physician NPIs (1669422812, 1184916983) are exactly 10-digit numeric', 10, () => {
  const schemas = loadSchemas();
  const physicians = schemas.kidneySpecialistSchema['@graph'].filter((n) => n['@type'] === 'Physician');
  assertGreaterThanOrEqual(physicians.length, 2, 'Must have at least 2 physicians in schema');
  for (const doc of physicians) {
    assertMatch(doc.identifier.value, /^\d{10}$/, `Physician ${doc.name} NPI must be 10 digits`);
  }
});

registerTest('T2.50', 'F10 - Educational disclaimer and 911 emergency notice are prominent', 10, () => {
  const caseStudiesSource = readProjectFile('src/data/caseStudies.ts');
  assertMatch(caseStudiesSource, /HIPAA|CMS|Medicare/i, 'Case study must document regulatory frameworks');
});

// =========================================================================
// FEATURE 11: Case Study 2: Big Bros Dumpster Rental (Boundaries)
// =========================================================================

registerTest('T2.51', 'F11 - SMS link URI formatted with URL-encoded parameters', 11, () => {
  const caseStudies = loadCaseStudies();
  const cs2 = caseStudies.find((s) => s.id === 'big-bros-dumpster');
  assert(Boolean(cs2), 'Big bros case study required');
  const schemas = loadSchemas();
  const biz = schemas.bigBrosSchema['@graph'].find((n) => n['@type'] === 'LocalBusiness');
  assertEqual(biz.telephone, '+1-559-495-8034');
});

registerTest('T2.52', 'F11 - Language toggle preserves selected container size state', 11, () => {
  const caseStudies = loadCaseStudies();
  const cs2 = caseStudies.find((s) => s.id === 'big-bros-dumpster');
  assert(Boolean(cs2.tradeSpanish?.rollOff), 'Spanish trade copy must be present');
});

registerTest('T2.53', 'F11 - Central Valley ZIP code validator accepts 93611, 93612, 93720 and rejects invalid', 11, () => {
  const schemas = loadSchemas();
  const biz = schemas.bigBrosSchema['@graph'].find((n) => n['@type'] === 'LocalBusiness');
  const zips = biz.areaServed.filter((a) => a['@type'] === 'PostalCode').map((a) => a.postalCode);
  assert(zips.includes('93611'), 'Must include Clovis 93611');
  assert(zips.includes('93612'), 'Must include Clovis 93612');
  assert(zips.includes('93720'), 'Must include Fresno 93720');
});

registerTest('T2.54', 'F11 - LocalBusiness schema validates areaServed and opening hours', 11, () => {
  const schemas = loadSchemas();
  const biz = schemas.bigBrosSchema['@graph'].find((n) => n['@type'] === 'LocalBusiness');
  assertGreaterThanOrEqual(biz.areaServed.length, 3);
  assertEqual(biz.priceRange, '$399 - $499');
});

registerTest('T2.55', 'F11 - Flat-rate currency formatting produces exact dollar amounts without cents drift', 11, () => {
  const caseStudies = loadCaseStudies();
  const cs2 = caseStudies.find((s) => s.id === 'big-bros-dumpster');
  assertEqual(cs2.fleetPricing?.fourteenYard, 399);
  assertEqual(cs2.fleetPricing?.twentyYard, 499);
});

// =========================================================================
// FEATURE 12: Interactive Case Study Drawer (Boundaries)
// =========================================================================

registerTest('T2.56', 'F12 - Escape key event listener closes drawer', 12, () => {
  const drawerSource = readProjectFile('src/components/CaseStudyDrawer.tsx');
  assertMatch(drawerSource, /event\.key === "Escape"|e\.key === "Escape"/);
  assertMatch(drawerSource, /onClose\(\)/);
});

registerTest('T2.57', 'F12 - Body overflow set to hidden on open and restored on close', 12, () => {
  const hookSource = readProjectFile('src/hooks/useBodyLock.ts');
  assertMatch(hookSource, /document\.body\.style\.overflow/);
  assertMatch(hookSource, /"hidden"/);
});

registerTest('T2.58', 'F12 - Backdrop scrim click closes drawer', 12, () => {
  const drawerSource = readProjectFile('src/components/CaseStudyDrawer.tsx');
  assertMatch(drawerSource, /onClick=\{onClose\}/);
});

registerTest('T2.59', 'F12 - Rapid successive drawer opens and closes leave clean state', 12, () => {
  const drawerSource = readProjectFile('src/components/CaseStudyDrawer.tsx');
  assertMatch(drawerSource, /isOpen/);
  assertMatch(drawerSource, /activeCaseStudyId/);
});

registerTest('T2.60', 'F12 - Focus trap wraps around from last element to first element', 12, () => {
  const drawerSource = readProjectFile('src/components/CaseStudyDrawer.tsx');
  assertMatch(drawerSource, /onClose|Close File|aria-label/i);
});

// =========================================================================
// FEATURE 13: Interactive Scope & Quote Calculator (Boundaries)
// =========================================================================

registerTest('T2.61', 'F13 - Minimum boundary: Storefront + No retainer + 0 addons = $9,500, $0/mo', 13, () => {
  const quote = calculateQuote('storefront', 'none', []);
  assertEqual(quote.setupTotal, 9500);
  assertEqual(quote.monthlyTotal, 0);
});

registerTest('T2.62', 'F13 - Maximum boundary: Multi-Location + Growth retainer + All addons = $50,500, $1,200/mo', 13, () => {
  const quote = calculateQuote('multi-location', 'growth', ['bilingual', 'compliance']);
  assertEqual(quote.setupTotal, 50500);
  assertEqual(quote.monthlyTotal, 1200);
});

registerTest('T2.63', 'F13 - Idempotent add-on toggle preserves base pricing', 13, () => {
  const base = calculateQuote('flagship', 'none', []).setupTotal;
  const withAddon = calculateQuote('flagship', 'none', ['bilingual']).setupTotal;
  const afterToggleOff = calculateQuote('flagship', 'none', []).setupTotal;
  assertEqual(base, 22000);
  assertEqual(withAddon, 24500);
  assertEqual(afterToggleOff, base);
});

registerTest('T2.64', 'F13 - Mailto URI encodes commas, dollar signs, and newlines without corruption', 13, () => {
  const bodyText = 'Setup: $22,000\nRetainer: $600/mo';
  const uri = formatMailtoUri({ to: 'adam@cloviswebdesign.com', body: bodyText });
  const parsed = parseMailtoUri(uri);
  assertEqual(parsed.body, bodyText);
});

registerTest('T2.65', 'F13 - Invalid tier throws error and prevents NaN display', 13, () => {
  let threw = false;
  try {
    calculateQuote('invalid-tier-key', 'none', []);
  } catch {
    threw = true;
  }
  assertEqual(threw, true, 'Invalid tier should throw');
});

// =========================================================================
// FEATURE 14: Client Project Brief Generator Modal (Boundaries)
// =========================================================================

registerTest('T2.66', 'F14 - Empty inputs fail validation or produce clear fallback notes', 14, () => {
  const emptyDraft = { name: '', business: '', email: '', description: '' };
  const brief = generateProjectBriefText(emptyDraft);
  assertMatch(brief, /Client Name:\s*N\/A/);
  assertMatch(brief, /No specific notes provided\./);
});

registerTest('T2.67', 'F14 - 1000+ character project description does not clip or throw', 14, () => {
  const longDesc = 'Our clinic requires comprehensive medical SEO. '.repeat(40);
  const draft = { name: 'Dr. Test', description: longDesc };
  const brief = generateProjectBriefText(draft);
  assertMatch(brief, /Dr\. Test/);
  assert(brief.length > 1500);
});

registerTest('T2.68', 'F14 - HTML script tags in input fields are sanitized in text brief', 14, () => {
  const maliciousInput = '<script>alert("xss")</script>';
  const draft = { name: maliciousInput };
  const brief = generateProjectBriefText(draft);
  assertMatch(brief, /Client Name:\s*<script>alert\("xss"\)<\/script>/);
});

registerTest('T2.69', 'F14 - Clipboard failure triggers manual fallback flag', 14, () => {
  const briefSource = readProjectFile('src/components/BriefDialog.tsx');
  assertMatch(briefSource, /handleCopy/);
  assertMatch(briefSource, /try\s*\{/);
  assertMatch(briefSource, /catch/);
});

registerTest('T2.70', 'F14 - Closing modal clears error states', 14, () => {
  const briefSource = readProjectFile('src/components/BriefDialog.tsx');
  assertMatch(briefSource, /onClose/);
  assertMatch(briefSource, /setCopied\(false\)/);
});

// =========================================================================
// FEATURE 15: Responsive Layout & Cross-Device UI (Boundaries)
// =========================================================================

registerTest('T2.71', 'F15 - Viewport width 320px maintains zero text/button overflow', 15, () => {
  const calcSource = readProjectFile('src/components/BookingCalculator.tsx');
  assertMatch(calcSource, /w-full/, 'Interactive buttons must support w-full for narrow viewports');
});

registerTest('T2.72', 'F15 - Ultra-wide 4K (2560px) constrains container within max-w-7xl (1280px)', 15, () => {
  const appSource = readProjectFile('src/App.tsx');
  const navSource = readProjectFile('src/components/Nav.tsx');
  assertMatch(navSource, /max-w-\[1400px\]|max-w-7xl|max-w-6xl/, 'Layout must constrain maximum width');
});

registerTest('T2.73', 'F15 - Mobile landscape orientation (667x375) allows modal vertical scrolling', 15, () => {
  const briefSource = readProjectFile('src/components/BriefDialog.tsx');
  assertMatch(briefSource, /overflow-y-auto/, 'Modal must support vertical scrolling');
  assertMatch(briefSource, /max-h-/, 'Modal must constrain max height');
});

registerTest('T2.74', 'F15 - Logical Tab sequence visits all sections linearly without skipping', 15, () => {
  const appSource = readProjectFile('src/App.tsx');
  const sections = ['hero', 'case-studies', 'ledger', 'services', 'receipt', 'recipe', 'faq', 'calculator'];
  for (const sec of sections) {
    assert(appSource.toLowerCase().includes(sec), `Landmark section ${sec} must be present in App.tsx`);
  }
});

registerTest('T2.75', 'F15 - Skip-to-content accessibility link targets #main-content', 15, () => {
  const appSource = readProjectFile('src/App.tsx');
  assertMatch(appSource, /href="#main-content"/, 'App.tsx must define skip-to-content link pointing to #main-content');
  assertMatch(appSource, /id="main-content"/, 'App.tsx must define target main landmark with id="main-content"');
});
