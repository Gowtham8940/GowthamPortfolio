"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// Pans a tall capture inside its frame while the frame is on screen, so
// visitors see the whole page rather than a crop. The frame is NOT a scroll
// container: the mouse wheel and touch always scroll the page and never get
// trapped inside a preview. Hover pauses the pan; reduced motion keeps it still.
export function useAutoPan(frameRef, { speed = 70, enabled = true, active = true } = {}) {
  useEffect(() => {
    const frame = frameRef.current;
    const img = frame?.querySelector("img");
    if (!frame || !img || !enabled) return;
    gsap.set(img, { y: 0 });
    if (!active) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    let tween = null;
    let visible = false;
    const build = () => {
      tween?.kill();
      gsap.set(img, { y: 0 });
      const max = img.offsetHeight - frame.clientHeight;
      if (max < 40) return;
      tween = gsap.to(img, {
        y: -max,
        duration: max / speed,
        ease: "none",
        repeat: -1,
        yoyo: true,
        repeatDelay: 1.6,
        delay: 0.8,
        paused: true,
      });
      if (visible) tween.play();
    };
    if (img.complete) build();
    else img.addEventListener("load", build, { once: true });
    const ro = new ResizeObserver(() => build());
    ro.observe(frame);
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible) tween?.play();
        else tween?.pause();
      },
      { threshold: 0.15 }
    );
    io.observe(frame);
    const pause = () => tween?.pause();
    const resume = () => visible && tween?.resume();
    frame.addEventListener("pointerenter", pause);
    frame.addEventListener("pointerleave", resume);
    return () => {
      tween?.kill();
      ro.disconnect();
      io.disconnect();
      img.removeEventListener("load", build);
      frame.removeEventListener("pointerenter", pause);
      frame.removeEventListener("pointerleave", resume);
    };
  }, [frameRef, speed, enabled, active]);
}

export function PhoneFrame({ src, alt, className = "" }) {
  const screen = useRef(null);
  useAutoPan(screen);
  return (
    // Bezel, corners and screen radius are proportional to the phone's width
    // (like a real device), so it stays phone-shaped at any size instead of
    // turning into a pill when it gets small.
    <div className={`phone-frame relative bg-[#111312] shadow-[var(--tile-shadow)] ring-1 ring-white/20 ${className}`}>
      <div ref={screen} data-frame="phone" className="phone-screen relative aspect-[390/844] overflow-hidden bg-white">
        <img src={src} alt={alt} loading="lazy" className="block h-auto w-full will-change-transform" draggable={false} />
      </div>
    </div>
  );
}

export function BrowserFrame({ src, alt, url, scroll = false, className = "" }) {
  const view = useRef(null);
  useAutoPan(view, { speed: 110, enabled: scroll });
  return (
    <figure className={`m-0 overflow-hidden rounded-[16px] border border-white/10 bg-[#f6f6f7] shadow-[var(--tile-shadow)] ${className}`}>
      <figcaption className="flex h-7 items-center gap-2 bg-[#ececee] px-2.5 sm:h-9 sm:gap-3 sm:px-3">
        <span aria-hidden className="flex shrink-0 gap-1 sm:gap-1.5">
          <i className="h-2 w-2 rounded-full bg-[#ff5f57] sm:h-2.5 sm:w-2.5" />
          <i className="h-2 w-2 rounded-full bg-[#febc2e] sm:h-2.5 sm:w-2.5" />
          <i className="h-2 w-2 rounded-full bg-[#28c840] sm:h-2.5 sm:w-2.5" />
        </span>
        <span className="mx-auto min-w-0 truncate rounded-md bg-white px-2 py-0.5 text-[10px] text-[#5b6170] sm:px-3 sm:text-[12px]">{url}</span>
      </figcaption>
      <div ref={view} data-frame="browser" className="aspect-[16/10] overflow-hidden">
        <img src={src} alt={alt} loading="lazy" className="block h-auto w-full will-change-transform" draggable={false} />
      </div>
    </figure>
  );
}

// Store screenshots keep their own shape: never cropped, just scaled.
// Play listings come in two shapes; width/height reserve the space up front so
// late-loading tiles don't shift the page (and scroll positions) around.
const TALL = /(aaeb|tvetcollege|magicbillion|thenauticalguyd|optilearn|uniliv)/;

export function StoreTile({ src, alt, eager = false, className = "" }) {
  return (
    <img
      src={src}
      alt={alt}
      width={720}
      height={TALL.test(src) ? 1557 : 1280}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={`block h-auto w-full rounded-[22px] shadow-[var(--tile-shadow)] outline outline-1 -outline-offset-1 outline-black/10 ${className}`}
    />
  );
}
