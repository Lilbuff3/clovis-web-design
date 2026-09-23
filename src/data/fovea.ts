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

/** Case study facts come from caseStudies.ts; these are only the labels around them. */
export const work = {
  head: {
    acuity: "20/100",
    label: "Prescriptions on file",
    title: "Two practices,",
    accent: "seen clearly.",
    lede: "Both sites are live. Open either one on your phone and time it yourself.",
  },
  record: "Record",
  complaint: "Presenting complaint",
  prescription: "What I prescribed",
  showBefore: "Show before",
  showAfter: "Show after",
  beforeNote: "Before: an illustration of a typical slow template, not the client’s old site.",
  read: "Read the full case study",
  visit: "Open the live site ↗",
};

export const fees = {
  head: {
    acuity: "20/70",
    label: "Fees, plainly",
    title: "Prices on the wall,",
    accent: "not in a drawer.",
    lede: "No call to find out what it costs. Every price is right here, and every site is yours to keep.",
  },
  /** Display names per tier id in calculator.ts. The plain tier title shows underneath. */
  tiers: {
    landing: { code: "SV", name: "Single Vision" },
    business: { code: "BF", name: "Bifocal" },
    flagship: { code: "VF", name: "Varifocal" },
  } as Record<string, { code: string; name: string }>,
  featured: "landing",
  launchNote: "Launch price",
  text: "Text me about this",
  call: "Call",
  bestFor: "Best for",
  followUp: {
    title: "Follow-up visits",
    accent: "Optional, and I mean it.",
    lede: "Your site runs fine without me. It’s plain files: no plugins to update, nothing that breaks at 2 a.m. These are for people who’d rather send one text than think about their website.",
    promise:
      "Cancel with one text. No contract, no exit fee, no “migration charge.” You already have the code, the domain and the logins, because you had them from day one.",
  },
  unsure: "Not sure which one you need? Text me and I’ll tell you straight, even if the answer is that you don’t need me yet.",
  brief: "Or send me the details by email ↗",
};

export const duochrome = {
  head: {
    acuity: "20/50",
    label: "The duochrome test",
    title: "Which half looks",
    accent: "clearer to you?",
    lede: "In an eye exam, the red and green test tells the doctor whether a prescription is too strong or too weak. Websites go wrong the same way.",
  },
  red: {
    title: "Over-built",
    note: "The $5,000 agency site",
    items: ["A slideshow nobody waits for", "Plugins that need updating every week", "Four seconds to load on a phone", "A monthly fee to keep it alive"],
    foot: "Loud, expensive, and gone before it loads.",
  },
  green: {
    title: "In focus",
    note: "What I build",
    items: ["One clear promise at the top", "Prices right on the page", "Text or call in one tap", "Up before anyone waits"],
    foot: "Quiet, fast, and read in four seconds.",
  },
  sliderLabel: "Slide between the over-built site and the one in focus",
  hint: "Drag the handle, or use the arrow keys",
  tableCaption: "The same five things, side by side",
  columns: { topic: "What you’d ask", agency: "Typical agency", me: "With me" },
  rows: [
    {
      topic: "Who actually builds it",
      agencyShort: "You talk to an account manager",
      agency: "You meet the senior people once, in the pitch. After that your site is handed to whoever is free that week.",
      meShort: "You talk to me",
      me: "I design it, I build it, I put it live. When you call (559) 575-3014, the person who wrote the code picks up.",
    },
    {
      topic: "Who owns it when you walk away",
      agencyShort: "They hold the keys",
      agency: "The site sits on their system. Stop paying and it goes dark, and you do not get the design or the content back.",
      meShort: "You hold the keys",
      me: "The code and the domain are in your name from day one. Move it anywhere, any time, and you do not need my permission.",
    },
    {
      topic: "How it behaves on a phone",
      agencyShort: "They leave before it loads",
      agency: "A heavy template with dozens of plugins bolted on. On a phone out in the field it takes long enough that people give up.",
      meShort: "It is there before they wait",
      me: "Built by hand with nothing in it that does not need to be there. It comes up fast on a phone, on real signal, not office wifi.",
    },
    {
      topic: "Who writes the words",
      agencyShort: "You end up writing it",
      agency: "You get a blank questionnaire and a deadline, or they run it through a machine and hand you something that sounds like everyone else.",
      meShort: "I write it",
      me: "We talk for forty-five minutes, I record it, and I write the site out of what you actually said about your own trade.",
    },
    {
      topic: "When you need something changed",
      agencyShort: "A form and a wait",
      agency: "Put in a ticket, wait for a change order, then get an invoice for a paragraph of text.",
      meShort: "A text message",
      me: "Text me. Small things I just do. If it is genuinely a big job I will tell you that before I start, not after.",
    },
  ],
};

export const footer = {
  blurb:
    "Hand-built websites for Fresno and Central Valley businesses. Fast on a phone, set up so Google can find you, and yours on day one.",
  based: "Based in Clovis · Serving all of Fresno County",
  towns: "Fresno, Clovis, Madera, Sanger, Selma, Fowler, and Kingsburg.",
  cta: "Send me the details ↗",
  sign: "20/20",
};
