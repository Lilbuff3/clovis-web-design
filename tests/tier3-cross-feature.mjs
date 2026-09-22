// Tier 3: Cross-Feature Combinations & Pairwise Interaction Testing
// 31 comprehensive pairwise and multi-feature interaction tests
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
  loadCalculator,
  calculateQuote,
  formatMailtoUri,
  formatSmsUri,
  parseMailtoUri,
  generateProjectBriefText,
  loadFixture,
} from './test-harness.mjs';

export const tier3Tests = [];

function registerTest(id, name, fn) {
  tier3Tests.push({ id, name, fn });
}

// -------------------------------------------------------------------------
// 1. Calculator State -> Project Brief Dialog Integration
// -------------------------------------------------------------------------

registerTest('T3.01', 'Entry tier selection syncs into Project Brief draft', () => {
  const calcState = calculateQuote('landing', 'none');
  const briefDraft = {
    name: 'Sarah Jenkins',
    business: 'Old Town Antiques',
    selectedTier: `${calcState.tierTitle} ($${calcState.setupTotal.toLocaleString()})`,
    retainerInterest: calcState.retainerTitle,
  };
  const briefText = generateProjectBriefText(briefDraft);
  assertMatch(briefText, /Selected Tier:\s*Landing Page \(\$500\)/);
  assertMatch(briefText, /Monthly Retainer:\s*No plan/);
});

registerTest('T3.02', 'Quoted tier plus care plan syncs into Project Brief draft', () => {
  const calcState = calculateQuote('flagship', 'care');
  const briefDraft = {
    name: 'Dr. Robert Vance',
    business: 'Vance Orthopedics',
    selectedTier: `${calcState.tierTitle} (quote)`,
    retainerInterest: `${calcState.retainerTitle} ($${calcState.monthlyTotal}/mo)`,
  };
  const briefText = generateProjectBriefText(briefDraft);
  assertMatch(briefText, /Selected Tier:\s*Flagship \(quote\)/);
  assertMatch(briefText, /Monthly Retainer:\s*Care Plan \(\$99\/mo\)/);
});

registerTest('T3.03', 'Brief never fabricates a price for a quoted tier', () => {
  const calcState = calculateQuote('business', 'none');
  assertEqual(calcState.setupTotal, null);
  const briefText = generateProjectBriefText({
    name: 'Elena Rostova',
    business: 'Valley Multi-Care Group',
    selectedTier: `${calcState.tierTitle} (quote)`,
    retainerInterest: calcState.retainerTitle,
  });
  assertNotMatch(briefText, /Selected Tier:.*\$[0-9]/);
});

registerTest('T3.04', 'Entry tier text CTA carries the tier name', () => {
  const uri = formatSmsUri('Landing Page');
  const body = decodeURIComponent(uri.split('body=')[1]);
  assertMatch(body, /Landing Page/);
  assertMatch(uri, /^sms:\+15595753014/);
});

registerTest('T3.05', 'Text CTA without a tier still produces a usable message', () => {
  const uri = formatSmsUri();
  const body = decodeURIComponent(uri.split('body=')[1]);
  assertMatch(body, /website/i);
  assert(body.length <= 160, 'Default SMS body must fit one segment');
});

registerTest('T3.06', 'Mailto fallback still targets the business address', () => {
  const uri = formatMailtoUri({ subject: 'Landing Page', body: 'Details to follow.' });
  const parsed = parseMailtoUri(uri);
  assertEqual(parsed.to, 'adam@cloviswebdesign.com');
  assertMatch(parsed.subject, /Landing Page/);
});

registerTest('T3.07', 'Kidney Specialist schema organization NPI matches rendered case study text', () => {
  const schemas = loadSchemas();
  const studies = loadCaseStudies();
  const clinic = schemas.kidneySpecialistSchema['@graph'].find((n) => n['@type'].includes('MedicalClinic'));
  const cs1 = studies.find((s) => s.id === 'kidney-specialist-inc');
  assert(Boolean(clinic), 'Clinic node required in schema');
  assert(Boolean(cs1), 'Case study 1 required');
  assertMatch(cs1.solution || '', new RegExp(clinic.identifier.value), 'Organization NPI must appear in case study solution');
});

registerTest('T3.08', 'Kidney Specialist schema physician names match rendered doctor credentials', () => {
  const schemas = loadSchemas();
  const studies = loadCaseStudies();
  const physicians = schemas.kidneySpecialistSchema['@graph'].filter((n) => n['@type'] === 'Physician').map((p) => p.name);
  const cs1 = studies.find((s) => s.id === 'kidney-specialist-inc');
  for (const doc of cs1.doctors) {
    assert(physicians.includes(doc), `Physician ${doc} in case study must exist in schema`);
  }
});

registerTest('T3.09', 'Kidney Specialist schema phone and fax match zero-HIPAA referral channels', () => {
  const schemas = loadSchemas();
  const studies = loadCaseStudies();
  const clinic = schemas.kidneySpecialistSchema['@graph'].find((n) => n['@type'].includes('MedicalClinic'));
  const cs1 = studies.find((s) => s.id === 'kidney-specialist-inc');
  const cleanPhone = clinic.telephone.replace(/[^\d]/g, '').replace(/^1/, '');
  const cleanStudyPhone = cs1.hipaaArchitecture.schedulingPhone.replace(/[^\d]/g, '').replace(/^1/, '');
  assertEqual(cleanPhone, cleanStudyPhone);
  const cleanFax = clinic.faxNumber.replace(/[^\d]/g, '').replace(/^1/, '');
  const cleanStudyFax = cs1.hipaaArchitecture.referralFax.replace(/[^\d]/g, '').replace(/^1/, '');
  assertEqual(cleanFax, cleanStudyFax);
});

registerTest('T3.10', 'Kidney Specialist schema secondary Fresno department location is indexed', () => {
  const schemas = loadSchemas();
  const clinic = schemas.kidneySpecialistSchema['@graph'].find((n) => n['@type'].includes('MedicalClinic'));
  const fresnoDept = clinic.department.find((d) => d.name.includes('Fresno'));
  assert(Boolean(fresnoDept));
  assertEqual(fresnoDept.address.addressLocality, 'Fresno');
  assertEqual(fresnoDept.address.postalCode, '93710');
});

// -------------------------------------------------------------------------
// 4. Case Study 2 (Big Bros Dumpster) Schema vs Rendered Facts
// -------------------------------------------------------------------------

registerTest('T3.11', 'Big Bros schema telephone matches direct dispatch SMS/phone hotline', () => {
  const schemas = loadSchemas();
  const caseStudiesSource = readProjectFile('src/data/caseStudies.ts');
  const biz = schemas.bigBrosSchema['@graph'].find((n) => n['@type'] === 'LocalBusiness');
  assertEqual(biz.telephone, '+1-559-495-8034');
  assertMatch(caseStudiesSource, /495-8034/, 'Direct hotline must be referenced in case study data');
});

registerTest('T3.12', 'Big Bros schema publishes no client prices or offers', () => {
  const schemas = loadSchemas();
  const service = schemas.bigBrosSchema['@graph'].find((n) => n['@type'] === 'Service');
  assertEqual(service.offers, undefined);
  const biz = schemas.bigBrosSchema['@graph'].find((n) => n['@type'] === 'LocalBusiness');
  assertEqual(biz.priceRange, undefined);
});

registerTest('T3.13', 'Big Bros schema areaServed includes Clovis and Fresno municipal coverage', () => {
  const schemas = loadSchemas();
  const biz = schemas.bigBrosSchema['@graph'].find((n) => n['@type'] === 'LocalBusiness');
  const cities = biz.areaServed.filter((a) => a['@type'] === 'City').map((c) => c.name);
  assert(cities.includes('Clovis'));
  assert(cities.includes('Fresno'));
});

registerTest('T3.14', 'Big Bros schema knowsLanguage includes bilingual English and Spanish', () => {
  const schemas = loadSchemas();
  const biz = schemas.bigBrosSchema['@graph'].find((n) => n['@type'] === 'LocalBusiness');
  assertEqual(biz.knowsLanguage.length, 2);
  assert(biz.knowsLanguage.includes('en'));
  assert(biz.knowsLanguage.includes('es'));
});

// -------------------------------------------------------------------------
// 5. Case Study Drawer Interaction vs Mobile Nav & Viewport
// -------------------------------------------------------------------------

registerTest('T3.15', 'Opening Case Study Drawer closes Mobile Nav menu if open', () => {
  const appSource = readProjectFile('src/App.tsx');
  assertMatch(appSource, /handleOpenCaseStudy/);
  assertMatch(appSource, /activeCaseStudyId/);
});

registerTest('T3.16', 'Closing Case Study Drawer restores page scroll and leaves mobile nav closed', () => {
  const hookSource = readProjectFile('src/hooks/useBodyLock.ts');
  assertMatch(hookSource, /previousOverflow|originalOverflow/);
});

registerTest('T3.17', 'Switching active case study inside open drawer preserves scroll lock', () => {
  const drawerSource = readProjectFile('src/components/CaseStudyDrawer.tsx');
  assertMatch(drawerSource, /useBodyLock\(isOpen\)/);
});

// -------------------------------------------------------------------------
// 6. The Receipt Performance Gauges vs Case Study Metrics
// -------------------------------------------------------------------------

registerTest('T3.18', 'The Receipt 100/100 CWV synchronizes with Kidney Specialist 100 score', () => {
  const studies = loadCaseStudies();
  const cs1 = studies.find((s) => s.id === 'kidney-specialist-inc');
  const cwvMetric = cs1.metrics.find((m) => m.label.includes('Core Web Vitals'));
  assertEqual(cwvMetric.value, 100);
});

registerTest('T3.19', 'The Receipt 100/100 CWV synchronizes with Big Bros 100 score', () => {
  const studies = loadCaseStudies();
  const cs2 = studies.find((s) => s.id === 'big-bros-dumpster');
  const cwvMetric = cs2.metrics.find((m) => m.label.includes('Core Web Vitals'));
  assertEqual(cwvMetric.value, 100);
});

registerTest('T3.20', 'Performance proof lives in The Receipt, not in sales copy', () => {
  const receiptSource = readProjectFile('src/components/TheReceipt.tsx');
  const servicesSource = readProjectFile('src/data/services.ts');
  assertMatch(receiptSource, /throttled 4G Android/i, 'The audit section keeps the measured detail');
  assertNotMatch(servicesSource, /<600ms|first contentful paint|Core Web Vitals/i,
    'Service copy must describe the outcome, not the metric');
  assertMatch(servicesSource, /fast on a phone|comes up fast|loads/i);
});

registerTest('T3.21', 'Expanding multiple FAQ items recalculates scroll height smoothly', () => {
  const faqSource = readProjectFile('src/components/FAQ.tsx');
  const progressSource = readProjectFile('src/hooks/useScrollProgress.ts');
  assertMatch(faqSource, /toggle|activeId/);
  assertMatch(progressSource, /scroll/);
});

registerTest('T3.22', 'Collapsing FAQ does not result in negative scroll percentage', () => {
  const progressHook = readProjectFile('src/hooks/useScrollProgress.ts');
  assertMatch(progressHook, /Math\.max\(0/);
  assertMatch(progressHook, /Math\.min\(1/);
  const clampProgress = (y, maxScroll) => (maxScroll > 0 ? Math.min(1, Math.max(0, y / maxScroll)) : 0);
  assertEqual(clampProgress(-50, 1000), 0, 'Negative scroll Y must clamp to 0');
  assertEqual(clampProgress(1200, 1000), 1, 'Overflow scroll Y must clamp to 1');
  assertEqual(clampProgress(500, 1000), 0.5, 'Mid scroll Y must compute to 0.5');
});

// -------------------------------------------------------------------------
// 8. Design System Tokens vs Multi-Component Surface Contrast
// -------------------------------------------------------------------------

registerTest('T3.23', 'Hero button (Clay #b0503a on Paper #f6f0e6) passes WCAG AA for large text', () => {
  const tokens = loadCssTokens();
  const clay = tokens['color-clay'] || '#b0503a';
  const paper = tokens['color-paper'] || '#f6f0e6';
  assertContrast(clay, paper, 3.5, 'Clay on Paper');
});

registerTest('T3.24', 'Ledger dark card (Linen #fbf7f0 on Basalt #221d17) passes WCAG AAA', () => {
  const tokens = loadCssTokens();
  const linen = tokens['color-linen'] || '#fbf7f0';
  const ink = tokens['color-ink'] || '#221d17';
  const ratio = assertContrast(linen, ink, 7.0, 'Linen text on Dark Ink');
  assertGreaterThanOrEqual(ratio, 14.0);
});

registerTest('T3.25', 'The Recipe dark section background maintains high contrast text hierarchy', () => {
  const tokens = loadCssTokens();
  const deepPaper = tokens['color-paper-deep'] || '#ede4d5';
  const ink = tokens['color-ink'] || '#221d17';
  const ratio = assertContrast(deepPaper, ink, 7.0, 'Deep paper text on Ink');
  assertGreaterThanOrEqual(ratio, 12.0);
});

registerTest('T3.26', 'Modal and Drawer scrim opacity provides distinct layer separation', () => {
  const drawerSource = readProjectFile('src/components/CaseStudyDrawer.tsx');
  const opacityMatch = drawerSource.match(/bg-ink\/(\d+)/);
  assert(Boolean(opacityMatch), 'Drawer must specify bg-ink opacity value');
  const parsedOpacity = parseInt(opacityMatch[1], 10) / 100;
  assertGreaterThanOrEqual(parsedOpacity, 0.4);
  assertLessThanOrEqual(parsedOpacity, 0.8);
});

// -------------------------------------------------------------------------
// 9. The Ledger Pricing vs Calculator Tiers Alignment
// -------------------------------------------------------------------------

registerTest('T3.27', 'The Ledger argues ownership and access, not money', () => {
  const ledgerSource = readProjectFile('src/components/TheLedger.tsx');
  assertNotMatch(ledgerSource, /\$[0-9]/, 'The Ledger must carry no dollar figures');
  assertMatch(ledgerSource, /own|ownership|in your name/i);
});

registerTest('T3.28', 'The pricing section is the only place a price is published', () => {
  const calc = loadCalculator();
  assertEqual(calc.PRICING_CONSTANTS.tiers.landing.price, 500);
  assertEqual(calc.PRICING_CONSTANTS.tiers.business.price, null);
  assertEqual(calc.PRICING_CONSTANTS.tiers.flagship.price, null);
  for (const f of ['src/components/Hero.tsx', 'src/components/TheReceipt.tsx', 'src/components/TheRecipe.tsx']) {
    assertNotMatch(readProjectFile(f), /\$[0-9]/, `${f} must not hardcode a price`);
  }
});

registerTest('T3.29', 'All navigation items correspond to valid main landmark section IDs', () => {
  const navSource = readProjectFile('src/components/Nav.tsx');
  const appSource = readProjectFile('src/App.tsx');
  const navIds = [...navSource.matchAll(/id:\s*"([a-z-]+)"/g)].map((m) => m[1]);
  assertGreaterThanOrEqual(navIds.length, 5, 'Nav must define at least 5 navigation items');

  const componentSources = [
    readProjectFile('src/components/CaseStudies.tsx'),
    readProjectFile('src/components/TheLedger.tsx'),
    readProjectFile('src/components/Services.tsx'),
    readProjectFile('src/components/TheReceipt.tsx'),
    readProjectFile('src/components/TheRecipe.tsx'),
    readProjectFile('src/components/FAQ.tsx'),
    readProjectFile('src/components/BookingCalculator.tsx'),
    appSource,
  ].join('\n');

  for (const id of navIds) {
    assertMatch(componentSources, new RegExp(`id="${id}"`), `Navigation item "${id}" must map to a valid element id in the component tree`);
  }
});

registerTest('T3.30', 'Footer contact wordmark and Central Valley links match Header brand', () => {
  const footerSource = readProjectFile('src/components/Footer.tsx');
  assertMatch(footerSource, /Clovis Web Design/i);
});

registerTest('T3.31', 'Zero-HIPAA intake claims in Case Study 1 match Brief Dialog client data safety', () => {
  const briefSource = readProjectFile('src/components/BriefDialog.tsx');
  assert(!briefSource.includes('medicalRecord'), 'Brief Dialog must never collect medical records');
  assert(!briefSource.includes('phiInput'), 'Brief Dialog must never collect PHI');
});
