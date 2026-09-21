import { services } from "@/data/services";

export default function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-24 border-t border-ink/10 py-24 sm:py-32"
      aria-label="Three Core Services"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" data-reveal>
        {/* Section Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="t-eyebrow text-stone">What We Do</span>
            <h2 className="t-h2 mt-3 text-ink">
              Three core disciplines. <br />
              <span className="italic text-clay">Zero extraneous bloat.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-ink-soft leading-relaxed">
            We don't offer 40 confusing services or run vanity social media campaigns. We focus on the three technical systems that demonstrably drive real phone calls and revenue for Central Valley businesses.
          </p>
        </div>

        {/* 3-Card Offerings Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {services.map((service, idx) => (
            <div
              key={service.id}
              className="paper-card group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-ink/10 bg-linen/80 p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-clay/40 hover:shadow-xl"
            >
              {/* Top Hover Accent Bar */}
              <div
                className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-clay transition-transform duration-500 group-hover:scale-x-100"
                aria-hidden="true"
              />

              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold uppercase tracking-widest text-stone">
                    0{idx + 1}
                  </span>
                  <span className="rounded-full bg-paper-deep px-3 py-1 text-[11px] font-medium tracking-wider text-clay uppercase">
                    {service.deliverableTag}
                  </span>
                </div>

                {/* Service Title & Subtitle */}
                <h3 className="mt-6 text-2xl font-serif font-bold text-ink transition-colors duration-300 group-hover:text-clay">
                  {service.title}
                </h3>
                <p className="mt-2 text-xs font-serif italic text-stone">
                  {service.subtitle}
                </p>

                {/* Description */}
                <p className="mt-4 text-sm text-ink-soft leading-relaxed">
                  {service.description}
                </p>

                {/* Key Deliverable Highlights */}
                <div className="mt-8 border-t border-ink/10 pt-6">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-ink">
                    Technical Deliverables:
                  </span>
                  <ul className="mt-3 space-y-2.5">
                    {service.highlights.map((item, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5 text-xs text-ink-soft leading-snug">
                        <span className="mt-0.5 text-olive font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Link Footer */}
              <div className="mt-8 pt-6 border-t border-ink/10 flex items-center justify-between">
                <a
                  href="#calculator"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink transition-colors duration-300 hover:text-clay"
                >
                  <span>Estimate this discipline</span>
                  <span>↗</span>
                </a>
                <span className="font-mono text-[10px] text-stone">
                  Hand-crafted
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
