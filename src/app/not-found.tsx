"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Home, RefreshCcw, Ghost, Sparkles, Terminal } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full bg-[#0a0a0a] flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Ghosts */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`ghost-${i}`}
            className="absolute text-primary/20"
            initial={{
              x: Math.random() * 100 + "vw",
              y: Math.random() * 100 + "vh",
              opacity: 0,
            }}
            animate={{
              x: [Math.random() * 100 + "vw", Math.random() * 100 + "vw"],
              y: [Math.random() * 100 + "vh", Math.random() * 100 + "vh"],
              opacity: [0, 0.4, 0],
              scale: [0.5, 1.2, 0.8],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Ghost size={Math.random() * 40 + 20} strokeWidth={1} />
          </motion.div>
        ))}

        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute size-1 bg-primary/30 blur-[1px] rounded-full"
            animate={{
              y: [0, -window.innerHeight],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{ left: Math.random() * 100 + "%", bottom: "-10%" }}
          />
        ))}
      </div>

      <div className="relative z-20 flex flex-col items-center">
        <div className="relative mb-6">
          <motion.div
            animate={{
              rotate: [0, -2, 2, 0],
              y: [0, -10, 0],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center justify-center"
          >
            <h1 className="text-[30vw] md:text-[250px] font-black text-white/5 leading-none select-none italic">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-primary/10 p-8 rounded-full border border-primary/20 backdrop-blur-sm"
              >
                <Ghost size={80} className="text-primary animate-bounce" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="text-center px-6">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "fit-content" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="overflow-hidden whitespace-nowrap mx-auto border-r-2 border-primary pr-2 pb-4" // დავამატე pb-4
          >
            <h2 className="text-4xl md:text-7xl font-black text-white uppercase italic leading-[1.2] py-2">
              უფსს <span className="text-primary">დაიკარგე</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 text-zinc-400 text-sm md:text-lg max-w-lg mx-auto font-medium"
          >
            ეს გვერდი არ არსებობს ციფრულ სივრცეში. <br />
            ჩვენი მოჩვენებები დაგეხმარებიან უკან დაბრუნებაში.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-12 flex flex-col sm:flex-row gap-6"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center cursor-pointer justify-center gap-3 bg-primary text-black px-10 py-5 rounded-2xl font-bold transition-all shadow-[0_0_30px_rgba(241,144,53,0.3)]"
            >
              <Home size={20} />
              მთავარზე დაბრუნება
            </motion.button>
          </Link>

          <motion.button
            onClick={() => window.location.reload()}
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center cursor-pointer  gap-3 bg-white/5 border border-white/10 text-white px-10 py-5 rounded-2xl font-bold backdrop-blur-md hover:bg-white/10 transition-all"
          >
            <RefreshCcw size={20} />
            თავიდან ცდა
          </motion.button>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-10 flex items-center gap-3 opacity-30">
        <div className="size-2 bg-primary rounded-full animate-ping" />
        <span className="text-xs text-white font-mono tracking-widest uppercase">
          Scanning for signals...
        </span>
      </div>

      <div className="absolute top-10 right-10 opacity-20 hidden md:block">
        <Terminal className="text-primary" size={40} />
      </div>

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </section>
  );
}
