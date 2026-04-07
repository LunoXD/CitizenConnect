import { useMemo, useState } from 'react';
import { useNavigate, Navigate } from 'react-router';
import { User, Users, Shield, Megaphone, Eye, AlertCircle } from 'lucide-react';

import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

const ROLE_CONFIGS = [
  { id: 'citizen', icon: Users, color: 'bg-[#FF9933]' },
  { id: 'politician', icon: Megaphone, color: 'bg-[#138808]' },
  { id: 'moderator', icon: Eye, color: 'bg-[#000080]' },
  { id: 'admin', icon: Shield, color: 'bg-gray-700' },
];

export function OnboardingPage() {
  const navigate = useNavigate();
  const { user, completeOnboarding } = useAuth();
  const { t } = useLanguage();

  const [name, setName] = useState(user?.name || '');
  const [selectedRole, setSelectedRole] = useState(user?.role || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const roles = useMemo(() => ROLE_CONFIGS.map((r) => ({ ...r, label: t.auth.roles[r.id] })), [t]);

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (user.onboardingCompleted !== false) {
    return <Navigate to={`/${user.role}`} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }

    if (!selectedRole) {
      setError(t.auth.roleError);
      return;
    }

    setLoading(true);
    try {
      const updatedUser = await completeOnboarding({
        email: user.email,
        name: name.trim(),
        role: selectedRole,
      });
      navigate(`/${updatedUser.role}`, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to complete onboarding.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fff7ed_0%,#f8fafc_45%,#eef2ff_100%)] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-extrabold text-gray-900">Complete your profile</h1>
          <p className="text-sm text-gray-500">One last step before entering BharatLink.</p>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <p className="text-xs text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.auth.namePh}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF9933]/30 focus:border-[#FF9933] transition"
            />
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-600 mb-2">{t.auth.selectRole}</p>
            <div className="grid grid-cols-4 gap-2">
              {roles.map((r) => {
                const Icon = r.icon;
                const active = selectedRole === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setSelectedRole(r.id)}
                    className={`flex flex-col items-center gap-1 py-2.5 rounded-xl border-2 text-xs font-semibold transition-all ${
                      active
                        ? 'border-[#FF9933] bg-orange-50 text-[#FF9933]'
                        : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200'
                    }`}
                  >
                    <div className={`w-7 h-7 ${r.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    {r.label}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#FF9933] hover:bg-[#ffaa55] disabled:opacity-60 text-white font-bold text-sm transition-colors shadow-sm"
          >
            {loading ? <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Finish onboarding'}
          </button>
        </form>
      </div>
    </div>
  );
}
