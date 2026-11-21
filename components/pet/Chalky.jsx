"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import { FiArrowUpRight, FiX, FiChevronLeft, FiChevronRight, FiPlay, FiPause } from "react-icons/fi";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { profile } from "@/lib/data/portfolio";

// Chalky: an original cat-bot mascot in the site's chalk green. Click it and
// it flies from section to section, lands beside each heading, stays attached
// while you scroll, and reports live data there (site uptime, store installs,
// newest article and video, the time in India). It ends by pitching Gowtham.

function PetSvg({ mood }) {
  const happy = mood === "happy";
  const asleep = mood === "sleep";
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full overflow-visible" aria-hidden>
      <defs>
        <radialGradient id="chalky-body" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#5fd39b" />
          <stop offset="100%" stopColor="#1f6b4a" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="112" rx="30" ry="5" fill="rgb(16 17 20 / 0.18)" className="pet-shadow" />
      <g className="pet-body">
        <path className="pet-tail" d="M88 86 C 108 84, 112 62, 100 54" stroke="#1f6b4a" strokeWidth="9" strokeLinecap="round" fill="none" />
        <path d="M30 40 L 34 14 L 50 32 Z" fill="#2a8a5f" stroke="#1f6b4a" strokeWidth="2" strokeLinejoin="round" />
        <path d="M90 40 L 86 14 L 70 32 Z" fill="#2a8a5f" stroke="#1f6b4a" strokeWidth="2" strokeLinejoin="round" />
        <path d="M36 22 L 39 32 L 45 30 Z" fill="#f5c542" opacity="0.8" />
        <path d="M84 22 L 81 32 L 75 30 Z" fill="#f5c542" opacity="0.8" />
        <rect x="22" y="28" width="76" height="78" rx="36" fill="url(#chalky-body)" />
        <ellipse cx="60" cy="82" rx="22" ry="16" fill="#c9f1dc" opacity="0.55" />
        <g className="pet-face">
          {asleep ? (
            <g stroke="#0e1210" strokeWidth="3.5" strokeLinecap="round" fill="none">
              <path d="M38 60 q 6 5 12 0" />
              <path d="M70 60 q 6 5 12 0" />
            </g>
          ) : happy ? (
            <g stroke="#0e1210" strokeWidth="3.5" strokeLinecap="round" fill="none">
              <path d="M38 62 q 6 -8 12 0" />
              <path d="M70 62 q 6 -8 12 0" />
            </g>
          ) : (
            <g className="pet-eyes">
              <ellipse cx="44" cy="58" rx="9" ry="10" fill="#fff" />
              <ellipse cx="76" cy="58" rx="9" ry="10" fill="#fff" />
              <g className="pet-pupils">
                <circle cx="44" cy="59" r="4.6" fill="#0e1210" />
                <circle cx="76" cy="59" r="4.6" fill="#0e1210" />
                <circle cx="46" cy="57" r="1.5" fill="#fff" />
                <circle cx="78" cy="57" r="1.5" fill="#fff" />
              </g>
            </g>
          )}
          <circle cx="33" cy="72" r="5" fill="#ff8fa3" opacity="0.55" />
          <circle cx="87" cy="72" r="5" fill="#ff8fa3" opacity="0.55" />
          <path d={happy ? "M52 72 q 8 9 16 0" : "M54 73 q 6 5 12 0"} stroke="#0e1210" strokeWidth="3" strokeLinecap="round" fill={happy ? "#0e1210" : "none"} />
        </g>
        <rect x="36" y="100" width="14" height="9" rx="4.5" fill="#1f6b4a" />
        <rect x="70" y="100" width="14" height="9" rx="4.5" fill="#1f6b4a" />
      </g>
      {asleep && (
        <g className="pet-z" fill="#1f6b4a" fontWeight="700" fontFamily="system-ui">
          <text x="94" y="30" fontSize="14">z</text>
          <text x="104" y="16" fontSize="10">z</text>
        </g>
      )}
    </svg>
  );
}

// ── Tour stops: where Chalky scrolls to, and what it lands next to ──────────
const STOPS = [
  { key: "top", section: "#top", anchor: ".hero-portrait" },
  { key: "ai", section: "#ai", anchor: "#ai h2" },
  { key: "device", section: "#device-title", anchor: "#device-title", offset: -140 },
  { key: "work", section: "#work", anchor: "#work h2" },
  { key: "apps", section: "#apps", anchor: "#apps h2" },
  { key: "experience", section: "#experience", anchor: "#experience h2" },
  { key: "writing", section: "#writing", anchor: "#writing h2" },
  { key: "contact", section: "#contact", anchor: "#contact h2" },
];
const HIDE_KEY = "gj-pet-hidden";
const GREET_KEY = "gj-pet-greeted";
const NAV_H = 84;
const AUTO_MS = 8000;

const safeGet = (store, k) => {
  try {
    return window[store].getItem(k);
  } catch {
    return null;
  }
};
const safeSet = (store, k, v) => {
  try {
    window[store].setItem(k, v);
  } catch {
    /* storage blocked */
  }
};
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isPhone = () => window.innerWidth < 640;
const petSize = () => (isPhone() ? 60 : 78);
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

// "1.2M+" → 1200000, "500K+" → 500000
const countOf = (s = "") => {
  const m = String(s).match(/([\d.]+)\s*([KM])?/i);
  if (!m) return 0;
  return parseFloat(m[1]) * (m[2]?.toUpperCase() === "M" ? 1e6 : m[2] ? 1e3 : 1);
};

function useIndiaClock(active, locale) {
  const [now, setNow] = useState(null);
  useEffect(() => {
    if (!active) return;
    const tick = () => setNow(new Date());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 30000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, [active]);
  if (!now) return null;
  const time = now.toLocaleTimeString(locale === "ta" ? "ta-IN" : "en-IN", { hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" });
  const hour = Number(now.toLocaleString("en-US", { hour: "numeric", hourCycle: "h23", timeZone: "Asia/Kolkata" }));
  return { time, awake: hour >= 8 && hour < 24, now };
}

// Live data Chalky reports at each stop (fetched once per tour).
async function loadLive() {
  const get = (u) => fetch(u, { cache: "no-store" }).then((r) => (r.ok ? r.json() : null)).catch(() => null);
  const [status, apps, posts, videos] = await Promise.all([
    get("/api/status"),
    get("/api/feeds/playstore"),
    get("/api/feeds/medium"),
    get("/api/feeds/youtube"),
  ]);
  return {
    sites: status?.sites || [],
    apps: apps?.apps || [],
    post: posts?.posts?.[0] || null,
    video: videos?.videos?.[0] || null,
  };
}

function liveLines(key, live, clock, t) {
  if (!live && key !== "top" && key !== "contact" && key !== "experience") return null;
  const site = (id) => live?.sites.find((s) => s.id === id);
  const siteLine = (id) => {
    const s = site(id);
    if (!s) return null;
    return s.ok ? t("live.up", { name: s.name, ms: s.ms }) : t("live.down", { name: s.name });
  };
  const timeLines = clock ? [t("live.time", { time: clock.time }), clock.awake ? t("live.awake") : t("live.asleep")] : [];
  switch (key) {
    case "top":
    case "contact":
      return timeLines;
    case "ai":
      return [siteLine("aira")];
    case "device":
      return ["inviteforyou", "sri-hari", "jewel-billing"].map(siteLine);
    case "work": {
      const pen = live.apps.find((a) => a.link?.includes("com.penfight"));
      return [pen?.downloads ? t("live.penfight", { downloads: pen.downloads }) : null, siteLine("inviteforyou")];
    }
    case "apps": {
      if (!live.apps.length) return null;
      const top = [...live.apps].sort((a, b) => countOf(b.downloads) - countOf(a.downloads))[0];
      return [t("live.apps", { n: live.apps.length, top: top.name, downloads: top.downloads })];
    }
    case "experience": {
      if (!clock) return null;
      const start = new Date(2024, 9, 1);
      const months = (clock.now.getFullYear() - start.getFullYear()) * 12 + clock.now.getMonth() - start.getMonth();
      return [t("live.tenure", { y: Math.floor(months / 12), m: months % 12 })];
    }
    case "writing":
      return [live.post ? t("live.post", { title: live.post.title, date: live.post.date }) : null, live.video ? t("live.video", { title: live.video.title }) : null];
    default:
      return null;
  }
}

export function Chalky() {
  const { t, locale } = useLocale();
  const lenis = useLenis();
  const bubbleId = useId();
  const wrap = useRef(null);
  const petBtn = useRef(null);
  const bubble = useRef(null);
  const pos = useRef({ x: -999, y: -999 });
  const traveling = useRef(false);
  const stepRef = useRef(0);
  const [hidden, setHidden] = useState(false);
  const [touring, setTouring] = useState(false);
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(false);
  const [arrived, setArrived] = useState(false);
  const [greet, setGreet] = useState(false);
  const [mood, setMood] = useState("idle");
  const [live, setLive] = useState(null);
  const clock = useIndiaClock(touring, locale);

  // ── Positioning ───────────────────────────────────────────────────────────
  const corner = () => {
    const S = petSize();
    return { x: window.innerWidth - S - (isPhone() ? 12 : 22), y: window.innerHeight - S - (isPhone() ? 12 : 22) };
  };

  // Where Chalky should sit for a stop: beside the anchor, kept on screen.
  const spotFor = useCallback((i) => {
    const el = document.querySelector(STOPS[i].anchor);
    const S = petSize();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const sheet = isPhone() ? (bubble.current?.offsetHeight || 220) + 20 : 0;
    const maxY = vh - S - 8 - sheet;
    if (!el) return corner();
    const r = el.getBoundingClientRect();
    if (isPhone()) {
      return { x: clamp(r.right - S, 8, vw - S - 8), y: clamp(r.top - S + 14, NAV_H, Math.max(NAV_H, maxY)) };
    }
    let x = r.right + 14;
    if (x + S > vw - 12) x = r.left - S - 14;
    if (x < 12) x = clamp(r.left, 12, vw - S - 12);
    return { x, y: clamp(r.top + Math.min(r.height, 140) / 2 - S / 2, NAV_H, maxY) };
  }, []);

  // Write pet + bubble positions straight to the DOM (no React render per frame).
  const place = useCallback((x, y) => {
    // Mutate, don't replace: follow tweens animate this same object.
    pos.current.x = x;
    pos.current.y = y;
    const b = bubble.current;
    // Phones: the bubble is docked at the bottom, so Chalky perches above it.
    const shownY = b && isPhone() ? Math.min(y, window.innerHeight - b.offsetHeight - petSize() - 18) : y;
    if (wrap.current) gsap.set(wrap.current, { x, y: shownY });
    if (!b || isPhone()) return;
    const S = petSize();
    const bw = b.offsetWidth;
    const bh = b.offsetHeight;
    const left = x + S / 2 < window.innerWidth / 2 ? x + S + 10 : x - bw - 10;
    const top = clamp(y + S / 2 - bh / 2, NAV_H, window.innerHeight - bh - 12);
    gsap.set(b, { x: clamp(left, 12, window.innerWidth - bw - 12), y: top });
  }, []);

  // Fly along an arc to (tx, ty): hop, lean into the move, squash on landing.
  const travel = useCallback(
    (tx, ty, done) => {
      const from = { ...pos.current };
      const dx = tx - from.x;
      const dist = Math.hypot(dx, ty - from.y);
      const flip = wrap.current?.querySelector(".pet-flip");
      if (flip) gsap.set(flip, { scaleX: dx < -4 ? -1 : 1 });
      if (reducedMotion() || from.x < -100 || dist < 4) {
        place(tx, ty);
        done?.();
        return;
      }
      traveling.current = true;
      setMood("happy");
      const arc = Math.min(160, 50 + dist * 0.25);
      const body = wrap.current.querySelector(".pet-body");
      const p = { v: 0 };
      gsap
        .timeline({
          onComplete: () => {
            traveling.current = false;
            setMood("idle");
            done?.();
          },
        })
        .to(body, { scaleY: 0.82, scaleX: 1.12, transformOrigin: "50% 100%", duration: 0.12 })
        .to(body, { scaleY: 1.08, scaleX: 0.94, rotate: dx < 0 ? -10 : 10, duration: 0.15 })
        .to(p, {
          v: 1,
          duration: clamp(dist / 900, 0.55, 1.1),
          ease: "power1.inOut",
          onUpdate: () => place(from.x + dx * p.v, from.y + (ty - from.y) * p.v - Math.sin(p.v * Math.PI) * arc),
        }, "<")
        .to(body, { rotate: 0, scaleY: 0.85, scaleX: 1.12, duration: 0.12 })
        .to(body, { scaleY: 1, scaleX: 1, duration: 0.5, ease: "elastic.out(1, 0.4)" });
    },
    [place]
  );

  // ── Tour control ──────────────────────────────────────────────────────────
  const goStep = useCallback(
    (i) => {
      stepRef.current = i;
      setStep(i);
      setArrived(false);
      const stop = STOPS[i];
      const target = document.querySelector(stop.section);
      // Land exactly once: when the scroll finishes, or after a fallback delay
      // if the visitor's own scrolling interrupts it (Lenis then never calls back).
      let landed = false;
      const land = () => {
        if (landed || stepRef.current !== i) return;
        landed = true;
        const s = spotFor(i);
        travel(s.x, s.y, () => setArrived(true));
      };
      setTimeout(land, reducedMotion() ? 50 : 1400);
      // Little "follow me" hop while the page scrolls.
      if (!reducedMotion() && wrap.current) {
        gsap.fromTo(wrap.current.querySelector(".pet-body"), { y: 0 }, { y: -16, duration: 0.22, yoyo: true, repeat: 1, ease: "power2.out" });
      }
      if (!target) return land();
      if (lenis) {
        lenis.scrollTo(target, { offset: stop.offset || 0, duration: reducedMotion() ? 0 : 1.1, immediate: reducedMotion(), onComplete: land });
      } else {
        target.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth" });
        setTimeout(land, 900);
      }
    },
    [lenis, spotFor, travel]
  );

  const startTour = useCallback(() => {
    // Once a visitor has taken the tour, the first-visit greeting is moot.
    safeSet("sessionStorage", GREET_KEY, "1");
    setGreet(false);
    setTouring(true);
    setAuto(false);
    if (!live) loadLive().then(setLive);
    goStep(0);
  }, [goStep, live]);

  const endTour = useCallback(() => {
    setTouring(false);
    setAuto(false);
    setArrived(false);
    const c = corner();
    travel(c.x, c.y);
    petBtn.current?.focus({ preventScroll: true });
  }, [travel]);

  const next = useCallback(() => {
    if (stepRef.current < STOPS.length - 1) goStep(stepRef.current + 1);
    else setAuto(false);
  }, [goStep]);
  const prev = useCallback(() => stepRef.current > 0 && goStep(stepRef.current - 1), [goStep]);

  // ── Effects ───────────────────────────────────────────────────────────────
  // Start in the corner; restore the hidden preference.
  useEffect(() => {
    const id = setTimeout(() => {
      setHidden(safeGet("localStorage", HIDE_KEY) === "1");
      const c = corner();
      place(c.x, c.y);
    }, 0);
    return () => clearTimeout(id);
  }, [place]);

  // Stay attached to the current stop while the visitor scrolls or resizes.
  useEffect(() => {
    if (hidden) return;
    const follow = () => {
      if (traveling.current) return;
      const s = touring && arrived ? spotFor(stepRef.current) : touring ? null : corner();
      if (!s) return;
      gsap.to(pos.current, { x: s.x, y: s.y, duration: 0.35, ease: "power3.out", overwrite: true, onUpdate: () => place(pos.current.x, pos.current.y) });
    };
    // Layout can shift without a scroll event (lazy images, pinned sections
    // refreshing), so while a stop is shown, re-check the anchor a few times a second.
    const check = () => {
      if (traveling.current || !(touring && arrived)) return;
      const s = spotFor(stepRef.current);
      if (Math.hypot(s.x - pos.current.x, s.y - pos.current.y) > 6) follow();
    };
    const id = setInterval(check, 250);
    window.addEventListener("scroll", follow, { passive: true });
    window.addEventListener("resize", follow);
    ScrollTrigger.addEventListener("refresh", follow);
    return () => {
      clearInterval(id);
      window.removeEventListener("scroll", follow);
      window.removeEventListener("resize", follow);
      ScrollTrigger.removeEventListener("refresh", follow);
    };
  }, [hidden, touring, arrived, spotFor, place]);

  // Re-place the bubble when its content (and size) changes.
  useLayoutEffect(() => {
    place(pos.current.x, pos.current.y);
  });

  // Auto-play advances after each landing.
  useEffect(() => {
    if (!auto || !touring || !arrived) return;
    const id = setTimeout(next, AUTO_MS);
    return () => clearTimeout(id);
  }, [auto, touring, arrived, step, next]);

  // Keyboard: Escape ends the tour, arrows step through it.
  useEffect(() => {
    if (!touring) return;
    const onKey = (e) => {
      if (document.querySelector("dialog[open]")) return;
      if (e.key === "Escape") endTour();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [touring, endTour, next, prev]);

  // First-visit greeting.
  useEffect(() => {
    if (hidden || safeGet("sessionStorage", GREET_KEY)) return;
    const id = setTimeout(() => {
      if (safeGet("sessionStorage", GREET_KEY)) return;
      safeSet("sessionStorage", GREET_KEY, "1");
      setGreet(true);
    }, 5000);
    return () => clearTimeout(id);
  }, [hidden]);

  // Idle life: bob, blink, wag, eyes follow the pointer, nap when left alone.
  useEffect(() => {
    if (hidden) return;
    const el = wrap.current;
    const reduced = reducedMotion();
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.to(".pet-bob", { y: -4, duration: 1.4, ease: "sine.inOut", repeat: -1, yoyo: true });
      gsap.to(".pet-shadow", { scaleX: 0.85, transformOrigin: "50% 50%", duration: 1.4, ease: "sine.inOut", repeat: -1, yoyo: true });
      gsap.to(".pet-tail", { rotate: 14, transformOrigin: "88px 86px", duration: 0.5, ease: "sine.inOut", repeat: -1, yoyo: true });
    }, el);
    let blinkTimer = 0;
    const blink = () => {
      const eyes = el.querySelector(".pet-eyes");
      if (eyes && !reduced) gsap.fromTo(eyes, { scaleY: 1 }, { scaleY: 0.1, transformOrigin: "50% 58px", duration: 0.08, yoyo: true, repeat: 1 });
      blinkTimer = setTimeout(blink, 2200 + Math.random() * 3200);
    };
    blinkTimer = setTimeout(blink, 2000);
    let napTimer = 0;
    const wake = () => {
      setMood((m) => (m === "sleep" ? "idle" : m));
      clearTimeout(napTimer);
      napTimer = setTimeout(() => setMood((m) => (m === "idle" ? "sleep" : m)), 30000);
    };
    const look = (e) => {
      wake();
      const pupils = el.querySelector(".pet-pupils");
      if (!pupils || reduced) return;
      const b = el.getBoundingClientRect();
      const flipped = gsap.getProperty(el.querySelector(".pet-flip"), "scaleX") < 0 ? -1 : 1;
      const dx = (e.clientX - (b.left + b.width / 2)) * flipped;
      const dy = e.clientY - (b.top + b.height / 2);
      const d = Math.hypot(dx, dy) || 1;
      gsap.to(pupils, { x: (dx / d) * 3.5, y: (dy / d) * 3, duration: 0.3 });
    };
    napTimer = setTimeout(() => setMood((m) => (m === "idle" ? "sleep" : m)), 30000);
    window.addEventListener("pointermove", look, { passive: true });
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("keydown", wake);
    return () => {
      ctx.revert();
      clearTimeout(blinkTimer);
      clearTimeout(napTimer);
      window.removeEventListener("pointermove", look);
      window.removeEventListener("scroll", wake);
      window.removeEventListener("keydown", wake);
    };
  }, [hidden]);

  // ── Actions ───────────────────────────────────────────────────────────────
  const hide = () => {
    safeSet("localStorage", HIDE_KEY, "1");
    setTouring(false);
    setGreet(false);
    setHidden(true);
  };
  const show = () => {
    safeSet("localStorage", HIDE_KEY, "0");
    setHidden(false);
    setTimeout(() => {
      const c = corner();
      place(c.x, c.y);
    }, 0);
  };
  const openContact = () => window.dispatchEvent(new Event("open-contact"));

  if (hidden) {
    return (
      <button
        type="button"
        onClick={show}
        aria-label={t("pet.show")}
        title={t("pet.show")}
        className="fixed bottom-4 right-4 z-[70] grid h-12 w-12 place-items-center rounded-full border border-rule bg-surface p-1 shadow-[0_10px_30px_-10px_rgb(16_17_20/0.5)]"
      >
        <PetSvg mood="sleep" />
      </button>
    );
  }

  const stop = STOPS[step];
  const lines = touring ? (liveLines(stop.key, live, clock, t) || []).filter(Boolean) : [];
  const loadingLive = touring && !live && !["top", "contact", "experience"].includes(stop.key);
  const showBubble = touring || greet || mood === "sleep";
  const btn = "inline-flex min-h-9 items-center justify-center gap-1 rounded-full px-3.5 text-[13px] font-semibold transition-colors";

  return (
    <>
      {showBubble && (
        <div
          ref={bubble}
          id={bubbleId}
          role="region"
          aria-label={t("pet.name")}
          className={`pet-tip fixed z-[71] rounded-[20px] border border-rule bg-surface text-ink shadow-[0_24px_60px_-20px_rgb(16_17_20/0.45)] ${
            touring ? "w-[min(340px,calc(100vw-24px))]" : "w-[min(280px,calc(100vw-110px))]"
          } max-sm:!bottom-3 max-sm:!left-3 max-sm:!right-3 max-sm:!top-auto max-sm:!w-auto max-sm:!transform-none sm:left-0 sm:top-0`}
        >
          {touring ? (
            <div className="p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="t-sm text-ink-2">{t("pet.step", { i: step + 1, n: STOPS.length })}</p>
                <button type="button" onClick={endTour} aria-label={t("pet.end")} className="grid h-8 w-8 place-items-center rounded-full border border-rule">
                  <FiX className="h-4 w-4" />
                </button>
              </div>
              <p aria-live="polite" className="mt-2 text-[15px] leading-relaxed">
                {t(`pet.tour.${stop.key}`)}
              </p>
              {(lines.length > 0 || loadingLive) && (
                <div className="mt-3 rounded-2xl bg-canvas px-3.5 py-3" aria-live="polite">
                  <p className="t-sm flex items-center gap-2 font-semibold text-chalk">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-chalk opacity-70" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-chalk" />
                    </span>
                    {t("pet.live")}
                  </p>
                  {loadingLive ? (
                    <p className="t-sm mt-1.5 text-ink-2">{t("pet.checking")}</p>
                  ) : (
                    <ul className="mt-1.5 space-y-1">
                      {lines.map((l) => (
                        <li key={l} className="t-sm text-ink">
                          {l}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
              <div className="mt-3 flex gap-1" aria-hidden>
                {STOPS.map((s, i) => (
                  <span key={s.key} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? "bg-chalk" : "bg-rule"}`} />
                ))}
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button type="button" className={`${btn} border border-rule`} onClick={prev} disabled={step === 0}>
                  <FiChevronLeft aria-hidden className="h-4 w-4" /> {t("pet.back")}
                </button>
                <button type="button" className={`${btn} border border-rule`} onClick={() => setAuto((a) => !a)} aria-pressed={auto}>
                  {auto ? <FiPause aria-hidden className="h-3.5 w-3.5" /> : <FiPlay aria-hidden className="h-3.5 w-3.5" />} {auto ? t("pet.pause") : t("pet.auto")}
                </button>
                {step < STOPS.length - 1 ? (
                  <button type="button" className={`${btn} ml-auto bg-chalk text-chalk-ink`} onClick={next}>
                    {t("pet.next")} <FiChevronRight aria-hidden className="h-4 w-4" />
                  </button>
                ) : (
                  <button type="button" className={`${btn} ml-auto bg-chalk text-chalk-ink`} onClick={openContact}>
                    {t("pet.hireMessage")}
                  </button>
                )}
              </div>
              {step === STOPS.length - 1 && (
                <div className="mt-2 flex gap-2">
                  <a className={`${btn} flex-1 border border-rule`} href={`mailto:${profile.email}`}>
                    {t("pet.hireEmail")}
                  </a>
                  <a className={`${btn} flex-1 border border-rule`} href={profile.links.aira} target="_blank" rel="noopener noreferrer">
                    Aira <FiArrowUpRight aria-hidden className="h-3.5 w-3.5" />
                  </a>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4">
              <p className="text-[14px] leading-snug">{greet ? t("pet.idle") : t("pet.sleep")}</p>
              <div className="mt-3 flex items-center gap-2">
                <button type="button" className={`${btn} bg-chalk text-chalk-ink`} onClick={startTour}>
                  {t("pet.start")}
                </button>
                <button type="button" className="t-sm ml-auto text-ink-2 underline-offset-4 hover:underline" onClick={hide}>
                  {t("pet.hide")}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <div
        ref={wrap}
        data-pet
        data-arrived={touring && arrived ? "true" : "false"}
        className="pointer-events-none fixed left-0 top-0 z-[72]"
        style={{ transform: "translate(-999px,-999px)" }}
      >
        <button
          ref={petBtn}
          type="button"
          onClick={() => (touring ? next() : startTour())}
          onPointerEnter={() => setMood((m) => (m === "sleep" ? m : "happy"))}
          onPointerLeave={() => !traveling.current && setMood((m) => (m === "happy" ? "idle" : m))}
          aria-label={t("pet.open")}
          aria-describedby={showBubble ? bubbleId : undefined}
          className="pointer-events-auto block h-[60px] w-[60px] rounded-full sm:h-[78px] sm:w-[78px]"
        >
          <span className="pet-flip block h-full w-full">
            <span className="pet-bob block h-full w-full">
              <PetSvg mood={mood} />
            </span>
          </span>
        </button>
      </div>
    </>
  );
}
