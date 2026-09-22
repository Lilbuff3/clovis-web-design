import type { ServiceOffering } from "@/types";

export interface ExtendedServiceOffering extends ServiceOffering {
  subsecondLoad?: boolean;
  zeroCmsLockin?: boolean;
  threePackRanking?: boolean;
  reviewDefense?: boolean;
  radiusLandingPages?: boolean;
  schemaIntegration?: string[];
  stack?: string;
}

export const services: ExtendedServiceOffering[] = [
  {
    id: "bespoke-web",
    title: "The website itself",
    subtitle: "Built by hand, fast on a phone, and yours the day it goes live.",
    description:
      "I write the site from scratch rather than dropping your business into a template. That means there is nothing in it that does not need to be there, so it comes up quickly on a phone out in the field — which is where most people will find you. There is no content system to log into and no monthly fee keeping it switched on. The code and the domain are in your name from the first day.",
    deliverableTag: "One page, or several",
    subsecondLoad: true,
    zeroCmsLockin: true,
    stack: "React 19 + TypeScript + Tailwind CSS",
    highlights: [
      "Comes up fast on a phone, on real signal rather than office wifi",
      "Readable at arm's length — proper contrast, text that scales",
      "Your phone number is never more than one tap away",
      "Nothing to log into, nothing to keep paying to keep it online",
      "Code and domain in your name from day one",
    ],
    deliverables: [
      {
        title: "A page that loads",
        detail:
          "Hand-written, no page builder, nothing bolted on that slows it down.",
      },
      {
        title: "Readable on any screen",
        detail:
          "Warm paper palette, Fraunces type, and tap targets big enough to actually hit.",
      },
      {
        title: "Nothing to break into",
        detail:
          "No database, no plugins, no login page — so there is very little to attack.",
      },
    ],
    icon: "code",
  },
  {
    id: "gbp-dominance",
    title: "Your Google listing",
    subtitle:
      "The panel people see before they ever reach your website — set up properly.",
    description:
      "When somebody searches for your trade in Fresno, Google shows a short list with a map above everything else. That panel is built from your Google Business Profile — the free listing Google keeps about your business — and for a local trade it matters more than the website. Most people never fill theirs in properly. I set yours up: the right category, real photos, your service area, your hours, and a simple way to keep reviews coming in. I cannot promise you a position on that list, and you should be wary of anyone who does — what I can do is make sure nothing about your listing is holding you back.",
    deliverableTag: "Listing set up and looked after",
    threePackRanking: true,
    reviewDefense: true,
    highlights: [
      "Right category and service area, which is what most listings get wrong",
      "Real photos of your work, added regularly rather than once",
      "A simple way to ask happy customers for a review by text",
      "A straight answer on reviews: what can be reported, and what cannot",
      "Your listing details kept consistent wherever they appear",
    ],
    deliverables: [
      {
        title: "Category and service area",
        detail:
          "Getting these wrong quietly keeps you out of results you should be in.",
      },
      {
        title: "Photos that are actually yours",
        detail:
          "Your trucks, your crew, your finished work — not stock images.",
      },
      {
        title: "Reviews, without the games",
        detail:
          "A text link that makes leaving one easy. No fake reviews, ever.",
      },
    ],
    icon: "map-pin",
  },
  {
    id: "geo-seo-radar",
    title: "Being found in your area",
    subtitle:
      "Pages built around the neighborhoods you actually work in.",
    description:
      "National booking sites outrank local trades because they have pages for every town and you have one page for everywhere. The fix is not complicated: give each area you serve its own page, written about that area rather than copy-pasted. Tower District, Fig Garden, Woodward Park, Old Town Clovis. I also mark the site up so Google can read what you do, where you do it, and how to reach you, instead of having to guess.",
    deliverableTag: "A page per area you serve",
    radiusLandingPages: true,
    schemaIntegration: ["LocalBusiness", "MedicalClinic", "Service", "Physician"],
    highlights: [
      "A real page for each area you work, not one page listing town names",
      "Written about the area — the streets, the housing, the jobs you get there",
      "Marked up so Google can read your trade, your area and your number",
      "Aimed at people ready to call, not people browsing",
    ],
    deliverables: [
      {
        title: "Pages per neighborhood",
        detail:
          "Each one written for that area rather than swapping out the town name.",
      },
      {
        title: "Markup Google can read",
        detail:
          "Structured data so your trade, service area and contact details are unambiguous.",
      },
      {
        title: "Written for people about to call",
        detail:
          "Aimed at the search someone makes when the problem is already happening.",
      },
    ],
    icon: "radar",
  },
];
