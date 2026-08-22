"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "next-themes";
import { gsap } from "gsap";

/**
 * Full-screen "solar system" day/night warp.
 *
 * On every theme flip an overlay sweeps the viewport: the outgoing celestial
 * body sets below the horizon while the incoming one rises in an arc, the sky
 * gradient morphs, stars cross-fade, and a themed message fades in.
 *
 * Rendered through a portal to <body> with an inline max z-index so it always
 * paints above every section AND escapes Lenis's transformed scroll wrapper
 * (a plain fixed child gets trapped at z-index:auto and hides behind content).
 * The overlay reads the *destination* theme's CSS sky vars — next-themes toggles
 * the `.dark` class synchronously — so it previews where we're heading.
 */
const MESSAGES = {
  dark: {
    title: "You're the OG developer who chose dark mode",
    sub: "🌙 Respect. This is where the real code gets written.",
  },
  light: {
    title: "Let there be light",
    sub: "☀️ Bright mode for bright ideas — welcome to the day side.",
  },
};

export function ThemeTransition() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const prevTheme = useRef(null);
  const overlayRef = useRef(null);
  const sunRef = useRef(null);
  const moonRef = useRef(null);
  const starsRef = useRef(null);
  const textRef = useRef(null);
  const titleRef = useRef(null);
  const subRef = useRef(null);
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

    // Set the themed message for this direction.
    const msg = toDark ? MESSAGES.dark : MESSAGES.light;
    if (titleRef.current) titleRef.current.textContent = msg.title;
    if (subRef.current) subRef.current.textContent = msg.sub;

    tlRef.current?.kill();

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      gsap.set(overlay, { display: "block" });
      gsap.set([sunRef.current, moonRef.current], { opacity: 0 });
      gsap.set(rising, { xPercent: -50, yPercent: -50, x: 0, y: 0, opacity: 1, scale: 1 });
      gsap.set(textRef.current, { opacity: 1, y: 0 });
      gsap.fromTo(
        overlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, yoyo: true, repeat: 1, repeatDelay: 0.6, onComplete: () => gsap.set(overlay, { display: "none" }) }
      );
      return;
    }

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const arc = Math.min(vh * 0.28, 230);

    const tl = gsap.timeline();
    tlRef.current = tl;

    gsap.set(overlay, { opacity: 0, display: "block" });
    gsap.set(starsRef.current, { opacity: toDark ? 0 : 1 });
    gsap.set(textRef.current, { opacity: 0, y: 18 });
    gsap.set(rising, { xPercent: -50, yPercent: -50, x: -vw * 0.28, y: arc + 170, opacity: 0, scale: 0.7 });
    gsap.set(setting, { xPercent: -50, yPercent: -50, x: 0, y: -arc, opacity: 1, scale: 1 });

    tl
      .to(overlay, { opacity: 1, duration: 0.5, ease: "power2.out" }, 0)
      // Outgoing body arcs down and sets.
      .to(setting, { x: vw * 0.28, y: arc + 190, opacity: 0, scale: 0.62, duration: 1.25, ease: "power1.in" }, 0.15)
      // Incoming body rises from the horizon to the crown.
      .to(rising, { opacity: 1, duration: 0.5, ease: "power1.out" }, 0.45)
      .to(rising, { x: 0, y: -arc, scale: 1, duration: 1.25, ease: "power2.out" }, 0.5)
      // Stars cross-fade with the sky.
      .to(starsRef.current, { opacity: toDark ? 1 : 0, duration: 1.1, ease: "power1.inOut" }, 0.35)
      // Themed message rises and fades in.
      .to(textRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.85)
      // Hold, then reveal the freshly themed app.
      .to([textRef.current, overlay], { opacity: 0, duration: 0.7, ease: "power2.inOut" }, "+=0.7")
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
          bottom: "34%",
          height: "42%",
          background: "radial-gradient(ellipse at 50% 100%, var(--celestial-glow), transparent 70%)",
          opacity: 0.45,
        }}
      />
      <div ref={sunRef} className="theme-warp__celestial theme-warp__sun" />
      <div ref={moonRef} className="theme-warp__celestial theme-warp__moon" />
      <div ref={textRef} className="theme-warp__text">
        <h2 ref={titleRef} />
        <p ref={subRef} />
      </div>
    </div>,
    document.body
  );
}

export default ThemeTransition;
