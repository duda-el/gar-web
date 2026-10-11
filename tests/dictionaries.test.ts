import { describe, expect, it } from "vitest";
import en from "@/i18n/dictionaries/en";
import ka from "@/i18n/dictionaries/ka";
import enPolicies from "@/i18n/policies/en";
import kaPolicies from "@/i18n/policies/ka";

type Leaf = { path: string; value: string };

/** Every string in a nested object, with its path ("contact.errors.nameLong") */
function leaves(value: unknown, path = ""): Leaf[] {
  if (typeof value === "string") return [{ path, value }];
  if (Array.isArray(value)) return value.flatMap((v, i) => leaves(v, `${path}[${i}]`));
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([k, v]) => leaves(v, path ? `${path}.${k}` : k));
  }
  return [];
}

const placeholders = (s: string) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();

describe.each([
  ["dictionary", en, ka],
  ["policies", enPolicies, kaPolicies],
])("%s: Georgian matches English", (_name, english, georgian) => {
  const enLeaves = leaves(english);
  const kaLeaves = leaves(georgian);
  const kaByPath = new Map(kaLeaves.map((l) => [l.path, l.value]));

  it("has exactly the same keys and list lengths", () => {
    // Search keywords are chosen per language, so their count may differ
    const paths = (ls: Leaf[]) =>
      ls.map((l) => l.path).filter((p) => !p.startsWith("meta.keywords")).sort();
    expect(paths(kaLeaves)).toEqual(paths(enLeaves));
  });

  it("has no empty texts", () => {
    expect(kaLeaves.filter((l) => !l.value.trim()).map((l) => l.path)).toEqual([]);
    expect(enLeaves.filter((l) => !l.value.trim()).map((l) => l.path)).toEqual([]);
  });

  it("uses the same {placeholders} in every text", () => {
    const mismatched = enLeaves
      .filter((l) => kaByPath.has(l.path))
      .filter((l) => placeholders(l.value).join() !== placeholders(kaByPath.get(l.path)!).join())
      .map((l) => l.path);
    expect(mismatched).toEqual([]);
  });
});

describe("Georgian dictionary", () => {
  it("is actually in Georgian (not copied English)", () => {
    const visible = [ka.nav.home, ka.hero.titleLine1, ka.contact.send, ka.notFound.title, ka.footer.privacy];
    for (const text of visible) expect(text).toMatch(/[Ⴀ-ჿ]/);
  });

  it("has no English left in long texts", () => {
    const englishLooking = leaves(ka)
      .filter((l) => !l.path.startsWith("meta.keywords") && l.value.length > 25)
      .filter((l) => !/[Ⴀ-ჿ]/.test(l.value))
      .map((l) => l.path);
    expect(englishLooking).toEqual([]);
  });
});
