import React from 'react';
import {
  Waves,
  Palmtree,
  Grape,
  Building2,
  Landmark,
  Church,
  Mountain,
  Sun,
  Castle,
  Flower2,
  MapPinned,
  CalendarDays,
  ArrowRight,
  MessageSquare,
  Navigation,
} from 'lucide-react';
import { DESTINATIONS, COMPANY_INFO } from '../data/travelData';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Destination } from '../types/travel';
import shirdiTempleImage from '../assets/images/shirdi-sai-temple.jpg';
import trimbakeshwarTempleImage from '../assets/images/trimbakeshwar-temple.jpg';
import mumbaiImage from '../assets/images/mumbai-skyline.jpg';
import puneImage from '../assets/images/shaniwar-wada.jpg';
import elloraImage from '../assets/images/ellora-caves.jpg';
import mahabaleshwarImage from '../assets/images/mahabaleshwar.jpg';
import saputaraImage from '../assets/images/saputara.jpg';
import konkanImage from '../assets/images/alibaug-beach.jpg';
import goaImage from '../assets/images/goa-beach.jpg';
import nashikImage from '../assets/images/nashik-ramkund.jpg';

interface DestinationsSectionProps {
  /** Pre-fills the booking box with the chosen destination as the drop city (pickup stays Nashik). */
  onSelectDestination: (destinationName: string) => void;
}

const ICONS: Record<Destination['icon'], React.ComponentType<{ className?: string }>> = {
  Waves,
  Palmtree,
  Grape,
  Building2,
  Landmark,
  Church,
  Mountain,
  Sun,
  Castle,
  Flower2,
};

const ACCENT: Record<Destination['accent'], { header: string; chip: string }> = {
  amber: { header: 'from-amber-500 to-orange-600', chip: 'bg-amber-50 text-amber-800 border-amber-200' },
  emerald: { header: 'from-emerald-500 to-teal-700', chip: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  blue: { header: 'from-sky-500 to-blue-700', chip: 'bg-sky-50 text-sky-800 border-sky-200' },
  rose: { header: 'from-rose-500 to-pink-700', chip: 'bg-rose-50 text-rose-800 border-rose-200' },
  purple: { header: 'from-violet-500 to-purple-800', chip: 'bg-violet-50 text-violet-800 border-violet-200' },
  teal: { header: 'from-cyan-500 to-teal-700', chip: 'bg-cyan-50 text-cyan-800 border-cyan-200' },
  orange: { header: 'from-orange-400 to-red-600', chip: 'bg-orange-50 text-orange-800 border-orange-200' },
  indigo: { header: 'from-indigo-500 to-slate-800', chip: 'bg-indigo-50 text-indigo-800 border-indigo-200' },
};

const DESTINATION_PHOTOS: Record<string, { src: string; alt: string; credit: string; source: string }> = {
  mumbai: { src: mumbaiImage, alt: 'Mumbai skyline', credit: 'Sebastianjude · CC BY-SA 3.0', source: 'https://commons.wikimedia.org/wiki/File:Mumbai_Skyline.jpg' },
  pune: { src: puneImage, alt: 'Shaniwar Wada in Pune', credit: 'Gaur Himanshu · CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Shaniwar_Wada_Pune.jpg' },
  sambhajinagar: { src: elloraImage, alt: 'Ellora Caves in Maharashtra', credit: 'Amitbalani · CC0', source: 'https://commons.wikimedia.org/wiki/File:Ellora_Caves,_India.jpg' },
  mahabaleshwar: { src: mahabaleshwarImage, alt: 'Mountain scenery in Mahabaleshwar', credit: 'Gayatri Priya · CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Mahabaleshwar_sight_seeing.jpg' },
  saputara: { src: saputaraImage, alt: 'Lake at Saputara hill station', credit: 'Mayur Thakare · Public domain', source: 'https://commons.wikimedia.org/wiki/File:Saputara.jpg' },
  konkan: { src: konkanImage, alt: 'Alibaug beach on the Maharashtra Konkan coast', credit: 'Rishi Darak · CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Alibaug_Beach.jpg' },
  goa: { src: goaImage, alt: 'Beach in Goa at evening', credit: 'Bobby9030 · CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Goa_Beach_in_the_evening.jpg' },
  'nashik-local': { src: nashikImage, alt: 'Ramkund in Panchavati, Nashik', credit: 'Omkarwalimbewikitakesnasik · CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Panchavati-Ramkund.jpg' },
  shirdi: {
    src: shirdiTempleImage,
    alt: 'Sri Sai Baba Samadhi Mandir complex in Shirdi',
    credit: 'Nitin3009 · CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Sri_Sai_Baba_Temple_,_Shirdi.jpg',
  },
  trimbakeshwar: {
    src: trimbakeshwarTempleImage,
    alt: 'Trimbakeshwar Jyotirlinga temple near Nashik',
    credit: 'Sagarbadoge · CC BY-SA 3.0',
    source: 'https://commons.wikimedia.org/wiki/File:Trimbakeshwar_Temple.jpg',
  },
};

/** Rough drive time from Nashik at highway speeds, for the card badge. */
const driveTime = (km: number) => {
  if (km === 0) return 'Local';
  const hrs = km / 50;
  if (hrs < 1) return `${Math.round(hrs * 60)} min`;
  const lo = Math.floor(hrs);
  const hi = Math.ceil(hrs + 0.5);
  return lo === hi ? `${lo} hrs` : `${lo}-${hi} hrs`;
};

export const DestinationsSection: React.FC<DestinationsSectionProps> = ({ onSelectDestination }) => {
  const handleWhatsApp = (d: Destination) => {
    const text = encodeURIComponent(
      d.distanceFromNashik === 0
        ? `Hello ${COMPANY_INFO.name}, I want a local Nashik cab package for ${d.name}. Please share hourly rates.`
        : `Hello ${COMPANY_INFO.name}, I want a cab from Nashik to ${d.name} (approx. ${d.distanceFromNashik} km). Please share vehicle options and fare.`
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="destinations" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <MapPinned className="w-3.5 h-3.5" />
            Where Can We Take You From Nashik?
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Destinations We Drive To Every Week
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Every trip begins at your doorstep in Nashik. Distances and drive times below are from the city; tap a card to drop it straight into the booking box.
          </p>
          <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-full px-3 py-1.5">
            <Navigation className="w-3.5 h-3.5 text-amber-500" /> Starting point: Nashik
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {DESTINATIONS.map((d) => {
            const Icon = ICONS[d.icon];
            const accent = ACCENT[d.accent];
            const photo = DESTINATION_PHOTOS[d.id];
            const km = d.distanceFromNashik;
            return (
              <article
                key={d.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col group"
              >
                {/* Real temple photos for pilgrimage destinations; gradient treatment for other cards. */}
                <div className={`relative ${photo ? 'bg-slate-900' : `bg-gradient-to-br ${accent.header}`} text-white p-4 h-32 flex flex-col justify-between overflow-hidden`}>
                  {photo && <img src={photo.src} alt={photo.alt} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" loading="lazy" />}
                  {photo && <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-slate-950/30" />}
                  {!photo && <div className="absolute -right-6 -bottom-8 w-32 h-32 rounded-full bg-white/10 group-hover:scale-125 transition-transform duration-500" />}
                  <div className="flex items-start justify-between relative">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/20 text-white backdrop-blur-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-right">
                      <span className="block text-[11px] font-black bg-slate-950/40 backdrop-blur-sm px-2 py-1 rounded-md">
                        {km === 0 ? 'In Nashik' : `${km} km`}
                      </span>
                      <span className="block text-[10px] text-white/80 mt-1 font-semibold">{driveTime(km)}</span>
                    </div>
                  </div>
                  <div className="relative">
                    <h3 className="text-lg font-black leading-tight drop-shadow-sm">{d.name}</h3>
                    <p className="text-[11px] text-white/85 font-medium truncate">{d.region}</p>
                  </div>
                  {photo && <a href={photo.source} target="_blank" rel="noreferrer" className="absolute bottom-1 right-2 z-10 text-[9px] text-white/80 hover:text-white" aria-label={`Photo credit: ${photo.credit}`}>Photo: {photo.credit}</a>}
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <p className="text-xs font-bold text-slate-900 mb-1.5">{d.tagline}</p>
                  <p className="text-xs text-slate-600 leading-relaxed flex-1">{d.description}</p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {d.bestFor.map((b) => (
                      <span key={b} className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${accent.chip}`}>
                        {b}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 text-[11px] text-slate-500 flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5 text-amber-600" />
                    <span>Best: {d.bestSeason}</span>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleWhatsApp(d)}
                      className="py-2 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 text-[11px] font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-600" /> Ask Fare
                    </button>
                    <button
                      type="button"
                      onClick={() => onSelectDestination(d.name)}
                      className="py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 text-[11px] font-black flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      Book <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-slate-500">
          Not listed? From Nashik we drive anywhere in Maharashtra and to Gujarat, Goa, Karnataka, Madhya Pradesh, Telangana and Rajasthan with all permits arranged.
        </p>
      </div>
    </section>
  );
};
