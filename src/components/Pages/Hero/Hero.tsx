"use client";

import { motion } from "framer-motion";

function FlowLines() {
  return (
    <>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-[110px] sm:w-[150px] lg:w-[190px] h-full z-0 opacity-70"
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
        className="pointer-events-none absolute inset-y-0 right-0 w-[110px] sm:w-[150px] lg:w-[190px] h-full z-0 opacity-70"
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

const clients = [
  "Nikora Home",
  "Mtis Media",
  "Bazari.ge",
  "Kalata Wine",
  "Gudauri Ski",
];

const stats = [
  { value: "60+", label: "sites shipped" },
  { value: "3 weeks", label: "average delivery" },
  { value: "₾2,500", label: "starting price" },
  { value: "98", suffix: "/100", label: "median PageSpeed" },
];

export default function Hero() {
  return (
    <>
      <section
        id="top"
        className="relative overflow-hidden pt-11 sm:pt-16 lg:pt-[100px] pb-[22px] sm:pb-8 lg:pb-[42px] px-5 sm:px-9 lg:px-[72px]"
        style={{
          background:
            "linear-gradient(180deg,#FFFFFF 0%,#F5F5F7 55%,#EFEFF2 100%)",
        }}
      >
        <FlowLines />

        <div className="relative z-[1] max-w-[1440px] mx-auto flex flex-col items-center text-center">
          <h1 className="m-0 max-w-[16ch] font-outfit font-extrabold text-[#0E0E0E] leading-[1] tracking-[-0.04em] text-[clamp(38px,6.4vw,94px)]">
            We build websites
            <br />
            that are{" "}
            <span className="font-instrument italic font-normal tracking-[-0.005em]">
              fast &amp; well-made
            </span>
          </h1>

          <p className="mt-5 sm:mt-7 lg:mt-[34px] max-w-[58ch] text-[#4A4A4E] leading-[1.56] text-[clamp(15.5px,1.2vw,18.5px)]">
            GarGari is a Tbilisi studio designing and building landing pages,
            web applications and online stores — small team, hand-built work,
            clear timelines.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-[18px] sm:gap-7 lg:gap-9 mt-[26px] sm:mt-9 lg:mt-12">
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 rounded-full pl-7 pr-1.5 py-1.5 bg-primary hover:bg-white font-outfit font-bold text-[#0E0E0E] text-[16.5px] tracking-[-0.01em] whitespace-nowrap transition-colors duration-200 shadow-[0_0_30px_rgba(241,144,53,0.3)]"
            >
              Start a project
              <span className="inline-flex items-center justify-center w-[30px] h-[30px] rounded-full bg-[#0E0E0E] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
                <svg width="13" height="10" viewBox="0 0 7 9" aria-hidden="true">
                  <path d="M1 1 L5 4.5 L1 8" fill="none" stroke="#FFFFFF" strokeWidth="1.7" />
                </svg>
              </span>
            </a>

            <div className="flex items-center gap-3.5">
              <div className="flex items-center">
                <span
                  className="w-[27px] h-[27px] rounded-full"
                  style={{ background: "linear-gradient(180deg,#F2F2F5 0%,#DEDEE3 100%)" }}
                />
                <span
                  className="w-[27px] h-[27px] rounded-full -ml-[9px]"
                  style={{ background: "linear-gradient(180deg,#DEDEE3 0%,#C7C7CC 100%)" }}
                />
                <span
                  className="w-[27px] h-[27px] rounded-full -ml-[9px]"
                  style={{ background: "linear-gradient(180deg,#3A3A3C 0%,#0E0E0E 100%)" }}
                />
                <span
                  className="w-[27px] h-[27px] rounded-full -ml-[9px] bg-primary"
                />
              </div>
              <div className="text-left">
                <div className="text-primary text-[13.5px] tracking-[0.08em] leading-none">
                  ★★★★★
                </div>
                <div className="mt-[5px] text-[13.5px] text-[#4A4A4E] whitespace-nowrap">
                  60+ sites shipped since 2019
                </div>
              </div>
            </div>
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
              Trusted by Georgian brands, media and marketplaces
            </span>
            <span
              className="flex-1 h-px"
              style={{
                background:
                  "linear-gradient(90deg,#E3E3E6 0%,rgba(227,227,230,0) 100%)",
              }}
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-9 lg:gap-[58px] mt-5 sm:mt-7 lg:mt-[34px] font-outfit font-semibold text-[#4A4A4E] tracking-[-0.015em] text-[clamp(15px,1.25vw,18px)]">
            {clients.map((name) => (
              <span key={name}>{name}</span>
            ))}
          </div>
        </div>
      </section>

      <div className="relative z-[1] max-w-[1440px] mx-auto flex flex-wrap gap-px bg-[#E3E3E6] border-y border-[#E3E3E6]">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`px-[18px] sm:px-[30px] lg:px-11 py-6 sm:py-8 ${
              i === 0
                ? "flex-[1.5_1_210px] pt-5 sm:pt-[26px] lg:pt-[34px] pb-6 sm:pb-8 lg:pb-11"
                : i === 1
                ? "flex-[1_1_180px] pt-[34px] sm:pt-11 lg:pt-16 pb-[18px] sm:pb-5 lg:pb-[26px]"
                : i === 2
                ? "flex-[1.2_1_190px] pt-6 sm:pt-7 lg:pt-10 pb-6 sm:pb-7 lg:pb-10"
                : "flex-[1.1_1_190px] pt-10 sm:pt-12 lg:pt-[72px] pb-4 sm:pb-[18px] lg:pb-6"
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
              {stat.suffix && (
                <span className="text-[#5A5A5F] font-medium">{stat.suffix}</span>
              )}
            </div>
            <div className="mt-2 text-[12px] tracking-[0.14em] uppercase text-[#5A5A5F]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
