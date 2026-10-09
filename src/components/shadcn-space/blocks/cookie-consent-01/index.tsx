"use client";

import { useState, useEffect } from "react";
import { Cookie, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";

const CookieConsent = () => {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = (accepted: boolean) => {
    setVisible(false);
    if (accepted) toast.success(t.cookies.accepted);
    else toast.info(t.cookies.rejected);
  };

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 pb-6 lg:px-4 px-4 transition-all duration-500",
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      )}
    >
      <div className="max-w-7xl mx-auto bg-background rounded-xl px-5 py-6 md:p-8 shadow-lg border">
        <div className="flex items-center justify-between md:flex-nowrap flex-wrap sm:gap-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 items-center px-3 rounded-full bg-secondary shrink-0">
              <Cookie className="w-4 h-4 text-secondary-foreground" />
            </div>
            <p className="text-muted-foreground md:text-lg text-base">
              {t.cookies.text}
            </p>
          </div>
          <div className="flex w-full sm:w-auto items-center gap-2 sm:shrink-0">
            <Button
              variant="ghost"
              aria-label={t.cookies.settings}
              className="h-10 transition-colors rounded-full cursor-pointer"
            >
              <Settings2 className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              className="h-10 flex-1 sm:flex-none px-4 sm:px-6 rounded-full font-medium cursor-pointer"
              onClick={() => dismiss(false)}
            >
              {t.cookies.reject}
            </Button>
            <Button
              className="h-10 flex-1 sm:flex-none px-4 sm:px-6 rounded-full font-medium cursor-pointer hover:bg-primary/80 transition-colors duration-200"
              onClick={() => dismiss(true)}
            >
              {t.cookies.accept}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
