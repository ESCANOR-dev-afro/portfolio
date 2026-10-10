# 亗『ESCANOR』亗 — Samuel Imole Patrick
### Full-Stack Web & Mobile Software Engineer Portfolio

[![Live Production Portfolio](https://img.shields.io/badge/LIVE%20DEMO-about--sammy.netlify.app-ff6a00?style=for-the-badge&logo=netlify&logoColor=white)](https://about-sammy.netlify.app)
[![React 19](https://img.shields.io/badge/React-19.1.0-202a36?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.3.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.1.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Flutter & Dart](https://img.shields.io/badge/Flutter-Cross--Platform-02569B?style=for-the-badge&logo=flutter&logoColor=white)](https://flutter.dev/)
[![Anthropic Claude Certified](https://img.shields.io/badge/Anthropic_Claude-6_Certifications-d90429?style=for-the-badge&logo=anthropic&logoColor=white)](https://anthropic.com)

---

## 🌟 Executive Summary

Welcome to the official repository for **Samuel Imole Patrick's (ESCANOR)** interactive software engineering portfolio. Engineered from the ground up to reflect modern, production-grade web architecture, this platform blends a cinematic **Cyber-HUD Control Deck aesthetic** with enterprise-level performance, mobile-first responsiveness, and complete content autonomy via an integrated `/admin` command center.

> **Live Deployment:** [https://about-sammy.netlify.app](https://about-sammy.netlify.app)  
> **Master Admin Console:** `https://about-sammy.netlify.app/admin` *(Passcode Protected)*

---

## 🚀 Key Architectural Modules & Features

### 1. 🎛️ Segmented Cyber-HUD Navigation Deck (`TelemetryHUD.jsx`)
* **Monolithic 3-Segment Geometry:** Custom polygon-clipped control deck containing an active green telemetry beacon, `[ESCANOR]` brand crown battlements, interactive channel links with glowing crescent arcs, and action pods.
* **Responsive Control Rail:** Perfectly scaled for smartphones, tablets, and desktop displays with zero horizontal overflow or clipping.

### 2. 📱 Dual-Mode Project Viewports (`DeviceViewports.jsx` & `ProjectNodes.jsx`)
* **Verified Project Deployments:** Interactive showcase of full-stack web platforms and cross-platform mobile apps (TASFUED Marketplace, SCHEDULER Mobile, AWBA CBT Platform, Sarkin Mota, FinTech Wallet, and The Gilded Table).
* **Interactive Hardware Mockups:** Instant toggle between **Smartphone Bezel** (with dynamic island, carrier telemetry, and multi-view screenshots) and **Desktop Browser Window** (with simulated URL bar, tab carousels, and verified certificates).
* **Touch-Optimized Carousels:** Large tap targets and touch-friendly controls tailored for recruiters browsing on mobile devices.

### 3. 🛡️ Anthropic Claude AI Vault (`AICredentialVault.jsx` & `CertificateLightboxModal.jsx`)
* **6 Official Claude Academy Diplomas:** Interactive credential showcase covering Claude Code, AI Fluency for Builders, Creative Workflows, and Advanced System Architecture.
* **Interactive High-Res Lightbox:** Deep inspection modal featuring zoom capabilities, badge verification IDs, curriculum syllabus breakdowns, and 1-click clipboard citation.

### 4. 📄 In-Memory Master CV Generation & Viewer (`MasterCVSection.jsx` & `MasterCVModal.jsx`)
* **Multi-Tab Career Dossier:** Interactive preview for Profile Summary, Academic Background (TASFUED Computer Science), Industrial Training (InfoSystem Consulting SIWES), Technical Skills, and Plain-Text Resume.
* **Automated Document Exporter:** Generates both formatted **Microsoft Word (`.doc`)** and **PDF 1.4 (`.pdf`)** resumes directly on the fly.

### 5. ⚡ Master Control Admin Command Center (`/admin`)
* **Full Content Independence:** Manage projects, certificates, copywriting, and contact details without editing source code or redeploying.
* **Device Gallery Image Uploader:** Directly upload photos from your phone or desktop with client-side canvas Base64 compression (~80KB–180KB WebP) to prevent `localStorage` quota overflow while rendering high-DPI screenshots live.
* **Master CV Vault:** Upload updated `.pdf`, `.docx`, or `.doc` resume files directly through the dashboard.
* **Security Gate:** Alphanumeric password protection with session persistence and custom passcode updates.
* **1-Click Code Config Exporter:** Instant export of updated state into clean JavaScript (`portfolioData.js`) or formatted JSON.

### 6. 🌗 System-Aware Dark & Light Corporate View (`ThemeContext.jsx`)
* **Automatic OS Detection:** Checks visitor's `prefers-color-scheme` on initial load to default seamlessly to either Dark Cyber View or Crisp Corporate Light View.
* **High-Contrast Readability:** Pristine slate-900 typography, subtle borders, frosted glass surfaces, and ambient video backdrops in both modes.

### 7. 🕹️ Offline Resiliency & "Neon Cyber-Runner 2.0" Arcade (`OfflineStatusOverlay.jsx`)
* **Fault-Tolerant Network Listener:** Automatically detects lost connections on mobile 3G/4G networks.
* **60 FPS Canvas Arcade Game:** Built-in runner featuring jet double-jump physics, laser firewalls, glitch drones, collectible data crystals, plasma shields, combo multipliers, and high score tracking.
* **Auto-Sync on Reconnect:** Instantly resumes normal portfolio browsing upon internet restoration without manual refresh.

---

## 🛠️ Technology Stack & Dependencies

| Layer | Technologies & Tools |
| :--- | :--- |
| **Core Framework** | React 19.1, Vite 6.3 (ESModules, HMR) |
| **Routing** | React Router DOM v7 (SPA with lazy-loading & Suspense) |
| **Styling & Design System** | Tailwind CSS v4.1, Custom Cyber-HUD CSS Tokens |
| **Animation Engine** | Framer Motion 11.18 (Hardware-Accelerated Transforms, Spring Physics) |
| **Icons & Visuals** | Lucide React, Custom SVG Battlement Glyphs |
| **Graphics & Mini-Game** | HTML5 Canvas 2D Engine (60 FPS Game Loop) |
| **Mobile Stack Context** | Flutter, Dart, Riverpod 2.0, Firebase, Supabase, PostgreSQL |
| **Deployment & CI/CD** | Netlify (SPA Redirects, Immutable Asset Caching) |

---

## 📂 Project Structure

```bash
Portfolio/
├── public/
│   ├── certificates/           # Claude Academy verification badges
│   ├── screenshots/            # Project previews & mobile screenshots
│   ├── videos/                 # Background video stream
│   ├── _redirects              # Netlify SPA routing fallback
│   ├── Samuel_Patrick_Master_CV.doc
│   └── Samuel_Patrick_Software_Engineer_CV.pdf
├── scripts/
│   └── build_cv_assets.js      # Pure Node.js PDF & Word CV build script
├── src/
│   ├── components/
│   │   ├── admin/              # AdminAuthGate, ImageUploader, SiteContentEditor, etc.
│   │   ├── ui/                 # DeviceViewports, HUDCorners, SectionBadge, ThemeToggle
│   │   ├── CertificateLightboxModal.jsx
│   │   ├── ContactModal.jsx
│   │   ├── FloatingTelemetryCards.jsx
│   │   ├── MasterCVModal.jsx
│   │   ├── OfflineStatusOverlay.jsx  # 60 FPS Cyber-Runner Arcade Game
│   │   ├── TelemetryHUD.jsx          # Segmented Control Deck Header
│   │   └── TransmissionFooter.jsx
│   ├── context/
│   │   ├── PortfolioDataContext.jsx  # Central data store with localStorage sync
│   │   └── ThemeContext.jsx          # OS-aware Dark/Light mode provider
│   ├── data/
│   │   ├── portfolioData.js    # Master portfolio configuration & projects
│   │   └── projectThemes.js    # Dynamic color & glow matrices
│   ├── pages/
│   │   ├── PortfolioHome.jsx   # Public landing page with modular suspense
│   │   └── AdminDashboard.jsx  # Lazy-loaded /admin command center
│   ├── sections/
│   │   ├── HeroSection.jsx
│   │   ├── SkillsMatrix.jsx
│   │   ├── AICredentialVault.jsx
│   │   ├── AboutTerminal.jsx
│   │   ├── ProjectNodes.jsx
│   │   └── MasterCVSection.jsx
│   ├── utils/
│   │   ├── cvDocGenerator.js   # Dynamic resume generation
│   │   └── fileUploadHelper.js # Canvas Base64 compression & file readers
│   ├── App.jsx                 # Route orchestration & code-splitting
│   ├── index.css               # Design system tokens & animations
│   └── main.jsx
├── netlify.toml                # Netlify build & cache header configurations
├── package.json
├── vite.config.js
└── README.md
```

---

## 💻 Local Development Setup

### Prerequisites
* **Node.js**: `v18.0.0` or higher
* **npm**: `v9.0.0` or higher

### 1. Clone the Repository
```bash
git clone https://github.com/ESCANOR-dev-afro/Portfolio.git
cd Portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Local Development Server
```bash
npm run dev
```
Open your browser and navigate to:
* Public Portfolio: [http://localhost:5173](http://localhost:5173)
* Admin Command Center: [http://localhost:5173/admin](http://localhost:5173/admin) *(Default passcode: `escanor2026`)*

### 4. Build for Production
```bash
npm run build
```
This runs `scripts/build_cv_assets.js` to synchronize certificates and compile optimized, code-split chunks in the `dist/` directory.

### 5. Preview Production Build Locally
```bash
npm run preview
```

---

## 🌐 Multi-Platform Production Deployment (Netlify & Vercel)

This project is configured out-of-the-box for seamless deployment on both **Netlify** and **Vercel** with full client-side SPA routing and long-term caching.

### 1. Netlify (`netlify.toml` & `public/_redirects`)
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 2. Vercel (`vercel.json`)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 📬 Contact & Connect

* **Engineer:** Samuel Imole Patrick (`ESCANOR`)
* **Email:** [samuelimolepatrick@gmail.com](mailto:samuelimolepatrick@gmail.com)
* **Phone / WhatsApp:** [+234 814 922 4954](tel:+2348149224954)
* **Portfolio:** [about-sammy.netlify.app](https://about-sammy.netlify.app)
* **GitHub:** [@ESCANOR-dev-afro](https://github.com/ESCANOR-dev-afro)
* **LinkedIn:** [Samuel Patrick](https://www.linkedin.com/in/samuel-patrick-722b82423)
* **TikTok:** [@sammy.dev1](https://www.tiktok.com/@sammy.dev1)

---

## 📄 License & Attribution

Designed and developed by **Samuel Imole Patrick (ESCANOR)**.  
Open-source under the [MIT License](LICENSE).
