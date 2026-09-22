import type { FAQItem } from "@/types";
import { PRICING_CONSTANTS, LAUNCH_PROMO } from "@/data/calculator";

const entry = PRICING_CONSTANTS.tiers.landing;
const care = PRICING_CONSTANTS.retainers.care;
/** Written once here so a price change never leaves the FAQ contradicting the pricing section. */
const PRICE = `$${entry.price}`;
const REGULAR = `$${entry.regularPrice}`;
const CARE = `$${care.monthly}`;

export interface ExtendedFAQItem extends FAQItem {
  /** One-line version used in collapsed and structured-data contexts. */
  short: string;
}

export const faqs: ExtendedFAQItem[] = [
  {
    id: "code-ownership",
    category: "ownership",
    question: "Who owns the website and the domain once it's live?",
    answer:
      "You do, completely, from day one. The code, the domain, and the hosting account are all in your name. Plenty of companies keep your site on their own system and charge you every month to leave it switched on — cancel and you lose the design, the text, the lot. That isn't how this works. You get the whole thing, and if you ever want someone else to take over, you hand it to them and walk.",
    short:
      "You do. Completely, from day one — code, domain and hosting, all in your name.",
  },
  {
    id: "landing-page-offer",
    category: "pricing",
    question: `What do I actually get for ${PRICE}?`,
    answer:
      "One page, built by hand, live in about a week. Your phone number sits at the top, the bottom, and on a bar that follows people down the page, so calling or texting you is one tap. It loads fast on a phone. It's set up so Google understands who you are and where you work. And it's yours the day it goes live. What it isn't: a multi-page site, a blog, or a logo. If you need those, say so and I'll quote it properly rather than pretend a one-page job covers it.",
    short:
      "One hand-built page, live in about a week, with one round of changes — yours on day one.",
  },
  {
    id: "why-so-cheap",
    category: "pricing",
    question: `Why is it ${PRICE} when everyone else wants thousands?`,
    answer:
      `Because it's a launch offer and it's limited to the first ${LAUNCH_PROMO.seats} businesses, and because one page really is about a day of my time once we've talked. After those ${LAUNCH_PROMO.seats} it goes to ${REGULAR}, which is still less than most shops around here charge for a template. The bigger builds cost more because they take longer — there's no trick to it.`,
    short:
      `It's a launch offer for the first ${LAUNCH_PROMO.seats} businesses, and one page is genuinely about a day's work.`,
  },
  {
    id: "copywriting-burden",
    category: "copywriting",
    question: "Do I have to write all the words myself?",
    answer:
      "No. We talk for about forty-five minutes, I record it, and I write the site from what you actually said. Most people put off getting a website for months because someone handed them a blank twenty-page document and told them to fill it in. That's the step that kills these projects, so I do it.",
    short:
      "No. We talk for forty-five minutes and I write the site from what you said.",
  },
  {
    id: "monthly-plan",
    category: "pricing",
    question: "Do I have to sign up for anything monthly?",
    answer:
      `No. The care plan is there if you want it — ${CARE} a month covers hosting, backups, security updates, and small changes whenever you need them — but the site is yours whether you take it or not. Cancel any month, no notice period, no penalty, and you keep everything. If you'd rather host it yourself and call me when something comes up, that's completely fine.`,
    short:
      `No. The ${CARE}/mo care plan is optional, cancel any month, and the site is yours either way.`,
  },
  {
    id: "third-party-integrations",
    category: "integrations",
    question: "Can we keep our existing booking or ordering system?",
    answer:
      "Usually, yes. If your customers already book or order through something that gives you a link or an embed — most of the common ones do — I can put it on the page without slowing the site down. Tell me what you're running when we talk and I'll confirm before you pay me anything, rather than promising first and finding out afterwards.",
    short:
      "Usually yes — tell me what you're running and I'll confirm before you pay anything.",
  },
  {
    id: "warranty-and-maintenance",
    category: "timeline",
    question: "What happens if something breaks after launch?",
    answer:
      "You text me and I fix it. You have my mobile — (559) 575-3014 — not a ticket queue. For the first ninety days after a build, anything that's genuinely broken I fix at no charge. After that, small things I'll still usually just do; if something turns into real work I'll tell you what it costs before I start, not after.",
    short:
      "You text me and I fix it. Ninety days of repairs after launch at no charge.",
  },
  {
    id: "delivery-timeline",
    category: "timeline",
    question: "How long does it take?",
    answer:
      "About a week for the one-page build, three to four weeks for a multi-page site, longer if there's booking or compliance work in it. You're dealing with me directly rather than passing notes through an account manager, so changes happen the same day instead of next sprint.",
    short:
      "About a week for one page, three to four weeks for a multi-page site.",
  },
  {
    id: "medical-privacy",
    category: "integrations",
    question: "We're a medical practice. How do you handle patient privacy?",
    answer:
      "By not collecting patient information on the website at all. Web forms that gather health details create a compliance problem most small practices don't want and don't need — HIPAA penalties run into tens of thousands of dollars. Instead the site routes people to a phone call or a referral fax, which are channels your practice already handles correctly. Nothing sensitive is stored on the web server, because nothing sensitive is collected there.",
    short:
      "By not collecting patient information on the site at all — calls and referral fax instead.",
  },
];
