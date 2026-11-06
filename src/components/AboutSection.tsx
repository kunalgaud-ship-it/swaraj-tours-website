import React from 'react';
import {
  Building2,
  Target,
  Eye,
  Heart,
  ShieldCheck,
  Users,
  MapPin,
  Phone,
  MessageSquare,
  Car,
  Star,
  Route,
  CheckCircle2,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';
import { WhatsAppIcon } from './WhatsAppIcon';
import fleetImage from '../assets/images/innova_crysta_cab_1792438495834.webp';
import pilgrimageImage from '../assets/images/trimbakeshwar-temple.webp';

interface AboutSectionProps {
  onBookNow?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onBookNow }) => {
  const foundedYear = new Date().getFullYear() - COMPANY_INFO.experienceYears;

  const pillars = [
    {
      title: 'Our Mission',
      description:
        'To make every road journey across Maharashtra safe, punctual, and affordable, with honest fares and chauffeurs who treat every passenger like family.',
      icon: Target,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
    },
    {
      title: 'Our Vision',
      description:
        'To be the most trusted name in cab rentals and pilgrimage tours from Nashik to every corner of India.',
      icon: Eye,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
    },
    {
      title: 'Our Values',
      description:
        'Safety first, transparent billing, respect for every traveler, and a deep commitment to the spiritual and cultural journeys we help complete.',
      icon: Heart,
      color: 'text-rose-600 bg-rose-50 border-rose-200',
    },
  ];

  const milestones = [
    {
      year: `${foundedYear}`,
      title: 'Humble Beginnings in Nashik',
      description:
        'Started with a single sedan serving Shirdi and Trimbakeshwar pilgrims from our Nashik office.',
    },
    {
      year: `${foundedYear + 3}`,
      title: 'Daily Mumbai & Pune Runs',
      description:
        'Started daily one-way drops and airport transfers from Nashik to Mumbai and Pune, with drivers dedicated to the Kasara and Sangamner highways.',
    },
    {
      year: `${foundedYear + 7}`,
      title: 'Group Tours & Tempo Travellers',
      description:
        'Added luxury push-back Tempo Travellers for Ashtavinayak yatras, wedding shuttles, and corporate offsites.',
    },
    {
      year: 'Today',
      title: `${COMPANY_INFO.activeFleet} Vehicles, ${COMPANY_INFO.completedTrips} Journeys`,
      description: `A ${COMPANY_INFO.googleRating}-star rated fleet with 24x7 dispatch, GPS tracking, and verified chauffeurs across Maharashtra and Pan-India.`,
    },
  ];

  const commitments = [
    'Police-verified, uniformed chauffeurs with 5+ years of ghat experience',
    'Clear per-km rates with GST invoices and zero hidden charges',
    'Sanitized, well-maintained, commercially licensed AC vehicles',
    'Doorstep pickups 15 minutes ahead of schedule, every time',
    'Free cancellation up to 2 hours before pickup',
    '24x7 helpline for bookings, changes, and on-road support',
  ];

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${COMPANY_INFO.name}, I would like to know more about your cab rental and tour services.`
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="about" className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5" />
            About Us
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {COMPANY_INFO.experienceYears}+ Years on the Roads of Maharashtra
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            {COMPANY_INFO.name} ({COMPANY_INFO.marathiName}) is a family-run cab rental and tour operator
            headquartered in Nashik, trusted by thousands of pilgrims, families, and corporate travelers every year.
          </p>
        </div>

        {/* Story + Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
          {/* Image Collage */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200">
              <img width={800} height={600}
                src={fleetImage}
                alt={`${COMPANY_INFO.name} premium Innova Crysta fleet`}
                className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                loading="lazy"
              />
            </div>
            <div className="hidden sm:block absolute -bottom-6 -right-4 lg:-right-8 w-44 lg:w-56 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img width={800} height={600}
                src={pilgrimageImage}
                alt="Pilgrimage tours across Maharashtra"
                className="w-full h-32 lg:h-40 object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -top-4 -left-3 sm:-left-6 bg-white rounded-2xl shadow-lg border border-slate-200 px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
              </div>
              <div className="leading-tight">
                <div className="text-lg font-black text-slate-900">{COMPANY_INFO.googleRating} / 5</div>
                <div className="text-[11px] font-semibold text-slate-500">{COMPANY_INFO.reviewsCount} Google Reviews</div>
              </div>
            </div>
          </div>

          {/* Story Text */}
          <div className="space-y-5 lg:pl-4">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              From One Cab in Nashik to a Trusted Pan-India Fleet
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {COMPANY_INFO.name} began in {foundedYear} with a single sedan and a simple promise: take pilgrims
              to Shirdi and Trimbakeshwar safely, on time, and at an honest price. Word spread quickly through
              families in Nashik, and soon we were driving to Mumbai, Pune and Shirdi every single day.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Today we operate {COMPANY_INFO.activeFleet} sanitized AC vehicles, from Swift Dzires to 17-seater
              Tempo Travellers, all dispatched from our single office in Nashik. Our chauffeurs know every ghat,
              temple gate, and airport terminal on the route, so you can relax and enjoy the journey.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {commitments.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-3">
              {onBookNow && (
                <button
                  type="button"
                  onClick={onBookNow}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  <Car className="w-4 h-4" />
                  Book Your Cab
                </button>
              )}
              <button
                type="button"
                onClick={handleWhatsApp}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-bold text-sm transition-all cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4" />
                Chat with Our Team
              </button>
            </div>
          </div>
        </div>

        {/* Mission / Vision / Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-4 ${pillar.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{pillar.description}</p>
              </div>
            );
          })}
        </div>

        {/* Journey Timeline */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Route className="w-3.5 h-3.5 text-amber-500" />
              Our Journey
            </div>
            <h3 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Milestones Along the Way
            </h3>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-6 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {milestones.map((m, idx) => (
                <div key={idx} className="relative bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-all">
                  <div className="hidden lg:flex absolute -top-3 left-6 w-6 h-6 rounded-full bg-amber-500 border-4 border-slate-50 items-center justify-center" />
                  <div className="text-xs font-extrabold text-amber-700 bg-amber-100 inline-block px-2.5 py-1 rounded-md mb-3">
                    {m.year}
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-1.5">{m.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{m.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Branch Hubs + Contact Strip */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Users className="w-3.5 h-3.5" />
                Where to Find Us
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                One Nashik Office. Every Trip Starts Here.
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Walk in, call, or message us. All vehicles and drivers are based in Nashik and our dispatch desk is available {COMPANY_INFO.supportHours.toLowerCase()}.
              </p>
              <div className="flex flex-col gap-2 pt-2">
                <a
                  href={`tel:${COMPANY_INFO.rawPhone}`}
                  className="inline-flex items-center gap-2 text-amber-400 hover:text-white font-bold text-sm transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {COMPANY_INFO.primaryPhone}
                </a>
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="inline-flex items-center gap-2 text-slate-300 hover:text-white text-sm transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  {COMPANY_INFO.email}
                </a>
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-800/70 border border-amber-500/40 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-sm font-bold">Nashik Office & Dispatch</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{COMPANY_INFO.mainAddress}</p>
              </div>
              <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Route className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-sm font-bold">Where we drive from Nashik</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {COMPANY_INFO.serviceCities.map((c) => (
                    <span key={c} className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-700 text-[11px] font-semibold text-slate-200">
                      {c}
                    </span>
                  ))}
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/40 text-[11px] font-semibold text-amber-300">
                    + Pan-India
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
