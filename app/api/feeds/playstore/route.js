import { NextResponse } from "next/server";
import { appCarouselData } from "@/lib/data/certifications";
import { fetchText, decodeEntities } from "@/lib/feeds";

const DEV_ID = "8170755285088488138";
const DEV_URL = `https://play.google.com/store/apps/dev?id=${DEV_ID}`;

/**
 * Live Google Play developer profile ("Purple Info Tech").
 *
 * Google lazy-loads the developer's full app grid with client JS, so only a
 * subset of package ids appear in the initial HTML. We therefore treat the
 * curated `appCarouselData` as the authoritative, richly-described app list and
 * only *append* any extra packages the scrape happens to surface. The developer
 * name/description are scraped live and revalidated daily.
 */
export async function GET() {
  const developer = {
    name: "Purple Info Tech",
    url: DEV_URL,
    description:
      "Purple Info Tech builds fast, reliable mobile apps with clean design and real-world performance in mind.",
    // The developer's own logo (Play dev page og:image), pre-resolved so it
    // renders even if the live scrape is blocked.
    logo: "https://play-lh.googleusercontent.com/wUF4AYTL_Rc-C8KkIloxax1ThkpBF8KuElpy6jKlvL3vuIJ-a8V-SELj5XMixsy8xeZu=s256",
  };

  let apps = appCarouselData;

  try {
    const html = await fetchText(`${DEV_URL}&hl=en&gl=US`, 86400);

    const nameMatch = html.match(/Android Apps by ([^"]+?) on Google Play/i);
    if (nameMatch) developer.name = decodeEntities(nameMatch[1].trim());

    const descMatch = html.match(/property="og:description" content="([^"]+)"/i);
    if (descMatch) developer.description = decodeEntities(descMatch[1].trim());

    // Developer logo = dev-page og:image.
    const logoMatch = html.match(/property="og:image" content="(https:\/\/play-lh\.googleusercontent\.com\/[^"]+)"/i);
    if (logoMatch) developer.logo = `${logoMatch[1].split("=")[0]}=s256`;

    // Append any package ids present in the initial HTML that we don't already
    // showcase, so a freshly-published app can appear without a code change.
    const pkgs = new Set(
      [...html.matchAll(/\/store\/apps\/details\?id=([a-zA-Z0-9._]+)/g)].map((m) => m[1])
    );
    const known = new Set(apps.map((a) => a.link.match(/id=([a-zA-Z0-9._]+)/)?.[1]));
    const extras = [...pkgs]
      .filter((p) => !known.has(p))
      .map((p) => ({
        name: p.split(".").pop().replace(/^\w/, (c) => c.toUpperCase()),
        store: "Play Store",
        rating: "",
        downloads: "",
        link: `https://play.google.com/store/apps/details?id=${p}`,
        icon: `/api/app-icon?platform=android&appId=${p}`,
        description: "Recently published on Google Play by Purple Info Tech.",
      }));

    apps = [...apps, ...extras];

    return NextResponse.json({ source: "live", developer, apps });
  } catch (err) {
    return NextResponse.json({ source: "fallback", error: String(err), developer, apps });
  }
}
