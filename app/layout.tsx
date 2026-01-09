import type { Metadata } from "next";
import { Noto_Sans_Georgian } from "next/font/google"; // Import the font
import "./globals.css";

// Configure the font
const notoGeorgian = Noto_Sans_Georgian({
  subsets: ["georgian"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-noto-georgian", // Set the CSS variable name
});

export const metadata: Metadata = {
  title: "Garagaris Studio",
  description: "Creative Design Agency",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Apply the font variable and the suppressHydrationWarning to the html tag
    <html lang="ka" className={notoGeorgian.variable} suppressHydrationWarning>
      <body className="font-georgian antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}