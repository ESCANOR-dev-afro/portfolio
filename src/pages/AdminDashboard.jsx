import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  LogOut,
  ExternalLink,
  Plus,
  Search,
  Layers,
  Award,
  Eye,
  EyeOff,
  Edit,
  Trash2,
  Copy,
  Download,
  FileCode,
  Sparkles,
  RefreshCw,
  Clock,
  Terminal,
  ChevronRight,
  CodeXml,
  Cpu,
  Monitor,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  FileText,
  User,
} from 'lucide-react';
import { usePortfolioData } from '../context/PortfolioDataContext';
import AdminAuthGate from '../components/admin/AdminAuthGate';
import ProjectFormModal from '../components/admin/ProjectFormModal';
import CertificateFormModal from '../components/admin/CertificateFormModal';
import SiteContentEditor from '../components/admin/SiteContentEditor';
import DataExportModal from '../components/admin/DataExportModal';
import HUDCorners from '../components/ui/HUDCorners';
import SectionBadge from '../components/ui/SectionBadge';
import ThemeToggle from '../components/ui/ThemeToggle';

const SESSION_AUTH_KEY = 'escanor_admin_session_auth_v2';
const CUSTOM_PASS_KEY = 'escanor_admin_custom_passcode';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return (
        localStorage.getItem(SESSION_AUTH_KEY) === 'true' ||
        sessionStorage.getItem(SESSION_AUTH_KEY) === 'true'
      );
    } catch {
      return false;
    }
  });

  const {
    projects,
    certificates,
    siteContent,
    updateSiteContent,
    addProject,
    updateProject,
    toggleProjectVisibility,
    deleteProject,
    addCertificate,
    updateCertificate,
    deleteCertificate,
    resetToDefaults,
  } = usePortfolioData();

  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'certificates' | 'content' | 'settings'
  const [projectSearch, setProjectSearch] = useState('');
  const [projectStatusFilter, setProjectStatusFilter] = useState('all'); // 'all' | 'visible' | 'hidden'
  const [certSearch, setCertSearch] = useState('');

  // Modals state
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState(null);

  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Custom Passcode settings
  const [newPasscode, setNewPasscode] = useState('');
  const [passcodeSuccess, setPasscodeSuccess] = useState('');

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem(SESSION_AUTH_KEY);
    sessionStorage.removeItem(SESSION_AUTH_KEY);
    setIsAuthenticated(false);
  };

  const handleSaveProject = (projectData) => {
    if (editingProject) {
      updateProject(editingProject.id, projectData);
      showToast(`Updated "${projectData.title}"`);
    } else {
      addProject(projectData);
      showToast(`Added "${projectData.title}" to project vault`);
    }
    setEditingProject(null);
  };

  const handleSaveCert = (certData) => {
    if (editingCert) {
      updateCertificate(editingCert.id, certData);
      showToast(`Updated "${certData.title}"`);
    } else {
      addCertificate(certData);
      showToast(`Added "${certData.title}" to credentials vault`);
    }
    setEditingCert(null);
  };

  const handleDeleteProject = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteProject(id);
      showToast(`Deleted "${title}"`);
    }
  };

  const handleDeleteCert = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteCertificate(id);
      showToast(`Deleted "${title}"`);
    }
  };

  const handleUpdatePasscode = (e) => {
    e.preventDefault();
    if (!newPasscode.trim()) return;
    localStorage.setItem(CUSTOM_PASS_KEY, newPasscode.trim());
    setPasscodeSuccess('Passcode updated successfully!');
    setNewPasscode('');
    setTimeout(() => setPasscodeSuccess(''), 3000);
  };

  // Filtered lists
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
      (p.subtitle && p.subtitle.toLowerCase().includes(projectSearch.toLowerCase())) ||
      (p.stackTags && p.stackTags.some((t) => t.toLowerCase().includes(projectSearch.toLowerCase())));

    const isVisible = p.hasVisuals !== false && p.featured !== false;

    if (projectStatusFilter === 'visible') return matchesSearch && isVisible;
    if (projectStatusFilter === 'hidden') return matchesSearch && !isVisible;
    return matchesSearch;
  });

  const filteredCerts = certificates.filter((c) => {
    return (
      c.title.toLowerCase().includes(certSearch.toLowerCase()) ||
      (c.category && c.category.toLowerCase().includes(certSearch.toLowerCase())) ||
      (c.badgeId && c.badgeId.toLowerCase().includes(certSearch.toLowerCase()))
    );
  });

  // If not authenticated, render the high-security Auth Gate
  if (!isAuthenticated) {
    return <AdminAuthGate onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  const visibleCount = projects.filter((p) => p.hasVisuals !== false && p.featured !== false).length;
  const hiddenCount = projects.length - visibleCount;

  return (
    <div className="min-h-screen bg-obsidian text-ivory flex flex-col relative overflow-x-hidden selection:bg-orange-500/30 selection:text-ivory">
      {/* Ambient background grid & glows */}
      <div className="fixed inset-0 cyber-grid opacity-[0.12] pointer-events-none" />
      <div className="fixed top-0 right-0 w-[500px] h-[500px] rounded-full bg-orange-600/10 blur-[150px] pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-cyan-600/10 blur-[150px] pointer-events-none" />

      {/* === TOP TELEMETRY HUD HEADER === */}
      <header className="sticky top-0 z-40 bg-obsidian/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 lg:px-8 py-3.5 select-none">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Brand & Status */}
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white shadow-[0_0_15px_rgba(255,87,34,0.4)]">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-display font-bold text-base sm:text-lg text-white tracking-tight">
                  ESCANOR COMMAND CENTER
                </span>
                <span className="hidden sm:inline px-2 py-0.5 rounded bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono text-[9px] font-bold uppercase tracking-widest">
                  PORTFOLIO SYS.ADMIN
                </span>
              </div>
              <div className="flex items-center space-x-2 text-[10px] font-mono text-white/50">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
                <span>SESSION: AUTHENTICATED</span>
                <span>•</span>
                <span>{projects.length} DEPLOYMENTS REGISTERED</span>
              </div>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center space-x-2">
            <ThemeToggle variant="simple" />

            <button
              onClick={() => setIsExportModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-orange-500/10 border border-white/10 hover:border-orange-500/30 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-all cursor-pointer"
              title="Export portfolioData.js code"
            >
              <FileCode className="w-3.5 h-3.5 text-orange-400" />
              <span className="hidden sm:inline">EXPORT CODE</span>
            </button>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-400 font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-all cursor-pointer shadow-[0_0_15px_rgba(255,87,34,0.15)]"
            >
              <span>VIEW PORTFOLIO</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 text-white/60 hover:text-red-400 transition-all cursor-pointer"
              title="Lock Session / Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* === MAIN CONTENT CONTAINER === */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 relative z-10">
        {/* Quick Stats Overview Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl glass border border-white/10 relative overflow-hidden">
            <HUDCorners size="sm" />
            <div className="flex items-center justify-between text-white/40 font-mono text-[10px] uppercase mb-1">
              <span>Total Projects</span>
              <Layers className="w-4 h-4 text-orange-400" />
            </div>
            <div className="text-3xl font-display font-bold text-white tracking-tight">
              {projects.length}
            </div>
            <div className="text-[10px] font-mono text-white/50 mt-1">
              Registered in data store
            </div>
          </div>

          <div className="p-4 rounded-2xl glass border border-emerald-500/20 relative overflow-hidden">
            <HUDCorners size="sm" />
            <div className="flex items-center justify-between text-white/40 font-mono text-[10px] uppercase mb-1">
              <span>Live Visual Cards</span>
              <Eye className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-display font-bold text-emerald-400 tracking-tight">
              {visibleCount}
            </div>
            <div className="text-[10px] font-mono text-emerald-400/70 mt-1">
              Rendered on live page
            </div>
          </div>

          <div className="p-4 rounded-2xl glass border border-amber-500/20 relative overflow-hidden">
            <HUDCorners size="sm" />
            <div className="flex items-center justify-between text-white/40 font-mono text-[10px] uppercase mb-1">
              <span>Hidden Placeholders</span>
              <EyeOff className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-display font-bold text-amber-400 tracking-tight">
              {hiddenCount}
            </div>
            <div className="text-[10px] font-mono text-amber-400/70 mt-1">
              Awaiting screenshots
            </div>
          </div>

          <div className="p-4 rounded-2xl glass border border-cyan-500/20 relative overflow-hidden">
            <HUDCorners size="sm" />
            <div className="flex items-center justify-between text-white/40 font-mono text-[10px] uppercase mb-1">
              <span>AI Credentials</span>
              <Award className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-3xl font-display font-bold text-cyan-400 tracking-tight">
              {certificates.length}
            </div>
            <div className="text-[10px] font-mono text-cyan-400/70 mt-1">
              Anthropic Claude diplomas
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="inline-flex p-1 rounded-xl bg-black/60 border border-white/10 font-mono text-xs overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-4 py-2 rounded-lg font-bold transition-all cursor-pointer flex items-center space-x-2 whitespace-nowrap ${
                activeTab === 'projects'
                  ? 'bg-orange-500 text-white shadow-[0_0_15px_rgba(255,87,34,0.4)]'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>MANAGE PROJECTS ({projects.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('certificates')}
              className={`px-4 py-2 rounded-lg font-bold transition-all cursor-pointer flex items-center space-x-2 whitespace-nowrap ${
                activeTab === 'certificates'
                  ? 'bg-orange-500 text-white shadow-[0_0_15px_rgba(255,87,34,0.4)]'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>MANAGE CERTIFICATES ({certificates.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('content')}
              className={`px-4 py-2 rounded-lg font-bold transition-all cursor-pointer flex items-center space-x-2 whitespace-nowrap ${
                activeTab === 'content'
                  ? 'bg-orange-500 text-white shadow-[0_0_15px_rgba(255,87,34,0.4)]'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>SITE CONTENT &amp; COPYWRITING</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-lg font-bold transition-all cursor-pointer flex items-center space-x-2 whitespace-nowrap ${
                activeTab === 'settings'
                  ? 'bg-orange-500 text-white shadow-[0_0_15px_rgba(255,87,34,0.4)]'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>SECURITY &amp; SYSTEM</span>
            </button>
          </div>

          {/* Tab Actions */}
          <div>
            {activeTab === 'projects' && (
              <button
                onClick={() => {
                  setEditingProject(null);
                  setIsProjectModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-[0_0_20px_rgba(255,87,34,0.4)] transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>ADD NEW PROJECT</span>
              </button>
            )}

            {activeTab === 'certificates' && (
              <button
                onClick={() => {
                  setEditingCert(null);
                  setIsCertModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-[0_0_20px_rgba(0,210,255,0.4)] transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>ADD AI CERTIFICATE</span>
              </button>
            )}
          </div>
        </div>

        {/* =========================================================================
            TAB 1: MANAGE PROJECTS
           ========================================================================= */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            {/* Search & Filter Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl glass border border-white/10">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  placeholder="Search projects by title, stack tags, or keywords..."
                  className="w-full bg-black/60 border border-white/15 focus:border-orange-500 rounded-xl pl-10 pr-4 py-2.5 text-white text-xs font-mono outline-none transition-all placeholder:text-white/30"
                />
              </div>

              <div className="inline-flex p-1 rounded-xl bg-black/60 border border-white/10 font-mono text-xs shrink-0">
                <button
                  onClick={() => setProjectStatusFilter('all')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    projectStatusFilter === 'all'
                      ? 'bg-white/15 text-white font-bold'
                      : 'text-white/40 hover:text-white'
                  }`}
                >
                  All ({projects.length})
                </button>
                <button
                  onClick={() => setProjectStatusFilter('visible')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    projectStatusFilter === 'visible'
                      ? 'bg-emerald-500/20 text-emerald-400 font-bold'
                      : 'text-white/40 hover:text-white'
                  }`}
                >
                  Live Visuals ({visibleCount})
                </button>
                <button
                  onClick={() => setProjectStatusFilter('hidden')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    projectStatusFilter === 'hidden'
                      ? 'bg-amber-500/20 text-amber-400 font-bold'
                      : 'text-white/40 hover:text-white'
                  }`}
                >
                  Placeholders ({hiddenCount})
                </button>
              </div>
            </div>

            {/* Projects Table / Card Grid */}
            <div className="space-y-4">
              {filteredProjects.length === 0 ? (
                <div className="p-12 text-center rounded-2xl glass border border-white/10 font-mono text-xs text-white/40">
                  No projects match your search query.
                </div>
              ) : (
                filteredProjects.map((project, idx) => {
                  const isVisible = project.hasVisuals !== false && project.featured !== false;
                  const tags = project.stackTags || project.techStack || [];

                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      className={`p-5 sm:p-6 rounded-2xl glass-heavy border transition-all text-left relative overflow-hidden ${
                        isVisible
                          ? 'border-white/15 hover:border-orange-500/40'
                          : 'border-white/5 opacity-75 bg-black/40'
                      }`}
                    >
                      <HUDCorners size="sm" />

                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        {/* Left Info */}
                        <div className="space-y-2 flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/80">
                              NODE {project.num || String(idx + 1).padStart(2, '0')}
                            </span>
                            <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                              {project.category || 'Web & Mobile App'}
                            </span>
                            <span className="text-[10px] font-mono text-white/30">
                              ID: <code>{project.id}</code>
                            </span>

                            {/* Visibility Badge */}
                            <span
                              className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider flex items-center space-x-1 ${
                                isVisible
                                  ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400'
                                  : 'bg-amber-500/15 border border-amber-500/30 text-amber-400'
                              }`}
                            >
                              {isVisible ? (
                                <>
                                  <Eye className="w-3 h-3" />
                                  <span>LIVE VISIBLE CARD</span>
                                </>
                              ) : (
                                <>
                                  <EyeOff className="w-3 h-3" />
                                  <span>HIDDEN PLACEHOLDER</span>
                                </>
                              )}
                            </span>
                          </div>

                          <h3 className="text-lg sm:text-xl font-bold font-display text-white truncate">
                            {project.title}
                          </h3>

                          {project.subtitle && (
                            <p className="text-xs text-white/60 font-sans">
                              {project.subtitle}
                            </p>
                          )}

                          {/* Tech Tags */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {tags.map((t) => (
                              <span
                                key={t}
                                className="px-2 py-0.5 text-[9px] font-mono rounded bg-white/5 border border-white/10 text-white/70"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Right Quick Actions */}
                        <div className="flex flex-wrap items-center gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-white/5">
                          {/* 1-Click Visibility Toggle */}
                          <button
                            onClick={() => toggleProjectVisibility(project.id)}
                            className={`px-3.5 py-2 rounded-xl border font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-all cursor-pointer ${
                              isVisible
                                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20'
                                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                            }`}
                            title={isVisible ? 'Hide this card from live portfolio' : 'Make this card visible on live portfolio'}
                          >
                            {isVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            <span>{isVisible ? 'HIDE CARD' : 'SHOW CARD'}</span>
                          </button>

                          {/* Edit Button */}
                          <button
                            onClick={() => {
                              setEditingProject(project);
                              setIsProjectModalOpen(true);
                            }}
                            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-colors cursor-pointer"
                          >
                            <Edit className="w-3.5 h-3.5 text-orange-400" />
                            <span>EDIT</span>
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDeleteProject(project.id, project.title)}
                            className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 text-white/50 hover:text-red-400 transition-colors cursor-pointer"
                            title="Delete Project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: MANAGE CERTIFICATES / AI VAULT
           ========================================================================= */}
        {activeTab === 'certificates' && (
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="flex items-center justify-between gap-4 p-4 rounded-2xl glass border border-white/10">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={certSearch}
                  onChange={(e) => setCertSearch(e.target.value)}
                  placeholder="Search certificates by title, category, or badge code..."
                  className="w-full bg-black/60 border border-white/15 focus:border-cyan-500 rounded-xl pl-10 pr-4 py-2.5 text-white text-xs font-mono outline-none transition-all placeholder:text-white/30"
                />
              </div>
            </div>

            {/* Certs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCerts.map((cert, idx) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  className="p-5 rounded-2xl glass-heavy border border-white/15 hover:border-cyan-500/40 transition-all text-left relative overflow-hidden flex flex-col justify-between"
                >
                  <HUDCorners size="sm" />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                        {cert.badgeId || `CERT-${idx + 1}`}
                      </span>
                      <span className="text-[10px] font-mono text-white/40 uppercase">
                        {cert.category}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold font-display text-white">
                      {cert.title}
                    </h4>
                    <p className="text-xs text-white/60 font-sans line-clamp-2">
                      {cert.description || cert.summary}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {(cert.skills || cert.stackTags || []).slice(0, 4).map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 text-[8px] font-mono rounded bg-white/5 border border-white/10 text-white/60"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-cyan-400 font-semibold">
                      {cert.issuer || 'Anthropic'}
                    </span>

                    <div className="flex items-center space-x-1.5">
                      <button
                        onClick={() => {
                          setEditingCert(cert);
                          setIsCertModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-mono text-xs transition-colors cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCert(cert.id, cert.title)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/50 hover:text-red-400 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: SITE CONTENT & COPYWRITING
           ========================================================================= */}
        {activeTab === 'content' && (
          <SiteContentEditor
            siteContent={siteContent}
            onSaveContent={updateSiteContent}
            showToast={showToast}
          />
        )}

        {/* =========================================================================
            TAB 4: SECURITY & SYSTEM SETTINGS
           ========================================================================= */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto space-y-6 text-left">
            {/* Passcode update */}
            <div className="p-6 rounded-2xl glass-heavy border border-orange-500/30 space-y-4 relative">
              <HUDCorners size="sm" />
              <div className="flex items-center space-x-2 text-orange-400 font-mono text-sm font-bold">
                <Lock className="w-4 h-4" />
                <span>CHANGE ADMINISTRATIVE PASSCODE</span>
              </div>
              <p className="text-xs text-white/60 font-sans leading-relaxed">
                Update the security passcode required to access the `/admin` dashboard. This is saved securely to your browser's local state.
              </p>

              <form onSubmit={handleUpdatePasscode} className="space-y-3 pt-2">
                <input
                  type="password"
                  value={newPasscode}
                  onChange={(e) => setNewPasscode(e.target.value)}
                  placeholder="Enter new admin passcode..."
                  required
                  className="w-full bg-black/60 border border-white/15 focus:border-orange-500 rounded-xl px-4 py-2.5 text-white text-xs font-mono outline-none transition-all"
                />
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Save New Passcode
                  </button>
                  {passcodeSuccess && (
                    <span className="text-xs font-mono text-emerald-400 flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{passcodeSuccess}</span>
                    </span>
                  )}
                </div>
              </form>
            </div>

            {/* Reset to defaults */}
            <div className="p-6 rounded-2xl glass-heavy border border-red-500/20 space-y-3 relative">
              <HUDCorners size="sm" />
              <div className="flex items-center space-x-2 text-red-400 font-mono text-sm font-bold">
                <RefreshCw className="w-4 h-4" />
                <span>RESTORE ORIGINAL PORTFOLIO DEFAULTS</span>
              </div>
              <p className="text-xs text-white/60 font-sans leading-relaxed">
                Clear all custom local additions and restore the original 7 verified projects, 6 Claude certificates, and master copywriting defaults from <code>portfolioData.js</code>.
              </p>
              <button
                onClick={() => {
                  if (window.confirm('Reset all portfolio projects, certificates, and site copywriting back to original defaults?')) {
                    resetToDefaults();
                    showToast('Portfolio data restored to default settings.');
                  }
                }}
                className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                Reset to Default Data
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-obsidian/95 border border-orange-500/40 text-orange-400 font-mono text-xs shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(255,87,34,0.25)] flex items-center space-x-2 backdrop-blur-md"
          >
            <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <ProjectFormModal
        isOpen={isProjectModalOpen}
        onClose={() => {
          setIsProjectModalOpen(false);
          setEditingProject(null);
        }}
        onSave={handleSaveProject}
        editingProject={editingProject}
      />

      <CertificateFormModal
        isOpen={isCertModalOpen}
        onClose={() => {
          setIsCertModalOpen(false);
          setEditingCert(null);
        }}
        onSave={handleSaveCert}
        editingCert={editingCert}
      />

      <DataExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
}
