import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Car, 
  MapPin, 
  Calendar, 
  MessageSquare, 
  CheckCircle2, 
  Info,
  PhoneCall
} from 'lucide-react';
import { VEHICLES, COMPANY_INFO } from '../data/travelData';
import { WhatsAppIcon } from './WhatsAppIcon';

export const FareCalculator: React.FC = () => {
  const [selectedVehicleId, setSelectedVehicleId] = useState('dzire');
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('one-way');
  const [distanceKm, setDistanceKm] = useState(200);
  const [days, setDays] = useState(1);
  const [includeTolls, setIncludeTolls] = useState(true);

  const vehicle = VEHICLES.find((v) => v.id === selectedVehicleId) || VEHICLES[0];

  const calculation = useMemo(() => {
    let billableKm = distanceKm;
    let totalDriverAllowance = 0;

    if (tripType === 'round-trip') {
      const minRun = vehicle.minKmPerDay * days;
      billableKm = Math.max(distanceKm * 2, minRun);
      totalDriverAllowance = vehicle.driverAllowancePerDay * days;
    } else {
      billableKm = distanceKm;
      // standard driver single trip allowance
      totalDriverAllowance = vehicle.driverAllowancePerDay;
    }

    const kmFare = billableKm * vehicle.ratePerKm;
    const estimatedToll = includeTolls ? Math.round(distanceKm * 1.5) : 0;
    const totalFare = Math.max(kmFare + totalDriverAllowance + estimatedToll, vehicle.oneWayStartingPrice);

    return {
      billableKm,
      kmFare,
      driverAllowance: totalDriverAllowance,
      estimatedToll,
      totalFare,
    };
  }, [distanceKm, days, tripType, vehicle, includeTolls]);

  const handleWhatsAppQuote = () => {
    const text = encodeURIComponent(
      `Hello Swaraj Cab, I calculated an estimate on your website calculator:\n- Vehicle: *${vehicle.name}*\n- Trip: ${tripType.toUpperCase()} (${distanceKm} KM)\n- Duration: ${days} Day(s)\n- Estimated Fare: *₹${calculation.totalFare.toLocaleString()}*\n\nPlease confirm booking and driver details.`
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="calculator" className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5 text-amber-400" />
            Transparent Rate Calculator
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Calculate Your Exact Journey Fare
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            No unexpected billing. Choose your car, select trip kilometers, and see a transparent itemized cost estimate.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-slate-800/90 backdrop-blur-md rounded-2xl border border-slate-700 p-6 sm:p-8 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Input Controls */}
            <div className="lg:col-span-7 space-y-5">
              {/* Trip Type Selector */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-2">
                  Trip Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setTripType('one-way');
                      setDays(1);
                    }}
                    className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      tripType === 'one-way'
                        ? 'bg-amber-500 text-slate-950 font-black shadow'
                        : 'bg-slate-700/70 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    One Way Drop
                  </button>
                  <button
                    type="button"
                    onClick={() => setTripType('round-trip')}
                    className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      tripType === 'round-trip'
                        ? 'bg-amber-500 text-slate-950 font-black shadow'
                        : 'bg-slate-700/70 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    Round Trip Outstation
                  </button>
                </div>
              </div>

              {/* Select Vehicle */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-2">
                  Select Vehicle Category
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {VEHICLES.slice(0, 4).map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVehicleId(v.id)}
                      className={`p-3 rounded-xl text-left border text-xs transition-all cursor-pointer ${
                        selectedVehicleId === v.id
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                          : 'bg-slate-700/40 border-slate-700 text-slate-300 hover:bg-slate-700/80'
                      }`}
                    >
                      <div className="font-bold text-white">{v.name.split('/')[0]}</div>
                      <div className="text-[11px] text-amber-400 font-semibold mt-0.5">
                        ₹{v.ratePerKm}/km • {v.seats} Seats
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Distance Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase text-slate-400">
                    Estimated One-Way Distance: <span className="text-amber-400 text-sm font-extrabold">{distanceKm} KM</span>
                  </label>
                  <span className="text-[11px] text-slate-400">
                    (e.g., Nashik-Mumbai is 165 KM)
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1200"
                  step="10"
                  value={distanceKm}
                  onChange={(e) => setDistanceKm(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>50 KM</span>
                  <span>300 KM</span>
                  <span>600 KM</span>
                  <span>1200 KM</span>
                </div>
              </div>

              {/* Days Selector for Round Trips */}
              {tripType === 'round-trip' && (
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-2">
                    Trip Duration (Days)
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5, 7].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDays(d)}
                        className={`w-10 h-10 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          days === d
                            ? 'bg-amber-500 text-slate-950 font-black'
                            : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {d}D
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Include Tolls Checkbox */}
              <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={includeTolls}
                  onChange={(e) => setIncludeTolls(e.target.checked)}
                  className="w-4 h-4 accent-amber-500 rounded"
                />
                <span>Include estimated Expressway Toll & Fastag charges in quote</span>
              </label>
            </div>

            {/* Live Calculation Output Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 p-6 rounded-2xl border border-slate-700/90 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Car className="w-5 h-5 text-amber-400" />
                    <span className="font-bold text-sm text-white">{vehicle.name.split(' ')[0]}</span>
                  </div>
                  <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-semibold">
                    Live Estimate
                  </span>
                </div>

                {/* Breakdown List */}
                <div className="space-y-2.5 py-4 text-xs text-slate-300 border-b border-slate-800">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Billed Distance</span>
                    <span className="font-semibold text-white">{calculation.billableKm} KM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Kilometer Running Fare</span>
                    <span className="font-semibold text-white">₹{calculation.kmFare.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Driver Allowance (Batta)</span>
                    <span className="font-semibold text-white">₹{calculation.driverAllowance.toLocaleString()}</span>
                  </div>
                  {includeTolls && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">Estimated Tolls & Fastag</span>
                      <span className="font-semibold text-amber-400">₹{calculation.estimatedToll.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="pt-4 pb-2">
                  <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider block">
                    Total Estimated Fare
                  </span>
                  <div className="text-3xl font-black text-amber-400 mt-1">
                    ₹{calculation.totalFare.toLocaleString()}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    *Tolls & parking subject to actual highway receipts. Zero hidden surge fees.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-5 space-y-2">
                <button
                  type="button"
                  onClick={handleWhatsAppQuote}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Get This Quote on WhatsApp</span>
                </button>

                <a
                  href={`tel:${COMPANY_INFO.rawPhone}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call Dispatch: {COMPANY_INFO.primaryPhone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
