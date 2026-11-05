import React from 'react';
import { Car, PhoneCall, MessageSquare, Clock, ShieldCheck, BadgeIndianRupee } from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';
import { WhatsAppIcon } from './WhatsAppIcon';

interface ClosingCtaProps {
  onBookNow: () => void;
}

/** Full-width band shown above the footer on every page: one last nudge to book, call or chat. */
export const ClosingCta: React.FC<ClosingCtaProps> = ({ onBookNow }) => {
  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${COMPANY_INFO.name}, I am planning a trip and would like a quick quote. Please share vehicle options and fare.`
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  const assurances = [
    { icon: Clock, label: 'Confirmation within 15 minutes' },
    { icon: BadgeIndianRupee, label: 'Fixed fare quoted before you ride' },
    { icon: ShieldCheck, label: 'Verified driver details shared in advance' },
  ];

  return (
    <section className="relative bg-slate-950 text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-20 -left-10 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
              <Car className="w-3.5 h-3.5" />
              Your cab is one message away
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Planning a trip this week?{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-300">
                Lock in your cab now.
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl">
              Tell us where and when. Our dispatch desk replies with the vehicle, the driver and a fixed fare so there are no surprises on the day.
            </p>

            <ul className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {assurances.map((a) => {
                const Icon = a.icon;
                return (
                  <li key={a.label} className="flex items-center gap-2 text-xs text-slate-200 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                    <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{a.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-3">
            <button
              type="button"
              onClick={onBookNow}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-sm sm:text-base shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Car className="w-5 h-5" />
              Book a Cab Online
            </button>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`tel:${COMPANY_INFO.rawPhone}`}
                className="py-3.5 px-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                Call Now
              </a>
              <button
                type="button"
                onClick={handleWhatsApp}
                className="py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4" />
                WhatsApp
              </button>
            </div>
            <p className="text-center text-[11px] text-slate-400">
              24x7 Nashik helpline {COMPANY_INFO.primaryPhone} • Call or WhatsApp
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
