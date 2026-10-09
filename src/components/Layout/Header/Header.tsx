"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gargariLogo from "@/Assets/images/gargari-logo-dark.png";
import { useI18n } from "@/i18n/I18nProvider";
import { stripLocale } from "@/i18n/config";
import LanguageSwitcher from "./LanguageSwitcher";

const navLinks = [
  { key: "home", href: "/", id: "top" },
  { key: "services", href: "/services" },
  { key: "projects", href: "/projects" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

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
  const { t, href } = useI18n();
  // Compare against the path without the language prefix ("/en/services" -> "/services")
  const path = stripLocale(usePathname());
  const isHome = path === "/";
  const isActive = (link: (typeof navLinks)[number]) =>
    "id" in link ? isHome : path === link.href || path.startsWith(`${link.href}/`);

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

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id?: string,
  ) => {
    if (id && isHome) {
      e.preventDefault();
      scrollToSection(id);
    } else {
      setIsOpen(false);
    }
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
        <Link
          href={href("/")}
          onClick={(e) => handleNavClick(e, "top")}
          className="flex items-center shrink-0 cursor-pointer"
          aria-label={t.nav.homeAria}
        >
          <Image
            src={gargariLogo}
            alt="GarGari"
            className="h-9 sm:h-10 w-auto"
            priority
          />
        </Link>

        <nav
          className="hidden xl:flex items-center gap-0.5 shrink-0 bg-white/55 backdrop-blur-xl border border-white/70 rounded-full p-1.5"
          style={{
            boxShadow:
              "0 1px 3px rgba(14,14,14,0.06), 0 0 0 0.5px rgba(14,14,14,0.05)",
          }}
        >
          {navLinks.map((link) => {
            const active = isActive(link);
            return (
              <Link
                key={link.href}
                href={href(link.href)}
                onClick={(e) => handleNavClick(e, "id" in link ? link.id : undefined)}
                aria-current={active ? "page" : undefined}
                className={`relative font-outfit text-[14.5px] rounded-full px-3.5 xl:px-4 py-2 whitespace-nowrap transition-[color,background-color,box-shadow] duration-300 cursor-pointer ${
                  active
                    ? "font-semibold text-[#0E0E0E] bg-[linear-gradient(180deg,rgba(120,120,128,0.20)_0%,rgba(120,120,128,0.10)_100%)] backdrop-blur-md backdrop-saturate-150 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-1px_0_rgba(14,14,14,0.06),0_0_0_0.5px_rgba(14,14,14,0.10),0_2px_8px_-2px_rgba(14,14,14,0.14)]"
                    : "font-medium text-[#6E6E73] hover:text-[#0E0E0E] hover:bg-white/70"
                }`}
              >
                {t.nav[link.key]}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <LanguageSwitcher />
          <Link
            href={href("/contact")}
            onClick={(e) => handleNavClick(e)}
            className="hidden xl:inline-flex items-center gap-2.5 shrink-0 rounded-full pl-5 pr-1.5 py-1.5 bg-primary hover:bg-white font-outfit font-bold text-[14.5px] tracking-[-0.01em] text-[#0E0E0E] whitespace-nowrap cursor-pointer transition-colors duration-200 shadow-[0_0_20px_rgba(241,144,53,0.35)]"
          >
            {t.nav.startProject}
            <span className="inline-flex items-center justify-center w-[26px] h-[26px] rounded-full bg-[#0E0E0E] shrink-0">
              <ArrowIcon stroke="#FFFFFF" />
            </span>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 shrink-0 cursor-pointer"
            aria-label={t.nav.toggleMenu}
            aria-expanded={isOpen}
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
      </div>

      <div
        className={`xl:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out bg-white/90 backdrop-blur-2xl border-b border-[#E3E3E6] ${
          isOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col px-5 sm:px-9 py-4 gap-1">
          {navLinks.map((link) => {
            const active = isActive(link);
            return (
              <Link
                key={link.href}
                href={href(link.href)}
                onClick={(e) => handleNavClick(e, "id" in link ? link.id : undefined)}
                aria-current={active ? "page" : undefined}
                className={`flex items-center justify-between font-outfit text-[16px] text-left py-3 border-b border-[#E3E3E6] last:border-b-0 cursor-pointer ${
                  active ? "font-bold text-[#FF7A00]" : "font-medium text-[#0E0E0E]"
                }`}
              >
                {t.nav[link.key]}
                {active && <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00]" />}
              </Link>
            );
          })}
          <Link
            href={href("/contact")}
            onClick={(e) => handleNavClick(e)}
            className="mt-4 mb-2 inline-flex items-center justify-center gap-2.5 rounded-full py-3 bg-primary hover:bg-white font-outfit font-bold text-[15px] text-[#0E0E0E] cursor-pointer transition-colors duration-200"
          >
            {t.nav.startProject}
            <span className="inline-flex items-center justify-center w-[24px] h-[24px] rounded-full bg-[#0E0E0E] shrink-0">
              <ArrowIcon stroke="#FFFFFF" />
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
