"use client";

import { useState } from "react";

const steps = [
  {
    number: "01",
    title: "Brief",
    description:
      "A short call to map what the site has to do. Fixed quote within two days.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Structure first, then the look. Real screens with your content, signed off before we build.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Hand-written front end, tested on real phones, staging link from week one.",
  },
  {
    number: "04",
    title: "Launch",
    description:
      "Domain, hosting, analytics, speed pass, then a month of support and a handover.",
  },
];

const faqs = [
  {
    question: "How long does a project take?",
    answer:
      "Most landing pages ship in 2-3 weeks. Larger web apps and stores run 4-8 weeks depending on scope.",
  },
  {
    question: "Do you work with clients outside Georgia?",
    answer:
      "Yes. Calls, a shared staging link and async updates cover the whole process, wherever you are.",
  },
  {
    question: "What do you need from me to start?",
    answer:
      "A short brief, your content or help writing it, and any brand assets you already have.",
  },
  {
    question: "Is there support after launch?",
    answer:
      "Every project includes a month of support after handover, plus ongoing maintenance if you need it.",
  },
];

export default function WhyUs() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
            Why us
          </span>
          <h2 className="mt-3 max-w-[16ch] font-outfit font-extrabold text-[clamp(28px,3.4vw,46px)] leading-[1.08] tracking-[-0.03em] text-[#0E0E0E]">
            Four steps, no mystery in between
          </h2>
        </div>
        <p className="m-0 max-w-[36ch] text-[16px] leading-[1.6] text-[#4A4A4E]">
          You see the site the week we start. Nothing is revealed at the end.
        </p>
      </div>

      <div className="relative">
        <div className="hidden lg:block absolute top-5 left-0 right-0 h-px bg-[#E3E3E6]" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col gap-4">
              <div className="relative z-[1] inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#FF7A00] bg-white font-outfit font-bold text-[13px] text-[#FF7A00]">
                {step.number}
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
