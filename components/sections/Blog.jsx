"use client";

import React from "react";
import { mediumBlogsData } from "@/lib/data/certifications";
import { FadeIn } from "../animations/FadeIn";
import { FiBookOpen, FiArrowUpRight, FiClock } from "react-icons/fi";

export function Blog() {
  return (
    <section id="blog" className="py-20 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <FadeIn delay={0.1} direction="up" className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight flex items-center justify-center gap-3">
            <FiBookOpen className="text-blue-500" />
            Medium Technical Articles
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-3 max-w-xl mx-auto">
            Deep dives into mobile systems architecture, native bridges optimization, and React Native New Architecture upgrades.
          </p>
          <a
            href="https://medium.com/@gowthamjaganthan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-blue-500 hover:text-blue-650 dark:hover:text-blue-400 font-bold mt-4 transition-colors"
          >
            View Medium Profile <FiArrowUpRight className="w-4.5 h-4.5" />
          </a>
        </FadeIn>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mediumBlogsData.map((blog, idx) => (
            <FadeIn key={blog.id} delay={idx * 0.1} direction="up">
              <div
                onClick={() => window.open(blog.link, "_blank")}
                className="group p-6 rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-neutral-50/50 dark:bg-neutral-950/20 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-neutral-350 dark:hover:border-neutral-800 hover:shadow-lg cursor-pointer flex flex-col justify-between h-full min-h-[260px] text-left"
              >
                <div>
                  {/* Category & Date */}
                  <div className="flex justify-between items-center text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                    <span>{blog.category}</span>
                    <span className="flex items-center gap-1">
                      <FiClock />
                      {blog.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm sm:text-base font-bold text-neutral-800 dark:text-neutral-250 mt-3 group-hover:text-blue-500 transition-colors leading-snug">
                    {blog.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-2 line-clamp-3 leading-relaxed">
                    {blog.description}
                  </p>
                </div>

                {/* Footer link */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-900/60 text-xs font-semibold text-neutral-400 group-hover:text-blue-500 transition-colors">
                  <span>{blog.date}</span>
                  <span className="flex items-center gap-0.5">
                    Read Article
                    <FiArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
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
