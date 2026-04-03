import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Projects from "@/components/sections/Projects";
import TechStack from "@/components/sections/TechStack";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Projects />
        <TechStack />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
