"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import { projects as allProjects } from "@/constants/projects";
import ItechnoImg from "@/Assets/images/ITechno.jpg";
import ZmnaImg from "@/Assets/images/zmna.jpg";
import BizonImg from "@/Assets/images/Bizon.jpg";
import ReagentImg from "@/Assets/images/reagent.jpg";

interface WorkItem {
  index: string;
  slug: string;
  name: string;
  category: string;
  image: StaticImageData;
  ratio: string;
  flexBasis: string;
  offsetClass: string;
  corners: { pos: string; color: string }[];
}

const works: WorkItem[] = [
  {
    index: "01",
    slug: "i-techno",
    name: "I-Techno",
    category: "E-Commerce",
    image: ItechnoImg,
    ratio: "aspect-[16/10]",
    flexBasis: "flex-[1.55_1_460px]",
    offsetClass: "",
    corners: [
      { pos: "left-[-1px] top-[-1px] border-l-2 border-t-2", color: "border-[#0E0E0E]" },
      { pos: "right-[-1px] bottom-[-1px] border-r-2 border-b-2", color: "border-[#FF7A00]" },
    ],
  },
  {
    index: "02",
    slug: "zmna-ge",
    name: "Zmna.ge",
    category: "Media",
    image: ZmnaImg,
    ratio: "aspect-[4/3]",
    flexBasis: "flex-[1_1_300px]",
    offsetClass: "mt-0 lg:mt-[74px]",
    corners: [{ pos: "left-[-1px] bottom-[-1px] border-l-2 border-b-2", color: "border-[#0E0E0E]" }],
  },
  {
    index: "03",
    slug: "bizon-ge",
    name: "Bizon.ge",
    category: "Marketplace",
    image: BizonImg,
    ratio: "aspect-[4/3]",
    flexBasis: "flex-[1_1_300px]",
    offsetClass: "",
    corners: [{ pos: "right-[-1px] top-[-1px] border-r-2 border-t-2", color: "border-[#0E0E0E]" }],
  },
  {
    index: "04",
    slug: "reagent-ge",
    name: "Reagent.ge",
    category: "Catalogue",
    image: ReagentImg,
    ratio: "aspect-[16/10]",
    flexBasis: "flex-[1.55_1_460px]",
    offsetClass: "mt-0 lg:mt-[50px]",
    corners: [
      { pos: "left-[-1px] top-[-1px] border-l-2 border-t-2", color: "border-[#0E0E0E]" },
      { pos: "right-[-1px] top-[-1px] border-r-2 border-t-2", color: "border-[#0E0E0E]" },
    ],
  },
];

const rows: WorkItem[][] = [
  [works[0], works[1]],
  [works[2], works[3]],
];

function ArrowIcon() {
  return (
    <svg width="12" height="9" viewBox="0 0 7 9" aria-hidden="true">
      <path d="M1 1 L5 4.5 L1 8" fill="none" stroke="#FFFFFF" strokeWidth="1.7" />
    </svg>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="max-w-[1440px] mx-auto px-5 sm:px-9 lg:px-[72px] py-[26px] sm:py-14 lg:py-[54px] lg:pb-[118px]"
    >
      <div className="flex flex-wrap items-baseline gap-4 sm:gap-6 lg:gap-9 mb-6 sm:mb-9 lg:mb-[52px]">
        <h2 className="m-0 font-outfit font-extrabold text-[#0E0E0E] leading-none tracking-[-0.04em] text-[clamp(30px,4.1vw,58px)]">
          Recent projects
        </h2>
        <svg
          className="flex-1 min-w-[80px] h-3 hidden sm:block"
          aria-hidden="true"
        >
          <defs>
            <pattern id="rpChevron" width="18" height="12" patternUnits="userSpaceOnUse">
              <path d="M4 3 L9 6 L4 9" fill="none" stroke="#C7C7CC" strokeWidth="1.1" strokeLinecap="square" />
            </pattern>
          </defs>
          <rect width="100%" height="12" fill="url(#rpChevron)" />
        </svg>
        <span className="shrink-0 text-[10.5px] tracking-[0.2em] uppercase text-[#5A5A5F]">
          {works.length} of {allProjects.length}
        </span>
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2.5 shrink-0 rounded-full pl-4 pr-1.5 py-1.5 border border-[#E3E3E6] hover:border-[#0E0E0E] font-outfit font-bold text-[13.5px] tracking-[-0.01em] text-[#0E0E0E] whitespace-nowrap transition-colors duration-200"
        >
          View all
          <span className="inline-flex items-center justify-center w-[24px] h-[24px] rounded-full bg-[#0E0E0E] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
            <ArrowIcon />
          </span>
        </Link>
      </div>

      {rows.map((row, rowIdx) => (
        <div
          key={rowIdx}
          className={`flex flex-wrap gap-[18px] sm:gap-6 lg:gap-[38px] items-start ${
            rowIdx > 0 ? "mt-8 sm:mt-9 lg:mt-[66px]" : ""
          }`}
        >
          {row.map((item) => (
            <Link
              key={item.name}
              href={`/projects/${item.slug}`}
              className={`group block min-w-0 ${item.flexBasis} ${item.offsetClass} transition-transform duration-300 ease-out hover:-translate-y-1`}
            >
              <div
                className="relative p-2"
                style={{
                  border: "1px solid #E3E3E6",
                  background: "linear-gradient(160deg,#FFFFFF 0%,#F5F5F7 100%)",
                }}
              >
                {item.corners.map((c, i) => (
                  <i key={i} className={`absolute w-[10px] h-[10px] ${c.pos} ${c.color}`} />
                ))}
                <div className={`relative w-full ${item.ratio} overflow-hidden`}>
                  <Image
                    src={item.image}
                    alt={`${item.name} project screenshot`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex items-baseline justify-between gap-3 mt-[11px]">
                <span className="font-outfit font-bold text-[19px] tracking-[-0.025em] text-[#0E0E0E]">
                  {item.index}&nbsp;&nbsp;{item.name}
                </span>
                <span className="text-[10.5px] tracking-[0.16em] uppercase text-[#5A5A5F] whitespace-nowrap">
                  {item.category}
                </span>
              </div>
            </Link>
          ))}
        </div>
      ))}
    </section>
  );
}
