import React from 'react';
import { BloodGroup } from '../../types';

interface BloodGroupBadgeProps {
  group: BloodGroup;
  size?: 'sm' | 'md' | 'lg';
  showSpecialLabel?: boolean;
  className?: string;
}

export const BloodGroupBadge: React.FC<BloodGroupBadgeProps> = ({
  group,
  size = 'md',
  showSpecialLabel = false,
  className = ''
}) => {
  const isNegative = group.includes('-');
  const isUniversalDonor = group === 'O-';
  const isUniversalRecipient = group === 'AB+';

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 font-bold',
    md: 'text-sm px-2.5 py-1 font-bold',
    lg: 'text-lg px-4 py-2 font-black'
  };

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <span
        id={`blood-badge-${group.replace('+', 'pos').replace('-', 'neg')}`}
        className={`inline-flex items-center justify-center rounded-lg tracking-wide border shadow-xs transition-colors ${sizeClasses[size]} ${
          isNegative
            ? 'bg-red-700 text-white border-red-800'
            : 'bg-red-50 text-red-700 border-red-200'
        }`}
      >
        <span className="inline-block w-1.5 h-1.5 rounded-full mr-1 bg-current opacity-80" />
        {group}
      </span>

      {showSpecialLabel && (isUniversalDonor || isUniversalRecipient) && (
        <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
          {isUniversalDonor ? 'Univ Donor' : 'Univ Recipient'}
        </span>
      )}
    </div>
  );
};
