import { processSteps } from "@/data/process";

export default function TheRecipe() {
  return (
    <section
      id="process"
      className="scroll-mt-24 border-t border-ink/20 bg-ink py-24 text-linen sm:py-32"
      aria-label="The Recipe Craftsman Process"
    >
      <div id="recipe" className="scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" data-reveal>
          {/* Section Header */}
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-clay">
                The Recipe
              </span>
              <h2 className="mt-3 font-serif text-3xl font-light tracking-tight text-linen sm:text-5xl">
                Four stages. <br />
                <span className="italic font-normal text-ember">
                  Transparent craftsmanship from day one.
                </span>
              </h2>
            </div>
            <p className="max-w-md text-sm text-stone-light leading-relaxed">
              We replace opaque agency project management with a disciplined, four-phase sprint. Every phase concludes with explicit, verified deliverables that you legally own.
            </p>
          </div>

          {/* 4-Stage Timeline Grid */}
          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <div
                key={step.number}
                className="relative flex flex-col justify-between rounded-3xl border border-linen/10 bg-ink-soft/40 p-8 transition-all duration-300 hover:border-ember/40 hover:bg-ink-soft/70"
              >
                <div>
                  {/* Step Number & Duration */}
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-4xl font-light text-clay">
                      {step.number}
                    </span>
                    <span className="rounded-full border border-linen/15 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-stone-light">
                      {step.duration}
                    </span>
                  </div>

                  {/* Stage Title */}
                  <h3 className="mt-6 font-serif text-xl font-bold text-linen">
                    {step.title}
                  </h3>

                  {/* Stage Description */}
                  <p className="mt-3 text-xs text-stone-light leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* You Walk Away With Checklist */}
                <div className="mt-8 border-t border-linen/10 pt-6">
                  <span className="block font-mono text-[11px] font-bold uppercase tracking-widest text-ember">
                    You Walk Away With:
                  </span>
                  <ul className="mt-3 space-y-2">
                    {step.deliverables.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs text-stone-light leading-snug"
                      >
                        <span className="text-olive font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Commitment Note */}
          <div className="mt-16 rounded-2xl border border-linen/10 bg-ink-soft/30 p-6 text-center">
            <p className="font-mono text-xs text-stone-light sm:text-sm">
              Standard turnaround: 4 to 6 weeks from kick-off to production DNS cutover.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
