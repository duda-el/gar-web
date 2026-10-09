import type { Metadata } from "next";
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer";
import AboutUs from "@/components/Pages/AboutUs";
import Testimonials from "@/components/Pages/Testimonials";
import { pageMetadata } from "@/i18n/metadata";
import { getDictionary, resolveLocale } from "@/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  return pageMetadata(locale, "/about", getDictionary(locale).meta.pages.about);
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <AboutUs />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
