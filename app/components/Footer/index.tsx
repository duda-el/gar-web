"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  ArrowUpRight,
  Github,
  Locate,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Facebook size={18} />, href: "#", label: "Facebook" },
    { icon: <Instagram size={18} />, href: "#", label: "Instagram" },
    { icon: <Linkedin size={18} />, href: "#", label: "LinkedIn" },
  ];

  const quickLinks = ["მთავარი", "პროექტები", "სერვისები", "ჩვენს შესახებ"];

  return (
    <footer className="relative bg-[#121212] pt-24 pb-12 px-6 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white tracking-tighter font-georgian italic">
              GAR<span className="text-primary italic">GARI</span>
            </h2>
            <p className="text-zinc-300 text-sm font-georgian leading-relaxed max-w-xs">
              ჩვენ ვქმნით ციფრულ გამოცდილებას, რომელიც ეხმარება ბიზნესს ზრდასა
              და განვითარებაში თანამედროვე სამყაროში.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ y: -3, color: "#f19035" }}
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-300 transition-colors border border-white/5"
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
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={`#${link}`}
                    aria-label={`Go to ${link}`}
                    className="text-zinc-300 hover:text-primary transition-colors text-sm font-georgian flex items-center group"
                  >
                    {link}
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-1 transition-all"
                    />
                  </a>
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
                href="mailto:hello@gargari.ge"
                aria-label="Contact us on Email"
                className="flex items-center gap-3 text-zinc-300 hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                  <Mail size={14} />
                </div>
                <span className="text-sm font-medium">info@gargari.com</span>
              </a>
              <div className="flex items-center gap-3 text-zinc-300">
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
            {/* <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-primary text-black font-bold rounded-2xl text-xs uppercase tracking-widest transition-transform font-georgian"
            >
              დაიწყე პროექტი
            </motion.button> */}
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-400 text-[10px] uppercase tracking-[0.2em] font-bold">
            © {currentYear} GARGARI STUDIO. ყველა უფლება დაცულია.
          </p>
          <div className="flex gap-8">
            <a
              href="#"
              aria-label="Privacy Policy"
              className="text-zinc-400 hover:text-zinc-300 text-[10px] uppercase tracking-widest font-bold transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              aria-label="Terms of Service"
              className="text-zinc-400 hover:text-zinc-300 text-[10px] uppercase tracking-widest font-bold transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
