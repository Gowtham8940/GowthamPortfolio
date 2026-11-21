import { NextResponse } from "next/server";

// Live uptime check for the sites Chalky talks about. Each site is fetched
// server-side (no CORS issues) with a short timeout; the result is cached for
// a minute so a busy portfolio never hammers the sites it links to.
export const dynamic = "force-dynamic";

const SITES = [
  { id: "aira", name: "Aira", url: "https://ekhool.com/aira" },
  { id: "inviteforyou", name: "InviteForYou", url: "https://inviteforyou.in" },
  { id: "sri-hari", name: "Sri Hari Agencies", url: "https://sri-hari-agencies.vercel.app" },
  { id: "jewel-billing", name: "Jewel Billing", url: "https://billing-system-pi-tan.vercel.app" },
];

let cache = { at: 0, data: null };

async function check(site) {
  const started = Date.now();
  try {
    const res = await fetch(site.url, {
      method: "GET",
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
      headers: { "User-Agent": "Mozilla/5.0 (portfolio uptime check)" },
    });
    return { ...site, ok: res.ok, status: res.status, ms: Date.now() - started };
  } catch {
    return { ...site, ok: false, status: 0, ms: Date.now() - started };
  }
}

export async function GET() {
  if (!cache.data || Date.now() - cache.at > 60_000) {
    cache = { at: Date.now(), data: await Promise.all(SITES.map(check)) };
  }
  return NextResponse.json(
    { checkedAt: new Date(cache.at).toISOString(), sites: cache.data },
    { headers: { "Cache-Control": "public, max-age=30" } }
  );
}
