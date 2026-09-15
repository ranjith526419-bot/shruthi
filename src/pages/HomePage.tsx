import React from 'react';
import { HeroSection } from '../components/public/HeroSection';
import { StatsSection } from '../components/public/StatsSection';
import { EmergencyRequestsSection } from '../components/public/EmergencyRequestsSection';
import { HowItWorksSection } from '../components/public/HowItWorksSection';
import { CompatibilityOverviewSection } from '../components/public/CompatibilityOverviewSection';
import { WhyDonateSection } from '../components/public/WhyDonateSection';
import { NearbyCentersSection } from '../components/public/NearbyCentersSection';
import { TestimonialsSection } from '../components/public/TestimonialsSection';
import { FAQSection } from '../components/public/FAQSection';
import { BloodGroup } from '../types';

interface HomePageProps {
  onNavigate: (tab: string, filter?: { bloodGroup?: BloodGroup; city?: string }) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div id="home-page-container" className="min-w-0">
      <HeroSection onNavigate={onNavigate} />
      <StatsSection />
      <EmergencyRequestsSection
        onNavigateToRequestForm={() => onNavigate('blood-request-form')}
        onNavigateToAllRequests={() => onNavigate('requests')}
      />
      <HowItWorksSection onNavigate={onNavigate} />
      <CompatibilityOverviewSection onNavigateToFull={() => onNavigate('compatibility')} />
      <WhyDonateSection />
      <NearbyCentersSection onNavigateToFindBlood={() => onNavigate('find-blood')} />
      <TestimonialsSection />
      <FAQSection />
    </div>
  );
};
