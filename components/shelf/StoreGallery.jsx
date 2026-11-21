"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { appCarouselData } from "@/lib/data/certifications";
import { useFeed } from "@/lib/hooks/useFeed";
import { profile } from "@/lib/data/portfolio";
import { StoreTile } from "@/components/motion/Devices";
import { useLocale } from "@/lib/i18n/LocaleProvider";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// First store screenshot per app, saved locally from the Play listings.
const SHOT = {
  "com.penfight": "/images/screens/com.penfight-2.webp",
  "com.maazter": "/images/screens/com.maazter-2.webp",
  "com.ekhooltech": "/images/screens/com.ekhooltech-1.webp",
  "com.magicbillion": "/images/screens/com.magicbillion-1.webp",
  "com.thenauticalguyd": "/images/screens/com.thenauticalguyd-3.webp",
  "com.optilearn": "/images/screens/com.optilearn-1.webp",
  "com.aaeb": "/images/screens/com.aaeb-1.webp",
  "com.tvetcollege": "/images/screens/com.tvetcollege-2.webp",
  "com.uniliv": "/images/screens/com.uniliv-1.webp",
};
const idOf = (link) => link.match(/id=([\w.]+)/)?.[1];

// Every live store app, pinned and scrolled sideways on desktop; a swipeable
// row on phones.
export function StoreGallery() {
  const root = useRef(null);
  const { data: apps } = useFeed("/api/feeds/playstore", "apps", appCarouselData);
  const { t } = useLocale();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = root.current.querySelector(".store-track");
        const distance = () => track.scrollWidth - window.innerWidth + 64;
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current.querySelector(".store-pin"),
            start: "top top",
            // Shorter than the travel distance so the row moves briskly.
            end: () => `+=${distance() * 0.65}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [apps.length] }
  );

  return (
    <section id="apps" ref={root} className="bg-band text-band-ink">
      <div className="store-pin flex min-h-[100svh] flex-col justify-center overflow-hidden py-24">
        <div className="mx-auto flex w-full max-w-[1248px] flex-wrap items-end justify-between gap-6 px-4 sm:px-6">
          <h2 data-split className="t-h1 max-w-[16ch]">
            {t("store.title", { n: apps.length })}
          </h2>
          <a href={profile.links.playstore} target="_blank" rel="noopener noreferrer" data-magnetic className="inline-flex h-11 items-center gap-2 rounded-full bg-band-glow px-5 font-semibold text-[#0e1210]">
            <FaGooglePlay aria-hidden className="h-3.5 w-3.5" /> {t("store.play")}
          </a>
        </div>
        <ul className="store-track hide-scrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 sm:px-6 lg:snap-none lg:overflow-visible lg:pl-[max(24px,calc((100vw-1200px)/2))]">
          {apps.map((app) => {
            const shot = SHOT[idOf(app.link)];
            return (
              <li key={app.link} className="w-[240px] shrink-0 snap-start sm:w-[260px]">
                {shot ? (
                  <StoreTile src={shot} alt={`${app.name} on Google Play`} />
                ) : (
                  <div className="grid aspect-[9/16] place-items-center rounded-[22px] bg-white/10">
                    <img src={app.iconUrl || app.icon} alt="" className="h-20 w-20 rounded-[20px]" />
                  </div>
                )}
                <div className="mt-5 flex items-center gap-3">
                  <img src={app.iconUrl || app.icon} alt="" width={44} height={44} loading="lazy" className="h-11 w-11 shrink-0 rounded-[12px]" />
                  <div className="min-w-0">
                    <h3 className="truncate font-semibold">{app.name}</h3>
                    <p className="t-sm opacity-60">
                      {[app.downloads && `${app.downloads} ${t("store.downloads")}`, app.rating && `${app.rating}★`].filter(Boolean).join(", ")}
                    </p>
                  </div>
                </div>
                <p className="t-sm mt-3 flex gap-4">
                  <a href={app.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 underline-offset-4 hover:underline">
                    <FaGooglePlay aria-hidden className="h-3 w-3" /> Google Play
                  </a>
                  {app.iosLink && (
                    <a href={app.iosLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 underline-offset-4 hover:underline">
                      <FaApple aria-hidden className="h-3.5 w-3.5" /> App Store
                    </a>
                  )}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
