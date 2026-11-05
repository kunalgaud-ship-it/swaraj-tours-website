import React from 'react';
import { 
  ShieldCheck, 
  Clock, 
  BadgePercent, 
  Sparkles, 
  MapPin, 
  HeartHandshake, 
  Car, 
  Award 
} from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';

export const WhyChooseUs: React.FC = () => {
  const stats = [
    { label: 'Successful Journeys', value: COMPANY_INFO.completedTrips, icon: Car },
    { label: 'Sanitized Vehicles', value: COMPANY_INFO.activeFleet, icon: ShieldCheck },
    { label: 'Google Customer Rating', value: `${COMPANY_INFO.googleRating} ★`, icon: Award },
    { label: 'Years of Trust & Service', value: `${COMPANY_INFO.experienceYears}+ Yrs`, icon: HeartHandshake },
  ];

  const features = [
    {
      title: '100% Transparent Billing',
      description: 'Zero hidden surprise charges. Clear per-km rates, visible toll/tax calculations, and itemized printed/digital GST receipts.',
      icon: BadgePercent,
      color: 'text-amber-500 bg-amber-50 border-amber-200',
    },
    {
      title: 'Guaranteed On-Time Pickups',
      description: 'Our chauffeurs arrive 15 minutes before your scheduled departure time so your airport or pilgrimage schedule never gets delayed.',
      icon: Clock,
      color: 'text-blue-500 bg-blue-50 border-blue-200',
    },
    {
      title: 'Verified & Courteous Chauffeurs',
      description: 'Police-verified, non-smoking, polite drivers with 5+ years of highway and mountain ghat driving experience across Maharashtra.',
      icon: ShieldCheck,
      color: 'text-emerald-500 bg-emerald-50 border-emerald-200',
    },
    {
      title: 'Spotless & Sanitized Cabs',
      description: 'Every vehicle undergoes thorough interior cleaning, sanitization, and AC filter maintenance before each customer trip.',
      icon: Sparkles,
      color: 'text-purple-500 bg-purple-50 border-purple-200',
    },
    {
      title: 'Free Zero-Hassle Cancellation',
      description: 'Plans changed? Enjoy 100% free cancellation up to 2 hours before your scheduled pickup with instant assistance.',
      icon: HeartHandshake,
      color: 'text-rose-500 bg-rose-50 border-rose-200',
    },
    {
      title: 'Doorstep Pickup & Drop Anywhere',
      description: 'We pick you up directly from your home, office, society gate, or hotel lobby and drop you at your final destination doorstep.',
      icon: MapPin,
      color: 'text-orange-500 bg-orange-50 border-orange-200',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Stats Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 text-center hover:border-amber-400 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-amber-100/80 text-amber-700 flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            The Swaraj Travels Advantage
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Travelers Across Maharashtra Choose Us
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            We are committed to delivering the safest, most comfortable, and punctual taxi rental service with courteous drivers and clean modern cabs.
          </p>
        </div>

        {/* Features 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className="bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-4 ${feat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
