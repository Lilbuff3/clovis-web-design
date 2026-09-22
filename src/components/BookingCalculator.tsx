import { Phone, MessageSquare, Check, X } from "lucide-react";
import {
  SCOPE_TIERS,
  RETAINER_TIERS,
  LAUNCH_PROMO,
  formatSmsUri,
} from "@/data/calculator";
import { usePointerGlow } from "@/hooks/usePointerGlow";

interface BookingCalculatorProps {
  onOpenBrief?: () => void;
}

const carePlan = RETAINER_TIERS.find((r) => r.id === "care")!;

export default function BookingCalculator({ onOpenBrief }: BookingCalculatorProps) {
  const glowRef = usePointerGlow<HTMLDivElement>();

  return (
    <section
      id="calculator"
      className="scroll-mt-24 border-t border-ink/10 py-24 sm:py-32"
      aria-label="Pricing"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" data-reveal>
        {/* Section Header */}
        <div className="text-center">
          <span className="t-eyebrow text-stone">Pricing</span>
          <h2 className="t-h2 mt-3 text-ink">
            One price up front.{" "}
            <span className="italic text-clay">No monthly required.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-ink-soft sm:text-lg leading-relaxed">
            You own the site the day it goes live &mdash; the code, the domain,
            all of it. Nothing here holds your website hostage.
          </p>
        </div>

        {/* Tier Cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {SCOPE_TIERS.map((tier) => {
            const isFeatured = tier.price !== null;
            return (
              <div
                key={tier.id}
                ref={isFeatured ? glowRef : undefined}
                className={`group relative flex flex-col rounded-3xl border p-7 transition-all duration-300 ${
                  isFeatured
                    ? "border-clay bg-linen shadow-lg ring-1 ring-clay/40"
                    : "border-ink/10 bg-paper-deep/30 hover:border-ink/25"
                }`}
              >
                {isFeatured && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(400px circle at var(--mx,50%) var(--my,0%), rgb(176 80 58 / 0.07), transparent 65%)",
                    }}
                  />
                )}

                {isFeatured && LAUNCH_PROMO.active && (
                  <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-clay px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-linen">
                    Launch offer &middot; {LAUNCH_PROMO.blurb}
                  </span>
                )}

                <h3 className="font-serif text-2xl font-bold text-ink">
                  {tier.title}
                </h3>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                  {tier.subtitle}
                </p>

                {/* Price */}
                <div className="mt-6 flex items-baseline gap-3 border-t border-ink/10 pt-5">
                  {tier.price !== null ? (
                    <>
                      <span className="font-serif text-4xl font-bold text-ink">
                        ${tier.price.toLocaleString()}
                      </span>
                      {tier.regularPrice && (
                        <span className="font-serif text-lg text-stone line-through">
                          ${tier.regularPrice.toLocaleString()}
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="font-serif text-3xl font-bold text-ink">
                      {tier.priceLabel}
                    </span>
                  )}
                </div>
                <span className="mt-1 block font-mono text-[11px] uppercase tracking-wider text-stone">
                  {tier.timeline}
                </span>

                {/* Features */}
                <ul className="mt-6 space-y-2.5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-sm text-ink-soft">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-olive"
                        aria-hidden="true"
                      />
                      <span className="leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* What this tier deliberately leaves out */}
                {tier.excludes && (
                  <ul className="mt-4 space-y-2 border-t border-ink/10 pt-4">
                    {tier.excludes.map((f) => (
                      <li key={f} className="flex gap-2.5 text-sm text-stone">
                        <X
                          className="mt-0.5 h-4 w-4 shrink-0 text-stone/70"
                          aria-hidden="true"
                        />
                        <span className="leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <p className="mt-6 text-xs text-ink-soft leading-relaxed">
                  {tier.bestFor}
                </p>

                {/* Per-tier CTA */}
                <div className="mt-7 flex flex-wrap gap-2.5 pt-1">
                  <a
                    href="tel:5595753014"
                    className={`inline-flex min-h-[48px] w-full items-center justify-center sm:flex-1 gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-clay focus:ring-offset-2 ${
                      isFeatured
                        ? "bg-ink text-linen hover:bg-clay"
                        : "border border-ink/20 text-ink hover:border-ink"
                    }`}
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    <span>Call</span>
                  </a>
                  <a
                    href={formatSmsUri(tier.title)}
                    className="inline-flex min-h-[48px] w-full items-center justify-center sm:flex-1 gap-2 rounded-full border border-ink/20 px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-clay hover:text-clay focus:outline-none focus:ring-2 focus:ring-clay focus:ring-offset-2"
                  >
                    <MessageSquare className="h-4 w-4" aria-hidden="true" />
                    <span>Text</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Optional care plan */}
        <div className="mt-8 rounded-3xl border border-ink/10 bg-paper-deep/40 p-7 sm:p-9">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <div className="flex flex-wrap items-baseline gap-3">
                <h3 className="font-serif text-xl font-bold text-ink">
                  {carePlan.title}
                </h3>
                <span className="font-serif text-2xl font-bold text-ink">
                  ${carePlan.monthlyPrice}
                  <span className="text-sm font-normal text-stone">/mo</span>
                </span>
                <span className="rounded-full border border-olive/40 bg-olive/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-olive">
                  Optional
                </span>
              </div>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                {carePlan.description}
              </p>
            </div>
            <ul className="grid gap-2 sm:min-w-[19rem]">
              {carePlan.features.map((f) => (
                <li key={f} className="flex gap-2.5 text-sm text-ink-soft">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-olive"
                    aria-hidden="true"
                  />
                  <span className="leading-snug">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Closing line */}
        <p className="mt-8 text-center text-sm text-ink-soft">
          Not sure which one you need? Call or text me and I&rsquo;ll tell you
          straight &mdash; even if the answer is that you don&rsquo;t need me
          yet.
          {onOpenBrief && (
            <>
              {" "}
              <button
                type="button"
                onClick={() => onOpenBrief()}
                className="rounded font-semibold text-clay underline underline-offset-4 hover:text-ink focus:outline-none focus:ring-2 focus:ring-clay"
              >
                Or send the details in writing.
              </button>
            </>
          )}
        </p>
      </div>
    </section>
  );
}
