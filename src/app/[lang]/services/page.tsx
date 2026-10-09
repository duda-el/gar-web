import type { Metadata } from "next";
import { pageMetadata } from "@/i18n/metadata";
import { getDictionary, resolveLocale } from "@/i18n";
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer";
import AllServices from "@/components/Pages/AllServices";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  return pageMetadata(locale, "/services", getDictionary(locale).meta.pages.services);
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <AllServices />
      </main>
      <Footer />
    </div>
  );
}
