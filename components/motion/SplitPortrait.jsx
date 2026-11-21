"use client";

import { useEffect, useRef } from "react";

// Two of me: the photo, and the same face redrawn in code characters.
// The code side starts on the right half; the split follows the pointer
// across the hero, and a lens around the cursor shows code anywhere.
const GLYPHS = " .,:;-=+<>/()[]{}*#%@";

export function SplitPortrait({ src, alt, hostRef }) {
  const wrap = useRef(null);
  const canvas = useRef(null);

  useEffect(() => {
    const img = new Image();
    let alive = true;
    img.src = src;
    img.onload = () => {
      const c = canvas.current;
      if (!alive || !c) return;
      const size = 900;
      c.width = size;
      c.height = size;
      const ctx = c.getContext("2d");
      const cols = 96;
      const cell = size / cols;
      const rows = Math.floor(size / (cell * 1.25));
      const sample = document.createElement("canvas");
      sample.width = cols;
      sample.height = rows;
      const sctx = sample.getContext("2d", { willReadFrequently: true });
      sctx.drawImage(img, 0, 0, cols, rows);
      const data = sctx.getImageData(0, 0, cols, rows).data;
      ctx.fillStyle = "#0d1611";
      ctx.fillRect(0, 0, size, size);
      ctx.font = `600 ${cell * 1.25}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.textBaseline = "top";
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          const lum = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
          const k = Math.min(GLYPHS.length - 1, Math.floor((1 - lum) * 1.35 * GLYPHS.length));
          if (k <= 0) continue;
          const g = 140 + Math.round((1 - lum) * 115);
          ctx.fillStyle = `rgb(${Math.round(g * 0.3)}, ${g}, ${Math.round(g * 0.55)})`;
          ctx.fillText(GLYPHS[k], x * cell, y * cell * 1.25);
        }
      }
    };
    return () => {
      alive = false;
      img.onload = null;
    };
  }, [src]);

  useEffect(() => {
    const el = wrap.current;
    const host = hostRef?.current || el;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const state = { split: 50, ts: 50, x: -999, y: -999, tx: -999, ty: -999, r: 0, tr: 0 };
    let raf = 0;
    const tick = () => {
      const k = reduced ? 1 : 0.12;
      state.split += (state.ts - state.split) * k;
      state.x += (state.tx - state.x) * (reduced ? 1 : 0.2);
      state.y += (state.ty - state.y) * (reduced ? 1 : 0.2);
      state.r += (state.tr - state.r) * k;
      el.style.setProperty("--split", `${state.split}%`);
      el.style.setProperty("--mx", `${state.x}px`);
      el.style.setProperty("--my", `${state.y}px`);
      el.style.setProperty("--r", `${state.r}px`);
      raf = requestAnimationFrame(tick);
    };
    const move = (e) => {
      const hb = host.getBoundingClientRect();
      const b = el.getBoundingClientRect();
      state.ts = 20 + ((e.clientX - hb.left) / hb.width) * 60;
      state.tx = e.clientX - b.left;
      state.ty = e.clientY - b.top;
      const inside = e.clientX > b.left && e.clientX < b.right && e.clientY > b.top && e.clientY < b.bottom;
      state.tr = inside ? b.width * 0.16 : 0;
    };
    const leave = () => {
      state.ts = 50;
      state.tr = 0;
    };
    if (fine) {
      host.addEventListener("pointermove", move);
      host.addEventListener("pointerleave", leave);
    }
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    };
  }, [hostRef]);

  return (
    <div ref={wrap} className="split-portrait relative aspect-square w-full overflow-hidden rounded-[36px] bg-surface">
      <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
      <canvas ref={canvas} aria-hidden className="split-code absolute inset-0 h-full w-full" />
      <span aria-hidden className="split-divider absolute inset-y-0 w-px bg-chalk" />
    </div>
  );
}
