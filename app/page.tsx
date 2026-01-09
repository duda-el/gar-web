import Header from "../app/components/Header/Header";
import Hero from "../app/components/Hero/Hero";
import About from "./components/About";
import Contact from "./components/Contact";
import Projects from "./components/Projects/Index";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#191919]">
      <Header />
      <main>
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
    </div>
  );
}
