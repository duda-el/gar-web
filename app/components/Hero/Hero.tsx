"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Activity,
  Terminal,
  Sparkles,
  Globe,
  Zap,
  Box,
  Cpu,
} from "lucide-react";

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);
  const [randomPositions, setRandomPositions] = useState<
    { left: string; delay: number }[]
  >([]);

  useEffect(() => {
    setIsMounted(true);
    const positions = [...Array(15)].map(() => ({
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
    }));
    setRandomPositions(positions);
  }, []);

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
    }
  };

  return (
    <section className="relative min-h-screen w-full bg-[#0a0a0a] flex items-center overflow-hidden pt-[140px] pb-16">
      {/* --- BACKGROUND ANIMATIONS --- */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(#f19035_0.5px,transparent_0.5px)] [background-size:40px_40px] opacity-[0.05]" />

        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: [100, 400, 200, 500, 150],
              opacity: [0, 0.3, 0.1, 0.4, 0],
            }}
            transition={{ duration: 5, repeat: Infinity, delay: i * 0.4 }}
            style={{ left: `${i * 10}%`, bottom: "-50px" }}
            className="absolute w-[1px] bg-gradient-to-t from-primary via-primary/20 to-transparent"
          />
        ))}

        {isMounted &&
          randomPositions.map((pos, i) => (
            <motion.div
              key={`bit-${i}`}
              animate={{ y: [0, -600], opacity: [0, 1, 0], scale: [1, 1.5, 1] }}
              transition={{ duration: 4, repeat: Infinity, delay: pos.delay }}
              style={{ left: pos.left, bottom: "0", position: "absolute" }}
              className="size-1 bg-primary/40 blur-[0.5px] rounded-sm"
            />
          ))}
      </div>

      <div className="container mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* --- LEFT CONTENT SECTION --- */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-6 bg-white/[0.03] border border-white/5 px-4 py-2 rounded-full backdrop-blur-md"
            >
              <Terminal size={14} className="text-primary animate-pulse" />
              <span className="text-primary font-bold text-[10px] sm:text-xs uppercase tracking-[0.3em]">
                System Status: Ready to Build
              </span>
            </motion.div>

            <h1 className="text-[14vw] sm:text-[10vw] lg:text-[80px] font-black text-white leading-[1.2] lg:leading-[1.1] tracking-tighter">
              შეცვალე <br />
              <span className="text-primary italic inline-block relative group">
                მომავალი
              </span>{" "}
              <br />
              ჩვენთან ერთად
            </h1>

            <div className="mt-8 lg:mt-12 max-w-[480px]">
              <p className="text-white/70 text-base sm:text-lg leading-[1.7] font-medium border-l-2 border-primary/40 pl-6 bg-gradient-to-r from-primary/5 to-transparent py-4 rounded-r-xl">
                ჩვენ ვთავაზობთ კოპმანიებს გამორჩეული ციფრული სივრცის შექმნას.
                დიზაინი, დეველოპმენტი და სტრატეგია.
              </p>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                onClick={() => scrollToSection("projects")}
                className="group flex items-center justify-center gap-3 bg-primary text-black px-10 py-5 rounded-full font-bold transition-all hover:bg-white active:scale-95 text-base shadow-[0_0_30px_rgba(241,144,53,0.3)] cursor-pointer"
              >
                იხილე პროექტები
                <ArrowUpRight className="size-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="flex items-center justify-center px-10 py-5 rounded-full border border-white/20 text-white font-bold hover:bg-white/5 transition-all text-base backdrop-blur-sm cursor-pointer"
              >
                დაგვიკავშირდით
              </button>
            </div>
          </div>

          {/* --- RIGHT SIDE: PREMIUM INTERACTIVE CARD --- */}
          <div className="hidden lg:flex lg:col-span-5 relative justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative w-full max-w-[440px] aspect-[0.85/1] group perspective-1000"
            >
              {/* Outer Ambient Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/40 to-orange-500/40 rounded-[3.5rem] blur-2xl opacity-10 group-hover:opacity-30 transition-opacity duration-700" />

              {/* Card Container */}
              <div className="absolute inset-0 bg-[#0d0d0d] rounded-[2rem] border border-white/10 overflow-hidden z-20 shadow-2xl flex flex-col transition-all duration-500 group-hover:border-primary/30 group-hover:translate-y-[-8px]">
                {/* 1. Header Area */}
                <div className="h-14 border-b border-white/5 flex items-center justify-between px-8 bg-white/[0.02] backdrop-blur-md">
                  <div className="flex gap-1.5">
                    <div className="size-2.5 rounded-full bg-[#ff5f56]/30 border border-[#ff5f56]/40" />
                    <div className="size-2.5 rounded-full bg-[#ffbd2e]/30 border border-[#ffbd2e]/40" />
                    <div className="size-2.5 rounded-full bg-[#27c93f]/30 border border-[#27c93f]/40" />
                  </div>
                  <div className="flex items-center gap-2 text-[9px] font-bold text-white/30 tracking-[0.2em] uppercase">
                    <Globe
                      size={10}
                      className="animate-spin-slow text-primary/60"
                    />
                    Global Edge Protocol
                  </div>
                </div>

                <div className="flex-1 p-10 flex flex-col relative overflow-hidden">
                  {/* Visual Background Mesh */}
                  <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(241,144,53,0.08),transparent_70%)] pointer-events-none" />

                  {/* 2. Dynamic Central Visual */}
                  <div className="relative mb-8 flex justify-center">
                    <div className="relative size-24">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 12,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute inset-0 border-2 border-dashed border-primary/20 rounded-full"
                      />
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute -inset-3 border border-white/5 rounded-full"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="size-16 rounded-2xl bg-gradient-to-br from-primary to-[#ff6b00] flex items-center justify-center shadow-[0_0_40px_rgba(241,144,53,0.3)]">
                          <Sparkles className="size-8 text-black" />
                        </div>
                      </div>
                    </div>

                    <div className="absolute -right-6 top-0 bg-[#1a1a1a] border border-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-xl">
                      <Zap size={12} className="text-primary animate-pulse" />
                      <span className="text-[10px] font-bold text-white uppercase">
                        High-End
                      </span>
                    </div>
                  </div>

                  {/* 3. Text & Title */}
                  <div className="space-y-4 relative z-10 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="h-[1px] w-8 bg-primary" />
                      <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em]">
                        Studio Concept
                      </span>
                    </div>

                    <h2 className="text-white text-[44px] font-black tracking-tighter leading-[0.9] uppercase italic">
                      Digital <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">
                        Mastery
                      </span>
                    </h2>
                  </div>

                  {/* 4. FACEBOOK REVIEWS SECTION */}
                  <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                    <div className="flex flex-col gap-3">
                      <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em]">
                        Verified Reviews
                      </span>
                      <div className="flex -space-x-3">
                        {[
                          {
                            img: "https://randomuser.me/api/portraits/men/32.jpg",
                            name: "Client 1",
                          },
                          {
                            img: "https://randomuser.me/api/portraits/women/44.jpg",
                            name: "Client 2",
                          },
                          {
                            img: "https://randomuser.me/api/portraits/men/65.jpg",
                            name: "Client 3",
                          },
                        ].map((user, i) => (
                          <motion.a
                            key={i}
                            href="https://www.facebook.com/profile.php?id=61559932766757&sk=reviews"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -5, scale: 1.1, zIndex: 50 }}
                            className="relative size-10 rounded-full border-2 border-[#0d0d0d] overflow-hidden cursor-pointer bg-zinc-900"
                          >
                            <img
                              src={user.img}
                              alt={user.name}
                              className="size-full object-cover grayscale hover:grayscale-0 transition-all"
                            />
                          </motion.a>
                        ))}
                        <motion.a
                          href="https://www.facebook.com/profile.php?id=61559932766757&sk=reviews"
                          target="_blank"
                          whileHover={{ scale: 1.1 }}
                          className="size-10 rounded-full border-2 border-dashed border-white/10 bg-white/5 flex items-center justify-center text-white/40 hover:text-primary hover:border-primary/40 transition-all cursor-pointer"
                        >
                          <span className="text-[10px] font-bold">+12</span>
                        </motion.a>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
                        <div className="size-1.5 rounded-full bg-primary animate-ping" />
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                          Live Stats
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Animated Scanner Effect */}
                <motion.div
                  animate={{ top: ["-20%", "120%"] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 w-full h-24 bg-gradient-to-b from-transparent via-primary/5 to-transparent z-30 pointer-events-none"
                />
              </div>

              {/* Back Decor Layer */}
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-primary/10 rounded-full blur-[100px] -z-10" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
