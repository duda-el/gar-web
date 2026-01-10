"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/gargari-logo.svg";
import { motion } from "framer-motion";
import { label } from "framer-motion/client";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "სერვისები", href: "#services", label: "Services" },
    { name: "პროექტები", href: "#projects", label: "Projects" },
    { name: "ჩვენს შესახებ", href: "#about", label: "About Us" },
    { name: "დაგვიკავშირდით", href: "#contact", label: "Contact Us" },
  ];

  return (
    <header className="w-full fixed top-0 z-[100] font-georgian">
      {/* 1. Orange Ticker Bar */}
      <div className="bg-primary overflow-hidden py-2 border-b border-black/10 relative z-[110]">
        <div className="animate-marquee flex items-center">
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className="text-[#191919] font-bold text-[13px] uppercase tracking-wider mx-4 whitespace-nowrap"
            >
              თქვენი თანამგზავრი ციფრულ სამყაროში ✦
            </span>
          ))}
        </div>
      </div>

      <nav className="bg-[#191919] px-4 md:px-12 py-6 flex md:grid md:grid-cols-[1fr_2fr_1fr] justify-between items-center border-b border-white/5 relative z-[110]">
        <div className="flex justify-start">
          <Link href="/" onClick={() => setIsOpen(false)} aria-label="Logo">
            <Image
              src={Logo}
              alt="Garagaris Logo"
              width={100}
              height={28}
              priority
              className="h-auto w-32 md:w-40"
            />
          </Link>
        </div>

        <div className="hidden md:flex justify-center px-4">
          <ul className="flex gap-10 text-white/95 text-[15px] font-semibold tracking-wide whitespace-nowrap">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  aria-label={link.label}
                  className="hover:text-[#F19035] transition-all"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-end gap-6">
          <div className="hidden md:block font-bold text-white text-sm">EN</div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 z-[120] relative"
            aria-label="Toggle Menu"
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-1.5" : "-translate-y-1"
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 my-1 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-1.5" : "translate-y-1"
              }`}
            />
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[105] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`fixed right-0 top-0 h-full w-[80%] max-w-[320px] bg-[#191919] z-[106] p-8 transition-transform duration-500 ease-in-out border-l border-white/5 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full justify-between">
          <ul className="flex flex-col gap-6 mt-30">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-white text-md font-semibold hover:text-[#F19035] transition-colors inline-block"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="absolute bottom-0 left-0 w-full h-[70%] pointer-events-none overflow-hidden">
            {/* 1. Subtle Background Grid (Tech vibe-ისთვის) */}
            {/* <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  "linear-gradient(#f19035 1px, transparent 1px), linear-gradient(90deg, #f19035 1px, transparent 1px)",
                // size: "20px 20px",
                backgroundSize: "30px 30px",
              }}
            /> */}

            {[...Array(15)].map((_, i) => (
              <div
                key={`col-group-${i}`}
                className="absolute bottom-0"
                style={{ left: `${i * 7 + 3}%` }}
              >
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: [40, 220, 120, 280, 60],
                    opacity: [0, 0.6, 0.3, 0.7, 0],
                  }}
                  transition={{
                    duration: Math.random() * 3 + 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.1,
                  }}
                  className="w-[1.5px] bg-gradient-to-t from-primary/60 via-primary to-transparent"
                />

                <motion.div
                  animate={{ y: [0, -300], opacity: [0, 1, 0] }}
                  transition={{
                    duration: Math.random() * 2 + 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                  className="size-1 bg-primary absolute left-[-1.25px] blur-[1px]"
                />
              </div>
            ))}

            {[...Array(10)].map((_, i) => (
              <motion.div
                key={`scanner-${i}`}
                initial={{ x: "-100%" }}
                animate={{ x: "100%", opacity: [0, 0.4, 0] }}
                transition={{
                  duration: Math.random() * 4 + 4,
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: "linear",
                }}
                style={{ bottom: `${i * 10}%` }}
                className={`absolute w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent ${
                  i % 3 === 0 ? "h-[2px] blur-[1px]" : "h-[0.5px]"
                }`}
              />
            ))}

            {/* 4. Floating Tech Dust (პატარა წერტილები ჰაერში) */}
            {/* {[...Array(20)].map((_, i) => (
              <motion.div
                key={`dust-${i}`}
                initial={{ opacity: 0, y: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: -100,
                  x: Math.random() * 20 - 10,
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  bottom: `${Math.random() * 40}%`,
                }}
                className="absolute size-[2px] bg-primary rounded-full blur-[0.5px]"
              />
            ))} */}

            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
            <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b to-transparent" />
          </div>

          <div className="flex justify-between items-center text-white/40 text-xs tracking-widest pb-4">
            <span>© 2026</span>
            <span className="text-white font-bold text-base">EN</span>
          </div>
        </div>
      </div>
    </header>
  );
}
