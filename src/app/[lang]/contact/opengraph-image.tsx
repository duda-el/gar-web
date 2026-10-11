import { getDictionary, resolveLocale } from "@/i18n";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Gargari";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// Social preview image for the contact page, in the page's language
export default async function ContactOgImage({ params }: { params: Promise<{ lang: string }> }) {
  const t = getDictionary(resolveLocale((await params).lang));
  return renderOgImage({
    eyebrow: t.nav.contact,
    title: t.contact.title,
    description: t.meta.pages.contact.description,
  });
}
