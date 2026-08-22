"use client";

import React, { useState } from "react";
import { certificationsData } from "@/lib/data/certifications";
import { FadeIn } from "../animations/FadeIn";
import { FiAward, FiShield, FiExternalLink } from "react-icons/fi";
import { FaReact, FaApple, FaAws, FaGooglePlay, FaAndroid } from "react-icons/fa";
import { SiUdemy, SiMeta } from "react-icons/si";

/**
 * Resolve a real, brand-accurate issuer logo (official mark + brand colour) for
 * each credential, so the badges read as genuine issuer branding rather than a
 * generic award icon.
 */
const getIssuerBrand = (cert) => {
  const title = cert.title.toLowerCase();
  const issuer = cert.issuer.toLowerCase();

  if (title.includes("react native") || title.includes("react")) {
    return { Icon: FaReact, color: "#61dafb", spin: true };
  }
  if (issuer.includes("apple")) {
    return { Icon: FaApple, color: "#ffffff", darkText: true };
  }
  if (issuer.includes("amazon") || issuer.includes("aws")) {
    return { Icon: FaAws, color: "#ff9900" };
  }
  if (issuer.includes("udemy")) {
    return { Icon: SiUdemy, color: "#a435f0" };
  }
  if (issuer.includes("meta")) {
    return { Icon: SiMeta, color: "#0866ff" };
  }
  if (title.includes("play") || issuer.includes("play")) {
    return { Icon: FaGooglePlay, color: "#00c4ffff" };
  }
  if (issuer.includes("google") || title.includes("android")) {
    return { Icon: FaAndroid, color: "#3ddc84" };
  }
  return { Icon: FiAward, color: "#a855f7" };
};

export function Certifications() {
  const [flippedCard, setFlippedCard] = useState(null);

  return (
    <section id="certifications" className="py-14 sm:py-20 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6">
        {/* Title */}
        <FadeIn delay={0.1} direction="up" className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Licenses &amp; Certifications</h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-3 max-w-xl mx-auto">
            Official credentials from the platforms below. Click a badge to flip it and verify the credential.
          </p>
        </FadeIn>

        {/* Certs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificationsData.map((cert) => {
            const isFlipped = flippedCard === cert.id;
            const { Icon, color, spin, darkText } = getIssuerBrand(cert);

            return (
              <FadeIn key={cert.id} delay={0.05} direction="up" className="h-[240px] [perspective:1000px]">
                <div
                  onClick={() => setFlippedCard(isFlipped ? null : cert.id)}
                  className="relative w-full h-full text-left transition-transform duration-500 [transform-style:preserve-3d] cursor-pointer"
                  style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
                >
                  {/* Front Side Card */}
                  <div className="absolute inset-0 w-full h-full p-5 rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-neutral-50/50 dark:bg-neutral-950/20 backdrop-blur-sm [backface-visibility:hidden] flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-850">
                    {/* Brand accent glow */}
                    <div
                      className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-30 pointer-events-none"
                      style={{ backgroundColor: color }}
                    />
                    <div className="relative">
                      <span
                        className="inline-grid place-items-center w-12 h-12 rounded-xl mb-4 shadow-sm"
                        style={{
                          backgroundColor: `${color}1f`,
                          border: `1px solid ${color}40`,
                        }}
                      >
                        <Icon
                          className={`w-6 h-6 ${spin ? "animate-[orbit-spin_8s_linear_infinite]" : ""} ${
                            darkText ? "text-neutral-900 dark:text-white" : ""
                          }`}
                          style={darkText ? undefined : { color }}
                        />
                      </span>
                      <h3 className="text-xs sm:text-sm font-bold text-neutral-850 dark:text-neutral-100 leading-snug line-clamp-2">
                        {cert.title}
                      </h3>
                      <p className="text-[10px] font-semibold text-neutral-400 mt-1">Issuer: {cert.issuer}</p>
                    </div>

                    <div className="relative flex justify-between items-center text-[10px] font-mono text-neutral-400 border-t border-neutral-100 dark:border-neutral-900/60 pt-3">
                      <span>Issued: {cert.date}</span>
                      <span className="font-bold uppercase tracking-wider text-[9px]" style={{ color }}>
                        Flip Info
                      </span>
                    </div>
                  </div>

                  {/* Back Side Card */}
                  <div className="absolute inset-0 w-full h-full p-5 rounded-2xl border border-neutral-800 bg-neutral-900 text-neutral-200 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                        <FiShield style={{ color }} /> Verify Credentials
                      </div>
                      <p className="text-[11px] text-neutral-350 leading-relaxed mt-3 line-clamp-4">{cert.description}</p>
                      <p className="text-[10px] font-mono text-neutral-450 mt-2">ID: {cert.credentialId}</p>
                    </div>

                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center justify-center gap-1.5 text-[11px] font-bold rounded-lg py-2 mt-2 transition-transform hover:scale-[1.02]"
                      style={{ backgroundColor: `${color}26`, color, border: `1px solid ${color}55` }}
                    >
                      Verify Credential <FiExternalLink className="w-3.5 h-3.5" />
                    </a>
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
