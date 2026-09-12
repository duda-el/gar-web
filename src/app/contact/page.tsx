import type { Metadata } from "next";
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer";
import Contact from "@/components/Pages/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Gargari team — tell us about your project and we'll get back to you within a day.",
  alternates: {
    canonical: "https://www.gargari.ge/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
