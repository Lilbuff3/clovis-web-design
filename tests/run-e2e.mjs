#!/usr/bin/env node
// Clovis Web Design — Master E2E Test Suite Runner
// Zero-dependency, requirement-driven opaque-box verification across Tiers 1–4

import { tier1Tests } from './tier1-feature-coverage.mjs';
import { tier2Tests } from './tier2-boundary-cases.mjs';
import { tier3Tests } from './tier3-cross-feature.mjs';
import { tier4Tests } from './tier4-real-scenarios.mjs';
import { PROJECT_ROOT } from './test-harness.mjs';

// Parse command line arguments
const args = process.argv.slice(2);
const options = {
  tier: null,
  feature: null,
  verbose: false,
};

for (const arg of args) {
  if (arg.startsWith('--tier=')) {
    options.tier = parseInt(arg.split('=')[1], 10);
  } else if (arg.startsWith('--feature=')) {
    options.feature = parseInt(arg.split('=')[1], 10);
  } else if (arg === '--verbose' || arg === '-v') {
    options.verbose = true;
  } else if (arg === '--help' || arg === '-h') {
    console.log(`
Clovis Web Design — E2E Test Runner

Usage:
  node tests/run-e2e.mjs [options]

Options:
  --tier=N       Run specific tier (1, 2, 3, or 4)
  --feature=N    Filter tests by feature number (1-15)
  --verbose, -v  Show detailed diagnostic output for every test
  --help, -h     Show this help message
`);
    process.exit(0);
  }
}

// Assemble test pool
let allTests = [
  ...tier1Tests.map((t) => ({ ...t, tier: 1 })),
  ...tier2Tests.map((t) => ({ ...t, tier: 2 })),
  ...tier3Tests.map((t) => ({ ...t, tier: 3 })),
  ...tier4Tests.map((t) => ({ ...t, tier: 4 })),
];

if (options.tier !== null) {
  allTests = allTests.filter((t) => t.tier === options.tier);
}

if (options.feature !== null) {
  allTests = allTests.filter((t) => t.featureId === options.feature);
}

console.log('='.repeat(72));
console.log('       CLOVIS WEB DESIGN — END-TO-END TEST SUITE RUNNER');
console.log('='.repeat(72));
console.log(`Target:       ${PROJECT_ROOT}`);
console.log(`Suite Scope:  Tiers 1–4 (Features 1–15, Boundaries, Cross-Feature, Scenarios)`);
console.log(`Total Tests:  ${allTests.length} registered test cases`);
if (options.tier) console.log(`Filter:       Tier ${options.tier} only`);
if (options.feature) console.log(`Filter:       Feature ${options.feature} only`);
console.log('-'.repeat(72));

const stats = {
  total: allTests.length,
  passed: 0,
  failed: 0,
  tierStats: {
    1: { total: 0, passed: 0, failed: 0 },
    2: { total: 0, passed: 0, failed: 0 },
    3: { total: 0, passed: 0, failed: 0 },
    4: { total: 0, passed: 0, failed: 0 },
  },
  failures: [],
};

const startTime = Date.now();

for (const test of allTests) {
  const tierTracker = stats.tierStats[test.tier];
  tierTracker.total++;

  try {
    test.fn();
    stats.passed++;
    tierTracker.passed++;
    if (options.verbose) {
      console.log(`  [PASS] [Tier ${test.tier}] ${test.id}: ${test.name}`);
    }
  } catch (error) {
    stats.failed++;
    tierTracker.failed++;
    stats.failures.push({
      test,
      error,
    });
    console.error(`  [FAIL] [Tier ${test.tier}] ${test.id}: ${test.name}`);
    if (options.verbose) {
      console.error(`         ${error.message}`);
    }
  }
}

const elapsedTime = Date.now() - startTime;

console.log('-'.repeat(72));
console.log('                         EXECUTION SUMMARY');
console.log('-'.repeat(72));
console.log(`  Tier 1 (Feature Coverage):        ${stats.tierStats[1].passed}/${stats.tierStats[1].total} passed`);
console.log(`  Tier 2 (Boundary & Corner Cases): ${stats.tierStats[2].passed}/${stats.tierStats[2].total} passed`);
console.log(`  Tier 3 (Cross-Feature Pairwise):  ${stats.tierStats[3].passed}/${stats.tierStats[3].total} passed`);
console.log(`  Tier 4 (Real-World Scenarios):    ${stats.tierStats[4].passed}/${stats.tierStats[4].total} passed`);
console.log('-'.repeat(72));
console.log(`  TOTAL RESULTS: ${stats.passed} PASSED, ${stats.failed} FAILED in ${elapsedTime}ms`);
console.log('='.repeat(72));

if (stats.failed > 0) {
  console.error('\nFAILURE DETAILS:');
  stats.failures.forEach(({ test, error }, index) => {
    console.error(`\n${index + 1}) [Tier ${test.tier}] ${test.id} - ${test.name}`);
    console.error(`   Error: ${error.message}`);
    if (error.stack) {
      console.error(`   Stack: ${error.stack.split('\n').slice(1, 4).join('\n')}`);
    }
  });
  console.log('\nVERDICT: FAIL — All tests must pass before production deployment.');
  process.exit(1);
} else {
  console.log('\nVERDICT: PASS — 100% of requirement-driven E2E tests succeeded.');
  process.exit(0);
}
