import type { ServiceOffering } from "@/types";

export interface ExtendedServiceOffering extends ServiceOffering {
  subsecondLoad?: boolean;
  zeroCmsLockin?: boolean;
  threePackRanking?: boolean;
  reviewDefense?: boolean;
  radiusLandingPages?: boolean;
  schemaIntegration?: string[];
  stack?: string;
  posSync?: string;
}

export const services: ExtendedServiceOffering[] = [
  {
    id: "bespoke-web",
    title: "Bespoke Web Design",
    subtitle: "Hand-crafted digital flagships with sub-second performance and zero CMS lock-in.",
    description:
      "We build custom, hand-coded web applications that load in under 600ms on real-world 4G networks. Zero bloated WordPress templates, zero slow Elementor page builders, and zero hostage hosting retainers. You receive 100% ownership of your code, domain, and assets on day one.",
    deliverableTag: "Sub-Second Production Flagship",
    subsecondLoad: true,
    zeroCmsLockin: true,
    stack: "React 19 + TypeScript + Tailwind CSS",
    highlights: [
      "Sub-second first contentful paint (<600ms on throttled 4G)",
      "100/100 Core Web Vitals verified across all 4 audit pillars",
      "WCAG 2.1 AA compliant color contrast (12.6:1+ medical contrast)",
      "Zero-HIPAA-liability architecture with call/fax direct routing",
      "100% day-one code, domain, and production asset ownership",
    ],
    deliverables: [
      {
        title: "Hand-Coded React 19 Frontend",
        detail: "Single-file bundle optimized for blazing speed with zero external dependencies.",
      },
      {
        title: "Responsive Typography & Design System",
        detail: "Warm paper palette, Fraunces editorial serifs, and accessible touch targets.",
      },
      {
        title: "Zero-Vulnerability Security Architecture",
        detail: "No database endpoints, no vulnerable PHP plugins, and no form exposure.",
      },
    ],
    icon: "code",
  },
  {
    id: "gbp-dominance",
    title: "Google Business Profile Dominance",
    subtitle: "Local Map 3-Pack supremacy, review defense, and POS inventory sync.",
    description:
      "Your Google Business Profile is your storefront's highest-converting asset. We optimize your local map presence to dominate the 3-Pack for high-intent searches across Clovis, Fresno, and Madera. Includes active review defense, weekly geotagged updates, and live POS integration.",
    deliverableTag: "Local Map 3-Pack Engine",
    threePackRanking: true,
    reviewDefense: true,
    posSync: "Live menu and inventory POS synchronization with Toast and Square",
    highlights: [
      "Top 3-Pack map ranking across target Central Valley service radii",
      "Review defense & fake review removal protocol with rapid response",
      "Live menu and inventory POS synchronization with Toast/Square",
      "Weekly geotagged high-resolution photography and catalog updates",
      "Continuous citation consistency across 60+ primary local directories",
    ],
    deliverables: [
      {
        title: "GBP Primary Category Strategy",
        detail: "Laser-targeted primary and secondary category taxonomy calibration.",
      },
      {
        title: "Point-of-Sale Synchronization",
        detail: "Live integration with Square, Toast, or Clover for real-time offerings.",
      },
      {
        title: "Review Acceleration System",
        detail: "Frictionless SMS review capture workflows for verified happy customers.",
      },
    ],
    icon: "map-pin",
  },
  {
    id: "geo-seo-radar",
    title: "Geo/SEO Radar",
    subtitle: "Programmatic neighborhood radius pages and deep Schema.org authority.",
    description:
      "Capture high-intent buyers searching in specific neighborhoods before national lead brokers can siphon them. We architect dedicated neighborhood landing pages targeting Old Town Clovis, Harlan Ranch, Woodward Park, and Old Fig Garden, reinforced by deep Schema.org structured data.",
    deliverableTag: "Hyper-Local Radius Network",
    radiusLandingPages: true,
    schemaIntegration: ["LocalBusiness", "MedicalClinic", "Service", "Physician"],
    highlights: [
      "Dedicated neighborhood radius pages (Clovis, Fresno, Fig Garden, Madera)",
      "Validated Schema.org structured data (LocalBusiness, MedicalClinic, Service)",
      "Bilingual EN/ES UX architecture capturing Hispanic trade demographics",
      "Neighborhood-specific landmark keyword mapping (Pollasky, Harlan Ranch, Van Ness)",
      "Zero-broker direct dispatch eliminating $200+ per order aggregator fees",
    ],
    deliverables: [
      {
        title: "Neighborhood Landing Page Grid",
        detail: "Indexable hubs tailored for suburban remodels, HOAs, and historic enclaves.",
      },
      {
        title: "Multi-Entity Schema.org Graph",
        detail: "Connected JSON-LD graphs linking NPIs, service areas, and business licenses.",
      },
      {
        title: "Bilingual Trade Copywriting",
        detail: "Authentic Central Valley Spanish terminology tailored for trade crews.",
      },
    ],
    icon: "radar",
  },
];
