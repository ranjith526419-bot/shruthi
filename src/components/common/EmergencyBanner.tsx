import React from 'react';
import { useData } from '../../context/DataContext';
import { AlertCircle, ArrowRight, Zap } from 'lucide-react';
import { BloodGroupBadge } from './BloodGroupBadge';

interface EmergencyBannerProps {
  onNavigateToRequests: () => void;
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({ onNavigateToRequests }) => {
  const { requests } = useData();

  const urgentRequests = requests.filter(
    (r) => (r.urgency === 'critical' || r.urgency === 'urgent') && r.status !== 'fulfilled' && r.status !== 'cancelled'
  );

  if (urgentRequests.length === 0) return null;

  const primary = urgentRequests[0];

  return (
    <div
      id="emergency-alert-banner"
      className="bg-red-700 text-white border-b border-red-800 shadow-inner px-4 py-2.5 transition-all"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs sm:text-sm">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-800 text-red-100 shrink-0 animate-pulse">
            <Zap className="w-3.5 h-3.5 fill-current" />
          </span>
          <span className="font-extrabold uppercase tracking-wider text-[11px] bg-red-900/80 px-2 py-0.5 rounded border border-red-500/40 shrink-0">
            Emergency Alert
          </span>
          <span className="font-semibold truncate">
            Urgent: {primary.unitsRequired} units of <span className="font-bold underline">{primary.bloodGroup}</span> needed at {primary.hospitalName} ({primary.city})
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <BloodGroupBadge group={primary.bloodGroup} size="sm" />
          <button
            id="emergency-banner-action-btn"
            onClick={onNavigateToRequests}
            className="inline-flex items-center gap-1 font-bold bg-white text-red-700 hover:bg-red-50 px-3 py-1 rounded-lg text-xs transition-colors shadow-xs"
          >
            <span>View & Respond</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
