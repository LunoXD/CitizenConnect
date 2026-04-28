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
    { key: 'politician', to: '/politician', label: 'Politician Panel', icon: Megaphone, visible: user.role === 'politician' || user.role === 'admin' },
    { key: 'admin', to: '/admin', label: 'Admin Panel', icon: Shield, visible: user.role === 'admin' },
  ].filter((item) => item.visible);

  const roleLabel = user.role === 'admin' ? 'Administrator' : user.role === 'moderator' ? 'Moderator' : user.role === 'politician' ? 'Politician' : 'Citizen';

  return (
    <DashboardLayout user={user} onLogout={logout}>
      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-5xl font-black text-gray-900">Welcome, {user.name}</h1>
        <p className="mt-3 text-2xl text-gray-700">You are signed in as {roleLabel}.</p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.key}
                to={item.to}
                className="flex items-center gap-5 rounded-3xl border-2 border-gray-300 bg-gray-50 px-6 py-6 text-left hover:border-[#FF9933]"
              >
                <Icon className="h-12 w-12 text-[#FF9933]" />
                <div>
                  <div className="text-3xl font-bold text-gray-900">{item.label}</div>
                  <div className="mt-1 text-lg text-gray-600">Open this page</div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl bg-orange-50 px-6 py-5 text-xl text-gray-800">
          Use the large buttons above to go where you need.
        </div>
      </div>
    </DashboardLayout>
  );
}