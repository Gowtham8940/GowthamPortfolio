"use client";

import React, { useState } from "react";
import { skillCategories } from "@/lib/data/skills";
import { CardContainer, CardBody, CardItem } from "../animations/ThreeDCard";
import { FadeIn } from "../animations/FadeIn";
import { Marquee } from "../animations/Marquee";
import { motion } from "motion/react";
import { FiSmartphone, FiDatabase, FiServer, FiCpu, FiActivity, FiShield } from "react-icons/fi";

// Each category gets a distinct on-brand gradient accent + icon. The accent
// drives the icon badge, the proficiency ring, and every progress bar so each
// card reads as its own "chip" while staying in the purple family.
const accents = {
  mobile: { from: "#a855f7", to: "#6366f1", ring: "#a855f7", Icon: FiSmartphone, tag: "Cross-platform" },
  native: { from: "#d946ef", to: "#a855f7", ring: "#d946ef", Icon: FiCpu, tag: "Bridging" },
  state: { from: "#8b5cf6", to: "#22d3ee", ring: "#8b5cf6", Icon: FiDatabase, tag: "Data layer" },
  backend: { from: "#6366f1", to: "#0ea5e9", ring: "#6366f1", Icon: FiServer, tag: "Realtime" },
  "security-ai": { from: "#ec4899", to: "#a855f7", ring: "#ec4899", Icon: FiShield, tag: "Secure / AI" },
  "release-monitoring": { from: "#f59e0b", to: "#a855f7", ring: "#f59e0b", Icon: FiActivity, tag: "DevOps" },
};

const avgOf = (skills) => Math.round(skills.reduce((s, k) => s + k.level, 0) / skills.length);

function ProficiencyRing({ value, color }) {
  const r = 20;
  const circ = 2 * Math.PI * r;
  return (
    <div className="relative w-14 h-14 shrink-0">
      <svg viewBox="0 0 48 48" className="w-14 h-14 -rotate-90">
        <circle cx="24" cy="24" r={r} fill="none" strokeWidth="4" className="stroke-neutral-200 dark:stroke-neutral-800" />
        <motion.circle
          cx="24"
          cy="24"
          r={r}
          fill="none"
          strokeWidth="4"
          strokeLinecap="round"
          stroke={color}
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          whileInView={{ strokeDashoffset: circ - (value / 100) * circ }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center text-xs font-extrabold text-neutral-800 dark:text-neutral-100">
        {value}
      </span>
    </div>
  );
}

export function Skills() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredCategories =
    activeTab === "all" ? skillCategories : skillCategories.filter((cat) => cat.id === activeTab);

  return (
    <section id="skills" className="py-14 sm:py-20 bg-neutral-50 dark:bg-neutral-950/20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <FadeIn delay={0.1} direction="up" className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Technical Skill Matrix</h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-3 max-w-xl mx-auto">
            A depth map of my mobile engineering stack — hover to tilt each card, and watch proficiency fill as you scroll.
          </p>
        </FadeIn>

        {/* Tab Filters */}
        <FadeIn delay={0.2} direction="up" className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[{ id: "all", title: "All Skills" }, ...skillCategories].map((category) => {
            const active = activeTab === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  active
                    ? "text-white border-transparent bg-gradient-to-r from-purple-600 to-fuchsia-600 shadow-md shadow-purple-600/25"
                    : "bg-white dark:bg-black/35 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-purple-400 dark:hover:border-purple-600"
                }`}
              >
                {category.title}
              </button>
            );
          })}
        </FadeIn>

        {/* Grid of 3D tilt cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredCategories.map((category) => {
            const acc = accents[category.id] || accents.mobile;
            const Icon = acc.Icon;
            const avg = avgOf(category.skills);
            return (
              <FadeIn key={category.id} delay={0.1} direction="up">
                <CardContainer className="w-full">
                  <CardBody className="relative w-full p-6 rounded-3xl border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-black/40 backdrop-blur-md glow-hover flex flex-col min-h-[380px] overflow-hidden">
                    {/* accent corner glow */}
                    <div
                      className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-25 pointer-events-none"
                      style={{ background: `linear-gradient(135deg, ${acc.from}, ${acc.to})` }}
                    />

                    {/* Header */}
                    <CardItem translateZ={40} className="relative flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <span
                          className="grid place-items-center w-11 h-11 rounded-2xl text-white shadow-lg"
                          style={{ background: `linear-gradient(135deg, ${acc.from}, ${acc.to})` }}
                        >
                          <Icon className="w-5 h-5" />
                        </span>
                        <div>
                          <h3 className="text-base font-bold tracking-tight leading-tight">{category.title}</h3>
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                            {acc.tag} · {category.skills.length} skills
                          </span>
                        </div>
                      </div>
                      <ProficiencyRing value={avg} color={acc.ring} />
                    </CardItem>

                    {/* Skills with animated bars */}
                    <div className="relative flex flex-col gap-4 flex-grow">
                      {category.skills.map((skill, idx) => (
                        <div key={idx} className="flex flex-col w-full">
                          <div className="flex justify-between items-center text-xs mb-1">
                            <span className="font-semibold text-neutral-850 dark:text-neutral-250">{skill.name}</span>
                            <span className="text-neutral-400 font-mono">{skill.level}%</span>
                          </div>
                          <div className="w-full h-2 bg-neutral-100 dark:bg-neutral-900 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ background: `linear-gradient(90deg, ${acc.from}, ${acc.to})` }}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                            />
                          </div>
                          <span className="text-[10px] text-neutral-400 mt-0.5 leading-snug line-clamp-1">{skill.note}</span>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </CardContainer>
              </FadeIn>
            );
          })}
        </div>

        {/* Sliding Marquee list of all skills at the bottom */}
        <div className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-900">
          <Marquee speed="medium" reverse={false} className="py-2">
            {skillCategories.flatMap((c) => c.skills).map((skill, idx) => (
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
