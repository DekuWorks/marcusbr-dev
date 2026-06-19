import Navbar from "@/components/Navbar";
import ApexBanner from "@/components/ApexBanner";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import CurrentlyBuilding from "@/components/CurrentlyBuilding";
import Experience from "@/components/Experience";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="grid-background relative min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <ApexBanner />
        <About />
        <Stats />
        <Skills />
        <Projects />
        <CurrentlyBuilding />
        <Experience />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
