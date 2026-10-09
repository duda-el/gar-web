import type { Metadata } from "next";
import { pageMetadata } from "@/i18n/metadata";
import { getDictionary, resolveLocale } from "@/i18n";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbs } from "@/lib/structuredData";
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer";
import Contact from "@/components/Pages/Contact";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  return pageMetadata(locale, "/contact", getDictionary(locale).meta.pages.contact);
}

export default async function ContactPage({ params }: Props) {
  const locale = resolveLocale((await params).lang);
  const t = getDictionary(locale);

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={breadcrumbs(locale, t, [{ name: t.nav.contact, path: "/contact" }])} />
      <Header />
      <main>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
