"use client";

import React from "react";
import { experienceData } from "@/lib/data/experience";
import { FadeIn } from "../animations/FadeIn";
import { FiBriefcase, FiMapPin, FiCalendar, FiCheck } from "react-icons/fi";

export function Experience() {
  return (
    <section id="experience" className="py-20 bg-neutral-50 dark:bg-neutral-950/20 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6">
        {/* Title */}
        <FadeIn delay={0.1} direction="up" className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Professional Experience
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-3 max-w-xl mx-auto">
            A review of my tenure and responsibilities at Resbee Info Tech, transitioning from a core developer to senior and team lead roles.
          </p>
        </FadeIn>

        {/* Timeline Layout */}
        <div className="relative border-l border-neutral-200 dark:border-neutral-800 ml-4 md:ml-32 pl-8 md:pl-12 space-y-12 py-4 text-left">
          {experienceData.map((job, idx) => (
            <div key={job.id} className="relative group">
              {/* Left sidebar date column for desktop */}
              <div className="hidden md:block absolute -left-[196px] top-1 w-32 text-right">
                <span className="text-xs font-mono font-bold text-neutral-400 dark:text-neutral-500 flex items-center justify-end gap-1.5">
                  <FiCalendar className="w-3.5 h-3.5" />
                  {job.duration.split(" - ")[0]}
                </span>
                <span className="text-[10px] font-mono text-neutral-450 block mt-1">
                  to {job.duration.split(" - ")[1]}
                </span>
              </div>

              {/* Timeline bubble */}
              <div className="absolute -left-[41px] md:-left-[57px] top-1 p-2 rounded-full border border-neutral-250 dark:border-neutral-800 bg-white dark:bg-black text-blue-500 shadow-md">
                <FiBriefcase className="w-3.5 h-3.5" />
              </div>

              {/* Content Card */}
              <FadeIn delay={idx * 0.05} direction="left">
                <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-black/40 backdrop-blur-md transition-all duration-300 hover:border-neutral-350 dark:hover:border-neutral-800">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-3">
                    <div>
                      <h3 className="text-base font-bold text-neutral-850 dark:text-neutral-100">
                        {job.role}
                      </h3>
                      <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mt-0.5">
                        {job.company}
                      </p>
                    </div>
                    {/* Mobile duration indicator */}
                    <span className="md:hidden inline-flex items-center gap-1 text-[10px] font-mono font-bold text-neutral-400 bg-neutral-100 dark:bg-neutral-900 px-2 py-0.5 rounded border border-neutral-200/50 dark:border-neutral-800/50 w-fit">
                      <FiCalendar />
                      {job.duration}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4">
                    {job.description}
                  </p>

                  {/* Highlights list */}
                  <div className="flex flex-col gap-2">
                    {job.highlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-neutral-550 dark:text-neutral-450 leading-relaxed">
                        <span className="p-0.5 rounded-full bg-blue-500/10 text-blue-500 mt-0.5 shrink-0">
                          <FiCheck className="w-3 h-3" />
                        </span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Experience;
