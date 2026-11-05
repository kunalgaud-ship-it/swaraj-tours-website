import React, { useState } from 'react';
import { Tag, Copy, Check, CalendarClock, MessageSquare, Gift, Sparkles } from 'lucide-react';
import { OFFERS, COMPANY_INFO } from '../data/travelData';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Offer } from '../types/travel';

interface OffersSectionProps {
  onBookNow?: () => void;
}

const ACCENT_STYLES: Record<Offer['accent'], { badge: string; ring: string; icon: string }> = {
  amber: { badge: 'bg-amber-500 text-slate-950', ring: 'hover:border-amber-400', icon: 'bg-amber-100 text-amber-700' },
  emerald: { badge: 'bg-emerald-500 text-white', ring: 'hover:border-emerald-400', icon: 'bg-emerald-100 text-emerald-700' },
  blue: { badge: 'bg-blue-500 text-white', ring: 'hover:border-blue-400', icon: 'bg-blue-100 text-blue-700' },
  rose: { badge: 'bg-rose-500 text-white', ring: 'hover:border-rose-400', icon: 'bg-rose-100 text-rose-700' },
  purple: { badge: 'bg-purple-500 text-white', ring: 'hover:border-purple-400', icon: 'bg-purple-100 text-purple-700' },
};

export const OffersSection: React.FC<OffersSectionProps> = ({ onBookNow }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // Clipboard may be unavailable (insecure context); fall back to visual feedback only.
    }
    setCopiedCode(code);
    window.setTimeout(() => setCopiedCode((c) => (c === code ? null : c)), 2000);
  };

  const handleClaim = (offer: Offer) => {
    const text = encodeURIComponent(
      `Hello ${COMPANY_INFO.name}, I would like to use offer code *${offer.code}* (${offer.title} - ${offer.discountLabel}). Please share the discounted fare for my trip.`
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="offers" className="py-16 sm:py-20 bg-gradient-to-b from-amber-50/70 via-white to-white border-y border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Gift className="w-3.5 h-3.5" />
            Limited Period Deals
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Current Offers & Promo Codes
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Copy a code and mention it while booking on call or WhatsApp. Our team applies the discount on your confirmed fare.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {OFFERS.map((offer) => {
            const styles = ACCENT_STYLES[offer.accent];
            const isCopied = copiedCode === offer.code;
            return (
              <div
                key={offer.id}
                className={`relative bg-white rounded-2xl border border-slate-200 ${styles.ring} shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden ${
                  offer.isFeatured ? 'lg:col-span-1 ring-2 ring-amber-400/60' : ''
                }`}
              >
                {offer.isFeatured && (
                  <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" />
                    Featured
                  </div>
                )}

                <div className="p-6 flex-1">
                  <div className="flex items-start gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${styles.icon}`}>
                      <Tag className="w-6 h-6" />
                    </div>
                    <div>
                      <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-black mb-1.5 ${styles.badge}`}>
                        {offer.discountLabel}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 leading-snug">{offer.title}</h3>
                      <p className="text-xs font-semibold text-slate-500">{offer.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mb-3">
                    <span className="font-semibold text-slate-800">Applies to:</span> {offer.appliesTo}
                  </p>

                  <ul className="space-y-1.5 mb-4">
                    {offer.terms.map((t, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                    <CalendarClock className="w-3.5 h-3.5 text-amber-600" />
                    Valid till: {offer.validTill}
                  </div>
                </div>

                {/* Coupon strip */}
                <div className="border-t border-dashed border-slate-300 bg-slate-50 p-4 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopy(offer.code)}
                    className="flex-1 flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl bg-white border-2 border-dashed border-slate-300 hover:border-amber-400 font-mono text-sm font-black text-slate-900 tracking-widest transition-colors cursor-pointer"
                    title="Copy promo code"
                  >
                    <span>{offer.code}</span>
                    {isCopied ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-sans font-bold text-emerald-600 tracking-normal">
                        <Check className="w-3.5 h-3.5" /> Copied
                      </span>
                    ) : (
                      <Copy className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleClaim(offer)}
                    className="px-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow transition-colors cursor-pointer"
                    title="Claim via WhatsApp"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span className="hidden sm:inline">Claim</span>
                  </button>
                </div>
              </div>
            );
          })}

          {/* CTA Tile */}
          <div className="bg-slate-900 rounded-2xl p-6 text-white flex flex-col justify-between shadow-lg">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Need a Custom Quote?</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Corporate contracts, multi-city tours, or large group bookings get tailored pricing beyond these codes. Tell us your plan and we will beat any written quote.
              </p>
            </div>
            <div className="flex flex-col gap-2 pt-5">
              {onBookNow && (
                <button
                  type="button"
                  onClick={onBookNow}
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-colors cursor-pointer"
                >
                  Get Instant Fare Estimate
                </button>
              )}
              <a
                href={`tel:${COMPANY_INFO.rawPhone}`}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-center font-bold text-sm transition-colors"
              >
                Call {COMPANY_INFO.primaryPhone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
