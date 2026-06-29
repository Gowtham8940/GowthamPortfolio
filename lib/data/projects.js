export const projects = [
  {
    id: "maazter",
    title: "MAAZTER",
    subtitle: "LMS Platform (Tamil Nadu Government Project)",
    description: "A large-scale LMS platform serving 500K+ students with real-time learning workflows and live examination systems handling 5,000+ concurrent users.",
    details: "MAAZTER is a samacheer-aligned LMS platform built for Tamil Nadu samacheer education. It features curriculum-aligned high-definition video streaming, offline course downloads, AI-powered doubt solving, live exams with instantaneous feedback, and analytics to track performance. Developed an AI-assisted live chat system integrated with Firebase and push notification workflows, reducing average student query response time by 40%.",
    role: "Lead Mobile Developer",
    company: "Resbee Info Technologies Pvt Ltd",
    category: "EdTech & Government",
    techStack: ["React Native", "Firebase", "Redux Toolkit", "Socket.IO", "SCORM", "Vimeo API", "Jest"],
    features: [
      "Real-time exam systems with optimized synchronization.",
      "Secure learning modules supporting 20+ educational content formats including SCORM, Vimeo, and PDF.",
      "AI-assisted live chat system with Firebase context parsing.",
      "Advanced push notifications and background state sync.",
      "Jest unit tests for critical exam and data workflows."
    ],
    challenges: [
      "Optimizing socket connection persistence under 5,000+ concurrent exam sessions. Solved by writing optimized message queues, throttle intervals, and local recovery schemas."
    ],
    metrics: {
      downloads: "500K+",
      rating: "4.6",
      users: "500K+ Active"
    },
    links: {
      playstore: "https://play.google.com/store",
      appstore: "",
      github: "https://github.com/Gowtham8940"
    },
    screenshot: "/images/projects/maazter.png",
    video: ""
  },
  {
    id: "e-khool",
    title: "e-Khool LMS",
    subtitle: "Offline-First LMS (Assam Government Project)",
    description: "A fully offline-first LMS for Assam Government schools in low-connectivity environments, enabling 50K+ students to access content without internet.",
    details: "Designed and developed sync schemas achieving 99% data integrity on reconnect. Developed reusable native media player packages using Swift and Kotlin supporting encrypted MP4, MP3, and M3U8 playback; published to NPM for reuse across enterprise LMS applications. Implemented AES encryption/decryption and secure local asset storage using React Native Keychain and native security modules, passing government security audit.",
    role: "React Native Developer",
    company: "Resbee Info Technologies Pvt Ltd",
    category: "EdTech & Government",
    techStack: ["React Native (New Architecture)", "TanStack Query", "WatermelonDB", "Redux Toolkit", "Swift", "Kotlin", "Keychain"],
    features: [
      "Relational offline database setup using WatermelonDB.",
      "Offline sync engine with TanStack Query and NetInfo hooks.",
      "Custom Kotlin & Swift media player wrapping encrypted buffers.",
      "AES-128 encryption passed strict government security audits.",
      "New Architecture migration (Fabric & TurboModules) improving frame rate to 60 FPS."
    ],
    challenges: [
      "Media performance drops during decryption on the fly. Solved by tuning memory allocations and piping streams via custom Swift/Kotlin media players."
    ],
    metrics: {
      downloads: "50K+",
      rating: "4.7",
      users: "50K+ Active"
    },
    links: {
      playstore: "https://play.google.com/store",
      appstore: "",
      github: "https://github.com/Gowtham8940"
    },
    screenshot: "/images/projects/e-khool.png",
    video: ""
  },
  {
    id: "aaeb-tvet",
    title: "AAEB eSchool & TVET eSchool",
    subtitle: "Ethiopian Government LMS Portal",
    description: "Multi-role LMS applications supporting 1.2M+ users with real-time learning workflows and scalable content delivery across 10+ languages.",
    details: "Led development of Ethiopian government school systems. Implemented multilingual support using i18n internationalization, RTL layout support, and accessibility (a11y) standards for diverse regional users. Built live exam systems, document viewing modules, and real-time notifications optimized for high-volume concurrent usage (10K+ simultaneous sessions). Integrated Firebase and AWS (S3, Amplify, Cognito) for scalable content distribution, achieving sub-200ms notification delivery.",
    role: "Mobile Engineer",
    company: "Resbee Info Technologies Pvt Ltd",
    category: "EdTech & Government",
    techStack: ["React Native", "Firebase", "AWS S3", "AWS Amplify", "AWS Cognito", "Redux Toolkit", "i18n", "RTL Layouts", "Accessibility (a11y)"],
    features: [
      "True RTL layouts for Middle East and East African languages.",
      "WCAG Accessibility features (a11y screen readers).",
      "Live exam modules with 10K+ concurrent testing capacity.",
      "AWS Amplify & S3 pipeline for CDN asset delivery.",
      "AWS Cognito authentication handling."
    ],
    challenges: [
      "Handling dynamic layout switching to RTL on locale select without screen flicker. Overcome by rewriting standard animation coordinates to dynamic directional parameters using Reanimated's layout animations."
    ],
    metrics: {
      downloads: "1.2M+",
      rating: "4.6",
      users: "1.2M+ Active"
    },
    links: {
      playstore: "https://play.google.com/store",
      appstore: "",
      github: "https://github.com/Gowtham8940"
    },
    screenshot: "/images/projects/aaeb.png",
    video: ""
  },
  {
    id: "suya-mobiles",
    title: "Suya Mobiles",
    subtitle: "Multi-Role E-commerce Platform",
    description: "Developed User, Admin, and Sub-Admin applications within a single React Native codebase using role-based architecture, reducing codebase duplication by 60%.",
    details: "An on-demand mobile repair service and e-commerce application. Integrated Firebase notifications, Razorpay payments, Google Maps SDK, and deep linking for location-based order workflows. Reduced APK size from 60MB to 20MB (67% reduction) through image optimization, resource management, and API-driven dynamic loading. Implemented secure credential storage using React Native Keychain and optimized rendering for low-end Android devices, improving app rating from 3.2 to 4.4 on Play Store.",
    role: "Lead Mobile Developer",
    company: "Resbee Info Technologies Pvt Ltd",
    category: "E-commerce & Service",
    techStack: ["React Native", "Firebase", "Razorpay", "Google Maps SDK", "Redux Toolkit", "MMKV", "Keychain"],
    features: [
      "Single-codebase multi-tenant role-based layout.",
      "Razorpay checkout API with transaction confirmation routing.",
      "Google Maps picking interface for device pickup routes.",
      "Bundle size optimization reducing size to 20MB.",
      "React Native Keychain token storage."
    ],
    challenges: [
      "Initial slow list rendering on low-end Android phones. Resolved by implementing FlatList memoization and lazy component loading."
    ],
    metrics: {
      downloads: "5K+",
      rating: "4.4",
      reduction: "67% APK reduction"
    },
    links: {
      playstore: "https://play.google.com/store",
      appstore: "",
      github: "https://github.com/Gowtham8940"
    },
    screenshot: "/images/projects/suya-mobiles.png",
    video: ""
  },
  {
    id: "iot-automation",
    title: "IoT Automation Apps",
    subtitle: "Smart Bell & Water Controller",
    description: "Developed mobile applications for ESP32-based automation systems, reducing manual intervention by 80% through scheduled smart bell and water monitoring workflows.",
    details: "Built real-time monitoring dashboards using Socket.IO and optimized local caching, achieving sub-100ms sensor data refresh rates. Implemented live sensor alerts and stable device communication for 24/7 uninterrupted production deployment.",
    role: "Mobile Developer",
    company: "Radaz Technologies Pvt Ltd",
    category: "IoT Automation",
    techStack: ["React Native", "ESP32", "MQTT", "Socket.IO", "MMKV"],
    features: [
      "Real-time sensor graphs updating at sub-100ms intervals.",
      "MQTT messaging broker connections directly from React Native.",
      "Background alerts and notification dispatch on sensor anomalies.",
      "Local offline caching of metrics using MMKV."
    ],
    challenges: [
      "Battery drain issues due to persistent background sockets. Overcome by implementing dynamic reconnection intervals and using local system alarms."
    ],
    metrics: {
      downloads: "Active Devices",
      rating: "4.8",
      reduction: "80% less manual steps"
    },
    links: {
      playstore: "",
      appstore: "",
      github: "https://github.com/Gowtham8940"
    },
    screenshot: "/images/projects/smart-bell.png",
    video: ""
  }
];
