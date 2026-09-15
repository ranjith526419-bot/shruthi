import React, { useState } from 'react';
import { BloodGroup } from '../../types';
import { BloodGroupBadge } from '../common/BloodGroupBadge';
import { Heart, Search, ArrowRight, ShieldCheck, Clock, Users } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (tab: string, filter?: { bloodGroup?: BloodGroup; city?: string }) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const [quickBloodGroup, setQuickBloodGroup] = useState<BloodGroup | ''>('');
  const [quickCity, setQuickCity] = useState('');

  const bloodGroups: BloodGroup[] = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('find-blood', {
      bloodGroup: quickBloodGroup || undefined,
      city: quickCity || undefined
    });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-red-50/70 via-white to-white pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-100 text-red-800 text-xs font-bold tracking-wide">
              <Heart className="w-3.5 h-3.5 fill-red-600 text-red-600 animate-pulse" />
              <span>Real-Time Healthcare Blood Network</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              Donate Blood, <br className="hidden sm:inline" />
              <span className="text-red-600">Save Lives</span> Today.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              LifeDrop connects voluntary donors, patients in urgent need, hospitals, and blood banks.
              Find available compatible units in seconds or register to become a life-saving hero in your community.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                id="hero-become-donor-btn"
                onClick={() => onNavigate('become-donor')}
                className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md shadow-red-600/20 transition-all flex items-center gap-2 group"
              >
                <span>Become a Donor</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                id="hero-find-blood-btn"
                onClick={() => onNavigate('find-blood')}
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 shadow-xs transition-colors flex items-center gap-2"
              >
                <Search className="w-4 h-4 text-red-600" />
                <span>Find Blood</span>
              </button>

              <button
                id="hero-request-blood-btn"
                onClick={() => onNavigate('blood-request-form')}
                className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-xs transition-colors"
              >
                <span>Request Blood</span>
              </button>
            </div>

            {/* Micro Trust Indicators */}
            <div className="pt-4 grid grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0 text-left border-t border-slate-200/80">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-700">Verified Facilities</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-red-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-700">24/7 Rapid Triage</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-700">Privacy Protected</span>
              </div>
            </div>
          </div>

          {/* Quick Find Blood Widget Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 relative">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">Instant Blood Search</h3>
                  <p className="text-xs text-slate-500">Check hospital inventory in real-time</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold text-sm">
                  <Search className="w-4 h-4" />
                </div>
              </div>

              <form onSubmit={handleQuickSearch} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Select Blood Group Needed
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {bloodGroups.map((group) => {
                      const isSelected = quickBloodGroup === group;
                      return (
                        <button
                          key={group}
                          type="button"
                          id={`quick-blood-select-${group}`}
                          onClick={() => setQuickBloodGroup(isSelected ? '' : group)}
                          className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-all ${
                            isSelected
                              ? 'bg-red-600 text-white border-red-700 shadow-xs ring-2 ring-red-300'
                              : 'bg-slate-50 hover:bg-red-50/60 text-slate-700 border-slate-200'
                          }`}
                        >
                          {group}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    City or Location
                  </label>
                  <input
                    id="quick-search-city-input"
                    type="text"
                    placeholder="e.g. Seattle, Bellevue, Kirkland"
                    value={quickCity}
                    onChange={(e) => setQuickCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-slate-50/50"
                  />
                </div>

                <button
                  id="hero-quick-search-submit-btn"
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition-colors shadow-md shadow-red-600/20 flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>Check Availability Now</span>
                </button>
              </form>

              {/* Universal Donor Quick Highlight */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span className="font-semibold">Universal Red Cell Donor:</span>
                <BloodGroupBadge group="O-" size="sm" showSpecialLabel />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
