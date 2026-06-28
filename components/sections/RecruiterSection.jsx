"use client";

import React, { useState } from "react";
import { recruiterBriefData } from "@/lib/data/certifications";
import { FadeIn } from "../animations/FadeIn";
import { FiBriefcase, FiDownload, FiCheck, FiMail } from "react-icons/fi";

export function RecruiterSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(recruiterBriefData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="recruiter" className="py-16 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6">
        <FadeIn delay={0.1} direction="up">
          <div className="rounded-3xl border border-dashed border-neutral-350 dark:border-neutral-800 bg-neutral-50/20 dark:bg-neutral-950/10 p-6 sm:p-8 text-left">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200/60 dark:border-neutral-900/60 pb-6 mb-6">
              <div className="flex items-center gap-3">
                <span className="p-3 bg-blue-500/10 text-blue-500 rounded-2xl">
                  <FiBriefcase className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-neutral-850 dark:text-neutral-100">
                    Recruiter Quick-Info Panel
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Essential hire details, notice timelines, and downloadable ATS-optimized CV files.
                  </p>
                </div>
              </div>

              {/* Download ATS resume button */}
              <a
                href="/resume/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4.5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-md w-full sm:w-fit cursor-pointer"
              >
                <FiDownload /> Download ATS Resume
              </a>
            </div>

            {/* Recruiter Specs Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs sm:text-sm">
              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Notice Period</span>
                <p className="font-bold text-neutral-800 dark:text-neutral-200 mt-1">{recruiterBriefData.availability}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Target Role</span>
                <p className="font-bold text-neutral-800 dark:text-neutral-200 mt-1">{recruiterBriefData.currentRole}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Expected CTC</span>
                <p className="font-bold text-neutral-800 dark:text-neutral-200 mt-1">{recruiterBriefData.expectedCtc}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Relocation</span>
                <p className="font-bold text-neutral-800 dark:text-neutral-200 mt-1">{recruiterBriefData.relocation}</p>
              </div>
            </div>

            {/* Email copying action */}
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-850 p-4 rounded-2xl mt-8 text-xs">
              <span className="text-neutral-500 font-medium text-center sm:text-left flex-grow">
                Interested in scheduling a technical interview? Copy my contact email directly or send me a message:
              </span>
              <div className="flex items-center gap-2 w-full sm:w-fit">
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center justify-center gap-1.5 px-4 py-2 border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-black rounded-xl text-neutral-700 dark:text-neutral-300 font-bold transition-all w-full sm:w-fit cursor-pointer"
                >
                  {copied ? (
                    <>
                      <FiCheck className="text-emerald-500 animate-pulse" />
                      Email Copied!
                    </>
                  ) : (
                    <>
                      Copy Email Address
                    </>
                  )}
                </button>
                
                <a
                  href={`mailto:${recruiterBriefData.email}`}
                  className="p-2 border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-black hover:bg-neutral-50 rounded-xl text-neutral-600 hover:text-blue-500 flex items-center justify-center cursor-pointer shrink-0"
                  aria-label="Direct Email"
                >
                  <FiMail className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  );
}
export default RecruiterSection;
