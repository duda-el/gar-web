"use client";

import { useState } from "react";

type Faq = { question: string; answer: string };

/**
 * Accordion of questions and answers. Closed answers stay in the HTML (only collapsed),
 * so crawlers read every answer; the matching FAQPage JSON-LD is added by the page.
 */
export default function FaqList({
  eyebrow,
  title,
  intro,
  faqs,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  faqs: Faq[];
}) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-16">
      <div>
        <span className="text-[14px] sm:text-[15px] font-semibold uppercase text-primary">{eyebrow}</span>
        <h2 className="mt-3 max-w-[18ch] font-outfit font-extrabold text-[clamp(24px,2.8vw,36px)] leading-[1.1] tracking-[-0.03em] text-[#0E0E0E]">
          {title}
        </h2>
        {intro && <p className="mt-4 max-w-[42ch] text-[15px] leading-[1.6] text-[#4A4A4E]">{intro}</p>}
      </div>

      <div className="flex flex-col gap-3">
        {faqs.map((faq, i) => {
          const isOpen = openFaq === i;
          return (
            <div key={faq.question} className="rounded-xl border border-[#EDEAE6] bg-white overflow-hidden">
              <h3 className="m-0">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
                >
                  <span className="font-outfit font-bold text-[15.5px] text-[#0E0E0E]">{faq.question}</span>
                  <svg
                    className={`w-4 h-4 text-primary shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </h3>
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-4 text-[14.5px] leading-[1.6] text-[#4A4A4E]">{faq.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
