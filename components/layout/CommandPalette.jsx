"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useLenis } from "lenis/react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  FiBriefcase,
  FiCode,
  FiFolder,
  FiMail,
  FiMoon,
  FiSun,
  FiYoutube,
  FiGithub,
  FiLinkedin,
  FiFileText
} from "react-icons/fi";
import { SiMedium } from "react-icons/si";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const { setTheme, theme } = useTheme();
  const [search, setSearch] = useState("");
  const lenis = useLenis();

  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const handleToggle = () => setOpen((o) => !o);
    document.addEventListener("keydown", down);
    window.addEventListener("toggle-command-palette", handleToggle);
    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("toggle-command-palette", handleToggle);
    };
  }, []);

  const handleScroll = (id) => {
    setOpen(false);
    setSearch("");
    setTimeout(() => {
      if (lenis) {
        lenis.scrollTo(id);
      } else {
        document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
      }
    }, 180);
  };

  const runCommand = (command) => {
    setOpen(false);
    setSearch("");
    setTimeout(() => {
      command();
    }, 180);
  };

  const navItems = [
    { name: "Go to Hero", action: () => handleScroll("#hero"), icon: <FiCode className="w-4 h-4" /> },
    { name: "Go to Experience", action: () => handleScroll("#experience"), icon: <FiBriefcase className="w-4 h-4" /> },
    { name: "Go to Projects", action: () => handleScroll("#projects"), icon: <FiFolder className="w-4 h-4" /> },
    { name: "Go to Contact", action: () => handleScroll("#contact"), icon: <FiMail className="w-4 h-4" /> }
  ];

  const socialItems = [
    { name: "Open GitHub Profile (Shortcut: G)", action: () => window.open("https://github.com/Gowtham8940", "_blank"), icon: <FiGithub className="w-4 h-4" /> },
    { name: "Open LinkedIn Profile (Shortcut: L)", action: () => window.open("https://linkedin.com/in/gowthamjagan", "_blank"), icon: <FiLinkedin className="w-4 h-4" /> },
    { name: "Open Medium Blog Profile (Shortcut: M)", action: () => window.open("https://medium.com/@gowthamjaganthan", "_blank"), icon: <SiMedium className="w-4 h-4" /> },
    { name: "Open YouTube Channel", action: () => window.open("https://www.youtube.com/@learn_with_gowtham", "_blank"), icon: <FiYoutube className="w-4 h-4" /> },
    { name: "View ATS Resume (Shortcut: R)", action: () => window.open("/resume/resume.pdf", "_blank"), icon: <FiFileText className="w-4 h-4" /> }
  ];

  const filteredNav = navItems.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );
  
  const filteredSocials = socialItems.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  const modeMatch = "switch mode color light dark".includes(search.toLowerCase());

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if(!v) setSearch(""); }}>
      <DialogContent showCloseButton={false} className="p-0 overflow-hidden w-[92vw] max-w-[550px] border-neutral-250 dark:border-neutral-850 bg-white/95 dark:bg-black/95 backdrop-blur-xl shadow-2xl rounded-2xl">
        <div className="flex flex-col h-full w-full">
          <div className="flex items-center border-b border-neutral-200 dark:border-neutral-850 px-4 py-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Type a command or search..."
              className="w-full bg-transparent border-0 outline-none text-sm text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500"
            />
            <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 px-1.5 font-mono text-[10px] font-medium text-neutral-555">
              ESC
            </kbd>
          </div>
          <div className="max-h-[330px] overflow-y-auto p-2 scrollbar-none">
            {filteredNav.length === 0 && filteredSocials.length === 0 && !modeMatch && (
              <div className="py-6 text-center text-sm text-neutral-500">
                No results found.
              </div>
            )}
            
            {filteredNav.length > 0 && (
              <div className="mb-3">
                <div className="text-[10px] uppercase font-bold text-neutral-400 dark:text-neutral-500 px-3 py-1.5">
                  Navigation
                </div>
                <div className="flex flex-col gap-0.5">
                  {filteredNav.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => runCommand(item.action)}
                      className="flex items-center gap-3 px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 rounded-xl cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-900 w-full text-left transition-colors font-medium"
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {filteredSocials.length > 0 && (
              <div className="mb-3">
                <div className="text-[10px] uppercase font-bold text-neutral-400 dark:text-neutral-500 px-3 py-1.5">
                  Socials & Resources
                </div>
                <div className="flex flex-col gap-0.5">
                  {filteredSocials.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => runCommand(item.action)}
                      className="flex items-center gap-3 px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 rounded-xl cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-900 w-full text-left transition-colors font-medium"
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {modeMatch && (
              <div>
                <div className="text-[10px] uppercase font-bold text-neutral-400 dark:text-neutral-500 px-3 py-1.5">
                  Preferences
                </div>
                <button
                  onClick={() => runCommand(() => setTheme(theme === "dark" ? "light" : "dark"))}
                  className="flex items-center gap-3 px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 rounded-xl cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-900 w-full text-left transition-colors font-medium"
                >
                  {theme === "dark" ? (
                    <>
                      <FiSun className="w-4 h-4 text-yellow-500" />
                      <span>Switch to Light Mode</span>
                    </>
                  ) : (
                    <>
                      <FiMoon className="w-4 h-4 text-indigo-500" />
                      <span>Switch to Dark Mode</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default CommandPalette;
