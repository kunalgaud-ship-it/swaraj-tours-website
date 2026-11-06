import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  CheckCircle, 
  XCircle, 
  Clock, 
  ArrowRight, 
  X, 
  MessageSquare,
  Sparkles,
  PhoneCall,
  Check,
  ShieldCheck,
  HeartHandshake,
  Car
} from 'lucide-react';
import { TourPackage } from '../types/travel';
import { TOUR_PACKAGES, COMPANY_INFO } from '../data/travelData';
import { WhatsAppIcon } from './WhatsAppIcon';

interface TourPackagesProps {
  onSelectPackage: (packageName: string) => void;
}

export const TourPackages: React.FC<TourPackagesProps> = ({ onSelectPackage }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePackageModal, setActivePackageModal] = useState<TourPackage | null>(null);

  const categories = ['all', 'Pilgrimage', 'Jyotirlinga', 'Hill Station', 'Coastal', 'Heritage', 'Inter-State'];

  const filteredPackages = TOUR_PACKAGES.filter((pkg) => {
    if (selectedCategory === 'all') return true;
    return pkg.category === selectedCategory;
  });

  const handleWhatsAppPackage = (pkg: TourPackage) => {
    const text = encodeURIComponent(
      `Hello Shivraj Cab, I am interested in your *${pkg.title}* (${pkg.duration}, Starting ₹${pkg.startingPrice}, toll and parking extra). Please send detailed pricing and vehicle options for our group.`
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="packages" className="py-16 sm:py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Maharashtra & Goa Tours
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Special Pilgrimage & Holiday Packages
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Carefully designed road trips with doorstep pickup, expert chauffeurs who know temple timings and scenic points, dedicated AC vehicle, and zero travel stress.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold capitalize transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-amber-400 shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cat === 'all' ? 'All Packages' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Image banner */}
              <div className="relative h-52 overflow-hidden bg-slate-900">
                <img width={800} height={600}
                  src={pkg.image}
                  alt={pkg.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Duration & Category Pills */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="bg-amber-500 text-slate-950 font-black text-[11px] px-2.5 py-1 rounded shadow">
                    {pkg.duration}
                  </span>
                  <span className="bg-slate-900/80 backdrop-blur-sm text-white font-bold text-[10px] px-2 py-0.5 rounded border border-white/20">
                    {pkg.category}
                  </span>
                </div>

                {/* Price Pill */}
                <div className="absolute bottom-3 right-3 bg-slate-900/90 backdrop-blur-md text-amber-400 border border-amber-500/30 text-xs font-extrabold px-3 py-1 rounded-full shadow text-right leading-tight">
                  From ₹{pkg.startingPrice.toLocaleString()}
                  <span className="block text-[9px] font-semibold text-amber-200/90">Toll & parking extra</span>
                </div>

                <div className="absolute bottom-3 left-4 right-28">
                  <h3 className="text-base font-bold text-white drop-shadow leading-snug">
                    {pkg.title}
                  </h3>
                </div>
              </div>

              {/* Package Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <p className="text-xs text-slate-600 line-clamp-2 italic mb-3">
                    "{pkg.tagline}"
                  </p>

                  {/* Highlights list */}
                  <div className="space-y-1.5">
                    {pkg.highlights.slice(0, 3).map((hl, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{hl}</span>
                      </div>
                    ))}
                  </div>

                  {/* Assurance badges + vehicle options */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {pkg.permitsReady && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <ShieldCheck className="w-3 h-3" /> Permits arranged
                      </span>
                    )}
                    {pkg.seniorFriendly && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200">
                        <HeartHandshake className="w-3 h-3" /> Senior-friendly pace
                      </span>
                    )}
                  </div>
                  {pkg.vehicleOptions && pkg.vehicleOptions.length > 0 && (
                    <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-1.5">
                      <Car className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="truncate">
                        Cabs: <strong className="text-slate-700">{pkg.vehicleOptions.join(' / ')}</strong>
                      </span>
                    </div>
                  )}
                </div>

                {/* Buttons */}
                <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setActivePackageModal(pkg)}
                    className="py-2.5 px-3 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    View Itinerary
                  </button>

                  <button
                    type="button"
                    onClick={() => handleWhatsAppPackage(pkg)}
                    className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5" />
                    Book on WhatsApp
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Package Detail Modal */}
      {activePackageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setActivePackageModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title */}
            <div className="mb-4">
              <span className="bg-amber-100 text-amber-900 font-bold text-xs px-2.5 py-1 rounded">
                {activePackageModal.duration} • {activePackageModal.category}
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-2">
                {activePackageModal.title}
              </h3>
              <p className="text-xs text-slate-600 mt-1 italic">
                {activePackageModal.tagline}
              </p>
            </div>

            {/* Real Tour Photo Preview */}
            <div className="h-44 sm:h-52 w-full rounded-xl overflow-hidden mb-4 border border-slate-200">
              <img width={800} height={600}
                src={activePackageModal.image}
                alt={activePackageModal.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Price Banner */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-4 rounded-xl flex items-center justify-between mb-5">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase block">Complete Tour Fare</span>
                <span className="text-2xl font-black text-slate-900">
                  ₹{activePackageModal.startingPrice.toLocaleString()}
                </span>
                <span className="text-xs text-slate-500 ml-1.5">(Cab + Driver; toll & parking extra)</span>
              </div>
              <button
                onClick={() => handleWhatsAppPackage(activePackageModal)}
                className="py-2 px-3.5 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow"
              >
                <WhatsAppIcon className="w-4 h-4" />
                Book Package
              </button>
            </div>

            {/* Day by Day Itinerary */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600" />
                Day-by-Day Journey Schedule
              </h4>
              <div className="space-y-3">
                {activePackageModal.itinerary.map((day) => (
                  <div key={day.day} className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-6 h-6 rounded-full bg-slate-900 text-amber-400 font-black text-xs flex items-center justify-center shrink-0">
                        {day.day}
                      </span>
                      <h5 className="font-bold text-xs sm:text-sm text-slate-900">
                        Day {day.day}: {day.title}
                      </h5>
                    </div>
                    <p className="text-xs text-slate-600 pl-8 leading-relaxed">
                      {day.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-xs">
              <div className="bg-emerald-50/60 border border-emerald-200/70 p-3.5 rounded-xl">
                <h5 className="font-bold text-emerald-900 mb-2 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  What is Included
                </h5>
                <ul className="space-y-1.5 text-slate-700">
                  {activePackageModal.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-100/70 border border-slate-200 p-3.5 rounded-xl">
                <h5 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-slate-400" />
                  What is Excluded
                </h5>
                <ul className="space-y-1.5 text-slate-600">
                  {activePackageModal.exclusions.map((exc, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-slate-400 font-bold">•</span>
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <a
                href={`tel:${COMPANY_INFO.rawPhone}`}
                className="text-xs font-bold text-slate-700 flex items-center gap-1.5 hover:text-amber-600"
              >
                <PhoneCall className="w-3.5 h-3.5 text-amber-600" />
                Call Expert: {COMPANY_INFO.primaryPhone}
              </a>
              <button
                onClick={() => {
                  onSelectPackage(activePackageModal.title);
                  setActivePackageModal(null);
                }}
                className="py-2.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-md transition-all cursor-pointer"
              >
                Customize in Booking Box
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
