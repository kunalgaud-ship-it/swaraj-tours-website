/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBooking } from './components/HeroBooking';
import { WhyChooseUs } from './components/WhyChooseUs';
import { HowItWorks } from './components/HowItWorks';
import { LegalModal, LegalDocType } from './components/LegalModal';
import { PopularRoutes } from './components/PopularRoutes';
import { DestinationsSection } from './components/DestinationsSection';
import { ClosingCta } from './components/ClosingCta';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { FloatingActions } from './components/FloatingActions';
import { AssistanceFormModal } from './components/AssistanceFormModal';
import { PageHero } from './components/PageHero';
import { BookingFormData } from './types/travel';
import { PageMeta, isKnownPath, pageForPath, pageForSection, siteBaseFromUrl, withBase } from './pages';
import { applySiteConfig } from './admin/siteConfig';
import { NotFoundPage } from './components/NotFoundPage';

const AboutSection = lazy(() => import('./components/AboutSection').then((module) => ({ default: module.AboutSection })));
const OffersSection = lazy(() => import('./components/OffersSection').then((module) => ({ default: module.OffersSection })));
const FleetComparison = lazy(() => import('./components/FleetComparison').then((module) => ({ default: module.FleetComparison })));
const TravelGuides = lazy(() => import('./components/TravelGuides').then((module) => ({ default: module.TravelGuides })));
const DriverPartnerSection = lazy(() => import('./components/DriverPartnerSection').then((module) => ({ default: module.DriverPartnerSection })));
const FleetSection = lazy(() => import('./components/FleetSection').then((module) => ({ default: module.FleetSection })));
const TourPackages = lazy(() => import('./components/TourPackages').then((module) => ({ default: module.TourPackages })));
const ServicesSection = lazy(() => import('./components/ServicesSection').then((module) => ({ default: module.ServicesSection })));
const FareCalculator = lazy(() => import('./components/FareCalculator').then((module) => ({ default: module.FareCalculator })));
const ReviewsSection = lazy(() => import('./components/ReviewsSection').then((module) => ({ default: module.ReviewsSection })));
const FaqSection = lazy(() => import('./components/FaqSection').then((module) => ({ default: module.FaqSection })));
const ContactSection = lazy(() => import('./components/ContactSection').then((module) => ({ default: module.ContactSection })));
const AssistanceSection = lazy(() => import('./components/AssistanceSection').then((module) => ({ default: module.AssistanceSection })));
const PoliciesPage = lazy(() => import('./components/PoliciesPage').then((module) => ({ default: module.PoliciesPage })));

export default function App() {
  const [bookingModalData, setBookingModalData] = useState<BookingFormData | null>(null);
  const [prefillRoute, setPrefillRoute] = useState<{ from: string; to: string } | null>(null);
  const [isAssistanceOpen, setIsAssistanceOpen] = useState(false);
  const [quotaExceeded, setQuotaExceeded] = useState(false);
  const [legalDoc, setLegalDoc] = useState<LegalDocType | null>(null);
  const [, setSiteConfigRevision] = useState(0);

  // ---- Multi-page router (5 pages, see src/pages.ts) ----
  const [page, setPage] = useState<PageMeta>(() => pageForPath(window.location.pathname));
  const [notFound, setNotFound] = useState<boolean>(() => !isKnownPath(window.location.pathname));
  const [pendingSection, setPendingSection] = useState<string | null>(null);

  useEffect(() => {
    const handleQuotaExceeded = () => {
      setQuotaExceeded(true);
    };
    window.addEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
  }, []);

  // Apply saved admin-managed content when the public site starts.
  useEffect(() => {
    fetch('/api/site-config')
      .then((response) => (response.ok ? response.json() : { config: {} }))
      .then(({ config }) => {
        if (config && typeof config === 'object') {
          applySiteConfig(config);
          setSiteConfigRevision((revision) => revision + 1);
        }
      })
      .catch(() => undefined);
  }, []);

  // Browser back / forward buttons
  useEffect(() => {
    const onPop = () => {
      setPage(pageForPath(window.location.pathname));
      setNotFound(!isKnownPath(window.location.pathname));
      setPendingSection(null);
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Page title + meta description, and scroll after the new page has rendered
  useEffect(() => {
    if (notFound) return;
    document.title = page.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', page.description);

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    // Prerender writes an absolute canonical (origin + base + page). Fall back to the current origin + base.
    const siteOrigin = canonical.href
      ? siteBaseFromUrl(canonical.href)
      : `${window.location.origin}${withBase('/').replace(/\/$/, '')}`;

    const setMetaContent = (selector: string, content: string, name: string, key: string) => {
      let element = document.querySelector<HTMLMetaElement>(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(name, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };
    setMetaContent('meta[property="og:title"]', page.title, 'property', 'og:title');
    setMetaContent('meta[property="og:description"]', page.description, 'property', 'og:description');
    setMetaContent('meta[property="og:url"]', `${siteOrigin}${page.path}`, 'property', 'og:url');
    setMetaContent('meta[name="twitter:title"]', page.title, 'name', 'twitter:title');
    setMetaContent('meta[name="twitter:description"]', page.description, 'name', 'twitter:description');

    canonical.href = `${siteOrigin}${page.path}`;

    if (pendingSection) {
      const el = document.getElementById(pendingSection);
      if (el && pendingSection !== page.sections[0]) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      setPendingSection(null);
    }
  }, [page, pendingSection, notFound]);

  const scrollToSection = (sectionId: string) => {
    const target = pageForSection(sectionId);
    if (target.path !== page.path || notFound) {
      window.history.pushState({}, '', withBase(target.path));
      setPage(target);
      setNotFound(false);
      setPendingSection(sectionId);
      return;
    }
    const el = document.getElementById(sectionId);
    if (el && sectionId !== page.sections[0]) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goHome = () => scrollToSection('hero');

  const renderPage = () => {
    if (notFound) {
      return <NotFoundPage onHome={goHome} onBook={() => scrollToSection('booking')} />;
    }
    switch (page.path) {
      case '/services':
        return (
          <>
            <PageHero title="Our Services" subtitle="One-way, round trip, local, airport and corporate cabs with a well-maintained fleet and transparent per-km fares." onHome={goHome} />
            <ServicesSection onBookService={handleBookService} />
            <FleetSection onSelectCar={handleSelectCar} />
            <FleetComparison onSelectCar={handleSelectCar} />
            <FareCalculator />
          </>
        );
      case '/packages':
        return (
          <>
            <PageHero title="Tour Packages" subtitle="Jyotirlinga, Ashtavinayak, Shirdi and Maharashtra sightseeing packages, seasonal offers and travel guides." onHome={goHome} />
            <TourPackages onSelectPackage={handleSelectPackage} />
            <OffersSection onBookNow={() => scrollToSection('booking')} />
            <TravelGuides onBookNow={() => scrollToSection('booking')} />
          </>
        );
      case '/about':
        return (
          <>
            <PageHero title="About Us" subtitle="Our story, mission, Nashik office, verified drivers and what our customers say about us." onHome={goHome} />
            <AboutSection onBookNow={() => scrollToSection('booking')} />
            <ReviewsSection />
            <DriverPartnerSection />
          </>
        );
      case '/contact':
        return (
          <>
            <PageHero title="Contact Us" subtitle="Call, WhatsApp or visit our office in Nashik. We reply within minutes, 24x7." onHome={goHome} />
            <ContactSection />
            <AssistanceSection />
            <div id="faq"><FaqSection /></div>
          </>
        );
      case '/policies':
        return (
          <>
            <PageHero title="Our Policies" subtitle="Terms and conditions, privacy policy and cancellation and refund policy for every booking with us." onHome={goHome} />
            <PoliciesPage />
          </>
        );
      default:
        return (
          <>
            <HeroBooking onConfirmBooking={handleConfirmBooking} prefillRoute={prefillRoute} />
            <div id="why-us"><WhyChooseUs /></div>
            <HowItWorks onBookNow={() => scrollToSection('booking')} />
            <PopularRoutes onSelectRoute={handleSelectRoute} />
            <DestinationsSection onSelectDestination={handleSelectDestination} />
          </>
        );
    }
  };

  const handleSelectRoute = (from: string, to: string) => {
    setPrefillRoute({ from, to });
    scrollToSection('booking');
  };

  // Destination cards only set the drop city; the traveller's pickup stays as typed.
  const handleSelectDestination = (destination: string) => {
    setPrefillRoute({ from: '', to: destination });
    scrollToSection('booking');
  };

  const handleSelectCar = (carId: string) => {
    scrollToSection('booking');
  };

  const handleSelectPackage = (packageName: string) => {
    scrollToSection('booking');
  };

  const handleBookService = (serviceTitle: string) => {
    scrollToSection('booking');
  };

  const handleConfirmBooking = (data: BookingFormData) => {
    setBookingModalData(data);
  };

  // Google Maps is not loaded here: see src/maps.ts. Location fields and maps load it on demand.
  return (
    <>
      <div className="min-h-screen bg-white text-slate-900 selection:bg-amber-500 selection:text-slate-950">
        {/* Two-Tier In-App Quota Defense Banner */}
        {quotaExceeded && (
          <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
            <span>
              Google Maps Platform quota reached. If you are the app owner, visit{' '}
              <a
                href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold text-amber-950 hover:text-amber-800"
              >
                maps developer site
              </a>{' '}
              for instructions to update your account.
            </span>
          </div>
        )}

        {/* Navigation Header */}
        <Navbar
          onNavigate={scrollToSection}
          onOpenBooking={() => scrollToSection('booking')}
          onOpenAssistance={() => setIsAssistanceOpen(true)}
        />

        {/* Main Content */}
        {/* Page content: Home / Services / Tour Packages / About / Contact (src/pages.ts) */}
        <main className="pb-16 sm:pb-0 mobile-safe-bottom">
          <Suspense fallback={<div className="min-h-48" aria-busy="true" />}>
            {renderPage()}
          </Suspense>
        </main>

        {/* Closing call-to-action band (every page) */}
        <ClosingCta onBookNow={() => scrollToSection('booking')} />

        {/* Comprehensive Footer */}
        <Footer
          onNavigate={scrollToSection}
          onSelectRoute={handleSelectRoute}
          onOpenLegal={setLegalDoc}
        />

        {/* Terms / Privacy / Refund Policy Modal */}
        <LegalModal doc={legalDoc} onClose={() => setLegalDoc(null)} />

        {/* Sticky Bottom Actions for Mobile & Floating Desktop Actions */}
        <FloatingActions
          onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          onOpenBooking={() => scrollToSection('booking')}
          onOpenAssistance={() => setIsAssistanceOpen(true)}
        />

        {/* Reservation Confirmation Modal */}
        <BookingModal
          bookingData={bookingModalData}
          onClose={() => setBookingModalData(null)}
        />

        {/* Dedicated "Need Assistance?" Quick Modal */}
        <AssistanceFormModal
          isOpen={isAssistanceOpen}
          onClose={() => setIsAssistanceOpen(false)}
        />
      </div>
    </>
  );
}
