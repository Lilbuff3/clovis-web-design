import type {
  ScopeTier,
  RetainerTier,
  CalculatorTierConfig,
  RetainerTierConfig,
  CalculatorAddonConfig,
} from "@/types";

export const SCOPE_TIERS: CalculatorTierConfig[] = [
  {
    id: "storefront",
    title: "Storefront",
    subtitle: "High-speed single-location digital storefront",
    price: 9500,
    timeline: "3–4 Weeks",
    bestFor:
      "Independent cafes, boutiques, medical specialists, and single-unit contractors wanting to replace an outdated template with a fast flagship.",
    features: [
      "Custom hand-coded React 19 + TypeScript frontend",
      "Sub-second load times (<600ms on mobile 4G)",
      "100/100 Core Web Vitals performance guarantee",
      "LocalBusiness or MedicalClinic Schema.org markup",
      "Direct phone/SMS click-to-contact lead triggers",
      "100% day-one code, domain, and asset ownership",
    ],
  },
  {
    id: "flagship",
    title: "Flagship",
    subtitle: "Complete bespoke brand flagship & local search engine",
    price: 22000,
    timeline: "4–6 Weeks",
    bestFor:
      "Growing Central Valley practices, high-end remodelers, law firms, and established service businesses ready to dominate local competitors.",
    features: [
      "Everything in Storefront, plus deep brand identity system",
      "Comprehensive interview-driven copywriting in craftsman tone",
      "Interactive product visualizers or custom quote calculators",
      "Multi-entity Schema.org knowledge graph integration",
      "Zero-HIPAA or zero-liability regulatory compliance architecture",
      "90-day comprehensive craftsman warranty and performance tuning",
    ],
  },
  {
    id: "multi-location",
    title: "Multi-Location",
    subtitle: "Multi-unit regional network & programmatic Geo-SEO",
    price: 45000,
    timeline: "6–8 Weeks",
    bestFor:
      "Regional health systems, multi-yard agricultural suppliers, and multi-city franchise operators across Fresno, Clovis, and Madera.",
    features: [
      "Everything in Flagship, plus multi-city hub architecture",
      "Programmatic neighborhood radius landing page network",
      "Multi-location GBP 3-Pack and citation synchronization",
      "Advanced multi-provider or multi-inventory directory filtering",
      "Custom analytics dashboard with zero third-party tracker cookies",
      "Priority SLA support with dedicated staging and CI/CD pipelines",
    ],
  },
];

export const RETAINER_TIERS: RetainerTierConfig[] = [
  {
    id: "none",
    title: "None",
    monthlyPrice: 0,
    description: "Self-managed. Full code ownership transferred at launch.",
    features: [
      "100% self-hosted on your preferred cloud account",
      "Standard 90-day post-launch craftsman warranty",
      "Complete documentation and deployment runbooks",
    ],
  },
  {
    id: "standard",
    title: "GBP Dominance / Standard",
    monthlyPrice: 600,
    description:
      "Active Google Business Profile 3-Pack maintenance and review defense.",
    features: [
      "Weekly geotagged photography and profile updates",
      "Active review defense, rapid response, and fake review removal",
      "Point-of-sale menu and inventory synchronization (Toast/Square)",
      "Monthly local ranking radar audit and search performance report",
    ],
  },
  {
    id: "growth",
    title: "Geo/SEO Radar / Growth",
    monthlyPrice: 1200,
    description:
      "Aggressive hyper-local neighborhood SEO and organic content engine.",
    features: [
      "Everything in Standard, plus new neighborhood landing pages",
      "Ongoing schema refinement for new service offerings",
      "Bilingual Spanish trade content updates and seasonal campaigns",
      "Direct Slack/phone priority support with 2-hour response window",
    ],
  },
];

export const ADDON_CONFIGS: CalculatorAddonConfig[] = [
  {
    id: "bilingual",
    title: "Bilingual Spanish (EN/ES) UX & Trade Copy",
    price: 2500,
    description:
      "Authentic Central Valley Spanish trade copywriting, dual-language navigation toggle, and direct SMS dispatch for Hispanic contractor and consumer demographics.",
  },
  {
    id: "compliance",
    title: "Regulatory Compliance (Zero-HIPAA / WCAG 2.1 AA)",
    price: 3000,
    description:
      "Enhanced healthcare and legal compliance: 12.6:1+ contrast ratios, keyboard navigation audit, and clinical fax-first triage architecture eliminating website PHI storage.",
  },
];

export const PRICING_CONSTANTS = {
  tiers: {
    storefront: { price: 9500, title: "Storefront" },
    flagship: { price: 22000, title: "Flagship" },
    "multi-location": { price: 45000, title: "Multi-Location" },
  },
  retainers: {
    none: { monthly: 0, title: "None" },
    standard: { monthly: 600, title: "GBP Dominance / Standard" },
    growth: { monthly: 1200, title: "Geo/SEO Radar / Growth" },
  },
  addons: {
    bilingual: 2500,
    compliance: 3000,
  },
};

export function calculateQuote(
  tierKey: ScopeTier,
  retainerKey: RetainerTier,
  selectedAddons: string[] = []
) {
  const tier = PRICING_CONSTANTS.tiers[tierKey];
  if (!tier) throw new Error(`Unknown tier: ${tierKey}`);

  const retainer =
    PRICING_CONSTANTS.retainers[retainerKey] ||
    PRICING_CONSTANTS.retainers.none;

  let setupTotal = tier.price;
  for (const addon of selectedAddons) {
    if (addon === "bilingual") {
      setupTotal += PRICING_CONSTANTS.addons.bilingual;
    } else if (addon === "compliance") {
      setupTotal += PRICING_CONSTANTS.addons.compliance;
    }
  }

  return {
    tierTitle: tier.title,
    retainerTitle: retainer.title,
    setupTotal,
    monthlyTotal: retainer.monthly,
  };
}

export function formatMailtoUri(params: {
  to?: string;
  subject?: string;
  body?: string;
}) {
  const email = params.to || "adam@cloviswebdesign.com";
  const subject = encodeURIComponent(params.subject || "Project Scope Inquiry");
  const body = encodeURIComponent(params.body || "");
  return `mailto:${email}?subject=${subject}&body=${body}`;
}
