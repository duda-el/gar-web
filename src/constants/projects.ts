import { StaticImageData } from "next/image";

import ZmnaImg1 from "@/Assets/images/zmna1.png";
import PayImg from "@/Assets/images/PayNety.jpg";
import BizonImg from "@/Assets/images/Bizon.jpg";
import BizonImg1 from "@/Assets/images/Bizon1.png";
import GreeImg from "@/Assets/images/gree.jpg";
import GreeImg1 from "@/Assets/images/gree.png";
import FreezerImg from "@/Assets/images/freezer.jpg";
import CoffeeonImg from "@/Assets/images/coffeeon-Untitled-2.jpg";
import CoffeeonImg1 from "@/Assets/images/coffeeon-Mockup.jpg";
import CoffeeonImg2 from "@/Assets/images/coffeeon-page1.jpg";
import CoffeeonImg3 from "@/Assets/images/coffeon-juice.jpeg";
import CoffeeonImg4 from "@/Assets/images/coffeeon-Untitled-22.jpg";
import UnistatImg1 from "@/Assets/images/unistat1.jpg";
import UnistatImg2 from "@/Assets/images/unistat2.jpg";
import MafiaImg from "@/Assets/images/mafia.jpg";
import MafiaImg1 from "@/Assets/images/mafia1.jpg";
import ReagentImg from "@/Assets/images/reagent.jpg";
import ReagentImg1 from "@/Assets/images/reagent1.jpg";
import ZmnaImg from "@/Assets/images/zmna.jpg";
import ItechnoImg from "@/Assets/images/ITechno.jpg";
import MechanxImg from "@/Assets/images/MechanX.jpg";

export interface Project {
  id: number;
  title: string;
  category: string;
  status: string;
  description: string;
  images: StaticImageData[];
  alt: string;
  services: string[];
  type: "website" | "design" | "uiux";
}

export const projects: Project[] = [
  {
    id: 1,
    title: "I-Techno",
    category: "Category: E-Commerce/Catalog",
    status: "Completed",
    type: "website",
    alt: "ITechno - Security systems and technology",
    description:
      "ITechno LLC was founded in 2017 and has spent 8 years successfully operating in Georgia's security systems market. Our work is built on professionalism, technical precision, and a strong sense of responsibility.",
    images: [ItechnoImg],
    services: [
      "UI/UX Design",
      "Web Development",
      "Full-Stack Development",
      "Content Management System",
      "SEO Optimization",
      "Caching",
      "Hosting & Maintenance",
    ],
  },
  {
    id: 2,
    title: "MechanX",
    category: "Category: E-Commerce/Catalog",
    status: "Completed",
    type: "website",
    alt: "MechanX - Online store for professional tools",
    description:
      "MechanX is a fresh take on the online market for machinery and construction tools, combining years of hands-on experience, quality, and customer-focused service.",
    images: [MechanxImg],
    services: [
      "UI/UX Design",
      "Web Development",
      "Full-Stack Development",
      "Content Management System",
      "SEO Optimization",
      "Caching",
      "Hosting & Maintenance",
    ],
  },
  {
    id: 3,
    title: "Zmna.ge",
    category: "Category: News",
    status: "Active",
    type: "website",
    alt: "Zmna.ge - News portal website",
    description:
      "A modern news portal focused on delivering fast, flexible content to its readers.",
    images: [ZmnaImg, ZmnaImg1],
    services: [
      "UI/UX Design",
      "Web Development",
      "Content Management System",
      "SEO Optimization",
      "Hosting & Maintenance",
    ],
  },
  {
    id: 4,
    title: "PayNety",
    category: "Category: Informational",
    status: "Paused",
    type: "website",
    alt: "PayNety - Fintech platform",
    description:
      "A fintech platform that simplifies online payments and data management.",
    images: [PayImg],
    services: ["Frontend Development", "UI/UX Design", "Hosting & Maintenance"],
  },
  {
    id: 5,
    title: "Reagent.ge",
    category: "Category: Catalog",
    status: "Completed",
    type: "website",
    alt: "Reagent.ge - Informational website for reagents and laboratory glassware",
    description:
      "Premium-grade reagents. REAGENT GROUP offers top-quality chemical reagents for laboratories and industrial use.",
    images: [ReagentImg, ReagentImg1],
    services: ["Frontend Development", "UI/UX Design", "Hosting & Maintenance"],
  },
  {
    id: 6,
    title: "Bizon.ge",
    category: "Category: Rental",
    status: "Completed",
    type: "website",
    alt: "Bizon.ge - Heavy machinery rental platform",
    description:
      "An innovative marketplace for heavy machinery rental, with a smooth search and booking system.",
    images: [BizonImg, BizonImg1],
    services: ["Frontend Development", "Redesign & Refactor"],
  },
  {
    id: 7,
    title: "Gree",
    category: "Category: E-commerce",
    status: "Completed",
    type: "website",
    alt: "Gree - Online store for air conditioning equipment",
    description:
      "An online store for air conditioning and climate control equipment, helping customers easily browse and purchase products.",
    images: [GreeImg, GreeImg1],
    services: [
      "Frontend Development",
      "UI/UX Design",
      "Hosting & Maintenance",
      "Content Management System",
    ],
  },
  {
    id: 8,
    title: "Freezer",
    category: "Category: Poster",
    status: "Completed",
    type: "design",
    alt: "Freezer - Advertising poster design",
    description:
      "Visual design for advertising materials and social media communication.",
    images: [FreezerImg],
    services: ["Poster Design", "Social Media Kit"],
  },
  {
    id: 9,
    title: "COFFEEON",
    category: "Category: Branding",
    status: "Completed",
    type: "design",
    alt: "COFFEEON - Visual identity for a coffee brand",
    description:
      "Visual identity for a coffee brand, including logo concept, packaging design, and social media styling.",
    images: [
      CoffeeonImg4,
      CoffeeonImg,
      CoffeeonImg1,
      CoffeeonImg2,
      CoffeeonImg3,
    ],
    services: [
      "Brand Identity",
      "Logo Design",
      "Packaging Design",
      "Social Media Assets",
    ],
  },
  {
    id: 10,
    title: "UNISTATS",
    category: "Category: UI/UX Design",
    status: "Completed",
    type: "uiux",
    alt: "UNISTATS - Analytics platform interface",
    description:
      "Interface design for an analytics platform, focused on turning complex data into simple, easy-to-grasp visuals.",
    images: [UnistatImg1, UnistatImg2],
    services: [
      "Dashboard Design",
      "Data Visualization",
      "User Flow Architecture",
      "Interactive Prototypes",
    ],
  },
  {
    id: 11,
    title: "NOSTAL.GE",
    category: "Category: UI/UX Design",
    status: "Completed",
    type: "uiux",
    alt: "NOSTAL.GE - Gaming platform interface design",
    description:
      "Interface design for a gaming platform, tailored to gamers' interests and a dynamic user experience.",
    images: [MafiaImg, MafiaImg1],
    services: [
      "Gaming Interface Design",
      "User Experience Research",
      "Dark Mode UI",
      "Interactive Elements",
    ],
  },
];
