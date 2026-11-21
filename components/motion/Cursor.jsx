"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// A dot + ring cursor for fine pointers. Grows over links; elements with
// data-cursor="View" (or any label) show that word inside the ring.
// Elements with data-magnetic drift toward the pointer.
export function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine) return;
    document.documentElement.classList.add("has-cursor");

    const dx = gsap.quickTo(dot.current, "x", { duration: 0.08, ease: "power3" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.08, ease: "power3" });
    const rx = gsap.quickTo(ring.current, "x", { duration: reduced ? 0.01 : 0.35, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: reduced ? 0.01 : 0.35, ease: "power3" });

    let magnet = null;
    let shown = false;
    gsap.set([dot.current, ring.current], { opacity: 0 });
    const move = (e) => {
      if (!shown) {
        shown = true;
        gsap.set([dot.current, ring.current], { x: e.clientX, y: e.clientY });
        gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.3 });
      }
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
      if (magnet && !reduced) {
        const r = magnet.getBoundingClientRect();
        const mx = (e.clientX - (r.left + r.width / 2)) * 0.3;
        const my = (e.clientY - (r.top + r.height / 2)) * 0.3;
        gsap.to(magnet, { x: mx, y: my, duration: 0.4, ease: "power3.out" });
      }
    };

    const over = (e) => {
      const target = e.target.closest("a, button, [data-cursor], [data-magnetic], label, input, textarea");
      const labeled = e.target.closest("[data-cursor]");
      const m = e.target.closest("[data-magnetic]");
      if (m !== magnet) {
        if (magnet) gsap.to(magnet, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
        magnet = m;
      }
      const text = labeled?.getAttribute("data-cursor") || "";
      label.current.textContent = text;
      gsap.to(ring.current, {
        scale: text ? 3.2 : target ? 1.8 : 1,
        backgroundColor: text ? "var(--chalk)" : "transparent",
        borderColor: text ? "var(--chalk)" : "var(--ink)",
        duration: 0.3,
        ease: "power3.out",
      });
      gsap.to(dot.current, { scale: target ? 0 : 1, duration: 0.2 });
    };

    const leaveWindow = () => gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.2 });
    const enterWindow = () => gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.2 });

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over);
    document.documentElement.addEventListener("pointerleave", leaveWindow);
    document.documentElement.addEventListener("pointerenter", enterWindow);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leaveWindow);
      document.documentElement.removeEventListener("pointerenter", enterWindow);
    };
  }, []);

  return (
    <div aria-hidden className="cursor-layer pointer-events-none fixed inset-0 z-[90]">
      <div ref={ring} className="cursor-ring absolute left-0 top-0 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-ink">
        <span ref={label} className="text-[5px] font-semibold text-chalk-ink" />
      </div>
      <div ref={dot} className="cursor-dot absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" />
    </div>
  );
}
