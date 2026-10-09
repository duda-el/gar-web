import type { Metadata } from "next";
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer";
import AboutUs from "@/components/Pages/AboutUs";
import Testimonials from "@/components/Pages/Testimonials";
import { pageMetadata } from "@/i18n/metadata";
import { getDictionary, resolveLocale } from "@/i18n";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbs } from "@/lib/structuredData";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  return pageMetadata(locale, "/about", getDictionary(locale).meta.pages.about);
}

export default async function AboutPage({ params }: Props) {
  const locale = resolveLocale((await params).lang);
  const t = getDictionary(locale);

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={breadcrumbs(locale, t, [{ name: t.nav.about, path: "/about" }])} />
      <Header />
      <main>
        <AboutUs />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
