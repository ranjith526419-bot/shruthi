import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { UserRole, BloodGroup } from '../types';
import {
  Droplet,
  HeartHandshake,
  Search,
  Building2,
  Shield,
  ArrowRight,
  Mail,
  Lock,
  User,
  CheckCircle2,
  AlertCircle,
  HelpCircle
} from 'lucide-react';

interface AuthPageProps {
  onSuccessNavigate: (role: UserRole) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onSuccessNavigate }) => {
  const { login, signup, resetPassword, switchDemoRole, role } = useAuth();
  const { addToast } = useData();

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('donor');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>('O-');
  const [city, setCity] = useState('Seattle');
  const [phone, setPhone] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const bloodGroups: BloodGroup[] = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === 'login') {
        if (!email || !password) {
          addToast('Missing Fields', 'Please enter your email and password.', 'error');
          setIsLoading(false);
          return;
        }
        const res = await login(email, password, selectedRole);
        if (res.success) {
          addToast('Signed In', 'Welcome back to LifeDrop.', 'success');
          onSuccessNavigate(selectedRole);
        } else {
          addToast('Sign In Error', res.message || 'Unable to sign in.', 'error');
        }
      } else if (mode === 'signup') {
        if (!email || !password || !displayName) {
          addToast('Missing Fields', 'Please fill in all required registration fields.', 'error');
          setIsLoading(false);
          return;
        }
        await signup({
          email,
          password,
          displayName: selectedRole === 'hospital' ? hospitalName || displayName : displayName,
          role: selectedRole,
          bloodGroup: selectedRole === 'donor' ? bloodGroup : undefined,
          city,
          phone
        });
        onSuccessNavigate(selectedRole);
      } else if (mode === 'forgot') {
        if (!email) {
          addToast('Missing Email', 'Please enter your registered email address.', 'error');
          setIsLoading(false);
          return;
        }
        await resetPassword(email);
        setMode('login');
      }
    } catch (err) {
      // Error handled in auth context
    } finally {
      setIsLoading(false);
    }
  };

  const demoAccounts = [
    {
      role: 'donor' as UserRole,
      title: 'Elena Rostova',
      desc: 'Registered O- Universal Donor',
      icon: HeartHandshake,
      color: 'border-rose-200 bg-rose-50/50 hover:bg-rose-50'
    },
    {
      role: 'seeker' as UserRole,
      title: 'David Kim',
      desc: 'Blood Seeker (Patient Family)',
      icon: Search,
      color: 'border-blue-200 bg-blue-50/50 hover:bg-blue-50'
    },
    {
      role: 'hospital' as UserRole,
      title: 'Metro Health Medical Center',
      desc: 'Authorized Hospital & Blood Bank',
      icon: Building2,
      color: 'border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50'
    },
    {
      role: 'admin' as UserRole,
      title: 'Dr. Marcus Vance',
      desc: 'System Administrator & Coordinator',
      icon: Shield,
      color: 'border-purple-200 bg-purple-50/50 hover:bg-purple-50'
    }
  ];

  return (
    <div id="auth-page" className="py-12 bg-slate-50/50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quick Demo Access Bar */}
        <div className="mb-10 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full">
              Demo Mode Quick Switcher
            </span>
            <span className="text-xs text-slate-500">
              Instantly test any of the 4 role-based experiences:
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {demoAccounts.map((acc) => (
              <button
                key={acc.role}
                id={`demo-login-btn-${acc.role}`}
                type="button"
                onClick={() => {
                  switchDemoRole(acc.role);
                  onSuccessNavigate(acc.role);
                }}
                className={`p-3.5 rounded-2xl border text-left transition-all ${acc.color} flex items-start gap-3`}
              >
                <div className="p-2 rounded-xl bg-white shadow-2xs shrink-0">
                  {React.createElement(acc.icon, { className: 'w-4 h-4 text-slate-700' })}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{acc.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{acc.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Auth Form Box */}
        <div className="max-w-md mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-red-600/20">
              <Droplet className="w-6 h-6 fill-white" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {mode === 'login' && 'Sign in to LifeDrop'}
              {mode === 'signup' && 'Create Your Account'}
              {mode === 'forgot' && 'Reset Your Password'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {mode === 'login' && 'Access your personalized donor or facility dashboard'}
              {mode === 'signup' && 'Join the regional healthcare network today'}
              {mode === 'forgot' && 'We will send a recovery link to your email'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Sign Up: Role Selection */}
            {mode === 'signup' && (
              <div className="space-y-2 pb-2">
                <label className="block font-bold text-slate-700 uppercase tracking-wider">
                  Select Account Role *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'donor', label: 'Blood Donor', icon: HeartHandshake },
                    { id: 'seeker', label: 'Blood Seeker', icon: Search },
                    { id: 'hospital', label: 'Hospital/Bank', icon: Building2 },
                    { id: 'admin', label: 'Coordinator', icon: Shield }
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      id={`auth-role-${r.id}`}
                      onClick={() => setSelectedRole(r.id as UserRole)}
                      className={`p-2.5 rounded-xl border font-bold flex items-center justify-center gap-1.5 transition-all text-xs ${
                        selectedRole === r.id
                          ? 'bg-red-600 text-white border-red-700 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {React.createElement(r.icon, { className: 'w-3.5 h-3.5' })}
                      <span>{r.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Display Name */}
            {mode === 'signup' && (
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {selectedRole === 'hospital' ? 'Facility / Hospital Name *' : 'Full Name *'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="auth-name-input"
                    type="text"
                    required
                    placeholder={selectedRole === 'hospital' ? 'e.g. St. Jude Blood Center' : 'e.g. Elena Rostova'}
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            )}

            {/* Donor Blood Group on Signup */}
            {mode === 'signup' && selectedRole === 'donor' && (
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Blood Group *
                </label>
                <select
                  id="auth-blood-group-select"
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value as BloodGroup)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-red-700"
                >
                  {bloodGroups.map((g) => (
                    <option key={g} value={g}>
                      Type {g}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="auth-email-input"
                  type="email"
                  required
                  placeholder="user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Password Field */}
            {mode !== 'forgot' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-slate-700 uppercase tracking-wider">
                    Password *
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      id="auth-forgot-password-link"
                      onClick={() => setMode('forgot')}
                      className="text-xs text-red-600 hover:underline font-semibold"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="auth-password-input"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            )}

            {/* Phone & City on Signup */}
            {mode === 'signup' && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    City
                  </label>
                  <input
                    id="auth-city-input"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phone
                  </label>
                  <input
                    id="auth-phone-input"
                    type="tel"
                    placeholder="+1 555-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
              </div>
            )}

            <button
              id="auth-submit-btn"
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow-md shadow-red-600/20 transition-colors flex items-center justify-center gap-2 mt-4"
            >
              <span>
                {mode === 'login' && 'Sign In'}
                {mode === 'signup' && 'Create Free Account'}
                {mode === 'forgot' && 'Send Password Reset Link'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Toggle between login / signup */}
          <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
            {mode === 'login' ? (
              <p>
                Don't have an account?{' '}
                <button
                  id="auth-toggle-to-signup"
                  onClick={() => setMode('signup')}
                  className="font-bold text-red-600 hover:underline"
                >
                  Register here
                </button>
              </p>
            ) : (
              <p>
                Already registered?{' '}
                <button
                  id="auth-toggle-to-login"
                  onClick={() => setMode('login')}
                  className="font-bold text-red-600 hover:underline"
                >
                  Sign in here
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
