import type { CalculatorTierConfig, RetainerTierConfig } from "@/types";

/** Launch promotion. When the seats are gone, drop PROMO and LANDING_PRICE falls back to regular. */
export const LAUNCH_PROMO = {
  active: true,
  seats: 5,
  blurb: "First 5 Central Valley businesses",
} as const;

export const SCOPE_TIERS: CalculatorTierConfig[] = [
  {
    id: "landing",
    title: "Landing Page",
    subtitle: "One page that loads fast and gets you called.",
    price: 500,
    regularPrice: 750,
    timeline: "1 Week",
    bestFor:
      "Contractors, shops, and one-person trades who need a real page today — not a template with someone else's name on the invoice.",
    features: [
      "One page, hand-built, live in a week",
      "Your phone number everywhere, one tap to call or text",
      "Loads before anyone gets bored waiting",
      "Set up so Google knows who and where you are",
      "Yours on day one — code, domain, the lot",
      "One round of changes after you see it",
    ],
    excludes: [
      "No multi-page site or blog",
      "No logo or brand design",
      "No ongoing SEO work — that's the care plan",
    ],
  },
  {
    id: "business",
    title: "Local Authority",
    subtitle: "Several pages, written around what your customers actually ask.",
    price: 2500,
    timeline: "3–4 Weeks",
    bestFor:
      "Established local businesses with more than one service to explain, or who need Spanish alongside English.",
    features: [
      "3–5 pages, every one written from a recorded conversation with you",
      "A page for each town you serve, built for the searches people there type",
      "A full Spanish version at /es/",
      "Still yours on day one, still no lock-in",
    ],
  },
  {
    id: "flagship",
    title: "Flagship",
    subtitle: "The whole thing, for businesses where the website is the front door.",
    price: 5000,
    timeline: "4–6 Weeks",
    bestFor:
      "Medical practices, multi-location operators, and anyone with compliance rules to satisfy.",
    features: [
      "Custom design built around your brand, not a layout I reused",
      "Booking, quoting, or whatever tool your customers need",
      "Built to the accessibility and privacy rules your industry has",
      "I stay on it for 90 days after launch",
    ],
  },
];

export const RETAINER_TIERS: RetainerTierConfig[] = [
  {
    id: "none",
    title: "No plan",
    monthlyPrice: 0,
    description:
      "Take the keys and go. The site is yours and it keeps working without me.",
    features: [
      "Full code and domain handed over at launch",
      "Host it wherever you like",
      "Call me when you need something; I'll quote it",
    ],
  },
  {
    id: "care",
    title: "Care Plan",
    monthlyPrice: 99,
    description:
      "Hosting, updates, and small changes handled. Cancel any month — the site stays yours either way.",
    features: [
      "Hosting, backups, and security updates",
      "Small text and photo changes whenever you need them",
      "I watch it and fix things before you notice",
      "Cancel any time, no notice, no penalty",
    ],
  },
  {
    id: "care-plus",
    title: "Care Plus",
    monthlyPrice: 249,
    description:
      "Everything in the Care Plan, plus the site keeps growing. Same deal: cancel any month and it stays yours.",
    features: [
      "Everything in the Care Plan",
      "One new page or town page a month",
      "A check-in every quarter on your speed and where you rank",
      "Cancel any time, no notice, no penalty",
    ],
  },
];

const tier = (id: string) => SCOPE_TIERS.find((t) => t.id === id)!;
const retainer = (id: string) => RETAINER_TIERS.find((t) => t.id === id)!;

/** Shorthand views of the arrays above. Derived, so prices only live in one place. */
export const PRICING_CONSTANTS = {
  tiers: {
    landing: { price: tier("landing").price!, regularPrice: tier("landing").regularPrice!, title: tier("landing").title },
    business: { price: tier("business").price, title: tier("business").title },
    flagship: { price: tier("flagship").price, title: tier("flagship").title },
  },
  retainers: {
    none: { monthly: retainer("none").monthlyPrice, title: retainer("none").title },
    care: { monthly: retainer("care").monthlyPrice, title: retainer("care").title },
    carePlus: { monthly: retainer("care-plus").monthlyPrice, title: retainer("care-plus").title },
  },
};

export const smsUri = (body: string) => `sms:+15595753014?body=${encodeURIComponent(body)}`;

/** Prefilled text message. Kept short: long SMS bodies get truncated by the messaging app. */
export function formatSmsUri(tierTitleOrContext?: string) {
  if (!tierTitleOrContext) {
    return smsUri("Hi Adam, I'm interested in a website for my business.");
  }
  if (tierTitleOrContext.toLowerCase().startsWith("hi adam") || tierTitleOrContext.includes("?")) {
    return smsUri(tierTitleOrContext);
  }
  return smsUri(`Hi Adam, I'm interested in the ${tierTitleOrContext} for my business.`);
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

/** "Send details in writing": a prefilled email, so nobody has to find a form. */
export const BRIEF_MAILTO = formatMailtoUri({
  subject: "Website for my business",
  body: "Name:\nBusiness:\nTown:\nCurrent website (if any):\n\nWhat I need:\n\nBest number to reach me:\n",
});
