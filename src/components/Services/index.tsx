"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/I18nProvider";
import { servicePath } from "@/constants/serviceSlugs";

function ServiceIcon() {
  return (
    <svg width="26" height="20" viewBox="0 0 34 26" aria-hidden="true">
      <rect x="0" y="10" width="12" height="6" rx="1" fill="#FF7A00" />
      <polygon points="10,2 18,2 30,13 18,24 10,24 22,13" fill="#0E0E0E" />
    </svg>
  );
}

export default function Services() {
  const { t, href } = useI18n();
  const services = [
    { ...t.services.landing, path: servicePath("landing") },
    { ...t.services.webApps, path: servicePath("webApps") },
    { ...t.services.ecommerce, path: servicePath("ecommerce") },
  ];

  return (
    <section
      id="services"
      className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-[56px] sm:py-20 lg:py-[104px]"
    >
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <span className="text-[14px] sm:text-[15px] font-semibold uppercase text-primary">
            {t.homeServices.eyebrow}
          </span>
          <h2 className="mt-3 font-outfit font-extrabold text-[clamp(28px,3.4vw,46px)] leading-[1.08] tracking-[-0.03em] text-[#0E0E0E]">
            {t.homeServices.title}
          </h2>
        </div>
        <p className="m-0 max-w-[38ch] text-[16px] leading-[1.6] text-[#4A4744]">
          {t.homeServices.intro}
        </p>
      </div>

      <div
        className="mt-10 grid gap-5"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}
      >
        {services.map((service) => (
          <div
            key={service.title}
            className="relative flex flex-col gap-3.5 rounded-xl border border-[#EDEAE6] bg-white p-7 transition-[border-color,translate,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#FF7A00]/40 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(14,14,14,0.25)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <ServiceIcon />
            <h3 className="mt-1.5 font-outfit font-bold text-[21px] text-[#0E0E0E]">
              {/* The link covers the whole card (after:inset-0) */}
              <Link href={href(service.path)} className="after:absolute after:inset-0 after:rounded-xl">
                {service.title}
              </Link>
            </h3>
            <p className="m-0 text-[15.5px] leading-[1.6] text-[#4A4744]">
              {service.description}
            </p>
            {/* Price and link stay on one line; on very narrow cards the link wraps below as a whole */}
            <div className="mt-auto pt-3.5 border-t border-[#F1EEEA] flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 font-outfit font-bold text-[16px] text-[#0E0E0E]">
              <span className="whitespace-nowrap">{service.price}</span>
              <span className="whitespace-nowrap text-[13.5px] font-semibold text-primary">
                {t.homeServices.more} →
              </span>
            </div>
          </div>
        ))}
      </div>

      <div
        className="mt-5 grid items-center gap-[22px] rounded-xl border border-[#EDEAE6] bg-[#F7F6F4] p-7"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}
      >
        <div>
          <h3 className="m-0 font-outfit font-bold text-[21px] text-[#0E0E0E]">
            <Link href={href(servicePath("branding"))} className="hover:text-primary transition-colors">
              {t.services.brandingTitle} →
            </Link>
          </h3>
          <p className="mt-2.5 max-w-[46ch] text-[15.5px] leading-[1.6] text-[#4A4744]">
            {t.services.brandingText}
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {t.services.brandingTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#E3DFDA] bg-white px-3.5 py-2 text-[13.5px] text-[#0E0E0E]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
