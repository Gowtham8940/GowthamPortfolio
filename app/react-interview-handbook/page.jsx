"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import handbookData from "@/lib/data/handbook.json";
import {
  FiSearch, FiTrash2, FiPlay, FiCopy, FiCheck,
  FiMenu, FiX, FiCheckSquare, FiSquare, FiArrowLeft,
  FiSun, FiMoon, FiCode, FiEdit3, FiBookOpen
} from "react-icons/fi";
import { useTheme } from "next-themes";
import Link from "next/link";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import "highlight.js/styles/tokyo-night-dark.css";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("js", javascript);
hljs.registerLanguage("jsx", javascript);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("css", css);

/* ─────────────────────────────────────────────
   CodePlayground — Editable + Runnable code block
   Approach: contentEditable <code> tag (same as original HTML).
   Highlight.js applied once on mount. User edits in-place.
   Run reads innerText from the ref.
   ───────────────────────────────────────────── */
function CodePlayground({ code, language }) {
  const codeRef = useRef(null);
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);
  const [showConsole, setShowConsole] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Apply syntax highlighting on mount
  useEffect(() => {
    if (codeRef.current && !isEditing) {
      codeRef.current.removeAttribute("data-highlighted");
      codeRef.current.textContent = code;
      hljs.highlightElement(codeRef.current);
    }
  }, [code, isEditing]);

  const getCode = useCallback(() => {
    return codeRef.current?.innerText || codeRef.current?.textContent || code;
  }, [code]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getCode());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const handleEdit = () => {
    if (isEditing) {
      // Switching back to preview — re-highlight
      const currentCode = getCode();
      setIsEditing(false);
      setTimeout(() => {
        if (codeRef.current) {
          codeRef.current.removeAttribute("data-highlighted");
          codeRef.current.textContent = currentCode;
          hljs.highlightElement(codeRef.current);
        }
      }, 0);
    } else {
      // Switching to edit mode — show plain text
      const currentCode = getCode();
      setIsEditing(true);
      setTimeout(() => {
        if (codeRef.current) {
          codeRef.current.textContent = currentCode;
          codeRef.current.focus();
        }
      }, 0);
    }
  };

  const handleRun = () => {
    setLogs([]);
    setError(null);
    setShowConsole(true);

    const capturedLogs = [];
    const originalLog = console.log;
    const originalWarn = console.warn;

    console.log = (...args) => {
      capturedLogs.push(
        args
          .map((a) => {
            if (typeof a === "object") {
              try { return JSON.stringify(a, null, 2); } catch { return "[Circular]"; }
            }
            return String(a);
          })
          .join(" ")
      );
    };
    console.warn = console.log;

    try {
      const activeCode = getCode();
      new Function(activeCode)();
      if (capturedLogs.length === 0) {
        setLogs(["// Code executed successfully (no console output)."]);
      } else {
        setLogs(capturedLogs);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      console.log = originalLog;
      console.warn = originalWarn;
    }
  };

  const isRunnable = ["javascript", "js", "jsx"].includes(language);

  return (
    <div className="code-playground">
      {/* Toolbar */}
      <div className="code-toolbar">
        <span className="code-lang-label">{language}</span>
        <div className="code-actions">
          <button onClick={handleEdit} className="code-action-btn" title={isEditing ? "Preview" : "Edit"}>
            {isEditing ? <><FiCode size={12} /> Preview</> : <><FiEdit3 size={12} /> Edit</>}
          </button>
          <button onClick={handleCopy} className="code-action-btn">
            {copied ? <><FiCheck size={12} className="text-emerald" /> Copied</> : <><FiCopy size={12} /> Copy</>}
          </button>
          {isRunnable && (
            <button onClick={handleRun} className="code-action-btn run-btn">
              <FiPlay size={12} /> Run
            </button>
          )}
        </div>
      </div>

      {/* Code Block */}
      <pre className="code-pre" data-lenis-prevent>
        <code
          ref={codeRef}
          contentEditable={isEditing}
          suppressContentEditableWarning
          spellCheck="false"
          className={`language-${language}${isEditing ? " code-editing" : ""}`}
        >
          {code}
        </code>
      </pre>

      {/* Console */}
      {showConsole && (
        <div className="console-wrapper">
          <div className="console-header">
            <span>Console Output</span>
            <button onClick={() => setShowConsole(false)} className="console-clear-btn">Clear</button>
          </div>
          {error ? (
            <pre className="console-output console-error">{`Error: ${error}`}</pre>
          ) : (
            <pre className="console-output">{logs.join("\n")}</pre>
          )}
        </div>
      )}
    </div>
  );
}

const recallTips = [
  { term: "Execution Context & Call Stack", definition: "Boundary and steps through which JavaScript compiles and executes code line-by-line using Memory Creation and Code Execution phases managed by a LIFO Stack.", code: "function first() { second(); }\nfunction second() { console.log(\"running\"); }\nfirst(); // Call Stack: Global -> firstContext -> secondContext" },
  { term: "Hoisting", definition: "JavaScript allocates memory for variables and functions during compilation. 'var' is hoisted as undefined; 'let' and 'const' are hoisted into the Temporal Dead Zone (TDZ); function declarations are hoisted completely.", code: "console.log(a); // undefined\n// console.log(b); // ReferenceError (TDZ)\nvar a = 1; let b = 2;" },
  { term: "Closures", definition: "A nested function that retains reference bindings to its outer lexical scope variables even after the outer scope has returned or finished executing.", code: "function makeCounter() {\n  let count = 0;\n  return () => ++count;\n}\nconst counter = makeCounter();\nconsole.log(counter()); // 1" },
  { term: "Event Loop & Concurrency Model", definition: "Single-threaded orchestrator prioritizing call stack clearance before draining the Microtask queue (Promises) and processing Macrotask callbacks (setTimeout).", code: "console.log(\"Start\");\nsetTimeout(() => console.log(\"Macrotask\"), 0);\nPromise.resolve().then(() => console.log(\"Microtask\"));\nconsole.log(\"End\"); // Output: Start -> End -> Microtask -> Macrotask" },
  { term: "Promises & async/await", definition: "Placeholder object representing eventual async task success or failure. async/await is modern syntax built on top of Promise chains that uses try/catch blocks for error handling.", code: "const fetchData = () => Promise.resolve(\"data\");\nasync function run() {\n  try {\n    const res = await fetchData();\n    console.log(res);\n  } catch(err) { console.error(err); }\n}" },
  { term: "this keyword", definition: "Refers to the context object executing the function. Set by invocation style: implicit (method call), explicit (call/apply/bind), default (window/undefined), or lexical (Arrows).", code: "const obj = {\n  name: \"Gowtham\",\n  normal() { console.log(this.name); }, // Gowtham\n  arrow: () => { console.log(this.name); } // undefined (inherits lexical window)\n};" },
  { term: "Prototypes & Inheritance", definition: "Objects share functionality through a linked prototypal chain (__proto__) referring upwards to parents until null is reached.", code: "const animal = { eats: true };\nconst rabbit = Object.create(animal);\nconsole.log(rabbit.eats); // true" },
  { term: "Scope (var, let, const)", definition: "Visibility limits of identifiers. 'var' is function-scoped and permits redeclarations. 'let' and 'const' are block-scoped ({}) and restrict redeclarations.", code: "if (true) {\n  var x = 10;\n  let y = 20;\n}\nconsole.log(x); // 10\n// console.log(y); // ReferenceError (let y block isolated)" },
  { term: "Functions as First-Class Citizens", definition: "Functions behave like normal variables. They can be stored in keys, passed as arguments (callbacks), and returned from outer scopes (Higher-Order Functions).", code: "const execute = (cb) => cb();\nexecute(() => console.log(\"Invoked callback\"));" },
  { term: "Currying & Partial Application", definition: "Currying transforms a multi-argument function into a nested chain of single-argument functions. Partial application pre-binds some arguments returning a lower-arity target.", code: "const curriedAdd = a => b => a + b;\nconst addFive = curriedAdd(5);\nconsole.log(addFive(3)); // 8" },
  { term: "Debounce & Throttle", definition: "Debounce triggers execution only after an idle period. Throttle enforces execution maximum rate once per specified window (scroll, resizing).", code: "const debounce = (func, delay) => {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => func(...args), delay);\n  };\n};" },
  { term: "Modules (CommonJS vs ESM)", definition: "CommonJS compiles at runtime dynamically using require/exports. ESM compiles statically at compile time enabling imports/exports and tree-shaking dead code elimination.", code: "// CommonJS: const lib = require('lib'); module.exports = {}\n// ESM: import { lib } from 'lib'; export const val = 1;" },
  { term: "Type Coercion & Equality", definition: "Implicit conversion of values. Loose equality (==) coerces types, leading to hidden bugs. Strict equality (===) compares values and types strictly.", code: "console.log(\"5\" == 5);  // true (type coerced)\nconsole.log(\"5\" === 5); // false (strict comparison)" },
  { term: "Array & Object Methods", definition: "Standard array mutations (map for transformation, filter for condition checking, reduce for accumulations) and unpacking via destructuring.", code: "const items = [1, 2, 3];\nconst doubled = items.map(x => x * 2);\nconst [first, ...rest] = items; // destructuring" },
  { term: "Spread & Rest Operators", definition: "Spread (...) expands arrays or objects. Rest (...) collects multiple parameters or arguments inside a single container array.", code: "const numbers = [1, 2];\nconst clone = [...numbers, 3]; // Spread\nconst sum = (...args) => args.reduce((a, b) => a + b); // Rest" },
  { term: "Error Handling", definition: "Robust handling of sync errors using try/catch/finally scopes, and async rejection catching via promise reject catch chains or awaited try-blocks.", code: "try {\n  throw new Error(\"custom error\");\n} catch (err) {\n  console.warn(err.message);\n}" },
  { term: "DOM & Event Delegation", definition: "Attaching a single event listener to a common ancestor parent target rather than attaching event listeners to multiple child nodes.", code: "parentEl.addEventListener(\"click\", (e) => {\n  if (e.target.matches(\".child\")) {\n    console.log(\"Child item clicked:\", e.target);\n  }\n});" },
  { term: "Garbage Collection & Memory Leaks", definition: "Mark-and-sweep system reclaims unreachable allocations. Leaks stem from uncleaned setIntervals, global variables, or long-living closures.", code: "let cache = new WeakMap();\nlet key = { id: 1 };\ncache.set(key, \"weak ref data\");\nkey = null; // Key garbage collected automatically" },
  { term: "ES6+ Features", definition: "Recent JavaScript expansions simplifying layouts such as template literals, arrow functions, destructuring, class constructs, and promise APIs.", code: "const greet = (name = \"User\") => `Hi ${name}`;" },
  { term: "Performance & Big-O Basics", definition: "Measure of time or space complexity. Poor implementations like O(n²) operations inside React loop cycles block UI threads and degrade frame rates.", code: "// O(1) - Constant: const get = (arr) => arr[0];\n// O(n) - Linear: const find = (arr, v) => arr.includes(v);" },
  { term: "Event Propagation (Capture vs Bubble)", definition: "Capturing flows down from root to target. Target triggers handler. Bubbling propagates back up from target to root. Stopped using stopPropagation().", code: "el.addEventListener(\"click\", cb, true); // Captures phase\nel.addEventListener(\"click\", cb, false); // Bubbling (default)" },
  { term: "Shallow vs Deep Copy", definition: "Shallow copies transfer reference pointers (nested structures remain shared). Deep copies duplicate nested properties recursively.", code: "const original = { a: { b: 1 } };\nconst shallow = { ...original };\nconst deep = structuredClone(original); // Safe deep clone" },
  { term: "Object.defineProperty & Property Descriptors", definition: "Configures exact property attributes such as value, writable (modifiable value), enumerable (visible in loops), and configurable (modifiable metadata).", code: "const user = {};\nObject.defineProperty(user, \"id\", {\n  value: 101,\n  writable: false,\n  enumerable: true\n});" },
  { term: "Generators & Iterators", definition: "Generators are functions defined with function* that return Iterator controllers capable of yielding execution mid-function and resuming later.", code: "function* yieldSteps() {\n  yield 1;\n  yield 2;\n}\nconst it = yieldSteps();\nconsole.log(it.next().value); // 1" },
  { term: "Symbols & Well-Known Symbols", definition: "Unique primitive values used as non-overlapping property keys. Well-Known Symbols configure internal engine loops (like Symbol.iterator).", code: "const key = Symbol(\"id\");\nconst user = { [key]: \"secret\" };\nconsole.log(user[key]); // \"secret\"" },
  { term: "Set, Map, WeakSet, WeakMap", definition: "Set collects unique values. Map stores key-value pairs (allows any key type). WeakSet/WeakMap store weak references to objects, allowing garbage collection.", code: "const activeUsers = new Set();\nconst cache = new WeakMap();" },
  { term: "Optional Chaining & Nullish Coalescing", definition: "Optional Chaining (?.) short-circuits to undefined if target is nullish. Nullish Coalescing (??) provides fallback values strictly for null/undefined.", code: "const age = user.profile?.age ?? 18; // falls back strictly on nullish" },
  { term: "Immutability & Object.freeze/seal", definition: "Object.freeze prevents all mutations, additions, or configurations. Object.seal restricts additions and configurations but permits editing values.", code: "const state = Object.freeze({ count: 0 });\nstate.count = 5; // Ignored silently or throws in strict mode" },
  { term: "Polyfills & Transpilation", definition: "Transpilation compiles modern code into older ES syntax equivalent (Babel). Polyfills implement missing library APIs or prototypes dynamically.", code: "// Transpiled Arrow function:\n// (x) => x * x  ==>  function(x) { return x * x; }" },
  { term: "Security in JS", definition: "Preventing client attacks by sanitizing template data (blocking XSS), configuring strict Content Security Policies (CSP), and avoiding eval().", code: "const sanitize = (str) => str.replace(/</g, \"&lt;\").replace(/>/g, \"&gt;\");" }
];

const rnCheatSheet = [
  { term: "Promise", definition: "Future Result" },
  { term: ".then()", definition: "Success" },
  { term: ".catch()", definition: "Error" },
  { term: ".finally()", definition: "Always Execute" },
  { term: "Promise.all()", definition: "Parallel, fail if one fails" },
  { term: "Promise.allSettled()", definition: "Wait for all" },
  { term: "Promise.race()", definition: "First completed wins" },
  { term: "Promise.any()", definition: "First successful wins" },
  { term: "async/await", definition: "Cleaner Promise syntax" }
];

/* ─────────────────────────────────────────────
   Main Handbook Page
   ───────────────────────────────────────────── */
export default function Handbook() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [completedQuestions, setCompletedQuestions] = useState(new Set());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("");
  const [showRecall, setShowRecall] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [recallTab, setRecallTab] = useState("core");

  const localStorageKey = "gowtham_react_handbook_progress";

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(localStorageKey);
    if (saved) {
      try {
        setCompletedQuestions(new Set(JSON.parse(saved)));
      } catch (e) {
        console.error("Failed to parse progress", e);
      }
    }
  }, []);

  const saveProgress = (newSet) => {
    setCompletedQuestions(newSet);
    localStorage.setItem(localStorageKey, JSON.stringify(Array.from(newSet)));
  };

  const toggleQuestion = (qId) => {
    const next = new Set(completedQuestions);
    next.has(qId) ? next.delete(qId) : next.add(qId);
    saveProgress(next);
  };

  const handleResetProgress = () => {
    if (window.confirm("Reset all study progress?")) saveProgress(new Set());
  };

  const stats = useMemo(() => {
    let total = 0;
    handbookData.forEach((s) => s.difficultyBlocks.forEach((b) => (total += b.questions.length)));
    return { total, completed: completedQuestions.size, percent: total > 0 ? Math.round((completedQuestions.size / total) * 100) : 0 };
  }, [completedQuestions]);

  const sectionCounts = useMemo(() => {
    const c = {};
    handbookData.forEach((sec) => {
      let t = 0, d = 0;
      sec.difficultyBlocks.forEach((b) => b.questions.forEach((q) => { t++; if (completedQuestions.has(q.id)) d++; }));
      c[sec.id] = { total: t, completed: d };
    });
    return c;
  }, [completedQuestions]);

  const filteredData = useMemo(() => {
    if (!searchQuery) return handbookData;
    const q = searchQuery.toLowerCase();
    return handbookData
      .map((section) => {
        if (section.title.toLowerCase().includes(q)) return section;
        const filtered = section.difficultyBlocks
          .map((b) => ({
            ...b,
            questions: b.questions.filter(
              (qq) =>
                qq.text.toLowerCase().includes(q) ||
                qq.answers.some((a) => (a.type === "text" && a.content.toLowerCase().includes(q)) || (a.type === "code" && a.code.toLowerCase().includes(q)))
            ),
          }))
          .filter((b) => b.questions.length > 0);
        return filtered.length > 0 ? { ...section, difficultyBlocks: filtered } : null;
      })
      .filter(Boolean);
  }, [searchQuery]);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers = [];
    const sectionEls = document.querySelectorAll(".topic-section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [filteredData]);

  if (!mounted) return null;

  const diffBadge = {
    Beginner: "badge-beginner",
    Intermediate: "badge-intermediate",
    Advanced: "badge-advanced",
    Expert: "badge-expert",
  };

  return (
    <>
      <style jsx global>{handbookStyles}</style>

      <div className="handbook-root">
        {/* ── Sidebar ── */}
        <aside className={`hb-sidebar ${mobileMenuOpen ? "open" : ""}`}>
          <div className="sidebar-inner">
            {/* Back link */}
            <div className="sidebar-header">
              <Link href="/" className="back-link"><FiArrowLeft size={14} /> Back to Portfolio</Link>
              <button onClick={() => setMobileMenuOpen(false)} className="mobile-close-btn"><FiX size={18} /></button>
            </div>

            {/* Profile */}
            <div className="sidebar-profile">
              <div className="profile-avatar">G</div>
              <div>
                <h3 className="profile-name">Gowtham Jaganthan</h3>
                <p className="profile-subtitle">Interview Preparation</p>
              </div>
            </div>

            {/* Progress */}
            <div className="sidebar-progress">
              <div className="progress-top">
                <span>Progress</span>
                <span className="progress-pct">{stats.percent}%</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: `${stats.percent}%` }} />
              </div>
              <span className="progress-label">{stats.completed} / {stats.total} questions</span>
            </div>

            {/* Search */}
            <div className="sidebar-search">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>

            {/* Scrollable nav — explicit height so trackpad scroll works */}
            <div className="sidebar-nav-wrap" data-lenis-prevent>
              <nav className="sidebar-nav">
                {handbookData.map((sec) => {
                  const c = sectionCounts[sec.id] || { completed: 0, total: 0 };
                  const done = c.completed === c.total && c.total > 0;
                  const isActive = activeSection === sec.id;
                  return (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`nav-link ${done ? "nav-done" : ""} ${isActive ? "nav-active" : ""}`}
                    >
                      <span className="nav-link-text">{sec.title}</span>
                      <span className={`nav-count ${done ? "nav-count-done" : ""}`}>{c.completed}/{c.total}</span>
                    </a>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="sidebar-footer">
            <button onClick={handleResetProgress} className="reset-btn"><FiTrash2 size={14} /> Reset</button>
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="theme-toggle-btn">
              {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
            </button>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {mobileMenuOpen && <div className="sidebar-overlay" onClick={() => setMobileMenuOpen(false)} />}

        {/* ── Mobile Header ── */}
        <div className="mobile-header">
          <button onClick={() => setMobileMenuOpen(true)} className="mobile-menu-btn"><FiMenu size={20} /></button>
          <span className="mobile-title">React Handbook</span>
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="theme-toggle-btn">
            {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>
        </div>

        {/* ── Main Content ── */}
        <main className="hb-main">
          <div className="main-layout">
            {/* Center content */}
            <div className="main-inner">
              {/* Page Title */}
              <div className="page-header">
                <span className="hb-hero-badge"><FiBookOpen size={13} /> Interview Prep Vault</span>
                <h1 className="page-title">React &amp; Frontend Interview Handbook</h1>
                <p className="page-subtitle">A comprehensive, self-hostable guide — questions, live code playgrounds, architecture diagrams, and saved progress that lives in your browser.</p>
                <div className="hb-hero-stats">
                  <div className="hb-hero-stat"><strong>{stats.total}+</strong><span>Questions</span></div>
                  <div className="hb-hero-stat"><strong>{handbookData.length}</strong><span>Topics</span></div>
                  <div className="hb-hero-stat"><strong>{stats.percent}%</strong><span>Your Progress</span></div>
                </div>
              </div>

              {/* ── Architecture Diagrams Dashboard ── */}
              <div className="mb-8 p-6 rounded-2xl border border-neutral-250 dark:border-neutral-850 bg-white dark:bg-[#0c101a]/30 shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-450 dark:text-neutral-400 mb-4 flex items-center gap-2 select-none">
                  <FiBookOpen className="text-purple-500" /> Architecture Diagrams & JavaScript Reference
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div 
                    className="relative rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-850 bg-neutral-50 dark:bg-neutral-950/20 group cursor-pointer hover:border-purple-500/50 transition-all duration-300 shadow-sm"
                    onClick={() => setSelectedImage("/images/new_react_native.jpg")}
                  >
                    <div className="p-3 bg-neutral-100 dark:bg-neutral-950/60 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center text-[10px] uppercase font-bold text-neutral-400 select-none">
                      <span>The New React Native (Fabric/TurboModules)</span>
                      <span className="text-[9px] text-purple-500 font-semibold group-hover:underline">Zoom</span>
                    </div>
                    <div className="p-2 flex items-center justify-center">
                      <img src="/images/new_react_native.jpg" alt="New React Native Architecture" className="w-full aspect-[16/9] object-contain rounded-lg group-hover:scale-[1.01] transition-transform duration-300" />
                    </div>
                  </div>

                  <div 
                    className="relative rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-855 bg-neutral-50 dark:bg-neutral-950/20 group cursor-pointer hover:border-purple-500/50 transition-all duration-300 shadow-sm"
                    onClick={() => setSelectedImage("/images/react_native_arch.jpg")}
                  >
                    <div className="p-3 bg-neutral-100 dark:bg-neutral-950/60 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center text-[10px] uppercase font-bold text-neutral-400 select-none">
                      <span>React Native JSI & Bridge Layout</span>
                      <span className="text-[9px] text-purple-500 font-semibold group-hover:underline">Zoom</span>
                    </div>
                    <div className="p-2 flex items-center justify-center">
                      <img src="/images/react_native_arch.jpg" alt="React Native JSI & Bridge Layout" className="w-full aspect-[16/9] object-contain rounded-lg group-hover:scale-[1.01] transition-transform duration-300" />
                    </div>
                  </div>

                  <div 
                    className="relative rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-850 bg-neutral-50 dark:bg-neutral-950/20 group cursor-pointer hover:border-purple-500/50 transition-all duration-300 shadow-sm"
                    onClick={() => setSelectedImage("/images/fabric_renderer_flow.jpg")}
                  >
                    <div className="p-3 bg-neutral-100 dark:bg-neutral-950/60 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center text-[10px] uppercase font-bold text-neutral-400 select-none">
                      <span>Fabric Renderer Flow & UI Updates</span>
                      <span className="text-[9px] text-purple-500 font-semibold group-hover:underline">Zoom</span>
                    </div>
                    <div className="p-2 flex items-center justify-center">
                      <img src="/images/fabric_renderer_flow.jpg" alt="Fabric Renderer Flow" className="w-full aspect-[16/9] object-contain rounded-lg group-hover:scale-[1.01] transition-transform duration-300" />
                    </div>
                  </div>

                  <div 
                    className="relative rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-850 bg-neutral-50 dark:bg-neutral-950/20 group cursor-pointer hover:border-purple-500/50 transition-all duration-300 shadow-sm"
                    onClick={() => setSelectedImage("/images/built in functions js.jpeg")}
                  >
                    <div className="p-3 bg-neutral-100 dark:bg-neutral-950/60 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center text-[10px] uppercase font-bold text-neutral-400 select-none">
                      <span>JavaScript Built-in Functions Reference</span>
                      <span className="text-[9px] text-purple-500 font-semibold group-hover:underline">Zoom</span>
                    </div>
                    <div className="p-2 flex items-center justify-center">
                      <img src="/images/built in functions js.jpeg" alt="JavaScript Built-in Functions" className="w-full aspect-[16/9] object-contain rounded-lg group-hover:scale-[1.01] transition-transform duration-300" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-5">
                  <button 
                    onClick={() => setShowRecall(!showRecall)} 
                    className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer text-[11px] uppercase tracking-wider"
                  >
                    🚀 {showRecall ? "Hide Recall Cheat Sheet" : "Show Recall Cheat Sheet"}
                  </button>
                </div>

                {/* Recall lists expander */}
                {showRecall && (
                  <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-850 space-y-6">
                    {/* Tab Navigation */}
                    <div className="flex flex-wrap gap-2 pb-4 border-b border-neutral-200/60 dark:border-neutral-800/60 select-none">
                      <button
                        onClick={() => setRecallTab("core")}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${recallTab === "core" ? "bg-purple-500 text-white shadow-sm" : "bg-neutral-100 dark:bg-neutral-900/50 text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"}`}
                      >
                        🚀 JS & React Core (30)
                      </button>
                      <button
                        onClick={() => setRecallTab("native")}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${recallTab === "native" ? "bg-indigo-500 text-white shadow-sm" : "bg-neutral-100 dark:bg-neutral-900/50 text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"}`}
                      >
                        📱 React Native Promises (9)
                      </button>
                      <button
                        onClick={() => setRecallTab("daily")}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${recallTab === "daily" ? "bg-emerald-500 text-white shadow-sm" : "bg-neutral-100 dark:bg-neutral-900/50 text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"}`}
                      >
                        📅 Daily Reminders & Types
                      </button>
                      <button
                        onClick={() => setRecallTab("roadmap")}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${recallTab === "roadmap" ? "bg-amber-500 text-white shadow-sm" : "bg-neutral-100 dark:bg-neutral-900/50 text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"}`}
                      >
                        🗺️ 7-Day Roadmap
                      </button>
                    </div>

                    {/* Tab 1: JS & React Core */}
                    {recallTab === "core" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {recallTips.map((tip, idx) => (
                          <div key={idx} className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/20 hover:border-purple-500/30 dark:hover:border-purple-500/20 transition-all duration-300 shadow-sm flex flex-col justify-between group">
                            <div>
                              <div className="flex items-center gap-2 mb-2.5 select-none">
                                <span className="w-1.5 h-3.5 rounded-full bg-purple-500" />
                                <h4 className="text-xs sm:text-sm font-bold text-neutral-850 dark:text-neutral-100">{tip.term}</h4>
                              </div>
                              <p className="text-xs sm:text-sm text-neutral-550 dark:text-neutral-400 leading-relaxed mb-4">
                                {tip.definition}
                              </p>
                            </div>
                            {tip.code && (
                              <pre className="p-3 bg-neutral-950 text-neutral-200 rounded-xl text-[11px] sm:text-xs font-mono text-left overflow-x-auto border border-neutral-900 select-text whitespace-pre-wrap leading-relaxed select-text">
                                <code className="text-[#9ece6a]">{tip.code}</code>
                              </pre>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tab 2: React Native Promises */}
                    {recallTab === "native" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {rnCheatSheet.map((tip, idx) => (
                          <div key={idx} className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/20 hover:border-indigo-500/30 dark:hover:border-indigo-500/20 transition-all duration-300 shadow-sm">
                            <div className="flex items-center gap-2 mb-2.5 select-none">
                              <span className="w-1.5 h-3.5 rounded-full bg-indigo-500" />
                              <h4 className="text-xs sm:text-sm font-bold font-mono text-indigo-550 dark:text-indigo-450">{tip.term}</h4>
                            </div>
                            <p className="text-xs sm:text-sm text-neutral-550 dark:text-neutral-400 leading-relaxed">
                              {tip.definition}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tab 3: Daily Reminders & Fundamentals */}
                    {recallTab === "daily" && (
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Data Types Card */}
                        <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/20 hover:border-emerald-500/30 dark:hover:border-emerald-500/20 transition-all duration-300 shadow-sm flex flex-col justify-between text-left">
                          <div>
                            <div className="flex items-center gap-2 mb-4 border-b border-neutral-100 dark:border-neutral-900 pb-3 select-none">
                              <span className="w-1.5 h-3.5 rounded-full bg-emerald-500" />
                              <h4 className="text-xs sm:text-sm font-bold text-neutral-850 dark:text-neutral-100">JavaScript Data Types</h4>
                            </div>
                            <div className="space-y-4">
                              <div>
                                <h5 className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-450 dark:text-neutral-400 mb-2 select-none">Primitives (Immutable, By Value)</h5>
                                <ul className="space-y-1.5 text-xs sm:text-sm text-neutral-550 dark:text-neutral-400 pl-4 list-disc">
                                  <li><strong>String</strong>: <code>"hello"</code></li>
                                  <li><strong>Number</strong>: <code>42</code>, <code>NaN</code></li>
                                  <li><strong>Boolean</strong>: <code>true</code> / <code>false</code></li>
                                  <li><strong>Undefined</strong>: Unassigned variables</li>
                                  <li><strong>Null</strong>: Intentional blank reference</li>
                                  <li><strong>Symbol</strong>: Unique property keys</li>
                                  <li><strong>BigInt</strong>: Huge numbers (<code>42n</code>)</li>
                                </ul>
                              </div>
                              <div className="pt-3 border-t border-neutral-100 dark:border-neutral-900">
                                <h5 className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-450 dark:text-neutral-400 mb-2 select-none">Non-Primitives (Mutable, By Reference)</h5>
                                <ul className="space-y-1.5 text-xs sm:text-sm text-neutral-550 dark:text-neutral-400 pl-4 list-disc">
                                  <li><strong>Object</strong>: Keys-values <code>{`{ age: 24 }`}</code></li>
                                  <li><strong>Array</strong>: List structure <code>[1, 2]</code></li>
                                  <li><strong>Function</strong>: Callable code objects</li>
                                  <li><strong>Date / RegExp</strong>: Internal structures</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Truthy / Falsy Card */}
                        <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/20 hover:border-emerald-500/30 dark:hover:border-emerald-500/20 transition-all duration-300 shadow-sm flex flex-col justify-between text-left">
                          <div>
                            <div className="flex items-center gap-2 mb-4 border-b border-neutral-100 dark:border-neutral-900 pb-3 select-none">
                              <span className="w-1.5 h-3.5 rounded-full bg-emerald-500" />
                              <h4 className="text-xs sm:text-sm font-bold text-neutral-850 dark:text-neutral-100">Truthy & Falsy Values</h4>
                            </div>
                            <div className="space-y-4">
                              <div>
                                <h5 className="text-[10px] font-extrabold uppercase tracking-wider text-rose-505 dark:text-rose-400 mb-2 select-none">The 8 Falsy Values (To false)</h5>
                                <ul className="space-y-1.5 text-xs sm:text-sm text-neutral-550 dark:text-neutral-400 pl-4 list-disc">
                                  <li><code>false</code> (boolean)</li>
                                  <li><code>0</code> / <code>-0</code> / <code>0n</code> (zeros)</li>
                                  <li><code>""</code> / <code>''</code> / <code>``</code> (empty string)</li>
                                  <li><code>null</code> (absence of reference)</li>
                                  <li><code>undefined</code> (unassigned name)</li>
                                  <li><code>NaN</code> (computational fail result)</li>
                                </ul>
                              </div>
                              <div className="pt-3 border-t border-neutral-100 dark:border-neutral-900">
                                <h5 className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-500 mb-2 select-none">Common Truthy Traps (To true!)</h5>
                                <ul className="space-y-1.5 text-xs sm:text-sm text-neutral-555 dark:text-neutral-400 pl-4 list-disc font-semibold">
                                  <li><code>[]</code> (empty array is truthy!)</li>
                                  <li><code>{}</code> (empty object is truthy!)</li>
                                  <li><code>"0"</code> / <code>'false'</code> (strings)</li>
                                  <li><code>() =&gt; {}</code> (any function structure)</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Daily Dev Checklist Card */}
                        <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/20 hover:border-emerald-500/30 dark:hover:border-emerald-500/20 transition-all duration-300 shadow-sm flex flex-col justify-between text-left">
                          <div>
                            <div className="flex items-center gap-2 mb-4 border-b border-neutral-100 dark:border-neutral-900 pb-3 select-none">
                              <span className="w-1.5 h-3.5 rounded-full bg-emerald-500" />
                              <h4 className="text-xs sm:text-sm font-bold text-neutral-850 dark:text-neutral-100">Daily Revision Checklist</h4>
                            </div>
                            <ul className="space-y-3.5 text-xs sm:text-sm text-neutral-550 dark:text-neutral-400 list-decimal pl-4 leading-relaxed">
                              <li><strong>Comparison Rule</strong>: Always use strict equality (<code>===</code>) to prevent hidden dynamic coercion conversion errors.</li>
                              <li><strong>React State</strong>: Treat states and props as immutable. Spread (<code>...</code>) or clone before modifications.</li>
                              <li><strong>Cleanup Rule</strong>: Clean up timers, events, and WebSocket handlers in the <code>useEffect</code> return lifecycle function.</li>
                              <li><strong>Keys Rule</strong>: Never use random values or array indices as rendering keys when lists re-order.</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Tab 4: 7-Day Study Roadmap */}
                    {recallTab === "roadmap" && (
                      <div className="space-y-6">
                        <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/[0.02] text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 select-none text-left">
                          <strong>💡 Study Tip:</strong> A week is enough to refresh the core concepts that interviewers ask most often, build confidence, and get in the right mindset before stepping into the interview room.
                        </div>

                        <div className="relative border-l-2 border-neutral-200 dark:border-neutral-800 ml-4 pl-6 space-y-6 text-left">
                          {/* Day 1 */}
                          <div className="relative">
                            <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-white text-[9px] font-bold">1</span>
                            <h4 className="text-sm font-bold text-neutral-850 dark:text-neutral-100">Day 1 – JavaScript Fundamentals</h4>
                            <ul className="mt-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 space-y-1 list-disc pl-4">
                              <li><strong>Closures</strong>: Lexical scoping and preserving references.</li>
                              <li><strong>Hoisting</strong>: Variable compilation phases.</li>
                              <li><strong>Event Loop</strong>: Macrotasks vs microtasks prioritization.</li>
                              <li><strong>Promises & async/await</strong>: Asynchronous pipeline flows.</li>
                              <li><strong>call, apply, bind</strong>: Explicit execution contexts.</li>
                            </ul>
                          </div>

                          {/* Day 2 */}
                          <div className="relative">
                            <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-white text-[9px] font-bold">2</span>
                            <h4 className="text-sm font-bold text-neutral-850 dark:text-neutral-100">Day 2 – React Core</h4>
                            <ul className="mt-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 space-y-1 list-disc pl-4">
                              <li><strong>Virtual DOM</strong>: Abstract node trees representation.</li>
                              <li><strong>Reconciliation</strong>: Fiber node diff calculations.</li>
                              <li><strong>JSX</strong>: Compiles down to <code>React.createElement</code> syntax.</li>
                              <li><strong>Components & Props</strong>: Reusable structures.</li>
                              <li><strong>State vs Props</strong>: Mutable local state vs immutable params.</li>
                            </ul>
                          </div>

                          {/* Day 3 */}
                          <div className="relative">
                            <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-white text-[9px] font-bold">3</span>
                            <h4 className="text-sm font-bold text-neutral-850 dark:text-neutral-100">Day 3 – React Hooks</h4>
                            <ul className="mt-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 space-y-1 list-disc pl-4">
                              <li><strong>useState & useEffect</strong>: State management and render lifecycle rules.</li>
                              <li><strong>useRef</strong>: Persistent values without triggering renders.</li>
                              <li><strong>useMemo & useCallback</strong>: Value and callback instance memoization.</li>
                              <li><strong>Custom Hooks</strong>: Extracting reusable logical scopes.</li>
                            </ul>
                          </div>

                          {/* Day 4 */}
                          <div className="relative">
                            <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-white text-[9px] font-bold">4</span>
                            <h4 className="text-sm font-bold text-neutral-850 dark:text-neutral-100">Day 4 – State Management & API</h4>
                            <ul className="mt-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 space-y-1 list-disc pl-4">
                              <li><strong>Context API</strong>: Prop drilling resolution.</li>
                              <li><strong>Redux Toolkit (RTK)</strong>: Single global store pattern.</li>
                              <li><strong>RTK Query & API Integration</strong>: Modern server-state fetching and caching.</li>
                            </ul>
                          </div>

                          {/* Day 5 */}
                          <div className="relative">
                            <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-white text-[9px] font-bold">5</span>
                            <h4 className="text-sm font-bold text-neutral-850 dark:text-neutral-100">Day 5 – Performance Optimization</h4>
                            <ul className="mt-2 text-xs sm:text-sm text-neutral-550 dark:text-neutral-400 space-y-1 list-disc pl-4">
                              <li><strong>React.memo</strong>: Pure component render optimization.</li>
                              <li><strong>Code Splitting & Lazy Loading</strong>: Bundle optimization.</li>
                              <li><strong>Debounce & Throttle</strong>: Event handler frequency throttling.</li>
                              <li><strong>Preventing Unnecessary Re-renders</strong>: Render key optimizations.</li>
                            </ul>
                          </div>

                          {/* Day 6 */}
                          <div className="relative">
                            <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-white text-[9px] font-bold">6</span>
                            <h4 className="text-sm font-bold text-neutral-850 dark:text-neutral-100">Day 6 – Practical Coding Challenges</h4>
                            <ul className="mt-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 space-y-1 list-disc pl-4">
                              <li><strong>Todo App / CRUD with REST APIs</strong>: State mutations check.</li>
                              <li><strong>Autocomplete Search with Debouncing</strong>: UI inputs.</li>
                              <li><strong>Infinite Scroll / Pagination</strong>: API integrations.</li>
                            </ul>
                          </div>

                          {/* Day 7 */}
                          <div className="relative">
                            <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-white text-[9px] font-bold">7</span>
                            <h4 className="text-sm font-bold text-neutral-850 dark:text-neutral-100">Day 7 – Mock Interview Prep</h4>
                            <ul className="mt-2 text-xs sm:text-sm text-neutral-550 dark:text-neutral-400 space-y-1 list-disc pl-4">
                              <li><strong>Project Review</strong>: Practice walking through a React Native project architecture end-to-end.</li>
                              <li><strong>Revision</strong>: Re-read core questions and practice coding interview basics.</li>
                              <li><strong>Behavioral Prep</strong>: Structure answers using the STAR method for past project challenges.</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                )}
              </div>

              {filteredData.length === 0 ? (
                <div className="empty-state">
                  <FiSearch size={32} />
                  <h3>No matches found</h3>
                  <p>Try a different search term.</p>
                </div>
              ) : (
                <div className="sections-list">
                  {filteredData.map((section) => (
                    <section key={section.id} id={section.id} className="topic-section">
                      <h2 className="topic-title">{section.title}</h2>

                      {section.difficultyBlocks.map((block, bIdx) => (
                        <div key={bIdx} className="diff-block">
                          <div className="diff-header">
                            <span className={`diff-badge ${diffBadge[block.difficulty] || ""}`}>{block.difficulty}</span>
                            <div className="diff-line" />
                          </div>

                          <div className="questions-list">
                            {block.questions.map((q) => {
                              const done = completedQuestions.has(q.id);
                              return (
                                <div key={q.id} className={`question-card ${done ? "question-done" : ""}`}>
                                  <div className="question-header">
                                    <button onClick={() => toggleQuestion(q.id)} className={`q-check ${done ? "q-check-done" : ""}`}>
                                      {done ? <FiCheckSquare size={18} /> : <FiSquare size={18} />}
                                    </button>
                                    <div className="q-text-wrap">
                                      <span className="q-label">Q.</span>
                                      <span className={`q-text ${done ? "q-text-done" : ""}`} dangerouslySetInnerHTML={{ __html: q.text }} />
                                    </div>
                                  </div>

                                  <div className="answers-list">
                                    {q.answers.map((ans, aIdx) => {
                                      if (ans.type === "code") {
                                        return <CodePlayground key={aIdx} code={ans.code} language={ans.language} />;
                                      }
                                      return (
                                        <div key={aIdx} className="answer-text" dangerouslySetInnerHTML={{ __html: ans.content }} />
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </section>
                  ))}
                </div>
              )}

              <footer className="hb-footer">
                <p>Built by Gowtham — For personal interview preparation only.</p>
              </footer>
            </div>

            {/* ── Right Side TOC ── */}
            <aside className="right-toc" data-lenis-prevent>
              <div className="toc-header">
                <FiBookOpen size={14} />
                <span>On This Page</span>
              </div>
              <nav className="toc-nav">
                {filteredData.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className={`toc-link ${activeSection === sec.id ? "toc-active" : ""}`}
                  >
                    {sec.title}
                  </a>
                ))}
              </nav>
            </aside>
          </div>
        </main>
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          <img src={selectedImage} alt="Zoomed View" className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-scaleUp" />
          <button className="absolute top-6 right-6 text-white hover:text-neutral-300 p-2 cursor-pointer bg-neutral-800/50 hover:bg-neutral-800/80 rounded-full transition-colors">
            <FiX size={20} />
          </button>
        </div>
      )}
    </>
  );
}

/* ─────────────────────────────────────────────
   All styles in a single template literal
   ───────────────────────────────────────────── */
const handbookStyles = `
  /* ── Variables ── */
  .handbook-root {
    --hb-bg: #fafafa;
    --hb-bg-card: #ffffff;
    --hb-bg-sidebar: #ffffff;
    --hb-bg-code: #0d1117;
    --hb-text: #1a1a2e;
    --hb-text-secondary: #64748b;
    --hb-text-muted: #94a3b8;
    --hb-border: #e2e8f0;
    --hb-border-light: #f1f5f9;
    --hb-accent: #a855f7;
    --hb-accent-glow: rgba(168,85,247,0.08);
    --hb-green: #10b981;
    --hb-red: #f43f5e;
    --hb-sidebar-w: 300px;
    --hb-font: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
    --hb-font-mono: "JetBrains Mono", "Fira Code", "Cascadia Code", "SF Mono", Consolas, monospace;
  }

  :root[class~="dark"] .handbook-root,
  .dark .handbook-root {
    --hb-bg: #070b12;
    --hb-bg-card: #0f1419;
    --hb-bg-sidebar: #0b0f18;
    --hb-bg-code: #010409;
    --hb-text: #e2e8f0;
    --hb-text-secondary: #94a3b8;
    --hb-text-muted: #475569;
    --hb-border: #1e293b;
    --hb-border-light: #151d2e;
    --hb-accent: #c084fc;
    --hb-accent-glow: rgba(192,132,252,0.1);
  }

  /* ── Root ── */
  .handbook-root {
    display: flex;
    min-height: 100vh;
    background: var(--hb-bg);
    color: var(--hb-text);
    font-family: var(--hb-font);
    scroll-behavior: smooth;
  }

  .handbook-root *, .handbook-root *::before, .handbook-root *::after {
    box-sizing: border-box;
  }

  /* ── Sidebar ── */
  .hb-sidebar {
    position: fixed;
    top: 0; left: 0; bottom: 0;
    width: var(--hb-sidebar-w);
    background: var(--hb-bg-sidebar);
    border-right: 1px solid var(--hb-border);
    z-index: 50;
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
  }

  .sidebar-inner {
    padding: 24px 20px 0;
  }

  /* The nav wrapper gets explicit max-height so it ALWAYS scrolls */
  .sidebar-nav-wrap {
    max-height: calc(100vh - 420px);
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-y: contain;
    scrollbar-width: thin;
    scrollbar-color: var(--hb-border) transparent;
    margin: 0 -8px;
    padding: 0 8px;
  }

  .sidebar-nav-wrap::-webkit-scrollbar { width: 4px; }
  .sidebar-nav-wrap::-webkit-scrollbar-track { background: transparent; }
  .sidebar-nav-wrap::-webkit-scrollbar-thumb { background: var(--hb-border); border-radius: 4px; }

  .sidebar-nav {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding-bottom: 12px;
  }

  .sidebar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--hb-border);
  }

  .back-link {
    display: flex; align-items: center; gap: 6px;
    font-size: 0.75rem; font-weight: 600;
    color: var(--hb-accent);
    text-decoration: none;
  }
  .back-link:hover { text-decoration: underline; }

  .mobile-close-btn {
    display: none;
    background: none; border: none; cursor: pointer;
    color: var(--hb-text-secondary);
    padding: 4px;
  }

  .sidebar-profile {
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 24px;
  }

  .profile-avatar {
    width: 40px; height: 40px; border-radius: 12px;
    background: linear-gradient(135deg, #a855f7, #6366f1);
    display: flex; align-items: center; justify-content: center;
    font-weight: 800; color: #fff; font-size: 1rem;
    font-family: var(--hb-font-mono);
    box-shadow: 0 4px 12px rgba(168,85,247,0.25);
  }

  .profile-name { font-size: 0.85rem; font-weight: 700; margin: 0; }
  .profile-subtitle { font-size: 0.65rem; font-weight: 600; color: var(--hb-text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin: 2px 0 0; }

  /* Progress */
  .sidebar-progress {
    padding: 14px 16px; border-radius: 14px;
    border: 1px solid var(--hb-border);
    background: var(--hb-accent-glow);
    margin-bottom: 20px;
  }
  .progress-top { display: flex; justify-content: space-between; font-size: 0.7rem; font-weight: 700; margin-bottom: 8px; color: var(--hb-text-secondary); }
  .progress-pct { color: var(--hb-accent); }
  .progress-bar-bg { height: 6px; border-radius: 6px; background: var(--hb-border); overflow: hidden; margin-bottom: 6px; }
  .progress-bar-fill { height: 100%; border-radius: 6px; background: linear-gradient(90deg, #a855f7, #6366f1); transition: width 0.4s ease; }
  .progress-label { font-size: 0.65rem; color: var(--hb-text-muted); font-weight: 600; }

  /* Search */
  .sidebar-search { position: relative; margin-bottom: 20px; }
  .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--hb-text-muted); width: 15px; height: 15px; }
  .search-input {
    width: 100%; padding: 10px 14px 10px 36px;
    border-radius: 12px; border: 1px solid var(--hb-border);
    background: var(--hb-bg); color: var(--hb-text);
    font-size: 0.78rem; outline: none;
    font-family: var(--hb-font);
    transition: border-color 0.2s;
  }
  .search-input:focus { border-color: var(--hb-accent); }
  .search-input::placeholder { color: var(--hb-text-muted); }

  /* Nav link styles */

  .nav-link {
    display: flex; align-items: center; justify-content: space-between;
    padding: 8px 12px; border-radius: 10px;
    font-size: 0.78rem; font-weight: 500;
    color: var(--hb-text-secondary);
    text-decoration: none;
    transition: all 0.15s;
    gap: 8px;
  }
  .nav-link:hover { background: var(--hb-accent-glow); color: var(--hb-accent); }
  .nav-link.nav-active { background: var(--hb-accent-glow); color: var(--hb-accent); font-weight: 600; border-left: 2px solid var(--hb-accent); border-radius: 0 10px 10px 0; padding-left: 10px; }
  .nav-link.nav-done { opacity: 0.55; }

  .nav-link-text { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; }

  .nav-count {
    flex-shrink: 0;
    padding: 2px 8px; border-radius: 20px;
    font-size: 0.65rem; font-weight: 700;
    border: 1px solid var(--hb-border);
    background: var(--hb-bg);
    color: var(--hb-text-muted);
  }
  .nav-count-done { background: rgba(16,185,129,0.08); color: var(--hb-green); border-color: rgba(16,185,129,0.2); }

  /* Sidebar Footer */
  .sidebar-footer {
    flex-shrink: 0;
    padding: 16px 20px;
    border-top: 1px solid var(--hb-border);
    display: flex; align-items: center; justify-content: space-between;
  }

  .reset-btn {
    display: flex; align-items: center; gap: 6px;
    background: none; border: none; cursor: pointer;
    font-size: 0.75rem; font-weight: 700;
    color: var(--hb-red); padding: 6px 10px; border-radius: 10px;
    font-family: var(--hb-font);
    transition: background 0.2s;
  }
  .reset-btn:hover { background: rgba(244,63,94,0.06); }

  .theme-toggle-btn {
    background: none; border: 1px solid var(--hb-border); cursor: pointer;
    padding: 8px; border-radius: 10px;
    color: var(--hb-text-secondary);
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s;
  }
  .theme-toggle-btn:hover { border-color: var(--hb-accent); color: var(--hb-accent); }

  /* ── Mobile ── */
  .mobile-header {
    display: none;
    position: fixed; top: 0; left: 0; right: 0;
    height: 56px; z-index: 40;
    background: var(--hb-bg-sidebar);
    border-bottom: 1px solid var(--hb-border);
    padding: 0 20px;
    align-items: center; justify-content: space-between;
  }

  .mobile-menu-btn {
    background: none; border: 1px solid var(--hb-border); cursor: pointer;
    padding: 6px; border-radius: 8px; color: var(--hb-text-secondary);
    display: flex; align-items: center;
  }

  .mobile-title { font-size: 0.8rem; font-weight: 700; font-family: var(--hb-font-mono); }

  .sidebar-overlay {
    display: none;
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.5);
    z-index: 45;
  }

  @media (max-width: 768px) {
    .hb-sidebar { transform: translateX(-100%); width: 85vw; max-width: 340px; }
    .hb-sidebar.open { transform: translateX(0); box-shadow: 8px 0 30px rgba(0,0,0,0.3); }
    .sidebar-overlay { display: block; }
    .mobile-close-btn { display: flex; }
    .mobile-header { display: flex; }
    .hb-main { padding-left: 0; padding-top: 56px; }
  }

  /* ── Main ── */
  .hb-main {
    flex: 1;
    padding-left: var(--hb-sidebar-w);
    min-height: 100vh;
  }

  .main-layout {
    display: flex;
    align-items: flex-start;
    max-width: 1200px;
    margin: 0 auto;
  }

  .main-inner {
    flex: 1;
    min-width: 0;
    padding: 48px 32px 80px;
  }

  /* ── Right TOC ── */
  .right-toc {
    position: sticky;
    top: 32px;
    width: 220px;
    flex-shrink: 0;
    padding: 24px 0 24px 16px;
    border-left: 1px solid var(--hb-border);
    margin-top: 48px;
    max-height: calc(100vh - 64px);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: var(--hb-border) transparent;
  }

  .right-toc::-webkit-scrollbar { width: 3px; }
  .right-toc::-webkit-scrollbar-track { background: transparent; }
  .right-toc::-webkit-scrollbar-thumb { background: var(--hb-border); border-radius: 3px; }

  .toc-header {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--hb-text-muted);
    margin-bottom: 12px;
    padding-left: 12px;
  }

  .toc-nav {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .toc-link {
    display: block;
    padding: 5px 12px;
    font-size: 0.72rem;
    font-weight: 500;
    color: var(--hb-text-muted);
    text-decoration: none;
    border-left: 2px solid transparent;
    transition: all 0.15s;
    line-height: 1.4;
  }
  .toc-link:hover {
    color: var(--hb-accent);
  }
  .toc-link.toc-active {
    color: var(--hb-accent);
    border-left-color: var(--hb-accent);
    font-weight: 600;
    background: var(--hb-accent-glow);
  }

  @media (max-width: 1100px) {
    .right-toc { display: none; }
  }

  @media (max-width: 768px) {
    .main-inner { padding: 24px 16px 60px; }
  }

  /* Page Header */
  .page-header {
    position: relative;
    margin-bottom: 40px;
    padding: 28px 28px 26px;
    border-radius: 22px;
    border: 1px solid var(--hb-border);
    overflow: hidden;
    background:
      radial-gradient(120% 140% at 100% 0%, rgba(168,85,247,0.14), transparent 55%),
      radial-gradient(120% 140% at 0% 100%, rgba(217,70,239,0.1), transparent 55%),
      var(--hb-bg-card);
  }

  .hb-hero-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 12px; border-radius: 999px;
    font-size: 0.7rem; font-weight: 700; letter-spacing: 0.03em;
    color: var(--hb-accent);
    background: var(--hb-accent-glow);
    border: 1px solid color-mix(in srgb, var(--hb-accent) 30%, transparent);
    margin-bottom: 14px;
  }

  .page-title {
    font-size: 2rem; font-weight: 800;
    background: linear-gradient(135deg, #a855f7, #d946ef 60%, #6366f1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0 0 10px;
    line-height: 1.15;
  }

  .page-subtitle { font-size: 0.9rem; color: var(--hb-text-secondary); margin: 0; line-height: 1.5; max-width: 620px; }

  .hb-hero-stats { display: flex; flex-wrap: wrap; gap: 22px; margin-top: 22px; }
  .hb-hero-stat { display: flex; flex-direction: column; }
  .hb-hero-stat strong {
    font-size: 1.35rem; font-weight: 800; line-height: 1;
    background: linear-gradient(135deg, #a855f7, #d946ef);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .hb-hero-stat span { font-size: 0.62rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--hb-text-muted); margin-top: 5px; }

  @media (max-width: 768px) {
    .page-header { padding: 22px 18px; border-radius: 18px; }
    .page-title { font-size: 1.45rem; }
    .page-subtitle { font-size: 0.8rem; }
    .hb-hero-stats { gap: 16px; margin-top: 18px; }
    .hb-hero-stat strong { font-size: 1.15rem; }
  }

  /* Empty State */
  .empty-state {
    text-align: center; padding: 80px 0;
    color: var(--hb-text-muted);
  }
  .empty-state h3 { font-size: 0.9rem; font-weight: 700; margin: 12px 0 4px; color: var(--hb-text-secondary); }
  .empty-state p { font-size: 0.8rem; }

  /* Sections */
  .sections-list { display: flex; flex-direction: column; gap: 48px; }

  .topic-section { scroll-margin-top: 80px; }

  .topic-title {
    font-size: 1.3rem; font-weight: 800;
    margin: 0 0 24px;
    padding-bottom: 10px;
    border-bottom: 2px solid var(--hb-border-light);
    color: var(--hb-text);
  }

  /* Difficulty Blocks */
  .diff-block { margin-bottom: 32px; }

  .diff-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
  .diff-badge {
    padding: 3px 12px; border-radius: 20px;
    font-size: 0.65rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.06em;
    border: 1px solid transparent;
    white-space: nowrap;
  }
  .badge-beginner { background: rgba(16,185,129,0.08); color: #10b981; border-color: rgba(16,185,129,0.2); }
  .badge-intermediate { background: rgba(168,85,247,0.08); color: #a855f7; border-color: rgba(168,85,247,0.2); }
  .badge-advanced { background: rgba(245,158,11,0.08); color: #f59e0b; border-color: rgba(245,158,11,0.2); }
  .badge-expert { background: rgba(244,63,94,0.08); color: #f43f5e; border-color: rgba(244,63,94,0.2); }
  .diff-line { flex: 1; height: 1px; background: var(--hb-border); }

  /* Questions */
  .questions-list { display: flex; flex-direction: column; gap: 12px; }

  .question-card {
    padding: 20px 24px;
    border-radius: 16px;
    border: 1px solid var(--hb-border);
    background: var(--hb-bg-card);
    transition: all 0.2s;
  }
  .question-card:hover { border-color: color-mix(in srgb, var(--hb-accent) 30%, var(--hb-border)); }
  .question-card.question-done { opacity: 0.6; border-color: rgba(16,185,129,0.25); }

  .question-header { display: flex; align-items: flex-start; gap: 12px; }

  .q-check {
    background: none; border: none; cursor: pointer;
    color: var(--hb-text-muted); padding: 2px; margin-top: 1px;
    flex-shrink: 0; transition: color 0.2s;
  }
  .q-check:hover { color: var(--hb-accent); }
  .q-check-done { color: var(--hb-green) !important; }

  .q-text-wrap { font-size: 0.9rem; font-weight: 600; line-height: 1.5; }
  .q-label { color: var(--hb-text-muted); margin-right: 6px; font-family: var(--hb-font-mono); font-size: 0.8rem; }
  .q-text-done { text-decoration: line-through; color: var(--hb-text-muted); }

  /* Inline code in questions/answers */
  .question-card code {
    font-family: var(--hb-font-mono);
    background: var(--hb-accent-glow);
    color: #e879a0;
    padding: 1px 6px;
    border-radius: 4px;
    font-size: 0.85em;
    border: 1px solid var(--hb-border);
  }

  .dark .question-card code {
    color: #f0abfc;
  }

  .answers-list {
    margin-top: 14px;
    padding-left: 36px;
    display: flex; flex-direction: column; gap: 8px;
  }

  .answer-text {
    font-size: 0.85rem;
    color: var(--hb-text-secondary);
    line-height: 1.65;
    list-style-type: disc;
    display: list-item;
  }

  /* ── Code Playground ── */
  .code-playground {
    margin: 12px 0 4px;
    border-radius: 14px;
    border: 1px solid var(--hb-border);
    overflow: hidden;
    background: var(--hb-bg-code);
  }

  .code-toolbar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 6px 14px;
    background: color-mix(in srgb, var(--hb-bg-code) 90%, var(--hb-border));
    border-bottom: 1px solid var(--hb-border);
  }

  .code-lang-label {
    font-size: 0.65rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.06em;
    color: var(--hb-text-muted);
    font-family: var(--hb-font);
  }

  .code-actions { display: flex; gap: 4px; }

  .code-action-btn {
    display: flex; align-items: center; gap: 4px;
    background: none; border: 1px solid var(--hb-border);
    color: var(--hb-text-muted);
    padding: 4px 10px; border-radius: 7px;
    cursor: pointer; font-size: 0.7rem; font-weight: 600;
    font-family: var(--hb-font);
    transition: all 0.15s;
  }
  .code-action-btn:hover { color: #e2e8f0; border-color: var(--hb-accent); background: var(--hb-accent-glow); }

  .run-btn { color: var(--hb-green); border-color: rgba(16,185,129,0.3); }
  .run-btn:hover { background: rgba(16,185,129,0.08); border-color: var(--hb-green); }

  .text-emerald { color: var(--hb-green); }

  .code-pre {
    margin: 0;
    padding: 16px 20px;
    overflow-x: auto;
    background: var(--hb-bg-code);
  }

  .code-pre code {
    font-family: var(--hb-font-mono) !important;
    font-size: 0.85rem !important;
    line-height: 1.65 !important;
    background: none !important;
    border: none !important;
    padding: 0 !important;
    border-radius: 0 !important;
    color: #e2e8f0 !important;
    display: block;
    white-space: pre;
    tab-size: 2;
  }

  .code-pre code.code-editing {
    outline: none;
    cursor: text;
    caret-color: #60a5fa;
    background: rgba(30,41,59,0.3) !important;
    border-radius: 4px !important;
    padding: 4px !important;
  }

  /* Override hljs background */
  .code-pre code.hljs {
    background: transparent !important;
    padding: 0 !important;
  }

  /* Console */
  .console-wrapper {
    border-top: 1px solid var(--hb-border);
    padding: 12px 16px;
    background: #020617;
  }

  .console-header {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 8px;
  }
  .console-header span {
    font-size: 0.65rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.05em;
    color: #475569;
  }
  .console-clear-btn {
    background: none; border: none; cursor: pointer;
    font-size: 0.65rem; font-weight: 600; color: #475569;
    font-family: var(--hb-font);
    transition: color 0.2s;
  }
  .console-clear-btn:hover { color: #94a3b8; }

  .console-output {
    font-family: var(--hb-font-mono);
    font-size: 0.82rem;
    line-height: 1.6;
    color: var(--hb-green);
    white-space: pre-wrap;
    word-break: break-word;
    margin: 0;
    background: none !important;
    border: none !important;
    padding: 0 !important;
  }
  .console-error { color: var(--hb-red) !important; }

  /* Footer */
  .hb-footer {
    margin-top: 80px;
    padding-top: 32px;
    border-top: 1px solid var(--hb-border);
    text-align: center;
  }
  .hb-footer p { font-size: 0.8rem; color: var(--hb-text-muted); }
`;
