"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FiArrowUpRight } from "react-icons/fi";
import { selected } from "@/lib/data/portfolio";
import { PhoneFrame, BrowserFrame, StoreTile } from "@/components/motion/Devices";
import { useLocale } from "@/lib/i18n/LocaleProvider";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function Visual({ item }) {
  const { t } = useLocale();
  if (item.tiles) {
    const tilt = ["-rotate-[5deg] translate-y-6", "z-10 -translate-y-2", "rotate-[5deg] translate-y-6"];
    return (
      <div className="flex w-full items-center justify-center">
        {item.tiles.map((t, i) => (
          <div key={t.src} className={`w-[31%] max-w-[220px] ${i ? "-ml-[3%]" : ""} ${tilt[i]}`}>
            <StoreTile src={t.src} alt={t.alt} />
          </div>
        ))}
      </div>
    );
  }
  return (
    // Bottom padding (a % of width) reserves room for the phone, which is
    // taller than the browser, so the card never clips it.
    <div className="relative w-full pb-[30%] pr-[20%] sm:pb-[22%]">
      <BrowserFrame src={item.browser.src} alt={item.browser.alt} url={item.browser.url} scroll={item.browser.scroll} />
      <div className="absolute bottom-0 right-0 w-[34%] max-w-[230px]">
        <PhoneFrame src={item.phone.src} alt={item.phone.alt} />
      </div>
    </div>
  );
}

function Card({ item, index }) {
  const { tx } = useLocale();
  return (
    <article
      className="work-card relative grid lg:sticky min-h-[min(760px,calc(100svh-120px))] overflow-hidden rounded-[32px] border border-rule bg-surface lg:grid-cols-[0.85fr_1.15fr]"
      style={{ top: `calc(96px + ${index * 14}px)` }}
    >
      <div aria-hidden className="card-shade pointer-events-none absolute inset-0 z-10 rounded-[32px] bg-black opacity-0" />
      <div className="flex flex-col justify-between gap-8 p-6 sm:p-10">
        <div>
          <p className="t-sm flex flex-wrap gap-x-3 text-ink-2">
            <span className="tabular-nums">0{index + 1}</span>
            <span>{tx(item.kind)}</span>
            {item.stat && <span className="text-chalk">{tx(item.stat)}</span>}
          </p>
          <h3 className="mt-4 text-[clamp(32px,3.6vw,52px)] font-semibold leading-[1] tracking-[-0.045em]">{tx(item.title)}</h3>
          <p className="t-lg mt-3 font-medium">{tx(item.line)}</p>
          <p className="mt-4 max-w-[46ch] text-ink-2">{tx(item.body)}</p>
        </div>
        <div>
          <ul className="flex flex-wrap gap-2">
            {item.stack.map((t) => (
              <li key={t} className="t-sm rounded-full border border-rule px-3 py-1 text-ink-2">
                {t}
              </li>
            ))}
          </ul>
          <ul className="mt-6 flex flex-wrap gap-3">
            {item.links.map((l, i) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-magnetic
                  className={`inline-flex h-11 items-center gap-1.5 rounded-full px-5 font-medium ${
                    i === 0 ? "bg-ink text-canvas" : "border border-rule"
                  }`}
                >
                  {tx(l.label)}
                  <FiArrowUpRight aria-hidden className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="relative order-first flex items-center justify-center overflow-hidden p-6 sm:p-10 lg:order-none" style={{ background: item.tone }}>
        <div aria-hidden className="absolute inset-0 opacity-40 [background:radial-gradient(circle_at_70%_20%,rgb(255_255_255/0.25),transparent_55%)]" />
        <div className="relative w-full max-w-[640px]">
          <Visual item={item} />
        </div>
      </div>
    </article>
  );
}

export function SelectedWork() {
  const root = useRef(null);
  const { t } = useLocale();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray(".work-card", root.current);
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          // Shade with an overlay, not a CSS filter: GSAP tweens filter from
          // "none" as brightness(0), which turned cards black mid-scroll.
          const st = { trigger: next, start: "top bottom", end: "top 25%", scrub: true };
          gsap.fromTo(card, { scale: 1 }, { scale: 0.94, ease: "none", scrollTrigger: st });
          gsap.fromTo(card.querySelector(".card-shade"), { opacity: 0 }, { opacity: 0.3, ease: "none", scrollTrigger: { ...st } });
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section id="work" ref={root} className="mx-auto max-w-[1248px] px-4 pb-24 pt-24 sm:px-6 sm:pt-32">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <h2 data-split className="t-h1 max-w-[14ch]">
          {t("work.title")}
        </h2>
        <p data-fade className="t-lg max-w-[30rem] text-ink-2">
          {t("work.intro")}
        </p>
      </div>
      <div className="flex flex-col gap-8">
        {selected.map((item, i) => (
          <Card key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
