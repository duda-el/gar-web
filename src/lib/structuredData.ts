import { CONTACT_EMAIL } from "@/constants/policies";
import {
  FOUNDING_YEAR,
  PHONE_TEL,
  POSTAL_CODE,
  SOCIAL_PROFILES,
  STARTING_PRICE_GEL,
  TEAM_SIZE,
  TECHNOLOGIES,
} from "@/constants/site";
import { localizePath, SITE_URL, type Locale } from "@/i18n/config";
import { servicePath } from "@/constants/serviceSlugs";
import type { ServicePage } from "@/constants/servicePages";
import type { Dictionary } from "@/i18n/dictionaries/en";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const url = (locale: Locale, path: string) => `${SITE_URL}${localizePath(locale, path)}`;

/** Services with prices, so search and AI answers can quote what Gargari offers */
function offerCatalog(locale: Locale, t: Dictionary) {
  const area = { "@type": "Country", name: locale === "ka" ? "საქართველო" : "Georgia" };
  const service = (s: Dictionary["services"]["landing"], path: string) => ({
    "@type": "Service",
    name: s.title,
    description: s.description,
    areaServed: area,
    url: url(locale, path),
  });
  return {
    "@type": "OfferCatalog",
    name: t.nav.services,
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: service(t.services.landing, servicePath("landing")),
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: STARTING_PRICE_GEL,
          priceCurrency: "GEL",
        },
      },
      { "@type": "Offer", itemOffered: service(t.services.webApps, servicePath("webApps")) },
      { "@type": "Offer", itemOffered: service(t.services.ecommerce, servicePath("ecommerce")) },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: t.services.brandingTitle,
          description: t.services.brandingText,
          areaServed: area,
          url: url(locale, servicePath("branding")),
        },
      },
    ],
  };
}

/** The studio and the website, shown on every page */
export function siteGraph(locale: Locale, t: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": ORG_ID,
        name: "Gargari",
        alternateName: ["გარგარი", "GarGari", "Gargari Agency", "გარგარი ვებ სააგენტო"],
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        image: `${SITE_URL}/logo.png`,
        description: t.meta.description,
        email: CONTACT_EMAIL,
        telephone: PHONE_TEL,
        foundingDate: String(FOUNDING_YEAR),
        numberOfEmployees: { "@type": "QuantitativeValue", value: TEAM_SIZE },
        address: {
          "@type": "PostalAddress",
          addressLocality: locale === "ka" ? "თბილისი" : "Tbilisi",
          postalCode: POSTAL_CODE,
          addressCountry: "GE",
        },
        areaServed: { "@type": "Country", name: locale === "ka" ? "საქართველო" : "Georgia" },
        knowsLanguage: ["ka", "en"],
        priceRange: t.services.landing.price,
        slogan: `${t.hero.titleLine1} ${t.hero.titleLine2}`,
        knowsAbout: [
          t.services.landing.title,
          t.services.webApps.title,
          t.services.ecommerce.title,
          t.services.brandingTitle,
          ...t.services.brandingTags,
          ...TECHNOLOGIES,
          "SEO",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: CONTACT_EMAIL,
          telephone: PHONE_TEL,
          url: url(locale, "/contact"),
          availableLanguage: ["Georgian", "English"],
          areaServed: "GE",
        },
        hasOfferCatalog: offerCatalog(locale, t),
        sameAs: SOCIAL_PROFILES,
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        // Google shows this as the site name in results; alternateName covers the Georgian spelling
        name: "Gargari",
        alternateName: ["გარგარი", "GarGari", "gargari.ge"],
        url: SITE_URL,
        inLanguage: locale,
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

/** Home > ... > current page */
export function breadcrumbs(locale: Locale, t: Dictionary, trail: { name: string; path: string }[]) {
  const items = [{ name: t.nav.home, path: "/" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: url(locale, item.path),
    })),
  };
}

export function faqPage(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** A service page: the service, its price and who provides it */
export function serviceDetail(locale: Locale, page: ServicePage) {
  const c = page.content[locale];
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: c.title,
    serviceType: page.serviceType,
    description: c.metaDescription,
    url: url(locale, `/services/${page.slug}`),
    inLanguage: locale,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: locale === "ka" ? "საქართველო" : "Georgia" },
    ...(page.minPrice
      ? {
          offers: {
            "@type": "Offer",
            url: url(locale, `/services/${page.slug}`),
            priceCurrency: "GEL",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: page.minPrice,
              priceCurrency: "GEL",
            },
          },
        }
      : {}),
  };
}

export function servicesList(locale: Locale, t: Dictionary) {
  const services = [
    { ...t.services.landing, path: servicePath("landing") },
    { ...t.services.webApps, path: servicePath("webApps") },
    { ...t.services.ecommerce, path: servicePath("ecommerce") },
  ];
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        provider: { "@id": ORG_ID },
        areaServed: { "@type": "Country", name: locale === "ka" ? "საქართველო" : "Georgia" },
        url: url(locale, service.path),
      },
    })),
  };
}

export function projectWork(
  locale: Locale,
  project: { slug: string; title: string; url?: string; image: string },
  content: { description: string; category: string },
) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: content.description,
    genre: content.category,
    image: `${SITE_URL}${project.image}`,
    url: url(locale, `/projects/${project.slug}`),
    inLanguage: locale,
    creator: { "@id": ORG_ID },
    ...(project.url ? { sameAs: project.url } : {}),
  };
}
