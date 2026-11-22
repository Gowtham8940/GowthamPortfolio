"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import { FiArrowUpRight, FiX, FiChevronLeft, FiChevronRight, FiPlay, FiPause, FiVolume2, FiVolumeX } from "react-icons/fi";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { profile } from "@/lib/data/portfolio";
import { sfx, sound } from "@/lib/sound";

// Chalky: an original cat-bot mascot in the site's chalk green. Click it and
// it flies from section to section, lands beside each heading, stays attached
// while you scroll, and reports live data there (site uptime, store installs,
// newest article and video, the time in India). It ends by pitching Gowtham.
//
// It is also a little pet: hover to say hi, rub it to make it purr, drag it
// anywhere (and throw it), click it too fast and it gets dizzy. It talks in
// typed-out blips, does small tricks when left alone, and leans into your scroll.

function PetSvg({ mood }) {
  const gid = useId().replace(/:/g, "");
  const eyesOpen = mood === "idle" || mood === "surprised";
  const happy = mood === "happy";
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full overflow-visible" aria-hidden>
      <defs>
        <radialGradient id={`${gid}b`} cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#6ee0a8" />
          <stop offset="100%" stopColor="#1f6b4a" />
        </radialGradient>
        <radialGradient id={`${gid}g`}>
          <stop offset="0%" stopColor="#ffe48a" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffe48a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="112" rx="30" ry="5" fill="rgb(16 17 20 / 0.18)" className="pet-shadow" />
      <g className="pet-body">
        <path className="pet-tail" d="M88 86 C 108 84, 112 62, 100 54" stroke="#1f6b4a" strokeWidth="9" strokeLinecap="round" fill="none" />
        {/* antenna: it's a cat-bot */}
        <g className="pet-antenna">
          <path d="M60 30 Q 58 20 61 11" stroke="#1f6b4a" strokeWidth="3" strokeLinecap="round" fill="none" />
          <circle className="pet-glow" cx="61" cy="9" r="9" fill={`url(#${gid}g)`} />
          <circle className="pet-tip-ball" cx="61" cy="9" r="4.2" fill="#f5c542" stroke="#c99a1f" strokeWidth="1" />
        </g>
        <g className="pet-ear-l">
          <path d="M30 40 L 34 14 L 50 32 Z" fill="#2a8a5f" stroke="#1f6b4a" strokeWidth="2" strokeLinejoin="round" />
          <path d="M36 22 L 39 32 L 45 30 Z" fill="#f5c542" opacity="0.8" />
        </g>
        <g className="pet-ear-r">
          <path d="M90 40 L 86 14 L 70 32 Z" fill="#2a8a5f" stroke="#1f6b4a" strokeWidth="2" strokeLinejoin="round" />
          <path d="M84 22 L 81 32 L 75 30 Z" fill="#f5c542" opacity="0.8" />
        </g>
        {/* paws sit behind the body until they wave */}
        <rect className="pet-paw-l" x="16" y="70" width="13" height="22" rx="6.5" fill="#2a8a5f" stroke="#1f6b4a" strokeWidth="2" />
        <rect className="pet-paw-r" x="91" y="70" width="13" height="22" rx="6.5" fill="#2a8a5f" stroke="#1f6b4a" strokeWidth="2" />
        <rect x="22" y="28" width="76" height="78" rx="36" fill={`url(#${gid}b)`} />
        <ellipse cx="46" cy="44" rx="12" ry="6" fill="#fff" opacity="0.16" transform="rotate(-18 46 44)" />
        <ellipse cx="60" cy="82" rx="22" ry="16" fill="#c9f1dc" opacity="0.55" />
        <g className="pet-face">
          {mood === "sleep" && (
            <g stroke="#0e1210" strokeWidth="3.5" strokeLinecap="round" fill="none">
              <path d="M38 60 q 6 5 12 0" />
              <path d="M70 60 q 6 5 12 0" />
            </g>
          )}
          {happy && (
            <g stroke="#0e1210" strokeWidth="3.5" strokeLinecap="round" fill="none">
              <path d="M38 62 q 6 -8 12 0" />
              <path d="M70 62 q 6 -8 12 0" />
            </g>
          )}
          {mood === "love" && (
            <g fill="#ff5c7a" className="pet-love-eyes">
              <path d="M44 66 l-7.5 -7 a4.6 4.6 0 0 1 7.5 -5.2 a4.6 4.6 0 0 1 7.5 5.2 z" />
              <path d="M76 66 l-7.5 -7 a4.6 4.6 0 0 1 7.5 -5.2 a4.6 4.6 0 0 1 7.5 5.2 z" />
            </g>
          )}
          {mood === "dizzy" && (
            <g stroke="#0e1210" strokeWidth="2.6" strokeLinecap="round" fill="none">
              <path className="pet-spiral" d="M44 58 m-7 0 a7 7 0 1 0 14 0 a5 5 0 1 0 -10 0 a3 3 0 1 0 6 0" />
              <path className="pet-spiral" d="M76 58 m-7 0 a7 7 0 1 0 14 0 a5 5 0 1 0 -10 0 a3 3 0 1 0 6 0" />
            </g>
          )}
          {eyesOpen && (
            <g className="pet-eyes">
              <ellipse cx="44" cy="58" rx={mood === "surprised" ? 10 : 9} ry={mood === "surprised" ? 11.5 : 10} fill="#fff" />
              <ellipse cx="76" cy="58" rx={mood === "surprised" ? 10 : 9} ry={mood === "surprised" ? 11.5 : 10} fill="#fff" />
              <g className="pet-pupils">
                <circle cx="44" cy="59" r={mood === "surprised" ? 3.4 : 4.6} fill="#0e1210" />
                <circle cx="76" cy="59" r={mood === "surprised" ? 3.4 : 4.6} fill="#0e1210" />
                <circle cx="46" cy="57" r="1.5" fill="#fff" />
                <circle cx="78" cy="57" r="1.5" fill="#fff" />
              </g>
            </g>
          )}
          <circle className="pet-blush" cx="33" cy="72" r="5" fill="#ff8fa3" opacity={mood === "love" ? 0.9 : 0.55} />
          <circle className="pet-blush" cx="87" cy="72" r="5" fill="#ff8fa3" opacity={mood === "love" ? 0.9 : 0.55} />
          {mood === "surprised" ? (
            <ellipse cx="60" cy="76" rx="4.5" ry="5.5" fill="#0e1210" />
          ) : mood === "dizzy" ? (
            <path d="M52 75 q 4 -4 8 0 t 8 0" stroke="#0e1210" strokeWidth="3" strokeLinecap="round" fill="none" />
          ) : (
            <path
              d={happy || mood === "love" ? "M52 72 q 8 9 16 0" : "M54 73 q 6 5 12 0"}
              stroke="#0e1210"
              strokeWidth="3"
              strokeLinecap="round"
              fill={happy || mood === "love" ? "#0e1210" : "none"}
            />
          )}
        </g>
        <rect x="36" y="100" width="14" height="9" rx="4.5" fill="#1f6b4a" />
        <rect x="70" y="100" width="14" height="9" rx="4.5" fill="#1f6b4a" />
      </g>
      {mood === "sleep" && (
        <g className="pet-z" fill="#1f6b4a" fontWeight="700" fontFamily="system-ui">
          <text x="94" y="30" fontSize="14">z</text>
          <text x="104" y="16" fontSize="10">z</text>
        </g>
      )}
    </svg>
  );
}

// Speech typed out a letter at a time, each with a tiny blip. Screen readers
// get the whole sentence at once; the untyped rest is laid out invisibly so the
// bubble never changes size mid-sentence.
const segmenter = typeof Intl !== "undefined" && Intl.Segmenter ? new Intl.Segmenter(undefined, { granularity: "grapheme" }) : null;
const graphemes = (s) => (segmenter ? Array.from(segmenter.segment(s), (g) => g.segment) : Array.from(s));

function Speech({ text, className = "", live = false }) {
  // Keyed by text at the call site, so each sentence mounts fresh at n = 0.
  const all = useMemo(() => graphemes(text), [text]);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = setTimeout(() => setN(all.length), 0);
      return () => clearTimeout(id);
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setN(i);
      const ch = all[i - 1] || "";
      if (i % 2 === 0 && ch.trim()) sfx.blip({ soft: true, seed: ch.codePointAt(0) });
      if (i >= all.length) clearInterval(id);
    }, 24);
    return () => clearInterval(id);
  }, [all]);
  const shown = all.slice(0, n).join("");
  const rest = all.slice(n).join("");
  const done = n >= all.length;
  return (
    <p className={className} aria-live={live ? "polite" : undefined} onClick={() => setN(all.length)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {shown}
        {!done && <span className="pet-caret" />}
        <span className="opacity-0">{rest}</span>
      </span>
    </p>
  );
}

// ── Tour stops: where Chalky scrolls to, and what it lands next to ──────────
const STOPS = [
  { key: "top", section: "#top", anchor: ".hero-portrait" },
  { key: "ai", section: "#ai", anchor: "#ai h2" },
  { key: "device", section: "#device-title", anchor: "#device-title", offset: -140 },
  { key: "work", section: "#work", anchor: "#work h2" },
  { key: "apps", section: "#apps", anchor: "#apps h2" },
  { key: "stack", section: "#stack", anchor: "#stack h2" },
  { key: "experience", section: "#experience", anchor: "#experience h2" },
  { key: "writing", section: "#writing", anchor: "#writing h2" },
  { key: "contact", section: "#contact", anchor: "#contact h2" },
];
const NO_LIVE = ["top", "contact", "experience", "stack"];
const HIDE_KEY = "gj-pet-hidden";
const GREET_KEY = "gj-pet-greeted";
const HOME_KEY = "gj-pet-home";
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

// Little particles (hearts, sparkles, dust) that float out of Chalky.
const FX_SVG = {
  heart:
    '<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="#ff5c7a" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',
  star: '<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="#f5c542" d="M12 1.5l2.5 8 8 2.5-8 2.5-2.5 8-2.5-8-8-2.5 8-2.5z"/></svg>',
  dust: '<svg viewBox="0 0 24 24" width="100%" height="100%"><circle cx="12" cy="12" r="10" fill="rgb(120 130 125 / 0.45)"/></svg>',
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
  if (!live && !NO_LIVE.includes(key)) return null;
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
  const soundOn = useSyncExternalStore(sound.subscribe, sound.isOn, sound.serverOn);
  const wrap = useRef(null);
  const petBtn = useRef(null);
  const bubble = useRef(null);
  const pos = useRef({ x: -999, y: -999 });
  const bub = useRef({ x: 0, y: 0, tx: 0, ty: 0, el: null });
  const home = useRef(null);
  const traveling = useRef(false);
  const stepRef = useRef(0);
  const state = useRef({ touring: false, arrived: false, mood: "idle" });
  const drag = useRef({ down: false, active: false, sx: 0, sy: 0, ox: 0, oy: 0, lx: 0, ly: 0, lt: 0, vx: 0, vy: 0 });
  const suppressClick = useRef(false);
  const pet = useRef({ acc: 0, stop: null, timer: 0 });
  const clicks = useRef([]);
  const lean = useRef({ scroll: 0, cursor: 0, drag: 0 });
  const moodTimer = useRef(0);
  const [hidden, setHidden] = useState(false);
  const [touring, setTouring] = useState(false);
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(false);
  const [arrived, setArrived] = useState(false);
  const [greet, setGreet] = useState(false);
  const [mood, setMoodState] = useState("idle");
  const [live, setLive] = useState(null);
  const clock = useIndiaClock(touring, locale);

  const setMood = useCallback((m) => {
    setMoodState((prev) => {
      const next = typeof m === "function" ? m(prev) : m;
      state.current.mood = next;
      return next;
    });
  }, []);
  // Show a mood for a moment, then settle back to idle.
  const flashMood = useCallback(
    (m, ms) => {
      clearTimeout(moodTimer.current);
      setMood(m);
      moodTimer.current = setTimeout(() => setMood((cur) => (cur === m ? "idle" : cur)), ms);
    },
    [setMood]
  );

  useEffect(() => {
    state.current.touring = touring;
    state.current.arrived = arrived;
  }, [touring, arrived]);

  // Scroll velocity makes Chalky lean and stretch (applied in the ticker below).
  useLenis((l) => {
    lean.current.scroll = l.velocity || 0;
  });

  // ── Positioning ───────────────────────────────────────────────────────────
  const corner = () => {
    const S = petSize();
    const h = home.current;
    if (h) return { x: clamp(h.x, 8, window.innerWidth - S - 8), y: clamp(h.y, NAV_H, window.innerHeight - S - 8) };
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
    // Headings are full-width blocks; sit beside the words, not the block.
    let r = el.getBoundingClientRect();
    // (SplitText wraps lines in block divs, so measure the text nodes themselves.)
    if (/^H\d$/.test(el.tagName)) {
      const range = document.createRange();
      const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      let L = Infinity, R = -Infinity, T = Infinity, B = -Infinity;
      for (let n = walk.nextNode(); n; n = walk.nextNode()) {
        if (!n.textContent.trim()) continue;
        range.selectNodeContents(n);
        const b = range.getBoundingClientRect();
        if (!b.width) continue;
        L = Math.min(L, b.left);
        R = Math.max(R, b.right);
        T = Math.min(T, b.top);
        B = Math.max(B, b.bottom);
      }
      if (R > L) r = { left: L, right: R, top: T, bottom: B, width: R - L, height: B - T };
    }
    if (isPhone()) {
      return { x: clamp(r.right - S, 8, vw - S - 8), y: clamp(r.top - S + 14, NAV_H, Math.max(NAV_H, maxY)) };
    }
    let x = r.right + 14;
    if (x + S > vw - 12) x = r.left - S - 14;
    if (x < 12) x = clamp(r.left, 12, vw - S - 12);
    return { x, y: clamp(r.top + Math.min(r.height, 140) / 2 - S / 2, NAV_H, maxY) };
  }, []);

  // Write pet position straight to the DOM (no React render per frame). The
  // bubble gets a target; the ticker eases it there so it trails like a balloon.
  const place = useCallback((x, y) => {
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
    const B = bub.current;
    B.tx = clamp(left, 12, window.innerWidth - bw - 12);
    B.ty = clamp(y + S / 2 - bh / 2, NAV_H, window.innerHeight - bh - 12);
    if (B.el !== b) {
      // Fresh bubble: start exactly in place.
      B.el = b;
      B.x = B.tx;
      B.y = B.ty;
      gsap.set(b, { x: B.x, y: B.y });
    }
  }, []);

  // Particle burst from Chalky.
  const burst = useCallback((kind, n = 5, spread = 1) => {
    if (reducedMotion()) return;
    const layer = wrap.current?.querySelector(".pet-fx");
    if (!layer) return;
    const S = petSize();
    for (let i = 0; i < n; i++) {
      const el = document.createElement("span");
      el.className = "absolute block";
      const size = kind === "dust" ? 8 + Math.random() * 8 : 12 + Math.random() * 10;
      el.style.cssText = `width:${size}px;height:${size}px;left:${S / 2 - size / 2}px;top:${kind === "dust" ? S - size : S * 0.3}px`;
      el.innerHTML = FX_SVG[kind];
      layer.appendChild(el);
      const ang = kind === "dust" ? (i / (n - 1 || 1)) * Math.PI : -Math.PI / 2 + (Math.random() - 0.5) * 1.6 * spread;
      const dist = (kind === "dust" ? 26 : 40 + Math.random() * 40) * spread;
      gsap.fromTo(
        el,
        { scale: 0.2, opacity: 1, rotate: (Math.random() - 0.5) * 40 },
        {
          x: Math.cos(ang) * dist * (kind === "dust" ? -1 : 1),
          y: kind === "dust" ? -4 : Math.sin(ang) * dist - 20,
          scale: 1,
          opacity: 0,
          rotate: (Math.random() - 0.5) * 60,
          duration: kind === "dust" ? 0.5 : 0.9 + Math.random() * 0.5,
          ease: "power2.out",
          onComplete: () => el.remove(),
        }
      );
    }
  }, []);

  // Landing squash + dust + boing.
  const squash = useCallback(() => {
    const body = wrap.current?.querySelector(".pet-body");
    sfx.land({ soft: true });
    burst("dust", 5);
    if (!body || reducedMotion()) return;
    gsap
      .timeline()
      .to(body, { scaleY: 0.8, scaleX: 1.16, transformOrigin: "50% 100%", duration: 0.1, ease: "power2.out" })
      .to(body, { scaleY: 1, scaleX: 1, duration: 0.6, ease: "elastic.out(1.1, 0.35)" });
  }, [burst]);

  // Fly along an arc to (tx, ty): crouch, leap, lean into the move, squash on landing.
  const travel = useCallback(
    (tx, ty, done) => {
      const from = { ...pos.current };
      const dx = tx - from.x;
      const dist = Math.hypot(dx, ty - from.y);
      const flip = wrap.current?.querySelector(".pet-flip");
      if (flip) gsap.to(flip, { scaleX: dx < -4 ? -1 : 1, duration: 0.18 });
      if (reducedMotion() || from.x < -100 || dist < 4) {
        place(tx, ty);
        done?.();
        return;
      }
      traveling.current = true;
      setMood("happy");
      sfx.whoosh({ soft: true });
      const arc = Math.min(170, 50 + dist * 0.28);
      const body = wrap.current.querySelector(".pet-body");
      const p = { v: 0 };
      gsap
        .timeline({
          onComplete: () => {
            traveling.current = false;
            setMood((m) => (m === "happy" ? "idle" : m));
            done?.();
          },
        })
        .to(body, { scaleY: 0.78, scaleX: 1.14, transformOrigin: "50% 100%", duration: 0.13, ease: "power2.in" })
        .to(body, { scaleY: 1.1, scaleX: 0.92, rotate: dx < 0 ? -12 : 12, duration: 0.16, ease: "power2.out" })
        .to(
          p,
          {
            v: 1,
            duration: clamp(dist / 900, 0.55, 1.1),
            ease: "power2.inOut",
            onUpdate: () => place(from.x + dx * p.v, from.y + (ty - from.y) * p.v - Math.sin(p.v * Math.PI) * arc),
          },
          "<"
        )
        .to(body, { rotate: 0, duration: 0.15 }, "-=0.18")
        .add(squash);
    },
    [place, setMood, squash]
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
        travel(s.x, s.y, () => {
          setArrived(true);
          if (i === STOPS.length - 1) {
            sfx.sparkle({ soft: true });
            burst("star", 8, 1.3);
            burst("heart", 5, 1.1);
          }
        });
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
    [lenis, spotFor, travel, burst]
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
    sfx.bye({ soft: true });
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
  // Start in the corner (or wherever the visitor last dropped Chalky).
  useEffect(() => {
    const id = setTimeout(() => {
      setHidden(safeGet("localStorage", HIDE_KEY) === "1");
      try {
        home.current = JSON.parse(safeGet("sessionStorage", HOME_KEY) || "null");
      } catch {
        home.current = null;
      }
      const c = corner();
      place(c.x, c.y);
    }, 0);
    return () => clearTimeout(id);
  }, [place]);

  // One ticker drives all following: Chalky eases toward its spot (stop anchor
  // or home) every frame instead of restarting tweens on each scroll event, the
  // bubble trails behind it, and scroll/cursor/drag set the lean.
  useEffect(() => {
    if (hidden) return;
    const leanEl = wrap.current?.querySelector(".pet-lean");
    // (quickTo can't drive rotation, so the lean is eased by hand here.)
    const cur = { r: 0, s: 1 };
    const reduced = reducedMotion();
    const tick = () => {
      const k = 1 - Math.pow(1 - 0.16, gsap.ticker.deltaRatio());
      const st = state.current;
      if (!traveling.current && !drag.current.active) {
        const s = st.touring && st.arrived ? spotFor(stepRef.current) : st.touring ? null : corner();
        if (s) {
          const dx = s.x - pos.current.x;
          const dy = s.y - pos.current.y;
          if (Math.abs(dx) > 0.3 || Math.abs(dy) > 0.3) place(pos.current.x + dx * (reduced ? 1 : k), pos.current.y + dy * (reduced ? 1 : k));
        }
      }
      const B = bub.current;
      if (B.el && bubble.current === B.el && !isPhone()) {
        const kb = reduced ? 1 : 1 - Math.pow(1 - 0.22, gsap.ticker.deltaRatio());
        B.x += (B.tx - B.x) * kb;
        B.y += (B.ty - B.y) * kb;
        gsap.set(B.el, { x: B.x, y: B.y });
      }
      if (leanEl && !reduced) {
        const L = lean.current;
        const v = clamp(L.scroll, -60, 60);
        const kl = 1 - Math.pow(1 - 0.12, gsap.ticker.deltaRatio());
        const tr = clamp(L.drag || L.cursor + v * 0.25, -24, 24);
        const ts = 1 + clamp(Math.abs(v) * 0.0025, 0, 0.1);
        if (Math.abs(tr - cur.r) > 0.05 || Math.abs(ts - cur.s) > 0.001) {
          cur.r += (tr - cur.r) * kl;
          cur.s += (ts - cur.s) * kl;
          gsap.set(leanEl, { rotate: cur.r, scaleY: cur.s });
        }
        L.scroll *= 0.9;
      }
    };
    gsap.ticker.add(tick);
    const kick = () => place(pos.current.x, pos.current.y);
    window.addEventListener("resize", kick);
    ScrollTrigger.addEventListener("refresh", kick);
    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("resize", kick);
      ScrollTrigger.removeEventListener("refresh", kick);
    };
  }, [hidden, spotFor, place]);

  // Re-measure the bubble when its content (and size) changes.
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

  // The greeting steps aside on its own: after a while, or once the visitor scrolls on.
  useEffect(() => {
    if (!greet) return;
    const startY = window.scrollY;
    const id = setTimeout(() => setGreet(false), 12000);
    const onScroll = () => Math.abs(window.scrollY - startY) > 500 && setGreet(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(id);
      window.removeEventListener("scroll", onScroll);
    };
  }, [greet]);

  // First-visit greeting, with a wave.
  useEffect(() => {
    if (hidden || safeGet("sessionStorage", GREET_KEY)) return;
    const id = setTimeout(() => {
      if (safeGet("sessionStorage", GREET_KEY)) return;
      safeSet("sessionStorage", GREET_KEY, "1");
      setGreet(true);
      window.dispatchEvent(new Event("chalky-wave"));
    }, 5000);
    return () => clearTimeout(id);
  }, [hidden]);

  // Falling asleep yawns (only if sound is already running).
  useEffect(() => {
    if (mood === "sleep") sfx.yawn({ soft: true });
  }, [mood]);

  // Idle life: bob, blink, wag, glow, eyes follow the pointer, little tricks
  // every so often, nap when left alone.
  useEffect(() => {
    if (hidden) return;
    const el = wrap.current;
    const reduced = reducedMotion();
    const q = (s) => el.querySelector(s);
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.to(".pet-bob", { y: -4, duration: 1.4, ease: "sine.inOut", repeat: -1, yoyo: true });
      gsap.to(".pet-shadow", { scaleX: 0.85, transformOrigin: "50% 50%", duration: 1.4, ease: "sine.inOut", repeat: -1, yoyo: true });
      gsap.to(".pet-tail", { rotate: 14, transformOrigin: "88px 86px", duration: 0.5, ease: "sine.inOut", repeat: -1, yoyo: true });
      gsap.to(".pet-antenna", { rotate: 6, transformOrigin: "60px 30px", duration: 1.1, ease: "sine.inOut", repeat: -1, yoyo: true });
      gsap.to(".pet-glow", { opacity: 0.25, scale: 0.7, transformOrigin: "61px 9px", duration: 1.2, ease: "sine.inOut", repeat: -1, yoyo: true });
    }, el);

    const tricks = {
      wave: () => {
        const paw = q(".pet-paw-r");
        if (!paw) return;
        gsap
          .timeline()
          .to(paw, { rotate: -150, y: -10, transformOrigin: "97px 74px", duration: 0.25, ease: "back.out(2)" })
          .to(paw, { rotate: -115, duration: 0.14, yoyo: true, repeat: 5, ease: "sine.inOut" })
          .to(paw, { rotate: 0, y: 0, duration: 0.35, ease: "power2.inOut" });
      },
      look: () => {
        const p = q(".pet-pupils");
        if (p) gsap.timeline().to(p, { x: -3.5, duration: 0.25 }).to(p, { x: 3.5, duration: 0.35, delay: 0.5 }).to(p, { x: 0, duration: 0.25, delay: 0.5 });
      },
      hop: () => {
        const b = q(".pet-body");
        gsap
          .timeline()
          .to(b, { scaleY: 0.85, scaleX: 1.1, transformOrigin: "50% 100%", duration: 0.12 })
          .to(b, { y: -18, scaleY: 1.08, scaleX: 0.95, duration: 0.22, ease: "power2.out" })
          .to(b, { y: 0, scaleY: 1, scaleX: 1, duration: 0.5, ease: "bounce.out" });
      },
      ears: () => {
        gsap.fromTo(q(".pet-ear-l"), { rotate: 0 }, { rotate: -14, transformOrigin: "40px 38px", duration: 0.08, yoyo: true, repeat: 3 });
        gsap.fromTo(q(".pet-ear-r"), { rotate: 0 }, { rotate: 14, transformOrigin: "80px 38px", duration: 0.08, yoyo: true, repeat: 3, delay: 0.15 });
      },
      stretch: () => {
        const b = q(".pet-body");
        gsap
          .timeline()
          .to(b, { scaleX: 1.16, scaleY: 0.86, transformOrigin: "50% 100%", duration: 0.5, ease: "sine.inOut" })
          .to(b, { scaleX: 1, scaleY: 1, duration: 0.7, ease: "elastic.out(1, 0.4)" });
      },
      spin: () => {
        gsap.fromTo(q(".pet-tail"), { rotate: 0 }, { rotate: 40, duration: 0.12, yoyo: true, repeat: 5, transformOrigin: "88px 86px" });
      },
    };
    const names = Object.keys(tricks);
    let trickTimer = 0;
    const trick = () => {
      const st = state.current;
      if (!reduced && st.mood === "idle" && !traveling.current && !drag.current.active && !document.hidden) {
        tricks[names[Math.floor(Math.random() * names.length)]]();
      }
      trickTimer = setTimeout(trick, 7000 + Math.random() * 7000);
    };
    trickTimer = setTimeout(trick, 6000);
    const onWave = () => !reduced && tricks.wave();
    window.addEventListener("chalky-wave", onWave);

    let blinkTimer = 0;
    const blink = () => {
      const eyes = q(".pet-eyes");
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
      const b = el.getBoundingClientRect();
      const dxRaw = e.clientX - (b.left + b.width / 2);
      const dyRaw = e.clientY - (b.top + b.height / 2);
      // Lean toward a nearby cursor, as if curious.
      const near = Math.hypot(dxRaw, dyRaw) < 180;
      lean.current.cursor = near ? clamp(dxRaw / 18, -8, 8) : 0;
      const pupils = q(".pet-pupils");
      if (!pupils || reduced) return;
      const flipped = gsap.getProperty(q(".pet-flip"), "scaleX") < 0 ? -1 : 1;
      const dx = dxRaw * flipped;
      const d = Math.hypot(dx, dyRaw) || 1;
      gsap.to(pupils, { x: (dx / d) * 3.5, y: (dyRaw / d) * 3, duration: 0.3 });
    };
    napTimer = setTimeout(() => setMood((m) => (m === "idle" ? "sleep" : m)), 30000);
    window.addEventListener("pointermove", look, { passive: true });
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("keydown", wake);
    return () => {
      ctx.revert();
      clearTimeout(blinkTimer);
      clearTimeout(napTimer);
      clearTimeout(trickTimer);
      window.removeEventListener("chalky-wave", onWave);
      window.removeEventListener("pointermove", look);
      window.removeEventListener("scroll", wake);
      window.removeEventListener("keydown", wake);
    };
  }, [hidden, setMood]);

  // ── Petting: rub the cursor over Chalky and it purrs, hearts floating up ───
  const stopPetting = useCallback(() => {
    const P = pet.current;
    P.acc = 0;
    P.stop?.();
    P.stop = null;
    clearInterval(P.timer);
    P.timer = 0;
    setMood((m) => (m === "love" ? "idle" : m));
  }, [setMood]);

  useEffect(() => stopPetting, [stopPetting]);

  const onHoverMove = (e) => {
    if (drag.current.down || traveling.current || e.pointerType !== "mouse") return;
    const P = pet.current;
    P.acc = P.acc * 0.97 + Math.hypot(e.movementX || 0, e.movementY || 0);
    if (P.acc > 240 && !P.timer) {
      clearTimeout(moodTimer.current);
      setMood("love");
      sfx.meow({ soft: true });
      P.stop = sfx.purr();
      burst("heart", 3);
      P.timer = setInterval(() => burst("heart", 1), 380);
    }
  };

  // ── Dragging: pick Chalky up, carry it anywhere, throw it ─────────────────
  const onPointerDown = (e) => {
    if (e.button !== 0 || traveling.current) return;
    const D = drag.current;
    D.down = true;
    D.active = false;
    D.sx = e.clientX;
    D.sy = e.clientY;
    D.ox = e.clientX - pos.current.x;
    D.oy = e.clientY - pos.current.y;
    D.lx = e.clientX;
    D.ly = e.clientY;
    D.lt = performance.now();
    D.vx = D.vy = 0;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    const D = drag.current;
    if (!D.down) return onHoverMove(e);
    if (!D.active) {
      if (Math.hypot(e.clientX - D.sx, e.clientY - D.sy) < 6) return;
      D.active = true;
      stopPetting();
      clearTimeout(moodTimer.current);
      setMood("surprised");
      sfx.pickup();
      setGreet(false);
    }
    const now = performance.now();
    const dt = Math.max(1, now - D.lt);
    D.vx = D.vx * 0.6 + ((e.clientX - D.lx) / dt) * 0.4 * 16;
    D.vy = D.vy * 0.6 + ((e.clientY - D.ly) / dt) * 0.4 * 16;
    D.lx = e.clientX;
    D.ly = e.clientY;
    D.lt = now;
    // Dangle opposite the motion, like being held by the scruff.
    lean.current.drag = clamp(-D.vx * 1.4, -28, 28) || 0.001;
    const S = petSize();
    place(clamp(e.clientX - D.ox, 4, window.innerWidth - S - 4), clamp(e.clientY - D.oy, 4, window.innerHeight - S - 4));
  };

  const onPointerUp = () => {
    const D = drag.current;
    if (!D.down) return;
    D.down = false;
    if (!D.active) return;
    suppressClick.current = true;
    setTimeout(() => (suppressClick.current = false), 0);
    lean.current.drag = 0;
    const S = petSize();
    const tx = clamp(pos.current.x + D.vx * 9, 8, window.innerWidth - S - 8);
    const ty = clamp(pos.current.y + D.vy * 9, NAV_H, window.innerHeight - S - 8);
    const p = { x: pos.current.x, y: pos.current.y };
    setMood("happy");
    gsap.to(p, {
      x: tx,
      y: ty,
      duration: reducedMotion() ? 0 : 0.55,
      ease: "power3.out",
      onUpdate: () => place(p.x, p.y),
      onComplete: () => {
        D.active = false;
        squash();
        flashMood("happy", 700);
        if (!state.current.touring) {
          home.current = { x: tx, y: ty };
          safeSet("sessionStorage", HOME_KEY, JSON.stringify(home.current));
        }
      },
    });
  };

  // ── Click: boop (and the tour). Click too fast and Chalky gets dizzy. ─────
  const onClick = () => {
    if (suppressClick.current) return;
    const now = Date.now();
    clicks.current = [...clicks.current.filter((c) => now - c < 1400), now];
    if (clicks.current.length >= 5) {
      clicks.current = [];
      stopPetting();
      flashMood("dizzy", 1900);
      sfx.dizzy();
      burst("star", 6, 0.9);
      if (!reducedMotion()) {
        gsap.fromTo(wrap.current.querySelector(".pet-body"), { rotate: 0 }, { rotate: 720, transformOrigin: "50% 60%", duration: 1.1, ease: "power3.out" });
      }
      return;
    }
    sfx.boop();
    burst("star", 3, 0.7);
    if (touring) next();
    else startTour();
  };

  const onEnter = (e) => {
    if (e.pointerType !== "mouse") return;
    setMood((m) => (m === "idle" ? "happy" : m));
    if (!traveling.current) sfx.chirp({ soft: true });
    const el = wrap.current;
    if (el && !reducedMotion()) {
      gsap.fromTo(el.querySelector(".pet-ear-l"), { rotate: 0 }, { rotate: -12, transformOrigin: "40px 38px", duration: 0.08, yoyo: true, repeat: 1 });
      gsap.fromTo(el.querySelector(".pet-ear-r"), { rotate: 0 }, { rotate: 12, transformOrigin: "80px 38px", duration: 0.08, yoyo: true, repeat: 1 });
    }
  };
  const onLeave = () => {
    stopPetting();
    if (!traveling.current && !drag.current.active) setMood((m) => (m === "happy" ? "idle" : m));
  };

  // ── Actions ───────────────────────────────────────────────────────────────
  const hide = () => {
    safeSet("localStorage", HIDE_KEY, "1");
    stopPetting();
    sfx.bye({ soft: true });
    setTouring(false);
    setGreet(false);
    setHidden(true);
  };
  const show = () => {
    safeSet("localStorage", HIDE_KEY, "0");
    sfx.chirp();
    setHidden(false);
    setTimeout(() => {
      const c = corner();
      place(c.x, c.y);
      window.dispatchEvent(new Event("chalky-wave"));
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
        className="pet-peek fixed bottom-4 right-4 z-[70] grid h-12 w-12 place-items-center rounded-full border border-rule bg-surface p-1 shadow-[0_10px_30px_-10px_rgb(16_17_20/0.5)]"
      >
        <PetSvg mood="sleep" />
      </button>
    );
  }

  const stop = STOPS[step];
  const lines = touring ? (liveLines(stop.key, live, clock, t) || []).filter(Boolean) : [];
  const loadingLive = touring && !live && !NO_LIVE.includes(stop.key);
  const showBubble = touring || greet || mood === "sleep";
  const btn = "pet-btn inline-flex min-h-9 items-center justify-center gap-1 rounded-full px-3.5 text-[13px] font-semibold";
  const SoundIcon = soundOn ? FiVolume2 : FiVolumeX;
  const soundBtn = (
    <button
      type="button"
      onClick={sound.toggle}
      aria-pressed={soundOn}
      aria-label={soundOn ? t("pet.soundOff") : t("pet.soundOn")}
      title={soundOn ? t("pet.soundOff") : t("pet.soundOn")}
      className="pet-btn grid h-8 w-8 place-items-center rounded-full border border-rule text-ink-2 hover:text-ink"
    >
      <SoundIcon className="h-3.5 w-3.5" />
    </button>
  );

  return (
    <>
      {showBubble && (
        <div
          ref={bubble}
          id={bubbleId}
          role="region"
          aria-label={t("pet.name")}
          className={`pet-tip fixed z-[71] rounded-[22px] border border-rule bg-surface text-ink shadow-[0_30px_70px_-24px_rgb(16_17_20/0.5)] ${
            touring ? "w-[min(348px,calc(100vw-24px))]" : "w-[min(290px,calc(100vw-110px))]"
          } max-sm:!bottom-3 max-sm:!left-3 max-sm:!right-3 max-sm:!top-auto max-sm:!w-auto max-sm:!transform-none sm:left-0 sm:top-0`}
        >
          {touring ? (
            <div className="p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="t-sm flex items-center gap-2 text-ink-2">
                  <span className="font-semibold text-chalk">{t("pet.name")}</span>
                  <span aria-hidden>·</span>
                  {t("pet.step", { i: step + 1, n: STOPS.length })}
                </p>
                <div className="flex items-center gap-1.5">
                  {soundBtn}
                  <button type="button" onClick={endTour} aria-label={t("pet.end")} className="pet-btn grid h-8 w-8 place-items-center rounded-full border border-rule">
                    <FiX className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <Speech key={`${locale}-${stop.key}`} live text={t(`pet.tour.${stop.key}`)} className="mt-2 min-h-[3.2em] cursor-default text-[15px] leading-relaxed" />
              {(lines.length > 0 || loadingLive) && (
                <div key={stop.key} className="pet-live mt-3 rounded-2xl bg-canvas px-3.5 py-3" aria-live="polite">
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
                  <span key={s.key} className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-rule">
                    <span
                      className="absolute inset-0 origin-left rounded-full bg-chalk transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)]"
                      style={{ transform: `scaleX(${i <= step ? 1 : 0})`, transitionDelay: i === step ? "150ms" : "0ms" }}
                    />
                  </span>
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
              <Speech key={`${locale}-${greet ? "idle" : "sleep"}`} text={greet ? t("pet.idle") : t("pet.sleep")} className="text-[14px] leading-snug" />
              {greet && <p className="t-sm mt-2 text-ink-2">{t("pet.tricks")}</p>}
              <div className="mt-3 flex items-center gap-2">
                <button type="button" className={`${btn} bg-chalk text-chalk-ink`} onClick={startTour}>
                  {t("pet.start")}
                </button>
                {soundBtn}
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
        <span className="pet-fx pointer-events-none absolute inset-0 overflow-visible" aria-hidden />
        <button
          ref={petBtn}
          type="button"
          onClick={onClick}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onPointerEnter={onEnter}
          onPointerLeave={onLeave}
          aria-label={t("pet.open")}
          aria-describedby={showBubble ? bubbleId : undefined}
          className="pointer-events-auto block h-[60px] w-[60px] cursor-grab touch-none select-none rounded-full active:cursor-grabbing sm:h-[78px] sm:w-[78px]"
        >
          <span className="pet-lean block h-full w-full" style={{ transformOrigin: "50% 40%" }}>
            <span className="pet-flip block h-full w-full">
              <span className="pet-bob block h-full w-full">
                <PetSvg mood={mood} />
              </span>
            </span>
          </span>
        </button>
      </div>
    </>
  );
}
