import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScrollReveal from "@/components/motion/ScrollReveal";
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
        <ScrollReveal>
          <CurrentlyBuilding />
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <FeaturedProjects />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <AboutStatsTech />
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <Experience />
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <CTABar />
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  );
}
