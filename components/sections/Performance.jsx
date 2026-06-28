"use client";

import React from "react";
import { FadeIn } from "../animations/FadeIn";
import { NumberTicker } from "../animations/NumberTicker";
import { FiTrendingDown, FiZap, FiActivity } from "react-icons/fi";

export function Performance() {
  return (
    <section id="performance" className="py-20 bg-neutral-50 dark:bg-neutral-950/20 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6">
        {/* Title */}
        <FadeIn delay={0.1} direction="up" className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Performance Benchmarks
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-3 max-w-xl mx-auto">
            Practical optimization metrics attained across our production applications. Shipped with Proguard, split architectures, and Hermes optimization.
          </p>
        </FadeIn>

        {/* Benchmarks grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: APK Bundle Size */}
          <FadeIn delay={0.1} direction="up">
            <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-black/45 backdrop-blur-sm h-full flex flex-col justify-between text-left">
              <div>
                <span className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 inline-block mb-4">
                  <FiTrendingDown className="w-5 h-5" />
                </span>
                <h3 className="text-lg font-bold text-neutral-850 dark:text-neutral-100">
                  Bundle Size Optimization
                </h3>
                <p className="text-xs sm:text-sm text-neutral-550 dark:text-neutral-400 mt-2 leading-relaxed">
                  Reduced base application sizes across client releases by stripping unused dependency symbols, configuring Gradle splits, compressing JSON resources, and enforcing asset pipelines.
                </p>
              </div>

              {/* Before/After stats bar */}
              <div className="grid grid-cols-2 gap-4 border-t border-neutral-100 dark:border-neutral-900/60 pt-6 mt-6">
                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-400">Before</span>
                  <div className="text-2xl font-black text-neutral-450 dark:text-neutral-600 font-mono mt-1">60MB</div>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-500">Optimized</span>
                  <div className="text-2xl font-black text-emerald-500 font-mono mt-1">20MB</div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Card 2: Animation Frame Rate */}
          <FadeIn delay={0.2} direction="up">
            <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-black/45 backdrop-blur-sm h-full flex flex-col justify-between text-left">
              <div>
                <span className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 inline-block mb-4">
                  <FiActivity className="w-5 h-5" />
                </span>
                <h3 className="text-lg font-bold text-neutral-850 dark:text-neutral-100">
                  Animation Optimization
                </h3>
                <p className="text-xs sm:text-sm text-neutral-550 dark:text-neutral-400 mt-2 leading-relaxed">
                  Migrated high frequency gestures and animations to use React Native Reanimated worklets, bypassing the JS thread completely to maintain consistent frame renders.
                </p>
              </div>

              {/* Before/After stats bar */}
              <div className="grid grid-cols-2 gap-4 border-t border-neutral-100 dark:border-neutral-900/60 pt-6 mt-6">
                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-400">Average</span>
                  <div className="text-2xl font-black text-neutral-450 dark:text-neutral-600 font-mono mt-1">45 FPS</div>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-blue-500">Target</span>
                  <div className="text-2xl font-black text-blue-500 font-mono mt-1">60 FPS</div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Card 3: Startup Speeds */}
          <FadeIn delay={0.3} direction="up">
            <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-black/45 backdrop-blur-sm h-full flex flex-col justify-between text-left">
              <div>
                <span className="p-2.5 rounded-xl bg-yellow-500/10 text-yellow-500 inline-block mb-4">
                  <FiZap className="w-5 h-5" />
                </span>
                <h3 className="text-lg font-bold text-neutral-850 dark:text-neutral-100">
                  App Startup Time
                </h3>
                <p className="text-xs sm:text-sm text-neutral-550 dark:text-neutral-400 mt-2 leading-relaxed">
                  Tweaked Hermes engine configurations, postponed non-critical module initializations, lazy-loaded navigation screens, and optimized native entry hooks.
                </p>
              </div>

              {/* Before/After stats bar */}
              <div className="grid grid-cols-2 gap-4 border-t border-neutral-100 dark:border-neutral-900/60 pt-6 mt-6">
                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-400">Launch speed</span>
                  <div className="text-2xl font-black text-neutral-450 dark:text-neutral-600 font-mono mt-1">Standard</div>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-500">Improvement</span>
                  <div className="text-2xl font-black text-emerald-500 font-mono mt-1">
                    <NumberTicker value={45} suffix="%" /> Faster
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Card 4: Stability & Crash Rates */}
          <FadeIn delay={0.4} direction="up">
            <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-black/45 backdrop-blur-sm h-full flex flex-col justify-between text-left">
              <div>
                <span className="p-2.5 rounded-xl bg-red-500/10 text-red-500 inline-block mb-4">
                  <FiActivity className="w-5 h-5" />
                </span>
                <h3 className="text-lg font-bold text-neutral-850 dark:text-neutral-100">
                  Stability (Crash Rates)
                </h3>
                <p className="text-xs sm:text-sm text-neutral-550 dark:text-neutral-400 mt-2 leading-relaxed">
                  Introduced Firebase Crashlytics boundaries, resolved native thread race conditions, configured automated offline fallback policies, and optimized memory allocations.
                </p>
              </div>

              {/* Before/After stats bar */}
              <div className="grid grid-cols-2 gap-4 border-t border-neutral-100 dark:border-neutral-900/60 pt-6 mt-6">
                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-400">Errors</span>
                  <div className="text-2xl font-black text-neutral-450 dark:text-neutral-600 font-mono mt-1">Legacy</div>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-500">Crash reduction</span>
                  <div className="text-2xl font-black text-emerald-500 font-mono mt-1">
                    <NumberTicker value={70} suffix="%" /> Lower
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
export default Performance;
