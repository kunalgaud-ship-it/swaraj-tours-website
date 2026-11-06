import React, { useState } from 'react';
import { 
  MapPin, 
  ArrowRight, 
  Clock, 
  Gauge, 
  Car, 
  Check, 
  MessageSquare,
  Sparkles,
  PhoneCall,
  Map as MapIcon
} from 'lucide-react';
import { PopularRoute, RouteCategory } from '../types/travel';
import { POPULAR_ROUTES, ROUTE_HUBS, COMPANY_INFO } from '../data/travelData';
import { WhatsAppIcon } from './WhatsAppIcon';
const DestinationMapModal = React.lazy(() => import('./DestinationMapModal').then((module) => ({ default: module.DestinationMapModal })));
import { Plane, Church, Mountain, Waves, Route as RouteIcon, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

interface PopularRoutesProps {
  onSelectRoute: (from: string, to: string) => void;
}

type Filter = 'all' | RouteCategory;

const FILTERS: { id: Filter; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'all', label: 'All Routes', icon: RouteIcon },
  { id: 'intercity', label: 'Intercity', icon: Car },
  { id: 'airport', label: 'Airport', icon: Plane },
  { id: 'pilgrimage', label: 'Pilgrimage', icon: Church },
  { id: 'hill-station', label: 'Hill Station', icon: Mountain },
  { id: 'coastal', label: 'Beach & Konkan', icon: Waves },
];

const CATEGORY_LABEL: Record<RouteCategory, string> = {
  intercity: 'Intercity',
  airport: 'Airport',
  pilgrimage: 'Pilgrimage',
  'hill-station': 'Hill Station',
  coastal: 'Coastal',
};

export const PopularRoutes: React.FC<PopularRoutesProps> = ({ onSelectRoute }) => {
  const [filterType, setFilterType] = useState<Filter>('all');
  const [activeMapRoute, setActiveMapRoute] = useState<{ from: string; to: string } | null>(null);
  const [directoryOpen, setDirectoryOpen] = useState(false);
  const [activeHub, setActiveHub] = useState(ROUTE_HUBS[0].hub);

  const filteredRoutes = POPULAR_ROUTES.filter((r) => {
    if (filterType === 'all') return true;
    return r.category === filterType;
  });

  const totalDirectoryRoutes = ROUTE_HUBS.reduce((n, h) => n + h.destinations.length, 0);
  const hubEntry = ROUTE_HUBS.find((h) => h.hub === activeHub) ?? ROUTE_HUBS[0];

  const handleWhatsAppRoute = (route: PopularRoute) => {
    const text = encodeURIComponent(
      `Hello Shivraj Cab, I want to book a cab for the route: *${route.from} to ${route.to}* (Starting Fare: \u20B9${route.startingPrice}, toll and parking extra). Please confirm available cabs & timing.`
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="routes" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Top Inter-City Routes & Fixed Fares
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Popular Cab Routes From Nashik
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Every route starts at your doorstep in Nashik. Fixed, upfront fares with no surge pricing for one-way drops, airport runs, darshan circuits and weekend getaways.
          </p>

          {/* Route Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {FILTERS.map((f) => {
              const Icon = f.icon;
              const active = filterType === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilterType(f.id)}
                  className={`min-h-11 px-3.5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                    active ? 'bg-amber-500 text-slate-950 shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${active ? 'text-slate-900' : 'text-amber-600'}`} />
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Routes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoutes.map((route) => (
            <div
              key={route.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-amber-300 shadow-sm hover:shadow-xl transition-all duration-300 p-5 flex flex-col justify-between group"
            >
              <div>
                {/* Tag & Type */}
                <div className="flex items-center justify-between mb-4">
                  {route.tag ? (
                    <span className="bg-amber-100 text-amber-900 font-extrabold text-[11px] px-2.5 py-1 rounded-md">
                      {route.tag}
                    </span>
                  ) : (
                    <span className="bg-slate-100 text-slate-700 font-bold text-[11px] px-2 py-0.5 rounded">
                      Standard Highway
                    </span>
                  )}
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    {CATEGORY_LABEL[route.category]} • {route.routeType === 'one-way' ? 'One-Way' : 'Round Trip'}
                  </span>
                </div>

                {/* Cities Connection visual */}
                <div className="flex items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100 mb-4">
                  <div className="flex-1">
                    <span className="text-[11px] text-slate-400 font-semibold block">Pickup</span>
                    <span className="font-extrabold text-slate-900 text-base">{route.from}</span>
                  </div>

                  <div className="flex flex-col items-center px-2">
                    <span className="text-[10px] text-slate-500 font-bold">{route.distanceKm} KM</span>
                    <div className="w-12 h-0.5 bg-amber-400 relative my-1">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-amber-600 rounded-full" />
                    </div>
                    <span className="text-[10px] text-slate-500">{route.duration}</span>
                  </div>

                  <div className="flex-1 text-right">
                    <span className="text-[11px] text-slate-400 font-semibold block">Drop</span>
                    <span className="font-extrabold text-slate-900 text-base">{route.to}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                  {route.description}
                </p>

                <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mb-4">
                  <Car className="w-3.5 h-3.5 text-amber-600" />
                  <span>Popular: <strong className="text-slate-800">{route.featuredCar}</strong></span>
                </div>
              </div>

              {/* Price & Book Buttons */}
              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-baseline justify-between mb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      Starting From
                    </span>
                    <span className="text-2xl font-black text-slate-900">
                      {'\u20B9'}{route.startingPrice.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded border text-amber-800 bg-amber-50 border-amber-200">
                    Toll & parking extra
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mb-3">Starting fare shown; toll and parking charges are extra at actuals.</p>

                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setActiveMapRoute({ from: route.from, to: route.to })}
                    className="min-h-11 px-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors flex items-center justify-center gap-1 border border-blue-200 cursor-pointer"
                    title="View route & distance on Google Maps"
                  >
                    <MapIcon className="w-3.5 h-3.5 text-blue-600" />
                    <span>Map</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleWhatsAppRoute(route)}
                    className="py-2.5 px-2 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectRoute(route.from, route.to)}
                    className="py-2.5 px-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black shadow-md shadow-amber-500/20 hover:shadow-lg transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Book</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full Route Directory (collapsible) */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden">
          <button
            type="button"
            onClick={() => setDirectoryOpen((o) => !o)}
            className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left cursor-pointer hover:bg-slate-100 transition-colors"
            aria-expanded={directoryOpen}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-slate-900">
                  Browse all {totalDirectoryRoutes}+ destinations we serve from Nashik
                </div>
                <div className="text-xs text-slate-500">
                  Cities, temples, hill stations and airports. Tap any one to pre-fill your booking with Nashik as the pickup.
                </div>
              </div>
            </div>
            {directoryOpen ? <ChevronUp className="w-5 h-5 text-slate-500 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />}
          </button>

          {directoryOpen && (
            <div className="px-5 pb-5 border-t border-slate-200 animate-in fade-in duration-200">
              <div className={`flex flex-wrap items-center gap-2 py-4 ${ROUTE_HUBS.length < 2 ? 'hidden' : ''}`}>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mr-1">From</span>
                {ROUTE_HUBS.map((h) => (
                  <button
                    key={h.hub}
                    type="button"
                    onClick={() => setActiveHub(h.hub)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      activeHub === h.hub ? 'bg-slate-900 text-amber-400 shadow' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {h.hub} ({h.destinations.length})
                  </button>
                ))}
              </div>
              <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 ${ROUTE_HUBS.length < 2 ? 'pt-4' : ''}`}>
                {hubEntry.destinations.map((dest) => (
                  <button
                    key={dest}
                    type="button"
                    onClick={() => onSelectRoute(hubEntry.hub, dest)}
                    className="group flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-white border border-slate-200 hover:border-amber-400 hover:bg-amber-50 text-left text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
                  >
                    <span className="truncate">
                      {hubEntry.hub} <span className="text-slate-400">to</span> {dest}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-amber-600 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Airport Banner in Popular Routes */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-blue-800/40">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold">
              <Clock className="w-3.5 h-3.5" />
              24 Hours Airport Taxi Guarantee
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Nashik to Mumbai T1/T2 & Pune Airport, Any Hour
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Early flight? We leave Nashik with a Kasara Ghat buffer built in. Landing late? Our driver tracks your flight and waits at the gate with a name board for the ride home. Zero midnight surge charges.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <a
              href={`tel:${COMPANY_INFO.rawPhone}`}
              className="py-3 px-5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Airport Desk</span>
            </a>
            <button
              onClick={() => onSelectRoute('Nashik', 'Mumbai Airport (T1/T2)')}
              className="py-3 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Car className="w-4 h-4" />
              <span>Book Airport Taxi</span>
            </button>
          </div>
        </div>
      </div>

      {/* Route Map Preview Modal */}
      {activeMapRoute && (
        <React.Suspense fallback={null}>
        <DestinationMapModal
          isOpen={true}
          onClose={() => setActiveMapRoute(null)}
          initialPickup={activeMapRoute.from}
          initialDrop={activeMapRoute.to}
          onApplyLocations={(p, d) => {
            onSelectRoute(p, d);
            setActiveMapRoute(null);
          }}
        />
        </React.Suspense>
      )}
    </section>
  );
};
