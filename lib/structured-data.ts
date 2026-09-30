import { faq, included, site } from "./content";

/** schema.org graph for search engines and AI answer engines. Mirrors visible page content only. */
export function structuredData() {
  const org = `${site.url}/#organization`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": org,
        name: site.name,
        url: site.url,
        logo: `${site.url}/brand/logo-wordmark.png`,
        email: site.email,
        telephone: "+1-505-528-6289",
        description: site.description,
        slogan: site.promise,
        areaServed: { "@type": "Country", name: "United States" },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: site.email,
          telephone: "+1-505-528-6289",
          areaServed: "US",
          availableLanguage: "English",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        publisher: { "@id": org },
        inLanguage: "en-US",
      },
      {
        "@type": "Service",
        "@id": `${site.url}/#service`,
        name: "Scaalus Growth System",
        serviceType:
          "Done-for-you lead response, follow-up and job booking for home service businesses",
        description:
          "A done-for-you growth system for US local home service businesses with high-ticket jobs. Scaalus captures every lead, replies in seconds, follows up automatically and books the job on the calendar.",
        provider: { "@id": org },
        areaServed: { "@type": "Country", name: "United States" },
        audience: {
          "@type": "BusinessAudience",
          audienceType:
            "Local home service businesses: roofing, HVAC, plumbing, landscaping, remodeling and electrical contractors",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Included in the Scaalus Growth System",
          itemListElement: included.groups
            .flatMap((group) => group.items)
            .map((item) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: item },
            })),
        },
        offers: {
          "@type": "Offer",
          price: "297",
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "297",
            priceCurrency: "USD",
            unitText: "MONTH",
            billingDuration: "P1M",
          },
          eligibleRegion: { "@type": "Country", name: "United States" },
          description:
            "7-day free trial on your real leads. No contract, cancel anytime. Satisfaction guarantee.",
          url: `${site.url}/#trial`,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${site.url}/#faq`,
        mainEntity: faq.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };
}

/** Safe to inline in a <script> tag. */
export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
