import type { CaseStudy } from "@/types";

export interface ExtendedCaseStudy extends CaseStudy {
  founders?: string;
  doctors?: string[];
  /** One plain sentence about what changed for the business, shown above the numbers. */
  outcome?: string;
  hipaaArchitecture?: {
    referralFax: string;
    schedulingPhone: string;
    webPhiForms: number;
  };
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
}

/** Screenshots ship at 1280px plus a 640px copy (`-640.webp`) so phones download the small one. */
export const srcsetFor = (image: string) => `${image.replace(/\.webp$/, "-640.webp")} 640w, ${image} 1280w`;

export const caseStudies: ExtendedCaseStudy[] = [
  {
    id: "kidney-specialist-inc",
    index: "01",
    year: "2025",
    client: "Kidney Specialist Inc.",
    url: "https://www.kidneyspecialistinc.com",
    entityId: "https://www.kidneyspecialistinc.com/#organization",
    location: "Madera & Fresno, CA",
    industry: "Nephrology practice",
    tag: "Medical · Patient privacy",
    accent: "#0f766e",
    accentSoft: "#e6f4f1",
    image: "/images/kidney-specialist-preview.webp",
    imageWidth: 1280,
    imageHeight: 720,
    imageAlt: "Screenshot of the Kidney Specialist Inc. homepage: Expert Kidney Care for the Central Valley, with a call button and Spanish toggle",
    headline: "A medical site that never touches patient data, and scores 100 on Google's speed test.",
    summary:
      "Kidney Specialist Inc. runs nephrology clinics in Madera and Fresno. Their old site was a slow template with contact forms that asked patients about symptoms and insurance. I rebuilt it so the website never handles patient health information at all. It's built to 2026 HIPAA, HITECH, WCAG 2.1 AA and California patient-privacy requirements, and scores 100 on Google PageSpeed on both mobile and desktop.",
    doctors: ["Dr. Sheikh Mohammad Masood, MD", "Dr. Mohammed Muhibbulla Siddiqui, MD"],
    hipaaArchitecture: {
      referralFax: "(559) 661-1952",
      schedulingPhone: "(559) 661-1965",
      webPhiForms: 0,
    },
    metrics: [
      { value: 100, suffix: "/100", label: "PageSpeed, mobile" },
      { value: 100, suffix: "/100", label: "PageSpeed, desktop" },
      { value: 0, label: "Online forms that collect patient data" },
      { value: 12.6, decimals: 1, suffix: ":1", label: "Text contrast ratio" },
    ],
    challenge: {
      headline: "The old forms asked patients for health details a website shouldn't be holding.",
      body: "The previous site took symptoms, reasons for visit and insurance card uploads through ordinary web forms on shared hosting. For a medical practice that is a privacy problem waiting to happen. It was also slow — about 3.8 seconds to load on a phone — with small, low-contrast buttons that are hard to use for older patients managing kidney disease.",
      pains: [
        "Patient health details collected through ordinary web forms",
        "Close to four seconds to load on a phone",
        "Small, low-contrast buttons that are hard for older patients to use",
        "Nothing telling Google who the physicians are or where the clinics are",
      ],
    },
    solution: {
      headline: "Take patient information off the website entirely.",
      body: "Referring physicians download a print-ready referral packet and fax it to the clinic at (559) 661-1952. Patients book by calling (559) 661-1965. Nobody types anything about their health into the website, so nothing sensitive ever sits on a web server. The site itself is hand-coded, loads in under a second, and uses high-contrast type and large tap targets throughout.",
      moves: [
        {
          title: "No patient data on the web",
          detail:
            "Nothing on the site asks a patient to type in health information. Referrals go by fax and appointments by phone — channels the practice already handles under HIPAA.",
        },
        {
          title: "Printable forms instead of online ones",
          detail:
            "Medication list, 24-hour urine collection protocol and change-of-nephrologist forms print in one click. Patients fill them in at home and bring them to the visit, so the information never touches a web server.",
        },
        {
          title: "Guides patients actually use",
          detail:
            "Plain-language guides on eGFR below 60, potassium food swaps, HbA1c conversion and kidney-friendly vegetables, plus pages for the symptoms that bring people in — swelling, protein in the urine, blood pressure that won't come down.",
        },
        {
          title: "Every page in English and Spanish",
          detail:
            "A full Spanish site at /es/, each page linked to its English twin so Google shows the right language to the right patient.",
        },
        {
          title: "A first visit with no surprises",
          detail:
            "A what-to-bring checklist and an insurance plan search, so patients know before they call whether their plan is accepted.",
        },
        {
          title: "Built to the rules a medical practice answers to",
          detail:
            "Designed to 2026 HIPAA and HITECH requirements, WCAG 2.1 AA accessibility, and California's patient-privacy law (CMIA), with a published Notice of Privacy Practices and accessibility statement in both languages.",
        },
        {
          title: "Readable for older patients",
          detail:
            "12.6:1 text contrast (navy #0f2942 on white), tap targets of 48px or more, and visible keyboard focus.",
        },
        {
          title: "Google knows who the doctors are",
          detail:
            "Structured data links the practice (NPI 1356539423), Dr. Masood (1669422812), Dr. Siddiqui (1184916983), and both clinic locations.",
        },
      ],
    },
    deliverables: [
      "Hand-coded site, 100 on PageSpeed mobile and desktop",
      "Print-ready physician referral packet routed to the clinic fax",
      "One-click printable patient forms and plain-language clinical guides",
      "Full Spanish version with language-linked pages",
      "Structured data for the practice, both physicians and both locations",
      "WCAG 2.1 AA accessible design",
      "Separate listings for the Madera clinic and the Fresno office",
    ],
    quote: {
      text: "Before Adam rebuilt our platform, referring physicians struggled with slow pages and confusing forms. Now our clinical fax packet and phone triage operate with total reliability. Our provider referrals are up over 140% without a single HIPAA concern.",
      name: "Dr. Sheikh Mohammad Masood, MD",
      role: "Founding President & Medical Director",
      entity: "Kidney Specialist Inc.",
    },
    stack: ["Astro", "English + Spanish", "WCAG 2.1 AA", "No-PHI design"],
  },
  {
    id: "big-bros-dumpster",
    index: "02",
    year: "2025",
    client: "Big Bros Dumpster Rentals",
    url: "https://bigbrosdumpster.com",
    location: "Fresno & Clovis, CA",
    industry: "Roll-off dumpster rental",
    tag: "Local search · Fresno",
    accent: "#d2743f",
    accentSoft: "#fbf0e8",
    image: "/images/big-bros-preview.webp",
    imageWidth: 1280,
    imageHeight: 720,
    imageAlt: "Screenshot of the Big Bros Dumpster Rentals homepage: flat-rate 14 and 20 yard dumpster prices and a text-for-a-quote button",
    headline: "Number one on Google for dumpster rental in Fresno.",
    summary:
      "Big Bros is a family-owned roll-off dumpster company in Fresno. National booking brokers were outranking them and taking a cut of jobs Big Bros trucks were doing anyway. After the rebuild — in English and Spanish — they ranked #1 on Google for “dumpster rental Fresno” and averaged position 1–2 across several other high-intent searches.",
    outcome: "The new work kept coming — Big Bros bought more trucks and dumpsters to keep up with it.",
    founders: "Jessica Maldonado Ramirez & William A. Maldonado Ramirez",
    metrics: [
      { value: 1, prefix: "#", label: "On Google for “dumpster rental Fresno”" },
      { value: 1, suffix: "–2", label: "Average position across high-intent searches" },
      { value: 100, suffix: "/100", label: "PageSpeed, mobile" },
      { value: 100, suffix: "/100", label: "PageSpeed, desktop" },
    ],
    challenge: {
      headline: "National brokers were outranking the company that actually owns the trucks.",
      body: "Search for a dumpster in Fresno and the top results were national middlemen with big ad budgets, advertising teaser prices that grew with delivery fees and surcharges. Big Bros did the hauling while the brokers kept a cut. Their old site had one page for everywhere, so Google had no reason to show them for any particular neighborhood.",
      pains: [
        "Losing Fresno and Clovis jobs to national booking brokers",
        "One page for every area, so no neighborhood searches found them",
        "Broker teaser prices made honest flat rates look expensive",
        "English only, in a market where many customers and contractors speak Spanish",
        "Customers worried a steel roll-off would crack their driveway",
      ],
    },
    solution: {
      headline: "A page for each area, flat prices up front, in English and Spanish, and one tap to text the owners.",
      body: "I built a page for each area they work — Fresno, Clovis, Fig Garden and Old Town Clovis — each written about that area rather than a copy with the town name swapped. Prices are flat and on the page: $399 for a 14-yard, $499 for a 20-yard, seven days, mattresses and appliances included. Driveway protection is stated plainly, the whole site switches to Spanish with one tap, and booking is a text to (559) 495-8034.",
      moves: [
        {
          title: "A page per service area",
          detail: "Fresno, Clovis, Fig Garden and Old Town Clovis, each with its own local copy and business markup.",
        },
        {
          title: "Flat prices on the page",
          detail: "$399 and $499, seven-day rental, mattresses and appliances included — no teaser rate, no surprises.",
        },
        {
          title: "Driveway protection, said out loud",
          detail: "Boards go under the wheels. It's the first thing homeowners worry about, so it's the first thing they read.",
        },
        {
          title: "The whole site in Spanish",
          detail:
            "One tap on EN/ES switches every line — sizes, prices, “Tablas bajo las ruedas — driveway protegido”. The top bar says it plainly: Hablamos español.",
        },
        {
          title: "Text to book",
          detail: "Not sure which size? Text a photo of the pile and they'll size it. Straight to the owners, no call center.",
        },
      ],
    },
    deliverables: [
      "Service-area pages for Fresno, Clovis, Fig Garden and Old Town Clovis",
      "Flat-rate pricing shown up front",
      "Full English and Spanish versions",
      "Text-to-book straight to the owners",
      "LocalBusiness structured data with service area and offers",
      "100 on PageSpeed, mobile and desktop",
    ],
    quote: {
      text: "Before Adam rebuilt our site, national brokers were taking a huge chunk of every rental. Now, contractors and homeowners in Clovis text us directly. Our trucks are booked two weeks out.",
      name: "William Maldonado Ramirez",
      role: "Co-Owner & Head of Operations, Big Bros Dumpster Rentals",
      entity: "Big Bros Dumpster Rentals",
    },
    stack: ["Local SEO", "English + Spanish", "Text-to-book", "PageSpeed 100"],
  },
];
