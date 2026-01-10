import Header from "../components/Layout/Header/Header";
import Hero from "../components/Pages/Hero/Hero";
import About from "../components/Pages/About";
import Contact from "../components/Pages/Contact";
import Footer from "../components/Layout/Footer";
import Projects from "../components/Pages/Projects/Index";
import Services from "../components/Services";
import CookieConsent from "../components/Cookie/CookieConsent";
import ScrollHandler from "../components/ScrollHandler";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#191919]">
      <ScrollHandler />
      <Header />
      <main>
        <Hero />
        <Services />
        <Projects />
        <About />
        <Contact />
        <Footer />
        <CookieConsent />
      </main>
    </div>
  );
}
