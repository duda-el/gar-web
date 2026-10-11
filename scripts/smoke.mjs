// End-to-end smoke test against a running site.
// Usage: npm run build && npm start, then in another terminal:
//   npm run test:smoke                      (http://localhost:3000)
//   BASE_URL=https://www.gargari.ge npm run test:smoke
const BASE = (process.env.BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const SITE = "https://www.gargari.ge";
const SLUGS = [
  "gms-turbo", "i-techno", "mechanx", "reputation-ge", "zmna-ge", "reagent-ge",
  "bizon-ge", "gree", "freezer", "coffeeon", "unistats", "nostal-ge",
];
const PAGES = ["/", "/services", "/projects", "/about", "/contact", ...SLUGS.map((s) => `/projects/${s}`)];

const failures = [];
let checks = 0;
const check = (ok, message) => {
  checks++;
  if (!ok) failures.push(message);
};
const localized = (locale, path) => (locale === "ka" ? path : path === "/" ? "/en" : `/en${path}`);
const attr = (html, re) => html.match(re)?.[1];

for (const locale of ["ka", "en"]) {
  for (const path of PAGES) {
    const url = localized(locale, path);
    const res = await fetch(BASE + url, { redirect: "manual" });
    const html = await res.text();
    check(res.status === 200, `${url}: status ${res.status}`);
    if (res.status !== 200) continue;

    check(attr(html, /<html lang="(\w+)"/) === locale, `${url}: html lang`);
    const canonical = SITE + (url === "/" ? "" : url);
    check(attr(html, /<link rel="canonical" href="([^"]+)"/) === canonical, `${url}: canonical`);
    for (const l of ["ka", "en", "x-default"]) {
      check(new RegExp(`hrefLang="${l}"`).test(html), `${url}: hreflang ${l}`);
    }
    check(/<title>[^<]{5,}<\/title>/.test(html), `${url}: title`);
    check(/<meta name="description" content="[^"]{30,}"/.test(html), `${url}: description`);
    check((html.match(/<h1[\s>]/g) ?? []).length === 1, `${url}: exactly one h1`);
    check(attr(html, /<meta property="og:locale" content="([^"]+)"/) === (locale === "ka" ? "ka_GE" : "en_US"), `${url}: og:locale`);

    // OG image must exist and actually be an image
    const og = attr(html, /<meta property="og:image" content="([^"]+)"/);
    check(Boolean(og), `${url}: og:image tag`);
    if (og) {
      const img = await fetch(og.replace(SITE, BASE));
      check(img.status === 200 && img.headers.get("content-type") === "image/png", `${url}: og:image ${img.status}`);
    }

    // Structured data must parse
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
    check(blocks.length >= 1, `${url}: JSON-LD present`);
    for (const [, json] of blocks) {
      try {
        JSON.parse(json);
      } catch {
        check(false, `${url}: JSON-LD does not parse`);
      }
    }

    // Internal links stay in the page's language (the language switcher is the exception)
    const switcher = new Set([localized("ka", path), localized("en", path)]);
    for (const [, href] of html.matchAll(/<a[^>]+href="(\/[^"#?]*)/g)) {
      const isEn = href === "/en" || href.startsWith("/en/");
      if (switcher.has(href)) continue;
      check(locale === "en" ? isEn : !isEn, `${url}: link ${href} in the wrong language`);
    }
  }
}

// SEO files, icons, redirects and errors
const expect = async (path, status, test = () => true, label = "") => {
  const res = await fetch(BASE + path, { redirect: "manual" });
  check(res.status === status && (await test(res)), `${path}: expected ${status}${label}, got ${res.status}`);
};
await expect("/robots.txt", 200, async (r) => {
  const t = await r.text();
  return t.includes("Sitemap: https://www.gargari.ge/sitemap.xml") && !t.includes("Disallow: /_next");
}, " with sitemap and no /_next block");
await expect("/sitemap.xml", 200, async (r) => (await r.text()).split("<url>").length - 1 === PAGES.length * 2, " with every page");
await expect("/manifest.webmanifest", 200);
await expect("/favicon.ico", 200);
await expect("/icon.png", 200);
await expect("/apple-icon.png", 200);
await expect("/logo.png", 200);
await expect("/ka/services", 308, (r) => r.headers.get("location")?.endsWith("/services"));
await expect("/missing-page", 404);
await expect("/en/missing-page", 404);
await expect("/projects/not-a-project", 404);
await expect("/robots.php", 404);

console.log(`${checks - failures.length}/${checks} checks passed against ${BASE}`);
if (failures.length) {
  console.error(`\n${failures.length} failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}
