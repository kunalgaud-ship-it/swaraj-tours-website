import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  ArrowLeftRight, 
  Car, 
  Users, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  PhoneCall, 
  Plane,
  ChevronDown,
  Navigation,
  Map as MapIcon,
  Compass
} from 'lucide-react';
import { TripType, BookingFormData } from '../types/travel';
import { VEHICLES, POPULAR_CITIES, COMPANY_INFO } from '../data/travelData';
import { PlaceAutocompleteInput, PlaceSelection } from './PlaceAutocompleteInput';
import { DestinationMapModal } from './DestinationMapModal';
import { WhatsAppIcon } from './WhatsAppIcon';
import heroBackground from '../assets/images/innova_crysta_cab_1792438495834.jpg';

const toLocalDateValue = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

interface HeroBookingProps {
  onConfirmBooking: (data: BookingFormData) => void;
  prefillRoute?: { from: string; to: string } | null;
}

export const HeroBooking: React.FC<HeroBookingProps> = ({ onConfirmBooking, prefillRoute }) => {
  const [tripType, setTripType] = useState<TripType>('one-way');
  const [pickupCity, setPickupCity] = useState(prefillRoute?.from || 'Nashik');
  const [dropCity, setDropCity] = useState(prefillRoute?.to || 'Mumbai');
  const [pickupDate, setPickupDate] = useState(() => toLocalDateValue(new Date()));
  const [pickupTime, setPickupTime] = useState('07:00');
  const [returnDate, setReturnDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return toLocalDateValue(tomorrow);
  });
  const [selectedCarId, setSelectedCarId] = useState('dzire');
  const [passengers, setPassengers] = useState(4);
  const [localPackage, setLocalPackage] = useState('8hr-80km');
  const [airportType, setAirportType] = useState<'drop' | 'pickup'>('drop');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [isBookingSubmitting, setIsBookingSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  // Handle prefillRoute changes if user clicked "Book This Route" / a destination card elsewhere.
  // An empty `from` keeps whatever pickup the traveller already typed.
  React.useEffect(() => {
    if (prefillRoute) {
      if (prefillRoute.from) setPickupCity(prefillRoute.from);
      if (prefillRoute.to) setDropCity(prefillRoute.to);
      if (tripType === 'local' || tripType === 'airport') setTripType('one-way');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefillRoute]);

  // Every trip starts in Nashik: frequently used pickup points (one-tap fill for the pickup field)
  const NASHIK_PICKUP_SPOTS = [
    'Nashik Road Railway Station',
    'Pathardi Phata',
    'Mumbai Naka',
    'College Road',
    'Gangapur Road',
    'Indira Nagar',
    'Panchavati',
    'Deolali Camp',
    'Ozar Airport',
  ];

  const selectedCar = VEHICLES.find((v) => v.id === selectedCarId) || VEHICLES[0];

  // Dynamic distance & fare estimation logic
  const estimatedInfo = useMemo(() => {
    // Approximate road distance from Nashik (all trips originate here). Longer, more specific names first.
    const distancesFromNashik: [string, number][] = [
      ['mumbai airport', 175],
      ['pune airport', 225],
      ['navi mumbai', 150],
      ['shani shingnapur', 160],
      ['saptashrungi', 65],
      ['vani', 65],
      ['trimbakeshwar', 30],
      ['bhimashankar', 210],
      ['sambhajinagar', 185],
      ['aurangabad', 185],
      ['ellora', 215],
      ['ajanta', 285],
      ['mahabaleshwar', 330],
      ['panchgani', 310],
      ['lonavala', 220],
      ['khandala', 215],
      ['lavasa', 270],
      ['saputara', 80],
      ['igatpuri', 45],
      ['bhandardara', 70],
      ['alibaug', 260],
      ['kashid', 290],
      ['ganpatipule', 480],
      ['kolhapur', 450],
      ['satara', 320],
      ['pandharpur', 390],
      ['tuljapur', 420],
      ['ahmednagar', 160],
      ['shirdi', 90],
      ['thane', 140],
      ['kalyan', 125],
      ['borivali', 160],
      ['mumbai', 165],
      ['pune', 215],
      ['hinjewadi', 205],
      ['surat', 230],
      ['vapi', 200],
      ['daman', 210],
      ['silvassa', 220],
      ['dhule', 150],
      ['jalgaon', 240],
      ['malegaon', 110],
      ['shegaon', 380],
      ['indore', 420],
      ['ujjain', 480],
      ['nagpur', 680],
      ['hyderabad', 700],
      ['ahmedabad', 490],
      ['vadodara', 400],
      ['goa', 650],
    ];

    const dropKey = dropCity.trim().toLowerCase();
    const match = distancesFromNashik.find(([name]) => dropKey.includes(name));
    const baseDistance = match ? match[1] : 160;

    if (tripType === 'local') {
      let fare = 1800;
      if (localPackage === '4hr-40km') fare = 1400;
      if (localPackage === '8hr-80km') fare = 2200;
      if (localPackage === '12hr-120km') fare = 3100;
      if (selectedCar.localStartingPrice) {
        fare = selectedCar.localStartingPrice;
        if (localPackage === '4hr-40km') fare = Math.round(fare * 0.7);
        if (localPackage === '12hr-120km') fare = Math.round(fare * 1.3);
      } else {
        if (selectedCar.category === 'suv') fare = Math.round(fare * 1.35);
        if (selectedCar.category === 'luxury') fare = Math.round(fare * 2.2);
        if (selectedCar.category === 'tempo') fare = Math.round(fare * 2.5);
      }
      return { distance: 80, estimatedFare: fare, duration: 'Local Service' };
    }

    if (tripType === 'airport') {
      const fare = selectedCar.category === 'sedan' ? 2599 : selectedCar.category === 'suv' ? 3499 : 5200;
      return { distance: 150, estimatedFare: fare, duration: 'Airport Transfer' };
    }

    if (tripType === 'one-way') {
      let est = Math.max(baseDistance * selectedCar.ratePerKm, selectedCar.oneWayStartingPrice);
      // add standard toll allowance estimate for transparency
      return { distance: baseDistance, estimatedFare: Math.round(est), duration: `${Math.round(baseDistance / 50 + 1)} hrs approx` };
    }

    // Round Trip
    const days = 2;
    const minKm = Math.max(baseDistance * 2, selectedCar.minKmPerDay * days);
    const est = minKm * selectedCar.ratePerKm + selectedCar.driverAllowancePerDay * days;
    return { distance: minKm, estimatedFare: Math.round(est), duration: '2 Days Outstation' };
  }, [pickupCity, dropCity, tripType, localPackage, selectedCar]);

  const swapCities = () => {
    setPickupCity(dropCity);
    setDropCity(pickupCity);
  };

  const generateWhatsAppMessage = () => {
    const details = [
      `*🚖 Cab Booking Inquiry - Swaraj Tours and Travels (Your Road to Comfort)*`,
      `Trip Type: ${tripType.toUpperCase()}`,
      `From: ${pickupCity}`,
      `To: ${tripType === 'local' ? `Local Package (${localPackage})` : dropCity}`,
      `Pickup Date: ${pickupDate} at ${pickupTime}`,
      tripType === 'round-trip' ? `Return Date: ${returnDate}` : null,
      `Vehicle Selected: ${selectedCar.name}`,
      `Passengers: ${passengers}`,
      `Estimated Approx Fare: ₹${estimatedInfo.estimatedFare.toLocaleString()}`,
      customerName ? `Name: ${customerName}` : null,
      customerPhone ? `Contact: ${customerPhone}` : null,
      customerEmail ? `Email: ${customerEmail}` : null,
      `\nPlease confirm vehicle availability and final rate.`
    ].filter(Boolean).join('\n');

    return encodeURIComponent(details);
  };

  const handleWhatsAppBooking = () => {
    const message = generateWhatsAppMessage();
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${message}`, '_blank');
  };

  const handleOnlineBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingError('');
    setIsBookingSubmitting(true);

    const bookingData: BookingFormData = {
      tripType,
      pickupCity,
      dropCity: tripType === 'local' ? `Local (${localPackage})` : dropCity,
      pickupDate,
      pickupTime,
      returnDate: tripType === 'round-trip' ? returnDate : undefined,
      selectedCarId,
      passengers,
      customerName: customerName || 'Valued Traveler',
      customerPhone: customerPhone.trim(),
      customerEmail: customerEmail || undefined,
      estimatedFare: estimatedInfo.estimatedFare,
    };

    try {
      const response = await fetch('/api/send-booking-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...bookingData, vehicleName: selectedCar.name }),
      });
      const result = await response.json().catch(() => ({}));
      if (response.status === 400) throw new Error(result.error || 'Please check your booking details.');
      if (!response.ok) {
        // Email / database not reachable: never lose the lead. Hand the traveller a WhatsApp
        // hand-off with a reference number so dispatch still receives every detail.
        onConfirmBooking({
          ...bookingData,
          bookingRef: `SWARAJ-${Date.now().toString(36).toUpperCase()}`,
          emailSent: false,
        });
        return;
      }
      onConfirmBooking({ ...bookingData, bookingRef: result.bookingRef, emailSent: true });
    } catch (error) {
      setBookingError(error instanceof Error ? error.message : 'Could not send your booking. Please use Book via WhatsApp.');
    } finally {
      setIsBookingSubmitting(false);
    }
  };

  return (
    <section id="hero" className="relative bg-slate-950 text-white pt-6 pb-16 overflow-hidden">
      {/* Cinematic Photo Background: Innova on the Sahyadri expressway with slow Ken Burns zoom */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <img
          src={heroBackground}
          alt=""
          className="w-full h-full object-contain object-top sm:object-cover sm:object-[center_60%] hero-kenburns"
          fetchPriority="high"
        />
        {/* Dark cinematic overlays for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/65 via-slate-950/50 to-slate-950/95 sm:from-slate-950/85 sm:via-slate-950/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/30 via-transparent to-slate-950/50 sm:from-slate-950/70 sm:to-slate-950/70" />
        <div className="absolute inset-x-0 top-[220px] h-40 bg-gradient-to-b from-transparent to-slate-950 sm:hidden" />
        {/* Warm amber glow (brand accent) + cool blue glow */}
        <div className="absolute -top-24 left-1/4 w-[32rem] h-[32rem] bg-amber-500/20 rounded-full blur-3xl mix-blend-screen opacity-30 sm:opacity-100" />
        <div className="absolute bottom-0 right-1/4 w-[28rem] h-[28rem] bg-blue-500/20 rounded-full blur-3xl mix-blend-screen opacity-30 sm:opacity-100" />
        {/* Subtle dotted grid texture */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.9) 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* Bottom fade so the booking card sits on a clean edge */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-slate-950 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Hero Top Tagline & Value Props */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-4 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Nashik's Trusted Cab & Car Rental Service</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Safe, Punctual Cab Service in Nashik{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200">
              and Maharashtra
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            One-way drops, round-trip outstation, 24/7 airport transfers & customized pilgrimage tours, all starting from your doorstep in Nashik to Mumbai, Pune, Shirdi, Goa & beyond.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-300">
            <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Zero Hidden Charges
            </span>
            <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Clean & Sanitized Fleet
            </span>
            <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Verified & Courteous Drivers
            </span>
            <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              24/7 Roadside Support
            </span>
            <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Local, Outstation & Airport
            </span>
            <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              No Surge, Tolls Shown Upfront
            </span>
          </div>
        </div>

        {/* High-Converting Interactive Booking Widget */}
        <div id="booking" className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-100 text-slate-800 overflow-hidden">
          {/* Trip Type Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 bg-slate-100 border-b border-slate-200">
            <button
              type="button"
              onClick={() => setTripType('one-way')}
              className={`py-3.5 px-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                tripType === 'one-way'
                  ? 'bg-white text-slate-900 border-b-2 border-amber-500 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Navigation className="w-4 h-4 text-amber-500" />
              <span>One Way Drop</span>
              <span className="hidden md:inline bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.5 rounded font-extrabold">
                -40%
              </span>
            </button>

            <button
              type="button"
              onClick={() => setTripType('round-trip')}
              className={`py-3.5 px-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                tripType === 'round-trip'
                  ? 'bg-white text-slate-900 border-b-2 border-amber-500 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <ArrowLeftRight className="w-4 h-4 text-amber-500" />
              <span>Round Trip</span>
            </button>

            <button
              type="button"
              onClick={() => setTripType('local')}
              className={`py-3.5 px-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                tripType === 'local'
                  ? 'bg-white text-slate-900 border-b-2 border-amber-500 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Clock className="w-4 h-4 text-amber-500" />
              <span>Local / Hourly</span>
            </button>

            <button
              type="button"
              onClick={() => setTripType('airport')}
              className={`py-3.5 px-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                tripType === 'airport'
                  ? 'bg-white text-slate-900 border-b-2 border-amber-500 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Plane className="w-4 h-4 text-amber-500" />
              <span>Airport Cab</span>
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleOnlineBookingSubmit} className="p-4 sm:p-6 space-y-5">
            {/* Location Fields Row Header with Google Map Option */}
            <div className="flex items-center justify-between pb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Route & Destinations (Powered by Google Maps)
              </span>
              <button
                type="button"
                onClick={() => setIsMapModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                <MapIcon className="w-3.5 h-3.5 text-blue-600" />
                <span>Open Google Map</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              {/* Pickup City with Google Maps Autocomplete */}
              <div className="md:col-span-5 relative">
                <label htmlFor="pickup-location" className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Pickup Address in Nashik
                </label>
                <PlaceAutocompleteInput
                  id="pickup-location"
                  value={pickupCity}
                  onChange={(val) => setPickupCity(val)}
                  placeholder="Your Nashik address or landmark (e.g. Nashik Road Station)"
                  iconColor="text-emerald-600"
                  required
                />
              </div>

              {/* Swap Button (only for one-way / round-trip) */}
              <div className="hidden md:flex md:col-span-2 justify-center pt-5">
                {tripType !== 'local' && (
                  <button
                    type="button"
                    onClick={swapCities}
                    className="p-2 rounded-full bg-slate-100 hover:bg-amber-100 hover:text-amber-700 text-slate-600 border border-slate-200 shadow-sm transition-all cursor-pointer"
                    title="Swap Pickup and Drop Locations"
                  >
                    <ArrowLeftRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Drop City or Local Package Selector */}
              <div className="md:col-span-5 relative">
                {tripType === 'local' ? (
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Select Local Hourly Package
                    </label>
                    <select
                      value={localPackage}
                      onChange={(e) => setLocalPackage(e.target.value)}
                      className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-amber-500 font-medium"
                    >
                      <option value="4hr-40km">4 Hours / 40 KM Package (City Sightseeing)</option>
                      <option value="8hr-80km">8 Hours / 80 KM Package (Full Day City/Offices)</option>
                      <option value="12hr-120km">12 Hours / 120 KM Package (Extended Day Tour)</option>
                    </select>
                  </div>
                ) : tripType === 'airport' ? (
                  <div>
                    <label htmlFor="drop-location" className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Airport & Service Direction
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={airportType}
                        onChange={(e) => setAirportType(e.target.value as 'drop' | 'pickup')}
                        className="px-2 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 font-medium"
                      >
                        <option value="drop">Drop to Airport</option>
                        <option value="pickup">Pickup from Airport</option>
                      </select>
                      <select
                        value={dropCity}
                        onChange={(e) => setDropCity(e.target.value)}
                        className="px-2 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 font-medium"
                      >
                        <option value="Mumbai Airport (T1/T2)">Mumbai Airport (T1/T2)</option>
                        <option value="Pune Airport (Lohegaon)">Pune Airport</option>
                        <option value="Shirdi Airport">Shirdi Airport</option>
                        <option value="Nashik Ozar Airport">Nashik Airport</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Drop Destination
                    </label>
                    <PlaceAutocompleteInput
                      id="drop-location"
                      value={dropCity}
                      onChange={(val) => setDropCity(val)}
                      placeholder="Where to? (e.g. Dadar, Mumbai or Shirdi)"
                      iconColor="text-red-500"
                      required
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Nashik pickup landmark quick-picks */}
            <div className="flex items-center gap-1.5 flex-wrap text-xs">
              <span className="text-[11px] text-slate-500 font-bold uppercase">Nashik pickup:</span>
              {NASHIK_PICKUP_SPOTS.map((spot) => (
                <button
                  key={spot}
                  type="button"
                  onClick={() => setPickupCity(`${spot}, Nashik`)}
                  className="px-2.5 py-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-200 transition-colors cursor-pointer"
                >
                  {spot}
                </button>
              ))}
            </div>

            {/* Quick destination chips (one-way / round-trip only) */}
            {(tripType === 'one-way' || tripType === 'round-trip') && (
              <div className="flex items-center gap-1.5 flex-wrap text-xs">
                <span className="text-[11px] text-slate-500 font-bold uppercase">Drop to:</span>
                {['Mumbai', 'Pune', 'Shirdi', 'Trimbakeshwar', 'Sambhajinagar', 'Mahabaleshwar', 'Saputara', 'Goa'].map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => setDropCity(city === 'Sambhajinagar' ? 'Chhatrapati Sambhajinagar (Aurangabad)' : city)}
                    className="px-2.5 py-1 rounded bg-slate-100 hover:bg-amber-100 hover:text-amber-800 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}

            {/* Dates, Car Selection & Time Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              {/* Pickup Date */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Pickup Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="w-4 h-4 text-slate-500" />
                  </div>
                  <input
                    type="date"
                    required
                    min={toLocalDateValue(new Date())}
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full pl-9 pr-2 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 font-medium"
                  />
                </div>
              </div>

              {/* Pickup Time or Return Date */}
              {tripType === 'round-trip' ? (
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Return Date
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="w-4 h-4 text-slate-500" />
                    </div>
                    <input
                      type="date"
                      required
                      min={pickupDate}
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full pl-9 pr-2 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 font-medium"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Pickup Time
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock className="w-4 h-4 text-slate-500" />
                    </div>
                    <input
                      type="time"
                      required
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full pl-9 pr-2 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 font-medium"
                    />
                  </div>
                </div>
              )}

              {/* Vehicle Selection */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Select Vehicle
                </label>
                <div className="relative">
                  <select
                    value={selectedCarId}
                    onChange={(e) => setSelectedCarId(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 font-semibold text-slate-800"
                  >
                    {VEHICLES.map((car) => (
                      <option key={car.id} value={car.id}>
                        {car.name} ({car.seats} Seats) - ₹{car.ratePerKm}/km
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Passenger Count */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Passengers
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Users className="w-4 h-4 text-slate-500" />
                  </div>
                  <input
                    type="number"
                    min="1"
                    max={selectedCar.seats}
                    value={passengers}
                    onChange={(e) => setPassengers(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Contact details mini-inputs for rapid callback */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  WhatsApp / Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  maxLength={30}
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="e.g. 98220 XXXXX"
                  inputMode="tel"
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Kunal Gaud"
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  Email (Required for booking confirmation)
                </label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="e.g. you@example.com"
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {bookingError && (
              <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {bookingError}
              </p>
            )}

            {/* Estimated Fare & Action Buttons Bar */}
            <div className="pt-3 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Fare Breakdown Badge */}
              <div className="flex items-center gap-3 w-full md:w-auto bg-amber-50 border border-amber-200/80 px-3.5 py-2 rounded-xl">
                <img
                  src={selectedCar.image}
                  alt={selectedCar.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-12 rounded-lg object-cover border border-amber-300 shadow-sm shrink-0"
                />
                <div>
                  <div className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">
                    Estimated Starting Fare
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-slate-900 flex items-baseline gap-1.5">
                    <span>₹{estimatedInfo.estimatedFare.toLocaleString()}</span>
                    <span className="text-xs font-normal text-slate-600">
                      ({selectedCar.name.split(' ')[0]} @ ₹{selectedCar.ratePerKm}/km)
                    </span>
                  </div>
                </div>
                <div className="hidden sm:block text-[11px] text-slate-500 border-l border-amber-200 pl-3">
                  <div>✓ Free Cancellation</div>
                  <div>✓ Clean AC Vehicle</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 w-full md:w-auto">
                <button
                  type="button"
                  onClick={handleWhatsAppBooking}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Book on WhatsApp</span>
                </button>

                <button
                  type="submit"
                  disabled={isBookingSubmitting}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold text-sm shadow-md shadow-amber-500/30 hover:shadow-lg transition-all cursor-pointer"
                >
                  <Car className="w-4 h-4" />
                  <span>{isBookingSubmitting ? 'Sending Request…' : 'Reserve Online'}</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Quick Phone Call Helpline Strip */}
        <div className="mt-8 max-w-2xl mx-auto flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm bg-slate-900/60 backdrop-blur-md border border-slate-700/60 py-2.5 px-4 rounded-xl text-center">
          <span className="text-slate-300 font-medium">Need immediate cab booking or custom package quote?</span>
          <a
            href={`tel:${COMPANY_INFO.rawPhone}`}
            className="inline-flex items-center gap-1.5 text-amber-400 font-extrabold hover:text-amber-300 transition-colors"
          >
            <PhoneCall className="w-4 h-4 text-amber-400" />
            <span>Call 24x7: {COMPANY_INFO.primaryPhone}</span>
          </a>
        </div>
      </div>

      {/* Interactive Google Map Route Modal */}
      <DestinationMapModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        initialPickup={pickupCity}
        initialDrop={dropCity}
        onApplyLocations={(p, d) => {
          setPickupCity(p);
          setDropCity(d);
        }}
      />
    </section>
  );
};
