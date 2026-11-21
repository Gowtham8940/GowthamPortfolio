"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FiArrowUpRight } from "react-icons/fi";
import { projectIndex } from "@/lib/data/portfolio";
import { useLocale } from "@/lib/i18n/LocaleProvider";

// Every project as a big typographic list. On desktop, hovering a row floats
// its screenshot beside the cursor; rows without one show a small note card.
export function ProjectIndex() {
  const preview = useRef(null);
  const [hovered, setHovered] = useState(null);
  const { t, tx } = useLocale();

  useEffect(() => {
    const el = preview.current;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
    const move = (e) => {
      xTo(e.clientX + 32);
      yTo(e.clientY - 140);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  useEffect(() => {
    gsap.to(preview.current, {
      opacity: hovered ? 1 : 0,
      scale: hovered ? 1 : 0.85,
      rotate: hovered ? -3 : 0,
      duration: 0.35,
      ease: "power3.out",
    });
  }, [hovered]);

  const item = hovered != null ? projectIndex[hovered] : null;

  return (
    <section aria-labelledby="index-title" className="mx-auto max-w-[1248px] px-4 py-24 sm:px-6 sm:py-32">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 id="index-title" data-split className="t-h1">
          {t("index.title")}
        </h2>
        <p className="t-sm text-ink-2">{t("index.count", { n: projectIndex.length })}</p>
      </div>

      <ul className="mt-12 border-t border-rule" onPointerLeave={() => setHovered(null)}>
        {projectIndex.map((p, i) => {
          const Row = p.href ? "a" : "div";
          return (
            <li key={p.title} data-fade>
              <Row
                {...(p.href ? { href: p.href, target: "_blank", rel: "noopener noreferrer", "data-cursor": t("cursor.open") } : {})}
                onPointerMove={() => hovered !== i && setHovered(i)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 border-b border-rule py-6 transition-[padding] duration-300 hover:px-3 md:grid-cols-[1fr_220px_60px_24px]"
              >
                <span className="flex items-center gap-4">
                  {p.image && <img src={p.image} alt="" loading="lazy" className="h-12 w-12 rounded-xl object-cover object-top md:hidden" />}
                  <span className="text-[clamp(26px,3.6vw,52px)] font-semibold leading-[1.05] tracking-[-0.045em] transition-colors group-hover:text-chalk">
                    {p.title}
                  </span>
                </span>
                <span className="t-sm col-start-1 text-ink-2 md:col-start-auto">{tx(p.kind)}</span>
                <span className="t-sm hidden tabular-nums text-ink-2 md:block">{p.year}</span>
                <span className="row-span-2 row-start-1 flex justify-end md:row-span-1 md:row-start-auto">
                  {p.href && <FiArrowUpRight aria-hidden className="h-6 w-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />}
                </span>
              </Row>
            </li>
          );
        })}
      </ul>

      <div
        ref={preview}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-40 hidden w-[340px] opacity-0 md:block"
      >
        {item?.image ? (
          <img src={item.image} alt="" className="block max-h-[280px] w-full rounded-[18px] object-cover object-top shadow-[var(--tile-shadow)]" />
        ) : item ? (
          <div className="rounded-[18px] bg-chalk p-6 text-chalk-ink shadow-[var(--tile-shadow)]">
            <p className="text-[24px] font-semibold tracking-[-0.03em]">{item.title}</p>
            <p className="mt-2 opacity-80">{tx(item.note)}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
