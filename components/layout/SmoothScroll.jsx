"use client";

import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

// Keep GSAP ScrollTrigger in step with Lenis' smoothed scroll position.
function ScrollTriggerSync() {
  useLenis(() => ScrollTrigger.update());
  return null;
}

// In-page links (#work, #contact…): smooth-scroll there, then re-check the
// landing spot — lazy images and pinned sections can move the target while
// the scroll is running, so correct once more if it drifted.
function AnchorLinks() {
  const lenis = useLenis();
  useEffect(() => {
    if (!lenis) return;
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const id = a.getAttribute("href").slice(1);
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      e.preventDefault();
      // Sections set scroll-margin-top (room for the floating nav); Lenis honours it.
      const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
      const land = (tries) =>
        lenis.scrollTo(target, {
          duration: tries ? 0.5 : 1.2,
          onComplete: () => {
            const drift = target.getBoundingClientRect().top - margin;
            if (Math.abs(drift) > 4 && tries < 2) land(tries + 1);
          },
        });
      land(0);
      history.replaceState(null, "", `#${id}`);
      target.focus?.({ preventScroll: true });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis]);
  return null;
}

export function SmoothScroll({ children }) {
  return (
    <ReactLenis root options={{ lerp: 0.14, wheelMultiplier: 1.1, smoothWheel: true }}>
      <ScrollTriggerSync />
      <AnchorLinks />
      {children}
    </ReactLenis>
  );
}
