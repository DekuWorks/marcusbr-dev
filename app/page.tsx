import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CurrentlyBuilding from "@/components/CurrentlyBuilding";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import AboutStatsTech from "@/components/sections/AboutStatsTech";
import Experience from "@/components/Experience";
import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="grid-background relative min-h-screen overflow-x-hidden">
      <Navbar />
      <main className="flex w-full flex-col items-center">
        <Hero />
        <CurrentlyBuilding />
        <FeaturedProjects />
        <AboutStatsTech />
        <Experience />
        <CTABar />
      </main>
      <Footer />
    </div>
  );
}
