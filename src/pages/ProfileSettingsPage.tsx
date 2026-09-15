import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { User, Phone, MapPin, Mail, Bell, Shield, CheckCircle2 } from 'lucide-react';
import { BloodGroupBadge } from '../components/common/BloodGroupBadge';

export const ProfileSettingsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { addToast } = useData();

  const [name, setName] = useState(currentUser?.displayName || '');
  const [phone, setPhone] = useState(currentUser?.phone || '+1 (555) 234-5678');
  const [city, setCity] = useState(currentUser?.city || 'Seattle');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Profile Updated', 'Your contact preferences and regional settings have been saved.', 'success');
  };

  return (
    <div id="profile-settings-page" className="py-10 bg-slate-50/50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-100">
            Account Management
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
            Profile & Notification Settings
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your personal details, regional alert subscriptions, and PII protection controls.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <form onSubmit={handleSave} className="space-y-6 text-xs">
            <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
              <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-700 font-black text-xl flex items-center justify-center border border-red-200">
                {currentUser?.displayName?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{currentUser?.displayName}</h3>
                <p className="text-xs text-slate-500">{currentUser?.email}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    Role: {currentUser?.role}
                  </span>
                  {currentUser?.bloodGroup && (
                    <BloodGroupBadge group={currentUser.bloodGroup} size="sm" />
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Phone (Confidential)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  City / Location
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Account Email
                </label>
                <input
                  type="email"
                  disabled
                  value={currentUser?.email || ''}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 text-sm"
                />
              </div>
            </div>

            {/* Notifications Preferences */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <Bell className="w-4 h-4 text-red-600" />
                <span>Emergency Broadcast Notification Preferences</span>
              </h4>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="rounded text-red-600 focus:ring-red-500"
                />
                <span className="text-slate-700 font-semibold">
                  Receive email alerts when hospital blood shortages occur in my city
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={smsAlerts}
                  onChange={(e) => setSmsAlerts(e.target.checked)}
                  className="rounded text-red-600 focus:ring-red-500"
                />
                <span className="text-slate-700 font-semibold">
                  Receive SMS priority alerts for critical emergency requests matching my blood group
                </span>
              </label>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                id="save-profile-settings-btn"
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-xs transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
