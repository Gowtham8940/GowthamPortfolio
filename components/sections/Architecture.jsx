"use client";

import React, { useState } from "react";
import { FadeIn } from "../animations/FadeIn";
import { FiSmartphone, FiDatabase, FiCpu, FiCompass, FiLayers, FiRadio } from "react-icons/fi";

const architectureNodes = [
  { id: "react-native", title: "React Native App", type: "core", icon: <FiSmartphone />, desc: "JSI / Hermes engine thread" },
  { id: "redux-query", title: "Redux & TanStack", type: "state", icon: <FiCompass />, desc: "Client caching & routing state" },
  { id: "watermelondb", title: "WatermelonDB", type: "db", icon: <FiDatabase />, desc: "Encrypted SQLite offline cache" },
  { id: "native-modules", title: "Native Modules", type: "bridge", icon: <FiCpu />, desc: "Kotlin & Swift system layers" },
  { id: "firebase-cloud", title: "Firebase & AWS", type: "backend", icon: <FiRadio />, desc: "Auth, Firestore & S3 pipeline" },
  { id: "android-ios", title: "OS: Android / iOS", type: "os", icon: <FiLayers />, desc: "Final native UI rendering" }
];

export function Architecture() {
  const [activeNode, setActiveNode] = useState(null);

  return (
    <section id="architecture" className="py-20 bg-white dark:bg-black transition-colors duration-300 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/5 blur-[100px] pointer-events-none rounded-full" />
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Title */}
        <FadeIn delay={0.1} direction="up" className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Mobile Systems Architecture
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-3 max-w-xl mx-auto">
            Interactive system flow. Hover over any node to highlight the data pathways between React Native core, caching layers, and native bridges.
          </p>
        </FadeIn>

        {/* Diagram Flow Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center relative py-6">
          
          {/* Column 1: Client Front (Core & Local State) */}
          <div className="flex flex-col gap-6">
            <h3 className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 text-center md:text-left mb-2">
              1. Core UI Layer
            </h3>
            
            {/* React Native core */}
            <div
              onMouseEnter={() => setActiveNode("react-native")}
              onMouseLeave={() => setActiveNode(null)}
              className={`p-5 rounded-2xl border text-left cursor-pointer transition-all duration-300 ${
                activeNode === "react-native" || !activeNode
                  ? "border-blue-500 bg-blue-500/5 shadow-md shadow-blue-500/5"
                  : "border-neutral-200 dark:border-neutral-900 bg-white dark:bg-neutral-950/20 opacity-40"
              }`}
            >
              <div className="flex items-center gap-3 mb-2 text-blue-500">
                {architectureNodes[0].icon}
                <span className="font-bold text-xs sm:text-sm text-neutral-850 dark:text-neutral-100">
                  {architectureNodes[0].title}
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-snug">
                {architectureNodes[0].desc}
              </p>
            </div>

            {/* Redux State */}
            <div
              onMouseEnter={() => setActiveNode("redux-query")}
              onMouseLeave={() => setActiveNode(null)}
              className={`p-5 rounded-2xl border text-left cursor-pointer transition-all duration-300 ${
                activeNode === "redux-query" || !activeNode
                  ? "border-purple-500 bg-purple-500/5 shadow-md shadow-purple-500/5"
                  : "border-neutral-200 dark:border-neutral-900 bg-white dark:bg-neutral-950/20 opacity-40"
              }`}
            >
              <div className="flex items-center gap-3 mb-2 text-purple-500">
                {architectureNodes[1].icon}
                <span className="font-bold text-xs sm:text-sm text-neutral-850 dark:text-neutral-100">
                  {architectureNodes[1].title}
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-snug">
                {architectureNodes[1].desc}
              </p>
            </div>
          </div>

          {/* Column 2: Data caching & Bridges (Middle) */}
          <div className="flex flex-col gap-6 relative">
            
            {/* SVG Linking Lines overlay */}
            <div className="hidden md:block absolute -inset-x-12 -inset-y-6 -z-10 pointer-events-none">
              <svg className="w-full h-full stroke-current text-neutral-250 dark:text-neutral-800" fill="none">
                {/* Horizontal pathways */}
                <path d="M-10 65 L80 65" className={activeNode === "react-native" ? "text-blue-500 stroke-[2px] animate-pulse" : ""} />
                <path d="M-10 170 L80 170" className={activeNode === "redux-query" ? "text-purple-500 stroke-[2px] animate-pulse" : ""} />
                
                <path d="M190 65 L280 65" className={activeNode === "watermelondb" ? "text-emerald-500 stroke-[2px] animate-pulse" : ""} />
                <path d="M190 170 L280 170" className={activeNode === "native-modules" ? "text-yellow-500 stroke-[2px] animate-pulse" : ""} />
              </svg>
            </div>

            <h3 className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 text-center mb-2">
              2. Middleware & Cache
            </h3>

            {/* Watermelon DB */}
            <div
              onMouseEnter={() => setActiveNode("watermelondb")}
              onMouseLeave={() => setActiveNode(null)}
              className={`p-5 rounded-2xl border text-left cursor-pointer transition-all duration-300 ${
                activeNode === "watermelondb" || !activeNode
                  ? "border-emerald-500 bg-emerald-500/5 shadow-md shadow-emerald-500/5"
                  : "border-neutral-200 dark:border-neutral-900 bg-white dark:bg-neutral-950/20 opacity-40"
              }`}
            >
              <div className="flex items-center gap-3 mb-2 text-emerald-500">
                {architectureNodes[2].icon}
                <span className="font-bold text-xs sm:text-sm text-neutral-850 dark:text-neutral-100">
                  {architectureNodes[2].title}
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-snug">
                {architectureNodes[2].desc}
              </p>
            </div>

            {/* Native Modules Bridge */}
            <div
              onMouseEnter={() => setActiveNode("native-modules")}
              onMouseLeave={() => setActiveNode(null)}
              className={`p-5 rounded-2xl border text-left cursor-pointer transition-all duration-300 ${
                activeNode === "native-modules" || !activeNode
                  ? "border-yellow-500 bg-yellow-500/5 shadow-md shadow-yellow-500/5"
                  : "border-neutral-200 dark:border-neutral-900 bg-white dark:bg-neutral-950/20 opacity-40"
              }`}
            >
              <div className="flex items-center gap-3 mb-2 text-yellow-500">
                {architectureNodes[3].icon}
                <span className="font-bold text-xs sm:text-sm text-neutral-850 dark:text-neutral-100">
                  {architectureNodes[3].title}
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-snug">
                {architectureNodes[3].desc}
              </p>
            </div>
          </div>

          {/* Column 3: Backend & Final output (Right) */}
          <div className="flex flex-col gap-6">
            <h3 className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 text-center md:text-right mb-2">
              3. System Layers
            </h3>

            {/* Firebase & AWS */}
            <div
              onMouseEnter={() => setActiveNode("firebase-cloud")}
              onMouseLeave={() => setActiveNode(null)}
              className={`p-5 rounded-2xl border text-left cursor-pointer transition-all duration-300 ${
                activeNode === "firebase-cloud" || !activeNode
                  ? "border-cyan-500 bg-cyan-500/5 shadow-md shadow-cyan-500/5"
                  : "border-neutral-200 dark:border-neutral-900 bg-white dark:bg-neutral-950/20 opacity-40"
              }`}
            >
              <div className="flex items-center gap-3 mb-2 text-cyan-500">
                {architectureNodes[4].icon}
                <span className="font-bold text-xs sm:text-sm text-neutral-850 dark:text-neutral-100">
                  {architectureNodes[4].title}
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-snug">
                {architectureNodes[4].desc}
              </p>
            </div>

            {/* OS Layer */}
            <div
              onMouseEnter={() => setActiveNode("android-ios")}
              onMouseLeave={() => setActiveNode(null)}
              className={`p-5 rounded-2xl border text-left cursor-pointer transition-all duration-300 ${
                activeNode === "android-ios" || !activeNode
                  ? "border-red-500 bg-red-500/5 shadow-md shadow-red-500/5"
                  : "border-neutral-200 dark:border-neutral-900 bg-white dark:bg-neutral-950/20 opacity-40"
              }`}
            >
              <div className="flex items-center gap-3 mb-2 text-red-500">
                {architectureNodes[5].icon}
                <span className="font-bold text-xs sm:text-sm text-neutral-850 dark:text-neutral-100">
                  {architectureNodes[5].title}
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-snug">
                {architectureNodes[5].desc}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
export default Architecture;
