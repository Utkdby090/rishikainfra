import React, { useState, useRef, useEffect, useId } from 'react';

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  service: string;
  message: string;
  botcheck: string;
}

interface ContactFormProps {
  formType?: string; 
}

const SERVICES_LIST = [
  "Power Grid & Transmission Inspection",
  "Solar & Wind Plant Inspection",
  "Geospatial Mapping & LiDAR",
  "Infrastructure & Road Projects",
  "Traffic Management & AI Analytics",
  "Telecom Tower Structural Audits",
  "Other / General Inquiry"
];

export default function ContactForm({ formType = "contact" }: ContactFormProps) {
  const [formData, setFormData] = useState<FormState>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    service: '',
    message: '',
    botcheck: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  // NEW: Added a success state to track when to show the Thank You message
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // Option highlighted by the keyboard while the list is open
  const [activeIndex, setActiveIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const comboRef = useRef<HTMLButtonElement>(null);
  const uid = useId();
  const listId = `${uid}-services`;
  const labelId = `${uid}-service-label`;
  const optionId = (i: number) => `${uid}-service-${i}`;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openDropdown = (index: number) => {
    setActiveIndex(index);
    setIsDropdownOpen(true);
  };

  const handleServiceSelect = (service: string) => {
    setFormData((prev) => ({ ...prev, service }));
    setIsDropdownOpen(false);
    comboRef.current?.focus();
  };

  // Keyboard support for the service picker (WAI-ARIA select-only combobox)
  const handleComboKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const last = SERVICES_LIST.length - 1;
    const selected = SERVICES_LIST.indexOf(formData.service);
    if (!isDropdownOpen) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
        openDropdown(e.key === 'ArrowUp' ? (selected > 0 ? selected - 1 : last) : Math.max(selected, 0));
      }
      return;
    }
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, last));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case 'Home':
        e.preventDefault();
        setActiveIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setActiveIndex(last);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (activeIndex >= 0) handleServiceSelect(SERVICES_LIST[activeIndex]);
        break;
      case 'Escape':
        e.preventDefault();
        setIsDropdownOpen(false);
        break;
      case 'Tab':
        setIsDropdownOpen(false);
        break;
    }
  };

  // Keep the highlighted option scrolled into view
  useEffect(() => {
    if (isDropdownOpen && activeIndex >= 0) {
      document.getElementById(optionId(activeIndex))?.scrollIntoView({ block: 'nearest' });
    }
  }, [isDropdownOpen, activeIndex]);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Custom validation for our new custom dropdown
    if (!formData.service) {
      setErrorMessage("Please select a primary service before submitting.");
      comboRef.current?.focus();
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    // Silent rejection if bot triggers honeypot
    if (formData.botcheck) {
      setIsSubmitting(false);
      return;
    }

    // Set PUBLIC_WEB3FORMS_ACCESS_KEY in .env locally and in the Cloudflare build variables
    const accessKey = import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setErrorMessage('The form is temporarily unavailable. Please email us at Anurag.singh@rishikainfra.com.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        // Don't leave the button spinning forever on a stalled connection
        signal: AbortSignal.timeout(20000),
        body: JSON.stringify({
          access_key: accessKey,
          // NEW: Dynamically use formType to change the email subject
          subject: formType === "demo" ? `Demo Request: ${formData.company || `${formData.firstName} ${formData.lastName}`}` : `New Lead: ${formData.service} - ${formData.firstName} ${formData.lastName}`,
          from_name: 'Rishika Infra Website',
          'First Name': formData.firstName,
          'Last Name': formData.lastName,
          'Work Email': formData.email,
          'Company Name': formData.company || 'Not Specified',
          'Interested Service': formData.service,
          'Project Details': formData.message,
          botcheck: formData.botcheck
        })
      });

      // A gateway error page isn't JSON; treat it like any other failed submission
      const result = await response.json().catch(() => ({ success: false, message: '' }));

      if (result.success) {
        // NEW: Instead of redirecting to /thank-you, we show the success UI inline
        setIsSuccess(true);
        // Optional: clear the form so it's empty if they want to submit another
        setFormData({ firstName: '', lastName: '', email: '', company: '', service: '', message: '', botcheck: '' });
      } else {
        setErrorMessage(
          result.message || 'Unable to submit your request. Please verify your details and try again.'
        );
      }
    } catch (err) {
      setErrorMessage(
        'A network error occurred. Please check your internet connection or email us directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100">
      
      {/* NEW: Inline Success Screen */}
      {isSuccess ? (
        <div role="status" className="flex flex-col items-center justify-center text-center py-10 animate-in fade-in zoom-in duration-300">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
            <svg aria-hidden="true" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          <h3 className="text-3xl font-extrabold text-brand-ink mb-3">Request Sent!</h3>
          <p className="text-gray-600 text-[17px] max-w-[300px] mb-8">
            Thank you for reaching out. Our engineering team will review your details and respond shortly.
          </p>
          <button 
            type="button"
            onClick={() => setIsSuccess(false)}
            className="text-sm font-bold text-brand-blue hover:underline"
          >
            Submit another request
          </button>
        </div>
      ) : (
        <>
          {errorMessage && (
            <div role="alert" className="mb-6 rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
              <svg aria-hidden="true" className="w-5 h-5 shrink-0 text-red-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-semibold">Submission Failed</p>
                <p className="mt-0.5 text-xs text-red-600">{errorMessage}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Anti-spam honeypot */}
            <input
              type="checkbox"
              name="botcheck"
              checked={!!formData.botcheck}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, botcheck: e.target.checked ? 'true' : '' }))
              }
              className="hidden"
              style={{ display: 'none' }}
              tabIndex={-1}
              aria-hidden="true"
              autoComplete="off"
            />

            <div className="grid md:grid-cols-2 gap-6">
              {/* First Name */}
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-bold text-brand-ink">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all bg-gray-50 focus:bg-white"
                  placeholder="John"
                />
              </div>
              {/* Last Name */}
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-bold text-brand-ink">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all bg-gray-50 focus:bg-white"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Work Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-bold text-brand-ink">
                  Work Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all bg-gray-50 focus:bg-white"
                  placeholder="john@company.com"
                />
              </div>
              {/* Company */}
              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-bold text-brand-ink">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all bg-gray-50 focus:bg-white"
                  placeholder="Acme Corp"
                />
              </div>
            </div>

            {/* CUSTOM PREMIUM DROPDOWN */}
            <div className="space-y-2 relative" ref={dropdownRef}>
              <label id={labelId} className="text-sm font-bold text-brand-ink" onClick={() => comboRef.current?.focus()}>
                What service are you interested in? *
              </label>
              
              <button
                type="button"
                ref={comboRef}
                role="combobox"
                aria-haspopup="listbox"
                aria-expanded={isDropdownOpen}
                aria-controls={listId}
                aria-labelledby={labelId}
                aria-required="true"
                aria-activedescendant={isDropdownOpen && activeIndex >= 0 ? optionId(activeIndex) : undefined}
                onClick={() => (isDropdownOpen ? setIsDropdownOpen(false) : openDropdown(Math.max(SERVICES_LIST.indexOf(formData.service), 0)))}
                onKeyDown={handleComboKeyDown}
                className={`w-full px-4 py-3 rounded-xl border text-left flex justify-between items-center transition-all shadow-sm ${
                  isDropdownOpen 
                    ? 'border-brand-blue ring-1 ring-brand-blue bg-white' 
                    : 'border-gray-200 bg-gray-50 hover:bg-white hover:border-gray-300'
                }`}
              >
                <span className={formData.service ? 'text-brand-ink font-medium' : 'text-gray-400'}>
                  {formData.service || 'Select a primary service...'}
                </span>
                <svg 
                  aria-hidden="true"
                  className={`h-4 w-4 text-gray-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-brand-blue' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <ul id={listId} role="listbox" aria-labelledby={labelId} className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.12)] py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  {SERVICES_LIST.map((service, idx) => (
                    <li
                      key={service}
                      id={optionId(idx)}
                      role="option"
                      aria-selected={formData.service === service}
                      onClick={() => handleServiceSelect(service)}
                      onMouseMove={() => setActiveIndex(idx)}
                      className={`px-4 py-3 cursor-pointer transition-colors flex items-center justify-between group ${
                        formData.service === service
                          ? 'bg-brand-blue/5 text-brand-blue font-bold'
                          : idx === activeIndex
                            ? 'bg-gray-50 text-brand-ink'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-brand-ink'
                      } ${idx === activeIndex ? 'ring-1 ring-inset ring-brand-blue/30' : ''}`}
                    >
                      <span className="block truncate">{service}</span>
                      
                      {/* Selected Checkmark */}
                      {formData.service === service && (
                        <svg aria-hidden="true" className="w-5 h-5 text-brand-blue" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-bold text-brand-ink">
                Project Details or Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all bg-gray-50 focus:bg-white resize-y"
                placeholder="Tell us about the scope, timeline, and location of your project..."
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center items-center gap-3 rounded-full bg-brand-yellow px-8 py-4 font-bold text-brand-ink transition-all shadow-md ${
                  isSubmitting
                    ? 'opacity-70 cursor-not-allowed'
                    : 'hover:bg-brand-yellow-light hover:-translate-y-1 hover:shadow-lg active:translate-y-0'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg aria-hidden="true" className="animate-spin h-5 w-5 text-brand-ink" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Transmitting Details...</span>
                  </>
                ) : (
                  <>
                    <span>{formType === "demo" ? "Request Demo" : "Submit Request"}</span>
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>

          <p className="text-xs text-gray-400 text-center mt-8">
            By submitting this form, you agree to our privacy policy. Your information is kept strictly confidential.
          </p>
        </>
      )}
    </div>
  );
}