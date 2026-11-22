// Single source of truth for the home page. Visible copy is { en, ta }; read it
// with `tx()` from useLocale(). Numbers follow the Nov 2026 résumé and the live
// store listings; the store app list lives in certifications.js (appCarouselData).

export const profile = {
  name: "Gowtham J",
  email: "gowthamjaganthan@gmail.com",
  resume: "/resume/resume.pdf",
  photo: "/images/profile.jpg",
  links: {
    github: "https://github.com/Gowtham8940",
    linkedin: "https://linkedin.com/in/gowthamjagan",
    youtube: "https://www.youtube.com/@learn_with_gowtham",
    medium: "https://medium.com/@gowthamjaganthan",
    playstore: "https://play.google.com/store/apps/dev?id=8170755285088488138",
    aira: "https://ekhool.com/aira",
  },
};

export const facts = [
  { value: "4+", label: { en: "years shipping React and React Native", ta: "ஆண்டுகள் React, React Native அனுபவம்" } },
  { value: "800K+", label: { en: "students on LMS apps I've built", ta: "நான் உருவாக்கிய LMS ஆப்களில் மாணவர்கள்" } },
  { value: "9", label: { en: "apps live on Google Play and the App Store", ta: "Google Play, App Store-இல் நேரலை ஆப்கள்" } },
  { value: "12", label: { en: "AI agents in Aira for e-Khool LMS", ta: "e-Khool LMS-க்கான Aira AI ஏஜென்ட்கள்" } },
];

// Full-page captures at iPhone width (390 CSS px). Shown at full width inside
// the device, so nothing is cropped; the screen scrolls to show the rest.
export const deviceScreens = [
  {
    id: "aira",
    src: "/images/work/aira-mobile-full.jpg",
    title: "Aira",
    kind: { en: "e-Khool's AI agent platform", ta: "e-Khool-இன் AI ஏஜென்ட் தளம்" },
    href: "https://ekhool.com/aira",
  },
  {
    id: "inviteforyou",
    src: "/images/work/inviteforyou-mobile-full.jpg",
    title: "InviteForYou",
    kind: { en: "A paid web product", ta: "கட்டண வெப் தயாரிப்பு" },
    href: "https://inviteforyou.in",
  },
  {
    id: "sri-hari",
    src: "/images/work/sri-hari-mobile-full.jpg",
    title: "Sri Hari Agencies",
    kind: { en: "A site for a local shop", ta: "உள்ளூர் கடைக்கான இணையதளம்" },
    href: "https://sri-hari-agencies.vercel.app",
  },
  {
    id: "jewel-billing",
    src: "/images/work/jewel-billing-mobile-full.jpg",
    title: "Jewel Billing",
    kind: { en: "Billing for jewellery shops", ta: "நகைக் கடைகளுக்கான பில்லிங்" },
    href: "https://billing-system-pi-tan.vercel.app",
  },
];

// Aira: the AI section. Platform facts come from ekhool.com/aira; "mine" is
// the part Gowtham works on (résumé + the fastapi_aira codebase).
export const aira = {
  mine: [
    {
      title: { en: "Multi-agent orchestration", ta: "பல ஏஜென்ட் ஒருங்கிணைப்பு" },
      body: {
        en: "A LangGraph state machine on FastAPI: an intent classifier routes each request to a fast path, a chat agent, a plan–act–critique research loop or the course agent.",
        ta: "FastAPI-யில் LangGraph: நோக்கம் கண்டறியும் ஏஜென்ட் ஒவ்வொரு கோரிக்கையையும் வேகமான வழி, சாட் ஏஜென்ட், திட்டம்–செயல்–விமர்சனம் ஆய்வு வளையம் அல்லது கோர்ஸ் ஏஜென்டுக்கு அனுப்புகிறது.",
      },
    },
    {
      title: { en: "Course creation agent", ta: "கோர்ஸ் உருவாக்கும் ஏஜென்ட்" },
      body: {
        en: "One prompt becomes a full course: nine sub-agents write the curriculum, lessons, PDFs, images, audio and video, each through a reusable skill and a 0–100 quality gate.",
        ta: "ஒரு ப்ராம்ட் முழு பாடநெறியாகிறது: ஒன்பது துணை ஏஜென்ட்கள் பாடத்திட்டம், பாடங்கள், PDF, படங்கள், ஆடியோ, வீடியோவை உருவாக்குகின்றன; ஒவ்வொன்றும் 0–100 தர சோதனையைக் கடக்க வேண்டும்.",
      },
    },
    {
      title: { en: "Any model, smaller bills", ta: "எந்த மாடலும், குறைந்த செலவு" },
      body: {
        en: "One interface over Claude, OpenAI, Gemini, NVIDIA NIM and Ollama. Simple requests take the fast path and state is trimmed between nodes to cut token use.",
        ta: "Claude, OpenAI, Gemini, NVIDIA NIM, Ollama — அனைத்துக்கும் ஒரே இடைமுகம். எளிய கோரிக்கைகள் வேகமான வழியில் செல்கின்றன; டோக்கன் செலவைக் குறைக்க நோடுகளுக்கு இடையே நிலை சுருக்கப்படுகிறது.",
      },
    },
    {
      title: { en: "Claude runs the LMS (MCP)", ta: "Claude LMS-ஐ இயக்குகிறது (MCP)" },
      body: {
        en: "MCP tools let Claude create courses, assessments and materials directly in a school's e-Khool account.",
        ta: "MCP கருவிகள் மூலம் Claude ஒரு பள்ளியின் e-Khool கணக்கில் நேரடியாக பாடநெறிகள், தேர்வுகள், பாடப்பொருட்களை உருவாக்குகிறது.",
      },
    },
    {
      title: { en: "Jobs that survive restarts", ta: "மறுதொடக்கத்திலும் நிற்காத வேலைகள்" },
      body: {
        en: "Agent state is checkpointed to MongoDB after every node, so a long course build resumes instead of starting over.",
        ta: "ஒவ்வொரு நோடுக்குப் பிறகும் ஏஜென்ட் நிலை MongoDB-யில் சேமிக்கப்படுவதால், நீண்ட கோர்ஸ் உருவாக்கம் மீண்டும் தொடக்கத்திலிருந்து அல்ல, நின்ற இடத்திலிருந்து தொடர்கிறது.",
      },
    },
    {
      title: { en: "40% faster answers for students", ta: "மாணவர்களுக்கு 40% வேகமான பதில்கள்" },
      body: {
        en: "AI features shipped with LangChain, MCP and the OpenAI API cut average student query resolution time by 40%. Plus a local text-to-speech service for lesson narration.",
        ta: "LangChain, MCP, OpenAI API கொண்டு வெளியிட்ட AI வசதிகள் மாணவர் கேள்விகளுக்கான சராசரி பதில் நேரத்தை 40% குறைத்தன. பாடங்களுக்கு உள்ளூர் text-to-speech சேவையும் உண்டு.",
      },
    },
  ],
  // The six steps of the Aira agent builder, in order.
  builder: [
    { title: { en: "Define the goal", ta: "இலக்கை வரையறு" }, body: { en: "What the agent should achieve and what done looks like.", ta: "ஏஜென்ட் எதைச் சாதிக்க வேண்டும், முடிந்தது என்றால் எப்படி இருக்கும்." } },
    { title: { en: "Add instructions", ta: "வழிமுறைகளைச் சேர்" }, body: { en: "How the task should be done and how to respond.", ta: "வேலையை எப்படிச் செய்ய வேண்டும், எப்படிப் பதில் அளிக்க வேண்டும்." } },
    { title: { en: "Connect knowledge", ta: "அறிவை இணை" }, body: { en: "Documents, policies and data the agent needs.", ta: "ஏஜென்டுக்குத் தேவையான ஆவணங்கள், கொள்கைகள், தரவு." } },
    { title: { en: "Add tools", ta: "கருவிகளைச் சேர்" }, body: { en: "Apps, APIs and databases it can use.", ta: "அது பயன்படுத்தக்கூடிய ஆப்கள், API-கள், டேட்டாபேஸ்கள்." } },
    { title: { en: "Set guardrails", ta: "வரம்புகளை அமை" }, body: { en: "What it may access, decide, change or run.", ta: "அது எதை அணுகலாம், முடிவு செய்யலாம், மாற்றலாம், இயக்கலாம்." } },
    { title: { en: "Deploy", ta: "வெளியிடு" }, body: { en: "Into the workflow, handling tasks on its own.", ta: "பணிப்பாய்வில் இணைந்து தானாகவே வேலைகளைக் கையாளும்." } },
  ],
  models: ["OpenAI", "Anthropic Claude", "Google Gemini", "Meta Llama", "Mistral", "DeepSeek", "Qwen", "Cohere", "xAI Grok", "Microsoft Phi", "Amazon Nova", "IBM Granite", "Kimi", "GLM"],
  lmsAgents: [
    { en: "Course creation", ta: "கோர்ஸ் உருவாக்கம்" },
    { en: "Tutor", ta: "ஆசிரியர் உதவி" },
    { en: "Assessment", ta: "மதிப்பீடு" },
    { en: "Learner support", ta: "மாணவர் உதவி" },
    { en: "Upskilling", ta: "திறன் மேம்பாடு" },
    { en: "Learning analytics", ta: "கற்றல் பகுப்பாய்வு" },
    { en: "Faculty assistant", ta: "ஆசிரியர் உதவியாளர்" },
    { en: "Administration", ta: "நிர்வாகம்" },
    { en: "Learning paths", ta: "கற்றல் பாதைகள்" },
    { en: "Training compliance", ta: "பயிற்சி இணக்கம்" },
    { en: "Knowledge", ta: "அறிவுத் தேடல்" },
    { en: "Reports & insights", ta: "அறிக்கைகள்" },
  ],
  lanes: [
    { id: "quick", label: { en: "Quick answer", ta: "விரைவான பதில்" }, nodes: [{ t: { en: "Fast formatter", ta: "விரைவு வடிவமைப்பு" }, w: 170 }] },
    { id: "chat", label: { en: "Conversation", ta: "உரையாடல்" }, nodes: [{ t: { en: "Chat agent", ta: "சாட் ஏஜென்ட்" }, w: 150 }] },
    {
      id: "research",
      label: { en: "Research", ta: "ஆய்வு" },
      loop: true,
      nodes: [
        { t: { en: "Planner", ta: "திட்டம்" }, w: 104 },
        { t: { en: "Tools", ta: "கருவிகள்" }, w: 92 },
        { t: { en: "Critic", ta: "விமர்சனம்" }, w: 92 },
        { t: { en: "Synthesis", ta: "தொகுப்பு" }, w: 116 },
      ],
    },
    {
      id: "course",
      label: { en: "Build a course", ta: "கோர்ஸ் உருவாக்கம்" },
      nodes: [
        { t: { en: "Course agent", ta: "கோர்ஸ் ஏஜென்ட்" }, w: 136 },
        { t: { en: "9 sub-agents, each scored 0–100", ta: "9 துணை ஏஜென்ட்கள், 0–100 மதிப்பீடு" }, w: 280, wide: true },
      ],
    },
  ],
};

// Selected work: sticky stacking cards. `phone` = full-page mobile capture
// that scrolls inside a phone; `browser` = desktop capture; `tiles` = store
// screenshots at their natural shape (never cropped).
export const selected = [
  {
    id: "pen-fight",
    kind: { en: "Game", ta: "கேம்" },
    title: "Pen Fight: Flick Desk Duel",
    line: { en: "The last-bench desk game as a 60 FPS mobile game.", ta: "கடைசி பெஞ்ச் விளையாட்டு, 60 FPS மொபைல் கேமாக." },
    body: {
      en: "Flick your pen, knock the other one off the desk. Physics runs in a Reanimated worklet on the UI thread and every frame is drawn with Skia, so it holds 60 FPS on low-end Android phones.",
      ta: "உங்கள் பேனாவைச் சுண்டி, மற்றதை மேசையிலிருந்து தள்ளுங்கள். இயற்பியல் UI thread-இல் Reanimated worklet-இல் இயங்குகிறது; ஒவ்வொரு ஃப்ரேமும் Skia-வில் வரையப்படுவதால் குறைந்த விலை Android போன்களிலும் 60 FPS.",
    },
    stat: { en: "1K+ installs on Google Play", ta: "Google Play-இல் 1K+ நிறுவல்கள்" },
    stack: ["React Native 0.86", "Skia", "Reanimated 4", "i18n"],
    tone: "#1f4d36",
    tiles: [
      { src: "/images/screens/com.penfight-1.webp", alt: "Pen Fight: flick, knock, win" },
      { src: "/images/screens/com.penfight-3.webp", alt: "Pen Fight: your school, your bench" },
      { src: "/images/screens/com.penfight-5.webp", alt: "Pen Fight: school memories" },
    ],
    links: [
      { label: { en: "Get it on Google Play", ta: "Google Play-இல் பெறுங்கள்" }, href: "https://play.google.com/store/apps/details?id=com.penfight" },
      {
        label: { en: "How I built it", ta: "எப்படி உருவாக்கினேன்" },
        href: "https://medium.com/@gowthamjaganthan/i-rebuilt-pen-fight-the-last-bench-classic-as-a-60-fps-mobile-game-with-react-native-skia-eab5efb2caaf",
      },
    ],
  },
  {
    id: "gov-lms",
    kind: { en: "Mobile apps", ta: "மொபைல் ஆப்கள்" },
    title: { en: "Learning apps for two governments", ta: "இரண்டு அரசுகளுக்கான கல்வி ஆப்கள்" },
    line: { en: "MAAZTER, e-Khool LMS and AAEB / TVET eSchool.", ta: "MAAZTER, e-Khool LMS, AAEB / TVET eSchool." },
    body: {
      en: "Offline-first learning for 800K+ students in Tamil Nadu, Assam and Ethiopia. WatermelonDB sync for one-bar villages, AES-encrypted downloads that passed a government audit, live exams for 5,000 students at once, and 10+ languages with RTL.",
      ta: "தமிழ்நாடு, அசாம், எத்தியோப்பியாவில் 8 லட்சம்+ மாணவர்களுக்கு இணையமில்லாமலும் இயங்கும் கல்வி. கிராமங்களுக்கு WatermelonDB ஒத்திசைவு, அரசு பாதுகாப்புத் தணிக்கையில் தேறிய AES குறியாக்கம், ஒரே நேரத்தில் 5,000 மாணவர்களுக்கு நேரலைத் தேர்வுகள், RTL உடன் 10+ மொழிகள்.",
    },
    stat: { en: "800K+ users", ta: "8 லட்சம்+ பயனர்கள்" },
    stack: ["React Native", "WatermelonDB", "Swift / Kotlin", "Socket.IO", "AWS"],
    tone: "#1d3d6b",
    tiles: [
      { src: "/images/screens/com.maazter-1.webp", alt: "MAAZTER learning dashboard" },
      { src: "/images/screens/com.ekhooltech-4.webp", alt: "e-Khool LMS course player" },
      { src: "/images/screens/com.aaeb-3.webp", alt: "AAEB eSchool lesson module" },
    ],
    links: [
      { label: "MAAZTER", href: "https://play.google.com/store/apps/details?id=com.maazter" },
      { label: "e-Khool LMS", href: "https://play.google.com/store/apps/details?id=com.ekhooltech" },
      { label: "AAEB eSchool", href: "https://play.google.com/store/apps/details?id=com.aaeb" },
    ],
  },
  {
    id: "inviteforyou",
    kind: { en: "Web product", ta: "வெப் தயாரிப்பு" },
    title: "InviteForYou",
    line: { en: "Wedding invitations that open like a celebration.", ta: "கொண்டாட்டம் போல் திறக்கும் திருமண அழைப்பிதழ்கள்." },
    body: {
      en: "Animated Tamil and English invitations shared as one link: 69 designs with real opening animations and 3D worlds, RSVPs, maps, music and a private guest list. Built with a partner and sold with Razorpay.",
      ta: "தமிழிலும் ஆங்கிலத்திலும் அனிமேஷன் அழைப்பிதழ்கள், ஒரே லிங்கில்: திறப்பு அனிமேஷன், 3D உலகங்களுடன் 69 டிசைன்கள், RSVP, வரைபடம், இசை, தனிப்பட்ட விருந்தினர் பட்டியல். ஒரு கூட்டாளியுடன் உருவாக்கி Razorpay மூலம் விற்கப்படுகிறது.",
    },
    stat: { en: "Live, paid plans", ta: "நேரலை, கட்டணத் திட்டங்கள்" },
    stack: ["Next.js", "Three.js", "Firebase", "next-intl", "Razorpay"],
    tone: "#3b1a3f",
    phone: { src: "/images/work/inviteforyou-mobile-full.jpg", alt: "InviteForYou, full mobile page" },
    browser: { src: "/images/work/inviteforyou.jpg", url: "inviteforyou.in", alt: "InviteForYou on desktop" },
    links: [{ label: { en: "Visit inviteforyou.in", ta: "inviteforyou.in பார்க்க" }, href: "https://inviteforyou.in" }],
  },
  {
    id: "sri-hari",
    kind: { en: "Website", ta: "இணையதளம்" },
    title: "Sri Hari Agencies",
    line: { en: "A building-materials shop, online.", ta: "கட்டுமானப் பொருள் கடை, இணையத்தில்." },
    body: {
      en: "Built from a reusable Astro template I clone per client. Everything the page shows lives in one Zod-checked config file, so a typo fails the build instead of the live site.",
      ta: "ஒவ்வொரு வாடிக்கையாளருக்கும் நகலெடுக்கும் Astro டெம்ப்ளேட்டில் உருவானது. பக்கத்தில் உள்ள அனைத்தும் Zod சரிபார்க்கும் ஒரே config கோப்பில் உள்ளதால், எழுத்துப் பிழை நேரலைத் தளத்தை அல்ல, build-ஐயே நிறுத்தும்.",
    },
    stat: { en: "5.0 on Google reviews", ta: "Google மதிப்புரைகளில் 5.0" },
    stack: ["Astro", "Tailwind v4", "Zod"],
    tone: "#2d3a2c",
    phone: { src: "/images/work/sri-hari-mobile-full.jpg", alt: "Sri Hari Agencies, full mobile page" },
    browser: { src: "/images/work/sri-hari-desktop-full.jpg", url: "sri-hari-agencies.vercel.app", alt: "Sri Hari Agencies on desktop", scroll: true },
    links: [{ label: { en: "Visit the site", ta: "தளத்தைப் பார்க்க" }, href: "https://sri-hari-agencies.vercel.app" }],
  },
  {
    id: "jewel-billing",
    kind: { en: "Web app", ta: "வெப் ஆப்" },
    title: "Jewel Billing",
    line: { en: "White-label billing for jewellery shops.", ta: "நகைக் கடைகளுக்கான ஒயிட்-லேபிள் பில்லிங்." },
    body: {
      en: "GST bills, slip photos, payment tracking and a live sales dashboard, branded per shop. Unit tests with Vitest and end-to-end tests with Playwright run on every pull request.",
      ta: "GST பில்கள், சீட்டுப் புகைப்படங்கள், பணம் கண்காணிப்பு, நேரலை விற்பனை டாஷ்போர்டு — ஒவ்வொரு கடைக்கும் அதன் பிராண்டில். ஒவ்வொரு pull request-க்கும் Vitest, Playwright சோதனைகள் இயங்குகின்றன.",
    },
    stat: { en: "Live demo", ta: "நேரலை டெமோ" },
    stack: ["React", "Vite", "Vitest", "Playwright", "GitHub Actions"],
    tone: "#5a1d24",
    phone: { src: "/images/work/jewel-billing-mobile-full.jpg", alt: "Jewel Billing on a phone" },
    browser: { src: "/images/work/jewel-billing.jpg", url: "billing-system-pi-tan.vercel.app", alt: "Jewel Billing on desktop" },
    links: [{ label: { en: "Open the demo", ta: "டெமோவைத் திற" }, href: "https://billing-system-pi-tan.vercel.app" }],
  },
];

// The index: every project, with a screenshot revealed on hover where one exists.
export const projectIndex = [
  { title: "Aira", kind: { en: "AI agent platform", ta: "AI ஏஜென்ட் தளம்" }, year: "2026", image: "/images/work/aira.jpg", href: "https://ekhool.com/aira" },
  { title: "Pen Fight", kind: { en: "Game", ta: "கேம்" }, year: "2026", image: "/images/screens/com.penfight-1.webp", href: "https://play.google.com/store/apps/details?id=com.penfight" },
  { title: "InviteForYou", kind: { en: "Web product", ta: "வெப் தயாரிப்பு" }, year: "2026", image: "/images/work/inviteforyou.jpg", href: "https://inviteforyou.in" },
  { title: "Jewel Billing", kind: { en: "Web app", ta: "வெப் ஆப்" }, year: "2026", image: "/images/work/jewel-billing.jpg", href: "https://billing-system-pi-tan.vercel.app" },
  { title: "Sri Hari Agencies", kind: { en: "Website", ta: "இணையதளம்" }, year: "2026", image: "/images/work/sri-hari.jpg", href: "https://sri-hari-agencies.vercel.app" },
  { title: "AI Audio Generator", kind: { en: "AI tool", ta: "AI கருவி" }, year: "2026", href: "https://github.com/Gowtham8940/Audio-generation", note: { en: "Lesson text to speech with local open-source TTS.", ta: "உள்ளூர் open-source TTS மூலம் பாடத்தை ஒலியாக மாற்றுகிறது." } },
  { title: "Voice to Text AI", kind: { en: "AI tool", ta: "AI கருவி" }, year: "2026", href: "https://github.com/Gowtham8940/Voice-text-AI", note: { en: "Multilingual speech-to-text with Whisper.", ta: "Whisper மூலம் பன்மொழி பேச்சு-எழுத்து மாற்றம்." } },
  { title: "MAAZTER", kind: { en: "Government LMS", ta: "அரசு LMS" }, year: "2024", image: "/images/screens/com.maazter-1.webp", href: "https://play.google.com/store/apps/details?id=com.maazter" },
  { title: "AAEB / TVET eSchool", kind: { en: "Government LMS", ta: "அரசு LMS" }, year: "2024", image: "/images/screens/com.aaeb-1.webp", href: "https://play.google.com/store/apps/details?id=com.aaeb" },
  { title: "e-Khool LMS", kind: { en: "Offline-first LMS", ta: "ஆஃப்லைன்-முதல் LMS" }, year: "2024", image: "/images/screens/com.ekhooltech-1.webp", href: "https://play.google.com/store/apps/details?id=com.ekhooltech" },
  { title: "Suya Mobiles", kind: { en: "Mobile app", ta: "மொபைல் ஆப்" }, year: "2024", note: { en: "APK 60 → 20 MB, rating 3.2 → 4.4.", ta: "APK 60 → 20 MB, மதிப்பீடு 3.2 → 4.4." } },
  { title: "IoT Automation Apps", kind: { en: "IoT apps", ta: "IoT ஆப்கள்" }, year: "2023", note: { en: "Smart bell and water controller apps for ESP32 devices, with live MQTT and Socket.IO alerts.", ta: "ESP32 சாதனங்களுக்கான ஸ்மார்ட் பெல், தண்ணீர் கட்டுப்பாட்டு ஆப்கள்; MQTT, Socket.IO நேரலை எச்சரிக்கைகள்." } },
];

export const experience = [
  {
    period: { en: "Oct 2024 – now", ta: "அக் 2024 – இப்போது" },
    company: "Resbee Info Technologies (e-Khool)",
    role: { en: "Full-stack developer, team lead", ta: "ஃபுல்-ஸ்டாக் டெவலப்பர், டீம் லீட்" },
    points: [
      {
        en: "Lead 4 engineers on government and enterprise LMS platforms for 800K+ users in India and Ethiopia, at 99.5% uptime.",
        ta: "இந்தியா, எத்தியோப்பியாவில் 8 லட்சம்+ பயனர்களுக்கான அரசு, நிறுவன LMS தளங்களில் 4 இன்ஜினியர்களை வழிநடத்துகிறேன் (99.5% இயக்க நேரம்).",
      },
      {
        en: "Build Aira's multi-agent orchestration, the course creation agent and the MCP tools that let Claude run the LMS.",
        ta: "Aira-வின் பல ஏஜென்ட் ஒருங்கிணைப்பு, கோர்ஸ் உருவாக்கும் ஏஜென்ட், Claude LMS-ஐ இயக்க உதவும் MCP கருவிகளை உருவாக்குகிறேன்.",
      },
      {
        en: "Offline-first sync that cut sync failures 60%; Swift/Kotlin encrypted video players published to NPM (5K+ downloads).",
        ta: "ஒத்திசைவுத் தோல்விகளை 60% குறைத்த ஆஃப்லைன்-முதல் சிங்க்; NPM-இல் வெளியிட்ட Swift/Kotlin குறியாக்க வீடியோ பிளேயர்கள் (5K+ பதிவிறக்கங்கள்).",
      },
      {
        en: "Moved the apps to the New Architecture: startup 45% faster, 70% fewer crashes, 45 → 60 FPS.",
        ta: "ஆப்களை New Architecture-க்கு மாற்றினேன்: 45% வேகமான தொடக்கம், 70% குறைவான கிராஷ்கள், 45 → 60 FPS.",
      },
    ],
    stack: ["React Native", "FastAPI", "LangGraph", "Firebase", "AWS"],
  },
  {
    period: { en: "Mar 2023 – Oct 2024", ta: "மார் 2023 – அக் 2024" },
    company: "Radaz Technologies",
    role: { en: "React Native developer", ta: "React Native டெவலப்பர்" },
    points: [
      {
        en: "Shipped 3 Android/iOS apps in IoT and e-commerce; ESP32/MQTT monitoring halved alert response time.",
        ta: "IoT, இ-காமர்ஸில் 3 Android/iOS ஆப்களை வெளியிட்டேன்; ESP32/MQTT கண்காணிப்பு எச்சரிக்கை பதில் நேரத்தைப் பாதியாக்கியது.",
      },
      {
        en: "Live tracking with the Google Maps SDK for 10K+ daily users; CodePush cut hotfixes from 2 days to 2 hours.",
        ta: "தினமும் 10K+ பயனர்களுக்கு Google Maps SDK நேரலைக் கண்காணிப்பு; CodePush ஹாட்ஃபிக்ஸ் நேரத்தை 2 நாளிலிருந்து 2 மணிநேரமாகக் குறைத்தது.",
      },
    ],
    stack: ["React Native", "MQTT", "Google Maps", "CodePush"],
  },
  {
    period: { en: "2024 – now", ta: "2024 – இப்போது" },
    company: "Purple Info Tech",
    role: { en: "My own studio", ta: "என் சொந்த ஸ்டுடியோ" },
    points: [
      {
        en: "Games, apps and websites on my own Google Play account: Pen Fight, InviteForYou, Jewel Billing and sites for local shops.",
        ta: "என் Google Play கணக்கில் கேம்கள், ஆப்கள், இணையதளங்கள்: Pen Fight, InviteForYou, Jewel Billing, உள்ளூர் கடைகளுக்கான தளங்கள்.",
      },
    ],
    stack: ["React Native", "Next.js", "Astro"],
  },
];

export const skills = [
  { group: { en: "Mobile", ta: "மொபைல்" }, items: "React Native (Fabric, TurboModules), Expo, Reanimated, Skia, Swift, Kotlin" },
  { group: { en: "Web", ta: "வெப்" }, items: "React, Next.js, Astro, Tailwind, Three.js" },
  { group: { en: "Backend", ta: "பேக்எண்ட்" }, items: "Node.js, FastAPI, Firebase, MongoDB, Socket.IO, RabbitMQ, AWS" },
  { group: { en: "AI", ta: "AI" }, items: "LangGraph, LangChain, Claude, MCP, OpenAI API, Ollama, Whisper" },
  { group: { en: "Shipping", ta: "வெளியீடு" }, items: "CI/CD, CodePush, Jest, Vitest, Playwright, Crashlytics" },
];

export const education = { en: "B.E. Civil Engineering, Kongu Engineering College, 2022", ta: "B.E. சிவில் இன்ஜினியரிங், கொங்கு பொறியியல் கல்லூரி, 2022" };
