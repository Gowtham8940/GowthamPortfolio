"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLenis } from "lenis/react";
import { stackRows } from "@/lib/data/stack";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { sfx } from "@/lib/sound";

// Two endless rows of logos drifting in opposite directions. Scrolling speeds
// them up and flips their direction with yours; hovering a row slows it to a
// stop so you can look. Each tile lights up in its brand colour with a
// spotlight that follows the cursor.

function Tile({ item, dup = false }) {
  const { Icon, name, color } = item;
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <li
      aria-hidden={dup || undefined}
      className={`stack-tile${dup ? " stack-dup" : ""}`}
      style={{ "--c": color || "var(--ink)" }}
      onPointerMove={onMove}
      onPointerEnter={(e) => e.pointerType === "mouse" && sfx.tick({ soft: true })}
    >
      <span aria-hidden className="stack-glow" />
      <Icon aria-hidden className="stack-icon h-7 w-7 shrink-0" />
      <span className="relative whitespace-nowrap text-[15px] font-semibold tracking-[-0.01em]">{name}</span>
    </li>
  );
}

function Row({ items, dir, label }) {
  return (
    <div data-row data-dir={dir} className="stack-row" role="group" aria-label={label}>
      <ul className="stack-track">
        {items.map((it) => (
          <Tile key={it.name} item={it} />
        ))}
        {/* second copy makes the loop seamless; hidden from assistive tech */}
        {items.map((it) => (
          <Tile key={`${it.name}-dup`} item={it} dup />
        ))}
      </ul>
    </div>
  );
}

export function TechStack() {
  const { t } = useLocale();
  const root = useRef(null);
  const vel = useRef(0);
  useLenis((l) => {
    vel.current = l.velocity || 0;
  });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rows = Array.from(root.current.querySelectorAll("[data-row]")).map((el) => {
      const track = el.querySelector(".stack-track");
      const r = { el, track, set: gsap.quickSetter(track, "x", "px"), x: 0, dir: Number(el.dataset.dir), speed: 1, hover: false };
      el.addEventListener("pointerenter", () => (r.hover = true));
      el.addEventListener("pointerleave", () => (r.hover = false));
      return r;
    });
    let visible = false;
    let scrollDir = 1;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { rootMargin: "100px" });
    io.observe(root.current);
    const tick = () => {
      if (!visible) return;
      const dt = gsap.ticker.deltaRatio();
      const v = vel.current;
      if (Math.abs(v) > 0.4) scrollDir = Math.sign(v);
      const boost = Math.min(Math.abs(v) * 0.14, 7);
      vel.current *= 0.92;
      for (const r of rows) {
        const target = r.hover ? 0 : (1 + boost) * scrollDir;
        r.speed += (target - r.speed) * Math.min(1, 0.07 * dt);
        r.x += r.speed * r.dir * 0.7 * dt;
        const half = r.track.scrollWidth / 2;
        if (half > 0) {
          if (r.x <= -half) r.x += half;
          else if (r.x > 0) r.x -= half;
        }
        r.set(r.x);
      }
    };
    // Row B starts half-way through so the two rows don't line up.
    rows[1] && (rows[1].x = -rows[1].track.scrollWidth / 4);
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      io.disconnect();
    };
  }, []);

  const count = stackRows.reduce((n, r) => n + r.length, 0);

  return (
    <section id="stack" ref={root} className="border-t border-rule">
      <div className="mx-auto max-w-[1248px] px-4 pt-24 sm:px-6 sm:pt-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[640px]">
            <h2 data-split className="t-h1">
              {t("stack.title")}
            </h2>
            <p data-fade className="mt-4 text-[20px] leading-[1.55] text-ink-2">
              {t("stack.lede")}
            </p>
          </div>
          <p data-fade className="t-sm flex items-center gap-2 text-ink-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-chalk opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-chalk" />
            </span>
            <span>
              <span data-count className="font-semibold text-ink">
                {count}
              </span>{" "}
              {t("stack.count")}
            </span>
          </p>
        </div>
      </div>
      <div data-fade className="stack-rows mt-12 space-y-4 pb-24 sm:pb-32">
        <Row items={stackRows[0]} dir={-1} label={t("stack.rowA")} />
        <Row items={stackRows[1]} dir={1} label={t("stack.rowB")} />
      </div>
    </section>
  );
}
