"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { AlertCircle, Facebook, Instagram, Mail, MapPin, Clock } from "lucide-react";
import { toast } from "@/components/ui/toast";
import {
  ContactErrors,
  ContactField,
  ContactValues,
  LIMITS,
  validateAll,
  validateField,
} from "./validation";

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
const CONTACT_EMAIL = "gargariinfo@gmail.com";

const emptyValues: ContactValues = {
  from_name: "",
  email: "",
  service: "",
  message: "",
};

const fieldOrder: ContactField[] = ["from_name", "email", "service", "message"];

const labelClass =
  "block text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#5A5A5F] mb-2";

const inputClass = (invalid: boolean) =>
  `w-full bg-white border rounded-lg px-4 py-3 text-[#0E0E0E] placeholder-[#9A9A9E] text-sm outline-none transition-[border-color,box-shadow] duration-200 ${
    invalid
      ? "border-[#B3261E] focus:shadow-[0_0_0_3px_rgba(179,38,30,0.12)]"
      : "border-[#E3E3E6] focus:border-[#FF7A00]"
  }`;

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 flex items-start gap-1.5 text-[12.5px] leading-[1.4] text-[#B3261E]">
      <AlertCircle size={14} className="mt-px shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const serviceBox = useRef<HTMLDivElement>(null);
  const mountedAt = useRef(0);
  const lastSentAt = useRef(0);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState<ContactValues>(emptyValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  // Close the service list when clicking anywhere else
  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!serviceBox.current?.contains(e.target as Node)) setIsOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  const setField = (field: ContactField, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Re-check live once the field has been visited, so errors clear as soon as they're fixed
    if (touched[field] || errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
    }
  };

  const touchField = (field: ContactField) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, values[field]) }));
  };

  const errorProps = (field: ContactField) => ({
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
  });

  const resetForm = () => {
    setValues(emptyValues);
    setErrors({});
    setTouched({});
  };

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current || isSending) return;

    const honeypot = new FormData(form.current).get("website");

    // Bots fill the hidden honeypot field or submit instantly; silently drop them
    if (honeypot || Date.now() - mountedAt.current < MIN_FILL_TIME_MS) {
      resetForm();
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }

    const nextErrors = validateAll(values);
    setErrors(nextErrors);
    setTouched({ from_name: true, email: true, service: true, message: true });
    const firstInvalid = fieldOrder.find((field) => nextErrors[field]);
    if (firstInvalid) {
      const target =
        firstInvalid === "service"
          ? serviceBox.current?.querySelector("button")
          : form.current.querySelector<HTMLElement>(`[name="${firstInvalid}"]`);
      target?.focus();
      return;
    }

    const wait = Math.ceil((SEND_COOLDOWN_MS - (Date.now() - lastSentAt.current)) / 1000);
    if (wait > 0) {
      toast.warning("Please wait a moment", {
        description: `You can send another message in ${wait} seconds.`,
      });
      return;
    }

    if (
      !EMAILJS_SERVICE_ID ||
      !EMAILJS_TEMPLATE_ID ||
      !EMAILJS_CLIENT_TEMPLATE_ID ||
      !EMAILJS_PUBLIC_KEY
    ) {
      console.error("EmailJS environment variables are not configured");
      toast.error("The form is unavailable right now", {
        description: `Please email us directly at ${CONTACT_EMAIL}.`,
      });
      return;
    }

    const params = {
      from_name: values.from_name.trim(),
      email: values.email.trim(),
      service: values.service,
      message: values.message.trim(),
    };

    setIsSending(true);

    try {
      await Promise.all([
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params, {
          publicKey: EMAILJS_PUBLIC_KEY,
          limitRate: { throttle: SEND_COOLDOWN_MS },
        }),
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_CLIENT_TEMPLATE_ID, params, {
          publicKey: EMAILJS_PUBLIC_KEY,
        }),
      ]);

      lastSentAt.current = Date.now();
      setStatus("success");
      resetForm();
      toast.success("Message sent", {
        description: `Thanks, ${params.from_name}! We'll reply to ${params.email} within a day.`,
      });
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("EmailJS Error details:", error);
      toast.error("Message not sent", {
        description: `Something went wrong. Please try again, or email us at ${CONTACT_EMAIL}.`,
      });
    } finally {
      setIsSending(false);
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
          <form ref={form} onSubmit={sendEmail} noValidate className="space-y-5">
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
                  autoComplete="name"
                  maxLength={LIMITS.name.max}
                  value={values.from_name}
                  onChange={(e) => setField("from_name", e.target.value)}
                  onBlur={() => touchField("from_name")}
                  {...errorProps("from_name")}
                  className={inputClass(!!errors.from_name)}
                  placeholder="Your name"
                />
                <FieldError id="from_name-error" message={errors.from_name} />
              </div>
              <div>
                <label htmlFor="contact-email" className={labelClass}>
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  maxLength={LIMITS.email.max}
                  value={values.email}
                  onChange={(e) => setField("email", e.target.value)}
                  onBlur={() => touchField("email")}
                  {...errorProps("email")}
                  className={inputClass(!!errors.email)}
                  placeholder="you@email.com"
                />
                <FieldError id="email-error" message={errors.email} />
              </div>
            </div>

            <div className="relative" ref={serviceBox}>
              <span id="service-label" className={labelClass}>
                Service
              </span>

              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-labelledby="service-label"
                {...errorProps("service")}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full bg-white border rounded-lg px-4 py-3 text-sm text-left flex justify-between items-center outline-none transition-colors ${
                  errors.service
                    ? "border-[#B3261E]"
                    : isOpen
                      ? "border-[#FF7A00]"
                      : "border-[#E3E3E6] focus-visible:border-[#FF7A00]"
                }`}
              >
                <span
                  className={
                    values.service ? "text-[#0E0E0E]" : "text-[#9A9A9E]"
                  }
                >
                  {values.service || "Select a service"}
                </span>
                <svg
                  className={`w-4 h-4 text-[#FF7A00] transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isOpen && (
                <motion.ul
                  role="listbox"
                  aria-labelledby="service-label"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute z-50 w-full mt-2 bg-white border border-[#E3E3E6] rounded-lg overflow-hidden shadow-lg"
                >
                  {services.map((service) => (
                    <li key={service} role="option" aria-selected={values.service === service}>
                      <button
                        type="button"
                        onClick={() => {
                          setField("service", service);
                          setErrors((prev) => ({ ...prev, service: undefined }));
                          setIsOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 hover:bg-[#F5F5F7] transition-colors text-sm border-b border-[#E3E3E6] ${
                          values.service === service ? "text-[#FF7A00] font-medium" : "text-[#0E0E0E]"
                        }`}
                      >
                        {service}
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
              <FieldError id="service-error" message={errors.service} />
            </div>

            <div>
              <div className="flex items-baseline justify-between gap-3">
                <label htmlFor="contact-message" className={labelClass}>
                  Message
                </label>
                <span
                  className={`text-[11px] tabular-nums ${
                    values.message.length >= LIMITS.message.max ? "text-[#B3261E]" : "text-[#9A9A9E]"
                  }`}
                >
                  {values.message.length} / {LIMITS.message.max}
                </span>
              </div>
              <textarea
                id="contact-message"
                name="message"
                maxLength={LIMITS.message.max}
                rows={4}
                value={values.message}
                onChange={(e) => setField("message", e.target.value)}
                onBlur={() => touchField("message")}
                {...errorProps("message")}
                className={`${inputClass(!!errors.message)} resize-none`}
                placeholder="Tell us about your project..."
              ></textarea>
              <FieldError id="message-error" message={errors.message} />
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
