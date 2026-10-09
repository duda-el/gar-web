import type { Metadata } from "next";
import { pageAlternates } from "@/i18n/config";
import { getDictionary, resolveLocale } from "@/i18n";
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer";
import Contact from "@/components/Pages/Contact";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  const page = getDictionary(locale).meta.pages.contact;
  return {
    title: page.title,
    description: page.description,
    alternates: pageAlternates(locale, "/contact"),
  };
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
