import type { Metadata } from "next";
import { locales, ogLocales, pageAlternates, type Locale } from "./config";

/**
 * Full metadata for an inner page. Next.js replaces (not merges) the layout's openGraph and
 * twitter objects, so each page sets them completely: its own URL, title and locale.
 * The image comes from the page's opengraph-image route.
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
  const socialTitle = `${page.title} | Gargari`;

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
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: page.description,
    },
  };
}
