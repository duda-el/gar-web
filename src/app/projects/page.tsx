import type { Metadata } from "next";
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer";
import AllProjects from "@/components/Pages/AllProjects";

export const metadata: Metadata = {
  title: "ყველა პროექტი",
  description:
    "იხილეთ Gargari-ის მიერ შესრულებული ყველა პროექტი — ვებ გვერდები, E-Commerce პლატფორმები, ბრენდინგი და UI/UX დიზაინი.",
  alternates: {
    canonical: "https://www.gargari.ge/projects",
  },
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <AllProjects />
      </main>
      <Footer />
    </div>
  );
}
