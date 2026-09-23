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

export const lensTray = {
  head: {
    acuity: "20/40",
    label: "The lens tray",
    title: "Real interfaces,",
    accent: "held up to the light.",
    lede: "Three small pieces of the sites, rebuilt here in plain HTML. Pick one up to read why every line is where it is.",
  },
  /** `kind` picks the mock markup in Receipt.astro; `source` says honestly where it comes from. */
  lenses: [
    {
      kind: "bigbros",
      name: "The price card",
      source: "Recreated from bigbrosdumpster.com",
      notes: [
        ["The price sits beside the size", "Nobody should scroll to find out what a dumpster costs."],
        ["Flat, and it says so", "“Flat” next to each price answers the broker teaser rates before anyone asks."],
        ["The worry answered in the list", "Boards under the wheels. It’s the first thing homeowners ask, so it’s on the card."],
      ],
    },
    {
      kind: "kidney",
      name: "The call bar",
      source: "Recreated from kidneyspecialistinc.com",
      notes: [
        ["The question people actually have", "“Not sure if you need a kidney specialist?” Call and ask. No form, no patient data."],
        ["Spanish in one tap", "Se habla español, and the whole site switches, not just a banner."],
        ["The phone number is the button", "Big, high-contrast, and the same number everywhere."],
      ],
    },
    {
      kind: "sample",
      name: "A landing page",
      source: "Sample layout, not a client",
      notes: [
        ["One promise at the top", "What you do, where, and how fast. Read in four seconds."],
        ["Text a photo", "The easiest first step for someone standing in their yard looking at the problem."],
        ["Call and text, side by side", "Some people call, some text. Neither should have to hunt."],
      ],
    },
  ],
  testTitle: "Don’t take my word for it",
  testLede: "These links run Google’s own speed test on the live sites right now. You see what it finds today, not a screenshot I picked.",
  testLink: (host: string) => `Test ${host} ↗`,
  testNote: "Opens Google PageSpeed Insights, mobile",
  targetsTitle: "What I build to",
  targets: [
    { value: "< 1.0s", label: "Largest Contentful Paint", note: "Google calls under 2.5s good" },
    { value: "0.0", label: "Cumulative Layout Shift", note: "Nothing jumps around while it loads" },
    { value: "< 50ms", label: "Interaction to Next Paint", note: "Buttons answer the moment you tap" },
  ],
};

export const exam = {
  head: {
    acuity: "20/30",
    label: "The examination",
    title: "Four lenses,",
    accent: "turned in order.",
    lede: "Every site goes through the same four steps in the same order, so nothing gets made up on the day it should have been decided.",
  },
  of: "of",
  prev: "Previous step",
  next: "Next step",
  youGet: "What you get",
};

export const eyeExam = {
  head: {
    acuity: "20/25",
    label: "The eye exam · two minutes · free",
    title: "Test your",
    accent: "website’s eyes.",
    lede: "Five questions. No email address, no follow-up sequence. You get a straight answer, even if the answer is that you don’t need me.",
  },
  practiceLabel: "Your business name (optional)",
  practicePlaceholder: "Tower District Roofing",
  /** Options go worst to best: A counts 2 problems, B counts 1, C counts 0. */
  questions: [
    {
      q: "When someone nearby searches for what you do, what happens?",
      options: ["They find a directory, a competitor, or nothing", "They find me eventually, on page two", "They find me first, with the right number"],
    },
    {
      q: "Pull your website up on your phone right now. How long until you can read it?",
      options: ["I gave up waiting", "Three or four seconds", "It’s just there"],
    },
    {
      q: "Where do your new customers come from?",
      options: ["Word of mouth, and I couldn’t tell you more", "Some from Google, I think", "Google and my website, and I know which"],
    },
    {
      q: "When did you last change something on your website yourself?",
      options: ["I can’t. Someone else has the login", "Last year, and it took a week", "This month"],
    },
    {
      q: "Is your Google Business Profile filled in, with photos and your hours?",
      options: ["What’s a Google Business Profile?", "Some of it", "All of it, and I answer reviews"],
    },
  ],
  back: "← One question back",
  progress: "Chart № 5 · your progress",
  chartRow: "E Z O P N",
  resultTitle: "Your prescription",
  resultFor: "For",
  resultAcuity: "Reading",
  resultRecommend: "Recommended",
  /** Chosen by number of problems (0–10). `tier` is a calculator.ts tier id, or null for "you don't need me". */
  results: [
    { max: 2, acuity: "20/20", tier: null, verdict: "Your site is doing its job. Honestly, you don’t need me yet. Text me if that changes." },
    { max: 6, acuity: "20/50", tier: "landing", verdict: "The basics are there, but people are squinting. One fast, clear page would fix most of it." },
    { max: 10, acuity: "20/200", tier: "business", verdict: "Right now the internet can barely see you. You need a proper site with a page for each town you serve." },
  ],
  textResult: "Text me my results",
  again: "Take it again",
  noScript: "Answer the questions, then text me your letters (like A, C, B, B, A) and I’ll send your prescription back.",
};

export const servicesHead = {
  acuity: "20/20",
  label: "What’s in the case",
  title: "Three things,",
  accent: "done properly.",
  lede: "A website on its own doesn’t get you found. These three work together, and I do all of them myself.",
};

export const practice = {
  head: {
    acuity: "20/15",
    label: "The practice",
    title: "One person,",
    accent: "one town at a time.",
  },
  body: [
    "I’m Adam Youssef. I build websites by hand from Clovis for businesses across Fresno and the Central Valley. You get my cell number, not a ticket queue, and the person who answers is the person who wrote the code.",
    "A local business doesn’t need a brand platform. It needs to be found by someone standing forty feet away with a phone in one hand, and understood in the four seconds before they give up. Everything I build is for those four seconds.",
    "So I listen before I design, I write before I build, and I hand you the keys at the end. An eye doctor doesn’t keep your glasses.",
  ],
  rulesTitle: "Rules of the practice",
  rules: [
    "No templates sold as custom. Ever.",
    "Prices published, never behind a phone call.",
    "You keep the code, the domain and the logins.",
    "I don’t disappear. When you text, I answer.",
    "If one page is enough, that’s what I’ll tell you.",
  ],
};

export const faqHead = {
  acuity: "20/10",
  label: "Questions before the exam",
  title: "What people ask",
  accent: "before they call.",
};

export const footer = {
  blurb:
    "Hand-built websites for Fresno and Central Valley businesses. Fast on a phone, set up so Google can find you, and yours on day one.",
  based: "Based in Clovis · Serving all of Fresno County",
  towns: "Fresno, Clovis, Madera, Sanger, Selma, Fowler, and Kingsburg.",
  cta: "Send me the details ↗",
  sign: "20/20",
};
