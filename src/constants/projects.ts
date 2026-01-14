import { StaticImageData } from "next/image";

import ZmnaImg from "@/Assets/images/zmna.png";
import PayImg from "@/Assets/images/PayNety.jpg";
import BizonImg from "@/Assets/images/Bizon.png";
import GreeImg from "@/Assets/images/gree.png";
import FreezerImg from "@/Assets/images/freezer.jpg";
import CoffeeonImg from "@/Assets/images/coffeeon-Untitled-2.jpg";
import CoffeeonImg1 from "@/Assets/images/coffeeon-Mockup.jpg";
import CoffeeonImg2 from "@/Assets/images/coffeeon-page1.jpg";
import CoffeeonImg3 from "@/Assets/images/coffeon-juice.jpeg";
import CoffeeonImg4 from "@/Assets/images/coffeeon-Untitled-22.jpg";
import UnistatImg from "@/Assets/images/unistat.jpg";
import UnistatImg1 from "@/Assets/images/unistat1.jpg";
import UnistatImg2 from "@/Assets/images/unistat2.jpg";
import MafiaImg from "@/Assets/images/mafia.jpg";
import MafiaImg1 from "@/Assets/images/mafia1.jpg";

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
    title: "Zmna.ge",
    category: "კატეგორია: ახალი ამბები",
    status: "აქტიური",
    type: "website",
    alt: "Zmna.ge - საინფორმაციო პორტალის ვებ-გვერდი",
    description:
      "თანამედროვე საინფორმაციო პორტალი, რომელიც ორიენტირებულია მომხმარებლისთვის სწრაფ და მოქნილ კონტენტის მიწოდებაზე.",
    images: [ZmnaImg],
    services: [
      "UI/UX დიზაინი",
      "Web Development",
      "Content Management System",
      "SEO ოპტიმიზაცია",
      "Hosting & Maintenance",
    ],
  },
  {
    id: 2,
    title: "PayNety",
    category: "კატეგორია: ინფორმაციული",
    status: "შეჩერებული",
    type: "website",
    alt: "PayNety - ფინანსური ტექნოლოგიების პლატფორმა",
    description:
      "ფინანსური ტექნოლოგიების პლატფორმა, რომელიც ამარტივებს ონლაინ გადახდების პროცესს და მონაცემთა მართვას.",
    images: [PayImg],
    services: [
      "Frontend Development",
      "UI/UX დიზაინი",
      "Hosting & Maintenance",
    ],
  },
  {
    id: 3,
    title: "Bizon.ge",
    category: "კატეგორია: გაქირავება",
    status: "დასრულებული",
    type: "website",
    alt: "Bizon.ge - მძიმე ტექნიკის გაქირავების პლატფორმა",
    description:
      "მძიმე ტექნიკის გაქირავების ინოვაციური მარკეტპლეისი, გამართული ძიებისა და დაჯავშნის სისტემით.",
    images: [BizonImg],
    services: [
      "Frontend Development",
      "Redesign & Refactor",
    ],
  },
  {
    id: 4,
    title: "Gree",
    category: "კატეგორია: E-commerce",
    status: "დასრულებული",
    type: "website",
    alt: "Gree - კონდიცირების ტექნიკის ონლაინ მაღაზია",
    description:
      "კონდიცირებისა და კლიმატური ტექნიკის ონლაინ მაღაზია, რომელიც მომხმარებელს პროდუქციის მარტივად შერჩევასა და შეძენაში ეხმარება.",
    images: [GreeImg],
    services: [
      "Frontend Development",
      "UI/UX დიზაინი",
      "Hosting & Maintenance",
      "Content Management System",
    ],
  },
  {
    id: 5,
    title: "Freezer",
    category: "კატეგორია: პოსტერი",
    status: "დასრულებული",
    type: "design",
    alt: "Freezer - სარეკლამო პოსტერის დიზაინი",
    description:
      "სარეკლამო მასალების და სოციალური მედიის ვიზუალური კომუნიკაციის დიზაინი.",
    images: [FreezerImg],
    services: ["Poster Design", "Social Media Kit"],
  },
  {
    id: 6,
    title: "COFFEEON",
    category: "კატეგორია: ბრენდინგი",
    status: "დასრულებული",
    type: "design",
    alt: "COFFEEON - ყავის ბრენდის ვიზუალური იდენტობა",
    description:
      "ყავის ბრენდის ვიზუალური იდენტობა, რომელიც მოიცავს ლოგოს კონცეფციას, შეფუთვის დიზაინსა და სოციალური მედიის სტილისტიკას.",
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
    id: 7,
    title: "UNISTATS",
    category: "კატეგორია: UI/UX დიზაინი",
    status: "დასრულებული",
    type: "uiux",
    alt: "UNISTATS - ანალიტიკური პლატფორმის ინტერფეისი",
    description:
      "ანალიტიკური პლატფორმის ინტერფეისის დიზაინი, რომელიც რთული მონაცემების მარტივ და აღქმად ვიზუალიზაციაზეა ორიენტირებული.",
    images: [UnistatImg, UnistatImg1, UnistatImg2],
    services: [
      "Dashboard Design",
      "Data Visualization",
      "User Flow Architecture",
      "Interactive Prototypes",
    ],
  },
  {
    id: 8,
    title: "NOSTAL.GE",
    category: "კატეგორია: UI/UX დიზაინი",
    status: "დასრულებული",
    type: "uiux",
    alt: "NOSTAL.GE - სათამაშო პლატფორმის ინტერფეისის დიზაინი",
    description:
      "სათამაშო პლატფორმის ინტერფეისის დიზაინი, რომელიც მორგებულია გეიმერების ინტერესებსა და დინამიკურ მომხმარებლის გამოცდილებაზე.",
    images: [MafiaImg, MafiaImg1],
    services: [
      "Gaming Interface Design",
      "User Experience Research",
      "Dark Mode UI",
      "Interactive Elements",
    ],
  },
];