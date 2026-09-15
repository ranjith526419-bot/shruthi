/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { EmergencyBanner } from './components/common/EmergencyBanner';
import { ToastContainer } from './components/common/Toast';
import { ErrorBoundary } from './components/common/ErrorBoundary';

// Pages
import { HomePage } from './pages/HomePage';
import { FindBloodPage } from './pages/FindBloodPage';
import { BecomeDonorPage } from './pages/BecomeDonorPage';
import { BloodRequestPage } from './pages/BloodRequestPage';
import { BloodCompatibilityPage } from './pages/BloodCompatibilityPage';
import { NearbyCentersPage } from './pages/NearbyCentersPage';
import { DonorSearchPage } from './pages/DonorSearchPage';
import { EducationPage } from './pages/EducationPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyTermsPage } from './pages/PrivacyTermsPage';
import { AuthPage } from './pages/AuthPage';
import { ProfileSettingsPage } from './pages/ProfileSettingsPage';

// Dashboards
import { DonorDashboard } from './components/dashboard/DonorDashboard';
import { SeekerDashboard } from './components/dashboard/SeekerDashboard';
import { HospitalDashboard } from './components/dashboard/HospitalDashboard';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { BloodGroup } from './types';

function AppContent() {
  const { role, isAuthenticated } = useAuth();
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [findBloodFilters, setFindBloodFilters] = useState<{
    bloodGroup?: BloodGroup;
    city?: string;
  }>({});
  const [requestFormPrefill, setRequestFormPrefill] = useState<{
    bloodGroup?: BloodGroup;
    hospitalId?: string;
  }>({});

  const handleNavigate = (
    tab: string,
    filter?: { bloodGroup?: BloodGroup; city?: string }
  ) => {
    if (filter) {
      setFindBloodFilters(filter);
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToRequestForm = (prefilled?: {
    bloodGroup?: BloodGroup;
    hospitalId?: string;
  }) => {
    if (prefilled) {
      setRequestFormPrefill(prefilled);
    }
    setCurrentTab('blood-request-form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-red-100 selection:text-red-900 font-sans">
      {/* Top Critical Emergency Banner */}
      <EmergencyBanner onNavigateToRequests={() => handleNavigate('requests')} />

      {/* Main Navbar */}
      <Navbar currentTab={currentTab} onNavigate={handleNavigate} />

      {/* Main View Router */}
      <main className="flex-1">
        {currentTab === 'home' && <HomePage onNavigate={handleNavigate} />}

        {currentTab === 'find-blood' && (
          <FindBloodPage
            initialBloodGroup={findBloodFilters.bloodGroup}
            initialCity={findBloodFilters.city}
            onNavigateToRequestForm={handleNavigateToRequestForm}
          />
        )}

        {currentTab === 'become-donor' && (
          <BecomeDonorPage
            onSuccessNavigate={() => handleNavigate('donor-dashboard')}
          />
        )}

        {currentTab === 'requests' && (
          <BloodRequestPage
            prefilledBloodGroup={requestFormPrefill.bloodGroup}
            prefilledHospitalId={requestFormPrefill.hospitalId}
            showFormInitially={false}
          />
        )}

        {currentTab === 'blood-request-form' && (
          <BloodRequestPage
            prefilledBloodGroup={requestFormPrefill.bloodGroup}
            prefilledHospitalId={requestFormPrefill.hospitalId}
            showFormInitially={true}
          />
        )}

        {currentTab === 'compatibility' && (
          <BloodCompatibilityPage onNavigate={handleNavigate} />
        )}

        {currentTab === 'centers' && (
          <NearbyCentersPage
            onNavigateToFindBlood={() => handleNavigate('find-blood')}
          />
        )}

        {currentTab === 'donor-search' && <DonorSearchPage />}

        {currentTab === 'education' && (
          <EducationPage onNavigate={handleNavigate} />
        )}

        {currentTab === 'about' && <AboutPage onNavigate={handleNavigate} />}

        {currentTab === 'privacy-terms' && <PrivacyTermsPage />}

        {currentTab === 'auth' && (
          <AuthPage
            onSuccessNavigate={(userRole) => {
              if (userRole === 'donor') handleNavigate('donor-dashboard');
              else if (userRole === 'seeker') handleNavigate('seeker-dashboard');
              else if (userRole === 'hospital') handleNavigate('hospital-dashboard');
              else if (userRole === 'admin') handleNavigate('admin-dashboard');
              else handleNavigate('home');
            }}
          />
        )}

        {currentTab === 'profile-settings' && <ProfileSettingsPage />}

        {/* Role Dashboards */}
        {currentTab === 'donor-dashboard' && (
          <DonorDashboard onNavigateToRequests={() => handleNavigate('requests')} />
        )}

        {currentTab === 'seeker-dashboard' && (
          <SeekerDashboard
            onNavigateToRequestForm={() => handleNavigate('blood-request-form')}
          />
        )}

        {currentTab === 'hospital-dashboard' && <HospitalDashboard />}

        {currentTab === 'admin-dashboard' && <AdminDashboard />}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Global Toast Notifications */}
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <DataProvider>
          <AppContent />
        </DataProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
