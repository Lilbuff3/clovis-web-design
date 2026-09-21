import { Phone } from "lucide-react";

interface HeroProps {
  onOpenBrief?: () => void;
}

export default function Hero({ onOpenBrief }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden px-4 pt-32 pb-20 text-center sm:px-6 lg:px-8"
      aria-label="Hero Introduction"
    >
      {/* Subtle organic radial background illumination */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-60"
        aria-hidden="true"
      >
        <div className="h-[650px] w-[650px] rounded-full bg-paper-deep/80 blur-3xl sm:h-[800px] sm:w-[800px]" />
      </div>

      <div className="mx-auto max-w-5xl" data-reveal>
        {/* Availability Badge */}
        <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-stone-light/70 bg-paper-deep/80 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-ink-soft shadow-xs backdrop-blur">
          <span className="relative flex h-2.5 w-2.5 items-center justify-center">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
              style={{ backgroundColor: "#5b6a4a" }}
            />
            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{ backgroundColor: "#5b6a4a" }}
            />
          </span>
          <span className="font-sans font-semibold text-ink">
            Booking two flagships for 2026
          </span>
        </div>

        {/* Display Headline */}
        <h1 className="text-3xl font-display font-light tracking-tight text-ink sm:text-6xl md:text-7xl lg:text-8xl leading-[1.08]">
          Fortune 500 craft. <br />
          <span className="italic font-normal text-clay">Main Street soul.</span>
        </h1>

        {/* Craftsman Narrative Copy */}
        <p className="mx-auto mt-6 max-w-3xl text-base text-ink-soft sm:mt-8 sm:text-xl leading-relaxed">
          Handcrafted digital flagships, Google Business Profile dominance, and hyper-local SEO for independent Central Valley businesses. Hand-crafted in Clovis, California by Adam Youssef — Principal Craftsman &amp; Founder.
        </p>

        {/* Interactive Action CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#calculator"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-sm font-medium text-linen shadow-xl transition-all duration-300 hover:bg-clay hover:shadow-clay/25 focus:outline-none focus:ring-2 focus:ring-clay focus:ring-offset-2"
          >
            <span>Calculate Project Scope</span>
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
              ↗
            </span>
          </a>

          <a
            href="#case-studies"
            className="inline-flex items-center gap-2 rounded-full border border-ink/20 bg-paper/50 px-7 py-4 text-sm font-medium text-ink backdrop-blur transition-all duration-300 hover:border-ink hover:bg-ink/[0.05] focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2"
          >
            <span>View Verified Case Studies</span>
            <span className="text-stone">↓</span>
          </a>

          {onOpenBrief && (
            <button
              type="button"
              onClick={onOpenBrief}
              className="inline-flex items-center gap-2 rounded-full border border-clay/30 bg-clay/5 px-6 py-4 text-sm font-medium text-clay transition-all duration-300 hover:bg-clay/10 focus:outline-none focus:ring-2 focus:ring-clay"
            >
              <span>Quick Brief Generator</span>
              <span>⚡</span>
            </button>
          )}
        </div>

        {/* Direct Call / SMS Line */}
        <div className="mt-6 flex items-center justify-center">
          <a
            href="tel:5595753014"
            className="group inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper/70 px-4 py-2 text-xs font-medium text-ink-soft transition-colors hover:border-clay hover:text-clay"
          >
            <Phone className="h-3.5 w-3.5 text-clay transition-transform group-hover:scale-110" />
            <span>Direct Cell &amp; Text: <strong className="font-semibold text-ink group-hover:text-clay">(559) 575-3014</strong></span>
          </a>
        </div>

        {/* Proof Stats Row */}
        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-3 divide-x divide-ink/10 rounded-2xl border border-ink/10 bg-linen/70 p-4 shadow-sm backdrop-blur sm:p-6">
          <div className="flex flex-col items-center justify-center px-2 sm:px-6">
            <span className="font-serif text-2xl font-bold tracking-tight text-ink sm:text-4xl">
              100/100
            </span>
            <span className="mt-1 text-xs font-medium uppercase tracking-wider text-stone">
              Core Web Vitals
            </span>
          </div>

          <div className="flex flex-col items-center justify-center px-2 sm:px-6">
            <span className="font-serif text-2xl font-bold tracking-tight text-ink sm:text-4xl">
              4–6 Wks
            </span>
            <span className="mt-1 text-xs font-medium uppercase tracking-wider text-stone">
              Turnaround
            </span>
          </div>

          <div className="flex flex-col items-center justify-center px-2 sm:px-6">
            <span className="font-serif text-2xl font-bold tracking-tight text-ink sm:text-4xl">
              100%
            </span>
            <span className="mt-1 text-xs font-medium uppercase tracking-wider text-stone">
              Asset Ownership
            </span>
          </div>
        </div>

        {/* Rotating Circular Badge Seal */}
        <div className="mt-12 flex justify-center">
          <div className="relative flex h-28 w-28 items-center justify-center">
            <svg
              className="animate-spin-slow h-full w-full text-stone-light/90"
              viewBox="0 0 120 120"
              aria-hidden="true"
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 60, 60 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
                />
              </defs>
              <text
                className="fill-current text-[10.5px] font-mono uppercase tracking-[0.24em]"
              >
                <textPath href="#circlePath">
                  Craftsman Web Creation · Clovis, California ·
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-serif text-sm font-bold text-clay">EST. 2026</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
