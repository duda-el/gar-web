import { Cookie } from "next/font/google";
import Header from "../app/components/Header/Header";
import Hero from "../app/components/Hero/Hero";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Projects from "./components/Projects/Index";
import Services from "./components/Services";
import CookieConsent from "./components/Cookie/CookieConsent";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#191919]">
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
