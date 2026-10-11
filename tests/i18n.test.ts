import { describe, expect, it } from "vitest";
import { isLocale, localizePath, pageAlternates, SITE_URL, stripLocale } from "@/i18n/config";
import { format } from "@/i18n/format";
import { getDictionary, resolveLocale } from "@/i18n";

describe("localizePath", () => {
  it("keeps Georgian paths at the root", () => {
    expect(localizePath("ka", "/")).toBe("/");
    expect(localizePath("ka", "/services")).toBe("/services");
  });

  it("prefixes English paths with /en", () => {
    expect(localizePath("en", "/")).toBe("/en");
    expect(localizePath("en", "/projects/zmna-ge")).toBe("/en/projects/zmna-ge");
  });

  it("adds a missing leading slash", () => {
    expect(localizePath("en", "contact")).toBe("/en/contact");
  });
});

describe("stripLocale", () => {
  it("removes the /en prefix", () => {
    expect(stripLocale("/en")).toBe("/");
    expect(stripLocale("/en/services")).toBe("/services");
  });

  it("removes the internal /ka prefix seen during server rendering", () => {
    expect(stripLocale("/ka")).toBe("/");
    expect(stripLocale("/ka/projects/gree")).toBe("/projects/gree");
  });

  it("leaves unprefixed paths and look-alikes alone", () => {
    expect(stripLocale("/services")).toBe("/services");
    expect(stripLocale("/english")).toBe("/english");
  });
});

describe("pageAlternates", () => {
  it("links every language version and x-default", () => {
    const alt = pageAlternates("en", "/about");
    expect(alt.canonical).toBe(`${SITE_URL}/en/about`);
    expect(alt.languages).toEqual({
      ka: `${SITE_URL}/about`,
      en: `${SITE_URL}/en/about`,
      "x-default": `${SITE_URL}/about`,
    });
  });
});

describe("locales", () => {
  it("accepts only supported languages", () => {
    expect(isLocale("ka")).toBe(true);
    expect(isLocale("en")).toBe(true);
    expect(isLocale("robots.txt")).toBe(false);
    expect(resolveLocale("de")).toBe("ka");
  });

  it("returns the right dictionary", () => {
    expect(getDictionary("ka").nav.home).toBe("მთავარი");
    expect(getDictionary("en").nav.home).toBe("Home");
  });
});

describe("format", () => {
  it("fills placeholders", () => {
    expect(format("Hi {name}, {n} new", { name: "Gigi", n: 3 })).toBe("Hi Gigi, 3 new");
  });

  it("leaves unknown placeholders untouched", () => {
    expect(format("{a} and {b}", { a: 1 })).toBe("1 and {b}");
  });
});
