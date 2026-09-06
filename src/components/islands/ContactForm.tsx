import React, { useState } from 'react';

interface FormProps {
  formType: 'contact' | 'demo';
}

export default function ContactForm({ formType }: FormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', company: '', message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Backend Wiring Ready: 
    // Later, you will replace this setTimeout with a real fetch request to your API route:
    // await fetch('/api/submit-form', { method: 'POST', body: JSON.stringify({...formData, type: formType}) });
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="p-10 text-center bg-white rounded-lg shadow-sm border-t-8 border-[#FFC62F]">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
          <span className="text-4xl text-green-600">✓</span>
        </div>
        <h3 className="text-2xl font-bold text-[#17212B] mb-2">Request Received</h3>
        <p className="text-gray-600">
          Thank you! Our team will review your details and contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 sm:p-10 bg-white rounded shadow-md border-t-8 border-[#FFC62F]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm text-gray-600 mb-2">First Name</label>
          <input required type="text" name="firstName" onChange={handleChange} className="w-full px-4 py-3 rounded bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#FFC62F] focus:ring-1 focus:ring-[#FFC62F] outline-none transition-all" />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-2">Last Name</label>
          <input required type="text" name="lastName" onChange={handleChange} className="w-full px-4 py-3 rounded bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#FFC62F] focus:ring-1 focus:ring-[#FFC62F] outline-none transition-all" />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-2">Email</label>
        <input required type="email" name="email" onChange={handleChange} className="w-full px-4 py-3 rounded bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#FFC62F] focus:ring-1 focus:ring-[#FFC62F] outline-none transition-all" />
      </div>

      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-2">Phone</label>
        <input type="tel" name="phone" onChange={handleChange} className="w-full px-4 py-3 rounded bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#FFC62F] focus:ring-1 focus:ring-[#FFC62F] outline-none transition-all" />
      </div>

      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-2">Company</label>
        <input required type="text" name="company" onChange={handleChange} className="w-full px-4 py-3 rounded bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#FFC62F] focus:ring-1 focus:ring-[#FFC62F] outline-none transition-all" />
      </div>

      <div className="mb-8">
        <label className="block text-sm text-gray-600 mb-2">Message</label>
        <textarea rows={5} name="message" onChange={handleChange} className="w-full px-4 py-3 rounded bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#FFC62F] focus:ring-1 focus:ring-[#FFC62F] outline-none transition-all resize-none"></textarea>
      </div>

      {/* Mock reCAPTCHA */}
      <div className="mb-8 flex items-center gap-3 p-4 border border-gray-200 rounded bg-gray-50 w-max">
        <input type="checkbox" required className="w-6 h-6 rounded border-gray-300 text-[#0070BA] focus:ring-[#0070BA]" />
        <span className="text-sm text-gray-600">I'm not a robot</span>
      </div>

      <p className="text-xs text-gray-500 mb-6">
        By clicking submit below, you consent to allow Rishika Infra to store and process the personal information submitted above to provide you the content requested.
      </p>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full sm:w-auto px-10 py-3.5 rounded-full bg-[#FFC62F] hover:bg-[#FFD85C] text-[#17212B] font-bold tracking-wide transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? 'Processing...' : 'Submit form'}
      </button>
    </form>
  );
}