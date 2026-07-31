/**
 * @fileoverview Home page — section composition and dynamic imports.
 *
 * Above-fold: Hero, CurrentlyBuilding. Below-fold sections are dynamically
 * imported with skeleton loaders to reduce initial JS bundle.
 * Atmosphere lives in `(site)/layout.tsx` (shared with project deep links).
 */

import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import SkipLink from "@/components/SkipLink";
import Hero from "@/components/Hero";
import CommandSideRail from "@/components/cinematic/CommandSideRail";
import { SITE } from "@/lib/site";
import { SITE_DESCRIPTION, buildDefaultOpenGraph, buildDefaultTwitter } from "@/lib/seo";
import SectionReveal from "@/components/cinematic/SectionReveal";
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
    <>
      <SkipLink />
      <Navbar />
      <CommandSideRail />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex w-full flex-col items-center outline-none"
      >
        <Hero />
        <SectionReveal delay={0.02}>
          <CurrentlyBuilding />
        </SectionReveal>
        <SectionReveal delay={0.04}>
          <SectionErrorBoundary sectionLabel="Featured Projects">
            <FeaturedProjects />
          </SectionErrorBoundary>
        </SectionReveal>
        <SectionReveal delay={0.06}>
          <AboutStatsTech />
        </SectionReveal>
        <SectionReveal delay={0.08}>
          <SectionErrorBoundary sectionLabel="Technology Stack">
            <TechnologySystem />
          </SectionErrorBoundary>
        </SectionReveal>
        <SectionReveal delay={0.1}>
          <SectionErrorBoundary sectionLabel="Experience">
            <Experience />
          </SectionErrorBoundary>
        </SectionReveal>
        <SectionReveal delay={0.12}>
          <CTABar />
        </SectionReveal>
      </main>
      <Footer />
    </>
  );
}
