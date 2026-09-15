import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { BloodGroup } from '../types';
import { BloodGroupBadge } from '../components/common/BloodGroupBadge';
import {
  Heart,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Lock,
  HeartHandshake,
  UserCheck
} from 'lucide-react';

interface BecomeDonorPageProps {
  onSuccessNavigate: () => void;
}

export const BecomeDonorPage: React.FC<BecomeDonorPageProps> = ({ onSuccessNavigate }) => {
  const { registerDonor, addToast } = useData();
  const { currentUser } = useAuth();

  const [fullName, setFullName] = useState(currentUser?.displayName || '');
  const [dateOfBirth, setDateOfBirth] = useState('1996-05-14');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>('O-');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [city, setCity] = useState(currentUser?.city || 'Seattle');
  const [district, setDistrict] = useState(currentUser?.district || 'King County');
  const [state, setState] = useState(currentUser?.state || 'WA');
  const [lastDonationDate, setLastDonationDate] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [consentChecked, setConsentChecked] = useState(false);
  const [healthDisclaimerChecked, setHealthDisclaimerChecked] = useState(false);

  const bloodGroups: BloodGroup[] = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      addToast('Missing Field', 'Please provide your full legal name.', 'error');
      return;
    }

    if (!phone.trim()) {
      addToast('Missing Field', 'Please provide a valid contact phone number.', 'error');
      return;
    }

    // Age validation: must be at least 18
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 18) {
      addToast('Age Requirement', 'Donors must be at least 18 years of age to register.', 'error');
      return;
    }

    if (!consentChecked) {
      addToast('Consent Required', 'Please accept the donor notification consent agreement.', 'warning');
      return;
    }

    if (!healthDisclaimerChecked) {
      addToast('Disclaimer Required', 'Please acknowledge the clinical on-site screening requirement.', 'warning');
      return;
    }

    registerDonor({
      userId: currentUser?.id || `user_new_${Date.now()}`,
      fullName,
      bloodGroup,
      dateOfBirth,
      phone,
      email,
      city,
      district,
      state,
      lastDonationDate: lastDonationDate || undefined,
      isAvailable,
      consentGiven: consentChecked,
      donationCount: 0
    });

    onSuccessNavigate();
  };

  return (
    <div id="become-donor-page" className="py-12 bg-slate-50/50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-100">
            Volunteer Network
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
            Register as a Life-Saving Blood Donor
          </h1>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Stand ready to help patients in acute trauma, surgeries, and pediatric oncology.
            Your contact information remains confidential and is protected.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6 text-xs">
            {/* Section 1: Personal Details */}
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-600" />
                <span>1. Personal & Clinical Profile</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Legal Name *
                  </label>
                  <input
                    id="donor-reg-fullname"
                    type="text"
                    required
                    placeholder="e.g. Marcus Vance"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Date of Birth (Must be 18+) *
                  </label>
                  <input
                    id="donor-reg-dob"
                    type="date"
                    required
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Blood Group *
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                    {bloodGroups.map((group) => {
                      const isSelected = bloodGroup === group;
                      return (
                        <button
                          key={group}
                          type="button"
                          id={`donor-blood-select-${group}`}
                          onClick={() => setBloodGroup(group)}
                          className={`py-2.5 px-2 rounded-xl text-center font-black border transition-all text-xs ${
                            isSelected
                              ? 'bg-red-600 text-white border-red-700 shadow-sm ring-2 ring-red-200 scale-105'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                        >
                          {group}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Contact & Regional Location */}
            <div className="pt-2">
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <Lock className="w-4 h-4 text-red-600" />
                <span>2. Confidential Contact & Location</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Mobile Phone Number *
                  </label>
                  <input
                    id="donor-reg-phone"
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-500"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Never displayed publicly on search results.
                  </span>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    id="donor-reg-email"
                    type="email"
                    required
                    placeholder="donor@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    City *
                  </label>
                  <input
                    id="donor-reg-city"
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
                    id="donor-reg-district"
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: History & Availability */}
            <div className="pt-2">
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-red-600" />
                <span>3. Donation History & Active Status</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Date of Last Donation (If applicable)
                  </label>
                  <input
                    id="donor-reg-last-donation"
                    type="date"
                    value={lastDonationDate}
                    onChange={(e) => setLastDonationDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-500"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Leave blank if this will be your first donation.
                  </span>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Availability Status
                  </label>
                  <div className="flex items-center gap-4 pt-2">
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="availability"
                        checked={isAvailable}
                        onChange={() => setIsAvailable(true)}
                        className="text-red-600 focus:ring-red-500"
                      />
                      <span className="text-xs font-bold text-slate-800">
                        Available (Ready for urgent alerts)
                      </span>
                    </label>

                    <label className="inline-flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="availability"
                        checked={!isAvailable}
                        onChange={() => setIsAvailable(false)}
                        className="text-red-600 focus:ring-red-500"
                      />
                      <span className="text-xs font-bold text-slate-800">
                        Temporarily Inactive
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Strict Clinical Eligibility & Consent Box */}
            <div className="p-5 bg-amber-50/70 rounded-2xl border border-amber-200/80 space-y-3">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900 leading-relaxed">
                  <strong className="block font-bold mb-0.5">
                    Important Medical & Eligibility Notice:
                  </strong>
                  Registering on LifeDrop confirms your voluntary willingness to donate.
                  <strong>
                    {' '}LifeDrop does not automatically certify medical eligibility.
                  </strong>{' '}
                  Actual clinical fitness (weight ≥ 50kg, hemoglobin levels, travel clearance, blood pressure, and medication review) is confirmed on-site by licensed blood center phlebotomists prior to collection.
                </div>
              </div>

              <div className="pt-2 border-t border-amber-200/60 space-y-2">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    id="consent-checkbox-screening"
                    type="checkbox"
                    required
                    checked={healthDisclaimerChecked}
                    onChange={(e) => setHealthDisclaimerChecked(e.target.checked)}
                    className="mt-0.5 rounded text-red-600 focus:ring-red-500"
                  />
                  <span className="text-xs text-slate-700 font-semibold">
                    I acknowledge that final medical eligibility to donate blood must be evaluated and approved in person by qualified healthcare professionals.
                  </span>
                </label>

                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    id="consent-checkbox-alerts"
                    type="checkbox"
                    required
                    checked={consentChecked}
                    onChange={(e) => setConsentChecked(e.target.checked)}
                    className="mt-0.5 rounded text-red-600 focus:ring-red-500"
                  />
                  <span className="text-xs text-slate-700 font-semibold">
                    I consent to receive emergency blood shortage notifications via SMS / email when compatible patients in my region need blood.
                  </span>
                </label>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end gap-3">
              <button
                type="submit"
                id="donor-reg-submit-btn"
                className="w-full sm:w-auto px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow-md shadow-red-600/20 transition-colors flex items-center justify-center gap-2"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>Complete Donor Registration</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
