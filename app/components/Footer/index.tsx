"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Facebook, Instagram, ArrowUpRight, Locate } from "lucide-react";
import PolicyModal from "./PolicyModal"; // დარწმუნდი რომ სწორი გზაა
import { label } from "framer-motion/client";

const TikTokIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [modalType, setModalType] = useState<"privacy" | "terms" | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 100, behavior: "smooth" });
    }
  };

  const policies = {
    privacy: {
      title: "Privacy Policy",
      content: (
        <div className="space-y-4 text-sm">
          <p>
            ჩვენთვის მნიშვნელოვანია თქვენი მონაცემების უსაფრთხოება. წინამდებარე
            კონფიდენციალურობის პოლიტიკა განმარტავს, თუ როგორ ვიყენებთ თქვენს
            ინფორმაციას.
          </p>
          <h4 className="text-white font-bold">1. ინფორმაციის შეგროვება</h4>
          <p>
            ჩვენ ვაგროვებთ მხოლოდ იმ ინფორმაციას, რომელსაც თავად გვაწვდით
            საკონტაქტო ფორმის საშუალებით (სახელი, ელ-ფოსტა).
          </p>
          <h4 className="text-white font-bold">2. მონაცემების გამოყენება</h4>
          <p>
            თქვენი მონაცემები გამოიყენება მხოლოდ თქვენთან დასაკავშირებლად და
            მომსახურების გასაუმჯობესებლად.
          </p>
          <h4 className="text-white font-bold">3. უსაფრთხოება</h4>
          <p>
            GARGARI არ გადასცემს თქვენს პირად ინფორმაციას მესამე პირებს თქვენი
            თანხმობის გარეშე.
          </p>
        </div>
      ),
    },
    terms: {
      title: "Terms of Service",
      content: (
        <div className="space-y-4 text-sm">
          <p>
            GARGARI-ის ვებ-გვერდით სარგებლობით თქვენ ეთანხმებით ქვემოთ მოცემულ
            პირობებს:
          </p>
          <h4 className="text-white font-bold">1. ინტელექტუალური საკუთრება</h4>
          <p>
            ვებ-გვერდზე განთავსებული ყველა კონტენტი, დიზაინი და მასალა
            წარმოადგენს სტუდიის საკუთრებას.
          </p>
          <h4 className="text-white font-bold">2. მომსახურების პირობები</h4>
          <p>
            პროექტის დაწყებამდე მხარეებს შორის ფორმდება ინდივიდუალური
            ხელშეკრულება, რომელიც არეგულირებს სამუშაო პროცესს.
          </p>
          <h4 className="text-white font-bold">3. პასუხისმგებლობის შეზღუდვა</h4>
          <p>
            სტუდია არ არის პასუხისმგებელი იმ ზიანზე, რომელიც შეიძლება გამოწვეული
            იყოს ვებ-გვერდის არასწორი გამოყენებით.
          </p>
        </div>
      ),
    },
  };

  return (
    <footer className="relative bg-[#121212] pt-4 sm:pt-24 pb-12 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white tracking-tighter font-georgian italic">
              GAR<span className="text-primary italic">GARI</span>
            </h2>
            <p className="text-zinc-300 text-sm font-georgian leading-relaxed max-w-xs">
              ჩვენ ვქმნით ციფრულ გამოცდილებას, რომელიც ეხმარება ბიზნესს ზრდასა
              და განვითარებაში.
            </p>
            <div className="flex gap-4">
              {[
                {
                  icon: <Facebook size={18} />,
                  href: "https://www.facebook.com/profile.php?id=61559932766757",
                  label: "Contact us on Facebook",
                },
                {
                  icon: <Instagram size={18} />,
                  href: "https://www.instagram.com/_gargari/",
                  label: "Contact us on Instagram",
                },
                {
                  icon: <TikTokIcon size={18} />,
                  href: "https://www.tiktok.com/@gargari_",
                  label: "Contact us on tiktok",
                },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  whileHover={{ y: -3, color: "#f19035" }}
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-300 border border-white/5"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold font-georgian mb-6 uppercase tracking-widest text-xs">
              ნავიგაცია
            </h3>
            <ul className="space-y-4">
              {["projects", "services", "about"].map((id) => (
                <li key={id}>
                  <button
                    onClick={() => scrollToSection(id)}
                    className="text-zinc-300 hover:text-primary transition-colors text-sm font-georgian flex items-center group capitalize"
                  >
                    {id === "projects"
                      ? "პროექტები"
                      : id === "services"
                      ? "სერვისები"
                      : "ჩვენს შესახებ"}
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-1 transition-all"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold font-georgian mb-6 uppercase tracking-widest text-xs">
              კონტაქტი
            </h3>
            <div className="space-y-4">
              <a
                href="mailto:gargariinfo@gmail.com"
                className="flex items-center gap-3 text-zinc-300 hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                  <Mail size={14} />
                </div>
                <span className="text-sm font-medium">
                  gargariinfo@gmail.com
                </span>
              </a>
              <div className="flex items-center gap-3 text-zinc-300 group">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                  <Locate size={14} />
                </div>
                <span className="text-sm font-medium">Tbilisi, Georgia</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-white font-bold font-georgian mb-6 uppercase tracking-widest text-xs">
              დაგვიკავშირდით
            </h3>
            <p className="text-zinc-300 text-xs font-georgian italic leading-relaxed">
              გაქვთ იდეა? მოდით, ერთად ვაქციოთ ის რეალობად.
            </p>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-400 text-[10px] uppercase tracking-[0.2em] font-bold">
            © {currentYear} GARGARI STUDIO. ყველა უფლება დაცულია.
          </p>
          <div className="flex gap-8">
            <button
              onClick={() => setModalType("privacy")}
              className="text-zinc-400 hover:text-zinc-300 text-[10px] uppercase cursor-pointer tracking-widest font-bold transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setModalType("terms")}
              className="text-zinc-400 hover:text-zinc-300 text-[10px] cursor-pointer uppercase tracking-widest font-bold transition-colors"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>

      {/* Policy Modal Implementation */}
      <PolicyModal
        isOpen={!!modalType}
        onClose={() => setModalType(null)}
        title={modalType ? policies[modalType].title : ""}
        content={modalType ? policies[modalType].content : null}
      />
    </footer>
  );
};

export default Footer;
