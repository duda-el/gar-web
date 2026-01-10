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
    price: "1200₾-დან",
    description: "ერთგვერდიანი საიტი თქვენი პროდუქტის პრეზენტაციისთვის.",
    includes: [
      "UI/UX დიზაინი",
      "ყველა მოწყობილობასთან თავსებადი დიზაინი",
      "საბაზისო SEO ოპტიმიზაცია",
      "კონტაქტის ფორმის ინტეგრაცია",
    ],
    techStack: ["React", "TailwindCSS/CSS/SCSS"],
  },
  ecommerce: {
    title: "E-Commerce",
    price: "4500₾-დან",
    description:
      "სრული ფუნქციონალი თქვენი ონლაინ მაღაზიისთვის, გადახდის სისტემით.",
    includes: [
      "პროდუქტების კატალოგი",
      "ონლაინ გადახდა (BOG/TBC/CREDO)",
      "ადმინ პანელი",
      "ინვენტარის მართვა",
      "SMS შეტყობინებები",
    ],
    techStack: [
      "Next.js/React/Angular",
      "Django/Laravel/C#",
      "Payload CMS",
      "Stripe/PayPal/Local Pay",
    ],
  },
  calculator: {
    title: "კალკულატორი",
    price: "Custom",
    description:
      "შეადგინეთ თქვენი პაკეტი ინდივიდუალურად და გაიგეთ მიახლოვებული ღირებულება.",
    includes: [],
    techStack: ["Custom Solutions", "Architecture Design"],
  },
};

const CALC_OPTIONS = [
  { id: "landing", label: "ბაზისური ვებსაიტი", price: 1000, complex: false },
  {
    id: "multi_page",
    label: "კომპლექსური საიტი",
    price: 1500,
    complex: true,
  },
  { id: "design", label: "პრემიუმ UI/UX დიზაინი", price: 500, complex: false },
  { id: "cms", label: "მართვის პანელი (CMS)", price: 800, complex: true },
  { id: "ecommerce", label: "მაღაზიის სისტემა", price: 1200, complex: true },
  { id: "payment", label: "ბანკების ინტეგრაცია", price: 400, complex: true },
  { id: "auth", label: "ავტორიზაცია/პროფილი", price: 700, complex: true },
  { id: "multilang", label: "მრავალენოვანი საიტი", price: 400, complex: false },
  { id: "booking", label: "დაჯავშნის სისტემა", price: 900, complex: true },
  { id: "seo", label: "SEO ოპტიმიზაცია", price: 400, complex: false },
];

const FAQ = [
  {
    q: "რა დრო სჭირდება დამზადებას?",
    a: "ლენდინგ გვერდს საშუალოდ 7-10 დღე, ხოლო რთულ სისტემებს 1-3 თვე.",
  },
  {
    q: "შესაძლებელია ნაწილ-ნაწილ გადახდა?",
    a: "დიახ, გვაქვს ნაწილ-ნაწილ გადახდის სისტემა.",
  },
];

const Services = () => {
  const [activeTab, setActiveTab] =
    useState<keyof typeof servicesData>("landing");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    "landing",
  ]);

  const totalPrice = selectedFeatures.reduce((acc, curr) => {
    const option = CALC_OPTIONS.find((o) => o.id === curr);
    return acc + (option?.price || 0);
  }, 0);

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) => {
      const isSelected = prev.includes(id);
      const option = CALC_OPTIONS.find((o) => o.id === id);
      let newList = isSelected
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      if (!isSelected && option?.complex)
        newList = newList.filter((item) => item !== "landing");
      if (!isSelected && id === "landing")
        newList = newList.filter(
          (item) => !CALC_OPTIONS.find((o) => o.id === item)?.complex
        );
      return newList;
    });
  };

  return (
    <section className="relative py-24 px-6 bg-[#121212]" id="services">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16">
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              transition={{ duration: 0.2 }}
              className="h-[1px] bg-primary mb-4 "
            />
            <p className="text-sm pb-4 uppercase tracking-[0.2em] text-primary font-medium font-georgian">
              ტარიფები და სერვისები
            </p>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-white font-georgian uppercase">
            რას გთავაზობთ
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-8">
            <div className="flex flex-wrap gap-4 border-b border-white/10 pb-6">
              {Object.keys(servicesData).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as keyof typeof servicesData)}
                  className={`px-6 py-3 rounded-full cursor-pointer text-sm font-bold font-georgian transition-all ${
                    activeTab === key
                      ? "bg-primary text-black"
                      : "text-zinc-300 hover:text-white border border-white/10"
                  }`}
                >
                  {servicesData[key].title}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-[#1c1c1c] p-8 md:p-12 border border-white/5 shadow-2xl relative overflow-hidden"
                style={{ borderRadius: "2.5rem" }}
              >
                <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-6">
                  <div>
                    <h3 className="text-2xl min-[403px]:text-3xl md:text-4xl font-bold text-white mb-4 font-georgian">
                      {servicesData[activeTab].title}
                    </h3>
                    <p className="text-zinc-300 font-georgian text-lg max-[402px]:text-sm max-w-md italic">
                      {servicesData[activeTab].description}
                    </p>
                  </div>
                  {/* CHANGED: text-right to text-left md:text-right */}
                  <div className="text-left md:text-right w-full md:w-auto">
                    <p className="text-zinc-300 text-sm font-georgian uppercase">
                      ფასი
                    </p>
                    <p className="text-5xl font-bold text-primary">
                      {activeTab === "calculator"
                        ? `${totalPrice}₾`
                        : servicesData[activeTab].price}
                    </p>
                    {activeTab === "calculator" && (
                      /* CHANGED: ml-auto to md:ml-auto */
                      <p className="text-[10px] text-zinc-500 font-georgian mt-2 max-w-[200px] md:ml-auto leading-tight">
                        * ფასი შეიძლება გაიზარდოს ან შემცირდეს ტექნიკური
                        დეტალების დაზუსტების შემდეგ.
                      </p>
                    )}
                  </div>
                </div>

                {activeTab === "calculator" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {CALC_OPTIONS.map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() => toggleFeature(opt.id)}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                          selectedFeatures.includes(opt.id)
                            ? "bg-primary/10 border-primary text-white"
                            : "bg-white/5 border-white/10 text-zinc-300 hover:border-white/30"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`size-4 rounded border flex items-center justify-center transition-colors ${
                              selectedFeatures.includes(opt.id)
                                ? "bg-primary border-primary"
                                : "border-white/20"
                            }`}
                          >
                            {selectedFeatures.includes(opt.id)}
                          </div>
                          <span className="font-georgian text-xs">
                            {opt.label}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-primary">
                          +{opt.price}₾
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-white font-bold font-georgian flex items-center gap-2">
                        <Zap className="size-4 text-primary" /> რა შედის ფასში?
                      </h4>
                      <ul className="space-y-3">
                        {servicesData[activeTab].includes.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-3 text-zinc-300 text-sm font-georgian"
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
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div
              className="bg-primary/5 p-8 border border-primary/20"
              style={{ borderRadius: "2rem" }}
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
                      <p className="text-zinc-300 text-xs font-georgian">
                        {item.d}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-white font-bold font-georgian px-2">
                ხშირად დასმული კითხვები
              </h4>
              {FAQ.map((faq, i) => (
                <div
                  key={i}
                  className="border border-white/5 bg-[#1c1c1c]/30 rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 cursor-pointer text-left text-zinc-300 font-georgian text-sm"
                  >
                    {faq.q}
                    {openFaq === i ? (
                      <Minus className="size-4" />
                    ) : (
                      <Plus className="size-4" />
                    )}
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                          transition: {
                            height: {
                              duration: 0.3,
                              ease: [0.4, 0, 0.2, 1],
                            },
                            opacity: { duration: 0.2, delay: 0.1 },
                          },
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: {
                            height: { duration: 0.3, ease: [0.4, 0, 1, 1] },
                            opacity: { duration: 0.2 },
                          },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 text-zinc-300 text-xs font-georgian">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--color-primary, #f19035);
          border-radius: 10px;
        }
      `}</style>
    </section>
  );
};

export default Services;
