import { useMemo, useState } from 'react';
import { Link, Navigate } from 'react-router';
import { Shield, UserRound, Users, Megaphone, Sparkles, Phone, Mail, CircleCheckBig, ChevronRight, Search } from 'lucide-react';

import { DashboardLayout } from '../components/dashboards/DashboardLayout';
import { useAuth } from '../context/AuthContext';

export function DashboardHome() {
  const { user, logout } = useAuth();
  const [panelQuery, setPanelQuery] = useState('');

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (user.onboardingCompleted === false) {
    return <Navigate to="/onboarding" replace />;
  }

  const roleLabel = user.role === 'admin'
    ? 'Administrator'
    : user.role === 'moderator'
      ? 'Moderator'
      : user.role === 'politician'
        ? 'Politician'
        : 'Citizen';

  const quickLinks = [
    {
      key: 'citizen',
      to: '/citizen',
      label: 'Citizen Panel',
      hint: 'Report civic issues and track complaint progress',
      icon: UserRound,
      visible: user.role === 'citizen' || user.role === 'admin',
    },
    {
      key: 'mod',
      to: '/mod',
      label: 'Moderator Panel',
      hint: 'Review and resolve queue items quickly',
      icon: Users,
      visible: user.role === 'moderator' || user.role === 'admin',
    },
    {
      key: 'politician',
      to: '/poicitfrn',
      label: 'Politician Panel',
      hint: 'Publish updates and respond to public feedback',
      icon: Megaphone,
      visible: user.role === 'politician' || user.role === 'admin',
    },
    {
      key: 'admin',
      to: '/admin',
      label: 'Admin Panel',
      hint: 'Manage users, roles, and platform controls',
      icon: Shield,
      visible: user.role === 'admin',
    },
  ].filter((item) => item.visible);

  const filteredLinks = useMemo(() => {
    const query = panelQuery.trim().toLowerCase();
    if (!query) return quickLinks;
    return quickLinks.filter((item) =>
      item.label.toLowerCase().includes(query) ||
      item.hint.toLowerCase().includes(query) ||
      item.to.toLowerCase().includes(query),
    );
  }, [panelQuery, quickLinks]);

  const stats = [
    { label: 'Panels Available', value: String(quickLinks.length) },
    { label: 'Current Role', value: roleLabel },
    { label: 'Onboarding', value: user.onboardingCompleted ? 'Complete' : 'Pending' },
    { label: 'Account Status', value: user.status || 'active' },
  ];

  return (
    <DashboardLayout user={user} onLogout={logout}>
      <div className="mb-6 md:mb-8 rounded-3xl border border-orange-100 bg-[radial-gradient(circle_at_0%_0%,#fff7ed_0%,#ffffff_42%,#f8fafc_100%)] p-4 sm:p-5 md:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 md:gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-[#cc6f1c] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Unified Dashboard Hub
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900">Welcome, {user.name}</h1>
            <p className="text-gray-600 mt-2 max-w-2xl">
              Start from one place, then jump to the right workspace for your responsibilities.
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4 w-full lg:w-auto lg:min-w-[280px]">
            <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3">Profile Snapshot</p>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center gap-2 text-gray-700"><CircleCheckBig className="w-4 h-4 text-green-600" /> {roleLabel}</div>
              <div className="flex items-center gap-2 text-gray-700"><Mail className="w-4 h-4 text-gray-400" /> {user.email}</div>
              <div className="flex items-center gap-2 text-gray-700"><Phone className="w-4 h-4 text-gray-400" /> {user.phoneNumber || 'Not added'}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        {stats.map((item) => (
          <div key={item.label} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{item.label}</p>
            <p className="mt-2 text-lg font-bold text-gray-900">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h2 className="text-xl font-bold text-gray-900">Your Panels</h2>
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={panelQuery}
            onChange={(e) => setPanelQuery(e.target.value)}
            placeholder="Search panel by name or route"
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF9933]/30 focus:border-[#FF9933]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredLinks.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.key}
              to={item.to}
              className="group rounded-2xl bg-white border border-gray-100 shadow-sm p-5 md:p-6 hover:border-[#FF9933] hover:shadow-md hover:-translate-y-0.5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF9933]"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#FF9933] flex items-center justify-center mb-4">
                <Icon className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">{item.label}</h2>
              <p className="text-sm text-gray-500 mt-1">{item.hint}</p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#FF9933]">
                Open Panel <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          );
        })}

        {filteredLinks.length === 0 && (
          <div className="col-span-full rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
            No panel matches "{panelQuery}".
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
