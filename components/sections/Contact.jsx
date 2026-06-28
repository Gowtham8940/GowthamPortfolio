"use client";

import React, { useState } from "react";
import { recruiterBriefData } from "@/lib/data/certifications";
import { FadeIn } from "../animations/FadeIn";
import { MagneticButton } from "../animations/MagneticButton";
import { FiMail, FiLinkedin, FiGithub, FiPhoneCall, FiMapPin, FiCopy, FiCheck } from "react-icons/fi";
import { SiMedium } from "react-icons/si";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(recruiterBriefData.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for browsers that block clipboard API
      const el = document.createElement("textarea");
      el.value = recruiterBriefData.email;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="contact" className="py-20 bg-neutral-50 dark:bg-neutral-950/20 transition-colors duration-300 relative">
      <div className="max-w-4xl mx-auto px-6">

        {/* Title */}
        <FadeIn delay={0.1} direction="up" className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Connect & Collaborate
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-3 max-w-xl mx-auto">
            Looking to hire or collaborate? Reach out directly via email or my social profiles below.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} direction="up">
          <div className="p-8 sm:p-12 rounded-3xl border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-black/40 backdrop-blur-sm text-center flex flex-col items-center gap-8">

            {/* Contact details */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full flex-wrap">

              {/* Email row with copy button */}
              <div className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60">
                <span className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg text-blue-500 shrink-0">
                  <FiMail className="w-4 h-4" />
                </span>
                <div className="text-left min-w-0">
                  <p className="text-[10px] uppercase font-bold text-neutral-400 dark:text-neutral-500 tracking-wider">Email</p>
                  <p className="text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-100 truncate">{recruiterBriefData.email}</p>
                </div>
                <button
                  onClick={handleCopyEmail}
                  title="Copy email"
                  className="ml-1 p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-all shrink-0"
                >
                  {copied ? <FiCheck className="w-3.5 h-3.5 text-emerald-500" /> : <FiCopy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <a
                href={`tel:${recruiterBriefData.phone}`}
                className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 hover:border-purple-400 dark:hover:border-purple-500 transition-all group"
              >
                <span className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg text-purple-500 group-hover:scale-110 transition-transform shrink-0">
                  <FiPhoneCall className="w-4 h-4" />
                </span>
                <div className="text-left">
                  <p className="text-[10px] uppercase font-bold text-neutral-400 dark:text-neutral-500 tracking-wider">Phone</p>
                  <p className="text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-100">{recruiterBriefData.phone}</p>
                </div>
              </a>

              <div className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60">
                <span className="p-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg text-emerald-500 shrink-0">
                  <FiMapPin className="w-4 h-4" />
                </span>
                <div className="text-left">
                  <p className="text-[10px] uppercase font-bold text-neutral-400 dark:text-neutral-500 tracking-wider">Location</p>
                  <p className="text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-100">{recruiterBriefData.location}</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full border-t border-neutral-200 dark:border-neutral-800" />

            {/* Social Badges */}
            <div className="flex flex-wrap gap-3 justify-center">
              <MagneticButton range={30}>
                <a
                  href={recruiterBriefData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
                >
                  <FiGithub className="w-4 h-4" /> GitHub
                </a>
              </MagneticButton>
              <MagneticButton range={30}>
                <a
                  href={recruiterBriefData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
                >
                  <FiLinkedin className="w-4 h-4" /> LinkedIn
                </a>
              </MagneticButton>
              <MagneticButton range={30}>
                <a
                  href="https://medium.com/@gowthamjaganthan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
                >
                  <SiMedium className="w-4 h-4" /> Medium
                </a>
              </MagneticButton>

            </div>

            {/* Copied toast */}
            {copied && (
              <p className="text-xs font-semibold text-emerald-500 animate-pulse">
                ✓ Email address copied to clipboard!
              </p>
            )}

          </div>
        </FadeIn>

      </div>
    </section>
  );
}
export default Contact;
