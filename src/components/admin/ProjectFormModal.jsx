import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Plus,
  Trash2,
  ExternalLink,
  Github,
  Image,
  Sparkles,
  Layers,
  Code,
  ShieldCheck,
  Eye,
  EyeOff,
  CheckCircle2,
  Terminal,
  Smartphone,
  Monitor,
} from 'lucide-react';
import HUDCorners from '../ui/HUDCorners';
import ImageUploader from './ImageUploader';

const PREVIEW_TYPES = [
  { id: 'marketplace', label: 'E-Commerce Marketplace' },
  { id: 'scheduler', label: 'Scheduler Companion (Flutter)' },
  { id: 'automotive', label: 'Automotive Dealership Turntable' },
  { id: 'portal', label: 'Testing Portal (AWBA CBT)' },
  { id: 'fintech', label: 'Fintech Wallet' },
  { id: 'gilded-mobile', label: 'Hospitality Mobile App' },
  { id: 'gilded-web', label: 'Hospitality Web Dashboard' },
  { id: 'default', label: 'Standard Desktop/Mobile Viewport' },
];

export default function ProjectFormModal({ isOpen, onClose, onSave, editingProject = null }) {
  const [activeTab, setActiveTab] = useState('general'); // 'general' | 'features' | 'visuals' | 'preview'

  const [formData, setFormData] = useState({
    id: '',
    num: '',
    title: '',
    subtitle: '',
    category: 'Web App • Full-Stack',
    liveUrl: '',
    githubUrl: 'https://github.com/ESCANOR-dev-afro',
    image: '/screenshots/tasfued-landing.png',
    mobileImage: '/screenshots/tasfued-mobile.png',
    hasVisuals: true,
    featured: true,
    stackTags: 'React, Next.js, Supabase, PostgreSQL',
    description: '',
    challenge: '',
    hudMetrics: 'React + Vite, Supabase Auth, PostgreSQL DB, Live in Production',
    features: 'High-speed database indexing\nInstant search queries\nSecure authentication\nClean responsive design',
    previewType: 'default',
    accentColor: '#ff6a00',
  });

  useEffect(() => {
    if (editingProject) {
      setFormData({
        id: editingProject.id || '',
        num: editingProject.num || '',
        title: editingProject.title || '',
        subtitle: editingProject.subtitle || '',
        category: editingProject.category || 'Web App • Full-Stack',
        liveUrl: editingProject.liveUrl || '',
        githubUrl: editingProject.githubUrl || 'https://github.com/ESCANOR-dev-afro',
        image: editingProject.screenshots?.desktop || editingProject.image || '',
        mobileImage: editingProject.screenshots?.mobile || editingProject.image || '',
        hasVisuals: editingProject.hasVisuals !== false,
        featured: editingProject.featured !== false,
        stackTags: Array.isArray(editingProject.stackTags)
          ? editingProject.stackTags.join(', ')
          : editingProject.stackTags || '',
        description: editingProject.description || '',
        challenge: editingProject.challenge || '',
        hudMetrics: Array.isArray(editingProject.hudMetrics)
          ? editingProject.hudMetrics.join(', ')
          : editingProject.hudMetrics || '',
        features: Array.isArray(editingProject.features)
          ? editingProject.features.join('\n')
          : editingProject.features || '',
        previewType: editingProject.previewType || 'default',
        accentColor: editingProject.mockDetails?.accentColor || '#ff6a00',
      });
    } else {
      setFormData({
        id: `project-${Date.now().toString(36)}`,
        num: '',
        title: '',
        subtitle: '',
        category: 'Web App • Full-Stack',
        liveUrl: '',
        githubUrl: 'https://github.com/ESCANOR-dev-afro',
        image: '/screenshots/tasfued-landing.png',
        mobileImage: '/screenshots/tasfued-mobile.png',
        hasVisuals: true,
        featured: true,
        stackTags: 'React, TypeScript, Tailwind CSS, Supabase',
        description: '',
        challenge: '',
        hudMetrics: 'Production Verified, Fast Response, Clean Architecture',
        features: 'Modern intuitive user experience\nRobust state management\nOptimized query performance',
        previewType: 'default',
        accentColor: '#ff6a00',
      });
    }
    setActiveTab('general');
  }, [editingProject, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter a Project Title.');
      return;
    }

    const tagsArray = formData.stackTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const metricsArray = formData.hudMetrics
      .split(',')
      .map((m) => m.trim())
      .filter(Boolean);

    const featuresArray = formData.features
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const desktopImg = formData.image || '/screenshots/tasfued-landing.png';
    const mobileImg = formData.mobileImage || formData.image || '/screenshots/tasfued-mobile.png';

    const projectPayload = {
      ...formData,
      id: formData.id || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      image: desktopImg,
      mobileImage: mobileImg,
      stackTags: tagsArray,
      techStack: tagsArray,
      hudMetrics: metricsArray,
      features: featuresArray,
      screenshots: {
        desktop: desktopImg,
        desktopGallery: [
          {
            id: 'desktop-main',
            label: 'DESKTOP SHOWCASE',
            src: desktopImg,
            caption: `${formData.title} Interface`,
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
      mockDetails: {
        url: formData.liveUrl ? formData.liveUrl.replace(/^https?:\/\//, '') : 'app.internal.dev',
        accentColor: formData.accentColor || '#ff6a00',
        mobileScreens: ['Dashboard', 'Telemetry', 'Details'],
        stats: { status: 'Verified Deployment', latency: 'Fast (< 20ms)' },
      },
    };

    onSave(projectPayload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="w-full max-w-4xl glass-heavy rounded-2xl border border-orange-500/30 overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.9)] my-8 text-left relative flex flex-col max-h-[90vh]"
      >
        <HUDCorners size="md" />

        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 bg-graphite/60 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
                {editingProject ? 'EDIT PROJECT NODE' : 'ADD NEW PROJECT TO VAULT'}
              </h2>
              <p className="text-xs text-white/50 font-mono mt-0.5">
                Configure deployment specifications, live assets, and interactive telemetry.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-3 border-b border-white/10 bg-black/40 flex space-x-2 overflow-x-auto shrink-0">
          {[
            { id: 'general', label: '1. Basic Info & Tech' },
            { id: 'features', label: '2. Narrative & Architecture' },
            { id: 'visuals', label: '3. Visuals & Viewports' },
            { id: 'preview', label: '4. Live Card Preview' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-t-lg font-mono text-xs font-bold tracking-wider transition-all cursor-pointer whitespace-nowrap border-b-2 ${
                activeTab === tab.id
                  ? 'border-orange-500 text-orange-400 bg-white/5'
                  : 'border-transparent text-white/40 hover:text-white/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 hud-scrollbar">
          {/* TAB 1: General Info & Tech */}
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-8 space-y-1.5">
                  <label className="text-xs font-mono text-white/70 uppercase tracking-wider">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. TASFUED MARKETPLACE"
                    required
                    className="w-full bg-black/60 border border-white/15 focus:border-orange-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-all font-bold"
                  />
                </div>

                <div className="sm:col-span-4 space-y-1.5">
                  <label className="text-xs font-mono text-white/70 uppercase tracking-wider">
                    Node ID (Slug)
                  </label>
                  <input
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    placeholder="e.g. tasfued-marketplace"
                    className="w-full bg-black/60 border border-white/15 focus:border-orange-500 rounded-xl px-4 py-2.5 text-white text-sm font-mono outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-white/70 uppercase tracking-wider">
                    Subtitle / Punchline
                  </label>
                  <input
                    type="text"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleChange}
                    placeholder="e.g. Campus Marketplace for University Students"
                    className="w-full bg-black/60 border border-white/15 focus:border-orange-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-white/70 uppercase tracking-wider">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="e.g. Web App • E-Commerce"
                    className="w-full bg-black/60 border border-white/15 focus:border-orange-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-white/70 uppercase tracking-wider">
                  Tech Stack (Comma-separated)
                </label>
                <input
                  type="text"
                  name="stackTags"
                  value={formData.stackTags}
                  onChange={handleChange}
                  placeholder="React, Next.js, TypeScript, Tailwind CSS, Supabase, PostgreSQL"
                  className="w-full bg-black/60 border border-white/15 focus:border-orange-500 rounded-xl px-4 py-2.5 text-white text-sm font-mono outline-none transition-all"
                />
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['React', 'Next.js', 'TypeScript', 'Flutter', 'Dart', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Firebase', 'Electron', 'Node.js', 'Riverpod'].map(
                    (suggested) => (
                      <button
                        key={suggested}
                        type="button"
                        onClick={() => {
                          if (!formData.stackTags.includes(suggested)) {
                            setFormData((prev) => ({
                              ...prev,
                              stackTags: prev.stackTags
                                ? `${prev.stackTags}, ${suggested}`
                                : suggested,
                            }));
                          }
                        }}
                        className="px-2 py-0.5 rounded bg-white/5 hover:bg-orange-500/20 text-white/60 hover:text-orange-300 text-[10px] font-mono transition-colors cursor-pointer border border-white/5"
                      >
                        + {suggested}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-white/70 uppercase tracking-wider flex items-center space-x-1.5">
                    <ExternalLink className="w-3.5 h-3.5 text-orange-400" />
                    <span>Live Deployment URL</span>
                  </label>
                  <input
                    type="url"
                    name="liveUrl"
                    value={formData.liveUrl}
                    onChange={handleChange}
                    placeholder="https://yourapp.com"
                    className="w-full bg-black/60 border border-white/15 focus:border-orange-500 rounded-xl px-4 py-2.5 text-white text-sm font-mono outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-white/70 uppercase tracking-wider flex items-center space-x-1.5">
                    <Github className="w-3.5 h-3.5 text-white/60" />
                    <span>GitHub Repository URL</span>
                  </label>
                  <input
                    type="url"
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleChange}
                    placeholder="https://github.com/ESCANOR-dev-afro/project"
                    className="w-full bg-black/60 border border-white/15 focus:border-orange-500 rounded-xl px-4 py-2.5 text-white text-sm font-mono outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Narrative, Challenge & Features */}
          {activeTab === 'features' && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-white/70 uppercase tracking-wider">
                  Project Description (Clear, human-readable English)
                </label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the application, who it was built for, and the practical value it delivers..."
                  className="w-full bg-black/60 border border-white/15 focus:border-orange-500 rounded-xl p-4 text-white text-sm outline-none transition-all font-sans leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-white/70 uppercase tracking-wider flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                  <span>Architectural Challenge &amp; Solution</span>
                </label>
                <textarea
                  name="challenge"
                  rows={3}
                  value={formData.challenge}
                  onChange={handleChange}
                  placeholder="Explain an engineering challenge solved, e.g., 'Engineered an offline-first sync mechanism using local SQLite and IndexedDB, ensuring zero candidate answer data loss during power outages...'"
                  className="w-full bg-black/60 border border-white/15 focus:border-orange-500 rounded-xl p-4 text-white text-sm font-mono text-xs outline-none transition-all leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-white/70 uppercase tracking-wider">
                  Core Features (One bullet per line)
                </label>
                <textarea
                  name="features"
                  rows={4}
                  value={formData.features}
                  onChange={handleChange}
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3&#10;Feature 4"
                  className="w-full bg-black/60 border border-white/15 focus:border-orange-500 rounded-xl p-4 text-white text-sm font-sans outline-none transition-all leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-white/70 uppercase tracking-wider">
                  HUD Telemetry Metrics (Comma-separated 4 bullet pills)
                </label>
                <input
                  type="text"
                  name="hudMetrics"
                  value={formData.hudMetrics}
                  onChange={handleChange}
                  placeholder="React + Vite, Supabase Auth, PostgreSQL DB, Live in Production"
                  className="w-full bg-black/60 border border-white/15 focus:border-orange-500 rounded-xl px-4 py-2.5 text-white text-sm font-mono outline-none transition-all"
                />
              </div>
            </div>
          )}

          {/* TAB 3: Visuals & Viewports with Device Gallery Sync */}
          {activeTab === 'visuals' && (
            <div className="space-y-6">
              {/* Visibility & Visual Status Toggles */}
              <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2 text-sm font-bold text-white font-display">
                    {formData.hasVisuals ? (
                      <Eye className="w-4 h-4 text-orange-400" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-white/40" />
                    )}
                    <span>Visual Card Visibility Status</span>
                  </div>
                  <p className="text-xs text-white/60 font-sans mt-0.5">
                    {formData.hasVisuals
                      ? 'Card is visible in the main portfolio live project nodes list.'
                      : 'Card is temporarily hidden as a placeholder until final screenshots are ready.'}
                  </p>
                </div>

                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    name="hasVisuals"
                    checked={formData.hasVisuals}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  <span className="ml-3 text-xs font-mono font-bold text-white uppercase">
                    {formData.hasVisuals ? 'RENDER ACTIVE' : 'HIDE PLACEHOLDER'}
                  </span>
                </label>
              </div>

              {/* Viewport Image Uploaders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Desktop Screenshot */}
                <ImageUploader
                  label="Desktop Screenshot Asset"
                  value={formData.image}
                  onChange={(newImg) => setFormData((prev) => ({ ...prev, image: newImg }))}
                  icon={Monitor}
                  hint="Upload desktop browser screenshot (PNG, JPG, WebP) from device gallery."
                  recommendedSize="1600x1000 Desktop"
                />

                {/* Mobile Screenshot */}
                <ImageUploader
                  label="Mobile Screenshot Asset"
                  value={formData.mobileImage}
                  onChange={(newImg) => setFormData((prev) => ({ ...prev, mobileImage: newImg }))}
                  icon={Smartphone}
                  hint="Upload mobile phone screenshot from device gallery."
                  recommendedSize="Mobile Portrait (9:16)"
                />
              </div>

              {/* Viewport Simulation Fallback Engine */}
              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-mono text-white/70 uppercase tracking-wider">
                  Interactive Viewport Engine Mode
                </label>
                <select
                  name="previewType"
                  value={formData.previewType}
                  onChange={handleChange}
                  className="w-full bg-black/60 border border-white/15 focus:border-orange-500 rounded-xl px-4 py-2.5 text-white text-sm font-mono outline-none transition-all"
                >
                  {PREVIEW_TYPES.map((pt) => (
                    <option key={pt.id} value={pt.id} className="bg-obsidian text-white">
                      {pt.label} ({pt.id})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* TAB 4: Live Simulated Card Preview */}
          {activeTab === 'preview' && (
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-orange-400 flex items-center justify-between">
                <span>SIMULATED LIVE CARD RENDERING</span>
                <span>STATUS: {formData.hasVisuals ? 'VISIBLE' : 'HIDDEN'}</span>
              </div>

              <div className="p-6 rounded-2xl bg-black/60 border border-orange-500/30 text-left space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded border border-orange-500/30 text-orange-400 bg-orange-500/10">
                      PROJECT {formData.num || '0X'}
                    </span>
                    <span className="text-[10px] font-mono text-white/40 uppercase">
                      {formData.category}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-orange-400 animate-pulse">
                    ● {formData.liveUrl ? 'LIVE PRODUCTION' : 'ENTERPRISE SYSTEM'}
                  </span>
                </div>

                <h3 className="text-2xl font-bold font-display text-white">
                  {formData.title || 'UNTITLED PROJECT'}
                </h3>
                <p className="text-xs text-white/70 font-sans leading-relaxed">
                  {formData.description || 'No description entered yet.'}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {formData.stackTags
                    .split(',')
                    .map((t) => t.trim())
                    .filter(Boolean)
                    .map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded bg-orange-500/10 border border-orange-500/30 text-orange-300"
                      >
                        {tech}
                      </span>
                    ))}
                </div>

                {formData.challenge && (
                  <div className="p-3 rounded bg-white/5 border border-white/10 text-[11px] font-mono text-white/60">
                    <span className="font-bold text-orange-400 block mb-0.5">
                      ARCHITECTURAL HIGHLIGHT
                    </span>
                    {formData.challenge}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Bar */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(255,87,34,0.4)] cursor-pointer"
            >
              {editingProject ? 'Save Project Changes' : 'Add Project to Vault'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
