// URL slug of each service's page (/services/<slug>), keyed like t.services.
// Kept separate from servicePages.ts so client components can link to the pages
// without shipping every page's full text to the browser.
export const SERVICE_SLUGS = {
  landing: "landing-page",
  ecommerce: "online-shop",
  webApps: "web-app",
  branding: "branding",
} as const;

export const servicePath = (key: keyof typeof SERVICE_SLUGS) => `/services/${SERVICE_SLUGS[key]}`;
