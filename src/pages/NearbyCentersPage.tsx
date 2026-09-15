import React from 'react';
import { NearbyCentersSection } from '../components/public/NearbyCentersSection';

export const NearbyCentersPage: React.FC<{ onNavigateToFindBlood: () => void }> = ({ onNavigateToFindBlood }) => {
  return (
    <div id="nearby-centers-page" className="py-6 min-h-screen bg-slate-50/50">
      <NearbyCentersSection onNavigateToFindBlood={onNavigateToFindBlood} />
    </div>
  );
};
