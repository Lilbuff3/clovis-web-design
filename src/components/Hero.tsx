import { Phone, MessageSquare, Check } from "lucide-react";
import { LAUNCH_PROMO, SCOPE_TIERS, formatSmsUri } from "@/data/calculator";
import { usePointerGlow } from "@/hooks/usePointerGlow";
import { useCountUp } from "@/hooks/useCountUp";

interface HeroProps {
  onOpenBrief?: () => void;
}

const landing = SCOPE_TIERS.find((t) => t.id === "landing")!;

export default function Hero({ onOpenBrief }: HeroProps) {
  const glowRef = usePointerGlow<HTMLDivElement>();
  const { ref: scoreRef, display: score } = useCountUp(100, 0, 1600);

  return (
    <section
      id="hero"
      className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-4 pt-28 pb-16 text-center sm:px-6 sm:pt-32 lg:px-8"
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
        {/* Launch offer badge */}
        <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-clay/40 bg-clay/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-ink shadow-xs backdrop-blur">
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
          <span className="font-sans font-semibold">
            Launch offer &middot; {LAUNCH_PROMO.blurb}
          </span>
        </div>

        {/* Display Headline */}
        <h1 className="font-display text-4xl font-light leading-[1.08] tracking-tight text-ink sm:text-6xl md:text-7xl lg:text-8xl">
          Fortune 500 craft. <br />
          <span className="italic font-normal text-clay">Main Street soul.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-soft sm:mt-7 sm:text-xl">
          I build websites for Central Valley businesses — by hand, one at
          a time. I&rsquo;m Adam Youssef, and I work out of Clovis, California.
          You get my mobile number, not a ticket queue.
        </p>

        {/* The offer, as a receipt */}
        <div
          ref={glowRef}
          className="group relative mx-auto mt-10 max-w-md overflow-hidden rounded-2xl border border-ink/15 bg-linen/90 p-6 text-left shadow-lg backdrop-blur sm:p-7"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(400px circle at var(--mx,50%) var(--my,0%), rgb(176 80 58 / 0.08), transparent 65%)",
            }}
          />
          <div className="flex items-center justify-between border-b border-dashed border-ink/20 pb-3">
            <span className="font-mono text-[11px] uppercase tracking-widest text-stone">
              {landing.title}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-widest text-stone">
              {landing.timeline}
            </span>
          </div>

          <div className="flex items-baseline gap-3 pt-4">
            <span className="font-serif text-5xl font-bold tracking-tight text-ink">
              ${landing.price?.toLocaleString()}
            </span>
            {landing.regularPrice && (
              <span className="font-serif text-xl text-stone line-through">
                ${landing.regularPrice.toLocaleString()}
              </span>
            )}
          </div>

          <ul className="mt-4 space-y-2 border-t border-dashed border-ink/20 pt-4">
            {["One page, live in a week", "Yours on day one", "No monthly required"].map(
              (line) => (
                <li key={line} className="flex gap-2.5 text-sm text-ink-soft">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-olive"
                    aria-hidden="true"
                  />
                  <span>{line}</span>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Primary actions: call and text */}
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <a
            href="tel:5595753014"
            className="group inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full bg-ink px-8 py-4 text-base font-semibold text-linen shadow-xl transition-all duration-300 hover:bg-clay hover:shadow-clay/25 focus:outline-none focus:ring-2 focus:ring-clay focus:ring-offset-2"
          >
            <Phone className="h-4.5 w-4.5" aria-hidden="true" />
            <span>Call (559) 575-3014</span>
          </a>
          <a
            href={formatSmsUri(landing.title)}
            className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full border border-ink/25 bg-paper/60 px-8 py-4 text-base font-semibold text-ink backdrop-blur transition-all duration-300 hover:border-clay hover:text-clay focus:outline-none focus:ring-2 focus:ring-clay focus:ring-offset-2"
          >
            <MessageSquare className="h-4.5 w-4.5" aria-hidden="true" />
            <span>Text me instead</span>
          </a>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
          <a
            href="#calculator"
            className="text-ink-soft underline underline-offset-4 transition-colors hover:text-clay focus:outline-none focus:ring-2 focus:ring-clay rounded"
          >
            See what everything costs
          </a>
          <a
            href="#case-studies"
            className="text-ink-soft underline underline-offset-4 transition-colors hover:text-clay focus:outline-none focus:ring-2 focus:ring-clay rounded"
          >
            See two sites I built
          </a>
          {onOpenBrief && (
            <button
              type="button"
              onClick={onOpenBrief}
              className="rounded text-ink-soft underline underline-offset-4 transition-colors hover:text-clay focus:outline-none focus:ring-2 focus:ring-clay"
            >
              Send details in writing
            </button>
          )}
        </div>

        {/* Proof Stats Row */}
        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-3 divide-x divide-ink/10 rounded-2xl border border-ink/10 bg-linen/70 p-4 shadow-sm backdrop-blur sm:p-6">
          <div className="flex flex-col items-center justify-center px-2 sm:px-6">
            <span
              ref={scoreRef as React.RefObject<HTMLSpanElement>}
              className="font-serif text-2xl font-bold tracking-tight text-ink sm:text-4xl"
            >
              {score}/100
            </span>
            <span className="mt-1 text-xs font-medium uppercase tracking-wider text-stone">
              Core Web Vitals
            </span>
          </div>

          <div className="flex flex-col items-center justify-center px-2 sm:px-6">
            <span className="font-serif text-2xl font-bold tracking-tight text-ink sm:text-4xl">
              1 Week
            </span>
            <span className="mt-1 text-xs font-medium uppercase tracking-wider text-stone">
              To live
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
              <text className="fill-current font-mono text-[10.5px] uppercase tracking-[0.24em]">
                <textPath href="#circlePath">
                  Craftsman Web Creation &middot; Clovis, California &middot;
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-center font-serif text-[11px] font-bold leading-tight text-clay">
                Clovis
                <br />
                CA
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
