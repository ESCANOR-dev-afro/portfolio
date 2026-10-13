import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Upload,
  Download,
  CheckCircle2,
  Sparkles,
  User,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Globe,
  Award,
  Terminal,
  RefreshCw,
  Trash2,
  Save,
  Check,
  AlertTriangle,
} from 'lucide-react';
import HUDCorners from '../ui/HUDCorners';
import { readDocumentFile, downloadFileFromDataUrl } from '../../utils/fileUploadHelper';

export default function SiteContentEditor({
  siteContent,
  onSaveContent,
  onResetContent,
  showToast,
}) {
  const [activeSectionTab, setActiveSectionTab] = useState('hero'); // 'hero' | 'about' | 'contact' | 'cv'
  const [formData, setFormData] = useState(siteContent);
  const [isSaved, setIsSaved] = useState(false);
  const [isUploadingDoc, setIsUploadingDoc] = useState(false);
  const docInputRef = useRef(null);

  // Sync internal state if prop updates
  const handleFieldChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
    setIsSaved(false);
  };

  const handleSave = (e) => {
    if (e) e.preventDefault();
    onSaveContent(formData);
    setIsSaved(true);
    showToast?.('Master site copywriting & content updated successfully!');
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleDocUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingDoc(true);
    try {
      const docData = await readDocumentFile(file);
      const updatedCv = {
        documentName: docData.name,
        customDocDataUrl: docData.dataUrl,
        customDocName: docData.name,
        customDocSize: docData.sizeFormatted,
        customDocMime: docData.mimeType,
        lastUpdated: docData.uploadedAt,
      };

      const newContent = {
        ...formData,
        cv: updatedCv,
      };

      setFormData(newContent);
      onSaveContent(newContent);
      showToast?.(`Uploaded and activated new CV: "${docData.name}"`);
    } catch (err) {
      console.error('Doc upload failed:', err);
      alert('Failed to upload document. Please ensure it is a valid .doc, .docx, or .pdf file.');
    } finally {
      setIsUploadingDoc(false);
      if (docInputRef.current) docInputRef.current.value = '';
    }
  };

  const handleResetDoc = () => {
    if (window.confirm('Reset CV download back to the default system Master CV (.doc)?')) {
      const resetCv = {
        documentName: 'Samuel_Patrick_Master_CV.doc',
        customDocDataUrl: null,
        customDocName: null,
        customDocSize: null,
        lastUpdated: new Date().toISOString(),
      };
      const newContent = { ...formData, cv: resetCv };
      setFormData(newContent);
      onSaveContent(newContent);
      showToast?.('Restored default Master CV document.');
    }
  };

  const handleTestDownloadDoc = () => {
    if (formData.cv?.customDocDataUrl) {
      downloadFileFromDataUrl(
        formData.cv.customDocDataUrl,
        formData.cv.customDocName || 'Samuel_Patrick_CV.pdf',
        formData.cv.customDocMime
      );
    } else {
      downloadFileFromDataUrl(
        '/Samuel_Patrick_Master_CV.doc',
        'Samuel_Patrick_Master_CV.doc',
        'application/msword'
      );
    }
  };

  const hasCustomDoc = Boolean(formData.cv?.customDocDataUrl);

  return (
    <div className="space-y-6 text-left">
      {/* Top Header & Save Control */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl glass border border-white/10">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight flex items-center space-x-2.5">
            <Sparkles className="w-5 h-5 text-orange-400" />
            <span>MASTER SITE CONTENT &amp; COPYWRITING</span>
          </h2>
          <p className="text-xs text-white/50 font-mono mt-1">
            Modify all live hero text, career biographies, contact coordinates, and CV files in real time.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-[0_0_20px_rgba(255,87,34,0.4)] transition-all cursor-pointer"
          >
            {isSaved ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>SAVED &amp; SYNCED</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>SAVE ALL CHANGES</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Section Sub-Navigation Tabs */}
      <div className="flex space-x-2 overflow-x-auto border-b border-white/10 pb-3 font-mono text-xs">
        {[
          { id: 'hero', label: '1. HERO & TAGLINES', icon: Sparkles },
          { id: 'about', label: '2. ABOUT & CAREER BIO', icon: User },
          { id: 'contact', label: '3. CONTACT & SOCIAL CHANNELS', icon: Mail },
          { id: 'cv', label: '4. CV DOCUMENT MANAGER', icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSectionTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap flex items-center space-x-2 ${
                activeSectionTab === tab.id
                  ? 'bg-orange-500 text-white shadow-[0_0_15px_rgba(255,87,34,0.35)]'
                  : 'text-white/50 hover:text-white bg-white/5 border border-white/5'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* =========================================================================
          TAB 1: HERO & TAGLINES
         ========================================================================= */}
      {activeSectionTab === 'hero' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="p-6 rounded-2xl glass-heavy border border-orange-500/30 space-y-5 relative">
            <HUDCorners size="sm" />
            <h3 className="text-sm font-mono font-bold text-orange-400 uppercase tracking-wider">
              Hero Section Headlines &amp; Taglines
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-white/70 uppercase">
                  Main Headline (Line 1)
                </label>
                <input
                  type="text"
                  value={formData.hero?.headlinePart1 || ''}
                  onChange={(e) => handleFieldChange('hero', 'headlinePart1', e.target.value)}
                  placeholder="Engineering."
                  className="w-full bg-black/60 border border-white/15 focus:border-orange-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none font-display font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-white/70 uppercase">
                  Main Headline (Line 2 with Glow)
                </label>
                <input
                  type="text"
                  value={formData.hero?.headlinePart2 || ''}
                  onChange={(e) => handleFieldChange('hero', 'headlinePart2', e.target.value)}
                  placeholder="Ideas Into Reality."
                  className="w-full bg-black/60 border border-white/15 focus:border-orange-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none font-display font-bold"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-white/70 uppercase">
                Top Status Pill (Above Headline)
              </label>
              <input
                type="text"
                value={formData.hero?.statusPill || ''}
                onChange={(e) => handleFieldChange('hero', 'statusPill', e.target.value)}
                placeholder="FULL-STACK SOFTWARE ENGINEER • WEB & MOBILE"
                className="w-full bg-black/60 border border-white/15 focus:border-orange-500 rounded-xl px-4 py-2.5 text-white text-xs font-mono outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-white/70 uppercase">
                Hero Bio Narrative Summary
              </label>
              <textarea
                rows={4}
                value={formData.hero?.bio || ''}
                onChange={(e) => handleFieldChange('hero', 'bio', e.target.value)}
                placeholder="Building software is about solving real problems, creating value, and delivering smooth user experiences..."
                className="w-full bg-black/60 border border-white/15 focus:border-orange-500 rounded-xl p-4 text-white text-sm font-sans outline-none leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-white/70 uppercase">
                  Location &amp; Remote Badge
                </label>
                <input
                  type="text"
                  value={formData.hero?.locationStatus || ''}
                  onChange={(e) => handleFieldChange('hero', 'locationStatus', e.target.value)}
                  placeholder="LOCATION: NIGERIA • REMOTE WORLDWIDE"
                  className="w-full bg-black/60 border border-white/15 focus:border-orange-500 rounded-xl px-4 py-2.5 text-white text-xs font-mono outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-white/70 uppercase">
                  Availability Pill Text
                </label>
                <input
                  type="text"
                  value={formData.hero?.availabilityStatus || ''}
                  onChange={(e) => handleFieldChange('hero', 'availabilityStatus', e.target.value)}
                  placeholder="AVAILABLE FOR NEW PROJECTS"
                  className="w-full bg-black/60 border border-white/15 focus:border-orange-500 rounded-xl px-4 py-2.5 text-white text-xs font-mono outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-white/70 uppercase">
                  Primary CTA Button Label
                </label>
                <input
                  type="text"
                  value={formData.hero?.primaryCtaText || ''}
                  onChange={(e) => handleFieldChange('hero', 'primaryCtaText', e.target.value)}
                  placeholder="View Featured Projects"
                  className="w-full bg-black/60 border border-white/15 focus:border-orange-500 rounded-xl px-4 py-2.5 text-white text-xs outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-white/70 uppercase">
                  Secondary CTA Button Label
                </label>
                <input
                  type="text"
                  value={formData.hero?.secondaryCtaText || ''}
                  onChange={(e) => handleFieldChange('hero', 'secondaryCtaText', e.target.value)}
                  placeholder="Download Resume (.DOC)"
                  className="w-full bg-black/60 border border-white/15 focus:border-orange-500 rounded-xl px-4 py-2.5 text-white text-xs outline-none"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* =========================================================================
          TAB 2: ABOUT & CAREER BIO
         ========================================================================= */}
      {activeSectionTab === 'about' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="p-6 rounded-2xl glass-heavy border border-orange-500/30 space-y-5 relative">
            <HUDCorners size="sm" />
            <h3 className="text-sm font-mono font-bold text-orange-400 uppercase tracking-wider">
              About Section Narrative &amp; Experience
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-white/70 uppercase">
                  Section Headline
                </label>
                <input
                  type="text"
                  value={formData.about?.title || ''}
                  onChange={(e) => handleFieldChange('about', 'title', e.target.value)}
                  placeholder="About Samuel Patrick"
                  className="w-full bg-black/60 border border-white/15 focus:border-orange-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none font-display font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-white/70 uppercase">
                  Badge Header
                </label>
                <input
                  type="text"
                  value={formData.about?.badge || ''}
                  onChange={(e) => handleFieldChange('about', 'badge', e.target.value)}
                  placeholder="About Me • Background & Experience"
                  className="w-full bg-black/60 border border-white/15 focus:border-orange-500 rounded-xl px-4 py-2.5 text-white text-xs font-mono outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-white/70 uppercase">
                Paragraph 1 (Education &amp; Background)
              </label>
              <textarea
                rows={3}
                value={formData.about?.paragraph1 || ''}
                onChange={(e) => handleFieldChange('about', 'paragraph1', e.target.value)}
                placeholder="I am a Full-Stack Web and Mobile Application Developer studying Computer Science at Tai Solarin Federal University of Education..."
                className="w-full bg-black/60 border border-white/15 focus:border-orange-500 rounded-xl p-4 text-white text-sm font-sans outline-none leading-relaxed"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-white/70 uppercase">
                Paragraph 2 (Industrial Training &amp; Real Systems)
              </label>
              <textarea
                rows={3}
                value={formData.about?.paragraph2 || ''}
                onChange={(e) => handleFieldChange('about', 'paragraph2', e.target.value)}
                placeholder="During my 3-month Industrial Training (SIWES) at InfoSystem Consulting, I engineered core offline database structures..."
                className="w-full bg-black/60 border border-white/15 focus:border-orange-500 rounded-xl p-4 text-white text-sm font-sans outline-none leading-relaxed"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-white/70 uppercase">
                Paragraph 3 (Technical Focus &amp; Philosophy)
              </label>
              <textarea
                rows={3}
                value={formData.about?.paragraph3 || ''}
                onChange={(e) => handleFieldChange('about', 'paragraph3', e.target.value)}
                placeholder="My core toolset spans React, Next.js, TypeScript, Flutter, Dart, Supabase, PostgreSQL, and Firebase..."
                className="w-full bg-black/60 border border-white/15 focus:border-orange-500 rounded-xl p-4 text-white text-sm font-sans outline-none leading-relaxed"
              />
            </div>

            {/* Stats Row */}
            <div className="pt-2">
              <label className="text-xs font-mono text-orange-400 uppercase font-bold block mb-3">
                Key Bio Counters / Stats
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-2">
                  <input
                    type="text"
                    value={formData.about?.stat1Value || ''}
                    onChange={(e) => handleFieldChange('about', 'stat1Value', e.target.value)}
                    placeholder="7 Apps"
                    className="w-full bg-black/60 border border-white/15 rounded-lg px-3 py-1.5 text-orange-400 font-mono font-bold text-sm"
                  />
                  <input
                    type="text"
                    value={formData.about?.stat1Label || ''}
                    onChange={(e) => handleFieldChange('about', 'stat1Label', e.target.value)}
                    placeholder="FEATURED PROJECTS"
                    className="w-full bg-black/60 border border-white/15 rounded-lg px-3 py-1.5 text-white/60 font-mono text-[10px] uppercase"
                  />
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-2">
                  <input
                    type="text"
                    value={formData.about?.stat2Value || ''}
                    onChange={(e) => handleFieldChange('about', 'stat2Value', e.target.value)}
                    placeholder="TASFUED"
                    className="w-full bg-black/60 border border-white/15 rounded-lg px-3 py-1.5 text-amber-400 font-mono font-bold text-sm"
                  />
                  <input
                    type="text"
                    value={formData.about?.stat2Label || ''}
                    onChange={(e) => handleFieldChange('about', 'stat2Label', e.target.value)}
                    placeholder="COMPUTER SCIENCE"
                    className="w-full bg-black/60 border border-white/15 rounded-lg px-3 py-1.5 text-white/60 font-mono text-[10px] uppercase"
                  />
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-2">
                  <input
                    type="text"
                    value={formData.about?.stat3Value || ''}
                    onChange={(e) => handleFieldChange('about', 'stat3Value', e.target.value)}
                    placeholder="SIWES"
                    className="w-full bg-black/60 border border-white/15 rounded-lg px-3 py-1.5 text-white font-mono font-bold text-sm"
                  />
                  <input
                    type="text"
                    value={formData.about?.stat3Label || ''}
                    onChange={(e) => handleFieldChange('about', 'stat3Label', e.target.value)}
                    placeholder="INFOSYSTEM INTERN"
                    className="w-full bg-black/60 border border-white/15 rounded-lg px-3 py-1.5 text-white/60 font-mono text-[10px] uppercase"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* =========================================================================
          TAB 3: CONTACT & SOCIAL CHANNELS
         ========================================================================= */}
      {activeSectionTab === 'contact' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="p-6 rounded-2xl glass-heavy border border-orange-500/30 space-y-5 relative">
            <HUDCorners size="sm" />
            <h3 className="text-sm font-mono font-bold text-orange-400 uppercase tracking-wider">
              Direct Contact Details &amp; Profile Coordinates
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-white/70 uppercase">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.contact?.name || ''}
                  onChange={(e) => handleFieldChange('contact', 'name', e.target.value)}
                  placeholder="Samuel Imole Patrick"
                  className="w-full bg-black/60 border border-white/15 focus:border-orange-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-white/70 uppercase">
                  Codename / Alias
                </label>
                <input
                  type="text"
                  value={formData.contact?.codename || ''}
                  onChange={(e) => handleFieldChange('contact', 'codename', e.target.value)}
                  placeholder="ESCANOR"
                  className="w-full bg-black/60 border border-white/15 focus:border-orange-500 rounded-xl px-4 py-2.5 text-white text-sm font-mono outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-white/70 uppercase flex items-center space-x-1.5">
                  <Mail className="w-3.5 h-3.5 text-orange-400" />
                  <span>Primary Email Address</span>
                </label>
                <input
                  type="email"
                  value={formData.contact?.email || ''}
                  onChange={(e) => handleFieldChange('contact', 'email', e.target.value)}
                  placeholder="samuelimolepatrick@gmail.com"
                  className="w-full bg-black/60 border border-white/15 focus:border-orange-500 rounded-xl px-4 py-2.5 text-white text-sm font-mono outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-white/70 uppercase flex items-center space-x-1.5">
                  <Phone className="w-3.5 h-3.5 text-orange-400" />
                  <span>Phone Number / WhatsApp</span>
                </label>
                <input
                  type="text"
                  value={formData.contact?.phone || ''}
                  onChange={(e) => handleFieldChange('contact', 'phone', e.target.value)}
                  placeholder="+234 814 922 4954"
                  className="w-full bg-black/60 border border-white/15 focus:border-orange-500 rounded-xl px-4 py-2.5 text-white text-sm font-mono outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-white/70 uppercase flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-orange-400" />
                  <span>Geographic Location</span>
                </label>
                <input
                  type="text"
                  value={formData.contact?.location || ''}
                  onChange={(e) => handleFieldChange('contact', 'location', e.target.value)}
                  placeholder="Mowe, Ogun State, Nigeria"
                  className="w-full bg-black/60 border border-white/15 focus:border-orange-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-white/70 uppercase flex items-center space-x-1.5">
                  <Globe className="w-3.5 h-3.5 text-orange-400" />
                  <span>Portfolio Web URL</span>
                </label>
                <input
                  type="url"
                  value={formData.contact?.portfolioUrl || ''}
                  onChange={(e) => handleFieldChange('contact', 'portfolioUrl', e.target.value)}
                  placeholder="https://about-sammy.vercel.app"
                  className="w-full bg-black/60 border border-white/15 focus:border-orange-500 rounded-xl px-4 py-2.5 text-white text-sm font-mono outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-white/70 uppercase flex items-center space-x-1.5">
                  <Github className="w-3.5 h-3.5 text-white/60" />
                  <span>GitHub Profile URL</span>
                </label>
                <input
                  type="url"
                  value={formData.contact?.github || ''}
                  onChange={(e) => handleFieldChange('contact', 'github', e.target.value)}
                  placeholder="https://github.com/ESCANOR-dev-afro"
                  className="w-full bg-black/60 border border-white/15 focus:border-orange-500 rounded-xl px-4 py-2.5 text-white text-sm font-mono outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-white/70 uppercase flex items-center space-x-1.5">
                  <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>LinkedIn Profile URL</span>
                </label>
                <input
                  type="url"
                  value={formData.contact?.linkedin || ''}
                  onChange={(e) => handleFieldChange('contact', 'linkedin', e.target.value)}
                  placeholder="https://www.linkedin.com/in/samuel-patrick-722b82423"
                  className="w-full bg-black/60 border border-white/15 focus:border-orange-500 rounded-xl px-4 py-2.5 text-white text-sm font-mono outline-none"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* =========================================================================
          TAB 4: CV & RESUME DOCUMENT MANAGER
         ========================================================================= */}
      {activeSectionTab === 'cv' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="p-6 rounded-2xl glass-heavy border border-orange-500/30 space-y-6 relative">
            <HUDCorners size="sm" />
            <div>
              <h3 className="text-sm font-mono font-bold text-orange-400 uppercase tracking-wider flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>MASTER CV / RESUME ASSET DISPATCHER</span>
              </h3>
              <p className="text-xs text-white/60 font-sans mt-1">
                Upload your latest Microsoft Word (<code>.doc</code>, <code>.docx</code>) or PDF (<code>.pdf</code>) resume file directly from your computer or phone. Recruiters and visitors clicking "Download CV" on the live portfolio will immediately download this updated file!
              </p>
            </div>

            {/* Current Active CV Status Card */}
            <div className="p-4 rounded-xl bg-black/60 border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3.5">
                <div className="w-12 h-12 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-white font-mono">
                      {formData.cv?.customDocName || formData.cv?.documentName || 'Samuel_Patrick_Master_CV.doc'}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider ${
                        hasCustomDoc
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-white/10 text-white/70 border border-white/15'
                      }`}
                    >
                      {hasCustomDoc ? 'CUSTOM UPLOAD ACTIVE' : 'DEFAULT BUILT-IN CV'}
                    </span>
                  </div>
                  <p className="text-[10px] text-white/50 font-mono mt-0.5">
                    {formData.cv?.customDocSize ? `File Size: ${formData.cv.customDocSize} • ` : ''}
                    Updated: {new Date(formData.cv?.lastUpdated || Date.now()).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleTestDownloadDoc}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-orange-400" />
                  <span>Test Download</span>
                </button>

                {hasCustomDoc && (
                  <button
                    type="button"
                    onClick={handleResetDoc}
                    className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 transition-colors cursor-pointer"
                    title="Reset to default document"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Upload New Document Dropzone */}
            <div className="space-y-3">
              <input
                ref={docInputRef}
                type="file"
                accept=".doc,.docx,.pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf"
                onChange={handleDocUpload}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => docInputRef.current?.click()}
                disabled={isUploadingDoc}
                className="w-full p-8 rounded-2xl border-2 border-dashed border-orange-500/30 hover:border-orange-500/70 bg-orange-500/[0.03] hover:bg-orange-500/[0.08] transition-all flex flex-col items-center justify-center space-y-3 cursor-pointer group text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-orange-500/15 border border-orange-500/30 group-hover:bg-orange-500/25 group-hover:scale-105 flex items-center justify-center text-orange-400 transition-all shadow-[0_0_20px_rgba(255,87,34,0.2)]">
                  {isUploadingDoc ? (
                    <RefreshCw className="w-6 h-6 animate-spin text-orange-400" />
                  ) : (
                    <Upload className="w-6 h-6 group-hover:-translate-y-0.5 transition-transform" />
                  )}
                </div>

                <div>
                  <span className="text-sm font-mono font-bold text-white group-hover:text-orange-400 transition-colors block">
                    {isUploadingDoc
                      ? 'Reading & Encoding Document...'
                      : 'Click to Upload New CV / Resume File (.doc, .docx, .pdf)'}
                  </span>
                  <span className="text-xs font-mono text-white/50 block mt-1">
                    Select your updated resume from your device to instantly overwrite the download link.
                  </span>
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Floating Save Reminder Bar */}
      {!isSaved && (
        <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-between text-xs font-mono">
          <span className="text-white/80">
            Unsaved changes present in copywriting store.
          </span>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-400 text-white font-bold uppercase transition-all cursor-pointer"
          >
            Save Now
          </button>
        </div>
      )}
    </div>
  );
}
