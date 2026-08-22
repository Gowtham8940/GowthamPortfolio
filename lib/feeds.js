/**
 * Lightweight, dependency-free helpers for parsing the RSS / HTML feeds that
 * power the auto-updating sections (Medium, YouTube, Play Store).
 * Everything here is regex-based so it runs on the Edge/Node server without
 * pulling in an XML parser. Each consumer is expected to fall back to static
 * data when a fetch fails, so "best effort" parsing is acceptable.
 */

const ENTITIES = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
  "&nbsp;": " ",
  "&hellip;": "…",
  "&mdash;": "—",
  "&ndash;": "–",
};

export function decodeEntities(str = "") {
  return str
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&[a-z#0-9]+;/gi, (m) => ENTITIES[m] ?? m);
}

export function stripHtml(html = "") {
  return decodeEntities(
    html
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<[^>]+>/g, " ")
  )
    .replace(/\s+/g, " ")
    .trim();
}

/** Pull the inner text of the first <tag>…</tag>, unwrapping CDATA. */
export function tag(xml, name) {
  const m = xml.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`, "i"));
  if (!m) return "";
  return decodeEntities(m[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").trim());
}

/** Pull a self-closing / attribute value, e.g. <yt:videoId> or href attr. */
export function attr(fragment, attrName) {
  const m = fragment.match(new RegExp(`${attrName}=["']([^"']+)["']`, "i"));
  return m ? decodeEntities(m[1]) : "";
}

/** Split an RSS/Atom document into its item/entry chunks. */
export function items(xml, itemTag = "item") {
  const out = [];
  const re = new RegExp(`<${itemTag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${itemTag}>`, "gi");
  let m;
  while ((m = re.exec(xml)) !== null) out.push(m[1]);
  return out;
}

export function estimateReadTime(text = "") {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

export function formatDate(input) {
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" });
}

/** Map a Medium tag slug to a friendlier display category. */
export function prettyCategory(slug = "") {
  const map = {
    "react-native": "React Native",
    react: "React",
    javascript: "JavaScript",
    ios: "iOS",
    android: "Android",
    animation: "Animations",
    reanimation: "Animations",
    "liquid-glass": "UI/UX Design",
    "game-development": "Game Dev",
    migration: "Migration",
    "google-play-store": "Play Store",
    "android-development": "Android",
    updates: "Release Notes",
    ai: "AI",
    careers: "Career",
    github: "Automation",
  };
  return map[slug] || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

const BROWSER_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
};

/** Fetch with browser-ish headers + time-based revalidation (Data Cache). */
export async function fetchText(url, revalidate = 1800) {
  const res = await fetch(url, {
    headers: BROWSER_HEADERS,
    next: { revalidate },
  });
  if (!res.ok) throw new Error(`Fetch ${url} failed: ${res.status}`);
  return res.text();
}

export { BROWSER_HEADERS };
