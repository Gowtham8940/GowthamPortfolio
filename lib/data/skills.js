export const skillCategories = [
  {
    id: "mobile",
    title: "Mobile Core",
    skills: [
      { name: "React Native CLI", level: 98, note: "Senior Architect, Fabric/TurboModules, Reanimated" },
      { name: "React Native (New Arch)", level: 95, note: "Fabric renderer, JSI, TurboModules" },
      { name: "Expo", level: 92, note: "Managed & Bare Workflows, Custom Dev Clients" },
      { name: "TypeScript", level: 95, note: "Strong typing, interfaces, strict configuration" },
      { name: "JavaScript", level: 98, note: "ES6+, Event loop, closure, performance tuning" }
    ]
  },
  {
    id: "native",
    title: "Native Development",
    skills: [
      { name: "Kotlin", level: 85, note: "Custom Android modules, ExoPlayer wrappers" },
      { name: "Swift", level: 82, note: "Custom iOS modules, AVFoundation, native buffers" },
      { name: "Native Modules", level: 90, note: "C++ JSI, TurboModules creation" },
      { name: "Hermes Engine", level: 92, note: "Bytecode compilation, GC configuration tweaks" },
      { name: "ExoPlayer / AVFoundation", level: 88, note: "Custom video player engine wrapping" }
    ]
  },
  {
    id: "state",
    title: "State & Storage",
    skills: [
      { name: "Redux Toolkit", level: 92, note: "Scalable global state, slices pattern" },
      { name: "Zustand", level: 95, note: "Lightweight state, transient state mappings" },
      { name: "TanStack Query", level: 94, note: "Caching, query synchronizations, offline status" },
      { name: "WatermelonDB / SQLite", level: 88, note: "Offline-first relational database setup" },
      { name: "MMKV / Keychain", level: 90, note: "Fast local key-value caches & secure storage" }
    ]
  },
  {
    id: "backend",
    title: "Backend & Systems",
    skills: [
      { name: "Firebase", level: 95, note: "Auth, Firestore, Messaging, Crashlytics" },
      { name: "Socket.IO / MQTT", level: 90, note: "Real-time bi-directional messaging" },
      { name: "AWS S3 / Amplify / Cognito", level: 82, note: "Cloud asset pipelines, user credentials" },
      { name: "RabbitMQ / REST APIs", level: 85, note: "Message queuing, REST endpoints routing" }
    ]
  },
  {
    id: "security-ai",
    title: "Security & AI / Payments",
    skills: [
      { name: "AES Encryption", level: 88, note: "AES-128 media stream decrypting" },
      { name: "Razorpay", level: 90, note: "Secure payment workflows & checks" },
      { name: "LangChain / OpenAI API", level: 85, note: "AI doubt-solving features routing" },
      { name: "MCP Architecture", level: 80, note: "Custom model context protocol tools" }
    ]
  },
  {
    id: "release-monitoring",
    title: "Testing & DevOps",
    skills: [
      { name: "CodePush", level: 92, note: "Over-the-air hotfix deployments" },
      { name: "Jest", level: 85, note: "Unit testing of core layouts and store slices" },
      { name: "Flipper / Debugging", level: 90, note: "Profile audits, memory leak diagnostics" }
    ]
  }
];

export const allSkillsList = skillCategories.flatMap(c => c.skills.map(s => s.name));
