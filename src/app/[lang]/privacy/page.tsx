import type { Metadata } from "next";
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer";
import Legal from "@/components/Pages/Legal";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbs } from "@/lib/structuredData";
import { pageMetadata } from "@/i18n/metadata";
import { getDictionary, resolveLocale } from "@/i18n";
import { getPolicies } from "@/i18n/policies";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  const policy = getPolicies(locale).privacy;
  return pageMetadata(locale, "/privacy", { title: policy.title, description: policy.intro });
}

export default async function Page({ params }: Props) {
  const locale = resolveLocale((await params).lang);
  const t = getDictionary(locale);
  const policy = getPolicies(locale).privacy;

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={breadcrumbs(locale, t, [{ name: policy.title, path: "/privacy" }])} />
      <Header />
      <main>
        <Legal locale={locale} t={t} policy={policy} type="privacy" />
      </main>
      <Footer />
    </div>
  );
}
