import React from 'react';
import { COMPANY_INFO } from '../data/travelData';
import { LEGAL_CONTENT, LEGAL_LAST_UPDATED, LegalDocType } from './LegalModal';

const ORDER: LegalDocType[] = ['terms', 'privacy', 'refund'];

/**
 * Crawlable /policies page: the same Terms, Privacy and Refund content the footer
 * shows in a modal, but at a real URL for Google, Google Ads and Business Profile.
 */
export const PoliciesPage: React.FC = () => (
  <section id="policies" className="py-12 sm:py-16 bg-white">
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <nav aria-label="Policy sections" className="flex flex-wrap gap-2 mb-10">
        {ORDER.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className="px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold hover:bg-amber-100 transition-colors"
          >
            {LEGAL_CONTENT[id].title}
          </a>
        ))}
      </nav>

      <div className="space-y-14">
        {ORDER.map((id) => {
          const content = LEGAL_CONTENT[id];
          const Icon = content.icon;
          return (
            <article key={id} id={id} className="scroll-mt-28">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">{content.title}</h2>
                  <p className="text-[11px] text-slate-500 font-semibold">Last updated: {LEGAL_LAST_UPDATED}</p>
                </div>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed mb-5">{content.intro}</p>
              <div className="space-y-5 text-sm text-slate-700">
                {content.sections.map((s) => (
                  <div key={s.heading}>
                    <h3 className="font-bold text-slate-900 mb-2">{s.heading}</h3>
                    <ul className="space-y-1.5 list-disc pl-5">
                      {s.points.map((p, i) => (
                        <li key={i} className="leading-relaxed">{p}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-14 pt-6 border-t border-slate-200 text-xs text-slate-500">
        Questions about these policies? Write to{' '}
        <a href={`mailto:${COMPANY_INFO.email}`} className="text-amber-700 font-semibold hover:underline">{COMPANY_INFO.email}</a>{' '}
        or call{' '}
        <a href={`tel:${COMPANY_INFO.rawPhone}`} className="text-amber-700 font-semibold hover:underline">{COMPANY_INFO.primaryPhone}</a>.
      </div>
    </div>
  </section>
);
