"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Activity, Cpu, Terminal, Sparkles } from "lucide-react";

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  });
  return (
    <section className="relative min-h-screen w-full bg-[#0a0a0a] flex items-center overflow-hidden pt-[140px] pb-16">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#f19035_0.5px,transparent_0.5px)] [background-size:40px_40px] opacity-[0.05]" />

        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: [100, 400, 200, 500, 150],
              opacity: [0, 0.3, 0.1, 0.4, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 4,
              repeat: Infinity,
              delay: i * 0.4,
            }}
            style={{ left: `${i * 10}%`, bottom: "-50px" }}
            className="absolute w-[1px] bg-gradient-to-t from-primary via-primary/20 to-transparent"
          />
        ))}

        {/* 3. Floating Data Bits (კვადრატები, რომლებიც ხაზებზე დაცურავენ) */}
        {isMounted &&
          [...Array(15)].map((_, i) => (
            <motion.div
              key={`bit-${i}`}
              animate={{
                y: [0, -600],
                opacity: [0, 1, 0],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 3,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                bottom: "0",
                position: "absolute",
              }}
              className="size-1 bg-primary/40 blur-[0.5px] rounded-sm"
            />
          ))}
        {/* 4. Horizontal Scanner Lines */}
        <motion.div
          animate={{ y: ["0%", "100%"], opacity: [0, 0.2, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-full h-[2px] bg-primary/30 blur-sm z-10"
        />
      </div>

      <div className="container mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-8 flex flex-col items-start">
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-6 group cursor-default bg-white/[0.03] border border-white/5 px-4 py-2 rounded-full backdrop-blur-md"
            >
              <Terminal size={14} className="text-primary animate-pulse" />
              <span className="text-primary font-bold text-[10px] sm:text-xs uppercase tracking-[0.3em]">
                System Status: Ready to Build
              </span>
            </motion.div>

            <h1 className="text-[14vw] sm:text-[10vw] lg:text-[80px] font-black text-white leading-[1.2] lg:leading-[1.1] tracking-tighter">
              შექმენი <br />
              <span className="text-primary italic inline-block relative group">
                მომავალი
              </span>{" "}
              <br />
              ჩვენთან ერთად
            </h1>

            <div className="mt-8 lg:mt-12 max-w-[480px]">
              <p className="text-white/60 text-base sm:text-lg leading-[1.7] font-medium border-l-2 border-primary/40 pl-6 bg-gradient-to-r from-primary/5 to-transparent py-4 rounded-r-xl">
                ჩვენ ვეხმარებით ბრენდებს გამორჩეული ციფრული გამოცდილების
                შექმნაში. დიზაინი, დეველოპმენტი და სტრატეგია.
              </p>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href="#projects"
                className="group flex items-center justify-center gap-3 bg-primary text-black px-10 py-5 rounded-full font-bold transition-all hover:bg-white active:scale-95 text-base shadow-[0_0_30px_rgba(241,144,53,0.3)]"
              >
                ნახე პროექტები
                <ArrowUpRight className="size-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>

              <Link
                href="#contact"
                className="flex items-center justify-center px-10 py-5 rounded-full border border-white/20 text-white font-bold hover:bg-white/5 transition-all text-base backdrop-blur-sm"
              >
                დაგვიკავშირდით
              </Link>
            </div>
          </div>

          {/* Right Tech Card Section */}
          <div className="hidden lg:flex lg:col-span-4 relative justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-[420px] aspect-[4/5] group"
            >
              {/* Main Card */}
              <div className="absolute inset-0 bg-[#0d0d0d] rounded-[3rem] border border-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden z-20 transition-transform duration-500 group-hover:-translate-y-2">
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                <div className="absolute inset-0 p-12 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                      <Sparkles className="size-8 text-primary animate-pulse" />
                    </div>
                    <div className="text-right">
                      <p className="text-primary font-mono text-[10px] tracking-widest">
                        UNIT_01
                      </p>
                      <p className="text-white/20 font-mono text-[8px]">
                        GARGARI_LABS
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Activity size={14} className="text-primary/60" />
                        <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold">
                          Latency: 12ms
                        </p>
                      </div>
                      <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
                        <motion.div
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="absolute inset-0 w-1/2 bg-primary/50"
                        />
                      </div>
                    </div>
                    <h3 className="text-white text-3xl font-black tracking-tight leading-tight uppercase italic">
                      Digital <br /> High-End <br /> Solutions
                    </h3>
                  </div>
                </div>

                {/* Card Glint Effect */}
                <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent -rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
              </div>

              {/* Secondary Layer Border */}
              <div className="absolute -bottom-6 -left-6 w-full h-full border border-primary/20 rounded-[3rem] z-10 transition-all duration-500 group-hover:scale-105" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 opacity-30">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent"
        />
        <span className="text-[10px] text-white uppercase tracking-[0.4em]">
          Initialize Scroll
        </span>
      </div>
    </section>
  );
}
