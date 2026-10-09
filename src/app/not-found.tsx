import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const quickLinks = [
  { label: "Services", description: "What we build", href: "/services" },
  { label: "Projects", description: "Recent work", href: "/projects" },
  { label: "About us", description: "Who we are", href: "/about" },
  { label: "Contact", description: "Start a project", href: "/contact" },
];

type ShapeType = "triangle" | "square" | "circle" | "cross";

const shapes: { type: ShapeType; className: string; size: number; delay: string }[] = [
  { type: "triangle", className: "top-[12%] left-[7%] -rotate-12", size: 30, delay: "0s" },
  { type: "square", className: "top-[16%] right-[9%] rotate-12", size: 24, delay: "0.6s" },
  { type: "circle", className: "bottom-[18%] left-[10%]", size: 20, delay: "1.2s" },
  { type: "cross", className: "bottom-[14%] right-[8%] rotate-6", size: 26, delay: "0.3s" },
  { type: "circle", className: "top-[48%] right-[4%]", size: 12, delay: "1.6s" },
  { type: "triangle", className: "top-[52%] left-[3%] rotate-45", size: 14, delay: "0.9s" },
];

function Shape({ type, size }: { type: ShapeType; size: number }) {
  const common = { fill: "none", stroke: "#FF7A00", strokeWidth: 1.8, strokeLinejoin: "round" as const };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      {type === "triangle" && <polygon points="12,3 21,20 3,20" {...common} />}
      {type === "square" && <rect x="4" y="4" width="16" height="16" rx="3" {...common} />}
      {type === "circle" && <circle cx="12" cy="12" r="8" {...common} />}
      {type === "cross" && (
        <path d="M5 5 L19 19 M19 5 L5 19" {...common} strokeLinecap="round" />
      )}
    </svg>
  );
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-6 sm:pt-10 pb-20 sm:pb-28 lg:pb-[120px]">
        <section
          className="relative overflow-clip rounded-[2rem] border border-[#E3E3E6] bg-[#F7F6F4] px-6 py-14 sm:px-10 sm:py-20 lg:py-24 text-center"
          style={{
            backgroundImage: "radial-gradient(#E3DFDA 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        >
          {shapes.map((shape, i) => (
            <span
              key={i}
              aria-hidden="true"
              className={`pointer-events-none absolute opacity-60 ${shape.className}`}
            >
              <span
                className="block motion-safe:animate-[float-soft_7s_ease-in-out_infinite]"
                style={{ animationDelay: shape.delay }}
              >
                <Shape type={shape.type} size={shape.size} />
              </span>
            </span>
          ))}

          <span className="inline-flex items-center rounded-full border border-[#E3DFDA] bg-white px-3.5 py-1.5 text-[12px] font-semibold text-[#0E0E0E]">
            Error 404
          </span>

          <div
            aria-hidden="true"
            className="mt-6 flex items-center justify-center gap-[0.04em] font-outfit font-extrabold leading-none tracking-[-0.06em] text-[#0E0E0E] text-[clamp(110px,22vw,250px)] select-none"
          >
            <span>4</span>
            <span className="relative inline-flex items-center justify-center w-[0.72em] h-[0.72em] motion-safe:animate-[float-soft_6s_ease-in-out_infinite]">
              <span className="absolute inset-0 rounded-full border-[0.12em] border-[#FF7A00]" />
              <span className="w-[0.14em] h-[0.14em] rounded-full bg-[#0E0E0E]" />
            </span>
            <span>4</span>
          </div>

          <h1 className="mt-6 sm:mt-8 font-outfit font-extrabold text-[clamp(26px,3.6vw,46px)] leading-[1.08] tracking-[-0.03em] text-[#0E0E0E]">
            This page took a wrong turn
          </h1>
          <p className="mt-4 mx-auto max-w-[46ch] text-[15.5px] leading-[1.6] text-[#4A4744]">
            The page you&apos;re looking for doesn&apos;t exist or has moved.
            Let&apos;s get you back on track.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="group inline-flex items-center gap-2.5 h-12 rounded-full pl-6 pr-1.5 bg-primary font-outfit font-bold text-[15px] text-[#0E0E0E] whitespace-nowrap transition-[background-color,color,box-shadow] duration-300 hover:bg-[#0E0E0E] hover:text-white hover:shadow-[0_12px_28px_-12px_rgba(14,14,14,0.6)]"
            >
              Back to home
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#0E0E0E] text-white shrink-0 transition-[background-color,color,rotate] duration-300 group-hover:bg-primary group-hover:text-[#0E0E0E] group-hover:rotate-45">
                <ArrowUpRight size={16} />
              </span>
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center h-12 rounded-full px-6 border border-[#E3DFDA] bg-white font-outfit font-bold text-[15px] text-[#0E0E0E] whitespace-nowrap transition-colors duration-300 hover:border-[#0E0E0E]"
            >
              View projects
            </Link>
          </div>
        </section>

        <nav aria-label="Popular pages" className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center justify-between gap-3 rounded-xl border border-[#EDEAE6] bg-white p-4 sm:p-5 transition-[border-color,background-color] duration-300 hover:border-[#FF7A00]/50 hover:bg-[#FFF8F1]"
            >
              <span>
                <span className="block font-outfit font-bold text-[16px] text-[#0E0E0E]">
                  {link.label}
                </span>
                <span className="block mt-0.5 text-[12.5px] text-[#5A5A5F]">
                  {link.description}
                </span>
              </span>
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-[#E3DFDA] text-[#0E0E0E] shrink-0 transition-[background-color,border-color,color] duration-300 group-hover:bg-[#FF7A00] group-hover:border-[#FF7A00] group-hover:text-white">
                <ArrowUpRight size={15} />
              </span>
            </Link>
          ))}
        </nav>
      </main>
      <Footer />
    </div>
  );
}
