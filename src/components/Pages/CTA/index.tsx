"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

type CTAProps = {
  className?: string;
};

type ShapeType = "triangle" | "square" | "circle" | "cross";

const shapes: {
  type: ShapeType;
  position: string;
  size: number;
  rotate: number;
  opacity: number;
  duration: number;
  delay: number;
}[] = [
  { type: "triangle", position: "top-[10%] left-[6%]", size: 32, rotate: -15, opacity: 0.55, duration: 6, delay: 0 },
  { type: "square", position: "top-[14%] right-[9%]", size: 24, rotate: 20, opacity: 0.45, duration: 7, delay: 0.4 },
  { type: "circle", position: "bottom-[16%] left-[9%]", size: 20, rotate: 0, opacity: 0.5, duration: 5.5, delay: 0.8 },
  { type: "cross", position: "bottom-[12%] right-[7%]", size: 28, rotate: 10, opacity: 0.5, duration: 6.5, delay: 0.2 },
  { type: "triangle", position: "top-[46%] left-[3%]", size: 16, rotate: 40, opacity: 0.32, duration: 8, delay: 1 },
  { type: "circle", position: "top-[52%] right-[4%]", size: 14, rotate: 0, opacity: 0.32, duration: 7.5, delay: 0.6 },
  { type: "square", position: "bottom-[6%] left-[38%]", size: 14, rotate: -10, opacity: 0.28, duration: 6, delay: 1.2 },
  { type: "cross", position: "top-[8%] left-[46%]", size: 16, rotate: -6, opacity: 0.26, duration: 7, delay: 1.6 },
];

function ShapeIcon({ type }: { type: ShapeType }) {
  switch (type) {
    case "triangle":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <polygon points="12,3 21,20 3,20" fill="none" stroke="#FF7A00" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      );
    case "square":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="#FF7A00" strokeWidth="1.8" />
        </svg>
      );
    case "circle":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <circle cx="12" cy="12" r="9" fill="none" stroke="#FF7A00" strokeWidth="1.8" />
        </svg>
      );
    case "cross":
      return (
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <path d="M6 6L18 18M18 6L6 18" stroke="#FF7A00" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
  }
}

function GeoShapes() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className={`absolute ${shape.position}`}
          style={{ width: shape.size, height: shape.size, opacity: shape.opacity }}
          initial={{ rotate: shape.rotate, y: 0 }}
          animate={{ y: [0, -8, 0], rotate: [shape.rotate, shape.rotate + 6, shape.rotate] }}
          transition={{ duration: shape.duration, delay: shape.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <ShapeIcon type={shape.type} />
        </motion.div>
      ))}
    </div>
  );
}

const CTA = ({ className }: CTAProps) => {
  const ref = useRef(null);

  const bottomAnimation = {
    initial: { y: "5%", opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 1, delay: 0.2 },
  };

  return (
    <section className={className}>
      <div className="sm:py-20 py-8">
        <div className="max-w-[1440px] mx-auto sm:px-12 lg:px-16 px-4">
          <div
            ref={ref}
            className="relative overflow-hidden min-h-96 flex items-center justify-center px-6 border border-[#E3E3E6] rounded-3xl"
          >
            <GeoShapes />

            <motion.div
              {...bottomAnimation}
              className="relative z-[1] flex flex-col gap-6 items-center mx-auto"
            >
              <div className="flex flex-col gap-3 items-center text-center">
                <h2 className="font-outfit font-extrabold text-[#0E0E0E] tracking-[-0.03em] text-3xl md:text-5xl leading-[1.08]">
                  Innovative solutions for bold brands
                </h2>
                <p className="max-w-2xl mx-auto text-[#4A4A4E] text-[16px] leading-[1.6]">
                  Looking to elevate your brand? We craft immersive experiences
                  that captivate, engage, and make your business unforgettable
                  in every interaction.
                </p>
              </div>
              <Link
                href="/contact"
                className="group relative inline-flex items-center rounded-full h-12 p-1 ps-6 pe-14 font-outfit font-semibold text-[15px] text-[#0E0E0E] bg-primary hover:bg-white w-fit overflow-hidden transition-all duration-500 hover:ps-14 hover:pe-6 cursor-pointer"
              >
                <span className="relative z-10">Let&apos;s craft together</span>
                <div className="absolute right-1 w-10 h-10 bg-[#0E0E0E] text-white rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
                  <ArrowUpRight size={16} />
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
