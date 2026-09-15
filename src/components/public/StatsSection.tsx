import React from 'react';
import { useData } from '../../context/DataContext';
import { Droplet, Heart, Building2, Users } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const { inventory, donors, hospitals, requests } = useData();

  const totalUnits = inventory.reduce((acc, curr) => acc + curr.unitsAvailable, 0);
  const activeDonors = donors.filter((d) => d.isAvailable).length;
  const fulfilledRequests = requests.filter((r) => r.status === 'fulfilled').length;
  const verifiedHospitals = hospitals.filter((h) => h.isVerified).length;

  const stats = [
    {
      id: 'stat-units',
      label: 'Units in Hospital Stock',
      value: totalUnits.toString(),
      subtext: 'Across all 8 blood groups',
      icon: Droplet,
      color: 'text-red-600 bg-red-50'
    },
    {
      id: 'stat-donors',
      label: 'Active Volunteer Donors',
      value: activeDonors.toString(),
      subtext: 'Ready for emergency calls',
      icon: Users,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      id: 'stat-hospitals',
      label: 'Verified Medical Centers',
      value: verifiedHospitals.toString(),
      subtext: 'Licensed regional facilities',
      icon: Building2,
      color: 'text-emerald-600 bg-emerald-50'
    },
    {
      id: 'stat-lives',
      label: 'Transfusions Coordinated',
      value: (fulfilledRequests + 184).toString(),
      subtext: 'Lives positively impacted',
      icon: Heart,
      color: 'text-rose-600 bg-rose-50'
    }
  ];

  return (
    <section className="py-12 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              id={stat.id}
              className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-red-200 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                  {React.createElement(stat.icon, { className: 'w-5 h-5' })}
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {stat.value}
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">{stat.label}</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">{stat.subtext}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
