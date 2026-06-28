import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const appId = searchParams.get("appId"); // bundle ID or apple ID
  const platform = searchParams.get("platform"); // "android" or "ios"

  if (!appId) {
    return NextResponse.json({ error: "Missing appId parameter" }, { status: 400 });
  }

  try {
    if (platform === "ios") {
      // Use official iTunes search/lookup API (CORS-friendly, reliable)
      const res = await fetch(`https://itunes.apple.com/lookup?id=${appId}`);
      if (res.ok) {
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          const iconUrl = data.results[0].artworkUrl512 || data.results[0].artworkUrl100;
          if (iconUrl) {
            return NextResponse.redirect(iconUrl);
          }
        }
      }
      
      // Fallback: Scrape Apple App Store page
      const pageRes = await fetch(`https://apps.apple.com/us/app/id${appId}`, {
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36" }
      });
      if (pageRes.ok) {
        const html = await pageRes.text();
        const ogImageMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
        if (ogImageMatch && ogImageMatch[1]) {
          return NextResponse.redirect(ogImageMatch[1]);
        }
      }
    } else {
      // Scrape Google Play Store page
      const playUrl = `https://play.google.com/store/apps/details?id=${appId}`;
      const pageRes = await fetch(playUrl, {
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36" }
      });
      if (pageRes.ok) {
        const html = await pageRes.text();
        // Look for og:image meta tag
        const ogImageMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
        if (ogImageMatch && ogImageMatch[1]) {
          return NextResponse.redirect(ogImageMatch[1]);
        }
        
        // Fallback: Match play-lh.googleusercontent.com urls
        const iconMatch = html.match(/(https:\/\/play-lh\.googleusercontent\.com\/[a-zA-Z0-9_=-]+)/);
        if (iconMatch && iconMatch[1]) {
          return NextResponse.redirect(iconMatch[1]);
        }
      }
    }
  } catch (error) {
    console.error("Error fetching app icon:", error);
  }

  // Final generic icon fallback redirect (colored letter tile)
  const initial = appId.charAt(0).toUpperCase();
  return NextResponse.redirect(`https://ui-avatars.com/api/?name=${initial}&background=3b82f6&color=fff&size=256&rounded=true`);
}
export const revalidate = 86400; // Cache for 24 hours
