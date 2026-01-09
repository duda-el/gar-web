import Header from "../app/components/Header/Header";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Your custom Header with the orange ticker */}
      <Header />

      <main className="pt-[140px] px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* This is where your Hero Section will go next */}
          <h1 className="text-white text-5xl font-bold">
            Welcome to Garagaris
          </h1>
        </div>
      </main>
    </div>
  );
}
