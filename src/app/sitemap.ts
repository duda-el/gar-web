import type { MetadataRoute } from "next";
import { projects } from "@/constants/projects";
import { defaultLocale, locales, localizePath, SITE_URL } from "@/i18n/config";

/**
 * Date the site content last changed. Update it when pages change, so lastmod stays
 * meaningful (a new date on every build would teach Google to ignore it).
 */
export const CONTENT_UPDATED = "2026-10-11";

type Page = {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly";
  images?: string[];
};

const pages: Page[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/projects", priority: 0.9, changeFrequency: "weekly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
  ...projects.map((project) => ({
    path: `/projects/${project.slug}`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
    images: project.images.map((image) => `${SITE_URL}${image.src}`),
  })),
];

// One entry per page and language, each listing all language versions (hreflang)
export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ path, priority, changeFrequency, images }) => {
    const languages = Object.fromEntries([
      ...locales.map((l) => [l, `${SITE_URL}${localizePath(l, path)}`]),
      ["x-default", `${SITE_URL}${localizePath(defaultLocale, path)}`],
    ]);

    return locales.map((locale) => ({
      url: `${SITE_URL}${localizePath(locale, path)}`,
      lastModified: CONTENT_UPDATED,
      changeFrequency,
      priority: locale === defaultLocale ? priority : Math.round(priority * 0.9 * 10) / 10,
      alternates: { languages },
      ...(images ? { images } : {}),
    }));
  });
}
