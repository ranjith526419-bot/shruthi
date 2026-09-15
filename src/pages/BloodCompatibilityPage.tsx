import React, { useState } from 'react';
import { BloodGroup } from '../types';
import { BLOOD_COMPATIBILITY_DATA } from '../data/mockData';
import { BloodGroupBadge } from '../components/common/BloodGroupBadge';
import { Check, X, Info, Sparkles, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export const BloodCompatibilityPage: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  const [selectedGroup, setSelectedGroup] = useState<BloodGroup>('O-');
  const [activeTab, setActiveTab] = useState<'red_cells' | 'plasma'>('red_cells');

  const allGroups: BloodGroup[] = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];

  const currentInfo = BLOOD_COMPATIBILITY_DATA[selectedGroup];

  // Plasma compatibility (Inverse of red cells: AB+ is universal plasma donor, O- can only receive from O-)
  const plasmaCompatMap: Record<BloodGroup, { canGiveTo: BloodGroup[]; canReceiveFrom: BloodGroup[] }> = {
    'AB+': {
      canGiveTo: ['AB+', 'AB-', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-'],
      canReceiveFrom: ['AB+']
    },
    'AB-': {
      canGiveTo: ['AB-', 'A-', 'B-', 'O-'],
      canReceiveFrom: ['AB+', 'AB-']
    },
    'A+': {
      canGiveTo: ['A+', 'A-', 'O+', 'O-'],
      canReceiveFrom: ['AB+', 'A+']
    },
    'A-': {
      canGiveTo: ['A-', 'O-'],
      canReceiveFrom: ['AB+', 'AB-', 'A+', 'A-']
    },
    'B+': {
      canGiveTo: ['B+', 'B-', 'O+', 'O-'],
      canReceiveFrom: ['AB+', 'B+']
    },
    'B-': {
      canGiveTo: ['B-', 'O-'],
      canReceiveFrom: ['AB+', 'AB-', 'B+', 'B-']
    },
    'O+': {
      canGiveTo: ['O+', 'O-'],
      canReceiveFrom: ['AB+', 'A+', 'B+', 'O+']
    },
    'O-': {
      canGiveTo: ['O-'],
      canReceiveFrom: ['AB+', 'AB-', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-']
    }
  };

  const isCompatibleDonor = (donor: BloodGroup, recipient: BloodGroup) => {
    return BLOOD_COMPATIBILITY_DATA[donor].canGiveTo.includes(recipient);
  };

  return (
    <div id="blood-compatibility-page" className="py-12 bg-white min-w-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-100">
            Clinical Education
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
            Interactive Blood Compatibility Chart
          </h1>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Understand how antigens, antibodies, and the Rh factor determine life-saving compatibility during clinical transfusions.
          </p>
        </div>

        {/* Component Tab Selector */}
        <div className="flex justify-center mb-8">
          <div className="p-1 rounded-xl bg-slate-100 inline-flex">
            <button
              id="tab-red-cells"
              onClick={() => setActiveTab('red_cells')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'red_cells'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Red Blood Cells (Most Common)
            </button>
            <button
              id="tab-plasma"
              onClick={() => setActiveTab('plasma')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'plasma'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Plasma Compatibility (Liquid Fraction)
            </button>
          </div>
        </div>

        {/* Interactive Selector Bar */}
        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 mb-10 text-center">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
            Select Your Blood Group to Inspect:
          </label>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {allGroups.map((group) => {
              const isSelected = selectedGroup === group;
              return (
                <button
                  key={group}
                  id={`compatibility-btn-${group}`}
                  onClick={() => setSelectedGroup(group)}
                  className={`px-5 py-3 rounded-2xl text-sm font-extrabold transition-all border ${
                    isSelected
                      ? 'bg-red-600 text-white border-red-700 shadow-md ring-4 ring-red-100 scale-105'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200 shadow-2xs'
                  }`}
                >
                  {group}
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Profile of Selected Blood Group */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-start">
          {/* Left: Summary & Genetics */}
          <div className="lg:col-span-5 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-5">
            <div className="flex items-center gap-3">
              <BloodGroupBadge group={selectedGroup} size="lg" showSpecialLabel />
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Type {selectedGroup}</h3>
                <p className="text-xs text-slate-500">
                  Present in ~{currentInfo.prevalencePercentage}% of donors
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {currentInfo.description}
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-200 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-200/60">
                <span className="text-slate-500">Red Cell Surface Antigens:</span>
                <span className="font-bold text-slate-800">{currentInfo.antigens}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-200/60">
                <span className="text-slate-500">Serum Antibodies:</span>
                <span className="font-bold text-slate-800">{currentInfo.antibodies}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Rh Factor:</span>
                <span className="font-bold text-slate-800">
                  {selectedGroup.includes('+') ? 'Positive (Rh+)' : 'Negative (Rh-)'}
                </span>
              </div>
            </div>

            {selectedGroup === 'O-' && (
              <div className="p-3 bg-red-100 text-red-900 rounded-xl text-xs font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-red-600 shrink-0" />
                <span>Critical in Trauma: Transfused when patient blood type is unknown!</span>
              </div>
            )}
          </div>

          {/* Right: Donor vs Recipient lists */}
          <div className="lg:col-span-7 space-y-6">
            {activeTab === 'red_cells' ? (
              <>
                {/* Can Give Red Cells */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-sm font-extrabold uppercase tracking-wider text-emerald-800">
                        Can Donate Red Blood Cells To ({currentInfo.canGiveTo.length} Groups)
                      </h4>
                      <p className="text-xs text-slate-500">
                        Recipients whose immune systems will safely tolerate {selectedGroup} red cells
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {allGroups.map((g) => {
                      const compatible = currentInfo.canGiveTo.includes(g);
                      return (
                        <div
                          key={g}
                          className={`p-3 rounded-xl border flex items-center justify-between ${
                            compatible
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-900 font-bold'
                              : 'bg-slate-50/50 border-slate-200 text-slate-400 opacity-50'
                          }`}
                        >
                          <span className="text-sm">{g}</span>
                          {compatible ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <X className="w-4 h-4 text-slate-300" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Can Receive Red Cells */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-sm font-extrabold uppercase tracking-wider text-blue-800">
                        Can Safely Receive Red Blood Cells From ({currentInfo.canReceiveFrom.length} Groups)
                      </h4>
                      <p className="text-xs text-slate-500">
                        Compatible donor blood groups that a {selectedGroup} patient can accept
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {allGroups.map((g) => {
                      const compatible = currentInfo.canReceiveFrom.includes(g);
                      return (
                        <div
                          key={g}
                          className={`p-3 rounded-xl border flex items-center justify-between ${
                            compatible
                              ? 'bg-blue-50 border-blue-200 text-blue-900 font-bold'
                              : 'bg-slate-50/50 border-slate-200 text-slate-400 opacity-50'
                          }`}
                        >
                          <span className="text-sm">{g}</span>
                          {compatible ? (
                            <Check className="w-4 h-4 text-blue-600" />
                          ) : (
                            <X className="w-4 h-4 text-slate-300" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              // Plasma Tab
              <>
                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
                  <div className="mb-4">
                    <h4 className="text-sm font-extrabold uppercase tracking-wider text-amber-800">
                      Can Donate Plasma To ({plasmaCompatMap[selectedGroup].canGiveTo.length} Groups)
                    </h4>
                    <p className="text-xs text-slate-500">
                      In plasma transfusion, compatibility is reversed because antibodies are in the plasma fraction.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {allGroups.map((g) => {
                      const compatible = plasmaCompatMap[selectedGroup].canGiveTo.includes(g);
                      return (
                        <div
                          key={g}
                          className={`p-3 rounded-xl border flex items-center justify-between ${
                            compatible
                              ? 'bg-amber-50 border-amber-200 text-amber-900 font-bold'
                              : 'bg-slate-50/50 border-slate-200 text-slate-400 opacity-50'
                          }`}
                        >
                          <span className="text-sm">{g}</span>
                          {compatible ? (
                            <Check className="w-4 h-4 text-amber-600" />
                          ) : (
                            <X className="w-4 h-4 text-slate-300" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
                  <div className="mb-4">
                    <h4 className="text-sm font-extrabold uppercase tracking-wider text-blue-800">
                      Can Receive Plasma From ({plasmaCompatMap[selectedGroup].canReceiveFrom.length} Groups)
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {allGroups.map((g) => {
                      const compatible = plasmaCompatMap[selectedGroup].canReceiveFrom.includes(g);
                      return (
                        <div
                          key={g}
                          className={`p-3 rounded-xl border flex items-center justify-between ${
                            compatible
                              ? 'bg-blue-50 border-blue-200 text-blue-900 font-bold'
                              : 'bg-slate-50/50 border-slate-200 text-slate-400 opacity-50'
                          }`}
                        >
                          <span className="text-sm">{g}</span>
                          {compatible ? (
                            <Check className="w-4 h-4 text-blue-600" />
                          ) : (
                            <X className="w-4 h-4 text-slate-300" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Master 8x8 Compatibility Reference Matrix */}
        <div className="mt-14 pt-8 border-t border-slate-200">
          <div className="mb-6">
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Full 8x8 Red Blood Cell Matrix
            </h3>
            <p className="text-xs text-slate-500">
              Donor blood group shown on the vertical axis (rows); recipient group shown horizontally (columns).
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
            <table className="w-full text-center text-xs">
              <thead className="bg-slate-100 text-slate-700 font-extrabold border-b border-slate-200">
                <tr>
                  <th className="p-3 text-left bg-slate-200 text-slate-900">Donor \ Recipient</th>
                  {allGroups.map((g) => (
                    <th key={g} className="p-3">
                      {g}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {allGroups.map((donor) => (
                  <tr key={donor} className="hover:bg-slate-50">
                    <td className="p-3 text-left font-bold text-slate-900 bg-slate-50 border-r border-slate-200">
                      {donor}
                    </td>
                    {allGroups.map((recipient) => {
                      const match = isCompatibleDonor(donor, recipient);
                      return (
                        <td
                          key={recipient}
                          className={`p-2.5 ${
                            match ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-slate-300'
                          }`}
                        >
                          {match ? (
                            <Check className="w-4 h-4 mx-auto text-emerald-600" />
                          ) : (
                            <span className="text-slate-300">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 p-8 rounded-3xl bg-red-50 border border-red-100 text-center">
          <h4 className="text-lg font-bold text-slate-900 mb-2">
            Know Your Type? Put It To Life-Saving Use
          </h4>
          <p className="text-xs text-slate-600 max-w-md mx-auto mb-5">
            Register your blood profile so emergency teams can notify you when a patient with a matching type is in need.
          </p>
          <button
            id="compatibility-cta-register"
            onClick={() => onNavigate('become-donor')}
            className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
          >
            Register as a Volunteer Donor
          </button>
        </div>
      </div>
    </div>
  );
};
