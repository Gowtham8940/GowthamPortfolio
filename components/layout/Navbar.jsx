"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { navLinks } from "@/lib/data/certifications";
import { FiSun, FiMoon, FiSearch, FiMenu, FiX } from "react-icons/fi";
import { MagneticButton } from "../animations/MagneticButton";

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-white/75 dark:bg-black/75 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800"
          : "py-5 bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="text-xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100 flex items-center gap-2">
          GOWTHAM<span className="text-blue-500 font-mono text-[10px] bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">RN.DEV</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
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

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-4">
          {/* Cmd + K trigger */}
          <button
            onClick={() => {
              window.dispatchEvent(new Event("toggle-command-palette"));
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-xs text-neutral-400 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all cursor-pointer"
          >
            <FiSearch />
            <span>Search</span>
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

        {/* Mobile controls toggle */}
        <div className="flex md:hidden items-center gap-3">
          {/* Theme Toggle for Mobile */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
          </button>

          {/* Hamburger */}
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
        <div className="md:hidden fixed top-[60px] left-0 right-0 bottom-0 bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-800 p-6 z-40 overflow-y-auto">
          <div className="flex flex-col gap-6">
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
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                window.dispatchEvent(new Event("toggle-command-palette"));
              }}
              className="flex items-center justify-between p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 mt-4"
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
