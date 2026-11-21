"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { profile } from "@/lib/data/portfolio";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { NoiseField } from "@/components/motion/NoiseField";
import { SplitPortrait } from "@/components/motion/SplitPortrait";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Hero() {
  const root = useRef(null);
  const { t } = useLocale();
  const marquee = t("hero.marquee");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Marquee drifts left, speeds up and flips with scroll direction.
        const track = root.current.querySelector(".marquee-track");
        let x = 0;
        let dir = -1;
        let boost = 0;
        const st = ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          onUpdate: (self) => {
            dir = self.direction === 1 ? -1 : 1;
            boost = Math.min(Math.abs(self.getVelocity()) / 300, 12);
          },
        });
        const tick = (_, dt) => {
          const half = track.scrollWidth / 2;
          if (!half) return;
          x += dir * (0.06 + boost * 0.05) * dt;
          boost *= 0.92;
          if (x <= -half) x += half;
          if (x > 0) x -= half;
          gsap.set(track, { x });
        };
        gsap.ticker.add(tick);

        gsap.to(".hero-portrait", {
          yPercent: -10,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });

        // Entrance, after the loader lifts.
        const intro = gsap.timeline({ paused: true, defaults: { ease: "power4.out" } });
        intro
          .from(".hero-portrait", { scale: 0.88, autoAlpha: 0, duration: 1.2 })
          .from(".hero-side > *", { y: 40, autoAlpha: 0, duration: 0.9, stagger: 0.08 }, "-=0.9")
          .from(".marquee-wrap", { yPercent: 60, autoAlpha: 0, duration: 1.1 }, "-=1");
        const play = () => intro.play();
        if (window.__introDone) intro.progress(1);
        else window.addEventListener("intro:done", play, { once: true });

        return () => {
          gsap.ticker.remove(tick);
          st.kill();
          window.removeEventListener("intro:done", play);
        };
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section id="top" ref={root} className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-24">
      <div className="absolute inset-0 -z-10">
        <NoiseField />
      </div>

      <div className="mx-auto grid w-full max-w-[1248px] flex-1 items-center gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_minmax(300px,420px)_1fr] lg:gap-12">
        <div className="hero-side order-2 lg:order-1 lg:text-right">
          <p className="t-sm text-ink-2">{t("hero.mobileLabel")}</p>
          <h1 className="mt-2 text-[clamp(28px,3vw,42px)] font-semibold leading-[1.08] tracking-[-0.04em]">{t("hero.mobileTitle")}</h1>
          <p className="mt-4 text-ink-2 lg:ml-auto lg:max-w-[22rem]">{t("hero.mobileBody")}</p>
        </div>

        <div className="hero-portrait order-1 mx-auto w-full max-w-[300px] sm:max-w-[380px] lg:order-2 lg:max-w-[420px]">
          <SplitPortrait src={profile.photo} alt={t("hero.portraitAlt")} hostRef={root} />
        </div>

        <div className="hero-side order-3">
          <p className="t-sm text-chalk">{t("hero.aiLabel")}</p>
          <p className="mt-2 text-[clamp(28px,3vw,42px)] font-semibold leading-[1.08] tracking-[-0.04em]">{t("hero.aiTitle")}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#ai" data-magnetic className="inline-flex h-12 items-center rounded-full bg-ink px-6 font-medium text-canvas">
              Aira
            </a>
            <a href="#work" data-magnetic className="inline-flex h-12 items-center rounded-full border border-ink/20 bg-surface/60 px-6 font-medium backdrop-blur">
              {t("hero.seeWork")}
            </a>
          </div>
        </div>
      </div>

      <div className="marquee-wrap pointer-events-none mt-8 select-none overflow-hidden pb-4" aria-hidden>
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <span key={k} className="whitespace-nowrap pr-[0.3em] text-[clamp(64px,13vw,210px)] font-semibold leading-[1.05] tracking-[-0.05em]">
              {marquee}
              {marquee}
            </span>
          ))}
        </div>
      </div>
      <p className="sr-only">{t("hero.sr")}</p>
    </section>
  );
}
