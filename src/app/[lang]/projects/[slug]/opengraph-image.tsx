import { getProjectBySlug } from "@/constants/projects";
import { resolveLocale } from "@/i18n";
import { assetPathFromSrc, OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Gargari project";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// Social preview for a project: its name, category, description and screenshot
export default async function ProjectOgImage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return new Response("Not found", { status: 404 });
  const content = project.content[resolveLocale(lang)];

  return renderOgImage({
    eyebrow: content.category,
    title: project.title,
    description: content.description,
    imagePath: assetPathFromSrc(project.images[0].src),
  });
}
