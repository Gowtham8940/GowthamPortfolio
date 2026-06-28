async function test() {
  const appId = "com.thenauticalguyd";
  const playUrl = `https://play.google.com/store/apps/details?id=${appId}`;
  try {
    const pageRes = await fetch(playUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36" }
    });
    console.log("Status:", pageRes.status);
    const html = await pageRes.text();
    const ogImageMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
    console.log("og:image match:", ogImageMatch ? ogImageMatch[1] : "None");
  } catch (err) {
    console.error("Error:", err);
  }
}
test();
