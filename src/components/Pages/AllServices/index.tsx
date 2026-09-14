"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Globe, LayoutDashboard, ShoppingBag, ArrowUpRight } from "lucide-react";
import BizonImg from "@/Assets/images/Bizon.jpg";
import groupPhoto from "@/Assets/images/garagari-boys.jpg";

const services = [
  {
    number: "01",
    icon: Globe,
    title: "Landing & static pages",
    description:
      "One-page and multi-page sites for launches, services and campaigns, mobile-first and quick to load.",
    price: "from ₾2,500",
  },
  {
    number: "02",
    icon: LayoutDashboard,
    title: "Web applications",
    description:
      "Dashboards, booking systems, portals and internal tools, with an admin panel and the integrations you already use.",
    price: "quoted on scope",
  },
  {
    number: "03",
    icon: ShoppingBag,
    title: "E-commerce",
    description:
      "Stores with catalogue, cart, local payment providers and delivery, built for real inventory and real traffic.",
    price: "quoted on scope",
  },
];

const brandingTags = [
  "Logo & identity",
  "Wireframes",
  "Interface design",
  "Design systems",
];

const faqs = [
  {
    question: "How is a project priced?",
    answer:
      "Landing pages are fixed quotes based on the brief. Web apps and stores are scoped after the first call, then quoted before any work starts, no surprises later.",
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer:
      "Every project includes a month of support after handover. After that, we offer ongoing maintenance plans for updates, fixes and small changes.",
  },
  {
    question: "Can you redesign or rebuild an existing site?",
    answer:
      "Yes. We audit what's there, keep what works, and rebuild the rest, content and SEO history included where possible.",
  },
  {
    question: "Do you handle hosting and domains?",
    answer:
      "Yes, we can set up hosting, domain and email from scratch, or work with infrastructure you already have.",
  },
];

export default function AllServices() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-[40px] sm:pt-14 lg:pt-[72px] pb-[56px] sm:pb-20 lg:pb-[104px]">
        <div className="rounded-[2rem] border border-[#E3E3E6] bg-[#F7F6F4] p-6 sm:p-10 lg:p-14">
          <div className="flex flex-wrap items-center justify-between gap-8">
            <div>
              <span className="inline-flex items-center rounded-full border border-[#E3DFDA] bg-white px-3.5 py-1.5 text-[12px] font-semibold text-[#0E0E0E]">
                Services
              </span>
              <h1 className="mt-4 max-w-[15ch] font-outfit font-extrabold text-[clamp(32px,4.6vw,58px)] leading-[1.05] tracking-[-0.03em] text-[#0E0E0E]">
                Fixed scope, built to launch
              </h1>
              <p className="mt-4 max-w-[42ch] text-[15.5px] leading-[1.6] text-[#4A4744]">
                Three ways to work with us, plus the design work that sits in
                front of the build. Real prices, no vague packages.
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2 shrink-0">
              <div className="relative w-[84px] h-[84px] rounded-full overflow-hidden border border-white shadow-[0_4px_20px_rgba(14,14,14,0.12)]">
                <Image
                  src={groupPhoto}
                  alt="The GarGari team"
                  fill
                  sizes="84px"
                  className="object-cover"
                />
              </div>
              <div className="flex items-end gap-1">
                <span className="w-[10px] h-[46px] rounded-full bg-[#FF7A00]/70" />
                <span className="w-[10px] h-[64px] rounded-full bg-[#FF7A00]" />
              </div>
            </div>
          </div>

          <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
            {services.map((service) =>
              service.number === "02" ? (
                <div
                  key={service.title}
                  className="md:mt-0 md:-mb-10 rounded-2xl overflow-hidden border border-[#EDEAE6] bg-white flex flex-col"
                >
                  <div className="relative w-full aspect-[4/3]">
                    <Image
                      src={BizonImg}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col items-center text-center gap-3 bg-[#0E0E0E] text-white px-6 py-8">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00]" />
                    <h3 className="font-outfit font-bold text-[19px]">
                      {service.title}
                    </h3>
                    <p className="text-[14px] leading-[1.6] text-white/65">
                      {service.description}
                    </p>
                    <span className="mt-1 inline-flex items-center rounded-full border border-white/15 px-3 py-1 text-[12.5px] font-outfit font-semibold text-white">
                      {service.price}
                    </span>
                    <span className="mt-2 font-outfit font-bold text-[13px] text-white/40">
                      {service.number}
                    </span>
                  </div>
                </div>
              ) : (
                <div
                  key={service.title}
                  className="rounded-2xl border border-[#EDEAE6] bg-white p-8 flex flex-col items-center text-center gap-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00]" />
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-[#FF7A00] bg-white text-[#FF7A00]">
                    <service.icon size={20} />
                  </div>
                  <h3 className="mt-1 font-outfit font-bold text-[19px] text-[#0E0E0E]">
                    {service.title}
                  </h3>
                  <p className="text-[14px] leading-[1.6] text-[#4A4744]">
                    {service.description}
                  </p>
                  <span className="mt-1 inline-flex items-center rounded-full border border-[#E3DFDA] bg-[#F7F6F4] px-3 py-1 text-[12.5px] font-outfit font-semibold text-[#0E0E0E]">
                    {service.price}
                  </span>
                  <span className="mt-2 font-outfit font-bold text-[13px] text-[#B7B4AF]">
                    {service.number}
                  </span>
                </div>
              ),
            )}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/contact"
              className="group relative inline-flex items-center rounded-full h-12 p-1 ps-6 pe-14 font-outfit font-semibold text-[14.5px] text-[#0E0E0E] bg-white border border-[#E3DFDA] hover:border-[#FF7A00]/40 w-fit overflow-hidden transition-all duration-500 hover:ps-14 hover:pe-6 cursor-pointer"
            >
              <span className="relative z-10">
                Let&apos;s build your project together
              </span>
              <div className="absolute right-1 w-10 h-10 bg-[#0E0E0E] text-white rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
                <ArrowUpRight size={16} />
              </div>
            </Link>
          </div>
        </div>

        <div
          className="mt-5 grid items-center gap-[22px] rounded-xl border border-[#EDEAE6] p-7"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}
        >
          <div>
            <h3 className="m-0 font-outfit font-bold text-[21px] text-[#0E0E0E]">
              Branding &amp; UI/UX
            </h3>
            <p className="mt-2.5 max-w-[46ch] text-[15.5px] leading-[1.6] text-[#4A4744]">
              Identity, type and a small system that holds together, plus
              wireframes and interface design before the build starts.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {brandingTags.map((tag) => (
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
              FAQ
            </span>
            <h2 className="mt-3 max-w-[18ch] font-outfit font-extrabold text-[clamp(24px,2.8vw,36px)] leading-[1.1] tracking-[-0.03em] text-[#0E0E0E]">
              Answers before you ask
            </h2>
            <p className="mt-4 max-w-[42ch] text-[15px] leading-[1.6] text-[#4A4A4E]">
              The questions that come up most before a project starts.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => {
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
