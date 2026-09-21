import { useState } from "react";
import { faqs } from "@/data/faq";

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="scroll-mt-24 border-t border-ink/10 bg-paper-deep/30 py-24 sm:py-32"
      aria-label="Frequently Asked Questions"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8" data-reveal>
        {/* Section Header */}
        <div className="text-center">
          <span className="t-eyebrow text-stone">Honest Answers</span>
          <h2 className="t-h2 mt-3 text-ink">
            Objection-crushing FAQ. <br />
            <span className="italic text-clay">No corporate double-speak.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-ink-soft sm:text-lg">
            Straightforward answers regarding code ownership, copywriting burden, software integrations, and long-term maintenance.
          </p>
        </div>

        {/* Accordion List */}
        <div className="mt-16 divide-y divide-ink/10 rounded-3xl border border-ink/10 bg-paper p-4 shadow-sm sm:p-8">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="py-4 sm:py-6 first:pt-2 last:pb-2">
                <button
                  id={faq.id}
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  className="flex w-full min-h-[48px] items-center justify-between text-left transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-clay"
                >
                  <span className="font-serif text-lg font-bold text-ink pr-6 sm:text-xl">
                    {faq.question}
                  </span>
                  <span
                    className={`ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/15 text-sm font-bold text-ink transition-transform duration-300 ${
                      isOpen ? "rotate-45 bg-clay text-linen border-clay" : "bg-paper-deep"
                    }`}
                  >
                    +
                  </span>
                </button>

                <div
                  id={`faq-answer-${faq.id}`}
                  role="region"
                  aria-labelledby={faq.id}
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 mt-4"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm text-ink-soft sm:text-base leading-relaxed pl-1">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
