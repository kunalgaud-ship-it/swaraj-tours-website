import React, { useState } from 'react';
import { 
  Users, 
  Briefcase, 
  Wind, 
  Check, 
  Fuel, 
  Car, 
  ShieldCheck, 
  Info, 
  X, 
  MessageSquare,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { Vehicle } from '../types/travel';
import { VEHICLES, COMPANY_INFO } from '../data/travelData';
import { WhatsAppIcon } from './WhatsAppIcon';

interface FleetSectionProps {
  onSelectCar: (carId: string) => void;
}

export const FleetSection: React.FC<FleetSectionProps> = ({ onSelectCar }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedVehicleForModal, setSelectedVehicleForModal] = useState<Vehicle | null>(null);

  const filteredVehicles = VEHICLES.filter((vehicle) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'premium') return Boolean(vehicle.isPremium);
    return vehicle.category === activeCategory;
  });

  const handleWhatsAppForVehicle = (vehicle: Vehicle) => {
    const text = encodeURIComponent(
      `Hello Swaraj Cab, I am interested in hiring *${vehicle.name}* (Rate: ₹${vehicle.ratePerKm}/km, toll and parking extra). Please share availability and current tariff for my route.`
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="fleet" className="py-16 sm:py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Car className="w-3.5 h-3.5" />
            Our Modern Fleet & Transparent Tariffs
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Choose Your Perfect Ride for Any Journey
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            From budget-friendly sedans for couples to luxury Innova Crystas and 26-seater Tempo Travellers for large family yatras. All vehicles are 100% AC, commercially licensed & sanitised.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Vehicles' },
            { id: 'sedan', label: 'Sedans (Dzire / Aura / Etios)' },
            { id: 'suv', label: 'SUVs & MUVs (Ertiga / Rumion / Carens)' },
            { id: 'premium', label: 'Premium (Innova Crysta)' },
            { id: 'tempo', label: 'Group Travel (14 to 26 Seater)' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-slate-900 text-amber-400 shadow-md scale-105'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
            >
              {/* Vehicle Image Container */}
              <div className="relative h-52 sm:h-56 bg-slate-900 overflow-hidden">
                <img width={800} height={600}
                  src={vehicle.image}
                  alt={vehicle.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

                {/* Popular Badge */}
                {vehicle.isPopular && (
                  <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow flex items-center gap-1">
                    <Sparkles className="w-3 h-3 fill-slate-950" />
                    Top Choice
                  </div>
                )}

                {/* Rate per KM Pill */}
                <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md text-amber-400 border border-amber-500/30 text-xs font-extrabold px-3 py-1 rounded-full shadow">
                  ₹{vehicle.ratePerKm} / KM
                </div>

                {/* Bottom title in overlay */}
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="text-lg font-bold text-white leading-snug drop-shadow-sm">
                    {vehicle.name}
                  </h3>
                  <p className="text-xs text-amber-300 font-medium">
                    {vehicle.tagline}
                  </p>
                </div>
              </div>

              {/* Specs Badge Strip */}
              {vehicle.imageCreditLabel && vehicle.imageCreditUrl && (
                <div className="px-3 py-1 text-right text-[10px] text-slate-500 bg-white">
                  <a href={vehicle.imageCreditUrl} target="_blank" rel="noreferrer" className="hover:underline">
                    {vehicle.imageCreditLabel}
                  </a>
                </div>
              )}
              <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100 bg-slate-50/70 py-2.5 px-3 text-center text-xs text-slate-700 font-medium">
                <div className="flex items-center justify-center gap-1.5" title={vehicle.seatVariants}>
                  <Users className="w-3.5 h-3.5 text-amber-600" />
                  <span>{vehicle.seats} {vehicle.seatVariants ? 'Seats*' : 'Seats'}</span>
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-amber-600" />
                  <span>{vehicle.luggage} Bags</span>
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  <Wind className="w-3.5 h-3.5 text-amber-600" />
                  <span>Full AC</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {vehicle.description}
                  </p>

                  {/* Highlights list */}
                  <div className="mt-3 space-y-1.5">
                    {vehicle.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Ideal For Note */}
                  <div className="mt-3.5 p-2 rounded-lg bg-amber-50/80 border border-amber-200/50 text-[11px] text-slate-700">
                    <span className="font-bold text-amber-900">Best for: </span>
                    {vehicle.popularFor}
                    {vehicle.seatVariants && (
                      <span className="block mt-1 text-amber-900/80">* {vehicle.seatVariants}</span>
                    )}
                  </div>
                </div>

                {/* Pricing & CTA */}
                <div className="pt-3 border-t border-slate-100">
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <span className="text-[11px] text-slate-500 font-semibold block">One-Way Drops From</span>
                      <span className="text-xl font-black text-slate-900">
                        ₹{vehicle.oneWayStartingPrice.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-amber-800 font-semibold block">Toll & parking extra</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-slate-500 font-semibold block">Driver Daily Batta</span>
                      <span className="text-xs font-bold text-slate-700">₹{vehicle.driverAllowancePerDay} / day</span>
                    </div>
                  </div>

                  {vehicle.localStartingPrice && (
                    <p className="text-[11px] text-slate-600 mb-3">
                      Local package (8h / 80km): <strong className="text-slate-900">₹{vehicle.localStartingPrice.toLocaleString('en-IN')}</strong>
                    </p>
                  )}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedVehicleForModal(vehicle)}
                      className="py-2.5 px-3 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5 text-slate-500" />
                      Tariff Chart
                    </button>

                    <button
                      type="button"
                      onClick={() => onSelectCar(vehicle.id)}
                      className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 text-xs font-black shadow-md shadow-amber-500/20 hover:shadow-lg transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      Book This Cab
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vehicle Tariff & Specs Modal */}
      {selectedVehicleForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setSelectedVehicleForModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800">
                <Car className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{selectedVehicleForModal.name}</h3>
                <p className="text-xs text-slate-500">{selectedVehicleForModal.tagline}</p>
              </div>
            </div>

            {/* Real Vehicle Image Preview */}
            <div className="h-44 sm:h-52 w-full rounded-xl overflow-hidden mb-4 border border-slate-200">
              <img width={800} height={600}
                src={selectedVehicleForModal.image}
                alt={selectedVehicleForModal.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Rate Breakdown Table */}
            <div className="rounded-xl border border-slate-200 overflow-hidden mb-5 text-sm">
              <div className="bg-slate-900 text-white px-4 py-2.5 font-bold text-xs uppercase tracking-wider flex justify-between">
                <span>Tariff Component</span>
                <span>Standard Rate</span>
              </div>
              <div className="divide-y divide-slate-100 bg-slate-50">
                <div className="px-4 py-2.5 flex justify-between">
                  <span className="text-slate-600">Rate per Kilometer (Outstation)</span>
                  <span className="font-extrabold text-slate-900">₹{selectedVehicleForModal.ratePerKm} / km</span>
                </div>
                <div className="px-4 py-2.5 flex justify-between">
                  <span className="text-slate-600">Minimum Average Run per Day</span>
                  <span className="font-semibold text-slate-800">{selectedVehicleForModal.minKmPerDay} km / day</span>
                </div>
                <div className="px-4 py-2.5 flex justify-between">
                  <span className="text-slate-600">Driver Day Allowance (Batta)</span>
                  <span className="font-semibold text-slate-800">₹{selectedVehicleForModal.driverAllowancePerDay} / day</span>
                </div>
                <div className="px-4 py-2.5 flex justify-between">
                  <span className="text-slate-600">Night Allowance (10:00 PM - 6:00 AM)</span>
                  <span className="font-semibold text-slate-800">₹250 / night</span>
                </div>
                {selectedVehicleForModal.localStartingPrice && (
                  <div className="px-4 py-2.5 flex justify-between">
                    <span className="text-slate-600">Local Package (8h / 80km)</span>
                    <span className="font-semibold text-slate-800">₹{selectedVehicleForModal.localStartingPrice.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="px-4 py-2.5 flex justify-between">
                  <span className="text-slate-600">Tolls, State Permit & Parking</span>
                  <span className="font-medium text-amber-800">At actuals via Fastag / receipts</span>
                </div>
              </div>
            </div>

            {/* Features checkmarks */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Included Amenities & Safety Features
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {selectedVehicleForModal.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => handleWhatsAppForVehicle(selectedVehicleForModal)}
                className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow transition-all cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4" />
                WhatsApp Rate Inquiry
              </button>
              <button
                onClick={() => {
                  onSelectCar(selectedVehicleForModal.id);
                  setSelectedVehicleForModal(null);
                }}
                className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow transition-all cursor-pointer"
              >
                <Car className="w-4 h-4" />
                Select in Booking Box
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
