"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { navLinks } from "@/lib/data/certifications";
import { FiSun, FiMoon, FiSearch, FiMenu, FiX, FiBookOpen, FiArrowUpRight } from "react-icons/fi";
import { MagneticButton } from "../animations/MagneticButton";

const HANDBOOK_URL = "/react-interview-handbook";

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (clickCount > 0) {
      const timer = setTimeout(() => setClickCount(0), 1000);
      return () => clearTimeout(timer);
    }
  }, [clickCount]);

  if (!mounted) return null;

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  // Tapping the name still scrolls to top; a quick triple-tap jumps to the
  // handbook (now also reachable via the visible "Handbook" button).
  const handleNameClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setClickCount((prev) => {
      const next = prev + 1;
      if (next === 3) {
        window.open(HANDBOOK_URL, "_blank");
        return 0;
      }
      return next;
    });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-white/75 dark:bg-black/75 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800"
          : "py-5 bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-6 flex items-center justify-between gap-4">
        {/* Logo */}
        <button
          onClick={handleNameClick}
          title="Tip: triple-tap for my Interview Handbook"
          className="text-lg sm:text-xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100 flex items-center gap-2 cursor-pointer bg-transparent border-none p-0 outline-none select-none shrink-0"
        >
          GOWTHAM
          <span className="text-purple-500 font-mono text-[10px] bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">RN.DEV</span>
        </button>

        {/* Desktop Links (lg+) */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Action Controls (lg+) */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Handbook link — the discoverable version of the name easter-egg */}
          <a
            href={HANDBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 shadow-md shadow-purple-600/25 transition-all"
          >
            <FiBookOpen className="w-3.5 h-3.5" />
            Handbook
            <FiArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* Cmd + K trigger */}
          <button
            onClick={() => window.dispatchEvent(new Event("toggle-command-palette"))}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-xs text-neutral-400 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all cursor-pointer"
          >
            <FiSearch />
            <span className="hidden xl:inline">Search</span>
            <kbd className="font-mono text-[10px] bg-neutral-200 dark:bg-neutral-800 px-1.5 py-0.5 rounded">⌘K</kbd>
          </button>

          {/* Theme Toggle */}
          <MagneticButton range={30}>
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-50 transition-all cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <FiSun className="w-4.5 h-4.5" /> : <FiMoon className="w-4.5 h-4.5" />}
            </button>
          </MagneticButton>
        </div>

        {/* Mobile / tablet controls (below lg) */}
        <div className="flex lg:hidden items-center gap-2.5">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <FiX className="w-4 h-4" /> : <FiMenu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-[56px] left-0 right-0 bottom-0 bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-800 p-6 z-40 overflow-y-auto">
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 border-b border-neutral-100 dark:border-neutral-900 pb-2"
              >
                {link.name}
              </a>
            ))}

            {/* Handbook */}
            <a
              href={HANDBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl text-white bg-gradient-to-r from-purple-600 to-fuchsia-600 font-semibold shadow-md shadow-purple-600/25"
            >
              <span className="flex items-center gap-2">
                <FiBookOpen /> React Interview Handbook
              </span>
              <FiArrowUpRight />
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                window.dispatchEvent(new Event("toggle-command-palette"));
              }}
              className="flex items-center justify-between p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400"
            >
              <span className="flex items-center gap-2">
                <FiSearch />
                Open Search Command Palette
              </span>
              <kbd className="font-mono text-xs">⌘K</kbd>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
export default Navbar;
