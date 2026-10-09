import type { MetadataRoute } from "next";
import { projects } from "@/constants/projects";
import { defaultLocale, locales, localizePath, SITE_URL } from "@/i18n/config";

const pages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/projects", priority: 0.9, changeFrequency: "weekly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
  ...projects.map((project) => ({
    path: `/projects/${project.slug}`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  })),
];

// One entry per page and language, each listing all language versions (hreflang)
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return pages.flatMap(({ path, priority, changeFrequency }) => {
    const languages = Object.fromEntries([
      ...locales.map((l) => [l, `${SITE_URL}${localizePath(l, path)}`]),
      ["x-default", `${SITE_URL}${localizePath(defaultLocale, path)}`],
    ]);

    return locales.map((locale) => ({
      url: `${SITE_URL}${localizePath(locale, path)}`,
      lastModified,
      changeFrequency,
      priority: locale === defaultLocale ? priority : Math.round(priority * 0.9 * 10) / 10,
      alternates: { languages },
    }));
  });
}
