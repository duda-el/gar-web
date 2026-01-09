"use client";

import React from "react";
import { motion } from "framer-motion";
import { Rocket, Target, Zap } from "lucide-react";

const stats = [
  {
    label: "დასრულებული პროექტი",
    value: "50+",
    icon: <Zap className="size-5 text-primary" />,
  },
  {
    label: "კმაყოფილი კლიენტი",
    value: "30+",
    icon: <Target className="size-5 text-primary" />,
  },
  {
    label: "წელი ბაზარზე",
    value: "3+",
    icon: <Rocket className="size-5 text-primary" />,
  },
];

const About = () => {
  return (
    <section
      className="relative py-24 px-6 overflow-hidden bg-[#121212]"
      id="about"
    >
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#1c1c1c] p-2">
              <div className="bg-[#252525] rounded-[2rem] aspect-square flex items-center justify-center relative overflow-hidden">
                <motion.div
                  animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute w-2/3 h-2/3 border border-primary/20 rounded-full flex items-center justify-center"
                >
                  <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
                </motion.div>
                <h3 className="text-8xl font-bold text-white opacity-10 select-none">
                  GARAGARI
                </h3>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-primary text-6xl">✦</div>
                </div>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 md:right-0 p-6 bg-[#1c1c1c] border border-primary/30 rounded-3xl shadow-2xl backdrop-blur-md z-20"
            >
              <p className="text-primary font-bold text-2xl font-georgian">
                100%
              </p>
              <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">
                ხარისხის გარანტია
              </p>
            </motion.div>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-[1px] bg-primary" />
                <p className="text-sm uppercase tracking-[0.2em] text-primary font-medium font-georgian">
                  ჩვენს შესახებ
                </p>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold tracking-tighter leading-tight text-white font-georgian">
                ჩვენ ვქმნით <span className="text-primary italic">ციფრულ</span>{" "}
                მომავალს
              </h2>
              <p className="text-zinc-400 font-georgian leading-relaxed text-lg">
                გარგარი სტუდია არის ტექნოლოგიური გუნდი, რომელიც ორიენტირებულია
                ინოვაციური ვებ-გადაწყვეტილებების შექმნაზე. ჩვენი მიზანია
                ბიზნესებს დავეხმაროთ ციფრულ ტრანსფორმაციაში.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
              }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.2 },
                    },
                  }}
                  className="p-6 bg-[#1c1c1c]/50 border border-white/5 rounded-3xl hover:border-primary/20 transition-colors group"
                >
                  <div className="mb-3 group-hover:scale-110 transition-transform duration-200">
                    {stat.icon}
                  </div>
                  <h4 className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </h4>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold font-georgian">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-black font-bold rounded-full text-xs tracking-widest uppercase hover:bg-primary transition-colors duration-200 font-georgian"
            >
              გაიგე მეტი
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
