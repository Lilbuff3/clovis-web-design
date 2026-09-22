import { useState, useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { useBodyLock } from "@/hooks/useBodyLock";
import type { ScopeTier, RetainerTier } from "@/types";
import { PRICING_CONSTANTS } from "@/data/calculator";

const ENTRY = PRICING_CONSTANTS.tiers.landing;
const CARE = PRICING_CONSTANTS.retainers.care;
const ENTRY_LABEL = `${ENTRY.title} ($${ENTRY.price})`;

interface BriefConfig {
  tier?: ScopeTier;
  retainer?: RetainerTier;
  addons?: string[];
  setupTotal?: number;
  monthlyTotal?: number;
}

interface BriefDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialConfig?: BriefConfig | null;
}

export function generateProjectBriefText(
  draft: {
    name?: string;
    business?: string;
    location?: string;
    email?: string;
    phone?: string;
    selectedTier?: string;
    addons?: string[] | string;
    retainerInterest?: string;
    timeline?: string;
    description?: string;
  },
  config?: BriefConfig | null
) {
  const rawAddons = draft.addons || config?.addons;
  let formattedAddons = "None";
  if (Array.isArray(rawAddons)) {
    formattedAddons =
      rawAddons.length > 0
        ? rawAddons
            .join(", ")
        : "None";
  } else if (typeof rawAddons === "string" && rawAddons.trim()) {
    formattedAddons = rawAddons.trim();
  }

  const lines = [
    "==================================================",
    "        CLOVIS WEB DESIGN — PROJECT BRIEF        ",
    "==================================================",
    "",
    `Client Name:      ${draft.name?.trim() || "N/A"}`,
    `Business Name:    ${draft.business?.trim() || "N/A"}`,
    `Location:         ${draft.location?.trim() || "Central Valley, CA"}`,
    `Direct Email:     ${draft.email?.trim() || "N/A"}`,
    `Phone / SMS:      ${draft.phone?.trim() || "N/A"}`,
    `Selected Tier:    ${draft.selectedTier || ENTRY_LABEL}`,
    `Selected Add-ons: ${formattedAddons}`,
    `Monthly Retainer: ${draft.retainerInterest || "None"}`,
    `Target Timeline:  ${draft.timeline || "4–6 Weeks"}`,
    "",
    "--- PROJECT REQUIREMENTS & OBJECTIVES ---",
    draft.description?.trim() || "No specific notes provided.",
    "",
    "--- GUARANTEES ---",
    "• 100% Day-One Code, Domain, and Asset Ownership",
    "• 100/100 Core Web Vitals Performance Standard",
    "• Zero Hostage Retainers or Proprietary CMS Lock-In",
    "• Hand-Crafted in Clovis, California by Adam Youssef",
    "• Direct Phone/SMS: (559) 575-3014 · adam@cloviswebdesign.com",
    "",
    "==================================================",
  ];
  return lines.join("\n");
}

export default function BriefDialog({
  isOpen,
  onClose,
  initialConfig,
}: BriefDialogProps) {
  useBodyLock(isOpen);

  // Form State
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("Central Valley, CA");
  const [selectedTier, setSelectedTier] = useState(ENTRY_LABEL);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [retainerInterest, setRetainerInterest] = useState("None");
  const [timeline, setTimeline] = useState("1 Week");
  const [description, setDescription] = useState("");

  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Sync initialConfig when opened
  useEffect(() => {
    if (!isOpen) return;
    if (initialConfig) {
      if (initialConfig.tier) {
        const tierName =
          initialConfig.tier === "landing"
            ? "Landing Page"
            : initialConfig.tier === "business"
            ? "Business Site"
            : "Flagship";
        const price = initialConfig.setupTotal
          ? `$${initialConfig.setupTotal.toLocaleString()}`
          : initialConfig.tier === "landing"
          ? `$${ENTRY.price}`
          : "quote";
        setSelectedTier(`${tierName} (${price})`);
      }
      if (initialConfig.addons) {
        setSelectedAddons(initialConfig.addons);
      } else {
        setSelectedAddons([]);
      }
      if (initialConfig.retainer) {
        if (initialConfig.retainer === "care") {
          setRetainerInterest(`${CARE.title} ($${CARE.monthly}/mo)`);
        } else {
          setRetainerInterest("None");
        }
      }
    }
    setCopied(false);
    setCopyError(false);
  }, [isOpen, initialConfig]);

  // Focus trap and Escape key listener
  useEffect(() => {
    if (!isOpen) return;

    const focusTimer = setTimeout(() => {
      if (!dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
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
        if (!dialogRef.current) return;
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
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

  const briefText = useMemo(() => {
    return generateProjectBriefText({
      name,
      business,
      location,
      email,
      phone,
      selectedTier,
      addons: selectedAddons,
      retainerInterest,
      timeline,
      description,
    });
  }, [
    name,
    business,
    location,
    email,
    phone,
    selectedTier,
    selectedAddons,
    retainerInterest,
    timeline,
    description,
  ]);

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(briefText);
        setCopied(true);
        setCopyError(false);
        setTimeout(() => setCopied(false), 3000);
      } else {
        throw new Error("Clipboard API unavailable");
      }
    } catch {
      setCopyError(true);
      setTimeout(() => setCopyError(false), 3000);
    }
  };

  const handleDownload = () => {
    const slug =
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") || "client";
    const filename = `clovis-project-brief-${slug}.txt`;
    const blob = new Blob([briefText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  if (!isOpen) return null;

  const content = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="brief-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-ink/65 backdrop-blur-xs transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        ref={dialogRef}
        className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col rounded-3xl border border-ink/15 bg-paper shadow-2xl overflow-hidden sm:max-h-[85vh]"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5 sm:px-8">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-clay">
              Self-Qualification Engine
            </span>
            <h2
              id="brief-dialog-title"
              className="mt-1 font-serif text-2xl font-bold text-ink sm:text-3xl"
            >
              Project Brief Synthesizer
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-paper-deep text-ink transition-colors hover:bg-clay hover:text-linen focus:outline-none focus:ring-2 focus:ring-clay"
            aria-label="Close Project Brief Dialog"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8 sm:py-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-ink/10 bg-paper-deep/50 px-4 py-2.5 text-xs text-ink-soft">
            <span>Prefer to discuss by phone? Call or text Adam directly:</span>
            <a
              href="tel:5595753014"
              className="font-semibold text-ink underline decoration-clay/40 underline-offset-2 hover:text-clay transition-colors"
            >
              (559) 575-3014
            </a>
          </div>

          <p className="text-xs text-ink-soft sm:text-sm leading-relaxed">
            Fill in your project vision below. We instantly assemble a structured, plain-text brief that you can copy to your clipboard or download as a <code>.txt</code> file for your stakeholders.
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="brief-name"
                className="block text-xs font-mono font-bold uppercase text-ink"
              >
                Your Full Name *
              </label>
              <input
                id="brief-name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Carlos Mendez"
                className="mt-1.5 w-full rounded-xl border border-ink/15 bg-linen px-4 py-2.5 text-sm text-ink focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay"
              />
            </div>

            <div>
              <label
                htmlFor="brief-business"
                className="block text-xs font-mono font-bold uppercase text-ink"
              >
                Business / Practice Name *
              </label>
              <input
                id="brief-business"
                name="business"
                type="text"
                required
                value={business}
                onChange={(e) => setBusiness(e.target.value)}
                placeholder="Mendez Ag Logistics"
                className="mt-1.5 w-full rounded-xl border border-ink/15 bg-linen px-4 py-2.5 text-sm text-ink focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay"
              />
            </div>

            <div>
              <label
                htmlFor="brief-email"
                className="block text-xs font-mono font-bold uppercase text-ink"
              >
                Direct Email Address *
              </label>
              <input
                id="brief-email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="carlos@mendezag.com"
                className="mt-1.5 w-full rounded-xl border border-ink/15 bg-linen px-4 py-2.5 text-sm text-ink focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay"
              />
            </div>

            <div>
              <label
                htmlFor="brief-phone"
                className="block text-xs font-mono font-bold uppercase text-ink"
              >
                Phone / SMS Contact *
              </label>
              <input
                id="brief-phone"
                name="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(559) 555-0199"
                className="mt-1.5 w-full rounded-xl border border-ink/15 bg-linen px-4 py-2.5 text-sm text-ink focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay"
              />
            </div>

            <div>
              <label
                htmlFor="brief-location"
                className="block text-xs font-mono font-bold uppercase text-ink"
              >
                Geographic Location
              </label>
              <input
                id="brief-location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Clovis & Fresno, CA"
                className="mt-1.5 w-full rounded-xl border border-ink/15 bg-linen px-4 py-2.5 text-sm text-ink focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay"
              />
            </div>

            <div>
              <label
                htmlFor="brief-timeline"
                className="block text-xs font-mono font-bold uppercase text-ink"
              >
                Target Timeline
              </label>
              <select
                id="brief-timeline"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-ink/15 bg-linen px-4 py-2.5 text-sm text-ink focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay"
              >
                <option value="1 Week">1 Week (Landing Page)</option>
                <option value="3–4 Weeks">3–4 Weeks (Business Site)</option>
                <option value="4–6 Weeks">4–6 Weeks (Flagship)</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="brief-tier"
                className="block text-xs font-mono font-bold uppercase text-ink"
              >
                Selected Scope Tier
              </label>
              <input
                id="brief-tier"
                type="text"
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-ink/15 bg-linen px-4 py-2.5 text-sm text-ink focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay"
              />
            </div>

            <div>
              <label
                htmlFor="brief-retainer"
                className="block text-xs font-mono font-bold uppercase text-ink"
              >
                Monthly Retainer Interest
              </label>
              <input
                id="brief-retainer"
                type="text"
                value={retainerInterest}
                onChange={(e) => setRetainerInterest(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-ink/15 bg-linen px-4 py-2.5 text-sm text-ink focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="brief-description"
              className="block text-xs font-mono font-bold uppercase text-ink"
            >
              Project Requirements, Goals &amp; Specific Integrations
            </label>
            <textarea
              id="brief-description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Bilingual freight portal, Toast POS menu sync, zero-HIPAA clinical referral fax integration..."
              className="mt-1.5 w-full rounded-xl border border-ink/15 bg-linen px-4 py-2.5 text-sm text-ink focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay"
            />
          </div>

          {/* Collapsible Preview of Synthesized .txt */}
          <div className="rounded-2xl border border-ink/10 bg-paper-deep/50 p-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase text-stone">
                Live Plain-Text Brief Preview
              </span>
              <button
                type="button"
                onClick={() => setPreviewOpen(!previewOpen)}
                className="text-xs font-mono text-clay hover:underline"
              >
                {previewOpen ? "Collapse Preview ▲" : "Expand Full Text ▼"}
              </button>
            </div>

            {previewOpen && (
              <pre className="mt-3 max-h-52 overflow-auto rounded-xl bg-ink p-4 font-mono text-xs text-linen whitespace-pre leading-snug">
                {briefText}
              </pre>
            )}
          </div>
        </div>

        {/* Modal Action Bar */}
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-between gap-3 border-t border-ink/10 bg-paper-deep/30 px-6 py-4 sm:px-8">
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-ink/20 bg-linen px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:bg-paper-deep focus:outline-none focus:ring-2 focus:ring-clay text-center"
            >
              <span>
                {copied
                  ? "Copied to Clipboard! ✓"
                  : copyError
                  ? "Copy Failed (Select Below)"
                  : "Copy to Clipboard"}
              </span>
              <span>📋</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-ink px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-linen shadow-md transition-all hover:bg-clay focus:outline-none focus:ring-2 focus:ring-clay text-center"
            >
              <span>Download .txt</span>
              <span>↓</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-xs font-mono text-stone hover:text-ink py-2 text-center"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(content, document.body)
    : null;
}
