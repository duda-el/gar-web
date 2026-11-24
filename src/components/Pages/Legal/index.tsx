import Link from "next/link";
import { Mail } from "lucide-react";
import { CONTACT_EMAIL, type PolicyType } from "@/constants/policies";
import { format } from "@/i18n/format";
import { localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import type { Policy } from "@/i18n/policies/types";

// Server-rendered legal page (privacy, cookies, terms), so the text is plain HTML at its own URL
export default function Legal({
  locale,
  t,
  policy,
  type,
}: {
  locale: Locale;
  t: Dictionary;
  policy: Policy;
  type: PolicyType;
}) {
  const fill = (text: string) => format(text, { email: CONTACT_EMAIL });
  const related = (["privacy", "cookies", "terms"] as const).filter((p) => p !== type);

  return (
    <section className="max-w-[780px] mx-auto px-5 sm:px-9 pt-32 sm:pt-40 pb-20">
      <span className="text-[12.5px] font-semibold uppercase text-primary">{t.policyModal.legal}</span>
      <h1 className="mt-1 font-outfit font-extrabold text-[clamp(28px,4vw,42px)] leading-[1.1] tracking-[-0.03em] text-[#0E0E0E]">
        {policy.title}
      </h1>
      <p className="mt-2 text-[13px] text-[#5A5A5F]">{format(t.policyModal.lastUpdated, { date: policy.updated })}</p>
      <p className="mt-6 text-[16px] leading-[1.7] text-[#0E0E0E]">{policy.intro}</p>

      <ol className="mt-9 space-y-7">
        {policy.sections.map((section, i) => (
          <li key={section.heading} className="grid grid-cols-[auto_1fr] gap-x-4">
            <span className="pt-[3px] font-outfit font-bold text-[13px] tabular-nums text-[#B85300]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h2 className="font-outfit font-bold text-[18px] tracking-[-0.01em] text-[#0E0E0E]">
                {section.heading}
              </h2>
              {section.paragraphs?.map((p) => (
                <p key={p} className="mt-2 text-[15px] leading-[1.7] text-[#4A4A4E]">
                  {fill(p)}
                </p>
              ))}
              {section.list && (
                <ul className="mt-2.5 space-y-2">
                  {section.list.map((item) => (
                    <li key={item} className="flex gap-3 text-[15px] leading-[1.6] text-[#4A4A4E]">
                      <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-[#FF7A00] shrink-0" />
                      {fill(item)}
                    </li>
                  ))}
                </ul>
              )}
              {section.note && (
                <p className="mt-2.5 text-[15px] leading-[1.7] font-medium text-[#0E0E0E]">{fill(section.note)}</p>
              )}
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-12 pt-6 border-t border-[#F1EEEA] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="inline-flex items-center gap-2 text-[14px] text-[#5A5A5F] hover:text-[#0E0E0E] transition-colors"
        >
          <Mail size={15} className="text-[#FF7A00]" />
          {t.policyModal.questions} {CONTACT_EMAIL}
        </a>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {related.map((p) => (
            <Link
              key={p}
              href={localizePath(locale, `/${p}`)}
              className="text-[14px] text-[#B85300] underline underline-offset-2 hover:text-[#0E0E0E]"
            >
              {t.footer[p]}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
