import { describe, expect, it } from "vitest";
import robots, { AI_CRAWLERS } from "@/app/robots";
import { projects } from "@/constants/projects";
import { CONTACT_EMAIL } from "@/constants/policies";
import { FACEBOOK_URL, FOUNDING_YEAR, PHONE_DISPLAY, PHONE_TEL, TEAM_SIZE } from "@/constants/site";
import { SITE_URL } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { buildLlmsFullTxt, buildLlmsTxt } from "@/lib/llms";
import { siteGraph } from "@/lib/structuredData";

describe("llms.txt", () => {
  const txt = buildLlmsTxt();

  it("follows the llmstxt.org shape: title, summary, sections", () => {
    expect(txt.startsWith("# Gargari\n\n> ")).toBe(true);
    expect(txt).toContain("## Services");
    expect(txt).toContain("## Projects");
  });

  it("states the key facts", () => {
    expect(txt).toContain("Tbilisi 0162, Georgia");
    expect(txt).toContain(CONTACT_EMAIL);
    expect(txt).toContain(PHONE_DISPLAY);
    expect(txt).toContain(`Founded: ${FOUNDING_YEAR}; team of ${TEAM_SIZE} people`);
    expect(txt).toContain("from ₾2,500");
  });

  it("links every main page in both languages and every project", () => {
    for (const path of ["", "/services", "/projects", "/about", "/contact"]) {
      expect(txt).toContain(`(${SITE_URL}${path || "/"})`);
      expect(txt).toContain(`(${SITE_URL}/en${path})`);
    }
    for (const p of projects) expect(txt).toContain(`${SITE_URL}/en/projects/${p.slug}`);
  });

  it("only links to the site's own absolute URLs or known profiles", () => {
    const links = [...txt.matchAll(/\]\((https?:\/\/[^)]+)\)/g)].map((m) => m[1]);
    expect(links.length).toBeGreaterThan(10);
    for (const link of links) expect(link.startsWith(SITE_URL)).toBe(true);
  });
});

describe("llms-full.txt", () => {
  const full = buildLlmsFullTxt();

  it("contains the FAQ and every project in both languages", () => {
    for (const locale of ["en", "ka"] as const) {
      const t = getDictionary(locale);
      for (const faq of t.allServices.faqs) expect(full).toContain(faq.question);
      expect(full).toContain(t.aboutUs.text);
    }
    for (const p of projects) {
      expect(full).toContain(`### ${p.title}`);
      if (p.url) expect(full).toContain(p.url);
    }
  });

  it("has no unfilled placeholders", () => {
    expect(full).not.toMatch(/\{\w+\}/);
    expect(full).not.toContain("undefined");
  });
});

describe("AI crawlers", () => {
  it("are explicitly allowed in robots.txt", () => {
    const r = robots();
    const rules = Array.isArray(r.rules) ? r.rules : [r.rules];
    const aiRule = rules.find((rule) => Array.isArray(rule.userAgent) && rule.userAgent.includes("GPTBot"));
    expect(aiRule?.allow).toBe("/");
    for (const bot of ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"]) {
      expect(AI_CRAWLERS).toContain(bot);
    }
  });
});

describe("Organization data for AI answers", () => {
  it("lists services with the starting price, expertise and contact", () => {
    const org = siteGraph("en", getDictionary("en"))["@graph"][0] as Record<string, unknown>;
    const catalog = org.hasOfferCatalog as { itemListElement: { priceSpecification?: { minPrice: number; priceCurrency: string } }[] };
    expect(catalog.itemListElement).toHaveLength(4);
    expect(catalog.itemListElement[0].priceSpecification).toEqual({
      "@type": "PriceSpecification",
      minPrice: 2500,
      priceCurrency: "GEL",
    });
    expect(org.knowsAbout).toContain("Next.js");
    expect(org).toMatchObject({
      telephone: PHONE_TEL,
      foundingDate: String(FOUNDING_YEAR),
      numberOfEmployees: { value: TEAM_SIZE },
      address: { postalCode: "0162", addressCountry: "GE" },
    });
    expect(org.sameAs).toContain(FACEBOOK_URL);
    expect(org.contactPoint).toMatchObject({ email: CONTACT_EMAIL, availableLanguage: ["Georgian", "English"] });
  });
});
