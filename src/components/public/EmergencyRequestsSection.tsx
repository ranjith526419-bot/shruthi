import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { BloodRequest } from '../../types';
import { BloodGroupBadge } from '../common/BloodGroupBadge';
import { Modal } from '../common/Modal';
import { AlertCircle, Clock, MapPin, Building, ArrowRight, HeartHandshake, Phone } from 'lucide-react';

interface EmergencyRequestsSectionProps {
  onNavigateToRequestForm: () => void;
  onNavigateToAllRequests: () => void;
}

export const EmergencyRequestsSection: React.FC<EmergencyRequestsSectionProps> = ({
  onNavigateToRequestForm,
  onNavigateToAllRequests
}) => {
  const { requests, respondToRequest } = useData();
  const { currentUser } = useAuth();

  const [selectedRequest, setSelectedRequest] = useState<BloodRequest | null>(null);
  const [donorNameInput, setDonorNameInput] = useState(currentUser?.displayName || '');
  const [donorPhoneInput, setDonorPhoneInput] = useState(currentUser?.phone || '');

  // Filter urgent & critical requests that are pending or in progress
  const urgentRequests = requests
    .filter((r) => r.status !== 'fulfilled' && r.status !== 'cancelled')
    .slice(0, 3);

  const handleRespond = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequest) return;
    respondToRequest(selectedRequest.id, donorNameInput || 'Anonymous Hero');
    setSelectedRequest(null);
  };

  return (
    <section className="py-16 bg-red-50/40 border-b border-red-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold mb-2">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Urgent Patient Needs</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Emergency Blood Requests
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Real patients in regional hospitals requiring urgent transfusions. If you match the required blood group and are in good health, your donation can save a life today.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="emergency-section-view-all-btn"
              onClick={onNavigateToAllRequests}
              className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white border border-slate-300 rounded-xl transition-colors"
            >
              View All Requests
            </button>
            <button
              id="emergency-section-post-request-btn"
              onClick={onNavigateToRequestForm}
              className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-xs transition-colors"
            >
              Post a Request
            </button>
          </div>
        </div>

        {urgentRequests.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500 text-sm">
            No critical emergency requests currently open. All hospital stocks are currently stable.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {urgentRequests.map((req) => {
              const isCritical = req.urgency === 'critical';
              return (
                <div
                  key={req.id}
                  id={`emergency-card-${req.id}`}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow relative flex flex-col justify-between"
                >
                  {/* Top Bar */}
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <BloodGroupBadge group={req.bloodGroup} size="lg" />
                      <span
                        className={`text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                          isCritical
                            ? 'bg-red-100 text-red-800 border-red-200 animate-pulse'
                            : 'bg-amber-100 text-amber-800 border-amber-200'
                        }`}
                      >
                        {req.urgency.toUpperCase()}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 mb-1">
                      {req.unitsRequired} Units Required
                    </h3>
                    <p className="text-xs text-slate-500 mb-4">
                      For patient: <span className="font-semibold text-slate-700">{req.patientName}</span>
                    </p>

                    <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100 mb-4">
                      <div className="flex items-center gap-2">
                        <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{req.hospitalName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{req.city}, {req.district}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>Needed by: <strong className="text-slate-800">{req.requiredDate}</strong></span>
                      </div>
                    </div>

                    {req.notes && (
                      <p className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg italic line-clamp-2 mb-4">
                        "{req.notes}"
                      </p>
                    )}
                  </div>

                  {/* Action Bar */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                    <span className="text-[11px] text-slate-400">
                      {req.respondedDonorsCount || 0} donors responding
                    </span>
                    <button
                      id={`respond-request-btn-${req.id}`}
                      onClick={() => setSelectedRequest(req)}
                      className="px-3.5 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <HeartHandshake className="w-3.5 h-3.5" />
                      <span>I Can Donate</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Response / Pledge Modal */}
      <Modal
        isOpen={!!selectedRequest}
        onClose={() => setSelectedRequest(null)}
        title="Pledge Blood Donation"
        subtitle={selectedRequest ? `Responding to Request #${selectedRequest.id} for ${selectedRequest.patientName}` : ''}
      >
        {selectedRequest && (
          <form onSubmit={handleRespond} className="space-y-4 text-xs">
            <div className="p-3 bg-red-50 rounded-xl border border-red-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-red-900">Required: {selectedRequest.bloodGroup}</p>
                <p className="text-slate-600 text-[11px]">{selectedRequest.hospitalName} ({selectedRequest.city})</p>
              </div>
              <BloodGroupBadge group={selectedRequest.bloodGroup} size="md" />
            </div>

            <p className="text-slate-600 leading-relaxed">
              By confirming your willingness to donate, LifeDrop coordinates with the hospital transfusion team to provide you with prioritized donation screening and donation appointment slots.
            </p>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                required
                value={donorNameInput}
                onChange={(e) => setDonorNameInput(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Contact Phone (Confidential)
              </label>
              <input
                type="tel"
                required
                value={donorPhoneInput}
                onChange={(e) => setDonorPhoneInput(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-red-500"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Your phone is only shared with authorized blood bank coordinators after clinical match.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                id="submit-pledge-donation-btn"
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-xs transition-colors"
              >
                Confirm Donation Pledge
              </button>
            </div>
          </form>
        )}
      </Modal>
    </section>
  );
};
