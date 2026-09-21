import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { caseStudies } from "@/data/caseStudies";
import { useBodyLock } from "@/hooks/useBodyLock";

interface CaseStudyDrawerProps {
  isOpen: boolean;
  activeCaseStudyId: string | null;
  onClose: () => void;
  onOpenCalculator?: () => void;
}

export default function CaseStudyDrawer({
  isOpen,
  activeCaseStudyId,
  onClose,
  onOpenCalculator,
}: CaseStudyDrawerProps) {
  useBodyLock(isOpen);
  const [showSchema, setShowSchema] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Focus trap and Escape key listener
  useEffect(() => {
    if (!isOpen) return;

    const focusTimer = setTimeout(() => {
      if (!drawerRef.current) return;
      const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length > 0) {
        focusable[0].focus();
      }
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab") {
        if (!drawerRef.current) return;
        const focusable = Array.from(
          drawerRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => el.offsetParent !== null);

        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !activeCaseStudyId) return null;

  const study =
    caseStudies.find((s) => s.id === activeCaseStudyId) || caseStudies[0];

  const content = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Backdrop Scrim */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-ink/60 backdrop-blur-xs transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Sliding Drawer Container */}
      <div
        ref={drawerRef}
        className="relative z-10 flex h-full w-full max-w-3xl flex-col bg-paper shadow-2xl transition-transform duration-500 ease-out sm:border-l sm:border-ink/15"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5 sm:px-8">
          <div className="flex items-center gap-3">
            <span
              className="rounded-full px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider"
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

          <button
            type="button"
            onClick={onClose}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/10 bg-paper-deep text-ink transition-colors hover:bg-clay hover:text-linen focus:outline-none focus:ring-2 focus:ring-clay"
            aria-label="Close Case Study Drawer"
          >
            <span className="text-xl leading-none">✕</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-10 sm:py-12">
          {/* Headline & Overview */}
          <div className="border-b border-ink/10 pb-8">
            <span className="font-mono text-xs text-stone uppercase tracking-widest">
              Flagship Analysis · Chapter File {study.index}
            </span>
            <h2
              id="case-study-title"
              className="mt-2 text-3xl font-serif font-bold text-ink sm:text-4xl"
            >
              {study.client}
            </h2>
            <p className="mt-2 text-base font-serif italic text-stone sm:text-lg">
              {study.headline}
            </p>
            <p className="mt-4 text-sm text-ink-soft sm:text-base leading-relaxed">
              {study.summary}
            </p>

            {/* Doctors / Founders Attribution */}
            {study.doctors && (
              <div className="mt-4 rounded-xl border border-ink/10 bg-paper-deep/40 p-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-ink">
                  Practicing Nephrologists:
                </span>
                <p className="mt-1 text-xs text-ink-soft">
                  {study.doctors.join(" · ")}
                </p>
              </div>
            )}

            {study.founders && (
              <div className="mt-4 rounded-xl border border-ink/10 bg-paper-deep/40 p-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-ink">
                  Founders &amp; Operators:
                </span>
                <p className="mt-1 text-xs text-ink-soft">{study.founders}</p>
              </div>
            )}
          </div>

          {/* Chapter 01: The Problem */}
          <div className="mt-10 border-b border-ink/10 pb-10">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-clay">
                Chapter 01
              </span>
              <span className="h-px w-8 bg-clay/30" />
              <h3 className="font-serif text-2xl font-bold text-ink">
                01 The Problem
              </h3>
            </div>

            <h4 className="mt-4 font-serif text-lg font-medium text-ink-soft">
              {study.challenge.headline}
            </h4>
            <p className="mt-3 text-sm text-ink-soft leading-relaxed">
              {study.challenge.body}
            </p>

            <div className="mt-6 rounded-2xl border border-clay/20 bg-clay/5 p-6">
              <span className="block font-mono text-xs font-bold uppercase tracking-wider text-clay-deep">
                Core Vulnerabilities Identified:
              </span>
              <ul className="mt-3 space-y-2">
                {study.challenge.pains.map((pain, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs text-ink-soft leading-relaxed"
                  >
                    <span className="text-clay font-bold">✕</span>
                    <span>{pain}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Chapter 02: Bespoke Craft */}
          <div className="mt-10 border-b border-ink/10 pb-10">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-clay">
                Chapter 02
              </span>
              <span className="h-px w-8 bg-clay/30" />
              <h3 className="font-serif text-2xl font-bold text-ink">
                02 Bespoke Craft
              </h3>
            </div>

            <h4 className="mt-4 font-serif text-lg font-medium text-ink-soft">
              {study.solution.headline}
            </h4>
            <p className="mt-3 text-sm text-ink-soft leading-relaxed">
              {study.solution.body}
            </p>

            <div className="mt-6 space-y-4">
              {study.solution.moves.map((move, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-ink/10 bg-linen/90 p-5 shadow-2xs"
                >
                  <h5 className="font-serif text-base font-bold text-ink">
                    {move.title}
                  </h5>
                  <p className="mt-1.5 text-xs text-ink-soft leading-relaxed">
                    {move.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Kidney Specialist Authentic HIPAA Architecture Specifications */}
            {study.hipaaArchitecture && (
              <div className="mt-6 rounded-2xl border border-olive/30 bg-olive/5 p-6">
                <span className="block font-mono text-xs font-bold uppercase tracking-wider text-olive-deep">
                  Zero-HIPAA Clinical Architecture Specifications:
                </span>
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-ink/5 bg-paper p-3 text-center">
                    <span className="block text-[11px] font-mono text-stone uppercase">Dedicated Referral Fax</span>
                    <a
                      href={`tel:${study.hipaaArchitecture.referralFax.replace(/\D/g, '')}`}
                      className="mt-1 block font-serif text-sm font-bold text-ink hover:text-clay"
                    >
                      {study.hipaaArchitecture.referralFax}
                    </a>
                  </div>
                  <div className="rounded-xl border border-ink/5 bg-paper p-3 text-center">
                    <span className="block text-[11px] font-mono text-stone uppercase">Clinical Scheduling Line</span>
                    <a
                      href={`tel:${study.hipaaArchitecture.schedulingPhone.replace(/\D/g, '')}`}
                      className="mt-1 block font-serif text-sm font-bold text-ink hover:text-clay"
                    >
                      {study.hipaaArchitecture.schedulingPhone}
                    </a>
                  </div>
                  <div className="rounded-xl border border-ink/5 bg-paper p-3 text-center">
                    <span className="block text-[11px] font-mono text-stone uppercase">Web PHI Forms</span>
                    <span className="mt-1 block font-serif text-sm font-bold text-olive">
                      {study.hipaaArchitecture.webPhiForms} Bytes (Zero PHI)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Big Bros Authentic Trade Spanish & Fleet Pricing */}
            {study.tradeSpanish && (
              <div className="mt-6 rounded-2xl border border-clay/20 bg-clay/5 p-6">
                <span className="block font-mono text-xs font-bold uppercase tracking-wider text-clay-deep">
                  Authentic Central Valley Trade Spanish (EN/ES):
                </span>
                <div className="mt-3 space-y-2 text-xs text-ink-soft">
                  <div className="flex items-start gap-2">
                    <span className="font-mono font-bold text-clay shrink-0">Roll-Off:</span>
                    <span>{study.tradeSpanish.rollOff}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-mono font-bold text-clay shrink-0">Driveway:</span>
                    <span>{study.tradeSpanish.driveway}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-mono font-bold text-clay shrink-0">Appliances:</span>
                    <span>{study.tradeSpanish.appliances}</span>
                  </div>
                </div>
              </div>
            )}

            {study.fleetPricing && (
              <div className="mt-4 rounded-2xl border border-ink/10 bg-linen/90 p-6">
                <span className="block font-mono text-xs font-bold uppercase tracking-wider text-ink">
                  Transparent Contractor Fleet Pricing:
                </span>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4 text-center">
                  <div className="rounded-xl border border-ink/5 bg-paper p-3">
                    <span className="block text-[10px] font-mono text-stone uppercase">14-Yard Roll-Off</span>
                    <span className="mt-1 block font-serif text-base font-bold text-ink">${study.fleetPricing.fourteenYard} flat</span>
                  </div>
                  <div className="rounded-xl border border-ink/5 bg-paper p-3">
                    <span className="block text-[10px] font-mono text-stone uppercase">20-Yard Roll-Off</span>
                    <span className="mt-1 block font-serif text-base font-bold text-ink">${study.fleetPricing.twentyYard} flat</span>
                  </div>
                  <div className="rounded-xl border border-ink/5 bg-paper p-3">
                    <span className="block text-[10px] font-mono text-stone uppercase">Mattress Surcharge</span>
                    <span className="mt-1 block font-serif text-base font-bold text-olive">${study.fleetPricing.mattressSurcharge} (Free)</span>
                  </div>
                  <div className="rounded-xl border border-ink/5 bg-paper p-3">
                    <span className="block text-[10px] font-mono text-stone uppercase">Driveway Planks</span>
                    <span className="mt-1 block font-serif text-base font-bold text-olive">Included</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chapter 03: Transformation & Metrics */}
          <div className="mt-10 border-b border-ink/10 pb-10">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-clay">
                Chapter 03
              </span>
              <span className="h-px w-8 bg-clay/30" />
              <h3 className="font-serif text-2xl font-bold text-ink">
                03 Transformation
              </h3>
            </div>

            {/* Verified Metrics Bar */}
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {study.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-ink/10 bg-paper-deep/60 p-4 text-center"
                >
                  <span className="font-serif text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                    {metric.prefix}
                    {metric.value}
                    {metric.suffix}
                  </span>
                  <span className="mt-1 block text-[11px] font-medium text-stone leading-tight">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Client Quote Callout */}
            {(() => {
              const quote = {
                ...study.quote,
                author: study.quote.name,
              };
              return (
                <blockquote className="mt-8 rounded-2xl border-l-4 border-clay bg-paper-deep/50 p-6">
                  <p className="font-serif text-base italic text-ink sm:text-lg leading-relaxed">
                    "{quote.text}"
                  </p>
                  <footer className="mt-4">
                    <span className="block font-serif font-bold text-ink">
                      {quote.author}
                    </span>
                    <span className="block text-xs text-stone">
                      {quote.role} · {study.quote.entity || study.client}
                    </span>
                  </footer>
                </blockquote>
              );
            })()}
          </div>

          {/* Schema.org Inspector Tab */}
          <div className="mt-10">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
                Production JSON-LD Schema
              </span>
              <button
                type="button"
                onClick={() => setShowSchema(!showSchema)}
                className="rounded-md border border-ink/10 bg-paper-deep px-3 py-1 font-mono text-xs text-clay-deep hover:bg-clay hover:text-linen"
              >
                {showSchema ? "Hide Schema Graph ▲" : "Inspect Schema Graph ▼"}
              </button>
            </div>

            {showSchema && (
              <div className="mt-4 max-h-96 overflow-auto rounded-xl bg-ink p-4 text-xs font-mono text-linen">
                <pre>{JSON.stringify(study.jsonLd, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>

        {/* Drawer Action Bar */}
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-between gap-4 border-t border-ink/10 bg-paper-deep/40 px-6 py-4 sm:px-10">
          <span className="font-mono text-xs text-stone">
            Deliverables 100% Owned by Client
          </span>
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-ink/15 px-5 py-2.5 text-xs font-medium text-ink hover:bg-ink/5 text-center"
            >
              Close File
            </button>
            <a
              href="#calculator"
              onClick={(e) => {
                e.preventDefault();
                onClose();
                window.setTimeout(() => {
                  if (onOpenCalculator) onOpenCalculator();
                }, 100);
              }}
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-ink px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-linen shadow-md transition-colors hover:bg-clay text-center"
            >
              Estimate Similar Flagship ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(content, document.body)
    : null;
}
