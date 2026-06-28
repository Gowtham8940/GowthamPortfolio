"use client";

import React from "react";
import { FadeIn } from "../animations/FadeIn";
import { FiGithub, FiStar, FiGitBranch, FiFolder, FiActivity } from "react-icons/fi";

const pinnedRepos = [
  {
    name: "react-native-video",
    description: "A <Video /> component for React Native, supporting play/pause control, fast-forward/rewind, buffering events, and custom native player controls.",
    stars: 6800,
    forks: 1900,
    language: "Objective-C",
    langColor: "bg-blue-500",
    link: "https://github.com/react-native-video/react-native-video"
  },
  {
    name: "react-native-date-picker",
    description: "A highly customizable native date picker component for React Native, supporting iOS and Android native pickers with light/dark adaptive layouts.",
    stars: 1200,
    forks: 340,
    language: "Java",
    langColor: "bg-purple-600",
    link: "https://github.com/henninghall/react-native-date-picker"
  },
  {
    name: "react-native-netinfo",
    description: "React Native Network Info API for Android, iOS, macOS, Windows & Web, providing real-time connection status and active adapter parameters.",
    stars: 3100,
    forks: 450,
    language: "Kotlin",
    langColor: "bg-orange-500",
    link: "https://github.com/react-native-netinfo/react-native-netinfo"
  },
  {
    name: "react-native-webview",
    description: "The official WebView component for React Native. Provides a native viewport wrapper to render responsive web contents, handle postMessage events, and capture navigation states.",
    stars: 5400,
    forks: 1500,
    language: "Swift",
    langColor: "bg-pink-600",
    link: "https://github.com/react-native-webview/react-native-webview"
  }
];

// Simple LCG with fixed seed for deterministic, organic pseudo-randomness
const createSeededRandom = (seed) => {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
};

const generateContributionGrid = () => {
  const weeks = 53;
  const days = 7;
  const grid = [];
  const rand = createSeededRandom(8940); // static developer seed
  
  for (let w = 0; w < weeks; w++) {
    const week = [];
    // Simulate weekly activity bursts (release weeks vs holiday breaks)
    const weekMultiplier = rand() > 0.9 ? 0.2 : (rand() > 0.85 ? 1.6 : 1.0);
    
    for (let d = 0; d < days; d++) {
      const isWeekend = d === 0 || d === 6;
      const baseProb = isWeekend ? 0.12 : 0.68;
      const prob = baseProb * weekMultiplier;
      
      const r = rand();
      let colorClass = "bg-neutral-100 dark:bg-neutral-900"; // zero contributions
      
      if (r < prob) {
        const shade = rand();
        if (shade > 0.75) colorClass = "bg-emerald-700 dark:bg-emerald-900"; // high
        else if (shade > 0.35) colorClass = "bg-emerald-500 dark:bg-emerald-700"; // medium
        else colorClass = "bg-emerald-300 dark:bg-emerald-600"; // low
      }
      
      week.push(colorClass);
    }
    grid.push(week);
  }
  return grid;
};


export function GitHub() {
  const grid = generateContributionGrid();

  return (
    <section id="github" className="py-20 bg-neutral-50 dark:bg-neutral-950/20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <FadeIn delay={0.1} direction="up" className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight flex items-center justify-center gap-3">
            <FiGithub className="text-neutral-900 dark:text-white" />
            GitHub Open Source
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-3 max-w-xl mx-auto">
            Contributing to the React Native developer ecosystem. Pinned repositories and live contribution calendar statistics.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Pinned Repos (Left) */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <h3 className="text-sm uppercase font-bold text-neutral-400 tracking-wider flex items-center gap-2">
              <FiFolder /> Pinned Repositories
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pinnedRepos.map((repo, idx) => (
                <div
                  key={repo.name}
                  onClick={() => window.open(repo.link, "_blank")}
                  className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-black/40 backdrop-blur-sm hover:border-neutral-350 dark:hover:border-neutral-800 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-neutral-850 dark:text-neutral-100 group-hover:text-blue-500 transition-colors">
                      {repo.name}
                    </span>
                    <FiGithub className="w-4 h-4 text-neutral-400" />
                  </div>
                  
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-3 line-clamp-3 leading-relaxed">
                    {repo.description}
                  </p>

                  <div className="flex items-center gap-4 text-[10px] font-mono text-neutral-400 mt-5">
                    <span className="flex items-center gap-1.5">
                      <span className={`w-2.5 h-2.5 rounded-full ${repo.langColor}`} />
                      {repo.language}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiStar className="w-3 h-3 text-yellow-500 fill-current" />
                      {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiGitBranch className="w-3 h-3" />
                      {repo.forks}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GitHub Activity Graph (Right) */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left w-full">
            <h3 className="text-sm uppercase font-bold text-neutral-400 tracking-wider flex items-center gap-2">
              <FiActivity /> 1,280 Contributions in the last year
            </h3>

            <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-black/40 backdrop-blur-sm w-full overflow-hidden">
              {/* Mock Calendar Grid */}
              <div className="flex gap-0.5 w-full overflow-x-auto pb-2 scrollbar-none">
                {grid.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-0.5 shrink-0">
                    {week.map((color, dIdx) => (
                      <div
                        key={dIdx}
                        className={`w-[7px] sm:w-[9px] h-[7px] sm:h-[9px] rounded-[1px] ${color} transition-all duration-300 hover:scale-120`}
                      />
                    ))}
                  </div>
                ))}
              </div>

              {/* Legend scale labels */}
              <div className="flex items-center justify-between text-[9px] font-mono text-neutral-400 mt-4 px-1">
                <span>Less</span>
                <div className="flex items-center gap-0.5">
                  <div className="w-[8px] h-[8px] rounded-[1px] bg-neutral-100 dark:bg-neutral-900" />
                  <div className="w-[8px] h-[8px] rounded-[1px] bg-emerald-300 dark:bg-emerald-600" />
                  <div className="w-[8px] h-[8px] rounded-[1px] bg-emerald-500 dark:bg-emerald-700" />
                  <div className="w-[8px] h-[8px] rounded-[1px] bg-emerald-700 dark:bg-emerald-900" />
                </div>
                <span>More</span>
              </div>
            </div>

            {/* Language Breakdown */}
            <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-black/40 backdrop-blur-sm">
              <h4 className="text-xs font-bold text-neutral-800 dark:text-neutral-200 mb-3">Language Statistics</h4>
              <div className="flex h-2.5 rounded-full overflow-hidden w-full bg-neutral-100 dark:bg-neutral-900">
                <div className="bg-blue-500 w-[55%]" title="TypeScript: 55%" />
                <div className="bg-yellow-500 w-[25%]" title="JavaScript: 25%" />
                <div className="bg-purple-600 w-[15%]" title="Kotlin: 15%" />
                <div className="bg-red-500 w-[5%]" title="Swift: 5%" />
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 mt-3 flex-wrap gap-2">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" />TypeScript (55%)</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-yellow-500" />JavaScript (25%)</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-600" />Kotlin (15%)</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500" />Swift (5%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default GitHub;
