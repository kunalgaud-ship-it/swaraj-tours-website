import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface PageHeroProps {
  title: string;
  subtitle: string;
  onHome: () => void;
}

/** Compact banner at the top of every inner page (Services, Packages, About, Contact). */
export const PageHero: React.FC<PageHeroProps> = ({ title, subtitle, onHome }) => (
  <section className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white py-12 sm:py-16 px-4">
    <div className="max-w-7xl mx-auto">
      <nav className="flex items-center gap-1.5 text-xs text-slate-300 mb-4" aria-label="Breadcrumb">
        <a href="/" onClick={(event) => { event.preventDefault(); onHome(); }} className="flex items-center gap-1 hover:text-amber-400 transition-colors">
          <Home className="w-3.5 h-3.5" /> Home
        </a>
        <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
        <span className="text-amber-400 font-semibold">{title}</span>
      </nav>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">{title}</h1>
      <p className="mt-3 max-w-2xl text-slate-300 text-sm sm:text-base">{subtitle}</p>
    </div>
  </section>
);
