import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { BloodRequest } from '../../types';
import { BloodGroupBadge } from '../common/BloodGroupBadge';
import { EmptyState } from '../common/EmptyState';
import {
  PlusCircle,
  Clock,
  MapPin,
  Building,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Phone,
  HeartHandshake
} from 'lucide-react';

interface SeekerDashboardProps {
  onNavigateToRequestForm: () => void;
}

export const SeekerDashboard: React.FC<SeekerDashboardProps> = ({ onNavigateToRequestForm }) => {
  const { currentUser } = useAuth();
  const { requests, updateBloodRequestStatus } = useData();

  // All requests submitted by this seeker or sample requests if newly logged in
  const myRequests = requests.filter(
    (r) => r.requestedByUserId === currentUser?.id || r.requestedByUserId === 'user_seeker_1'
  );

  return (
    <div id="seeker-dashboard" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
            Patient & Seeker Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Hello, {currentUser?.displayName}
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
            Track your ongoing blood requisitions in real-time, view volunteer donor pledges, and coordinate with hospital coordinators.
          </p>
        </div>

        <button
          id="seeker-new-request-btn"
          onClick={onNavigateToRequestForm}
          className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs shadow-md flex items-center gap-2 transition-colors self-stretch sm:self-auto justify-center"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post New Blood Request</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Total Requests Filed
          </span>
          <span className="text-3xl font-black text-slate-900">{myRequests.length}</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Active / In Progress
          </span>
          <span className="text-3xl font-black text-amber-600">
            {myRequests.filter((r) => r.status === 'in_progress' || r.status === 'pending').length}
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Fulfilled Transfusions
          </span>
          <span className="text-3xl font-black text-emerald-600">
            {myRequests.filter((r) => r.status === 'fulfilled').length}
          </span>
        </div>
      </div>

      {/* Request Tracker List */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">My Blood Requisitions</h3>
            <p className="text-xs text-slate-500">Live operational status and donor coordination updates</p>
          </div>
        </div>

        {myRequests.length === 0 ? (
          <EmptyState
            icon={PlusCircle}
            title="No Blood Requests Submitted Yet"
            description="If a patient requires blood units, submit a new requisition to notify regional blood banks and registered donors."
            actionLabel="Post a Blood Request"
            onAction={onNavigateToRequestForm}
          />
        ) : (
          <div className="space-y-6">
            {myRequests.map((req) => {
              const isFulfilled = req.status === 'fulfilled';
              const isCancelled = req.status === 'cancelled';

              return (
                <div
                  key={req.id}
                  id={`seeker-req-${req.id}`}
                  className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                      <BloodGroupBadge group={req.bloodGroup} size="lg" />
                      <div>
                        <h4 className="text-base font-bold text-slate-900">
                          {req.unitsRequired} Units for {req.patientName}
                        </h4>
                        <p className="text-xs text-slate-500">
                          Treating facility: {req.hospitalName} ({req.city})
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <span
                        className={`text-xs font-extrabold uppercase px-3 py-1 rounded-full ${
                          isFulfilled
                            ? 'bg-emerald-100 text-emerald-800'
                            : isCancelled
                            ? 'bg-slate-200 text-slate-600'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        Status: {req.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  {/* Status Progress Stepper */}
                  <div className="py-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      Fulfillment Lifecycle
                    </span>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2 rounded-xl bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 flex items-center justify-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>1. Broadcasted</span>
                      </div>
                      <div
                        className={`p-2 rounded-xl font-bold flex items-center justify-center gap-1 border ${
                          req.status === 'in_progress' || isFulfilled
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-white text-slate-400 border-slate-200'
                        }`}
                      >
                        {req.status === 'in_progress' || isFulfilled ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <Clock className="w-3.5 h-3.5" />
                        )}
                        <span>2. Donors Responding</span>
                      </div>
                      <div
                        className={`p-2 rounded-xl font-bold flex items-center justify-center gap-1 border ${
                          isFulfilled
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-white text-slate-400 border-slate-200'
                        }`}
                      >
                        {isFulfilled ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <Clock className="w-3.5 h-3.5" />
                        )}
                        <span>3. Fulfilled</span>
                      </div>
                    </div>
                  </div>

                  {/* Donor pledges counter & actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-200 text-xs">
                    <div className="flex items-center gap-2 text-slate-700">
                      <HeartHandshake className="w-4 h-4 text-red-600" />
                      <span className="font-bold">
                        {req.respondedDonorsCount || 0} Volunteer Donors Pledged
                      </span>
                      {req.respondedDonorsCount && req.respondedDonorsCount > 0 ? (
                        <span className="text-[11px] text-emerald-600 font-semibold">
                          (Medical center alerted)
                        </span>
                      ) : null}
                    </div>

                    {!isFulfilled && !isCancelled && (
                      <div className="flex items-center gap-2">
                        <button
                          id={`mark-fulfilled-btn-${req.id}`}
                          onClick={() => updateBloodRequestStatus(req.id, 'fulfilled')}
                          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-colors shadow-xs"
                        >
                          Mark as Fulfilled
                        </button>
                        <button
                          id={`cancel-req-btn-${req.id}`}
                          onClick={() => updateBloodRequestStatus(req.id, 'cancelled')}
                          className="px-3.5 py-1.5 border border-slate-300 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold transition-colors"
                        >
                          Cancel Request
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
