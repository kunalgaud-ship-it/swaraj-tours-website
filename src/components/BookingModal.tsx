import React from 'react';
import { 
  CheckCircle, 
  X, 
  Car, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Phone, 
  PhoneCall, 
  ShieldCheck 
} from 'lucide-react';
import { BookingFormData } from '../types/travel';
import { VEHICLES, COMPANY_INFO } from '../data/travelData';
import { WhatsAppIcon } from './WhatsAppIcon';

interface BookingModalProps {
  bookingData: BookingFormData | null;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ bookingData, onClose }) => {
  if (!bookingData) return null;

  const vehicle = VEHICLES.find((v) => v.id === bookingData.selectedCarId) || VEHICLES[0];
  const bookingRef = bookingData.bookingRef || 'SWARAJ';
  const needsWhatsApp = bookingData.emailSent === false;

  const handleWhatsAppConfirmation = () => {
    const text = encodeURIComponent(
      `*🚖 Confirmed Online Booking Request - ${bookingRef}*\n` +
      `Trip Type: ${bookingData.tripType.toUpperCase()}\n` +
      `From: ${bookingData.pickupCity}\n` +
      `To: ${bookingData.dropCity}\n` +
      `Date: ${bookingData.pickupDate} at ${bookingData.pickupTime}\n` +
      (bookingData.returnDate ? `Return Date: ${bookingData.returnDate}\n` : '') +
      `Vehicle: ${vehicle.name}\n` +
      `Passengers: ${bookingData.passengers}\n` +
      `Estimated Fare: ₹${bookingData.estimatedFare?.toLocaleString() || 'N/A'}\n` +
      `Traveler: ${bookingData.customerName} (${bookingData.customerPhone})\n\n` +
      `Please assign vehicle and driver details.`
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Header */}
        <div className="text-center pb-5 border-b border-slate-100">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
            <CheckCircle className="w-8 h-8" />
          </div>
          <span className="text-xs font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Booking ID: {bookingRef}
          </span>
          <h3 className="text-2xl font-black text-slate-900 mt-2">
            {needsWhatsApp ? 'One More Step: Send on WhatsApp' : 'Trip Request Received!'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {needsWhatsApp
              ? 'We could not email this request automatically. Tap the WhatsApp button below and your trip details reach our dispatch desk instantly.'
              : 'Our dispatcher will call you within 15 minutes to confirm driver & vehicle details.'}
          </p>
          {needsWhatsApp && (
            <div className="mt-3 text-[11px] font-semibold text-amber-900 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
              Your booking is not confirmed until you send it on WhatsApp or call us.
            </div>
          )}
        </div>

        {/* Trip Summary Card */}
        <div className="my-5 bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="font-bold text-slate-500 uppercase">Trip Route</span>
            <span className="font-extrabold text-slate-900 capitalize bg-white px-2 py-0.5 rounded border border-slate-200">
              {bookingData.tripType.replace('-', ' ')}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" /> From
            </span>
            <span className="font-bold text-slate-900">{bookingData.pickupCity}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-red-500" /> To
            </span>
            <span className="font-bold text-slate-900">{bookingData.dropCity}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-600" /> Date & Time
            </span>
            <span className="font-bold text-slate-900">
              {bookingData.pickupDate} at {bookingData.pickupTime}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5 text-slate-600" /> Selected Car
            </span>
            <span className="font-bold text-slate-900">{vehicle.name}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-slate-600" /> Passengers
            </span>
            <span className="font-bold text-slate-900">{bookingData.passengers} Passengers</span>
          </div>

          {bookingData.estimatedFare && (
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
              <span className="font-bold text-slate-700">Estimated Fare</span>
              <span className="text-lg font-black text-amber-600">
                ₹{bookingData.estimatedFare.toLocaleString()}
              </span>
            </div>
          )}
        </div>

        {/* Instant Action CTA */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={handleWhatsAppConfirmation}
            className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>Send Details on WhatsApp for Instant Dispatch</span>
          </button>

          <a
            href={`tel:${COMPANY_INFO.rawPhone}`}
            className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <PhoneCall className="w-4 h-4 text-amber-400" />
            <span>Call Dispatch Helpline: {COMPANY_INFO.primaryPhone}</span>
          </a>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 text-xs text-slate-500 hover:text-slate-700 font-semibold cursor-pointer"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};
