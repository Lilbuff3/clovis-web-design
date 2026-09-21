import type { FAQItem } from "@/types";

export interface ExtendedFAQItem extends FAQItem {
  q: string;
  a: string;
}

export const faqs: ExtendedFAQItem[] = [
  {
    id: "code-ownership",
    category: "ownership",
    question: "Who owns the website code and domain once we launch?",
    q: "Who owns the website code and domain once we launch?",
    answer:
      "You do. 100%. Day one. The code repository, domain DNS, and hosting accounts are in your name. Unlike traditional agencies that hold websites hostage on proprietary CMS platforms and bill monthly ransom fees to keep your pages online, you receive the full, clean source code and asset bundle. If you ever decide to work with someone else, you can take your code anywhere without penalty.",
    a: "You do. 100%. Day one. The code repository, domain DNS, and hosting accounts are in your name.",
  },
  {
    id: "copywriting-burden",
    category: "copywriting",
    question: "Do I have to write all the copy and articles myself?",
    q: "Do I have to write all the copy and articles myself?",
    answer:
      "No. I write every headline and paragraph based on a 45-minute recorded founder interview. Most business owners procrastinate on new websites for months because an agency dumped a blank 20-page Word document on their desk. I extract your stories, customer objections, and technical advantages directly from our interview, authoring sharp, high-converting English and bilingual Spanish trade copy.",
    a: "No. I write every headline and paragraph based on a 45-minute recorded founder interview.",
  },
  {
    id: "third-party-integrations",
    category: "integrations",
    question: "Can we keep our existing POS, booking software, or EHR (Toast, Square, Kareo)?",
    q: "Can we keep our existing POS, booking software, or EHR (Toast, Square, Kareo)?",
    answer:
      "Yes. We seamlessly embed and integrate with your existing operational software without disruption. Whether your business runs on Toast, Square, Mindbody, Kareo, Epic, Jobber, or Clover, we embed your existing booking workflows or ordering widgets without compromising sub-second page performance or regulatory compliance.",
    a: "Yes. We seamlessly embed and integrate with your existing operational software without disruption.",
  },
  {
    id: "warranty-and-maintenance",
    category: "timeline",
    question: "What happens if something breaks after launch?",
    q: "What happens if something breaks after launch?",
    answer:
      "Every build includes a 90-day comprehensive craftsman warranty with direct phone support. You have my direct mobile phone number ((559) 575-3014) and email. If a browser update causes a display issue or you need an emergency text adjustment, I resolve it directly. For ongoing Google Business Profile growth and neighborhood SEO, we offer optional month-to-month retainers with zero long-term contracts.",
    a: "Every build includes a 90-day comprehensive craftsman warranty with direct phone support.",
  },
  {
    id: "delivery-timeline",
    category: "timeline",
    question: "How long does a typical build take from deposit to launch?",
    q: "How long does a typical build take from deposit to launch?",
    answer:
      "Standard delivery in 4 to 6 weeks. No endless committee review cycles. Because you work directly with me rather than an account manager relaying notes to junior interns, design revisions and code iterations happen within hours, not weeks.",
    a: "Standard delivery in 4 to 6 weeks. No endless committee review cycles.",
  },
  {
    id: "hipaa-and-medical-compliance",
    category: "integrations",
    question: "How do you handle medical HIPAA liability on healthcare websites?",
    q: "How do you handle medical HIPAA liability on healthcare websites?",
    answer:
      "We implement a zero-HIPAA-liability architecture. Rather than collecting sensitive Protected Health Information (PHI) through unencrypted, non-compliant web forms that expose clinics to $50,000+ OCR penalties, we architect dedicated clinical referral fax channels and direct click-to-call patient triage. The site stores zero patient data on web servers.",
    a: "We implement a zero-HIPAA-liability architecture with direct fax/call clinical channels and zero PHI stored on web servers.",
  },
  {
    id: "bilingual-spanish-copy",
    category: "copywriting",
    question: "Why do you emphasize bilingual English/Spanish copy for Central Valley businesses?",
    q: "Why do you emphasize bilingual English/Spanish copy for Central Valley businesses?",
    answer:
      "Over 53% of Fresno and Madera County residents identify as Hispanic or Latino. In residential construction, roofing, hauling, landscaping, and agriculture, Spanish is the everyday operational language. We write authentic Central Valley trade Spanish rather than awkward Google Translate, opening high-converting SMS direct booking channels.",
    a: "Over 53% of Fresno County is Hispanic. Authentic trade Spanish unlocks a massive underserved contractor and residential market.",
  },
];
