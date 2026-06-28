"use client";

import { useEffect } from "react";

export function useKeyboardShortcuts() {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore shortcuts if user is typing in input, textarea, or contentEditable element
      const activeElement = document.activeElement;
      if (
        activeElement &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          activeElement.isContentEditable)
      ) {
        return;
      }

      // Convert key to lowercase to handle both upper/lower case cases
      const key = e.key.toLowerCase();

      // Check if command keys are pressed to avoid overriding default browser actions
      if (e.metaKey || e.ctrlKey || e.altKey) {
        return;
      }

      if (key === "g") {
        e.preventDefault();
        window.open("https://github.com", "_blank");
      } else if (key === "l") {
        e.preventDefault();
        window.open("https://linkedin.com", "_blank");
      } else if (key === "r") {
        e.preventDefault();
        window.open("/resume/resume.pdf", "_blank");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
}
export default useKeyboardShortcuts;
