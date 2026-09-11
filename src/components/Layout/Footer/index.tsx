"use client";

import React, { useState } from "react";
import { Mail, Phone, Facebook, Instagram, MapPin } from "lucide-react";
import Script from "next/script";
import PolicyModal from "../../ui/Modal/PolicyModal";

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

const navLinks = [
  { label: "Home", id: "top" },
  { label: "Services", id: "services" },
  { label: "Work", id: "projects" },
  { label: "Why us", id: "why" },
  { label: "Contact", id: "contact" },
];

const socials = [
  {
    icon: <Facebook size={17} />,
    href: "https://www.facebook.com/profile.php?id=61559932766757",
    label: "Facebook",
  },
  {
    icon: <Instagram size={17} />,
    href: "https://www.instagram.com/_gargari/",
    label: "Instagram",
  },
  {
    icon: <TikTokIcon size={17} />,
    href: "https://www.tiktok.com/@gargari_",
    label: "TikTok",
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [modalType, setModalType] = useState<"privacy" | "terms" | null>(null);

  const scrollToSection = (id: string) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
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
    <footer className="relative bg-[#0E0E0E] text-white">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-9 lg:px-[72px] pt-16 sm:pt-20 lg:pt-24 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12 lg:gap-8 pb-14 sm:pb-16 lg:pb-20 border-b border-white/10">
          <div className="flex flex-col gap-5">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("top");
              }}
              className="flex items-baseline gap-2.5 w-fit"
            >
              <svg
                width="26"
                height="20"
                viewBox="0 0 34 26"
                aria-hidden="true"
                className="self-center shrink-0"
              >
                <rect x="0" y="10" width="12" height="6" fill="#FF7A00" />
                <polygon
                  points="10,2 18,2 30,13 18,24 10,24 22,13"
                  fill="#FFFFFF"
                />
                <rect x="27" y="2" width="7" height="22" fill="#FFFFFF" />
              </svg>
              <span className="font-outfit font-extrabold text-[19px] tracking-[-0.035em] text-white">
                GarGari
              </span>
            </a>
            <p className="text-[14.5px] leading-[1.6] text-[#B9B6B3] max-w-[34ch]">
              A Tbilisi studio designing and building landing pages, web
              applications and online stores, small team, hand-built work, clear
              timelines.
            </p>
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/15 text-[#B9B6B3] hover:text-[#0E0E0E] hover:bg-primary hover:border-primary transition-colors duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6E6E73] mb-5">
              Navigation
            </h3>
            <ul className="flex flex-col gap-3.5">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-[14.5px] text-[#B9B6B3] hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6E6E73] mb-5">
              Contact
            </h3>
            <div className="flex flex-col gap-3.5">
              <a
                href="mailto:hello@gargari.ge"
                className="flex items-center gap-2.5 text-[14.5px] text-[#B9B6B3] hover:text-white transition-colors duration-200"
              >
                <Mail size={15} className="text-[#FF7A00] shrink-0" />
                hello@gargari.ge
              </a>
              <a
                href="tel:+995322000000"
                className="flex items-center gap-2.5 text-[14.5px] text-[#B9B6B3] hover:text-white transition-colors duration-200"
              >
                <Phone size={15} className="text-[#FF7A00] shrink-0" />
                +995 32 2 00 00 00
              </a>
              <div className="flex items-center gap-2.5 text-[14.5px] text-[#B9B6B3]">
                <MapPin size={15} className="text-[#FF7A00] shrink-0" />
                Rustaveli Ave, Tbilisi 0108
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6E6E73] mb-5">
              Get in touch
            </h3>
            <p className="text-[14.5px] leading-[1.6] text-[#B9B6B3]">
              Have an idea? Let&apos;s turn it into something real.
            </p>
          </div>
        </div>

        <div className="pt-7 flex flex-col sm:flex-row justify-between items-center gap-5">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#6E6E73]">
            © {currentYear} GarGari Studio
          </p>

          <div className="flex items-center gap-6 sm:gap-8">
            <button
              onClick={() => setModalType("privacy")}
              className="text-[11px] uppercase tracking-[0.14em] text-[#6E6E73] hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setModalType("terms")}
              className="text-[11px] uppercase tracking-[0.14em] text-[#6E6E73] hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Terms of Service
            </button>
            <div
              id="top-ge-counter-container"
              data-site-id="118478"
              className="opacity-50 hover:opacity-100 transition-opacity"
            />
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
