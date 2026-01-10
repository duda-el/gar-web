"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  
  // ერორების სთეითი
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    const formData = new FormData(form.current!);
    
    if (!formData.get("from_name")) newErrors.from_name = "გთხოვთ მიუთითოთ სახელი";
    if (!formData.get("reply_to")) {
      newErrors.reply_to = "ელ-ფოსტა აუცილებელია";
    } else if (!/\S+@\S+\.\S+/.test(formData.get("reply_to") as string)) {
      newErrors.reply_to = "არასწორი ელ-ფოსტის ფორმატი";
    }
    if (!formData.get("message")) newErrors.message = "შეტყობინების ველი ცარიელია";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    if (!validateForm()) return; // თუ ვალიდაცია ვერ გაიარა, არ გაიგზავნოს

    setIsSending(true);

    emailjs
      .sendForm(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        form.current,
        "YOUR_PUBLIC_KEY"
      )
      .then(() => {
        setStatus("success");
        setErrors({});
        form.current?.reset();
      })
      .catch(() => {
        setStatus("error");
      })
      .finally(() => {
        setIsSending(false);
        setTimeout(() => setStatus("idle"), 3000);
      });
  };

  // ერორის კომპონენტი სისუფთავისთვის
  const ErrorMsg = ({ msg }: { msg: string }) => (
    <motion.p
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="text-red-400 text-[10px] mt-1 ml-1 font-georgian italic"
    >
      {msg}
    </motion.p>
  );

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-[#121212]" id="contact">
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
              {/* Email Card */}
              <div className="flex items-center gap-4 group cursor-pointer p-4 bg-[#1c1c1c]/50 rounded-2xl border border-white/5 hover:border-primary/50 transition-colors duration-200">
                <div className="w-12 h-12 rounded-xl bg-[#1c1c1c] border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-300 uppercase tracking-widest font-georgian font-bold">მოგვწერეთ</p>
                  <p className="text-white text-sm font-medium">gargariinfo@gmail.com</p>
                </div>
              </div>

              {/* TikTok Card */}
              <a href="https://www.tiktok.com/@gargari_?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group cursor-pointer p-4 bg-[#1c1c1c]/50 rounded-2xl border border-white/5 hover:border-primary/50 transition-colors duration-200">
                <div className="w-12 h-12 rounded-xl bg-[#1c1c1c] border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 448 512">
                    <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-300 uppercase tracking-widest font-georgian font-bold">TikTok</p>
                  <p className="text-white text-sm font-medium">gargari_</p>
                </div>
              </a>

              {/* Facebook Card */}
              <a href="https://www.facebook.com/profile.php?id=61559932766757" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group cursor-pointer p-4 bg-[#1c1c1c]/50 rounded-2xl border border-white/5 hover:border-primary/50 transition-colors duration-200">
                <div className="w-12 h-12 rounded-xl bg-[#1c1c1c] border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-300 uppercase tracking-widest font-georgian font-bold">Facebook</p>
                  <p className="text-white text-sm font-medium">გარგარი • GarGari</p>
                </div>
              </a>

              {/* Instagram Card */}
              <a href="https://www.instagram.com/_gargari/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group cursor-pointer p-4 bg-[#1c1c1c]/50 rounded-2xl border border-white/5 hover:border-primary/50 transition-colors duration-200">
                <div className="w-12 h-12 rounded-xl bg-[#1c1c1c] border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-300 uppercase tracking-widest font-georgian font-bold">Instagram</p>
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
            className="bg-[#1c1c1c]/80 backdrop-blur-sm p-8 md:p-12 border border-white/5 relative"
            style={{ borderRadius: "32px" }}
          >
            <form ref={form} onSubmit={sendEmail} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-300 font-georgian ml-1 font-bold">სახელი</label>
                  <input
                    type="text"
                    name="from_name"
                    className={`w-full bg-[#252525] border ${errors.from_name ? 'border-red-500/50' : 'border-white/5'} rounded-2xl px-6 py-4 mt-2 text-white focus:outline-none focus:border-primary/50 transition-colors font-georgian text-sm`}
                    placeholder="თქვენი სახელი"
                  />
                  <AnimatePresence>{errors.from_name && <ErrorMsg msg={errors.from_name} />}</AnimatePresence>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-300 font-georgian ml-1 font-bold">ელ-ფოსტა</label>
                  <input
                    type="email"
                    name="reply_to"
                    className={`w-full bg-[#252525] border ${errors.reply_to ? 'border-red-500/50' : 'border-white/5'} rounded-2xl px-6 py-4 mt-2 text-white focus:outline-none focus:border-primary/50 transition-colors font-georgian text-sm`}
                    placeholder="email@example.com"
                  />
                  <AnimatePresence>{errors.reply_to && <ErrorMsg msg={errors.reply_to} />}</AnimatePresence>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-zinc-300 font-georgian ml-1 font-bold">შეტყობინება</label>
                <textarea
                  name="message"
                  rows={4}
                  className={`w-full bg-[#252525] border ${errors.message ? 'border-red-500/50' : 'border-white/5'} rounded-3xl px-6 py-4 mt-2 text-white focus:outline-none focus:border-primary/50 transition-colors font-georgian resize-none text-sm`}
                  placeholder="დაწერეთ შეტყობინება..."
                ></textarea>
                <AnimatePresence>{errors.message && <ErrorMsg msg={errors.message} />}</AnimatePresence>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSending}
                type="submit"
                className={`w-full py-5 ${status === "success" ? "bg-green-600" : "bg-primary"} text-black font-bold rounded-2xl font-georgian tracking-widest uppercase transition-all duration-200`}
              >
                {isSending ? "იგზავნება..." : status === "success" ? "გაიგზავნა! ✓" : "გაგზავნა"}
              </motion.button>

              {status === "error" && (
                <p className="text-red-500 text-xs text-center font-georgian">შეცდომაა, სცადეთ მოგვიანებით.</p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;