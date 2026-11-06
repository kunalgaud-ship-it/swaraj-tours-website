import React, { useEffect, useState } from 'react';
import { BookOpen, Clock, X, CalendarDays, Car, Lightbulb, ArrowRight, MessageSquare } from 'lucide-react';
import { TRAVEL_GUIDES, COMPANY_INFO } from '../data/travelData';
import { WhatsAppIcon } from './WhatsAppIcon';
import { TravelGuide } from '../types/travel';

interface TravelGuidesProps {
  onBookNow?: () => void;
}

const CATEGORY_STYLE: Record<TravelGuide['category'], string> = {
  Pilgrimage: 'bg-amber-100 text-amber-800',
  'Hill Station': 'bg-emerald-100 text-emerald-800',
  'Travel Tips': 'bg-blue-100 text-blue-800',
  'Road Trip': 'bg-rose-100 text-rose-800',
};

export const TravelGuides: React.FC<TravelGuidesProps> = ({ onBookNow }) => {
  const [filter, setFilter] = useState<'all' | TravelGuide['category']>('all');
  const [active, setActive] = useState<TravelGuide | null>(null);

  const categories: ('all' | TravelGuide['category'])[] = ['all', 'Pilgrimage', 'Hill Station', 'Road Trip', 'Travel Tips'];
  const guides = TRAVEL_GUIDES.filter((g) => filter === 'all' || g.category === filter);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActive(null);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active]);

  const handleWhatsApp = (g: TravelGuide) => {
    const text = encodeURIComponent(
      `Hello ${COMPANY_INFO.name}, I read your guide "${g.title}" and want to plan this trip. Suggested cab: ${g.suggestedCab}. Please share a quote.`
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="guides" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            Travel Guides & Tips
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Plan Smarter With Local Know-How
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Practical guides written from thousands of trips: temple timings, ghat safety, best seasons, and what to check before hiring a cab.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  filter === c ? 'bg-slate-900 text-amber-400 shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {c === 'all' ? 'All Guides' : c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((g) => (
            <article
              key={g.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-44 overflow-hidden">
                <img width={800} height={600}
                  src={g.image}
                  alt={g.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-bold ${CATEGORY_STYLE[g.category]}`}>
                  {g.category}
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-semibold mb-2">
                  <Clock className="w-3.5 h-3.5" /> {g.readTime}
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-snug mb-2 group-hover:text-amber-600 transition-colors">
                  {g.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed flex-1">{g.excerpt}</p>
                <button
                  type="button"
                  onClick={() => setActive(g)}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 cursor-pointer"
                >
                  Read Full Guide <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Guide Modal */}
      {active && (
        <div
          className="fixed inset-0 z-[60] bg-slate-950/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={() => setActive(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="guide-title"
            className="bg-white w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-52">
              <img width={800} height={600} src={active.image} alt={active.title} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => setActive(null)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <span className={`absolute bottom-3 left-4 px-2.5 py-1 rounded-md text-[11px] font-bold ${CATEGORY_STYLE[active.category]}`}>
                {active.category}
              </span>
            </div>

            <div className="p-6 sm:p-8 space-y-5">
              <div>
                <h3 id="guide-title" className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">{active.title}</h3>
                <p className="text-sm text-slate-600 mt-2">{active.excerpt}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-start gap-2">
                  <CalendarDays className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Best Time</div>
                    <div className="text-xs text-slate-800 font-semibold">{active.bestTime}</div>
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-start gap-2">
                  <Car className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Suggested Cab</div>
                    <div className="text-xs text-slate-800 font-semibold">{active.suggestedCab}</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
                  <Lightbulb className="w-4 h-4 text-amber-500" /> Insider Tips
                </h4>
                <ol className="space-y-2.5">
                  {active.tips.map((t, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                      <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-black flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-slate-100">
                {onBookNow && (
                  <button
                    type="button"
                    onClick={() => {
                      setActive(null);
                      onBookNow();
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold text-sm transition-all cursor-pointer"
                  >
                    Book This Trip
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleWhatsApp(active)}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4" /> Ask on WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
