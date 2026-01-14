import type { Metadata, Viewport } from "next";
import { Noto_Sans_Georgian } from "next/font/google";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";
import "./globals.css";

const notoGeorgian = Noto_Sans_Georgian({
  subsets: ["georgian"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-noto-georgian",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#121212",
  width: "device-width",
  initialScale: 1
};

export const metadata: Metadata = {
  metadataBase: new URL("https://gargari.ge"),

  title: {
    default: "ვებ გვერდების დამზადება, UI/UX და გრაფიკული დიზაინი საქართველოში | Gargari",
    template: "%s | Gargari",
  },

  description:
    "Gargari გთავაზობთ პროფესიონალურ მომსახურებას: ვებ გვერდების შექმნა, UI/UX დიზაინი და ბრენდინგი. დავეხმაროთ თქვენს ბიზნესს ციფრულ ტრანსფორმაციაში.",

  keywords: [
    "საიტების დამზადება",
    "ვებ დიზაინი",
    "ვებ გვერდების შექმნა",
    "UI/UX დიზაინი",
    "ბრენდინგი",
    "Gargari",
    "გარგარი",
    "ონლაინ მაღაზიის დამზადება",
    "Web Development Tbilisi",
  ],

  alternates: {
    canonical: "https://www.gargari.ge",
  },

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
    title: "Gargari - საიტების დამზადება და ვებ დიზაინი",
    description:
      "Gargari გთავაზობთ პროფესიონალურ მომსახურებას: ვებ გვერდების შექმნა, UI/UX დიზაინი და ბრენდინგი. დავეხმაროთ თქვენს ბიზნესს ციფრულ ტრანსფორმაციაში.",
    url: "https://gargari.ge",
    siteName: "Gargari",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Gargari",
      },
    ],
    locale: "ka_GE",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Gargari - საიტების დამზადება და ვებ დიზაინი",
    description:
      "Gargari გთავაზობთ პროფესიონალურ მომსახურებას: ვებ გვერდების შექმნა, UI/UX დიზაინი და ბრენდინგი. დავეხმაროთ თქვენს ბიზნესს ციფრულ ტრანსფორმაციაში.",
    images: ["/og-image.jpg"],
  },

  verification: {
    google: "kpGAn4W0G3agna6Gu57vQYMSEblYqT7kCNbXmFe-2MA",
  },

  other: {
    "content-language": "ka",
    "publisher": "Gargari", 
    "author": "Gargari Team",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ka" className={notoGeorgian.variable} suppressHydrationWarning>
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
              url: "https://gargari.ge",
              logo: "https://gargari.ge/gargari.png",
              description:
                "ვებ გვერდების დამზადება, UI/UX დიზაინი და ბრენდინგი საქართველოში",
            }),
          }}
        />
      </head>
      <GoogleTagManager gtmId="GTM-TXP9LKXZ" />
      <body className="font-georgian antialiased" suppressHydrationWarning>
        {children}
        <GoogleAnalytics gaId="G-TCBNN29N66" />
      </body>
    </html>
  );
}
