"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { ArrowUpRight, Check, Facebook, Instagram, Loader2, Mail, MapPin, Clock } from "lucide-react";

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

const labelClass =
  "block mb-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#5A5A5F]";
const fieldClass =
  "w-full rounded-xl border border-transparent bg-[#F5F5F7] px-4 py-3.5 text-[14.5px] text-[#0E0E0E] placeholder-[#9A9A9E] outline-none transition-[background-color,border-color,box-shadow] duration-300 hover:bg-[#F0EFEC] focus:bg-white focus:border-[#FF7A00] focus:shadow-[0_0_0_4px_rgba(255,122,0,0.14)]";

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const mountedAt = useRef(0);
  const lastSentAt = useRef(0);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [selectedService, setSelectedService] = useState("");
  const [messageLength, setMessageLength] = useState(0);

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
      setMessageLength(0);
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
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="order-2 lg:order-1 relative overflow-clip rounded-2xl border border-[#EDEAE6] bg-white p-5 sm:p-8 lg:p-10 shadow-[0_30px_80px_-40px_rgba(14,14,14,0.25)]"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#FF7A00]/10 blur-3xl"
          />
          <div className="relative mb-7 sm:mb-8">
            <h2 className="font-outfit font-bold text-[22px] tracking-[-0.02em] text-[#0E0E0E]">
              Tell us about your project
            </h2>
            <p className="mt-1.5 text-[14px] text-[#5A5A5F]">
              A few lines are enough, we&apos;ll ask the rest on a call.
            </p>
          </div>

          <form ref={form} onSubmit={sendEmail} className="relative space-y-6">
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
                <label htmlFor="contact-name" className={labelClass}>
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="from_name"
                  required
                  autoComplete="name"
                  maxLength={MAX_NAME_LENGTH}
                  className={fieldClass}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className={labelClass}>
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  maxLength={MAX_EMAIL_LENGTH}
                  className={fieldClass}
                  placeholder="you@email.com"
                />
              </div>
            </div>

            <fieldset>
              <legend className={labelClass}>What do you need?</legend>
              <input type="hidden" name="service" value={selectedService} />
              <div className="flex flex-wrap gap-2">
                {services.map((service) => {
                  const selected = selectedService === service;
                  return (
                    <button
                      key={service}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setSelectedService(selected ? "" : service)}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-[13.5px] font-medium transition-[background-color,border-color,color] duration-300 ${
                        selected
                          ? "border-[#0E0E0E] bg-[#0E0E0E] text-white"
                          : "border-[#E3E3E6] bg-[#F7F6F4] text-[#0E0E0E] hover:border-[#0E0E0E]/40 hover:bg-white"
                      }`}
                    >
                      <span
                        className={`inline-flex items-center justify-center rounded-full bg-[#FF7A00] text-[#0E0E0E] overflow-hidden transition-[width,height,opacity] duration-300 ${
                          selected ? "w-4 h-4 opacity-100" : "w-0 h-4 opacity-0"
                        }`}
                      >
                        <Check size={11} strokeWidth={3} />
                      </span>
                      {service}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div>
              <div className="flex items-baseline justify-between">
                <label htmlFor="contact-message" className={labelClass}>
                  Message
                </label>
                <span className="text-[11px] tabular-nums text-[#9A9A9E]">
                  {messageLength} / {MAX_MESSAGE_LENGTH}
                </span>
              </div>
              <textarea
                id="contact-message"
                name="message"
                required
                maxLength={MAX_MESSAGE_LENGTH}
                rows={5}
                onChange={(e) => setMessageLength(e.target.value.length)}
                className={`${fieldClass} resize-none`}
                placeholder="Tell us about your project, goals and timeline..."
              ></textarea>
            </div>

            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4 pt-1">
              <p className="text-[12.5px] text-[#5A5A5F]">
                We reply within one business day.
              </p>
              <button
                disabled={isSending}
                type="submit"
                className={`group relative isolate inline-flex items-center justify-center sm:justify-start gap-3 h-[54px] rounded-full ps-6 pe-1.5 overflow-hidden font-outfit font-bold text-[15px] whitespace-nowrap transition-[background-color,color,box-shadow,scale] duration-500 active:scale-[0.98] disabled:opacity-70 ${
                  status === "success"
                    ? "bg-[#1FA34A] text-white"
                    : "bg-[#0E0E0E] text-white hover:text-[#0E0E0E] hover:shadow-[0_16px_36px_-14px_rgba(255,122,0,0.75)]"
                }`}
              >
                {/* Orange fill grows out of the arrow circle */}
                {status !== "success" && (
                  <span
                    aria-hidden="true"
                    className="absolute right-1.5 top-1/2 -z-10 w-[42px] h-[42px] -translate-y-1/2 rounded-full bg-[#FF7A00] scale-0 transition-[scale] duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[12] group-disabled:scale-0"
                  />
                )}
                <span className="relative">
                  {isSending
                    ? "Sending..."
                    : status === "success"
                      ? "Message sent"
                      : "Send message"}
                </span>
                <span
                  className={`relative inline-flex items-center justify-center w-[42px] h-[42px] rounded-full overflow-hidden shrink-0 transition-colors duration-500 ${
                    status === "success"
                      ? "bg-white text-[#1FA34A]"
                      : "bg-[#FF7A00] text-[#0E0E0E] group-hover:bg-[#0E0E0E] group-hover:text-white"
                  }`}
                >
                  {isSending ? (
                    <Loader2 size={17} className="animate-spin" />
                  ) : status === "success" ? (
                    <Check size={18} strokeWidth={2.5} />
                  ) : (
                    <>
                      <ArrowUpRight
                        size={17}
                        className="absolute transition-[translate] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-6 group-hover:-translate-y-6"
                      />
                      <ArrowUpRight
                        size={17}
                        className="absolute -translate-x-6 translate-y-6 transition-[translate] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0"
                      />
                    </>
                  )}
                </span>
              </button>
            </div>

            {status === "error" && (
              <p role="alert" className="rounded-lg bg-[#B3261E]/[0.06] px-4 py-3 text-[#B3261E] text-[13px]">
                Something went wrong, please try again in a minute.
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
              className="group relative isolate flex items-center gap-3.5 overflow-hidden rounded-xl border border-[#EDEAE6] bg-white p-4 transition-[border-color,translate] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#0E0E0E] hover:-translate-y-0.5"
            >
              {/* Dark fill sweeps in from the left */}
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 origin-left scale-x-0 bg-[#0E0E0E] transition-[scale] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
              />
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-full border-2 border-[#FF7A00] bg-white text-[#FF7A00] shrink-0 transition-[background-color,color,rotate] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-[#FF7A00] group-hover:text-[#0E0E0E] group-hover:-rotate-8">
                {card.icon}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5A5A5F] transition-colors duration-500 group-hover:text-white/55">
                  {card.label}
                </p>
                <p className="mt-0.5 text-[13.5px] font-medium text-[#0E0E0E] truncate transition-colors duration-500 group-hover:text-white">
                  {card.value}
                </p>
              </div>
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#FF7A00] text-[#0E0E0E] shrink-0 opacity-0 -translate-x-3 scale-75 transition-[opacity,translate,scale] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100">
                <ArrowUpRight size={15} />
              </span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
