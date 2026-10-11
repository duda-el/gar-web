"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useConsent } from "@/lib/consent";

// Google Analytics sets cookies, so it only loads after the visitor accepts them
export default function Analytics() {
  const consent = useConsent();
  if (consent !== "accepted") return null;
  return <GoogleAnalytics gaId="G-TCBNN29N66" />;
}
