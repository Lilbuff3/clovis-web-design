import type { ProcessStep } from "@/types";

export interface ExtendedProcessStep extends ProcessStep {
  step: number;
}

export const processSteps: ExtendedProcessStep[] = [
  {
    step: 1,
    number: "01",
    title: "Discovery & Plain-English Plan",
    duration: "Week 1",
    description:
      "We begin with a direct 45-minute founder interview and deep competitive teardown. No endless committee workshops or corporate jargon. We analyze your local search territory, audit competitors in Clovis, Fresno, and Madera, and deliver a straightforward, plain-English roadmap.",
    deliverables: [
      "Audited competitive landscape and plain-English technical blueprint",
      "Keyword & neighborhood radius opportunity matrix (Clovis, Fresno, Madera)",
      "Technical compliance roadmap (WCAG 2.1 AA, HIPAA zero-liability, CMS guidelines)",
      "Milestone schedule with guaranteed 4–6 weeks delivery commitment",
    ],
  },
  {
    step: 2,
    number: "02",
    title: "Design Direction & Real Copy",
    duration: "Weeks 2–3",
    description:
      "We author every headline, paragraph, and value driver based on your real customer conversations. You never stare at an empty Google Doc wondering what to write. Concurrently, we create high-fidelity design prototypes reflecting the warm craftsman aesthetic of your business.",
    deliverables: [
      "Interactive Figma design and interview-derived conversion copy",
      "Bilingual Spanish trade copy for Central Valley contractor demographics",
      "High-contrast color system exceeding WCAG 2.1 AA (12.6:1+ medical contrast)",
      "Complete photography art direction or raw asset restoration",
    ],
  },
  {
    step: 3,
    number: "03",
    title: "Hand-Coded Build & Photo Direction",
    duration: "Weeks 3–5",
    description:
      "Adam Youssef codes your production flagship by hand in modern React 19, TypeScript, and Tailwind CSS. No third-party agency interns. Every line of code is engineered for sub-second speeds, flawless mobile responsiveness, and zero bloated database dependencies.",
    deliverables: [
      "Single-file production bundle, zero CMS lock-in, 100/100 Lighthouse",
      "Custom micro-interactions: pointer glow, smooth reveals, and count-up gauges",
      "Validated Schema.org structured data (LocalBusiness, MedicalClinic, Physician)",
      "Zero-HIPAA contact architecture with direct clinical fax/call triage",
    ],
  },
  {
    step: 4,
    number: "04",
    title: "Launch & 90-Day Tuning",
    duration: "Week 6 + 90 Days",
    description:
      "We handle DNS cutover, Google Search Console indexing, and complete Google Business Profile claim and optimization. After launch, you are protected by a comprehensive 90-day craftsman warranty covering real-world ranking monitoring, speed tuning, and phone support.",
    deliverables: [
      "DNS migration, Google Business Profile claim, and 90 days of performance tuning",
      "Full repository code transfer with 100% asset and domain ownership day one",
      "Direct phone and SMS access to Adam Youssef for post-launch adjustments",
      "Quarterly local ranking radar report and review growth monitoring",
    ],
  },
];
