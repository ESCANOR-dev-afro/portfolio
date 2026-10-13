import fs from 'fs';
import path from 'path';

/**
 * Pure Node.js PDF 1.4 Document Generator for Samuel Patrick
 */
class PDFBuilder {
  constructor() {
    this.objects = [];
  }

  addObject(content) {
    this.objects.push(content);
    return this.objects.length;
  }

  buildDocument(pagesContent) {
    const fontNormalId = this.addObject(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>`);
    const fontBoldId = this.addObject(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>`);
    const fontObliqueId = this.addObject(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>`);

    const pageObjIds = [];
    for (let i = 0; i < pagesContent.length; i++) {
      pageObjIds.push(this.objects.length + i + 1);
    }

    const pagesRootId = this.addObject('');

    const createdPageIds = [];
    for (let i = 0; i < pagesContent.length; i++) {
      const pageData = pagesContent[i];
      const streamBytes = Buffer.from(pageData.stream, 'utf-8');
      const contentId = this.addObject(`<< /Length ${streamBytes.length} >>\nstream\n${pageData.stream}\nendstream`);
      
      let annotsStr = '';
      if (pageData.annotations && pageData.annotations.length > 0) {
        const annotIds = [];
        for (const annot of pageData.annotations) {
          const aId = this.addObject(`<< /Type /Annot /Subtype /Link /Rect [${annot.x1} ${annot.y1} ${annot.x2} ${annot.y2}] /Border [0 0 0] /A << /S /URI /URI (${annot.url}) >> >>`);
          annotIds.push(`${aId} 0 R`);
        }
        annotsStr = `/Annots [ ${annotIds.join(' ')} ]`;
      }

      const pageId = this.addObject(`<< /Type /Page /Parent ${pagesRootId} 0 R /MediaBox [0 0 595.28 841.89] /Contents ${contentId} 0 R /Resources << /Font << /F1 ${fontNormalId} 0 R /F2 ${fontBoldId} 0 R /F3 ${fontObliqueId} 0 R >> >> ${annotsStr} >>`);
      createdPageIds.push(pageId);
    }

    this.objects[pagesRootId - 1] = `<< /Type /Pages /Kids [ ${createdPageIds.map(id => `${id} 0 R`).join(' ')} ] /Count ${createdPageIds.length} >>`;

    const catalogId = this.addObject(`<< /Type /Catalog /Pages ${pagesRootId} 0 R >>`);

    let out = '%PDF-1.4\n%\xE2\xE3\xCF\xD3\n';
    const xrefOffsets = [0];

    for (let i = 0; i < this.objects.length; i++) {
      xrefOffsets.push(Buffer.byteLength(out, 'utf-8'));
      out += `${i + 1} 0 obj\n${this.objects[i]}\nendobj\n`;
    }

    const startXref = Buffer.byteLength(out, 'utf-8');
    out += `xref\n0 ${this.objects.length + 1}\n`;
    out += `0000000000 65535 f \n`;
    for (let i = 1; i <= this.objects.length; i++) {
      const offset = String(xrefOffsets[i]).padStart(10, '0');
      out += `${offset} 00000 n \n`;
    }

    out += `trailer\n<< /Size ${this.objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${startXref}\n%%EOF\n`;

    return Buffer.from(out, 'utf-8');
  }
}

function escapePDF(str) {
  return str.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

function generateSamuelPatrickCV() {
  const builder = new PDFBuilder();

  // Page 1: Profile, Contact, Executive Summary, Technical Arsenal, Academic Background, Work Experience
  let p1Stream = '';
  const p1Annots = [];

  // Accent bar top (Cyber Orange)
  p1Stream += `0.85 0.35 0.05 rg\n0 835 595.28 6.89 re\nf\n`;
  // Dark header background banner
  p1Stream += `0.06 0.08 0.11 rg\n0 735 595.28 100 re\nf\n`;

  // Top header text
  p1Stream += `BT\n/F2 20 Tf\n1 1 1 rg\n40 795 Td\n(${escapePDF('SAMUEL IMOLE PATRICK')}) Tj\nET\n`;
  p1Stream += `BT\n/F2 9.5 Tf\n0.98 0.45 0.08 rg\n40 778 Td\n(${escapePDF('FULL-STACK SOFTWARE ENGINEER | MOBILE & WEB ARCHITECT')}) Tj\nET\n`;

  // Contact line
  p1Stream += `BT\n/F1 8.5 Tf\n0.8 0.85 0.9 rg\n40 755 Td\n(${escapePDF('Email: samuelimolepatrick@gmail.com   |   Phone: +234 814 922 4954   |   Location: Mowe, Ogun State, Nigeria')}) Tj\nET\n`;
  p1Annots.push({ x1: 65, y1: 752, x2: 215, y2: 765, url: 'mailto:samuelimolepatrick@gmail.com' });
  p1Annots.push({ x1: 260, y1: 752, x2: 350, y2: 765, url: 'tel:+2348149224954' });

  p1Stream += `BT\n/F1 8.5 Tf\n0.8 0.85 0.9 rg\n40 742 Td\n(${escapePDF('Portfolio: about-sammy.vercel.app   |   GitHub: github.com/ESCANOR-dev-afro   |   LinkedIn: samuel-patrick')}) Tj\nET\n`;
  p1Annots.push({ x1: 75, y1: 739, x2: 185, y2: 752, url: 'https://about-sammy.vercel.app' });
  p1Annots.push({ x1: 230, y1: 739, x2: 385, y2: 752, url: 'https://github.com/ESCANOR-dev-afro' });
  p1Annots.push({ x1: 435, y1: 739, x2: 520, y2: 752, url: 'https://www.linkedin.com/in/samuel-patrick-722b82423' });

  let y = 710;

  function drawSection(title) {
    p1Stream += `BT\n/F2 11 Tf\n0.85 0.35 0.05 rg\n40 ${y} Td\n(${escapePDF(title.toUpperCase())}) Tj\nET\n`;
    p1Stream += `0.85 0.35 0.05 RG\n1 w\n40 ${y - 4} m 555 ${y - 4} l\nS\n`;
    y -= 18;
  }

  // Section 1: Executive Profile
  drawSection('Executive Profile & Engineering Summary');
  p1Stream += `BT\n/F1 9 Tf\n0.15 0.18 0.22 rg\n40 ${y} Td\n(${escapePDF('Results-driven Full-Stack Software Engineer with proven capability in architecting resilient, production-ready')}) Tj\nET\n`;
  y -= 13;
  p1Stream += `BT\n/F1 9 Tf\n0.15 0.18 0.22 rg\n40 ${y} Td\n(${escapePDF('applications across mobile, web, and distributed backend environments. Demonstrated track record building 60FPS+')}) Tj\nET\n`;
  y -= 13;
  p1Stream += `BT\n/F1 9 Tf\n0.15 0.18 0.22 rg\n40 ${y} Td\n(${escapePDF('Flutter native apps, high-throughput React & Next.js platforms, and offline-first PostgreSQL/Supabase database systems.')}) Tj\nET\n`;
  y -= 13;
  p1Stream += `BT\n/F1 9 Tf\n0.15 0.18 0.22 rg\n40 ${y} Td\n(${escapePDF('Specialized in Clean Architecture, Riverpod state orchestration, double-entry ledgers, and secure authentication.')}) Tj\nET\n`;
  y -= 22;

  // Section 2: Technical Skills
  drawSection('Technical Skills & Core Arsenal');
  const skillGroups = [
    { label: 'Mobile Engineering:', text: 'Flutter, Dart, Riverpod, GoRouter, Firebase Core/Firestore, Supabase Mobile, Offline-First Sync' },
    { label: 'Frontend Web Stack:', text: 'React.js, Next.js (App Router), TypeScript, JavaScript (ES6+), Tailwind CSS, Vite, HTML5, REST APIs' },
    { label: 'Backend & Databases:', text: 'Node.js, Express, PostgreSQL, Supabase, Firebase Firestore, SQLite, IndexedDB, Database Design' },
    { label: 'System Architecture:', text: 'Clean Architecture, State Management, Double-Entry Ledgers, Kiosk Lockdown, Real-time WebSockets' },
    { label: 'Developer Tools:', text: 'Git, GitHub, VS Code, Cursor AI, Figma, Postman, Linux CLI, Netlify, Vercel' },
  ];

  for (const group of skillGroups) {
    p1Stream += `BT\n/F2 9 Tf\n0.1 0.12 0.16 rg\n40 ${y} Td\n(${escapePDF('• ' + group.label)}) Tj\nET\n`;
    p1Stream += `BT\n/F1 9 Tf\n0.25 0.28 0.35 rg\n165 ${y} Td\n(${escapePDF(group.text)}) Tj\nET\n`;
    y -= 14;
  }
  y -= 10;

  // Section 3: Professional Experience
  drawSection('Professional Experience & Industrial Training');
  p1Stream += `BT\n/F2 10 Tf\n0.1 0.12 0.16 rg\n40 ${y} Td\n(${escapePDF('Software Engineering & Database Architecture Intern (SIWES)')}) Tj\nET\n`;
  p1Stream += `BT\n/F1 9 Tf\n0.4 0.45 0.5 rg\n400 ${y} Td\n(${escapePDF('InfoSystem Consulting | Nigeria')}) Tj\nET\n`;
  y -= 14;

  const expBullets = [
    'Engineered offline-first localized examination engine (AWBA CBT Platform) serving concurrent candidates with zero network latency.',
    'Architected fault-tolerant SQLite/IndexedDB synchronization protocols ensuring 100% exam data integrity during unexpected shutdowns.',
    'Constructed kiosk lockdown security rules preventing window defocus, external process spawning, and unauthorized data tampering.',
    'Engineered automated result compilation pipeline reducing exam processing and transcript generation time from hours to seconds.',
  ];

  for (const b of expBullets) {
    p1Stream += `BT\n/F1 8.8 Tf\n0.2 0.23 0.28 rg\n50 ${y} Td\n(${escapePDF('▸  ' + b)}) Tj\nET\n`;
    y -= 13;
  }
  y -= 10;

  // Section 4: Education
  drawSection('Education & Academic Background');
  p1Stream += `BT\n/F2 10 Tf\n0.1 0.12 0.16 rg\n40 ${y} Td\n(${escapePDF('Bachelor of Science (B.Sc.) in Computer Science')}) Tj\nET\n`;
  p1Stream += `BT\n/F1 9 Tf\n0.4 0.45 0.5 rg\n370 ${y} Td\n(${escapePDF('TASFUED, Ogun State | Enrolled (High GPA)')}) Tj\nET\n`;
  y -= 13;
  p1Stream += `BT\n/F1 8.8 Tf\n0.25 0.28 0.35 rg\n40 ${y} Td\n(${escapePDF('Institution: Tai Solarin Federal University of Education • Focus: Data Structures, Algorithms, Systems Architecture & Networking')}) Tj\nET\n`;

  // Page 1 Footer
  p1Stream += `0.85 0.88 0.92 RG\n0.5 w\n40 30 m 555 30 l\nS\n`;
  p1Stream += `BT\n/F1 7.5 Tf\n0.5 0.55 0.6 rg\n40 18 Td\n(${escapePDF('Samuel Imole Patrick • Master Curriculum Vitae • Page 1 of 2')}) Tj\nET\n`;
  p1Stream += `BT\n/F1 7.5 Tf\n0.5 0.55 0.6 rg\n450 18 Td\n(${escapePDF('Verified Portfolio: about-sammy.vercel.app')}) Tj\nET\n`;

  // --------------------------------------------------------------------------
  // Page 2: Key Production Deployments & Engineering Nodes
  // --------------------------------------------------------------------------
  let p2Stream = '';
  const p2Annots = [];

  // Accent bar top
  p2Stream += `0.85 0.35 0.05 rg\n0 835 595.28 6.89 re\nf\n`;
  // Dark header banner
  p2Stream += `0.06 0.08 0.11 rg\n0 775 595.28 60 re\nf\n`;

  p2Stream += `BT\n/F2 14 Tf\n1 1 1 rg\n40 805 Td\n(${escapePDF('VERIFIED PRODUCTION DEPLOYMENTS & ENGINEERING NODES')}) Tj\nET\n`;
  p2Stream += `BT\n/F1 8.5 Tf\n0.8 0.85 0.9 rg\n40 788 Td\n(${escapePDF('Detailed technical architecture for deployed web, mobile, and enterprise platforms.')}) Tj\nET\n`;

  let y2 = 750;

  function drawProjectCard(num, title, category, stack, liveUrl, bullets) {
    p2Stream += `0.96 0.97 0.98 rg\n40 ${y2 - 68} 515 78 re\nf\n`;
    p2Stream += `0.85 0.88 0.92 RG\n0.75 w\n40 ${y2 - 68} 515 78 re\nS\n`;
    p2Stream += `0.85 0.35 0.05 rg\n40 ${y2 - 68} 4 78 re\nf\n`;

    p2Stream += `BT\n/F2 10 Tf\n0.1 0.12 0.16 rg\n52 ${y2 - 2} Td\n(${escapePDF(`${num}. ${title}`)}) Tj\nET\n`;
    p2Stream += `BT\n/F3 8.5 Tf\n0.5 0.55 0.6 rg\n260 ${y2 - 2} Td\n(${escapePDF(`// ${category}`)}) Tj\nET\n`;

    if (liveUrl) {
      p2Stream += `BT\n/F2 8.5 Tf\n0.85 0.35 0.05 rg\n450 ${y2 - 2} Td\n(${escapePDF('Live URL ↗')}) Tj\nET\n`;
      p2Annots.push({ x1: 450, y1: y2 - 4, x2: 540, y2: y2 + 8, url: liveUrl });
    }

    p2Stream += `BT\n/F2 8 Tf\n0.35 0.38 0.42 rg\n52 ${y2 - 14} Td\n(${escapePDF('TECH STACK:')}) Tj\nET\n`;
    p2Stream += `BT\n/F1 8 Tf\n0.85 0.35 0.05 rg\n115 ${y2 - 14} Td\n(${escapePDF(stack)}) Tj\nET\n`;

    let by = y2 - 27;
    for (const b of bullets) {
      p2Stream += `BT\n/F1 8 Tf\n0.2 0.23 0.28 rg\n52 ${by} Td\n(${escapePDF('▸ ' + b)}) Tj\nET\n`;
      by -= 12;
    }

    y2 -= 92;
  }

  // 1. TASFUED Marketplace
  drawProjectCard(
    '01',
    'TASFUED MARKETPLACE',
    'Campus Commerce Platform',
    'React, Vite, Tailwind CSS, Supabase, PostgreSQL',
    'https://tasfuedmarketplace.com.ng',
    [
      'Engineered student-to-student e-commerce marketplace featuring categorized listings, search indexing, and seller profiles.',
      'Implemented Supabase Auth, PostgreSQL RLS security policies, and sub-second full-text catalog queries.',
      'Integrated real-time cart state, responsive desktop/mobile viewports, and multi-image cloud uploads.'
    ]
  );

  // 2. SCHEDULER Mobile App
  drawProjectCard(
    '02',
    'SCHEDULER (ACADEMIC COMPANION)',
    'Mobile Schedule Management',
    'Flutter, Dart, Supabase, Riverpod Architecture',
    'https://scheduler.nexlify.com.ng',
    [
      'Architected cross-platform mobile timetable suite featuring lecture reminders, conflict detection, and exam countdowns.',
      'Implemented offline-first Riverpod state engine caching schedule matrices locally with automatic cloud sync.',
      'Designed custom calendar grid and push notification telemetry delivering 60FPS fluid touch responsiveness.'
    ]
  );

  // 3. AWBA CBT Platform
  drawProjectCard(
    '03',
    'AWBA CBT PLATFORM',
    'Offline Examination System',
    'React, Node.js, Electron, IndexedDB, SQLite, Tailwind CSS',
    null,
    [
      'Built localized offline-first examination engine capable of processing hundreds of candidates with zero internet dependency.',
      'Constructed anti-tamper kiosk mode with strict focus detection, secure question randomization, and instant grading.',
      'Engineered comprehensive admin telemetry dashboard for real-time exam supervision and bulk result export.'
    ]
  );

  // 4. FinTech Platform
  drawProjectCard(
    '04',
    'FINTECH NEO-BANKING CORE',
    'Financial Technology',
    'Flutter, Firebase Firestore, Node.js, Riverpod',
    null,
    [
      'Constructed double-entry ledger digital wallet ensuring cryptographic transaction consistency and race-condition immunity.',
      'Implemented peer-to-peer fund transfers, real-time analytics graphs, dynamic PIN verification, and audit logs.',
      'Orchestrated Firestore atomic batch transactions and cloud function triggers for real-time receipt generation.'
    ]
  );

  // 5. Sarkin Mota Group
  drawProjectCard(
    '05',
    'SARKIN MOTA GROUP',
    'Automotive Luxury Showroom',
    'Next.js, TypeScript, Tailwind CSS, GSAP Motion',
    null,
    [
      'Developed high-end luxury vehicle showroom platform featuring interactive inventory search, VIN specs, and finance calculators.',
      'Crafted 60FPS cinematic scroll-driven animations with GSAP and optimized image delivery pipeline.',
      'Designed VIP service appointment scheduling module with instant email confirmation and calendar sync.'
    ]
  );

  // 6. The Gilded Table
  drawProjectCard(
    '06',
    'THE GILDED TABLE',
    'Hospitality & Dining Platform',
    'Flutter, Next.js, TypeScript, Supabase, PostgreSQL',
    null,
    [
      'Engineered dual-mode hospitality platform (mobile guest app + web command center) with interactive table floorplans.',
      'Implemented real-time table occupancy heatmaps, sommelier tasting menus, and kitchen display system (KDS).'
    ]
  );

  // Page 2 Footer
  p2Stream += `0.85 0.88 0.92 RG\n0.5 w\n40 30 m 555 30 l\nS\n`;
  p2Stream += `BT\n/F1 7.5 Tf\n0.5 0.55 0.6 rg\n40 18 Td\n(${escapePDF('Samuel Imole Patrick • Master Curriculum Vitae • Page 2 of 2')}) Tj\nET\n`;
  p2Stream += `BT\n/F1 7.5 Tf\n0.5 0.55 0.6 rg\n450 18 Td\n(${escapePDF('Official Dossier // Confidential')}) Tj\nET\n`;

  const pdfBuffer = builder.buildDocument([
    { stream: p1Stream, annotations: p1Annots },
    { stream: p2Stream, annotations: p2Annots },
  ]);

  return pdfBuffer;
}

function generateMasterCVDocHTML() {
  return `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset="utf-8">
  <title>Samuel Imole Patrick - Master Curriculum Vitae</title>
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
      font-family: 'Segoe UI', Calibri, Arial, Helvetica, sans-serif;
      font-size: 10pt;
      line-height: 1.45;
      color: #1e293b;
      background-color: #ffffff;
      margin: 0;
      padding: 0;
    }
    h1 {
      font-size: 21pt;
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
      padding: 2.5px 0;
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
      font-size: 8.5pt;
      color: #64748b;
      text-align: right;
      font-style: italic;
    }
    ul.bullet-list {
      margin: 4px 0 10px 0;
      padding-left: 18px;
    }
    ul.bullet-list li {
      margin-bottom: 4px;
      font-size: 9.2pt;
      color: #334155;
    }
    .skills-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 6px;
      margin-bottom: 10px;
    }
    .skills-table td {
      padding: 4.5px 6px;
      font-size: 9pt;
      vertical-align: top;
      border: 1px solid #e2e8f0;
    }
    .skill-category {
      font-weight: 700;
      color: #0f172a;
      width: 28%;
      background-color: #f8fafc;
    }
    .skill-items {
      color: #334155;
      width: 72%;
    }
    .project-card {
      margin-top: 8px;
      margin-bottom: 11px;
      padding-bottom: 8px;
      border-bottom: 0.75pt dashed #cbd5e1;
    }
    .project-title {
      font-size: 10pt;
      font-weight: 800;
      color: #0f172a;
    }
    .project-stack {
      font-size: 8.5pt;
      font-weight: 700;
      color: #b45309;
      font-family: Consolas, 'Courier New', monospace;
      margin: 1px 0 3px 0;
    }
    .project-desc {
      font-size: 9pt;
      color: #475569;
      line-height: 1.4;
    }
    .footer-note {
      margin-top: 24px;
      padding-top: 10px;
      border-top: 1pt solid #cbd5e1;
      font-size: 8pt;
      color: #94a3b8;
      text-align: center;
      font-style: italic;
    }
  </style>
</head>
<body>
  <div class="Section1">
    <!-- Header -->
    <h1>Samuel Imole Patrick</h1>
    <div class="subtitle">Full-Stack Web &amp; Mobile Application Developer (ESCANOR)</div>

    <!-- Contact Telemetry Table -->
    <table class="contact-table">
      <tr>
        <td style="width: 50%;"><strong>Location:</strong> Mowe, Ogun State, Nigeria</td>
        <td style="width: 50%;"><strong>Email:</strong> <a href="mailto:samuelimolepatrick@gmail.com">samuelimolepatrick@gmail.com</a></td>
      </tr>
      <tr>
        <td><strong>Phone / WhatsApp:</strong> <a href="tel:+2348149224954">+234 814 922 4954</a></td>
        <td><strong>Portfolio:</strong> <a href="https://about-sammy.vercel.app">about-sammy.vercel.app</a></td>
      </tr>
      <tr>
        <td><strong>GitHub:</strong> <a href="https://github.com/ESCANOR-dev-afro">github.com/ESCANOR-dev-afro</a></td>
        <td><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/samuel-patrick-722b82423">samuel-patrick</a></td>
      </tr>
    </table>

    <!-- Executive Summary -->
    <h2 class="section-title">Executive Profile &amp; Summary</h2>
    <p>
      High-impact Full-Stack Web and Mobile Application Developer with demonstrated expertise in engineering resilient, production-ready applications across high-growth startups and enterprise systems. Specialized in full-lifecycle development using React, Next.js, TypeScript, Flutter, Dart, Supabase, and PostgreSQL. Recognized for deep analytical competence in algorithm optimization, relational schema design, 60fps hardware-accelerated user interfaces, sub-second query performance, and robust anti-cheat security architectures.
    </p>

    <!-- Education -->
    <h2 class="section-title">Education &amp; Academic Background</h2>
    <table class="entry-header">
      <tr>
        <td class="entry-title">Bachelor of Science (B.Sc.) in Computer Science</td>
        <td class="entry-date">Enrolled • Exceptional Academic Standing</td>
      </tr>
      <tr>
        <td class="entry-org" colspan="2">Tai Solarin Federal University of Education (TASFUED), Ogun State, Nigeria</td>
      </tr>
    </table>
    <ul class="bullet-list">
      <li><strong>Specialization &amp; Rigor:</strong> Advanced Algorithms, Relational Database Architecture &amp; Query Optimization, Systems Concurrency, Operating Systems, Object-Oriented System Design.</li>
      <li><strong>Academic Initiatives:</strong> Campus-wide peer-to-peer e-commerce platform (TASFUED Marketplace) and intelligent mobile schedule companion systems.</li>
    </ul>

    <!-- Experience -->
    <h2 class="section-title">Professional Experience &amp; Industrial Training</h2>
    <table class="entry-header">
      <tr>
        <td class="entry-title">Software Engineering &amp; Database Architecture Intern (SIWES)</td>
        <td class="entry-date">3-Month Intensive Program • Completed</td>
      </tr>
      <tr>
        <td class="entry-org" colspan="2">InfoSystem Consulting</td>
      </tr>
    </table>
    <ul class="bullet-list">
      <li><strong>Offline-First CBT Architecture:</strong> Core engineer on the Anthony Whitebridge Academy (AWBA) offline Computer-Based Testing platform utilizing React, Node.js, Electron, and local SQLite / IndexedDB sync for zero-latency localized examination administration.</li>
      <li><strong>Anti-Cheat &amp; Integrity Controls:</strong> Implemented strict browser/kiosk window lockdown protocols, blur-violation tripwires, and real-time candidate invigilation monitoring towers.</li>
      <li><strong>Data Resiliency:</strong> Engineered fault-tolerant background data synchronization algorithms ensuring 100% data recovery during power or hardware interruptions.</li>
      <li><strong>Database Engineering:</strong> Designed normalized relational database schemas, secure authentication middleware, and automated grade computation pipelines reducing exam processing time from hours to seconds.</li>
    </ul>

    <!-- Technical Arsenal -->
    <h2 class="section-title">Technical Arsenal &amp; Core Competencies</h2>
    <table class="skills-table">
      <tr>
        <td class="skill-category">Mobile Engineering:</td>
        <td class="skill-items">Flutter, Dart, Riverpod State Management, GoRouter, Firebase Firestore, Supabase Mobile Auth, Mobile Offline Caching, Hardware Acceleration</td>
      </tr>
      <tr>
        <td class="skill-category">Frontend Web Stack:</td>
        <td class="skill-items">React.js, Next.js (App Router), TypeScript, JavaScript (ES6+), Tailwind CSS, Vite, HTML5, CSS3, Netlify Deployment</td>
      </tr>
      <tr>
        <td class="skill-category">Backend &amp; Databases:</td>
        <td class="skill-items">Node.js, Express, Electron / Desktop Runtime, Supabase, PostgreSQL, Firebase Firestore, SQLite, IndexedDB, RESTful APIs, JWT</td>
      </tr>
      <tr>
        <td class="skill-category">Architecture &amp; Tools:</td>
        <td class="skill-items">Clean Architecture, Double-Entry Accounting Ledgers, Git, GitHub, Cursor AI, Trae AI, Claude, VS Code, Figma Prototyping, Postman</td>
      </tr>
    </table>

    <!-- Verified Projects -->
    <h2 class="section-title">Verified Production Deployments &amp; Engineering Nodes</h2>

    <div class="project-card">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td class="project-title">1. TASFUED MARKETPLACE (Campus P2P Commerce Platform)</td>
          <td style="text-align: right; font-size: 8.5pt;"><a href="https://tasfuedmarketplace.com.ng" style="color: #b45309; font-weight: bold; text-decoration: none;">Live Platform ↗</a></td>
        </tr>
      </table>
      <div class="project-stack">Stack: React, Vite, Tailwind CSS, Supabase, PostgreSQL</div>
      <div class="project-desc">Dedicated campus e-commerce platform connecting university students for peer-to-peer commerce, verified merchant badges, in-app messaging, real-time cart routing, and sub-second indexed queries.</div>
    </div>

    <div class="project-card">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td class="project-title">2. SCHEDULER (Mobile Intelligent Schedule Management)</td>
          <td style="text-align: right; font-size: 8.5pt;"><a href="https://scheduler.nexlify.com.ng" style="color: #b45309; font-weight: bold; text-decoration: none;">Live App ↗</a></td>
        </tr>
      </table>
      <div class="project-stack">Stack: Flutter, Dart, Supabase, Riverpod Architecture</div>
      <div class="project-desc">Role-based academic timetable and lecture schedule companion featuring background lecture alarms, smart conflict resolution, exam countdown telemetry, and full offline caching.</div>
    </div>

    <div class="project-card">
      <div class="project-title">3. AWBA CBT PLATFORM (Offline-First Examination Engine)</div>
      <div class="project-stack">Stack: React, Node.js, Electron / Desktop Runtime, IndexedDB / SQLite, Tailwind CSS</div>
      <div class="project-desc">Secure localized examination and real-time grading system engineered during Industrial Training (SIWES) at InfoSystem Consulting. Features kiosk anti-cheat lockdown, zero-internet LAN synchronization, and instant result calculation.</div>
    </div>

    <div class="project-card">
      <div class="project-title">4. FINTECH PLATFORM (Neo-Banking Core &amp; Double-Entry Ledger)</div>
      <div class="project-stack">Stack: Flutter, Firebase Firestore, Node.js, Riverpod</div>
      <div class="project-desc">Cryptographically secured mobile wallet featuring double-entry accounting ledger guarantees, instant peer-to-peer transfers, biometric PIN safeguards, and interactive spending telemetry.</div>
    </div>

    <div class="project-card">
      <div class="project-title">5. SARKIN MOTA GROUP (Automotive Luxury Showroom)</div>
      <div class="project-stack">Stack: Next.js, TypeScript, Tailwind CSS, GSAP Motion</div>
      <div class="project-desc">High-performance luxury automotive showroom with VIN fleet inventory tracking, service booking workflows, interactive financing calculator, and 60fps cinematic GSAP motion.</div>
    </div>

    <div class="project-card">
      <div class="project-title">6. THE GILDED TABLE (Mobile Luxury Dining Companion)</div>
      <div class="project-stack">Stack: Flutter, Dart, Supabase Auth, PostgreSQL</div>
      <div class="project-desc">Cross-platform hospitality application featuring interactive table floor plans, tasting menu visualizers, sommelier wine pairing recommender, and VIP concierge messaging.</div>
    </div>

    <div class="project-card" style="border-bottom: none;">
      <div class="project-title">7. THE GILDED TABLE (Culinary Command Tower &amp; Web App)</div>
      <div class="project-stack">Stack: Next.js, TypeScript, Supabase, Tailwind CSS, PostgreSQL</div>
      <div class="project-desc">Full-scale dining room operations suite with real-time table occupancy heatmaps, executive Kitchen Display System (KDS) synchronization, and sommelier cellar inventory management.</div>
    </div>

    <!-- Footer Note -->
    <div class="footer-note">
      Verified Official Engineering Dossier • Samuel Imole Patrick • Generated from <a href="https://about-sammy.vercel.app" style="color: #b45309; text-decoration: none;">about-sammy.vercel.app</a>
    </div>
  </div>
</body>
</html>`;
}

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Generate Word Document (.doc)
const docHTML = generateMasterCVDocHTML();
const docBuffer = Buffer.from('\ufeff' + docHTML, 'utf-8');

const docFile1 = path.join(publicDir, 'Samuel_Patrick_Master_CV.doc');
const docFile2 = path.join(publicDir, 'Samuel_Patrick_Software_Engineer_CV.doc');
fs.writeFileSync(docFile1, docBuffer);
fs.writeFileSync(docFile2, docBuffer);

// 2. Generate PDF Document (.pdf)
const pdfBuffer = generateSamuelPatrickCV();
const pdfFile1 = path.join(publicDir, 'Samuel_Patrick_Software_Engineer_CV.pdf');
const pdfFile2 = path.join(publicDir, 'samuel-patrick-resume.pdf');
const pdfFile3 = path.join(publicDir, 'Samuel_Patrick_Master_CV.pdf');

fs.writeFileSync(pdfFile1, pdfBuffer);
fs.writeFileSync(pdfFile2, pdfBuffer);
fs.writeFileSync(pdfFile3, pdfBuffer);

// 3. Sync Claude Certificates
const certSourceDir = path.resolve('Claude Certificate');
const certDestDir = path.join(publicDir, 'certificates');
if (!fs.existsSync(certDestDir)) {
  fs.mkdirSync(certDestDir, { recursive: true });
}

const certMap = [
  { src: 'Claude 101.png', clean: 'claude-101.png' },
  { src: 'Claude code 101 .png', clean: 'claude-code-101.png' },
  { src: 'AI capability.png', clean: 'ai-capability.png' },
  { src: 'fluency builder.png', clean: 'ai-fluency-builders.png' },
  { src: 'fluency creative work .png', clean: 'ai-fluency-creative-work.png' },
  { src: 'Advanced Topics .png', clean: 'claude-advanced-topics.png' },
];

if (fs.existsSync(certSourceDir)) {
  for (const item of certMap) {
    const srcPath = path.join(certSourceDir, item.src);
    if (fs.existsSync(srcPath)) {
      const destClean = path.join(certDestDir, item.clean);
      const destOriginal = path.join(certDestDir, item.src.trim());
      fs.copyFileSync(srcPath, destClean);
      fs.copyFileSync(srcPath, destOriginal);
    }
  }
}

// Also sync to dist/certificates if dist exists
const distCertDir = path.resolve('dist/certificates');
if (fs.existsSync(path.resolve('dist'))) {
  if (!fs.existsSync(distCertDir)) {
    fs.mkdirSync(distCertDir, { recursive: true });
  }
  if (fs.existsSync(certDestDir)) {
    const files = fs.readdirSync(certDestDir);
    for (const f of files) {
      fs.copyFileSync(path.join(certDestDir, f), path.join(distCertDir, f));
    }
  }
}

console.log('Successfully synced Claude Certificate assets.');

