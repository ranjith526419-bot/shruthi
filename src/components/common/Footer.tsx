import React from 'react';
import { Droplet, PhoneCall, ShieldAlert, Heart, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer id="lifedrop-footer" className="bg-slate-900 text-slate-300 pt-14 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Emergency Hotline Bar */}
        <div className="mb-12 p-5 rounded-2xl bg-red-950/60 border border-red-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-red-900/40">
              <PhoneCall className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">24/7 Critical Blood Emergency Helpline</h4>
              <p className="text-xs text-slate-400">Immediate hospital transfusion coordination support line</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              id="emergency-hotline-call-btn"
              href="tel:18005553767"
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-sm tracking-wide transition-colors shadow-md"
            >
              1-800-555-DROP (3767)
            </a>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center">
                <Droplet className="w-5 h-5 fill-white" />
              </div>
              <span className="text-xl font-extrabold text-white">
                Life<span className="text-red-500">Drop</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              A healthcare coordination platform uniting volunteer blood donors, patients in critical need,
              hospitals, and regional blood banks to ensure safe, timely, and life-saving blood supply.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              <span>Network Status: Normal Operation across 5 Region Hubs</span>
            </div>
          </div>

          {/* Col 1: Public Services */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3.5">
              Blood Services
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  id="footer-link-find-blood"
                  onClick={() => onNavigate('find-blood')}
                  className="hover:text-red-400 transition-colors"
                >
                  Find Blood Availability
                </button>
              </li>
              <li>
                <button
                  id="footer-link-become-donor"
                  onClick={() => onNavigate('become-donor')}
                  className="hover:text-red-400 transition-colors"
                >
                  Register as a Donor
                </button>
              </li>
              <li>
                <button
                  id="footer-link-requests"
                  onClick={() => onNavigate('requests')}
                  className="hover:text-red-400 transition-colors"
                >
                  Emergency Blood Requests
                </button>
              </li>
              <li>
                <button
                  id="footer-link-compatibility"
                  onClick={() => onNavigate('compatibility')}
                  className="hover:text-red-400 transition-colors"
                >
                  Compatibility Chart
                </button>
              </li>
              <li>
                <button
                  id="footer-link-centers"
                  onClick={() => onNavigate('centers')}
                  className="hover:text-red-400 transition-colors"
                >
                  Nearby Blood Centers
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Education & Medical */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3.5">
              Clinical & Knowledge
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  id="footer-link-education"
                  onClick={() => onNavigate('education')}
                  className="hover:text-red-400 transition-colors"
                >
                  Donation Process Guide
                </button>
              </li>
              <li>
                <button
                  id="footer-link-components"
                  onClick={() => onNavigate('education')}
                  className="hover:text-red-400 transition-colors"
                >
                  Blood Component Basics
                </button>
              </li>
              <li>
                <button
                  id="footer-link-faq"
                  onClick={() => onNavigate('about')}
                  className="hover:text-red-400 transition-colors"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  id="footer-link-donor-search"
                  onClick={() => onNavigate('donor-search')}
                  className="hover:text-red-400 transition-colors"
                >
                  Donor Directory (Authorized)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Trust */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3.5">
              Trust & Legal
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  id="footer-link-about"
                  onClick={() => onNavigate('about')}
                  className="hover:text-red-400 transition-colors"
                >
                  About LifeDrop Mission
                </button>
              </li>
              <li>
                <button
                  id="footer-link-privacy"
                  onClick={() => onNavigate('privacy-terms')}
                  className="hover:text-red-400 transition-colors"
                >
                  Privacy Policy & PII Protection
                </button>
              </li>
              <li>
                <button
                  id="footer-link-terms"
                  onClick={() => onNavigate('privacy-terms')}
                  className="hover:text-red-400 transition-colors"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  id="footer-link-admin"
                  onClick={() => onNavigate('admin-dashboard')}
                  className="hover:text-red-400 transition-colors flex items-center gap-1"
                >
                  <span>Admin Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Strict Medical Eligibility Disclaimer */}
        <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 mb-8 flex items-start gap-3 text-xs text-slate-400 leading-relaxed">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <p>
            <strong className="text-slate-200">Medical Disclaimer:</strong> LifeDrop is a communications and inventory tracking platform. LifeDrop does not diagnose, certify clinical eligibility, or provide medical advice. Final medical eligibility, hemoglobin screening, cross-matching, and blood collection must always be conducted by certified healthcare personnel at authorized medical facilities.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} LifeDrop Healthcare Systems. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Built with care to save lives</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
