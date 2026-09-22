import type { ProcessStep } from "@/types";

export interface ExtendedProcessStep extends ProcessStep {
  step: number;
}

export const processSteps: ExtendedProcessStep[] = [
  {
    step: 1,
    number: "01",
    title: "Discovery — we talk",
    duration: "Day 1",
    description:
      "Forty-five minutes on the phone or at your shop. What you do, who calls you, what they ask before they book, and what you keep having to explain twice. I look at who else comes up when someone searches for your trade around here. Then I tell you in plain-English what I think the site needs — and if I think you need less than you came for, I will say that too. The days below are the one-page build; a multi-page site runs three to four weeks, and anything with booking or compliance in it runs longer.",
    deliverables: [
      "A plain-English rundown of what the site should do and why",
      "An honest look at who you are up against locally",
      "What it costs and how long it takes, before you pay anything",
      "A straight answer on whether you need me at all",
    ],
  },
  {
    step: 2,
    number: "02",
    title: "Design Direction — you see it before it is built",
    duration: "Days 2–3",
    description:
      "I write the copy from the recording of our conversation, in your words rather than mine, and lay out how the page will look. You see it and tell me what is wrong. Nobody hands you a blank document and asks you to fill it in — that is the step that stalls most website projects for months, so I do it.",
    deliverables: [
      "Real copy, written from what you actually said, not placeholder text",
      "The layout, so you know what you are getting before it exists",
      "Colors and type set for readability, including at arm's length",
      "One round of changes built into the price",
    ],
  },
  {
    step: 3,
    number: "03",
    title: "Build",
    duration: "Days 3–5",
    description:
      "I write it by hand. No page builder, no template, nothing bolted on that slows it down. Your phone number goes everywhere it should be, and the whole thing is built to come up fast on a phone with two bars of signal, because that is where most people will see it.",
    deliverables: [
      "Hand-written code, zero CMS lock-in, nothing to log into",
      "One tap to call or text you from anywhere on the page",
      "Marked up so Google can read your trade, your area and your number",
      "Checked on a real phone, not just a desktop browser window",
    ],
  },
  {
    step: 4,
    number: "04",
    title: "Launch & 90-Day Tuning",
    duration: "Day 6 onward",
    description:
      "I point the domain, get it into Google, and set up or tidy your Google listing. Then for 90 days, anything that is genuinely broken I fix at no charge — you text me, I sort it. After that the site is still yours and still works; the care plan is there if you want me keeping an eye on it, and it is fine if you do not.",
    deliverables: [
      "Domain pointed, site live, Google told it exists",
      "Code and domain in your name — handed over, not lent",
      "90 days of repairs at no charge, by text, direct to me",
      "The care plan if you want it, and no hard feelings if you do not",
    ],
  },
];
