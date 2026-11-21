"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLenis } from "lenis/react";
import { useLocale } from "@/lib/i18n/LocaleProvider";

const KEY = "gj-intro-seen";

// First-visit intro: a 0→100 counter and the name, then the curtain lifts.
// Fires `intro:done` on window so the hero can start its own entrance.
export function Loader() {
  const root = useRef(null);
  const [show, setShow] = useState(true);
  const lenis = useLenis();
  const lenisRef = useRef(null);
  const loading = useRef(false);

  // Lenis is created after this component mounts; pause it as soon as it exists.
  useEffect(() => {
    lenisRef.current = lenis;
    if (lenis && loading.current) lenis.stop();
  }, [lenis]);
  const { t } = useLocale();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {
      /* storage blocked */
    }
    const finish = () => {
      window.__introDone = true;
      window.dispatchEvent(new Event("intro:done"));
    };
    if (reduced || seen) {
      root.current.style.display = "none";
      finish();
      return;
    }
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
    loading.current = true;
    document.documentElement.style.overflow = "hidden";
    lenisRef.current?.stop();
    window.scrollTo(0, 0);
    const counter = { v: 0 };
    const el = root.current;
    const tl = gsap.timeline({
      onComplete: () => {
        loading.current = false;
        document.documentElement.style.overflow = "";
        lenisRef.current?.start();
        setShow(false);
      },
    });
    tl.to(counter, {
      v: 100,
      duration: 1.6,
      ease: "power2.inOut",
      onUpdate: () => {
        el.querySelector("[data-count]").textContent = String(Math.round(counter.v)).padStart(3, "0");
      },
    })
      .from(el.querySelectorAll("[data-word]"), { yPercent: 110, duration: 0.7, stagger: 0.08, ease: "power3.out" }, 0.2)
      .to(el.querySelector("[data-bar]"), { scaleX: 1, duration: 1.6, ease: "power2.inOut" }, 0)
      .add(finish, "+=0.1")
      .to(el, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "<");
    // Browsers throttle animation frames in background tabs; never leave the
    // page locked behind the loader because of that.
    const fallback = setTimeout(() => tl.progress(1), 4500);
    return () => {
      clearTimeout(fallback);
      tl.kill();
      document.documentElement.style.overflow = "";
      lenisRef.current?.start();
    };
  }, []);

  if (!show) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink p-6 text-canvas sm:p-10" aria-hidden>
      <p className="t-sm opacity-60">{t("loader.label")}</p>
      <div>
        <p className="flex flex-wrap gap-x-4 overflow-hidden text-[clamp(48px,9vw,140px)] font-semibold leading-[0.95] tracking-[-0.05em]">
          <span className="block overflow-hidden"><span data-word className="block">Gowtham</span></span>
          <span className="block overflow-hidden"><span data-word className="block text-chalk">J</span></span>
        </p>
        <div className="mt-8 flex items-end justify-between gap-6">
          <div className="h-px flex-1 bg-canvas/20">
            <div data-bar className="h-px origin-left scale-x-0 bg-chalk" />
          </div>
          <span data-count className="text-[clamp(32px,4vw,56px)] font-semibold tabular-nums tracking-[-0.04em]">000</span>
        </div>
      </div>
    </div>
  );
}
