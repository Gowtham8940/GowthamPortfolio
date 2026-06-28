"use client";

import React from "react";
import { FiGithub, FiLinkedin, FiYoutube, FiMail } from "react-icons/fi";
import { recruiterBriefData } from "@/lib/data/certifications";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/30 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Branding */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="text-md font-bold tracking-tight text-neutral-800 dark:text-neutral-200">
            Gowtham | Senior React Native Developer
          </span>
          <span className="text-xs text-neutral-500">
            Building 60FPS high performance mobile applications.
          </span>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-5">
          <a
            href={recruiterBriefData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            aria-label="GitHub"
          >
            <FiGithub className="w-4 h-4" />
          </a>
          <a
            href={recruiterBriefData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            aria-label="LinkedIn"
          >
            <FiLinkedin className="w-4 h-4" />
          </a>
          <a
            href="https://www.youtube.com/@learn_with_gowtham"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            aria-label="YouTube"
          >
            <FiYoutube className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${recruiterBriefData.email}`}
            className="p-2.5 rounded-full border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            aria-label="Email"
          >
            <FiMail className="w-4 h-4" />
          </a>
        </div>

        {/* Copy */}
        <div className="text-xs text-neutral-400 dark:text-neutral-600 font-mono text-center md:text-right">
          <p>© {currentYear} Gowtham. All rights reserved.</p>
          <p className="mt-1">Built with Next.js 15, Tailwind v4 & Motion.</p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
