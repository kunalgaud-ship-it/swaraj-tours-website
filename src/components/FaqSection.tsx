import React, { useState } from 'react';
import { HelpCircle, ChevronDown, PhoneCall } from 'lucide-react';
import { FAQS, COMPANY_INFO } from '../data/travelData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  // FAQPage structured data so Google can show these questions under the Contact page result.
  const faqSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  });

  return (
    <section className="py-16 sm:py-20 bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
            Got Questions? We Have Answers
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            Clear guidelines on our cab booking policies, toll charges, ghat air conditioning, and driver allowances.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-slate-50/50"
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-amber-600 transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-amber-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
          <span className="text-amber-950 font-medium">
            Have a question not listed here? Our dispatch team is available 24 hours.
          </span>
          <a
            href={`tel:${COMPANY_INFO.rawPhone}`}
            className="font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1 shrink-0"
          >
            <PhoneCall className="w-4 h-4 text-amber-600" />
            <span>Call: {COMPANY_INFO.primaryPhone}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
