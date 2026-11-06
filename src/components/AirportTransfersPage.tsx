import React from 'react';
import { ArrowRight, Clock3, Luggage, MapPin, Plane, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';

interface AirportTransfersPageProps {
  onBookTrip: (from: string, to: string) => void;
}

const benefits = [
  { icon: Clock3, title: 'Plan around your flight', text: 'Share your arrival or departure time when you enquire so the pickup can be coordinated with your journey.' },
  { icon: Luggage, title: 'Room for your bags', text: 'Choose a suitable cab for solo travel, family luggage or a group travelling together.' },
  { icon: ShieldCheck, title: 'A ride arranged in advance', text: 'Reserve your Nashik airport cab ahead of time and keep your trip details handy.' },
];

export const AirportTransfersPage: React.FC<AirportTransfersPageProps> = ({ onBookTrip }) => (
  <main id="airport-transfers" className="bg-slate-50">
    <section className="relative overflow-hidden bg-slate-950 px-4 py-16 text-white sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/70 via-slate-950 to-slate-950" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300">
            <Plane className="h-4 w-4" /> Nashik Airport Cab Service
          </div>
          <h1 className="max-w-3xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">Nashik Airport Pickup &amp; Drop</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">Need a cab from Nashik Airport to the city, or a ride from Nashik to the airport? Arrange a private cab for your arrival or departure with Swaraj Cab.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => onBookTrip('Nashik Airport', 'Nashik')} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3 font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-300">
              Book Airport Pickup <ArrowRight className="h-4 w-4" />
            </button>
            <button onClick={() => onBookTrip('Nashik', 'Nashik Airport')} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3 font-bold text-white transition hover:bg-white/10">
              Book Airport Drop <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur sm:p-8">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400 text-slate-950"><MapPin className="h-7 w-7" /></div>
          <h2 className="text-2xl font-bold">Travel to or from Nashik Airport</h2>
          <p className="mt-3 leading-relaxed text-slate-300">Tell us your pickup point, destination, travel date and preferred cab. We’ll help confirm availability and the trip estimate.</p>
          <a href={`tel:${COMPANY_INFO.rawPhone}`} className="mt-6 inline-flex items-center gap-2 font-bold text-amber-300 hover:text-amber-200">Call {COMPANY_INFO.primaryPhone} <ArrowRight className="h-4 w-4" /></a>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-600">Airport transfers made simple</p>
        <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">A cab for your Nashik airport journey</h2>
        <p className="mt-4 leading-relaxed text-slate-600">Book a one-way airport transfer for your arrival or departure. For a return journey or a longer trip, share your plan and ask for a suitable option.</p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {benefits.map(({ icon: Icon, title, text }) => (
          <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600"><Icon className="h-6 w-6" /></div>
            <h3 className="mt-5 text-lg font-bold text-slate-900">{title}</h3>
            <p className="mt-2 leading-relaxed text-slate-600">{text}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="bg-white px-4 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-5 rounded-3xl bg-blue-950 p-7 text-center text-white sm:flex-row sm:p-10 sm:text-left">
        <div><h2 className="text-2xl font-black">Planning an airport ride?</h2><p className="mt-2 text-slate-300">Share your trip details and request a cab.</p></div>
        <button onClick={() => onBookTrip('Nashik Airport', 'Nashik')} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-amber-300">Request a cab <ArrowRight className="h-4 w-4" /></button>
      </div>
    </section>
  </main>
);
