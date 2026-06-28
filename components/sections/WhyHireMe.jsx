"use client";

import React from "react";
import { whyHireMePoints } from "@/lib/data/certifications";
import { FadeIn } from "../animations/FadeIn";
import { FiCheckCircle } from "react-icons/fi";

export function WhyHireMe() {
  return (
    <section id="why-hire-me" className="py-20 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6">
        {/* Title */}
        <FadeIn delay={0.1} direction="up" className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Why Hire Me?
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-3 max-w-xl mx-auto">
            A visual overview of my specialized value propositions for high-performance mobile application teams.
          </p>
        </FadeIn>

        {/* Competencies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {whyHireMePoints.map((point, idx) => (
            <FadeIn key={idx} delay={idx * 0.05} direction="up">
              <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-neutral-50/50 dark:bg-neutral-950/20 backdrop-blur-sm flex items-start gap-4 hover:border-neutral-350 dark:hover:border-neutral-800 transition-all">
                {/* Icon marker */}
                <span className="p-2 bg-blue-500/10 text-blue-500 rounded-xl shrink-0 mt-1">
                  <FiCheckCircle className="w-5 h-5" />
                </span>

                <div className="space-y-1">
                  <h3 className="text-base font-bold text-neutral-850 dark:text-neutral-100">
                    {point.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-450 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
export default WhyHireMe;
