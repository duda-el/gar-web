import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer";
import ProjectDetail from "@/components/Pages/ProjectDetail";
import { getProjectBySlug, projects } from "@/constants/projects";
import { locales, pageAlternates } from "@/i18n/config";
import { getDictionary, resolveLocale } from "@/i18n";

type Props = {
  params: Promise<{ lang: string; slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => projects.map((project) => ({ lang, slug: project.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = resolveLocale(lang);
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const content = project.content[locale];
  const suffix = getDictionary(locale).meta.pages.project.titleSuffix;
  const alternates = pageAlternates(locale, `/projects/${project.slug}`);

  return {
    title: `${project.title} — ${suffix}`,
    description: content.description,
    alternates,
    openGraph: {
      title: `${project.title} | Gargari`,
      description: content.description,
      url: alternates.canonical,
      images: [{ url: project.images[0].src, alt: content.alt }],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <ProjectDetail project={project} />
      </main>
      <Footer />
    </div>
  );
}
