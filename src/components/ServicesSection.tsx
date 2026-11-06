import React from 'react';
import { 
  Navigation, 
  ArrowRightCircle, 
  Plane, 
  Clock, 
  Compass, 
  Users, 
  Crown, 
  Briefcase, 
  Check, 
  Sparkles,
  PhoneCall,
  Car
} from 'lucide-react';
import { ServiceItem } from '../types/travel';
import { SERVICES, COMPANY_INFO } from '../data/travelData';

interface ServicesSectionProps {
  onBookService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onBookService }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Navigation':
        return <Navigation className="w-6 h-6 text-amber-500" />;
      case 'ArrowRightCircle':
        return <ArrowRightCircle className="w-6 h-6 text-emerald-500" />;
      case 'Plane':
        return <Plane className="w-6 h-6 text-blue-500" />;
      case 'Clock':
        return <Clock className="w-6 h-6 text-orange-500" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-amber-600" />;
      case 'Users':
        return <Users className="w-6 h-6 text-indigo-500" />;
      case 'Crown':
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 'Briefcase':
        return <Briefcase className="w-6 h-6 text-slate-700" />;
      default:
        return <Car className="w-6 h-6 text-amber-500" />;
    }
  };

  return (
    <section id="services" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Comprehensive Transportation Solutions
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Complete Range of Travel Services
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            From daily city commutes to wedding luxury convoys and pan-India corporate mobility. Backed by 24/7 dispatch support and GPS-tracked modern fleet.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="bg-slate-50 hover:bg-white rounded-2xl border border-slate-200/90 hover:border-amber-400/80 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Icon & Starting Tag */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getIcon(srv.icon)}
                  </div>
                  <span className="text-[11px] font-extrabold text-amber-800 bg-amber-100/90 px-2.5 py-1 rounded-md text-right leading-tight">
                    {srv.startingPriceTag}
                    <span className="block text-[9px] font-semibold">Toll & parking extra</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-amber-600 transition-colors">
                  {srv.title}
                </h3>
                <p className="text-xs font-semibold text-slate-500 mb-3">
                  {srv.subtitle}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {srv.description}
                </p>

                {/* Benefits List */}
                <div className="space-y-2 mb-6">
                  {srv.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Action */}
              <div className="pt-3 border-t border-slate-200/70">
                <button
                  type="button"
                  onClick={() => onBookService(srv.title)}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-900 group-hover:bg-amber-500 text-white group-hover:text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow cursor-pointer"
                >
                  <Car className="w-3.5 h-3.5" />
                  <span>Inquire / Book Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
