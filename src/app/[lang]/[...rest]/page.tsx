import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, resolveLocale } from "@/i18n";

type Props = { params: Promise<{ lang: string }> };

// Without this the layout's home-page title and "index" robots would apply to the 404
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  return {
    title: getDictionary(locale).meta.pages.notFound.title,
    robots: { index: false, follow: true },
  };
}

// Any unknown URL lands here, so the 404 page renders inside the right language's layout
export default function CatchAll() {
  notFound();
}
