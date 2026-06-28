"use client";

import React, { useState, useEffect } from "react";
import { developerConsoleOutputs } from "@/lib/data/certifications";
import { FadeIn } from "../animations/FadeIn";
import { useInView } from "react-intersection-observer";

export function DevConsole() {
  const [lines, setLines] = useState([]);
  const [activeLineIdx, setActiveLineIdx] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  useEffect(() => {
    if (!inView) return;
    
    const interval = setInterval(() => {
      setLines((prev) => {
        const nextLine = developerConsoleOutputs[activeLineIdx];
        if (nextLine) {
          setActiveLineIdx(activeLineIdx + 1);
          return [...prev, nextLine];
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 800);

    return () => clearInterval(interval);
  }, [inView, activeLineIdx]);

  return (
    <section ref={ref} className="py-16 bg-neutral-50 dark:bg-neutral-950/20 transition-colors duration-300">
      <div className="max-w-2xl mx-auto px-6">
        <FadeIn delay={0.1} direction="up">
          {/* Terminal Box */}
          <div className="rounded-2xl border border-neutral-250 dark:border-neutral-900 bg-neutral-900 text-left font-mono text-xs text-neutral-300 shadow-2xl overflow-hidden">
            {/* Header tab */}
            <div className="flex items-center gap-2 bg-neutral-950 px-4 py-3 border-b border-neutral-850/80 text-neutral-450 select-none">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <span className="ml-2 font-bold text-[10px]">zsh - developer-console</span>
            </div>

            {/* Terminal screen content */}
            <div className="p-5 flex flex-col gap-2 min-h-[220px]">
              {lines.map((line, idx) => {
                if (line.type === "input") {
                  return (
                    <div key={idx} className="flex gap-1.5 items-start">
                      <span className="text-blue-500 font-bold select-none">&gt;</span>
                      <span className="text-white font-bold">{line.text}</span>
                    </div>
                  );
                }
                if (line.type === "success") {
                  return (
                    <p key={idx} className="text-emerald-400 font-bold">
                      {line.text}
                    </p>
                  );
                }
                if (line.type === "info") {
                  return (
                    <p key={idx} className="text-neutral-200">
                      {line.text}
                    </p>
                  );
                }
                return (
                  <p key={idx} className="text-neutral-500">
                    {line.text}
                  </p>
                );
              })}
              
              {/* Blinking cursor at current input spot if typing */}
              {activeLineIdx < developerConsoleOutputs.length && (
                <span className="w-1.5 h-4 bg-blue-500 animate-pulse ml-0.5" />
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
export default DevConsole;
