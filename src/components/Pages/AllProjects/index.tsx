"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { localizeProject, projects, Project } from "@/constants/projects";
import { useI18n } from "@/i18n/I18nProvider";
import { format } from "@/i18n/format";

const filters: (Project["type"] | "all")[] = ["all", "website", "design", "uiux"];

const statusColor: Record<Project["status"], string> = {
  active: "#1FA34A",
  completed: "#0E0E0E",
};

export default function AllProjects() {
  const { t, locale, href } = useI18n();
  const [active, setActive] = useState<Project["type"] | "all">("all");

  const filtered = useMemo(
    () =>
      active === "all" ? projects : projects.filter((p) => p.type === active),
    [active],
  );

  return (
    <section className="max-w-[1440px] mx-auto px-5 sm:px-9 lg:px-[72px] py-[26px] sm:py-14 lg:py-[54px] lg:pb-[118px]">
      <div className="pt-10 sm:pt-12 lg:pt-16 mb-8 sm:mb-10 lg:mb-14">
        <span className="block text-[10.5px] tracking-[0.2em] uppercase text-[#5A5A5F] mb-3">
          {t.allProjects.eyebrow}
        </span>
        <h1 className="m-0 font-outfit font-extrabold text-[#0E0E0E] leading-none tracking-[-0.04em] text-[clamp(32px,5.5vw,64px)]">
          {t.allProjects.title}
        </h1>
        <p className="mt-4 max-w-[56ch] text-[15px] leading-[1.6] text-[#4A4A4E]">
          {format(t.allProjects.intro, { count: projects.length })}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 sm:mb-10 lg:mb-14">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={active === f}
            onClick={() => setActive(f)}
            className={`font-outfit text-[13.5px] font-medium rounded-full px-4 py-2 whitespace-nowrap transition-colors duration-200 cursor-pointer border ${
              active === f
                ? "text-white bg-[#0E0E0E] border-[#0E0E0E]"
                : "text-[#4A4A4E] bg-white border-[#E3E3E6] hover:border-[#0E0E0E] hover:text-[#0E0E0E]"
            }`}
          >
            {t.allProjects.filters[f]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px] sm:gap-6 lg:gap-[38px]">
        {filtered.map((project, idx) => {
          const content = localizeProject(project, locale);
          return (
            <Link
              key={project.id}
              href={href(`/projects/${project.slug}`)}
              className="group block min-w-0 transition-transform duration-300 ease-out hover:-translate-y-1"
            >
              <div
                className="relative p-2"
                style={{
                  border: "1px solid #E3E3E6",
                  background: "linear-gradient(160deg,#FFFFFF 0%,#F5F5F7 100%)",
                }}
              >
                <i className="absolute w-[10px] h-[10px] left-[-1px] top-[-1px] border-l-2 border-t-2 border-[#0E0E0E]" />
                <i className="absolute w-[10px] h-[10px] right-[-1px] bottom-[-1px] border-r-2 border-b-2 border-[#FF7A00]" />
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.images[0]}
                    alt={content.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span
                    className="absolute top-2.5 left-2.5 rounded-full px-2.5 py-1 text-[9.5px] font-semibold uppercase tracking-[0.1em] text-white"
                    style={{
                      backgroundColor: statusColor[project.status],
                    }}
                  >
                    {t.project.status[project.status]}
                  </span>
                </div>
              </div>
              <div className="mt-[11px]">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-outfit font-bold text-[19px] tracking-[-0.025em] text-[#0E0E0E]">
                    {String(idx + 1).padStart(2, "0")}&nbsp;&nbsp;{project.title}
                  </span>
                </div>
                <p className="mt-1 text-[10.5px] tracking-[0.1em] uppercase text-[#5A5A5F]">
                  {content.category}
                </p>
                <p className="mt-2.5 text-[13.5px] leading-[1.55] text-[#4A4A4E] line-clamp-2">
                  {content.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {content.services.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-[#E3E3E6] px-2.5 py-1 text-[10px] text-[#4A4A4E]"
                    >
                      {s}
                    </span>
                  ))}
                  {content.services.length > 3 && (
                    <span className="rounded-full border border-[#E3E3E6] px-2.5 py-1 text-[10px] text-[#4A4A4E]">
                      +{content.services.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
