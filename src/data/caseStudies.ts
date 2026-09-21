import type { CaseStudy } from "@/types";
import { kidneySpecialistSchema, bigBrosSchema } from "./schemas";

export interface ExtendedCaseStudy extends CaseStudy {
  founders?: string;
  doctors?: string[];
  hipaaArchitecture?: {
    referralFax: string;
    schedulingPhone: string;
    webPhiForms: number;
  };
  tradeSpanish?: {
    rollOff: string;
    driveway: string;
    appliances: string;
  };
  fleetPricing?: {
    fourteenYard: number;
    twentyYard: number;
    mattressSurcharge: number;
    drivewayPlanksIncluded: boolean;
  };
}

export const caseStudies: ExtendedCaseStudy[] = [
  {
    id: "kidney-specialist-inc",
    index: "01",
    year: "2025",
    client: "Kidney Specialist Inc.",
    location: "Madera & Fresno, CA",
    industry: "Nephrology & Medical Practice",
    tag: "Medical Compliance & WCAG AA",
    accent: "#0f766e",
    accentSoft: "#e6f4f1",
    headline: "Zero-HIPAA-liability architecture meets 100/100 Core Web Vitals.",
    summary:
      "A premier San Joaquin Valley nephrology group was burdened by a sluggish 3.8s generic WordPress template that exposed them to severe HIPAA Omnibus liability through unencrypted contact forms. We engineered a blazing-fast, static healthcare flagship with a zero-PHI clinical referral engine, WCAG 2.1 AA accessibility, and deep Schema.org medical taxonomy.",
    doctors: [
      "Dr. Sheikh Mohammad Masood, MD",
      "Dr. Mohammed Muhibbulla Siddiqui, MD",
    ],
    hipaaArchitecture: {
      referralFax: "(559) 661-1952",
      schedulingPhone: "(559) 661-1965",
      webPhiForms: 0,
    },
    metrics: [
      {
        value: 142,
        prefix: "+",
        suffix: "%",
        label: "Referral Surge",
      },
      {
        value: 100,
        suffix: "/100",
        label: "Core Web Vitals",
      },
      {
        value: 0,
        suffix: " Bytes",
        label: "HIPAA Web PHI Exposure",
      },
      {
        value: 12.6,
        decimals: 1,
        suffix: ":1",
        label: "WCAG Contrast Ratio",
      },
    ],
    challenge: {
      headline:
        "Generic forms exposed the clinic to $50,000+ HIPAA violations while 3.8s mobile load times cost them patients.",
      body: "The previous website relied on standard contact forms asking patients for symptoms, reason for visit, and insurance card uploads on an unencrypted shared host without a Business Associate Agreement (BAA). Meanwhile, elderly patients managing chronic kidney disease (CKD) on mobile phones faced tiny, low-contrast buttons and endless page lag, resulting in dropped referrals and lost trust.",
      pains: [
        "Catastrophic HIPAA liability: Web forms stored PHI without encryption or BAA agreements",
        "Sluggish 3.8s Largest Contentful Paint penalized local Google Map 3-Pack rankings",
        "Poor contrast and low touch targets violated ADA and WCAG 2.1 AA standards for seniors",
        "Zero Schema.org data linking clinical NPI identifiers to Google's Medical Knowledge Graph",
      ],
    },
    solution: {
      headline:
        "We eliminated website PHI completely with a high-contrast, fax-first clinical architecture.",
      body: "We replaced vulnerable forms with a two-channel triage model: a downloadable, print-ready Physician Referral packet routed directly to the clinic's dedicated clinical fax line at (559) 661-1952, and a one-touch telephone scheduling line at (559) 661-1965. The site was hand-coded in React 19 to achieve sub-second speeds, deep medical navy typography with 12.6:1 contrast, and complete Schema.org graphs indexing NPIs 1356539423, 1669422812, and 1184916983.",
      moves: [
        {
          title: "Zero-HIPAA-Liability Static Architecture",
          detail:
            "Replaced all web forms with direct encrypted clinical fax and one-touch phone triage, guaranteeing 0 bytes of PHI reside on web servers.",
        },
        {
          title: "WCAG 2.1 AA Senior Accessibility",
          detail:
            "Implemented 12.6:1 contrast ratios (Medical Navy #0f2942 on White), 48px+ touch targets, and keyboard focus states for visually degraded renal patients.",
        },
        {
          title: "MedicalClinic & Physician Schema Graph",
          detail:
            "Injected validated JSON-LD linking Organization NPI 1356539423, Dr. Masood (1669422812), Dr. Siddiqui (1184916983), and Madera/Fresno locations.",
        },
        {
          title: "CMS Medicare Compliant Copy",
          detail:
            "Authored clinical copy strictly adhering to CMS guidelines and California Business & Professions § 651, indexing 60+ accepted insurance plans.",
        },
      ],
    },
    deliverables: [
      "Zero-PHI static web application with sub-second performance",
      "Dedicated Physician Referral PDF packet and 1-touch clinical fax integration",
      "Complete MedicalClinic and Physician Schema.org JSON-LD graph",
      "WCAG 2.1 AA compliant UI with 12.6:1 contrast and focus visibility",
      "Dual-location directory indexing for Madera primary clinic and Fresno office",
    ],
    quote: {
      text: "Before Adam rebuilt our platform, referring physicians struggled with slow pages and confusing forms. Now our clinical fax packet and phone triage operate with total reliability. Our provider referrals are up over 140% without a single HIPAA concern.",
      name: "Dr. Sheikh Mohammad Masood, MD",
      role: "Founding President & Medical Director",
      entity: "Kidney Specialist Inc.",
    },
    stack: [
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "MedicalClinic Schema",
      "WCAG 2.1 AA",
      "Zero-HIPAA Architecture",
    ],
    jsonLd: kidneySpecialistSchema,
  },
  {
    id: "big-bros-dumpster",
    index: "02",
    year: "2025",
    client: "Big Bros Dumpster Rentals",
    location: "Clovis & Fresno, CA",
    industry: "Local Trade & Roll-Off Hauling",
    tag: "Geo-SEO Lead Engine",
    accent: "#d2743f",
    accentSoft: "#fbf0e8",
    headline:
      "Beating national waste aggregators with hyper-local SEO and bilingual SMS speed.",
    summary:
      "A family-owned roll-off hauler trapped beneath predatory national internet brokers was transformed into the Central Valley's highest-converting local dumpster service across Clovis, Fresno, and Fig Garden. Features authentic trade Spanish copy, driveway protection guarantees, and frictionless SMS dispatch.",
    founders:
      "Jessica Maldonado Ramirez & William A. Maldonado Ramirez",
    tradeSpanish: {
      rollOff: "Renta de Dómpers / Contenedores rodantes",
      driveway:
        "Protección garantizada de su driveway o pavimento (usamos tablones de madera)",
      appliances: "Sin recargos por colchones o electrodomésticos",
    },
    fleetPricing: {
      fourteenYard: 399,
      twentyYard: 499,
      mattressSurcharge: 0,
      drivewayPlanksIncluded: true,
    },
    metrics: [
      {
        value: 3.4,
        decimals: 1,
        suffix: "×",
        label: "Increase in direct Clovis inbound leads",
      },
      {
        value: 64,
        suffix: "%",
        label: "Of contractor bookings dispatched via Spanish SMS",
      },
      {
        value: 1,
        prefix: "#",
        label: "Local organic ranking for 'dumpster rental Clovis CA'",
      },
      {
        value: 100,
        suffix: "/100",
        label: "Core Web Vitals & Mobile Usability score",
      },
    ],
    challenge: {
      headline:
        "National middleman brokers were pocketing $200+ per order while local trucks did the work.",
      body: "National aggregators with multi-million dollar ad budgets dominated local search with misleading $299 teaser rates that ballooned to $550 with hidden delivery fees, fuel surcharges, and mattress fines. Big Bros was doing the heavy hauling while brokers skimmed the margin. Their previous site lacked localized neighborhood pages, offered zero Spanish support for the Valley's contractor demographic, and looked like an aggressive 2008 industrial template.",
      pains: [
        "Losing high-margin Clovis residential remodel jobs to national internet brokers",
        "Zero organic visibility in affluent enclaves (Old Fig Garden, Woodward Park, Harlan Ranch)",
        "Bilingual Hispanic contractors bouncing from English-only web forms",
        "Customer anxiety regarding roll-off steel wheels damaging decorative concrete and pavers",
      ],
    },
    solution: {
      headline:
        "We built a hyper-local lead engine tailored to Central Valley trades and homeowners.",
      body: "We replaced generic marketing with a precision Geo-SEO network covering Clovis, Fresno, and Old Fig Garden. We instituted the 'Calm Concierge' visual system with explicit Driveway Protection guarantees, wrote authentic bilingual EN/ES copy for Valley contractors ('Renta de Dómpers'), and introduced a 2-tap SMS dispatch engine connecting customers directly to William and Jessica at (559) 495-8034.",
      moves: [
        {
          title: "Geo-SEO Radius Landing Pages",
          detail:
            "Dedicated hubs (clovis.html, fresno.html, fig-garden.html) targeting Old Town Clovis, Harlan Ranch, and Woodward Park with custom LocalBusiness JSON-LD schema.",
        },
        {
          title: "Bilingual EN/ES Contractor Engine",
          detail:
            "Authentic Central Valley trade Spanish copy ('Renta de Dómpers', 'Protección de Driveway') with instant SMS direct dispatch for job-site foremen.",
        },
        {
          title: "'Calm Concierge' Visual Brand & Tokens",
          detail:
            "Warm travertine limestone, mineral slate, and forest emerald tones that replace industrial hazard anxiety with calm, reliable service assurance.",
        },
        {
          title: "Zero-Broker Flat Rate Calculator",
          detail:
            "Transparent $399 (14yd) and $499 (20yd) pricing with free mattress and appliance disposal explicitly highlighted against corporate broker surcharges.",
        },
      ],
    },
    deliverables: [
      "Hub-and-spoke Geo-SEO architecture with dedicated neighborhood pages",
      "Bilingual EN/ES contractor interface with instant 2-tap SMS dispatch",
      "'Calm Concierge' visual brand system with Driveway Protection badges",
      "Full LocalBusiness, Service, and AreaServed Schema.org JSON-LD graphs",
      "Interactive 14-yard ($399) and 20-yard ($499) flat-rate quote visualizer",
    ],
    quote: {
      text: "Before Adam rebuilt our site, national brokers were taking a huge chunk of every rental. Now, contractors and homeowners in Clovis text us directly. Our trucks are booked two weeks out.",
      name: "William Maldonado Ramirez",
      role: "Co-Owner & Head of Operations, Big Bros Dumpster Rentals",
      entity: "Big Bros Dumpster Rentals",
    },
    stack: [
      "Hyper-Local Geo-SEO",
      "Bilingual EN/ES UX",
      "LocalBusiness JSON-LD Schema",
      "SMS Direct Dispatch",
      "Core Web Vitals 100/100",
    ],
    jsonLd: bigBrosSchema,
  },
];
