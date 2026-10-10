import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Award,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Github,
  Image,
  CheckCircle2,
} from 'lucide-react';
import HUDCorners from '../ui/HUDCorners';
import ImageUploader from './ImageUploader';

export default function CertificateFormModal({ isOpen, onClose, onSave, editingCert = null }) {
  const [formData, setFormData] = useState({
    id: '',
    nodeNumber: '',
    title: '',
    subtitle: '',
    category: 'AI Engineering',
    issuer: 'Anthropic / Claude Academy',
    badgeId: '',
    status: 'VERIFIED_CREDENTIAL',
    image: '/Claude Certificate/Claude 101.png',
    summary: '',
    description: '',
    stackTags: 'Claude Code CLI, Autonomous Workflows, Tool Calling',
    skills: 'Claude Code CLI, Autonomous Workflows, Tool Calling',
    liveUrl: 'https://anthropic.com',
    githubUrl: 'https://github.com/ESCANOR-dev-afro',
    accentColor: '#FF6A00',
  });

  useEffect(() => {
    if (editingCert) {
      setFormData({
        id: editingCert.id || '',
        nodeNumber: editingCert.nodeNumber || '',
        title: editingCert.title || '',
        subtitle: editingCert.subtitle || '',
        category: editingCert.category || 'AI Engineering',
        issuer: editingCert.issuer || 'Anthropic / Claude Academy',
        badgeId: editingCert.badgeId || '',
        status: editingCert.status || 'VERIFIED_CREDENTIAL',
        image: editingCert.image || '',
        summary: editingCert.summary || '',
        description: editingCert.description || '',
        stackTags: Array.isArray(editingCert.stackTags)
          ? editingCert.stackTags.join(', ')
          : editingCert.stackTags || '',
        skills: Array.isArray(editingCert.skills)
          ? editingCert.skills.join(', ')
          : editingCert.skills || '',
        liveUrl: editingCert.liveUrl || 'https://anthropic.com',
        githubUrl: editingCert.githubUrl || 'https://github.com/ESCANOR-dev-afro',
        accentColor: editingCert.accentColor || '#FF6A00',
      });
    } else {
      setFormData({
        id: `cert-${Date.now().toString(36)}`,
        nodeNumber: '',
        title: '',
        subtitle: 'Autonomous AI Coding & Terminal Engineering',
        category: 'AI Engineering',
        issuer: 'Anthropic / Claude Academy',
        badgeId: `AUTH-CC-${Date.now().toString(36).toUpperCase()}`,
        status: 'VERIFIED_CREDENTIAL',
        image: '/Claude Certificate/Claude 101.png',
        summary: '',
        description: '',
        stackTags: 'Claude Code CLI, Multi-Agent Systems, Tool Calling',
        skills: 'Claude Code CLI, Multi-Agent Systems, Tool Calling',
        liveUrl: 'https://anthropic.com',
        githubUrl: 'https://github.com/ESCANOR-dev-afro',
        accentColor: '#FF6A00',
      });
    }
  }, [editingCert, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter a Certificate Title.');
      return;
    }

    const tagsArray = formData.stackTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const skillsArray = formData.skills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const certPayload = {
      ...formData,
      id: formData.id || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      stackTags: tagsArray,
      skills: skillsArray.length > 0 ? skillsArray : tagsArray,
      summary: formData.summary || formData.subtitle,
      metrics: {
        domain: formData.category,
        level: 'Specialist',
        verificationDate: `${new Date().getFullYear()}`,
        accreditationTier: 'Official Credential',
      },
    };

    onSave(certPayload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="w-full max-w-2xl glass-heavy rounded-2xl border border-orange-500/30 overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.9)] my-8 text-left relative flex flex-col max-h-[90vh]"
      >
        <HUDCorners size="md" />

        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 bg-graphite/60 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
                {editingCert ? 'EDIT AI CREDENTIAL' : 'ADD NEW CLAUDE CERTIFICATE'}
              </h2>
              <p className="text-xs text-white/50 font-mono mt-0.5">
                Anthropic Claude Academy credential verification &amp; badge mapping.
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5 hud-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-8 space-y-1.5">
              <label className="text-xs font-mono text-white/70 uppercase tracking-wider">
                Certificate Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Claude Code 101"
                required
                className="w-full bg-black/60 border border-white/15 focus:border-orange-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-all font-bold"
              />
            </div>

            <div className="sm:col-span-4 space-y-1.5">
              <label className="text-xs font-mono text-white/70 uppercase tracking-wider">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-black/60 border border-white/15 focus:border-orange-500 rounded-xl px-4 py-2.5 text-white text-xs font-mono outline-none transition-all"
              >
                <option value="AI Engineering">AI Engineering</option>
                <option value="Enterprise AI">Enterprise AI</option>
                <option value="Creative Fluency">Creative Fluency</option>
                <option value="Full-Stack AI">Full-Stack AI</option>
                <option value="AI Architecture">AI Architecture</option>
                <option value="Core Foundations">Core Foundations</option>
                <option value="UI/UX & Prototyping">UI/UX & Prototyping</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-white/70 uppercase tracking-wider">
                Subtitle / Specialization
              </label>
              <input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                placeholder="Autonomous AI Coding & Terminal Engineering"
                className="w-full bg-black/60 border border-white/15 focus:border-orange-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-white/70 uppercase tracking-wider">
                Issuer Organization
              </label>
              <input
                type="text"
                name="issuer"
                value={formData.issuer}
                onChange={handleChange}
                placeholder="Anthropic / Claude Academy"
                className="w-full bg-black/60 border border-white/15 focus:border-orange-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-white/70 uppercase tracking-wider">
                Badge / Credential ID
              </label>
              <input
                type="text"
                name="badgeId"
                value={formData.badgeId}
                onChange={handleChange}
                placeholder="AUTH-CC101-AGENTIC"
                className="w-full bg-black/60 border border-white/15 focus:border-orange-500 rounded-xl px-4 py-2.5 text-white text-sm font-mono outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-white/70 uppercase tracking-wider">
                Accent Glow Color
              </label>
              <input
                type="text"
                name="accentColor"
                value={formData.accentColor}
                onChange={handleChange}
                placeholder="#FF6A00"
                className="w-full bg-black/60 border border-white/15 focus:border-orange-500 rounded-xl px-4 py-2.5 text-white text-sm font-mono outline-none transition-all"
              />
            </div>
          </div>

          {/* Certificate Image Asset Uploader */}
          <ImageUploader
            label="Certificate Badge / Diploma Image"
            value={formData.image}
            onChange={(newImg) => setFormData((prev) => ({ ...prev, image: newImg }))}
            icon={Award}
            hint="Upload credential badge or certificate diploma image directly from device gallery."
            recommendedSize="Landscape Diploma / Badge (4:3 or 16:9)"
          />

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-white/70 uppercase tracking-wider">
              Description / Competencies Covered
            </label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Certified in using Claude Code CLI for autonomous software development, multi-file codebase navigation, automated testing, terminal tool calling..."
              className="w-full bg-black/60 border border-white/15 focus:border-orange-500 rounded-xl p-4 text-white text-sm font-sans outline-none transition-all leading-relaxed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-white/70 uppercase tracking-wider">
              Skills &amp; Technology Tags (Comma-separated)
            </label>
            <input
              type="text"
              name="stackTags"
              value={formData.stackTags}
              onChange={handleChange}
              placeholder="Claude Code CLI, Multi-Agent Systems, Terminal Tools, Function Calling"
              className="w-full bg-black/60 border border-white/15 focus:border-orange-500 rounded-xl px-4 py-2.5 text-white text-sm font-mono outline-none transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-white/70 uppercase tracking-wider">
              Verification / Issuer URL
            </label>
            <input
              type="url"
              name="liveUrl"
              value={formData.liveUrl}
              onChange={handleChange}
              placeholder="https://anthropic.com"
              className="w-full bg-black/60 border border-white/15 focus:border-orange-500 rounded-xl px-4 py-2.5 text-white text-sm font-mono outline-none transition-all"
            />
          </div>

          {/* Action Buttons */}
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
              {editingCert ? 'Save Credential' : 'Add Credential to Vault'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
