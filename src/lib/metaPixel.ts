// Meta (Facebook) Pixel, the official base snippet as a function so it only runs after
// the visitor accepts cookies (see components/Analytics.tsx).

export const META_PIXEL_ID = "1399988245515290";

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: Fbq;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

/** Installs the fbq queue, loads fbevents.js and initialises the pixel; safe to call twice */
export function loadMetaPixel() {
  if (window.fbq) return;
  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  } as Fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq ??= fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  fbq("init", META_PIXEL_ID);
}

export function trackPageView() {
  window.fbq?.("track", "PageView");
}

/** Standard events; does nothing until the pixel is loaded (i.e. without cookie consent) */
export function trackEvent(name: "Lead" | "Contact", params?: Record<string, string>) {
  window.fbq?.("track", name, params);
}
