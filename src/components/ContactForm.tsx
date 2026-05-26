import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, AlertTriangle, Sparkles, Loader2 } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Luxury Portfolio',
    budget: '$1,000 - $3,000',
    message: '',
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
      return;
    }

    setSubmitting(true);
    setSubmitStatus('idle');

    // Simulate elite server transaction with precise delays
    setTimeout(() => {
      setSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        projectType: 'Luxury Portfolio',
        budget: '$1,000 - $3,000',
        message: '',
      });
      // Return to idle state after show
      setTimeout(() => setSubmitStatus('idle'), 6000);
    }, 2200);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto rounded-2xl glassmorphism p-6 md:p-10 overflow-hidden">
      {/* Decorative cyber corner cross indicators */}
      <span className="absolute top-3 left-3 font-mono text-[7px] text-white/20 select-none">[FORM_INIT_v1.2]</span>
      <span className="absolute top-3 right-3 font-mono text-[7px] text-[#00bfff]/30 select-none">TRANSACT_SECURE</span>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* USER NAME */}
          <div className="relative flex flex-col gap-1.5">
            <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">
              01 // YOUR IDENTIFIER <span className="text-red-500">*</span>
            </span>
            <input
              id="contact-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              placeholder="e.g. Jean-Luc Godard"
              className={`w-full bg-slate-950/60 rounded-lg px-4 py-3 text-sm text-white border transition-all duration-300 outline-none backdrop-blur-sm placeholder:text-gray-600 ${
                focusedField === 'name' 
                  ? 'border-[#00bfff] glow-cyan bg-slate-950/90' 
                  : 'border-white/5 hover:border-white/10'
              }`}
              required
            />
          </div>

          {/* EMAIL */}
          <div className="relative flex flex-col gap-1.5">
            <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">
              02 // ELECTRONIC ADRESS <span className="text-red-500">*</span>
            </span>
            <input
              id="contact-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              placeholder="e.g. luc@atelier.design"
              className={`w-full bg-slate-950/60 rounded-lg px-4 py-3 text-sm text-white border transition-all duration-300 outline-none backdrop-blur-sm placeholder:text-gray-600 ${
                focusedField === 'email' 
                  ? 'border-[#00bfff] glow-cyan bg-slate-950/90' 
                  : 'border-white/5 hover:border-white/10'
              }`}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* PROJECT TYPE */}
          <div className="relative flex flex-col gap-1.5">
            <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">
              03 // ATMOSPHERE CATEGORY
            </span>
            <select
              id="contact-project-type"
              name="projectType"
              value={formData.projectType}
              onChange={handleInputChange}
              onFocus={() => setFocusedField('projectType')}
              onBlur={() => setFocusedField(null)}
              className={`w-full bg-slate-950/60 rounded-lg px-4 py-3 text-sm text-white border transition-all duration-300 outline-none backdrop-blur-sm ${
                focusedField === 'projectType' 
                  ? 'border-[#00bfff] glow-cyan bg-slate-950/90' 
                  : 'border-white/5 hover:border-white/10'
              }`}
            >
              <option value="Luxury Portfolio" className="bg-slate-950 text-white">Luxury Portfolio Website</option>
              <option value="Creative Landing Page" className="bg-slate-950 text-white">Creative Landing Page</option>
              <option value="Full-Stack React App" className="bg-slate-950 text-white font-mono">Full-Stack React Application</option>
              <option value="Business Digitalization" className="bg-slate-950 text-white">Elite Business Website</option>
              <option value="Interactive UI/UX" className="bg-slate-950 text-white">Bespoke Motion Prototype</option>
            </select>
          </div>

          {/* BUDGET */}
          <div className="relative flex flex-col gap-1.5">
            <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">
              04 // PLANNED ESTIMATION
            </span>
            <select
              id="contact-budget"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              onFocus={() => setFocusedField('budget')}
              onBlur={() => setFocusedField(null)}
              className={`w-full bg-slate-950/60 rounded-lg px-4 py-3 text-sm text-white border transition-all duration-300 outline-none backdrop-blur-sm ${
                focusedField === 'budget' 
                  ? 'border-[#00bfff] glow-cyan bg-slate-950/90' 
                  : 'border-white/5 hover:border-white/10'
              }`}
            >
              <option value="Standard" className="bg-slate-950 text-white">$1,000 - $3,000 USD</option>
              <option value="Premium" className="bg-slate-950 text-white">$3,000 - $6,000 USD</option>
              <option value="Enterprise Cinema" className="bg-slate-950 text-white font-mono">$6,000+ USD</option>
              <option value="Co-operative equity" className="bg-slate-950 text-white">Early Stage/Cooperative</option>
            </select>
          </div>
        </div>

        {/* BRIEF DESCRIPTION */}
        <div className="relative flex flex-col gap-1.5">
          <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">
            05 // BRIEF BRIEFING OVERVIEW <span className="text-red-500">*</span>
          </span>
          <textarea
            id="contact-message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            onFocus={() => setFocusedField('message')}
            onBlur={() => setFocusedField(null)}
            placeholder="Introduce your project vision here, highlighting specific design, tech, or branding expectations..."
            rows={5}
            className={`w-full bg-slate-950/60 rounded-lg px-4 py-3 text-sm text-white border transition-all duration-300 outline-none backdrop-blur-sm placeholder:text-gray-600 resize-none ${
              focusedField === 'message' 
                ? 'border-[#00bfff] glow-cyan bg-slate-950/90' 
                : 'border-white/5 hover:border-white/10'
            }`}
            required
          />
        </div>

        {/* SUBMIT COMMAND PANEL */}
        <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[10px] font-mono text-gray-500 max-w-sm text-center md:text-left leading-relaxed">
            By submitting, your cryptographic proposal dossier will be dispatched directly to Ashwini’s communications queue.
          </span>

          <button
            id="submit-form-button"
            type="submit"
            disabled={submitting}
            className={`group w-full md:w-auto px-8 py-3.5 rounded-xl text-xs font-mono tracking-widest uppercase font-bold text-white transition-all duration-500 flex items-center justify-center gap-2 border select-none cursor-pointer ${
              submitting
                ? 'bg-slate-900 border-white/5 text-gray-400 cursor-not-allowed'
                : 'bg-white hover:bg-transparent border-white text-black hover:text-white glow-cyan'
            }`}
          >
            {submitting ? (
              <>
                <Loader2 size={13} className="animate-spin text-[#00bfff]" />
                <span>ENCRYPTING SECURE ROUTE...</span>
              </>
            ) : (
              <>
                <span>TRANSMIT BRIEFING Dossier</span>
                <Send size={13} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </>
            )}
          </button>
        </div>

        {/* NOTIFICATIONS CONTAINER */}
        <AnimatePresence>
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="border border-green-500/20 bg-green-500/10 p-4 rounded-xl flex items-start gap-3 mt-4"
            >
              <CheckCircle2 className="text-green-400 flex-shrink-0 mt-0.5" size={18} />
              <div className="space-y-1">
                <h4 className="font-mono text-xs font-semibold text-white tracking-wide uppercase">TRANSMISSION ESTABLISHED</h4>
                <p className="text-[11px] text-gray-300 leading-relaxed">
                  Thank you. Your dossier has been successfully authenticated. Ashwini S will review and follow up via secure email within 24 working hours.
                </p>
              </div>
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="border border-red-500/20 bg-red-500/10 p-4 rounded-xl flex items-start gap-3 mt-4"
            >
              <AlertTriangle className="text-red-400 flex-shrink-0 mt-0.5" size={18} />
              <div className="space-y-1">
                <h4 className="font-mono text-xs font-semibold text-white tracking-wide uppercase">TRANSMISSION INTERRUPTED</h4>
                <p className="text-[11px] text-gray-300 leading-relaxed">
                  Please verify that all mandatory fields marked with an asterisk (*) are correctly filled before activating the transmitter trigger.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
