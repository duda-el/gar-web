"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { projects, Project } from "@/constants/projects";

const typeLabel: Record<Project["type"], string> = {
  website: "Website",
  design: "Graphic Design",
  uiux: "UI/UX Design",
};

const statusColor: Record<string, string> = {
  Active: "#1FA34A",
  Completed: "#0E0E0E",
  Paused: "#B3261E",
};

function ArrowIcon() {
  return (
    <svg width="12" height="9" viewBox="0 0 7 9" aria-hidden="true">
      <path d="M1 1 L5 4.5 L1 8" fill="none" stroke="#FFFFFF" strokeWidth="1.7" />
    </svg>
  );
}

function Frame({
  children,
  accent = "bottom-right",
}: {
  children: React.ReactNode;
  accent?: "bottom-right" | "top-right";
}) {
  return (
    <div
      className="relative p-2"
      style={{
        border: "1px solid #E3E3E6",
        background: "linear-gradient(160deg,#FFFFFF 0%,#F5F5F7 100%)",
      }}
    >
      <i className="absolute w-[10px] h-[10px] left-[-1px] top-[-1px] border-l-2 border-t-2 border-[#0E0E0E]" />
      {accent === "bottom-right" ? (
        <i className="absolute w-[10px] h-[10px] right-[-1px] bottom-[-1px] border-r-2 border-b-2 border-[#FF7A00]" />
      ) : (
        <i className="absolute w-[10px] h-[10px] right-[-1px] top-[-1px] border-r-2 border-t-2 border-[#FF7A00]" />
      )}
      {children}
    </div>
  );
}

export default function ProjectDetail({ project }: { project: Project }) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const index = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const category = project.category.replace(/^Category:\s*/, "");
  const [cover, ...gallery] = project.images;

  const total = project.images.length;
  const showPrev = useCallback(
    () => setLightbox((i) => (i === null ? i : (i - 1 + total) % total)),
    [total],
  );
  const showNext = useCallback(
    () => setLightbox((i) => (i === null ? i : (i + 1) % total)),
    [total],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, showPrev, showNext]);

  const details = [
    { label: "Industry", value: project.industry },
    { label: "Category", value: category },
    { label: "Type", value: typeLabel[project.type] },
  ];

  return (
    <article className="max-w-[1440px] mx-auto px-5 sm:px-9 lg:px-[72px] py-[26px] sm:py-14 lg:py-[54px] lg:pb-[118px]">
      {/* Intro */}
      <div className="pt-6 sm:pt-8 lg:pt-10 mb-8 sm:mb-10 lg:mb-14">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-[13px] font-medium text-[#5A5A5F] hover:text-[#0E0E0E] transition-colors duration-200"
        >
          <ArrowLeft size={15} />
          All projects
        </Link>

        <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3">
          <span className="text-[10.5px] tracking-[0.2em] uppercase text-[#5A5A5F]">
            {String(index + 1).padStart(2, "0")} / {category}
          </span>
          <span
            className="rounded-full px-2.5 py-1 text-[9.5px] font-semibold uppercase tracking-[0.1em] text-white"
            style={{ backgroundColor: statusColor[project.status] ?? "#0E0E0E" }}
          >
            {project.status}
          </span>
        </div>

        <div className="mt-3 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <h1 className="m-0 font-outfit font-extrabold text-[#0E0E0E] leading-none tracking-[-0.04em] text-[clamp(36px,6vw,80px)]">
              {project.title}
            </h1>
            <p className="mt-5 max-w-[60ch] text-[15.5px] leading-[1.6] text-[#4A4A4E]">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full pl-5 pr-1.5 h-12 bg-primary hover:bg-[#0E0E0E] hover:text-white font-outfit font-bold text-[15px] text-[#0E0E0E] whitespace-nowrap transition-colors duration-200"
              >
                Visit website
                <span className="inline-flex items-center justify-center w-[34px] h-[34px] rounded-full bg-[#0E0E0E] text-white shrink-0 transition-transform duration-200 group-hover:rotate-45">
                  <ArrowUpRight size={16} />
                </span>
              </a>
            )}
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 rounded-full pl-5 pr-1.5 h-12 border border-[#E3E3E6] hover:border-[#0E0E0E] font-outfit font-bold text-[15px] text-[#0E0E0E] whitespace-nowrap transition-colors duration-200"
            >
              Start a similar project
              <span className="inline-flex items-center justify-center w-[34px] h-[34px] rounded-full bg-[#0E0E0E] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
                <ArrowIcon />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Cover */}
      <button
        type="button"
        onClick={() => setLightbox(0)}
        className="block w-full text-left cursor-zoom-in"
        aria-label={`Open ${project.title} image 1`}
      >
        <Frame>
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] overflow-hidden">
            <Image
              src={cover}
              alt={project.alt}
              fill
              priority
              placeholder="blur"
              sizes="(max-width: 1440px) 100vw, 1300px"
              className="object-cover"
            />
          </div>
        </Frame>
      </button>

      {/* Overview + details */}
      <div className="mt-12 sm:mt-16 lg:mt-[88px] grid grid-cols-1 lg:grid-cols-[1.4fr_0.6fr] gap-10 lg:gap-16 items-start">
        <div>
          <span className="block text-[12.5px] font-semibold tracking-[0.14em] uppercase text-[#FF7A00]">
            Overview
          </span>
          <h2 className="mt-3 font-outfit font-extrabold text-[clamp(26px,3.2vw,42px)] leading-[1.08] tracking-[-0.03em] text-[#0E0E0E]">
            About the project
          </h2>
          <div className="mt-5 space-y-4 max-w-[64ch]">
            {project.overview.map((paragraph) => (
              <p key={paragraph} className="text-[15.5px] leading-[1.7] text-[#4A4A4E]">
                {paragraph}
              </p>
            ))}
          </div>

          <h3 className="mt-10 sm:mt-12 font-outfit font-bold text-[20px] tracking-[-0.02em] text-[#0E0E0E]">
            What we delivered
          </h3>
          <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.highlights.map((item, i) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-[#EDEAE6] bg-white p-4"
              >
                <span className="font-outfit font-bold text-[13px] text-[#FF7A00] leading-[1.6] shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[14px] leading-[1.6] text-[#0E0E0E]">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="lg:sticky lg:top-[110px] rounded-xl border border-[#EDEAE6] bg-[#F5F5F7] p-5 sm:p-7">
          <dl className="space-y-5">
            {details.map((d) => (
              <div key={d.label} className="pb-5 border-b border-[#E3E3E6]">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5A5A5F]">
                  {d.label}
                </dt>
                <dd className="mt-1 text-[15px] font-medium text-[#0E0E0E]">{d.value}</dd>
              </div>
            ))}
            {project.url && (
              <div className="pb-5 border-b border-[#E3E3E6]">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5A5A5F]">
                  Website
                </dt>
                <dd className="mt-1">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[15px] font-medium text-[#0E0E0E] hover:text-[#FF7A00] transition-colors duration-200"
                  >
                    {project.url.replace(/^https?:\/\/(www\.)?/, "")}
                    <ArrowUpRight size={14} />
                  </a>
                </dd>
              </div>
            )}
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5A5A5F]">
                Services
              </dt>
              <dd className="mt-3 flex flex-wrap gap-1.5">
                {project.services.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-[#E3E3E6] bg-white px-3 py-1.5 text-[11.5px] text-[#4A4A4E]"
                  >
                    {s}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </aside>
      </div>

      {/* Gallery */}
      {gallery.length > 0 && (
        <section className="mt-12 sm:mt-16 lg:mt-[88px]">
          <div className="flex flex-wrap items-baseline gap-4 sm:gap-6 mb-6 sm:mb-9">
            <h2 className="m-0 font-outfit font-extrabold text-[#0E0E0E] leading-none tracking-[-0.04em] text-[clamp(26px,3.2vw,42px)]">
              Gallery
            </h2>
            <span className="text-[10.5px] tracking-[0.2em] uppercase text-[#5A5A5F]">
              {total} images
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px] sm:gap-6 lg:gap-[38px]">
            {gallery.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setLightbox(i + 1)}
                className={`group block w-full text-left cursor-zoom-in ${
                  gallery.length % 2 === 1 && i === gallery.length - 1 ? "sm:col-span-2" : ""
                }`}
                aria-label={`Open ${project.title} image ${i + 2}`}
              >
                <Frame accent={i % 2 === 0 ? "top-right" : "bottom-right"}>
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <Image
                      src={img}
                      alt={`${project.alt} — image ${i + 2}`}
                      fill
                      placeholder="blur"
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                </Frame>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Prev / next */}
      <nav
        aria-label="More projects"
        className="mt-12 sm:mt-16 lg:mt-[88px] grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {[
          { p: prev, label: "Previous project", align: "" },
          { p: next, label: "Next project", align: "sm:text-right sm:items-end" },
        ].map(({ p, label, align }) => (
          <Link
            key={label}
            href={`/projects/${p.slug}`}
            className={`group flex flex-col gap-1 rounded-xl border border-[#EDEAE6] bg-white p-5 sm:p-6 transition-[border-color,transform] duration-[250ms] hover:border-[#FF7A00]/40 hover:-translate-y-1 ${align}`}
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5A5A5F]">
              {label}
            </span>
            <span className="font-outfit font-bold text-[22px] tracking-[-0.025em] text-[#0E0E0E] group-hover:text-[#FF7A00] transition-colors duration-200">
              {p.title}
            </span>
          </Link>
        ))}
      </nav>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} gallery`}
          className="fixed inset-0 z-[200] bg-[#0E0E0E]/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-10"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/10 text-white hover:bg-primary hover:text-[#0E0E0E] transition-colors cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/10 text-white hover:bg-primary hover:text-[#0E0E0E] transition-colors cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}
          <div
            className="relative w-full max-w-[1200px] h-[78vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={project.images[lightbox]}
              alt={`${project.alt} — image ${lightbox + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[12px] tracking-[0.2em] text-white/70">
            {lightbox + 1} / {total}
          </span>
        </div>
      )}
    </article>
  );
}
