import { SITE_CONFIG, FAQS, type PressArticle } from "@/lib/constants";

export function JsonLdOrganization() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LegalService", "FinancialService"],
    name: "Hakamana - Fondo de Litigación",
    alternateName: "Hakamana",
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/images/hakamana-fondo-de-litigacion-01.png`,
    description: SITE_CONFIG.tagline,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.region,
      addressCountry: "CL",
    },
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    areaServed: [
      { "@type": "Country", name: "Chile" },
      { "@type": "Place", name: "Latin America" },
    ],
    serviceType: [
      "Litigation Funding",
      "Third Party Funding",
      "Arbitration Financing",
      "Legal Dispute Financing",
    ],
    foundingDate: "2019",
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function JsonLdLocalBusiness() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Hakamana - Fondo de Litigación",
    image: `${SITE_CONFIG.url}/images/hakamana-fondo-de-litigacion-01.png`,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.region,
      postalCode: "",
      addressCountry: "CL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -33.35,
      longitude: -70.5,
    },
    url: SITE_CONFIG.url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function JsonLdFAQ() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function JsonLdBreadcrumb({ items }: { items: { name: string; href: string }[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function JsonLdNewsArticle({ article, locale }: { article: PressArticle; locale: string }) {
  const isEn = locale === "en";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: isEn ? article.titleEn : article.title,
    description: isEn ? article.excerptEn : article.excerpt,
    image: `${SITE_CONFIG.url}${article.image}`,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Organization",
      name: article.source,
    },
    publisher: {
      "@type": "Organization",
      name: "Hakamana - Fondo de Litigación",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/images/hakamana-fondo-de-litigacion-01.png`,
      },
    },
    mainEntityOfPage: article.externalUrl || `${SITE_CONFIG.url}/prensa`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function JsonLdSpeakable({ name, url, cssSelectors }: { name: string; url: string; cssSelectors: string[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    url,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: cssSelectors,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
