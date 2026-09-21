/**
 * Shared TypeScript Contracts for Clovis Web Design (cloviswebdesign.com)
 * Strictly conforms to PROJECT.md lines 58-64
 */

// --- Metric & Scorecard Types ---
export interface Metric {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

// --- Case Studies (PROJECT.md line 60) ---
export interface CaseStudy {
  id: string;
  client: string; // e.g. "Kidney Specialist Inc." or "Big Bros Dumpster Rental"
  location: string; // e.g. "Madera & Fresno, CA" or "Clovis & Fresno, CA"
  industry: string; // e.g. "Nephrology & Medical Practice" or "Local Trade & Roll-Off Hauling"
  tag: string; // Short badge label e.g. "Medical Compliance" or "Geo-SEO Lead Engine"
  headline: string; // Sharp one-line hook
  summary: string; // Context paragraph
  metrics: Metric[]; // Key quantitative proof stats
  challenge: {
    headline: string;
    body: string;
    pains: string[];
  };
  solution: {
    headline: string;
    body: string;
    moves: { title: string; detail: string }[];
  };
  deliverables: string[]; // List of shipped artifacts
  quote: {
    text: string;
    name: string;
    role: string;
    entity?: string;
  };
  jsonLd: Record<string, any>; // Embedded structured schema
  // Visual presentation tokens
  index: string; // e.g. "01", "02"
  year: string; // e.g. "2025"
  image?: string; // Path or imported image asset
  accent: string; // HEX color for badges and borders
  accentSoft: string; // Muted tinted background
  stack: string[]; // Tech stack tags
}

// --- Core Service Offerings (PROJECT.md line 61) ---
export interface ServiceOffering {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  deliverableTag: string;
  deliverables?: { title: string; detail: string }[];
  icon?: string;
}

// --- Dynamic Scope & Quote Calculator (PROJECT.md line 62) ---
export type ScopeTier = 'storefront' | 'flagship' | 'multi-location';
export type RetainerTier = 'none' | 'standard' | 'growth';

export interface CalculatorState {
  tier: ScopeTier;
  retainer: RetainerTier;
  addons: string[];
  calculatedTotal: {
    setup: number;
    monthly: number;
  };
}

export interface CalculatorTierConfig {
  id: ScopeTier;
  title: string;
  subtitle: string;
  price: number;
  timeline: string;
  bestFor: string;
  features: string[];
}

export interface RetainerTierConfig {
  id: RetainerTier;
  title: string;
  monthlyPrice: number;
  description: string;
  features: string[];
}

export interface CalculatorAddonConfig {
  id: string;
  title: string;
  price: number;
  description: string;
}

// --- Client Project Brief (PROJECT.md line 63) ---
export interface ProjectBrief {
  name: string;
  business: string;
  email: string;
  phone: string;
  location: string;
  currentWebsite: string;
  selectedTier: ScopeTier;
  retainerInterest: RetainerTier;
  timeline: string;
  description: string;
  additionalNotes?: string;
}

// --- Process / Recipe Timeline ---
export interface ProcessStep {
  number: string; // "01", "02", etc.
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
}

// --- The Ledger Anti-Agency Comparison ---
export interface LedgerRow {
  category: string;
  typicalAgency: string;
  typicalCost: string;
  clovisCraft: string;
  clovisCost: string;
  differenceNote?: string;
}

// --- Objection-Crushing FAQ ---
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: 'ownership' | 'copywriting' | 'integrations' | 'pricing' | 'timeline';
}

// --- Navigation Item ---
export interface NavItem {
  id: string;
  label: string;
  href?: string;
}
