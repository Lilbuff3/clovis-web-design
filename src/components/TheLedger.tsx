import { usePointerGlow } from "@/hooks/usePointerGlow";
import type { LedgerRow } from "@/types";

const LEDGER_ROWS: LedgerRow[] = [
  {
    category: "Team Structure & Communications",
    typicalAgency:
      "14-person bloat: junior interns, account managers, and committee layers. Your project is handed off to entry-level freelancers.",
    typicalCost: "30% overhead markup",
    clovisCraft:
      "Direct craftsman: 100% designed, coded, and deployed by Adam Youssef. Direct phone and SMS access to your engineer ((559) 575-3014).",
    clovisCost: "Zero account bloat",
    differenceNote: "Direct accountability with zero middleman translation loss.",
  },
  {
    category: "Asset & Code Ownership",
    typicalAgency:
      "Hostage hosting on proprietary CMS with recurring vendor lock-in fees. Canceling means losing your design and data.",
    typicalCost: "$350–$1,200/mo hostage retainer",
    clovisCraft:
      "100% code, domain, and asset ownership transferred day one. Zero proprietary CMS lock-in. Host anywhere in the world.",
    clovisCost: "100% Client Owned",
    differenceNote: "Complete legal independence from day one.",
  },
  {
    category: "Development & Performance Standard",
    typicalAgency:
      "Bloated WordPress or Webflow templates loaded with 40+ plugins, resulting in 3.8s–7.4s mobile load times and 42/100 CWV scores.",
    typicalCost: "High bounce rate & lost SEO",
    clovisCraft:
      "Hand-coded React 19 + TypeScript + Tailwind CSS single-file bundle. Verified 100/100 Core Web Vitals with <600ms mobile LCP.",
    clovisCost: "100/100 CWV Guaranteed",
    differenceNote: "Sub-second speed on throttled 4G Android networks.",
  },
  {
    category: "Copywriting & Strategic Direction",
    typicalAgency:
      "Client is assigned a blank 30-page questionnaire and forced to write their own copy, or receives generic AI fluff.",
    typicalCost: "6–12 weeks of client fatigue",
    clovisCraft:
      "Interview-driven copywriting authored entirely by Adam from a 45-minute founder session. Authentic bilingual EN/ES trade copy.",
    clovisCost: "Turnkey craftsman copy",
    differenceNote: "We do the heavy writing lifting based on your actual voice.",
  },
  {
    category: "Pricing Transparency & Invoicing",
    typicalAgency:
      "$80,000 – $180,000 with endless change orders and inflated hourly billing. Surprise invoices for basic text modifications.",
    typicalCost: "$80k–$180k + hidden fees",
    clovisCraft:
      "$9,500 – $22,000 flat-rate milestones with zero hidden fees. Fixed scope, guaranteed delivery date, and 90-day warranty.",
    clovisCost: "$9,500 – $22,000 Flat",
    differenceNote: "Zero surprise invoices. 100% milestone predictability.",
  },
];

export default function TheLedger() {
  const glowRef = usePointerGlow<HTMLDivElement>();

  return (
    <section
      id="ledger"
      className="scroll-mt-24 border-t border-ink/10 bg-paper-deep/40 py-24 sm:py-32"
      aria-label="The Anti-Agency Ledger Comparison"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" data-reveal>
        {/* Section Eyebrow & Title */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="t-eyebrow text-stone">The Anti-Agency Ledger</span>
          <h2 className="t-h2 mt-3 text-ink">
            Direct craftsman vs.{" "}
            <span className="italic text-clay">bloated agency.</span>
          </h2>
          <p className="mt-4 text-base text-ink-soft sm:text-lg leading-relaxed">
            Why Central Valley business owners choose direct engineering over account executives, $180,000 markups, and hostage hosting contracts — transparent, honest, and built by hand.
          </p>
        </div>

        {/* Pointer-Glow Comparison Container */}
        <div
          ref={glowRef}
          className="relative mt-16 overflow-hidden rounded-3xl border border-ink/15 bg-paper p-6 shadow-2xl transition-all duration-300 sm:p-10 lg:p-12"
          style={
            {
              "--mx": "50%",
              "--my": "50%",
            } as React.CSSProperties
          }
        >
          {/* Spotlight Radial Overlay */}
          <div
            className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 lg:opacity-100"
            style={{
              background:
                "radial-gradient(800px circle at var(--mx) var(--my), rgba(176, 80, 58, 0.08), transparent 60%)",
            }}
            aria-hidden="true"
          />

          {/* Table Header */}
          <div className="grid grid-cols-1 gap-6 border-b border-ink/15 pb-6 md:grid-cols-2 lg:grid-cols-2 lg:gap-12">
            <div className="rounded-2xl border border-ink/10 bg-paper-deep/50 p-6">
              <span className="inline-block rounded-full bg-stone/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-stone">
                The Status Quo
              </span>
              <h3 className="mt-2 text-2xl font-serif font-bold text-ink">
                Typical Agency / Corporate Firm
              </h3>
              <p className="mt-1 text-xs text-stone">
                14-person headcount, account layers, $80k–$180k retainers
              </p>
            </div>

            <div className="rounded-2xl border border-clay/30 bg-clay/5 p-6 ring-1 ring-clay/20">
              <span className="inline-block rounded-full bg-clay/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-clay">
                The Craftsman Standard
              </span>
              <h3 className="mt-2 text-2xl font-serif font-bold text-ink">
                Clovis Web Design (Adam Youssef)
              </h3>
              <p className="mt-1 text-xs text-clay">
                Solo senior engineering, $9,500–$22,000 flat, 100% day-one asset ownership
              </p>
            </div>
          </div>

          {/* Comparison Rows */}
          <div className="mt-6 divide-y divide-ink/10">
            {LEDGER_ROWS.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 gap-6 py-8 transition-colors duration-200 hover:bg-paper-deep/20 md:grid-cols-2 lg:grid-cols-2 lg:gap-12"
              >
                {/* Agency Column */}
                <div className="flex flex-col justify-between pr-0 lg:pr-4">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-stone">
                      {row.category}
                    </span>
                    <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                      {row.typicalAgency}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-ink/5 pt-2 text-xs font-mono text-stone">
                    <span>Observed Cost:</span>
                    <span className="font-semibold text-clay-deep">
                      {row.typicalCost}
                    </span>
                  </div>
                </div>

                {/* Clovis Craftsman Column */}
                <div className="flex flex-col justify-between border-l-0 border-clay/20 pl-0 lg:border-l lg:pl-6">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-clay">
                        {row.category}
                      </span>
                      <span
                        className="text-xs text-olive font-medium"
                        aria-label="Included"
                      >
                        <span aria-hidden="true">✓ </span>Included
                        <span className="sr-only"> in standard scope</span>
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-ink font-medium leading-relaxed">
                      {row.clovisCraft}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-clay/10 pt-2 text-xs font-mono text-ink">
                    <span>Milestone Price:</span>
                    <span className="font-bold text-olive-deep">
                      {row.clovisCost}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Summary Bar */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-linen/90 p-6 sm:flex-row">
            <div className="text-left">
              <span className="text-xs font-mono uppercase tracking-wider text-stone">
                The Bottom Line
              </span>
              <p className="mt-1 text-sm font-serif font-bold text-ink">
                $9,500 – $22,000 flat-rate delivery vs. $80,000 – $180,000 agency overhead.
              </p>
            </div>
            <a
              href="#calculator"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-xs font-semibold uppercase tracking-wider text-linen shadow-md transition-all hover:bg-clay"
            >
              <span>Build Your Exact Estimate</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
