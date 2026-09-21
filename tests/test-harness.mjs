// Clovis Web Design — E2E Test Harness & Assertions Utility
// Zero external dependency architecture (native Node.js ESM)
// Refactored for authentic source inspection against actual src/ files

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const PROJECT_ROOT = path.resolve(__dirname, '..');

// ==========================================
// 1. Color Contrast & WCAG 2.1 Luminance
// ==========================================

export function hexToRgb(hex) {
  const cleanHex = hex.replace('#', '').trim();
  if (cleanHex.length === 3) {
    const r = parseInt(cleanHex[0] + cleanHex[0], 16);
    const g = parseInt(cleanHex[1] + cleanHex[1], 16);
    const b = parseInt(cleanHex[2] + cleanHex[2], 16);
    return { r, g, b };
  } else if (cleanHex.length === 6) {
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return { r, g, b };
  }
  throw new Error(`Invalid hex color: ${hex}`);
}

export function getRelativeLuminance(rgb) {
  const srgb = [rgb.r / 255, rgb.g / 255, rgb.b / 255].map((val) => {
    return val <= 0.04045 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

export function getContrastRatio(hex1, hex2) {
  const l1 = getRelativeLuminance(hexToRgb(hex1));
  const l2 = getRelativeLuminance(hexToRgb(hex2));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// ==========================================
// 2. Core Assertion Functions
// ==========================================

export class AssertionError extends Error {
  constructor(message, actual, expected) {
    super(message);
    this.name = 'AssertionError';
    this.actual = actual;
    this.expected = expected;
  }
}

export function assert(condition, message = 'Assertion failed') {
  if (!condition) {
    throw new AssertionError(message, false, true);
  }
}

export function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new AssertionError(
      message || `Expected ${JSON.stringify(expected)}, received ${JSON.stringify(actual)}`,
      actual,
      expected
    );
  }
}

export function assertDeepEqual(actual, expected, message) {
  const actualStr = JSON.stringify(actual);
  const expectedStr = JSON.stringify(expected);
  if (actualStr !== expectedStr) {
    throw new AssertionError(
      message || `Deep equality failed: ${actualStr} !== ${expectedStr}`,
      actual,
      expected
    );
  }
}

export function assertMatch(actual, pattern, message) {
  const str =
    typeof actual === 'string'
      ? actual
      : typeof actual === 'object' && actual !== null
        ? JSON.stringify(actual)
        : String(actual ?? '');
  if (!pattern.test(str)) {
    throw new AssertionError(
      message || `String did not match pattern ${pattern.toString()}: "${str}"`,
      str,
      pattern.toString()
    );
  }
}

export function assertNotMatch(actual, pattern, message) {
  if (typeof actual === 'string' && pattern.test(actual)) {
    throw new AssertionError(
      message || `String matched prohibited pattern ${pattern.toString()}: "${actual}"`,
      actual,
      `NOT ${pattern.toString()}`
    );
  }
}

export function assertGreaterThanOrEqual(actual, expected, message) {
  if (!(actual >= expected)) {
    throw new AssertionError(
      message || `Expected ${actual} >= ${expected}`,
      actual,
      expected
    );
  }
}

export function assertLessThanOrEqual(actual, expected, message) {
  if (!(actual <= expected)) {
    throw new AssertionError(
      message || `Expected ${actual} <= ${expected}`,
      actual,
      expected
    );
  }
}

export function assertContrast(fgHex, bgHex, minRatio, label = '') {
  const ratio = getContrastRatio(fgHex, bgHex);
  if (ratio < minRatio) {
    throw new AssertionError(
      `Contrast ratio failure for ${label} (${fgHex} on ${bgHex}): observed ${ratio.toFixed(2)}:1, minimum required is ${minRatio}:1`,
      ratio,
      minRatio
    );
  }
  return ratio;
}

// ==========================================
// 3. Project File Reader & Validating Inspectors
// ==========================================

export function readProjectFile(relativePath) {
  const fullPath = path.resolve(PROJECT_ROOT, relativePath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Required project file does not exist: ${relativePath}`);
  }
  const content = fs.readFileSync(fullPath, 'utf8');
  if (!content || content.trim().length === 0) {
    throw new Error(`Required project file is empty or corrupted: ${relativePath}`);
  }
  return content;
}

export function checkFileExists(relativePath) {
  const fullPath = path.resolve(PROJECT_ROOT, relativePath);
  return fs.existsSync(fullPath);
}

// Load and evaluate Schema.org graphs directly from src/data/schemas.ts
export function loadSchemas() {
  const code = readProjectFile('src/data/schemas.ts');
  const cleanCode = code
    .replace(/\/\*\*[\s\S]*?\*\//g, '')
    .replace(/export\s+const\s+/g, 'const ');
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(
    cleanCode +
    '\nthis.kidneySpecialistSchema = kidneySpecialistSchema;\nthis.bigBrosSchema = bigBrosSchema;\nthis.agencySchema = agencySchema;',
    sandbox
  );
  return {
    kidneySpecialistSchema: sandbox.kidneySpecialistSchema,
    bigBrosSchema: sandbox.bigBrosSchema,
    agencySchema: sandbox.agencySchema,
  };
}

// Load and evaluate dynamic calculator logic directly from src/data/calculator.ts
export function loadCalculator() {
  const code = readProjectFile('src/data/calculator.ts');
  const cleanCode = code
    .replace(/import\s+type[\s\S]*?from\s+["'][^"']+["'];?/g, '')
    .replace(/export\s+interface[\s\S]*?^}/gm, '')
    .replace(/:\s*CalculatorTierConfig\[\]/g, '')
    .replace(/:\s*RetainerTierConfig\[\]/g, '')
    .replace(/:\s*CalculatorAddonConfig\[\]/g, '')
    .replace(/:\s*ScopeTier/g, '')
    .replace(/:\s*RetainerTier/g, '')
    .replace(/:\s*string\[\]\s*=\s*\[\]/g, ' = []')
    .replace(/params:\s*\{[\s\S]*?\}/g, 'params')
    .replace(/export\s+const\s+/g, 'const ')
    .replace(/export\s+function\s+/g, 'function ');

  const sandbox = {
    console,
    Math,
    encodeURIComponent,
    decodeURIComponent,
    URLSearchParams,
  };
  vm.createContext(sandbox);
  vm.runInContext(
    cleanCode +
    '\nthis.SCOPE_TIERS = SCOPE_TIERS;\nthis.RETAINER_TIERS = RETAINER_TIERS;\nthis.ADDON_CONFIGS = ADDON_CONFIGS;\nthis.PRICING_CONSTANTS = PRICING_CONSTANTS;\nthis.calculateQuote = calculateQuote;\nthis.formatMailtoUri = formatMailtoUri;',
    sandbox
  );
  return {
    SCOPE_TIERS: sandbox.SCOPE_TIERS,
    RETAINER_TIERS: sandbox.RETAINER_TIERS,
    ADDON_CONFIGS: sandbox.ADDON_CONFIGS,
    PRICING_CONSTANTS: sandbox.PRICING_CONSTANTS,
    calculateQuote: sandbox.calculateQuote,
    formatMailtoUri: sandbox.formatMailtoUri,
  };
}

// Load and evaluate Case Studies directly from src/data/caseStudies.ts
export function loadCaseStudies() {
  const schemas = loadSchemas();
  const code = readProjectFile('src/data/caseStudies.ts');
  const cleanCode = code
    .replace(/import\s+type[\s\S]*?from\s+["'][^"']+["'];?/g, '')
    .replace(/import\s+\{[^}]+\}\s+from\s+["'][^"']+["'];?/g, '')
    .replace(/export\s+interface[\s\S]*?^}/gm, '')
    .replace(/:\s*ExtendedCaseStudy\[\]/g, '')
    .replace(/export\s+const\s+/g, 'const ');

  const sandbox = {
    kidneySpecialistSchema: schemas.kidneySpecialistSchema,
    bigBrosSchema: schemas.bigBrosSchema,
    console,
    Math,
  };
  vm.createContext(sandbox);
  vm.runInContext(cleanCode + '\nthis.caseStudies = caseStudies;', sandbox);
  return sandbox.caseStudies;
}

// Load and evaluate Services directly from src/data/services.ts
export function loadServices() {
  const code = readProjectFile('src/data/services.ts');
  const cleanCode = code
    .replace(/import\s+type[\s\S]*?from\s+["'][^"']+["'];?/g, '')
    .replace(/export\s+interface[\s\S]*?^}/gm, '')
    .replace(/:\s*ExtendedServiceOffering\[\]/g, '')
    .replace(/export\s+const\s+/g, 'const ');

  const sandbox = { console };
  vm.createContext(sandbox);
  vm.runInContext(cleanCode + '\nthis.services = services;', sandbox);
  return sandbox.services;
}

// Load and evaluate Process steps directly from src/data/process.ts
export function loadProcessSteps() {
  const code = readProjectFile('src/data/process.ts');
  const cleanCode = code
    .replace(/import\s+type[\s\S]*?from\s+["'][^"']+["'];?/g, '')
    .replace(/export\s+interface[\s\S]*?^}/gm, '')
    .replace(/:\s*ExtendedProcessStep\[\]/g, '')
    .replace(/export\s+const\s+/g, 'const ');

  const sandbox = { console };
  vm.createContext(sandbox);
  vm.runInContext(cleanCode + '\nthis.processSteps = processSteps;', sandbox);
  return sandbox.processSteps;
}

// Load and evaluate FAQ items directly from src/data/faq.ts
export function loadFaqs() {
  const code = readProjectFile('src/data/faq.ts');
  const cleanCode = code
    .replace(/import\s+type[\s\S]*?from\s+["'][^"']+["'];?/g, '')
    .replace(/export\s+interface[\s\S]*?^}/gm, '')
    .replace(/:\s*ExtendedFAQItem\[\]/g, '')
    .replace(/export\s+const\s+/g, 'const ');

  const sandbox = { console };
  vm.createContext(sandbox);
  vm.runInContext(cleanCode + '\nthis.faqs = faqs;', sandbox);
  return sandbox.faqs;
}

// Load and evaluate generateProjectBriefText directly from src/components/BriefDialog.tsx
export function loadBriefGenerator() {
  const code = readProjectFile('src/components/BriefDialog.tsx');
  const fnMatch = code.match(/export function generateProjectBriefText\s*\([\s\S]*?^}/m);
  if (!fnMatch) {
    throw new Error('generateProjectBriefText not found in src/components/BriefDialog.tsx');
  }
  const fnCode = fnMatch[0]
    .replace(/draft:\s*\{[\s\S]*?\}/, 'draft')
    .replace(/,\s*config\??:\s*[^)]+/, ', config')
    .replace('export function', 'function');

  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(fnCode + '\nthis.generateProjectBriefText = generateProjectBriefText;', sandbox);
  return sandbox.generateProjectBriefText;
}

// Load CSS custom properties directly from src/index.css
export function loadCssTokens() {
  const css = readProjectFile('src/index.css');
  const tokens = {};
  const regex = /--([a-zA-Z0-9-]+):\s*([^;]+);/g;
  let match;
  while ((match = regex.exec(css)) !== null) {
    tokens[match[1]] = match[2].trim();
  }
  return tokens;
}

// ==========================================
// 4. Authoritative Exports from Real Codebase
// ==========================================

const _calc = loadCalculator();
export const SPEC_PRICING = _calc.PRICING_CONSTANTS;
export const calculateQuote = _calc.calculateQuote;
export const formatMailtoUri = _calc.formatMailtoUri;

export const generateProjectBriefText = loadBriefGenerator();

export function parseMailtoUri(uri) {
  assert(uri.startsWith('mailto:'), `URI must start with mailto:, got "${uri}"`);
  const parts = uri.substring(7).split('?');
  const recipient = parts[0];
  const queryParams = new URLSearchParams(parts[1] || '');
  return {
    to: recipient,
    subject: queryParams.get('subject') || '',
    body: queryParams.get('body') || '',
  };
}

// Load fixture directly from authentic schemas (guarantees zero divergence)
export function loadFixture(fixtureName) {
  const schemas = loadSchemas();
  if (fixtureName.includes('kidney')) {
    return schemas.kidneySpecialistSchema;
  }
  if (fixtureName.includes('big-bros')) {
    return schemas.bigBrosSchema;
  }
  if (fixtureName.includes('agency')) {
    return schemas.agencySchema;
  }
  const fixturePath = path.resolve(__dirname, 'fixtures', fixtureName);
  if (!fs.existsSync(fixturePath)) {
    throw new Error(`Fixture not found: ${fixturePath}`);
  }
  return JSON.parse(fs.readFileSync(fixturePath, 'utf8'));
}
