// Builds /llms.txt and /llms-full.txt (https://llmstxt.org): a plain Markdown summary of the
// studio for AI assistants and AI search. Everything comes from the site's own content,
// so it stays in sync with the pages.
import { CONTACT_EMAIL } from "@/constants/policies";
import { localizeProject, projects } from "@/constants/projects";
import { SOCIAL_PROFILES, TECHNOLOGIES } from "@/constants/site";
import { localizePath, SITE_URL, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";

const url = (locale: Locale, path: string) => `${SITE_URL}${localizePath(locale, path)}`;

function header() {
  const en = getDictionary("en");
  const stats = en.hero.stats
    .map((s) => `${s.value}${"suffix" in s && s.suffix ? s.suffix : ""} ${s.label}`)
    .join(", ");

  return `# Gargari

> Gargari (გარგარი, also written GarGari) is a web design and development studio in Tbilisi, Georgia. It designs and builds landing pages, web applications and online stores, plus branding and UI/UX design, for clients in Georgia and abroad. The site is available in Georgian (default) and English.

- Location: Tbilisi, Georgia; works remotely with clients anywhere
- Languages: Georgian and English
- Contact: ${CONTACT_EMAIL} or ${url("en", "/contact")}; replies within one business day
- Pricing: landing pages ${en.services.landing.price}; web applications and online stores are ${en.services.webApps.price}
- Track record: ${stats}
- Technologies: ${TECHNOLOGIES.join(", ")}
- Social: ${SOCIAL_PROFILES.join(", ")}
`;
}

function servicesSection(locale: Locale) {
  const t = getDictionary(locale);
  const services = [t.services.landing, t.services.webApps, t.services.ecommerce];
  return [
    ...services.map((s) => `- **${s.title}** (${s.price}): ${s.description}`),
    `- **${t.services.brandingTitle}**: ${t.services.brandingText} (${t.services.brandingTags.join(", ")})`,
  ].join("\n");
}

function processSection(locale: Locale) {
  return getDictionary(locale)
    .steps.map((s, i) => `${i + 1}. **${s.title}**: ${s.description}`)
    .join("\n");
}

function faqSection(locale: Locale) {
  return getDictionary(locale)
    .allServices.faqs.map((f) => `### ${f.question}\n\n${f.answer}`)
    .join("\n\n");
}

/** Short version: what Gargari is and where to find each topic */
export function buildLlmsTxt(): string {
  const en = getDictionary("en");
  const ka = getDictionary("ka");
  const page = (locale: Locale, path: string, title: string, desc: string) =>
    `- [${title}](${url(locale, path)}): ${desc}`;

  return `${header()}
## Services

${servicesSection("en")}

## Main pages (English)

${page("en", "/", en.nav.home, en.meta.description)}
${page("en", "/services", en.meta.pages.services.title, en.meta.pages.services.description)}
${page("en", "/projects", en.meta.pages.projects.title, en.meta.pages.projects.description)}
${page("en", "/about", en.meta.pages.about.title, en.meta.pages.about.description)}
${page("en", "/contact", en.meta.pages.contact.title, en.meta.pages.contact.description)}

## Main pages (Georgian / ქართული)

${page("ka", "/", ka.nav.home, ka.meta.description)}
${page("ka", "/services", ka.meta.pages.services.title, ka.meta.pages.services.description)}
${page("ka", "/projects", ka.meta.pages.projects.title, ka.meta.pages.projects.description)}
${page("ka", "/about", ka.meta.pages.about.title, ka.meta.pages.about.description)}
${page("ka", "/contact", ka.meta.pages.contact.title, ka.meta.pages.contact.description)}

## Projects

${projects
  .map((p) => {
    const c = localizeProject(p, "en");
    return `- [${p.title}](${url("en", `/projects/${p.slug}`)}): ${c.category}, ${c.industry}. ${c.description}`;
  })
  .join("\n")}

## Optional

- [Full details for AI assistants](${SITE_URL}/llms-full.txt): services, process, FAQ and every project in English and Georgian
- [Sitemap](${SITE_URL}/sitemap.xml)
`;
}

/** Full version: everything an assistant needs to answer questions about Gargari */
export function buildLlmsFullTxt(): string {
  const sections = (["en", "ka"] as const).map((locale) => {
    const t = getDictionary(locale);
    const heading = locale === "en" ? "English" : "ქართული (Georgian)";
    const projectList = projects
      .map((p) => {
        const c = localizeProject(p, locale);
        return `### ${p.title}

- Page: ${url(locale, `/projects/${p.slug}`)}${p.url ? `\n- Live site: ${p.url}` : ""}
- ${t.projectDetail.category}: ${c.category}
- ${t.projectDetail.industry}: ${c.industry}
- ${t.projectDetail.services}: ${c.services.join(", ")}

${c.overview.join("\n\n")}

${t.projectDetail.delivered}:
${c.highlights.map((h) => `- ${h}`).join("\n")}`;
      })
      .join("\n\n");

    return `# ${heading}

## ${t.aboutUs.eyebrow}

${t.aboutUs.text}

${t.aboutUs.values.map((v) => `- **${v.title}**: ${v.description}`).join("\n")}

## ${t.nav.services}

${servicesSection(locale)}

## ${t.aboutUs.howEyebrow}

${processSection(locale)}

## ${t.allServices.faqTitle}

${faqSection(locale)}

## ${t.nav.projects}

${projectList}

## ${t.nav.contact}

- Email: ${CONTACT_EMAIL}
- ${url(locale, "/contact")}
`;
  });

  return `${header()}\n${sections.join("\n\n")}`;
}
