"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Facebook, Instagram, ArrowUpRight, Locate } from "lucide-react";
import Script from "next/script";
import PolicyModal from "../../ui/Modal/PolicyModal";

const TikTokIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        <div className="space-y-4 text-sm font-georgian">
          <p>ჩვენთვის მნიშვნელოვანია თქვენი მონაცემების უსაფრთხოება.</p>
          <h4 className="text-white font-bold">1. ინფორმაციის შეგროვება</h4>
          <p>ჩვენ ვაგროვებთ მხოლოდ იმ ინფორმაციას, რომელსაც თავად გვაწვდით.</p>
        </div>
      ),
    },
    terms: {
      title: "Terms of Service",
      content: (
        <div className="space-y-4 text-sm font-georgian">
          <p>GARGARI-ის ვებ-გვერდით სარგებლობით თქვენ ეთანხმებით პირობებს.</p>
          <h4 className="text-white font-bold">1. ინტელექტუალური საკუთრება</h4>
          <p>ვებ-გვერდზე განთავსებული მასალა წარმოადგენს სტუდიის საკუთრებას.</p>
        </div>
      ),
    },
  };

  return (
    <footer className="relative bg-[#121212] pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white tracking-tighter font-georgian italic">
              GAR<span className="text-primary italic">GARI</span>
            </h2>
            <p className="text-zinc-400 text-sm font-georgian max-w-xs">
              ჩვენ ვქმნით ციფრულ გამოცდილებას, რომელიც ეხმარება ბიზნესს ზრდასა და განვითარებაში.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <Facebook size={18} />, href: "https://www.facebook.com/profile.php?id=61559932766757" },
                { icon: <Instagram size={18} />, href: "https://www.instagram.com/_gargari/" },
                { icon: <TikTokIcon size={18} />, href: "https://www.tiktok.com/@gargari_" },
              ].map((social, i) => (
                <a key={i} href={social.href} target="_blank" className="text-zinc-400 hover:text-primary transition-colors">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold font-georgian mb-6 text-xs uppercase tracking-widest opacity-50">ნავიგაცია</h3>
            <ul className="space-y-3">
              {[{ id: "projects", label: "პროექტები" }, { id: "services", label: "სერვისები" }, { id: "about", label: "ჩვენს შესახებ" }].map((item) => (
                <li key={item.id}>
                  <button onClick={() => scrollToSection(item.id)} className="text-zinc-400 hover:text-white transition-colors text-sm font-georgian cursor-pointer">
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold font-georgian mb-6 text-xs uppercase tracking-widest opacity-50">კონტაქტი</h3>
            <div className="space-y-4">
              <a href="mailto:gargariinfo@gmail.com" className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors">
                <Mail size={16} />
                <span className="text-sm font-georgian">gargariinfo@gmail.com</span>
              </a>
              <div className="flex items-center gap-3 text-zinc-400">
                <Locate size={16} />
                <span className="text-sm font-georgian">Tbilisi, Georgia</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold font-georgian mb-6 text-xs uppercase tracking-widest opacity-50">დაგვიკავშირდით</h3>
            <p className="text-zinc-400 text-xs font-georgian italic leading-relaxed">
              გაქვთ იდეა? მოდით, ერთად ვაქციოთ ის რეალობად.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-bold">
            © {currentYear} GARGARI STUDIO.
          </p>
          
          <div className="flex items-center gap-8">
            <button onClick={() => setModalType("privacy")} className="text-zinc-500 hover:text-white text-[10px] uppercase tracking-widest font-bold cursor-pointer transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => setModalType("terms")} className="text-zinc-500 hover:text-white text-[10px] uppercase tracking-widest font-bold cursor-pointer transition-colors">
              Terms of Service
            </button>
            
            {/* TOP.GE პირდაპირ აქ არის */}
            <div id="top-ge-counter-container" data-site-id="118478" className="opacity-60 hover:opacity-100 transition-opacity"></div>
          </div>
        </div>
      </div>

      <Script src="https://counter.top.ge/counter.js" strategy="lazyOnload" />

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