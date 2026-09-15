import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { UserRole } from '../../types';
import {
  Droplet,
  Menu,
  X,
  Bell,
  User,
  LogOut,
  Shield,
  Activity,
  HeartHandshake,
  Building2,
  Search,
  Check,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onNavigate }) => {
  const { currentUser, isAuthenticated, role, logout, switchDemoRole } = useAuth();
  const { notifications, markNotificationRead, markAllNotificationsRead } = useData();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isRolePickerOpen, setIsRolePickerOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifDropdownOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setIsUserDropdownOpen(false);
      }
      if (roleRef.current && !roleRef.current.contains(e.target as Node)) {
        setIsRolePickerOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'find-blood', label: 'Find Blood' },
    { id: 'become-donor', label: 'Become a Donor' },
    { id: 'requests', label: 'Blood Requests' },
    { id: 'compatibility', label: 'Blood Compatibility' },
    { id: 'centers', label: 'Nearby Centers' },
    { id: 'education', label: 'Education' },
    { id: 'about', label: 'About' }
  ];

  const getDashboardIdForRole = (userRole: UserRole) => {
    switch (userRole) {
      case 'donor':
        return 'donor-dashboard';
      case 'seeker':
        return 'seeker-dashboard';
      case 'hospital':
        return 'hospital-dashboard';
      case 'admin':
        return 'admin-dashboard';
      default:
        return 'donor-dashboard';
    }
  };

  const roleLabels: Record<UserRole, { label: string; icon: any; color: string }> = {
    donor: { label: 'Donor', icon: HeartHandshake, color: 'text-rose-700 bg-rose-50 border-rose-200' },
    seeker: { label: 'Seeker', icon: Search, color: 'text-blue-700 bg-blue-50 border-blue-200' },
    hospital: { label: 'Hospital/Bank', icon: Building2, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    admin: { label: 'Admin', icon: Shield, color: 'text-purple-700 bg-purple-50 border-purple-200' }
  };

  const currentRoleInfo = roleLabels[role] || roleLabels.donor;

  const handleNavClick = (tabId: string) => {
    onNavigate(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 group text-left focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-md shadow-red-600/20 group-hover:bg-red-700 transition-colors">
              <Droplet className="w-6 h-6 fill-white" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 block leading-none">
                Life<span className="text-red-600">Drop</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase">
                Blood Donation Network
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    isActive
                      ? 'text-red-700 bg-red-50/80 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Demo Quick Role Switcher */}
            <div className="relative" ref={roleRef}>
              <button
                id="role-switcher-dropdown-btn"
                onClick={() => setIsRolePickerOpen(!isRolePickerOpen)}
                title="Switch active role demo"
                className={`hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-lg border shadow-2xs transition-colors ${currentRoleInfo.color}`}
              >
                {React.createElement(currentRoleInfo.icon, { className: 'w-3.5 h-3.5' })}
                <span>Role: {currentRoleInfo.label}</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {isRolePickerOpen && (
                <div
                  id="role-picker-menu"
                  className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in"
                >
                  <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Switch User Role (Demo Mode)
                  </div>
                  {(['donor', 'seeker', 'hospital', 'admin'] as UserRole[]).map((r) => {
                    const info = roleLabels[r];
                    const isCurrent = role === r;
                    return (
                      <button
                        key={r}
                        id={`role-select-${r}`}
                        onClick={() => {
                          switchDemoRole(r);
                          setIsRolePickerOpen(false);
                          handleNavClick(getDashboardIdForRole(r));
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-left hover:bg-slate-50 transition-colors ${
                          isCurrent ? 'bg-red-50/50 text-red-700 font-bold' : 'text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {React.createElement(info.icon, { className: 'w-4 h-4' })}
                          <span>{info.label}</span>
                        </div>
                        {isCurrent && <Check className="w-3.5 h-3.5 text-red-600" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Notification Center */}
            <div className="relative" ref={notifRef}>
              <button
                id="navbar-notification-btn"
                onClick={() => setIsNotifDropdownOpen(!isNotifDropdownOpen)}
                className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
                aria-label="View notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span
                    id="unread-notifications-count-badge"
                    className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center ring-2 ring-white animate-pulse"
                  >
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotifDropdownOpen && (
                <div
                  id="notifications-dropdown-menu"
                  className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 z-50 animate-in fade-in"
                >
                  <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">Notifications</span>
                      {unreadCount > 0 && (
                        <span className="px-1.5 py-0.5 text-[10px] font-bold bg-red-100 text-red-800 rounded-full">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        id="mark-all-read-btn"
                        onClick={markAllNotificationsRead}
                        className="text-xs text-red-600 hover:text-red-800 font-semibold"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <p className="p-4 text-xs text-center text-slate-500">No notifications at this time.</p>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          id={`notification-row-${notif.id}`}
                          onClick={() => markNotificationRead(notif.id)}
                          className={`p-3.5 hover:bg-slate-50 cursor-pointer transition-colors ${
                            !notif.isRead ? 'bg-red-50/40' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <h5 className={`text-xs font-bold ${!notif.isRead ? 'text-red-900' : 'text-slate-800'}`}>
                              {notif.title}
                            </h5>
                            {!notif.isRead && (
                              <span className="w-2 h-2 rounded-full bg-red-600 shrink-0 mt-1" />
                            )}
                          </div>
                          <p className="text-[11px] text-slate-600 mt-1 leading-snug">{notif.message}</p>
                          <span className="text-[10px] text-slate-400 mt-1.5 block">
                            {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Dashboard shortcut / User Profile */}
            {isAuthenticated ? (
              <div className="relative" ref={userRef}>
                <button
                  id="navbar-user-profile-menu-btn"
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs border border-red-200">
                    {currentUser?.displayName?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="hidden sm:block text-xs font-bold text-slate-800 max-w-[100px] truncate">
                    {currentUser?.displayName?.split(' ')[0] || 'User'}
                  </span>
                </button>

                {isUserDropdownOpen && (
                  <div
                    id="user-profile-dropdown"
                    className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in"
                  >
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900 truncate">{currentUser?.displayName}</p>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser?.email}</p>
                      <div className="mt-1.5 inline-block">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                          Role: {currentUser?.role}
                        </span>
                      </div>
                    </div>

                    <div className="py-1">
                      <button
                        id="user-dropdown-dashboard-link"
                        onClick={() => {
                          handleNavClick(getDashboardIdForRole(role));
                          setIsUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-semibold"
                      >
                        <Activity className="w-4 h-4 text-red-600" />
                        <span>My {currentRoleInfo.label} Dashboard</span>
                      </button>

                      <button
                        id="user-dropdown-settings-link"
                        onClick={() => {
                          handleNavClick('profile-settings');
                          setIsUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                      >
                        <User className="w-4 h-4 text-slate-400" />
                        <span>Profile Settings</span>
                      </button>
                    </div>

                    <div className="border-t border-slate-100 pt-1 mt-1">
                      <button
                        id="user-dropdown-logout-btn"
                        onClick={() => {
                          logout();
                          setIsUserDropdownOpen(false);
                          handleNavClick('home');
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-red-600 hover:bg-red-50 font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                id="navbar-login-btn"
                onClick={() => handleNavClick('auth')}
                className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-xs transition-colors"
              >
                Sign In
              </button>
            )}

            {/* Direct Dashboard Button */}
            {isAuthenticated && (
              <button
                id="navbar-direct-dashboard-btn"
                onClick={() => handleNavClick(getDashboardIdForRole(role))}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-xs transition-colors"
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-nav-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div id="mobile-nav-drawer" className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2">
          {/* Role selector for mobile */}
          <div className="p-2.5 bg-slate-50 rounded-xl mb-3 border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
              Active Persona:
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {(['donor', 'seeker', 'hospital', 'admin'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  id={`mobile-role-select-${r}`}
                  onClick={() => {
                    switchDemoRole(r);
                    handleNavClick(getDashboardIdForRole(r));
                  }}
                  className={`text-xs py-1 px-2 rounded-lg font-bold flex items-center justify-center gap-1 border ${
                    role === r ? 'bg-red-600 text-white border-red-700' : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  <span>{r.charAt(0).toUpperCase() + r.slice(1)}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`mobile-nav-link-${link.id}`}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold ${
                  currentTab === link.id ? 'bg-red-50 text-red-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}

            {isAuthenticated && (
              <button
                id="mobile-nav-dashboard-link"
                onClick={() => handleNavClick(getDashboardIdForRole(role))}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-bold text-red-600 bg-red-50/60 mt-2"
              >
                My {currentRoleInfo.label} Dashboard
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
