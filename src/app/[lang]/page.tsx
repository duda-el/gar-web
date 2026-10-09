import Header from "@/components/Layout/Header/Header";
import Hero from "@/components/Pages/Hero/Hero";
import Footer from "@/components/Layout/Footer";
import Projects from "@/components/Pages/Projects/Index";
import Services from "@/components/Services";
import WhyUs from "@/components/Pages/WhyUs";
import CookieConsent from "@/components/shadcn-space/blocks/cookie-consent-01";
import ScrollHandler from "@/components/ScrollHandler";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <ScrollHandler />
      <Header />
      <main>
        <Hero />
        <Services />
        <Projects />
        <WhyUs />
        <Footer />
        <CookieConsent />
      </main>
    </div>
  );
}
