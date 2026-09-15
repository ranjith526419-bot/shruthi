import React, { useState } from 'react';
import { FAQ_ITEMS } from '../../data/mockData';
import { ChevronDown, HelpCircle, ShieldAlert } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 bg-slate-50/70">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-100">
            Answers & Guidance
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Clear facts on blood donation guidelines, donor privacy safeguards, and clinical screening procedures.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                id={`faq-item-${idx + 1}`}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs transition-all"
              >
                <button
                  id={`faq-toggle-btn-${idx + 1}`}
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-bold text-slate-900 flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{item.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ${
                      isOpen ? 'rotate-180 text-red-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/30">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Safety & Medical Statement Box */}
        <div className="mt-10 p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3.5 text-xs text-amber-900">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold block mb-1">Clinical Eligibility Reminder:</span>
            LifeDrop facilitates digital connection and inventory tracking. All physical eligibility criteria (including hemoglobin checks, travel history reviews, prescription clearance, and blood pressure screening) are performed exclusively on-site by certified medical and blood bank staff before any blood is drawn.
          </div>
        </div>
      </div>
    </section>
  );
};
