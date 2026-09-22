import { PRICING_CONSTANTS } from "@/data/calculator";
import { faqs } from "@/data/faq";
import type { ExtendedCaseStudy } from "@/data/caseStudies";

const SITE = "https://cloviswebdesign.com";
const AGENCY = `${SITE}/#agency`;
const ADAM = `${SITE}/#adam`;
const landing = PRICING_CONSTANTS.tiers.landing;
const care = PRICING_CONSTANTS.retainers.care;

const agency = {
  "@type": "ProfessionalService",
  "@id": AGENCY,
  name: "Clovis Web Design",
  url: `${SITE}/`,
  image: `${SITE}/og.png`,
  telephone: "+1-559-575-3014",
  email: "adam@cloviswebdesign.com",
  founder: { "@id": ADAM },
  // Service-area business: locality only, no street address.
  address: {
    "@type": "PostalAddress",
    addressLocality: "Clovis",
    addressRegion: "CA",
    postalCode: "93612",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Fresno County, California" },
    ...["Fresno", "Clovis", "Madera", "Sanger", "Selma", "Fowler", "Kingsburg"].map((name) => ({
      "@type": "City",
      name,
      containedInPlace: { "@type": "State", name: "California" },
    })),
  ],
  priceRange: "$$",
  description:
    "Hand-built websites for Fresno, Clovis and Central Valley businesses. Landing page live in a week, and you own it on day one.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Website builds",
    itemListElement: [
      {
        "@type": "Offer",
        name: landing.title,
        price: landing.price,
        priceCurrency: "USD",
        itemOffered: { "@type": "Service", name: "One-page website, live in a week" },
      },
      {
        "@type": "Offer",
        name: care.title,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: care.monthly,
          priceCurrency: "USD",
          unitCode: "MON",
        },
        itemOffered: { "@type": "Service", name: "Hosting, updates and small changes" },
      },
    ],
  },
};

const adam = {
  "@type": "Person",
  "@id": ADAM,
  name: "Adam Youssef",
  jobTitle: "Founder",
  worksFor: { "@id": AGENCY },
  telephone: "+1-559-575-3014",
};

const graph = (nodes: object[]) => ({ "@context": "https://schema.org", "@graph": nodes });

export function homeSchema() {
  return graph([
    agency,
    adam,
    { "@type": "WebSite", "@id": `${SITE}/#website`, url: `${SITE}/`, name: "Clovis Web Design", publisher: { "@id": AGENCY } },
    {
      "@type": "FAQPage",
      "@id": `${SITE}/#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ]);
}

/** The case study page is about the client; reference their entity by @id rather than redeclaring it. */
export function caseStudySchema(study: ExtendedCaseStudy) {
  const url = `${SITE}/work/${study.id}/`;
  return graph([
    {
      "@type": "Article",
      "@id": `${url}#article`,
      url,
      headline: `${study.client}: ${study.headline}`,
      description: study.summary,
      author: { "@id": ADAM },
      publisher: { "@id": AGENCY },
      about: { ...(study.entityId && { "@id": study.entityId }), "@type": "LocalBusiness", name: study.client, url: study.url },
      dateCreated: study.year,
    },
    { "@type": "ProfessionalService", "@id": AGENCY, name: "Clovis Web Design", url: `${SITE}/` },
    { "@type": "Person", "@id": ADAM, name: "Adam Youssef" },
  ]);
}
