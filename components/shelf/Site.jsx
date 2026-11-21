"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { Aira } from "./Aira";
import { DeviceShowcase } from "./DeviceShowcase";
import { SelectedWork } from "./SelectedWork";
import { StoreGallery } from "./StoreGallery";
import { ProjectIndex } from "./ProjectIndex";
import { Experience } from "./Rows";
import { Writing } from "./Writing";
import { Footer } from "./Footer";
import { Loader } from "@/components/motion/Loader";
import { Cursor } from "@/components/motion/Cursor";
import { Reveals } from "@/components/motion/Reveals";
import { Chalky } from "@/components/pet/Chalky";

// The animated body is keyed by locale: switching language remounts it, so
// text split into lines by GSAP is rebuilt from fresh React-rendered text.
export function Site() {
  const { t, locale } = useLocale();
  return (
    <div className="shelf min-h-screen overflow-x-clip">
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-canvas"
      >
        {t("skip")}
      </a>
      <Loader />
      <Cursor />
      <Nav />
      <Chalky />
      <Reveals key={locale}>
        <main>
          <Hero />
          <Aira />
          <DeviceShowcase />
          <SelectedWork />
          <StoreGallery />
          <ProjectIndex />
          <Experience />
          <Writing />
        </main>
        <Footer />
      </Reveals>
    </div>
  );
}
