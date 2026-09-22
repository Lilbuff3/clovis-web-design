/**
 * Google/SOASTA (2017) mobile benchmark: as load time goes from 1s to N seconds,
 * the probability of a bounce rises by this much.
 * https://www.thinkwithgoogle.com/marketing-strategies/app-and-mobile/page-load-time-statistics/
 */
const BOUNCE_INCREASE: [seconds: number, increase: number][] = [
  [1, 0],
  [3, 0.32],
  [5, 0.9],
  [6, 1.06],
  [10, 1.23],
];

export const ASSUMPTIONS = {
  /** Share of visitors who leave even when the page is fast. */
  baseBounce: 0.4,
  /** Share of visitors who stay that call, text or fill in a form. */
  leadRate: 0.05,
} as const;

export function bounceIncrease(seconds: number): number {
  const pts = BOUNCE_INCREASE;
  if (seconds <= pts[0][0]) return 0;
  for (let i = 1; i < pts.length; i++) {
    const [x1, y1] = pts[i];
    if (seconds <= x1) {
      const [x0, y0] = pts[i - 1];
      return y0 + ((seconds - x0) / (x1 - x0)) * (y1 - y0);
    }
  }
  return pts[pts.length - 1][1]; // ponytail: flat past 10s, the study has no data beyond it
}

export interface SpeedCostInput {
  seconds: number;
  visitors: number;
  jobValue: number;
  closeRate: number;
}

export function speedCost({ seconds, visitors, jobValue, closeRate }: SpeedCostInput, price: number) {
  const { baseBounce, leadRate } = ASSUMPTIONS;
  // Bounce rate can't pass 100%, so extra bounces are capped at the visitors who would have stayed.
  const extraBounce = Math.min(baseBounce * bounceIncrease(seconds), 1 - baseBounce);
  const lostVisitors = visitors * extraBounce;
  const lostLeads = lostVisitors * leadRate;
  const lostJobs = lostLeads * closeRate;
  const lostPerMonth = lostJobs * jobValue;
  const paybackDays = lostPerMonth > 0 ? Math.ceil((price / lostPerMonth) * 30) : null;
  return { lostVisitors, lostLeads, lostJobs, lostPerMonth, paybackDays };
}
