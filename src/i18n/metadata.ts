import type { Metadata } from "next";
import { brandNames, locales, ogLocales, pageAlternates, type Locale } from "./config";

/** Social preview shared by every page: the Gar Gari logo on a dark background */
export const OG_IMAGE = { url: "/og-image.png", width: 1200, height: 630, alt: "Gargari" };

/**
 * Full metadata for an inner page. Next.js replaces (not merges) the layout's openGraph and
 * twitter objects, so each page sets them completely: its own URL, title and locale.
 * Every page shares the same logo image (OG_IMAGE).
 */
export function pageMetadata(
  locale: Locale,
  path: string,
  page: {
    title: string;
    description: string;
  },
): Metadata {
  const alternates = pageAlternates(locale, path);
  const socialTitle = `${page.title} | ${brandNames[locale]}`;

  return {
    title: page.title,
    description: page.description,
    alternates,
    openGraph: {
      title: socialTitle,
      description: page.description,
      url: alternates.canonical,
      siteName: brandNames[locale],
      locale: ogLocales[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocales[l]),
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: page.description,
      images: [OG_IMAGE.url],
    },
  };
}
