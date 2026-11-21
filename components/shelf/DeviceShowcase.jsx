"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FiArrowUpRight } from "react-icons/fi";
import { deviceScreens, facts } from "@/lib/data/portfolio";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { useAutoPan } from "@/components/motion/Devices";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// One phone, real full-page captures at iPhone width. Each capture is drawn at
// 100% of the screen width (never cropped) and pans through the whole page.
// The screen is not a scroll container, so the wheel always scrolls the page.
// Desktop: a short pin steps through the screens. Phones: tap a title, or it
// advances on its own while visible.
function Screen({ screen, active }) {
  const view = useRef(null);
  useAutoPan(view, { speed: 90, active });
  return (
    <div
      ref={view}
      data-screen={screen.id}
      aria-hidden={!active}
      className={`absolute inset-0 overflow-hidden bg-white transition-opacity duration-500 ${active ? "opacity-100" : "pointer-events-none opacity-0"}`}
    >
      <img src={screen.src} alt={screen.title} loading="eager" className="block h-auto w-full will-change-transform" draggable={false} />
    </div>
  );
}

export function DeviceShowcase() {
  const root = useRef(null);
  const device = useRef(null);
  const [step, setStep] = useState(0);
  const { t, tx } = useLocale();
  const total = deviceScreens.length;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: () => `+=${window.innerHeight * total * 0.45}`,
          pin: root.current.querySelector(".device-pin"),
          onUpdate: (self) => setStep(Math.min(total - 1, Math.floor(self.progress * total))),
        });
        // Gentle 3D tilt that follows the pointer.
        const rx = gsap.quickTo(device.current, "rotationX", { duration: 0.8, ease: "power3" });
        const ry = gsap.quickTo(device.current, "rotationY", { duration: 0.8, ease: "power3" });
        const move = (e) => {
          ry((e.clientX / window.innerWidth - 0.5) * 16);
          rx((e.clientY / window.innerHeight - 0.5) * -10);
        };
        window.addEventListener("pointermove", move, { passive: true });
        return () => window.removeEventListener("pointermove", move);
      });

      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        let timer = null;
        const st = ScrollTrigger.create({
          trigger: root.current,
          start: "top 70%",
          end: "bottom 30%",
          onToggle: (self) => {
            clearInterval(timer);
            if (self.isActive) timer = setInterval(() => setStep((s) => (s + 1) % total), 7000);
          },
        });
        return () => {
          clearInterval(timer);
          st.kill();
        };
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  const current = deviceScreens[step];

  return (
    <section ref={root} aria-labelledby="device-title" className="relative">
      <div className="device-pin mx-auto grid max-w-[1248px] items-center gap-10 px-4 py-20 sm:px-6 lg:min-h-[100svh] lg:grid-cols-[1fr_auto_1fr] lg:gap-14 lg:py-16">
        <div>
          <h2 id="device-title" data-split className="t-h1">
            {t("device.title")}
          </h2>
          <p data-fade className="t-lg mt-5 max-w-[30rem] text-ink-2">
            {t("device.body")}
          </p>
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6">
            {facts.map((f) => (
              <div key={f.value} data-fade>
                <dt data-count className="text-[clamp(32px,3.4vw,48px)] font-semibold leading-none tracking-[-0.04em]">
                  {f.value}
                </dt>
                <dd className="t-sm mt-2 text-ink-2">{tx(f.label)}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mx-auto [perspective:1400px]">
          <div
            ref={device}
            className="relative w-[min(78vw,300px)] rounded-[48px] bg-[#0f1110] p-[10px] shadow-[0_50px_100px_-30px_rgb(16_17_20/0.55),inset_0_0_0_1.5px_rgb(255_255_255/0.08)] [transform-style:preserve-3d] lg:w-[300px]"
          >
            <div className="relative aspect-[390/844] overflow-hidden rounded-[38px]">
              {deviceScreens.map((s, i) => (
                <Screen key={s.id} screen={s} active={i === step} />
              ))}
            </div>
            <span aria-hidden className="absolute -left-[3px] top-[120px] h-12 w-[3px] rounded-l bg-[#0f1110]" />
            <span aria-hidden className="absolute -right-[3px] top-[150px] h-16 w-[3px] rounded-r bg-[#0f1110]" />
          </div>
        </div>

        <div>
          <ol className="space-y-2" aria-label={t("device.title")}>
            {deviceScreens.map((s, i) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => setStep(i)}
                  aria-pressed={i === step}
                  className={`flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-left transition-[background-color,opacity] duration-300 ${
                    i === step ? "bg-surface shadow-[0_8px_30px_-16px_rgb(16_17_20/0.3)]" : "opacity-55 hover:opacity-100"
                  }`}
                >
                  <span className="t-sm w-6 tabular-nums text-ink-2">0{i + 1}</span>
                  <span className="min-w-0">
                    <span className="block font-semibold">{s.title}</span>
                    <span className="t-sm block text-ink-2">{tx(s.kind)}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <a href={current.href} target="_blank" rel="noopener noreferrer" className="link mt-6 inline-flex items-center gap-1 font-medium">
            {current.href.replace("https://", "")}
            <FiArrowUpRight aria-hidden className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
