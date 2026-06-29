"use client";

import React from "react";
import { FadeIn } from "../animations/FadeIn";
import { FiBookOpen, FiActivity, FiAward, FiSettings, FiCodesandbox, FiArrowRight } from "react-icons/fi";

const timelineEvents = [
  {
    icon: <FiAward className="w-5 h-5 text-red-500" />,
    title: "B.E. Civil Engineering - Kongu Engineering College",
    duration: "2018 - 2022",
    description: "Completed undergraduate degree in Civil Engineering with a GPA of 7.77 / 10. Discovered a deep interest in logical design structures and computing.",
    color: "border-red-500/30 dark:border-red-500/20 bg-red-500/5 text-red-500"
  },
  {
    icon: <FiBookOpen className="w-5 h-5 text-orange-500" />,
    title: "Self Learning & Transition",
    duration: "2022 - 2023",
    description: "Committed to software development. Self-learned JavaScript, React, mobile systems architectures, and deployed initial trial mobile builds.",
    color: "border-orange-500/30 dark:border-orange-500/20 bg-orange-500/5 text-orange-500"
  },
  {
    icon: <FiCodesandbox className="w-5 h-5 text-yellow-500" />,
    title: "React Native Developer - Radaz Technologies",
    duration: "Mar 2023 - Oct 2024",
    description: "Developed and maintained cross-platform mobile apps for Android & iOS. Shipped 3 production apps across IoT and e-commerce domains, including real-time monitoring (ESP32, MQTT).",
    color: "border-yellow-500/30 dark:border-yellow-500/20 bg-yellow-500/5 text-yellow-500"
  },
  {
    icon: <FiActivity className="w-5 h-5 text-emerald-500" />,
    title: "React Native Developer & Lead - Resbee Info Technologies",
    duration: "Oct 2024 - Present",
    description: "Promoted to lead a mobile team of 4 engineers. Responsible for sprint deliveries, code reviews, and architecting government-scale LMS platforms serving 2M+ users across India and Ethiopia.",
    color: "border-emerald-500/30 dark:border-emerald-500/20 bg-emerald-500/5 text-emerald-550"
  }
];


export function About() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-black transition-colors duration-300 relative">
      <div className="max-w-4xl mx-auto px-6">
        {/* Title */}
        <FadeIn delay={0.1} direction="up" className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            My Journey & Background
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-3 max-w-xl mx-auto">
            From structures in engineering to structures in code — a timeline of my professional growth and developer journey.
          </p>
        </FadeIn>

        {/* Interactive Vertical Timeline */}
        <div className="relative border-l-2 border-neutral-200 dark:border-neutral-800 ml-4 md:ml-6 pl-8 md:pl-10 space-y-12 py-4">
          {timelineEvents.map((event, idx) => (
            <FadeIn
              key={idx}
              delay={idx * 0.1}
              direction="left"
              className="relative group"
            >
              {/* Timeline dot / icon */}
              <div
                className={`absolute -left-[53px] md:-left-[61px] top-1.5 p-2 rounded-full border-2 ${event.color} transition-all duration-300 group-hover:scale-115`}
              >
                {event.icon}
              </div>

              {/* Event card content */}
              <div className="p-5 rounded-2xl border border-neutral-150 dark:border-neutral-900 bg-neutral-50/50 dark:bg-neutral-950/20 backdrop-blur-sm transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-850 hover:bg-neutral-50 dark:hover:bg-neutral-950/40">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h3 className="text-base font-bold text-neutral-800 dark:text-neutral-200">
                    {event.title}
                  </h3>
                  <span className="text-xs font-mono font-semibold text-neutral-400 bg-neutral-100 dark:bg-neutral-900 px-2.5 py-1 rounded-full border border-neutral-200/30 dark:border-neutral-800/30 w-fit">
                    {event.duration}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {event.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
export default About;
