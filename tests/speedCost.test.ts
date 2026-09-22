import assert from "node:assert/strict";
import { bounceIncrease, speedCost } from "../src/lib/speedCost.ts";

assert.equal(bounceIncrease(0.5), 0);
assert.equal(bounceIncrease(1), 0);
assert.equal(bounceIncrease(3), 0.32);
assert.ok(Math.abs(bounceIncrease(4) - 0.61) < 1e-9); // halfway between 3s and 5s
assert.equal(bounceIncrease(30), 1.23);

// 300 visitors at 5s: 40% × 0.90 = 36% extra bounce → 108 lost → 5.4 leads → 2.7 jobs × $500
const r = speedCost({ seconds: 5, visitors: 300, jobValue: 500, closeRate: 0.5 }, 500);
assert.ok(Math.abs(r.lostVisitors - 108) < 1e-9);
assert.ok(Math.abs(r.lostPerMonth - 1350) < 1e-9);
assert.equal(r.paybackDays, 12);

// A fast site loses nothing and has no payback figure.
assert.equal(speedCost({ seconds: 1, visitors: 300, jobValue: 500, closeRate: 0.5 }, 500).paybackDays, null);

// Extra bounce is capped at the 60% who would have stayed (0.4 × 1.23 = 0.49 < 0.6, so not hit at defaults).
assert.ok(speedCost({ seconds: 10, visitors: 100, jobValue: 1, closeRate: 1 }, 500).lostVisitors <= 60);

console.log("speedCost: ok");
