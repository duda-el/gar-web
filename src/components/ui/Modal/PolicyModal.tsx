"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Mail, ShieldCheck, X } from "lucide-react";
import { CONTACT_EMAIL, policies, PolicyType } from "@/constants/policies";

interface PolicyModalProps {
  type: PolicyType | null;
  onClose: () => void;
}

const icons: Record<PolicyType, React.ElementType> = {
  privacy: ShieldCheck,
  terms: FileText,
};

const EASE = [0.16, 1, 0.3, 1] as const;

function PolicyPanel({ type, onClose }: { type: PolicyType; onClose: () => void }) {
  const policy = policies[type];
  const Icon = icons[type];
  const closeButton = useRef<HTMLButtonElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    closeButton.current?.focus();
  }, []);

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const max = el.scrollHeight - el.clientHeight;
    setProgress(max > 0 ? el.scrollTop / max : 1);
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="policy-title"
      initial={{ opacity: 0, y: 48 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 48 }}
      transition={{ duration: 0.45, ease: EASE }}
      onClick={(e) => e.stopPropagation()}
      className="relative w-full sm:max-w-[680px] max-h-[88svh] sm:max-h-[84vh] flex flex-col overflow-clip bg-white rounded-t-[1.75rem] sm:rounded-[1.75rem] shadow-[0_40px_100px_-30px_rgba(14,14,14,0.55)]"
    >
      {/* Mobile grab handle */}
      <span aria-hidden="true" className="sm:hidden mx-auto mt-3 h-1 w-10 rounded-full bg-[#E3E3E6]" />

      <header className="relative flex items-start gap-4 px-6 sm:px-8 pt-5 sm:pt-7 pb-5 border-b border-[#F1EEEA]">
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-[#FF7A00] text-[#FF7A00] shrink-0">
          <Icon size={21} />
        </span>
        <div className="min-w-0 flex-1">
          <span className="text-[10.5px] font-semibold tracking-[0.2em] uppercase text-[#FF7A00]">
            Legal
          </span>
          <h2
            id="policy-title"
            className="mt-0.5 font-outfit font-extrabold text-[clamp(22px,3vw,28px)] leading-[1.1] tracking-[-0.03em] text-[#0E0E0E]"
          >
            {policy.title}
          </h2>
          <p className="mt-1 text-[12.5px] text-[#5A5A5F]">Last updated {policy.updated}</p>
        </div>
        <button
          ref={closeButton}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#E3E3E6] text-[#0E0E0E] shrink-0 transition-[background-color,border-color,color,rotate] duration-300 hover:bg-[#0E0E0E] hover:border-[#0E0E0E] hover:text-white hover:rotate-90 outline-none focus-visible:border-[#FF7A00]"
        >
          <X size={18} />
        </button>

        {/* Reading progress */}
        <span
          aria-hidden="true"
          className="absolute left-0 bottom-[-1px] h-[2px] bg-[#FF7A00] transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </header>

      <div
        onScroll={onScroll}
        className="flex-1 overflow-y-auto overscroll-contain px-6 sm:px-8 py-6 sm:py-7 [scrollbar-width:thin] [scrollbar-color:#E3DFDA_transparent]"
      >
        <p className="text-[15.5px] leading-[1.7] text-[#0E0E0E]">{policy.intro}</p>

        <ol className="mt-7 space-y-6">
          {policy.sections.map((section, i) => (
            <li key={section.heading} className="grid grid-cols-[auto_1fr] gap-x-4">
              <span className="pt-[3px] font-outfit font-bold text-[13px] tabular-nums text-[#FF7A00]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-outfit font-bold text-[17px] tracking-[-0.01em] text-[#0E0E0E]">
                  {section.heading}
                </h3>
                {section.paragraphs?.map((p) => (
                  <p key={p} className="mt-2 text-[14.5px] leading-[1.7] text-[#4A4A4E]">
                    {p}
                  </p>
                ))}
                {section.list && (
                  <ul className="mt-2.5 space-y-2">
                    {section.list.map((item) => (
                      <li key={item} className="flex gap-3 text-[14.5px] leading-[1.6] text-[#4A4A4E]">
                        <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-[#FF7A00] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {section.note && (
                  <p className="mt-2.5 text-[14.5px] leading-[1.7] font-medium text-[#0E0E0E]">
                    {section.note}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <footer className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 px-6 sm:px-8 py-4 sm:py-5 border-t border-[#F1EEEA] bg-[#F7F6F4]">
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="inline-flex items-center justify-center sm:justify-start gap-2 text-[13px] text-[#5A5A5F] hover:text-[#0E0E0E] transition-colors duration-200"
        >
          <Mail size={15} className="text-[#FF7A00]" />
          Questions? {CONTACT_EMAIL}
        </a>
        <button
          type="button"
          onClick={onClose}
          className="h-11 rounded-full px-7 bg-primary font-outfit font-bold text-[14.5px] text-[#0E0E0E] transition-[background-color,color] duration-300 hover:bg-[#0E0E0E] hover:text-white"
        >
          Got it
        </button>
      </footer>
    </motion.div>
  );
}

const PolicyModal = ({ type, onClose }: PolicyModalProps) => {
  const isOpen = type !== null;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {type && (
        <motion.div
          key="policy-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 z-[150] flex items-end sm:items-center justify-center sm:p-6 bg-[#0E0E0E]/55 backdrop-blur-sm"
        >
          <PolicyPanel key={type} type={type} onClose={onClose} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PolicyModal;
