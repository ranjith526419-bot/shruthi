import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { BloodGroup } from '../../types';
import { BloodGroupBadge } from '../common/BloodGroupBadge';
import { Modal } from '../common/Modal';
import {
  Heart,
  Calendar,
  Clock,
  ShieldCheck,
  Award,
  AlertCircle,
  CheckCircle2,
  MapPin,
  QrCode,
  Share2,
  ChevronRight,
  Sparkles,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

interface DonorDashboardProps {
  onNavigateToRequests: () => void;
}

export const DonorDashboard: React.FC<DonorDashboardProps> = ({ onNavigateToRequests }) => {
  const { currentUser } = useAuth();
  const { donors, requests, toggleDonorAvailability, respondToRequest } = useData();

  const defaultDonorProfile = {
    id: currentUser?.id ? `donor_${currentUser.id}` : 'donor_default',
    userId: currentUser?.id || 'user_donor_1',
    fullName: currentUser?.displayName || 'Volunteer Donor',
    email: currentUser?.email || 'donor@lifedrop.org',
    bloodGroup: (currentUser?.bloodGroup || 'O-') as BloodGroup,
    city: currentUser?.city || 'Seattle',
    district: 'King County',
    state: currentUser?.state || 'WA',
    phone: currentUser?.phone || '(555) 019-2834',
    isAvailable: true,
    lastDonationDate: '2025-01-15',
    donationCount: 3,
    registeredAt: new Date().toISOString()
  };

  // Find donor profile matching current user
  const donorProfile = donors.find((d) => d.userId === currentUser?.id) || donors[0] || defaultDonorProfile;

  const [isDigitalCardOpen, setIsDigitalCardOpen] = useState(false);

  // Eligible date calculation: 56 days after last donation
  const lastDate = donorProfile.lastDonationDate
    ? new Date(donorProfile.lastDonationDate)
    : new Date('2025-01-15');

  const nextEligibleDate = new Date(lastDate.getTime() + 56 * 24 * 60 * 60 * 1000);
  const now = new Date();
  const isEligibleNow = now >= nextEligibleDate;

  const daysRemaining = Math.max(
    0,
    Math.ceil((nextEligibleDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  );

  // Matching local requests for donor's blood group
  const matchingRequests = requests.filter(
    (r) =>
      r.status !== 'fulfilled' &&
      r.status !== 'cancelled' &&
      (r.bloodGroup === donorProfile.bloodGroup || donorProfile.bloodGroup === 'O-')
  );

  // Gamified Badge Level
  const getBadgeTier = (count: number) => {
    if (count >= 10) return { name: 'Platinum Life Guardian', color: 'text-purple-700 bg-purple-100 border-purple-300' };
    if (count >= 5) return { name: 'Gold Life Saver', color: 'text-amber-700 bg-amber-100 border-amber-300' };
    if (count >= 2) return { name: 'Silver Guardian', color: 'text-slate-700 bg-slate-200 border-slate-300' };
    return { name: 'Bronze Donor Pioneer', color: 'text-orange-700 bg-orange-100 border-orange-200' };
  };

  const badge = getBadgeTier(donorProfile.donationCount);

  return (
    <div id="donor-dashboard" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
              Volunteer Donor Portal
            </span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-md border ${badge.color}`}>
              {badge.name}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Welcome back, {donorProfile.fullName}
          </h1>
          <p className="text-xs sm:text-sm text-red-100 max-w-xl">
            Your generous contributions have helped stabilize emergency reserves. Thank you for being a reliable beacon of life.
          </p>
        </div>

        <div className="flex items-center gap-3 self-stretch sm:self-auto">
          <button
            id="donor-view-card-btn"
            onClick={() => setIsDigitalCardOpen(true)}
            className="flex-1 sm:flex-none px-4 py-2.5 bg-white text-red-700 rounded-xl font-bold text-xs shadow-sm hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
          >
            <QrCode className="w-4 h-4" />
            <span>Digital Donor ID</span>
          </button>
        </div>
      </div>

      {/* Primary Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {/* Blood Group Profile */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            My Blood Type
          </span>
          <div className="flex items-center justify-between">
            <BloodGroupBadge group={donorProfile.bloodGroup} size="lg" showSpecialLabel />
            <span className="text-xs text-slate-500 font-semibold">{donorProfile.city}</span>
          </div>
        </div>

        {/* Availability Toggle */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Emergency Readiness Status
          </span>
          <div className="flex items-center justify-between mt-2">
            <span
              className={`text-xs font-extrabold px-2.5 py-1 rounded-lg ${
                donorProfile.isAvailable
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {donorProfile.isAvailable ? 'Actively Available' : 'Resting / Inactive'}
            </span>
            <button
              id="donor-toggle-availability-btn"
              onClick={() => toggleDonorAvailability(donorProfile.id)}
              className="text-slate-400 hover:text-red-600 transition-colors"
              title="Toggle availability"
            >
              {donorProfile.isAvailable ? (
                <ToggleRight className="w-8 h-8 text-emerald-600" />
              ) : (
                <ToggleLeft className="w-8 h-8 text-slate-400" />
              )}
            </button>
          </div>
        </div>

        {/* Donations Counter */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Lifetime Donations
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black text-slate-900">
              {donorProfile.donationCount}
            </span>
            <span className="text-xs text-slate-500">Pints Donated</span>
          </div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-1">
            ~{donorProfile.donationCount * 3} Potential Lives Touched
          </span>
        </div>

        {/* Next Eligible Donation */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Next Clinical Eligibility
          </span>
          <div className="flex items-center gap-2 mt-1">
            <Calendar className="w-5 h-5 text-red-600 shrink-0" />
            <div>
              <span className="text-sm font-extrabold text-slate-900 block">
                {isEligibleNow ? 'Eligible Today!' : nextEligibleDate.toLocaleDateString()}
              </span>
              <span className="text-[11px] text-slate-500">
                {isEligibleNow ? 'Ready for donation appointment' : `${daysRemaining} days remaining in interval`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Urgent Requests Matching Donor */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2 mb-6">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">
              Urgent Requests Matching Your Type ({donorProfile.bloodGroup})
            </h3>
            <p className="text-xs text-slate-500">
              Patients in your hospital district currently waiting for matching blood.
            </p>
          </div>

          <button
            id="donor-view-all-requests"
            onClick={onNavigateToRequests}
            className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All Regional Requests</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {matchingRequests.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200/60 text-slate-500 text-xs">
            There are currently no urgent pending requests for blood type {donorProfile.bloodGroup}.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matchingRequests.map((r) => (
              <div
                key={r.id}
                className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <BloodGroupBadge group={r.bloodGroup} size="sm" />
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        r.urgency === 'critical'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {r.urgency}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900">
                    {r.unitsRequired} Units Required for {r.patientName}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    {r.hospitalName} ({r.city})
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    Needed by: {r.requiredDate}
                  </span>
                  <button
                    id={`donor-pledge-req-${r.id}`}
                    onClick={() => respondToRequest(r.id, donorProfile.fullName)}
                    className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                  >
                    I Can Donate
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Historical Donation Log */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <h3 className="text-lg font-extrabold text-slate-900 mb-4">
          Verified Donation History
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Date</th>
                <th className="p-3">Type</th>
                <th className="p-3">Facility</th>
                <th className="p-3">Units Collected</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-800">2025-01-15</td>
                <td className="p-3">Whole Blood</td>
                <td className="p-3">Cascade Regional Blood Services</td>
                <td className="p-3">1 Unit (450 mL)</td>
                <td className="p-3">
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Completed & Transfused</span>
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-800">2024-10-22</td>
                <td className="p-3">Whole Blood</td>
                <td className="p-3">Seattle Metro Health Bank</td>
                <td className="p-3">1 Unit (450 mL)</td>
                <td className="p-3">
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Completed</span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Digital Donor ID Modal */}
      <Modal
        isOpen={isDigitalCardOpen}
        onClose={() => setIsDigitalCardOpen(false)}
        title="Official Digital Donor Card"
        subtitle="Present this card during collection check-in"
      >
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-red-950 text-white shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              <span className="font-extrabold tracking-wider text-sm uppercase">
                LifeDrop Registry Card
              </span>
            </div>
            <span className="text-[10px] bg-red-600 px-2 py-0.5 rounded font-bold uppercase">
              Verified
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-bold">
                Donor Name
              </span>
              <span className="text-base font-black tracking-wide">{donorProfile.fullName}</span>
              <span className="text-xs text-slate-400 block mt-0.5">
                ID: LD-DN-{donorProfile.id.toUpperCase()}
              </span>
            </div>
            <BloodGroupBadge group={donorProfile.bloodGroup} size="lg" showSpecialLabel />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-white/10">
            <div>
              <span className="text-[10px] text-slate-400 block">Home District</span>
              <span className="font-semibold">{donorProfile.city}, {donorProfile.district}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Honor Tier</span>
              <span className="font-semibold text-amber-400">{badge.name}</span>
            </div>
          </div>

          <div className="pt-2 text-center bg-white/5 p-3 rounded-xl">
            <div className="w-24 h-24 bg-white mx-auto rounded-lg p-1.5 flex items-center justify-center">
              <QrCode className="w-20 h-20 text-slate-900" />
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Scan at reception for instant express check-in
            </span>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setIsDigitalCardOpen(false)}
            className="px-4 py-2 border border-slate-200 rounded-xl font-semibold text-xs text-slate-700 hover:bg-slate-50"
          >
            Close Card
          </button>
        </div>
      </Modal>
    </div>
  );
};
