import type { Metadata } from "next";
import { Noto_Sans_Georgian } from "next/font/google";
import "./globals.css";

const notoGeorgian = Noto_Sans_Georgian({
  subsets: ["georgian"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-noto-georgian",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gargari",
  description:
    "ჩვენ ვქმნით ინოვაციურ ვებსაიტებს, UI/UX დიზაინს და ციფრულ პროდუქტებს თქვენი ბიზნესისთვის.",
  icons: {
    icon: "/gargari.ico",
  },

  openGraph: {
    title: "Gargari",
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
  twitter: {
    card: "summary_large_image",
    title: "Gargari",
    description:
      "ჩვენ ვქმნით ინოვაციურ ვებსაიტებს, UI/UX დიზაინს და ციფრულ პროდუქტებს თქვენი ბიზნესისთვის.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ka" className={notoGeorgian.variable} suppressHydrationWarning>
      <body className="font-georgian antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
