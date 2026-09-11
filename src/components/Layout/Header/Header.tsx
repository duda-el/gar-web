"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "Home", id: "top" },
  { label: "Services", id: "services" },
  { label: "Work", id: "projects" },
  { label: "Why us", id: "why" },
  { label: "Contact", id: "contact" },
];

function ArrowIcon({ stroke = "#0E0E0E" }: { stroke?: string }) {
  return (
    <svg width="12" height="9" viewBox="0 0 7 9" aria-hidden="true">
      <path
        d="M1 1 L5 4.5 L1 8"
        fill="none"
        stroke={stroke}
        strokeWidth="1.7"
      />
    </svg>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsOpen(false);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-[100] transition-[background,box-shadow,border-color] duration-300 bg-white/[0.62] backdrop-blur-2xl backdrop-saturate-150 ${
        scrolled
          ? "border-b border-[#E3E3E6] shadow-[0_1px_0_rgba(255,255,255,0.55)_inset]"
          : "border-b border-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4 sm:gap-8 h-[76px] px-5 sm:px-9 lg:px-[72px]">
        <button
          onClick={() => scrollToSection("top")}
          className="flex items-baseline gap-2.5 shrink-0 cursor-pointer"
          aria-label="GarGari home"
        >
          <svg
            width="28"
            height="21"
            viewBox="0 0 34 26"
            aria-hidden="true"
            className="self-center shrink-0"
          >
            <rect x="0" y="10" width="12" height="6" fill="#FF7A00" />
            <polygon points="10,2 18,2 30,13 18,24 10,24 22,13" fill="#0E0E0E" />
            <rect x="27" y="2" width="7" height="22" fill="#0E0E0E" />
          </svg>
          <span className="font-outfit font-extrabold text-[19px] sm:text-[21px] tracking-[-0.035em] text-[#0E0E0E]">
            GarGari
          </span>
          <span className="hidden sm:inline text-[9.5px] tracking-[0.22em] uppercase text-[#5A5A5F] font-medium">
            Tbilisi
          </span>
        </button>

        <nav
          className="hidden lg:flex items-center gap-0.5 shrink-0 bg-white/55 backdrop-blur-xl border border-white/70 rounded-full p-1.5"
          style={{
            boxShadow:
              "0 1px 3px rgba(14,14,14,0.06), 0 0 0 0.5px rgba(14,14,14,0.05)",
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`font-outfit text-[14.5px] font-medium rounded-full px-4 py-2 whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                link.label === "Home"
                  ? "text-[#0E0E0E] bg-white/90 shadow-[0_1px_3px_rgba(14,14,14,0.1),0_0_0_0.5px_rgba(14,14,14,0.04)]"
                  : "text-[#4A4A4E] hover:text-[#0E0E0E] hover:bg-white/70"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => scrollToSection("contact")}
          className="hidden sm:inline-flex items-center gap-2.5 shrink-0 rounded-full pl-5 pr-1.5 py-1.5 bg-primary hover:bg-white font-outfit font-bold text-[14.5px] tracking-[-0.01em] text-[#0E0E0E] whitespace-nowrap cursor-pointer transition-colors duration-200 shadow-[0_0_20px_rgba(241,144,53,0.35)]"
        >
          Start a project
          <span className="inline-flex items-center justify-center w-[26px] h-[26px] rounded-full bg-[#0E0E0E] shrink-0">
            <ArrowIcon stroke="#FFFFFF" />
          </span>
        </button>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 shrink-0 cursor-pointer"
          aria-label="Toggle Menu"
        >
          <span
            className={`block w-5 h-[1.5px] bg-[#0E0E0E] transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-[#0E0E0E] transition-all duration-300 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-[#0E0E0E] transition-all duration-300 ${
              isOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out bg-white/90 backdrop-blur-2xl border-b border-[#E3E3E6] ${
          isOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col px-5 sm:px-9 py-4 gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="font-outfit text-[16px] font-medium text-left text-[#0E0E0E] py-3 border-b border-[#E3E3E6] last:border-b-0 cursor-pointer"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection("contact")}
            className="mt-4 mb-2 inline-flex items-center justify-center gap-2.5 rounded-full py-3 bg-primary hover:bg-white font-outfit font-bold text-[15px] text-[#0E0E0E] cursor-pointer transition-colors duration-200"
          >
            Start a project
            <span className="inline-flex items-center justify-center w-[24px] h-[24px] rounded-full bg-[#0E0E0E] shrink-0">
              <ArrowIcon stroke="#FFFFFF" />
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
}
