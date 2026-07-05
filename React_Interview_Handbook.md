# React and Frontend Interview Preparation Handbook

Welcome to the ultimate React and Frontend Interview Preparation Handbook. This guide compiles and organizes over 200+ distinct interview questions, scenario-based system designs, coding challenges, and data structure algorithms from beginner to expert levels.

---

# HTML and CSS Fundamentals

## Beginner

1. What is CSS and what is its purpose?
   - CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation and layout of document markup (HTML).
2. What is the difference between `<section>`, `<article>`, and `<aside>` semantic elements?
   - `<section>` represents a thematic grouping of content, typically with a heading.
   - `<article>` represents a self-contained, independent composition (e.g., blog post).
   - `<aside>` represents tangential or sidebar content related to the surrounding context.
3. What is the difference between block and inline HTML elements?
   - Block elements start on a new line and take up the full width of the container.
   - Inline elements do not start on a new line and only take up the width necessary for their content.
4. What is the CSS `opacity` property and its valid range?
   - Opacity specifies the transparency of an element. Its valid range is 0.0 (fully transparent) to 1.0 (fully opaque).
5. How does Flexbox differ from Grid? When would you use one over the other?
   - Flexbox is designed for one-dimensional layouts (either a row or a column).
   - Grid is designed for two-dimensional layouts (both rows and columns simultaneously).
6. What are the different ways to center elements horizontally and vertically (e.g., Flexbox, `margin: auto`, `text-align`)?
   - Flexbox: `display: flex; justify-content: center; align-items: center;`
   - Grid: `display: grid; place-items: center;`
   - Absolute: `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);`

## Intermediate

7. Difference between absolute, relative, fixed, static, and sticky CSS positioning.
   - static: Default layout flow.
   - relative: Positioned relative to its normal flow position.
   - absolute: Positioned relative to its nearest non-static positioned ancestor.
   - fixed: Positioned relative to the viewport.
   - sticky: Hybrid positioning toggling between relative and fixed based on scroll offsets.
8. How does the CSS box model impact layouts, and what role does `box-sizing` play?
   - The box model wraps elements in content, padding, border, and margin.
   - `box-sizing: content-box` (default) adds padding and borders on top of width/height.
   - `box-sizing: border-box` absorbs padding and borders inside width/height.
9. Difference between `display: none` and `visibility: hidden`.
   - `display: none` hides the element and removes it from the document flow (takes up no space).
   - `visibility: hidden` hides the element but preserves its space in the layout.
10. What is CSS Specificity? How does the browser calculate style priority?
    - A weight system determining which CSS rules apply: Inline styles > IDs > Classes/Pseudo-classes > Elements/Pseudo-elements.
11. What is the difference between pseudo-classes and pseudo-elements?
    - Pseudo-classes select states of an element (e.g., `:hover`, `:focus`).
    - Pseudo-elements style specific parts of an element (e.g., `::before`, `::after`).
12. How do you make a website responsive across different devices?
    - Using CSS media queries, responsive grids (Flexbox/Grid), and fluid units (`%`, `vw`, `vh`, `rem`, `em`).
13. What are some of the latest CSS features/properties introduced recently?
    - CSS Nesting, `@container` queries, `:has()` relational selector, subgrid, and new color spaces (`oklch`).
14. Which libraries or frameworks have you used for writing CSS?
    - Tailwind CSS, Styled Components (CSS-in-JS), SASS/SCSS, CSS Modules.

## Advanced

15. If you were building a complete website like Amazon or Myntra from scratch, would you use Flexbox or Grid? Why?
    - A hybrid approach: Grid for high-level main structures (header, content columns, footer grids) and Flexbox for nested, one-dimensional dynamic layouts (navbar links, card contents).
16. How do you handle cross-browser quirks without breaking the user experience?
    - Feature queries (`@supports`), CSS resets/normalizers, autoprefixer compilation plugins, and robust fallback styles.
17. If you have a 2MB image, how would you efficiently display it across all responsive devices?
    - Compress via modern formats (`webp`, `avif`), utilize CDN imaging optimization APIs, lazy-load (`loading="lazy"`), and implement `srcset` on `<picture>` wrappers.
18. How does browser rendering work internally (repaint, reflow, compositing) and what causes UI jank?
    - Reflow recalculates layout dimensions. Repaint redraws pixels. Compositing layers elements. Jank occurs when main thread execution lags, dropping frames below 60fps.

## Expert

19. Explain what happens internally from a network and browser perspective when a user types a URL in the browser and hits Enter.
    - DNS resolution converts domain to IP. TCP handshake establishes connection. TLS negotiation secures it. HTTP request fetches resource. HTML is parsed, constructing DOM/CSSOM. Layout and paint phases render the pixels.

---

# JavaScript Fundamentals

## Beginner

1. What is the difference between `null`, `undefined`, and `NaN`?
   - `null`: Explicit assignment representing the intentional absence of value.
   - `undefined`: Declared variable that hasn't been assigned a value.
   - `NaN`: Not-a-Number, representing numeric computational failures.
2. What is hoisting? Explain the concept of hoisting with an example.
   - Declarations are moved to the top of their enclosing scope prior to script execution.
   - Code:
     ```javascript
     console.log(x); // undefined
     var x = 5;
     ```
3. What is the Temporal Dead Zone (TDZ) in JavaScript?
   - The state between variable binding creation and its declaration line (using `let` or `const`) where variable access throws a ReferenceError.
4. Explain the difference between `var`, `let`, and `const`. When should each be used?
   - `var` is function-scoped and hoisted with undefined.
   - `let` is block-scoped and hoisted into the TDZ.
   - `const` is block-scoped, hoisted into the TDZ, and requires read-only value binding initialization.
5. What is the difference between `==` and `===`? Why is strict equality generally preferred?
   - `==` performs type coercion before comparison. `===` compares values and types strictly. Strict equality prevents hidden type bugs.
6. What is callback hell, and how can it be avoided?
   - Excessive nesting of callback handlers causing unreadable "pyramid of doom" patterns. Avoided using Promises or `async/await`.
7. Difference between synchronous and asynchronous JavaScript.
   - Synchronous runs line-by-line in a blocking thread. Asynchronous registers callbacks or promises to handle tasks in a non-blocking queue.
8. What is the difference between `map()`, `filter()`, `forEach()`, and `reduce()`?
   - `map()` returns a transformed array.
   - `filter()` returns elements matching conditions.
   - `forEach()` iterates over items returning undefined.
   - `reduce()` aggregates elements to a single value.
9. Difference between normal functions and arrow functions.
   - Arrow functions capture lexical scope `this` values, cannot act as constructors, lack an arguments object, and cannot act as generator functions.
10. Explain Objects in JavaScript. What types of Objects are there, and how do you define them?
    - Collections of key-value pairs. Built-in types include arrays, functions, dates, regExps. Defined via literal, constructors, or `Object.create()`.
11. What is the difference between the spread (`...`) operator and the rest (`...`) operator?
    - Spread expands collections into individual components. Rest accumulates multiple items into a single container array/object.
12. What are the key ES6 features in JavaScript?
    - Classes, template literals, destructuring, promises, modules, default parameters, map/set collections.
13. What is the difference between `localStorage` and `sessionStorage`?
    - `localStorage` data persists indefinitely. `sessionStorage` clears as soon as the browsing session or tab is closed.

## Intermediate

14. Explain closures in JavaScript and how they can be used to implement private variables.
    - Closures form when nested functions capture references to outer scope variables. Capturing prevents outer execution garbage collection.
15. How do `call()`, `apply()`, and `bind()` differ? Can they be used with Arrow Functions?
    - `call()` runs function specifying `this` and individual arguments.
    - `apply()` runs function specifying `this` and array argument.
    - `bind()` returns function binding `this`.
    - They cannot override `this` on arrow functions since arrow functions capture `this` lexically.
16. Explain prototypal inheritance and the prototype chain.
    - Objects inherit methods from parent prototypes linked via double-underscore references, searching upwards until null.
17. What is event delegation, and why is it useful in large DOM trees?
    - Single parent element handles events bubbling up from descendants, saving memory allocation costs.
18. Event bubbling vs capturing — where have you applied this in production?
    - Bubbling triggers from child to parent. Capturing runs parent down to child. Applied in global analytics listeners.
19. What is the difference between a Deep Copy and a Shallow Copy? How can you clone nested objects?
    - Shallow copy references nested pointers. Deep copy duplicates recursive levels. Clone via `structuredClone()` or libraries.
20. What is a Promise in JavaScript? How do Promises differ from `async/await`?
    - Promises represent eventual async success/failure. `async/await` is cleaner syntax built on top of Promise resolvers.
21. How do you handle asynchronous operations using `async/await`?
    - Using async function blocks wrapping await triggers inside try/catch sequences.
22. What are higher-order functions? Name some built-in JavaScript methods that use them.
    - Functions accepting or returning other functions (e.g. `map`, `filter`, `reduce`).
23. Explain the JavaScript execution context, lexical scope, and call stack.
    - The environment executing code is context. Lexical scope sets variable boundaries based on placement. Call stack manages contexts.
24. Explain CORS (Cross-Origin Resource Sharing) in simple terms.
    - Browser safety protocol restricting client cross-origin headers unless permitted by target servers.
25. Explain the difference between `localStorage`, `sessionStorage`, and cookies in terms of security and scalability.
    - Storage holds 5-10MB. Cookies hold 4KB and travel on HTTP requests, raising vulnerabilities unless flag attributes (`Secure`, `HttpOnly`) are configured.

## Advanced

26. What is the JavaScript event loop? Explain microtasks, macrotasks, and the callback queue with examples.
    - Orchestrator prioritizing call stack clearance before microtasks (Promises) and macrotasks (setTimeout callbacks).
27. Why does the event loop matter for performance-heavy applications?
    - Blocking the execution context stack prevents the event loop from rendering, dropping frames and freezing user interactions.
28. What is Garbage Collection in JavaScript, and how does it work?
    - Reclaims memory allocated to unreachable variables using a mark-and-sweep reference algorithm.
29. What is Currying? Implement `sum(1)(2)(3)` in JavaScript.
    - Currying splits a multi-parameter function into single-parameter functions.
    - Code:
      ```javascript
      const sum = a => b => c => a + b + c;
      ```
30. Explain race conditions in frontend applications.
    - Async responses return in unpredictable order, updating state incorrectly. Resolved using cancellation hooks or abort controls.
31. How would you optimize a JavaScript application that becomes slow with large datasets?
    - Use pagination, virtualized viewports, custom indexing web-workers, and debounce high-frequency calculations.
32. Explain browser caching strategies with examples.
    - Service worker cache-first, network-first, Cache-Control headers (`max-age`, `must-revalidate`, `no-cache`, ETag validation).

---

# TypeScript and Large-Scale Frontend

## Intermediate

1. What is TypeScript and how does it differ from JavaScript?
   - A typed compiler superset of JavaScript providing compile-time checks and type annotations.
2. Difference between `type` and `interface` in TypeScript. When would you choose one over the other?
   - Interfaces allow decoration merges. Types support unions, aliases, and primitives. Choose interfaces for extensible API schemas.
3. Explain TypeScript interfaces, types, enums, and when to use each.
   - Interfaces check object structures. Types create complex signatures. Enums declare fixed sets of named numerical or string constants.
4. Explain TypeScript utility types like `Partial`, `Pick`, `Omit`, `Exclude`, and `Record`.
   - Partial makes fields optional. Pick selects subset parameters. Omit ignores attributes. Exclude filters types. Record creates key-value maps.
5. How does TypeScript's Generics feature help in large-scale applications?
   - Builds scalable, type-safe API abstractions and data-structures that support varying inputs without writing duplicate models.

## Advanced

6. What are mapped types, `keyof`, `keyof typeof`, and conditional types in TypeScript?
   - Mapped types modify structural attributes. keyof lists object keys. Conditional types select signatures dynamically based on checks.

---

# React Fundamentals

## Beginner

1. What is React?
   - A declarative component library designed for building dynamic UI views.
2. What is a React element vs a React component?
   - Elements are simple objects describing DOM configurations. Components are functions or classes returning elements.
3. What is JSX? How does Babel compile JSX?
   - HTML-like syntax compiled into React.createElement() method calls.
4. What is the difference between React and ReactDOM?
   - React manages components and Virtual DOM layouts. ReactDOM translates virtual representations to web DOM components.
5. What is the Virtual DOM? Why is React faster than traditional DOM manipulation?
   - In-memory representations mapped to real views. Diff calculations minimize real DOM repaints and reflow calculations.
6. Difference between functional and class components.
   - Functional components are simple functions using hooks. Class components are ES6 classes managing lifecycles.
7. What are props vs state? Difference between state and props?
   - State is mutable local memory. Props are immutable parameters received from parent scopes.
8. Explain parent-to-child and child-to-parent component communication.
   - Parents pass data to children via props. Children invoke passed callback functions to pass data back.
9. What is state lifting in React?
   - Extracting shared states to the closest common parent node.
10. What are default props?
    - Predefined fallback prop attributes used if parent allocations are omitted.
11. What are the conditional rendering techniques in React? How do you show and hide components conditionally?
    - Ternaries, logic execution filters (`&&`), and inline returns.
12. How do you loop over arrays and objects in React?
    - map() for arrays, Object.keys() or Object.entries() iteration maps for objects.
13. How do you change styles dynamically based on conditions?
    - Using conditional inline styles or template string calculations on className attributes.
14. How do you display user‑entered data in another textbox?
    - Synchronize inputs by mapping change triggers to a shared parent hook state.

## Intermediate

15. How does React's reconciliation algorithm and Virtual DOM diffing work?
    - An algorithm that calculates component element changes, utilizing keys for performance and matching type boundaries.
16. What is prop drilling, and how do you avoid it in a large application?
    - Passing props deep. Avoided using Context API, custom hooks, or state managers.
17. Why are keys important in dynamic rendering? Explain React's reconciliation process and the role of keys.
    - Keys preserve component identities during lists updates, avoiding slow reconstruction of identical DOM structures.
18. How do you display dynamic HTML data in React?
    - By wrapping content in dangerouslySetInnerHTML attributes.
19. How do you bind an array or object list to a dropdown, display the selected value elsewhere, and handle dependent dropdowns (e.g., country to state)?
    - Render state-driven select options, matching changes to separate list filter hooks.
20. How do you bind radio buttons using an array of objects and display the selected radio value in another field?
    - Match radio selections to state variables and render selections using secondary text parameters.

---

# React Hooks

## Beginner

1. What are React Hooks? Explain the main built-in hooks.
   - Functions providing hooks into states and lifecycles. Key hooks: useState, useEffect, useContext, useRef.
2. Explain the `useState` hook.
   - Returns a state container state value and a state setter.
3. Explain the `useEffect` hook and the cleanup function.
   - Runs side effects. Cleanup functions clear registers prior to unmounting or execution updates.
4. What are the different dependency array scenarios in `useEffect`?
   - Omitted: runs on every paint. []: runs on mount. [deps]: runs when values in deps update.
5. How do you call a method when a component mounts for the first time?
   - Trigger within useEffect using empty array dependencies.
6. Replace class lifecycle methods using `useEffect`.
   - componentDidMount matches empty arrays. componentWillUnmount maps to return cleanup hooks.
7. Explain the `useContext` hook.
   - Accesses Context values directly.
8. How do you access and manipulate a DOM element using `useRef`?
   - Bind the ref object to the element and access it via `ref.current`.

## Intermediate

9. How do `useEffect` dependencies work under the hood? What are some common mistakes developers make?
   - Shallow comparisons. Mistakes include omitting values, causing infinite loops.
10. If `useEffect` and `useMemo` have the same dependency array, which executes first and why?
    - `useMemo` runs first during rendering. `useEffect` runs asynchronously after layout/paint cycles.
11. Why does `useEffect` run twice in Strict Mode?
    - Verifies that cleanup effects are properly established.
12. Can we use Hooks inside conditions? Why?
    - No. Breaking call orders breaks the hook indexing map.
13. Explain the `useRef` hook in depth. How is it different from `useState`? When would you use `useRef` instead of `useState`?
    - useRef modifications do not trigger re-renders. Use to reference DOM nodes or compile persist values.
14. Explain `useMemo` and provide an example of optimization.
    - Memoizes values.
    - Code:
      ```javascript
      const calc = useMemo(() => heavyMath(x), [x]);
      ```
15. Explain `useCallback` and provide an example of optimization.
    - Memoizes references to callbacks.
    - Code:
      ```javascript
      const handle = useCallback(() => click(id), [id]);
      ```
16. Difference between `useMemo` and `useCallback`. When would you use each?
    - useMemo resolves return objects. useCallback preserves callback references.
17. Explain the `useReducer` hook.
    - Manages complex state changes through a reducer function.
18. When should you create Custom Hooks? Why do we use them, and how do they improve code reusability?
    - Extract custom sequences to hooks to prevent duplication.

## Advanced

19. Explain the `useDeferredValue` hook and its use cases.
    - Defers rendering expensive components until critical cycles finish.
20. Explain the `useTransition` hook and concurrent rendering.
    - Splits states into low-priority transitions.
21. What is the difference between `useEffect` and `useLayoutEffect`?
    - useLayoutEffect runs before browser paints. useEffect runs after paint.
22. Explain `useImperativeHandle` and how it works with `forwardRef`.
    - Customizes ref values returned to parent scopes.
23. Explain stale closures in React. What are they, and how are they used inside React hooks?
    - Closures referencing outdated scope objects due to missing dependencies.
24. How does React schedule effects?
    - Runs them in async processes scheduled after paint.

---

# Component Lifecycle

## Beginner

1. Explain the React component lifecycle and how hooks map to lifecycle phases.
   - Lifecycle phases: Mount, Update, Unmount. mapped to useEffect dependencies.

## Intermediate

2. How do you run logic after a state update or re‑render? How do you execute logic on every re‑render?
   - Match deps to trigger useEffect after rendering. Use no deps to trigger on every paint cycle.

---

# Forms

## Beginner

1. Create controlled vs uncontrolled components. What is the difference between them?
   - Controlled: values bound to state. Uncontrolled: values accessed via DOM hooks.

## Intermediate

2. What are the different form validation approaches in React?
   - Form-level hooks state checks, or custom libraries (yup, zod).
3. How do you handle multiple input fields in a React form?
   - By creating unified handler targets using name keys.
4. How do you implement file uploads in React forms?
   - Map files using local files state array packages.

---

# Event Handling

## Intermediate

1. Explain event handling in React. What happens when you pass a function as a prop to a component?
   - Handlers wrap events. Passing functions enables dynamic children callbacks.

---

# State Management

## Beginner

1. What is Context API? Have you used Context API?
   - Tool sharing global parameters. Used to manage structural contexts.
2. Explain Redux, its core fundamentals, and the Redux flow/workflow.
   - Single source store. Actions trigger updates in Reducers, which update components.

## Intermediate

3. When would you use Context API and when would you choose Redux / Redux Toolkit? Why?
   - Context for low frequency, simple data updates. RTK for robust scalable enterprise data.
4. How does Redux Toolkit simplify state management compared to traditional Redux?
   - RTK automates boilerplate configuration.
5. What is Zustand or MobX? How do they differ from Redux?
   - Lightweight, hook-based stores without typical Redux boilerplate constraints.

## Advanced

6. What is Redux Middleware? Explain Redux Saga and how it works.
   - Sagas run middleware handlers using generators.
7. Difference between Redux Toolkit, Context API, and TanStack Query (React Query).
   - RTK manages local structures. Context shares global static values. TanStack manages remote server caches.
8. How would you design state management for large applications?
   - Hybrid state: RTK for client configs, TanStack Query for server states, and local useState for components.
9. Explain Caching and Cache Invalidation strategies in state management.
    - Setup stale-while-revalidate policies with query keys to refresh caches automatically.

---

# Routing

## Beginner

1. Explain React Router fundamentals, dynamic routes, nested routes, and route parameters.
   - Basic link targets routing using Route lists.

## Intermediate

2. How do you implement protected routes (auth guards) in React?
   - Wrapper components evaluating session tokens, redirecting unauthorized users.
3. How do you implement lazy-loaded routes?
   - Wrap dynamic component lazy imports inside Suspense.

---

# Performance Optimization

## Intermediate

1. How would you optimize a React application? What is your general approach?
   - Analyze renders using Profiler, optimize bundle structures, lazy load components, and reduce redundant context updates.
2. How do you prevent unnecessary re-renders in functional components? What causes them?
   - Prevent using React.memo. Re-renders are caused by mutating states, props, or parents updating.
3. Explain `React.memo`. How does it work, and when can it actually hurt performance?
   - Memoizes component render results. If props change frequently, shallow comparison overhead slows performance.
4. What is the difference between `React.memo`, `useMemo`, and `useCallback`?
   - React.memo for components. useMemo for expensive returns. useCallback for function references.
5. What is the difference between a Pure Component and `React.memo`?
   - Pure Component is class-based. React.memo is functional. Both shallow-compare inputs.
6. How do you implement lazy loading, and what impact does it have on performance? How do you create a lazy-loaded component?
   - Defer module fetches until render cycles require them, improving initial loading speeds.
7. Explain lazy loading using `React.lazy` and `Suspense`.
   - Wrap dynamic lazy imports in React.lazy, providing fallback loaders inside Suspense.
8. What is code splitting? What is tree shaking? How do you optimize bundle size?
   - Split chunks. Tree shaking removes dead exports from compilation bundles.
9. What is debouncing and throttling? Where have you used them in production?
   - Debounce waits for typing quiet times. Throttle restricts action intervals.
10. Debouncing vs throttling — which one would you use for a live search box?
    - Use debouncing to wait for typing to settle before triggering server requests.
11. How do you perform debouncing in React?
    - Wrap change states inside callback triggers.
12. Explain optimistic UI updates.
    - Update state assuming database success, rolling changes back on failure.

## Advanced

13. How would you optimize rendering for thousands of rows in a table or grid (e.g., render a list of 10,000 items)?
    - Use viewport virtualization (e.g., react-window) to render visible content only.
14. Explain virtualization (e.g., `react-window` or `react-virtualized`) vs pagination.
    - Virtualization preserves scrolling by dynamically rendering nodes. Pagination splits items into separate pages.
15. How do you implement infinite scrolling efficiently in React?
    - Attach an IntersectionObserver detector on viewport end blocks.
16. Explain hydration mismatch and why it happens in SSR.
    - Mismatches between pre-rendered HTML from the server and reconstructed Virtual DOM structures on the client.
17. How do you optimize network performance, rendering performance, and JavaScript execution in React?
    - Pre-fetch assets, minimize bundle size, run complex math inside useMemo or web workers.

---

# React Rendering

## Intermediate

1. Explain how React's rendering process works from state update to UI update.
   - Render phase constructs Virtual DOM. Commit phase updates real DOM nodes.
2. What is the difference between the Render Phase and Commit Phase?
   - Render calculates change diffs (non-blocking). Commit paints elements (blocking).
3. How does React batching improve rendering? What is batching?
   - Groups state modifications to trigger a single combined paint cycle.
4. How do you force a component to re-render without using `useState`?
   - Use dummy updates in useReducer.
5. What causes a React component to re-render?
   - Updates to state, props, parents, or context parameters.

---

# React Patterns

## Beginner

1. What is a Pure Component in React?
   - A class component implementing shallow checks on updates.

## Intermediate

2. Explain Higher-Order Components (HOCs), Render Props, and Hooks. Why are Hooks preferred today?
   - Hooks decouple business logic from rendering hierarchies without introducing deep nesting.
3. Explain the Compound Components pattern.
   - Sharing parent states implicitly among children via React Context API (e.g., Select & Option).

---

# Error Handling

## Intermediate

1. Explain Error Boundaries in React. How do you create and use them?
   - Classes implementing `getDerivedStateFromError` to catch errors and display fallback components.

---

# API Calls

## Beginner

1. How do you fetch data from an API and handle loading and error states?
   - Use fetch or axios inside a useEffect block, managing loading states.
2. Explain Fetch API vs Axios in React applications.
   - Fetch is built-in. Axios parses JSON automatically, supports request interceptors, and handles timeout configs out of the box.

## Intermediate

3. How do you cancel ongoing API requests in React (e.g., using `AbortController`)?
   - Code:
     ```javascript
     const controller = new AbortController();
     fetch(url, { signal: controller.signal });
     // To cancel:
     controller.abort();
     ```

## Advanced

4. How would you handle API caching, retries, and background synchronization in a frontend application?
   - Query remote data using TanStack Query to manage caches, retries, and offline background synchronizations.

---

# React Architecture

## Intermediate

1. Explain component design, reuse, and component-driven development principles.
   - Deconstruct complex layouts into standalone, atomic, reusable components.

## Advanced

2. Explain React Architecture. How would you structure a scalable React project for multiple teams?
   - Organize project structure into feature-based modules, maintaining shared elements in an internal UI package library.
3. Server Components vs Client Components. What are React Server Components?
   - Server Components compile HTML layouts on server nodes, minimizing client bundles.

## Expert

4. What is Micro-Frontend Architecture? How do code splitting, lazy loading, and Module Federation fit in?
5. Design a frontend architecture for multiple independent teams.

---

# React Security

## Advanced

1. How do you secure frontend applications using JWT authentication and refresh tokens?
   - Store short-lived tokens in memory, managing refresh loops via secure HttpOnly cookie calls.
2. How do refresh tokens work internally, and how do you securely store tokens in frontend apps?
   - Refresh tokens fetch new access tokens when they expire. Store them strictly inside secure cookies.
3. Where would you store a JWT token in a web application?
   - Store access tokens in memory and refresh tokens in secure HttpOnly cookies.
4. Explain authentication vs authorization and how to implement Role-Based Access Control (RBAC) in a React application.
   - Authentication verifies user identity. Authorization checks permission scopes. Implement RBAC using wrapper routes.
5. What are XSS (Cross-Site Scripting) attacks, and how can they be prevented in React?
   - Script injections on client sites. Prevented by escaping inputs, avoiding raw innerHTML, and using Content Security Policies.
6. How do you safeguard a React application (XSS, auth, route protection)?
7. Explain common frontend security vulnerabilities that developers should know.

---

# React Testing

## Beginner

1. Do you write unit test cases? Where do you write unit test cases in a React application?
   - Yes, test cases reside adjacent to features (e.g. `__tests__` directories or `.test.js` files).

## Intermediate

2. How do you write unit tests, integration tests, and end-to-end (E2E) tests?
   - Unit tests test singular functions. Integration tests test modules. E2E tests target complete flows.
3. How do you perform unit testing with Jest and React Testing Library?
   - Write tests checking DOM content assertions after user actions.

---

# React 18 Features

## Intermediate

1. What is concurrent rendering in React 18?
   - The engine splits rendering updates to render UI smoothly without blocking interactions.
2. Explain Strict Mode in React 18 and why it renders twice in development.
   - Verifies that state mutations perform cleanly under mounting sequences.

## Advanced

3. How does concurrent rendering affect Hooks?
   - It requires hooks to avoid mutating states during layout phases.

---

# React Native Fundamentals

## Beginner

1. What is React Native?
   - Framework to build native mobile apps using JavaScript.
2. What is the difference between React and React Native?
   - React targets browsers. React Native builds to Android and iOS views.
3. How do you manage state in React Native?
   - State managed similarly using standard React structures.
4. Explain React Navigation in mobile apps.
   - Provides screen navigation using Stack and Tab options.
5. Fetch API and Axios in React Native.
   - Clients to resolve REST queries.
6. Expo vs React Native CLI: When and why would you choose one over the other?
   - Managed vs bare native project controls.

---

# Advanced React Native

## Intermediate

1. Explain the React Native architecture.
   - Multi-threaded architecture utilizing bridge messaging.
2. Explain the React Native New Architecture (Fabric, TurboModules, and JSI).
   - JSI allows direct invocation of native C++ code, omitting bridge overhead.
3. What is the difference between Hermes and JavaScriptCore? Why is Hermes preferred?
   - Hermes pre-compiles bytecode, reducing initialization lag.
4. How do you create Native Modules or Native UI Components when React Native doesn't provide the required functionality?
   - Expose platform Java/Swift blocks via native interfaces.
5. How do you handle offline support, local storage, and data synchronization in mobile apps?
   - Cache drafts using SQLite/MMKV, synchronizing when connection returns.

## Advanced

6. How do you publish apps to the Google Play Store and Apple App Store? Explain the release process.
   - Package bundles, sign files, and upload via App Console.
7. How do you write unit tests, integration tests, and end-to-end (E2E) tests in React Native?
   - Jest, Testing Library, and Detox.

---

# React Native Performance Optimization

## Intermediate

1. How do you improve app startup time in React Native?
   - Enable Hermes engine, minimize bundle load packages, and defer modules initialization.
2. Explain FlatList optimization techniques.
   - Limit items list renders, provide static items height offsets.
3. How do you debug React Native applications and resolve crashes?
   - Profile via Flipper, React DevTools, and examine Android logcat/iOS crash reports.
4. Explain performance profiling.

---

# CSS

## Beginner

1. What is CSS and what is its purpose?
   - Style sheet language layout views formatting.
2. Which libraries/frameworks have you used for writing CSS?
   - SASS, Tailwind, Styled Components.
3. What's the default value of position in CSS?
   - static.
4. Difference between absolute, relative, fixed, static, and sticky positioning in CSS.
   - Relative offsets from normal block. Absolute targets nearest ancestor. Fixed binds to screen viewport. Sticky behaves dynamically relative/fixed.
5. How does Flexbox differ from Grid? When would you use one over the other?
   - Flexbox formats one-dimensional components. Grid handles two-dimensional structures.
6. How does the CSS box model impact layouts, and what role does box-sizing play?
   - Content, padding, border, margins. border-box keeps dimensions strict.
7. What is CSS Specificity? How does the browser calculate style priority?
   - Weight evaluation priority.
8. Difference between display: none and visibility: hidden.
   - none removes element flow. hidden retains formatting space.
9. Difference between pseudo-classes and pseudo-elements.
   - States vs structural subset elements.
10. How do you make a website responsive across different devices?
    - Media queries, responsive grid parameters.
11. Ways to center elements horizontally and vertically.
    - Flexbox configurations.
12. What is the CSS opacity range?
    - 0 to 1.

---

# HTML

## Beginner

1. What is the difference between block and inline HTML elements?
   - Block starts new lines. Inline stays on current row.
2. What's the difference between `<section>`, `<article>`, and `<aside>` semantic elements?
   - Section groups thematic content. Article declares standalone pages. Aside isolates minor content.
3. Which HTML5 APIs have you worked with?
   - Drag/drop, LocalStorage.
4. What does HTTP stand for?
   - HyperText Transfer Protocol.

---

# TypeScript

## Intermediate

1. What is TypeScript and how does it differ from JavaScript?
   - Superset adding compiler typing interfaces.
2. Difference between type and interface in TypeScript. When would you choose one over the other?
   - Interfaces compile multiple structures. Types model unions.
3. Explain TypeScript interfaces, types, enums, and when to use each.
4. Explain TypeScript utility types like Partial, Pick, Omit, Exclude, and Record.
5. How does TypeScript's Generics feature help in large-scale applications?
6. What are mapped types, keyof, keyof typeof, and conditional types in TypeScript?

---

# Coding Round Questions

## Arrays

1. Remove duplicates: Given the array [4, 4, 5, 5, 6, 6, 2, 2, 3, 1], remove duplicate elements and print the output sorted.
   - Code:
     ```javascript
     const arr = [4, 4, 5, 5, 6, 6, 2, 2, 3, 1];
     const sortedUnique = [...new Set(arr)].sort((a, b) => a - b);
     console.log(sortedUnique); // [1, 2, 3, 4, 5, 6]
     ```
2. Find missing numbers: Given an array [1, 2, 3, 5, 7], find the missing numbers (4, 6) using code.
   - Code:
     ```javascript
     const arr = [1, 2, 3, 5, 7];
     const missing = [];
     for(let i = arr[0]; i <= arr[arr.length - 1]; i++) {
         if(!arr.includes(i)) missing.push(i);
     }
     console.log(missing); // [4, 6]
     ```
3. Two Sum: Find two numbers in an array that add up to a specific target.
   - Code:
     ```javascript
     function twoSum(nums, target) {
         const map = new Map();
         for(let i = 0; i < nums.length; i++) {
             const diff = target - nums[i];
             if(map.has(diff)) return [map.get(diff), i];
             map.set(nums[i], i);
         }
         return [];
     }
     ```
4. Find Second Largest Number in an array.
   - Code:
     ```javascript
     function secondLargest(arr) {
         let first = -Infinity, second = -Infinity;
         for(let num of arr) {
             if(num > first) {
                 second = first;
                 first = num;
             } else if(num > second && num !== first) {
                 second = num;
             }
         }
         return second;
     }
     ```
5. Move All Zeros to the End.
   - Code:
     ```javascript
     function moveZeroes(arr) {
         let insertPos = 0;
         for(let i = 0; i < arr.length; i++) {
             if(arr[i] !== 0) {
                 arr[insertPos++] = arr[i];
             }
         }
         while(insertPos < arr.length) {
             arr[insertPos++] = 0;
         }
         return arr;
     }
     ```
6. Inserting an element after the 3rd position in an array.
   - Code:
     ```javascript
     function insertAfterThird(arr, element) {
         arr.splice(3, 0, element);
         return arr;
     }
     ```
7. Removing the first element from an array.
   - Code:
     ```javascript
     function removeFirst(arr) {
         arr.shift();
         return arr;
     }
     ```

## Strings

8. Word Counter: Given the string const str = "My name Sudha";, find the number of words.
   - Code:
     ```javascript
     const str = "My name Sudha";
     const count = str.trim().split(/\s+/).length;
     console.log(count); // 3
     ```
9. Reverse a String without using built-in methods.
   - Code:
     ```javascript
     function reverseStr(str) {
         let rev = "";
         for(let i = str.length - 1; i >= 0; i--) {
             rev += str[i];
         }
         return rev;
     }
     ```
10. Find the First Non-Repeating Character in a string.
    - Code:
      ```javascript
      function firstNonRepeated(str) {
          const charCount = {};
          for(let char of str) charCount[char] = (charCount[char] || 0) + 1;
          for(let char of str) {
              if(charCount[char] === 1) return char;
          }
          return null;
      }
      ```
11. Count the Occurrences of Each Character in a string ignoring spaces.
    - Code:
      ```javascript
      function countOccurrences(str) {
          const count = {};
          for(let char of str) {
              if(char === " ") continue;
              count[char] = (count[char] || 0) + 1;
          }
          return count;
      }
      ```

## Objects

12. Join/Merge the objects from a given list of objects dynamically.
    - Code:
      ```javascript
      function mergeObjects(objList) {
          return objList.reduce((acc, obj) => ({ ...acc, ...obj }), {});
      }
      ```
13. Write code to create an object in different ways.
    - Literal: `const o = {}`
    - Constructor: `const o = new Object()`
    - create(): `const o = Object.create(proto)`

## Recursion and Algorithms

14. Factorial Using Recursion.
    - Code:
      ```javascript
      function factorial(n) {
          if (n <= 1) return 1;
          return n * factorial(n - 1);
      }
      ```
15. Binary Search.
    - Code:
      ```javascript
      function binarySearch(arr, target) {
          let left = 0, right = arr.length - 1;
          while(left <= right) {
              let mid = Math.floor((left + right) / 2);
              if(arr[mid] === target) return mid;
              if(arr[mid] < target) left = mid + 1;
              else right = mid - 1;
          }
          return -1;
      }
      ```

---

# Machine Coding / Practical Questions

## Practical Components

1. Auto-increment/decrement counter in React (+ and - buttons, prevent going below 0).
   - Code:
     ```jsx
     import React, { useState } from 'react';
     export default function Counter() {
         const [count, setCount] = useState(0);
         return (
             <div>
                 <button onClick={() => setCount(c => Math.max(0, c - 1))}>-</button>
                 <span>{count}</span>
                 <button onClick={() => setCount(c => c + 1)}>+</button>
             </div>
         );
     }
     ```
2. Progress Bar component in React.
   - Code:
     ```jsx
     export default function ProgressBar({ progress }) {
         return (
             <div style={{ width: '100%', background: '#eee', borderRadius: 4 }}>
                 <div style={{ width: `${progress}%`, height: 8, background: '#3b82f6', borderRadius: 4 }} />
             </div>
         );
     }
     ```

## Practical Utilities

3. Implement Debounce from scratch.
   - Code:
     ```javascript
     function debounce(func, delay) {
         let timer;
         return function(...args) {
             clearTimeout(timer);
             timer = setTimeout(() => func.apply(this, args), delay);
         };
     }
     ```
4. Implement Throttle from scratch.
   - Code:
     ```javascript
     function throttle(func, limit) {
         let inThrottle;
         return function(...args) {
             if(!inThrottle) {
                 func.apply(this, args);
                 inThrottle = true;
                 setTimeout(() => inThrottle = false, limit);
             }
         };
     }
     ```
5. Polyfill for Array.prototype.map().
   - Code:
     ```javascript
     Array.prototype.myMap = function(callback) {
         const result = [];
         for(let i = 0; i < this.length; i++) {
             result.push(callback(this[i], i, this));
         }
         return result;
     };
     ```
6. Polyfill for Promise.all().
   - Code:
     ```javascript
     Promise.myAll = function(promises) {
         return new Promise((resolve, reject) => {
             const results = [];
             let completed = 0;
             promises.forEach((p, index) => {
                 Promise.resolve(p).then(val => {
                     results[index] = val;
                     completed++;
                     if(completed === promises.length) resolve(results);
                 }).catch(reject);
             });
         });
     };
     ```
7. Create a custom hook useFetch to fetch data.
   - Code:
     ```javascript
     import { useState, useEffect } from 'react';
     export function useFetch(url) {
         const [data, setData] = useState(null);
         const [loading, setLoading] = useState(true);
         useEffect(() => {
             fetch(url)
                 .then(res => res.json())
                 .then(data => { setData(data); setLoading(false); });
         }, [url]);
         return { data, loading };
     }
     ```

---

# React Interview Questions

## Intermediate

1. Explain React Architecture.
   - React architecture is structured around components, unidirectional data flow, reconciliation, rendering, and lifecycle states.
2. Can React Hooks completely replace Redux? When should you still use a state management library?
   - No, Hooks (Context API) are not built for high-frequency updates and lack structural middleware or devtool features.
3. If useEffect and useMemo have the same dependency array, which executes first and why?
   - useMemo runs first during rendering. useEffect runs asynchronously after layout and paint phases are complete.

---

# React Native Interview Questions

## Intermediate

1. Tell me about your React Native experience and project history.
   - Be prepared to discuss cross-platform deployments, native module integrations, JSI bridges, and mmkv/sqlite local cache setups.
2. What challenges did you face, and how did you resolve production crashes?
   - Explain using bug reporting mechanisms (Sentry, Crashlytics) and debugging native core threads via Xcode/Android Studio.

---

# JavaScript Interview Questions

## Intermediate

1. Explain closures with a real-world analogy.
   - Analogous to a backpack that a hiking guide carries. The guide is the function, and the gear in the backpack is the lexical scope variables that travel with the function.
2. When would you actually use == over ===?
   - Rarely. Used only when you want to compare if a value is loosely null/undefined (e.g., `x == null` checks if x is null or undefined).

---

# CSS Interview Questions

## Intermediate

1. If you have a 2MB image, how would you efficiently display it across all responsive devices?
   - Compress the image, serve responsive sizes using srcset/picture elements, lazy load, and utilize a CDN.
2. If you were building a complete website like Amazon from scratch, would you use Flexbox or Grid? Why?
   - Both. Grid for page-level layouts (header, main container, footer) and Flexbox for one-dimensional components (navbar items, product cards).

---

# HR Interview Questions

## Beginner

1. Tell me about yourself.
   - Discuss your experience, your core tech stack, your focus on building maintainable structures, and your background resolving production issues.
2. Why should we hire you?
   - Highlight your ability to build production-ready mobile/web apps, optimize performance, and explain the architectural decisions you make.
3. Are you comfortable working with AngularJS?
   - Currently, I don't have hands-on experience with AngularJS. However, I have strong JavaScript fundamentals, and since both React and AngularJS are JavaScript-based frameworks, I am confident in my ability to learn AngularJS quickly and work with it effectively.

---

# Behavioral Questions

## Intermediate

1. Describe a situation where you disagreed with a teammate. How did you resolve it?
   - Focus on data-driven decisions and performance metrics rather than personal opinions, evaluating trade-offs calmly.
2. How do you estimate development tasks? How do you prioritize your work?
   - Break tasks down into smaller component-level items, estimate using complexity scales, and prioritize based on business requirements.

---

# Scenario-Based Questions

## Intermediate

1. Your React application is getting slow. Where do you look first?
   - Look at DevTools Profiler to identify slow renders, look at bundle sizes, and inspect network logs for duplicate requests.
2. A feature works perfectly in development but fails in production. How do you debug and resolve this?
   - Verify environment configurations, check API CORS headers, check for optimization-induced issues (e.g. minification naming bugs), and check error logs.
3. Let's have a look at a webpage. I need three API calls. Based on the responses, I populate the content on the page. I need to ensure that the page loads fast. I also need to ensure that if any API fails, I show an error message only in the corresponding block while the remaining sections continue to work. How would you implement this?
   - Trigger the three API calls concurrently using Promise.allSettled() or separate queries, and wrap each component block in its own local loading/error boundary.

---

# System Design (Frontend/Mobile)

## Enterprise Scale

1. How would you build a real-time dashboard displaying live data updates?
   - Use WebSockets for live bidirectional updates (or Polling if sockets aren't supported). Use local throttling/debouncing to batch updates before dispatching state changes.
2. Design a scalable notification system for a React application handling 1K of users up to 1M users.
   - Establish websocket servers with publish-subscribe message queues (Kafka, Redis) and handle client-side rendering virtualized viewport limits.
3. How would you build offline support for a social media app?
   - Use local MMKV stores or databases (WatermelonDB) to cache draft items. Establish sync workers to retry network mutations when connectivity resumes.

---

# Debugging Questions

## Intermediate

1. How do you monitor frontend applications in production?
   - Integrate Sentry, LogRocket, or Datadog to capture real-time performance alerts, error dumps, and user-interaction tracking.
2. What causes memory leaks in React apps? How do you detect and prevent them?
   - Caused by uncleared event listeners, setInterval timers, or references to clean DOM nodes in closures. Resolved by using useEffect cleanups.

---

# Common Interview Mistakes

## Intermediate

1. Explaining only what you built instead of why you built it that way.
   - Mid-level developers explain the code. Senior developers explain the structural design and trade-offs.
2. Memorizing hook definitions instead of explaining architecture decisions.
   - Interviewers want to understand your core system design thinking and debug strategies.

---

# Interview Tips

## Intermediate

1. Strong fundamentals still matter.
   - Framework libraries evolve, but core principles like scoping, performance bottlenecks, and design patterns remain key.
2. Focus on thinking clearly under pressure.
   - Take a moment to analyze trade-offs, write pseudocode, and clearly communicate your thoughts while solving problems.

---

# Miscellaneous Notes

## Intermediate

1. Senior interviews are rarely about React Native itself.
   - They evaluate how you debug under pressure, evaluate product trade-offs, and make sound architectural decisions.
