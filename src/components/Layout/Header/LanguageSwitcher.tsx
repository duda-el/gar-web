"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/i18n/I18nProvider";
import { localeNames, locales, localizePath, stripLocale } from "@/i18n/config";

const shortNames = { ka: "ქარ", en: "EN" } as const;

// Links to the same page in the other language
export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, t } = useI18n();
  const path = stripLocale(usePathname());

  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className={`inline-flex items-center gap-0.5 rounded-full p-1 bg-white/55 backdrop-blur-xl border border-white/70 shadow-[0_1px_3px_rgba(14,14,14,0.06),0_0_0_0.5px_rgba(14,14,14,0.05)] ${className}`}
    >
      {locales.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={localizePath(l, path)}
            hrefLang={l}
            lang={l}
            aria-label={localeNames[l]}
            aria-current={active ? "true" : undefined}
            scroll={false}
            className={`inline-flex items-center justify-center min-w-[38px] h-8 px-2.5 rounded-full font-outfit text-[12.5px] transition-[color,background-color,box-shadow] duration-300 ${
              active
                ? "font-bold text-[#0E0E0E] bg-[linear-gradient(180deg,rgba(120,120,128,0.20)_0%,rgba(120,120,128,0.10)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-1px_0_rgba(14,14,14,0.06),0_0_0_0.5px_rgba(14,14,14,0.10)]"
                : "font-medium text-[#6E6E73] hover:text-[#0E0E0E] hover:bg-white/80"
            }`}
          >
            {shortNames[l]}
          </Link>
        );
      })}
    </div>
  );
}
