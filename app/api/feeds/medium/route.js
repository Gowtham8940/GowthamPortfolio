import { NextResponse } from "next/server";
import { mediumBlogsData } from "@/lib/data/certifications";
import {
  fetchText,
  items,
  tag,
  stripHtml,
  estimateReadTime,
  formatDate,
  prettyCategory,
} from "@/lib/feeds";

const MEDIUM_USER = "gowthamjaganthan";

/**
 * Live Medium articles. Parses the public RSS feed and normalises it into the
 * same shape the <Blog /> section already renders, so the UI never has to know
 * whether it's showing live or fallback data. Revalidates every 30 min, so a
 * newly published article appears automatically without a redeploy.
 */
export async function GET() {
  try {
    const xml = await fetchText(`https://medium.com/feed/@${MEDIUM_USER}`, 1800);
    const posts = items(xml, "item")
      .map((item, i) => {
        const title = tag(item, "title");
        const link = (tag(item, "link") || "").split("?")[0];
        if (!title || !link) return null;

        const contentHtml = tag(item, "content:encoded") || tag(item, "description");
        const plain = stripHtml(contentHtml);

        // Cover image = first real Medium CDN image (skip the tracking pixel).
        const imgMatch = contentHtml.match(/<img[^>]+src="(https:\/\/cdn-images-1\.medium\.com\/[^"]+)"/i);
        const image = imgMatch ? imgMatch[1].replace(/\/max\/\d+\//, "/max/1024/") : "";

        // First category tag becomes the display category.
        const cat = (item.match(/<category>([\s\S]*?)<\/category>/i) || [])[1] || "";
        const category = prettyCategory(
          cat.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").trim().toLowerCase().replace(/\s+/g, "-")
        );

        return {
          id: `medium-${i}`,
          title,
          description: plain.slice(0, 165).trim() + (plain.length > 165 ? "…" : ""),
          readTime: estimateReadTime(plain),
          date: formatDate(tag(item, "pubDate")),
          link,
          image,
          category: category || "React Native",
        };
      })
      .filter(Boolean)
      .slice(0, 8);

    if (!posts.length) throw new Error("No Medium items parsed");

    return NextResponse.json({ source: "live", posts });
  } catch (err) {
    return NextResponse.json({ source: "fallback", error: String(err), posts: mediumBlogsData });
  }
}
