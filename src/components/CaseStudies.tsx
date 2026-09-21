import { caseStudies } from "@/data/caseStudies";

interface CaseStudiesProps {
  onOpenCaseStudy: (id: string) => void;
}

export default function CaseStudies({ onOpenCaseStudy }: CaseStudiesProps) {
  return (
    <section
      id="case-studies"
      className="scroll-mt-24 border-t border-ink/10 py-24 sm:py-32"
      aria-label="Authentic Case Studies"
    >
      <div id="work" className="scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" data-reveal>
          {/* Section Header */}
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="t-eyebrow text-stone">Selected Flagships</span>
              <h2 className="t-h2 mt-3 text-ink">
                Built for the Central Valley. <br />
                <span className="italic text-clay">Proven in production.</span>
              </h2>
            </div>
            <p className="max-w-md text-sm text-ink-soft leading-relaxed">
              Every case study represents an authentic Central Valley business with genuine clinical, municipal franchise, and technical engineering parameters.
            </p>
          </div>

          {/* Dual Case Studies Grid */}
          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {caseStudies.map((study) => (
              <div
                key={study.id}
                onClick={() => onOpenCaseStudy(study.id)}
                className="paper-card group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border border-ink/15 bg-linen/90 p-8 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-clay/50 hover:shadow-2xl sm:p-10"
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onOpenCaseStudy(study.id);
                  }
                }}
                aria-label={`Open detailed case study for ${study.client}`}
              >
                {/* Decorative Accent Glow */}
                <div
                  className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full opacity-30 blur-2xl transition-opacity group-hover:opacity-60"
                  style={{ backgroundColor: study.accent }}
                  aria-hidden="true"
                />

                <div>
                  {/* Category Badge & Location */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span
                      className="rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-wider"
                      style={{
                        backgroundColor: study.accentSoft,
                        color: study.accent,
                      }}
                    >
                      {study.tag}
                    </span>
                    <span className="font-mono text-xs text-stone">
                      {study.location}
                    </span>
                  </div>

                  {/* Client Name & Hook */}
                  <h3 className="mt-6 text-3xl font-serif font-bold text-ink transition-colors duration-300 group-hover:text-clay">
                    {study.client} ↗
                  </h3>
                  <p className="mt-2 text-sm font-serif italic text-stone">
                    {study.headline}
                  </p>

                  <p className="mt-4 text-sm text-ink-soft leading-relaxed">
                    {study.summary}
                  </p>

                  {/* Metrics Pills */}
                  <div className="mt-8 grid grid-cols-2 gap-4 border-t border-ink/10 pt-6">
                    {study.metrics.slice(0, 2).map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className="rounded-2xl border border-ink/5 bg-paper-deep/40 p-4 text-left"
                      >
                        <span className="font-serif text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                          {m.prefix}
                          {m.value}
                          {m.suffix}
                        </span>
                        <span className="mt-1 block text-xs font-medium text-stone">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Drawer Prompt */}
                <div className="mt-8 flex items-center justify-between border-t border-ink/10 pt-6">
                  <div className="flex flex-wrap gap-2">
                    {study.stack.slice(0, 3).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="rounded-md bg-paper-deep/70 px-2.5 py-1 font-mono text-[10px] text-stone"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-clay transition-transform duration-300 group-hover:translate-x-1">
                    Read File →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
