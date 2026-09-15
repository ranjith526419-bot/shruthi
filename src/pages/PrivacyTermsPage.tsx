import React from 'react';
import { ShieldCheck, Lock, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';

export const PrivacyTermsPage: React.FC = () => {
  return (
    <div id="privacy-terms-page" className="py-12 bg-slate-50/50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-100">
            Trust & Governance
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
            Privacy Policy & Terms of Service
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Effective Date: Updated for Current Regional Operating Standard
          </p>
        </div>

        {/* Section 1: Privacy & PII Safeguards */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4 text-xs text-slate-700 leading-relaxed">
          <div className="flex items-center gap-2.5 text-slate-900 font-extrabold text-base pb-3 border-b border-slate-100">
            <Lock className="w-5 h-5 text-red-600" />
            <h2>1. Personal Identifiable Information (PII) Protection</h2>
          </div>

          <p>
            LifeDrop is engineered under privacy-by-design principles. We recognize the profound sensitivity of voluntary donor data and patient medical transfusion needs.
          </p>

          <ul className="space-y-2 pl-4 list-disc text-slate-600">
            <li>
              <strong>No Public Display of Personal Contacts:</strong> Phone numbers, personal email addresses, and specific residential addresses of voluntary donors are strictly barred from public search endpoints.
            </li>
            <li>
              <strong>Mediated Communication:</strong> When an emergency blood request matches a donor profile, the platform issues high-priority digital alerts or mediated SMS notices without exposing either party's personal telephone number.
            </li>
            <li>
              <strong>Authorized Medical Access Only:</strong> Direct donor contact information is made available exclusively to verified, licensed hospital transfusion coordinators when an active match is confirmed for immediate clinical donation.
            </li>
          </ul>
        </div>

        {/* Section 2: Non-Commercialization Standards */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4 text-xs text-slate-700 leading-relaxed">
          <div className="flex items-center gap-2.5 text-slate-900 font-extrabold text-base pb-3 border-b border-slate-100">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h2>2. Voluntary Non-Remunerated Blood Donation (VNRBD)</h2>
          </div>

          <p>
            LifeDrop strictly abides by World Health Organization (WHO) and international standards prohibiting the buying, selling, or commercial broker trading of human blood, plasma, or cellular components.
          </p>

          <p>
            Any user attempting to solicit payment, broker transactions for monetary gain, or misrepresent clinical emergency needs will have their account immediately terminated and will be referred to public health law enforcement authorities.
          </p>
        </div>

        {/* Section 3: Clinical Eligibility & Liability */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4 text-xs text-slate-700 leading-relaxed">
          <div className="flex items-center gap-2.5 text-slate-900 font-extrabold text-base pb-3 border-b border-slate-100">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <h2>3. Clinical Disclaimer & Scope of Service</h2>
          </div>

          <p>
            LifeDrop operates as a communication and inventory tracking coordination software. LifeDrop is not a licensed medical practice and does not administer blood transfusions, conduct biological laboratory cross-matches, or issue medical clearances.
          </p>

          <p>
            All donors understand that registering on LifeDrop does not constitute medical clearance. In-person clinical screening (including vitals, hemoglobin verification, and confidential questionnaire review) is mandatory at the medical facility prior to donation.
          </p>
        </div>
      </div>
    </div>
  );
};
