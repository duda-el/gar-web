import type { MetadataRoute } from "next";
import { projects } from "@/constants/projects";
import { servicePages } from "@/constants/servicePages";
import { defaultLocale, locales, localizePath, SITE_URL } from "@/i18n/config";

/**
 * Date the site content last changed. Update it when pages change, so lastmod stays
 * meaningful (a new date on every build would teach Google to ignore it).
 */
export const CONTENT_UPDATED = "2026-11-24";

type Page = {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly";
};

const pages: Page[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  ...servicePages.map((page) => ({
    path: `/services/${page.slug}`,
    priority: 0.9,
    changeFrequency: "monthly" as const,
  })),
  { path: "/projects", priority: 0.9, changeFrequency: "weekly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "monthly" },
  { path: "/cookies", priority: 0.3, changeFrequency: "monthly" },
  { path: "/terms", priority: 0.3, changeFrequency: "monthly" },
  ...projects.map((project) => ({
    path: `/projects/${project.slug}`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  })),
];

/**
 * One plain entry per page and language. Language links (hreflang) live in each page's
 * <head>, not here: xhtml:link elements make browsers render the XML as text instead of a tree.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ path, priority, changeFrequency }) =>
    locales.map((locale) => ({
      url: `${SITE_URL}${localizePath(locale, path)}`,
      lastModified: CONTENT_UPDATED,
      changeFrequency,
      priority: locale === defaultLocale ? priority : Math.round(priority * 0.9 * 10) / 10,
    })),
  );
}
