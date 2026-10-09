"use client";

import Image from "next/image";
import { Users, Layers, Sparkles, MapPin, Clock } from "lucide-react";
import heroIllustration from "@/Assets/images/about-hero-illustration.png";
import { useI18n } from "@/i18n/I18nProvider";

const valueIcons = [Users, Layers, Sparkles];

export default function AboutUs() {
  const { t } = useI18n();
  return (
    <>
      <section
        id="about"
        className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-[48px] sm:pt-16 lg:pt-[88px] pb-[56px] sm:pb-20 lg:pb-[104px]"
        style={{
          background:
            "linear-gradient(180deg, #fbfbfb 0% 0%, #fefefe 55%, #ffffff 100%)",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.85fr] gap-12 lg:gap-16 items-center">
          <div>
            <span className="text-[12.5px] font-semibold tracking-[0.14em] uppercase text-[#FF7A00]">
              {t.aboutUs.eyebrow}
            </span>
            <h1 className="mt-3 max-w-[16ch] font-outfit font-extrabold text-[clamp(30px,4vw,52px)] leading-[1.08] tracking-[-0.03em] text-[#0E0E0E]">
              {t.aboutUs.title}
            </h1>
            <p className="mt-5 max-w-[48ch] text-[16px] leading-[1.6] text-[#4A4A4E]">
              {t.aboutUs.text}
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#E3DFDA] bg-white px-3.5 py-2 text-[13px] text-[#0E0E0E]">
                <MapPin size={14} className="text-[#FF7A00] shrink-0" />
                {t.aboutUs.location}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#E3DFDA] bg-white px-3.5 py-2 text-[13px] text-[#0E0E0E]">
                <Clock size={14} className="text-[#FF7A00] shrink-0" />
                {t.aboutUs.replies}
              </span>
            </div>
          </div>

          <div className="relative">
            <i className="absolute w-[14px] h-[14px] left-[-1px] top-[-1px] border-l-2 border-t-2 border-[#0E0E0E] z-10" />
            <i className="absolute w-[14px] h-[14px] right-[-1px] bottom-[-1px] border-r-2 border-b-2 border-[#FF7A00] z-10" />
            <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] rounded-2xl">
              <Image
                src={heroIllustration}
                alt={t.aboutUs.illustrationAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        <div className="mt-16 sm:mt-20 lg:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
          {t.aboutUs.values.map((value, i) => {
            const Icon = valueIcons[i];
            return (
              <div
                key={value.title}
                className="rounded-xl border border-[#EDEAE6] bg-white p-6"
              >
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-full border-2 border-[#FF7A00] bg-white text-[#FF7A00] shrink-0">
                  <Icon size={19} />
                </div>
                <h3 className="mt-4 font-outfit font-bold text-[17px] text-[#0E0E0E]">
                  {value.title}
                </h3>
                <p className="mt-2 text-[14.5px] leading-[1.6] text-[#4A4A4E]">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pb-[56px] sm:pb-20 lg:pb-[104px]">
        <div className="flex flex-wrap items-end justify-between gap-5 mb-14 sm:mb-16 lg:mb-20">
          <div>
            <span className="text-[12.5px] font-semibold tracking-[0.14em] uppercase text-[#FF7A00]">
              {t.aboutUs.howEyebrow}
            </span>
            <h2 className="mt-3 max-w-[16ch] font-outfit font-extrabold text-[clamp(28px,3.4vw,46px)] leading-[1.08] tracking-[-0.03em] text-[#0E0E0E]">
              {t.aboutUs.howTitle}
            </h2>
          </div>
          <p className="m-0 max-w-[36ch] text-[16px] leading-[1.6] text-[#4A4A4E]">
            {t.aboutUs.howIntro}
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
    </>
  );
}
