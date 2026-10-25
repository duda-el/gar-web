"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { GoogleAnalytics } from "@next/third-parties/google";
import { useConsent } from "@/lib/consent";
import { loadMetaPixel, trackEvent, trackPageView } from "@/lib/metaPixel";

// Google Analytics and the Meta Pixel set cookies, so they only load after the visitor accepts them
export default function Analytics() {
  const consent = useConsent();
  const pathname = usePathname();

  // Client-side navigation doesn't reload the page, so each route change is its own PageView
  useEffect(() => {
    if (consent !== "accepted") return;
    loadMetaPixel();
    trackPageView();
  }, [consent, pathname]);

  // Email and phone links anywhere on the site (footer, contact page) count as a Contact
  useEffect(() => {
    if (consent !== "accepted") return;
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href^='mailto:'], a[href^='tel:']");
      if (!link) return;
      const method = link.getAttribute("href")!.startsWith("tel:") ? "phone" : "email";
      trackEvent("Contact", { method });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [consent]);

  if (consent !== "accepted") return null;
  return <GoogleAnalytics gaId="G-TCBNN29N66" />;
}
