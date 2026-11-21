"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

// Page-wide scroll reveals, driven by data attributes so sections stay plain:
//   data-split   headline lines rise out of a mask
//   data-fade    block fades up
//   data-count   number counts up to its text value (e.g. "800K+")
//   data-clip    image uncovers with a clip-path
export function Reveals({ children }) {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        let splits = [];
        document.fonts.ready.then(() => {
          gsap.utils.toArray("[data-split]", root.current).forEach((el) => {
            const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "split-line" });
            splits.push(split);
            gsap.from(split.lines, {
              yPercent: 105,
              duration: 0.9,
              stagger: 0.08,
              ease: "power4.out",
              scrollTrigger: { trigger: el, start: "top 88%", end: "bottom 20%", toggleActions: "play none none none" },
            });
          });
          ScrollTrigger.refresh();
        });

        ScrollTrigger.batch(gsap.utils.toArray("[data-fade]", root.current), {
          start: "top 90%",
          onEnter: (batch) => gsap.from(batch, { y: 36, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.08, overwrite: true }),
        });

        gsap.utils.toArray("[data-clip]", root.current).forEach((el) => {
          gsap.from(el, {
            clipPath: "inset(18% 12% 18% 12% round 28px)",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", end: "bottom 15%", toggleActions: "play none none none" },
          });
        });

        gsap.utils.toArray("[data-count]", root.current).forEach((el) => {
          const raw = el.textContent;
          const m = raw.match(/^(\D*)([\d.]+)(.*)$/);
          if (!m) return;
          const target = parseFloat(m[2]);
          const obj = { v: 0 };
          gsap.to(obj, {
            v: target,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%", end: "bottom 10%", toggleActions: "play none none none" },
            onUpdate: () => {
              el.textContent = `${m[1]}${Number.isInteger(target) ? Math.round(obj.v) : obj.v.toFixed(1)}${m[3]}`;
            },
            onComplete: () => {
              el.textContent = raw;
            },
          });
        });

        // Late images and font swaps change layout; recompute trigger positions.
        let timer = 0;
        const refresh = () => {
          clearTimeout(timer);
          timer = setTimeout(() => ScrollTrigger.refresh(), 150);
        };
        window.addEventListener("load", refresh);
        const imgs = gsap.utils.toArray("img", root.current).filter((img) => !img.complete);
        imgs.forEach((img) => img.addEventListener("load", refresh, { once: true }));

        return () => {
          clearTimeout(timer);
          window.removeEventListener("load", refresh);
          imgs.forEach((img) => img.removeEventListener("load", refresh));
          splits.forEach((s) => s.revert());
        };
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return <div ref={root}>{children}</div>;
}
