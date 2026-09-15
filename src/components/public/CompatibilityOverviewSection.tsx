import React, { useState } from 'react';
import { BloodGroup } from '../../types';
import { BLOOD_COMPATIBILITY_DATA } from '../../data/mockData';
import { BloodGroupBadge } from '../common/BloodGroupBadge';
import { ArrowRight, Check, Sparkles } from 'lucide-react';

interface CompatibilityOverviewSectionProps {
  onNavigateToFull: () => void;
}

export const CompatibilityOverviewSection: React.FC<CompatibilityOverviewSectionProps> = ({
  onNavigateToFull
}) => {
  const [selectedGroup, setSelectedGroup] = useState<BloodGroup>('O-');
  const info = BLOOD_COMPATIBILITY_DATA[selectedGroup];

  const allGroups: BloodGroup[] = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];

  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-100">
            Interactive Biology
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
            Blood Compatibility Matrix
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Select any blood group below to instantly discover who they can safely donate red blood cells to and receive blood from.
          </p>
        </div>

        {/* Group Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {allGroups.map((g) => (
            <button
              key={g}
              id={`compat-select-btn-${g}`}
              onClick={() => setSelectedGroup(g)}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                selectedGroup === g
                  ? 'bg-red-600 text-white border-red-700 shadow-md shadow-red-600/20 scale-105'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Dynamic Compatibility Card */}
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/80 max-w-4xl mx-auto shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <BloodGroupBadge group={selectedGroup} size="lg" showSpecialLabel />
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Type {selectedGroup} Profile
                </h3>
                <p className="text-xs text-slate-500">
                  Approx. {info.prevalencePercentage}% of the global population
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-slate-600">Surface Antigens:</span>
              <span className="px-2.5 py-1 bg-white rounded-lg border border-slate-200 font-bold text-slate-800">
                {info.antigens}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 py-4 leading-relaxed">
            {info.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
            {/* Can Give To */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200/80">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  Can Donate Red Blood Cells To:
                </span>
                <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {info.canGiveTo.length} Groups
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {info.canGiveTo.map((g) => (
                  <BloodGroupBadge key={g} group={g} size="sm" />
                ))}
              </div>
            </div>

            {/* Can Receive From */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200/80">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">
                  Can Safely Receive From:
                </span>
                <span className="text-xs font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                  {info.canReceiveFrom.length} Groups
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {info.canReceiveFrom.map((g) => (
                  <BloodGroupBadge key={g} group={g} size="sm" />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 text-center pt-2">
            <button
              id="view-full-compatibility-chart-btn"
              onClick={onNavigateToFull}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 transition-colors"
            >
              <span>Explore Complete 8x8 Compatibility Matrix</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
