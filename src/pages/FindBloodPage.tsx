import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { BloodGroup, Hospital } from '../types';
import { BloodGroupBadge } from '../components/common/BloodGroupBadge';
import { Modal } from '../components/common/Modal';
import { EmptyState } from '../components/common/EmptyState';
import {
  Search,
  Filter,
  MapPin,
  Building2,
  Clock,
  Phone,
  AlertCircle,
  CheckCircle2,
  Send,
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface FindBloodPageProps {
  initialBloodGroup?: BloodGroup;
  initialCity?: string;
  onNavigateToRequestForm: (prefilled?: { bloodGroup: BloodGroup; hospitalId: string }) => void;
}

export const FindBloodPage: React.FC<FindBloodPageProps> = ({
  initialBloodGroup,
  initialCity,
  onNavigateToRequestForm
}) => {
  const { inventory, hospitals } = useData();

  const [selectedBloodGroup, setSelectedBloodGroup] = useState<BloodGroup | ''>(initialBloodGroup || '');
  const [cityFilter, setCityFilter] = useState(initialCity || '');
  const [hospitalFilter, setHospitalFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'in_stock' | 'low_stock'>('all');
  const [contactModalHospital, setContactModalHospital] = useState<Hospital | null>(null);

  const bloodGroups: BloodGroup[] = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];

  // Combine inventory with hospital details
  const enrichedInventory = useMemo(() => {
    return inventory.map((item) => {
      const hospital = hospitals.find((h) => h.id === item.hospitalId);
      return {
        ...item,
        hospital
      };
    });
  }, [inventory, hospitals]);

  // Apply filters
  const filteredResults = useMemo(() => {
    return enrichedInventory.filter((item) => {
      if (selectedBloodGroup && item.bloodGroup !== selectedBloodGroup) return false;
      if (
        cityFilter &&
        !item.hospital?.city.toLowerCase().includes(cityFilter.toLowerCase()) &&
        !item.hospital?.state.toLowerCase().includes(cityFilter.toLowerCase())
      ) {
        return false;
      }
      if (
        hospitalFilter &&
        !item.hospital?.name.toLowerCase().includes(hospitalFilter.toLowerCase())
      ) {
        return false;
      }
      if (availabilityFilter === 'in_stock' && item.unitsAvailable < 5) return false;
      if (availabilityFilter === 'low_stock' && (item.unitsAvailable === 0 || item.unitsAvailable > 6)) return false;

      return true;
    });
  }, [enrichedInventory, selectedBloodGroup, cityFilter, hospitalFilter, availabilityFilter]);

  const resetFilters = () => {
    setSelectedBloodGroup('');
    setCityFilter('');
    setHospitalFilter('');
    setAvailabilityFilter('all');
  };

  return (
    <div id="find-blood-page" className="py-10 bg-slate-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-100">
            Real-Time Reserve Lookup
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
            Find Blood Availability
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Live inventory tracking across regional blood banks and accredited hospital trauma centers.
            Search by blood type, city, or medical facility.
          </p>
        </div>

        {/* Filter Bar Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm mb-8">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Filter className="w-4 h-4 text-red-600" />
              <span>Search & Filter Reserves</span>
            </div>
            {(selectedBloodGroup || cityFilter || hospitalFilter || availabilityFilter !== 'all') && (
              <button
                id="reset-filters-btn"
                onClick={resetFilters}
                className="text-xs text-red-600 hover:text-red-700 font-bold flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Blood Group Select */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Blood Group
              </label>
              <select
                id="filter-blood-group-select"
                value={selectedBloodGroup}
                onChange={(e) => setSelectedBloodGroup(e.target.value as BloodGroup | '')}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-red-500 bg-white"
              >
                <option value="">All Blood Groups (8 Types)</option>
                {bloodGroups.map((g) => (
                  <option key={g} value={g}>
                    Type {g}
                  </option>
                ))}
              </select>
            </div>

            {/* City / Region */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                City / Location
              </label>
              <input
                id="filter-city-input"
                type="text"
                placeholder="e.g. Seattle, Bellevue"
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-red-500 bg-white"
              />
            </div>

            {/* Hospital / Facility */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Hospital / Center
              </label>
              <input
                id="filter-hospital-input"
                type="text"
                placeholder="e.g. Metro, Cascade"
                value={hospitalFilter}
                onChange={(e) => setHospitalFilter(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-red-500 bg-white"
              />
            </div>

            {/* Stock Availability */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Stock Status
              </label>
              <select
                id="filter-stock-status-select"
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-red-500 bg-white"
              >
                <option value="all">Any Availability</option>
                <option value="in_stock">Healthy Reserves (5+ units)</option>
                <option value="low_stock">Critically Low (1-6 units)</option>
              </select>
            </div>
          </div>

          {/* Quick blood group selector pills */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold mr-1">Quick Filter:</span>
            {bloodGroups.map((group) => {
              const active = selectedBloodGroup === group;
              return (
                <button
                  key={group}
                  id={`pill-filter-${group}`}
                  onClick={() => setSelectedBloodGroup(active ? '' : group)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    active
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {group}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold text-slate-600">
            Showing <span className="text-slate-900">{filteredResults.length}</span> blood inventory matches
          </p>
          <span className="text-[11px] text-slate-400">
            Auto-refreshed: Live Hospital Network
          </span>
        </div>

        {/* Results Grid */}
        {filteredResults.length === 0 ? (
          <EmptyState
            icon={Search}
            title="No Matching Blood Inventory Found"
            description="No current facility stocks match your specific filters. Try expanding your search location or clearing filters."
            actionLabel="Reset Search Filters"
            onAction={resetFilters}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResults.map((item) => {
              const isLowStock = item.unitsAvailable > 0 && item.unitsAvailable <= 4;
              const isOutStock = item.unitsAvailable === 0;

              return (
                <div
                  key={item.id}
                  id={`inventory-card-${item.id}`}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all p-6 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Blood Group & Units Badge */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <BloodGroupBadge group={item.bloodGroup} size="lg" showSpecialLabel />
                      <div className="text-right">
                        <span
                          className={`text-sm font-black px-3 py-1 rounded-xl inline-block ${
                            isOutStock
                              ? 'bg-slate-100 text-slate-500'
                              : isLowStock
                              ? 'bg-amber-100 text-amber-900 border border-amber-200'
                              : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          }`}
                        >
                          {item.unitsAvailable} Units Available
                        </span>
                        {isLowStock && (
                          <span className="block text-[10px] text-amber-700 font-bold mt-0.5">
                            Low Supply Alert
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Hospital Info */}
                    <h3 className="text-base font-bold text-slate-900 mb-1">
                      {item.hospital?.name || 'Authorized Regional Blood Bank'}
                    </h3>

                    <div className="space-y-1.5 text-xs text-slate-600 mt-3 pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">
                          {item.hospital?.address}, {item.hospital?.city}, {item.hospital?.state}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>Hours: {item.hospital?.operatingHours || '24/7 Transfusion Center'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="text-[11px] text-slate-500">
                          Updated {new Date(item.lastUpdated).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2.5">
                    <button
                      id={`contact-facility-btn-${item.id}`}
                      onClick={() => setContactModalHospital(item.hospital || null)}
                      className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-slate-600" />
                      <span>Contact Facility</span>
                    </button>

                    <button
                      id={`request-blood-btn-${item.id}`}
                      onClick={() =>
                        onNavigateToRequestForm({
                          bloodGroup: item.bloodGroup,
                          hospitalId: item.hospitalId
                        })
                      }
                      className="flex-1 py-2 px-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Request Blood</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Hospital Contact Info Modal */}
      <Modal
        isOpen={!!contactModalHospital}
        onClose={() => setContactModalHospital(null)}
        title="Facility Blood Desk Contact"
        subtitle={contactModalHospital?.name}
      >
        {contactModalHospital && (
          <div className="space-y-4 text-xs text-slate-700">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex justify-between">
                <span className="font-bold text-slate-500">Address:</span>
                <span className="font-semibold text-slate-900 text-right">
                  {contactModalHospital.address}, {contactModalHospital.city}, {contactModalHospital.state}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-slate-500">Regular Desk Phone:</span>
                <a
                  href={`tel:${contactModalHospital.contactPhone}`}
                  className="font-bold text-red-600 hover:underline"
                >
                  {contactModalHospital.contactPhone}
                </a>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-slate-500">Emergency Hotline:</span>
                <a
                  href={`tel:${contactModalHospital.emergencyPhone}`}
                  className="font-bold text-red-700 hover:underline"
                >
                  {contactModalHospital.emergencyPhone}
                </a>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-slate-500">Operating Hours:</span>
                <span className="font-semibold text-slate-900">{contactModalHospital.operatingHours}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-slate-500">Accreditation:</span>
                <span className="font-semibold text-slate-900">{contactModalHospital.licenseNumber}</span>
              </div>
            </div>

            <p className="text-slate-500 text-[11px] leading-relaxed">
              When calling, specify that you are inquiring regarding blood component availability coordinated via the LifeDrop network.
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setContactModalHospital(null)}
                className="px-4 py-2 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50"
              >
                Close
              </button>
              <a
                href={`tel:${contactModalHospital.contactPhone}`}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-xs"
              >
                Call Desk Now
              </a>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
