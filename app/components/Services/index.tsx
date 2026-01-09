"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Plus,
  Minus,
  ArrowRight,
  Zap,
  ShieldCheck,
  BarChart3,
  Code2,
} from "lucide-react";

interface ServiceDetail {
  title: string;
  price: string;
  description: string;
  includes: string[];
  techStack: string[];
}

const servicesData: Record<string, ServiceDetail> = {
  landing: {
    title: "Landing Page",
    price: "1500₾",
    description:
      "იდეალურია პროდუქტის პრეზენტაციისთვის და გაყიდვების სტიმულირებისთვის.",
    includes: [
      "UI/UX პროტოტიპირება",
      "სრული ადაპტაცია (Mobile)",
      "SEO ბაზისური გამართვა",
      "კონტაქტის ფორმის ინტეგრაცია",
    ],
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
  },
  ecommerce: {
    title: "E-Commerce",
    price: "3500₾",
    description:
      "სრული ფუნქციონალი თქვენი ონლაინ მაღაზიისთვის, გადახდების სისტემით.",
    includes: [
      "პროდუქტების კატალოგი",
      "ონლაინ გადახდები (BOG/TBC)",
      "ადმინ პანელი",
      "ინვენტარის მართვა",
      "SMS შეტყობინებები",
    ],
    techStack: ["Next.js", "Payload CMS", "Stripe/Local Pay"],
  },
  custom: {
    title: "Custom App",
    price: "5000₾",
    description:
      "რთული ბიზნეს ლოგიკის მქონე პლატფორმები ინდივიდუალური მოთხოვნებით.",
    includes: [
      "API დოკუმენტაცია",
      "მომხმარებლების როლები",
      "Real-time მონაცემები",
      "Cloud ჰოსტინგი",
      "2-თვიანი მხარდაჭერა",
    ],
    techStack: ["React/Next", "Node.js", "PostgreSQL", "Redis"],
  },
};

const FAQ = [
  {
    q: "რა დრო სჭირდება დამზადებას?",
    a: "ლენდინგ გვერდს საშუალოდ 7-10 დღე, ხოლო რთულ სისტემებს 1-3 თვე.",
  },
  {
    q: "შესაძლებელია თუ არა განვადება?",
    a: "დიახ, გვაქვს შიდა განვადების სისტემა და ეტაპობრივი გადახდა.",
  },
];

const Services = () => {
  const [activeTab, setActiveTab] =
    useState<keyof typeof servicesData>("landing");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="relative py-24 px-6 bg-[#121212]" id="services">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16">
          <p className="text-primary font-georgian tracking-widest uppercase text-sm mb-4">
            ტარიფები და სერვისები
          </p>
          <h2 className="text-5xl md:text-7xl font-bold text-white font-georgian uppercase">
            როგორ ვმუშაობთ
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Side: Service Navigation & Details */}
          <div className="lg:col-span-8 space-y-8">
            {/* Tabs */}
            <div className="flex flex-wrap gap-4 border-b border-white/10 pb-6">
              {Object.keys(servicesData).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as keyof typeof servicesData)}
                  className={`px-6 py-3 rounded-full text-sm font-bold font-georgian transition-all ${
                    activeTab === key
                      ? "bg-primary text-black"
                      : "text-zinc-500 hover:text-white border border-white/10"
                  }`}
                >
                  {servicesData[key].title}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-[#1c1c1c] p-8 md:p-12 border border-white/5 shadow-2xl"
                style={{ borderRadius: "var(--radius-4xl)" }}
              >
                <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-6">
                  <div>
                    <h3 className="text-4xl font-bold text-white mb-4 font-georgian">
                      {servicesData[activeTab].title}
                    </h3>
                    <p className="text-zinc-400 font-georgian text-lg max-w-md italic">
                      {servicesData[activeTab].description}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-zinc-500 text-sm font-georgian uppercase">
                      საწყისი ფასი
                    </p>
                    <p className="text-5xl font-bold text-primary">
                      {servicesData[activeTab].price}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-white font-bold font-georgian flex items-center gap-2">
                      <Zap className="size-4 text-primary" /> რა შედის ფასში?
                    </h4>
                    <ul className="space-y-3">
                      {servicesData[activeTab].includes.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-3 text-zinc-400 text-sm font-georgian"
                        >
                          <CheckCircle2 className="size-4 text-primary" />{" "}
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-white font-bold font-georgian flex items-center gap-2">
                      <Code2 className="size-4 text-primary" /> ტექნოლოგიები
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {servicesData[activeTab].techStack.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] text-zinc-300 uppercase tracking-widest font-bold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button className="mt-12 group flex items-center gap-4 bg-white text-black px-8 py-4 rounded-xl font-bold font-georgian hover:bg-primary transition-colors">
                  პროექტის დაწყება{" "}
                  <ArrowRight className="size-5 group-hover:translate-x-2 transition-transform" />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side: FAQ & Benefits */}
          <div className="lg:col-span-4 space-y-6">
            <div
              className="bg-primary/5 p-8 border border-primary/20"
              style={{ borderRadius: "var(--radius-3xl)" }}
            >
              <h4 className="text-white font-bold font-georgian mb-6 text-xl">
                რატომ ჩვენ?
              </h4>
              <div className="space-y-6">
                {[
                  {
                    icon: <ShieldCheck />,
                    t: "ხარისხის გარანტია",
                    d: "კოდის სისუფთავე და უსაფრთხოება.",
                  },
                  {
                    icon: <BarChart3 />,
                    t: "შედეგზე ორიენტირებული",
                    d: "კონვერსიაზე გათვლილი დიზაინი.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="text-primary">{item.icon}</div>
                    <div>
                      <p className="text-white font-bold text-sm font-georgian">
                        {item.t}
                      </p>
                      <p className="text-zinc-500 text-xs font-georgian">
                        {item.d}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Simple FAQ Accordion */}
            <div className="space-y-4">
              <h4 className="text-white font-bold font-georgian px-2">
                ხშირად დასმული
              </h4>
              {FAQ.map((faq, i) => (
                <div
                  key={i}
                  className="border border-white/5 bg-[#1c1c1c]/30 rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left text-zinc-300 font-georgian text-sm"
                  >
                    {faq.q}
                    {openFaq === i ? (
                      <Minus className="size-4" />
                    ) : (
                      <Plus className="size-4" />
                    )}
                  </button>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      className="px-4 pb-4 text-zinc-500 text-xs font-georgian"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
