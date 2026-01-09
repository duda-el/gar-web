"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/gargari-logo.svg";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "სერვისები", href: "#services" },
    { name: "პროექტები", href: "#projects" },
    { name: "ჩვენს შესახებ", href: "#about" },
    { name: "დაგვიკავშირდით", href: "#contact" },
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

      {/* 2. Main Navigation Bar */}
      {/* Change: Used flex on mobile to push logo and burger to edges, grid on desktop */}
      <nav className="bg-[#191919] px-4 md:px-12 py-6 flex md:grid md:grid-cols-[1fr_2fr_1fr] justify-between items-center border-b border-white/5 relative z-[110]">
        
        {/* LEFT: Logo */}
        <div className="flex justify-start">
          <Link href="/" onClick={() => setIsOpen(false)}>
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

        {/* MIDDLE: Desktop Links */}
        <div className="hidden md:flex justify-center px-4">
          <ul className="flex gap-10 text-white/95 text-[15px] font-semibold tracking-wide whitespace-nowrap">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="hover:text-[#F19035] transition-all"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT: GB + Burger */}
        <div className="flex items-center justify-end gap-6">
          <div className="hidden md:block font-bold text-white text-sm">GB</div>

          {/* Burger icon now pushed to the far right via justify-between on parent */}
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

      {/* 3. Mobile Menu Overlay */}
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
          {/* Menu links are now text-2xl and font-semibold for a smaller look */}
          <ul className="flex flex-col gap-6 mt-20">
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

          <div className="flex justify-between items-center text-white/40 text-xs tracking-widest pb-4">
            <span>© 2026</span>
            <span className="text-white font-bold text-base">GB</span>
          </div>
        </div>
      </div>
    </header>
  );
}