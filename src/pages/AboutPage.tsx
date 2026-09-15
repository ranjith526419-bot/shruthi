import React from 'react';
import { Target, Eye, ShieldCheck, Heart, Users, Lock, CheckCircle2, Building2 } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div id="about-page" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-100">
            About LifeDrop
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Bridging Compassion with Medical Urgency
          </h1>
          <p className="text-base text-slate-600 mt-3 leading-relaxed">
            LifeDrop was conceived with a single life-affirming commitment: no patient should face a critical transfusion delay due to an information gap between available voluntary donors and hospital blood banks.
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 rounded-3xl bg-red-50/60 border border-red-100 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center mb-5 shadow-md shadow-red-600/20">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Our Mission</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                To streamline and safeguard the regional blood supply chain by providing real-time digital infrastructure that connects voluntary donors, healthcare centers, and families in acute need—eliminating shortage bottlenecks with transparent, rapid, and ethical coordination.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-red-200/60 text-xs text-red-800 font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-red-600" />
              <span>Zero commercialization. 100% volunteer-powered public good.</span>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center mb-5">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Our Vision</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                A healthcare ecosystem where emergency surgical delays due to blood unavailability are completely eradicated. We envision connected regional health networks where voluntary donation is celebrated as an everyday civic habit, supported by state-of-the-art inventory tracking.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-red-400" />
              <span>Universal interoperability across hospitals and blood depots.</span>
            </div>
          </div>
        </div>

        {/* How The Platform Works */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              How the Ecosystem Coordinates
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              A synchronized digital pipeline serving four distinct stakeholder groups:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold mb-4">
                1
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1.5">Volunteer Donors</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Register confidential profiles with blood groups and availability toggles. Receive localized emergency pings when matching blood types run critically short.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-4">
                2
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1.5">Blood Seekers & Families</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Search verified hospital stockpiles instantly or submit structured emergency requests with urgency triage and hospital verification.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-4">
                3
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1.5">Hospitals & Blood Banks</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Log real-time inventory lots, track batch expiration dates, review incoming requests, and dispatch prioritized donation calls to regional donors.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold mb-4">
                4
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1.5">Network Administrators</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Verify hospital credentials, audit activity logs, inspect system health, and oversee regional supply-demand equilibrium metrics.
              </p>
            </div>
          </div>
        </div>

        {/* Safety, Privacy & Ethical Principles */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Safety, Privacy & Ethical Standards</h3>
              <p className="text-xs text-slate-500">How we protect personal health information and maintain clinical integrity</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600 leading-relaxed">
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <h5 className="font-bold text-slate-900 text-sm mb-2">No Public Phone Numbers</h5>
              <p>
                LifeDrop strictly forbids exposing donor personal contact numbers or physical addresses on public search pages. All initial contacts occur through secure platform notifications.
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <h5 className="font-bold text-slate-900 text-sm mb-2">Clinical Staff Exclusivity</h5>
              <p>
                LifeDrop does not declare anyone medically fit to donate. Pre-donation health screening, hemoglobin testing, and confidential wellness evaluations are always conducted by licensed medical staff.
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <h5 className="font-bold text-slate-900 text-sm mb-2">Zero Blood Selling Policy</h5>
              <p>
                LifeDrop operates strictly under international voluntary non-remunerated blood donation standards (WHO / Red Cross). Buying or selling human blood through this platform is prohibited and subject to legal referral.
              </p>
            </div>
          </div>
        </div>

        {/* Impact Numbers Banner */}
        <div className="text-center p-10 rounded-3xl bg-gradient-to-r from-red-600 to-red-700 text-white shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Ready to Make a Life-Saving Difference?
          </h3>
          <p className="text-sm text-red-100 max-w-xl mx-auto mb-6">
            Join thousands of registered volunteer donors in your area and stand ready to answer emergency calls.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              id="about-become-donor-btn"
              onClick={() => onNavigate('become-donor')}
              className="px-6 py-3 rounded-xl bg-white text-red-700 font-bold text-xs hover:bg-red-50 transition-colors shadow-md"
            >
              Register as a Donor
            </button>
            <button
              id="about-find-blood-btn"
              onClick={() => onNavigate('find-blood')}
              className="px-6 py-3 rounded-xl bg-red-800/80 hover:bg-red-800 text-white font-bold text-xs transition-colors border border-red-500/40"
            >
              Search Blood Reserves
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
