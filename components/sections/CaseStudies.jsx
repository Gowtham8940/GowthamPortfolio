"use client";

import React from "react";
import { caseStudiesData } from "@/lib/data/certifications";
import { FadeIn } from "../animations/FadeIn";
import { FiBookOpen, FiAlertCircle, FiCheckSquare, FiAward } from "react-icons/fi";

export function CaseStudies() {
  return (
    <section id="case-studies" className="py-20 bg-white dark:bg-black transition-colors duration-305">
      <div className="max-w-4xl mx-auto px-6">
        {/* Title */}
        <FadeIn delay={0.1} direction="up" className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Case Studies
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-3 max-w-xl mx-auto">
            Deep dive into a major framework upgrade and architecture migration built for our high-scale enterprise applications.
          </p>
        </FadeIn>

        {caseStudiesData.map((cs, idx) => (
          <FadeIn key={idx} delay={0.2} direction="up">
            <div className="rounded-3xl border border-neutral-200 dark:border-neutral-900 bg-neutral-50/50 dark:bg-neutral-950/20 backdrop-blur-sm p-6 sm:p-8 text-left space-y-6">
              
              {/* Header */}
              <div className="border-b border-neutral-100 dark:border-neutral-900/60 pb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500">Upgrade Migration</span>
                <h3 className="text-xl font-bold text-neutral-850 dark:text-neutral-100 mt-1">
                  {cs.title}
                </h3>
              </div>

              {/* Challenge */}
              <div className="space-y-2">
                <h4 className="text-xs uppercase tracking-wider font-bold text-neutral-450 flex items-center gap-1.5">
                  <FiAlertCircle className="text-red-500" /> The Challenge
                </h4>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {cs.challenge}
                </p>
              </div>

              {/* Breaking Changes */}
              <div className="space-y-2">
                <h4 className="text-xs uppercase tracking-wider font-bold text-neutral-450">
                  Critical Roadblocks & Breaking Changes
                </h4>
                <ul className="list-disc pl-4 space-y-1.5 text-xs text-neutral-550 dark:text-neutral-450">
                  {cs.breakingChanges.map((bc, i) => (
                    <li key={i} className="leading-relaxed">{bc}</li>
                  ))}
                </ul>
              </div>

              {/* Solution */}
              <div className="space-y-2">
                <h4 className="text-xs uppercase tracking-wider font-bold text-neutral-450 flex items-center gap-1.5">
                  <FiCheckSquare className="text-emerald-500" /> Engineering Solutions
                </h4>
                <ul className="list-disc pl-4 space-y-1.5 text-xs text-neutral-550 dark:text-neutral-450">
                  {cs.solution.map((sol, i) => (
                    <li key={i} className="leading-relaxed">{sol}</li>
                  ))}
                </ul>
              </div>

              {/* Outcome */}
              <div className="p-4 rounded-xl border border-blue-500/25 bg-blue-500/5 text-blue-600 dark:text-blue-400 space-y-1.5">
                <h4 className="text-xs uppercase tracking-wider font-bold flex items-center gap-1.5">
                  <FiAward /> The Outcome
                </h4>
                <p className="text-xs sm:text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                  {cs.outcome}
                </p>
              </div>

            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
export default CaseStudies;
