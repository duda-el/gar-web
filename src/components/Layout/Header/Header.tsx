"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/Assets/gargari-logo.svg";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = currentTime?.getHours() ?? 0;
  const isOnline = hours >= 10 && hours < 24;

  const timeString = currentTime
    ? currentTime.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "--:--";

  const dateString = currentTime
    ? currentTime
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
        })
        .toUpperCase()
    : "--- --";

  const navLinks = [
    { name: "სერვისები", id: "services", label: "Services" },
    { name: "პროექტები", id: "projects", label: "Projects" },
    { name: "ჩვენს შესახებ", id: "about", label: "About Us" },
    { name: "დაგვიკავშირდით", id: "contact", label: "Contact Us" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      window.history.pushState(null, "", `/${id}`);
    }
    setIsOpen(false);
  };

  return (
    <header className="w-full fixed top-0 z-[100] font-georgian">
      <div className="bg-primary overflow-hidden py-2 border-b border-black/10 relative z-[110]">
        <div className="animate-marquee flex items-center">
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className="text-[#191919] font-bold text-[13px] uppercase tracking-wider mx-4 whitespace-nowrap"
            >
              ✦ თქვენი თანამგზავრი ციფრულ სამყაროში ✦
            </span>
          ))}
        </div>
      </div>

      <nav className="bg-[#191919] px-4 md:px-8 lg:px-12 py-6 flex md:grid md:grid-cols-[1fr_2fr_1fr] justify-between items-center border-b border-white/5 relative z-[110]">
        <div className="flex justify-start">
          <Link href="/" onClick={() => setIsOpen(false)} aria-label="Logo">
            <Image
              src={Logo}
              alt="Garagaris Logo"
              width={100}
              height={28}
              className="h-auto w-32 md:w-40 cursor-pointer"
            />
          </Link>
        </div>

        <div className="hidden md:flex justify-center px-4">
          <ul className="flex md:gap-6 lg:gap-10 text-white/95 md:text-[12px] lg:text-[15px] font-semibold tracking-wide whitespace-nowrap">
            {navLinks.map((link) => (
              <li key={link.name}>
                <button
                  onClick={() => scrollToSection(link.id)}
                  aria-label={link.label}
                  className="hover:text-primary transition-all cursor-pointer bg-transparent border-none"
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-end gap-6">
          <div className="hidden md:flex items-center gap-4 font-mono text-xs tracking-widest">
            {mounted && (
              <>
                <div className="flex flex-col items-end text-zinc-400">
                  <span className="text-primary font-bold">{timeString}</span>
                  <span className="text-[10px] text-gray-300">
                    {dateString}
                  </span>
                </div>

                <div className="w-[1px] h-8 bg-white/10" />

                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                  <div
                    className={`size-1.5 rounded-full animate-pulse ${
                      isOnline
                        ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                        : "bg-primary shadow-[0_0_8px_rgba(241,144,53,0.6)]"
                    }`}
                  />
                  <span
                    className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
                      isOnline ? "text-green-500" : "text-primary"
                    }`}
                  >
                    {isOnline ? "Online" : "Standby"}
                  </span>
                </div>
              </>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 z-[120] relative cursor-pointer"
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
        className={`fixed right-0 top-0 h-full w-[80%] max-w-[320px] bg-[#191919] z-[106] p-8 transition-transform duration-500 ease-in-out border-l border-white/5 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full justify-between">
          <ul className="flex flex-col gap-6 mt-32">
            {navLinks.map((link) => (
              <li key={link.name}>
                <button
                  onClick={() => scrollToSection(link.id)}
                  className="text-white text-xl font-semibold hover:text-primary transition-colors text-left w-full cursor-pointer"
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>

          <div className="relative z-10 flex flex-col gap-1 pb-4">
            <div className="w-full h-[1px] bg-white/5 mb-6" />

            {mounted && (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className={`size-2 rounded-full ${
                      isOnline ? "bg-green-500" : "bg-primary"
                    }`}
                  />
                  <span
                    className={`text-xs font-bold uppercase tracking-widest ${
                      isOnline ? "text-green-500" : "text-primary"
                    }`}
                  >
                    System {isOnline ? "Online" : "Standby"}
                  </span>
                </div>

                <div className="flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-3xl tracking-tighter">
                      {timeString}
                    </span>
                    <span className="text-zinc-400 text-[10px] tracking-widest uppercase">
                      {dateString}
                    </span>
                  </div>
                  <span className="text-white/70 text-xs tracking-widest italic">
                    © 2026
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}