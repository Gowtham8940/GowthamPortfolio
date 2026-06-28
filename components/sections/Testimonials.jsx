"use client";

import React from "react";
import { testimonials } from "@/lib/data/testimonials";
import { FadeIn } from "../animations/FadeIn";
import { Marquee } from "../animations/Marquee";
import { FiMessageSquare } from "react-icons/fi";

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-neutral-50 dark:bg-neutral-950/20 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <FadeIn delay={0.1} direction="up" className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight flex items-center justify-center gap-2.5">
            <FiMessageSquare className="text-purple-500" />
            Recommendations & Feedback
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-3 max-w-xl mx-auto">
            What directors, team leaders, and product clients say about my technical engineering and mobile architecture work.
          </p>
        </FadeIn>

        {/* Testimonials Marquee Row */}
        <Marquee speed="slow" pauseOnHover={true} className="py-4">
          {testimonials.map((test, idx) => (
            <div
              key={idx}
              className="p-6 w-[280px] sm:w-[350px] shrink-0 rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-black/40 backdrop-blur-md flex flex-col justify-between text-left shadow-md"
            >
              {/* Review Text */}
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed italic mb-6">
                "{test.quote}"
              </p>

              {/* Reviewer Details */}
              <div className="flex items-center gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-900/60">
                {/* Avatar Placeholder */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-xs font-black text-white font-mono shadow">
                  {test.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-850 dark:text-neutral-150">
                    {test.name}
                  </h4>
                  <p className="text-[10px] text-neutral-400 font-semibold">
                    {test.role}, <span className="text-neutral-500">{test.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
export default Testimonials;
