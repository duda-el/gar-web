import { CONTACT_EMAIL } from "@/constants/policies";
import { localizePath, SITE_URL, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const SOCIAL_PROFILES = [
  "https://www.facebook.com/profile.php?id=61559932766757",
  "https://www.instagram.com/_gargari/",
  "https://www.tiktok.com/@gargari_",
];

const url = (locale: Locale, path: string) => `${SITE_URL}${localizePath(locale, path)}`;

/** The studio and the website, shown on every page */
export function siteGraph(locale: Locale, t: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": ORG_ID,
        name: "Gargari",
        alternateName: "გარგარი",
        url: SITE_URL,
        logo: `${SITE_URL}/gargari.png`,
        image: `${SITE_URL}/og-image.jpg`,
        description: t.meta.description,
        email: CONTACT_EMAIL,
        address: {
          "@type": "PostalAddress",
          addressLocality: locale === "ka" ? "თბილისი" : "Tbilisi",
          addressCountry: "GE",
        },
        areaServed: { "@type": "Country", name: locale === "ka" ? "საქართველო" : "Georgia" },
        knowsLanguage: ["ka", "en"],
        sameAs: SOCIAL_PROFILES,
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: "Gargari",
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

export function servicesList(locale: Locale, t: Dictionary) {
  const services = [t.services.landing, t.services.webApps, t.services.ecommerce];
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
        url: url(locale, "/services"),
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
