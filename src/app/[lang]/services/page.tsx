import type { Metadata } from "next";
import { pageMetadata } from "@/i18n/metadata";
import { getDictionary, resolveLocale } from "@/i18n";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbs, faqPage, servicesList } from "@/lib/structuredData";
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer";
import AllServices from "@/components/Pages/AllServices";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  return pageMetadata(locale, "/services", getDictionary(locale).meta.pages.services);
}

export default async function ServicesPage({ params }: Props) {
  const locale = resolveLocale((await params).lang);
  const t = getDictionary(locale);

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={breadcrumbs(locale, t, [{ name: t.nav.services, path: "/services" }])} />
      <JsonLd data={servicesList(locale, t)} />
      <JsonLd data={faqPage(t.allServices.faqs)} />
      <Header />
      <main>
        <AllServices />
      </main>
      <Footer />
    </div>
  );
}
