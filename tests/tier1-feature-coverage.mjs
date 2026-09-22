// Tier 1: Comprehensive Feature Coverage (Features 1–15)
// Minimum 5 distinct test cases per feature = 75 test cases
// Refactored for authentic source code inspection against src/

import {
  assert,
  assertEqual,
  assertMatch,
  assertNotMatch,
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
  SPEC_PRICING,
  loadCalculator,
  calculateQuote,
  formatMailtoUri,
  formatSmsUri,
  SCOPE_TIERS,
  RETAINER_TIERS,
  LAUNCH_PROMO,
  parseMailtoUri,
  generateProjectBriefText,
  loadFixture,
} from './test-harness.mjs';

export const tier1Tests = [];

function registerTest(id, name, featureId, fn) {
  tier1Tests.push({ id, name, featureId, fn });
}

// =========================================================================
// FEATURE 1: Central Valley Craftsman Tone & Copy
// =========================================================================

registerTest('T1.01', 'F1 - Hero positioning tagline matches authoritative craftsman copy', 1, () => {
  const heroSource = readProjectFile('src/components/Hero.tsx');
  assertMatch(heroSource, /Fortune 500 craft\.[^]*?Main Street soul\./i, 'Hero must contain authoritative positioning tagline');
});

registerTest('T1.02', 'F1 - Central Valley geographic anchors (Clovis, Fresno, Madera) are present', 1, () => {
  const heroSource = readProjectFile('src/components/Hero.tsx');
  const footerSource = readProjectFile('src/components/Footer.tsx');
  const combined = heroSource + '\n' + footerSource;
  assertMatch(combined, /Clovis/i, 'Clovis anchor must be present');
  assertMatch(combined, /Fresno/i, 'Fresno anchor must be present');
  assertMatch(combined, /Madera/i, 'Madera anchor must be present');
});

registerTest('T1.03', 'F1 - Prohibited corporate buzzwords are excluded from site copy', 1, () => {
  const prohibitedBuzzwords = [
    /\bsynerg(y|ize)\b/i,
    /\bparadigm shift\b/i,
    /\bleverage best-in-class\b/i,
    /\bscalable ecosystem synergies\b/i,
    /\brockstar guru\b/i,
  ];
  const filesToCheck = [
    'src/components/Hero.tsx',
    'src/components/TheLedger.tsx',
    'src/components/Services.tsx',
    'src/components/FAQ.tsx',
    'src/data/caseStudies.ts',
  ];
  for (const filePath of filesToCheck) {
    const content = readProjectFile(filePath);
    for (const pattern of prohibitedBuzzwords) {
      assertNotMatch(content, pattern, `Prohibited buzzword pattern ${pattern} detected in ${filePath}`);
    }
  }
});

registerTest('T1.04', 'F1 - Craftsman contact email points to adam@cloviswebdesign.com', 1, () => {
  const footerSource = readProjectFile('src/components/Footer.tsx');
  const calcSource = readProjectFile('src/data/calculator.ts');
  assertMatch(footerSource, /adam@cloviswebdesign\.com/, 'Footer must contain adam@cloviswebdesign.com');
  assertMatch(calcSource, /adam@cloviswebdesign\.com/, 'Calculator must default to adam@cloviswebdesign.com');
});

registerTest('T1.05', 'F1 - Honest timeline and ownership copy verified', 1, () => {
  const processSource = readProjectFile('src/data/process.ts');
  const faqSource = readProjectFile('src/data/faq.ts');
  assertMatch(processSource, /week/i, 'Process must state a timeline');
  assertMatch(faqSource, /day one/i, 'FAQ must promise day-one ownership');
});

registerTest('T1.06', 'F2 - Core stack dependencies include React 19 and TypeScript', 2, () => {
  const pkg = JSON.parse(readProjectFile('package.json'));
  assertMatch(pkg.dependencies.react, /^(\^|~)?19/, 'React must be version 19');
  assertMatch(pkg.dependencies['react-dom'], /^(\^|~)?19/, 'React DOM must be version 19');
  assert(Boolean(pkg.devDependencies?.typescript || pkg.dependencies?.typescript), 'TypeScript must be included');
});

registerTest('T1.07', 'F2 - Build scripts include dev, build, and preview', 2, () => {
  const pkg = JSON.parse(readProjectFile('package.json'));
  assertEqual(pkg.scripts?.dev, 'vite', 'Dev script must be vite');
  assertMatch(pkg.scripts?.build, /vite build/, 'Build script must run vite build');
  assertMatch(pkg.scripts?.preview, /vite preview/, 'Preview script must run vite preview');
});

registerTest('T1.08', 'F2 - Vite configuration includes Tailwind CSS v4 and React plugins', 2, () => {
  const viteConfig = readProjectFile('vite.config.ts');
  assertMatch(viteConfig, /@tailwindcss\/vite/, 'Tailwind CSS v4 plugin must be configured in vite.config.ts');
  assertMatch(viteConfig, /@vitejs\/plugin-react/, 'React plugin must be configured in vite.config.ts');
});

registerTest('T1.09', 'F2 - TypeScript compiler options enforce strict mode', 2, () => {
  const rawTsConfig = readProjectFile('tsconfig.json');
  const cleanTsConfig = rawTsConfig.replace(/^\s*\/\*.*?\*\//gm, '');
  const tsConfig = JSON.parse(cleanTsConfig);
  assertEqual(tsConfig.compilerOptions?.strict, true, 'TypeScript compilerOptions.strict must be true');
});

registerTest('T1.10', 'F2 - HTML entry point contains valid viewport meta and #root mount container', 2, () => {
  const html = readProjectFile('index.html');
  assertMatch(html, /<meta name="viewport"[^>]*content="[^"]*width=device-width,\s*initial-scale=1\.0/);
  assertMatch(html, /<div id="root"><\/div>/);
});

// =========================================================================
// FEATURE 3: Design System & Token Integration
// =========================================================================

registerTest('T1.11', 'F3 - Warm paper canvas background token equals #f6f0e6', 3, () => {
  const tokens = loadCssTokens();
  assertEqual(tokens['color-paper']?.toLowerCase(), '#f6f0e6', 'Paper token in src/index.css must be #f6f0e6');
});

registerTest('T1.12', 'F3 - Mineral ink contrast text token equals #221d17', 3, () => {
  const tokens = loadCssTokens();
  assertEqual(tokens['color-ink']?.toLowerCase(), '#221d17', 'Ink token in src/index.css must be #221d17');
});

registerTest('T1.13', 'F3 - Brand accent palette contains terracotta clay (#b0503a) and ember (#d2743f)', 3, () => {
  const tokens = loadCssTokens();
  assertEqual(tokens['color-clay']?.toLowerCase(), '#b0503a', 'Clay token must match #b0503a');
  assertEqual(tokens['color-ember']?.toLowerCase(), '#d2743f', 'Ember token must match #d2743f');
  assertEqual(tokens['color-olive']?.toLowerCase(), '#5b6a4a', 'Olive token must match #5b6a4a');
  assertEqual(tokens['color-slate-blue']?.toLowerCase(), '#4c5a66', 'Slate blue token must match #4c5a66');
});

registerTest('T1.14', 'F3 - Display and sans font families configured for Fraunces and Inter', 3, () => {
  const tokens = loadCssTokens();
  assertMatch(tokens['font-display'] || '', /Fraunces/i, 'Display font in src/index.css must include Fraunces');
  assertMatch(tokens['font-sans'] || '', /Inter/i, 'Sans font in src/index.css must include Inter');
});

registerTest('T1.15', 'F3 - Micro-interaction hooks interface contracts are defined', 3, () => {
  const hookFiles = [
    'src/hooks/useRevealObserver.ts',
    'src/hooks/usePointerGlow.ts',
    'src/hooks/useCountUp.ts',
    'src/hooks/useScrollProgress.ts',
    'src/hooks/useBodyLock.ts',
  ];
  for (const hookFile of hookFiles) {
    const hookCode = readProjectFile(hookFile);
    assertMatch(hookCode, /export (const|function) use/, `${hookFile} must export hook function`);
  }
});

// =========================================================================
// FEATURE 4: Hero & Availability Identity
// =========================================================================

registerTest('T1.16', 'F4 - Hero displays headline and core subheadline', 4, () => {
  const heroCode = readProjectFile('src/components/Hero.tsx');
  assertMatch(heroCode, /Fortune 500 craft/i);
  assertMatch(heroCode, /Central Valley businesses/i);
});

registerTest('T1.17', 'F4 - Hero leads with the bounded launch offer', 4, () => {
  const heroCode = readProjectFile('src/components/Hero.tsx');
  assertMatch(heroCode, /Launch offer/i);
  assertMatch(heroCode, /LAUNCH_PROMO\.blurb/, 'Badge must read from the single promo source');
  const calc = readProjectFile('src/data/calculator.ts');
  assertMatch(calc, /seats:\s*[1-9]/, 'Promo must be limited to a seat count');
});

registerTest('T1.18', 'F4 - Hero attributes craftsman identity to Adam Youssef', 4, () => {
  const heroCode = readProjectFile('src/components/Hero.tsx');
  assertMatch(heroCode, /Adam Youssef/);
  assertMatch(heroCode, /Clovis,\s*(CA|California)/);
});

registerTest('T1.19', 'F4 - Hero primary CTAs link to Scope Calculator and Case Studies', 4, () => {
  const heroCode = readProjectFile('src/components/Hero.tsx');
  assertMatch(heroCode, /href="#calculator"/);
  assertMatch(heroCode, /href="#case-studies"/);
});

registerTest('T1.20', 'F4 - Hero displays core proof metric tags (Lighthouse 100, Day-One Ownership)', 4, () => {
  const heroCode = readProjectFile('src/components/Hero.tsx');
  assertMatch(heroCode, /useCountUp\(100/, 'Performance score must count up to 100');
  assertMatch(heroCode, /Core Web Vitals/);
  assertMatch(heroCode, /100%/);
  assertMatch(heroCode, /Asset Ownership/);
  assertMatch(heroCode, /1 Week/, 'Hero must state the entry build timeline');
});

registerTest('T1.21', 'F5 - The Ledger presents two contrasting delivery models', 5, () => {
  const ledgerCode = readProjectFile('src/components/TheLedger.tsx');
  assertMatch(ledgerCode, /agency/i);
  assertMatch(ledgerCode, /Adam Youssef/i);
});

registerTest('T1.22', 'F5 - Ledger contrasts a queue with direct access to the builder', 5, () => {
  const ledgerCode = readProjectFile('src/components/TheLedger.tsx');
  assertMatch(ledgerCode, /Adam Youssef|picks up|answers/i);
  assertMatch(ledgerCode, /559\)?[ -]?575[ -]?3014/);
  assertMatch(ledgerCode, /queue|wait|handed/i);
});

registerTest('T1.23', 'F5 - Ledger contrasts lock-in with day-one ownership', 5, () => {
  const ledgerCode = readProjectFile('src/components/TheLedger.tsx');
  assertMatch(ledgerCode, /stop paying|their system|goes dark/i);
  assertMatch(ledgerCode, /in your name/i);
  assertMatch(ledgerCode, /day one/i);
});

registerTest('T1.24', 'F5 - Ledger argues without quoting a single figure', 5, () => {
  const ledgerCode = readProjectFile('src/components/TheLedger.tsx');
  assertNotMatch(ledgerCode, /\$[0-9]/, 'The money angle was deliberately cut');
  const rows = ledgerCode.match(/category:/g) || [];
  assertGreaterThanOrEqual(rows.length, 5, 'Ledger must still make its full case');
});

registerTest('T1.25', 'F5 - Ledger comparison container supports interactive pointer glow', 5, () => {
  const ledgerCode = readProjectFile('src/components/TheLedger.tsx');
  assertMatch(ledgerCode, /usePointerGlow/);
  assertMatch(ledgerCode, /glowRef/);
});

// =========================================================================
// FEATURE 6: Three Core Service Offerings
// =========================================================================

registerTest('T1.26', 'F6 - Exactly three core service offerings are defined', 6, () => {
  const services = loadServices();
  assertEqual(services.length, 3, 'Must have exactly 3 core service offerings');
  assertEqual(services[0].id, 'bespoke-web');
  assertEqual(services[1].id, 'gbp-dominance');
  assertEqual(services[2].id, 'geo-seo-radar');
});

registerTest('T1.27', 'F6 - Service 1 covers Bespoke Web Design with sub-second performance', 6, () => {
  const services = loadServices();
  const service1 = services.find((s) => s.id === 'bespoke-web');
  assert(Boolean(service1), 'Bespoke web service must exist');
  assertEqual(service1.subsecondLoad, true);
  assertEqual(service1.zeroCmsLockin, true);
});

registerTest('T1.28', 'F6 - Service 2 covers Google Business Profile (GBP) 3-Pack Dominance', 6, () => {
  const services = loadServices();
  const service2 = services.find((s) => s.id === 'gbp-dominance');
  assert(Boolean(service2), 'GBP service must exist');
  assertEqual(service2.threePackRanking, true);
  assertEqual(service2.reviewDefense, true);
});

registerTest('T1.29', 'F6 - Service 3 covers Geo/SEO Radar with hyper-local radius pages', 6, () => {
  const services = loadServices();
  const service3 = services.find((s) => s.id === 'geo-seo-radar');
  assert(Boolean(service3), 'Geo/SEO Radar service must exist');
  assertEqual(service3.radiusLandingPages, true);
});

registerTest('T1.30', 'F6 - Each service offering defines concrete deliverable highlights', 6, () => {
  const services = loadServices();
  for (const service of services) {
    assert(Array.isArray(service.highlights) && service.highlights.length >= 3, `Service ${service.id} must have >= 3 highlights`);
    for (const h of service.highlights) {
      assert(h.length > 5, `Highlight "${h}" must have substantive content`);
    }
  }
});

// =========================================================================
// FEATURE 7: "The Receipt" Performance Audit
// =========================================================================

registerTest('T1.31', 'F7 - The Receipt renders all 4 Google Lighthouse audit categories', 7, () => {
  const receiptCode = readProjectFile('src/components/TheReceipt.tsx');
  assertMatch(receiptCode, /Performance/);
  assertMatch(receiptCode, /Accessibility/);
  assertMatch(receiptCode, /Best Practices/);
  assertMatch(receiptCode, /SEO/);
});

registerTest('T1.32', 'F7 - Target score for all 4 audit categories equals 100', 7, () => {
  const receiptCode = readProjectFile('src/components/TheReceipt.tsx');
  const scores = [...receiptCode.matchAll(/score:\s*(\d+)/g)].map((m) => parseInt(m[1], 10));
  assert(scores.length >= 4, 'Must define at least 4 scores in The Receipt');
  for (const score of scores) {
    assertEqual(score, 100, 'Each scorecard score must equal 100');
  }
});

registerTest('T1.33', 'F7 - Real-world mobile test disclosure mentions throttled Android in Madera', 7, () => {
  const receiptCode = readProjectFile('src/components/TheReceipt.tsx');
  assertMatch(receiptCode, /throttled 4G Android/i);
  assertMatch(receiptCode, /Madera/i);
});

registerTest('T1.34', 'F7 - Performance gauges render SVG circular progress and numeric readout', 7, () => {
  const receiptCode = readProjectFile('src/components/TheReceipt.tsx');
  assertMatch(receiptCode, /<svg/);
  assertMatch(receiptCode, /<circle/);
  assertMatch(receiptCode, /strokeDasharray/);
  assertMatch(receiptCode, /strokeDashoffset/);
});

registerTest('T1.35', 'F7 - Core Web Vitals metrics include sub-second LCP and zero CLS', 7, () => {
  const receiptCode = readProjectFile('src/components/TheReceipt.tsx');
  assertMatch(receiptCode, /LCP/);
  assertMatch(receiptCode, /CLS/);
  assertMatch(receiptCode, /0\.6s|<600ms|0\.0/);
});

// =========================================================================
// FEATURE 8: "The Recipe" Process Timeline
// =========================================================================

registerTest('T1.36', 'F8 - Process timeline renders exactly 4 sequential craftsman stages', 8, () => {
  const steps = loadProcessSteps();
  assertEqual(steps.length, 4, 'Must have exactly 4 process stages');
});

registerTest('T1.37', 'F8 - Stage 1 provides Discovery and Strategy deliverables', 8, () => {
  const steps = loadProcessSteps();
  const stage1 = steps.find((s) => s.step === 1 || s.number === '01');
  assert(Boolean(stage1), 'Stage 1 must exist');
  assertMatch(stage1.title, /Discovery/i);
  assert(stage1.deliverables.some((d) => /plain-English/i.test(d)), 'Stage 1 deliverables must include plain-English blueprint');
});

registerTest('T1.38', 'F8 - Stage 2 provides Design Direction and Real Copywriting deliverables', 8, () => {
  const steps = loadProcessSteps();
  const stage2 = steps.find((s) => s.step === 2 || s.number === '02');
  assert(Boolean(stage2), 'Stage 2 must exist');
  assertMatch(stage2.title, /Design Direction/i);
  assert(stage2.deliverables.some((d) => /copy/i.test(d)), 'Stage 2 deliverables must include real copy');
});

registerTest('T1.39', 'F8 - Stage 3 provides Hand-Coded React/TypeScript build deliverables', 8, () => {
  const steps = loadProcessSteps();
  const stage3 = steps.find((s) => s.step === 3 || s.number === '03');
  assert(Boolean(stage3), 'Stage 3 must exist');
  assert(stage3.deliverables.some((d) => /zero CMS lock-in|React/i.test(d)), 'Stage 3 deliverables must specify zero CMS lock-in');
});

registerTest('T1.40', 'F8 - Stage 4 provides Launch and 90-Day tuning deliverables', 8, () => {
  const steps = loadProcessSteps();
  const stage4 = steps.find((s) => s.step === 4 || s.number === '04');
  assert(Boolean(stage4), 'Stage 4 must exist');
  assert(stage4.deliverables.some((d) => /90\s*days/i.test(d)), 'Stage 4 deliverables must include 90-day warranty/tuning');
});

// =========================================================================
// FEATURE 9: Objection-Crushing FAQ
// =========================================================================

registerTest('T1.41', 'F9 - FAQ disarms code and domain ownership objections', 9, () => {
  const faqs = loadFaqs();
  const item = faqs.find((f) => f.id === 'code-ownership' || /who owns/i.test(f.question));
  assert(Boolean(item), 'Code ownership FAQ must exist');
  assertMatch(item.answer, /completely|entirely|all of it/i);
  assertMatch(item.answer, /day one/i);
  assertMatch(item.answer, /in your name/i);
});

registerTest('T1.42', 'F9 - FAQ disarms the copywriting burden objection', 9, () => {
  const faqs = loadFaqs();
  const item = faqs.find((f) => f.id === 'copywriting-burden' || /write all the words/i.test(f.question));
  assert(Boolean(item), 'Copywriting burden FAQ must exist');
  assertMatch(item.answer, /forty-five minutes|45 minutes/i);
  assertMatch(item.answer, /I write/i, 'Must be first person singular');
});

registerTest('T1.43', 'F9 - Integrations answer promises a check, not unverified platforms', 9, () => {
  const faqs = loadFaqs();
  const item = faqs.find((f) => f.id === 'third-party-integrations');
  assert(Boolean(item), 'Integrations FAQ must exist');
  assertMatch(item.answer, /confirm/i, 'Must promise to confirm before taking money');
  assertNotMatch(item.answer, /Kareo|Epic|Mindbody|Clover/i,
    'Must not name platforms whose support has not been verified');
});

registerTest('T1.44', 'F9 - FAQ answers what happens when something breaks', 9, () => {
  const faqs = loadFaqs();
  const item = faqs.find((f) => f.id === 'warranty-and-maintenance' || /breaks after launch/i.test(f.question));
  assert(Boolean(item), 'Maintenance FAQ must exist');
  assertMatch(item.answer, /ninety days|90 days|90-day/i);
  assertMatch(item.answer, /text me/i, 'Contact route must be call or text');
});

registerTest('T1.45', 'F9 - FAQ items support expandable accordion interaction state', 9, () => {
  const faqComponent = readProjectFile('src/components/FAQ.tsx');
  assertMatch(faqComponent, /useState/);
  assertMatch(faqComponent, /activeId|openId|toggle/i);
  assertMatch(faqComponent, /aria-expanded/);
});

// =========================================================================
// FEATURE 10: Case Study 1: Kidney Specialist Inc
// =========================================================================

registerTest('T1.46', 'F10 - Case Study 1 references Kidney Specialist Inc in Madera & Fresno', 10, () => {
  const studies = loadCaseStudies();
  const cs1 = studies.find((s) => s.id === 'kidney-specialist-inc');
  assert(Boolean(cs1), 'Kidney Specialist case study must exist');
  assertEqual(cs1.client, 'Kidney Specialist Inc.');
  assertEqual(cs1.location, 'Madera & Fresno, CA');
});

registerTest('T1.47', 'F10 - Case Study 1 explicitly identifies Dr. Masood and Dr. Siddiqui', 10, () => {
  const studies = loadCaseStudies();
  const cs1 = studies.find((s) => s.id === 'kidney-specialist-inc');
  assert(Array.isArray(cs1.doctors), 'cs1.doctors must be an array');
  assert(cs1.doctors.some((d) => /Dr\. Sheikh Mohammad Masood/i.test(d)));
  assert(cs1.doctors.some((d) => /Dr\. Mohammed.*Siddiqui/i.test(d)));
});

registerTest('T1.48', 'F10 - Zero-HIPAA-liability fax-first and call-direct architecture documented', 10, () => {
  const studies = loadCaseStudies();
  const cs1 = studies.find((s) => s.id === 'kidney-specialist-inc');
  assertEqual(cs1.hipaaArchitecture?.referralFax, '(559) 661-1952');
  assertEqual(cs1.hipaaArchitecture?.schedulingPhone, '(559) 661-1965');
  assertEqual(cs1.hipaaArchitecture?.webPhiForms, 0);
});

registerTest('T1.49', 'F10 - WCAG 2.1 AA accessibility standards (12.6:1 contrast ratio) documented', 10, () => {
  const studies = loadCaseStudies();
  const cs1 = studies.find((s) => s.id === 'kidney-specialist-inc');
  const solutionText = cs1.solution || '';
  assertMatch(solutionText, /12\.6:1/);
  const contrast = assertContrast('#0f2942', '#ffffff', 7.0, 'Kidney Specialist Clinical Contrast');
  assertGreaterThanOrEqual(contrast, 12.0);
});

registerTest('T1.50', 'F10 - Schema.org fixture contains valid NPI 1356539423 and Madera address', 10, () => {
  const schemas = loadSchemas();
  const clinicNode = schemas.kidneySpecialistSchema['@graph'].find((node) => node['@type'].includes('MedicalClinic'));
  assert(Boolean(clinicNode), 'MedicalClinic node must exist in schema graph');
  assertEqual(clinicNode.identifier?.value, '1356539423');
  assertEqual(clinicNode.address?.addressLocality, 'Madera');
  assertEqual(clinicNode.address?.postalCode, '93637');
});

// =========================================================================
// FEATURE 11: Case Study 2: Big Bros Dumpster Rental
// =========================================================================

registerTest('T1.51', 'F11 - Case Study 2 references Big Bros Dumpster Rental and founders Ramirez', 11, () => {
  const studies = loadCaseStudies();
  const cs2 = studies.find((s) => s.id === 'big-bros-dumpster');
  assert(Boolean(cs2), 'Big Bros case study must exist');
  assertEqual(cs2.client, 'Big Bros Dumpster Rentals');
  assertMatch(cs2.founders || '', /Jessica.*William/i);
});

registerTest('T1.52', 'F11 - Geo-SEO landing page models cover Clovis, Fresno, and Fig Garden', 11, () => {
  const studies = loadCaseStudies();
  const cs2 = studies.find((s) => s.id === 'big-bros-dumpster');
  const solutionText = cs2.solution || '';
  assertMatch(solutionText, /clovis\.html/i);
  assertMatch(solutionText, /fresno\.html/i);
  assertMatch(solutionText, /fig-garden\.html/i);
});

registerTest('T1.53', 'F11 - Authentic Central Valley trade Spanish copy verified', 11, () => {
  const studies = loadCaseStudies();
  const cs2 = studies.find((s) => s.id === 'big-bros-dumpster');
  assertMatch(cs2.tradeSpanish?.rollOff || '', /Dómpers/i);
  assertMatch(cs2.tradeSpanish?.driveway || '', /Protección.*driveway/i);
  assertMatch(cs2.tradeSpanish?.appliances || '', /colchones/i);
});

registerTest('T1.54', 'F11 - Driveway protection and flat-rate offering documented without client prices', 11, () => {
  const studies = loadCaseStudies();
  const cs2 = studies.find((s) => s.id === 'big-bros-dumpster');
  assertEqual(cs2.fleetPricing, undefined);
  const blob = JSON.stringify(cs2);
  assertMatch(blob, /driveway/i);
  assertMatch(blob, /flat-rate/i);
  assertEqual(/\$[0-9]/.test(blob), false);
});

registerTest('T1.55', 'F11 - Schema fixture contains (559) 495-8034 and Clovis/Fresno ZIPs', 11, () => {
  const schemas = loadSchemas();
  const bizNode = schemas.bigBrosSchema['@graph'].find((node) => node['@type'] === 'LocalBusiness');
  assert(Boolean(bizNode), 'LocalBusiness node must exist in bigBrosSchema');
  assertEqual(bizNode.telephone, '+1-559-495-8034');
  const zips = bizNode.areaServed.filter((item) => item['@type'] === 'PostalCode').map((item) => item.postalCode);
  assert(zips.includes('93611'), 'Clovis ZIP 93611 must be served');
  assert(zips.includes('93720'), 'Fresno ZIP 93720 must be served');
});

// =========================================================================
// FEATURE 12: Interactive Case Study Drawer
// =========================================================================

registerTest('T1.56', 'F12 - Triggering case study card opens Case Study Drawer', 12, () => {
  const caseStudiesComp = readProjectFile('src/components/CaseStudies.tsx');
  const drawerComp = readProjectFile('src/components/CaseStudyDrawer.tsx');
  assertMatch(caseStudiesComp, /onOpenCaseStudy/);
  assertMatch(drawerComp, /isOpen/);
  assertMatch(drawerComp, /activeCaseStudyId/);
});

registerTest('T1.57', 'F12 - Drawer displays 3 structured chapters (Problem, Craft, Transformation)', 12, () => {
  const drawerComp = readProjectFile('src/components/CaseStudyDrawer.tsx');
  assertMatch(drawerComp, /The Problem/i);
  assertMatch(drawerComp, /Bespoke Craft/i);
  assertMatch(drawerComp, /Transformation/i);
});

registerTest('T1.58', 'F12 - Drawer renders verified transformation metrics bar', 12, () => {
  const drawerComp = readProjectFile('src/components/CaseStudyDrawer.tsx');
  assertMatch(drawerComp, /study\.metrics/);
  assertMatch(drawerComp, /metric\.value/);
  assertMatch(drawerComp, /metric\.label/);
});

registerTest('T1.59', 'F12 - Drawer renders client quote with author and role attribution', 12, () => {
  const drawerComp = readProjectFile('src/components/CaseStudyDrawer.tsx');
  assertMatch(drawerComp, /study\.quote/);
  assertMatch(drawerComp, /quote\.author/);
  assertMatch(drawerComp, /quote\.role/);
});

registerTest('T1.60', 'F12 - Close button closes drawer and resets active state', 12, () => {
  const drawerComp = readProjectFile('src/components/CaseStudyDrawer.tsx');
  assertMatch(drawerComp, /onClick=\{onClose\}/);
  assertMatch(drawerComp, /Escape/);
});

// =========================================================================
// FEATURE 13: Interactive Scope & Quote Calculator
// =========================================================================

registerTest('T1.61', 'F13 - Entry tier publishes the launch promo price', 13, () => {
  const quote = calculateQuote('landing', 'none');
  assertEqual(quote.setupTotal, 500, 'Landing Page launch price must be $500');
  assertEqual(quote.monthlyTotal, 0, 'No care plan must be $0/mo');
});

registerTest('T1.62', 'F13 - Only the entry tier publishes a number; the rest are quoted', 13, () => {
  assertEqual(calculateQuote('landing', 'none').setupTotal, 500);
  assertEqual(calculateQuote('business', 'none').setupTotal, null);
  assertEqual(calculateQuote('flagship', 'none').setupTotal, null);
});

registerTest('T1.63', 'F13 - Care plan is the single optional monthly', 13, () => {
  assertEqual(calculateQuote('landing', 'care').monthlyTotal, 99, 'Care plan must be $99/mo');
  assertEqual(calculateQuote('landing', 'none').monthlyTotal, 0, 'Opting out must be $0/mo');
  assertEqual(RETAINER_TIERS.length, 2, 'Exactly one paid plan plus the opt-out');
});

registerTest('T1.64', 'F13 - Launch promo is bounded and anchored against a regular price', 13, () => {
  const landing = SCOPE_TIERS.find((t) => t.id === 'landing');
  assertEqual(landing.price, 500);
  assertEqual(landing.regularPrice, 750, 'Promo must anchor against the regular price');
  assert(landing.regularPrice > landing.price, 'Promo must actually be a discount');
  assert(LAUNCH_PROMO.seats > 0, 'Promo must be limited, otherwise it is just the price');
  assert(Array.isArray(landing.excludes) && landing.excludes.length > 0,
    'Cheap tier must state what it leaves out');
});

registerTest('T1.65', 'F13 - Text-message CTA prefills a short, encoded message', 13, () => {
  const uri = formatSmsUri('Landing Page');
  assertMatch(uri, /^sms:\+15595753014\?body=/, 'Must be an E.164 sms: deep link');
  const body = decodeURIComponent(uri.split('body=')[1]);
  assertMatch(body, /Landing Page/);
  assert(body.length <= 160, `Prefilled SMS body must fit one segment, got ${body.length}`);
});

// =========================================================================
// FEATURE 14: Client Project Brief Generator Modal
// =========================================================================

registerTest('T1.66', 'F14 - Brief Dialog opens on trigger click', 14, () => {
  const briefCode = readProjectFile('src/components/BriefDialog.tsx');
  assertMatch(briefCode, /isOpen/);
  assertMatch(briefCode, /onClose/);
  assertMatch(briefCode, /createPortal/);
});

registerTest('T1.67', 'F14 - Form inputs accept client contact and business data', 14, () => {
  const briefCode = readProjectFile('src/components/BriefDialog.tsx');
  assertMatch(briefCode, /name="name"|id="brief-name"/);
  assertMatch(briefCode, /name="business"|id="brief-business"/);
  assertMatch(briefCode, /name="email"|id="brief-email"/);
  assertMatch(briefCode, /name="phone"|id="brief-phone"/);
});

registerTest('T1.68', 'F14 - Synthesized brief dynamically formats inputs into ASCII structure', 14, () => {
  const formDraft = {
    name: 'Carlos Mendez',
    business: 'Mendez Ag Logistics',
    location: 'Fresno, CA',
    email: 'carlos@mendezag.com',
    phone: '(559) 555-0199',
    selectedTier: 'Flagship ($22,000)',
    retainerInterest: 'Geo/SEO Radar ($1,200/mo)',
    timeline: '4–6 Weeks',
    description: 'Bilingual freight portal.',
  };
  const briefText = generateProjectBriefText(formDraft);
  assertMatch(briefText, /Client Name:\s*Carlos Mendez/);
  assertMatch(briefText, /Mendez Ag Logistics/);
  assertMatch(briefText, /100% Day-One Code.*Ownership/);
});

registerTest('T1.69', 'F14 - Copy Brief triggers clipboard handler with confirmation feedback', 14, () => {
  const briefCode = readProjectFile('src/components/BriefDialog.tsx');
  assertMatch(briefCode, /navigator\.clipboard\.writeText/);
  assertMatch(briefCode, /setCopied\(true\)/);
});

registerTest('T1.70', 'F14 - Download .txt generates valid plain text blob filename', 14, () => {
  const briefCode = readProjectFile('src/components/BriefDialog.tsx');
  assertMatch(briefCode, /clovis-project-brief/);
  assertMatch(briefCode, /\.txt/);
  assertMatch(briefCode, /new Blob/);
});

// =========================================================================
// FEATURE 15: Responsive Layout & Cross-Device UI
// =========================================================================

registerTest('T1.71', 'F15 - Mobile viewport (375px) maintains zero horizontal overflow', 15, () => {
  const css = readProjectFile('src/index.css');
  assertMatch(css, /overflow-x:\s*hidden/, 'Body must enforce overflow-x: hidden');
  const appCode = readProjectFile('src/App.tsx');
  assertMatch(appCode, /min-h-screen/, 'App container must enforce viewport sizing');
});

registerTest('T1.72', 'F15 - Tablet viewport (768px) adopts two-column layout', 15, () => {
  const ledgerCode = readProjectFile('src/components/TheLedger.tsx');
  assertMatch(ledgerCode, /md:grid-cols-2|lg:grid-cols-2/);
});

registerTest('T1.73', 'F15 - Desktop viewport (1280px+) renders floating pill navigation', 15, () => {
  const navCode = readProjectFile('src/components/Nav.tsx');
  assertMatch(navCode, /hidden md:flex/);
  assertMatch(navCode, /rounded-full/);
});

registerTest('T1.74', 'F15 - Primary touch targets satisfy minimum 48x48px bounding box', 15, () => {
  const navCode = readProjectFile('src/components/Nav.tsx');
  const calcCode = readProjectFile('src/components/BookingCalculator.tsx');
  assertMatch(navCode, /min-h-\[48px\]|min-w-\[48px\]|p-2\.5|p-3/);
  assertMatch(calcCode, /py-4|py-3\.5|min-h-\[48px\]/);
});

registerTest('T1.75', 'F15 - Header mobile hamburger menu toggles mobile navigation panel', 15, () => {
  const navCode = readProjectFile('src/components/Nav.tsx');
  assertMatch(navCode, /mobileOpen|mobileMenuOpen/);
  assertMatch(navCode, /setMobileOpen|setMobileMenuOpen/);
});

registerTest('T1.76', 'F15 - Clovis Web Design real phone (559) 575-3014 verified across schemas and components', 15, () => {
  const schemas = loadSchemas();
  const agencyNode = schemas.agencySchema['@graph'].find((node) => node['@type'].includes('LocalBusiness'));
  assert(Boolean(agencyNode), 'Agency LocalBusiness node must exist');
  assertEqual(agencyNode.telephone, '+1-559-575-3014', 'Agency schema telephone must be +1-559-575-3014');
  assertEqual(agencyNode.address?.postalCode, '93612', 'Agency schema postalCode must be 93612 (Old Town Clovis)');
  assertEqual(agencyNode.address?.streetAddress, 'Old Town Clovis', 'Agency schema streetAddress must be Old Town Clovis');

  const indexHtml = readProjectFile('index.html');
  assertMatch(indexHtml, /\+1-559-575-3014/, 'index.html schema must contain +1-559-575-3014');
  assertMatch(indexHtml, /"postalCode":\s*"93612"/, 'index.html schema must contain postalCode 93612');

  const heroCode = readProjectFile('src/components/Hero.tsx');
  assertMatch(heroCode, /tel:5595753014/, 'Hero must link to tel:5595753014');
  assertMatch(heroCode, /559\D*575\D*3014/, 'Hero must display (559) 575-3014');

  const navCode = readProjectFile('src/components/Nav.tsx');
  assertMatch(navCode, /tel:5595753014/, 'Nav must link to tel:5595753014');
  assertMatch(navCode, /559\D*575\D*3014/, 'Nav must display (559) 575-3014');

  const footerCode = readProjectFile('src/components/Footer.tsx');
  assertMatch(footerCode, /tel:5595753014/, 'Footer must link to tel:5595753014');
  assertMatch(footerCode, /559\D*575\D*3014/, 'Footer must display (559) 575-3014');
});

registerTest('T1.77', 'F15 - Sticky mobile call action bar mounted with direct call and SMS dispatch', 15, () => {
  const stickyCode = readProjectFile('src/components/StickyMobileCall.tsx');
  assertMatch(stickyCode, /tel:5595753014/, 'Sticky call must link to tel:5595753014');
  assertMatch(stickyCode, /formatSmsUri\(\)/, 'Sticky bar must build its SMS link from the shared helper');
  assertMatch(stickyCode, /fixed.*bottom-0.*md:hidden/, 'Sticky bar must be fixed at bottom on mobile');
  assertMatch(stickyCode, /min-w-0/, 'Sticky bar call button must support min-w-0 for flex truncation');

  const calc = loadCalculator();
  assertMatch(calc.formatSmsUri(), /^sms:\+15595753014\?body=/,
    'Shared helper must emit an E.164 sms: link');

  const appCode = readProjectFile('src/App.tsx');
  assertMatch(appCode, /<StickyMobileCall/, 'App.tsx must mount StickyMobileCall');
});

registerTest('T1.78', 'F10 - Only two verified client jobs strictly featured in case study registry', 10, () => {
  const studies = loadCaseStudies();
  assertEqual(studies.length, 2, 'Must contain strictly 2 verified client jobs');
  const ids = studies.map((s) => s.id);
  assert(ids.includes('kidney-specialist-inc'), 'Must include Kidney Specialist Inc');
  assert(ids.includes('big-bros-dumpster'), 'Must include Big Bros Dumpster Rental');
});

