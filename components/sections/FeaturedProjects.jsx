"use client";

import React, { useState } from "react";
import { projects } from "@/lib/data/projects";
import { FadeIn } from "../animations/FadeIn";
import { CardSpotlightWrapper } from "../animations/CursorGlow";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FiExternalLink, FiGithub, FiPlay, FiCpu, FiAlertTriangle, FiCheckCircle } from "react-icons/fi";

const categories = ["All", "EdTech & Government", "E-commerce & Service", "Recruitment & Training"];

export function FeaturedProjects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(p => p.category.includes(activeCategory.split(" & ")[0]));

  return (
    <section id="projects" className="py-20 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <FadeIn delay={0.1} direction="up" className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Featured Mobile Products
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-3 max-w-xl mx-auto">
            A curated showcase of production applications shipped to App Stores, ranging from government learning platforms to on-demand marketplaces.
          </p>
        </FadeIn>

        {/* Category Filters */}
        <FadeIn delay={0.2} direction="up" className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${activeCategory === cat
                ? "bg-neutral-900 dark:bg-neutral-100 border-neutral-900 dark:border-neutral-100 text-white dark:text-neutral-900"
                : "bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400"
                }`}
            >
              {cat}
            </button>
          ))}
        </FadeIn>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project, idx) => (
            <FadeIn key={project.id} delay={idx * 0.05} direction="up">
              <CardSpotlightWrapper className="h-full rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-neutral-50/50 dark:bg-neutral-950/20 backdrop-blur-sm p-6 flex flex-col justify-between hover:scale-[1.02] cursor-pointer group">
                <div onClick={() => setSelectedProject(project)}>
                  {/* Category badge */}
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500">
                    {project.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-neutral-850 dark:text-neutral-100 mt-2 flex items-center gap-2">
                    {project.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 mt-1">
                    {project.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-3 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {project.techStack.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/50 text-neutral-550 dark:text-neutral-400"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-neutral-400">
                        +{project.techStack.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-900/60">
                  <span className="text-[10px] font-mono text-neutral-400">
                    Role: {project.role}
                  </span>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-bold text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 cursor-pointer"
                  >
                    View Details
                    <FiArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </CardSpotlightWrapper>
            </FadeIn>
          ))}
        </div>

        {/* Expandable Project Details Dialog (App Store style modal) */}
        <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] bg-white/95 dark:bg-black/95 backdrop-blur-xl border-neutral-250 dark:border-neutral-850 p-0 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            {selectedProject && (
              <div className="flex-grow overflow-y-auto p-6 sm:p-8 flex flex-col gap-6 max-h-[88vh]">

                <DialogHeader className="pr-12">
                  <div className="flex items-center gap-4">
                    {/* App icon container */}
                    <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center shadow-md shrink-0">
                      {(() => {
                        const iconUrl = {
                          "MAAZTER": "/api/app-icon?platform=ios&appId=1606521457",
                          "e-Khool LMS": "/api/app-icon?platform=ios&appId=6740979534",
                          "AAEB eSchool & TVET eSchool": "/api/app-icon?platform=android&appId=com.aaeb",
                          "Suya Mobiles": "/api/app-icon?platform=android&appId=com.mobifix",
                          "IoT Automation Apps": "/api/app-icon?platform=android&appId=com.mbbswala"
                        }[selectedProject.title];

                        return (
                          <>
                            {iconUrl ? (
                              <img
                                src={iconUrl}
                                alt={`${selectedProject.title} icon`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.style.display = "none";
                                  const fallback = e.target.nextSibling;
                                  if (fallback) fallback.style.display = "flex";
                                }}
                              />
                            ) : null}
                            <div
                              className="absolute inset-0 flex items-center justify-center text-xl font-black text-white bg-gradient-to-br from-blue-500 to-purple-600"
                              style={{ display: iconUrl ? "none" : "flex" }}
                            >
                              {selectedProject.title.charAt(0)}
                            </div>
                          </>
                        );
                      })()}
                    </div>
                    <div className="text-left">
                      <DialogTitle className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
                        {selectedProject.title}
                      </DialogTitle>
                      <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                        {selectedProject.subtitle}
                      </p>
                    </div>
                  </div>
                </DialogHeader>

                {/* Details layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left Column (Stats & Metadata) */}
                  <div className="md:col-span-1 flex flex-col gap-4 border-r border-neutral-200/50 dark:border-neutral-800/50 pr-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Category</span>
                      <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mt-0.5">{selectedProject.category}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Role</span>
                      <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mt-0.5">{selectedProject.role}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Company</span>
                      <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mt-0.5">{selectedProject.company}</p>
                    </div>
                    {selectedProject.metrics && (
                      <div>
                        <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Downloads / Impact</span>
                        <p className="text-xs font-semibold text-emerald-500 mt-0.5 flex items-center gap-1">
                          <FiCheckCircle className="w-3.5 h-3.5" />
                          {selectedProject.metrics.downloads || selectedProject.metrics.users || "Active"}
                        </p>
                      </div>
                    )}
                    {/* Store buttons */}
                    <div className="flex flex-col gap-2 mt-4">
                      {selectedProject.links?.playstore && (
                        <a
                          href={selectedProject.links.playstore}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 px-4 py-2 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 rounded-xl text-xs font-semibold text-neutral-750 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                        >
                          <FiPlay className="w-3.5 h-3.5" />
                          Get it on Google Play
                        </a>
                      )}
                      {selectedProject.links?.github && (
                        <a
                          href={selectedProject.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 px-4 py-2 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 rounded-xl text-xs font-semibold text-neutral-750 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                        >
                          <FiGithub className="w-3.5 h-3.5" />
                          GitHub Code
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Column (Description, Features, Challenges) */}
                  <div className="md:col-span-2 flex flex-col gap-6 text-left">
                    {/* Main text */}
                    <div>
                      <h4 className="text-sm font-bold text-neutral-800 dark:text-neutral-200 mb-2">Project Overview</h4>
                      <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-450 leading-relaxed">
                        {selectedProject.details || selectedProject.description}
                      </p>
                    </div>

                    {/* Features list */}
                    {selectedProject.features && (
                      <div>
                        <h4 className="text-sm font-bold text-neutral-800 dark:text-neutral-200 mb-2 flex items-center gap-1.5">
                          <FiCpu className="text-blue-500" /> Key Features
                        </h4>
                        <ul className="list-disc pl-4 space-y-1 text-xs text-neutral-550 dark:text-neutral-450">
                          {selectedProject.features.map((feat, i) => (
                            <li key={i} className="leading-relaxed">{feat}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Challenges list */}
                    {selectedProject.challenges && (
                      <div className="p-4 rounded-xl border border-yellow-500/25 bg-yellow-500/5 text-yellow-600 dark:text-yellow-400">
                        <h4 className="text-sm font-bold mb-2 flex items-center gap-1.5">
                          <FiAlertTriangle /> Engineering Challenges & Solutions
                        </h4>
                        <ul className="list-disc pl-4 space-y-2 text-xs">
                          {selectedProject.challenges.map((chal, i) => (
                            <li key={i} className="leading-relaxed text-neutral-700 dark:text-neutral-300">
                              {chal}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tech Stack list */}
                    <div>
                      <h4 className="text-sm font-bold text-neutral-800 dark:text-neutral-200 mb-2">Complete Tech Stack</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.techStack.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-900 border border-neutral-250 dark:border-neutral-800 text-neutral-800 dark:text-neutral-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}

// Inline FiArrowRight definition for reliability
function FiArrowRight(props) {
  return (
    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className={props.className} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  );
}

export default FeaturedProjects;
