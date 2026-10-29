import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer";
import ServiceDetail from "@/components/Pages/ServiceDetail";
import JsonLd from "@/components/seo/JsonLd";
import { getServicePage, servicePages } from "@/constants/servicePages";
import { locales } from "@/i18n/config";
import { pageMetadata } from "@/i18n/metadata";
import { getDictionary, resolveLocale } from "@/i18n";
import { breadcrumbs, faqPage, serviceDetail } from "@/lib/structuredData";

type Props = { params: Promise<{ lang: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => servicePages.map((page) => ({ lang, slug: page.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = resolveLocale(lang);
  const page = getServicePage(slug);
  if (!page) return {};
  const c = page.content[locale];
  return pageMetadata(locale, `/services/${page.slug}`, { title: c.metaTitle, description: c.metaDescription });
}

export default async function ServicePageRoute({ params }: Props) {
  const { lang, slug } = await params;
  const locale = resolveLocale(lang);
  const t = getDictionary(locale);
  const page = getServicePage(slug);
  if (!page) notFound();
  const c = page.content[locale];

  return (
    <div className="min-h-screen bg-white">
      <JsonLd
        data={breadcrumbs(locale, t, [
          { name: t.nav.services, path: "/services" },
          { name: c.name, path: `/services/${page.slug}` },
        ])}
      />
      <JsonLd data={serviceDetail(locale, page)} />
      <JsonLd data={faqPage(c.faqs)} />
      <Header />
      <main>
        <ServiceDetail page={page} locale={locale} t={t} />
      </main>
      <Footer />
    </div>
  );
}
