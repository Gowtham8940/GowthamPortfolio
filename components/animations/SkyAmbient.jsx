"use client";

import React, { useMemo } from "react";

/**
 * Persistent, ultra-subtle celestial ambience that sits behind the entire app.
 * Fades in only in dark mode (see `.sky-ambient` in globals.css): a drifting
 * field of twinkling stars plus two faint nebula glows in the brand purple.
 * Positions are deterministic so server and client markup match (no hydration
 * mismatch, no Math.random at render).
 */
const STARS = Array.from({ length: 48 }, (_, i) => {
  // Deterministic pseudo-random using a cheap hash of the index.
  // Every value is rounded to a fixed precision string so the server-rendered
  // markup is byte-identical to the client render (avoids hydration mismatch).
  const rx = (Math.sin(i * 12.9898) * 43758.5453) % 1;
  const ry = (Math.sin(i * 78.233) * 12543.132) % 1;
  const rs = (Math.sin(i * 3.14) * 921.77) % 1;
  return {
    top: `${(Math.abs(ry) * 100).toFixed(3)}%`,
    left: `${(Math.abs(rx) * 100).toFixed(3)}%`,
    size: `${(1 + Math.abs(rs) * 1.8).toFixed(3)}px`,
    delay: `${(Math.abs(rx + ry) * 5).toFixed(2)}s`,
    dur: `${(2.5 + Math.abs(rs) * 3.5).toFixed(2)}s`,
  };
});

export function SkyAmbient() {
  const stars = useMemo(() => STARS, []);

  return (
    <div className="sky-ambient" aria-hidden="true">
      {/* Nebula glows */}
      <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-purple-600/10 blur-[140px]" />
      <div className="absolute top-1/3 -right-40 w-[480px] h-[480px] rounded-full bg-fuchsia-600/8 blur-[150px]" />
      <div className="absolute bottom-0 left-1/4 w-[420px] h-[420px] rounded-full bg-indigo-600/8 blur-[150px]" />

      {/* Twinkling stars */}
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animation: `twinkle ${s.dur} ease-in-out ${s.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default SkyAmbient;
