"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, MotionConfig } from "framer-motion";
import { Globe, LayoutDashboard, ShoppingBag, ArrowUpRight } from "lucide-react";
import { DashboardMockup, LandingMockup, ShopMockup } from "./ServiceMockups";
import { useI18n } from "@/i18n/I18nProvider";
import type { Dictionary } from "@/i18n/dictionaries/en";

// Visuals per service; the texts come from the dictionary (t.services)
const serviceVisuals = [
  { key: "landing", number: "01", icon: Globe, Mockup: LandingMockup },
  { key: "webApps", number: "02", icon: LayoutDashboard, Mockup: DashboardMockup },
  { key: "ecommerce", number: "03", icon: ShoppingBag, Mockup: ShopMockup },
] as const;

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const cardMotion = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.1, ease: EASE_OUT },
  }),
};

type Service = (typeof serviceVisuals)[number] & Dictionary["services"]["landing"];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const featured = service.number === "02";

  return (
    <motion.div
      custom={index}
      variants={cardMotion}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      className="h-full"
    >
      <div
        className={`group relative h-full flex flex-col rounded-2xl overflow-hidden border transition-[translate,border-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 ${
          featured
            ? "border-[#0E0E0E] bg-[#0E0E0E] text-white"
            : "border-[#EDEAE6] bg-white text-[#0E0E0E] hover:border-[#FF7A00]/40"
        }`}
      >
        {/* Soft glow, faded in with opacity instead of animating box-shadow */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-700 group-hover:opacity-100 ${
            featured
              ? "shadow-[0_28px_60px_-24px_rgba(14,14,14,0.55)]"
              : "shadow-[0_28px_60px_-28px_rgba(255,122,0,0.5)]"
          }`}
        />

        <div
          aria-hidden="true"
          className={`relative w-full aspect-[16/10] overflow-hidden ${
            featured
              ? "bg-[radial-gradient(120%_90%_at_50%_0%,#3A2A1C_0%,#0E0E0E_70%)]"
              : "bg-[#F7F6F4]"
          }`}
        >
          {featured ? (
            <div className="absolute inset-0 transition-[translate] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[4%]">
              <service.Mockup />
            </div>
          ) : (
            <>
              <div
                className="absolute inset-0 flex items-center justify-center transition-[opacity,scale] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-0 group-hover:scale-90"
                style={{
                  backgroundImage: "radial-gradient(#E3DFDA 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-[#FF7A00] bg-white text-[#FF7A00]">
                  <service.icon size={24} />
                </div>
              </div>
              {/* Illustration drops down from the top on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#FFE9D4] to-[#F7F6F4] [clip-path:inset(0_0_100%_0)] transition-[clip-path] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:[clip-path:inset(0_0_0_0)]">
                <div className="absolute inset-0 -translate-y-[10%] transition-[translate] duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0">
                  <service.Mockup />
                </div>
              </div>
            </>
          )}
        </div>

        <div className="relative flex-1 flex flex-col p-6 sm:p-7">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF7A00] transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-8" />
          <h3 className="mt-4 font-outfit font-bold text-[20px] tracking-[-0.01em]">
            {service.title}
          </h3>
          <p
            className={`mt-2.5 text-[14px] leading-[1.6] ${
              featured ? "text-white/65" : "text-[#4A4744]"
            }`}
          >
            {service.description}
          </p>
          <div className="mt-auto pt-6 flex items-center justify-between gap-3">
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-[12.5px] font-outfit font-semibold transition-colors duration-500 group-hover:border-[#FF7A00] group-hover:bg-[#FF7A00] group-hover:text-[#0E0E0E] ${
                featured
                  ? "border-white/15 text-white"
                  : "border-[#E3DFDA] bg-[#F7F6F4] text-[#0E0E0E]"
              }`}
            >
              {service.price}
            </span>
            <span
              className={`font-outfit font-bold text-[13px] transition-colors duration-500 group-hover:text-[#FF7A00] ${
                featured ? "text-white/40" : "text-[#B7B4AF]"
              }`}
            >
              {service.number}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function AllServices() {
  const { t, href } = useI18n();
  const services: Service[] = serviceVisuals.map((visual) => ({
    ...visual,
    ...t.services[visual.key],
  }));
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-8 sm:pt-12 lg:pt-14 pb-[56px] sm:pb-20 lg:pb-[104px]">
        <div className="rounded-[2rem] border border-[#E3E3E6] bg-[#F7F6F4] p-6 sm:p-8 lg:p-10">
          <div>
            <div>
              <span className="inline-flex items-center rounded-full border border-[#E3DFDA] bg-white px-3.5 py-1.5 text-[12px] font-semibold text-[#0E0E0E]">
                {t.allServices.badge}
              </span>
              <h1 className="mt-4 font-outfit font-extrabold text-[clamp(30px,4.4vw,60px)] leading-[1.05] tracking-[-0.03em] text-[#0E0E0E] text-balance">
                {t.allServices.title}
              </h1>
            </div>
            <p className="mt-4 max-w-[52ch] text-[15.5px] leading-[1.6] text-[#4A4744]">
              {t.allServices.intro}
            </p>
          </div>

          <MotionConfig reducedMotion="user">
            <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
              {services.map((service, i) => (
                <ServiceCard key={service.title} service={service} index={i} />
              ))}
            </div>
          </MotionConfig>

          <div className="mt-8 sm:mt-10 flex justify-center">
            <Link
              href={href("/contact")}
              className="group relative inline-flex items-center gap-3 h-[52px] rounded-full ps-6 pe-1.5 bg-white border border-[#E3DFDA] font-outfit font-semibold text-[14.5px] text-[#0E0E0E] overflow-hidden isolate transition-[border-color,box-shadow,scale] duration-500 hover:border-[#FF7A00] hover:shadow-[0_14px_34px_-12px_rgba(255,122,0,0.6)] active:scale-[0.98]"
            >
              {/* Orange fill grows out of the arrow circle */}
              <span
                aria-hidden="true"
                className="absolute right-1.5 top-1/2 -z-10 w-10 h-10 -translate-y-1/2 rounded-full bg-[#FF7A00] scale-0 transition-[scale] duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[14]"
              />
              <span className="relative whitespace-nowrap">
                <span className="sm:hidden">{t.allServices.ctaShort}</span>
                <span className="hidden sm:inline">
                  {t.allServices.ctaFull}
                </span>
              </span>
              <span className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#0E0E0E] text-white overflow-hidden shrink-0 transition-colors duration-500 group-hover:bg-white group-hover:text-[#0E0E0E]">
                <ArrowUpRight
                  size={16}
                  className="absolute transition-[translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-6 group-hover:-translate-y-6"
                />
                <ArrowUpRight
                  size={16}
                  className="absolute -translate-x-6 translate-y-6 transition-[translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:translate-y-0"
                />
              </span>
            </Link>
          </div>
        </div>

        <div
          className="mt-5 grid items-center gap-[22px] rounded-xl border border-[#EDEAE6] p-7"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}
        >
          <div>
            <h3 className="m-0 font-outfit font-bold text-[21px] text-[#0E0E0E]">
              {t.services.brandingTitle}
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

      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pb-[56px] sm:pb-20 lg:pb-[104px]">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-16">
          <div>
            <span className="text-[12.5px] font-semibold tracking-[0.14em] uppercase text-[#FF7A00]">
              {t.allServices.faqEyebrow}
            </span>
            <h2 className="mt-3 max-w-[18ch] font-outfit font-extrabold text-[clamp(24px,2.8vw,36px)] leading-[1.1] tracking-[-0.03em] text-[#0E0E0E]">
              {t.allServices.faqTitle}
            </h2>
            <p className="mt-4 max-w-[42ch] text-[15px] leading-[1.6] text-[#4A4A4E]">
              {t.allServices.faqIntro}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {t.allServices.faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={faq.question}
                  className="rounded-xl border border-[#EDEAE6] bg-white overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
                  >
                    <span className="font-outfit font-bold text-[15.5px] text-[#0E0E0E]">
                      {faq.question}
                    </span>
                    <svg
                      className={`w-4 h-4 text-[#FF7A00] shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-4 text-[14.5px] leading-[1.6] text-[#4A4A4E]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
