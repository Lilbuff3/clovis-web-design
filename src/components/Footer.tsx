import { Phone } from "lucide-react";
import { useScrollTo } from "@/hooks/helpers";
import { ClovisMark } from "./Nav";

interface FooterProps {
  onOpenCaseStudy?: (id: string) => void;
  onOpenBrief?: () => void;
}

export default function Footer({ onOpenCaseStudy, onOpenBrief }: FooterProps) {
  const scrollTo = useScrollTo();

  return (
    <footer className="relative overflow-hidden border-t border-ink/10 bg-paper pt-20 pb-12 text-ink">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* 4-Column Studio Directory */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          {/* Column 1: Studio Identity (Span 4) */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <ClovisMark className="h-9 w-9 text-ink" />
              <div className="flex flex-col leading-none">
                <span className="font-serif text-[1.2rem] font-semibold tracking-[-0.02em]">
                  Clovis Web Design
                </span>
                <span className="mt-1 text-[0.6rem] font-medium tracking-[0.26em] text-stone uppercase">
                  Studio of Adam Youssef
                </span>
              </div>
            </div>
            <p className="mt-5 max-w-[36ch] text-[0.92rem] leading-relaxed text-ink-soft">
              Fortune 500 craft. Main Street soul. Hand-coded digital flagships, Google Business
              Profile dominance, and hyper-local Geo-SEO for independent Central Valley businesses.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <a
                href="tel:5595753014"
                className="flex items-center gap-2 text-[0.95rem] font-semibold text-ink hover:text-clay transition-colors"
              >
                <Phone className="h-4 w-4 text-clay" />
                <span>(559) 575-3014</span>
              </a>
              <a
                href="mailto:adam@cloviswebdesign.com"
                className="text-[0.9rem] font-medium text-ink underline decoration-clay/50 underline-offset-4 hover:text-clay"
              >
                adam@cloviswebdesign.com
              </a>
              <span className="text-[0.82rem] text-stone">
                Old Town Clovis, CA 93612 · Direct Cell &amp; Text
              </span>
            </div>
            <div className="mt-6">
              <button
                onClick={onOpenBrief ?? (() => scrollTo("calculator"))}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[0.82rem] font-medium text-linen transition-colors hover:bg-clay"
              >
                Lock in 2026 Flagship Slot ↗
              </button>
            </div>
          </div>

          {/* Column 2: Studio Navigation (Span 3) */}
          <div className="lg:col-span-3">
            <h3 className="text-[0.72rem] font-medium tracking-[0.2em] text-stone uppercase">
              The Studio
            </h3>
            <ul className="mt-5 space-y-2.5 text-[0.9rem]">
              {[
                { label: "Selected Flagships", id: "work" },
                { label: "The Ledger (Anti-Agency)", id: "ledger" },
                { label: "Three Core Offerings", id: "services" },
                { label: "The Receipt (100/100 CWV)", id: "receipt" },
                { label: "The Recipe (4-Stage Process)", id: "process" },
                { label: "Objection-Crushing FAQ", id: "faq" },
                { label: "Scope & Quote Calculator", id: "calculator" },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className="text-left text-ink-soft transition-colors hover:text-clay"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Authentic Case Studies (Span 3) */}
          <div className="lg:col-span-3">
            <h3 className="text-[0.72rem] font-medium tracking-[0.2em] text-stone uppercase">
              Central Valley Flagships
            </h3>
            <ul className="mt-5 space-y-4 text-[0.88rem]">
              <li>
                <button
                  onClick={() =>
                    onOpenCaseStudy
                      ? onOpenCaseStudy("kidney-specialist-inc")
                      : scrollTo("work")
                  }
                  className="group text-left"
                >
                  <div className="font-medium text-ink group-hover:text-clay">
                    Kidney Specialist Inc. ↗
                  </div>
                  <div className="text-[0.78rem] text-stone">
                    Madera &amp; Fresno, CA · Medical Compliance &amp; WCAG AA
                  </div>
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    onOpenCaseStudy
                      ? onOpenCaseStudy("big-bros-dumpster")
                      : scrollTo("work")
                  }
                  className="group text-left"
                >
                  <div className="font-medium text-ink group-hover:text-clay">
                    Big Bros Dumpster Rental ↗
                  </div>
                  <div className="text-[0.78rem] text-stone">
                    Clovis &amp; Fresno, CA · Geo-SEO Radius &amp; EN/ES UX
                  </div>
                </button>
              </li>
            </ul>

            <div className="mt-6 border-t border-ink/10 pt-4">
              <span className="text-[0.72rem] font-medium tracking-[0.16em] text-stone uppercase">
                Service Radius
              </span>
              <p className="mt-1 text-[0.8rem] text-ink-soft">
                Clovis, Fresno, Madera, Sanger, Selma, Fowler, and Kingsburg.
              </p>
            </div>
          </div>

          {/* Column 4: Schema & Compliance Badges (Span 2) */}
          <div className="lg:col-span-2">
            <h3 className="text-[0.72rem] font-medium tracking-[0.2em] text-stone uppercase">
              Verifications
            </h3>
            <ul className="mt-5 space-y-2.5 text-[0.84rem] text-ink-soft">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-olive" />
                <span>100/100 Core Web Vitals</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-olive" />
                <span>WCAG 2.1 AA Certified</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-olive" />
                <span>Zero-HIPAA Liability</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-olive" />
                <span>schema.org/LocalBusiness</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-olive" />
                <span>schema.org/MedicalClinic</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-olive" />
                <span>100% Code Ownership</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Oversized Clovis Web Design Wordmark */}
        <div className="mt-16 overflow-hidden border-t border-ink/10 pt-8">
          <div className="flex flex-col select-none">
            <span className="font-serif text-[clamp(2.6rem,11.8vw,12rem)] font-semibold leading-none tracking-[-0.045em] text-ink/[0.08] sm:text-ink/[0.11] whitespace-nowrap">
              Clovis Web Design
            </span>
            <div className="mt-2 flex items-center justify-between text-[0.75rem] text-stone uppercase tracking-[0.2em]">
              <span>Central Valley Craftsmanship</span>
              <span className="hidden sm:inline">Handcrafted in California · Est. 2026</span>
            </div>
          </div>
        </div>

        {/* Subfooter & Colophon */}
        <div className="mt-8 flex flex-col gap-6 border-t border-ink/10 pt-7 text-[0.78rem] text-stone sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[62ch] leading-relaxed">
            © {new Date().getFullYear()} Clovis Web Design. Handcrafted by Adam Youssef in Clovis,
            California. Set in Fraunces and Inter. 100% Day-One Asset Ownership Guarantee — zero
            hostage hosting, zero page-builder bloat.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex w-fit items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-linen"
          >
            <span>Back to top</span>
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
