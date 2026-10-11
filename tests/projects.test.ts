import { describe, expect, it } from "vitest";
import { getProjectBySlug, localizeProject, projects } from "@/constants/projects";

describe("project data", () => {
  it("has unique ids and URL-safe unique slugs", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(new Set(projects.map((p) => p.id)).size).toBe(projects.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it.each(projects.map((p) => [p.slug, p] as const))("%s is complete in both languages", (_slug, project) => {
    expect(project.images.length).toBeGreaterThan(0);
    for (const locale of ["ka", "en"] as const) {
      const c = localizeProject(project, locale);
      expect(c.description.trim()).not.toBe("");
      expect(c.alt.trim()).not.toBe("");
      expect(c.overview.length).toBeGreaterThan(0);
      expect(c.highlights.length).toBeGreaterThan(0);
      expect(c.services.length).toBe(project.services.length);
      if (locale === "ka") expect(c.description).toMatch(/[Ⴀ-ჿ]/);
    }
    if (project.url) expect(project.url).toMatch(/^https:\/\//);
  });

  it("finds projects by slug", () => {
    expect(getProjectBySlug("zmna-ge")?.title).toBe("Zmna.ge");
    expect(getProjectBySlug("missing")).toBeUndefined();
  });
});
