import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import manifest from "@/app/manifest";
import { getProjectBySlug, projects } from "@/constants/projects";
import { servicePages } from "@/constants/servicePages";
import { SITE_URL } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { breadcrumbs, faqPage, projectWork, serviceDetail, siteGraph } from "@/lib/structuredData";
import { OG_IMAGE, pageMetadata } from "@/i18n/metadata";

describe("robots.txt", () => {
  const r = robots();
  const rules = Array.isArray(r.rules) ? r.rules : [r.rules];

  it("allows crawling, including /_next assets needed for rendering", () => {
    const disallowed = rules.flatMap((rule) => [rule.disallow ?? []].flat());
    expect(disallowed).not.toContain("/_next/");
    expect(rules.some((rule) => rule.allow === "/")).toBe(true);
  });

  it("points to the sitemap", () => {
    expect(r.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
  });
});

describe("sitemap.xml", () => {
  const entries = sitemap();
  const pageCount = 5 + servicePages.length + projects.length;

  it("lists every page in both languages", () => {
    expect(entries).toHaveLength(pageCount * 2);
    const urls = entries.map((e) => e.url);
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls).toContain(`${SITE_URL}/`);
    expect(urls).toContain(`${SITE_URL}/en`);
    expect(urls).toContain(`${SITE_URL}/projects/gms-turbo`);
    expect(urls).toContain(`${SITE_URL}/en/projects/gms-turbo`);
    expect(urls).toContain(`${SITE_URL}/services/landing-page`);
    expect(urls).toContain(`${SITE_URL}/en/services/online-shop`);
  });

  it("links language versions and uses absolute URLs", () => {
    for (const entry of entries) {
      expect(entry.url.startsWith(SITE_URL)).toBe(true);
      expect(Object.keys(entry.alternates?.languages ?? {}).sort()).toEqual(["en", "ka", "x-default"]);
    }
  });

  it("uses a stable lastmod, not the build time", () => {
    const dates = new Set(entries.map((e) => String(e.lastModified)));
    expect(dates.size).toBe(1);
    expect([...dates][0]).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("includes project images", () => {
    const project = entries.find((e) => e.url === `${SITE_URL}/projects/zmna-ge`);
    expect(project?.images?.length).toBe(getProjectImages("zmna-ge"));
  });
});

function getProjectImages(slug: string) {
  return projects.find((p) => p.slug === slug)!.images.length;
}

describe("manifest", () => {
  it("has the app name and installable icons", () => {
    const m = manifest();
    expect(m.name).toBe("Gargari");
    const sizes = (m.icons ?? []).map((i) => i.sizes);
    expect(sizes).toContain("192x192");
    expect(sizes).toContain("512x512");
    expect((m.icons ?? []).some((i) => i.purpose === "maskable")).toBe(true);
  });
});

describe("page metadata", () => {
  it("gives each page its own canonical, hreflang and social URL", () => {
    const meta = pageMetadata("en", "/services", { title: "Services", description: "d" });
    expect(meta.alternates?.canonical).toBe(`${SITE_URL}/en/services`);
    expect(meta.openGraph).toMatchObject({ url: `${SITE_URL}/en/services`, locale: "en_US" });
  });

  it("uses the shared logo image for social previews", () => {
    const meta = pageMetadata("ka", "/about", { title: "t", description: "d" });
    expect(meta.openGraph?.images).toEqual([OG_IMAGE]);
    expect(meta.twitter?.images).toEqual([OG_IMAGE.url]);
    expect(OG_IMAGE).toMatchObject({ url: "/og-image.png", width: 1200, height: 630 });
  });
});

describe("structured data", () => {
  const t = getDictionary("ka");

  it("describes the studio and website", () => {
    const graph = siteGraph("ka", t)["@graph"];
    expect(graph.map((g) => g["@type"])).toEqual(["ProfessionalService", "WebSite"]);
    expect(graph[0]).toMatchObject({ email: "gargariinfo@gmail.com", logo: `${SITE_URL}/logo.png` });
  });

  it("builds breadcrumbs starting at home", () => {
    const b = breadcrumbs("en", getDictionary("en"), [{ name: "Projects", path: "/projects" }]);
    expect(b.itemListElement.map((i) => i.item)).toEqual([`${SITE_URL}/en`, `${SITE_URL}/en/projects`]);
  });

  it("turns the FAQ into FAQPage", () => {
    const faq = faqPage(t.allServices.faqs);
    expect(faq.mainEntity).toHaveLength(t.allServices.faqs.length);
  });

  it("describes a project", () => {
    const work = projectWork(
      "en",
      { slug: "gree", title: "Gree", image: "/_next/static/media/gree.jpg" },
      { description: "d", category: "E-commerce" },
    );
    expect(work).toMatchObject({ "@type": "CreativeWork", url: `${SITE_URL}/en/projects/gree` });
  });

  it("never contains a closing script tag", () => {
    expect(JSON.stringify(siteGraph("en", getDictionary("en")))).not.toMatch(/<\/script/i);
  });
});

describe("service pages", () => {
  it("have unique slugs, both languages and existing example projects", () => {
    const slugs = servicePages.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const page of servicePages) {
      for (const c of Object.values(page.content)) {
        expect(c.title.trim()).not.toBe("");
        expect(c.metaDescription.length).toBeLessThanOrEqual(200);
        expect(c.faqs.length).toBeGreaterThan(0);
      }
      for (const slug of page.projects) expect(getProjectBySlug(slug)).toBeDefined();
    }
  });

  it("describe the service with its provider and starting price", () => {
    const landing = servicePages.find((p) => p.slug === "landing-page")!;
    const schema = serviceDetail("ka", landing);
    expect(schema).toMatchObject({ "@type": "Service", url: `${SITE_URL}/services/landing-page` });
    expect(schema.offers?.priceSpecification.minPrice).toBe(landing.minPrice);
  });
});
