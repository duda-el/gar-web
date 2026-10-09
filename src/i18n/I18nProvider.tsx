"use client";

import { createContext, useContext, useMemo } from "react";
import { localizePath, type Locale } from "./config";
import type { Dictionary } from "./dictionaries/en";

interface I18nValue {
  locale: Locale;
  t: Dictionary;
  /** Turns a site path into the current language's URL: href("/contact") */
  href: (path: string) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

// The server layout passes in only the active language's dictionary,
// so the other language never ships to the browser.
export function I18nProvider({
  locale,
  dictionary,
  children,
}: {
  locale: Locale;
  dictionary: Dictionary;
  children: React.ReactNode;
}) {
  const value = useMemo<I18nValue>(
    () => ({
      locale,
      t: dictionary,
      href: (path: string) => localizePath(locale, path),
    }),
    [locale, dictionary],
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used inside I18nProvider");
  return value;
}
