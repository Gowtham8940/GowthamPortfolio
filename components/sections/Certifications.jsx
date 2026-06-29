"use client";

import React, { useState } from "react";
import { certificationsData } from "@/lib/data/certifications";
import { FadeIn } from "../animations/FadeIn";
import { FiAward, FiShield } from "react-icons/fi";
import { FaAws } from "react-icons/fa";

const getIssuerLogo = (cert) => {
  const title = cert.title.toLowerCase();
  const issuer = cert.issuer.toLowerCase();
  if (title.includes("react native") || title.includes("reactnative")) {
    return (
      <svg className="w-5 h-5 text-[#61dafb] fill-none stroke-current animate-pulse" viewBox="0 0 24 24" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
        <ellipse rx="10" ry="4" transform="translate(12 12) rotate(0)" />
        <ellipse rx="10" ry="4" transform="translate(12 12) rotate(60)" />
        <ellipse rx="10" ry="4" transform="translate(12 12) rotate(120)" />
        <circle cx="12" cy="12" r="1.5" fill="#61dafb" />
      </svg>
    );
  }
  if (issuer.includes("apple")) {
    return (
      <svg className="w-5 h-5 fill-current text-black dark:text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.2.67-2.92 1.49-.62.7-1.16 1.84-1.01 2.96 1.12.09 2.26-.57 2.94-1.39z" />
      </svg>
    );
  }
  if (issuer.includes("google")) {
    return (
      <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        />
      </svg>
    );
  }
  if (issuer.includes("amazon") || issuer.includes("aws")) {
    return <FaAws className="w-6 h-6 text-[#ff9900] fill-current" />;
  }
  if (issuer.includes("udemy")) {
    return (
      <svg className="w-5 h-5 fill-current text-[#a435f0]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3L3.5 9h5v6h7V9h5L12 3zm-2.5 14h5v4h-5v-4z" />
      </svg>
    );
  }
  return <FiAward className="w-5 h-5 text-blue-500" />;
};

export function Certifications() {
  const [flippedCard, setFlippedCard] = useState(null);

  return (
    <section id="certifications" className="py-20 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6">
        {/* Title */}
        <FadeIn delay={0.1} direction="up" className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Licenses & Certifications
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-3 max-w-xl mx-auto">
            Click on any credential badge card to flip and view the verification keys and course curriculum details.
          </p>
        </FadeIn>

        {/* Certs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificationsData.map((cert) => {
            const isFlipped = flippedCard === cert.id;

            return (
              <FadeIn key={cert.id} delay={0.05} direction="up" className="h-[240px] [perspective:1000px]">
                <div
                  onClick={() => setFlippedCard(isFlipped ? null : cert.id)}
                  className="relative w-full h-full text-left transition-transform duration-500 [transform-style:preserve-3d] cursor-pointer"
                  style={{
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
                  }}
                >

                  {/* Front Side Card */}
                  <div className="absolute inset-0 w-full h-full p-5 rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-neutral-50/50 dark:bg-neutral-950/20 backdrop-blur-sm [backface-visibility:hidden] flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-850">
                    <div>
                      <span className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 inline-block mb-4">
                        {getIssuerLogo(cert)}
                      </span>
                      <h3 className="text-xs sm:text-sm font-bold text-neutral-850 dark:text-neutral-100 leading-snug line-clamp-2">
                        {cert.title}
                      </h3>
                      <p className="text-[10px] font-semibold text-neutral-400 mt-1">
                        Issuer: {cert.issuer}
                      </p>
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 border-t border-neutral-100 dark:border-neutral-900/60 pt-3">
                      <span>Issued: {cert.date}</span>
                      <span className="text-blue-500 font-bold uppercase tracking-wider text-[9px]">Flip Info</span>
                    </div>
                  </div>

                  {/* Back Side Card (rotated 180 deg) */}
                  <div
                    className="absolute inset-0 w-full h-full p-5 rounded-2xl border border-neutral-200 dark:border-neutral-905 bg-neutral-900 text-neutral-200 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                        <FiShield /> Verify Credentials
                      </div>
                      <p className="text-[11px] text-neutral-350 leading-relaxed mt-3 line-clamp-4">
                        {cert.description}
                      </p>
                      <p className="text-[10px] font-mono text-neutral-450 mt-2">
                        ID: {cert.credentialId}
                      </p>
                    </div>

                    <div className="flex justify-between items-center text-[10px] border-t border-neutral-800 pt-3">
                      <span className="text-neutral-400">Back</span>
                    </div>
                  </div>

                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default Certifications;
