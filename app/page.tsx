import Navbar from "@/components/Navbar";
import ApexBanner from "@/components/ApexBanner";
import TechBanner from "@/components/TechBanner";
import About from "@/components/About";
import Stats from "@/components/Stats";
import AvailableFor from "@/components/AvailableFor";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import ResultsImpact from "@/components/ResultsImpact";
import CurrentlyBuilding from "@/components/CurrentlyBuilding";
import Experience from "@/components/Experience";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="grid-background relative min-h-screen overflow-x-hidden">
      <Navbar />
      <main className="flex w-full flex-col items-center">
        <ApexBanner />
        <TechBanner />
        <About />
        <Stats />
        <AvailableFor />
        <Skills />
        <Projects />
        <ResultsImpact />
        <CurrentlyBuilding />
        <Experience />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
