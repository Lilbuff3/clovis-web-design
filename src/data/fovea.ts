/**
 * Every word on the homepage, one export per section. Edit copy here; layout lives in the components.
 * Prices come from calculator.ts and case study facts from caseStudies.ts. Don't retype them here.
 *
 * Section heads: `n` is the number in the eyebrow, `accent` is the italic word on its own line,
 * and `after` (optional) finishes the sentence after it.
 */

export const brand = {
  name: "Clovis Web Design",
  tagline: "Websites in focus",
};

/** Section ids are load-bearing (tests, case study breadcrumbs); change labels freely. */
export const nav = [
  { id: "work", label: "The work" },
  { id: "process", label: "How it works" },
  { id: "exam", label: "Eye exam" },
  { id: "pricing", label: "Fees" },
];

/** The ruler across the top, the eye-chart rail on the right, and the card that lifts on load. */
export const chrome = {
  depth: "Reading depth",
  acuity: "Acuity",
  /** The ruler's acuity reading as you scroll, top of the page to the bottom. */
  steps: ["20/200", "20/100", "20/70", "20/50", "20/40", "20/25", "20/15"],
  /** `name` is what screen readers hear for each rail link. */
  rail: [
    { id: "hero", label: "20/200", name: "Top" },
    { id: "ledger", label: "20/100", name: "The duochrome test" },
    { id: "work", label: "20/70", name: "The work" },
    { id: "process", label: "20/50", name: "How it works" },
    { id: "exam", label: "20/40", name: "The eye exam" },
    { id: "about", label: "20/25", name: "The practice" },
    { id: "pricing", label: "20/20", name: "Fees" },
    { id: "book", label: "20/15", name: "Reception" },
  ],
  curtain: "Chart № 1 · Snellen, revised",
  textMe: "Text me",
};

export const hero = {
  status: "Taking new work",
  line: "Hand-built websites · Clovis, CA",
  area: "Fresno & the Central Valley",
  chartNo: "Chart № 1 — Snellen, revised",
  /** The full sentence screen readers and Google get. The chart below is the visual version of it. */
  h1: "Websites that load before your customer gives up. Hand-built in Clovis for Fresno businesses.",
  /** Eye-chart rows, biggest first. `accent` colors a row vermilion; `link` makes the last row a link to Reception. */
  chart: [
    { text: "Websites", acuity: "20/200" },
    { text: "that load", acuity: "20/100" },
    { text: "before", acuity: "20/70" },
    { text: "your customer", acuity: "20/50" },
    { text: "gives up —", acuity: "20/40", accent: true },
    { text: "Hand-built in Clovis for Fresno businesses", acuity: "20/30" },
    { text: "Live in a week. Yours on day one. No monthly hostage fees.", acuity: "20/25" },
    { text: "If you can read this line, your website should be this easy to read too.", acuity: "20/20", link: true },
  ],
  pitch: "I build fast, hand-made websites for Fresno businesses. You get my cell number, not a ticket queue.",
  priceLine: (price: number) => `Landing pages $${price} · live in a week · you own it`,
  ctaText: "Text me a question",
  ctaPrices: "See the fees",
  lensOn: "Glasses on",
  lensOff: "Glasses off",
  lensHint: "Move to focus",
  examLink: "or take the two-minute eye exam →",
  /** Shown only when the visitor's real load time is known. {time} and {acuity} are filled in live. */
  reading: "This page on your device: {time} · {acuity}",
  figure: { caption: "Fig. 1 — light through a window", meta: "1/60 · f2" },
  plate: {
    alt: "An optician's trial lens case, a trial frame and a pair of round glasses on warm paper, next to a Landolt C eye chart",
    caption: "Trial case № 1",
    meta: "Clovis, CA",
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

export const duochrome = {
  head: {
    n: "01",
    label: "The duochrome test",
    title: "Which half looks",
    accent: "clearer",
    after: " to you?",
    lede: "In an eye exam, the red and green test tells the doctor whether a prescription is too strong or too weak. Websites go wrong the same way.",
  },
  red: {
    note: "The $5,000 agency site",
    title: "Over-built",
    items: ["A slideshow nobody waits for", "Plugins that need updating every week", "Four seconds to load on a phone", "A monthly fee to keep it alive"],
    foot: "Loud, expensive, and gone before it loads.",
  },
  green: {
    note: "What I build",
    title: "In focus",
    items: ["One clear promise at the top", "Prices right on the page", "Text or call in one tap", "Up before anyone waits"],
    foot: "Quiet, fast, and read in four seconds.",
  },
  sliderLabel: "Slide between the over-built site and the one in focus",
  hint: "Drag the handle, or use the arrow keys",
  evidenceTitle: "What I build to",
  evidence: [
    { value: "< 1.0s", label: "Largest Contentful Paint", note: "Google calls under 2.5s good" },
    { value: "0.0", label: "Cumulative Layout Shift", note: "Nothing jumps around while it loads" },
    { value: "< 50ms", label: "Interaction to Next Paint", note: "Buttons answer the moment you tap" },
    { value: "1 wk", label: "First text to live", note: "For a one-page site" },
  ],
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

/** Case study facts come from caseStudies.ts; these are only the labels around them. */
export const work = {
  head: {
    n: "02",
    label: "The dispensary",
    title: "Frames I’ve",
    accent: "fitted",
    lede: "Two practices, both live. Pick a frame off the shelf to read what I prescribed, then open either site on your phone and time it yourself.",
  },
  record: "Record card",
  /** Short names for the frame shelf, by case study id. */
  short: { "kidney-specialist-inc": "Kidney", "big-bros-dumpster": "Big Bros" } as Record<string, string>,
  complaint: "Presenting complaint",
  prescription: "What I prescribed",
  before: "Before",
  after: "After",
  showBefore: "Show the before view",
  pick: "Pick a frame",
  beforeNote: "Before: an illustration of a typical slow template, not the client’s old site.",
  yours: "Yours?",
  yoursLabel: "Your business could be the next frame. Text me.",
  read: "Read the full case study",
  visit: "Open the live site ↗",
};

export const exam = {
  head: {
    n: "03",
    label: "The examination",
    title: "Four lenses,",
    accent: "turned",
    after: " in order",
    lede: "Every site goes through the same four steps in the same order, so nothing gets made up on the day it should have been decided.",
  },
  /** One trial lens per step, turned into place on the dial. Decoration, not a measurement. */
  lenses: ["+0.25", "−1.75", "−3.00", "+1.00"],
  lens: "Lens",
  nextLens: "next lens",
  of: "of",
  prev: "Previous step",
  next: "Next step",
  youGet: "What you get",
};

export const eyeExam = {
  head: {
    n: "04",
    label: "The eye exam · two minutes · free",
    title: "Test your",
    accent: "website’s",
    after: " eyes",
    lede: "Five questions. No email address, no follow-up sequence. You get a straight answer, even if the answer is that you don’t need me.",
  },
  practiceLabel: "Your business name (optional)",
  practicePlaceholder: "Tower District Roofing",
  /** Options go worst to best: A counts 2 problems, B counts 1, C counts 0. */
  questions: [
    {
      q: "When someone nearby searches for what you do, what happens?",
      hint: "Be honest. I will be.",
      options: ["They find a directory, a competitor, or nothing", "They find me eventually, on page two", "They find me first, with the right number"],
    },
    {
      q: "Pull your website up on your phone right now. How long until you can read it?",
      hint: "That’s how most of your customers meet it.",
      options: ["I gave up waiting", "Three or four seconds", "It’s just there"],
    },
    {
      q: "Where do your new customers come from?",
      hint: "Follow the money, not the hope.",
      options: ["Word of mouth, and I couldn’t tell you more", "Some from Google, I think", "Google and my website, and I know which"],
    },
    {
      q: "When did you last change something on your website yourself?",
      hint: "Not a developer. You.",
      options: ["I can’t. Someone else has the login", "Last year, and it took a week", "This month"],
    },
    {
      q: "Is your Google Business Profile filled in, with photos and your hours?",
      hint: "The map is the new shop window.",
      options: ["What’s a Google Business Profile?", "Some of it", "All of it, and I answer reviews"],
    },
  ],
  answerHonestly: "Answer honestly",
  pick: "pick →",
  back: "← One question back",
  progress: "Chart № 5 · your progress",
  chartRow: "E Z O P N",
  doneHint: "Exam done. Your prescription is written up and ready to take away.",
  resultTitle: "Prescription",
  patient: "Patient",
  patientFallback: "Your business",
  patientLine: "Somewhere in the Central Valley",
  dispenser: "Dispenser",
  dispenserName: "Adam Youssef",
  dispenserLine: "Clovis Web Design · Clovis, CA",
  resultAcuity: "Reading today",
  corrected: "With correction",
  resultRecommend: "Recommended",
  nothingYet: "Nothing yet",
  signed: "Signed, Clovis Web Design",
  stamp: "Tested",
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

/** The butter strip. Every number is a fact from caseStudies.ts: a metric, or the clients' own words in their quotes. */
export const stats = {
  label: "Results so far",
  items: [
    { n: "#1", k: "Big Bros, on Google for “dumpster rental Fresno”" },
    { n: "100/100", k: "Google PageSpeed on both client sites" },
    { n: "+140%", k: "Kidney Specialist’s provider referrals, by Dr. Masood’s count" },
    { n: "4", k: "more trucks Big Bros bought to keep up" },
  ],
};

export const practice = {
  n: "05",
  label: "The practice",
  /** The headline, one line per entry. */
  title: ["One person,", "one town at a time"],
  figure: { caption: "Fig. 4 — made by hand", meta: "∞ loop", videoLabel: "Hands filing a ring on a workbench" },
  callout: { k: "Works from", v: "Clovis, CA" },
  body: [
    "I’m Adam Youssef. I build websites by hand from Clovis for businesses across Fresno and the Central Valley. You get my cell number, not a ticket queue, and the person who answers is the person who wrote the code.",
    "A local business doesn’t need a brand platform. It needs to be found by someone standing forty feet away with a phone in one hand, and understood in the four seconds before they give up. Everything I build is for those four seconds.",
  ],
  closing: {
    text: "So I listen before I design, I write before I build, and I hand you the keys at the end.",
    accent: "An eye doctor doesn’t keep your glasses.",
  },
  rulesTitle: "Rules of the practice",
  rules: [
    "No templates sold as custom. Ever.",
    "Prices published, never behind a phone call.",
    "You keep the code, the domain and the logins.",
    "I don’t disappear. When you text, I answer.",
    "If one page is enough, that’s what I’ll tell you.",
  ],
  cta: "Text Adam",
};

export const fees = {
  head: {
    n: "06",
    label: "Fees, plainly",
    title: "Prices on the",
    accent: "wall",
    after: ", not in a drawer",
    lede: "No call to find out what it costs. Every price is right here, and every site is yours to keep.",
  },
  /** Display names per tier id in calculator.ts. The plain tier title shows underneath. */
  tiers: {
    landing: { code: "SV", name: "Single Vision" },
    business: { code: "BF", name: "Bifocal" },
    flagship: { code: "VF", name: "Varifocal" },
  } as Record<string, { code: string; name: string }>,
  featured: "landing",
  badge: "Launch price",
  launchNote: "Launch price",
  oneOff: "one-off",
  text: "Text me about this",
  followUp: {
    label: "Loose lenses",
    title: "Follow-up visits.",
    accent: "Optional, and I mean it.",
    lede: "Your site runs fine without me. It’s plain files: no plugins to update, nothing that breaks at 2 a.m. These are for people who’d rather send one text than think about their website.",
    promise:
      "Cancel with one text. No contract, no exit fee, no “migration charge.” You already have the code, the domain and the logins, because you had them from day one.",
  },
  unsure: "Not sure which one you need? Text me and I’ll tell you straight, even if the answer is that you don’t need me yet.",
  brief: "Or send me the details by email ↗",
};

export const servicesHead = {
  label: "What’s in the case",
  title: "Three things,",
  accent: "done properly.",
  lede: "A website on its own doesn’t get you found. These three work together, and I do all of them myself.",
};

export const letters = {
  head: {
    n: "07",
    label: "Letters from patients",
    title: "They wrote",
    accent: "back",
    lede: "Two clients, in their own words, unedited.",
  },
  postmark: "Fitted",
};

export const reception = {
  head: {
    n: "08",
    label: "Reception",
    title: "Start with",
    accent: "a text",
    lede: "No forms to wade through and no call you didn’t ask for. Tell me what you need and I’ll get back to you, even if you don’t have a website yet.",
  },
  card: {
    title: "Appointment card",
    number: "№ 001",
    rows: [
      ["Cost to ask", "Nothing"],
      ["Who answers", "Adam, who builds it"],
      ["How", "Text, call or email"],
    ],
    priceLabel: "Landing page",
    price: (price: number) => `$${price} · live in a week`,
    askLabel: "What I’ll ask you",
    ask: "What you do, who you do it for, and where. That’s most of it.",
  },
  form: {
    name: "Your name",
    business: "Business",
    businessPlaceholder: "Tower District Roofing",
    need: "What do you need?",
    needs: ["I don’t have a website yet", "My site is slow on phones", "Customers can’t find me on Google", "I can’t update my site myself", "Something else"],
    note: "Anything else? (optional)",
    notePlaceholder: "We’re a two-truck landscaping crew in Clovis. No website yet, just a Facebook page.",
    send: "Send to Adam",
    email: "or email it instead ↗",
    help: "Opens a text to (559) 575-3014 with this filled in. Nothing sends until you press send.",
    noScript: "Text me what you need at (559) 575-3014, or send the details by email. Either way, the reply comes from me.",
    promise: "No newsletter. No sales sequence. One reply, from me.",
  },
};

export const faqHead = {
  n: "09",
  label: "Questions before the exam",
  title: "What people ask",
  accent: "before they call.",
};

export const caseStudyPage = {
  crumb: "The work",
  visit: "Open the live site",
  doctors: "Physicians",
  owners: "Owners",
  complaint: "Presenting complaint",
  built: "What I built",
  result: "The result",
  google: "What Google reads",
  googleBody: (host: string) =>
    `Structured data is the part of a site that tells search engines who the business is, where it works and how to reach it. Google’s own tool shows you what it finds on ${host} today.`,
  googleLink: "Open Google’s Rich Results Test",
  hipaa: { fax: "Referral fax", phone: "Scheduling line", forms: "Web forms collecting patient data" },
  ctaTitle: "Want one like this?",
  ctaBody: "Text or call me. You’ll get the person who built this one.",
};

export const notFound = {
  acuity: "20/404",
  title: "This line is",
  accent: "out of focus.",
  body: "That page doesn’t exist. Try the home page, or text me and I’ll point you the right way.",
  home: "Back to the home page",
};

export const footer = {
  blurb:
    "Hand-built websites for Fresno and Central Valley businesses. Fast on a phone, set up so Google can find you, and yours on day one.",
  based: "Based in Clovis · Serving all of Fresno County",
  towns: "Fresno, Clovis, Madera, Sanger, Selma, Fowler, and Kingsburg.",
  cta: "Text me",
  linksTitle: "Waiting room",
  links: [
    { id: "work", label: "The work" },
    { id: "process", label: "How it works" },
    { id: "exam", label: "The eye exam" },
    { id: "about", label: "The practice" },
    { id: "pricing", label: "Fees, plainly" },
    { id: "faq", label: "Questions" },
  ],
  receptionTitle: "Reception",
  wordmark: "Clovis",
  wordmarkNote: "Clovis Web Design · hand-built in Clovis, California",
  legal: "No cookies · No trackers · No templates",
  craft: "Built by hand, like a good pair of glasses",
  sign: "20/15 — if you can read this line without squinting, text me.",
};
