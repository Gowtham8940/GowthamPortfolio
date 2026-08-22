"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "next-themes";
import { gsap } from "gsap";

/**
 * Full-screen "solar system" day/night warp.
 *
 * Whenever the resolved theme flips, an overlay sweeps the whole viewport: the
 * outgoing celestial body sets below the horizon while the incoming one rises in
 * an arc, the sky gradient morphs, and the starfield fades in/out.
 *
 * Rendered through a portal to <body> with an inline max z-index so it always
 * paints above every section AND escapes Lenis's transformed scroll wrapper
 * (a plain fixed child gets trapped as z-index:auto and hides behind content).
 * The overlay reads the *destination* theme's CSS sky vars — next-themes toggles
 * the `.dark` class synchronously — so it previews where we're heading.
 */
export function ThemeTransition() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const prevTheme = useRef(null);
  const overlayRef = useRef(null);
  const sunRef = useRef(null);
  const moonRef = useRef(null);
  const starsRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || !resolvedTheme) return;

    // Skip the first resolve (initial load) — only animate genuine flips.
    if (prevTheme.current === null) {
      prevTheme.current = resolvedTheme;
      return;
    }
    if (prevTheme.current === resolvedTheme) return;

    const toDark = resolvedTheme === "dark";
    prevTheme.current = resolvedTheme;

    const overlay = overlayRef.current;
    const rising = toDark ? moonRef.current : sunRef.current; // NEW theme's body
    const setting = toDark ? sunRef.current : moonRef.current; // OLD theme's body
    if (!overlay || !rising || !setting) return;

    tlRef.current?.kill();

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      gsap.set(overlay, { display: "block" });
      gsap.fromTo(
        overlay,
        { opacity: 0 },
        { opacity: 0.92, duration: 0.25, yoyo: true, repeat: 1, onComplete: () => gsap.set(overlay, { display: "none" }) }
      );
      return;
    }

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const arc = Math.min(vh * 0.3, 240);

    const tl = gsap.timeline();
    tlRef.current = tl;

    gsap.set(overlay, { opacity: 0, display: "block" });
    gsap.set(starsRef.current, { opacity: toDark ? 0 : 1 });
    gsap.set(rising, { xPercent: -50, yPercent: -50, x: -vw * 0.3, y: arc + 160, opacity: 0, scale: 0.7 });
    gsap.set(setting, { xPercent: -50, yPercent: -50, x: 0, y: -arc, opacity: 1, scale: 1 });

    tl
      .to(overlay, { opacity: 1, duration: 0.5, ease: "power2.out" }, 0)
      .to(setting, { x: vw * 0.3, y: arc + 180, opacity: 0, scale: 0.65, duration: 1.2, ease: "power1.in" }, 0.15)
      .to(rising, { opacity: 1, duration: 0.45, ease: "power1.out" }, 0.4)
      .to(rising, { x: 0, y: -arc, scale: 1, duration: 1.15, ease: "power2.out" }, 0.45)
      .to(starsRef.current, { opacity: toDark ? 1 : 0, duration: 1, ease: "power1.inOut" }, 0.35)
      .to(overlay, { opacity: 0, duration: 0.65, ease: "power2.inOut" }, "+=0.25")
      .set(overlay, { display: "none" });

    return () => tl.kill();
  }, [resolvedTheme, mounted]);

  if (!mounted) return null;

  return createPortal(
    <div
      ref={overlayRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2147483000,
        pointerEvents: "none",
        overflow: "hidden",
        display: "none",
        opacity: 0,
      }}
    >
      <div className="theme-warp__sky" />
      <div ref={starsRef} className="theme-warp__stars" />
      {/* Horizon glow */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: "38%",
          height: "40%",
          background: "radial-gradient(ellipse at 50% 100%, var(--celestial-glow), transparent 70%)",
          opacity: 0.5,
        }}
      />
      <div ref={sunRef} className="theme-warp__celestial theme-warp__sun" style={{ animation: "celestial-pulse 3s ease-in-out infinite" }} />
      <div ref={moonRef} className="theme-warp__celestial theme-warp__moon" style={{ animation: "celestial-pulse 4s ease-in-out infinite" }} />
    </div>,
    document.body
  );
}

export default ThemeTransition;
