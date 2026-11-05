import React from 'react';
import { Star, CheckCircle, Quote, MessageSquare } from 'lucide-react';
import { REVIEWS, COMPANY_INFO } from '../data/travelData';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <CheckCircle className="w-3.5 h-3.5" />
            Verified Customer Reviews
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            What Our Travelers Say About Us
          </h2>
          <div className="mt-3 flex items-center justify-center gap-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400" />
              ))}
            </div>
            <span className="text-sm font-bold text-slate-800">
              {COMPANY_INFO.googleRating} / 5.0 Rating based on {COMPANY_INFO.reviewsCount} Google & Justdial Reviews
            </span>
          </div>
          {COMPANY_INFO.googleReviewUrl && (
            <a
              href={COMPANY_INFO.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs font-bold hover:border-amber-400 hover:text-amber-700 shadow-sm transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-amber-500" />
              Read and write reviews on Google
            </a>
          )}
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {review.date}
                  </span>
                </div>

                <div className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md mb-3 inline-block">
                  Route: {review.route}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic mb-4">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                    {review.name}
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div className="text-[11px] text-slate-500">{review.location}</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block font-semibold">Cab Booked</span>
                  <span className="text-xs font-bold text-slate-700">{review.carTaken}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
