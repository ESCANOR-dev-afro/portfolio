import { createContext, useContext, useState, useEffect } from 'react';
import {
  projects as defaultProjects,
  certificates as defaultCertificates,
  certificateCategories as defaultCertCategories,
  primarySkills as defaultPrimarySkills,
  secondarySkills as defaultSecondarySkills,
  developerProfile as defaultDeveloperProfile,
} from '../data/portfolioData';
import { downloadFileFromDataUrl } from '../utils/fileUploadHelper';
import { downloadMasterCVDoc } from '../utils/cvDocGenerator';

const defaultSkills = {
  primary: defaultPrimarySkills,
  secondary: defaultSecondarySkills,
};

export const defaultSiteContent = {
  hero: {
    headlinePart1: 'Engineering.',
    headlinePart2: 'Ideas Into Reality.',
    statusPill: 'FULL-STACK SOFTWARE ENGINEER • WEB & MOBILE',
    bio: 'Building software is about solving real problems, creating value, and delivering smooth user experiences. I develop full-stack web and cross-platform mobile applications that help businesses scale, delight users, and turn ambitious ideas into reliable digital products.',
    locationStatus: 'LOCATION: NIGERIA • REMOTE WORLDWIDE',
    availabilityStatus: 'AVAILABLE FOR NEW PROJECTS',
    primaryCtaText: 'View Featured Projects',
    secondaryCtaText: 'Download Resume (.DOC)',
  },
  about: {
    title: 'About Samuel Patrick',
    badge: 'About Me • Background & Experience',
    paragraph1:
      'I am a Full-Stack Web and Mobile Application Developer studying Computer Science at Tai Solarin Federal University of Education (TASFUED) in Ogun State, Nigeria.',
    paragraph2:
      'During my 3-month Industrial Training (SIWES) at InfoSystem Consulting, I engineered core offline database structures, authentication middleware, and localized testing systems like the AWBA CBT platform.',
    paragraph3:
      'My core toolset spans React, Next.js, TypeScript, Flutter, Dart, Supabase, PostgreSQL, and Firebase. I combine solid computer science fundamentals and database optimization with clean design to build software that performs reliably at scale.',
    stat1Value: '7 Apps',
    stat1Label: 'FEATURED PROJECTS',
    stat2Value: 'TASFUED',
    stat2Label: 'COMPUTER SCIENCE',
    stat3Value: 'SIWES',
    stat3Label: 'INFOSYSTEM INTERN',
  },
  contact: {
    name: defaultDeveloperProfile.name || 'Samuel Imole Patrick',
    codename: defaultDeveloperProfile.codename || 'ESCANOR',
    title: defaultDeveloperProfile.title || 'Full-Stack Web & Mobile Developer',
    location: defaultDeveloperProfile.location || 'Mowe, Ogun State, Nigeria',
    email: defaultDeveloperProfile.email || 'samuelimolepatrick@gmail.com',
    phone: defaultDeveloperProfile.phone || '+234 814 922 4954',
    github: defaultDeveloperProfile.github || 'https://github.com/ESCANOR-dev-afro',
    linkedin: defaultDeveloperProfile.linkedin || 'https://www.linkedin.com/in/samuel-patrick-722b82423',
    portfolioUrl: defaultDeveloperProfile.portfolioUrl || 'https://about-sammy.netlify.app',
    bookingUrl: '',
    consultationNotice: 'Strictly confidential. Direct engineer review guaranteed.',
  },
  cv: {
    documentName: 'Samuel_Patrick_Master_CV.doc',
    customDocDataUrl: null,
    customDocName: null,
    customDocSize: null,
    customDocMime: null,
    lastUpdated: new Date().toISOString(),
  },
};

const PortfolioDataContext = createContext(null);

const STORAGE_PROJECTS_KEY = 'escanor_portfolio_projects_v2';
const STORAGE_CERTS_KEY = 'escanor_portfolio_certificates_v2';
const STORAGE_SITE_CONTENT_KEY = 'escanor_portfolio_site_content_v2';

export function PortfolioDataProvider({ children }) {
  // Initialize projects from localStorage or default
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_PROJECTS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to load projects from localStorage:', e);
    }
    return defaultProjects;
  });

  // Initialize certificates from localStorage or default
  const [certificates, setCertificates] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CERTS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to load certificates from localStorage:', e);
    }
    return defaultCertificates;
  });

  // Initialize Master Site Content from localStorage or default
  const [siteContent, setSiteContent] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_SITE_CONTENT_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultSiteContent,
          ...parsed,
          hero: { ...defaultSiteContent.hero, ...(parsed.hero || {}) },
          about: { ...defaultSiteContent.about, ...(parsed.about || {}) },
          contact: { ...defaultSiteContent.contact, ...(parsed.contact || {}) },
          cv: { ...defaultSiteContent.cv, ...(parsed.cv || {}) },
        };
      }
    } catch (e) {
      console.warn('Failed to load site content from localStorage:', e);
    }
    return defaultSiteContent;
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(projects));
    } catch (e) {
      console.error('Failed to persist projects:', e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CERTS_KEY, JSON.stringify(certificates));
    } catch (e) {
      console.error('Failed to persist certificates:', e);
    }
  }, [certificates]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_SITE_CONTENT_KEY, JSON.stringify(siteContent));
    } catch (e) {
      console.error('Failed to persist site content:', e);
    }
  }, [siteContent]);

  // Master Site Content Updates
  const updateSiteContent = (newContent) => {
    setSiteContent((prev) => ({
      ...prev,
      ...newContent,
    }));
  };

  // Dynamic CV Download Dispatcher
  const downloadActiveCV = (fallbackFilename = 'Samuel_Patrick_Master_CV.doc') => {
    if (siteContent.cv?.customDocDataUrl) {
      downloadFileFromDataUrl(
        siteContent.cv.customDocDataUrl,
        siteContent.cv.customDocName || 'Samuel_Patrick_Master_CV.pdf',
        siteContent.cv.customDocMime
      );
    } else {
      downloadMasterCVDoc(fallbackFilename);
    }
  };

  // Project CRUD Operations
  const addProject = (projectData) => {
    const nextIndex = projects.length + 1;
    const desktopImg = projectData.image || '/screenshots/tasfued-landing.png';
    const mobileImg = projectData.mobileImage || projectData.image || '/screenshots/tasfued-mobile.png';

    const newProject = {
      id: projectData.id || `project-${Date.now()}`,
      num: projectData.num || String(nextIndex).padStart(2, '0'),
      title: projectData.title || 'UNTITLED PROJECT',
      subtitle: projectData.subtitle || '',
      category: projectData.category || 'Web App • Full-Stack',
      liveUrl: projectData.liveUrl || null,
      githubUrl: projectData.githubUrl || 'https://github.com/ESCANOR-dev-afro',
      image: desktopImg,
      mobileImage: mobileImg,
      hasVisuals: projectData.hasVisuals ?? true,
      featured: projectData.featured ?? true,
      stackTags: Array.isArray(projectData.stackTags)
        ? projectData.stackTags
        : (projectData.stackTags || '').split(',').map((t) => t.trim()).filter(Boolean),
      techStack: Array.isArray(projectData.techStack)
        ? projectData.techStack
        : (projectData.techStack || projectData.stackTags || '').split(',').map((t) => t.trim()).filter(Boolean),
      description: projectData.description || '',
      challenge: projectData.challenge || '',
      hudMetrics: Array.isArray(projectData.hudMetrics)
        ? projectData.hudMetrics
        : (projectData.hudMetrics || '').split(',').map((m) => m.trim()).filter(Boolean),
      previewType: projectData.previewType || 'default',
      features: Array.isArray(projectData.features)
        ? projectData.features
        : (projectData.features || '').split('\n').map((f) => f.trim()).filter(Boolean),
      screenshots: projectData.screenshots || {
        desktop: desktopImg,
        desktopGallery: [
          {
            id: 'desktop-main',
            label: 'MAIN INTERFACE',
            src: desktopImg,
            caption: projectData.title || 'Main Application Interface',
          },
        ],
        mobile: mobileImg,
        mobileGallery: [
          {
            id: 'mobile-main',
            label: 'MOBILE VIEW',
            src: mobileImg,
          },
        ],
      },
      mockDetails: projectData.mockDetails || {
        url: projectData.liveUrl ? projectData.liveUrl.replace(/^https?:\/\//, '') : 'app.internal.dev',
        accentColor: projectData.accentColor || '#ff6a00',
        mobileScreens: ['Overview', 'Details', 'Metrics'],
        stats: { status: 'Active', latency: 'Fast (< 20ms)', security: 'Verified' },
      },
      createdAt: new Date().toISOString(),
    };

    setProjects((prev) => [newProject, ...prev]);
    return newProject;
  };

  const updateProject = (id, updatedFields) => {
    setProjects((prev) =>
      prev.map((project) => {
        if (project.id === id) {
          const desktopImg = updatedFields.image || project.image || '/screenshots/tasfued-landing.png';
          const mobileImg = updatedFields.mobileImage || updatedFields.image || project.mobileImage || '/screenshots/tasfued-mobile.png';

          const updated = {
            ...project,
            ...updatedFields,
            image: desktopImg,
            mobileImage: mobileImg,
            screenshots: {
              ...project.screenshots,
              desktop: desktopImg,
              mobile: mobileImg,
              desktopGallery: [
                {
                  id: 'desktop-main',
                  label: 'MAIN INTERFACE',
                  src: desktopImg,
                  caption: updatedFields.title || project.title,
                },
              ],
              mobileGallery: [
                {
                  id: 'mobile-main',
                  label: 'MOBILE VIEW',
                  src: mobileImg,
                },
              ],
            },
            stackTags: Array.isArray(updatedFields.stackTags)
              ? updatedFields.stackTags
              : typeof updatedFields.stackTags === 'string'
              ? updatedFields.stackTags.split(',').map((t) => t.trim()).filter(Boolean)
              : project.stackTags,
            techStack: Array.isArray(updatedFields.techStack)
              ? updatedFields.techStack
              : typeof updatedFields.techStack === 'string'
              ? updatedFields.techStack.split(',').map((t) => t.trim()).filter(Boolean)
              : project.techStack,
            hudMetrics: Array.isArray(updatedFields.hudMetrics)
              ? updatedFields.hudMetrics
              : typeof updatedFields.hudMetrics === 'string'
              ? updatedFields.hudMetrics.split(',').map((m) => m.trim()).filter(Boolean)
              : project.hudMetrics,
            features: Array.isArray(updatedFields.features)
              ? updatedFields.features
              : typeof updatedFields.features === 'string'
              ? updatedFields.features.split('\n').map((f) => f.trim()).filter(Boolean)
              : project.features,
            updatedAt: new Date().toISOString(),
          };
          return updated;
        }
        return project;
      })
    );
  };

  const toggleProjectVisibility = (id) => {
    setProjects((prev) =>
      prev.map((project) => {
        if (project.id === id) {
          const currentVisuals = project.hasVisuals !== false && project.featured !== false;
          return {
            ...project,
            hasVisuals: !currentVisuals,
            featured: !currentVisuals,
            updatedAt: new Date().toISOString(),
          };
        }
        return project;
      })
    );
  };

  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
  };

  // Certificate CRUD Operations
  const addCertificate = (certData) => {
    const nextNum = certificates.length + 1;
    const newCert = {
      id: certData.id || `cert-${Date.now()}`,
      nodeNumber: certData.nodeNumber || String(nextNum).padStart(2, '0'),
      title: certData.title || 'Untitled Certificate',
      subtitle: certData.subtitle || 'Specialized AI Accreditation',
      category: certData.category || 'AI Engineering',
      issuer: certData.issuer || 'Anthropic / Claude Academy',
      badgeId: certData.badgeId || `AUTH-CERT-${Date.now().toString(36).toUpperCase()}`,
      status: certData.status || 'VERIFIED_CREDENTIAL',
      image: certData.image || '/Claude Certificate/Claude 101.png',
      summary: certData.summary || certData.subtitle || '',
      description: certData.description || '',
      stackTags: Array.isArray(certData.stackTags)
        ? certData.stackTags
        : (certData.stackTags || '').split(',').map((s) => s.trim()).filter(Boolean),
      skills: Array.isArray(certData.skills)
        ? certData.skills
        : (certData.skills || certData.stackTags || '').split(',').map((s) => s.trim()).filter(Boolean),
      liveUrl: certData.liveUrl || 'https://anthropic.com',
      githubUrl: certData.githubUrl || 'https://github.com/ESCANOR-dev-afro',
      metrics: certData.metrics || {
        domain: 'AI Software Engineering',
        level: 'Specialist',
        verificationDate: `${new Date().getFullYear()}`,
        accreditationTier: 'Official Credential',
      },
      accentColor: certData.accentColor || '#ff6a00',
      createdAt: new Date().toISOString(),
    };

    setCertificates((prev) => [newCert, ...prev]);
    return newCert;
  };

  const updateCertificate = (id, updatedFields) => {
    setCertificates((prev) =>
      prev.map((cert) => {
        if (cert.id === id) {
          return {
            ...cert,
            ...updatedFields,
            stackTags: Array.isArray(updatedFields.stackTags)
              ? updatedFields.stackTags
              : typeof updatedFields.stackTags === 'string'
              ? updatedFields.stackTags.split(',').map((s) => s.trim()).filter(Boolean)
              : cert.stackTags,
            skills: Array.isArray(updatedFields.skills)
              ? updatedFields.skills
              : typeof updatedFields.skills === 'string'
              ? updatedFields.skills.split(',').map((s) => s.trim()).filter(Boolean)
              : cert.skills,
            updatedAt: new Date().toISOString(),
          };
        }
        return cert;
      })
    );
  };

  const deleteCertificate = (id) => {
    setCertificates((prev) => prev.filter((cert) => cert.id !== id));
  };

  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_PROJECTS_KEY);
    localStorage.removeItem(STORAGE_CERTS_KEY);
    localStorage.removeItem(STORAGE_SITE_CONTENT_KEY);
    setProjects(defaultProjects);
    setCertificates(defaultCertificates);
    setSiteContent(defaultSiteContent);
  };

  // Generate clean JavaScript code string for portfolioData.js
  const exportAsJavaScript = () => {
    const formattedProjects = JSON.stringify(projects, null, 2);
    const formattedCerts = JSON.stringify(certificates, null, 2);
    const formattedSiteContent = JSON.stringify(siteContent, null, 2);

    return `/**
 * =========================================================================
 * CENTRALIZED PORTFOLIO DATA CONFIGURATION STORE
 * Samuel Imole Patrick (ESCANOR) — Full-Stack Web & Mobile Engineer
 * Generated via Portfolio Command Center / Admin Dashboard
 * Date: ${new Date().toISOString()}
 * =========================================================================
 */

export const siteContent = ${formattedSiteContent};

export const projects = ${formattedProjects};

export const certificates = ${formattedCerts};

export const certificateCategories = ${JSON.stringify(defaultCertCategories, null, 2)};

export const developerProfile = ${JSON.stringify(siteContent.contact || defaultDeveloperProfile, null, 2)};

export const primarySkills = ${JSON.stringify(defaultSkills.primary, null, 2)};

export const secondarySkills = ${JSON.stringify(defaultSkills.secondary, null, 2)};

export const portfolioData = {
  siteContent,
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
`;
  };

  const exportAsJSON = () => {
    return JSON.stringify(
      {
        siteContent,
        projects,
        certificates,
        exportedAt: new Date().toISOString(),
      },
      null,
      2
    );
  };

  return (
    <PortfolioDataContext.Provider
      value={{
        siteContent,
        projects,
        certificates,
        certificateCategories: defaultCertCategories,
        developerProfile: siteContent.contact || defaultDeveloperProfile,
        skills: defaultSkills,
        updateSiteContent,
        downloadActiveCV,
        addProject,
        updateProject,
        toggleProjectVisibility,
        deleteProject,
        addCertificate,
        updateCertificate,
        deleteCertificate,
        resetToDefaults,
        exportAsJavaScript,
        exportAsJSON,
      }}
    >
      {children}
    </PortfolioDataContext.Provider>
  );
}

export function usePortfolioData() {
  const context = useContext(PortfolioDataContext);
  if (!context) {
    // Fallback if rendered outside provider
    return {
      siteContent: defaultSiteContent,
      projects: defaultProjects,
      certificates: defaultCertificates,
      certificateCategories: defaultCertCategories,
      developerProfile: defaultDeveloperProfile,
      skills: defaultSkills,
      updateSiteContent: () => {},
      downloadActiveCV: () => downloadMasterCVDoc('Samuel_Patrick_Master_CV.doc'),
      addProject: () => {},
      updateProject: () => {},
      toggleProjectVisibility: () => {},
      deleteProject: () => {},
      addCertificate: () => {},
      updateCertificate: () => {},
      deleteCertificate: () => {},
      resetToDefaults: () => {},
      exportAsJavaScript: () => '',
      exportAsJSON: () => '',
    };
  }
  return context;
}
