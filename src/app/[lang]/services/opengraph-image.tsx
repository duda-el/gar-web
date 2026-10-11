import { getDictionary, resolveLocale } from "@/i18n";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Gargari";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// Social preview image for the services page, in the page's language
export default async function ServicesOgImage({ params }: { params: Promise<{ lang: string }> }) {
  const t = getDictionary(resolveLocale((await params).lang));
  return renderOgImage({
    eyebrow: t.nav.services,
    title: t.allServices.title,
    description: t.meta.pages.services.description,
  });
}
