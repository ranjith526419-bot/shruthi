import React from 'react';
import { Heart, Activity, Sparkles, CheckCircle2, ShieldPlus } from 'lucide-react';

export const WhyDonateSection: React.FC = () => {
  const reasons = [
    {
      title: 'One Pint Saves Up to 3 Lives',
      description: 'Your blood can be separated into red cells, platelets, and plasma—directly helping trauma victims, cancer patients, and surgical cases.',
      icon: Heart
    },
    {
      title: 'Free Mini Health Checkup',
      description: 'Prior to each donation, qualified staff screen your pulse, blood pressure, body temperature, and hemoglobin level at no cost.',
      icon: Activity
    },
    {
      title: 'Blood Cannot Be Synthesized',
      description: 'There is no artificial substitute for human blood. Hospitalized patients rely entirely on the generosity of voluntary donors.',
      icon: Sparkles
    },
    {
      title: 'Replenishes Naturally',
      description: 'Your body restores lost blood plasma within 24–48 hours, and red blood cells are completely regenerated within 4 to 8 weeks.',
      icon: ShieldPlus
    }
  ];

  return (
    <section className="py-16 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-red-400 bg-red-950/60 px-3 py-1 rounded-full border border-red-800">
              Community Impact
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Why Your Blood Donation Matters
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Every two seconds, someone in need requires a life-saving blood transfusion.
              Whether for accident trauma, pediatric oncology, childbirth complications, or chronic anemia, voluntary donors are the lifeline of healthcare.
            </p>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-red-400 font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Standard Clinical Rest Interval: 56 Days</span>
              </div>
              <p className="text-slate-400 pl-6">
                Healthy adults aged 18–65 weighing over 50kg (110 lbs) can typically donate whole blood every 8 weeks, subject to medical on-site check.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reasons.map((r, i) => (
              <div
                key={i}
                id={`why-donate-card-${i + 1}`}
                className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 hover:border-red-500/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center mb-4">
                  {React.createElement(r.icon, { className: 'w-5 h-5' })}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{r.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{r.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
