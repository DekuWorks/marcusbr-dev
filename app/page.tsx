/**
 * @fileoverview Home page — section composition and dynamic imports.
 *
 * Above-fold: Hero, CurrentlyBuilding. Below-fold sections are dynamically
 * imported with skeleton loaders to reduce initial JS bundle.
 */

import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import SkipLink from "@/components/SkipLink";
import Hero from "@/components/Hero";
import LiquidPageBackdrop from "@/components/liquid/LiquidPageBackdrop";
import { SITE } from "@/lib/site";
import { SITE_DESCRIPTION, buildDefaultOpenGraph, buildDefaultTwitter } from "@/lib/seo";
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
  openGraph: buildDefaultOpenGraph(
    "Marcus Brown | Senior Full Stack Developer & AI Engineer",
    SITE_DESCRIPTION,
    SITE.url,
  ),
  twitter: buildDefaultTwitter(
    "Marcus Brown | Senior Full Stack Developer & AI Engineer",
    SITE_DESCRIPTION,
  ),
};

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden pb-[env(safe-area-inset-bottom,0px)]">
      <LiquidPageBackdrop />
      <div className="page-depth-ambient" aria-hidden />
      <div className="relative z-10 grid-background content-parallax">
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
    </div>
  );
}
