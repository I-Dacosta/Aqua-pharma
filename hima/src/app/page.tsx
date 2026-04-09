import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import FocusAreas from "@/components/FocusAreas";
import News from "@/components/News";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-hima-dark min-h-screen">
      <Header />
      <Hero />
      <Intro />
      <FocusAreas />
      <News />
      <Footer />
    </main>
  );
}
