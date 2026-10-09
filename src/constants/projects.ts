import { StaticImageData } from "next/image";
import type { Locale } from "@/i18n/config";

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

/** Service tags shown on project cards and pages, translated once here */
const serviceLabels = {
  uiux: { en: "UI/UX Design", ka: "UI/UX დიზაინი" },
  frontend: { en: "Frontend Development", ka: "ფრონტენდ დეველოპმენტი" },
  fullstack: { en: "Full-Stack Development", ka: "Full-Stack დეველოპმენტი" },
  web: { en: "Web Development", ka: "ვებ დეველოპმენტი" },
  cms: { en: "Content Management System", ka: "კონტენტის მართვის სისტემა" },
  seo: { en: "SEO Optimization", ka: "SEO ოპტიმიზაცია" },
  caching: { en: "Caching", ka: "ქეშირება" },
  hosting: { en: "Hosting & Maintenance", ka: "ჰოსტინგი და მხარდაჭერა" },
  redesign: { en: "Redesign & Refactor", ka: "რედიზაინი და რეფაქტორინგი" },
  poster: { en: "Poster Design", ka: "პოსტერის დიზაინი" },
  socialKit: { en: "Social Media Kit", ka: "სოციალური მედიის ნაკრები" },
  brandIdentity: { en: "Brand Identity", ka: "ბრენდის იდენტობა" },
  logo: { en: "Logo Design", ka: "ლოგოს დიზაინი" },
  packaging: { en: "Packaging Design", ka: "შეფუთვის დიზაინი" },
  socialAssets: { en: "Social Media Assets", ka: "სოციალური მედიის ვიზუალები" },
  dashboard: { en: "Dashboard Design", ka: "დაფის დიზაინი" },
  dataviz: { en: "Data Visualization", ka: "მონაცემთა ვიზუალიზაცია" },
  userFlow: { en: "User Flow Architecture", ka: "მომხმარებლის გზის არქიტექტურა" },
  prototypes: { en: "Interactive Prototypes", ka: "ინტერაქტიული პროტოტიპები" },
  gamingUI: { en: "Gaming Interface Design", ka: "სათამაშო ინტერფეისის დიზაინი" },
  uxResearch: { en: "User Experience Research", ka: "მომხმარებლის გამოცდილების კვლევა" },
  darkMode: { en: "Dark Mode UI", ka: "მუქი რეჟიმის UI" },
  interactive: { en: "Interactive Elements", ka: "ინტერაქტიული ელემენტები" },
} satisfies Record<string, Record<Locale, string>>;

type ServiceKey = keyof typeof serviceLabels;

export interface ProjectContent {
  category: string;
  industry: string;
  alt: string;
  description: string;
  overview: string[];
  highlights: string[];
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  /** Live website, only for projects that are publicly online */
  url?: string;
  status: "completed" | "active";
  type: "website" | "design" | "uiux";
  images: StaticImageData[];
  services: ServiceKey[];
  content: Record<Locale, ProjectContent>;
}

/** A project's texts and service tags in the given language */
export function localizeProject(project: Project, locale: Locale) {
  return {
    ...project.content[locale],
    services: project.services.map((key) => serviceLabels[key][locale]),
  };
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "gms-turbo",
    title: "GMS Turbo",
    url: "https://gmsturbo.ge",
    status: "completed",
    type: "website",
    images: [GmsTurboImg],
    services: ["uiux", "frontend", "fullstack", "seo", "hosting"],
    content: {
      en: {
        category: "E-Commerce/Catalog",
        industry: "Automotive",
        alt: "GMS Turbo - Turbocharger repair and sales",
        description:
          "GMS Turbo is a premium platform for turbocharger service and diagnostics. The website stands out with a modern look, an effective catalog, and customer-focused navigation.",
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
      },
      ka: {
        category: "ონლაინ მაღაზია/კატალოგი",
        industry: "ავტომობილები",
        alt: "GMS Turbo - ტურბოკომპრესორების შეკეთება და გაყიდვა",
        description:
          "GMS Turbo წარმოადგენს ტურბოკომპრესორების სერვისისა და დიაგნოსტიკის პრემიუმ პლატფორმას. ვებ გვერდი გამოირჩევა თანამედროვე ვიზუალით, ეფექტური კატალოგითა და მომხმარებელზე ორიენტირებული ნავიგაციით.",
        overview: [
          "GMS Turbo სხვადასხვა ტიპის ავტომობილებისთვის უმაღლესი ხარისხის ტურბინებსა და ტურბოსისტემების ნაწილებს გთავაზობთ. გამოცდილი გუნდი მომხმარებელს საჭირო კომპონენტების შერჩევასა და ინსტალაციაში ეხმარება.",
          "შევქმენით კატალოგზე დაფუძნებული ვებ საიტი, რომელიც პროდუქციას მკაფიოდ წარმოადგენს, აღწერს კომპანიის შეკეთებისა და დიაგნოსტიკის სერვისებს და მომხმარებელს დაკავშირებას უმარტივებს.",
        ],
        highlights: [
          "ტურბოკომპრესორებისა და ტურბოსისტემების ნაწილების კატალოგი",
          "შეკეთებისა და დიაგნოსტიკის სერვისების გვერდები",
          "სუფთა, ტექნიკური ვიზუალური სტილი",
          "SEO, ჰოსტინგი და მუდმივი მხარდაჭერა",
        ],
      },
    },
  },
  {
    id: 2,
    slug: "i-techno",
    title: "I-Techno",
    url: "https://itechno.ge",
    status: "completed",
    type: "website",
    images: [ItechnoImg],
    services: ["uiux", "web", "fullstack", "cms", "seo", "caching", "hosting"],
    content: {
      en: {
        category: "E-Commerce/Catalog",
        industry: "Security & Technology",
        alt: "ITechno - Security systems and technology",
        description:
          "ITechno LLC was founded in 2017 and has spent 8 years successfully operating in Georgia's security systems market. Our work is built on professionalism, technical precision, and a strong sense of responsibility.",
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
      },
      ka: {
        category: "ონლაინ მაღაზია/კატალოგი",
        industry: "უსაფრთხოება და ტექნოლოგიები",
        alt: "ITechno - უსაფრთხოების სისტემები და ტექნოლოგიები",
        description:
          "შპს „აითექნო“ დაარსდა 2017 წელს და უკვე 8 წელია წარმატებით ოპერირებს საქართველოს ბაზარზე უსაფრთხოების სისტემების სფეროში. ჩვენი საქმიანობა ეფუძნება პროფესიონალიზმს, ტექნიკურ სიზუსტესა და მაღალ პასუხისმგებლობას.",
        overview: [
          "I-Techno 2017 წლიდან მუშაობს საქართველოს უსაფრთხოების სისტემების ბაზარზე და გთავაზობთ სამეთვალყურეო კამერებს, სიგნალიზაციასა და ჭკვიანი სახლის სისტემებს.",
          "დავაპროექტეთ და ავაწყეთ Full-Stack ონლაინ კატალოგი კონტენტის მართვის სისტემით, რათა გუნდმა პროდუქცია და კონტენტი დამოუკიდებლად მართოს. ქეშირებამ და SEO-მ გვერდები სწრაფი და საძიებო სისტემებში ადვილად მოსაძებნი გახადა.",
        ],
        highlights: [
          "სამეთვალყურეო კამერების, სიგნალიზაციისა და ჭკვიანი სახლის სისტემების კატალოგი",
          "ინდივიდუალური CMS პროდუქციისა და კონტენტისთვის",
          "ქეშირება გვერდების სწრაფი ჩატვირთვისთვის",
          "SEO ოპტიმიზაცია, ჰოსტინგი და მხარდაჭერა",
        ],
      },
    },
  },
  {
    id: 3,
    slug: "mechanx",
    title: "MechanX",
    url: "https://www.mechanx.ge",
    status: "completed",
    type: "website",
    images: [MechanxImg],
    services: ["uiux", "web", "fullstack", "cms", "seo", "caching", "hosting"],
    content: {
      en: {
        category: "E-Commerce/Catalog",
        industry: "Tools & Equipment",
        alt: "MechanX - Online store for professional tools",
        description:
          "MechanX is a fresh take on the online market for machinery and construction tools, combining years of hands-on experience, quality, and customer-focused service.",
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
      },
      ka: {
        category: "ონლაინ მაღაზია/კატალოგი",
        industry: "ხელსაწყოები და აღჭურვილობა",
        alt: "MechanX - პროფესიონალური ხელსაწყოების ონლაინ მაღაზია",
        description:
          "MechanX - ახალი სიტყვა ტექნიკისა და სამშენებლო ხელსაწყოების ონლაინ ბაზარზე, რომელიც აერთიანებს მრავალწლიან პრაქტიკულ გამოცდილებას, ხარისხსა და მომხმარებელზე ორიენტირებულ სერვისს.",
        overview: [
          "MechanX პროფესიონალური ხელსაწყოების ონლაინ მაღაზიაა: ბურღები, ელექტრო ხელსაწყოები და სამშენებლო აღჭურვილობა, გარანტიითა და მიწოდებით მთელ საქართველოში.",
          "მაღაზია სრულად ავაწყეთ, UI/UX დიზაინიდან Full-Stack პლატფორმამდე CMS-ით, ქეშირებითა და SEO-თი, რათა მომხმარებელმა საჭირო ხელსაწყო სწრაფად იპოვოს, გუნდმა კი კატალოგი დამოუკიდებლად მართოს.",
        ],
        highlights: [
          "ელექტრო ხელსაწყოებისა და სამშენებლო აღჭურვილობის ონლაინ მაღაზია",
          "ინდივიდუალური CMS პროდუქციის კატალოგისთვის",
          "ქეშირება და სისწრაფის ოპტიმიზაცია",
          "SEO ოპტიმიზაცია, ჰოსტინგი და მხარდაჭერა",
        ],
      },
    },
  },
  {
    id: 4,
    slug: "reputation-ge",
    title: "Reputation.ge",
    url: "https://reputation.ge",
    status: "completed",
    type: "website",
    images: [ReputationImg],
    services: ["uiux", "web", "cms", "seo", "hosting"],
    content: {
      en: {
        category: "Media/Portal",
        industry: "Media",
        alt: "Reputation.ge - News and media portal",
        description:
          "A modern Georgian media platform and online magazine covering PR, marketing and personal branding, with company case studies, news and analysis delivered quickly and clearly.",
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
      },
      ka: {
        category: "მედია/პორტალი",
        industry: "მედია",
        alt: "Reputation.ge - საინფორმაციო და მედია პორტალი",
        description:
          "თანამედროვე ქართული მედია პლატფორმა და ონლაინ ჟურნალი PR-ის, მარკეტინგისა და პერსონალური ბრენდინგის შესახებ: კომპანიების ქეისები, სიახლეები და ანალიტიკა, სწრაფად და მკაფიოდ მიწოდებული.",
        overview: [
          "Reputation.ge ონლაინ გამოცემაა PR-ის, მარკეტინგისა და პერსონალური ბრენდინგის შესახებ, სადაც თავმოყრილია კომპანიების წარმატების ისტორიები, PR სტრატეგიები, ქეისები და ანალიტიკა.",
          "დავაპროექტეთ და ავაწყეთ პორტალი კონტენტის მართვის სისტემით, რომელიც რედაქტორებს სტატიების სწრაფად გამოქვეყნების საშუალებას აძლევს, და საძიებო სისტემებისთვის ოპტიმიზაცია გავუკეთეთ, რომ სტატიებმა თავის მკითხველამდე მიაღწიოს.",
        ],
        highlights: [
          "სარედაქციო განლაგება სიახლეების, ქეისებისა და ანალიტიკისთვის",
          "CMS სტატიების გამოქვეყნებისა და მართვისთვის",
          "სტატიების SEO ოპტიმიზაცია",
          "ჰოსტინგი და მხარდაჭერა",
        ],
      },
    },
  },
  {
    id: 5,
    slug: "zmna-ge",
    title: "Zmna.ge",
    url: "https://www.zmna.ge",
    status: "active",
    type: "website",
    images: [ZmnaImg, ZmnaImg2, ZmnaImg1],
    services: ["uiux", "web", "cms", "seo", "hosting"],
    content: {
      en: {
        category: "News",
        industry: "Media",
        alt: "Zmna.ge - News portal website",
        description:
          "A modern news portal focused on delivering fast, flexible content to its readers.",
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
      },
      ka: {
        category: "ახალი ამბები",
        industry: "მედია",
        alt: "Zmna.ge - საინფორმაციო პორტალის ვებ გვერდი",
        description:
          "თანამედროვე საინფორმაციო პორტალი, რომელიც ორიენტირებულია მკითხველისთვის სწრაფ და მოქნილ კონტენტის მიწოდებაზე.",
        overview: [
          "Zmna.ge გასართობ-შემეცნებითი ონლაინ მედიაა, რომელიც აშუქებს ასტროლოგიას, კულინარიას, ჯანმრთელობას, შოუბიზნესის სიახლეებსა და სხვა თემებს.",
          "შევქმენით სწრაფი და მოქნილი საინფორმაციო პორტალი კონტენტის მართვის სისტემით, თამამი მთავარი გვერდითა და კატეგორიების ნავიგაციით, რომელიც მკითხველს საინტერესო თემების პოვნაში ეხმარება.",
        ],
        highlights: [
          "მთავარი გვერდი გამორჩეული სტატიების სლაიდერითა და კატეგორიების ბადით",
          "მრავალ თემაზე გადანაწილებული კატეგორიების ნავიგაცია",
          "CMS ყოველდღიური გამოქვეყნებისთვის",
          "SEO ოპტიმიზაცია, ჰოსტინგი და მხარდაჭერა",
        ],
      },
    },
  },
  {
    id: 6,
    slug: "reagent-ge",
    title: "Reagent.ge",
    url: "https://www.reagent.ge",
    status: "completed",
    type: "website",
    images: [ReagentImg, ReagentImg1],
    services: ["frontend", "uiux", "hosting"],
    content: {
      en: {
        category: "Catalog",
        industry: "Laboratory Supplies",
        alt: "Reagent.ge - Informational website for reagents and laboratory glassware",
        description:
          "Premium-grade reagents. REAGENT GROUP offers top-quality chemical reagents for laboratories and industrial use.",
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
      },
      ka: {
        category: "კატალოგი",
        industry: "ლაბორატორიული მასალები",
        alt: "Reagent.ge - საინფორმაციო ვებ საიტი რეაქტივებისა და ლაბორატორიული ჭურჭლის შესახებ",
        description:
          "პრემიუმ ხარისხის რეაქტივები. REAGENT GROUP გთავაზობთ უმაღლესი ხარისხის ქიმიურ რეაქტივებს ლაბორატორიებისთვის და ინდუსტრიული მიზნებისთვის.",
        overview: [
          "Reagent Group საქართველოში ლაბორატორიებსა და ინდუსტრიულ სექტორს უმაღლესი ხარისხის ქიმიური რეაქტივებითა და ლაბორატორიული ჭურჭლით ამარაგებს.",
          "დავაპროექტეთ და ავაწყეთ საინფორმაციო კატალოგი, რომელიც პროდუქციას სუფთად და სანდოდ წარმოადგენს.",
        ],
        highlights: [
          "ქიმიური რეაქტივებისა და ლაბორატორიული ჭურჭლის კატალოგი",
          "სუფთა, კლინიკური ვიზუალური დიზაინი",
          "ფრონტენდ დეველოპმენტი",
          "ჰოსტინგი და მხარდაჭერა",
        ],
      },
    },
  },
  {
    id: 7,
    slug: "bizon-ge",
    title: "Bizon.ge",
    url: "https://bizon.ge",
    status: "completed",
    type: "website",
    images: [BizonImg, BizonImg2, BizonImg1],
    services: ["frontend", "redesign"],
    content: {
      en: {
        category: "Rental",
        industry: "Heavy Machinery",
        alt: "Bizon.ge - Heavy machinery rental platform",
        description:
          "An innovative marketplace for heavy machinery rental, with a smooth search and booking system.",
        overview: [
          "Bizon.ge is an online marketplace for renting heavy machinery in Georgia, covering construction, agricultural and transport vehicles.",
          "We redesigned and refactored the frontend, improving the search and booking experience so users can filter by category, type, manufacturer and model.",
        ],
        highlights: [
          "Search with filters for category, type, manufacturer and model",
          "Sections for construction, agriculture and transport machinery",
          "Frontend redesign and code refactor",
        ],
      },
      ka: {
        category: "გაქირავება",
        industry: "მძიმე ტექნიკა",
        alt: "Bizon.ge - მძიმე ტექნიკის გაქირავების პლატფორმა",
        description:
          "მძიმე ტექნიკის გაქირავების ინოვაციური მარკეტპლეისი, გამართული ძიებისა და დაჯავშნის სისტემით.",
        overview: [
          "Bizon.ge მძიმე ტექნიკის გაქირავების ონლაინ მარკეტპლეისია საქართველოში, რომელიც მოიცავს სამშენებლო, სასოფლო-სამეურნეო და სატრანსპორტო ტექნიკას.",
          "გავაკეთეთ ფრონტენდის რედიზაინი და რეფაქტორინგი, გავაუმჯობესეთ ძიებისა და დაჯავშნის გამოცდილება, რომ მომხმარებელმა ტექნიკა კატეგორიის, ტიპის, მწარმოებლისა და მოდელის მიხედვით გაფილტროს.",
        ],
        highlights: [
          "ძიება ფილტრებით: კატეგორია, ტიპი, მწარმოებელი და მოდელი",
          "სამშენებლო, სასოფლო-სამეურნეო და სატრანსპორტო ტექნიკის სექციები",
          "ფრონტენდის რედიზაინი და კოდის რეფაქტორინგი",
        ],
      },
    },
  },
  {
    id: 8,
    slug: "gree",
    title: "Gree",
    status: "completed",
    type: "website",
    images: [GreeImg, GreeImg1],
    services: ["frontend", "uiux", "hosting", "cms"],
    content: {
      en: {
        category: "E-commerce",
        industry: "Climate Equipment",
        alt: "Gree - Online store for air conditioning equipment",
        description:
          "An online store for air conditioning and climate control equipment, helping customers easily browse and purchase products.",
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
      },
      ka: {
        category: "ონლაინ მაღაზია",
        industry: "კლიმატური ტექნიკა",
        alt: "Gree - კონდიცირების ტექნიკის ონლაინ მაღაზია",
        description:
          "კონდიცირებისა და კლიმატური ტექნიკის ონლაინ მაღაზია, რომელიც მომხმარებელს პროდუქციის მარტივად შერჩევასა და შეძენაში ეხმარება.",
        overview: [
          "Gree კონდიციონერებისა და კლიმატური ტექნიკის ონლაინ მაღაზიაა.",
          "დავაპროექტეთ და ავაწყეთ მაღაზია, რომელიც მომხმარებელს პროდუქციის მარტივად დათვალიერებასა და შეძენაში ეხმარება, კატალოგის მართვისთვის კი CMS დავამატეთ.",
        ],
        highlights: [
          "კონდიცირებისა და კლიმატური ტექნიკის კატალოგი",
          "UI/UX დიზაინი და ფრონტენდ დეველოპმენტი",
          "CMS პროდუქციისთვის",
          "ჰოსტინგი და მხარდაჭერა",
        ],
      },
    },
  },
  {
    id: 9,
    slug: "freezer",
    title: "Freezer",
    status: "completed",
    type: "design",
    images: [FreezerImg],
    services: ["poster", "socialKit"],
    content: {
      en: {
        category: "Poster",
        industry: "Advertising",
        alt: "Freezer - Advertising poster design",
        description: "Visual design for advertising materials and social media communication.",
        overview: ["Visual design for Freezer's advertising materials and social media communication."],
        highlights: ["Advertising poster design", "Social media kit"],
      },
      ka: {
        category: "პოსტერი",
        industry: "რეკლამა",
        alt: "Freezer - სარეკლამო პოსტერის დიზაინი",
        description: "სარეკლამო მასალებისა და სოციალური მედიის ვიზუალური კომუნიკაციის დიზაინი.",
        overview: ["Freezer-ის სარეკლამო მასალებისა და სოციალური მედიის ვიზუალური კომუნიკაციის დიზაინი."],
        highlights: ["სარეკლამო პოსტერის დიზაინი", "სოციალური მედიის ნაკრები"],
      },
    },
  },
  {
    id: 10,
    slug: "coffeeon",
    title: "COFFEEON",
    status: "completed",
    type: "design",
    images: [CoffeeonImg4, CoffeeonImg, CoffeeonImg1, CoffeeonImg2, CoffeeonImg3],
    services: ["brandIdentity", "logo", "packaging", "socialAssets"],
    content: {
      en: {
        category: "Branding",
        industry: "Food & Beverage",
        alt: "COFFEEON - Visual identity for a coffee brand",
        description:
          "Visual identity for a coffee brand, including logo concept, packaging design, and social media styling.",
        overview: [
          "A complete visual identity for the COFFEEON coffee brand.",
          "The work covers the logo concept, packaging design and a consistent social media style, so the brand looks the same on the cup, the shelf and the feed.",
        ],
        highlights: ["Logo concept and brand identity", "Packaging design", "Social media assets"],
      },
      ka: {
        category: "ბრენდინგი",
        industry: "კვება და სასმელები",
        alt: "COFFEEON - ყავის ბრენდის ვიზუალური იდენტობა",
        description:
          "ყავის ბრენდის ვიზუალური იდენტობა, რომელიც მოიცავს ლოგოს კონცეფციას, შეფუთვის დიზაინსა და სოციალური მედიის სტილისტიკას.",
        overview: [
          "COFFEEON-ის ყავის ბრენდის სრული ვიზუალური იდენტობა.",
          "ნამუშევარი მოიცავს ლოგოს კონცეფციას, შეფუთვის დიზაინსა და ერთიან სტილს სოციალური მედიისთვის, რომ ბრენდი ერთნაირად გამოიყურებოდეს ჭიქაზე, თაროზე და ფიდში.",
        ],
        highlights: ["ლოგოს კონცეფცია და ბრენდის იდენტობა", "შეფუთვის დიზაინი", "სოციალური მედიის ვიზუალები"],
      },
    },
  },
  {
    id: 11,
    slug: "unistats",
    title: "UNISTATS",
    status: "completed",
    type: "uiux",
    images: [UnistatImg, UnistatImg1, UnistatImg2],
    services: ["dashboard", "dataviz", "userFlow", "prototypes"],
    content: {
      en: {
        category: "UI/UX Design",
        industry: "Education & Analytics",
        alt: "UNISTATS - Analytics platform interface",
        description:
          "Interface design for an analytics platform, focused on turning complex data into simple, easy-to-grasp visuals.",
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
      },
      ka: {
        category: "UI/UX დიზაინი",
        industry: "განათლება და ანალიტიკა",
        alt: "UNISTATS - ანალიტიკური პლატფორმის ინტერფეისი",
        description:
          "ანალიტიკური პლატფორმის ინტერფეისის დიზაინი, რომელიც რთული მონაცემების მარტივ და აღქმად ვიზუალიზაციაზეა ორიენტირებული.",
        overview: [
          "UNISTATS საქართველოს უნივერსიტეტების სტატისტიკის ანალიტიკური პლატფორმაა სტუდენტების, აბიტურიენტებისა და უნივერსიტეტების რეიტინგების მონაცემებით.",
          "ინტერფეისი ისე დავაპროექტეთ, რომ რთული მონაცემები მარტივ ვიზუალად იქცეს: დაფა მთავარი მაჩვენებლებით, რეიტინგების ცხრილები და უნივერსიტეტების რუკა მთელი ქვეყნის მასშტაბით.",
        ],
        highlights: [
          "დაფა მთავარი სტატისტიკით",
          "უნივერსიტეტებისა და სტუდენტების რეიტინგები",
          "მონაცემთა ვიზუალიზაცია რუკაზე",
          "მომხმარებლის გზები და ინტერაქტიული პროტოტიპები",
        ],
      },
    },
  },
  {
    id: 12,
    slug: "nostal-ge",
    title: "NOSTAL.GE",
    status: "completed",
    type: "uiux",
    images: [MafiaImg, MafiaImg1],
    services: ["gamingUI", "uxResearch", "darkMode", "interactive"],
    content: {
      en: {
        category: "UI/UX Design",
        industry: "Gaming",
        alt: "NOSTAL.GE - Gaming platform interface design",
        description:
          "Interface design for a gaming platform, tailored to gamers' interests and a dynamic user experience.",
        overview: [
          "NOSTAL.GE is a gaming platform. We designed its interface around what gamers care about and a dynamic user experience.",
        ],
        highlights: [
          "Gaming interface design",
          "User experience research",
          "Dark mode UI",
          "Interactive elements",
        ],
      },
      ka: {
        category: "UI/UX დიზაინი",
        industry: "გეიმინგი",
        alt: "NOSTAL.GE - სათამაშო პლატფორმის ინტერფეისის დიზაინი",
        description:
          "სათამაშო პლატფორმის ინტერფეისის დიზაინი, რომელიც მორგებულია გეიმერების ინტერესებსა და დინამიკურ მომხმარებლის გამოცდილებაზე.",
        overview: [
          "NOSTAL.GE სათამაშო პლატფორმაა. მისი ინტერფეისი გეიმერების ინტერესებსა და დინამიკურ მომხმარებლის გამოცდილებაზე მორგებით დავაპროექტეთ.",
        ],
        highlights: [
          "სათამაშო ინტერფეისის დიზაინი",
          "მომხმარებლის გამოცდილების კვლევა",
          "მუქი რეჟიმის UI",
          "ინტერაქტიული ელემენტები",
        ],
      },
    },
  },
];

export const getProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);
