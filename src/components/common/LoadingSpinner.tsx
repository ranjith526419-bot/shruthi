import React from 'react';
import { Heart } from 'lucide-react';

interface LoadingSpinnerProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  label = 'Loading LifeDrop clinical data...',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div id="loading-spinner-wrapper" className="flex flex-col items-center justify-center p-8 gap-3 text-slate-500">
      <div className="relative flex items-center justify-center">
        <div className={`${sizeClasses[size]} rounded-full border-2 border-red-200 border-t-red-600 animate-spin`} />
        <Heart className="w-3.5 h-3.5 text-red-600 absolute animate-pulse fill-red-600" />
      </div>
      {label && <p className="text-xs font-medium text-slate-500 animate-pulse">{label}</p>}
    </div>
  );
};
