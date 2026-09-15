import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { BloodGroup, Donor } from '../types';
import { BloodGroupBadge } from '../components/common/BloodGroupBadge';
import { Modal } from '../components/common/Modal';
import { EmptyState } from '../components/common/EmptyState';
import {
  Search,
  Filter,
  MapPin,
  Heart,
  Send,
  ShieldCheck,
  Lock,
  RotateCcw,
  CheckCircle2,
  Calendar
} from 'lucide-react';

export const DonorSearchPage: React.FC = () => {
  const { donors, addToast } = useData();
  const { currentUser } = useAuth();

  const [selectedBloodGroup, setSelectedBloodGroup] = useState<BloodGroup | ''>('');
  const [cityQuery, setCityQuery] = useState('');
  const [availabilityOnly, setAvailabilityOnly] = useState(true);

  // Secure connection request modal
  const [targetDonor, setTargetDonor] = useState<Donor | null>(null);
  const [requestReason, setRequestReason] = useState('');
  const [patientHospital, setPatientHospital] = useState('');

  const bloodGroups: BloodGroup[] = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];

  const filteredDonors = donors.filter((d) => {
    if (selectedBloodGroup && d.bloodGroup !== selectedBloodGroup) return false;
    if (availabilityOnly && !d.isAvailable) return false;
    if (cityQuery) {
      const q = cityQuery.toLowerCase();
      const match =
        d.city.toLowerCase().includes(q) ||
        d.district.toLowerCase().includes(q) ||
        d.state.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const handleSendConnectionRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetDonor) return;

    addToast(
      'Notification Dispatched',
      `An emergency coordination alert has been forwarded to ${targetDonor.fullName.split(' ')[0]} via secure SMS/email without exposing personal contact details.`,
      'success'
    );

    setTargetDonor(null);
    setRequestReason('');
    setPatientHospital('');
  };

  const resetFilters = () => {
    setSelectedBloodGroup('');
    setCityQuery('');
    setAvailabilityOnly(false);
  };

  return (
    <div id="donor-search-page" className="py-10 bg-slate-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-100">
              Verified Volunteer Network
            </span>
            <span className="flex items-center gap-1 text-xs font-bold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
              <Lock className="w-3 h-3 text-emerald-600" />
              <span>PII Shield Enabled</span>
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Donor Registry Search
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Locate voluntary donors by blood type and general district. All communications are mediated through secure platform notifications to ensure donor privacy.
          </p>
        </div>

        {/* Filters Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm mb-8">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Filter className="w-4 h-4 text-red-600" />
              <span>Search Filters</span>
            </div>
            {(selectedBloodGroup || cityQuery || availabilityOnly) && (
              <button
                id="reset-donor-filters-btn"
                onClick={resetFilters}
                className="text-xs text-red-600 hover:text-red-700 font-bold flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Blood Group
              </label>
              <select
                id="donor-search-blood-group"
                value={selectedBloodGroup}
                onChange={(e) => setSelectedBloodGroup(e.target.value as BloodGroup | '')}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white"
              >
                <option value="">All Blood Groups (8 Types)</option>
                {bloodGroups.map((g) => (
                  <option key={g} value={g}>
                    Type {g}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                City / District
              </label>
              <input
                id="donor-search-city"
                type="text"
                placeholder="e.g. Seattle, King County"
                value={cityQuery}
                onChange={(e) => setCityQuery(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white"
              />
            </div>

            <div className="flex items-center h-10">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  id="donor-search-available-only"
                  type="checkbox"
                  checked={availabilityOnly}
                  onChange={(e) => setAvailabilityOnly(e.target.checked)}
                  className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
                />
                <span className="text-xs font-bold text-slate-700">
                  Only show actively available donors
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold text-slate-600">
            Found <span className="text-slate-900 font-extrabold">{filteredDonors.length}</span> registered donors
          </p>
          <span className="text-xs text-slate-500">
            Private details protected under HIPAA & LifeDrop ethics guidelines
          </span>
        </div>

        {/* Donors Grid */}
        {filteredDonors.length === 0 ? (
          <EmptyState
            icon={Search}
            title="No Matching Donors Found"
            description="No registered volunteer donors matched your criteria. You can post an emergency request to broadcast to nearby hospital banks."
            actionLabel="Reset Filters"
            onAction={resetFilters}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDonors.map((donor) => {
              // Privacy safe: Mask full last name (e.g. Elena R.)
              const nameParts = donor.fullName.trim().split(' ');
              const maskedName =
                nameParts.length > 1
                  ? `${nameParts[0]} ${nameParts[1].charAt(0)}.`
                  : nameParts[0];

              return (
                <div
                  key={donor.id}
                  id={`donor-card-${donor.id}`}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all p-6 flex flex-col justify-between"
                >
                  <div>
                    {/* Top: Blood badge & status */}
                    <div className="flex items-start justify-between gap-2 mb-4">
                      <BloodGroupBadge group={donor.bloodGroup} size="lg" showSpecialLabel />
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                          donor.isAvailable
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {donor.isAvailable ? 'Active & Ready' : 'Resting Interval'}
                      </span>
                    </div>

                    {/* Donor name (masked for privacy) */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-sm border border-slate-200">
                        {donor.fullName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">{maskedName}</h3>
                        <p className="text-[11px] text-slate-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{donor.city}, {donor.district}</span>
                        </p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 py-3 border-y border-slate-100 mb-4">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">
                          Donations Given
                        </span>
                        <span className="font-bold text-slate-800">
                          {donor.donationCount} life-saving sessions
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">
                          Last Donated
                        </span>
                        <span className="font-semibold text-slate-800">
                          {donor.lastDonationDate || 'First-time pledge'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div>
                    <button
                      id={`contact-donor-btn-${donor.id}`}
                      onClick={() => setTargetDonor(donor)}
                      disabled={!donor.isAvailable}
                      className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        donor.isAvailable
                          ? 'bg-red-600 hover:bg-red-700 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Request Donation Contact</span>
                    </button>
                    <span className="text-[10px] text-slate-400 text-center block mt-1.5">
                      Phone number protected • Routed via LifeDrop dispatch
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Secure Contact Modal */}
      <Modal
        isOpen={!!targetDonor}
        onClose={() => setTargetDonor(null)}
        title="Send Secure Donation Alert"
        subtitle={targetDonor ? `Reaching out to ${targetDonor.fullName.split(' ')[0]} (${targetDonor.bloodGroup})` : ''}
      >
        {targetDonor && (
          <form onSubmit={handleSendConnectionRequest} className="space-y-4 text-xs">
            <div className="p-3 bg-red-50 rounded-xl border border-red-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-red-950">
                  Donor Type: {targetDonor.bloodGroup} • Region: {targetDonor.city}
                </p>
                <p className="text-[11px] text-slate-600">
                  A high-priority notification will be relayed to this donor's device immediately.
                </p>
              </div>
              <BloodGroupBadge group={targetDonor.bloodGroup} size="sm" />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Treating Hospital / Medical Center *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Seattle Regional Trauma Center"
                value={patientHospital}
                onChange={(e) => setPatientHospital(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Urgency & Clinical Details *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Please describe patient case, required units, and coordination instructions."
                value={requestReason}
                onChange={(e) => setRequestReason(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setTargetDonor(null)}
                className="px-4 py-2 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50 text-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                id="submit-donor-alert-btn"
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-xs transition-colors"
              >
                Dispatch Secure Alert
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};
