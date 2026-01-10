"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const services = [
    "ვებ დიზაინი",
    "მობაილ აპლიკაცია",
    "ბრენდინგი",
    "UI/UX დიზაინი",
    "გრაფიკული დიზაინი",
    "სხვა",
  ];

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setIsSending(true);

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(() => {
        setStatus("success");
        form.current?.reset();
        setSelectedService("");
      })
      .catch(() => {
        setStatus("error");
      })
      .finally(() => {
        setIsSending(false);
        setTimeout(() => setStatus("idle"), 3000);
      });
  };

  return (
    <section
      className="relative py-24 px-6 overflow-hidden bg-[#121212]"
      id="contact"
    >
      <div className="absolute inset-0 bg-grid-white pointer-events-none opacity-10" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 48 }}
                  transition={{ duration: 0.2 }}
                  className="h-[1px] bg-primary"
                />
                <p className="text-sm uppercase tracking-[0.2em] text-primary font-medium font-georgian">
                  კონტაქტი
                </p>
              </div>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none text-white font-georgian">
                დაგვიკავშირდი
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8">
              <div className="flex items-center gap-4 group cursor-pointer p-4 bg-[#1c1c1c]/50 rounded-2xl border border-white/5 hover:border-primary/50 transition-colors duration-200">
                <div className="w-12 h-12 rounded-xl bg-[#1c1c1c] border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-300 uppercase tracking-widest font-georgian font-bold">
                    მოგვწერეთ
                  </p>
                  <p className="text-white text-sm font-medium">
                    hello@gargari.ge
                  </p>
                </div>
              </div>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on LinkedIn"
                className="flex items-center gap-4 group cursor-pointer p-4 bg-[#1c1c1c]/50 rounded-2xl border border-white/5 hover:border-primary/50 transition-colors duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1c1c1c] border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-300 uppercase tracking-widest font-georgian font-bold">
                    LinkedIn
                  </p>
                  <p className="text-white text-sm font-medium">
                    Gargari Studio
                  </p>
                </div>
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="flex items-center gap-4 group cursor-pointer p-4 bg-[#1c1c1c]/50 rounded-2xl border border-white/5 hover:border-primary/50 transition-colors duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1c1c1c] border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-300 uppercase tracking-widest font-georgian font-bold">
                    Facebook
                  </p>
                  <p className="text-white text-sm font-medium">Gargari Page</p>
                </div>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="flex items-center gap-4 group cursor-pointer p-4 bg-[#1c1c1c]/50 rounded-2xl border border-white/5 hover:border-primary/50 transition-colors duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1c1c1c] border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-300 uppercase tracking-widest font-georgian font-bold">
                    Instagram
                  </p>
                  <p className="text-white text-sm font-medium">
                    @gargari.studio
                  </p>
                </div>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2 }}
            className="bg-[#1c1c1c]/80 backdrop-blur-sm p-8 md:p-12 border border-white/5 relative"
            style={{ borderRadius: "var(--radius-4xl)" }}
          >
            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-300 font-georgian ml-1 font-bold">
                    სახელი
                  </label>
                  <input
                    type="text"
                    name="from_name"
                    required
                    className="w-full bg-[#252525] border border-white/5 rounded-2xl px-6 py-4 mt-2 text-white focus:outline-none focus:border-primary/50 transition-colors font-georgian text-sm"
                    placeholder="თქვენი სახელი"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-300 font-georgian ml-1 font-bold">
                    ელ-ფოსტა
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full bg-[#252525] border border-white/5 rounded-2xl px-6 py-4 mt-2 text-white focus:outline-none focus:border-primary/50 transition-colors font-georgian text-sm"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2 relative">
                <label className="text-[10px] uppercase tracking-widest text-zinc-300 font-georgian ml-1 font-bold">
                  სერვისი
                </label>

                <input type="hidden" name="service" value={selectedService} />

                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className={`w-full bg-[#252525] border ${
                    isOpen ? "border-primary/50" : "border-white/5"
                  } rounded-2xl mt-2 px-6 py-4 text-white font-georgian text-sm cursor-pointer flex justify-between items-center transition-all`}
                >
                  <span
                    className={selectedService ? "text-white" : "text-zinc-500"}
                  >
                    {selectedService || "აირჩიეთ სერვისი"}
                  </span>
                  <svg
                    className={`w-4 h-4 text-primary transition-transform duration-300 ${
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
                    className="absolute z-50 w-full mt-2 bg-[#252525] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                  >
                    {services.map((service) => (
                      <div
                        key={service}
                        onClick={() => {
                          setSelectedService(service);
                          setIsOpen(false);
                        }}
                        className="px-6 py-3 hover:bg-primary/10 cursor-pointer transition-colors text-white font-georgian text-sm border-b border-white/5 last:border-b-0"
                      >
                        {service}
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-zinc-300 font-georgian ml-1 font-bold">
                  შეტყობინება
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="w-full bg-[#252525] border border-white/5 rounded-3xl px-6 py-4 mt-2 text-white focus:outline-none focus:border-primary/50 transition-colors font-georgian resize-none text-sm"
                  placeholder="მოგვიყევით პროექტის შესახებ..."
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSending}
                type="submit"
                className={`w-full py-5 ${
                  status === "success" ? "bg-green-600" : "bg-primary"
                } text-black font-bold rounded-2xl font-georgian tracking-widest uppercase transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isSending
                  ? "იგზავნება..."
                  : status === "success"
                  ? "გაიგზავნა! ✓"
                  : "გაგზავნა"}
              </motion.button>

              {status === "error" && (
                <p className="text-red-500 text-xs text-center font-georgian">
                  შეცდომაა, სცადეთ მოგვიანებით.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
