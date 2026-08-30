import React, { useState } from 'react';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call for now (e.g., to Resend or Web3Forms)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="p-8 text-center border rounded-xl border-brand-500/50 bg-brand-900/20">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-500/20 flex items-center justify-center">
          <span className="text-2xl text-brand-accent">✓</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">RFQ Submitted Successfully</h3>
        <p className="text-slate-400 text-sm">
          Our technical team will review your project requirements and contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-xl border border-cyber-border bg-cyber-panel shadow-2xl relative overflow-hidden">
      {/* Decorative top accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 to-brand-accent"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-2">FULL NAME *</label>
          <input required type="text" className="w-full px-4 py-3 rounded bg-cyber-dark border border-cyber-border text-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all" placeholder="John Doe" />
        </div>
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-2">COMPANY / ORGANIZATION *</label>
          <input required type="text" className="w-full px-4 py-3 rounded bg-cyber-dark border border-cyber-border text-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all" placeholder="e.g. NHAI, PowerGrid, L&T" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-2">BUSINESS EMAIL *</label>
          <input required type="email" className="w-full px-4 py-3 rounded bg-cyber-dark border border-cyber-border text-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all" placeholder="name@company.com" />
        </div>
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-2">PHONE NUMBER</label>
          <input type="tel" className="w-full px-4 py-3 rounded bg-cyber-dark border border-cyber-border text-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all" placeholder="+91 XXXXX XXXXX" />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-xs font-mono text-slate-400 mb-2">PRIMARY SERVICE REQUIRED *</label>
        <select required className="w-full px-4 py-3 rounded bg-cyber-dark border border-cyber-border text-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all appearance-none">
          <option value="" disabled selected>Select an inspection category...</option>
          <option value="powerline">Power Transmission & Substation Inspection</option>
          <option value="mapping">Geospatial Mapping & LiDAR Survey</option>
          <option value="solar">Solar Plant Thermal Inspection</option>
          <option value="infrastructure">Infrastructure & Road Projects</option>
          <option value="traffic">AI-Based Traffic Management</option>
        </select>
      </div>

      <div className="mb-8">
        <label className="block text-xs font-mono text-slate-400 mb-2">PROJECT SCOPE & REQUIREMENTS</label>
        <textarea rows={4} className="w-full px-4 py-3 rounded bg-cyber-dark border border-cyber-border text-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all resize-none" placeholder="Provide details about the asset length, location, and specific deliverables needed..."></textarea>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full py-4 rounded bg-brand-500 hover:bg-brand-600 text-white font-bold tracking-wider uppercase text-sm transition-all shadow-[0_0_20px_rgba(0,112,186,0.2)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
        ) : "Request Project Quote"}
      </button>
    </form>
  );
}