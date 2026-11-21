# DESIGN.md: Gowtham J portfolio

**Direction: "the shelf."** A quiet, light gallery wall where the work brings the colour.
The chrome is black and white; real store screenshots and phone captures of shipped
apps carry the page. One flat, bold shape in chalkboard green ties it to the subject:
classrooms (the government LMS apps) and the last bench (Pen Fight).

Studied (screenshots, Nov 2026; UXKIN not connected, so these are the only references):
brittanychiang.com (restraint, two-column experience rows), rauno.me (oversized type +
one flat colour shape), joshwcomeau.com (personality, but too playful for this brief).

## Colour

| Token | Light | Dark | Role |
|---|---|---|---|
| `--canvas` | `#F3F4F6` | `#0E1210` | Page background |
| `--surface` | `#FFFFFF` | `#161B18` | Panels, inputs, tiles behind images |
| `--ink` | `#101114` | `#ECEFEA` | Headings, body text, primary button |
| `--ink-2` | `#5B6170` | `#9BA39E` | Secondary text (≥ 5:1 on canvas) |
| `--rule` | `#E2E4E9` | `#26302B` | Borders, dividers |
| `--chalk` | `#1F6B4A` | `#4CC38A` | The one brand colour: hero shape, links, focus ring, AI section |
| `--chalk-ink` | `#FFFFFF` | `#0E1210` | Text on `--chalk` |
| `--chalk-dust` | `#F5C542` | `#F5C542` | Tiny highlights only (live dot, score). Never for text on light |

No gradients, no glass. Colour comes from screenshots.

## Typography

One family: **Geist** (variable, via `next/font/google`).

| Step | Size / line-height | Weight | Tracking | Use |
|---|---|---|---|---|
| display | clamp(42px, 5vw, 72px) / 0.98 | 600 | -0.045em | Hero H1 |
| h1 | clamp(36px, 4.4vw, 56px) / 1.02 | 600 | -0.04em | Section titles |
| h2 | 32px / 1.1 | 600 | -0.03em | Project names |
| h3 | 22px / 1.25 | 600 | -0.02em | Sub-heads |
| body-lg | 20px / 1.55 | 400 | -0.005em | Intros |
| body | 17px / 1.6 | 400 | 0 | Body, max 66ch |
| small | 14px / 1.45 | 500 | 0 | Meta, captions |

Sentence case everywhere. No all-caps eyebrows.

## Spacing and layout

8px base: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
Content width 1200px with 24px gutters (16px on phones). Sections 128px apart
on desktop, 80px on phones. Text is left-aligned; nothing is centred except the
contact headline.

## Shape and depth

Radius: 10 (inputs, small buttons), 22 (tiles, panels), 9999 (pill buttons, chips).
One shadow, only for phone tiles: `0 40px 80px -40px rgb(16 17 20 / 0.45)`.
Everything else is flat with a 1px `--rule` border.

## Components

- **Primary button**: `--ink` fill, `--canvas` text, pill, 48px tall. Hover: `--chalk` fill.
- **Secondary button**: 1px `--rule`, `--ink` text. Hover: border `--ink`.
- **Link**: `--ink` text, 1.5px underline in `--chalk` at 40%, full on hover.
- **Focus**: 2px `--chalk` outline, 3px offset, on everything focusable.
- **Phone tile**: 9:19.5 or 9:16 image, radius 22, 1px ring `--rule`, the tile shadow.
- **Browser tile**: radius 14, a 32px top bar on `--surface` showing the real URL in small text.
- **Nav**: name left, 5 links, theme toggle, Résumé (primary). Blurred canvas when scrolled.
- **Rows** (experience, more work): two columns, meta left (small, `--ink-2`), content right.

## Imagery and icons

Real images only: Google Play screenshots of the apps, phone and desktop captures of
the live sites. No stock, no illustrations, no emoji. Icons: Feather (`react-icons/fi`),
1.5px stroke, 18px.

## Motion

Picked by Gowtham after reviewing animated portfolios (Dennis Snellenberg, Tamal Sen,
Adham Dannaway, Bruno Simon, Cassie Evans):

- **Loader**: first visit per session, 0→100 counter + name, curtain lifts (`components/motion/Loader.jsx`).
- **Hero**: WebGL noise field (`NoiseField`), split portrait where the code half follows the
  cursor and a lens shows code anywhere (`SplitPortrait`), giant name marquee that reacts to
  scroll speed and direction.
- **Device showcase**: a CSS phone (no fake notch) showing full-page captures at iPhone width,
  drawn at 100% of the screen width so nothing is cropped; the screen auto-scrolls. Desktop pins
  and steps through Aira, InviteForYou, Sri Hari, Jewel Billing; phones cycle or tap a title.
- **Aira**: dedicated AI section linking to ekhool.com/aira, with an animated agent-flow diagram
  (dashes travel along edges), the six-step agent builder, model routing and the 12 LMS agents.
- **Selected work**: sticky stacking cards on desktop. Phone frames scroll full-page mobile
  captures; store screenshots keep their own shape (never cropped).
- **Store apps**: pinned sideways scroll on desktop, swipe row on phones.
- **Index**: hover a project name and its screenshot follows the cursor.
- **Everywhere**: dot + ring cursor with labels, magnetic buttons (`data-magnetic`), line-by-line
  headline reveals (`data-split`), fade-ups (`data-fade`), count-ups (`data-count`).
- **Nav**: floating pill, hides on scroll down, highlight follows the current section.
- **Footer**: big closing CTA with a magnetic "Get in touch" that opens the contact dialog,
  live India time, availability, skills marquee.

`prefers-reduced-motion`: no loader, no pins, no marquee drift, no auto-scroll; everything
renders in its final state. Touch screens get no custom cursor.

## Localization

English and Tamil (`lib/i18n`). Interface strings live in `ui.js`; content fields in
`lib/data/portfolio.js` are `{ en, ta }`. Tamil falls back to Noto Sans Tamil with looser
line-height. The animated body remounts on language change so split-text is rebuilt.

## Tests

`npm run build && npm run test:e2e` runs `tests/e2e/portfolio.spec.js` on desktop, tablet and
phone: errors, overflow, images, cropping, nav, theme, language, devices, dialog, reduced
motion, keyboard and links.

## Chalky (guide pet)

`components/pet/Chalky.jsx`. Click it and it flies (arc, squash, lean) to each of 8 stops,
lands beside the section heading, stays attached through scrolling and layout shifts, and shows
a live feed at each stop: India time, site uptime from `/api/status`, Play Store numbers,
newest Medium article and YouTube video, time at e-Khool. The last stop pitches hiring Gowtham
and opens the contact dialog. Arrow keys step, Escape sends it home, it can be hidden. On phones
the bubble docks at the bottom and Chalky perches above it.
