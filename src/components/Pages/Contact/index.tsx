"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Facebook } from "lucide-react";

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const services = [
    "ვებ დიზაინი",
    "ბრენდინგი",
    "UI/UX დიზაინი",
    "გრაფიკული დიზაინი",
    "სხვა",
  ];

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setIsSending(true);

    const adminEmail = emailjs.sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      form.current,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    );

    const clientEmail = emailjs.sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_CLIENT_TEMPLATE_ID!,
      form.current,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    );

    Promise.all([adminEmail, clientEmail])
      .then(() => {
        setStatus("success");
        form.current?.reset();
        setSelectedService("");
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        setStatus("error");
      })
      .finally(() => {
        setIsSending(false);
        setTimeout(() => setStatus("idle"), 3000);
      });
  };

  return (
    <section
      className="relative py-10 sm:py-24 px-4 sm:px-6 overflow-hidden bg-[#121212]"
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
                <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-primary font-medium font-georgian">
                  კონტაქტი
                </p>
              </div>
              <h2 className="text-3xl sm:text-5xl md:text-7xl max-[450px]:text-4xl font-bold tracking-tighter leading-none text-white font-georgian">
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
                    gargariinfo@gmail.com
                  </p>
                </div>
              </div>

              <a
                href="https://www.tiktok.com/@gargari_"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on TikTok"
                className="flex items-center gap-4 group cursor-pointer p-4 bg-[#1c1c1c]/50 rounded-2xl border border-white/5 hover:border-primary/50 transition-colors duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1c1c1c] border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.617a8.171 8.171 0 0 0 4.773 1.574V6.747a4.364 4.364 0 0 1-1.003-.061z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-300 uppercase tracking-widest font-georgian font-bold">
                    TikTok
                  </p>
                  <p className="text-white text-sm font-medium">Gargari_</p>
                </div>
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61559932766757"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="flex items-center gap-4 group cursor-pointer p-4 bg-[#1c1c1c]/50 rounded-2xl border border-white/5 hover:border-primary/50 transition-colors duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1c1c1c] border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Facebook stroke="#f19035" />
                </div>
                <div>
                  <p className="text-[10px] text-zinc-300 uppercase tracking-widest font-georgian font-bold">
                    Facebook
                  </p>
                  <p className="text-white text-sm font-medium">
                    გარგარი • GarGari
                  </p>
                </div>
              </a>

              <a
                href="https://www.instagram.com/_gargari/"
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
                  <p className="text-white text-sm font-medium">_gargari</p>
                </div>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2 }}
            className="bg-[#1c1c1c]/80 backdrop-blur-sm p-4 sm:p-8 md:p-12 border border-white/5 relative"
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
                    placeholder="თქვენი მეილი"
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
                    className={selectedService ? "text-white" : "text-zinc-400"}
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
                } text-black font-bold rounded-2xl cursor-pointer font-georgian tracking-widest uppercase transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
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
