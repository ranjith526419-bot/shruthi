import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { BloodGroup, UrgencyLevel, BloodRequest } from '../types';
import { BloodGroupBadge } from '../components/common/BloodGroupBadge';
import { Modal } from '../components/common/Modal';
import { EmptyState } from '../components/common/EmptyState';
import {
  AlertCircle,
  PlusCircle,
  Clock,
  MapPin,
  Building,
  HeartHandshake,
  CheckCircle2,
  FileText,
  Filter,
  Search,
  Phone,
  User,
  Calendar
} from 'lucide-react';

interface BloodRequestPageProps {
  prefilledBloodGroup?: BloodGroup;
  prefilledHospitalId?: string;
  showFormInitially?: boolean;
}

export const BloodRequestPage: React.FC<BloodRequestPageProps> = ({
  prefilledBloodGroup,
  prefilledHospitalId,
  showFormInitially = false
}) => {
  const { requests, hospitals, addBloodRequest, respondToRequest, addToast } = useData();
  const { currentUser } = useAuth();

  const [activeTab, setActiveTab] = useState<'browse' | 'create'>(
    showFormInitially ? 'create' : 'browse'
  );

  // Form State
  const [patientName, setPatientName] = useState('');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>(prefilledBloodGroup || 'O+');
  const [unitsRequired, setUnitsRequired] = useState<number>(2);
  const [hospitalName, setHospitalName] = useState('');
  const [city, setCity] = useState(currentUser?.city || 'Seattle');
  const [district, setDistrict] = useState(currentUser?.district || 'King County');
  const [state, setState] = useState(currentUser?.state || 'WA');
  const [requiredDate, setRequiredDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [urgency, setUrgency] = useState<UrgencyLevel>('urgent');
  const [contactName, setContactName] = useState(currentUser?.displayName || '');
  const [contactPhone, setContactPhone] = useState(currentUser?.phone || '');
  const [contactEmail, setContactEmail] = useState(currentUser?.email || '');
  const [notes, setNotes] = useState('');

  // Browse state
  const [filterBloodGroup, setFilterBloodGroup] = useState<BloodGroup | ''>('');
  const [filterUrgency, setFilterUrgency] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Donation pledge modal
  const [pledgeModalRequest, setPledgeModalRequest] = useState<BloodRequest | null>(null);
  const [pledgeDonorName, setPledgeDonorName] = useState(currentUser?.displayName || '');

  // Prepopulate hospital if prefilledHospitalId provided
  React.useEffect(() => {
    if (prefilledHospitalId) {
      const h = hospitals.find((item) => item.id === prefilledHospitalId);
      if (h) {
        setHospitalName(h.name);
        setCity(h.city);
        setDistrict(h.district);
        setState(h.state);
      }
    }
  }, [prefilledHospitalId, hospitals]);

  const bloodGroups: BloodGroup[] = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();

    if (!patientName.trim()) {
      addToast('Validation Error', 'Please enter patient name.', 'error');
      return;
    }
    if (!hospitalName.trim()) {
      addToast('Validation Error', 'Please specify the treating hospital name.', 'error');
      return;
    }
    if (!contactPhone.trim()) {
      addToast('Validation Error', 'Please provide a valid contact phone number.', 'error');
      return;
    }

    addBloodRequest({
      patientName,
      bloodGroup,
      unitsRequired: Number(unitsRequired),
      hospitalName,
      city,
      district,
      state,
      requiredDate,
      urgency,
      contactName,
      contactPhone,
      contactEmail,
      notes,
      requestedByUserId: currentUser?.id || 'guest_seeker'
    });

    // Reset and redirect to browse
    setPatientName('');
    setNotes('');
    setActiveTab('browse');
  };

  const handlePledgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pledgeModalRequest) return;
    respondToRequest(pledgeModalRequest.id, pledgeDonorName || 'Anonymous Volunteer');
    setPledgeModalRequest(null);
  };

  const filteredRequests = requests.filter((r) => {
    if (filterBloodGroup && r.bloodGroup !== filterBloodGroup) return false;
    if (filterUrgency !== 'all' && r.urgency !== filterUrgency) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const match =
        r.patientName.toLowerCase().includes(query) ||
        r.hospitalName.toLowerCase().includes(query) ||
        r.city.toLowerCase().includes(query);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div id="blood-request-page" className="py-10 bg-slate-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-100">
              Emergency Coordination
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
              Blood Requests & Patient Registry
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Post urgent transfusion needs or volunteer to donate directly to hospital patients in your locality.
            </p>
          </div>

          {/* Tab buttons */}
          <div className="flex items-center gap-2 p-1 bg-white rounded-2xl border border-slate-200 self-start sm:self-auto shadow-2xs">
            <button
              id="tab-browse-requests-btn"
              onClick={() => setActiveTab('browse')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'browse'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Browse Active Requests ({requests.length})
            </button>
            <button
              id="tab-create-request-btn"
              onClick={() => setActiveTab('create')}
              className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all ${
                activeTab === 'create'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-red-600 hover:bg-red-50'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Submit Blood Request</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Create Request Form */}
        {activeTab === 'create' && (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm animate-in fade-in">
            <div className="pb-6 border-b border-slate-100 mb-6">
              <h2 className="text-xl font-extrabold text-slate-900">
                Register a Patient Blood Request
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                All submitted requests are immediately broadcasted to compatible donors and hospital staff in the region.
              </p>
            </div>

            <form onSubmit={handleSubmitRequest} className="space-y-6 text-xs">
              {/* Patient and Blood Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Patient Full Name *
                  </label>
                  <input
                    id="request-form-patient-name"
                    type="text"
                    required
                    placeholder="e.g. Maya Lin"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Blood Group Required *
                  </label>
                  <select
                    id="request-form-blood-group"
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value as BloodGroup)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-red-700 focus:ring-2 focus:ring-red-500"
                  >
                    {bloodGroups.map((g) => (
                      <option key={g} value={g}>
                        {g} Blood Group
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Units & Urgency */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Units Required *
                  </label>
                  <input
                    id="request-form-units"
                    type="number"
                    min={1}
                    max={10}
                    required
                    value={unitsRequired}
                    onChange={(e) => setUnitsRequired(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Required By Date *
                  </label>
                  <input
                    id="request-form-required-date"
                    type="date"
                    required
                    value={requiredDate}
                    onChange={(e) => setRequiredDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Urgency Level *
                  </label>
                  <select
                    id="request-form-urgency"
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value as UrgencyLevel)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold focus:ring-2 focus:ring-red-500"
                  >
                    <option value="normal">Normal (Elective / 3+ days)</option>
                    <option value="urgent">Urgent (Within 24-48 hrs)</option>
                    <option value="critical">Critical (Immediate Emergency)</option>
                  </select>
                </div>
              </div>

              {/* Hospital & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="sm:col-span-3">
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Treating Hospital / Medical Center *
                  </label>
                  <input
                    id="request-form-hospital-name"
                    type="text"
                    required
                    placeholder="e.g. Metro Health Medical Center"
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    City *
                  </label>
                  <input
                    id="request-form-city"
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    District / County
                  </label>
                  <input
                    id="request-form-district"
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    State
                  </label>
                  <input
                    id="request-form-state"
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <span className="font-bold text-slate-900 block">
                  Coordinator Contact Information
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-slate-600 mb-1">
                      Contact Name *
                    </label>
                    <input
                      id="request-form-contact-name"
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-600 mb-1">
                      Contact Phone *
                    </label>
                    <input
                      id="request-form-contact-phone"
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-600 mb-1">
                      Email Address
                    </label>
                    <input
                      id="request-form-contact-email"
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Clinical Notes */}
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Clinical Notes / Case Description
                </label>
                <textarea
                  id="request-form-notes"
                  rows={3}
                  placeholder="e.g. Scheduled cardiac bypass surgery in OR 3. Blood requisition form #MED-8839."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setActiveTab('browse')}
                  className="px-5 py-2.5 border border-slate-300 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="request-form-submit-btn"
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-md shadow-red-600/20 transition-colors"
                >
                  Submit & Broadcast Request
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 2: Browse Active Requests */}
        {activeTab === 'browse' && (
          <div>
            {/* Filter controls */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
                {/* Search */}
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="browse-requests-search-input"
                    type="text"
                    placeholder="Search by patient, hospital, city..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-red-500"
                  />
                </div>

                {/* Blood group filter */}
                <select
                  id="browse-filter-blood-group"
                  value={filterBloodGroup}
                  onChange={(e) => setFilterBloodGroup(e.target.value as BloodGroup | '')}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white"
                >
                  <option value="">All Blood Groups</option>
                  {bloodGroups.map((g) => (
                    <option key={g} value={g}>
                      Type {g}
                    </option>
                  ))}
                </select>

                {/* Urgency filter */}
                <select
                  id="browse-filter-urgency"
                  value={filterUrgency}
                  onChange={(e) => setFilterUrgency(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white"
                >
                  <option value="all">All Urgencies</option>
                  <option value="critical">Critical Only</option>
                  <option value="urgent">Urgent Only</option>
                  <option value="normal">Normal Only</option>
                </select>
              </div>

              <span className="text-xs text-slate-500 font-semibold">
                {filteredRequests.length} requests available
              </span>
            </div>

            {/* Requests Grid */}
            {filteredRequests.length === 0 ? (
              <EmptyState
                icon={AlertCircle}
                title="No Blood Requests Matching Filters"
                description="There are currently no active patient requests matching your selection criteria."
                actionLabel="Submit a New Request"
                onAction={() => setActiveTab('create')}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRequests.map((req) => {
                  const isCritical = req.urgency === 'critical';
                  const isUrgent = req.urgency === 'urgent';
                  const isFulfilled = req.status === 'fulfilled';

                  return (
                    <div
                      key={req.id}
                      id={`request-listing-card-${req.id}`}
                      className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all p-6 flex flex-col justify-between"
                    >
                      <div>
                        {/* Top: Blood group & Status Badge */}
                        <div className="flex items-start justify-between gap-2 mb-4">
                          <BloodGroupBadge group={req.bloodGroup} size="lg" />
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                                isCritical
                                  ? 'bg-red-100 text-red-800 border-red-200 animate-pulse'
                                  : isUrgent
                                  ? 'bg-amber-100 text-amber-800 border-amber-200'
                                  : 'bg-blue-100 text-blue-800 border-blue-200'
                              }`}
                            >
                              {req.urgency}
                            </span>
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                                isFulfilled
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {req.status}
                            </span>
                          </div>
                        </div>

                        {/* Title & Units */}
                        <h3 className="text-base font-bold text-slate-900 mb-1">
                          {req.unitsRequired} Units Required
                        </h3>
                        <p className="text-xs text-slate-500 mb-4">
                          Patient: <strong className="text-slate-800">{req.patientName}</strong>
                        </p>

                        {/* Hospital & Location */}
                        <div className="space-y-2 text-xs text-slate-600 pt-3 border-t border-slate-100 mb-4">
                          <div className="flex items-center gap-2">
                            <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="truncate">{req.hospitalName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{req.city}, {req.state}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>Required by: <strong>{req.requiredDate}</strong></span>
                          </div>
                        </div>

                        {req.notes && (
                          <p className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl italic line-clamp-2 mb-4">
                            "{req.notes}"
                          </p>
                        )}
                      </div>

                      {/* Bottom action bar */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                        <span className="text-[11px] text-slate-400">
                          {req.respondedDonorsCount || 0} donors pledged
                        </span>

                        {!isFulfilled ? (
                          <button
                            id={`pledge-btn-${req.id}`}
                            onClick={() => setPledgeModalRequest(req)}
                            className="px-3.5 py-1.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
                          >
                            <HeartHandshake className="w-3.5 h-3.5" />
                            <span>I Can Donate</span>
                          </button>
                        ) : (
                          <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Fulfilled</span>
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Pledge Modal */}
      <Modal
        isOpen={!!pledgeModalRequest}
        onClose={() => setPledgeModalRequest(null)}
        title="Confirm Blood Donation Response"
        subtitle={pledgeModalRequest ? `Responding for Patient: ${pledgeModalRequest.patientName}` : ''}
      >
        {pledgeModalRequest && (
          <form onSubmit={handlePledgeSubmit} className="space-y-4 text-xs">
            <div className="p-3 bg-red-50 rounded-xl border border-red-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-red-900">Required: {pledgeModalRequest.bloodGroup}</p>
                <p className="text-slate-600 text-[11px]">
                  {pledgeModalRequest.hospitalName} ({pledgeModalRequest.city})
                </p>
              </div>
              <BloodGroupBadge group={pledgeModalRequest.bloodGroup} size="md" />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                required
                value={pledgeDonorName}
                onChange={(e) => setPledgeDonorName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-red-500"
              />
            </div>

            <p className="text-slate-500 text-[11px] leading-relaxed">
              Your donation pledge notifies the medical center blood bank so they can prioritize your appointment and prepare cross-matching materials.
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setPledgeModalRequest(null)}
                className="px-4 py-2 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                id="submit-pledge-btn"
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-xs transition-colors"
              >
                Pledge Donation
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};
