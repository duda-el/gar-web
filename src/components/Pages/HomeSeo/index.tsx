import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import FaqList from "@/components/seo/FaqList";
import { servicePages } from "@/constants/servicePages";
import { localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";

// Server-rendered text about website development (the home page's main search topic),
// links to each service page and the most common questions. FAQPage JSON-LD is in page.tsx.
export default function HomeSeo({ locale, t }: { locale: Locale; t: Dictionary }) {
  const s = t.homeSeo;

  return (
    <>
      <section
        id="website-development"
        className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-[56px] sm:py-20 lg:py-[104px] border-t border-[#EDEAE6]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16">
          <div>
            <span className="text-[14px] sm:text-[15px] font-semibold uppercase text-primary">{s.eyebrow}</span>
            <h2 className="mt-3 max-w-[18ch] font-outfit font-extrabold text-[clamp(28px,3.4vw,46px)] leading-[1.08] tracking-[-0.03em] text-[#0E0E0E]">
              {s.title}
            </h2>
            {s.paragraphs.map((p) => (
              <p key={p.slice(0, 40)} className="mt-5 max-w-[60ch] text-[16px] leading-[1.7] text-[#4A4744]">
                {p}
              </p>
            ))}
          </div>

          <div>
            <h3 className="font-outfit font-bold text-[19px] text-[#0E0E0E]">{s.linksTitle}</h3>
            <ul className="mt-5 flex flex-col gap-3">
              {servicePages.map((page) => {
                const c = page.content[locale];
                return (
                  <li key={page.slug}>
                    <Link
                      href={localizePath(locale, `/services/${page.slug}`)}
                      className="group flex items-start justify-between gap-4 rounded-xl border border-[#EDEAE6] p-5 hover:border-primary/50 transition-colors"
                    >
                      <span>
                        <span className="block font-outfit font-bold text-[17px] text-[#0E0E0E]">{c.name}</span>
                        <span className="mt-1 block text-[14.5px] leading-[1.55] text-[#4A4744]">{c.summary}</span>
                        <span className="mt-2 block font-outfit font-semibold text-[14px] text-[#0E0E0E]">{c.price}</span>
                      </span>
                      <ArrowUpRight
                        size={18}
                        aria-hidden="true"
                        className="mt-1 shrink-0 text-[#0E0E0E] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pb-[56px] sm:pb-20 lg:pb-[104px]">
        <FaqList eyebrow={s.faqEyebrow} title={s.faqTitle} intro={s.faqIntro} faqs={s.faqs} />
      </section>
    </>
  );
}
