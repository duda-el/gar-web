import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n/config";

// Georgian lives at the root (gargari.ge/services), other languages under a prefix (/en/services).
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Explicit /ka URLs redirect to the clean root version so each page has one address
  if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    url.search = search;
    return NextResponse.redirect(url, 308);
  }

  const hasLocale = locales.some(
    (locale) => locale !== defaultLocale && (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)),
  );
  if (hasLocale) return NextResponse.next();

  // Everything else is the Georgian version
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, API routes and files with an extension (images, favicon, robots.txt...)
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
