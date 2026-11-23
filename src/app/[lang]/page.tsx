import Header from "@/components/Layout/Header/Header";
import Hero from "@/components/Pages/Hero/Hero";
import Footer from "@/components/Layout/Footer";
import Projects from "@/components/Pages/Projects/Index";
import Services from "@/components/Services";
import WhyUs from "@/components/Pages/WhyUs";
import ScrollHandler from "@/components/ScrollHandler";
import HomeSeo from "@/components/Pages/HomeSeo";
import JsonLd from "@/components/seo/JsonLd";
import { faqPage } from "@/lib/structuredData";
import { getDictionary, resolveLocale } from "@/i18n";

type Props = { params: Promise<{ lang: string }> };

export default async function Home({ params }: Props) {
  const locale = resolveLocale((await params).lang);
  const t = getDictionary(locale);

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={faqPage(t.homeSeo.faqs)} />
      <ScrollHandler />
      <Header />
      <main>
        <Hero />
        <Services />
        <Projects />
        <WhyUs />
        <HomeSeo locale={locale} t={t} />
        <Footer />
      </main>
    </div>
  );
}
