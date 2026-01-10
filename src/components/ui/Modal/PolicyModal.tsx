"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

const PolicyModal = ({ isOpen, onClose, title, content }: PolicyModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] cursor-pointer"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-2xl max-h-[80vh] bg-[#1c1c1c] border border-white/10 rounded-3xl z-[101] overflow-hidden flex flex-col shadow-2xl"
          >
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#1c1c1c]">
              <h2 className="text-xl font-bold text-white font-georgian uppercase tracking-wider">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full transition-colors text-zinc-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 overflow-y-auto custom-scrollbar text-zinc-300 font-georgian leading-relaxed space-y-6">
              {content}
            </div>

            <div className="p-6 border-t border-white/5 bg-[#1c1c1c] flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-primary text-black font-bold rounded-xl font-georgian text-sm hover:scale-105 transition-transform"
              >
                გასაგებია
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PolicyModal;
