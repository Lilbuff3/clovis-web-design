/**
 * The clients' own JSON-LD, shown as a code sample on each /work page.
 * Not emitted as structured data here: those entities belong on the clients' sites.
 */

export const kidneySpecialistSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["MedicalClinic", "LocalBusiness"],
      "@id": "https://www.kidneyspecialistinc.com/#clinic",
      "name": "Kidney Specialist Inc.",
      "alternateName": "Kidney Specialists Inc.",
      "legalName": "Kidney Specialist Inc.",
      "url": "https://www.kidneyspecialistinc.com",
      "telephone": "+1-559-661-1965",
      "faxNumber": "+1-559-661-1952",
      "identifier": {
        "@type": "PropertyValue",
        "name": "National Provider Identifier (NPI)",
        "value": "1356539423",
      },
      "medicalSpecialty": [
        "https://health-lifesci.schema.org/Nephrology",
        "https://health-lifesci.schema.org/InternalMedicine",
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "451 E Almond Ave, Suite 101",
        "addressLocality": "Madera",
        "addressRegion": "CA",
        "postalCode": "93637",
        "addressCountry": "US",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 36.954,
        "longitude": -120.0543,
      },
      "priceRange": "$$",
      "isAcceptingNewPatients": true,
      "employee": [
        {
          "@type": "Physician",
          "@id": "https://www.kidneyspecialistinc.com/#dr-masood",
          "name": "Dr. Sheikh Mohammad Masood, MD",
          "jobTitle": "Founding President & Medical Director",
          "telephone": "+1-559-661-1965",
          "identifier": {
            "@type": "PropertyValue",
            "name": "Individual NPI",
            "value": "1669422812",
          },
          "medicalSpecialty": "Nephrology",
        },
        {
          "@type": "Physician",
          "@id": "https://www.kidneyspecialistinc.com/#dr-siddiqui",
          "name": "Dr. Mohammed Muhibbulla Siddiqui, MD",
          "jobTitle": "Attending Nephrologist",
          "telephone": "+1-559-661-1965",
          "identifier": {
            "@type": "PropertyValue",
            "name": "Individual NPI",
            "value": "1184916983",
          },
          "medicalSpecialty": "Nephrology",
        },
      ],
      "department": [
        {
          "@type": "MedicalClinic",
          "name": "Kidney Specialist Inc. - Fresno Office",
          "telephone": "+1-559-661-1965",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "6777 N Willow Ave",
            "addressLocality": "Fresno",
            "addressRegion": "CA",
            "postalCode": "93710",
            "addressCountry": "US",
          },
        },
      ],
    },
    {
      "@type": "Physician",
      "@id": "https://www.kidneyspecialistinc.com/#dr-masood",
      "name": "Dr. Sheikh Mohammad Masood, MD",
      "jobTitle": "Founding President & Medical Director",
      "telephone": "+1-559-661-1965",
      "worksFor": {
        "@id": "https://www.kidneyspecialistinc.com/#clinic",
      },
      "identifier": {
        "@type": "PropertyValue",
        "name": "Individual NPI",
        "value": "1669422812",
      },
      "medicalSpecialty": "Nephrology",
    },
    {
      "@type": "Physician",
      "@id": "https://www.kidneyspecialistinc.com/#dr-siddiqui",
      "name": "Dr. Mohammed Muhibbulla Siddiqui, MD",
      "jobTitle": "Attending Nephrologist",
      "telephone": "+1-559-661-1965",
      "worksFor": {
        "@id": "https://www.kidneyspecialistinc.com/#clinic",
      },
      "identifier": {
        "@type": "PropertyValue",
        "name": "Individual NPI",
        "value": "1184916983",
      },
      "medicalSpecialty": "Nephrology",
    },
  ],
};

export const bigBrosSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://bigbrosdumpster.com/#business",
      "name": "Big Bros Dumpster Rentals",
      "legalName":
        "Jessica Maldonado Ramirez & William A. Maldonado Ramirez DBA Big Bros Dumpster Rentals",
      "url": "https://bigbrosdumpster.com",
      "telephone": "+1-559-495-8034",
      "description":
        "Family-owned roll-off dumpster rental service delivering 14-yard and 20-yard containers across Clovis, Fresno, and the Central Valley. Flat-rate pricing, free mattress/appliance disposal, and guaranteed driveway protection.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Fresno",
        "addressRegion": "CA",
        "postalCode": "93722",
        "addressCountry": "US",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 36.7468,
        "longitude": -119.7726,
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "Clovis",
        },
        {
          "@type": "City",
          "name": "Fresno",
        },
        {
          "@type": "PostalCode",
          "postalCode": "93611",
        },
        {
          "@type": "PostalCode",
          "postalCode": "93612",
        },
        {
          "@type": "PostalCode",
          "postalCode": "93619",
        },
        {
          "@type": "PostalCode",
          "postalCode": "93704",
        },
        {
          "@type": "PostalCode",
          "postalCode": "93720",
        },
      ],
      "knowsLanguage": ["en", "es"],
      "makesOffer": {
        "@id": "https://bigbrosdumpster.com/#service-roll-off",
      },
    },
    {
      "@type": "Service",
      "@id": "https://bigbrosdumpster.com/#service-roll-off",
      "name": "Residential & Commercial Roll-Off Dumpster Rental",
      "provider": {
        "@id": "https://bigbrosdumpster.com/#business",
      },
    },
  ],
};
