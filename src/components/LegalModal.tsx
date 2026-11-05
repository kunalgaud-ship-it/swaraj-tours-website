import React, { useEffect } from 'react';
import { X, FileText, ShieldCheck, RotateCcw } from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';

export type LegalDocType = 'terms' | 'privacy' | 'refund';

interface LegalModalProps {
  doc: LegalDocType | null;
  onClose: () => void;
}

interface LegalSection {
  heading: string;
  points: string[];
}

export const LEGAL_LAST_UPDATED = 'October 2026';

export const LEGAL_CONTENT: Record<LegalDocType, { title: string; icon: React.ElementType; intro: string; sections: LegalSection[] }> = {
  terms: {
    title: 'Terms & Conditions',
    icon: FileText,
    intro: `These terms govern all cab rentals, outstation trips, airport transfers and tour packages booked with ${COMPANY_INFO.name}. By confirming a booking you accept these terms.`,
    sections: [
      {
        heading: '1. Booking & Confirmation',
        points: [
          'A booking is confirmed only after our dispatch team shares the vehicle number and driver details via SMS or WhatsApp.',
          'Fares quoted on the website are indicative estimates. The final fare is confirmed at the time of booking.',
          'Vehicle model may be substituted with an equivalent or higher category in case of unforeseen breakdown.',
        ],
      },
      {
        heading: '2. Fares, Billing & Payment',
        points: [
          `Outstation fares are calculated on a minimum of 300 km per day (garage to garage) plus driver allowance per day as listed on the Fleet section.`,
          'Toll charges, parking fees, state entry taxes and inter-state permits are payable at actuals unless an all-inclusive package is confirmed in writing.',
          'Night driver allowance applies for trips operating between 10 PM and 6 AM, except where an offer waives it.',
          'Payment is accepted via UPI, debit / credit cards, net banking or cash. GST invoices are issued on request.',
        ],
      },
      {
        heading: '3. Passenger Responsibilities',
        points: [
          'Passengers must carry valid government ID for inter-state travel and hotel check-ins.',
          'Smoking, consumption of alcohol, and carrying illegal or hazardous items inside the vehicle is strictly prohibited.',
          'Any damage to the vehicle caused by passenger negligence will be charged at actual repair cost.',
          'Waiting time beyond 30 minutes at pickup may attract waiting charges as communicated at booking.',
        ],
      },
      {
        heading: '4. Itinerary & Route',
        points: [
          'The driver will follow the itinerary shared at booking. Additional stops or detours will be billed on actual kilometres.',
          'Hill station and ghat routes may require vehicle category restrictions as per local RTO rules.',
          'We reserve the right to decline travel to areas under weather warnings or civil restrictions for passenger safety.',
        ],
      },
      {
        heading: '5. Liability',
        points: [
          `${COMPANY_INFO.name} is not liable for delays caused by traffic, weather, road closures, strikes or events beyond our control.`,
          'Passengers are advised to keep valuables with them. We are not responsible for items left behind in the vehicle, though we assist in recovery.',
          'All vehicles are insured as per Motor Vehicles Act requirements for commercial passenger transport.',
        ],
      },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    icon: ShieldCheck,
    intro: `${COMPANY_INFO.name} respects your privacy. This policy explains what information we collect when you use our website or book a trip, and how we use it.`,
    sections: [
      {
        heading: '1. Information We Collect',
        points: [
          'Name, mobile number and email address you provide in booking, assistance or partner enquiry forms.',
          'Trip details such as pickup and drop locations, dates, passenger count and special requirements.',
          'Location data entered into the Google Places autocomplete fields to compute routes and fares.',
        ],
      },
      {
        heading: '2. How We Use It',
        points: [
          'To confirm bookings, dispatch vehicles and share driver details with you.',
          'To contact you about your trip, send invoices, and respond to support requests.',
          'To send occasional offers or seasonal deals, only if you opted in. You can opt out any time by messaging us.',
        ],
      },
      {
        heading: '3. Sharing of Information',
        points: [
          'Your name, phone number and pickup details are shared only with the assigned driver for the duration of the trip.',
          'We do not sell or rent your personal information to third parties.',
          'Map and autocomplete features use Google Maps Platform, which is governed by Google\'s privacy policy.',
        ],
      },
      {
        heading: '4. Data Security & Retention',
        points: [
          'Booking records are retained for accounting and legal compliance as required under Indian law.',
          'You may request correction or deletion of your personal data by writing to ' + COMPANY_INFO.email + '.',
        ],
      },
      {
        heading: '5. Cookies',
        points: [
          'Our website uses minimal browser storage to remember your preferences. We do not use third-party advertising trackers.',
        ],
      },
    ],
  },
  refund: {
    title: 'Cancellation & Refund Policy',
    icon: RotateCcw,
    intro: 'We keep cancellations simple and fair. Plans change, and we understand that.',
    sections: [
      {
        heading: '1. Free Cancellation Window',
        points: [
          'Cancel up to 2 hours before the scheduled pickup for a 100% refund of any advance paid, with no cancellation fee.',
          'Date and time rescheduling is free, subject to vehicle availability.',
        ],
      },
      {
        heading: '2. Late Cancellation',
        points: [
          'Cancellations within 2 hours of pickup, or after the driver has reported at the pickup location, may attract a charge equal to one day driver allowance plus fuel for kilometres already travelled.',
          'For multi-day tour packages, cancellation within 48 hours of departure may attract a 25% charge on the package fare to cover driver and vehicle blocking.',
        ],
      },
      {
        heading: '3. No-Show',
        points: [
          'If the passenger does not board within 60 minutes of the scheduled pickup and cannot be reached, the booking is treated as a no-show and the late cancellation charge applies.',
        ],
      },
      {
        heading: '4. Cancellation by Us',
        points: [
          'In the rare event we cannot provide a vehicle, you receive a full refund of any advance within 3 to 5 working days, and we help arrange an alternative where possible.',
        ],
      },
      {
        heading: '5. How to Cancel',
        points: [
          `Call ${COMPANY_INFO.primaryPhone} or message us on WhatsApp with your booking details. Refunds are processed to the original payment method within 5 to 7 working days.`,
        ],
      },
    ],
  },
};

export const LegalModal: React.FC<LegalModalProps> = ({ doc, onClose }) => {
  useEffect(() => {
    if (!doc) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [doc, onClose]);

  if (!doc) return null;
  const content = LEGAL_CONTENT[doc];
  const Icon = content.icon;

  return (
    <div
      className="fixed inset-0 z-[60] bg-slate-950/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-title"
        className="bg-white w-full sm:max-w-3xl max-h-[92vh] flex flex-col rounded-t-3xl sm:rounded-3xl shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 px-6 sm:px-8 py-5 border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 id="legal-title" className="text-lg sm:text-xl font-black text-slate-900">{content.title}</h3>
              <p className="text-[11px] text-slate-500 font-semibold">Last updated: {LEGAL_LAST_UPDATED}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 sm:px-8 py-6 overflow-y-auto space-y-6 text-sm text-slate-700">
          <p className="leading-relaxed">{content.intro}</p>
          {content.sections.map((s) => (
            <div key={s.heading}>
              <h4 className="font-bold text-slate-900 mb-2">{s.heading}</h4>
              <ul className="space-y-1.5 list-disc pl-5">
                {s.points.map((p, i) => (
                  <li key={i} className="leading-relaxed">{p}</li>
                ))}
              </ul>
            </div>
          ))}
          <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
            Questions? Write to <a href={`mailto:${COMPANY_INFO.email}`} className="text-amber-700 font-semibold hover:underline">{COMPANY_INFO.email}</a> or call {COMPANY_INFO.primaryPhone}.
          </div>
        </div>
      </div>
    </div>
  );
};
