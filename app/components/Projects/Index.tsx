"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, CheckCircle2 } from "lucide-react";
import ZmnaImg from "../../Assets/images/zmna.png";
import PayImg from "../../Assets/images/PayNety.jpg";
import BizonImg from "../../Assets/images/Bizon.png";

interface Project {
  id: number;
  title: string;
  category: string;
  status: string;
  description: string;
  image: any;
  services: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Zmna.ge",
    category: "კატეგორია: News",
    status: "აქტიური",
    description:
      "თანამედროვე საინფორმაციო პორტალი, რომელიც ორიენტირებულია მომხმარებლისთვის სწრაფ და მოქნილ კონტენტის მიწოდებაზე.",
    image: ZmnaImg,
    services: [
      "UI/UX დიზაინი",
      "Web Development",
      "Content Management System",
      "SEO ოპტიმიზაცია",
    ],
  },
  {
    id: 2,
    title: "PayNety",
    category: "კატეგორია: ინფორმაციული",
    status: "შეჩერებული",
    description:
      "ფინანსური ტექნოლოგიების პლატფორმა, რომელიც ამარტივებს ონლაინ გადახდების პროცესს და მონაცემთა მართვას.",
    image: PayImg,
    services: [
      "Branding",
      "Frontend Development",
      "API Integration",
      "Security Consulting",
    ],
  },
  {
    id: 3,
    title: "Bizon.ge",
    category: "კატეგორია: Rental",
    status: "დასრულებული",
    description:
      "მძიმე ტექნიკის გაქირავების ინოვაციური მარკეტპლეისი, გამართული ძიებისა და დაჯავშნის სისტემით.",
    image: BizonImg,
    services: [
      "Marketplace Architecture",
      "Mobile First Design",
      "Search Engine Optimization",
    ],
  },
  {
    id: 4,
    title: "SADME",
    category: "კატეგორია: ინფორმაციული",
    status: "გაუქმებული",
    description:
      "ციფრული სივრცე, რომელიც აერთიანებს სხვადასხვა სერვისებს და სთავაზობს მომხმარებელს საჭირო ინფორმაციას.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    services: ["Strategy", "Web Design", "Backend Development"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.2 },
  },
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  return (
    <section
      className="relative py-24 px-6 overflow-hidden bg-[#121212]"
      id="projects"
    >
      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #f19035 #1c1c1c;
          /* GPU აჩქარება ლაგის მოსახსნელად */
          will-change: transform;
          transform: translateZ(0);
          -webkit-overflow-scrolling: touch;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-button {
          display: none;
          width: 0;
          height: 0;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1c1c1c;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #f19035; /* შენი მითითებული ფერი */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d47a2a;
        }
      `}</style>

      <div className="absolute inset-0 bg-grid-white pointer-events-none opacity-20" />
      <div className="absolute top-20 right-[-5%] w-[500px] h-[500px] bg-[#f19035]/10 rounded-full blur-[120px] ambient-glow animate-pulse" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                transition={{ duration: 0.2 }}
                className="h-[1px] bg-[#f19035]"
              />
              <p className="text-sm uppercase tracking-[0.2em] text-[#f19035] font-medium font-georgian">
                შესრულებული პროექტები
              </p>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white font-georgian uppercase">
              პროექტები
            </h2>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedProject(project)}
              className="group relative flex flex-col bg-[#1c1c1c]/80 backdrop-blur-sm p-6 border border-white/5 hover:border-[#f19035]/30 transition-all duration-200 min-h-[420px] cursor-pointer"
              style={{ borderRadius: "var(--radius-4xl)" }}
            >
              <div
                className="relative w-full h-52 bg-[#252525] overflow-hidden mb-8 flex items-center justify-center"
                style={{ borderRadius: "var(--radius-3xl)" }}
              >
                <img
                  src={project.image.src || project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <motion.div
                  whileHover={{ rotate: 90, scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-6 left-6 w-12 h-12 bg-black/50 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 transition-colors group-hover:bg-[#f19035]/20 z-10"
                >
                  <Sparkles className="size-6 text-[#f19035] animate-pulse" />
                </motion.div>
                <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.3)] pointer-events-none" />
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
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-[#1c1c1c] border border-white/10 overflow-hidden z-[151] flex flex-col"
              style={{ borderRadius: "24px" }}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 bg-black/50 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-all z-30 backdrop-blur-md"
              >
                <X size={20} />
              </button>

              <div className="w-full h-[300px] md:h-[400px] bg-black relative flex items-center justify-center shrink-0 border-b border-white/5">
                <img
                  src={selectedProject.image.src || selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-contain p-4 relative z-10"
                />
                <img
                  src={selectedProject.image.src || selectedProject.image}
                  className="absolute inset-0 w-full h-full object-cover opacity-20 blur-xl"
                  alt=""
                />
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
                      <div className="w-4 h-[1px] bg-[#f19035]" />
                      ჩვენი სერვისები
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
    </section>
  );
};

export default Projects;
