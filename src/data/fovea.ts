/**
 * Every word on the homepage, one export per section. Edit copy here; layout lives in the components.
 * Prices come from calculator.ts and case study facts from caseStudies.ts. Don't retype them here.
 */

export const brand = {
  name: "Clovis Web Design",
  tagline: "Websites in focus · Fresno",
};

/** Section ids are load-bearing (tests, case study breadcrumbs); change labels freely. */
export const nav = [
  { id: "work", label: "Prescriptions" },
  { id: "pricing", label: "Fees" },
  { id: "exam", label: "Eye exam" },
  { id: "process", label: "How it works" },
  { id: "faq", label: "FAQ" },
];

export const hero = {
  eyebrow: "Chart № 1 · Fresno & the Central Valley",
  status: "Taking new work",
  /** The full sentence screen readers and Google get. The chart below is the visual version of it. */
  h1: "Websites that load before your customer gives up. Hand-built in Clovis for Fresno businesses.",
  /** Eye-chart rows, biggest first. `accent` colors a row cobalt. Keep row text short: it's set very large. */
  chart: [
    { text: "Websites", acuity: "20/200" },
    { text: "that load", acuity: "20/100" },
    { text: "before", acuity: "20/70" },
    { text: "your customer", acuity: "20/50" },
    { text: "gives up —", acuity: "20/40", accent: true },
    { text: "Hand-built in Clovis for Fresno businesses", acuity: "20/30" },
    { text: "Live in a week. Yours on day one. No monthly hostage fees.", acuity: "20/25" },
    { text: "If you can read this line, your website should be this easy to read too.", acuity: "20/20" },
  ],
  pitch: "I build fast, hand-made websites for Fresno businesses. You get my cell number, not a ticket queue.",
  priceLine: (price: number) => `Landing pages $${price} · live in a week · you own it`,
  ctaText: "Text me a question",
  ctaPrices: "See the prices",
  lensOn: "Lens in",
  lensOff: "Lens out",
  lensHint: "Move to focus",
  /** Shown only when the visitor's real load time is known. {time} and {acuity} are filled in live. */
  reading: "This page on your device: {time} · {acuity}",
  figure: {
    caption: "Fig. 1 — Big Bros Dumpster Rentals. #1 on Google for “dumpster rental Fresno.”",
    alt: "The Big Bros Dumpster Rentals homepage I built: flat-rate dumpster prices and a text-for-a-quote button",
  },
  /** Runs around a circle; about 30–40 characters fits best. */
  seal: "Clovis Web Design · Fresno, CA · ",
};

export const ticker = (price: number) => [
  `Landing pages $${price}`,
  "Live in a week",
  "You own the code and the domain",
  "No monthly hostage fees",
  "100/100 on Google PageSpeed",
  "Text me: (559) 575-3014",
];

export const footer = {
  blurb:
    "Hand-built websites for Fresno and Central Valley businesses. Fast on a phone, set up so Google can find you, and yours on day one.",
  based: "Based in Clovis · Serving all of Fresno County",
  towns: "Fresno, Clovis, Madera, Sanger, Selma, Fowler, and Kingsburg.",
  cta: "Send me the details ↗",
  sign: "20/20",
};
