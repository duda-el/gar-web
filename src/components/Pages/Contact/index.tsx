"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Facebook, Instagram, Mail } from "lucide-react";

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

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setIsSending(true);
    setStatus("idle");

    try {
      await Promise.all([
        emailjs.sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
          form.current,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
        ),
        emailjs.sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_CLIENT_TEMPLATE_ID!,
          form.current,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
        ),
      ]);

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
      className="max-w-[1440px] mx-auto px-5 sm:px-9 lg:px-[72px] py-[56px] sm:py-20 lg:py-[104px]"
      style={{
        background: "linear-gradient(180deg,#FFFFFF 0%,#F5F5F7 100%)",
      }}
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {contactCards.map((card) => (
            <a
              key={card.label}
              href={card.href}
              target={card.href.startsWith("http") ? "_blank" : undefined}
              rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group relative p-4 flex items-center gap-3.5"
              style={{
                border: "1px solid #E3E3E6",
                background:
                  "linear-gradient(160deg,#FFFFFF 0%,#F5F5F7 100%)",
              }}
            >
              <i className="absolute w-[10px] h-[10px] left-[-1px] top-[-1px] border-l-2 border-t-2 border-[#0E0E0E]" />
              <i className="absolute w-[10px] h-[10px] right-[-1px] bottom-[-1px] border-r-2 border-b-2 border-[#FF7A00]" />
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-full border-2 border-[#FF7A00] bg-white text-[#FF7A00] shrink-0 transition-transform duration-200 group-hover:scale-105">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="relative p-5 sm:p-8"
          style={{
            border: "1px solid #E3E3E6",
            background: "linear-gradient(160deg,#FFFFFF 0%,#F5F5F7 100%)",
          }}
        >
          <i className="absolute w-[10px] h-[10px] left-[-1px] top-[-1px] border-l-2 border-t-2 border-[#0E0E0E]" />
          <i className="absolute w-[10px] h-[10px] right-[-1px] bottom-[-1px] border-r-2 border-b-2 border-[#FF7A00]" />

          <form ref={form} onSubmit={sendEmail} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#5A5A5F] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="from_name"
                  required
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
                  className={selectedService ? "text-[#0E0E0E]" : "text-[#9A9A9E]"}
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
                rows={4}
                className="w-full bg-white border border-[#E3E3E6] rounded-lg px-4 py-3 text-[#0E0E0E] placeholder-[#9A9A9E] text-sm outline-none focus:border-[#FF7A00] transition-colors resize-none"
                placeholder="Tell us about your project..."
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSending}
              type="submit"
              className={`group relative w-full inline-flex items-center justify-center gap-2.5 rounded-full h-12 font-outfit font-bold text-[15px] text-[#0E0E0E] whitespace-nowrap cursor-pointer transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                status === "success" ? "bg-[#1FA34A] text-white" : "bg-primary hover:bg-white"
              }`}
            >
              {isSending
                ? "Sending..."
                : status === "success"
                  ? "Sent!"
                  : "Send message"}
              {status !== "success" && (
                <span className="inline-flex items-center justify-center w-[26px] h-[26px] rounded-full bg-[#0E0E0E] shrink-0">
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
      </div>
    </section>
  );
};

export default Contact;
