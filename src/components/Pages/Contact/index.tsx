"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Facebook, Instagram, Mail, MapPin, Clock } from "lucide-react";

const TikTokIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const contactCards = [
  {
    icon: <Mail size={18} />,
    label: "Email us",
    value: "gargariinfo@gmail.com",
    href: "mailto:gargariinfo@gmail.com",
  },
  {
    icon: <TikTokIcon size={18} />,
    label: "TikTok",
    value: "Gargari_",
    href: "https://www.tiktok.com/@gargari_",
  },
  {
    icon: <Facebook size={18} />,
    label: "Facebook",
    value: "GarGari",
    href: "https://www.facebook.com/profile.php?id=61559932766757",
  },
  {
    icon: <Instagram size={18} />,
    label: "Instagram",
    value: "_gargari",
    href: "https://www.instagram.com/_gargari/",
  },
];

const services = [
  "Website Development",
  "Branding",
  "UI/UX Design",
  "Graphic Design",
  "Other",
];

function ArrowIcon() {
  return (
    <svg width="12" height="9" viewBox="0 0 7 9" aria-hidden="true">
      <path
        d="M1 1 L5 4.5 L1 8"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.7"
      />
    </svg>
  );
}

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const EMAILJS_CLIENT_TEMPLATE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_CLIENT_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

// Anti-spam limits
const MIN_FILL_TIME_MS = 3000;
const SEND_COOLDOWN_MS = 60_000;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 3000;

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const mountedAt = useRef(0);
  const lastSentAt = useRef(0);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current || isSending) return;

    const data = new FormData(form.current);

    // Bots fill the hidden honeypot field or submit instantly; silently drop them
    if (
      data.get("website") ||
      Date.now() - mountedAt.current < MIN_FILL_TIME_MS
    ) {
      form.current.reset();
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }

    if (Date.now() - lastSentAt.current < SEND_COOLDOWN_MS) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }

    if (
      !EMAILJS_SERVICE_ID ||
      !EMAILJS_TEMPLATE_ID ||
      !EMAILJS_CLIENT_TEMPLATE_ID ||
      !EMAILJS_PUBLIC_KEY
    ) {
      console.error("EmailJS environment variables are not configured");
      setStatus("error");
      return;
    }

    setIsSending(true);
    setStatus("idle");

    try {
      await Promise.all([
        emailjs.sendForm(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          form.current,
          { publicKey: EMAILJS_PUBLIC_KEY, limitRate: { throttle: SEND_COOLDOWN_MS } },
        ),
        emailjs.sendForm(
          EMAILJS_SERVICE_ID,
          EMAILJS_CLIENT_TEMPLATE_ID,
          form.current,
          { publicKey: EMAILJS_PUBLIC_KEY },
        ),
      ]);

      lastSentAt.current = Date.now();
      setStatus("success");
      form.current.reset();
      setSelectedService("");
    } catch (error) {
      console.error("EmailJS Error details:", error);
      setStatus("error");
    } finally {
      setIsSending(false);
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section
      id="contact"
      className="max-w-[1440px] mx-auto px-5 sm:px-9 lg:px-[72px] pt-[56px] sm:pt-20 lg:pt-[104px] pb-20 sm:pb-28 lg:pb-[136px]"
    >
      <div className="mb-12 sm:mb-14 lg:mb-16">
        <span className="text-[12.5px] font-semibold tracking-[0.14em] uppercase text-[#FF7A00]">
          Contact
        </span>
        <h1 className="mt-3 max-w-[20ch] font-outfit font-extrabold text-[clamp(30px,4.5vw,58px)] leading-[1.05] tracking-[-0.03em] text-[#0E0E0E]">
          Let&apos;s build something great
        </h1>
        <p className="mt-4 max-w-[56ch] text-[15.5px] leading-[1.6] text-[#4A4A4E]">
          Tell us about your project and we&apos;ll get back to you within a
          day.
        </p>

        <div className="mt-6 flex flex-wrap gap-2.5">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#E3DFDA] bg-white px-3.5 py-2 text-[13px] text-[#0E0E0E]">
            <MapPin size={14} className="text-[#FF7A00] shrink-0" />
            Tbilisi, Georgia, remote friendly
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#E3DFDA] bg-white px-3.5 py-2 text-[13px] text-[#0E0E0E]">
            <Clock size={14} className="text-[#FF7A00] shrink-0" />
            Replies within a day
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#E3DFDA] bg-white px-3.5 py-2 text-[13px] text-[#0E0E0E]">
            <span className="relative flex w-2 h-2 shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#1FA34A] opacity-75 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-[#1FA34A]" />
            </span>
            Open for new projects
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="order-2 lg:order-1 rounded-xl border border-[#EDEAE6] bg-white p-5 sm:p-8"
        >
          <form ref={form} onSubmit={sendEmail} className="space-y-5">
            {/* Honeypot: hidden from people, bots tend to fill it */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#5A5A5F] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="from_name"
                  required
                  maxLength={MAX_NAME_LENGTH}
                  className="w-full bg-white border border-[#E3E3E6] rounded-lg px-4 py-3 text-[#0E0E0E] placeholder-[#9A9A9E] text-sm outline-none focus:border-[#FF7A00] transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#5A5A5F] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  maxLength={MAX_EMAIL_LENGTH}
                  className="w-full bg-white border border-[#E3E3E6] rounded-lg px-4 py-3 text-[#0E0E0E] placeholder-[#9A9A9E] text-sm outline-none focus:border-[#FF7A00] transition-colors"
                  placeholder="you@email.com"
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#5A5A5F] mb-2">
                Service
              </label>

              <input type="hidden" name="service" value={selectedService} />

              <div
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full bg-white border rounded-lg px-4 py-3 text-sm cursor-pointer flex justify-between items-center transition-colors ${
                  isOpen ? "border-[#FF7A00]" : "border-[#E3E3E6]"
                }`}
              >
                <span
                  className={
                    selectedService ? "text-[#0E0E0E]" : "text-[#9A9A9E]"
                  }
                >
                  {selectedService || "Select a service"}
                </span>
                <svg
                  className={`w-4 h-4 text-[#FF7A00] transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-50 w-full mt-2 bg-white border border-[#E3E3E6] rounded-lg overflow-hidden shadow-lg"
                >
                  {services.map((service) => (
                    <div
                      key={service}
                      onClick={() => {
                        setSelectedService(service);
                        setIsOpen(false);
                      }}
                      className="px-4 py-2.5 hover:bg-[#F5F5F7] cursor-pointer transition-colors text-[#0E0E0E] text-sm border-b border-[#E3E3E6] last:border-b-0"
                    >
                      {service}
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            <div>
              <label className="block text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#5A5A5F] mb-2">
                Message
              </label>
              <textarea
                name="message"
                required
                maxLength={MAX_MESSAGE_LENGTH}
                rows={4}
                className="w-full bg-white border border-[#E3E3E6] rounded-lg px-4 py-3 text-[#0E0E0E] placeholder-[#9A9A9E] text-sm outline-none focus:border-[#FF7A00] transition-colors resize-none"
                placeholder="Tell us about your project..."
              ></textarea>
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              disabled={isSending}
              type="submit"
              className={`group relative w-full inline-flex items-center justify-center gap-2.5 rounded-full h-12 font-outfit font-bold text-[15px] whitespace-nowrap cursor-pointer transition-[background-color,color,box-shadow] duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                status === "success"
                  ? "bg-[#1FA34A] text-white"
                  : "bg-primary text-[#0E0E0E] hover:bg-[#0E0E0E] hover:text-white hover:shadow-[0_12px_28px_-12px_rgba(14,14,14,0.6)]"
              }`}
            >
              {isSending
                ? "Sending..."
                : status === "success"
                  ? "Sent!"
                  : "Send message"}
              {status !== "success" && (
                <span className="inline-flex items-center justify-center w-[26px] h-[26px] rounded-full bg-[#0E0E0E] shrink-0 transition-[background-color,translate] duration-300 group-hover:bg-primary group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              )}
            </motion.button>

            {status === "error" && (
              <p className="text-[#B3261E] text-xs text-center">
                Something went wrong, please try again later.
              </p>
            )}
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="order-1 lg:order-2 flex flex-col gap-4"
        >
          {contactCards.map((card) => (
            <a
              key={card.label}
              href={card.href}
              target={card.href.startsWith("http") ? "_blank" : undefined}
              rel={
                card.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              className="group flex items-center gap-3.5 rounded-xl border border-[#EDEAE6] bg-white p-4 transition-[border-color,background-color] duration-300 hover:border-[#FF7A00]/50 hover:bg-[#FFF8F1]"
            >
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-full border-2 border-[#FF7A00] bg-white text-[#FF7A00] shrink-0 transition-colors duration-300 group-hover:bg-[#FF7A00] group-hover:text-white">
                {card.icon}
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5A5A5F]">
                  {card.label}
                </p>
                <p className="mt-0.5 text-[13.5px] font-medium text-[#0E0E0E] truncate">
                  {card.value}
                </p>
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
