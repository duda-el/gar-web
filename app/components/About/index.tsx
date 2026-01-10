"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Rocket, Target, Zap, Cpu, ShieldCheck, Globe } from "lucide-react";
import Image from "next/image";
// import groupPhoto from "../../Assets/images/group.jpg";

const stats = [
  {
    label: "დასრულებული პროექტი",
    value: "10+",
    icon: <Zap className="size-5 text-primary" />,
  },
  {
    label: "კმაყოფილი კლიენტი",
    value: "30+",
    icon: <Target className="size-5 text-primary" />,
  },
  {
    label: "წელი ბაზარზე",
    value: "2+",
    icon: <Rocket className="size-5 text-primary" />,
  },
];

const About = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
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
    <section
      className="relative py-32 px-6 overflow-hidden bg-[#0a0a0a]"
      id="about"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] opacity-50" />

        {isMounted &&
          [...Array(100)].map((_, i) => (
            <motion.div
              key={`about-bit-${i}`}
              animate={{ y: [0, -400], opacity: [0, 0.5, 0] }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
              style={{ left: `${Math.random() * 100}%`, bottom: "-20px" }}
              className="absolute size-1 bg-primary/30 rounded-full"
            />
          ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-4 border border-primary/10 rounded-[3rem] pointer-events-none" />

            <div className="relative z-10 rounded-[2.5rem] overflow-hidden border border-white/5 bg-[#141414] p-3 shadow-2xl">
              <div className="bg-[#1c1c1c] rounded-[2rem] aspect-square flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 z-0">
                  {/* <Image
                    src={groupPhoto}
                    alt="Gargari Team"
                    fill
                    className="object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                    placeholder="blur"
                  /> */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
                </div>

                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute w-[80%] h-[80%] border border-primary/20 rounded-full z-10 opacity-40"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full shadow-[0_0_15px_#f19035]" />
                </motion.div>

                <div className="relative z-20 text-center space-y-4">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-primary text-5xl"
                  >
                    ✦
                  </motion.div>
                </div>

                <div className="absolute bottom-8 left-8 z-20 flex items-center gap-3">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-primary/60 font-mono uppercase tracking-tighter">
                      System.Status
                    </span>
                    <span className="text-xs text-white/80 font-mono uppercase">
                      Online & Active
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -right-8 p-8 bg-[#1a1a1a] border border-primary/20 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl z-30"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                  <ShieldCheck className="size-8" />
                </div>
                <div>
                  <p className="text-white font-bold text-2xl">100%</p>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest font-mono">
                    Quality Assurance
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-4 px-4 py-2 rounded-full bg-primary/5 border border-primary/10">
                <div className="size-2 bg-primary rounded-full animate-pulse" />
                <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold">
                  About the GarGari
                </p>
              </div>

              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] text-white">
                ჩვენ ვქმნით <span className="text-primary italic">ციფრულ</span>
                <br />
                ეკოსისტემებს
              </h2>

              <p className="text-zinc-300 leading-relaxed text-lg max-w-xl">
                გარგარი სტუდია არ არის უბრალოდ სააგენტო — ეს არის ტექნოლოგიური
                ლაბორატორია, სადაც რთული იდეები იქცევა დახვეწილ ციფრულ
                გადაწყვეტილებებად. ჩვენი კოდი არის ხიდი თქვენს ხედვასა და
                რეალობას შორის.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="p-6 bg-[#141414] border border-white/5 rounded-[2rem] hover:border-primary/30 transition-all duration-300 relative group overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4">{stat.icon}</div>
                  <h2 className="text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </h2>
                  <p className="text-[10px] text-zinc-300 uppercase tracking-widest font-bold leading-tight">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-10 py-5 bg-primary text-black font-bold rounded-2xl overflow-hidden transition-all"
              onClick={() => scrollToSection("contact")}
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
              <span className="relative z-10 flex items-center gap-3 text-xs tracking-[0.2em] uppercase">
                დაგვიკავშირდით <Globe className="size-4" />
              </span>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
