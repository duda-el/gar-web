"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { localizeProject, projects, Project } from "@/constants/projects";
import { useI18n } from "@/i18n/I18nProvider";
import { format } from "@/i18n/format";

const statusColor: Record<Project["status"], string> = {
  active: "#1FA34A",
  completed: "#0E0E0E",
};

const EASE = "ease-[cubic-bezier(0.16,1,0.3,1)]";

function ArrowIcon() {
  return (
    <svg width="12" height="9" viewBox="0 0 7 9" aria-hidden="true">
      <path d="M1 1 L5 4.5 L1 8" fill="none" stroke="#FFFFFF" strokeWidth="1.7" />
    </svg>
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative p-2"
      style={{
        border: "1px solid #E3E3E6",
        background: "linear-gradient(160deg,#FFFFFF 0%,#F5F5F7 100%)",
      }}
    >
      <i className="absolute w-[10px] h-[10px] left-[-1px] top-[-1px] border-l-2 border-t-2 border-[#0E0E0E]" />
      <i className="absolute w-[10px] h-[10px] right-[-1px] bottom-[-1px] border-r-2 border-b-2 border-[#FF7A00]" />
      {children}
    </div>
  );
}

function Gallery({
  project,
  alt,
  onOpen,
}: {
  project: Project;
  alt: string;
  onOpen: (index: number) => void;
}) {
  const { t } = useI18n();
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [scrollable, setScrollable] = useState(false);
  const [edge, setEdge] = useState({ start: true, end: false });
  const total = project.images.length;

  // Step to the next/previous slide edge relative to the current scroll position
  const step = (direction: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const offsets = (Array.from(el.children) as HTMLElement[]).map((slide) =>
      Math.min(slide.offsetLeft - el.offsetLeft, maxScroll),
    );
    const target =
      direction === 1
        ? offsets.find((x) => x > el.scrollLeft + 4) ?? maxScroll
        : [...offsets].reverse().find((x) => x < el.scrollLeft - 4) ?? 0;
    el.scrollTo({ left: target, behavior: "smooth" });
  };

  const onScroll = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setScrollable(maxScroll > 4);
    setEdge({ start: el.scrollLeft <= 4, end: el.scrollLeft >= maxScroll - 4 });
    // At the far end the last slides can't snap to the start, so count it as the last one
    if (maxScroll > 4 && el.scrollLeft >= maxScroll - 4) {
      setActive(total - 1);
      return;
    }
    const slides = Array.from(el.children) as HTMLElement[];
    const left = el.scrollLeft + el.offsetLeft;
    let closest = 0;
    slides.forEach((slide, i) => {
      if (Math.abs(slide.offsetLeft - left) < Math.abs(slides[closest].offsetLeft - left)) {
        closest = i;
      }
    });
    setActive(closest);
  }, [total]);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const observer = new ResizeObserver(() => onScroll());
    observer.observe(el);
    return () => observer.disconnect();
  }, [onScroll]);

  return (
    <section className="mt-14 sm:mt-20 lg:mt-24">
      <div className="flex items-end justify-between gap-4 mb-6 sm:mb-8">
        <div className="flex items-baseline gap-4 sm:gap-6">
          <h2 className="m-0 font-outfit font-extrabold text-[#0E0E0E] leading-none tracking-[-0.04em] text-[clamp(26px,3.2vw,42px)]">
            {t.projectDetail.gallery}
          </h2>
          <span className={`font-outfit font-bold text-[13px] tabular-nums text-[#5A5A5F] ${scrollable ? "" : "hidden"}`}>
            <span className="text-[#0E0E0E]">{String(active + 1).padStart(2, "0")}</span>
            {" / "}
            {String(total).padStart(2, "0")}
          </span>
        </div>
        <div className={`flex gap-2 ${scrollable ? "" : "hidden"}`}>
          {[
            { label: t.projectDetail.previousImage, icon: ChevronLeft, direction: -1 as const, disabled: edge.start },
            { label: t.projectDetail.nextImage, icon: ChevronRight, direction: 1 as const, disabled: edge.end },
          ].map(({ label, icon: Icon, direction, disabled }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              disabled={disabled}
              onClick={() => step(direction)}
              className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-[#E3E3E6] text-[#0E0E0E] transition-colors duration-300 hover:bg-[#0E0E0E] hover:border-[#0E0E0E] hover:text-white disabled:opacity-35 disabled:pointer-events-none cursor-pointer"
            >
              <Icon size={18} />
            </button>
          ))}
        </div>
      </div>

      <div
        ref={track}
        onScroll={onScroll}
        className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {project.images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => onOpen(i)}
            aria-label={format(t.projectDetail.openImage, { title: project.title, n: i + 1 })}
            className={`group ${i === total - 1 ? "snap-end" : "snap-start"} shrink-0 w-[86%] sm:w-[62%] lg:w-[44%] text-left cursor-zoom-in transition-opacity duration-500 ${
              !scrollable || i === active ? "opacity-100" : "opacity-60 hover:opacity-100"
            }`}
          >
            <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl bg-[#F5F5F7]">
              <Image
                src={img}
                alt={format(t.projectDetail.imageAlt, { alt, n: i + 1 })}
                fill
                placeholder="blur"
                sizes="(max-width: 640px) 86vw, (max-width: 1024px) 62vw, 600px"
                className={`object-cover transition-[scale] duration-700 ${EASE} group-hover:scale-[1.04]`}
              />
            </div>
          </button>
        ))}
      </div>

      <div className={`mt-5 h-[2px] w-full bg-[#EDEAE6] rounded-full overflow-hidden ${scrollable ? "" : "hidden"}`}>
        <div
          className={`h-full bg-[#FF7A00] rounded-full transition-[width] duration-500 ${EASE}`}
          style={{ width: `${((active + 1) / total) * 100}%` }}
        />
      </div>
    </section>
  );
}

function NextProject({ prev, next }: { prev: Project; next: Project }) {
  const { t, locale, href } = useI18n();
  const nextContent = next.content[locale];

  return (
    <nav aria-label={t.projectDetail.moreProjects} className="mt-14 sm:mt-20 lg:mt-24">
      <Link
        href={href(`/projects/${next.slug}`)}
        className="group relative isolate grid grid-cols-1 md:grid-cols-[1fr_0.9fr] items-center gap-6 md:gap-10 overflow-clip rounded-2xl bg-[#0E0E0E] p-6 sm:p-9 lg:p-12"
      >
        <span
          aria-hidden="true"
          className={`absolute -z-10 -left-[20%] -bottom-[60%] w-[70%] aspect-square rounded-full bg-[#FF7A00]/25 blur-[90px] transition-[translate,opacity] duration-1000 ${EASE} opacity-60 group-hover:opacity-100 group-hover:translate-x-[10%]`}
        />
        <div>
          <span className="text-[10.5px] font-semibold tracking-[0.2em] uppercase text-[#FF7A00]">
            {t.projectDetail.nextProject}
          </span>
          <h2 className="mt-3 font-outfit font-extrabold text-white leading-[1.02] tracking-[-0.04em] text-[clamp(32px,5vw,68px)]">
            {next.title}
          </h2>
          <p className="mt-3 text-[12px] tracking-[0.16em] uppercase text-white/50">
            {nextContent.category} · {nextContent.industry}
          </p>
          <span className="mt-7 inline-flex items-center gap-3 font-outfit font-bold text-[15px] text-white">
            <span className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-[#0E0E0E] transition-[rotate,scale] duration-500 ${EASE} group-hover:rotate-45 group-hover:scale-110`}>
              <ArrowUpRight size={20} />
            </span>
            {t.projectDetail.viewProject}
          </span>
        </div>
        <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl">
          <Image
            src={next.images[0]}
            alt={nextContent.alt}
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className={`object-cover transition-[scale] duration-[1200ms] ${EASE} scale-[1.04] group-hover:scale-100`}
          />
        </div>
      </Link>

      <div className="mt-4 flex justify-between gap-4">
        <Link
          href={href(`/projects/${prev.slug}`)}
          className="group inline-flex items-center gap-3 text-[#5A5A5F] hover:text-[#0E0E0E] transition-colors duration-300"
        >
          <span className={`inline-flex items-center justify-center w-9 h-9 rounded-full border border-[#E3E3E6] transition-[translate,border-color] duration-500 ${EASE} group-hover:-translate-x-1 group-hover:border-[#0E0E0E]`}>
            <ArrowLeft size={15} />
          </span>
          <span className="text-[13.5px]">
            {t.projectDetail.previous} <span className="font-outfit font-bold text-[#0E0E0E]">{prev.title}</span>
          </span>
        </Link>
        <Link
          href={href("/projects")}
          className="inline-flex items-center text-[13.5px] font-medium text-[#5A5A5F] hover:text-[#0E0E0E] transition-colors duration-300"
        >
          {t.projectDetail.allProjects}
        </Link>
      </div>
    </nav>
  );
}

export default function ProjectDetail({ project }: { project: Project }) {
  const { t, locale, href } = useI18n();
  const content = localizeProject(project, locale);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const index = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const category = content.category;
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
    { label: t.projectDetail.industry, value: content.industry },
    { label: t.projectDetail.category, value: category },
    { label: t.projectDetail.type, value: t.project.type[project.type] },
  ];

  return (
    <article className="max-w-[1440px] mx-auto px-5 sm:px-9 lg:px-[72px] pt-6 sm:pt-8 lg:pt-10 pb-20 sm:pb-24 lg:pb-[118px]">
      {/* Intro: text left, cover right */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-8 lg:gap-14 items-center">
        <div>
          <Link
            href={href("/projects")}
            className="group inline-flex items-center gap-2 text-[13px] font-medium text-[#5A5A5F] hover:text-[#0E0E0E] transition-colors duration-200"
          >
            <ArrowLeft size={15} className={`transition-[translate] duration-500 ${EASE} group-hover:-translate-x-1`} />
            {t.projectDetail.allProjects}
          </Link>

          <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3">
            <span className="text-[10.5px] tracking-[0.2em] uppercase text-[#5A5A5F]">
              {String(index + 1).padStart(2, "0")} / {category}
            </span>
            <span
              className="rounded-full px-2.5 py-1 text-[9.5px] font-semibold uppercase tracking-[0.1em] text-white"
              style={{ backgroundColor: statusColor[project.status] }}
            >
              {t.project.status[project.status]}
            </span>
          </div>

          <h1 className="mt-3 m-0 font-outfit font-extrabold text-[#0E0E0E] leading-[0.98] tracking-[-0.04em] text-[clamp(36px,5.4vw,76px)]">
            {project.title}
          </h1>
          <p className="mt-5 max-w-[52ch] text-[15.5px] leading-[1.6] text-[#4A4A4E]">
            {content.description}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full pl-5 pr-1.5 h-12 bg-primary hover:bg-[#0E0E0E] hover:text-white font-outfit font-bold text-[15px] text-[#0E0E0E] whitespace-nowrap transition-colors duration-300"
              >
                {t.projectDetail.visitWebsite}
                <span className={`inline-flex items-center justify-center w-[34px] h-[34px] rounded-full bg-[#0E0E0E] text-white shrink-0 transition-[rotate] duration-500 ${EASE} group-hover:rotate-45 group-hover:bg-primary group-hover:text-[#0E0E0E]`}>
                  <ArrowUpRight size={16} />
                </span>
              </a>
            )}
            <Link
              href={href("/contact")}
              className="group inline-flex items-center gap-2.5 rounded-full pl-5 pr-1.5 h-12 border border-[#E3E3E6] hover:border-[#0E0E0E] font-outfit font-bold text-[15px] text-[#0E0E0E] whitespace-nowrap transition-colors duration-300"
            >
              {t.projectDetail.startSimilar}
              <span className={`inline-flex items-center justify-center w-[34px] h-[34px] rounded-full bg-[#0E0E0E] shrink-0 transition-[translate] duration-500 ${EASE} group-hover:translate-x-0.5`}>
                <ArrowIcon />
              </span>
            </Link>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setLightbox(0)}
          className="group block w-full text-left cursor-zoom-in"
          aria-label={format(t.projectDetail.openImage, { title: project.title, n: 1 })}
        >
          <Frame>
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <Image
                src={project.images[0]}
                alt={content.alt}
                fill
                priority
                placeholder="blur"
                sizes="(max-width: 1024px) 100vw, 640px"
                className={`object-cover transition-[scale] duration-[1200ms] ${EASE} group-hover:scale-[1.04]`}
              />
            </div>
          </Frame>
        </button>
      </div>

      {/* Overview + details */}
      <div className="mt-14 sm:mt-20 lg:mt-24 grid grid-cols-1 lg:grid-cols-[1.4fr_0.6fr] gap-10 lg:gap-16 items-start">
        <div>
          <span className="block text-[12.5px] font-semibold tracking-[0.14em] uppercase text-[#FF7A00]">
            {t.projectDetail.overview}
          </span>
          <h2 className="mt-3 font-outfit font-extrabold text-[clamp(26px,3.2vw,42px)] leading-[1.08] tracking-[-0.03em] text-[#0E0E0E]">
            {t.projectDetail.aboutProject}
          </h2>
          <div className="mt-5 space-y-4 max-w-[64ch]">
            {content.overview.map((paragraph) => (
              <p key={paragraph} className="text-[15.5px] leading-[1.7] text-[#4A4A4E]">
                {paragraph}
              </p>
            ))}
          </div>

          <h3 className="mt-10 sm:mt-12 font-outfit font-bold text-[20px] tracking-[-0.02em] text-[#0E0E0E]">
            {t.projectDetail.delivered}
          </h3>
          <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {content.highlights.map((item, i) => (
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
                  {t.projectDetail.website}
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
                {t.projectDetail.services}
              </dt>
              <dd className="mt-3 flex flex-wrap gap-1.5">
                {content.services.map((s) => (
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

      {total > 1 && <Gallery project={project} alt={content.alt} onOpen={setLightbox} />}

      <NextProject prev={prev} next={next} />

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={format(t.projectDetail.galleryLabel, { title: project.title })}
          className="fixed inset-0 z-[200] bg-[#0E0E0E]/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-10"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            aria-label={t.projectDetail.close}
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
                aria-label={t.projectDetail.previousImage}
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
                aria-label={t.projectDetail.nextImage}
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
              alt={format(t.projectDetail.imageAlt, { alt: content.alt, n: lightbox + 1 })}
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
