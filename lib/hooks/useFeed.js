"use client";

import { useEffect, useState } from "react";

/**
 * Fetch a JSON feed endpoint on mount and expose the item array under `key`,
 * always starting from `fallback` so the section renders instantly (and matches
 * SSR) before live data arrives. On any failure the fallback simply stays.
 *
 *   const { data, loading, meta } = useFeed("/api/feeds/medium", "posts", mediumBlogsData);
 *
 * `meta` holds the full JSON response (e.g. `meta.developer`, `meta.source`).
 */
export function useFeed(endpoint, key, fallback = []) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState({ source: "fallback" });

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(endpoint, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!alive) return;
        const list = json[key];
        if (Array.isArray(list) && list.length) setData(list);
        setMeta(json);
      } catch {
        /* keep fallback */
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [endpoint, key]);

  return { data, loading, meta };
}

export default useFeed;
