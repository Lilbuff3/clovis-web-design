import { useCountUp } from "@/hooks/useCountUp";

interface AuditCardProps {
  label: string;
  score: number;
  description: string;
}

function AuditGauge({ label, score, description }: AuditCardProps) {
  const { ref, display, value } = useCountUp(score, 0, 1400);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div
      ref={ref as any}
      className="paper-card flex flex-col items-center justify-between rounded-3xl border border-ink/10 bg-linen/90 p-8 text-center shadow-xs transition-all duration-300 hover:shadow-md"
    >
      <div className="relative flex h-32 w-32 items-center justify-center">
        {/* Background track */}
        <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            className="stroke-stone-light/30"
            strokeWidth="8"
            fill="transparent"
          />
          {/* Animated Gauge Ring */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            className="stroke-olive transition-all duration-300 ease-out"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Numeric Readout in Center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-serif text-3xl font-bold tracking-tight text-ink">
            {display}
          </span>
          <span className="text-[10px] font-mono text-stone uppercase tracking-widest">
            / 100
          </span>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-serif font-bold text-ink">{label}</h3>
        <p className="mt-1 text-xs text-ink-soft">{description}</p>
      </div>
    </div>
  );
}

export default function TheReceipt() {
  const categories = [
    {
      label: "Performance",
      score: 100,
      description: "Sub-second LCP and zero layout shifts on mobile 4G networks.",
    },
    {
      label: "Accessibility",
      score: 100,
      description: "WCAG 2.1 AA compliant color contrast (12.6:1+) and focus loops.",
    },
    {
      label: "Best Practices",
      score: 100,
      description: "Strict HTTPS, modern image formats, and zero vulnerable dependencies.",
    },
    {
      label: "SEO",
      score: 100,
      description: "Schema.org structured graphs, semantic markup, and indexable robots.",
    },
  ];

  return (
    <section
      id="receipt"
      className="scroll-mt-24 border-t border-ink/10 bg-paper-deep/30 py-24 sm:py-32"
      aria-label="The Receipt Performance Audit"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" data-reveal>
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="t-eyebrow text-stone">The Receipt</span>
          <h2 className="t-h2 mt-3 text-ink">
            100/100 Core Web Vitals. <br />
            <span className="italic text-clay">Not an aspiration — a guarantee.</span>
          </h2>
          <p className="mt-4 text-base text-ink-soft sm:text-lg leading-relaxed">
            Most agency websites score in the 40s on mobile devices, bleeding customers to page lag and frustrating Google's search crawlers. Every flagship we ship achieves a perfect scorecard across all four Google audit pillars.
          </p>
        </div>

        {/* 4-Column Gauge Cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
          {categories.map((cat, idx) => (
            <AuditGauge
              key={idx}
              label={cat.label}
              score={cat.score}
              description={cat.description}
            />
          ))}
        </div>

        {/* Core Web Vitals Numeric Specs & Disclosure Banner */}
        <div className="mt-12 rounded-3xl border border-ink/10 bg-paper p-8 shadow-sm sm:p-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:divide-x md:divide-ink/10">
            <div className="flex flex-col items-center text-center">
              <span className="font-mono text-3xl font-bold text-olive">
                0.6s
              </span>
              <span className="mt-1 text-xs font-semibold uppercase tracking-wider text-ink">
                Largest Contentful Paint (LCP)
              </span>
              <p className="mt-1 text-xs text-stone">
                Target under 1.0s (Google Good is &lt;2.5s)
              </p>
            </div>

            <div className="flex flex-col items-center text-center md:pl-8">
              <span className="font-mono text-3xl font-bold text-olive">
                0.0
              </span>
              <span className="mt-1 text-xs font-semibold uppercase tracking-wider text-ink">
                Cumulative Layout Shift (CLS)
              </span>
              <p className="mt-1 text-xs text-stone">
                Zero jarring visual movement while assets load
              </p>
            </div>

            <div className="flex flex-col items-center text-center md:pl-8">
              <span className="font-mono text-3xl font-bold text-olive">
                45ms
              </span>
              <span className="mt-1 text-xs font-semibold uppercase tracking-wider text-ink">
                Interaction to Next Paint (INP)
              </span>
              <p className="mt-1 text-xs text-stone">
                Instantaneous button and navigation responsiveness
              </p>
            </div>
          </div>

          {/* Genuine Testing Environment Disclosure */}
          <div className="mt-8 border-t border-ink/10 pt-6 text-center">
            <p className="text-xs font-mono text-ink-soft sm:text-sm">
              Measured on a throttled 4G Android device in Madera — not on gigabit fiber in a quiet studio.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
