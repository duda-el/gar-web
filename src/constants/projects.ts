import { StaticImageData } from "next/image";

import GmsTurboImg from "@/Assets/images/gmsturbo.png";
import ReputationImg from "@/Assets/images/reputation.png";
import ZmnaImg1 from "@/Assets/images/zmna1.png";
import BizonImg from "@/Assets/images/Bizon.jpg";
import BizonImg1 from "@/Assets/images/Bizon1.png";
import BizonImg2 from "@/Assets/images/Bizon.png";
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
import UnistatImg from "@/Assets/images/unistat.jpg";
import MafiaImg from "@/Assets/images/mafia.jpg";
import MafiaImg1 from "@/Assets/images/mafia1.jpg";
import ReagentImg from "@/Assets/images/reagent.jpg";
import ReagentImg1 from "@/Assets/images/reagent1.jpg";
import ZmnaImg from "@/Assets/images/zmna.jpg";
import ZmnaImg2 from "@/Assets/images/zmna.png";
import ItechnoImg from "@/Assets/images/ITechno.jpg";
import MechanxImg from "@/Assets/images/MechanX.jpg";

export interface Project {
  id: number;
  slug: string;
  title: string;
  /** Live website, only for projects that are publicly online */
  url?: string;
  industry: string;
  category: string;
  status: string;
  description: string;
  overview: string[];
  highlights: string[];
  images: StaticImageData[];
  alt: string;
  services: string[];
  type: "website" | "design" | "uiux";
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "gms-turbo",
    title: "GMS Turbo",
    url: "https://gmsturbo.ge",
    industry: "Automotive",
    overview: [
      "GMS Turbo supplies high-quality turbochargers and turbo system parts for a wide range of vehicles, backed by an experienced team that helps customers pick and install the right components.",
      "We designed and built a catalog-driven website that presents the product range clearly, explains the company's repair and diagnostics services, and makes it easy for customers to get in touch.",
    ],
    highlights: [
      "Product catalog for turbochargers and turbo system parts",
      "Service pages for repair and diagnostics",
      "Clean, technical visual style",
      "SEO setup, hosting and ongoing maintenance",
    ],
    category: "Category: E-Commerce/Catalog",
    status: "Completed",
    type: "website",
    alt: "GMS Turbo - Turbocharger repair and sales",
    description:
      "GMS Turbo is a premium platform for turbocharger service and diagnostics. The website stands out with a modern look, an effective catalog, and customer-focused navigation.",
    images: [GmsTurboImg],
    services: [
      "UI/UX Design",
      "Frontend Development",
      "Full-Stack Development",
      "SEO Optimization",
      "Hosting & Maintenance",
    ],
  },
  {
    id: 2,
    slug: "i-techno",
    title: "I-Techno",
    url: "https://itechno.ge",
    industry: "Security & Technology",
    overview: [
      "I-Techno has been working in Georgia's security systems market since 2017, offering surveillance cameras, alarm systems and smart home solutions.",
      "We designed and developed a full-stack e-commerce catalog with a content management system, so the team can manage products and content on their own, plus caching and SEO for fast, discoverable pages.",
    ],
    highlights: [
      "Catalog of surveillance cameras, alarms and smart home systems",
      "Custom CMS for products and content",
      "Caching for fast page loads",
      "SEO optimization, hosting and maintenance",
    ],
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
    id: 3,
    slug: "mechanx",
    title: "MechanX",
    url: "https://www.mechanx.ge",
    industry: "Tools & Equipment",
    overview: [
      "MechanX is an online store for professional tools: drills, power tools and construction equipment, sold with a warranty and delivered across Georgia.",
      "We built the store end to end, from UI/UX design to a full-stack platform with a CMS, caching and SEO, so customers can find the right tool quickly and the team can run the catalog themselves.",
    ],
    highlights: [
      "Online store for power tools and construction equipment",
      "Custom CMS for the product catalog",
      "Caching and performance optimization",
      "SEO optimization, hosting and maintenance",
    ],
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
    id: 4,
    slug: "reputation-ge",
    title: "Reputation.ge",
    url: "https://reputation.ge",
    industry: "Media",
    overview: [
      "Reputation.ge is an online publication about PR, marketing and personal branding, featuring company success stories, PR strategies, case studies and analysis.",
      "We designed and developed the portal with a content management system that lets editors publish articles quickly, and optimized it for search so stories reach their readers.",
    ],
    highlights: [
      "Editorial layout for news, case studies and analysis",
      "CMS for publishing and managing articles",
      "SEO optimization for articles",
      "Hosting and maintenance",
    ],
    category: "Category: Media/Portal",
    status: "Completed",
    type: "website",
    alt: "Reputation.ge - News and media portal",
    description:
      "A modern Georgian media platform and online magazine covering PR, marketing and personal branding, with company case studies, news and analysis delivered quickly and clearly.",
    images: [ReputationImg],
    services: [
      "UI/UX Design",
      "Web Development",
      "Content Management System",
      "SEO Optimization",
      "Hosting & Maintenance",
    ],
  },
  {
    id: 5,
    slug: "zmna-ge",
    title: "Zmna.ge",
    url: "https://www.zmna.ge",
    industry: "Media",
    overview: [
      "Zmna.ge is an entertainment and educational online media outlet covering astrology, cooking, health, show business news and more.",
      "We designed and built a fast, flexible news portal with a content management system, a bold homepage and category navigation that helps readers find the topics they care about.",
    ],
    highlights: [
      "Homepage with featured story slider and category grid",
      "Category navigation across many topics",
      "CMS for daily publishing",
      "SEO optimization, hosting and maintenance",
    ],
    category: "Category: News",
    status: "Active",
    type: "website",
    alt: "Zmna.ge - News portal website",
    description:
      "A modern news portal focused on delivering fast, flexible content to its readers.",
    images: [ZmnaImg, ZmnaImg2, ZmnaImg1],
    services: [
      "UI/UX Design",
      "Web Development",
      "Content Management System",
      "SEO Optimization",
      "Hosting & Maintenance",
    ],
  },
  {
    id: 6,
    slug: "reagent-ge",
    title: "Reagent.ge",
    url: "https://www.reagent.ge",
    industry: "Laboratory Supplies",
    overview: [
      "Reagent Group supplies high-quality chemical reagents and laboratory glassware for laboratories and industrial use in Georgia.",
      "We designed and developed an informational catalog website that presents the product range in a clean, trustworthy way.",
    ],
    highlights: [
      "Catalog of chemical reagents and laboratory glassware",
      "Clean, clinical visual design",
      "Frontend development",
      "Hosting and maintenance",
    ],
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
    id: 7,
    slug: "bizon-ge",
    title: "Bizon.ge",
    url: "https://bizon.ge",
    industry: "Heavy Machinery",
    overview: [
      "Bizon.ge is an online marketplace for renting heavy machinery in Georgia, covering construction, agricultural and transport vehicles.",
      "We redesigned and refactored the frontend, improving the search and booking experience so users can filter by category, type, manufacturer and model.",
    ],
    highlights: [
      "Search with filters for category, type, manufacturer and model",
      "Sections for construction, agriculture and transport machinery",
      "Frontend redesign and code refactor",
    ],
    category: "Category: Rental",
    status: "Completed",
    type: "website",
    alt: "Bizon.ge - Heavy machinery rental platform",
    description:
      "An innovative marketplace for heavy machinery rental, with a smooth search and booking system.",
    images: [BizonImg, BizonImg2, BizonImg1],
    services: ["Frontend Development", "Redesign & Refactor"],
  },
  {
    id: 8,
    slug: "gree",
    title: "Gree",
    industry: "Climate Equipment",
    overview: [
      "Gree is an online store for air conditioners and climate control equipment.",
      "We designed and developed a storefront that helps customers browse products easily and make purchases, with a CMS for managing the catalog.",
    ],
    highlights: [
      "Product catalog for air conditioning and climate equipment",
      "UI/UX design and frontend development",
      "CMS for products",
      "Hosting and maintenance",
    ],
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
    id: 9,
    slug: "freezer",
    title: "Freezer",
    industry: "Advertising",
    overview: [
      "Visual design for Freezer's advertising materials and social media communication.",
    ],
    highlights: [
      "Advertising poster design",
      "Social media kit",
    ],
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
    id: 10,
    slug: "coffeeon",
    title: "COFFEEON",
    industry: "Food & Beverage",
    overview: [
      "A complete visual identity for the COFFEEON coffee brand.",
      "The work covers the logo concept, packaging design and a consistent social media style, so the brand looks the same on the cup, the shelf and the feed.",
    ],
    highlights: [
      "Logo concept and brand identity",
      "Packaging design",
      "Social media assets",
    ],
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
    id: 11,
    slug: "unistats",
    title: "UNISTATS",
    industry: "Education & Analytics",
    overview: [
      "UNISTATS is an analytics platform for university statistics in Georgia, with data on students, applicants and university rankings.",
      "We designed the interface to turn complex data into simple visuals: a dashboard with key numbers, rating tables and a map of universities across the country.",
    ],
    highlights: [
      "Dashboard with key statistics",
      "University and student rankings",
      "Map-based data visualization",
      "User flows and interactive prototypes",
    ],
    category: "Category: UI/UX Design",
    status: "Completed",
    type: "uiux",
    alt: "UNISTATS - Analytics platform interface",
    description:
      "Interface design for an analytics platform, focused on turning complex data into simple, easy-to-grasp visuals.",
    images: [UnistatImg, UnistatImg1, UnistatImg2],
    services: [
      "Dashboard Design",
      "Data Visualization",
      "User Flow Architecture",
      "Interactive Prototypes",
    ],
  },
  {
    id: 12,
    slug: "nostal-ge",
    title: "NOSTAL.GE",
    industry: "Gaming",
    overview: [
      "NOSTAL.GE is a gaming platform. We designed its interface around what gamers care about and a dynamic user experience.",
    ],
    highlights: [
      "Gaming interface design",
      "User experience research",
      "Dark mode UI",
      "Interactive elements",
    ],
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

export const getProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);
