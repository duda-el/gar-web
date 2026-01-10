"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  X,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { projects, Project } from "./ProjectData";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<"website" | "design" | "uiux">(
    "website"
  );
  const [modalImgIndex, setModalImgIndex] = useState(0);
  const swiperRef = useRef<any>(null);
  const [swiper, setSwiper] = useState<any>(null);

  useEffect(() => {
    const loadSwiper = async () => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css";
      document.head.appendChild(link);

      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
      script.async = true;

      script.onload = () => {
        initSwiper();
      };

      document.body.appendChild(script);

      return () => {
        document.head.removeChild(link);
        document.body.removeChild(script);
      };
    };

    loadSwiper();
  }, []);

  const initSwiper = () => {
    if (
      typeof window !== "undefined" &&
      (window as any).Swiper &&
      swiperRef.current
    ) {
      const swiperInstance = new (window as any).Swiper(swiperRef.current, {
        slidesPerView: 1,
        spaceBetween: 24,
        navigation: {
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1330: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        },
      });

      setSwiper(swiperInstance);
    }
  };

  useEffect(() => {
    if (swiper) {
      setTimeout(() => {
        swiper.update();
        swiper.slideTo(0);
      }, 100);
    }
  }, [filter, swiper]);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      setModalImgIndex(0);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  const filteredProjects = projects.filter((p) => p.type === filter);

  const nextModalImg = () => {
    if (selectedProject && modalImgIndex < selectedProject.images.length - 1) {
      setModalImgIndex((prev) => prev + 1);
    }
  };

  const prevModalImg = () => {
    if (modalImgIndex > 0) {
      setModalImgIndex((prev) => prev - 1);
    }
  };

  return (
    <section
      className="relative pb-8 py-10 sm:py-24 px-6 overflow-hidden bg-[#121212]"
      id="projects"
    >
      <div className="absolute inset-0 bg-grid-white pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-12 bg-[#f19035]" />
              <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#f19035] font-medium font-georgian">
                შესრულებული პროექტები
              </p>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-white font-georgian uppercase">
              პროექტები
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {["website", "uiux", "design"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type as any)}
                  className={`px-6 py-2 rounded-full border text-sm font-georgian transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                    filter === type
                      ? "bg-[#f19035] border-[#f19035] text-black font-bold"
                      : "border-white/10 text-white hover:border-[#f19035]/50"
                  }`}
                >
                  {type === "website"
                    ? "ვებსაიტი"
                    : type === "uiux"
                    ? "UI/UX დიზაინი"
                    : "გრაფიკული დიზაინი"}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="flex justify-end gap-2 mb-6">
          <button className="swiper-button-prev-custom p-2 border border-white/10 rounded-full text-white hover:bg-white/5 transition-all cursor-pointer">
            <ChevronLeft size={20} />
          </button>
          <button className="swiper-button-next-custom p-2 border border-white/10 rounded-full text-white hover:bg-white/5 transition-all cursor-pointer">
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="swiper" ref={swiperRef}>
          <div className="swiper-wrapper">
            {filteredProjects.map((project) => (
              <div key={project.id} className="swiper-slide">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  onClick={() => setSelectedProject(project)}
                  className="group relative flex flex-col bg-[#1c1c1c]/80 backdrop-blur-sm p-6 border border-white/5 hover:border-[#f19035]/30 transition-all duration-200 min-h-[420px] cursor-pointer"
                  style={{ borderRadius: "2rem" }}
                >
                  <div
                    className="relative w-full h-52 bg-[#252525] overflow-hidden mb-8 flex items-center justify-center"
                    style={{ borderRadius: "1.5rem" }}
                  >
                    <img
                      src={project.images[0]?.src || project.images[0]}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    />
                    <div className="absolute bottom-6 left-6 w-12 h-12 bg-black/50 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 z-10">
                      <Sparkles className="size-6 text-[#f19035] animate-pulse" />
                    </div>
                  </div>

                  <div className="mt-auto px-2 relative">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#f19035] animate-pulse"></div>
                      <span className="text-[10px] tracking-[0.2em] text-zinc-300 font-bold uppercase font-georgian">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold leading-tight tracking-tight text-white group-hover:text-[#f19035] transition-colors duration-200 font-georgian mb-3">
                      {project.title}
                    </h3>
                    <p className="text-sm text-zinc-300 font-georgian leading-relaxed line-clamp-4 italic">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Section */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-zoom-out"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-[#1c1c1c] border border-white/10 overflow-hidden z-[151] flex flex-col"
              style={{ borderRadius: "24px" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 bg-black/50 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition-all z-40 backdrop-blur-md cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="w-full h-[300px] md:h-[450px] bg-black relative flex items-center justify-center shrink-0 border-b border-white/5 group/modal">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={modalImgIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    src={
                      selectedProject.images[modalImgIndex]?.src ||
                      selectedProject.images[modalImgIndex]
                    }
                    alt={selectedProject.title}
                    className="w-full h-full object-contain p-4 relative z-10"
                  />
                </AnimatePresence>

                <img
                  src={
                    selectedProject.images[modalImgIndex]?.src ||
                    selectedProject.images[modalImgIndex]
                  }
                  className="absolute inset-0 w-full h-full object-cover opacity-20 blur-xl"
                  alt=""
                />

                {selectedProject.images.length > 1 && (
                  <>
                    <button
                      onClick={prevModalImg}
                      disabled={modalImgIndex === 0}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 hover:bg-[#f19035] rounded-full text-white z-20 transition-all disabled:opacity-0 cursor-pointer disabled:cursor-default"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextModalImg}
                      disabled={
                        modalImgIndex === selectedProject.images.length - 1
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 hover:bg-[#f19035] rounded-full text-white z-20 transition-all disabled:opacity-0 cursor-pointer disabled:cursor-default"
                    >
                      <ChevronRight size={24} />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                      {selectedProject.images.map((_, idx) => (
                        <div
                          key={idx}
                          onClick={() => setModalImgIndex(idx)}
                          className={`h-1.5 w-1.5 rounded-full transition-all cursor-pointer ${
                            idx === modalImgIndex
                              ? "bg-[#f19035] w-4"
                              : "bg-white/30 hover:bg-white/60"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="flex-1 overflow-y-auto p-8 md:p-12 bg-[#1c1c1c] custom-scrollbar">
                <div className="max-w-3xl mx-auto space-y-8">
                  <div>
                    <span className="text-[#f19035] text-[10px] tracking-[0.3em] font-bold uppercase mb-2 block font-georgian">
                      {selectedProject.category}
                    </span>
                    <h2 className="text-4xl font-bold text-white font-georgian tracking-tighter">
                      {selectedProject.title}
                    </h2>
                  </div>
                  <p className="text-zinc-400 font-georgian leading-relaxed italic border-l-2 border-[#f19035]/30 pl-4 text-lg">
                    {selectedProject.description}
                  </p>
                  <div className="space-y-4 pt-4">
                    <h4 className="text-white text-sm font-bold uppercase tracking-widest flex items-center gap-2 font-georgian">
                      <div className="w-4 h-[1px] bg-[#f19035]" /> ჩვენი
                      სერვისები
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedProject.services.map((service, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 text-zinc-300 text-sm font-georgian"
                        >
                          <CheckCircle2
                            size={16}
                            className="text-[#f19035] shrink-0"
                          />
                          {service}
                        </div>
                      ))}
                    </div>
                  </div>
                  <span className="text-[#f19035] text-[10px] tracking-[0.3em] font-bold uppercase mb-2 block font-georgian">
                    სტატუსი: {selectedProject.status}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #f19035;
          border-radius: 10px;
        }

        .swiper-button-prev-custom.swiper-button-disabled,
        .swiper-button-next-custom.swiper-button-disabled {
          opacity: 0.2;
          pointer-events: none;
        }
      `}</style>
    </section>
  );
};

export default Projects;
