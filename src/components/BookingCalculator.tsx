import { useState, useMemo } from "react";
import type { ScopeTier, RetainerTier } from "@/types";
import {
  SCOPE_TIERS,
  RETAINER_TIERS,
  ADDON_CONFIGS,
  calculateQuote,
  formatMailtoUri,
} from "@/data/calculator";

interface BookingCalculatorProps {
  onOpenBrief?: (config?: {
    tier: ScopeTier;
    retainer: RetainerTier;
    addons: string[];
    setupTotal: number;
    monthlyTotal: number;
  }) => void;
}

export default function BookingCalculator({ onOpenBrief }: BookingCalculatorProps) {
  const [selectedTier, setSelectedTier] = useState<ScopeTier>("flagship");
  const [selectedRetainer, setSelectedRetainer] = useState<RetainerTier>("none");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const quote = useMemo(() => {
    return calculateQuote(selectedTier, selectedRetainer, selectedAddons);
  }, [selectedTier, selectedRetainer, selectedAddons]);

  const activeTierConfig = SCOPE_TIERS.find((t) => t.id === selectedTier)!;
  const activeRetainerConfig = RETAINER_TIERS.find((r) => r.id === selectedRetainer)!;

  const mailtoUri = useMemo(() => {
    const addonNames = selectedAddons
      .map((a) => (a === "bilingual" ? "Bilingual EN/ES" : "Regulatory Compliance"))
      .join(", ") || "None";

    const subject = `Project Scope Estimate: ${quote.tierTitle} ($${quote.setupTotal.toLocaleString()})`;
    const body = [
      `Hi Adam,`,
      ``,
      `I configured a project scope estimate on cloviswebdesign.com:`,
      `- Selected Scope Tier: ${activeTierConfig.title} ($${activeTierConfig.price.toLocaleString()} setup)`,
      `- Selected Add-ons: ${addonNames}`,
      `- Monthly Retainer: ${quote.retainerTitle} ($${quote.monthlyTotal.toLocaleString()}/mo)`,
      `- Total Milestone Setup: $${quote.setupTotal.toLocaleString()}`,
      ``,
      `Let's schedule a call to review requirements and lock in our build window.`,
    ].join("\n");

    return formatMailtoUri({
      to: "adam@cloviswebdesign.com",
      subject,
      body,
    });
  }, [quote, selectedAddons]);

  return (
    <section
      id="calculator"
      className="scroll-mt-24 border-t border-ink/10 py-24 sm:py-32"
      aria-label="Interactive Scope and Retainer Calculator"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" data-reveal>
        {/* Section Header */}
        <div className="text-center">
          <span className="t-eyebrow text-stone">Transparent Pricing</span>
          <h2 className="t-h2 mt-3 text-ink">
            Interactive scope &amp;{" "}
            <span className="italic text-clay">quote estimator.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-ink-soft sm:text-lg leading-relaxed">
            Configure your project scope and ongoing SEO retainers with real-time price modeling. Zero hidden markups, zero hostage retainers, 100% day-one asset ownership.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Controls Column (Left, 7 Cols) */}
          <div className="space-y-12 lg:col-span-7">
            {/* Step 1: Scope Tier Selector */}
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-clay">
                  Step 01
                </span>
                <span className="h-px w-8 bg-clay/30" />
                <h3 className="font-serif text-xl font-bold text-ink">
                  Select Project Scope Tier
                </h3>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {SCOPE_TIERS.map((tier) => {
                  const isSelected = selectedTier === tier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setSelectedTier(tier.id)}
                      className={`flex flex-col justify-between rounded-2xl border p-5 text-left transition-all duration-300 min-h-[48px] focus:outline-none focus:ring-2 focus:ring-clay ${
                        isSelected
                          ? "border-clay bg-clay/5 shadow-md ring-1 ring-clay"
                          : "border-ink/10 bg-linen hover:border-ink/30"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-serif text-lg font-bold text-ink">
                            {tier.title}
                          </span>
                          {isSelected && (
                            <span className="text-xs font-bold text-clay">
                              ●
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-xs text-ink-soft leading-snug">
                          {tier.subtitle}
                        </p>
                      </div>

                      <div className="mt-6 border-t border-ink/5 pt-3">
                        <span className="font-serif text-2xl font-bold text-ink">
                          ${tier.price.toLocaleString()}
                        </span>
                        <span className="block text-[10px] font-mono uppercase text-stone">
                          {tier.timeline} Turnaround
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Best For Note */}
              <div className="mt-4 rounded-xl border border-ink/10 bg-paper-deep/40 p-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-ink">
                  Recommended For:
                </span>
                <p className="mt-1 text-xs text-ink-soft leading-relaxed">
                  {activeTierConfig.bestFor}
                </p>
              </div>
            </div>

            {/* Step 2: Monthly SEO Retainer Options */}
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-clay">
                  Step 02
                </span>
                <span className="h-px w-8 bg-clay/30" />
                <h3 className="font-serif text-xl font-bold text-ink">
                  Choose Monthly Maintenance &amp; Growth Retainer
                </h3>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {RETAINER_TIERS.map((ret) => {
                  const isSelected = selectedRetainer === ret.id;
                  return (
                    <button
                      key={ret.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setSelectedRetainer(ret.id)}
                      className={`flex flex-col justify-between rounded-2xl border p-5 text-left transition-all duration-300 min-h-[48px] focus:outline-none focus:ring-2 focus:ring-clay ${
                        isSelected
                          ? "border-clay bg-clay/5 shadow-md ring-1 ring-clay"
                          : "border-ink/10 bg-linen hover:border-ink/30"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-serif text-base font-bold text-ink">
                            {ret.title}
                          </span>
                          {isSelected && (
                            <span className="text-xs font-bold text-clay">
                              ●
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-xs text-ink-soft leading-snug">
                          {ret.description}
                        </p>
                      </div>

                      <div className="mt-6 border-t border-ink/5 pt-3">
                        <span className="font-serif text-xl font-bold text-ink">
                          {ret.monthlyPrice === 0
                            ? "$0 / mo"
                            : `$${ret.monthlyPrice.toLocaleString()} / mo`}
                        </span>
                        <span className="block text-[10px] font-mono uppercase text-stone">
                          Month-to-month
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Optional Strategic Add-ons */}
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-clay">
                  Step 03
                </span>
                <span className="h-px w-8 bg-clay/30" />
                <h3 className="font-serif text-xl font-bold text-ink">
                  Optional Strategic Add-ons
                </h3>
              </div>

              <div className="mt-6 space-y-4">
                {ADDON_CONFIGS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`flex cursor-pointer items-start justify-between rounded-2xl border p-5 transition-all duration-300 min-h-[48px] ${
                        isChecked
                          ? "border-clay bg-clay/5 shadow-xs"
                          : "border-ink/10 bg-linen hover:border-ink/30"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <input
                          id={`addon-${addon.id}`}
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleAddon(addon.id)}
                          aria-label={addon.title}
                          className="mt-1 h-5 w-5 rounded border-ink/20 text-clay focus:ring-clay cursor-pointer"
                        />
                        <div>
                          <h4 className="font-serif text-base font-bold text-ink">
                            {addon.title}
                          </h4>
                          <p className="mt-1 text-xs text-ink-soft leading-relaxed max-w-lg">
                            {addon.description}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0 pl-4">
                        <span className="font-serif text-lg font-bold text-ink">
                          +${addon.price.toLocaleString()}
                        </span>
                        <span className="block text-[10px] font-mono text-stone uppercase">
                          One-time
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Real-Time Itemized Quote Ledger (Right, 5 Cols) */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 rounded-3xl border border-ink/15 bg-paper p-8 shadow-xl sm:p-10">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-clay">
                Live Estimate Summary
              </span>
              <h3 className="mt-2 text-2xl font-serif font-bold text-ink">
                Itemized Investment Breakdown
              </h3>

              {/* Itemized Line Items */}
              <div className="mt-8 divide-y divide-ink/10 text-sm">
                <div className="flex items-center justify-between py-3">
                  <div>
                    <span className="font-serif font-medium text-ink">
                      {activeTierConfig.title} Tier
                    </span>
                    <span className="block text-xs text-stone">
                      Milestone Base Setup
                    </span>
                  </div>
                  <span className="font-mono font-bold text-ink">
                    ${activeTierConfig.price.toLocaleString()}
                  </span>
                </div>

                {selectedAddons.map((addonId) => {
                  const cfg = ADDON_CONFIGS.find((a) => a.id === addonId)!;
                  return (
                    <div
                      key={addonId}
                      className="flex items-center justify-between py-3"
                    >
                      <div>
                        <span className="font-serif font-medium text-ink">
                          {addonId === "bilingual"
                            ? "Bilingual EN/ES UX"
                            : "Regulatory Compliance"}
                        </span>
                        <span className="block text-xs text-stone">
                          One-time Add-on
                        </span>
                      </div>
                      <span className="font-mono font-bold text-ink">
                        +${cfg.price.toLocaleString()}
                      </span>
                    </div>
                  );
                })}

                <div className="flex items-center justify-between py-3">
                  <div>
                    <span className="font-serif font-medium text-ink">
                      Monthly Retainer
                    </span>
                    <span className="block text-xs text-stone">
                      {activeRetainerConfig.title}
                    </span>
                  </div>
                  <span className="font-mono font-bold text-ink">
                    ${activeRetainerConfig.monthlyPrice.toLocaleString()}/mo
                  </span>
                </div>
              </div>

              {/* Total Calculation Display */}
              <div className="mt-8 rounded-2xl border border-ink/10 bg-linen/90 p-6">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-stone">
                    Total Setup:
                  </span>
                  <span className="font-serif text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                    ${quote.setupTotal.toLocaleString()}
                  </span>
                </div>

                {quote.monthlyTotal > 0 && (
                  <div className="mt-2 flex items-baseline justify-between border-t border-ink/5 pt-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-stone">
                      Recurring Retainer:
                    </span>
                    <span className="font-serif text-lg font-bold text-olive">
                      +${quote.monthlyTotal.toLocaleString()} / mo
                    </span>
                  </div>
                )}
              </div>

              {/* Direct Mailto Dispatch Action */}
              <div className="mt-8 space-y-3">
                <a
                  href={mailtoUri}
                  onClick={() => setSubmitted(true)}
                  className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-center font-serif text-sm font-semibold uppercase tracking-wider text-linen shadow-xl transition-all duration-300 hover:bg-clay hover:shadow-clay/20 focus:outline-none focus:ring-2 focus:ring-clay"
                >
                  <span>Lock in Quote via Direct Dispatch ↗</span>
                </a>

                {onOpenBrief && (
                  <button
                    type="button"
                    onClick={() =>
                      onOpenBrief({
                        tier: selectedTier,
                        retainer: selectedRetainer,
                        addons: selectedAddons,
                        setupTotal: quote.setupTotal,
                        monthlyTotal: quote.monthlyTotal,
                      })
                    }
                    className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-ink/20 bg-paper-deep/60 px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:bg-paper-deep"
                  >
                    <span>Synthesize Structured Project Brief ⚡</span>
                  </button>
                )}
              </div>

              <div className="pt-2 text-center text-xs text-stone">
                Prefer direct phone or text? Call Adam at{" "}
                <a
                  href="tel:5595753014"
                  className="font-semibold text-ink underline decoration-clay/40 underline-offset-2 hover:text-clay transition-colors"
                >
                  (559) 575-3014
                </a>
              </div>

              {submitted && (
                <p className="mt-3 text-center text-xs text-olive font-medium">
                  ✓ Mailto client opened. We respond within 4 business hours.
                </p>
              )}

              {/* Day-One Ownership Guarantees */}
              <div className="mt-8 border-t border-ink/10 pt-6">
                <span className="block text-[11px] font-mono uppercase tracking-widest text-stone">
                  The Craftsman Guarantee:
                </span>
                <ul className="mt-2 space-y-1.5 text-xs text-ink-soft">
                  <li className="flex items-center gap-2">
                    <span className="text-olive font-bold">✓</span>
                    <span>100% Day-One Code, Domain, and Asset Ownership</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-olive font-bold">✓</span>
                    <span>100/100 Core Web Vitals Performance Standard</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-olive font-bold">✓</span>
                    <span>Comprehensive 90-Day Post-Launch Warranty</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
