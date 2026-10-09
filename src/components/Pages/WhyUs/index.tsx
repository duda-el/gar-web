"use client";

import { useI18n } from "@/i18n/I18nProvider";

export default function WhyUs() {
  const { t } = useI18n();

  return (
    <section
      id="why"
      className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-[56px] sm:py-20 lg:py-[104px]"
      style={{
        background:
          "linear-gradient(180deg, #fbfbfb 0% 0%, #fefefe 55%, #ffffff 100%)",
      }}
    >
      <div className="flex flex-wrap items-end justify-between gap-5 mb-14 sm:mb-16 lg:mb-20">
        <div>
          <span className="text-[12.5px] font-semibold tracking-[0.14em] uppercase text-[#FF7A00]">
            {t.whyUs.eyebrow}
          </span>
          <h2 className="mt-3 max-w-[16ch] font-outfit font-extrabold text-[clamp(28px,3.4vw,46px)] leading-[1.08] tracking-[-0.03em] text-[#0E0E0E]">
            {t.whyUs.title}
          </h2>
        </div>
        <p className="m-0 max-w-[36ch] text-[16px] leading-[1.6] text-[#4A4A4E]">
          {t.whyUs.intro}
        </p>
      </div>

      <div className="relative">
        <div className="hidden lg:block absolute top-5 left-0 right-0 h-px bg-[#E3E3E6]" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {t.steps.map((step, i) => (
            <div key={step.title} className="flex flex-col gap-4">
              <div className="relative z-[1] inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#FF7A00] bg-white font-outfit font-bold text-[13px] text-[#FF7A00]">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="m-0 font-outfit font-bold text-[19px] text-[#0E0E0E]">
                {step.title}
              </h3>
              <p className="m-0 text-[15px] leading-[1.6] text-[#4A4A4E]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
