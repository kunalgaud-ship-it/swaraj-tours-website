import React, { useState } from 'react';
import { Phone, Mail, Clock, Menu, X, Car, Shield, ChevronRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Logo } from './Logo';
import { pageForSection, withBase } from '../pages';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
  onOpenAssistance?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, onOpenBooking, onOpenAssistance }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Primary pages appear on desktop; the mobile drawer also lists secondary pages and sections.
  // Each target is a section id; the router (src/pages.ts) opens the right page and scrolls to it.
  const navLinks: { label: string; target: string; mobileOnly?: boolean }[] = [
    { label: 'Home', target: 'hero' },
    { label: 'Book Taxi', target: 'booking' },
    { label: 'Services', target: 'services' },
    { label: 'Nashik Airport Cabs', target: 'airport-transfers', mobileOnly: true },
    { label: 'Our Fleet', target: 'fleet', mobileOnly: true },
    { label: 'Fare Calculator', target: 'calculator', mobileOnly: true },
    { label: 'Tour Packages', target: 'packages' },
    { label: 'Offers', target: 'offers', mobileOnly: true },
    { label: 'Routes', target: 'routes' },
    { label: 'Destinations', target: 'destinations', mobileOnly: true },
    { label: 'About Us', target: 'about' },
    { label: 'Reviews', target: 'reviews', mobileOnly: true },
    { label: 'Partner With Us', target: 'partner', mobileOnly: true },
    { label: 'Contact Us', target: 'contact' },
    { label: 'Need Assistance?', target: 'assistance', mobileOnly: true },
  ];

  // Desktop nav has limited width (and a dedicated "Need Assistance?" button), so secondary links live in the drawer + footer.
  const desktopLinks = navLinks.filter((link) => !link.mobileOnly);

  const handleNavClick = (target: string) => {
    onNavigate(target);
    setMobileMenuOpen(false);
  };

  const handleNavLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    handleNavClick(target);
  };

  const handleWhatsAppChat = () => {
    const text = encodeURIComponent("Hello Swaraj Cab, I want to inquire about booking a cab / tour package.");
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Bar for Desktop and Tablet */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              24x7 Cab Service from Nashik to all Maharashtra & Pan-India
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="hidden md:flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              {COMPANY_INFO.email}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded text-[11px] font-medium">
              ✓ Clean & Sanitized Cabs
            </span>
            <a
              href={`tel:${COMPANY_INFO.rawPhone}`}
              className="flex items-center gap-1.5 font-bold text-amber-400 hover:text-amber-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{COMPANY_INFO.primaryPhone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <a
          href={withBase('/')}
          onClick={(event) => handleNavLinkClick(event, 'hero')}
          className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer shrink-0"
        >
          <span className="sr-only">Swaraj Cab, home</span>
          <Logo className="group-hover:opacity-90 transition-opacity" />
        </a>

        {/* Desktop Links */}
        <nav className="hidden xl:flex items-center justify-center flex-1 min-w-0 gap-1 text-[13px] 2xl:text-sm font-semibold text-slate-700">
          {desktopLinks.map((link) => (
            <a
              key={link.target}
              href={withBase(pageForSection(link.target).path)}
              onClick={(event) => handleNavLinkClick(event, link.target)}
              className="px-2 2xl:px-3 py-2 rounded-lg whitespace-nowrap hover:text-amber-600 hover:bg-amber-50/70 transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          {onOpenAssistance && (
            <button
              onClick={onOpenAssistance}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-black hover:bg-neutral-800 text-white text-xs font-bold whitespace-nowrap transition-all shadow-sm cursor-pointer"
              title="Need Assistance? Quick Support & Offers"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
              <span>Need Assistance?</span>
            </button>
          )}

          <button
            onClick={handleWhatsAppChat}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold whitespace-nowrap transition-all shadow-sm cursor-pointer"
            title="Chat directly on WhatsApp"
          >
            <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
            <span className="xl:hidden 2xl:inline">WhatsApp</span>
          </button>

          <button
            onClick={onOpenBooking}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold text-xs whitespace-nowrap shadow-md shadow-amber-500/20 hover:shadow-lg transition-all cursor-pointer"
          >
            <Car className="w-4 h-4" />
            <span>Book Cab Now</span>
          </button>
        </div>

        {/* Mobile / Tablet Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden min-h-11 min-w-11 p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none shrink-0"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile / Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-3 gap-2 pb-3 pt-1 border-b border-slate-100">
            <a
              href={`tel:${COMPANY_INFO.rawPhone}`}
              className="flex items-center justify-center gap-1 py-2 px-2 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              Call
            </a>
            <button
              onClick={handleWhatsAppChat}
              className="flex items-center justify-center gap-1 py-2 px-2 rounded-lg bg-emerald-600 text-white text-xs font-bold shadow-sm cursor-pointer"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              WhatsApp
            </button>
            {onOpenAssistance && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAssistance();
                }}
                className="flex items-center justify-center gap-1 py-2 px-2 rounded-lg bg-black text-white text-xs font-bold shadow-sm cursor-pointer"
              >
                Help?
              </button>
            )}
          </div>

          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.target}
                href={withBase(pageForSection(link.target).path)}
                onClick={(event) => handleNavLinkClick(event, link.target)}
                className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-left text-sm font-semibold text-slate-800 hover:bg-amber-50 hover:text-amber-600 transition-colors"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              Verified & Safe Drivers
            </span>
            <span className="font-semibold text-amber-600">Based in Nashik</span>
          </div>
        </div>
      )}
    </header>
  );
};
