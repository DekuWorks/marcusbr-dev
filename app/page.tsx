import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import SkipLink from "@/components/SkipLink";
import Hero from "@/components/Hero";
import { SITE } from "@/lib/site";
import { SITE_DESCRIPTION } from "@/lib/seo";
import ScrollReveal from "@/components/motion/ScrollReveal";
import CurrentlyBuilding from "@/components/CurrentlyBuilding";
import AboutStatsTech from "@/components/sections/AboutStatsTech";
import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import SectionErrorBoundary from "@/components/SectionErrorBoundary";
import FeaturedProjectsSkeleton from "@/components/skeletons/FeaturedProjectsSkeleton";
import TechnologySystemSkeleton from "@/components/skeletons/TechnologySystemSkeleton";
import ExperienceSkeleton from "@/components/skeletons/ExperienceSkeleton";

const FeaturedProjects = dynamic(
  () => import("@/components/sections/FeaturedProjects"),
  { loading: () => <FeaturedProjectsSkeleton /> },
);
const TechnologySystem = dynamic(
  () => import("@/components/sections/TechnologySystem"),
  { loading: () => <TechnologySystemSkeleton /> },
);
const Experience = dynamic(() => import("@/components/Experience"), {
  loading: () => <ExperienceSkeleton />,
});

export const metadata: Metadata = {
  title: "Marcus Brown | Senior Full Stack Developer & AI Engineer",
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: SITE.url,
  },
  openGraph: {
    title: "Marcus Brown | Senior Full Stack Developer & AI Engineer",
    description: SITE_DESCRIPTION,
    url: SITE.url,
    type: "website",
  },
};

export default function Home() {
  return (
    <div className="grid-background relative min-h-screen overflow-x-hidden">
      <SkipLink />
      <Navbar />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex w-full flex-col items-center outline-none"
      >
        <Hero />
        <ScrollReveal>
          <CurrentlyBuilding />
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <SectionErrorBoundary sectionLabel="Featured Projects">
            <FeaturedProjects />
          </SectionErrorBoundary>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <AboutStatsTech />
        </ScrollReveal>
        <ScrollReveal delay={0.12}>
          <SectionErrorBoundary sectionLabel="Technology Stack">
            <TechnologySystem />
          </SectionErrorBoundary>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <SectionErrorBoundary sectionLabel="Experience">
            <Experience />
          </SectionErrorBoundary>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <CTABar />
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  );
}
