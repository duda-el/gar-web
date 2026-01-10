"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // დრო შევამცირეთ 0.5 წამამდე სწრაფი რეაგირებისთვის
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-0 left-0 w-full z-[200] p-4 md:p-6"
        >
          <div className="max-w-5xl mx-auto">
            <div className="bg-[#1c1c1c]/90 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-full p-4 md:px-8 md:py-4 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* მარცხენა მხარე: აიქონი და ტექსტი */}
              <div className="flex items-center gap-4">
                <div className="hidden md:flex w-10 h-10 rounded-full bg-primary/10 items-center justify-center text-primary shrink-0">
                  <Cookie size={20} />
                </div>
                <p className="text-zinc-300 text-sm font-georgian text-center md:text-left leading-tight">
                  ჩვენ ვიყენებთ <span className="text-white font-bold">Cookies</span> საიტის საუკეთესო გამოცდილებისთვის. 
                  გაგრძელებით თქვენ ეთანხმებით ჩვენს წესებს.
                </p>
              </div>

              {/* მარჯვენა მხარე: ღილაკები */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  onClick={handleAccept}
                  className="flex-1 md:flex-none px-8 py-2.5 bg-primary text-black font-bold rounded-full font-georgian text-[11px] uppercase tracking-wider hover:bg-primary/90 transition-all active:scale-95"
                >
                  ვეთანხმები
                </button>
                <button
                  onClick={() => setIsVisible(false)}
                  className="px-6 py-2.5 bg-white/5 text-zinc-400 font-bold rounded-full font-georgian text-[11px] uppercase tracking-wider hover:bg-white/10 hover:text-white transition-all"
                >
                  დახურვა
                </button>
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;