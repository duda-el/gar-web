"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { GoogleAnalytics } from "@next/third-parties/google";
import { useConsent } from "@/lib/consent";
import { loadMetaPixel, trackPageView } from "@/lib/metaPixel";

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

  if (consent !== "accepted") return null;
  return <GoogleAnalytics gaId="G-TCBNN29N66" />;
}
