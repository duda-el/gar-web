import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import FaqList from "@/components/seo/FaqList";
import { getProjectBySlug } from "@/constants/projects";
import { servicePages, type ServicePage } from "@/constants/servicePages";
import { localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";

// Server component: the whole page is plain HTML, so search engines read every word
// without running JavaScript. Only the FAQ accordion is interactive.
export default function ServiceDetail({
  page,
  locale,
  t,
}: {
  page: ServicePage;
  locale: Locale;
  t: Dictionary;
}) {
  const c = page.content[locale];
  const ui = t.serviceDetail;
  const href = (path: string) => localizePath(locale, path);
  const examples = page.projects.map(getProjectBySlug).filter((p) => p !== undefined);
  const others = servicePages.filter((p) => p.slug !== page.slug);

  const facts = [
    { label: ui.price, value: c.price },
    { label: ui.timeline, value: c.timeline },
    { label: ui.support, value: ui.supportValue },
  ];

  return (
    <>
      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-8 sm:pt-12 lg:pt-14">
        <nav aria-label={ui.breadcrumbLabel} className="text-[13.5px] text-[#6E6E73]">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href={href("/")} className="hover:text-[#0E0E0E] transition-colors">
                {t.nav.home}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={href("/services")} className="hover:text-[#0E0E0E] transition-colors">
                {t.nav.services}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-[#0E0E0E]">
              {c.name}
            </li>
          </ol>
        </nav>

        <div className="mt-6 rounded-[2rem] border border-[#E3E3E6] bg-[#F7F6F4] p-6 sm:p-10 lg:p-14">
          <span className="text-[14px] sm:text-[15px] font-semibold uppercase text-primary">{c.eyebrow}</span>
          <h1 className="mt-3 max-w-[20ch] font-outfit font-extrabold text-[clamp(30px,4.6vw,62px)] leading-[1.05] tracking-[-0.03em] text-[#0E0E0E] text-balance">
            {c.title}
          </h1>
          <p className="mt-5 max-w-[62ch] text-[16px] sm:text-[17px] leading-[1.65] text-[#4A4744]">{c.intro}</p>

          <dl className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-px rounded-2xl overflow-hidden border border-[#E3E3E6] bg-[#E3E3E6]">
            {facts.map((fact) => (
              <div key={fact.label} className="bg-white px-5 py-4">
                <dt className="text-[12.5px] uppercase text-[#6E6E73]">{fact.label}</dt>
                <dd className="mt-1 font-outfit font-bold text-[19px] text-[#0E0E0E]">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <Link
            href={href("/contact")}
            className="mt-8 group inline-flex items-center gap-3 rounded-full pl-6 pr-1.5 py-1.5 bg-primary hover:bg-white font-outfit font-bold text-[#0E0E0E] text-[15.5px] whitespace-nowrap transition-colors duration-200 shadow-[0_0_30px_rgba(241,144,53,0.3)]"
          >
            {ui.cta}
            <span className="inline-flex items-center justify-center w-[30px] h-[30px] rounded-full bg-[#0E0E0E] text-white shrink-0">
              <ArrowUpRight size={15} />
            </span>
          </Link>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-[56px] sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
          {c.sections.map((section) => (
            <article key={section.heading}>
              <h2 className="font-outfit font-extrabold text-[clamp(22px,2.4vw,30px)] leading-[1.15] tracking-[-0.02em] text-[#0E0E0E]">
                {section.heading}
              </h2>
              {section.paragraphs?.map((p) => (
                <p key={p.slice(0, 40)} className="mt-4 text-[15.5px] leading-[1.7] text-[#4A4744]">
                  {p}
                </p>
              ))}
              {section.bullets && (
                <ul className="mt-4 flex flex-col gap-2.5">
                  {section.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-[15.5px] leading-[1.6] text-[#0E0E0E]">
                      <span aria-hidden="true" className="mt-[9px] w-2.5 h-[2px] rounded-full bg-primary shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </section>

      {examples.length > 0 && (
        <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pb-[56px] sm:pb-20">
          <h2 className="font-outfit font-extrabold text-[clamp(24px,2.8vw,36px)] leading-[1.1] tracking-[-0.03em] text-[#0E0E0E]">
            {ui.examples}
          </h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {examples.map((project) => {
              const pc = project.content[locale];
              return (
                <Link
                  key={project.slug}
                  href={href(`/projects/${project.slug}`)}
                  className="group block rounded-2xl border border-[#EDEAE6] overflow-hidden hover:border-primary/50 transition-colors"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#F2F2F5]">
                    <Image
                      src={project.images[0]}
                      alt={pc.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-[scale] duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-3 px-5 py-4">
                    <div>
                      <h3 className="font-outfit font-bold text-[17px] text-[#0E0E0E]">{project.title}</h3>
                      <p className="mt-0.5 text-[13.5px] text-[#6E6E73]">{pc.category}</p>
                    </div>
                    <ArrowUpRight size={18} className="text-[#0E0E0E] shrink-0" aria-hidden="true" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pb-[56px] sm:pb-20">
        <FaqList eyebrow={ui.faqEyebrow} title={ui.faqTitle} faqs={c.faqs} />
      </section>

      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pb-[56px] sm:pb-20 lg:pb-[104px]">
        <h2 className="font-outfit font-extrabold text-[clamp(22px,2.4vw,30px)] tracking-[-0.02em] text-[#0E0E0E]">
          {ui.otherServices}
        </h2>
        <ul className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {others.map((other) => {
            const oc = other.content[locale];
            return (
              <li key={other.slug}>
                <Link
                  href={href(`/services/${other.slug}`)}
                  className="group flex h-full flex-col gap-2 rounded-xl border border-[#EDEAE6] p-6 hover:border-primary/50 transition-colors"
                >
                  <span className="flex items-center justify-between gap-3 font-outfit font-bold text-[18px] text-[#0E0E0E]">
                    {oc.name}
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </span>
                  <span className="text-[14.5px] leading-[1.55] text-[#4A4744]">{oc.summary}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
