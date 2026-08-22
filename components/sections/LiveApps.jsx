"use client";

import React, { useState } from "react";
import { appCarouselData } from "@/lib/data/certifications";
import { useFeed } from "@/lib/hooks/useFeed";
import { FadeIn } from "../animations/FadeIn";
import { AppIcon } from "@/components/ui/AppIcon";
import { FiSmartphone, FiAward, FiDownload, FiChevronLeft, FiChevronRight, FiExternalLink } from "react-icons/fi";
import { FaAndroid, FaApple, FaGooglePlay } from "react-icons/fa";
import { motion, AnimatePresence } from "motion/react";

export function LiveApps() {
  const [activeIdx, setActiveIdx] = useState(0);
  const { data: apps, meta } = useFeed("/api/feeds/playstore", "apps", appCarouselData);
  const developer = meta.developer || {
    name: "Purple Info Tech",
    url: "https://play.google.com/store/apps/dev?id=8170755285088488138",
    description:
      "Purple Info Tech builds fast, reliable mobile apps with clean design and real-world performance in mind.",
    logo: "https://play-lh.googleusercontent.com/wUF4AYTL_Rc-C8KkIloxax1ThkpBF8KuElpy6jKlvL3vuIJ-a8V-SELj5XMixsy8xeZu=s256",
  };

  const total = apps.length;
  const safeIdx = Math.min(activeIdx, total - 1);

  const nextApp = () => setActiveIdx((prev) => (prev + 1) % total);
  const prevApp = () => setActiveIdx((prev) => (prev - 1 + total) % total);

  const activeApp = apps[safeIdx];

  return (
    <section id="live-apps" className="py-14 sm:py-20 bg-neutral-50 dark:bg-neutral-950/20 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6">
        {/* Title */}
        <FadeIn delay={0.1} direction="up" className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Live Production Apps
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-3 max-w-xl mx-auto">
            Shipped to millions of users worldwide — browse the apps and open them directly on the official app stores.
          </p>
        </FadeIn>

        {/* Google Play developer account identity */}
        <FadeIn delay={0.15} direction="up" className="mb-10">
          <a
            href={developer.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 max-w-xl mx-auto p-4 rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-white/70 dark:bg-black/40 backdrop-blur-sm hover:border-purple-400 dark:hover:border-purple-600 transition-colors"
          >
            <span className="grid place-items-center w-12 h-12 shrink-0 rounded-xl overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-lg">
              {developer.logo ? (
                <img
                  src={developer.logo}
                  alt={`${developer.name} logo`}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
              ) : (
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-purple-500" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 5.277L13.791 16 16.5 13.5l-13.5-7.75v-.473zm13.5 8.223l3.25-1.854a1.5 1.5 0 0 0 0-2.6L16.5 7.2zM3 3v.328l13.5 7.72 2.7-2.7L3 3zm0 18v-.328l13.5-7.72-2.7 2.7z" />
                </svg>
              )}
            </span>
            <div className="text-left min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Google Play Developer</p>
                <span className="flex items-center gap-1 text-[9px] font-bold text-[#20a366] dark:text-[#3ddc84]">
                  <FaGooglePlay className="w-2.5 h-2.5" /> Verified
                </span>
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 truncate">{developer.name}</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1">{developer.description}</p>
            </div>
            <FiExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-purple-500 transition-colors shrink-0" />
          </a>
        </FadeIn>

        {/* Carousel Container */}
        <div className="relative">
          {/* Controls */}
          <div className="absolute top-1/2 -left-4 sm:-left-12 -translate-y-1/2 z-20">
            <button
              onClick={prevApp}
              className="p-3 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-600 dark:text-neutral-400 transition-colors cursor-pointer shadow-md"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute top-1/2 -right-4 sm:-right-12 -translate-y-1/2 z-20">
            <button
              onClick={nextApp}
              className="p-3 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-600 dark:text-neutral-400 transition-colors cursor-pointer shadow-md"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Carousel slide card with animations */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeApp.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-black/40 backdrop-blur-md flex flex-col md:flex-row items-center gap-8 shadow-xl"
            >
              {/* App Meta Section */}
              <div className="flex-1 text-left w-full">
                <div className="flex items-center gap-3">
                  <AppIcon
                    app={activeApp}
                    rounded="rounded-xl"
                    className="w-12 h-12 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-inner shrink-0"
                  />

                  <div>
                    <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100">
                      {activeApp.name}
                    </h3>
                    <span className="text-xs font-semibold text-neutral-400">
                      Available on: {activeApp.store}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-4 leading-relaxed">
                  {activeApp.description}
                </p>

                {/* Key stats badges */}
                <div className="flex flex-wrap gap-3 mt-6">
                  {activeApp.rating && (
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-850/50 text-neutral-600 dark:text-neutral-400">
                      <FiSmartphone className="w-3.5 h-3.5 text-purple-500" />
                      Rating: {activeApp.rating} ★
                    </span>
                  )}
                  {activeApp.downloads && (
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-850/50 text-neutral-600 dark:text-neutral-400">
                      <FiDownload className="w-3.5 h-3.5 text-emerald-500" />
                      Downloads: {activeApp.downloads}
                    </span>
                  )}
                </div>

                {/* Badge images */}
                <div className="mt-8 flex flex-wrap gap-3">
                  {activeApp.link && (
                    <a
                      href={activeApp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block transition-transform hover:scale-105"
                    >
                      {/* Google Play badge design in pure css */}
                      <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-black border border-neutral-800 text-white font-sans text-[10px] uppercase font-semibold select-none cursor-pointer">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-white" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 5.277L13.791 16 16.5 13.5l-13.5-7.75v-.473zm13.5 8.223l3.25-1.854a1.5 1.5 0 0 0 0-2.6L16.5 7.2zM3 3v.328l13.5 7.72 2.7-2.7L3 3zm0 18v-.328l13.5-7.72-2.7 2.7z"></path>
                        </svg>
                        <div className="text-left font-mono">
                          <div className="text-[7px] text-neutral-400">GET IT ON</div>
                          <div className="text-[11px] font-sans font-bold tracking-tight -mt-0.5">Google Play</div>
                        </div>
                      </div>
                    </a>
                  )}

                  {activeApp.iosLink && (
                    <a
                      href={activeApp.iosLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block transition-transform hover:scale-105"
                    >
                      {/* Apple App Store badge in pure css */}
                      <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-black border border-neutral-800 text-white font-sans text-[10px] uppercase font-semibold select-none cursor-pointer">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-white" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.2.67-2.92 1.49-.62.7-1.16 1.84-1.01 2.96 1.12.09 2.26-.57 2.94-1.39z" />
                        </svg>
                        <div className="text-left font-mono">
                          <div className="text-[7px] text-neutral-400">Download on the</div>
                          <div className="text-[11px] font-sans font-bold tracking-tight -mt-0.5">App Store</div>
                        </div>
                      </div>
                    </a>
                  )}
                </div>
              </div>

              {/* App icon inside a mini phone frame + platform chips */}
              <div className="flex flex-col items-center gap-3 shrink-0">
                <div className="relative w-40 h-40 flex items-center justify-center rounded-[2rem] bg-gradient-to-br from-purple-500/15 to-fuchsia-500/10 border border-neutral-200 dark:border-neutral-800 shadow-inner">
                  {/* phone bezel */}
                  <div className="relative w-24 h-32 rounded-[1.4rem] bg-neutral-950 border-[3px] border-neutral-800 shadow-xl flex items-center justify-center overflow-hidden">
                    <span className="absolute top-1.5 left-1/2 -translate-x-1/2 w-8 h-1.5 rounded-full bg-neutral-800 z-10" />
                    <AppIcon
                      app={activeApp}
                      rounded="rounded-2xl"
                      className="w-16 h-16 shadow-lg border border-white/10"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {(activeApp.platform === "both" || activeApp.platform === "android" || !activeApp.platform) && (
                    <span className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold bg-[#3ddc84]/15 text-[#20a366] dark:text-[#3ddc84] border border-[#3ddc84]/30">
                      <FaAndroid className="w-3 h-3" /> Android
                    </span>
                  )}
                  {(activeApp.platform === "both" || activeApp.iosLink) && (
                    <span className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold bg-neutral-500/10 text-neutral-700 dark:text-neutral-200 border border-neutral-400/30">
                      <FaApple className="w-3 h-3" /> iOS
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>


          {/* Dots Indicator */}
          <div className="flex flex-wrap justify-center gap-1.5 mt-6">
            {apps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  safeIdx === idx ? "w-5 bg-purple-500" : "bg-neutral-300 dark:bg-neutral-700"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default LiveApps;
