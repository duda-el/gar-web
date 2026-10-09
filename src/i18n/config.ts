export const locales = ["ka", "en"] as const;
export type Locale = (typeof locales)[number];

/** Georgian is served at the domain root, other locales under their own prefix (/en/...) */
export const defaultLocale: Locale = "ka";

export const SITE_URL = "https://www.gargari.ge";

export const localeNames: Record<Locale, string> = {
  ka: "ქართული",
  en: "English",
};

export const ogLocales: Record<Locale, string> = {
  ka: "ka_GE",
  en: "en_US",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** "/services" -> "/services" for Georgian, "/en/services" for English */
export function localizePath(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) return clean;
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}

/**
 * "/en/services" -> "/services". Also strips "/ka": during server rendering usePathname()
 * returns the internal rewritten path ("/ka/services"), not the URL in the address bar.
 */
export function stripLocale(pathname: string): string {
  for (const locale of locales) {
    if (pathname === `/${locale}`) return "/";
    if (pathname.startsWith(`/${locale}/`)) return pathname.slice(locale.length + 1);
  }
  return pathname;
}

/** Canonical URL plus hreflang links for every language version of a page */
export function pageAlternates(locale: Locale, path: string) {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `${SITE_URL}${localizePath(l, path)}`;
  languages["x-default"] = `${SITE_URL}${localizePath(defaultLocale, path)}`;
  return { canonical: `${SITE_URL}${localizePath(locale, path)}`, languages };
}
