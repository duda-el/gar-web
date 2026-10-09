import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer";
import ProjectDetail from "@/components/Pages/ProjectDetail";
import { getProjectBySlug, projects } from "@/constants/projects";
import { locales } from "@/i18n/config";
import { pageMetadata } from "@/i18n/metadata";
import { getDictionary, resolveLocale } from "@/i18n";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbs, projectWork } from "@/lib/structuredData";

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
  // e.g. "Zmna.ge — საინფორმაციო პორტალის ვებ გვერდი": project name plus what it is
  const title = content.alt.replace(/\s+-\s+/, " — ");

  return pageMetadata(locale, `/projects/${project.slug}`, {
    title,
    description: content.description,
    image: { url: project.images[0].src, alt: content.alt },
  });
}

export default async function ProjectPage({ params }: Props) {
  const { lang, slug } = await params;
  const locale = resolveLocale(lang);
  const t = getDictionary(locale);
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  const content = project.content[locale];

  return (
    <div className="min-h-screen bg-white">
      <JsonLd
        data={breadcrumbs(locale, t, [
          { name: t.nav.projects, path: "/projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ])}
      />
      <JsonLd
        data={projectWork(
          locale,
          { slug: project.slug, title: project.title, url: project.url, image: project.images[0].src },
          content,
        )}
      />
      <Header />
      <main>
        <ProjectDetail project={project} />
      </main>
      <Footer />
    </div>
  );
}
