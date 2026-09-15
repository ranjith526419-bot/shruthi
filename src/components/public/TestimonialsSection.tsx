import React from 'react';
import { Quote, Star } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote:
        'When our newborn needed emergency O- transfusions following an unexpected neonatal complication, LifeDrop connected our surgical team with local reserve donors within 40 minutes. We will forever be grateful.',
      name: 'Claire & Michael R.',
      role: 'Parents of Recipient Lucas',
      city: 'Seattle, WA',
      rating: 5
    },
    {
      quote:
        'I have been a voluntary blood donor for 7 years. LifeDrop makes it effortless to know when my blood type is critically low in regional trauma centers. The scheduling reminders keep me consistent.',
      name: 'Elena Rostova',
      role: 'Regular O- Donor (8 Donations)',
      city: 'Bellevue, WA',
      rating: 5
    },
    {
      quote:
        'As a hospital blood bank coordinator, tracking reserve units and alerting matching donors used to require hours of manual telephone calls. LifeDrop centralized our entire inventory workflow.',
      name: 'Dr. Sarah Jenkins',
      role: 'Transfusion Laboratory Director',
      city: 'Cascade Regional Center',
      rating: 5
    }
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-100">
            Real Stories
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
            Voices of Hope & Recovery
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Every pint given is a story of life restored. Read from our community of donors, recipients, and healthcare heroes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              id={`testimonial-card-${idx + 1}`}
              className="p-7 rounded-2xl bg-slate-50/60 border border-slate-200/80 hover:border-red-200 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-red-200 mb-3" />
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60">
                <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                <p className="text-[11px] font-semibold text-red-600">{t.role}</p>
                <p className="text-[10px] text-slate-400">{t.city}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
