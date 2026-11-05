import React, { useState } from 'react';
import { Handshake, IndianRupee, CalendarCheck, ShieldCheck, TrendingUp, CheckCircle, MessageSquare, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';
import { WhatsAppIcon } from './WhatsAppIcon';

export const DriverPartnerSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Nashik');
  const [vehicleType, setVehicleType] = useState('Sedan (Dzire / Aura)');
  const [ownsVehicle, setOwnsVehicle] = useState<'yes' | 'no'>('yes');
  const [experience, setExperience] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const benefits = [
    { icon: IndianRupee, title: 'Weekly Settlements', text: 'Transparent trip statements and payouts every week, no long waits.' },
    { icon: CalendarCheck, title: 'Regular Outstation Trips', text: 'Steady Nashik to Mumbai, Pune and Shirdi bookings, especially in festival season.' },
    { icon: ShieldCheck, title: 'Zero Commission on Tolls', text: 'Tolls, parking and permits reimbursed at actuals with receipts.' },
    { icon: TrendingUp, title: 'Grow With Us', text: 'Priority allocation for consistent 4.8+ rated partners and corporate contracts.' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) return setError('Please enter your name.');
    if (phone.trim().replace(/\D/g, '').length < 10) return setError('Please enter a valid 10-digit mobile number.');
    setSubmitted(true);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${COMPANY_INFO.name}, I want to partner as a driver.\nName: ${name}\nPhone: ${phone}\nCity: ${city}\nVehicle: ${vehicleType}\nOwn vehicle: ${ownsVehicle === 'yes' ? 'Yes' : 'No, need a vehicle'}\nExperience: ${experience || 'N/A'} years`
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  const inputCls =
    'w-full px-4 py-3 text-sm text-slate-800 bg-white border border-slate-300 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all';

  return (
    <section id="partner" className="py-16 sm:py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Pitch */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Handshake className="w-3.5 h-3.5" />
              Partner With Us
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Own a Cab or Drive Professionally? <span className="text-amber-400">Attach With {COMPANY_INFO.name}</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              We are expanding our verified partner network in and around Nashik. Sedans, SUVs, Innova Crysta and Tempo Travellers with valid commercial permits are welcome.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <div key={i} className="bg-slate-800/70 border border-slate-700 rounded-2xl p-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold mb-1">{b.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{b.text}</p>
                  </div>
                );
              })}
            </div>

            <div className="text-xs text-slate-400 space-y-1.5">
              <p className="font-bold text-slate-300">Documents required:</p>
              <p>Commercial driving licence and badge • Vehicle RC with tourist permit • Insurance and PUC • Aadhaar and police verification • Vehicle photos</p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white text-slate-900 rounded-3xl shadow-2xl p-6 sm:p-8">
            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black">Application Noted, {name.split(' ')[0]}!</h3>
                <p className="text-sm text-slate-600 max-w-sm mx-auto">
                  Our fleet manager will call you on <strong>{phone}</strong> within 24 hours. Send your documents on WhatsApp to speed up onboarding.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4 h-4" /> Send Details on WhatsApp
                  </button>
                  <a
                    href={`tel:${COMPANY_INFO.rawPhone}`}
                    className="px-6 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" /> Call Fleet Manager
                  </a>
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight">Driver / Vehicle Partner Enquiry</h3>
                <p className="text-sm text-slate-600 mt-1 mb-6">Fill in a few details and we will get back within 24 hours.</p>

                {error && (
                  <div className="mb-4 p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">{error}</div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" placeholder="Full Name *" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} required />
                    <input type="tel" placeholder="Mobile Number *" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} required />
                    <select value={city} onChange={(e) => setCity(e.target.value)} className={inputCls}>
                      {['Nashik City', 'Nashik Road / Deolali', 'Sinnar', 'Igatpuri', 'Ozar / Pimpalgaon', 'Other (near Nashik)'].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                    <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} className={inputCls}>
                      {['Sedan (Dzire / Aura)', 'MUV (Ertiga / Marazzo)', 'Innova Crysta / Hycross', 'Tempo Traveller (13-26 Seater)', 'Luxury (Fortuner / Mercedes / BMW)'].map((v) => (
                        <option key={v}>{v}</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      min={0}
                      max={40}
                      placeholder="Driving Experience (years)"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className={inputCls}
                    />
                    <div className="flex items-center gap-4 px-1 text-sm">
                      <span className="font-semibold text-slate-700">Own vehicle?</span>
                      {(['yes', 'no'] as const).map((opt) => (
                        <label key={opt} className="inline-flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="ownsVehicle"
                            checked={ownsVehicle === opt}
                            onChange={() => setOwnsVehicle(opt)}
                            className="accent-amber-500"
                          />
                          <span className="capitalize">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold text-sm shadow-md transition-all cursor-pointer"
                  >
                    Submit Partner Enquiry
                  </button>
                  <p className="text-[11px] text-slate-500 text-center">
                    By submitting you agree to be contacted by our fleet team on call or WhatsApp.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
