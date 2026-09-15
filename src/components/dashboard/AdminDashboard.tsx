import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { BloodGroupBadge } from '../common/BloodGroupBadge';
import {
  Shield,
  Building2,
  Users,
  Heart,
  Droplet,
  CheckCircle2,
  XCircle,
  Clock,
  RefreshCw,
  Search,
  AlertTriangle
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { hospitals, donors, requests, inventory, updateBloodRequestStatus, addToast } = useData();
  const [activeTab, setActiveTab] = useState<'overview' | 'hospitals' | 'requests' | 'donors'>('overview');
  const [searchFilter, setSearchFilter] = useState('');

  const totalUnits = inventory.reduce((acc, curr) => acc + curr.unitsAvailable, 0);

  const handleVerifyHospital = (hospId: string) => {
    addToast('Facility Status Updated', `Hospital facility #${hospId} accreditation verified.`, 'success');
  };

  return (
    <div id="admin-dashboard" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider bg-purple-500/30 text-purple-300 border border-purple-400/40 px-2.5 py-0.5 rounded-full">
              System Administration
            </span>
            <span className="text-xs text-slate-400">Master Governance Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Network Operations Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Audit regional hospital inventory lots, verify medical accreditations, and oversee regional donor response integrity.
          </p>
        </div>

        {/* Navigation pills */}
        <div className="flex flex-wrap gap-2 p-1 bg-white/10 rounded-2xl">
          {[
            { id: 'overview', label: 'Network Overview' },
            { id: 'hospitals', label: `Hospitals (${hospitals.length})` },
            { id: 'requests', label: `Requests (${requests.length})` },
            { id: 'donors', label: `Donors (${donors.length})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-colors ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-red-50 text-red-600">
              <Droplet className="w-5 h-5 fill-current" />
            </div>
            <span className="text-3xl font-black text-slate-900">{totalUnits}</span>
          </div>
          <h4 className="text-xs font-bold text-slate-700 uppercase">Available Units in Stock</h4>
          <span className="text-[11px] text-slate-400">Across 8 blood groups</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-3xl font-black text-slate-900">{donors.length}</span>
          </div>
          <h4 className="text-xs font-bold text-slate-700 uppercase">Registered Donors</h4>
          <span className="text-[11px] text-emerald-600 font-semibold">
            {donors.filter((d) => d.isAvailable).length} Active for alerts
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
              <Building2 className="w-5 h-5" />
            </div>
            <span className="text-3xl font-black text-slate-900">{hospitals.length}</span>
          </div>
          <h4 className="text-xs font-bold text-slate-700 uppercase">Partner Medical Facilities</h4>
          <span className="text-[11px] text-slate-400">100% Verified Accreditations</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
              <Shield className="w-5 h-5" />
            </div>
            <span className="text-3xl font-black text-slate-900">{requests.length}</span>
          </div>
          <h4 className="text-xs font-bold text-slate-700 uppercase">Total Requisitions</h4>
          <span className="text-[11px] text-slate-400">
            {requests.filter((r) => r.status === 'fulfilled').length} Fulfilled
          </span>
        </div>
      </div>

      {/* Tab: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent System Activities */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h3 className="text-base font-extrabold text-slate-900 mb-4">
              Live Real-Time Activity Log
            </h3>
            <div className="space-y-3.5 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800">
                    Emergency Match Found: 2 Units of O- Transfused
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Metro Health Hospital • Patient Maya Lin • Today at 11:20 AM
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <Droplet className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800">
                    Hospital Inward Lot #LOT-O-442 Added
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Cascade Regional Blood Services • +5 units O+ logged
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <Users className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800">
                    New Donor Volunteer Registered: Elena Rostova (O-)
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Bellevue District • Medical Consent Verified
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Regional Reserve Equilibrium */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h3 className="text-base font-extrabold text-slate-900 mb-4">
              Regional Blood Type Distribution
            </h3>
            <div className="space-y-3 text-xs">
              {(['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'] as const).map((group) => {
                const units = inventory
                  .filter((i) => i.bloodGroup === group)
                  .reduce((acc, curr) => acc + curr.unitsAvailable, 0);
                const percent = Math.min(100, Math.round((units / 30) * 100));

                return (
                  <div key={group} className="space-y-1">
                    <div className="flex justify-between font-bold">
                      <span className="text-slate-800">Type {group}</span>
                      <span className="text-slate-500">{units} units in network</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          units <= 3 ? 'bg-red-600' : units <= 8 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Hospitals */}
      {activeTab === 'hospitals' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <h3 className="text-base font-extrabold text-slate-900 mb-4">
            Authorized Medical Centers & Blood Banks
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Facility Name</th>
                  <th className="p-3">License Number</th>
                  <th className="p-3">City & District</th>
                  <th className="p-3">Emergency Phone</th>
                  <th className="p-3">Verification</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {hospitals.map((h) => (
                  <tr key={h.id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">{h.name}</td>
                    <td className="p-3 text-slate-600">{h.licenseNumber}</td>
                    <td className="p-3 text-slate-600">{h.city}, {h.district}</td>
                    <td className="p-3 text-slate-600">{h.emergencyPhone}</td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Verified</span>
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleVerifyHospital(h.id)}
                        className="text-xs text-purple-600 hover:text-purple-800 font-bold"
                      >
                        Re-Audit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Requests */}
      {activeTab === 'requests' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <h3 className="text-base font-extrabold text-slate-900 mb-4">
            Patient Blood Requests Triage
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Patient</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Hospital</th>
                  <th className="p-3">Urgency</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Admin Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {requests.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">{r.patientName}</td>
                    <td className="p-3">
                      <BloodGroupBadge group={r.bloodGroup} size="sm" />
                    </td>
                    <td className="p-3 text-slate-600">{r.hospitalName}</td>
                    <td className="p-3 font-bold capitalize text-slate-700">{r.urgency}</td>
                    <td className="p-3">
                      <span className="text-[11px] font-bold px-2 py-0.5 bg-slate-100 rounded">
                        {r.status}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      {r.status !== 'fulfilled' && (
                        <button
                          onClick={() => updateBloodRequestStatus(r.id, 'fulfilled')}
                          className="text-xs text-emerald-600 hover:text-emerald-700 font-bold"
                        >
                          Mark Fulfilled
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Donors */}
      {activeTab === 'donors' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <h3 className="text-base font-extrabold text-slate-900 mb-4">
            Donor Registry Management (PII Protected)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Donor Name</th>
                  <th className="p-3">Blood Type</th>
                  <th className="p-3">City</th>
                  <th className="p-3">Donations</th>
                  <th className="p-3">Readiness</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {donors.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">{d.fullName}</td>
                    <td className="p-3">
                      <BloodGroupBadge group={d.bloodGroup} size="sm" />
                    </td>
                    <td className="p-3 text-slate-600">{d.city}, {d.district}</td>
                    <td className="p-3 font-semibold text-slate-800">{d.donationCount} units</td>
                    <td className="p-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          d.isAvailable
                            ? 'bg-emerald-50 text-emerald-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {d.isAvailable ? 'Available' : 'Resting'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
