import { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useActiveSection, useBodyLock, useScrollTo } from "@/hooks/helpers";
import type { NavItem } from "@/types";
import { formatSmsUri } from "@/data/calculator";

const NAV_ITEMS: NavItem[] = [
  { id: "work", label: "Work" },
  { id: "calculator", label: "Pricing" },
  { id: "services", label: "Services" },
  { id: "ledger", label: "Why me" },
  { id: "receipt", label: "The Receipt" },
  { id: "process", label: "How it works" },
  { id: "faq", label: "FAQ" },
];

export function ClovisMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
    >
      {/* Precision artisan craftsman icon: architectural compass/angle + Central Valley diamond */}
      <path
        d="M20 4L4 12v16l16 8 16-8V12L20 4z"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M20 12v16M12 16l8 4 8-4"
        strokeWidth="2.2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx="20" cy="20" r="2.5" fill="var(--color-clay, #b0503a)" />
    </svg>
  );
}

interface NavProps {
  onOpenBrief?: () => void;
}

export default function Nav({ onOpenBrief }: NavProps) {
  const { barRef, scrolled } = useScrollProgress();
  const activeSection = useActiveSection(NAV_ITEMS.map((n) => n.id));
  const scrollTo = useScrollTo();
  const [mobileOpen, setMobileOpen] = useState(false);
  useBodyLock(mobileOpen);

  // Close mobile drawer on Escape key
  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    window.setTimeout(() => scrollTo(id), mobileOpen ? 250 : 0);
  };

  return (
    <>
      <header
        style={{ paddingRight: "var(--scrollbar-offset, 0px)" }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${
          scrolled ? "py-2" : "py-3 sm:py-5"
        }`}
      >
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div
            className={`relative flex items-center justify-between rounded-full transition-all duration-500 ease-out ${
              scrolled
                ? "border border-ink/10 bg-paper/85 px-4 py-2 shadow-[0_18px_40px_-28px_rgba(34,29,23,0.85)] backdrop-blur-xl sm:px-6"
                : "border border-transparent bg-transparent px-2 py-1.5"
            }`}
          >
            {/* Logo & Brand Identity */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex items-center gap-3 text-left"
              aria-label="Clovis Web Design — Return to top"
            >
              <ClovisMark className="h-8 w-8 text-ink transition-transform duration-500 ease-out group-hover:rotate-6 sm:h-9 sm:w-9" />
              <div className="flex flex-col leading-none">
                <span className="font-serif text-[1.05rem] font-semibold tracking-[-0.02em] text-ink">
                  Clovis Web Design
                </span>
                <span className="mt-0.5 text-[0.58rem] font-medium tracking-[0.24em] text-stone uppercase">
                  Central Valley Craft
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav
              className="hidden md:flex items-center gap-0.5 lg:gap-1"
              aria-label="Main Navigation"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative rounded-full px-2.5 lg:px-3.5 py-1.5 text-xs lg:text-[0.84rem] font-medium transition-colors duration-300 ${
                      isActive
                        ? "text-ink"
                        : "text-ink-soft/75 hover:text-ink hover:bg-ink/[0.04]"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute inset-0 rounded-full bg-ink/[0.07]" />
                    )}
                    <span className="relative">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right Action Cluster & Live Availability */}
            <div className="flex items-center gap-3">
              {/* Availability Badge */}
              <div className="hidden items-center gap-2 rounded-full border border-olive/30 bg-olive/10 px-3 py-1 text-[0.72rem] font-medium text-olive xl:flex">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-olive opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-olive" />
                </span>
                <span>Booking 2 Flagships for 2026</span>
              </div>

              {/* Direct Phone Line */}
              <a
                href="tel:5595753014"
                className="hidden xl:inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-paper/60 px-3.5 py-1.5 text-[0.8rem] font-semibold text-ink transition-colors hover:border-clay hover:text-clay"
                aria-label="Direct line: (559) 575-3014"
              >
                <Phone className="h-3.5 w-3.5 text-clay" />
                <span>(559) 575-3014</span>
              </a>

              {/* Primary Consultation Trigger */}
              <button
                onClick={onOpenBrief ?? (() => handleNavClick("calculator"))}
                className="hidden rounded-full bg-ink px-4 py-2 text-[0.82rem] font-medium text-linen shadow-[0_10px_25px_-10px_rgba(34,29,23,0.8)] transition-all duration-300 hover:bg-clay hover:shadow-[0_12px_28px_-8px_rgba(176,80,58,0.7)] sm:inline-flex"
              >
                Estimate Project ↗
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-paper/80 backdrop-blur md:hidden"
              >
                <div className="relative h-3 w-4.5">
                  <span
                    className={`absolute left-0 block h-0.5 w-full bg-ink transition-all duration-300 ease-out ${
                      mobileOpen ? "top-1.5 rotate-45" : "top-0"
                    }`}
                  />
                  <span
                    className={`absolute left-0 block h-0.5 w-full bg-ink transition-all duration-300 ease-out ${
                      mobileOpen ? "top-1.5 -rotate-45" : "top-2.5"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Reading Scroll Progress Hairline */}
          <div
            ref={barRef}
            className={`mx-auto mt-1.5 h-[2px] w-[calc(100%-1.5rem)] origin-left bg-clay/80 transition-opacity duration-300 ${
              scrolled ? "opacity-100" : "opacity-0"
            }`}
            style={{ transform: "scaleX(0)" }}
            aria-hidden="true"
          />
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        {/* Backdrop */}
        <div
          onClick={() => setMobileOpen(false)}
          className={`absolute inset-0 bg-ink/35 backdrop-blur-sm transition-opacity duration-400 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Drawer Panel */}
        <div
          className={`absolute inset-x-0 top-0 origin-top overflow-hidden rounded-b-[2rem] border-b border-ink/15 bg-paper px-6 pt-24 pb-8 shadow-2xl transition-all duration-500 ease-out ${
            mobileOpen ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"
          }`}
        >
          {/* Availability Status in Drawer */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-olive/30 bg-olive/10 px-3 py-1 text-[0.74rem] font-medium text-olive">
            <span className="h-2 w-2 rounded-full bg-olive animate-pulse" />
            <span>Booking two flagships for 2026</span>
          </div>

          <nav className="flex flex-col divide-y divide-ink/10">
            {NAV_ITEMS.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="group flex items-center justify-between py-3.5 text-left transition-colors hover:text-clay"
              >
                <span className="font-serif text-[1.4rem] font-medium text-ink group-hover:text-clay">
                  {item.label}
                </span>
                <span className="text-[0.75rem] font-mono text-stone">0{index + 1}</span>
              </button>
            ))}
          </nav>

          <div className="mt-6 flex flex-col gap-3 pt-2">
            <a
              href="tel:5595753014"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-ink py-3 text-center font-serif text-[0.92rem] font-semibold text-linen hover:bg-clay transition-colors"
            >
              <Phone className="h-4 w-4 text-clay" />
              <span>Call Adam: (559) 575-3014</span>
            </a>

            <div className="flex gap-2">
              <a
                href={formatSmsUri()}
                className="flex-1 rounded-full border border-ink/20 py-2.5 text-center text-[0.82rem] font-semibold text-ink hover:bg-ink/[0.04] transition-colors"
              >
                Text / SMS
              </a>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  if (onOpenBrief) onOpenBrief();
                  else scrollTo("calculator");
                }}
                className="flex-1 rounded-full border border-ink/20 bg-linen py-2.5 text-center text-[0.82rem] font-semibold text-ink hover:bg-paper-deep transition-colors"
              >
                Estimate Scope ↗
              </button>
            </div>

            <div className="text-center text-[0.8rem] text-stone">
              Email:{" "}
              <a
                href="mailto:adam@cloviswebdesign.com"
                className="font-medium text-ink underline decoration-clay/40 underline-offset-4"
              >
                adam@cloviswebdesign.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
