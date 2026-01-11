import type { Metadata, Viewport } from "next";
import { Noto_Sans_Georgian } from "next/font/google";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
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
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://gargari.ge"),

  title: {
    default: "Gargari",
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
    icon: "/gargari.ico",
    shortcut: "/gargari.ico",
    apple: "/gargari.ico",
  },

  appleWebApp: {
    capable: true,
    title: "Gargari",
    statusBarStyle: "black-translucent",
  },

  openGraph: {
    title: "Gargari - საიტების დამზადება და ვებ დიზაინი",
    description:
      "ჩვენ ვქმნით ინოვაციურ ვებსაიტებს, UI/UX დიზაინს და ციფრულ პროდუქტებს თქვენი ბიზნესისთვის.",
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

  verification: {
    google: "kpGAn4W0G3agna6Gu57vQYMSEblYqT7kCNbXmFe-2MA",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ka" className={notoGeorgian.variable} suppressHydrationWarning>
      <GoogleTagManager gtmId="GTM-TXP9LKXZ" />
      <body className="font-georgian antialiased" suppressHydrationWarning>
        {children}
        <GoogleAnalytics gaId="G-TCBNN29N66" />
      </body>
    </html>
  );
}
