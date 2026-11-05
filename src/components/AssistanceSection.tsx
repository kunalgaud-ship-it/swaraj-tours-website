import React, { useState } from 'react';
import { CheckCircle, MessageSquare, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';
import { WhatsAppIcon } from './WhatsAppIcon';

export const AssistanceSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 8) {
      setErrorMessage('Please enter a valid phone number.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  const handleWhatsAppRedirect = () => {
    const text = encodeURIComponent(
      `Hello Support,\nName: ${name}\nPhone: ${phone}\nEmail: ${email || 'N/A'}\nMessage: ${message || 'Need assistance with cab booking / inquiry.'}`
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
    setSubmitted(false);
    setErrorMessage('');
  };

  return (
    <section id="assistance" className="py-12 sm:py-16 bg-slate-100/70 border-y border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          {/* Top Dark Bar - Exact replica of reference form header */}
          <div className="bg-black text-white px-4 sm:px-8 py-4 sm:py-5 relative">
            {/* 3 Header Feature Icons & Badges */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
              {/* 1. Seamless Ride Reservation */}
              <div className="flex flex-col items-center">
                <div className="h-9 sm:h-10 flex items-center justify-center mb-1">
                  <svg
                    className="w-8 h-8 sm:w-9 sm:h-9 text-white"
                    viewBox="0 0 64 64"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="25" y="10" width="14" height="6" rx="2" fill="currentColor" />
                    <text x="32" y="15" fill="#000" fontSize="4.5" fontWeight="900" textAnchor="middle" stroke="none">TAXI</text>
                    <path d="M14 36 L19 22 C20 19 23 18 26 18 L38 18 C41 18 44 19 45 22 L50 36" fill="none" strokeWidth="3" />
                    <path d="M8 36 L56 36 C59 36 60 38 60 41 L60 46 C60 49 58 50 55 50 L52 50 C52 46 48 43 44 43 C40 43 36 46 36 50 L28 50 C28 46 24 43 20 43 C16 43 12 46 12 50 L9 50 C6 50 4 49 4 46 L4 41 C4 38 5 36 8 36 Z" fill="currentColor" />
                    <circle cx="20" cy="50" r="5" fill="#000" stroke="#fff" strokeWidth="2" />
                    <circle cx="44" cy="50" r="5" fill="#000" stroke="#fff" strokeWidth="2" />
                    <circle cx="10" cy="40" r="2.5" fill="#fff" stroke="none" />
                    <circle cx="54" cy="40" r="2.5" fill="#fff" stroke="none" />
                  </svg>
                </div>
                <span className="text-[11px] sm:text-[13px] font-semibold text-cyan-400 tracking-tight leading-snug">
                  Seamless Ride Reservation
                </span>
              </div>

              {/* 2. Experienced Drivers */}
              <div className="flex flex-col items-center">
                <div className="h-9 sm:h-10 flex items-center justify-center mb-1">
                  <svg
                    className="w-8 h-8 sm:w-9 sm:h-9 text-white"
                    viewBox="0 0 64 64"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 20 C22 13 42 13 42 20 Z" fill="currentColor" stroke="none" />
                    <path d="M19 20 L45 20 C47 20 48 22 46 23 L18 23 C16 22 17 20 19 20 Z" fill="currentColor" stroke="none" />
                    <circle cx="32" cy="27" r="6" fill="currentColor" stroke="none" />
                    <path d="M24 37 L24 48 L40 48 L40 37 C40 33 24 33 24 37 Z" fill="currentColor" stroke="none" />
                    <path d="M32 37 L30 43 L34 43 Z" fill="#000" stroke="none" />
                    <path d="M38 35 L48 30 C50 29 53 30 55 33 L58 39 L60 39 C61 39 62 40 62 41 L62 45 L58 45" fill="none" strokeWidth="2" />
                    <circle cx="52" cy="45" r="3.5" fill="currentColor" />
                  </svg>
                </div>
                <span className="text-[11px] sm:text-[13px] font-semibold text-cyan-400 tracking-tight leading-snug">
                  Experienced Drivers
                </span>
              </div>

              {/* 3. Discover fantastic offers */}
              <div className="flex flex-col items-center">
                <div className="h-9 sm:h-10 flex items-center justify-center mb-1">
                  <svg
                    className="w-8 h-8 sm:w-9 sm:h-9 text-white"
                    viewBox="0 0 64 64"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <g transform="translate(10, 8) rotate(-15)">
                      <path
                        d="M6 10 L22 10 L36 24 L24 36 L10 22 L6 10 Z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      />
                      <circle cx="12" cy="15" r="2.5" fill="currentColor" />
                      <text x="21" y="24" fill="currentColor" fontSize="7" fontWeight="bold" stroke="none" transform="rotate(45 21 24)">%</text>
                      <text x="23" y="30" fill="currentColor" fontSize="5" fontWeight="900" stroke="none" transform="rotate(45 23 30)">DEAL</text>
                    </g>
                  </svg>
                </div>
                <span className="text-[11px] sm:text-[13px] font-semibold text-cyan-400 tracking-tight leading-snug">
                  Discover fantastic offers
                </span>
              </div>
            </div>
          </div>

          {/* Lower White Section */}
          <div className="p-6 sm:p-8 bg-white">
            {submitted ? (
              <div className="py-6 text-center space-y-4 animate-in fade-in zoom-in-95">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-xl sm:text-2xl font-black text-slate-900">
                    Request Received!
                  </h4>
                  <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
                    Thank you, <strong>{name}</strong>. Our travel support specialist will call you shortly on <strong>{phone}</strong> with vehicle details and best discount rates.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleWhatsAppRedirect}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>Chat on WhatsApp Now</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-all cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Heading & Logo Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      Need Assistance?
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 font-normal mt-0.5">
                      Get in touch with our support
                    </p>
                  </div>

                  {/* Brand Logo on Right */}
                  <div className="shrink-0 flex items-center">
                    <img
                      src={`${import.meta.env.BASE_URL.replace(/\/$/, '')}/assets/logo-swaraj.svg`}
                      alt="Swaraj Tours and Travels"
                      className="h-12 sm:h-14 w-auto object-contain"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                </div>

                {/* Error Alert */}
                {errorMessage && (
                  <div className="mb-4 p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                    {errorMessage}
                  </div>
                )}

                {/* Form 2x2 Grid */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name Input */}
                    <div>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        className="w-full px-4 py-3 text-sm text-slate-800 bg-white border border-slate-300 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all"
                      />
                    </div>

                    {/* Phone Input */}
                    <div>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone"
                        className="w-full px-4 py-3 text-sm text-slate-800 bg-white border border-slate-300 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all"
                      />
                    </div>

                    {/* Email Input */}
                    <div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full px-4 py-3 text-sm text-slate-800 bg-white border border-slate-300 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all"
                      />
                    </div>

                    {/* Message Input */}
                    <div>
                      <textarea
                        rows={1}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter your message..."
                        className="w-full px-4 py-3 text-sm text-slate-800 bg-white border border-slate-300 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black resize-y transition-all min-h-[46px]"
                      />
                    </div>
                  </div>

                  {/* Centered Pill SUBMIT Button */}
                  <div className="flex justify-center pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-14 py-3 rounded-full bg-black hover:bg-neutral-800 active:scale-95 text-white font-extrabold text-sm tracking-wider uppercase transition-all shadow-md cursor-pointer disabled:opacity-60"
                    >
                      {submitting ? 'SUBMITTING...' : 'SUBMIT'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
