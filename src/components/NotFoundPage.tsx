import React, { useEffect } from 'react';
import { Home, Car, PhoneCall } from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';
import { withBase } from '../pages';

interface NotFoundPageProps {
  onHome: () => void;
  onBook: () => void;
}

/** Shown for any URL that is not one of our pages, with noindex so Google does not treat it as a duplicate homepage. */
export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onHome, onBook }) => {
  useEffect(() => {
    document.title = 'Page Not Found | Shivraj Cab';
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex, follow';
    document.head.appendChild(robots);
    return () => {
      robots.remove();
    };
  }, []);

  return (
    <section className="py-20 sm:py-28 px-4 bg-slate-50 border-b border-slate-200">
      <div className="max-w-xl mx-auto text-center">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-600">Error 404</p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">This page took a wrong turn</h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600">
          The link you followed does not exist on our website. Head back home, book a cab, or call our 24x7 Nashik desk.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={withBase('/')}
            onClick={(event) => { event.preventDefault(); onHome(); }}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-colors"
          >
            <Home className="w-4 h-4" /> Go to Homepage
          </a>
          <button
            type="button"
            onClick={onBook}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold text-sm transition-all cursor-pointer"
          >
            <Car className="w-4 h-4" /> Book a Cab
          </button>
          <a
            href={`tel:${COMPANY_INFO.rawPhone}`}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 font-bold text-sm hover:bg-slate-100 transition-colors"
          >
            <PhoneCall className="w-4 h-4 text-amber-600" /> {COMPANY_INFO.primaryPhone}
          </a>
        </div>
      </div>
    </section>
  );
};
