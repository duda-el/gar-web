import type { Metadata } from "next";
import NotFoundView from "@/components/Pages/NotFound";

export const metadata: Metadata = {
  title: "404",
  robots: { index: false, follow: true },
};

// The page text comes from the language context set by [lang]/layout.tsx
export default function NotFound() {
  return <NotFoundView />;
}
