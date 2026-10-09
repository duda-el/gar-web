"use client";

import React, { useCallback, useState } from "react";
import { Mail, Phone, Facebook, Instagram, MapPin } from "lucide-react";
import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import PolicyModal from "../../ui/Modal/PolicyModal";
import type { PolicyType } from "@/constants/policies";
import gargariLogo from "@/Assets/images/gargari-logo-white.png";
import { useI18n } from "@/i18n/I18nProvider";
import { stripLocale } from "@/i18n/config";

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
  { key: "home", href: "/", id: "top" },
  { key: "services", href: "/services" },
  { key: "projects", href: "/projects" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

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
  const [modalType, setModalType] = useState<PolicyType | null>(null);
  const { t, href } = useI18n();
  const isHome = stripLocale(usePathname()) === "/";

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

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id?: string
  ) => {
    if (id && isHome) {
      e.preventDefault();
      scrollToSection(id);
    }
  };

  const closeModal = useCallback(() => setModalType(null), []);

  return (
    <footer className="relative bg-[#0E0E0E] text-white">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-9 lg:px-[72px] pt-16 sm:pt-20 lg:pt-24 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12 lg:gap-8 pb-14 sm:pb-16 lg:pb-20 border-b border-white/10">
          <div className="flex flex-col gap-5">
            <Link
              href={href("/")}
              aria-label={t.nav.homeAria}
              onClick={(e) => handleNavClick(e, "top")}
              className="flex items-center w-fit"
            >
              <Image src={gargariLogo} alt="GarGari" className="h-9 w-auto" />
            </Link>
            <p className="text-[14.5px] leading-[1.6] text-[#B9B6B3] max-w-[34ch]">
              {t.footer.about}
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
              {t.footer.navigation}
            </h3>
            <ul className="flex flex-col gap-3.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={href(link.href)}
                    onClick={(e) => handleNavClick(e, "id" in link ? link.id : undefined)}
                    className="text-[14.5px] text-[#B9B6B3] hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    {t.nav[link.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6E6E73] mb-5">
              {t.footer.contact}
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
                {t.footer.address}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6E6E73] mb-5">
              {t.footer.getInTouch}
            </h3>
            <p className="text-[14.5px] leading-[1.6] text-[#B9B6B3]">
              {t.footer.getInTouchText}
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
              {t.footer.privacy}
            </button>
            <button
              onClick={() => setModalType("terms")}
              className="text-[11px] uppercase tracking-[0.14em] text-[#6E6E73] hover:text-white transition-colors duration-200 cursor-pointer"
            >
              {t.footer.terms}
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

      <PolicyModal type={modalType} onClose={closeModal} />
    </footer>
  );
};

export default Footer;
