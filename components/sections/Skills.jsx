"use client";

import React, { useState } from "react";
import { skillCategories } from "@/lib/data/skills";
import { CardContainer, CardBody, CardItem } from "../animations/ThreeDCard";
import { FadeIn } from "../animations/FadeIn";
import { Marquee } from "../animations/Marquee";
import { FiSmartphone, FiDatabase, FiServer, FiCpu, FiLayout, FiActivity } from "react-icons/fi";

const categoryIcons = {
  mobile: <FiSmartphone className="w-5 h-5" />,
  state: <FiDatabase className="w-5 h-5" />,
  backend: <FiServer className="w-5 h-5" />,
  ai: <FiCpu className="w-5 h-5" />,
  native: <FiCpu className="w-5 h-5" />,
  animation: <FiActivity className="w-5 h-5" />
};

export function Skills() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredCategories = activeTab === "all"
    ? skillCategories
    : skillCategories.filter(cat => cat.id === activeTab);

  return (
    <section id="skills" className="py-20 bg-neutral-50 dark:bg-neutral-950/20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <FadeIn delay={0.1} direction="up" className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Technical Skill Matrix
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-3 max-w-xl mx-auto">
            Hover over the cards to experience 3D tilting effects. A breakdown of my mobile engineering, native, and animation skills.
          </p>
        </FadeIn>

        {/* Tab Filters */}
        <FadeIn delay={0.2} direction="up" className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              activeTab === "all"
                ? "bg-neutral-900 dark:bg-neutral-100 border-neutral-900 dark:border-neutral-100 text-white dark:text-neutral-900"
                : "bg-white dark:bg-black/35 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400"
            }`}
          >
            All Skills
          </button>
          {skillCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                activeTab === category.id
                  ? "bg-neutral-900 dark:bg-neutral-100 border-neutral-900 dark:border-neutral-100 text-white dark:text-neutral-900"
                  : "bg-white dark:bg-black/35 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400"
              }`}
            >
              {category.title}
            </button>
          ))}
        </FadeIn>

        {/* Grid of 3D tilt cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredCategories.map((category) => (
            <FadeIn key={category.id} delay={0.1} direction="up">
              <CardContainer className="w-full">
                <CardBody className="w-full p-6 rounded-3xl border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-black/40 backdrop-blur-md glow-hover flex flex-col justify-between min-h-[380px]">
                  <CardItem translateZ={30} className="flex items-center gap-3 text-neutral-800 dark:text-neutral-100 mb-6">
                    <span className="p-2.5 bg-neutral-100 dark:bg-neutral-900 rounded-xl text-blue-500">
                      {categoryIcons[category.id] || <FiSmartphone />}
                    </span>
                    <h3 className="text-lg font-bold tracking-tight">{category.title}</h3>
                  </CardItem>

                  <div className="flex flex-col gap-4 flex-grow">
                    {category.skills.map((skill, idx) => (
                      <div key={idx} className="flex flex-col w-full">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="font-semibold text-neutral-850 dark:text-neutral-250">{skill.name}</span>
                          <span className="text-neutral-400 font-mono">{skill.level}%</span>
                        </div>
                        {/* Progress Bar */}
                        <div className="w-full h-1.5 bg-neutral-100 dark:bg-neutral-900 rounded-full overflow-hidden">
                          <CardItem
                            as="div"
                            translateZ={20 + idx * 5}
                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-neutral-400 mt-0.5 leading-snug line-clamp-1">
                          {skill.note}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </CardContainer>
            </FadeIn>
          ))}
        </div>

        {/* Sliding Marquee list of all skills at the bottom */}
        <div className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-900">
          <Marquee speed="medium" reverse={false} className="py-2">
            {skillCategories.flatMap(c => c.skills).map((skill, idx) => (
              <span
                key={idx}
                className="px-4 py-2 text-xs font-semibold rounded-full border border-neutral-200 dark:border-neutral-850 bg-white dark:bg-black text-neutral-600 dark:text-neutral-400"
              >
                {skill.name}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
export default Skills;
