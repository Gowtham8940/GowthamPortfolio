"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CommandPalette from "@/components/layout/CommandPalette";
import { CursorGlow } from "@/components/animations/CursorGlow";
import useKeyboardShortcuts from "@/lib/hooks/useKeyboardShortcuts";

// Import Sections
import Hero from "@/components/sections/Hero";
import HeroStats from "@/components/sections/HeroStats";
import Experience from "@/components/sections/Experience";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import LiveApps from "@/components/sections/LiveApps";
import Architecture from "@/components/sections/Architecture";
import Performance from "@/components/sections/Performance";
import CaseStudies from "@/components/sections/CaseStudies";
import Testimonials from "@/components/sections/Testimonials";
import Certifications from "@/components/sections/Certifications";
import YouTube from "@/components/sections/YouTube";
import GitHub from "@/components/sections/GitHub";
import Blog from "@/components/sections/Blog";
import DevConsole from "@/components/sections/DevConsole";
import WhyHireMe from "@/components/sections/WhyHireMe";
import RecruiterSection from "@/components/sections/RecruiterSection";
import Contact from "@/components/sections/Contact";

export default function Home() {
  // Activate global keyboard shortcuts (G for GitHub, L for LinkedIn, R for Resume, Ctrl/Cmd + K for Command palette)
  useKeyboardShortcuts();

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden select-none bg-white dark:bg-black text-neutral-850 dark:text-neutral-200 transition-colors duration-300">
      {/* Global visual mouse glow */}
      <CursorGlow />

      {/* Floating command palette overlay */}
      <CommandPalette />

      {/* Navigation */}
      <Navbar />

      {/* Main content body */}
      <main className="flex-grow flex flex-col">
        {/* Landing View & Stats */}
        <Hero />
        <HeroStats />

        {/* Professional timeline & about */}
        <Experience />
        <About />
        
        {/* Core skills */}
        <Skills />

        {/* Showcases */}
        <FeaturedProjects />
        <LiveApps />

        {/* Diagrams & Benchmarks */}
        <Architecture />
        <Performance />
        <CaseStudies />

        {/* Feedback & badges */}
        <Testimonials />
        <Certifications />

        {/* Media & external profiles */}
        <YouTube />
        <GitHub />
        <Blog />

        {/* Recruiter info & fun shell */}
        <DevConsole />
        <WhyHireMe />
        <RecruiterSection />
        
        {/* Connect */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
