"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Particles } from "../animations/Particles";
import { MagneticButton } from "../animations/MagneticButton";
import { FadeIn } from "../animations/FadeIn";
import { FiDownload, FiArrowRight, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { recruiterBriefData } from "@/lib/data/certifications";

const liveApps = [
  { name: "MAAZTER", bg: "from-purple-600 to-indigo-700", color: "#8B5CF6", description: "Samacheer LMS Portal", icon: "/api/app-icon?platform=ios&appId=1606521457" },
  { name: "e-Khool LMS", bg: "from-blue-600 to-cyan-500", color: "#3B82F6", description: "Enterprise Offline LMS", icon: "/api/app-icon?platform=ios&appId=6740979534" },
  { name: "AAEB eSchool", bg: "from-orange-600 to-amber-500", color: "#F59E0B", description: "Accessibility A11y Portal", icon: "/api/app-icon?platform=android&appId=com.aaeb" },
  { name: "TVET eSchool", bg: "from-green-600 to-emerald-500", color: "#10B981", description: "Vocational Training Hub", icon: "/api/app-icon?platform=android&appId=com.tvetcollege" },
  { name: "Suya Mobiles", bg: "from-red-600 to-rose-500", color: "#F43F5E", description: "Mobile Repair Shop E-comm", icon: "/api/app-icon?platform=android&appId=com.mobifix" },
  { name: "Uniliv Learn", bg: "from-teal-600 to-cyan-700", color: "#0D9488", description: "Student Accommodation Hub", icon: "/api/app-icon?platform=android&appId=com.uniliv" },
  { name: "Magic Billion", bg: "from-violet-600 to-fuchsia-600", color: "#8B5CF6", description: "Ausbildung Training System", icon: "/api/app-icon?platform=android&appId=com.magicbillion" }
];


const metroLogs = [
  "i Connecting to Metro Bundler on port 8081...",
  "i Reading bundle description from cache...",
  "i Compiling JS bundle for platform: Android (Hermes active)",
  "✓ JS bundle compiled successfully in 1240ms",
  "i Executing Native Modules startup hook...",
  "i Loading WatermelonDB sync adapter...",
  "✓ App mounted. Frame rate: 60.0 FPS"
];

export function Hero() {
  const [currentAppIdx, setCurrentAppIdx] = useState(0);
  const [activeLogIdx, setActiveLogIdx] = useState(0);
  const [refreshLog, setRefreshLog] = useState(false);

  // Cycle apps inside the phone mockup every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAppIdx((prev) => (prev + 1) % liveApps.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  // Metro bundler log animation simulation
  useEffect(() => {
    const logTimer = setInterval(() => {
      setActiveLogIdx((prev) => {
        if (prev === metroLogs.length - 1) {
          // Restart loop after delay
          clearInterval(logTimer);
          setTimeout(() => {
            setActiveLogIdx(0);
            setRefreshLog((r) => !r);
          }, 4000);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);
    return () => clearInterval(logTimer);
  }, [refreshLog]);

  const activeApp = liveApps[currentAppIdx];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 md:py-32"
    >
      {/* Background Particles & Grid */}
      <Particles quantity={65} className="absolute inset-0 z-0" />
      <div className="absolute inset-0 grid-bg-pattern z-0 opacity-40 dark:opacity-20 pointer-events-none" />

      {/* Visual background gradient blobs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[500px] h-[350px] md:h-[500px] rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] md:w-[550px] h-[350px] md:h-[550px] rounded-full bg-purple-500/10 dark:bg-purple-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10 w-full">
        {/* Left Content Column */}
        <div className="lg:col-span-7 flex flex-col items-start text-left gap-6">
          {/* Badge */}
          <FadeIn delay={0.1} direction="up">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Available for immediate hires (15 Days Notice)
            </span>
          </FadeIn>

          {/* Heading */}
          <FadeIn delay={0.2} direction="up">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
              Crafting High-Performance <br />
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                React Native Apps
              </span>
            </h1>
          </FadeIn>

          {/* Subtitle */}
          <FadeIn delay={0.3} direction="up">
            <p className="text-md sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-xl leading-relaxed">
              I am <strong className="text-neutral-900 dark:text-neutral-100">Gowtham</strong>, a Mobile Engineer & Team Lead with <span className="font-semibold text-neutral-900 dark:text-neutral-100">3.7+ years of experience</span>. I build fluid, offline-first iOS, Android, Web, TV, and Desktop solutions at scale, optimized for 60 FPS performance and native bridging.
            </p>
          </FadeIn>

          {/* Call to Actions */}
          <FadeIn delay={0.4} direction="up" className="flex flex-wrap items-center gap-4 w-full">
            <MagneticButton>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-semibold rounded-xl text-sm transition-all shadow-lg shadow-neutral-900/10 dark:shadow-neutral-100/5 group"
              >
                View My Projects
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>
            </MagneticButton>

            <MagneticButton>
              <a
                href="/resume/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-300 dark:border-neutral-800 bg-white/50 dark:bg-neutral-950/50 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-700 dark:text-neutral-300 font-semibold rounded-xl text-sm transition-all"
              >
                <FiDownload />
                Download Resume
              </a>
            </MagneticButton>
          </FadeIn>

          {/* Social Links */}
          <FadeIn delay={0.5} direction="up" className="flex items-center gap-4 text-neutral-500 dark:text-neutral-400 mt-2">
            <a
              href={recruiterBriefData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 rounded-lg hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              aria-label="GitHub Profile"
            >
              <FiGithub className="w-5 h-5" />
            </a>
            <a
              href={recruiterBriefData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 rounded-lg hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <FiLinkedin className="w-5 h-5" />
            </a>
            <a
              href="#contact"
              className="p-2 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 rounded-lg hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              aria-label="Contact Gowtham"
            >
              <FiMail className="w-5 h-5" />
            </a>
          </FadeIn>

          {/* Metro Logs Simulation Panel */}
          <FadeIn delay={0.6} direction="up" className="w-full max-w-lg mt-6">
            <div className="rounded-xl border border-neutral-200 dark:border-neutral-900 bg-neutral-50/50 dark:bg-black/50 backdrop-blur-md p-4 font-mono text-[11px] text-neutral-600 dark:text-neutral-400 shadow-md">
              <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-900 pb-2 mb-2 text-neutral-400">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="ml-2 font-semibold">METRO BUNDLER v0.81.0</span>
              </div>
              <div className="flex flex-col gap-1 min-h-[105px]">
                {metroLogs.slice(0, activeLogIdx + 1).map((log, idx) => (
                  <p
                    key={idx}
                    className={
                      log.startsWith("✓")
                        ? "text-emerald-600 dark:text-emerald-400"
                        : log.startsWith("i")
                          ? "text-neutral-500"
                          : "text-neutral-800 dark:text-neutral-200"
                    }
                  >
                    {log}
                  </p>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Right Rotating Phone Column */}
        <div className="lg:col-span-5 flex items-center justify-center relative min-h-[480px]">
          {/* Tag Floating Elements */}
          <div className="absolute top-12 left-10 p-2.5 glassmorphism rounded-xl border border-neutral-200 dark:border-neutral-900 font-mono text-[10px] text-blue-500 animate-float">
            &lt;View style=&#123;styles.container&#125;&gt;
          </div>
          <div className="absolute bottom-16 right-10 p-2.5 glassmorphism rounded-xl border border-neutral-200 dark:border-neutral-900 font-mono text-[10px] text-purple-500 animate-float" style={{ animationDelay: "2s" }}>
            const scrollY = useSharedValue(0);
          </div>
          <div className="absolute top-1/2 right-4 p-2 glassmorphism rounded-lg border border-neutral-200 dark:border-neutral-900 font-mono text-[9px] text-emerald-500 animate-float" style={{ animationDelay: "4s" }}>
            Hermes Engine Active
          </div>

          {/* 3D-Like Phone Mockup container */}
          <div className="relative w-[240px] h-[480px] group [perspective:1000px]">
            <motion.div
              animate={{ rotateY: [0, 15, 0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
              className="w-full h-full rounded-[40px] p-2 bg-neutral-900 dark:bg-neutral-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border-[6px] border-neutral-950 dark:border-neutral-900 flex flex-col relative overflow-hidden [transform-style:preserve-3d]"
            >
              {/* Camera Notch */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-5 rounded-full bg-neutral-950 z-20 flex items-center justify-end px-4">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-900/60" />
              </div>

              {/* Dynamic screen display */}
              <div className="w-full h-full rounded-[30px] overflow-hidden flex flex-col items-center justify-center relative bg-black">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeApp.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    className={`absolute inset-0 bg-gradient-to-br ${activeApp.bg} p-6 flex flex-col justify-between`}
                  >
                    {/* Top Status */}
                    <div className="flex justify-between items-center text-[10px] text-white/70 font-mono mt-1">
                      <span>9:41</span>
                      <span className="text-[8px] border border-white/30 px-1 rounded-sm">60 FPS</span>
                    </div>

                    {/* App Display Center */}
                    <div className="flex flex-col items-center justify-center text-center gap-3 py-16 flex-grow">
                      {/* App Icon Mock */}
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-md shadow-black/25 shrink-0">
                        {activeApp.icon ? (
                          <img
                            src={activeApp.icon}
                            alt={`${activeApp.name} icon`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "flex";
                            }}
                          />
                        ) : null}
                        <div
                          className="absolute inset-0 flex items-center justify-center text-2xl font-black text-white"
                          style={{ display: activeApp.icon ? "none" : "flex" }}
                        >
                          {activeApp.name.charAt(0)}
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-xl font-bold tracking-tight text-white">{activeApp.name}</span>
                        <span className="text-[10px] text-white/70 mt-1">{activeApp.description}</span>
                      </div>
                    </div>


                    {/* Bottom Status bar */}
                    <div className="flex flex-col items-center gap-2 pb-1">
                      <div className="w-20 h-1.5 rounded-full bg-white/25 border border-white/10 flex items-center px-0.5">
                        <motion.div
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 3.5, ease: "linear" }}
                          className="h-full bg-white rounded-full"
                        />
                      </div>
                      <span className="text-[8px] text-white/50 font-mono tracking-wider">SWIPING APPS</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Dynamic light reflections on phone bevel */}
              <div className="absolute inset-0 rounded-[35px] border border-white/15 pointer-events-none z-10" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Hero;
