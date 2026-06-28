"use client";

import React, { useState } from "react";
import { youtubeVideosData } from "@/lib/data/certifications";
import { FadeIn } from "../animations/FadeIn";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FiYoutube, FiPlay, FiClock, FiEye } from "react-icons/fi";

export function YouTube() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section id="youtube" className="py-20 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <FadeIn delay={0.1} direction="up" className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight flex items-center justify-center gap-3">
            <svg className="w-8 h-8 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#FF0000"
                d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.002 3.002 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837z"
              />
              <polygon fill="#FFFFFF" points="9.545 8.568 9.545 15.432 15.545 12" />
            </svg>
            React Native Video Tutorials
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-3 max-w-xl mx-auto">
            Tutorials and coding challenges from my YouTube channel <strong className="text-neutral-900 dark:text-neutral-100">@learn_with_gowtham</strong>, focusing on performance, custom UI, and native bridge modules.
          </p>
        </FadeIn>
 
        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {youtubeVideosData.map((video, idx) => (
            <FadeIn key={video.id} delay={idx * 0.05} direction="up">
              <div
                onClick={() => setActiveVideo(video)}
                className="group rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-900 bg-neutral-50/50 dark:bg-neutral-950/20 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-neutral-350 dark:hover:border-neutral-800 hover:shadow-lg cursor-pointer"
              >
                {/* Thumbnail Container */}
                <div className="relative aspect-video bg-neutral-900 overflow-hidden flex items-center justify-center border-b border-neutral-200/50 dark:border-neutral-900/50">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Hover Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="p-3.5 rounded-full bg-red-600 text-white shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300">
                      <FiPlay className="w-5 h-5 fill-current" />
                    </span>
                  </div>
                  
                  {/* Static Play Icon on Mobile/Non-hover states */}
                  <span className="absolute bottom-2.5 left-2.5 p-1.5 rounded-full bg-black/60 text-white group-hover:hidden transition-all duration-300 z-10">
                    <FiPlay className="w-3 h-3 fill-current" />
                  </span>

                  
                  {/* Duration badge */}
                  <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/85 text-[10px] font-mono text-white font-semibold flex items-center gap-1">
                    <FiClock className="w-3 h-3" />
                    {video.duration}
                  </span>

                  {/* Category label */}
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-blue-500/90 text-[9px] font-semibold text-white uppercase tracking-wider">
                    {video.category}
                  </span>
                </div>

                {/* Details */}
                <div className="p-4 text-left">
                  <h3 className="text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200 line-clamp-2 leading-snug group-hover:text-blue-500 transition-colors">
                    {video.title}
                  </h3>
                  
                  {/* Metadata view stats */}
                  <div className="flex items-center gap-3 text-[10px] text-neutral-400 font-mono mt-3">
                    <span className="flex items-center gap-1">
                      <FiEye className="w-3 h-3" />
                      {video.views} views
                    </span>
                    <span>•</span>
                    <span>Youtube Tutorial</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Video Player Modal Dialog */}
        <Dialog open={!!activeVideo} onOpenChange={(open) => !open && setActiveVideo(null)}>
          <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-neutral-900 rounded-2xl shadow-2xl">
            {activeVideo && (
              <div className="aspect-video w-full">
                <iframe
                  width="100%"
                  height="100%"
                  src={activeVideo.embedUrl}
                  title={activeVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
export default YouTube;
