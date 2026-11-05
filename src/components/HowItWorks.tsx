import React from 'react';
import { Search, CalendarCheck, CarFront, Smile, ArrowRight, Route } from 'lucide-react';

interface HowItWorksProps {
  onBookNow?: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onBookNow }) => {
  const steps = [
    {
      step: '01',
      title: 'Enter Your Trip Details',
      description: 'Choose one-way, round trip, local or airport. Add pickup and drop cities, date, time and passenger count.',
      icon: Search,
      color: 'bg-amber-100 text-amber-700 border-amber-200',
    },
    {
      step: '02',
      title: 'Pick a Cab & See the Fare',
      description: 'Compare Dzire, Ertiga, Innova Crysta and Tempo Traveller with transparent per-km pricing and instant estimate.',
      icon: CarFront,
      color: 'bg-blue-100 text-blue-700 border-blue-200',
    },
    {
      step: '03',
      title: 'Confirm on Call or WhatsApp',
      description: 'Our dispatch team confirms within minutes and shares the driver name, phone number and vehicle number.',
      icon: CalendarCheck,
      color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    },
    {
      step: '04',
      title: 'Relax & Enjoy the Ride',
      description: 'Your chauffeur arrives 15 minutes early at your doorstep. Pay after the trip by UPI, card or cash.',
      icon: Smile,
      color: 'bg-rose-100 text-rose-700 border-rose-200',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Route className="w-3.5 h-3.5 text-amber-500" />
            Simple 4-Step Booking
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How Booking a Cab With Us Works
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            No app downloads, no advance payment pressure, no surge pricing. Just a quick confirmation and a clean cab at your door.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-0.5 border-t-2 border-dashed border-amber-300" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div key={idx} className="relative text-center bg-white">
                  <div className="relative mx-auto w-20 h-20 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shadow-sm mb-5">
                    <div className={`w-14 h-14 rounded-xl border flex items-center justify-center ${s.color}`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="absolute -top-2.5 -right-2.5 w-8 h-8 rounded-full bg-slate-900 text-amber-400 text-xs font-black flex items-center justify-center shadow">
                      {s.step}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed px-2">{s.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {onBookNow && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={onBookNow}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              Start Booking Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
