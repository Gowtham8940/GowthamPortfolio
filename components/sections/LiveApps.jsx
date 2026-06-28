"use client";

import React, { useState } from "react";
import { appCarouselData } from "@/lib/data/certifications";
import { FadeIn } from "../animations/FadeIn";
import { FiSmartphone, FiAward, FiDownload, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion, AnimatePresence } from "motion/react";

export function LiveApps() {
  const [activeIdx, setActiveIdx] = useState(0);

  const nextApp = () => {
    setActiveIdx((prev) => (prev + 1) % appCarouselData.length);
  };

  const prevApp = () => {
    setActiveIdx((prev) => (prev - 1 + appCarouselData.length) % appCarouselData.length);
  };

  const activeApp = appCarouselData[activeIdx];

  return (
    <section className="py-20 bg-neutral-50 dark:bg-neutral-950/20 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6">
        {/* Title */}
        <FadeIn delay={0.1} direction="up" className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Live Production Apps
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-3 max-w-xl mx-auto">
            Scan QR codes to download these applications directly onto your mobile device from official app stores.
          </p>
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
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center shadow-inner shrink-0">
                    {activeApp.icon ? (
                      <img
                        src={activeApp.icon}
                        alt={`${activeApp.name} icon`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                          const fallback = e.target.nextSibling;
                          if (fallback) fallback.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <div
                      className="absolute inset-0 flex items-center justify-center text-lg font-bold text-blue-500 bg-blue-500/10"
                      style={{ display: activeApp.icon ? "none" : "flex" }}
                    >
                      {activeApp.name.charAt(0)}
                    </div>
                  </div>

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
                  Experience Gowtham's React Native implementation. This app features localized interfaces, encrypted offline databases, and optimized API routes built for production.
                </p>

                {/* Key stats badges */}
                <div className="flex flex-wrap gap-3 mt-6">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-850/50 text-neutral-600 dark:text-neutral-400">
                    <FiSmartphone className="w-3.5 h-3.5 text-blue-500" />
                    Rating: {activeApp.rating} ★
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-850/50 text-neutral-600 dark:text-neutral-400">
                    <FiDownload className="w-3.5 h-3.5 text-emerald-500" />
                    Downloads: {activeApp.downloads}
                  </span>
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

              {/* Dynamic App Asset Preview Block */}
              <div className="relative w-36 h-36 flex items-center justify-center p-4 rounded-3xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-inner shrink-0">
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-lg border border-neutral-200 dark:border-neutral-700 bg-white flex items-center justify-center">
                  {activeApp.icon ? (
                    <img
                      src={activeApp.icon}
                      alt={`${activeApp.name} icon preview`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                        const fallback = e.target.nextSibling;
                        if (fallback) fallback.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className="absolute inset-0 flex items-center justify-center text-3xl font-black text-blue-500 bg-blue-500/10"
                    style={{ display: activeApp.icon ? "none" : "flex" }}
                  >
                    {activeApp.name.charAt(0)}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>


          {/* Dots Indicator */}
          <div className="flex justify-center gap-1.5 mt-6">
            {appCarouselData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  activeIdx === idx ? "w-5 bg-blue-500" : "bg-neutral-300 dark:bg-neutral-700"
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
