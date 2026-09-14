import type { Metadata } from "next";
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer";
import AboutUs from "@/components/Pages/AboutUs";
import Testimonials from "@/components/Pages/Testimonials";
import CTA from "@/components/Pages/CTA";

export const metadata: Metadata = {
  title: "About us",
  description:
    "GarGari is a Tbilisi studio designing and building landing pages, web applications and online stores, small team, hand-built work, clear timelines.",
  alternates: {
    canonical: "https://www.gargari.ge/about",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <AboutUs />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
