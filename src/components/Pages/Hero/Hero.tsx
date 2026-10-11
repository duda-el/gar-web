"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiNodedotjs,
  SiFigma,
} from "react-icons/si";

function FlowLines() {
  return (
    <>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-[50px] sm:w-[110px] md:w-[150px] lg:w-[190px] h-full z-0 opacity-70"
        viewBox="0 0 200 600"
        preserveAspectRatio="none"
        fill="none"
      >
        <motion.path
          d="M170,0 C80,90 40,130 38,220 C36,310 150,330 145,420 C142,480 60,510 55,600"
          stroke="#FF7A00"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
      </svg>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-[50px] sm:w-[110px] md:w-[150px] lg:w-[190px] h-full z-0 opacity-70"
        viewBox="0 0 200 600"
        preserveAspectRatio="none"
        fill="none"
        style={{ transform: "scaleX(-1)" }}
      >
        <motion.path
          d="M170,0 C80,90 40,130 38,220 C36,310 150,330 145,420 C142,480 60,510 55,600"
          stroke="#FF7A00"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: "easeInOut", delay: 0.15 }}
        />
      </svg>
    </>
  );
}

const technologies = [
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "React", Icon: SiReact },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Tailwind CSS", Icon: SiTailwindcss },
  { name: "Framer Motion", Icon: SiFramer },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "Figma", Icon: SiFigma },
];

export default function Hero() {
  const { t, href } = useI18n();
  const stats = t.hero.stats;

  return (
    <>
      <section
        id="top"
        className="relative overflow-hidden min-h-[600px] sm:min-h-[80dvh] flex items-center pt-11 sm:pt-16 lg:pt-[100px] pb-[22px] sm:pb-8 lg:pb-[42px] px-5 sm:px-9 lg:px-[72px]"
        style={{
          background:
            "linear-gradient(180deg,#FFFFFF 0%,#F5F5F7 55%,#EFEFF2 100%)",
        }}
      >
        <FlowLines />

        <div className="relative z-[1] max-w-[1440px] overflow-x-hidden mx-auto flex flex-col items-center text-center">
          <h1 className="m-0 max-w-[92%] sm:max-w-[85%] lg:max-w-[16ch] break-words font-outfit font-extrabold text-[#0E0E0E] leading-[1] tracking-[-0.04em] text-[clamp(34px,9vw,56px)] sm:text-[clamp(44px,7.2vw,72px)] lg:text-[clamp(56px,5.6vw,94px)]">
            {t.hero.titleLine1}
            <br />
            {t.hero.titleLine2}
          </h1>

          <p className="mt-5 sm:mt-7 lg:mt-[34px] max-w-[58ch] text-[#4A4A4E] leading-[1.56] text-[clamp(15.5px,1.2vw,18.5px)]">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-[18px] sm:gap-7 lg:gap-9 mt-[26px] sm:mt-9 lg:mt-12">
            <Link
              href={href("/contact")}
              className="group inline-flex items-center gap-3 rounded-full pl-7 pr-1.5 py-1.5 bg-primary hover:bg-white font-outfit font-bold text-[#0E0E0E] text-[16.5px] tracking-[-0.01em] whitespace-nowrap transition-colors duration-200 shadow-[0_0_30px_rgba(241,144,53,0.3)]"
            >
              {t.hero.cta}
              <span className="inline-flex items-center justify-center w-[30px] h-[30px] rounded-full bg-[#0E0E0E] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
                <svg
                  width="13"
                  height="10"
                  viewBox="0 0 7 9"
                  aria-hidden="true"
                >
                  <path
                    d="M1 1 L5 4.5 L1 8"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="1.7"
                  />
                </svg>
              </span>
            </Link>
          </div>

          <div className="w-full max-w-[1080px] flex items-center gap-3.5 sm:gap-5 lg:gap-7 mt-10 sm:mt-14 lg:mt-[92px]">
            <span
              className="flex-1 h-px"
              style={{
                background:
                  "linear-gradient(90deg,rgba(227,227,230,0) 0%,#E3E3E6 100%)",
              }}
            />
            <span className="shrink-0 text-[13.5px] text-[#6E6E73] text-center">
              {t.hero.techLabel}
            </span>
            <span
              className="flex-1 h-px"
              style={{
                background:
                  "linear-gradient(90deg,#E3E3E6 0%,rgba(227,227,230,0) 100%)",
              }}
            />
          </div>

          <div
            className="w-full max-w-[1080px] mx-auto overflow-hidden mt-5 sm:mt-7 lg:mt-[34px]"
            style={{
              maskImage:
                "linear-gradient(90deg,transparent,black 12%,black 88%,transparent)",
              WebkitMaskImage:
                "linear-gradient(90deg,transparent,black 12%,black 88%,transparent)",
            }}
          >
            <div className="animate-marquee items-center hover:[animation-play-state:paused]">
              {[
                ...technologies,
                ...technologies,
                ...technologies,
                ...technologies,
              ].map(({ name, Icon }, i) => (
                <span
                  key={`${name}-${i}`}
                  className="flex items-center whitespace-nowrap gap-2 sm:gap-2.5 shrink-0 mr-8 sm:mr-9 md:mr-12 lg:mr-[58px] font-outfit font-semibold text-[#4A4A4E] tracking-[-0.015em] text-[clamp(13px,1.25vw,18px)]"
                >
                  <Icon
                    aria-hidden="true"
                    className="w-3.5 h-3.5 sm:w-[19px] sm:h-[19px] md:w-[21px] md:h-[21px] shrink-0"
                  />
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-[1] max-w-[1440px] mx-auto flex flex-wrap gap-px bg-[#E3E3E6] border-y border-[#E3E3E6]">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex flex-col items-center justify-center text-center px-[18px] sm:px-[30px] lg:px-11 py-6 sm:py-8 lg:py-11 ${
              i === 0
                ? "flex-[1.5_1_210px]"
                : i === 1
                  ? "flex-[1_1_180px]"
                  : i === 2
                    ? "flex-[1.2_1_190px]"
                    : "flex-[1.1_1_190px]"
            }`}
            style={{
              background:
                i === 0
                  ? "linear-gradient(180deg,#FBFBFD 0%,#FFFFFF 100%)"
                  : i === 1
                    ? "linear-gradient(180deg,#F7F7F9 0%,#FFFFFF 100%)"
                    : i === 2
                      ? "linear-gradient(180deg,#FBFBFD 0%,#FFFFFF 100%)"
                      : "linear-gradient(180deg,#F7F7F9 0%,#F2F2F5 100%)",
            }}
          >
            <div
              className={`font-outfit font-extrabold leading-none tracking-[-0.04em] text-[#0E0E0E] ${
                i === 0 || i === 2
                  ? "text-[clamp(30px,3.2vw,48px)]"
                  : "text-[clamp(26px,2.5vw,35px)]"
              }`}
            >
              {stat.value}
              {"suffix" in stat && stat.suffix && (
                <span className="text-[#5A5A5F] font-medium">
                  {stat.suffix}
                </span>
              )}
            </div>
            <div className="font-outfit mt-2 text-[12px] tracking-[0.14em] uppercase text-[#5A5A5F]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
