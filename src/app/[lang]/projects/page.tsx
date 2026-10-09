import type { Metadata } from "next";
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer";
import AllProjects from "@/components/Pages/AllProjects";
import { pageMetadata } from "@/i18n/metadata";
import { getDictionary, resolveLocale } from "@/i18n";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbs } from "@/lib/structuredData";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  return pageMetadata(locale, "/projects", getDictionary(locale).meta.pages.projects);
}

export default async function ProjectsPage({ params }: Props) {
  const locale = resolveLocale((await params).lang);
  const t = getDictionary(locale);

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={breadcrumbs(locale, t, [{ name: t.nav.projects, path: "/projects" }])} />
      <Header />
      <main>
        <AllProjects />
      </main>
      <Footer />
    </div>
  );
}
