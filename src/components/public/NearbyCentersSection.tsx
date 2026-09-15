import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Hospital } from '../../types';
import { Building2, Phone, MapPin, Clock, ShieldCheck, Navigation, Search } from 'lucide-react';

interface NearbyCentersSectionProps {
  onNavigateToFindBlood?: () => void;
}

export const NearbyCentersSection: React.FC<NearbyCentersSectionProps> = ({ onNavigateToFindBlood }) => {
  const { hospitals, inventory } = useData();
  const [filterType, setFilterType] = useState<'all' | 'hospital' | 'blood_bank'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCenter, setSelectedCenter] = useState<Hospital>(hospitals[0]);

  const filteredHospitals = hospitals.filter((h) => {
    const matchesType = filterType === 'all' || h.type === filterType;
    const matchesSearch =
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getStockForHospital = (hospitalId: string) => {
    return inventory
      .filter((i) => i.hospitalId === hospitalId)
      .reduce((sum, item) => sum + item.unitsAvailable, 0);
  };

  return (
    <section className="py-16 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-100">
              Regional Directory
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
              Nearby Blood Centers & Hospitals
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Locate authorized collection centers, licensed blood banks, and hospital transfusion departments in your vicinity.
            </p>
          </div>

          {/* Type filters */}
          <div className="flex items-center gap-2">
            <button
              id="center-filter-all"
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                filterType === 'all' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              All Centers ({hospitals.length})
            </button>
            <button
              id="center-filter-blood-banks"
              onClick={() => setFilterType('blood_bank')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                filterType === 'blood_bank' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              Blood Banks
            </button>
            <button
              id="center-filter-hospitals"
              onClick={() => setFilterType('hospital')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                filterType === 'hospital' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              Hospitals
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="center-search-query-input"
            type="text"
            placeholder="Search by center name or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
        </div>

        {/* Directory Grid & Map Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* List of centers */}
          <div className="lg:col-span-7 space-y-4 max-h-[600px] overflow-y-auto pr-1">
            {filteredHospitals.map((center) => {
              const stock = getStockForHospital(center.id);
              const isSelected = selectedCenter?.id === center.id;

              return (
                <div
                  key={center.id}
                  id={`center-item-${center.id}`}
                  onClick={() => setSelectedCenter(center)}
                  className={`p-5 rounded-2xl bg-white border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-red-500 ring-2 ring-red-100 shadow-md'
                      : 'border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900">{center.name}</h3>
                      {center.isVerified && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <ShieldCheck className="w-3 h-3" />
                          <span>Verified</span>
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-extrabold text-red-600 bg-red-50 px-2.5 py-1 rounded-lg">
                      {stock} units in stock
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 mt-3 pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{center.address}, {center.city}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{center.operatingHours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{center.contactPhone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-red-600 font-semibold">
                      <Phone className="w-3.5 h-3.5 shrink-0" />
                      <span>Emergency: {center.emergencyPhone}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Map & Facility Overview Panel */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm sticky top-24">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div>
                  <span className="text-[10px] uppercase font-extrabold tracking-wider text-red-600">
                    Selected Location Overview
                  </span>
                  <h4 className="text-base font-bold text-slate-900">{selectedCenter.name}</h4>
                </div>
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
              </div>

              {/* Simulated Map Canvas */}
              <div className="relative w-full h-48 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden mb-4 flex items-center justify-center">
                {/* SVG Map Graphic */}
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="relative z-10 flex flex-col items-center gap-1.5 p-4 text-center">
                  <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg ring-4 ring-red-100 animate-bounce">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 bg-white/90 px-3 py-1 rounded-full shadow-xs">
                    {selectedCenter.city} ({selectedCenter.latitude.toFixed(3)}, {selectedCenter.longitude.toFixed(3)})
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-600 mb-5">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">License Number:</span>
                  <span className="font-semibold text-slate-800">{selectedCenter.licenseNumber}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Facility Type:</span>
                  <span className="font-semibold capitalize text-slate-800">{selectedCenter.type.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Contact Phone:</span>
                  <a href={`tel:${selectedCenter.contactPhone}`} className="font-semibold text-red-600 hover:underline">
                    {selectedCenter.contactPhone}
                  </a>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Emergency Desk:</span>
                  <span className="font-bold text-red-700">{selectedCenter.emergencyPhone}</span>
                </div>
              </div>

              <div className="flex gap-2.5">
                <a
                  id="center-get-directions-btn"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedCenter.name + ' ' + selectedCenter.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>

                {onNavigateToFindBlood && (
                  <button
                    id="center-check-blood-stock-btn"
                    onClick={onNavigateToFindBlood}
                    className="py-2.5 px-4 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold rounded-xl border border-red-200 transition-colors"
                  >
                    View Stock
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
