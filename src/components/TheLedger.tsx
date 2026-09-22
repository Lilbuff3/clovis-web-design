import { usePointerGlow } from "@/hooks/usePointerGlow";
import type { LedgerRow } from "@/types";

const LEDGER_ROWS: LedgerRow[] = [
  {
    category: "Who actually builds it",
    typicalAgency:
      "You meet the senior people once, in the pitch. After that your site is handed to whoever is free that week.",
    typicalCost: "You talk to an account manager",
    clovisCraft:
      "I design it, I build it, I put it live. When you call (559) 575-3014, the person who wrote the code picks up.",
    clovisCost: "You talk to me",
    differenceNote: "Nothing gets lost being passed along.",
  },
  {
    category: "Who owns it when you walk away",
    typicalAgency:
      "The site sits on their system. Stop paying and it goes dark, and you do not get the design or the content back.",
    typicalCost: "They hold the keys",
    clovisCraft:
      "The code and the domain are in your name from day one. Move it anywhere, any time, and you do not need my permission.",
    clovisCost: "You hold the keys",
    differenceNote: "You are never stuck with me to keep your own website.",
  },
  {
    category: "How it behaves on a phone",
    typicalAgency:
      "A heavy template with dozens of plugins bolted on. On a phone out in the field it takes long enough that people give up.",
    typicalCost: "They leave before it loads",
    clovisCraft:
      "Built by hand with nothing in it that does not need to be there. It comes up fast on a phone, on real signal, not office wifi.",
    clovisCost: "It is there before they wait",
    differenceNote: "Most people looking you up are on a phone, often on bad signal.",
  },
  {
    category: "Who writes the words",
    typicalAgency:
      "You get a blank questionnaire and a deadline, or they run it through a machine and hand you something that sounds like everyone else.",
    typicalCost: "You end up writing it",
    clovisCraft:
      "We talk for forty-five minutes, I record it, and I write the site out of what you actually said about your own trade.",
    clovisCost: "I write it",
    differenceNote: "This is the step that stalls most website projects for months.",
  },
  {
    category: "When you need something changed",
    typicalAgency:
      "Put in a ticket, wait for a change order, then get an invoice for a paragraph of text.",
    typicalCost: "A form and a wait",
    clovisCraft:
      "Text me. Small things I just do. If it is genuinely a big job I will tell you that before I start, not after.",
    clovisCost: "A text message",
    differenceNote: "No invoice for fixing a phone number.",
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
            The same five things come up every time somebody tells me about their last website. Here is how I do them differently.
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
                A team you meet once, then a queue you wait in
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
                One person, your number in my phone, your site in your name
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
                You own it, it is fast, and the person who built it answers the phone.
              </p>
            </div>
            <a
              href="#calculator"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-xs font-semibold uppercase tracking-wider text-linen shadow-md transition-all hover:bg-clay"
            >
              <span>See what it costs</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
