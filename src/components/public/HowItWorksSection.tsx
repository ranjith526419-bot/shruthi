import React from 'react';
import { UserPlus, Search, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react';

interface HowItWorksSectionProps {
  onNavigate: (tab: string) => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onNavigate }) => {
  const steps = [
    {
      step: '01',
      title: 'Register as Donor or Seeker',
      description: 'Sign up in under 2 minutes with your blood group, city, and voluntary donation preference. Privacy is strictly protected.',
      icon: UserPlus,
      color: 'bg-red-50 text-red-600'
    },
    {
      step: '02',
      title: 'Real-Time Matching & Alerts',
      description: 'Search available hospital inventory or dispatch urgent alerts to nearby verified compatible donors when emergency units are required.',
      icon: Search,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      step: '03',
      title: 'Medical Verification & Screening',
      description: 'Licensed blood bank and hospital staff conduct clinical vital checks, hemoglobin testing, and pre-donation health screening.',
      icon: ShieldCheck,
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      step: '04',
      title: 'Save Lives & Track Impact',
      description: 'Donation units are securely cross-matched and transfused to patients. Donors receive digital certificates and replenishment reminders.',
      icon: HeartHandshake,
      color: 'bg-purple-50 text-purple-600'
    }
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-100">
            Streamlined Workflow
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
            How LifeDrop Works
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            A transparent and secure bridge connecting healthy donors with medical centers and patients across the region.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <div
              key={item.step}
              id={`how-it-works-step-${index + 1}`}
              className="relative p-6 rounded-2xl bg-slate-50/60 border border-slate-200/70 hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color}`}>
                    {React.createElement(item.icon, { className: 'w-6 h-6' })}
                  </div>
                  <span className="text-2xl font-black text-slate-300">{item.step}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            id="how-it-works-cta-btn"
            onClick={() => onNavigate('become-donor')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-colors"
          >
            <span>Start Saving Lives Today</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
