import React, { useState, useEffect } from 'react';
import { Phone, ArrowUp, Car } from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';
import { WhatsAppIcon } from './WhatsAppIcon';

interface FloatingActionsProps {
  onScrollToTop: () => void;
  onOpenBooking: () => void;
  onOpenAssistance?: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onScrollToTop, onOpenBooking, onOpenAssistance }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsApp = () => {
    const text = encodeURIComponent("Hello Swaraj Tours and Travels, I want to book a cab / tour package. Please share fares and availability.");
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <>
      {/* Floating Bottom Quick Action Bar for Mobile Screens */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 p-2 mobile-action-bar flex items-center gap-1.5 shadow-2xl">
        <a
          href={`tel:${COMPANY_INFO.rawPhone}`}
          className="flex-1 py-2 px-2 rounded-xl bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center gap-1 shadow"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call</span>
        </a>

        <button
          onClick={handleWhatsApp}
          className="flex-1 py-2 px-2 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center justify-center gap-1 shadow cursor-pointer"
        >
          <WhatsAppIcon className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </button>

        {onOpenAssistance && (
          <button
            onClick={onOpenAssistance}
            className="flex-1 py-2 px-2 rounded-xl bg-black text-white font-black text-xs flex items-center justify-center gap-1 shadow cursor-pointer"
            title="Need Assistance?"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>Assistance</span>
          </button>
        )}

        <button
          onClick={onOpenBooking}
          className="py-2 px-3 rounded-xl bg-slate-900 text-amber-400 font-black text-xs flex items-center justify-center gap-1 shadow cursor-pointer"
          title="Open Booking Engine"
        >
          <Car className="w-3.5 h-3.5" />
          <span>Book</span>
        </button>
      </div>

      {/* Floating Side Action Buttons for Desktop / Tablet */}
      <div className="hidden sm:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-3">
        {/* Back to top button */}
        {showBackToTop && (
          <button
            onClick={onScrollToTop}
            className="w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center shadow-lg transition-all hover:scale-110 cursor-pointer"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        {/* Floating Need Assistance Button matching reference theme */}
        {onOpenAssistance && (
          <button
            onClick={onOpenAssistance}
            className="flex items-center gap-2 px-4 py-3 rounded-full bg-black hover:bg-neutral-900 text-white border border-neutral-700 font-extrabold text-xs shadow-2xl hover:scale-105 transition-all group cursor-pointer"
            title="Need Assistance? Click to open quick callback form"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping inline-block" />
            <span>Need Assistance?</span>
            <span className="text-[10px] bg-neutral-800 text-cyan-300 px-1.5 py-0.5 rounded font-mono uppercase">
              Get in touch
            </span>
          </button>
        )}

        {/* Floating Call Button */}
        <a
          href={`tel:${COMPANY_INFO.rawPhone}`}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/30 font-bold text-xs shadow-xl hover:scale-105 transition-all group"
        >
          <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center">
            <Phone className="w-3.5 h-3.5" />
          </div>
          <span className="text-white group-hover:text-amber-300">
            {COMPANY_INFO.primaryPhone}
          </span>
        </a>

        {/* Floating WhatsApp Button */}
        <button
          onClick={handleWhatsApp}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-xl hover:scale-105 transition-all cursor-pointer"
        >
          <WhatsAppIcon className="w-5 h-5" />
          <span>Chat on WhatsApp</span>
        </button>
      </div>
    </>
  );
};
