"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Globe } from "lucide-react";
import Image from "next/image";
import groupPhoto from "@/Assets/images/garagari-boys.jpg";

const features = [
  {
    title: "მომხმარებელზე ორიენტირებული UI/UX",
    description:
      "თანამედროვე დიზაინი, რომელიც მაქსიმალურად ზრდის მომხმარებლის ჩართულობას.",
  },
  {
    title: "ინოვაციური არქიტექტურა",
    description:
      "ვქმნით მასშტაბირებად სისტემებს, რომლებიც მზად არიან მომავლის გამოწვევებისთვის.",
  },
  {
    title: "ინდივიდუალური მიდგომა",
    description:
      "არ ვიყენებთ შაბლონებს. ყველა ფუნქციონალი იქმნება სპეციალურად თქვენი ბიზნეს საჭიროებებისთვის.",
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
      className="relative pb-8 py-10 sm:py-24 sm:py-32 px-6 overflow-hidden bg-[#0a0a0a]"
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
                  <Image
                    src={groupPhoto}
                    alt="Gargari"
                    fill
                    className="object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                    placeholder="blur"
                  />
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
              className="hidden sm:block absolute -bottom-8 -right-4 lg:-right-8 p-8 bg-[#1a1a1a] border border-primary/20 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl z-30"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                  <ShieldCheck className="size-8" />
                </div>
                <div>
                  <p className="text-white font-bold text-2xl">100%</p>
                  <p className="text-zinc-400 text-[10px] uppercase tracking-widest font-mono">
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

              <h2 className="text-5xl md:text-7xl max-[400px]:text-3xl font-bold tracking-tighter leading-[1.1] text-white">
                ჩვენ ვქმნით <span className="text-primary italic">ციფრულ</span>
                <br />
                ეკოსისტემებს
              </h2>

              <p className="text-zinc-300 leading-relaxed text-sm sm:text-lg max-w-xl">
                ჩვენი გუნდი უზრუნველყოფს სრულ ტექნიკურ მხარდაჭერას:
                ვებ-გვერდების დეველოპმენტს, გრაფიკულ დიზაინს და UI/UX
                არქიტექტურას. ჩვენ ვქმნით პროდუქტს, რომლებიც თქვენს ბიზნესს
                რეალურ შედეგებს მოუტანს.
              </p>
            </motion.div>

            <div className="space-y-8 relative">
              <div className="absolute left-[11px] top-2 bottom-2 w-[1px] bg-gradient-to-b from-primary/50 via-primary/10 to-transparent" />

              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-6 group"
                >
                  <div className="relative z-10">
                    <div className="size-[22px] rounded-full bg-[#0a0a0a] border border-primary/50 flex items-center justify-center group-hover:border-primary transition-colors">
                      <div className="size-1.5 bg-primary rounded-full group-hover:scale-150 transition-transform" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-white font-bold text-lg group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative cursor-pointer px-10 py-5 bg-primary text-black font-bold rounded-2xl overflow-hidden transition-all"
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