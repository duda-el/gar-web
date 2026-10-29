"use client";

import { useState, useEffect } from "react";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/I18nProvider";
import { saveConsent, useConsent } from "@/lib/consent";

const CookieConsent = () => {
  const { t } = useI18n();
  const consent = useConsent();
  const [ready, setReady] = useState(false);
  // Only visitors who haven't chosen yet see the banner (slides in after a second)
  const visible = ready && consent === null;

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const choose = (accepted: boolean) => {
    saveConsent(accepted ? "accepted" : "rejected");
    if (accepted) toast.success(t.cookies.accepted);
    else toast.info(t.cookies.rejected);
  };

  // Not rendered at all once a choice exists, so it can't be tabbed into
  if (consent !== null) return null;

  return (
    <div
      role="region"
      aria-label={t.cookies.settings}
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 pb-4 lg:px-4 px-4 transition-all duration-500",
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none",
      )}
    >
      <div className="max-w-7xl mx-auto bg-background rounded-xl px-4 py-3 md:px-6 md:py-4 shadow-lg border">
        <div className="flex items-center justify-between md:flex-nowrap flex-wrap sm:gap-6 gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 items-center px-2.5 rounded-full bg-secondary shrink-0">
              <Cookie className="w-4 h-4 text-secondary-foreground" />
            </div>
            <p className="text-muted-foreground md:text-base text-sm">{t.cookies.text}</p>
          </div>
          <div className="flex w-full sm:w-auto items-center gap-2 sm:shrink-0">
            <Button
              variant="outline"
              className="h-9 flex-1 sm:flex-none px-4 sm:px-5 rounded-full font-medium cursor-pointer"
              onClick={() => choose(false)}
            >
              {t.cookies.reject}
            </Button>
            <Button
              className="h-9 flex-1 sm:flex-none px-4 sm:px-5 rounded-full font-medium cursor-pointer text-[#0E0E0E] hover:bg-primary/80 transition-colors duration-200"
              onClick={() => choose(true)}
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
