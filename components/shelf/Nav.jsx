"use client";

import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { FiMoon, FiSun, FiMenu, FiX } from "react-icons/fi";
import { profile } from "@/lib/data/portfolio";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { LOCALES } from "@/lib/i18n/ui";

const links = ["ai", "work", "apps", "experience", "writing"];

const subscribeNoop = () => () => {};

// Floating pill navigation: hides while scrolling down, returns on scroll up,
// and a sliding highlight follows the section currently on screen.
export function Nav() {
  const { resolvedTheme, setTheme } = useTheme();
  const { t, locale, setLocale } = useLocale();
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [pill, setPill] = useState({ left: 0, width: 0, visible: false });
  const listRef = useRef(null);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 240);
        last = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    const top = document.getElementById("top");
    const topIo = new IntersectionObserver(([e]) => e.isIntersecting && setActive(""), { rootMargin: "-45% 0px -50% 0px" });
    if (top) topIo.observe(top);
    return () => {
      io.disconnect();
      topIo.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    const el = listRef.current?.querySelector(`[data-id="${active}"]`);
    // Measuring the DOM to place the highlight is the reason for this layout effect.
    setPill(el ? { left: el.offsetLeft, width: el.offsetWidth, visible: true } : (p) => ({ ...p, visible: false }));
  }, [active]);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <header
      className={`fixed inset-x-0 top-4 z-50 flex justify-center px-3 transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] ${
        hidden && !open ? "-translate-y-[220%]" : "translate-y-0"
      }`}
    >
      <nav
        aria-label="Main"
        className="relative flex w-full max-w-[900px] items-center justify-between gap-2 rounded-full border border-rule bg-surface/80 p-1.5 shadow-[0_10px_40px_-12px_rgb(16_17_20/0.25)] backdrop-blur-xl"
      >
        <a href="#top" className="flex items-center gap-2 rounded-full py-1 pl-1 pr-3" data-magnetic>
          <img src={profile.photo} alt="" width={32} height={32} className="h-8 w-8 rounded-full object-cover" />
          <span className="hidden text-[15px] font-semibold tracking-[-0.02em] sm:inline">Gowtham J</span>
        </a>

        <ul ref={listRef} className="relative hidden items-center lg:flex">
          <span
            aria-hidden
            className="absolute top-0 h-full rounded-full bg-ink transition-[left,width,opacity] duration-500 ease-[cubic-bezier(.2,.8,.2,1)]"
            style={{ left: pill.left, width: pill.width, opacity: pill.visible ? 1 : 0 }}
          />
          {links.map((id) => (
            <li key={id} data-id={id} className="relative">
              <a
                href={`#${id}`}
                aria-current={active === id ? "true" : undefined}
                className={`block whitespace-nowrap rounded-full px-3 py-2 text-[14px] font-medium transition-colors duration-300 ${
                  active === id ? "text-canvas" : "text-ink-2 hover:text-ink"
                }`}
              >
                {t(`nav.${id}`)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <div role="group" aria-label={t("nav.language")} className="flex rounded-full border border-rule p-0.5">
            {LOCALES.map((l) => (
              <button
                key={l.id}
                type="button"
                lang={l.id}
                onClick={() => setLocale(l.id)}
                aria-pressed={locale === l.id}
                className={`h-8 rounded-full px-2.5 text-[13px] font-semibold transition-colors ${
                  locale === l.id ? "bg-ink text-canvas" : "text-ink-2 hover:text-ink"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={isDark ? t("nav.light") : t("nav.dark")}
            className="grid h-9 w-9 place-items-center rounded-full text-ink-2 transition-colors hover:bg-canvas hover:text-ink"
          >
            {mounted ? isDark ? <FiSun className="h-4 w-4" /> : <FiMoon className="h-4 w-4" /> : null}
          </button>
          <a
            href="#contact"
            className="hidden h-9 items-center whitespace-nowrap rounded-full bg-chalk px-4 text-[14px] font-semibold text-chalk-ink lg:inline-flex"
          >
            {t("nav.talk")}
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t("nav.close") : t("nav.open")}
            className="grid h-9 w-9 place-items-center rounded-full lg:hidden"
          >
            {open ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <ul
            id="mobile-menu"
            className="absolute inset-x-0 top-[calc(100%+8px)] rounded-[24px] border border-rule bg-surface p-3 shadow-[0_20px_60px_-20px_rgb(16_17_20/0.35)] lg:hidden"
          >
            {[...links, "contact"].map((id) => (
              <li key={id}>
                <a href={`#${id}`} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-[22px] font-semibold tracking-[-0.03em] hover:bg-canvas">
                  {t(`nav.${id}`)}
                </a>
              </li>
            ))}
            <li>
              <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="block rounded-2xl px-4 py-3 text-[22px] font-semibold tracking-[-0.03em] text-chalk">
                {t("nav.resume")}
              </a>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
