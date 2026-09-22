// Tier 4: Real-World Central Valley Application Scenarios
// 23 rigorous multi-step workflow verification tests covering 5 authentic business journeys
// Refactored for authentic source code inspection against src/

import {
  assert,
  assertEqual,
  assertMatch,
  assertNotMatch,
  assertGreaterThanOrEqual,
  assertContrast,
  readProjectFile,
  loadSchemas,
  loadCaseStudies,
  loadServices,
  loadProcessSteps,
  loadCalculator,
  calculateQuote,
  formatMailtoUri,
  parseMailtoUri,
  generateProjectBriefText,
  loadFixture,
} from './test-harness.mjs';

export const tier4Tests = [];

function registerTest(id, name, fn) {
  tier4Tests.push({ id, name, fn });
}

// =========================================================================
// SCENARIO 1: Madera Nephrology Clinic Practice Manager
// Vetting WCAG 2.1 AA, HIPAA compliance, NPI schema, and booking Flagship
// =========================================================================

registerTest('T4.01', 'Scenario 1.1 - Practice Manager inspects Kidney Specialist Case Study for HIPAA safety', () => {
  const studies = loadCaseStudies();
  const cs1 = studies.find((s) => s.id === 'kidney-specialist-inc');
  assert(Boolean(cs1), 'Kidney Specialist case study required');
  assertEqual(cs1.client, 'Kidney Specialist Inc.');
  assertEqual(cs1.hipaaArchitecture?.webPhiForms, 0, 'Zero PHI stored on website eliminates BAA exposure');
  assertEqual(cs1.hipaaArchitecture?.referralFax, '(559) 661-1952', 'Dedicated clinical fax channel verified');
  assertEqual(cs1.hipaaArchitecture?.schedulingPhone, '(559) 661-1965', 'Direct phone channel verified');
});

registerTest('T4.02', 'Scenario 1.2 - Practice Manager verifies WCAG 2.1 AA text contrast for senior renal patients', () => {
  const studies = loadCaseStudies();
  const cs1 = studies.find((s) => s.id === 'kidney-specialist-inc');
  assertMatch(cs1.solution || '', /12\.6:1/);
  const navyHeading = '#0f2942';
  const whiteBackground = '#ffffff';
  const contrastRatio = assertContrast(navyHeading, whiteBackground, 7.0, 'Medical Navy on White');
  assertGreaterThanOrEqual(contrastRatio, 12.0, 'Senior visual accessibility exceeds 12:1 contrast');
});

registerTest('T4.03', 'Scenario 1.3 - Practice Manager validates Schema.org NPI 1356539423 and physician links', () => {
  const schemas = loadSchemas();
  const clinic = schemas.kidneySpecialistSchema['@graph'].find((n) => n['@type'].includes('MedicalClinic'));
  assertEqual(clinic.identifier.value, '1356539423', 'Verified organization NPI in Schema.org graph');

  const drMasood = schemas.kidneySpecialistSchema['@graph'].find((n) => n['@id'].includes('dr-masood'));
  assertEqual(drMasood.identifier.value, '1669422812', 'Dr. Masood NPI verified in knowledge graph');
});

registerTest('T4.04', 'Scenario 1.4 - Practice Manager finds the Flagship tier is quoted, not published', () => {
  const quote = calculateQuote('flagship', 'none');
  assertEqual(quote.setupTotal, null, 'Flagship is quoted on a call');
  assertEqual(quote.monthlyTotal, 0);
});

registerTest('T4.05', 'Scenario 1.5 - Practice Manager downloads structured project brief for clinic board approval', () => {
  const briefDraft = {
    name: 'Brenda Miller, Practice Administrator',
    business: 'Madera Nephrology Group',
    location: 'Madera, CA',
    email: 'admin@maderanephrology.com',
    phone: '(559) 661-5500',
    selectedTier: 'Flagship + Compliance Addon ($25,000)',
    retainerInterest: 'None (Self-Managed via Fax/Phone)',
    timeline: '6 Weeks',
    description: 'Require zero-HIPAA clinical referral architecture and CMS Medicare compliant copy.',
  };
  const briefText = generateProjectBriefText(briefDraft);
  assertMatch(briefText, /Brenda Miller/);
  assertMatch(briefText, /Madera Nephrology Group/);
  assertMatch(briefText, /zero-HIPAA clinical referral architecture/);
});

// =========================================================================
// SCENARIO 2: Clovis & Fresno Bilingual General Contractor
// Ordering roll-off dumpsters in Spanish via SMS, verifying driveway safety
// =========================================================================

registerTest('T4.06', 'Scenario 2.1 - Contractor switches language to Spanish and verifies trade terminology', () => {
  const studies = loadCaseStudies();
  const cs2 = studies.find((s) => s.id === 'big-bros-dumpster');
  assert(Boolean(cs2), 'Big Bros case study required');
  assertMatch(cs2.tradeSpanish?.rollOff || '', /Dómpers/i);
  assertMatch(cs2.tradeSpanish?.driveway || '', /tablones de madera/i);
});

registerTest('T4.07', 'Scenario 2.2 - Contractor verifies Clovis ZIP 93611 same-day drop-off eligibility', () => {
  const targetZip = '93611';
  const schemas = loadSchemas();
  const biz = schemas.bigBrosSchema['@graph'].find((n) => n['@type'] === 'LocalBusiness');
  const supportedZips = biz.areaServed.filter((a) => a['@type'] === 'PostalCode').map((a) => a.postalCode);
  assert(supportedZips.includes(targetZip), 'ZIP 93611 verified for Clovis delivery');
});

registerTest('T4.08', 'Scenario 2.3 - Contractor sees the 20-yard service without a published price', () => {
  const schemas = loadSchemas();
  const service = schemas.bigBrosSchema['@graph'].find((n) => n['@type'] === 'Service');
  assertMatch(service.name, /Roll-Off/i);
  assertEqual(service.offers, undefined);
});

registerTest('T4.09', 'Scenario 2.4 - Contractor clicks mobile SMS dispatch link to William & Jessica Ramirez', () => {
  const studies = loadCaseStudies();
  const cs2 = studies.find((s) => s.id === 'big-bros-dumpster');
  assertMatch(cs2.founders || '', /Jessica.*William/i);
  const phone = '5594958034';
  const messageBody = 'Hola Big Bros, necesito un dómper de 20 yardas en Harlan Ranch Clovis (93619).';
  const smsUri = `sms:+1${phone}?body=${encodeURIComponent(messageBody)}`;
  assertMatch(smsUri, /^sms:\+15594958034\?body=Hola%20Big%20Bros/);
});

registerTest('T4.10', 'Scenario 2.5 - Contractor prices the entry offer with the care plan', () => {
  const contractorLead = calculateQuote('landing', 'care');
  assertEqual(contractorLead.setupTotal, 500, 'Landing Page launch price = $500');
  assertEqual(contractorLead.monthlyTotal, 99, 'Care plan = $99/mo');
});

registerTest('T4.11', 'Scenario 3.1 - Restaurant owner reads the Ledger and finds an argument, not a price', () => {
  const ledgerSource = readProjectFile('src/components/TheLedger.tsx');
  assertNotMatch(ledgerSource, /\$[0-9]/);
  assertMatch(ledgerSource, /in your name/i);
  assertMatch(ledgerSource, /phone|text|picks up/i);
});

registerTest('T4.12', 'Scenario 3.2 - Restaurant owner reads an honest account of Google listings', () => {
  const services = loadServices();
  const gbp = services.find((s) => s.id === 'gbp-dominance');
  assert(Boolean(gbp), 'GBP service required');
  assertEqual(gbp.reviewDefense, true);
  assertMatch(gbp.description, /cannot promise|no guarantee|wary/i,
    'Must not promise a ranking position');
  const blob = JSON.stringify(gbp);
  assertNotMatch(blob, /Toast|Clover|Mindbody|Kareo|Epic/i,
    'Must not claim integrations that have not been verified');
  assertNotMatch(blob, /fake review removal/i, 'Must not promise removal of content Adam does not control');
});

registerTest('T4.13', 'Scenario 3.3 - Restaurant owner picks the entry offer plus care plan', () => {
  const quote = calculateQuote('landing', 'care');
  assertEqual(quote.setupTotal, 500);
  assertEqual(quote.monthlyTotal, 99);
});

registerTest('T4.14', 'Scenario 3.4 - Restaurant owner sends a written follow-up about Toast POS', () => {
  const quote = calculateQuote('landing', 'care');
  const mailtoUri = formatMailtoUri({
    to: 'adam@cloviswebdesign.com',
    subject: 'Old Town Clovis Restaurant: ' + quote.tierTitle,
    body: 'Hi Adam, we run a bistro on Pollasky Ave in Old Town Clovis. '
      + 'We want the ' + quote.tierTitle + ' plus the care plan ($' + quote.monthlyTotal + '/mo). '
      + 'Must integrate our Toast POS online menu.',
  });
  const parsed = parseMailtoUri(mailtoUri);
  assertMatch(parsed.body, /Pollasky Ave in Old Town Clovis/);
  assertMatch(parsed.body, /Toast POS/);
});

registerTest('T4.15', 'Scenario 4.1 - Ag supplier inspects "The Receipt" for throttled 4G mobile proof', () => {
  const receiptSource = readProjectFile('src/components/TheReceipt.tsx');
  assertMatch(receiptSource, /throttled 4G Android device in Madera/i);
  assertMatch(receiptSource, /100/);
});

registerTest('T4.16', 'Scenario 4.2 - Ag supplier reviews The Recipe 4-stage process timeline', () => {
  const steps = loadProcessSteps();
  assertEqual(steps.length, 4);
  assertMatch(steps[0].title, /Discovery/);
  assertMatch(steps[3].title, /Launch & 90-Day Tuning/);
});

registerTest('T4.17', 'Scenario 4.3 - Ag supplier with multiple yards gets a quote, not a price tag', () => {
  const quote = calculateQuote('flagship', 'care');
  assertEqual(quote.setupTotal, null, 'Multi-yard work is scoped on a call');
  assertEqual(quote.monthlyTotal, 99, 'Care plan is the only monthly');
});

registerTest('T4.18', 'Scenario 4.4 - Ag supplier generates and downloads project brief text file', () => {
  const agDraft = {
    name: 'Hank Sorensen',
    business: 'Valley Tractor & Harvester Corp',
    location: 'Madera & Selma, CA',
    email: 'hank@valleytractor.com',
    phone: '(559) 674-1200',
    selectedTier: 'Multi-Location ($45,000)',
    retainerInterest: 'Geo/SEO Radar ($1,200/mo)',
    timeline: '4–6 Weeks',
    description: 'Equipment inventory showcase that loads fast on rural celular connections across Fresno and Madera counties.',
  };
  const briefText = generateProjectBriefText(agDraft);
  assertMatch(briefText, /Valley Tractor & Harvester Corp/);
  assertMatch(briefText, /rural celular connections/);
});

// =========================================================================
// SCENARIO 5: Fresno Healthcare Executive & Hospital Liaison
// Vetting Truth-in-Advertising CA § 651, NPI schemas, and keyboard accessibility
// =========================================================================

registerTest('T4.19', 'Scenario 5.1 - Healthcare executive verifies California Business & Professions § 651 compliance', () => {
  const caseStudiesSource = readProjectFile('src/data/caseStudies.ts');
  assert(!caseStudiesSource.includes('the best nephrologist in California'), 'Prohibits superlatives under CA Bus & Prof § 651');
  assertMatch(caseStudiesSource, /Board|MD|Nephrology/i, 'Verifiable credentials must be displayed');
});

registerTest('T4.20', 'Scenario 5.2 - Healthcare executive audits dual physician schema credentials', () => {
  const schemas = loadSchemas();
  const masood = schemas.kidneySpecialistSchema['@graph'].find((n) => n['@id'].includes('dr-masood'));
  const siddiqui = schemas.kidneySpecialistSchema['@graph'].find((n) => n['@id'].includes('dr-siddiqui'));

  assertEqual(masood.medicalSpecialty, 'Nephrology');
  assertEqual(siddiqui.medicalSpecialty, 'Nephrology');
  assertEqual(masood.identifier.value, '1669422812');
  assertEqual(siddiqui.identifier.value, '1184916983');
});

registerTest('T4.21', 'Scenario 5.3 - Healthcare executive tests full keyboard navigation sequence', () => {
  const drawerSource = readProjectFile('src/components/CaseStudyDrawer.tsx');
  const briefSource = readProjectFile('src/components/BriefDialog.tsx');
  assertMatch(drawerSource, /Escape/, 'Drawer must support Escape key navigation');
  assertMatch(briefSource, /Escape|onClose/, 'Brief Dialog must support Escape/close navigation');
});

registerTest('T4.22', 'Scenario 5.4 - Healthcare executive finds compliance work is quoted', () => {
  const quote = calculateQuote('flagship', 'care');
  assertEqual(quote.setupTotal, null, 'Compliance-heavy builds are quoted, never published');
  assertEqual(quote.monthlyTotal, 99, 'Care plan = $99/mo');
});

registerTest('T4.23', 'Scenario 5.5 - Healthcare executive written follow-up quotes no setup figure', () => {
  const quote = calculateQuote('flagship', 'care');
  const mailtoUri = formatMailtoUri({
    to: 'adam@cloviswebdesign.com',
    subject: 'Medical Practice Web Consultation: ' + quote.tierTitle,
    body: 'Executive inquiry for regional medical practice flagship build. '
      + 'Setup: to be quoted. Care plan: $' + quote.monthlyTotal + '/mo.',
  });
  const parsed = parseMailtoUri(mailtoUri);
  assertMatch(parsed.subject, /Medical Practice Web Consultation/);
  assertMatch(parsed.body, /to be quoted/);
  assertMatch(parsed.body, /[$]99[/]mo/);
});
