import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { BloodGroup, BloodInventoryItem, Hospital } from '../../types';
import { BloodGroupBadge } from '../common/BloodGroupBadge';
import { Modal } from '../common/Modal';
import {
  Building2,
  Plus,
  Minus,
  AlertTriangle,
  Radio,
  CheckCircle2,
  Clock,
  Send,
  PackagePlus,
  ShieldCheck,
  Calendar,
  Layers
} from 'lucide-react';

export const HospitalDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { inventory, hospitals, requests, updateInventoryUnits, updateBloodRequestStatus, addToast } = useData();

  const defaultHospital: Hospital = {
    id: 'hosp_metro',
    name: currentUser?.displayName || 'Metro Health Medical Center & Blood Bank',
    city: currentUser?.city || 'Seattle',
    district: 'Downtown Core',
    state: 'WA',
    address: '1100 9th Ave, Seattle, WA 98101',
    phone: '(206) 555-0144',
    contactPhone: '(206) 555-0144',
    emergencyPhone: '(206) 555-9999',
    licenseNumber: 'WA-DOH-88291',
    email: currentUser?.email || 'transfusion@metrohealth.org',
    type: 'hospital',
    operatingHours: '24/7 Transfusion Trauma Center',
    isVerified: true,
    totalUnitsInStock: 24,
    coordinates: { lat: 47.6097, lng: -122.3256 }
  };

  // Find current hospital facility or default to Metro Health
  const hospital = hospitals.find((h) => h.id === 'hosp_metro') || hospitals[0] || defaultHospital;

  const hospitalInventory = inventory.filter((i) => i.hospitalId === hospital.id);

  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);
  const [broadcastGroup, setBroadcastGroup] = useState<BloodGroup>('O-');
  const [broadcastUnits, setBroadcastUnits] = useState(4);
  const [broadcastNote, setBroadcastNote] = useState('');

  const [isAddBatchModalOpen, setIsAddBatchModalOpen] = useState(false);
  const [batchGroup, setBatchGroup] = useState<BloodGroup>('A+');
  const [batchUnits, setBatchUnits] = useState(2);
  const [batchExpiry, setBatchExpiry] = useState(
    new Date(Date.now() + 35 * 86400000).toISOString().split('T')[0]
  );

  const totalUnits = hospitalInventory.reduce((acc, curr) => acc + curr.unitsAvailable, 0);

  const allGroups: BloodGroup[] = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];

  const handleBroadcastAlert = (e: React.FormEvent) => {
    e.preventDefault();
    addToast(
      'Emergency Alert Broadcasted',
      `Critical shortage alert for ${broadcastUnits} units of ${broadcastGroup} blood dispatched to regional donors registered in ${hospital.city}.`,
      'success'
    );
    setIsBroadcastModalOpen(false);
  };

  const handleAddBatch = (e: React.FormEvent) => {
    e.preventDefault();
    const existing = hospitalInventory.find((i) => i.bloodGroup === batchGroup);
    if (existing) {
      updateInventoryUnits(existing.id, existing.unitsAvailable + batchUnits);
    }
    addToast(
      'Inventory Stock Updated',
      `Added ${batchUnits} units of ${batchGroup} (Exp: ${batchExpiry}) to active hospital reserve.`,
      'success'
    );
    setIsAddBatchModalOpen(false);
  };

  return (
    <div id="hospital-dashboard" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
              Hospital Transfusion Service
            </span>
            {hospital.isVerified && (
              <span className="text-xs font-bold bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 px-2 py-0.5 rounded-md flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Verified Facility #{hospital.licenseNumber}</span>
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{hospital.name}</h1>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl">
            {hospital.address}, {hospital.city}, {hospital.state} • 24/7 Desk: {hospital.emergencyPhone}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 self-stretch sm:self-auto">
          <button
            id="hospital-broadcast-alert-btn"
            onClick={() => setIsBroadcastModalOpen(true)}
            className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <Radio className="w-4 h-4 animate-pulse" />
            <span>Broadcast Urgent Need</span>
          </button>

          <button
            id="hospital-add-batch-btn"
            onClick={() => setIsAddBatchModalOpen(true)}
            className="px-4 py-2.5 bg-white text-emerald-800 hover:bg-emerald-50 rounded-xl font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <PackagePlus className="w-4 h-4" />
            <span>Log Inward Batch</span>
          </button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Total Whole Blood & Component Units
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{totalUnits}</span>
            <span className="text-xs text-slate-500">Pints in cold storage</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Critically Low Types (&lt; 4 units)
          </span>
          <span className="text-3xl font-black text-amber-600">
            {hospitalInventory.filter((i) => i.unitsAvailable <= 3).length}
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Active Hospital Blood Requests
          </span>
          <span className="text-3xl font-black text-blue-600">{requests.length}</span>
        </div>
      </div>

      {/* Inventory Matrix Table (All 8 Groups) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">
              Live Blood Group Reserve Management
            </h3>
            <p className="text-xs text-slate-500">
              Directly adjust stock units after clinical collection, cross-match release, or emergency issue.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {allGroups.map((group) => {
            const item = hospitalInventory.find((i) => i.bloodGroup === group);
            const units = item ? item.unitsAvailable : 0;
            const isCritical = units <= 2;
            const isLow = units > 2 && units <= 5;

            return (
              <div
                key={group}
                id={`inventory-mgmt-box-${group}`}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <BloodGroupBadge group={group} size="md" showSpecialLabel />
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                        isCritical
                          ? 'bg-red-100 text-red-800 border-red-200 animate-pulse'
                          : isLow
                          ? 'bg-amber-100 text-amber-800 border-amber-200'
                          : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      }`}
                    >
                      {isCritical ? 'Critical' : isLow ? 'Low' : 'Adequate'}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-1 my-2">
                    <span className="text-3xl font-black text-slate-900">{units}</span>
                    <span className="text-xs text-slate-500 font-semibold">units</span>
                  </div>
                </div>

                {/* Counter controls */}
                <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between gap-2">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Adjust:</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      id={`decrement-stock-${group}`}
                      disabled={units <= 0 || !item}
                      onClick={() => item && updateInventoryUnits(item.id, units - 1)}
                      className="w-7 h-7 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-30 font-bold flex items-center justify-center transition-colors shadow-2xs"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      id={`increment-stock-${group}`}
                      disabled={!item}
                      onClick={() => item && updateInventoryUnits(item.id, units + 1)}
                      className="w-7 h-7 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-30 font-bold flex items-center justify-center transition-colors shadow-2xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hospital Requisition Queue */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <h3 className="text-lg font-extrabold text-slate-900 mb-2">Hospital Requisition Queue</h3>
        <p className="text-xs text-slate-500 mb-6">Patient blood requisitions routed to this medical center</p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Patient</th>
                <th className="p-3">Blood Type</th>
                <th className="p-3">Units Needed</th>
                <th className="p-3">Urgency</th>
                <th className="p-3">Required By</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {requests.slice(0, 5).map((req) => (
                <tr key={req.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">{req.patientName}</td>
                  <td className="p-3">
                    <BloodGroupBadge group={req.bloodGroup} size="sm" />
                  </td>
                  <td className="p-3 font-semibold">{req.unitsRequired} Units</td>
                  <td className="p-3">
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        req.urgency === 'critical'
                          ? 'bg-red-100 text-red-800'
                          : req.urgency === 'urgent'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {req.urgency}
                    </span>
                  </td>
                  <td className="p-3 text-slate-600">{req.requiredDate}</td>
                  <td className="p-3">
                    <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      {req.status}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-1">
                    {req.status !== 'fulfilled' && (
                      <button
                        onClick={() => updateBloodRequestStatus(req.id, 'fulfilled')}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px]"
                      >
                        Fulfill
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Broadcast Alert Modal */}
      <Modal
        isOpen={isBroadcastModalOpen}
        onClose={() => setIsBroadcastModalOpen(false)}
        title="Broadcast Emergency Donor Alert"
        subtitle={`Dispatch urgent notification across ${hospital.city} region`}
      >
        <form onSubmit={handleBroadcastAlert} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Select Blood Group in Critical Shortage *
            </label>
            <select
              value={broadcastGroup}
              onChange={(e) => setBroadcastGroup(e.target.value as BloodGroup)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-bold text-red-700"
            >
              {allGroups.map((g) => (
                <option key={g} value={g}>
                  Type {g}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Minimum Units Required Immediately *
            </label>
            <input
              type="number"
              min={1}
              max={20}
              required
              value={broadcastUnits}
              onChange={(e) => setBroadcastUnits(Number(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Hospital Clinical Message / Instructions
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Trauma unit emergency. Direct priority donor intake open in Wing B transfusion desk."
              value={broadcastNote}
              onChange={(e) => setBroadcastNote(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsBroadcastModalOpen(false)}
              className="px-4 py-2 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-xs"
            >
              Dispatch Broadcast Now
            </button>
          </div>
        </form>
      </Modal>

      {/* Add Inward Batch Modal */}
      <Modal
        isOpen={isAddBatchModalOpen}
        onClose={() => setIsAddBatchModalOpen(false)}
        title="Log Inward Blood Batch"
        subtitle="Record tested and cleared units into hospital reserve"
      >
        <form onSubmit={handleAddBatch} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Blood Group *
            </label>
            <select
              value={batchGroup}
              onChange={(e) => setBatchGroup(e.target.value as BloodGroup)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-bold text-red-700"
            >
              {allGroups.map((g) => (
                <option key={g} value={g}>
                  Type {g}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Units Tested & Released *
            </label>
            <input
              type="number"
              min={1}
              max={50}
              required
              value={batchUnits}
              onChange={(e) => setBatchUnits(Number(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Laboratory Expiry Date *
            </label>
            <input
              type="date"
              required
              value={batchExpiry}
              onChange={(e) => setBatchExpiry(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAddBatchModalOpen(false)}
              className="px-4 py-2 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs"
            >
              Confirm Batch Ingestion
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
