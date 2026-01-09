import Header from "../app/components/Header/Header";
import Hero from "../app/components/Hero/Hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#191919]">
      <Header />
      <main>
        <Hero />
        {/* Next sections (Services, Projects) go here */}
      </main>
    </div>
  );
}