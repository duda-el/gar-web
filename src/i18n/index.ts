import en from "./dictionaries/en";
import ka from "./dictionaries/ka";
import type { Dictionary } from "./dictionaries/en";
import { defaultLocale, isLocale, type Locale } from "./config";

// Server-side only: client components get their dictionary through I18nProvider
const dictionaries: Record<Locale, Dictionary> = { ka, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Resolves a route param to a supported locale, falling back to Georgian */
export function resolveLocale(value: string): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export { format } from "./format";
export type { Dictionary };
