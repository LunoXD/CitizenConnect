import { Link, Navigate } from 'react-router';
import { Shield, UserRound, Users, Megaphone } from 'lucide-react';

import { DashboardLayout } from '../components/dashboards/DashboardLayout';
import { useAuth } from '../context/AuthContext';

export function DashboardHome() {
  const { user, logout } = useAuth();

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (user.onboardingCompleted === false) {
    return <Navigate to="/onboarding" replace />;
  }

  const quickLinks = [
    { key: 'citizen', to: '/citizen', label: 'Citizen Panel', icon: UserRound, visible: user.role === 'citizen' || user.role === 'admin' },
    { key: 'mod', to: '/mod', label: 'Moderator Panel', icon: Users, visible: user.role === 'moderator' || user.role === 'admin' },
    { key: 'politician', to: '/poicitfrn', label: 'Politician Panel', icon: Megaphone, visible: user.role === 'politician' || user.role === 'admin' },
    { key: 'admin', to: '/admin', label: 'Admin Panel', icon: Shield, visible: user.role === 'admin' },
  ].filter((item) => item.visible);

  return (
    <DashboardLayout user={user} onLogout={logout}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome {user.name}. Open your panel from below.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickLinks.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.key}
              to={item.to}
              className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 hover:border-[#FF9933] hover:shadow transition"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#FF9933] flex items-center justify-center mb-4">
                <Icon className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">{item.label}</h2>
              <p className="text-sm text-gray-500 mt-1">Open {item.to}</p>
            </Link>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
