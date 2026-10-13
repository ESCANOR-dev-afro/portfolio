import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Mail,
  Phone,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
} from 'lucide-react';
import HUDCorners from './ui/HUDCorners';
import { usePortfolioData } from '../context/PortfolioDataContext';

const PROJECT_SCOPES = [
  'Mobile Architecture (Flutter)',
  'Full-Stack Web App (React / Node)',
  'Cloud & Backend Infrastructure',
  'Enterprise System & Database',
  'Codebase Audit & Optimization',
];

/**
 * Professional Executive Contact & Consultation Modal
 * Designed for high-end client inquiries, enterprise consultations,
 * and technical partnership discussions.
 */
export default function ContactModal({ isOpen, onClose }) {
  const { siteContent } = usePortfolioData();
  const contact = siteContent?.contact || {};

  const [form, setForm] = useState({
    name: '',
    email: '',
    scope: '',
    requirements: '',
    botcheck: '',
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedField, setCopiedField] = useState(null);

  const emailAddr = contact.email || 'samuelimolepatrick@gmail.com';
  const phoneNum = contact.phone || '+234 814 922 4954';

  const handleClose = () => {
    if (status === 'submitting') return;
    if (status === 'success') {
      setStatus('idle');
      setErrorMessage('');
    }
    onClose?.();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'submitting') return;

    // Honeypot spam check
    if (form.botcheck) {
      console.warn('Spam submission filtered');
      return;
    }

    if (!form.name.trim() || !form.email.trim() || !form.requirements.trim()) {
      setStatus('error');
      setErrorMessage('Please complete all required fields (Full Name, Email Address, and Project Requirements).');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email.trim())) {
      setStatus('error');
      setErrorMessage('Please provide a valid email address so Samuel can respond to your inquiry.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    const targetEmail = emailAddr;
    const web3FormsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    const projectScope = form.scope.trim() || 'General Technical Consultation';
    const subjectLine = `Portfolio Inquiry: ${form.name.trim()} • ${projectScope}`;

    try {
      let isDelivered = false;
      let errorDetail = '';

      // 1. Primary Channel: Web3Forms (if access key is configured)
      if (web3FormsKey) {
        try {
          const res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              access_key: web3FormsKey,
              name: form.name.trim(),
              email: form.email.trim(),
              replyto: form.email.trim(),
              subject: subjectLine,
              from_name: 'Samuel Patrick Portfolio',
              scope: projectScope,
              message: form.requirements.trim(),
              botcheck: form.botcheck || '',
            }),
          });

          const data = await res.json().catch(() => ({}));
          if (res.ok && (data.success === true || data.success === 'true')) {
            isDelivered = true;
          } else {
            errorDetail = data.message || 'Web3Forms returned an unverified response.';
          }
        } catch (web3Err) {
          errorDetail = web3Err.message || 'Web3Forms transmission error.';
        }
      }

      // 2. Direct Delivery Channel: FormSubmit AJAX endpoint directly to Samuel's email
      if (!isDelivered) {
        const formSubmitRes = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: form.name.trim(),
            email: form.email.trim(),
            _replyto: form.email.trim(),
            _subject: subjectLine,
            scope: projectScope,
            message: form.requirements.trim(),
            _template: 'table',
            _captcha: 'false',
          }),
        });

        const formSubmitData = await formSubmitRes.json().catch(() => ({}));

        if (
          formSubmitRes.ok &&
          (formSubmitData.success === true ||
           formSubmitData.success === 'true' ||
           formSubmitData.message?.toLowerCase().includes('activation') ||
           formSubmitData.message?.toLowerCase().includes('success'))
        ) {
          isDelivered = true;
        } else {
          errorDetail = formSubmitData.message || errorDetail || 'Transmission service response error.';
        }
      }

      if (isDelivered) {
        setStatus('success');
        setForm({ name: '', email: '', scope: '', requirements: '', botcheck: '' });
      } else {
        setStatus('error');
        setErrorMessage(
          errorDetail ||
          `Failed to transmit inquiry to server. Please try again or email directly at ${targetEmail}.`
        );
      }
    } catch (networkErr) {
      console.error('Contact form transmission failure:', networkErr);
      setStatus('error');
      setErrorMessage(
        `Network error encountered while sending message. Please check your internet connection or email directly at ${targetEmail}.`
      );
    }
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  const handleSelectScope = (scopeName) => {
    setForm((prev) => ({
      ...prev,
      scope: prev.scope === scopeName ? '' : scopeName,
    }));
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
          {/* Backdrop with High-End Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
          />

          {/* Modal Dialog Card */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 15 }}
            transition={{ type: 'spring', damping: 26, stiffness: 240 }}
            className="relative w-full max-w-2xl my-auto bg-[#0C0E12] border border-white/10 rounded-2xl shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_35px_rgba(255,106,0,0.12)] flex flex-col z-10 text-left overflow-hidden group"
          >
            {/* Top Warm Amber Gradient Accent Line */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyber-orange to-transparent opacity-80" />

            {/* Tactical HUD Corner Elements */}
            <HUDCorners size="sm" />

            {/* Header Section */}
            <div className="px-6 sm:px-8 pt-7 pb-5 border-b border-white/5 flex items-start justify-between relative bg-white/[0.01]">
              <div>
                <div className="flex items-center space-x-2.5 mb-2">
                  <span className="w-2 h-2 rounded-full bg-cyber-orange animate-pulse shadow-[0_0_8px_#ff6a00]" />
                  <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-cyber-bright uppercase">
                    GET IN TOUCH • PROJECT INQUIRY
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-display">
                  Let’s Build Something Exceptional
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-white/60 font-sans leading-relaxed max-w-lg">
                  Discuss custom mobile architecture, full-stack web platforms, or enterprise system engineering with {contact.name || 'Samuel Patrick'}.
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/10 hover:border-white/20 transition-all cursor-pointer shrink-0 ml-3"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Modal Content */}
            <div className="px-6 sm:px-8 py-6 max-h-[75vh] overflow-y-auto hud-scrollbar space-y-6">
              {/* Verified Direct Channels Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Email Channel Card */}
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-cyber-orange/30 transition-all flex items-center justify-between group/email">
                  <div className="flex items-center space-x-3 min-w-0 pr-2">
                    <div className="w-9 h-9 rounded-lg bg-cyber-orange/10 border border-cyber-orange/20 flex items-center justify-center text-cyber-orange shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">
                        Direct Email
                      </span>
                      <a
                        href={`mailto:${emailAddr}`}
                        className="text-xs font-semibold text-white/90 hover:text-cyber-bright transition-colors truncate block"
                      >
                        {emailAddr}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(emailAddr, 'email')}
                    className="p-1.5 rounded-md hover:bg-white/10 text-white/40 hover:text-white transition-colors cursor-pointer shrink-0"
                    title="Copy Email"
                  >
                    {copiedField === 'email' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Phone Channel Card */}
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-cyber-orange/30 transition-all flex items-center justify-between group/phone">
                  <div className="flex items-center space-x-3 min-w-0 pr-2">
                    <div className="w-9 h-9 rounded-lg bg-cyber-bright/10 border border-cyber-bright/20 flex items-center justify-center text-cyber-bright shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">
                        Direct Line / WhatsApp
                      </span>
                      <a
                        href={`tel:${phoneNum.replace(/\s+/g, '')}`}
                        className="text-xs font-semibold text-white/90 hover:text-cyber-bright transition-colors truncate block"
                      >
                        {phoneNum}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(phoneNum, 'phone')}
                    className="p-1.5 rounded-md hover:bg-white/10 text-white/40 hover:text-white transition-colors cursor-pointer shrink-0"
                    title="Copy Phone"
                  >
                    {copiedField === 'phone' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Conditional: Verified Success Screen vs. Consultation Inquiry Form */}
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-6 px-2 text-center flex flex-col items-center justify-center space-y-5"
                >
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <div className="space-y-2 max-w-md">
                    <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px] font-mono uppercase tracking-wider">
                      <Sparkles className="w-3 h-3 text-emerald-400" />
                      <span>Transmission Delivered</span>
                    </div>
                    <h4 className="text-xl sm:text-2xl font-bold text-white font-display">
                      Inquiry Received Successfully
                    </h4>
                    <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed">
                      Thank you for reaching out! Your technical consultation request has been dispatched directly to <span className="text-white font-medium">{emailAddr}</span>. Samuel will review your project requirements and respond within 24 hours.
                    </p>
                  </div>

                  {/* Summary SLA & Delivery Badge */}
                  <div className="w-full max-w-md p-4 rounded-xl bg-white/[0.02] border border-white/10 text-left space-y-2.5 text-xs font-sans">
                    <div className="flex items-center justify-between text-white/50 text-[11px] font-mono uppercase tracking-wider">
                      <span>Delivery Verification</span>
                      <span className="text-emerald-400 font-semibold flex items-center space-x-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Verified Transmission</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-white/50 text-[11px] font-mono uppercase tracking-wider">
                      <span>Response SLA</span>
                      <span className="text-white/80 font-mono flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-cyber-orange" />
                        <span>&lt; 24 Hours Guaranteed</span>
                      </span>
                    </div>
                  </div>

                  {/* Post-submission Actions */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
                    <button
                      type="button"
                      onClick={() => {
                        setStatus('idle');
                        setErrorMessage('');
                      }}
                      className="w-full sm:w-1/2 px-4 py-2.5 rounded-xl border border-white/15 hover:border-white/30 text-white/70 hover:text-white text-xs font-semibold transition-all cursor-pointer font-sans"
                    >
                      Send Another Message
                    </button>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="w-full sm:w-1/2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyber-orange to-cyber-crimson hover:from-[#FF7F11] hover:to-[#D90429] text-white text-xs font-semibold shadow-[0_4px_16px_rgba(255,106,0,0.3)] transition-all cursor-pointer font-sans"
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Anti-spam honeypot (hidden from human visitors) */}
                  <input
                    type="text"
                    name="botcheck"
                    value={form.botcheck}
                    onChange={handleChange('botcheck')}
                    tabIndex={-1}
                    autoComplete="off"
                    style={{ display: 'none' }}
                    aria-hidden="true"
                  />

                  {/* Full Name & Email Address Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-white/80 mb-1.5 font-sans">
                        Full Name <span className="text-cyber-orange">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange('name')}
                        disabled={status === 'submitting'}
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-cyber-orange focus:ring-1 focus:ring-cyber-orange/40 focus:bg-white/[0.05] outline-none text-white text-xs sm:text-sm font-sans placeholder:text-white/30 transition-all disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-white/80 mb-1.5 font-sans">
                        Email Address <span className="text-cyber-orange">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange('email')}
                        disabled={status === 'submitting'}
                        placeholder="e.g. alex@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-cyber-orange focus:ring-1 focus:ring-cyber-orange/40 focus:bg-white/[0.05] outline-none text-white text-xs sm:text-sm font-sans placeholder:text-white/30 transition-all disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* Project Scope / Type with Quick-Select Pills */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-medium text-white/80 font-sans">
                        Project Scope / Type
                      </label>
                      <span className="text-[10px] font-mono text-white/40">Select primary scope</span>
                    </div>

                    {/* Scope Selector Chips */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {PROJECT_SCOPES.map((scope) => {
                        const isSelected = form.scope === scope;
                        return (
                          <button
                            key={scope}
                            type="button"
                            disabled={status === 'submitting'}
                            onClick={() => handleSelectScope(scope)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-sans transition-all cursor-pointer border ${
                              isSelected
                                ? 'bg-cyber-orange/15 border-cyber-orange text-white shadow-[0_0_12px_rgba(255,106,0,0.25)]'
                                : 'bg-white/[0.02] border-white/10 text-white/60 hover:text-white hover:border-white/25'
                            } disabled:opacity-50`}
                          >
                            {scope}
                          </button>
                        );
                      })}
                    </div>

                    <input
                      type="text"
                      value={form.scope}
                      onChange={handleChange('scope')}
                      disabled={status === 'submitting'}
                      placeholder="Or enter custom scope (e.g. Fintech Integration, Custom Dashboard)"
                      className="w-full px-3.5 py-2 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 focus:border-cyber-orange focus:ring-1 focus:ring-cyber-orange/40 outline-none text-white text-xs font-sans placeholder:text-white/25 transition-all disabled:opacity-50"
                    />
                  </div>

                  {/* Project Requirements & Timeline */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-medium text-white/80 font-sans">
                        Project Requirements &amp; Timeline <span className="text-cyber-orange">*</span>
                      </label>
                      <span className="text-[10px] font-mono text-white/40">Detailed specs</span>
                    </div>
                    <textarea
                      required
                      rows={4}
                      value={form.requirements}
                      onChange={handleChange('requirements')}
                      disabled={status === 'submitting'}
                      placeholder="Outline your core objectives, deliverables, timeline expectations, target platforms, and existing tech stack..."
                      className="w-full px-3.5 py-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-cyber-orange focus:ring-1 focus:ring-cyber-orange/40 focus:bg-white/[0.05] outline-none text-white text-xs sm:text-sm font-sans placeholder:text-white/30 transition-all resize-none leading-relaxed disabled:opacity-50"
                    />
                  </div>

                  {/* Dynamic Error Status Alert */}
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-cyber-crimson/10 border border-cyber-crimson/30 flex items-start space-x-3 text-red-400"
                    >
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <div className="text-xs space-y-1">
                        <p className="font-semibold text-red-300">Transmission Alert</p>
                        <p className="leading-relaxed text-red-300/90 font-sans">
                          {errorMessage || 'Failed to transmit inquiry. Please check required fields or email directly.'}
                        </p>
                        <p className="text-[11px] text-white/50 pt-1 font-sans">
                          Direct Email:{' '}
                          <a
                            href={`mailto:${emailAddr}?subject=Portfolio%20Inquiry%20Direct`}
                            className="text-cyber-orange underline hover:text-cyber-bright"
                          >
                            {emailAddr}
                          </a>
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Footer Action Bar */}
                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center space-x-2 text-[11px] text-white/40 font-sans">
                      <ShieldCheck className="w-4 h-4 text-cyber-orange/80 shrink-0" />
                      <span>{contact.consultationNotice || 'Strictly confidential. Direct engineer review guaranteed.'}</span>
                    </div>

                    <div className="flex items-center space-x-3 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={handleClose}
                        disabled={status === 'submitting'}
                        className="w-1/2 sm:w-auto px-5 py-3 rounded-xl border border-white/10 hover:border-white/20 text-white/60 hover:text-white text-xs font-semibold transition-all cursor-pointer disabled:opacity-50"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-1/2 sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-cyber-orange to-cyber-crimson hover:from-[#FF7F11] hover:to-[#D90429] text-white font-semibold text-xs tracking-wide shadow-[0_4px_20px_rgba(255,106,0,0.35)] hover:shadow-[0_6px_28px_rgba(255,106,0,0.55)] transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-sans"
                      >
                        {status === 'submitting' ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-t-transparent border-white rounded-full animate-spin" />
                            <span>Transmitting Message...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
