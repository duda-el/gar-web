import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer";
import ProjectDetail from "@/components/Pages/ProjectDetail";
import CTA from "@/components/Pages/CTA";
import { getProjectBySlug, projects } from "@/constants/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const url = `https://www.gargari.ge/projects/${project.slug}`;

  return {
    title: `${project.title} — Project`,
    description: project.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${project.title} | Gargari`,
      description: project.description,
      url,
      images: [{ url: project.images[0].src, alt: project.alt }],
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
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
