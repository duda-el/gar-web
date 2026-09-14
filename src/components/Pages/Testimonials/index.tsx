"use client";

import { Star } from "lucide-react";

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  badge: "star" | "google";
};

const avatarPalette = [
  "#FFE7CF",
  "#FDE1DC",
  "#E5EEFD",
  "#E4F4EA",
  "#F2E7FB",
  "#FFF3D6",
];

function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden="true">
      <path
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9C16.66 14.2 17.64 11.9 17.64 9.2Z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.95v2.33A9 9 0 0 0 9 18Z"
        fill="#34A853"
      />
      <path
        d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.95A9 9 0 0 0 0 9c0 1.45.35 2.83.95 4.03l3-2.33Z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .95 4.97l3 2.33C4.66 5.17 6.65 3.58 9 3.58Z"
        fill="#EA4335"
      />
    </svg>
  );
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  const bg = avatarPalette[hashString(name) % avatarPalette.length];

  return (
    <div
      className="inline-flex items-center justify-center w-9 h-9 rounded-full font-outfit font-bold text-[12px] text-[#0E0E0E] shrink-0"
      style={{ backgroundColor: bg }}
    >
      {initials}
    </div>
  );
}

const testimonials: Testimonial[] = [
  {
    name: "Nini Kapanadze",
    role: "Founder, retail store",
    badge: "star",
    quote:
      "They scoped everything clearly upfront, no surprises on price or timeline, and the site was ready two weeks before our launch date.",
  },
  {
    name: "Davit Meskhi",
    role: "CEO, logistics startup",
    badge: "google",
    quote:
      "Our dashboard finally feels like it belongs to us. Fast, clean, and the admin panel makes onboarding new staff painless.",
  },
  {
    name: "Mariam Tsiklauri",
    role: "Marketing lead",
    badge: "star",
    quote:
      "They rebuilt our landing page in under three weeks and our conversion rate doubled within the first month.",
  },
  {
    name: "Giorgi Lomidze",
    role: "Founder, e-commerce store",
    badge: "google",
    quote:
      "Support after launch has been just as good as the build itself. Every small request gets handled within a day.",
  },
  {
    name: "Ana Beridze",
    role: "Product manager",
    badge: "star",
    quote:
      "Clear communication from brief to handover, we always knew exactly what stage the project was at.",
  },
  {
    name: "Luka Sordia",
    role: "Founder, booking platform",
    badge: "google",
    quote:
      "The booking system they built handles double the traffic we expected without a single hiccup.",
  },
  {
    name: "Tako Robakidze",
    role: "Operations manager",
    badge: "star",
    quote:
      "Hand-built, not templated, and it shows. The site feels exactly like our brand, down to the small details.",
  },
  {
    name: "Sandro Phutkaradze",
    role: "Founder, wholesale supplier",
    badge: "google",
    quote:
      "Straightforward pricing and a staging link from week one, we could see real progress the whole way through.",
  },
  {
    name: "Keti Vashakidze",
    role: "Marketing director",
    badge: "star",
    quote:
      "Fast replies, sharp design decisions, and a site that actually loads fast on mobile, not just on their demo.",
  },
];

const columns: { items: Testimonial[]; direction: "up" | "down"; duration: number }[] = [
  { items: testimonials.slice(0, 3), direction: "up", duration: 32 },
  { items: testimonials.slice(3, 6), direction: "down", duration: 38 },
  { items: testimonials.slice(6, 9), direction: "up", duration: 30 },
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="rounded-xl border border-[#EDEAE6] bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar name={testimonial.name} />
          <div className="min-w-0">
            <p className="font-outfit font-bold text-[14px] text-[#0E0E0E] leading-tight truncate">
              {testimonial.name}
            </p>
            <p className="text-[12px] text-[#8A8A8E] truncate">
              {testimonial.role}
            </p>
          </div>
        </div>
        {testimonial.badge === "google" ? (
          <GoogleIcon />
        ) : (
          <Star size={16} className="text-[#FF7A00] fill-[#FF7A00] shrink-0" />
        )}
      </div>
      <p className="mt-4 text-[13.5px] leading-[1.6] text-[#4A4A4E]">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
    </div>
  );
}

function TestimonialColumn({
  items,
  direction,
  duration,
  className = "",
}: {
  items: Testimonial[];
  direction: "up" | "down";
  duration: number;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="flex flex-col gap-5 animate-marquee-y hover:[animation-play-state:paused]"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: direction === "down" ? "reverse" : "normal",
        }}
      >
        {[...items, ...items].map((testimonial, i) => (
          <TestimonialCard key={`${testimonial.name}-${i}`} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-[56px] sm:py-20 lg:py-[104px]">
      <div className="flex flex-col items-center text-center gap-4">
        <span className="text-[12.5px] font-semibold tracking-[0.14em] uppercase text-[#FF7A00]">
          Testimonials
        </span>
        <h2 className="max-w-[20ch] font-outfit font-extrabold text-[clamp(28px,3.6vw,46px)] leading-[1.08] tracking-[-0.03em] text-[#0E0E0E]">
          Real feedback, real projects
        </h2>
        <p className="max-w-[46ch] text-[16px] leading-[1.6] text-[#4A4A4E]">
          What clients say after working with the GarGari team, from brief
          to launch.
        </p>
      </div>

      <div
        className="relative mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 h-[560px] sm:h-[600px]"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
        }}
      >
        {columns.map((col, i) => (
          <TestimonialColumn
            key={i}
            items={col.items}
            direction={col.direction}
            duration={col.duration}
            className={
              i === 0
                ? "h-full"
                : i === 1
                  ? "hidden sm:block h-full"
                  : "hidden lg:block h-full"
            }
          />
        ))}
      </div>
    </section>
  );
}
