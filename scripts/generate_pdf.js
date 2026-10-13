import fs from 'fs';
import path from 'path';

/**
 * Pure Node.js PDF 1.4 Document Generator
 * Generates an executive, beautifully formatted, multi-page vector PDF for Samuel Patrick.
 * Standard 14 Type 1 Fonts (Helvetica, Helvetica-Bold) - 100% native across all PDF readers.
 */
class PDFBuilder {
  constructor() {
    this.objects = [];
    this.pages = [];
  }

  addObject(content) {
    this.objects.push(content);
    return this.objects.length; // 1-based index
  }

  buildDocument(pagesContent) {
    const fontNormalId = this.addObject(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>`);
    const fontBoldId = this.addObject(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>`);
    const fontObliqueId = this.addObject(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>`);

    const pageObjIds = [];

    // Pre-allocate page objects
    for (let i = 0; i < pagesContent.length; i++) {
      pageObjIds.push(this.objects.length + i + 1);
    }

    const pagesRootId = this.addObject(''); // placeholder for Pages root

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

    // Update Pages root object
    this.objects[pagesRootId - 1] = `<< /Type /Pages /Kids [ ${createdPageIds.map(id => `${id} 0 R`).join(' ')} ] /Count ${createdPageIds.length} >>`;

    const catalogId = this.addObject(`<< /Type /Catalog /Pages ${pagesRootId} 0 R >>`);

    // Serialize PDF
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

export function generateSamuelPatrickCV() {
  const builder = new PDFBuilder();

  // Page 1: Profile, Contact, Executive Summary, Technical Arsenal, Academic Background, Work Experience
  let p1Stream = '';
  const p1Annots = [];

  // Accent bar top
  p1Stream += `0.85 0.35 0.05 rg\n0 835 595.28 6.89 re\nf\n`;
  // Dark header background banner
  p1Stream += `0.06 0.08 0.11 rg\n0 735 595.28 100 re\nf\n`;

  // Top header text
  p1Stream += `BT\n/F2 20 Tf\n1 1 1 rg\n40 795 Td\n(${escapePDF('SAMUEL IMOLE PATRICK')}) Tj\nET\n`;
  p1Stream += `BT\n/F2 9.5 Tf\n0.98 0.45 0.08 rg\n40 778 Td\n(${escapePDF('FULL-STACK SOFTWARE ENGINEER | MOBILE & WEB ARCHITECT')}) Tj\nET\n`;

  // Contact line (White/Gray on dark)
  p1Stream += `BT\n/F1 8.5 Tf\n0.8 0.85 0.9 rg\n40 755 Td\n(${escapePDF('Email: samuelimolepatrick@gmail.com   |   Phone: +234 814 922 4954   |   Location: Mowe, Ogun State, Nigeria')}) Tj\nET\n`;
  p1Annots.push({ x1: 65, y1: 752, x2: 215, y2: 765, url: 'mailto:samuelimolepatrick@gmail.com' });
  p1Annots.push({ x1: 260, y1: 752, x2: 350, y2: 765, url: 'tel:+2348149224954' });

  p1Stream += `BT\n/F1 8.5 Tf\n0.8 0.85 0.9 rg\n40 742 Td\n(${escapePDF('Portfolio: about-sammy.vercel.app   |   GitHub: github.com/ESCANOR-dev-afro   |   LinkedIn: samuel-patrick')}) Tj\nET\n`;
  p1Annots.push({ x1: 75, y1: 739, x2: 185, y2: 752, url: 'https://about-sammy.vercel.app' });
  p1Annots.push({ x1: 230, y1: 739, x2: 385, y2: 752, url: 'https://github.com/ESCANOR-dev-afro' });
  p1Annots.push({ x1: 435, y1: 739, x2: 520, y2: 752, url: 'https://www.linkedin.com/in/samuel-patrick-722b82423' });

  let y = 710;

  // Helper to draw section header
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

  // Section 2: Technical Skills & Core Arsenal
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

  // Section 4: Education & Academic Pedigree
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
  // Dark header mini banner
  p2Stream += `0.06 0.08 0.11 rg\n0 775 595.28 60 re\nf\n`;

  p2Stream += `BT\n/F2 14 Tf\n1 1 1 rg\n40 805 Td\n(${escapePDF('VERIFIED PRODUCTION DEPLOYMENTS & ENGINEERING NODES')}) Tj\nET\n`;
  p2Stream += `BT\n/F1 8.5 Tf\n0.8 0.85 0.9 rg\n40 788 Td\n(${escapePDF('Detailed technical architecture for deployed web, mobile, and enterprise platforms.')}) Tj\nET\n`;

  let y2 = 750;

  function drawProjectCard(num, title, category, stack, liveUrl, bullets) {
    p2Stream += `0.96 0.97 0.98 rg\n40 ${y2 - 68} 515 78 re\nf\n`;
    p2Stream += `0.85 0.88 0.92 RG\n0.75 w\n40 ${y2 - 68} 515 78 re\nS\n`;
    // Left amber accent strip
    p2Stream += `0.85 0.35 0.05 rg\n40 ${y2 - 68} 4 78 re\nf\n`;

    // Title & Category
    p2Stream += `BT\n/F2 10 Tf\n0.1 0.12 0.16 rg\n52 ${y2 - 2} Td\n(${escapePDF(`${num}. ${title}`)}) Tj\nET\n`;
    p2Stream += `BT\n/F3 8.5 Tf\n0.5 0.55 0.6 rg\n260 ${y2 - 2} Td\n(${escapePDF(`// ${category}`)}) Tj\nET\n`;

    if (liveUrl) {
      p2Stream += `BT\n/F2 8.5 Tf\n0.85 0.35 0.05 rg\n450 ${y2 - 2} Td\n(${escapePDF('Live URL ↗')}) Tj\nET\n`;
      p2Annots.push({ x1: 450, y1: y2 - 4, x2: 540, y2: y2 + 8, url: liveUrl });
    }

    // Stack line
    p2Stream += `BT\n/F2 8 Tf\n0.35 0.38 0.42 rg\n52 ${y2 - 14} Td\n(${escapePDF('TECH STACK:')}) Tj\nET\n`;
    p2Stream += `BT\n/F1 8 Tf\n0.85 0.35 0.05 rg\n115 ${y2 - 14} Td\n(${escapePDF(stack)}) Tj\nET\n`;

    // Bullet points
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

// Generate files in public directory
export function writeCVFiles() {
  const buffer = generateSamuelPatrickCV();
  const publicDir = path.resolve('public');

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const file1 = path.join(publicDir, 'Samuel_Patrick_Software_Engineer_CV.pdf');
  const file2 = path.join(publicDir, 'samuel-patrick-resume.pdf');
  const file3 = path.join(publicDir, 'Samuel_Patrick_Master_CV.pdf');

  fs.writeFileSync(file1, buffer);
  fs.writeFileSync(file2, buffer);
  fs.writeFileSync(file3, buffer);

  console.log('Successfully generated clean PDF CV files in public/:');
  console.log(' - ' + file1);
  console.log(' - ' + file2);
  console.log(' - ' + file3);
}
