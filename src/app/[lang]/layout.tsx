import type { Metadata, Viewport } from "next";
import { Noto_Sans_Georgian, Outfit, Instrument_Serif, DM_Sans } from "next/font/google";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";
import AppToaster from "@/components/ui/AppToaster";
import { I18nProvider } from "@/i18n/I18nProvider";
import { locales, ogLocales, pageAlternates, SITE_URL } from "@/i18n/config";
import { getDictionary, resolveLocale } from "@/i18n";
import "../globals.css";

const notoGeorgian = Noto_Sans_Georgian({
  subsets: ["georgian"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-noto-georgian",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--ff-outfit",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--ff-instrument",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--ff-dmsans",
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// Only "ka" and "en" are valid; anything else (e.g. "/robots.txt", "/foo.php") is a 404
// instead of silently rendering the Georgian home page
export const dynamicParams = false;

export const viewport: Viewport = {
  themeColor: "#121212",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  const t = getDictionary(locale).meta;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t.defaultTitle,
      template: "%s | Gargari",
    },
    description: t.description,
    keywords: t.keywords,
    alternates: pageAlternates(locale, "/"),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: [
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      ],
      shortcut: "/gargari.png",
      apple: "/apple-touch-icon.png",
    },
    appleWebApp: {
      capable: true,
      title: "Gargari",
      statusBarStyle: "black-translucent",
    },
    openGraph: {
      title: t.ogTitle,
      description: t.description,
      url: pageAlternates(locale, "/").canonical,
      siteName: "Gargari",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Gargari" }],
      locale: ogLocales[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocales[l]),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t.ogTitle,
      description: t.description,
      images: ["/og-image.jpg"],
    },
    verification: {
      google: "kpGAn4W0G3agna6Gu57vQYMSEblYqT7kCNbXmFe-2MA",
    },
    other: {
      "content-language": locale,
      publisher: "Gargari",
      author: "Gargari Team",
    },
  };
}

export default async function RootLayout({ children, params }: Props) {
  const locale = resolveLocale((await params).lang);
  const dictionary = getDictionary(locale);

  return (
    <html
      lang={locale}
      className={`${notoGeorgian.variable} ${outfit.variable} ${instrumentSerif.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script
          id="schema-org"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Gargari",
              url: SITE_URL,
              logo: `${SITE_URL}/gargari.png`,
              description: dictionary.meta.organization,
            }),
          }}
        />
      </head>
      <GoogleTagManager gtmId="GTM-TXP9LKXZ" />
      <body className="font-georgian antialiased" suppressHydrationWarning>
        <I18nProvider locale={locale} dictionary={dictionary}>
          {children}
          <AppToaster />
        </I18nProvider>
        <GoogleAnalytics gaId="G-TCBNN29N66" />
      </body>
    </html>
  );
}
