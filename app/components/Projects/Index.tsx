"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import ZmnaImg from "../../Assets/images/zmna.png";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: any;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Zmna.ge",
    category: "კატეგორია: News",
    description:
      "თანამედროვე საინფორმაციო პორტალი, რომელიც ორიენტირებულია მომხმარებლისთვის სწრაფ და მოქნილ კონტენტის მიწოდებაზე.",
    image: ZmnaImg,
  },
  {
    id: 2,
    title: "PayNety",
    category: "კატეგორია: ინფორმაციული",
    description:
      "ფინანსური ტექნოლოგიების პლატფორმა, რომელიც ამარტივებს ონლაინ გადახდების პროცესს და მონაცემთა მართვას.",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Bizon.ge",
    category: "კატეგორია: Rental",
    description:
      "მძიმე ტექნიკის გაქირავების ინოვაციური მარკეტპლეისი, გამართული ძიებისა და დაჯავშნის სისტემით.",
    image:
      "https://images.unsplash.com/photo-1581094288338-2314dddb7edd?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "SADME",
    category: "კატეგორია: ინფორმაციული",
    description:
      "ციფრული სივრცე, რომელიც აერთიანებს სხვადასხვა სერვისებს და სთავაზობს მომხმარებელს საჭირო ინფორმაციას.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
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
  const [hoveredDescriptionId, setHoveredDescriptionId] = useState<
    number | null
  >(null);

  return (
    <section
      className="relative py-24 px-6 overflow-hidden bg-[#121212]"
      id="projects"
    >
      <div className="absolute inset-0 bg-grid-white pointer-events-none opacity-20" />
      <div className="absolute top-20 right-[-5%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] ambient-glow animate-pulse" />

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
                className="h-[1px] bg-primary"
              />
              <p className="text-sm uppercase tracking-[0.2em] text-primary font-medium font-georgian">
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
              className="group relative flex flex-col bg-[#1c1c1c]/80 backdrop-blur-sm p-6 border border-white/5 hover:border-primary/30 transition-all duration-200 min-h-[420px] cursor-pointer"
              style={{ borderRadius: "var(--radius-4xl)" }}
            >
              <div
                className="relative w-full h-52 bg-[#252525] overflow-hidden mb-8 flex items-center justify-center"
                style={{ borderRadius: "var(--radius-3xl)" }}
              >
                {/* --- IMAGE ADDED HERE --- */}
                <img
                  src={project.image.src || project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <motion.div
                  whileHover={{ rotate: 90, scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-6 left-6 w-12 h-12 bg-black/50 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 transition-colors group-hover:bg-primary/20 z-10"
                >
                  <Sparkles className="size-6 text-primary animate-pulse" />
                </motion.div>
                <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.3)] pointer-events-none" />
              </div>

              <div className="mt-auto px-2 relative">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                  <span className="text-[10px] tracking-[0.2em] text-zinc-300 font-bold uppercase font-georgian">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold leading-tight tracking-tight text-white group-hover:text-primary transition-colors duration-200 font-georgian mb-3">
                  {project.title}
                </h3>

                <div
                  className="relative"
                  onMouseEnter={() => setHoveredDescriptionId(project.id)}
                  onMouseLeave={() => setHoveredDescriptionId(null)}
                >
                  <p className="text-sm text-zinc-300 font-georgian leading-relaxed line-clamp-4 italic">
                    {project.description}
                  </p>
                </div>
              </div>

              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-[0_0_30px_rgba(241,144,53,0.1)] pointer-events-none"
                style={{ borderRadius: "var(--radius-4xl)" }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
