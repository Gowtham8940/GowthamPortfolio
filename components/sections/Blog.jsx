"use client";

import React from "react";
import { mediumBlogsData } from "@/lib/data/certifications";
import { useFeed } from "@/lib/hooks/useFeed";
import { FadeIn } from "../animations/FadeIn";
import { FiBookOpen, FiArrowUpRight, FiClock } from "react-icons/fi";
import { SiMedium } from "react-icons/si";

export function Blog() {
  const { data: mediumBlogs, meta } = useFeed("/api/feeds/medium", "posts", mediumBlogsData);
  const isLive = meta.source === "live";

  return (
    <section id="blog" className="py-14 sm:py-20 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <FadeIn delay={0.1} direction="up" className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight flex items-center justify-center gap-3">
            <FiBookOpen className="text-purple-500" />
            Medium Technical Articles
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-3 max-w-xl mx-auto">
            Deep dives into mobile systems architecture, native bridges optimization, and React Native New Architecture upgrades.
          </p>
          {isLive && (
            <span className="inline-flex items-center gap-1.5 mt-4 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live from Medium
            </span>
          )}
          <a
            href="https://medium.com/@gowthamjaganthan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-purple-500 hover:text-purple-650 dark:hover:text-purple-400 font-bold mt-4 transition-colors"
          >
            View Medium Profile <FiArrowUpRight className="w-4.5 h-4.5" />
          </a>
        </FadeIn>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mediumBlogs.map((blog, idx) => (
            <FadeIn key={blog.id} delay={idx * 0.1} direction="up">
              <div
                onClick={() => window.open(blog.link, "_blank")}
                className="group rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-900 bg-neutral-50/50 dark:bg-neutral-950/20 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-neutral-350 dark:hover:border-neutral-800 hover:shadow-lg cursor-pointer flex flex-col h-full min-h-[300px] text-left"
              >
                {/* Cover image (or gradient fallback) */}
                <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-purple-500/20 via-fuchsia-500/15 to-indigo-500/20 border-b border-neutral-200/50 dark:border-neutral-900/50">
                  {blog.image ? (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <SiMedium className="w-10 h-10 text-purple-500/50" />
                    </div>
                  )}
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-sm text-[9px] font-semibold text-white uppercase tracking-wider">
                    {blog.category}
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                    <FiClock className="w-3 h-3" /> {blog.readTime}
                  </div>

                  {/* Title */}
                  <h3 className="text-sm sm:text-base font-bold text-neutral-800 dark:text-neutral-250 mt-2 group-hover:text-purple-500 transition-colors leading-snug">
                    {blog.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                    {blog.description}
                  </p>

                  {/* Footer link */}
                  <div className="flex items-center justify-between mt-auto pt-4 text-xs font-semibold text-neutral-400 group-hover:text-purple-500 transition-colors">
                    <span>{blog.date}</span>
                    <span className="flex items-center gap-0.5">
                      Read Article
                      <FiArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Blog;
