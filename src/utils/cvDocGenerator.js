/**
 * Master CV Document Generator (Executive Microsoft Word .doc & Formatted HTML)
 * Samuel Imole Patrick (Samuel Patrick / ESCANOR)
 * Full-Stack Web & Mobile Application Developer
 */

export const masterCVText = `================================================================================
SAMUEL IMOLE PATRICK (SAMUEL PATRICK)
FULL-STACK WEB & MOBILE APPLICATION DEVELOPER
================================================================================

CONTACT & PROFILE:
• Location: Mowe, Ogun State, Nigeria
• Email: samuelimolepatrick@gmail.com
• Phone: +234 814 922 4954
• LinkedIn: https://www.linkedin.com/in/samuel-patrick-722b82423
• GitHub: https://github.com/ESCANOR-dev-afro
• TikTok: @sammy.dev1 (https://www.tiktok.com/@sammy.dev1)
• Portfolio: https://about-sammy.vercel.app

================================================================================
EXECUTIVE PROFILE & SUMMARY
================================================================================
Passionate Full-Stack Software Engineer with proven expertise in building 
reliable, production-ready web and mobile applications. Specialized in full-lifecycle 
development using React, Next.js, TypeScript, Flutter, Dart, Supabase, and 
PostgreSQL. Dedicated to clean code, well-structured databases, fast response 
times, and smooth mobile experiences.

================================================================================
EDUCATION & ACADEMIC BACKGROUND
================================================================================
Degree Program: Bachelor of Science (B.Sc.) in Computer Science
Institution: Tai Solarin Federal University of Education (TASFUED), Ogun State, Nigeria
Academic Status: Enrolled • Strong Academic Standing
Key Focus Areas:
• Core Algorithms & Data Structures
• Relational Database Architecture & Query Optimization
• Advanced Software Engineering Principles & System Design
• Operating Systems, Concurrency, and Computer Networking

================================================================================
PROFESSIONAL EXPERIENCE & INDUSTRIAL TRAINING
================================================================================
Role: Software Engineering & Database Architecture Intern (SIWES)
Organization: InfoSystem Consulting
Duration: 3-Month Intensive Industrial Training Program
Key Contributions & Achievements:
• Engineered a secure, offline-first exam and grading system for the AWBA CBT platform.
• Implemented local SQLite and IndexedDB sync so exams continue uninterrupted during power or network outages.
• Built real-time student monitoring tools and anti-cheat exam safeguards.
• Designed normalized database schemas and fast server endpoints for seamless test management.

================================================================================
CORE TECHNICAL STACK & SKILLS
================================================================================
• Frontend Web: React, Next.js, JavaScript (ES6+), TypeScript, Tailwind CSS, Vite, Netlify.
• Mobile Engineering: Flutter, Dart, Riverpod, GoRouter, Firebase, Supabase Auth.
• Backend, Desktop & Database: Node.js, Electron Desktop, Supabase, PostgreSQL, Firebase Firestore, IndexedDB / Local SQLite, REST APIs.
• Development Tools & Workflows: Git, GitHub, Cursor AI, VS Code, Figma, Postman.

================================================================================
FEATURED PRODUCTION PROJECTS
================================================================================
1. TASFUED MARKETPLACE (Campus P2P Commerce)
   • URL: https://tasfuedmarketplace.com.ng
   • Tech Stack: React, Vite, Tailwind CSS, Supabase, PostgreSQL
   • Overview: Dedicated campus marketplace connecting university students for peer-to-peer commerce, featuring direct WhatsApp chat, seller profiles, fast search, and real-time inventory management.

2. SCHEDULER (Mobile Schedule Management)
   • URL: https://scheduler.nexlify.com.ng
   • Tech Stack: Flutter, Dart, Supabase, Riverpod
   • Overview: Academic scheduling and lecture management mobile app with role-based access for students and lecturers, offline timetable sync, and automated lecture reminders.

3. AWBA CBT PLATFORM (Offline-First Examination Engine)
   • Tech Stack: React, Node.js, Electron, IndexedDB / Local SQLite, Tailwind CSS
   • Overview: Offline-first computer-based examination system engineered during my SIWES internship at InfoSystem Consulting. Features local SQLite database sync, automated instant grading, and anti-cheat exam security.

4. FINTECH PLATFORM & NEO-BANKING CORE
   • Tech Stack: Flutter, Firebase, Node.js, Riverpod
   • Overview: Digital wallet and banking mobile app built with double-entry ledger bookkeeping, peer-to-peer money transfers, and dynamic biometric/PIN security.

5. SARKIN MOTA GROUP (Luxury Automotive Dealership)
   • Tech Stack: Next.js, TypeScript, Tailwind CSS, GSAP
   • Overview: Modern digital dealership platform for high-end luxury vehicles with dynamic car inventory cataloging, inspection booking, and interactive vehicle viewing.

6. THE GILDED TABLE (Mobile App)
   • Tech Stack: Flutter, Dart, Supabase Auth, PostgreSQL
   • Overview: Luxury restaurant companion app providing interactive real-time table reservations, digital tasting menus, and guest profile management.

7. THE GILDED TABLE (Web App)
   • Tech Stack: Next.js, TypeScript, Supabase, Tailwind CSS, PostgreSQL
   • Overview: Full-scale restaurant management system featuring live table occupancy tracking, digital order dispatch, and a comprehensive operations dashboard.

================================================================================
[ Official Resume & Engineering Portfolio — Samuel Imole Patrick ]
================================================================================`;

/**
 * Generate formatted HTML document optimized for Microsoft Word (.doc) rendering
 */
export function generateMasterCVDocHTML() {
  return `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset="utf-8">
  <title>Samuel Imole Patrick - Master CV</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    @page Section1 {
      size: 21.0cm 29.7cm;
      margin: 1.8cm 1.8cm 1.8cm 1.8cm;
      mso-header-margin: 1.0cm;
      mso-footer-margin: 1.0cm;
      mso-paper-source: 0;
    }
    div.Section1 {
      page: Section1;
    }
    body {
      font-family: 'Segoe UI', Calibri, Arial, sans-serif;
      font-size: 10pt;
      line-height: 1.45;
      color: #1f2937;
      background-color: #ffffff;
      margin: 0;
      padding: 0;
    }
    h1 {
      font-size: 20pt;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 2px 0;
      letter-spacing: -0.5px;
      text-transform: uppercase;
    }
    .subtitle {
      font-size: 11.5pt;
      font-weight: 700;
      color: #b45309;
      margin: 0 0 10px 0;
      letter-spacing: 0.5px;
    }
    .contact-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 14px;
      border-bottom: 1.5pt solid #cbd5e1;
      padding-bottom: 8px;
    }
    .contact-table td {
      font-size: 9pt;
      color: #475569;
      padding: 2px 0;
      vertical-align: middle;
    }
    .contact-table a {
      color: #b45309;
      text-decoration: none;
      font-weight: 600;
    }
    h2.section-title {
      font-size: 11.5pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin: 16px 0 6px 0;
      padding-bottom: 3px;
      border-bottom: 2pt solid #d97706;
    }
    p {
      margin: 0 0 8px 0;
      color: #334155;
      font-size: 9.5pt;
      text-align: justify;
    }
    .entry-header {
      width: 100%;
      border-collapse: collapse;
      margin-top: 8px;
      margin-bottom: 2px;
    }
    .entry-title {
      font-size: 10pt;
      font-weight: 700;
      color: #0f172a;
    }
    .entry-org {
      font-size: 9.5pt;
      font-weight: 600;
      color: #b45309;
    }
    .entry-date {
      font-size: 9pt;
      font-weight: 600;
      color: #64748b;
      text-align: right;
    }
    ul {
      margin: 4px 0 10px 18px;
      padding: 0;
    }
    li {
      margin-bottom: 3px;
      color: #334155;
      font-size: 9pt;
      line-height: 1.4;
    }
    .skill-table {
      width: 100%;
      border-collapse: collapse;
      margin: 6px 0 12px 0;
    }
    .skill-table td {
      padding: 4px 6px;
      font-size: 9pt;
      border: 1px solid #e2e8f0;
      vertical-align: top;
    }
    .skill-label {
      font-weight: 700;
      color: #0f172a;
      width: 25%;
      background-color: #f8fafc;
    }
    .skill-value {
      color: #334155;
      width: 75%;
    }
    .project-card {
      margin-bottom: 10px;
      padding-bottom: 6px;
      border-bottom: 1px dashed #e2e8f0;
    }
    .project-title {
      font-size: 10pt;
      font-weight: 700;
      color: #0f172a;
    }
    .project-stack {
      font-size: 8.5pt;
      font-weight: 700;
      color: #b45309;
      font-family: Consolas, 'Courier New', monospace;
    }
    .project-desc {
      font-size: 9pt;
      color: #475569;
      margin-top: 2px;
    }
    .footer-note {
      text-align: center;
      font-size: 8pt;
      color: #94a3b8;
      margin-top: 20px;
      padding-top: 8px;
      border-top: 1px solid #e2e8f0;
    }
  </style>
</head>
<body>
  <div class="Section1">
    <!-- Header -->
    <h1>Samuel Imole Patrick</h1>
    <div class="subtitle">FULL-STACK WEB &amp; MOBILE APPLICATION DEVELOPER (ESCANOR)</div>

    <!-- Contact Telemetry Table -->
    <table class="contact-table">
      <tr>
        <td style="width: 50%;"><strong>Location:</strong> Mowe, Ogun State, Nigeria</td>
        <td style="width: 50%;"><strong>Email:</strong> <a href="mailto:samuelimolepatrick@gmail.com">samuelimolepatrick@gmail.com</a></td>
      </tr>
      <tr>
        <td><strong>Phone / WhatsApp:</strong> +234 814 922 4954</td>
        <td><strong>Portfolio:</strong> <a href="https://about-sammy.vercel.app">about-sammy.vercel.app</a></td>
      </tr>
      <tr>
        <td><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/samuel-patrick-722b82423">linkedin.com/in/samuel-patrick-722b82423</a></td>
        <td><strong>GitHub:</strong> <a href="https://github.com/ESCANOR-dev-afro">github.com/ESCANOR-dev-afro</a></td>
      </tr>
    </table>

    <!-- Executive Summary -->
    <h2 class="section-title">Executive Profile &amp; Summary</h2>
    <p>
      Results-driven Full-Stack Software Engineer with proven expertise in engineering reliable, production-ready applications across mobile, web, and cloud backends. Combines deep Computer Science fundamentals with modern full-stack development to deliver fast, secure, and user-friendly digital systems. Demonstrated track record building smooth native mobile apps in Flutter and Dart, responsive web applications with React, Next.js, and TypeScript, and scalable database architectures powered by PostgreSQL and Supabase.
    </p>

    <!-- Education -->
    <h2 class="section-title">Education &amp; Academic Background</h2>
    <table class="entry-header">
      <tr>
        <td class="entry-title">Bachelor of Science (B.Sc.) in Computer Science</td>
        <td class="entry-date">Enrolled • Strong Academic Standing</td>
      </tr>
      <tr>
        <td class="entry-org" colspan="2">Tai Solarin Federal University of Education (TASFUED), Ogun State, Nigeria</td>
      </tr>
    </table>
    <ul>
      <li><strong>Core Rigor:</strong> Core Algorithms, Relational Database Systems, Operating Systems, Concurrency, and System Design.</li>
      <li><strong>Key Projects:</strong> TASFUED Marketplace (campus-wide peer-to-peer commerce platform) and SCHEDULER (academic timetable management mobile app).</li>
    </ul>

    <!-- Professional Experience -->
    <h2 class="section-title">Professional Experience &amp; Industrial Training</h2>
    <table class="entry-header">
      <tr>
        <td class="entry-title">Software Engineering &amp; Database Architecture Intern (SIWES)</td>
        <td class="entry-date">3-Month Intensive Program</td>
      </tr>
      <tr>
        <td class="entry-org" colspan="2">InfoSystem Consulting</td>
      </tr>
    </table>
    <ul>
      <li><strong>Offline-First CBT Architecture:</strong> Core engineer on the AWBA offline Computer-Based Testing platform utilizing React, Node.js, and local SQLite / IndexedDB sync for zero-latency localized exam administration.</li>
      <li><strong>Anti-Cheat &amp; Integrity Controls:</strong> Implemented kiosk window lockdown protocols, blur-violation triggers, and real-time student monitoring tools.</li>
      <li><strong>Data Resiliency:</strong> Engineered fault-tolerant background data synchronization ensuring zero loss of exam progress during network or power interruptions.</li>
      <li><strong>Database Engineering:</strong> Designed normalized relational database schemas, secure authentication flows, and automated result processing engines.</li>
    </ul>

    <!-- Technical Skills -->
    <h2 class="section-title">Core Technical Stack &amp; Skills</h2>
    <table class="skill-table">
      <tr>
        <td class="skill-label">Frontend Web</td>
        <td class="skill-value">React, Next.js, JavaScript (ES6+), TypeScript, Tailwind CSS, Vite, HTML5, CSS3, Netlify</td>
      </tr>
      <tr>
        <td class="skill-label">Mobile Development</td>
        <td class="skill-value">Flutter, Dart, Riverpod State Management, GoRouter, Firebase Authentication, Mobile Offline Caching</td>
      </tr>
      <tr>
        <td class="skill-label">Backend &amp; Databases</td>
        <td class="skill-value">Node.js, Supabase, PostgreSQL, Firebase Firestore, SQLite, IndexedDB, RESTful APIs</td>
      </tr>
      <tr>
        <td class="skill-label">Tools &amp; Workflows</td>
        <td class="skill-value">Git, GitHub, VS Code, Cursor AI, Figma UI Prototyping, Postman</td>
      </tr>
    </table>

    <!-- Verified Projects -->
    <h2 class="section-title">Featured Production Projects</h2>

    <div class="project-card">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td class="project-title">1. TASFUED MARKETPLACE (Campus P2P Commerce)</td>
          <td style="text-align: right; font-size: 8.5pt;"><a href="https://tasfuedmarketplace.com.ng" style="color: #b45309; font-weight: bold; text-decoration: none;">Live Platform ↗</a></td>
        </tr>
      </table>
      <div class="project-stack">Stack: React, Vite, Tailwind CSS, Supabase, PostgreSQL</div>
      <div class="project-desc">Dedicated campus marketplace connecting university students for peer-to-peer commerce, featuring direct WhatsApp chat, seller profiles, fast search, and real-time inventory management.</div>
    </div>

    <div class="project-card">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td class="project-title">2. SCHEDULER (Mobile Schedule Management)</td>
          <td style="text-align: right; font-size: 8.5pt;"><a href="https://scheduler.nexlify.com.ng" style="color: #b45309; font-weight: bold; text-decoration: none;">Live App ↗</a></td>
        </tr>
      </table>
      <div class="project-stack">Stack: Flutter, Dart, Supabase, Riverpod</div>
      <div class="project-desc">Academic scheduling and lecture management mobile app with role-based access for students and lecturers, offline timetable sync, and automated lecture reminders.</div>
    </div>

    <div class="project-card">
      <div class="project-title">3. AWBA CBT PLATFORM (Offline-First Examination Engine)</div>
      <div class="project-stack">Stack: React, Node.js, Electron, IndexedDB / SQLite, Tailwind CSS</div>
      <div class="project-desc">Offline-first computer-based examination system engineered during my SIWES internship at InfoSystem Consulting. Features local SQLite database sync, automated instant grading, and anti-cheat exam security.</div>
    </div>

    <div class="project-card">
      <div class="project-title">4. FINTECH PLATFORM &amp; NEO-BANKING CORE</div>
      <div class="project-stack">Stack: Flutter, Firebase, Node.js, Riverpod</div>
      <div class="project-desc">Digital wallet and banking mobile app built with double-entry ledger bookkeeping, peer-to-peer money transfers, and dynamic biometric/PIN security.</div>
    </div>

    <div class="project-card">
      <div class="project-title">5. SARKIN MOTA GROUP (Luxury Automotive Dealership)</div>
      <div class="project-stack">Stack: Next.js, TypeScript, Tailwind CSS, GSAP</div>
      <div class="project-desc">Modern digital dealership platform for high-end luxury vehicles with dynamic car inventory cataloging, inspection booking, and interactive vehicle viewing.</div>
    </div>

    <div class="project-card">
      <div class="project-title">6. THE GILDED TABLE (Mobile App)</div>
      <div class="project-stack">Stack: Flutter, Dart, Supabase Auth, PostgreSQL</div>
      <div class="project-desc">Luxury restaurant companion app providing interactive real-time table reservations, digital tasting menus, and guest profile management.</div>
    </div>

    <div class="project-card" style="border-bottom: none;">
      <div class="project-title">7. THE GILDED TABLE (Web App)</div>
      <div class="project-stack">Stack: Next.js, TypeScript, Supabase, Tailwind CSS, PostgreSQL</div>
      <div class="project-desc">Full-scale restaurant management system featuring live table occupancy tracking, digital order dispatch, and a comprehensive operations dashboard.</div>
    </div>

    <!-- Footer Note -->
    <div class="footer-note">
      Official Resume &amp; Portfolio • Samuel Imole Patrick • <a href="https://about-sammy.vercel.app" style="color: #b45309; text-decoration: none;">about-sammy.vercel.app</a>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Trigger direct download of Official Master CV in clean Microsoft Word (.doc) format
 * Uses pre-formatted Word XML dossier with zero DOM scraping and application/msword MIME type.
 */
export async function downloadMasterCVDoc(filename = 'Samuel_Patrick_Master_CV.doc') {
  try {
    const response = await fetch('/' + filename);
    if (response.ok) {
      const blob = await response.blob();
      const docBlob = new Blob([blob], { type: 'application/msword;charset=utf-8' });
      const url = URL.createObjectURL(docBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 2000);
      return;
    }
  } catch (err) {
    console.warn('Fallback direct link trigger for CV download:', err);
  }

  // Direct anchor trigger fallback
  const link = document.createElement('a');
  link.href = '/' + filename;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Trigger direct download of Official Master CV in clean, professional PDF format
 */
export function downloadMasterCVPdf(filename = 'Samuel_Patrick_Software_Engineer_CV.pdf') {
  const link = document.createElement('a');
  link.href = '/' + filename;
  link.download = filename;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


