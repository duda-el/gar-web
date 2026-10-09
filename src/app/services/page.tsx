import type { Metadata } from "next";
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer";
import AllServices from "@/components/Pages/AllServices";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Landing pages, web applications, e-commerce, branding and UI/UX design, fixed scope and real prices, built by the GarGari team.",
  alternates: {
    canonical: "https://www.gargari.ge/services",
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <AllServices />
      </main>
      <Footer />
    </div>
  );
}
