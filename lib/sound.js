"use client";

// Tiny synthesized sound kit for Chalky and the stack marquee. Everything is
// made with the Web Audio API at runtime: no audio files to download.
//
// Browsers only allow audio after a user gesture, so the context is created on
// the first pointerdown/keydown. Sounds passed { soft: true } play only when
// audio is already running (never the first sound, never before a gesture),
// which keeps ambient sounds (typing blips, hover ticks) from ever surprising anyone.

const KEY = "gj-sound";
let ctx = null;
let out = null;
let noiseBuf = null;
let on = true;
let loaded = false;
const subs = new Set();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    on = window.localStorage.getItem(KEY) !== "0";
  } catch {
    /* storage blocked: keep default */
  }
}

function unlock() {
  load();
  if (!on || typeof window === "undefined") return;
  if (!ctx) {
    const C = window.AudioContext || window.webkitAudioContext;
    if (!C) return;
    ctx = new C();
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -18;
    out = ctx.createGain();
    out.gain.value = 0.55;
    out.connect(comp);
    comp.connect(ctx.destination);
  }
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
}

if (typeof window !== "undefined") {
  window.addEventListener("pointerdown", unlock, { capture: true, passive: true });
  window.addEventListener("keydown", unlock, { capture: true });
}

function ready(soft) {
  load();
  if (!on || !ctx || ctx.state === "closed") return null;
  if (typeof document !== "undefined" && document.hidden) return null;
  if (soft && ctx.state !== "running") return null;
  return ctx;
}

const rand = (a, b) => a + Math.random() * (b - a);

function tone(c, { type = "sine", f0, f1 = f0, curve, dur = 0.12, vol = 0.2, at = 0, attack = 0.008, filter }) {
  const t = c.currentTime + at;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  if (curve) o.frequency.setValueCurveAtTime(Float32Array.from(curve), t, dur);
  else {
    o.frequency.setValueAtTime(f0, t);
    if (f1 !== f0) o.frequency.exponentialRampToValueAtTime(f1, t + dur);
  }
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  let node = o;
  if (filter) {
    const f = c.createBiquadFilter();
    f.type = filter.type || "lowpass";
    f.frequency.value = filter.f;
    f.Q.value = filter.q ?? 1;
    o.connect(f);
    node = f;
  }
  node.connect(g);
  g.connect(out);
  o.start(t);
  o.stop(t + dur + 0.05);
}

function noiseBuffer(c) {
  if (noiseBuf) return noiseBuf;
  noiseBuf = c.createBuffer(1, c.sampleRate, c.sampleRate);
  const d = noiseBuf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  return noiseBuf;
}

function noise(c, { dur = 0.3, vol = 0.15, type = "bandpass", f0 = 800, f1 = f0, q = 1, at = 0, attack = 0.02 }) {
  const t = c.currentTime + at;
  const src = c.createBufferSource();
  src.buffer = noiseBuffer(c);
  const f = c.createBiquadFilter();
  f.type = type;
  f.Q.value = q;
  f.frequency.setValueAtTime(f0, t);
  if (f1 !== f0) f.frequency.exponentialRampToValueAtTime(f1, t + dur);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(f).connect(g).connect(out);
  src.start(t);
  src.stop(t + dur + 0.05);
}

// Each effect: (opts?) => void. opts.soft = only if audio is already running.
const fx = {
  // Hover hello: two quick rising chirps.
  chirp(c) {
    const r = rand(0.94, 1.08);
    tone(c, { f0: 1100 * r, f1: 1700 * r, dur: 0.07, vol: 0.11 });
    tone(c, { f0: 1400 * r, f1: 2150 * r, dur: 0.08, vol: 0.09, at: 0.075 });
  },
  // Click: soft rounded boop.
  boop(c) {
    const r = rand(0.96, 1.05);
    tone(c, { type: "triangle", f0: 660 * r, f1: 400 * r, dur: 0.15, vol: 0.22 });
    tone(c, { f0: 1320 * r, f1: 820 * r, dur: 0.1, vol: 0.05 });
  },
  pop(c) {
    tone(c, { f0: 420, f1: 1250, dur: 0.06, vol: 0.16 });
  },
  // One "letter" of Chalky's speech; pitch follows the character.
  blip(c, { seed = 0 } = {}) {
    const f = 520 + (seed % 9) * 30;
    tone(c, { type: "triangle", f0: f, f1: f * 1.08, dur: 0.045, vol: 0.06, filter: { f: 2400 } });
  },
  whoosh(c) {
    noise(c, { dur: 0.5, vol: 0.13, f0: 320, f1: 2600, q: 1.4, attack: 0.18 });
  },
  // Landing: little boing plus a soft thud.
  land(c) {
    tone(c, { curve: [560, 250, 360, 330], dur: 0.2, vol: 0.18 });
    noise(c, { dur: 0.09, vol: 0.1, type: "lowpass", f0: 420, attack: 0.004 });
  },
  // Picked up: surprised "eep!"
  pickup(c) {
    tone(c, { curve: [520, 980, 1500], dur: 0.16, vol: 0.13 });
    tone(c, { type: "triangle", curve: [700, 1300, 1900], dur: 0.14, vol: 0.05, at: 0.02 });
  },
  // A tiny electronic meow.
  meow(c) {
    tone(c, {
      type: "sawtooth",
      curve: [600, 880, 1040, 980, 760, 600],
      dur: 0.42,
      vol: 0.09,
      attack: 0.05,
      filter: { f: 1700, q: 3 },
    });
    tone(c, { curve: [1200, 1760, 2080, 1500], dur: 0.38, vol: 0.03, attack: 0.05 });
  },
  sparkle(c) {
    [1046.5, 1318.5, 1568, 2093].forEach((f, i) => {
      tone(c, { f0: f, dur: 0.32, vol: 0.08, at: i * 0.07, attack: 0.004 });
      tone(c, { type: "triangle", f0: f / 2, dur: 0.2, vol: 0.03, at: i * 0.07 });
    });
  },
  dizzy(c) {
    const curve = Array.from({ length: 40 }, (_, i) => 760 - i * 9 + Math.sin(i * 0.9) * 140);
    tone(c, { curve, dur: 1, vol: 0.1, attack: 0.03 });
  },
  yawn(c) {
    tone(c, { type: "triangle", curve: [360, 520, 470, 300, 240], dur: 0.95, vol: 0.07, attack: 0.12, filter: { f: 900 } });
  },
  bye(c) {
    tone(c, { type: "triangle", f0: 880, f1: 520, dur: 0.14, vol: 0.14 });
    tone(c, { type: "triangle", f0: 660, f1: 330, dur: 0.2, vol: 0.12, at: 0.13 });
  },
  tick(c) {
    tone(c, { f0: 2300, f1: 1900, dur: 0.035, vol: 0.035 });
  },
};

// Purring loop while Chalky is petted. Returns a stop function.
function purr() {
  const c = ready(true);
  if (!c) return () => {};
  const t = c.currentTime;
  const src = c.createBufferSource();
  src.buffer = noiseBuffer(c);
  src.loop = true;
  const lp = c.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 240;
  const amp = c.createGain();
  amp.gain.value = 0.5;
  const lfo = c.createOscillator();
  lfo.frequency.value = 24;
  const depth = c.createGain();
  depth.gain.value = 0.5;
  lfo.connect(depth).connect(amp.gain);
  const master = c.createGain();
  master.gain.setValueAtTime(0.0001, t);
  master.gain.exponentialRampToValueAtTime(0.4, t + 0.35);
  src.connect(lp).connect(amp).connect(master).connect(out);
  src.start(t);
  lfo.start(t);
  let stopped = false;
  return () => {
    if (stopped) return;
    stopped = true;
    const n = c.currentTime;
    master.gain.cancelScheduledValues(n);
    master.gain.setValueAtTime(Math.max(0.0001, master.gain.value), n);
    master.gain.exponentialRampToValueAtTime(0.0001, n + 0.3);
    src.stop(n + 0.35);
    lfo.stop(n + 0.35);
  };
}

export const sfx = Object.fromEntries(
  Object.entries(fx).map(([name, fn]) => [
    name,
    (opts = {}) => {
      const c = ready(opts.soft);
      if (!c) return;
      try {
        fn(c, opts);
      } catch {
        /* never let a sound break the page */
      }
    },
  ])
);
sfx.purr = purr;

export const sound = {
  isOn() {
    load();
    return on;
  },
  serverOn: () => true,
  subscribe(fn) {
    subs.add(fn);
    return () => subs.delete(fn);
  },
  set(v) {
    on = v;
    try {
      window.localStorage.setItem(KEY, v ? "1" : "0");
    } catch {
      /* storage blocked */
    }
    subs.forEach((f) => f());
    if (v) {
      unlock();
      setTimeout(() => sfx.chirp(), 30);
    }
  },
  toggle() {
    sound.set(!sound.isOn());
  },
};
