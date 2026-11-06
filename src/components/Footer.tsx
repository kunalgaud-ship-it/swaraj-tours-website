import React, { useState } from 'react';
import {
  Car,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  ChevronRight,
  BellRing,
  CheckCircle,
  CreditCard,
  Smartphone,
  Banknote,
  Landmark,
  FileCheck,
  Lock,
  BadgeCheck,
} from 'lucide-react';
import { COMPANY_INFO, POPULAR_ROUTES, VEHICLES, TOUR_PACKAGES, SERVICES } from '../data/travelData';
import type { LegalDocType } from './LegalModal';
import { WhatsAppIcon } from './WhatsAppIcon';
import { pageForSection, withBase } from '../pages';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onSelectRoute: (from: string, to: string) => void;
  onOpenLegal?: (doc: LegalDocType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectRoute, onOpenLegal }) => {
  const [alertPhone, setAlertPhone] = useState('');
  const [alertSubscribed, setAlertSubscribed] = useState(false);
  const [alertError, setAlertError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const digits = alertPhone.replace(/\D/g, '');
    if (digits.length < 10) {
      setAlertError('Enter a valid 10-digit mobile number.');
      return;
    }
    setAlertError('');
    setAlertSubscribed(true);
    const text = encodeURIComponent(
      `Hello ${COMPANY_INFO.name}, please add ${alertPhone} to your WhatsApp offer alerts for festival deals and route discounts.`
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  const handleSectionLink = (event: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onNavigate(target);
  };

  const paymentMethods = [
    { icon: Smartphone, label: 'UPI / GPay / PhonePe' },
    { icon: CreditCard, label: 'Debit & Credit Cards' },
    { icon: Landmark, label: 'Net Banking' },
    { icon: Banknote, label: 'Cash After Trip' },
  ];

  const trustBadges = [
    { icon: FileCheck, label: 'GST Registered' },
    { icon: BadgeCheck, label: 'Tourist Permit Fleet' },
    { icon: Lock, label: 'Secure Bookings' },
    { icon: ShieldCheck, label: 'Police-Verified Drivers' },
  ];

  const socialLinks = [
    { icon: WhatsAppIcon, label: 'WhatsApp', href: `https://wa.me/${COMPANY_INFO.whatsappNumber}`, hover: 'hover:bg-emerald-600 hover:border-emerald-500' },
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      {/* Top Value Banner in Footer */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 py-4 px-4 font-bold text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
          <span className="flex items-center gap-2">
            <Car className="w-4 h-4" />
            Book Your Cab in Advance & Get Guaranteed Best Rates with 0% Cancellation Fee!
          </span>
          <a
            href={`tel:${COMPANY_INFO.rawPhone}`}
            className="inline-flex items-center gap-1.5 bg-slate-950 text-amber-400 hover:text-white px-4 py-1.5 rounded-lg text-xs font-black shadow transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call: {COMPANY_INFO.primaryPhone}</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-8">
        {/* Offer Alerts + Payment & Trust Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 pb-10 mb-10 border-b border-slate-800">
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <BellRing className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Get Offer Alerts on WhatsApp</h3>
            </div>
            <p className="text-slate-400 mb-4">
              Festival discounts, new routes and flash deals. No spam, opt out anytime.
            </p>
            {alertSubscribed ? (
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <CheckCircle className="w-4 h-4" />
                You are on the list. Confirm on WhatsApp to activate alerts.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    aria-label="WhatsApp phone number for offer alerts"
                    type="tel"
                    value={alertPhone}
                    onChange={(e) => setAlertPhone(e.target.value)}
                    placeholder="Your WhatsApp number"
                    className="flex-1 min-w-0 px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    type="submit"
                    className="min-h-11 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black whitespace-nowrap transition-colors cursor-pointer"
                  >
                    Subscribe
                  </button>
                </div>
                {alertError && <p className="text-red-400 text-[11px] font-semibold">{alertError}</p>}
              </form>
            )}
          </div>

          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">We Accept</h3>
              <div className="grid grid-cols-2 gap-2">
                {paymentMethods.map((p) => {
                  const Icon = p.icon;
                  return (
                    <div key={p.label} className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-300">
                      <Icon className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="text-[11px] font-semibold leading-tight">{p.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Why You Can Trust Us</h3>
              <div className="grid grid-cols-2 gap-2">
                {trustBadges.map((t) => {
                  const Icon = t.icon;
                  return (
                    <div key={t.label} className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-300">
                      <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-[11px] font-semibold leading-tight">{t.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 pb-10 border-b border-slate-800">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-3 rounded-xl shadow-md inline-flex items-center justify-center">
                <img width={224} height={64}
                  src={withBase('/assets/logo-swaraj.svg')}
                  alt="Swaraj Tours and Travels"
                  className="h-14 w-auto object-contain"
                />
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-sm">
              {COMPANY_INFO.name} is a Nashik-based cab rental & tour operator. Every trip starts from our Nashik office: outstation taxis, economical one-way drops, airport transfers, corporate travel and sacred pilgrimage yatras.
            </p>

            <div className="flex flex-wrap gap-x-2 gap-y-1 text-[11px] font-bold uppercase tracking-wider text-amber-400/90">
              {['Local', 'Outstation', 'Airport', 'Pilgrimage', 'Group Tours', 'Corporate'].map((t, i) => (
                <React.Fragment key={t}>
                  {i > 0 && <span className="text-slate-600">•</span>}
                  <span>{t}</span>
                </React.Fragment>
              ))}
            </div>

            <div className="pt-2 text-slate-300 space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.mainAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${COMPANY_INFO.rawPhone}`} className="hover:text-white font-bold">
                  {COMPANY_INFO.primaryPhone} (Call / WhatsApp)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white">
                  {COMPANY_INFO.email}
                </a>
              </div>
            </div>

            {/* Social links */}
            <div className="pt-2">
              <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Contact & Chat</h3>
              <div className="flex items-center gap-2">
                {socialLinks.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      title={s.label}
                      className={`w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors ${s.hover}`}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Cab Services */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Cab Services
            </h3>
            <ul className="space-y-2">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a
                    href={withBase('/services')}
                    onClick={(event) => handleSectionLink(event, 'services')}
                    className="hover:text-amber-400 transition-colors text-left flex items-start gap-1"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0 mt-0.5" />
                    <span>{s.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tour Packages */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Tour Packages
            </h3>
            <ul className="space-y-2">
              {TOUR_PACKAGES.slice(0, 9).map((p) => (
                <li key={p.id}>
                  <a
                    href={withBase('/packages')}
                    onClick={(event) => handleSectionLink(event, 'packages')}
                    className="hover:text-amber-400 transition-colors text-left flex items-start gap-1"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{p.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Explore
            </h3>
            <ul className="space-y-2">
              {[
                { label: 'About Us', target: 'about' },
                { label: 'How It Works', target: 'how-it-works' },
                { label: 'Offers & Promo Codes', target: 'offers' },
                { label: 'Online Booking', target: 'booking' },
                { label: 'Vehicle Fleet & Rates', target: 'fleet' },
                { label: 'Compare Cabs', target: 'compare' },
                { label: 'Destinations', target: 'destinations' },
                { label: 'Fare Calculator', target: 'calculator' },
                { label: 'Travel Guides', target: 'guides' },
                { label: 'Traveler Reviews', target: 'reviews' },
                { label: 'Partner With Us', target: 'partner' },
                { label: 'Contact Us', target: 'contact' },
              ].map((item) => (
                <li key={item.target}>
                  <a
                    href={withBase(pageForSection(item.target).path)}
                    onClick={(event) => handleSectionLink(event, item.target)}
                    className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-left"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Routes */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Popular Routes
            </h3>
            <ul className="space-y-2">
              {POPULAR_ROUTES.slice(0, 8).map((r) => (
                <li key={r.id}>
                  <a
                    href={withBase('/')}
                    onClick={(event) => {
                      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                      event.preventDefault();
                      onSelectRoute(r.from, r.to);
                    }}
                    className="hover:text-amber-400 transition-colors text-left flex items-center gap-1"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                    <span className="truncate">{r.from} to {r.to} Cab</span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={withBase('/')}
                  onClick={(event) => handleSectionLink(event, 'routes')}
                  className="text-amber-400 hover:text-amber-300 font-bold transition-colors text-left flex items-center gap-1"
                >
                  <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                  <span>All routes directory</span>
                </a>
              </li>
            </ul>

            <h3 className="text-sm font-bold text-white uppercase tracking-wider pt-3">
              Fleet
            </h3>
            <ul className="space-y-2">
              {VEHICLES.filter((v) => v.isPopular).map((v) => (
                <li key={v.id}>
                  <a
                    href={withBase('/services')}
                    onClick={(event) => handleSectionLink(event, 'fleet')}
                    className="hover:text-amber-400 transition-colors text-left flex items-center gap-1"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                    <span className="truncate">{v.name.split('/')[0].replace('(13', '(14')} (₹{v.ratePerKm}/km)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col lg:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} <strong>Swaraj Tours and Travels</strong>. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            {(
              [
                { id: 'terms', label: 'Terms & Conditions' },
                { id: 'privacy', label: 'Privacy Policy' },
                { id: 'refund', label: 'Cancellation & Refund Policy' },
              ] as { id: LegalDocType; label: string }[]
            ).map((doc, idx) => (
              <React.Fragment key={doc.id}>
                {idx > 0 && <span className="text-slate-700">|</span>}
                <a
                  href={withBase(`/policies#${doc.id}`)}
                  onClick={(event) => {
                    if (!onOpenLegal || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                    event.preventDefault();
                    onOpenLegal(doc.id);
                  }}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {doc.label}
                </a>
              </React.Fragment>
            ))}
            <span className="text-slate-700">|</span>
            <a href={withBase('/photo-credits.html')} className="hover:text-amber-400 transition-colors">Photo Credits</a>
          </div>
          <div className="flex items-center gap-4">
            <span>Nashik to Mumbai • Pune • Shirdi • Goa • Pan-India</span>
            <span>|</span>
            <span className="text-emerald-500 font-semibold">100% Sanitized & Safe Cabs</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
