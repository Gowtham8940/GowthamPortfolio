"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import { ui, LOCALES } from "./ui";

const KEY = "gj-locale";
const EVENT = "gj-locale-change";
const ids = LOCALES.map((l) => l.id);

const read = () => {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved && ids.includes(saved)) return saved;
  } catch {
    /* storage blocked */
  }
  return navigator.language?.toLowerCase().startsWith("ta") ? "ta" : "en";
};

const subscribe = (cb) => {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
};

const LocaleContext = createContext(null);

export function LocaleProvider({ children }) {
  const locale = useSyncExternalStore(subscribe, read, () => "en");

  const setLocale = useCallback((next) => {
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* storage blocked: the change still applies for this page view */
    }
    window.dispatchEvent(new Event(EVENT));
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "ta" ? "ta" : "en";
  }, [locale]);

  const value = useMemo(() => {
    const dict = ui[locale] || ui.en;
    const t = (key, vars) => {
      let s = dict[key] ?? ui.en[key] ?? key;
      if (vars) Object.entries(vars).forEach(([k, v]) => (s = s.replace(`{${k}}`, v)));
      return s;
    };
    // Content fields are either plain strings or { en, ta } objects.
    const tx = (v) => (v && typeof v === "object" && !Array.isArray(v) ? v[locale] ?? v.en : v);
    return { locale, setLocale, t, tx };
  }, [locale, setLocale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside <LocaleProvider>");
  return ctx;
}
