"use client";

import { CircleCheck, Info, Loader2, OctagonX, TriangleAlert } from "lucide-react";
import { Toaster, type ToasterProps } from "@/components/ui/toast";

// Defined once so the Toaster's effect doesn't re-run on every render
const toastOptions: ToasterProps["toastOptions"] = {
  className:
    "!rounded-2xl !border-[#EDEAE6] !bg-white !text-[#0E0E0E] !shadow-[0_20px_50px_-20px_rgba(14,14,14,0.35)] font-outfit [&_.text-sm.font-medium]:font-bold [&_.text-sm.font-medium]:text-[14.5px] [&_.text-muted-foreground]:!text-[#5A5A5F] [&_.text-muted-foreground]:font-georgian [&_.text-muted-foreground]:leading-[1.5]",
};

const icons: ToasterProps["icons"] = {
  success: <CircleCheck className="text-[#1FA34A]" aria-hidden="true" />,
  error: <OctagonX className="text-[#B3261E]" aria-hidden="true" />,
  warning: <TriangleAlert className="text-[#FF7A00]" aria-hidden="true" />,
  info: <Info className="text-[#0E0E0E]" aria-hidden="true" />,
  loading: <Loader2 className="animate-spin text-[#FF7A00]" aria-hidden="true" />,
};

// Site-wide toast container, styled to match the brand
export default function AppToaster() {
  return (
    <Toaster
      position="bottom-right"
      duration={5000}
      closeButton
      toastOptions={toastOptions}
      icons={icons}
    />
  );
}
