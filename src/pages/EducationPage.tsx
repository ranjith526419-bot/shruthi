import React from 'react';
import {
  Heart,
  Droplet,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { FAQ_ITEMS } from '../data/mockData';

export const EducationPage: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  const steps = [
    {
      title: '1. Registration & Confidential Survey',
      desc: 'You verify identification and complete a private digital donor questionnaire covering general wellness, recent travel, and medications.',
      duration: '5 - 10 minutes'
    },
    {
      title: '2. Clinical Mini-Physical Check',
      desc: 'A trained medical technician checks your pulse, blood pressure, temperature, and takes a tiny finger-prick drop to test your hemoglobin levels.',
      duration: '5 minutes'
    },
    {
      title: '3. The Donation Collection',
      desc: 'You relax comfortably in a sanitized donor chair while approximately 450-500 mL (one pint) of blood is safely collected with sterile, single-use equipment.',
      duration: '8 - 12 minutes'
    },
    {
      title: '4. Refreshment & Rest',
      desc: 'Enjoy complimentary juice, healthy snacks, and water for 15 minutes before continuing your day. Your plasma volume regenerates rapidly.',
      duration: '15 minutes'
    }
  ];

  const components = [
    {
      name: 'Red Blood Cells (Erythrocytes)',
      shelfLife: 'Up to 42 Days',
      useCases: 'Trauma surgeries, acute hemorrhage, anemia, cancer chemotherapy.',
      color: 'border-red-200 bg-red-50/50 text-red-900'
    },
    {
      name: 'Platelets (Thrombocytes)',
      shelfLife: 'Only 5 to 7 Days',
      useCases: 'Leukemia, organ transplants, clotting disorders, open-heart surgery.',
      color: 'border-amber-200 bg-amber-50/50 text-amber-900'
    },
    {
      name: 'Plasma (Liquid Fraction)',
      shelfLife: 'Up to 1 Year (Frozen)',
      useCases: 'Severe burn victims, shock therapy, liver disease, autoimmune deficiencies.',
      color: 'border-blue-200 bg-blue-50/50 text-blue-900'
    }
  ];

  const myths = [
    {
      myth: 'Donating blood causes severe fatigue or weakness for weeks.',
      fact: 'Your body restores fluid volume within 24 to 48 hours. Most healthy donors resume normal daily activities after a light snack and rest.'
    },
    {
      myth: 'You can contract an infectious disease like HIV from donating blood.',
      fact: 'Completely false. Every needle and collection set is sterile, individually pre-packaged, used exactly once, and incinerated.'
    },
    {
      myth: 'If I have tattoos or piercings, I can never donate blood.',
      fact: 'In most jurisdictions, you are eligible 3 to 12 months after receiving a tattoo or piercing performed in a state-regulated, sterile shop.'
    },
    {
      myth: 'Donating blood is excruciatingly painful.',
      fact: 'You only feel a mild initial pinch for 2 seconds. The remainder of the collection is virtually painless.'
    }
  ];

  return (
    <div id="education-page" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-100">
            Clinical Knowledge Base
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
            Understanding Blood Donation
          </h1>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Everything you need to know about the donation lifecycle, component separation, biological compatibility, and clinical health protocols.
          </p>
        </div>

        {/* The 4-Step Donation Process */}
        <div className="mb-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl font-extrabold text-slate-900">
              What Happens on Donation Day?
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              From arrival to refreshments, the entire visit typically takes under one hour.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, idx) => (
              <div
                key={idx}
                id={`edu-step-${idx + 1}`}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-black text-red-600 bg-red-100/60 px-2.5 py-1 rounded-lg inline-block mb-3">
                    Step {idx + 1}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 mb-2">{s.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{s.desc}</p>
                </div>
                <div className="pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-slate-500 text-[11px] font-semibold">
                  <Clock className="w-3.5 h-3.5 text-red-500" />
                  <span>Avg Duration: {s.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blood Components Breakdown */}
        <div className="mb-16 p-8 sm:p-10 rounded-3xl bg-slate-900 text-white">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-red-400">
              Component Separation
            </span>
            <h2 className="text-3xl font-extrabold mt-1">
              One Donation. Three Separate Lives Saved.
            </h2>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              When you give whole blood, hospital laboratories centrifuge the unit into three distinct therapeutic components tailored to different emergency patient needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            {components.map((c, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-slate-800 border border-slate-700 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <Droplet className="w-6 h-6 text-red-500 fill-current" />
                  <span className="text-[11px] font-bold text-slate-400 bg-slate-900 px-2.5 py-0.5 rounded-full">
                    {c.shelfLife}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">{c.name}</h4>
                <p className="text-slate-300 leading-relaxed">{c.useCases}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Common Myths vs Medical Facts */}
        <div className="mb-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-100">
              Debunking Misconceptions
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
              Blood Donation Myths vs Medical Truths
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myths.map((m, idx) => (
              <div
                key={idx}
                id={`myth-card-${idx + 1}`}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3"
              >
                <div className="flex items-start gap-2.5 text-xs text-red-700 font-bold">
                  <XCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                  <span>MYTH: "{m.myth}"</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed pt-2 border-t border-slate-200/60">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                  <span>
                    <strong className="text-slate-900 font-bold">FACT: </strong>
                    {m.fact}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strict Medical Disclaimer Notice */}
        <div className="p-6 rounded-3xl bg-amber-50/90 border border-amber-200 mb-12 flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-950 leading-relaxed">
            <h4 className="font-bold text-sm mb-1 text-amber-900">
              Notice Regarding Clinical Eligibility:
            </h4>
            <p>
              LifeDrop does not make clinical determinations, diagnose, or officially certify any person as fit to donate. General guidelines state that donors should be at least 18 years old, weigh at least 50 kg (110 lbs), feel healthy, and observe a minimum 56-day gap between whole blood donations. Formal medical fitness is determined solely on-site by accredited healthcare staff at licensed collection facilities.
            </p>
          </div>
        </div>

        {/* CTA Footer */}
        <div className="text-center">
          <button
            id="edu-register-cta-btn"
            onClick={() => onNavigate('become-donor')}
            className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-colors"
          >
            Register as a Volunteer Donor Now
          </button>
        </div>
      </div>
    </div>
  );
};
