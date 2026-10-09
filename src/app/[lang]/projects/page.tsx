import type { Metadata } from "next";
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer";
import AllProjects from "@/components/Pages/AllProjects";
import { pageAlternates } from "@/i18n/config";
import { getDictionary, resolveLocale } from "@/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  const page = getDictionary(locale).meta.pages.projects;
  return {
    title: page.title,
    description: page.description,
    alternates: pageAlternates(locale, "/projects"),
  };
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <AllProjects />
      </main>
      <Footer />
    </div>
  );
}
