"use client";

import React, { useMemo, useState } from "react";

/**
 * Resilient app-icon renderer with a 3-stage fallback:
 *   1. `app.iconUrl` — pre-resolved direct CDN image (browser-cached, instant)
 *   2. `app.icon`    — our /api/app-icon route (runtime resolver)
 *   3. a coloured letter tile
 *
 * Stages are precomputed into a source list; on error we advance the index.
 * Because the primary source is a stable CDN URL, remounting (e.g. carousel
 * slide changes) hits the browser cache and never re-fetches or flashes.
 */
export function AppIcon({ app, className = "", imgClassName = "", rounded = "rounded-2xl" }) {
  const sources = useMemo(
    () => [app?.iconUrl, app?.icon].filter(Boolean),
    [app?.iconUrl, app?.icon]
  );
  const [idx, setIdx] = useState(0);
  const src = sources[idx];
  const letter = (app?.name || "?").charAt(0).toUpperCase();

  return (
    <div className={`relative overflow-hidden ${rounded} ${className}`}>
      {src ? (
        <img
          key={src}
          src={src}
          alt={`${app?.name || "App"} icon`}
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-cover ${imgClassName}`}
          onError={() => setIdx((i) => i + 1)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-2xl font-black text-purple-500 bg-purple-500/10">
          {letter}
        </div>
      )}
    </div>
  );
}

export default AppIcon;
