import { NextResponse } from "next/server";
import { youtubeVideosData } from "@/lib/data/certifications";
import { fetchText, items, tag, attr, formatDate } from "@/lib/feeds";

const HANDLE = "learn_with_gowtham";
// Optional hard override if the handle ever fails to resolve.
const CHANNEL_ID_ENV = process.env.YOUTUBE_CHANNEL_ID;

async function resolveChannelId() {
  if (CHANNEL_ID_ENV) return CHANNEL_ID_ENV;
  const html = await fetchText(`https://www.youtube.com/@${HANDLE}`, 86400);
  const m =
    html.match(/"channelId":"(UC[\w-]{20,})"/) ||
    html.match(/channel\/(UC[\w-]{20,})/) ||
    html.match(/"externalId":"(UC[\w-]{20,})"/);
  if (!m) throw new Error("Could not resolve YouTube channelId from handle");
  return m[1];
}

/**
 * Live YouTube uploads via the channel's public Atom feed. Normalised into the
 * shape <YouTube /> renders. Revalidates hourly, so new uploads surface
 * automatically. Falls back to the curated static list on any failure.
 */
export async function GET() {
  try {
    const channelId = await resolveChannelId();
    const xml = await fetchText(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      3600
    );

    const videos = items(xml, "entry")
      .map((entry, i) => {
        const videoId = tag(entry, "yt:videoId");
        const title = tag(entry, "title");
        if (!videoId || !title) return null;

        // Best-effort view count from the media:community block.
        const viewsRaw = attr(entry, "views");
        const views = viewsRaw ? Number(viewsRaw).toLocaleString() : "";

        return {
          id: `yt-${i}`,
          title,
          duration: "",
          views,
          thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
          embedUrl: `https://www.youtube.com/embed/${videoId}`,
          link: `https://youtu.be/${videoId}`,
          date: formatDate(tag(entry, "published")),
          category: "YouTube",
        };
      })
      .filter(Boolean)
      .slice(0, 8);

    if (!videos.length) throw new Error("No YouTube entries parsed");

    return NextResponse.json({ source: "live", videos });
  } catch (err) {
    return NextResponse.json({ source: "fallback", error: String(err), videos: youtubeVideosData });
  }
}
