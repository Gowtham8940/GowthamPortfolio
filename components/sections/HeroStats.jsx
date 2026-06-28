"use client";

import React from "react";
import { NumberTicker } from "../animations/NumberTicker";
import { FadeIn } from "../animations/FadeIn";
import { FiTrendingUp, FiLayers, FiUsers, FiCpu, FiDownloadCloud, FiSmartphone } from "react-icons/fi";

const stats = [
  {
    icon: <FiTrendingUp className="w-5 h-5 text-blue-500" />,
    value: "3.7",
    suffix: "+ Years",
    label: "Professional Experience",
    note: "Focused on React Native & Mobile"
  },
  {
    icon: <FiLayers className="w-5 h-5 text-purple-500" />,
    value: "20",
    suffix: "+ Apps",
    label: "Production Apps Shipped",
    note: "App Store, Play Store & Web"
  },
  {
    icon: <FiUsers className="w-5 h-5 text-emerald-500" />,
    value: "2",
    suffix: "M+ Users",
    label: "Global Active Users",
    note: "Scaled government & commerce apps"
  },
  {
    icon: <FiCpu className="w-5 h-5 text-red-500" />,
    value: "60",
    suffix: " FPS",
    label: "App Performance Guarantee",
    note: "Reanimated & UI thread optimization"
  },
  {
    icon: <FiDownloadCloud className="w-5 h-5 text-orange-500" />,
    value: "100",
    suffix: "K+ Downloads",
    label: "NPM Package Downloads",
    note: "Published packages and tools"
  },
  {
    icon: <FiSmartphone className="w-5 h-5 text-cyan-500" />,
    value: "5",
    suffix: " Platforms",
    label: "Multi-Platform Experience",
    note: "iOS, Android, Web, TV & Desktop"
  }
];

export function HeroStats() {
  return (
    <section className="py-12 border-y border-neutral-200 dark:border-neutral-800 bg-neutral-50/20 dark:bg-neutral-950/20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {stats.map((stat, idx) => (
            <FadeIn
              key={idx}
              delay={idx * 0.1}
              direction="up"
              className="flex flex-col items-center md:items-start text-center md:text-left p-4 rounded-xl border border-neutral-100 dark:border-neutral-900 bg-white/50 dark:bg-black/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 h-full"
            >
              {/* Icon */}
              <div className="p-2 bg-neutral-100 dark:bg-neutral-900 rounded-lg mb-3 shrink-0">
                {stat.icon}
              </div>

              {/* Animated value */}
              <div className="flex items-baseline justify-center md:justify-start gap-0.5 font-mono font-black text-neutral-800 dark:text-neutral-100">
                <span className="text-xl sm:text-2xl leading-none">
                  <NumberTicker value={stat.value} />
                </span>
                <span className="text-xs sm:text-sm font-semibold text-neutral-500 whitespace-nowrap leading-none">
                  {stat.suffix}
                </span>
              </div>

              {/* Labels */}
              <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300 mt-2 leading-snug line-clamp-2">
                {stat.label}
              </span>
              <span className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-1 leading-snug line-clamp-2">
                {stat.note}
              </span>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
export default HeroStats;
