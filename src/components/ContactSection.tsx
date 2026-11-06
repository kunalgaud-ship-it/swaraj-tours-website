import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  MessageSquare, 
  ShieldCheck, 
  Building,
  Navigation,
  Compass
} from 'lucide-react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { COMPANY_INFO } from '../data/travelData';
import { GOOGLE_MAPS_API_KEY, GOOGLE_MAPS_OPTIONS } from '../maps';
import { WhatsAppIcon } from './WhatsAppIcon';
import { sendInquiry } from '../inquiry';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [routeInfo, setRouteInfo] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const OFFICE = { lat: 20.0158, lng: 73.8311 };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitting(true);
    try {
      await sendInquiry({ source: 'contact', name, phone, email, route: routeInfo, message });
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'We could not send your inquiry. Please use WhatsApp or call us.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello Swaraj Cab,\nName: ${name || 'Traveler'}\nPhone: ${phone || 'N/A'}\nRoute/Requirement: ${routeInfo || 'General Inquiry'}\nMessage: ${message || 'Please provide quotation.'}`
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            24x7 Customer Support & Office Hubs
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Contact Swaraj Cab
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            One office, one dispatch desk, all in Nashik. Reach out anytime for urgent taxi bookings, outstation quotes, wedding convoys or corporate travel.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Details & Branch Offices */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Cards */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <h3 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
                <Phone className="w-5 h-5 text-amber-500" />
                24/7 Phone & WhatsApp Helpdesk
              </h3>

              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-xs text-slate-400 font-semibold block uppercase">Direct Calling Lines</span>
                  <div className="flex flex-col gap-1 mt-1">
                    <a
                      href={`tel:${COMPANY_INFO.rawPhone}`}
                      className="font-bold text-slate-900 hover:text-amber-600 text-base flex items-center gap-2"
                    >
                      <span>{COMPANY_INFO.primaryPhone}</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">Primary</span>
                    </a>
                    <span className="text-[11px] text-slate-500">Calls & WhatsApp on the same number</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs text-slate-400 font-semibold block uppercase">Official Email</span>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="font-semibold text-slate-800 hover:text-amber-600 break-all"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </div>

                <div>
                  <span className="text-xs text-slate-400 font-semibold block uppercase">Operating Hours</span>
                  <span className="font-semibold text-emerald-700 flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    24 Hours / 7 Days (Including All Public Holidays)
                  </span>
                </div>
              </div>

              {/* Direct WhatsApp Action */}
              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Instant Chat on WhatsApp</span>
              </button>
            </div>

            {/* Office Locations with Interactive Google Map */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Building className="w-4 h-4 text-amber-500" />
                  Our Nashik Office
                </h4>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  Google Map Active
                </span>
              </div>

              {/* Google Map of the Nashik office */}
              <div className="h-52 w-full rounded-xl overflow-hidden border border-slate-200 shadow-inner relative bg-slate-100">
                {GOOGLE_MAPS_API_KEY ? (
                  <APIProvider apiKey={GOOGLE_MAPS_API_KEY} libraries={GOOGLE_MAPS_OPTIONS.libraries} region={GOOGLE_MAPS_OPTIONS.region} language={GOOGLE_MAPS_OPTIONS.language}>
                    <Map
                      mapId="DEMO_MAP_ID"
                      center={OFFICE}
                      zoom={12}
                      gestureHandling="cooperative"
                      disableDefaultUI={false}
                      style={{ width: '100%', height: '100%' }}
                    >
                      <AdvancedMarker position={OFFICE} title={`${COMPANY_INFO.name} - Nashik Office`}>
                        <Pin background="#f59e0b" borderColor="#b45309" glyphColor="#ffffff" scale={1.1} />
                      </AdvancedMarker>
                    </Map>
                  </APIProvider>
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-xs text-slate-500">Map unavailable</div>
                )}
              </div>

              {/* Office Address + service area */}
              <div className="space-y-2 text-xs text-slate-600 pt-1">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="font-bold text-slate-900 block text-xs mb-1">
                    📍 Office & Dispatch (Nashik):
                  </span>
                  <p>{COMPANY_INFO.mainAddress}</p>
                  <a
                    href={COMPANY_INFO.googleMapsUrl || `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(COMPANY_INFO.mainAddress)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-2 text-amber-700 font-bold hover:text-amber-800"
                  >
                    <Navigation className="w-3.5 h-3.5" /> Get directions
                  </a>
                </div>
                <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200/60">
                  <span className="font-bold text-amber-900 block text-xs mb-1.5">
                    All trips start from Nashik. We drop to:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {COMPANY_INFO.serviceCities.map((c) => (
                      <span key={c} className="px-2 py-0.5 rounded-md bg-white border border-amber-200 text-[11px] font-semibold text-slate-700">
                        {c}
                      </span>
                    ))}
                    <span className="px-2 py-0.5 rounded-md bg-white border border-amber-200 text-[11px] font-semibold text-slate-700">
                      + Pan-India
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Booking Enquiry Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Send an Online Booking Inquiry
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-6">
              Fill in your trip details and our tour manager will call you back within 15 minutes with the best guaranteed rates.
            </p>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 border border-emerald-200 rounded-2xl animate-in fade-in duration-300">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-black text-emerald-950 mb-2">
                  Thank You, {name || 'Traveler'}!
                </h4>
                <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto mb-5 leading-relaxed">
                  Your travel inquiry has been received. Our team will contact you shortly on <strong>{phone || 'your phone'}</strong> with vehicle availability and final discounted fare.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleWhatsAppDirect}
                    className="py-2.5 px-5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    Send Fast WhatsApp Copy
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="py-2.5 px-4 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold text-xs"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Kunal Gaud"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 98607 07287"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. travel@example.com"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Travel Route / Destination *
                    </label>
                    <input
                      type="text"
                      required
                      value={routeInfo}
                      onChange={(e) => setRouteInfo(e.target.value)}
                      placeholder="e.g. Nashik to Shirdi & return"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Special Requirements / Preferred Vehicle
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide journey dates, number of passengers, luggage quantity, or specific car requests (e.g. Innova Crysta / Ertiga)..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 font-medium"
                  />
                </div>

                {submitError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span>{submitError}</span>
                    <button
                      type="button"
                      onClick={handleWhatsAppDirect}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold shrink-0 cursor-pointer"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5" />
                      Send on WhatsApp instead
                    </button>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    We respect your privacy. No spam guaranteed.
                  </span>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto py-3 px-8 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs sm:text-sm shadow-md shadow-amber-500/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-wait"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? 'Sending...' : 'Submit Inquiry'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
