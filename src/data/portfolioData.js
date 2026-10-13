import certClaude101 from '../../Claude Certificate/Claude 101.png';
import certClaudeCode101 from '../../Claude Certificate/Claude code 101 .png';
import certAiCapability from '../../Claude Certificate/AI capability.png';
import certFluencyBuilder from '../../Claude Certificate/fluency builder.png';
import certFluencyCreative from '../../Claude Certificate/fluency creative work .png';
import certAdvancedTopics from '../../Claude Certificate/Advanced Topics .png';

/**
 * =========================================================================
 * CENTRALIZED PORTFOLIO DATA CONFIGURATION STORE
 * Samuel Imole Patrick (ESCANOR) — Full-Stack Web & Mobile Engineer
 * =========================================================================
 * Clean, natural, and accessible copy tailored for recruiters, startup founders,
 * engineering leaders, and clients.
 */

/* =========================================================================
   1. CORE PRODUCTION PROJECTS (7 Verified Deployments)
   ========================================================================= */
export const projects = [
  {
    id: 'tasfued-marketplace',
    num: '01',
    title: 'TASFUED MARKETPLACE',
    subtitle: 'Campus Marketplace for University Students',
    category: 'Web App • E-Commerce',
    liveUrl: 'https://tasfuedmarketplace.com.ng',
    githubUrl: 'https://github.com/ESCANOR-dev-afro',
    image: '/screenshots/tasfued-landing.png',
    hasVisuals: true,
    featured: true,
    stackTags: ['React', 'Vite', 'Tailwind CSS', 'Supabase', 'PostgreSQL'],
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Supabase', 'PostgreSQL'],
    description:
      'A full-featured student marketplace that lets university students safely buy and sell textbooks, electronics, and dorm essentials directly on campus. Features verified student merchant badges, instant in-app messaging, fast category search, and a smooth checkout flow.',
    challenge:
      'Engineered an indexed search engine on PostgreSQL and Supabase, delivering instant search results and responsive cart updates even during high-traffic campus rush hours.',
    hudMetrics: [
      'React + Vite',
      'Supabase Auth',
      'PostgreSQL DB',
      'Live in Production',
    ],
    previewType: 'marketplace',
    features: [
      'Organized product catalog for textbooks, gadgets, housing, and essentials',
      'Student merchant verification badges for safer, trusted transactions',
      'Direct buyer-seller messaging for easy price negotiations and pickup planning',
      'Fast, intuitive shopping cart and instant order status updates',
      'Optimized PostgreSQL queries that load search results in milliseconds',
      'Admin review tools to keep campus listings safe and fraud-free',
    ],
    screenshots: {
      desktop: '/screenshots/tasfued-landing.png',
      desktopGallery: [
        { id: 'marketplace-home', label: 'MARKETPLACE HOME', src: '/screenshots/tasfued-landing.png', caption: 'Student Discovery Feed & Featured Campus Listings' },
        { id: 'store-profile', label: 'STORE PROFILE & DASHBOARD', src: '/screenshots/tasfued-profile.png', caption: 'Student Merchant Storefront & Inventory Manager' },
        { id: 'product-listing', label: 'PRODUCT LISTING VIEW', src: '/screenshots/tasfued-listing.png', caption: 'Item Details with Direct Chat & Purchase Options' },
      ],
      mobile: '/screenshots/tasfued-mobile.png',
      mobileGallery: [
        { id: 'mobile-home', label: 'CAMPUS FEED', src: '/screenshots/tasfued-mobile.png' },
        { id: 'mobile-profile', label: 'MERCHANT PROFILE', src: '/screenshots/tasfued-profile.png' },
        { id: 'mobile-listing', label: 'ITEM DETAILS', src: '/screenshots/tasfued-listing.png' },
      ],
    },
    mockDetails: {
      url: 'tasfuedmarketplace.com.ng',
      accentColor: '#D4AF37',
      mobileScreens: ['Market', 'Cart', 'Chat'],
      stats: { users: '5,000+ Students', uptime: '99.9%', latency: 'Fast (< 20ms)' },
    },
  },
  {
    id: 'scheduler-mobile',
    num: '02',
    title: 'SCHEDULER',
    subtitle: 'Academic Timetable & Lecture Companion App',
    category: 'Mobile & Web App • Education',
    liveUrl: 'https://scheduler.nexlify.com.ng',
    githubUrl: 'https://github.com/ESCANOR-dev-afro',
    image: '/screenshots/scheduler-login.png',
    hasVisuals: true,
    featured: true,
    stackTags: ['Flutter', 'Dart', 'Supabase', 'Riverpod', 'PostgreSQL'],
    techStack: ['Flutter', 'Dart', 'Supabase', 'Riverpod', 'PostgreSQL'],
    description:
      'A cross-platform mobile timetable and study companion built for university students. Helps students stay organized with instant matriculation login, automated lecture reminder alarms, schedule conflict alerts, integrated video lecture streaming, and full offline access.',
    challenge:
      'Designed an offline-first architecture with Riverpod state management and local caching, so students can view class timetables and study materials even without an active internet connection.',
    hudMetrics: [
      'Flutter + Dart',
      'Supabase Backend',
      'Riverpod 2.0',
      'Works Offline',
    ],
    previewType: 'scheduler',
    features: [
      'Quick student sign-in with university email and matriculation number',
      'Built-in video lecture player with synchronized lecture notes and handouts',
      'Personal student dashboard tracking completed classes and upcoming deadlines',
      'Smart class schedule synchronization with automatic conflict detection',
      'Reliable background alarms and notifications before every lecture',
      'Full offline caching so your schedule is always available on campus',
    ],
    screenshots: {
      desktop: '/screenshots/scheduler-login.png',
      desktopGallery: [
        {
          id: 'scheduler-auth',
          label: 'STUDENT SIGN-IN',
          src: '/screenshots/scheduler-login.png',
          caption: 'Secure student sign-in portal with matriculation number verification',
          subtitle: 'Student Authentication Portal',
          tech: 'Flutter • Supabase Auth • Clean Dark Theme',
        },
        {
          id: 'scheduler-stream',
          label: 'LECTURE VIDEO STREAM',
          src: '/screenshots/scheduler-lecture.png',
          caption: 'General Biology video lecture player with synced class handouts',
          subtitle: 'E-Learning & Video Player',
          tech: 'Video Stream • Handout Sync • Mobile Friendly',
        },
        {
          id: 'scheduler-profile',
          label: 'STUDENT PROFILE & STATS',
          src: '/screenshots/scheduler-profile.png',
          caption: 'Student dashboard tracking 38 enrolled classes and academic activity',
          subtitle: 'Course Progress & Activity',
          tech: 'Riverpod State • Real-time Stats • Clean UI',
        },
      ],
      mobile: '/screenshots/scheduler-login.png',
      mobileGallery: [
        {
          id: 'scheduler-mob-auth',
          label: 'SIGN-IN',
          src: '/screenshots/scheduler-login.png',
          title: 'Student Sign-In Portal',
          badge: 'Auth & Matric',
          description: 'Dark-themed sign-in portal with student email and matriculation number verification.',
        },
        {
          id: 'scheduler-mob-stream',
          label: 'LECTURE STREAM',
          src: '/screenshots/scheduler-lecture.png',
          title: 'Video Lecture Player',
          badge: 'E-Learning',
          description: 'Lecture video streaming with integrated class notes and handouts.',
        },
        {
          id: 'scheduler-mob-profile',
          label: 'STUDENT PROFILE',
          src: '/screenshots/scheduler-profile.png',
          title: 'Student Progress Dashboard',
          badge: 'Active Student',
          description: 'Personal study dashboard tracking completed courses, upcoming tests, and reminders.',
        },
      ],
    },
    mockDetails: {
      url: 'scheduler.nexlify.com.ng',
      accentColor: '#00D2FF',
      themeColor: '#070E17',
      mobileScreens: ['SignIn', 'LectureStream', 'StudentProfile'],
      stats: { activeSchedules: '12,000+ Classes', reliability: '100%', performance: '60 FPS Smooth' },
    },
  },
  {
    id: 'awba-cbt-portal',
    num: '03',
    title: 'AWBA CBT PLATFORM',
    subtitle: 'Offline Computer-Based Testing System',
    category: 'Desktop & Web App • Education',
    liveUrl: null,
    githubUrl: 'https://github.com/ESCANOR-dev-afro',
    image: '/screenshots/awba-dashboard.png',
    hasVisuals: true,
    featured: true,
    stackTags: ['React', 'Node.js', 'Electron', 'SQLite / IndexedDB', 'Tailwind CSS'],
    techStack: ['React', 'Node.js', 'Electron', 'SQLite / IndexedDB', 'Tailwind CSS'],
    description:
      'A secure, localized computer-based examination and grading application built during my Industrial Training (SIWES) at InfoSystem Consulting. Operates 100% offline with anti-cheat kiosk lockdown, real-time student monitoring, and instant automated score reports.',
    challenge:
      'Engineered an offline-first sync mechanism using local SQLite and IndexedDB, ensuring zero candidate answer data loss during power outages or local network disconnects.',
    hudMetrics: [
      'React + Electron',
      '100% Offline Mode',
      'SQLite / IndexedDB',
      'Anti-Cheat Kiosk',
    ],
    previewType: 'portal',
    features: [
      'Runs completely offline on school lab computers without needing internet',
      'Anti-cheat kiosk lockdown that prevents students from switching tabs or apps',
      'Crash-proof local database saving every answer instantly as students type',
      'Automated grading and score calculation right after exam submission',
      'Live supervisor dashboard showing student progress and remaining time',
      'Instant generation of printable report cards and performance summaries',
    ],
    screenshots: {
      desktop: '/screenshots/awba-dashboard.png',
      desktopGallery: [
        { id: 'dashboard', label: 'EXAM DASHBOARD', src: '/screenshots/awba-dashboard.png', caption: 'Supervisor real-time exam monitoring and class management' },
        { id: 'exam', label: 'STUDENT EXAM SCREEN', src: '/screenshots/awba-exam.png', caption: 'Clean exam question interface with countdown timer' },
        { id: 'login', label: 'STATION LOGIN', src: '/screenshots/awba-login.png', caption: 'Offline student authentication and station lockdown' },
      ],
      mobile: '/screenshots/awba-mobile.png',
      mobileGallery: [
        { id: 'awba-mob-exam', label: 'EXAM PORTAL', src: '/screenshots/awba-mobile.png' },
        { id: 'awba-mob-login', label: 'STUDENT LOGIN', src: '/screenshots/awba-login.png' },
        { id: 'awba-mob-dash', label: 'ADMIN VIEW', src: '/screenshots/awba-dashboard.png' },
      ],
    },
    mockDetails: {
      url: 'Local School Network (AWBA CBT)',
      accentColor: '#E8C547',
      mobileScreens: ['KioskExam', 'Lockdown', 'InstantResult'],
      stats: { networkMode: '100% Offline', latency: 'Instant (Local)', security: 'Kiosk Protected' },
    },
  },
  {
    id: 'fintech-platform',
    num: '04',
    title: 'FINTECH WALLET & PAYMENTS',
    subtitle: 'Digital Wallet & Money Transfer App',
    category: 'Mobile App • Digital Banking',
    liveUrl: null,
    githubUrl: 'https://github.com/ESCANOR-dev-afro',
    image: '/screenshots/fintech-preview.png',
    hasVisuals: false,
    featured: false,
    stackTags: ['Flutter', 'Firebase', 'Node.js', 'Riverpod'],
    techStack: ['Flutter', 'Firebase', 'Node.js', 'Riverpod'],
    description:
      'A secure mobile wallet application built around double-entry accounting rules to ensure balanced ledgers. Features instant peer-to-peer transfers, interactive monthly spending analytics, virtual debit cards, and biometric authentication.',
    challenge:
      'Implemented atomic database transactions on Firebase and Node.js to eliminate balance discrepancies and guarantee funds cannot be duplicated or lost during concurrent transfers.',
    hudMetrics: [
      'Flutter Mobile',
      'Double-Entry Ledger',
      'Node.js Backend',
      'Biometric Security',
    ],
    previewType: 'fintech',
    features: [
      'Double-entry accounting ledger with clear, transparent transaction histories',
      'Instant peer-to-peer wallet transfers and quick QR code payments',
      'Visual monthly spending analytics with dynamic category charts',
      'Biometric fingerprint and PIN approval for all sensitive transactions',
      'Virtual card management with instant freeze and unfreeze toggles',
      'Automatic digital transaction receipt generation and sharing',
    ],
    mockDetails: {
      url: 'fintech.internal.app',
      accentColor: '#00FF88',
      mobileScreens: ['Wallet', 'Ledger', 'Cards'],
      stats: { security: 'Biometric + PIN', transferSpeed: '< 200ms', ledgerAccuracy: '100.00%' },
    },
  },
  {
    id: 'sarkin-mota-group',
    num: '05',
    title: 'SARKIN MOTA GROUP',
    subtitle: 'Luxury Automotive Dealership & Fleet Showcase',
    category: 'Web App • Showcase & Fleet',
    liveUrl: null,
    githubUrl: 'https://github.com/ESCANOR-dev-afro',
    image: '/screenshots/sarkin-mota/sarkin-landing-desktop.png',
    hasVisuals: true,
    featured: true,
    stackTags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP'],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP'],
    description:
      'A modern web showroom for a high-end luxury vehicle dealership. Features an interactive 360° vehicle turntable, real-time fleet inventory browsing, test drive booking workflows, and smooth scroll animations.',
    challenge:
      'Optimized high-resolution car imagery and 360° interactive turntable animations with GSAP to deliver silky-smooth 60fps performance across desktop and mobile screens.',
    hudMetrics: [
      'Next.js + TypeScript',
      'GSAP Animations',
      'Tailwind CSS',
      'Fleet Management',
    ],
    previewType: 'automotive',
    features: [
      'Interactive 360° studio turntable with detailed vehicle mechanical specs',
      'Live fleet inventory tracker with price, brand, and vehicle category filters',
      'Online test drive and private showroom viewing appointment scheduler',
      'Silky smooth, scroll-driven page animations powered by GSAP',
      'Auto financing calculator with monthly payment and deposit estimates',
      'Fully responsive luxury design tailored for desktop, tablet, and mobile',
    ],
    screenshots: {
      desktop: '/screenshots/sarkin-mota/sarkin-landing-desktop.png',
      desktopGallery: [
        { id: 'sarkin-live', label: '★ 360° LIVE TURNTABLE', isInteractive: true, caption: 'Interactive 10-Vehicle Studio Turntable & Specifications' },
        { id: 'sarkin-hero', label: 'SHOWROOM HERO', src: '/screenshots/sarkin-mota/sarkin-landing-desktop.png', caption: 'Luxury Showroom — Mid-Engine Corvette C8 Showcase' },
        { id: 'sarkin-ferrari', label: 'FERRARI 296 GTB (09/10)', src: '/screenshots/sarkin-mota/sarkin-ferrari-296gtb-turntable.png', caption: 'Ferrari 296 GTB Hybrid Showcase (819 HP)' },
        { id: 'sarkin-cybertruck', label: 'CYBERTRUCK (10/10)', src: '/screenshots/sarkin-mota/sarkin-cybertruck-turntable.png', caption: 'Tesla Cybertruck Tri-Motor AWD Showcase' },
        { id: 'sarkin-urus', label: 'URUS PERFORMANTE (06/10)', src: '/screenshots/sarkin-mota/sarkin-urus-turntable.png', caption: 'Lamborghini Urus Performante Super SUV Showcase' },
      ],
      mobile: '/screenshots/sarkin-mota/sarkin-bmw-760i-mobile.png',
      mobileGallery: [
        { id: 'sarkin-mob-live', label: '★ LIVE TURNTABLE', isInteractive: true },
        { id: 'sarkin-mob-bmw', label: 'BMW 760i', src: '/screenshots/sarkin-mota/sarkin-bmw-760i-mobile.png' },
        { id: 'sarkin-mob-rolls', label: 'ROLLS-ROYCE', src: '/screenshots/sarkin-mota/sarkin-rolls-royce-mobile.png' },
      ],
    },
    mockDetails: {
      url: 'sarkinmotagroup.com/showroom',
      accentColor: '#D4AF37',
      mobileScreens: ['Showroom', 'Turntable', 'Specs'],
      stats: { fleet: '10 Luxury Vehicles', booking: 'Instant Online', pricing: 'Naira (₦) Active' },
    },
  },
  {
    id: 'gilded-table-mobile',
    num: '06',
    title: 'THE GILDED TABLE (MOBILE)',
    subtitle: 'Fine Dining Companion & Table Reservation App',
    category: 'Mobile App • Hospitality',
    liveUrl: null,
    githubUrl: 'https://github.com/ESCANOR-dev-afro',
    image: '/screenshots/gilded-table-mobile.png',
    hasVisuals: false,
    featured: false,
    stackTags: ['Flutter', 'Dart', 'Supabase Auth', 'PostgreSQL'],
    techStack: ['Flutter', 'Dart', 'Supabase Auth', 'PostgreSQL'],
    description:
      'A cross-platform dining companion app that allows restaurant guests to explore tasting menus, choose specific dining tables on an interactive floor plan, review sommelier wine pairings, and save dietary preferences.',
    challenge:
      'Built a custom interactive floor plan widget in Flutter that lets guests visually select and reserve their preferred seating in real time.',
    hudMetrics: [
      'Flutter + Dart',
      'Supabase Auth',
      'PostgreSQL DB',
      'Instant Booking',
    ],
    previewType: 'gilded-mobile',
    features: [
      'Interactive visual floor plan to select and reserve exact restaurant tables',
      'High-definition multi-course tasting menu explorer with allergen tags',
      'Sommelier wine pairing recommendations and tasting notes',
      'Pre-ordering options for bespoke private dining experiences',
      'Guest profile manager storing dietary restrictions and seating preferences',
      'Instant reservation confirmations powered by Supabase PostgreSQL',
    ],
    mockDetails: {
      url: 'gildedtable.app/reserve',
      accentColor: '#E8C547',
      mobileScreens: ['FloorPlan', 'Menu', 'Sommelier'],
      stats: { guestRating: '4.9 / 5.0', reservationSpeed: 'Under 10s', performance: '60 FPS' },
    },
  },
  {
    id: 'gilded-table-web',
    num: '07',
    title: 'THE GILDED TABLE (WEB)',
    subtitle: 'Restaurant Operations & Kitchen Management Dashboard',
    category: 'Web App • Operations Dashboard',
    liveUrl: null,
    githubUrl: 'https://github.com/ESCANOR-dev-afro',
    image: '/screenshots/gilded-table-web.png',
    hasVisuals: false,
    featured: false,
    stackTags: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'PostgreSQL'],
    techStack: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'PostgreSQL'],
    description:
      'A complete restaurant operations management dashboard featuring live dining room occupancy maps, kitchen order display (KDS), wine cellar inventory tracking, and daily revenue analytics.',
    challenge:
      'Synchronized kitchen orders and table occupancy states in real time using Supabase Realtime subscriptions for instant order updates across staff devices.',
    hudMetrics: [
      'Next.js + TypeScript',
      'Supabase Realtime',
      'PostgreSQL DB',
      'Live Kitchen Sync',
    ],
    previewType: 'gilded-web',
    features: [
      'Live dining room table occupancy map with color-coded status indicators',
      'Kitchen Display System (KDS) for chef order management and timers',
      'Guest registry with allergy notes, VIP status, and visit histories',
      'Wine cellar inventory tracker with automated low-stock alerts',
      'Daily covers, table turnaround, and revenue analytics charts',
      'Role-based access control for kitchen staff, floor managers, and admins',
    ],
    mockDetails: {
      url: 'admin.gildedtable.com',
      accentColor: '#D4AF37',
      mobileScreens: ['KDS', 'Occupancy', 'Cellar'],
      stats: { liveOrders: 'Real-Time Sync', kitchenLatency: '< 15ms', accuracy: '100%' },
    },
  },
];

/* =========================================================================
   2. ANTHROPIC CLAUDE ACADEMY CERTIFICATES (AI Credentials)
   ========================================================================= */
export const certificates = [
  {
    id: 'claude-code-101',
    nodeNumber: '01',
    title: 'Claude Code 101',
    subtitle: 'Autonomous AI Coding & Terminal Engineering',
    category: 'AI Engineering',
    issuer: 'Anthropic / Claude Academy',
    badgeId: 'AUTH-CC101-AGENTIC',
    status: 'VERIFIED_CREDENTIAL',
    image: certClaudeCode101,
    summary: 'Autonomous AI Coding & Terminal Tools',
    description:
      'Certified in using Claude Code CLI for autonomous software development, multi-file codebase navigation, automated testing, terminal tool calling, and intelligent debugging workflows.',
    stackTags: [
      'Claude Code CLI',
      'Autonomous Workflows',
      'Terminal Tool Calling',
      'Codebase Navigation',
      'Automated Refactoring',
    ],
    skills: [
      'Claude Code CLI',
      'Autonomous Workflows',
      'Terminal Tool Calling',
      'Codebase Navigation',
      'Automated Refactoring',
    ],
    liveUrl: 'https://anthropic.com',
    githubUrl: 'https://github.com/ESCANOR-dev-afro',
    metrics: {
      domain: 'AI Software Development',
      level: 'Specialist',
      verificationDate: '2025 / 2026',
      accreditationTier: 'Official Credential',
    },
    accentColor: '#FF6A00',
  },
  {
    id: 'advanced-topics',
    nodeNumber: '02',
    title: 'Claude Advanced Topics',
    subtitle: 'Tool Use, Function Calling & MCP Architecture',
    category: 'Enterprise AI',
    issuer: 'Anthropic / Claude Academy',
    badgeId: 'AUTH-ADVTOP-MCP',
    status: 'VERIFIED_CREDENTIAL',
    image: certAdvancedTopics,
    summary: 'Custom Tool Integration & Model Context Protocol',
    description:
      'Advanced accreditation in connecting LLMs with external tools, structured function calling, Model Context Protocol (MCP) integrations, custom system instructions, and multi-agent coordination.',
    stackTags: [
      'Function Calling',
      'Model Context Protocol (MCP)',
      'System Instructions',
      'Multi-Agent Systems',
      'AI Safety & Guardrails',
    ],
    skills: [
      'Function Calling',
      'Model Context Protocol (MCP)',
      'System Instructions',
      'Multi-Agent Systems',
      'AI Safety & Guardrails',
    ],
    liveUrl: 'https://anthropic.com',
    githubUrl: 'https://github.com/ESCANOR-dev-afro',
    metrics: {
      domain: 'Systems Architecture',
      level: 'Advanced',
      verificationDate: '2025 / 2026',
      accreditationTier: 'Official Credential',
    },
    accentColor: '#FFB703',
  },
  {
    id: 'ai-fluency-builders',
    nodeNumber: '03',
    title: 'AI Fluency for Builders',
    subtitle: 'Full-Stack Integration & Developer SDKs',
    category: 'Full-Stack AI',
    issuer: 'Anthropic / Claude Academy',
    badgeId: 'AUTH-BUILDER-SDK',
    status: 'VERIFIED_CREDENTIAL',
    image: certFluencyBuilder,
    summary: 'Full-Stack Web & Mobile AI Integration',
    description:
      'Expertise in integrating Claude APIs into production web and mobile apps, including streaming responses via Server-Sent Events (SSE), token budget management, and resilient error recovery.',
    stackTags: [
      'Anthropic API & SDK',
      'Streaming Pipelines',
      'Token Optimization',
      'Full-Stack Integration',
      'Latency Optimization',
    ],
    skills: [
      'Anthropic API & SDK',
      'Streaming Pipelines',
      'Token Optimization',
      'Full-Stack Integration',
      'Latency Optimization',
    ],
    liveUrl: 'https://anthropic.com',
    githubUrl: 'https://github.com/ESCANOR-dev-afro',
    metrics: {
      domain: 'Full-Stack Development',
      level: 'Professional',
      verificationDate: '2025 / 2026',
      accreditationTier: 'Official Credential',
    },
    accentColor: '#38BDF8',
  },
  {
    id: 'ai-capability',
    nodeNumber: '04',
    title: 'AI Capabilities & Architecture',
    subtitle: 'Multimodal Vision, Reasoning & Document Parsing',
    category: 'AI Architecture',
    issuer: 'Anthropic / Claude Academy',
    badgeId: 'AUTH-AICAP-VISION',
    status: 'VERIFIED_CREDENTIAL',
    image: certAiCapability,
    summary: 'Visual UI Decomposition & Document Intelligence',
    description:
      'Certified in multimodal visual understanding, diagram analysis, converting UI mockups into structured code blueprints, and extracting structured data from complex documents.',
    stackTags: [
      'Multimodal Vision',
      'Document Intelligence',
      'Complex Reasoning',
      'Data Extraction',
      'Prompt Optimization',
    ],
    skills: [
      'Multimodal Vision',
      'Document Intelligence',
      'Complex Reasoning',
      'Data Extraction',
      'Prompt Optimization',
    ],
    liveUrl: 'https://anthropic.com',
    githubUrl: 'https://github.com/ESCANOR-dev-afro',
    metrics: {
      domain: 'Multimodal Systems',
      level: 'Professional',
      verificationDate: '2025 / 2026',
      accreditationTier: 'Official Credential',
    },
    accentColor: '#10B981',
  },
  {
    id: 'claude-101',
    nodeNumber: '05',
    title: 'Claude 101',
    subtitle: 'Core Foundations & Prompt Engineering',
    category: 'Core Foundations',
    issuer: 'Anthropic / Claude Academy',
    badgeId: 'AUTH-CL101-PROMPT',
    status: 'VERIFIED_CREDENTIAL',
    image: certClaude101,
    summary: 'Prompt Architecture & Structured JSON Generation',
    description:
      'Comprehensive understanding of Claude model foundations, safety principles, context window optimization, few-shot prompting techniques, and reliable structured JSON output formatting.',
    stackTags: [
      'Prompt Engineering',
      'Structured JSON Output',
      'Constitutional AI',
      'Context Optimization',
      'Safety Standards',
    ],
    skills: [
      'Prompt Engineering',
      'Structured JSON Output',
      'Constitutional AI',
      'Context Optimization',
      'Safety Standards',
    ],
    liveUrl: 'https://anthropic.com',
    githubUrl: 'https://github.com/ESCANOR-dev-afro',
    metrics: {
      domain: 'Prompt Architecture',
      level: 'Foundational',
      verificationDate: '2025 / 2026',
      accreditationTier: 'Official Credential',
    },
    accentColor: '#A855F7',
  },
  {
    id: 'ai-fluency-creative',
    nodeNumber: '06',
    title: 'AI Fluency for Creative Work',
    subtitle: 'Generative UI Design & Rapid Prototyping',
    category: 'UI/UX & Prototyping',
    issuer: 'Anthropic / Claude Academy',
    badgeId: 'AUTH-CREATIVE-UX',
    status: 'VERIFIED_CREDENTIAL',
    image: certFluencyCreative,
    summary: 'Design-to-Code & Interactive Prototyping',
    description:
      'Practical techniques for collaborative design workflows with AI, converting visual concepts into working interactive components, and prototyping modern animated web interfaces.',
    stackTags: [
      'UI/UX Prototyping',
      'Design-to-Code',
      'Interactive Motion',
      'Creative Workflows',
      'Component Architecture',
    ],
    skills: [
      'UI/UX Prototyping',
      'Design-to-Code',
      'Interactive Motion',
      'Creative Workflows',
      'Component Architecture',
    ],
    liveUrl: 'https://anthropic.com',
    githubUrl: 'https://github.com/ESCANOR-dev-afro',
    metrics: {
      domain: 'Design & Prototyping',
      level: 'Specialist',
      verificationDate: '2025 / 2026',
      accreditationTier: 'Official Credential',
    },
    accentColor: '#EC4899',
  },
];

// Alias for backwards compatibility with existing imports
export const claudeCertificates = certificates;

export const certificateCategories = [
  'ALL CREDENTIALS',
  'AI Engineering',
  'Enterprise AI',
  'Full-Stack AI',
  'AI Architecture',
  'Core Foundations',
  'UI/UX & Prototyping',
];

/* =========================================================================
   3. DEVELOPER PROFILE & BACKGROUND METADATA
   ========================================================================= */
export const developerProfile = {
  name: 'Samuel Imole Patrick',
  codename: 'ESCANOR',
  title: 'Full-Stack Web & Mobile Developer',
  location: 'Mowe, Ogun State, Nigeria',
  email: 'samuelimolepatrick@gmail.com',
  phone: '+234 814 922 4954',
  github: 'https://github.com/ESCANOR-dev-afro',
  linkedin: 'https://www.linkedin.com/in/samuel-patrick-722b82423',
  portfolioUrl: 'https://about-sammy.vercel.app',
  bio: 'Full-Stack Software Engineer with hands-on experience building production web and mobile apps with React, Next.js, Flutter, and PostgreSQL. Passionate about clean code, intuitive design, and building reliable digital systems.',
  education: {
    degree: 'Bachelor of Science (B.Sc.) in Computer Science',
    institution: 'Tai Solarin Federal University of Education (TASFUED)',
    location: 'Ogun State, Nigeria',
    status: 'Enrolled • Strong Academic Standing',
  },
  experience: {
    role: 'Software Engineering & Database Intern (SIWES)',
    company: 'InfoSystem Consulting',
    duration: '3-Month Intensive Program',
    highlight: 'Built a localized offline-first examination system (AWBA CBT Platform) that allowed hundreds of students to take tests concurrently with zero network delay and automatic score grading.',
  },
};

/* =========================================================================
   4. TECHNICAL SKILLS MATRIX
   ========================================================================= */
export const primarySkills = [
  {
    name: 'React',
    specialization: 'Modern, responsive web applications and interactive user interfaces',
    color: '#61DAFB',
  },
  {
    name: 'Next.js',
    specialization: 'Full-stack web framework with App Router and server-side rendering',
    color: '#FAFAFA',
  },
  {
    name: 'Flutter',
    specialization: 'Fast, native iOS and Android mobile apps from a single codebase',
    color: '#02569B',
  },
  {
    name: 'Dart',
    specialization: 'Object-oriented programming language for high-performance apps',
    color: '#0175C2',
  },
  {
    name: 'Supabase',
    specialization: 'Scalable PostgreSQL databases, authentication, and realtime sync',
    color: '#3ECF8E',
  },
  {
    name: 'Tailwind CSS',
    specialization: 'Clean, responsive UI styling and modern design systems',
    color: '#06B6D4',
  },
];

export const secondarySkills = [
  {
    name: 'TypeScript',
    specialization: 'Type-safe JavaScript for scalable and maintainable codebases',
    color: '#3178C6',
  },
  {
    name: 'Node.js',
    specialization: 'Fast backend services, RESTful APIs, and server-side runtimes',
    color: '#43853D',
  },
  {
    name: 'PostgreSQL',
    specialization: 'Relational database schema design, indexing, and query optimization',
    color: '#336791',
  },
  {
    name: 'Riverpod',
    specialization: 'Reactive, reliable state management for Flutter applications',
    color: '#05A5DC',
  },
  {
    name: 'Firebase',
    specialization: 'Cloud Firestore database, user authentication, and cloud functions',
    color: '#FFCA28',
  },
  {
    name: 'Vite',
    specialization: 'Lightning-fast modern frontend build tool and dev server',
    color: '#BD34FE',
  },
];

/* =========================================================================
   5. MASTER EXPORT OBJECT
   ========================================================================= */
export const portfolioData = {
  developer: developerProfile,
  projects,
  certificates,
  certificateCategories,
  skills: {
    primary: primarySkills,
    secondary: secondarySkills,
  },
};

export default portfolioData;
