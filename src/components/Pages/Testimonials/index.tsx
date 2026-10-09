"use client";

import { Star } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  badge: "star" | "google" | "facebook";
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

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden="true">
      <path
        d="M18 9a9 9 0 1 0-10.4 8.89v-6.29H5.31V9h2.29V7.01c0-2.26 1.35-3.51 3.41-3.51.99 0 2.02.18 2.02.18v2.22h-1.14c-1.12 0-1.47.7-1.47 1.41V9h2.5l-.4 2.6h-2.1v6.29A9 9 0 0 0 18 9Z"
        fill="#1877F2"
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
    // Only Latin letters: uppercasing Georgian would turn it into Mtavruli capitals
    .replace(/[a-z]/g, (c) => c.toUpperCase());
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

const columnLayout: { start: number; direction: "up" | "down"; duration: number }[] = [
  { start: 0, direction: "up", duration: 32 },
  { start: 2, direction: "down", duration: 38 },
  { start: 4, direction: "up", duration: 30 },
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
        ) : testimonial.badge === "facebook" ? (
          <FacebookIcon />
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
  const { t } = useI18n();
  const testimonials: Testimonial[] = t.testimonials.items.map((item) => ({
    ...item,
    role: t.testimonials.role,
    badge: "facebook",
  }));
  const columns = columnLayout.map((col) => ({
    ...col,
    items: testimonials.slice(col.start, col.start + 2),
  }));

  return (
    <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-[56px] sm:py-20 lg:py-[104px]">
      <div className="flex flex-col items-center text-center gap-4">
        <span className="text-[12.5px] font-semibold tracking-[0.14em] uppercase text-[#FF7A00]">
          {t.testimonials.eyebrow}
        </span>
        <h2 className="max-w-[20ch] font-outfit font-extrabold text-[clamp(28px,3.6vw,46px)] leading-[1.08] tracking-[-0.03em] text-[#0E0E0E]">
          {t.testimonials.title}
        </h2>
        <p className="max-w-[46ch] text-[16px] leading-[1.6] text-[#4A4A4E]">
          {t.testimonials.intro}
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
