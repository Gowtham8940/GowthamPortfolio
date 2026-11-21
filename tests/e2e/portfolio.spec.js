import { test, expect } from "@playwright/test";

// Helpers ---------------------------------------------------------------

const isDesktop = (testInfo) => testInfo.project.name === "desktop";
const isMobile = (testInfo) => testInfo.project.name === "mobile";

// Collect real errors: uncaught exceptions and console errors from our origin.
function trackErrors(page) {
  const errors = [];
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  page.on("console", (m) => {
    if (m.type() !== "error") return;
    const text = m.text();
    // Third-party feeds/CDNs may be unreachable in CI; those are not app bugs.
    if (/Failed to load resource/.test(text)) return;
    errors.push(`console: ${text}`);
  });
  return errors;
}

// Skip the first-visit loader unless a test is about the loader.
async function open(page, { loader = false, locale, theme } = {}) {
  await page.addInitScript(
    ({ loader, locale, theme }) => {
      try {
        // Seed storage once per tab, so reloads keep whatever the test changed.
        if (sessionStorage.getItem("e2e-seeded")) return;
        sessionStorage.setItem("e2e-seeded", "1");
        if (!loader) sessionStorage.setItem("gj-intro-seen", "1");
        if (locale) localStorage.setItem("gj-locale", locale);
        if (theme) localStorage.setItem("theme", theme);
      } catch {}
    },
    { loader, locale, theme }
  );
  await page.goto("/", { waitUntil: "networkidle" });
}

// Scroll the whole page in steps so lazy images load and every trigger fires.
async function scrollThrough(page) {
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.8);
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, document.documentElement.scrollHeight);
    await new Promise((r) => setTimeout(r, 400));
  });
}

async function scrollToId(page, id, offset = 0) {
  await page.evaluate(
    ({ id, offset }) => {
      const el = document.getElementById(id);
      window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + offset);
    },
    { id, offset }
  );
  await page.waitForTimeout(700);
}

// Tests -------------------------------------------------------------------

test("loads with no runtime errors and no horizontal scroll", async ({ page }) => {
  const errors = trackErrors(page);
  await open(page);
  await scrollThrough(page);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow, "page should not scroll sideways").toBeLessThanOrEqual(0);
  expect(errors).toEqual([]);
});

test("every same-origin image loads", async ({ page }) => {
  await open(page);
  await scrollThrough(page);
  await page.waitForLoadState("networkidle");
  const broken = await page.evaluate(() =>
    [...document.images]
      .filter((img) => img.currentSrc && new URL(img.currentSrc).origin === location.origin)
      .filter((img) => !(img.complete && img.naturalWidth > 0))
      .map((img) => img.getAttribute("src"))
  );
  expect(broken).toEqual([]);
});

test("removed projects are gone and Aira links to ekhool.com/aira", async ({ page }) => {
  await open(page);
  const text = await page.locator("body").innerText();
  for (const gone of ["FlowCRM", "Aqua Mart", "CarService"]) expect(text).not.toContain(gone);
  await expect(page.locator('a[href="https://ekhool.com/aira"]').first()).toBeAttached();
});

test("loader plays once per session, then never blocks the page", async ({ page }, testInfo) => {
  test.skip(!isDesktop(testInfo), "loader logic is viewport independent");
  await open(page, { loader: true });
  // Loader either already finished or is visible; within 4s it must be gone.
  await expect(page.locator("[data-count]").first()).toBeAttached();
  await page.waitForTimeout(4000);
  const overflowLock = await page.evaluate(() => document.documentElement.style.overflow);
  expect(overflowLock).toBe("");
  await expect(page.getByText("Portfolio, 2026")).toBeHidden();
  // Second visit in the same session: no loader at all.
  await page.reload({ waitUntil: "networkidle" });
  await expect(page.getByText("Portfolio, 2026")).toBeHidden();
});

test("nav links scroll to their sections", async ({ page }, testInfo) => {
  await open(page);
  if (isDesktop(testInfo)) {
    await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Experience", exact: true }).click();
  } else {
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.locator("#mobile-menu")).toBeVisible();
    await page.locator("#mobile-menu").getByRole("link", { name: "Experience", exact: true }).click();
    await expect(page.locator("#mobile-menu")).toBeHidden();
  }
  await expect
    .poll(() => page.evaluate(() => Math.round(document.getElementById("experience").getBoundingClientRect().top)), { timeout: 8000 })
    .toBeLessThanOrEqual(90);
  // Lands just below the floating nav (sections use an 80px scroll margin).
  const top = await page.evaluate(() => document.getElementById("experience").getBoundingClientRect().top);
  expect(top).toBeGreaterThanOrEqual(70);
});

test("nav hides on scroll down and returns on scroll up; highlight follows the section", async ({ page }, testInfo) => {
  test.skip(!isDesktop(testInfo), "pill highlight is desktop-only");
  await open(page);
  const header = page.locator("header").first();
  await page.mouse.wheel(0, 1500);
  await page.waitForTimeout(1200);
  const hiddenY = await header.evaluate((el) => el.getBoundingClientRect().bottom);
  expect(hiddenY).toBeLessThanOrEqual(0);
  await page.mouse.wheel(0, -400);
  await page.waitForTimeout(1200);
  const shownY = await header.evaluate((el) => el.getBoundingClientRect().top);
  expect(shownY).toBeGreaterThanOrEqual(0);
  await scrollToId(page, "experience", 200);
  await expect(page.locator('header a[aria-current="true"]')).toHaveText("Experience");
});

test("theme toggle switches and persists", async ({ page }) => {
  await open(page, { theme: "light" });
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.reload({ waitUntil: "networkidle" });
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(page.locator("html")).not.toHaveClass(/dark/);
});

test("language switch: Tamil and back, persisted, no errors", async ({ page }) => {
  const errors = trackErrors(page);
  await open(page, { locale: "en" });
  await page.getByRole("button", { name: "தமிழ்" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "ta");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("மாணவர்கள்");
  await expect(page.locator("#ai h2")).toContainText("Aira");
  await scrollThrough(page);
  await page.reload({ waitUntil: "networkidle" });
  await expect(page.locator("html")).toHaveAttribute("lang", "ta");
  // The reload may restore a deep scroll position with the nav tucked away; scroll up like a visitor would.
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(800);
  await page.getByRole("button", { name: "EN", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("800K+");
  // Tamil text must not overflow the viewport either.
  await page.getByRole("button", { name: "தமிழ்" }).click();
  await scrollThrough(page);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
  expect(errors).toEqual([]);
});

test("device showcase shows full-width, uncropped captures and switches screens", async ({ page }) => {
  await open(page);
  await scrollToId(page, "device-title", -200);
  const screen = page.locator('[data-screen][aria-hidden="false"]').first();
  await expect(screen).toBeVisible();
  const fit = await screen.evaluate((el) => {
    const img = el.querySelector("img");
    return { box: el.clientWidth, img: img.getBoundingClientRect().width, natural: img.naturalWidth };
  });
  expect(fit.natural).toBeGreaterThan(0);
  expect(Math.abs(fit.box - fit.img)).toBeLessThanOrEqual(1);
  await page.getByRole("button", { name: /Sri Hari Agencies/ }).click();
  await expect(page.getByRole("button", { name: /Sri Hari Agencies/ })).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator('[data-screen="sri-hari"]')).toHaveAttribute("aria-hidden", "false");
});

const panY = (loc) =>
  loc.evaluate((el) => {
    const m = getComputedStyle(el.querySelector("img")).transform;
    return m === "none" ? 0 : new DOMMatrix(m).m42;
  });

test("work phone frames never crop horizontally and pan through the page", async ({ page }) => {
  await open(page);
  await scrollToId(page, "work", 300);
  const frame = page.locator('#work [data-frame="phone"]').filter({ has: page.locator('img[alt*="InviteForYou"]') }).first();
  await frame.scrollIntoViewIfNeeded();
  const gap = await frame.evaluate((el) => Math.abs(el.clientWidth - el.querySelector("img").getBoundingClientRect().width));
  expect(gap).toBeLessThanOrEqual(1);
  const before = await panY(frame);
  await page.waitForTimeout(3500);
  expect(await panY(frame)).toBeLessThan(before - 20);
});

test("mouse wheel over a phone preview scrolls the page (no scroll traps)", async ({ page }, testInfo) => {
  test.skip(!isDesktop(testInfo), "wheel is a desktop input");
  await open(page);
  await scrollToId(page, "work", 300);
  const frame = page.locator('#work [data-frame="phone"]').first();
  await frame.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  const box = await frame.boundingBox();
  const y0 = await page.evaluate(() => window.scrollY);
  await page.mouse.move(box.x + box.width / 2, box.y + Math.min(box.height / 2, 200));
  for (let i = 0; i < 5; i++) {
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(120);
  }
  await page.waitForTimeout(900);
  expect((await page.evaluate(() => window.scrollY)) - y0).toBeGreaterThan(600);
  expect(await page.locator("[data-lenis-prevent]").count()).toBe(0);
});

test("AAEB and TVET link to both stores", async ({ page }) => {
  await open(page);
  for (const id of ["id6786270377", "id6786269856"]) {
    await expect(page.locator(`#apps a[href*="${id}"]`)).toHaveCount(1);
  }
});

test("store screenshots keep their natural shape", async ({ page }) => {
  await open(page);
  await scrollToId(page, "apps", 100);
  await scrollThrough(page);
  const distorted = await page.evaluate(() =>
    [...document.querySelectorAll("#apps li img, #work img")]
      .filter((img) => img.naturalWidth > 0 && img.getBoundingClientRect().width > 60)
      .filter((img) => getComputedStyle(img).objectFit !== "cover")
      .map((img) => {
        // Layout size, not the bounding box: tiles are rotated on purpose.
        const ratio = img.offsetWidth / img.offsetHeight / (img.naturalWidth / img.naturalHeight);
        return { src: img.getAttribute("src"), ratio };
      })
      .filter((x) => Math.abs(x.ratio - 1) > 0.03 && !x.src.includes("desktop-full") && !x.src.includes("mobile-full"))
  );
  expect(distorted).toEqual([]);
});

test("project index shows the right preview on hover", async ({ page }, testInfo) => {
  test.skip(!isDesktop(testInfo), "hover preview is desktop-only");
  await open(page);
  await scrollToId(page, "index-title", -100);
  const row = page.locator("ul li a", { hasText: "Jewel Billing" }).first();
  await row.hover();
  await page.mouse.move(400, 500);
  await row.hover({ position: { x: 40, y: 20 } });
  await page.waitForTimeout(600);
  await expect(page.locator('div[aria-hidden] > img[src="/images/work/jewel-billing.jpg"]')).toBeVisible();
});

test("article previews render with covers", async ({ page }) => {
  await open(page);
  await scrollToId(page, "writing", 0);
  const cards = page.locator("#writing a[href*='medium.com/@gowthamjaganthan/']");
  await expect(cards).toHaveCount(5);
  const imgs = cards.locator("img");
  for (let i = 0; i < (await imgs.count()); i++) {
    const img = imgs.nth(i);
    await img.scrollIntoViewIfNeeded();
    await expect.poll(() => img.evaluate((el) => el.complete && el.naturalWidth > 0), { timeout: 15000 }).toBe(true);
  }
});

test("contact dialog opens, validates, and closes", async ({ page }) => {
  await open(page);
  await scrollToId(page, "contact", 0);
  await page.getByRole("button", { name: "Get in touch" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Send message" }).click();
  const invalid = await dialog.locator("input:invalid, textarea:invalid").count();
  expect(invalid).toBeGreaterThan(0);
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await page.getByRole("button", { name: "Get in touch" }).click();
  await dialog.getByRole("button", { name: "Close" }).click();
  await expect(dialog).toBeHidden();
});

test("reduced motion: no loader, no pinning, everything visible", async ({ browser }, testInfo) => {
  const context = await browser.newContext({ ...testInfo.project.use, reducedMotion: "reduce" });
  const page = await context.newPage();
  const errors = trackErrors(page);
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.getByText("Portfolio, 2026")).toBeHidden();
  await scrollThrough(page);
  expect(await page.locator(".pin-spacer").count()).toBe(0);
  const hidden = await page.evaluate(() =>
    [...document.querySelectorAll("h1, h2, .hero-side > *")].filter((el) => getComputedStyle(el).opacity === "0").length
  );
  expect(hidden).toBe(0);
  expect(errors).toEqual([]);
  await context.close();
});

test("keyboard: skip link first, visible focus ring", async ({ page }, testInfo) => {
  test.skip(isMobile(testInfo), "no hardware keyboard on phones");
  await open(page);
  await page.keyboard.press("Tab");
  const first = page.locator(":focus");
  await expect(first).toHaveText("Skip to work");
  await expect(first).toBeVisible();
  await page.keyboard.press("Tab");
  const outline = await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle);
  expect(outline).not.toBe("none");
});

test("internal links resolve and external links open safely", async ({ page, request }) => {
  await open(page);
  for (const path of ["/privacy", "/react-interview-handbook", "/resume/resume.pdf", "/og.jpg"]) {
    const res = await request.get(path);
    expect(res.status(), path).toBe(200);
  }
  const unsafe = await page.evaluate(() =>
    [...document.querySelectorAll('a[target="_blank"]')].filter((a) => !/noopener/.test(a.rel)).map((a) => a.href)
  );
  expect(unsafe).toEqual([]);
});

test("Aira diagram labels fit inside their boxes in English and Tamil", async ({ page }, testInfo) => {
  test.skip(isMobile(testInfo), "the diagram becomes a list on phones");
  for (const locale of ["en", "ta"]) {
    await page.addInitScript((l) => localStorage.setItem("gj-locale", l), locale);
    await open(page, { locale });
    await page.locator("#aira-flow-title").evaluate((el) => el.closest("svg").scrollIntoView());
    await page.waitForTimeout(500);
    const spill = await page.evaluate(() =>
      [...document.querySelectorAll("#ai svg g > rect + text")]
        .map((t) => ({ text: t.textContent, tw: t.getBBox().width, rw: t.previousElementSibling.getBBox().width }))
        .filter((x) => x.tw > x.rw - 4)
    );
    expect(spill, locale).toEqual([]);
  }
});

// Chalky the pet ------------------------------------------------------------

const petBox = (page) => page.getByRole("button", { name: /Chalky, Gowtham/ }).boundingBox();
const near = (a, b, slack = 140) =>
  a.x < b.x + b.width + slack && a.x + a.width > b.x - slack && a.y < b.y + b.height + slack && a.y + a.height > b.y - slack;

test("Chalky flies to each section, lands beside it, and reports live data", async ({ page, request }) => {
  const errors = trackErrors(page);
  await open(page);
  const pet = page.getByRole("button", { name: /Chalky, Gowtham/ });
  await expect(pet).toBeVisible();
  const start = await petBox(page);
  await pet.click();
  const bubble = page.getByRole("region", { name: "Chalky" });
  await expect(bubble).toContainText("Stop 1 of 8");
  await expect(bubble).toContainText("in India right now");

  // Stop 2: the AI section. Chalky must move and sit next to the heading.
  await bubble.getByRole("button", { name: /Next/ }).click();
  await expect(bubble).toContainText("Stop 2 of 8");
  await expect(page.locator('[data-pet][data-arrived="true"]')).toBeAttached({ timeout: 8000 });
  const heading = page.locator("#ai h2");
  await expect.poll(async () => near(await petBox(page), await heading.boundingBox()), { timeout: 8000 }).toBe(true);
  const moved = await petBox(page);
  expect(Math.hypot(moved.x - start.x, moved.y - start.y)).toBeGreaterThan(40);
  // Live uptime line for Aira, consistent with the status API.
  const status = await (await request.get("/api/status")).json();
  const aira = status.sites.find((s) => s.id === "aira");
  await expect(bubble).toContainText(aira.ok ? "Aira is up" : "Aira didn't answer");

  // Jump to the apps stop: live store numbers from the Play feed.
  for (let i = 0; i < 3; i++) await bubble.getByRole("button", { name: /Next/ }).click();
  await expect(bubble).toContainText("Stop 5 of 8");
  await expect(bubble).toContainText(/\d+ apps on the stores right now/);
  await expect(page.locator('[data-pet][data-arrived="true"]')).toBeAttached({ timeout: 8000 });
  await expect
    .poll(async () => {
      const pb = await petBox(page);
      const hb = await page.locator("#apps h2").boundingBox();
      return near(pb, hb) || JSON.stringify({ pb, hb, y: await page.evaluate(() => scrollY) });
    }, { timeout: 8000 })
    .toBe(true);

  // Writing stop: the newest article title, straight from the Medium feed.
  for (let i = 0; i < 2; i++) await bubble.getByRole("button", { name: /Next/ }).click();
  await expect(bubble).toContainText("Stop 7 of 8");
  const posts = await (await request.get("/api/feeds/medium")).json();
  await expect(bubble).toContainText(posts.posts[0].title.slice(0, 30));

  // Last stop: the pitch, and the button opens the contact form.
  await bubble.getByRole("button", { name: /Next/ }).click();
  await expect(bubble).toContainText("seriously talented");
  await bubble.getByRole("button", { name: "Send him a message" }).click();
  await expect(page.getByRole("dialog", { name: /what you're building/ })).toBeVisible();
  await page.keyboard.press("Escape");
  expect(errors).toEqual([]);
});

test("Chalky stays beside its stop while scrolling, and Escape sends it home", async ({ page }) => {
  await open(page);
  await page.getByRole("button", { name: /Chalky, Gowtham/ }).click();
  const bubble = page.getByRole("region", { name: "Chalky" });
  await bubble.getByRole("button", { name: /Next/ }).click();
  // Scroll while Chalky is still in the air: it must still land.
  await page.waitForTimeout(300);
  await page.mouse.wheel(0, 200);
  await expect(page.locator('[data-pet][data-arrived="true"]')).toBeAttached({ timeout: 8000 });
  await expect.poll(async () => near(await petBox(page), await page.locator("#ai h2").boundingBox()), { timeout: 8000 }).toBe(true);
  // Then scroll a little: it stays with the heading.
  await page.mouse.wheel(0, 120);
  await page.waitForTimeout(1200);
  const h = await page.locator("#ai h2").boundingBox();
  const pb = await petBox(page);
  if (h && h.y > 0) expect(near(pb, h, 180), JSON.stringify({ pet: pb, heading: h })).toBe(true);
  await page.keyboard.press("Escape");
  await expect(bubble).toBeHidden();
  const vp = page.viewportSize();
  await expect.poll(async () => {
    const b = await petBox(page);
    return b.x + b.width > vp.width - 60 && b.y + b.height > vp.height - 60;
  }, { timeout: 5000 }).toBe(true);
});

test("Chalky greets, hides and comes back", async ({ page }) => {
  await open(page);
  await page.evaluate(() => sessionStorage.removeItem("gj-pet-greeted"));
  await page.reload({ waitUntil: "networkidle" });
  const bubble = page.getByRole("region", { name: "Chalky" });
  await expect(bubble).toContainText("Click me and I'll walk you around", { timeout: 9000 });
  await bubble.getByRole("button", { name: "Hide Chalky" }).click();
  await expect(page.getByRole("button", { name: "Bring Chalky back" })).toBeVisible();
  await page.reload({ waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Bring Chalky back" }).click();
  await expect(page.getByRole("button", { name: /Chalky, Gowtham/ })).toBeVisible();
});

test("Chalky speaks Tamil and its bubble fits small screens", async ({ page }) => {
  await open(page, { locale: "ta" });
  await page.getByRole("button", { name: /சாக்கி/ }).click();
  const bubble = page.getByRole("region", { name: "சாக்கி" });
  await expect(bubble).toContainText("இந்தியாவில் இப்போது நேரம்");
  const box = await bubble.boundingBox();
  const vp = page.viewportSize();
  expect(box.x).toBeGreaterThanOrEqual(0);
  expect(box.x + box.width).toBeLessThanOrEqual(vp.width);
  expect(box.y + box.height).toBeLessThanOrEqual(vp.height);
  const pet = await page.getByRole("button", { name: /சாக்கி/ }).boundingBox();
  // Chalky never hides under its own bubble.
  expect(pet.y + pet.height <= box.y + 4 || pet.x + pet.width <= box.x || pet.x >= box.x + box.width).toBe(true);
});

test("status API reports each site", async ({ request }) => {
  const res = await request.get("/api/status");
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body.sites.map((s) => s.id)).toEqual(["aira", "inviteforyou", "sri-hari", "jewel-billing"]);
});
