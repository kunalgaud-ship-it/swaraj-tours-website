import React, { useState } from 'react';
import { Users, Briefcase, IndianRupee, Gauge, Check, Minus, Table2, Car } from 'lucide-react';
import { VEHICLES } from '../data/travelData';

interface FleetComparisonProps {
  onSelectCar: (carId: string) => void;
}

type Scenario = 'one-way' | 'two-day' | 'local';

const SCENARIOS: { id: Scenario; label: string; hint: string }[] = [
  { id: 'one-way', label: 'Nashik to Mumbai One-Way', hint: 'Starting one-way fare from Nashik, tolls extra' },
  { id: 'two-day', label: '2-Day Outstation (600 km)', hint: 'Per-km rate x 600 km + driver allowance x 2 days' },
  { id: 'local', label: 'Local 8h / 80 km', hint: 'Approximate city package based on per-km rate' },
];

const COMPARE_FEATURES = [
  'AC with Climate Control',
  'Push-Back Seats',
  'Mobile Charging Points',
  'Roof Carrier Option',
  'Music System',
  'Uniformed Chauffeur',
];

const featureMatrix: Record<string, Record<string, boolean>> = {
  dzire: { 'AC with Climate Control': true, 'Push-Back Seats': false, 'Mobile Charging Points': true, 'Roof Carrier Option': false, 'Music System': true, 'Uniformed Chauffeur': false },
  aura: { 'AC with Climate Control': true, 'Push-Back Seats': false, 'Mobile Charging Points': true, 'Roof Carrier Option': false, 'Music System': true, 'Uniformed Chauffeur': false },
  etios: { 'AC with Climate Control': true, 'Push-Back Seats': false, 'Mobile Charging Points': true, 'Roof Carrier Option': false, 'Music System': true, 'Uniformed Chauffeur': false },
  ertiga: { 'AC with Climate Control': true, 'Push-Back Seats': false, 'Mobile Charging Points': true, 'Roof Carrier Option': true, 'Music System': true, 'Uniformed Chauffeur': false },
  rumion: { 'AC with Climate Control': true, 'Push-Back Seats': false, 'Mobile Charging Points': true, 'Roof Carrier Option': true, 'Music System': true, 'Uniformed Chauffeur': false },
  carens: { 'AC with Climate Control': true, 'Push-Back Seats': false, 'Mobile Charging Points': true, 'Roof Carrier Option': true, 'Music System': true, 'Uniformed Chauffeur': false },
  crysta: { 'AC with Climate Control': true, 'Push-Back Seats': true, 'Mobile Charging Points': true, 'Roof Carrier Option': true, 'Music System': true, 'Uniformed Chauffeur': true },
  tempo17: { 'AC with Climate Control': true, 'Push-Back Seats': true, 'Mobile Charging Points': true, 'Roof Carrier Option': true, 'Music System': true, 'Uniformed Chauffeur': true },
  tempo26: { 'AC with Climate Control': true, 'Push-Back Seats': true, 'Mobile Charging Points': true, 'Roof Carrier Option': true, 'Music System': true, 'Uniformed Chauffeur': true },
  urbania: { 'AC with Climate Control': true, 'Push-Back Seats': true, 'Mobile Charging Points': true, 'Roof Carrier Option': true, 'Music System': true, 'Uniformed Chauffeur': true },
};

const formatINR = (n: number) => `₹${Math.round(n).toLocaleString('en-IN')}`;

/** One column per vehicle class keeps the table readable; the full fleet is listed in the Fleet section above. */
const COMPARED_VEHICLES = VEHICLES.filter((v) => v.isPopular);

export const FleetComparison: React.FC<FleetComparisonProps> = ({ onSelectCar }) => {
  const [scenario, setScenario] = useState<Scenario>('two-day');

  const estimate = (v: (typeof VEHICLES)[number]) => {
    switch (scenario) {
      case 'one-way':
        return v.oneWayStartingPrice;
      case 'two-day':
        return v.ratePerKm * Math.max(600, v.minKmPerDay * 2) + v.driverAllowancePerDay * 2;
      case 'local':
        return v.localStartingPrice ?? Math.max(v.ratePerKm * 80 * 1.6, 1799);
    }
  };

  const cheapest = Math.min(...COMPARED_VEHICLES.map(estimate));
  const active = SCENARIOS.find((s) => s.id === scenario)!;

  return (
    <section id="compare" className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Table2 className="w-3.5 h-3.5" />
            Side-by-Side Comparison
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Which Cab Is Right for Your Trip?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Compare seating, luggage, rates and comfort features across our fleet. Switch the trip scenario to see an indicative fare for each vehicle.
          </p>
        </div>

        {/* Scenario Switch */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setScenario(s.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                scenario === s.id
                  ? 'bg-slate-900 text-amber-400 shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <p className="text-center text-[11px] text-slate-500 mb-8">{active.hint}</p>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="text-left px-4 py-4 font-bold text-xs uppercase tracking-wider w-48">Vehicle</th>
                {COMPARED_VEHICLES.map((v) => (
                  <th key={v.id} className="px-4 py-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <img width={800} height={600}
                        src={v.image}
                        alt={v.name}
                        className="w-24 h-14 object-cover rounded-lg border border-slate-700"
                        loading="lazy"
                      />
                      <span className="font-bold text-xs leading-tight">{v.name.split('/')[0].trim()}</span>
                      {v.isPopular && (
                        <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider">Popular</span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="bg-amber-50/60">
                <td className="px-4 py-3 font-bold text-slate-800 flex items-center gap-2">
                  <IndianRupee className="w-4 h-4 text-amber-600" /> Indicative Fare
                </td>
                {COMPARED_VEHICLES.map((v) => {
                  const price = estimate(v);
                  return (
                    <td key={v.id} className="px-4 py-3 text-center">
                      <div className="text-lg font-black text-slate-900">{formatINR(price)}</div>
                      {price === cheapest && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          Best Value
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-slate-700 flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-slate-400" /> Rate per KM
                </td>
                {COMPARED_VEHICLES.map((v) => (
                  <td key={v.id} className="px-4 py-3 text-center font-bold text-slate-800">₹{v.ratePerKm}</td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-slate-700 flex items-center gap-2">
                  <Users className="w-4 h-4 text-slate-400" /> Passenger Seats
                </td>
                {COMPARED_VEHICLES.map((v) => (
                  <td key={v.id} className="px-4 py-3 text-center text-slate-800">{v.seats} + Driver</td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-slate-700 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-slate-400" /> Luggage Capacity
                </td>
                {COMPARED_VEHICLES.map((v) => (
                  <td key={v.id} className="px-4 py-3 text-center text-slate-800">{v.luggage} Large Bags</td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-slate-700">Driver Allowance / Day</td>
                {COMPARED_VEHICLES.map((v) => (
                  <td key={v.id} className="px-4 py-3 text-center text-slate-800">₹{v.driverAllowancePerDay}</td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-slate-700">Min. KM / Day (Outstation)</td>
                {COMPARED_VEHICLES.map((v) => (
                  <td key={v.id} className="px-4 py-3 text-center text-slate-800">{v.minKmPerDay} km</td>
                ))}
              </tr>

              {COMPARE_FEATURES.map((f) => (
                <tr key={f}>
                  <td className="px-4 py-2.5 text-xs font-semibold text-slate-600">{f}</td>
                  {COMPARED_VEHICLES.map((v) => {
                    const has = featureMatrix[v.id]?.[f] ?? false;
                    return (
                      <td key={v.id} className="px-4 py-2.5 text-center">
                        {has ? (
                          <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                        ) : (
                          <Minus className="w-4 h-4 text-slate-300 mx-auto" />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}

              <tr className="bg-slate-50">
                <td className="px-4 py-3 text-xs font-semibold text-slate-600">Best For</td>
                {COMPARED_VEHICLES.map((v) => (
                  <td key={v.id} className="px-4 py-3 text-center text-[11px] text-slate-600 leading-snug">{v.popularFor}</td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-4" />
                {COMPARED_VEHICLES.map((v) => (
                  <td key={v.id} className="px-4 py-4 text-center">
                    <button
                      type="button"
                      onClick={() => onSelectCar(v.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 hover:bg-amber-500 text-white hover:text-slate-950 text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Car className="w-3.5 h-3.5" />
                      Book
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-center text-[11px] text-slate-500">
          Fares are indicative estimates. Toll & parking extra; state permits and GST are billed at actuals.
        </p>
      </div>
    </section>
  );
};
