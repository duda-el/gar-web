import type { Metadata } from "next";
import { locales, ogLocales, pageAlternates, type Locale } from "./config";

const DEFAULT_IMAGE = { url: "/og-image.jpg", width: 1200, height: 630, alt: "Gargari" };

/**
 * Full metadata for an inner page. Next.js replaces (not merges) the layout's openGraph and
 * twitter objects, so each page sets them completely: its own URL, title, locale and image.
 */
export function pageMetadata(
  locale: Locale,
  path: string,
  page: {
    title: string;
    description: string;
    image?: { url: string; alt: string };
  },
): Metadata {
  const alternates = pageAlternates(locale, path);
  const socialTitle = `${page.title} | Gargari`;
  const image = page.image ?? DEFAULT_IMAGE;

  return {
    title: page.title,
    description: page.description,
    alternates,
    openGraph: {
      title: socialTitle,
      description: page.description,
      url: alternates.canonical,
      siteName: "Gargari",
      locale: ogLocales[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocales[l]),
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: page.description,
      images: [image.url],
    },
  };
}
