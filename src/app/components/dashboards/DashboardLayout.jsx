import { LogOut } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import govLogo from '../../../assets/images/government-of-india.jpg';

export function DashboardLayout({ user, onLogout, children }) {
  const { t } = useLanguage();

  const getRoleLabel = (role) => {
    return t.auth.roles[role] || role;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div style={{ background: 'linear-gradient(to right, #FF9933 0%, #FF9933 33.33%, #ffffff 33.33%, #ffffff 66.67%, #138808 66.67%, #138808 100%)', height: '4px' }} />

      <header className="bg-white border-b border-gray-200" role="banner">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-4">
              <img
                src={govLogo}
                alt="Government of India"
                className="h-12 w-auto object-contain"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <div>
                <div className="text-2xl font-black leading-none">
                  <span style={{ color: '#FF9933' }}>Bharat</span>
                  <span style={{ color: '#138808' }}>Link</span>
                </div>
                <div className="text-sm font-semibold text-gray-600">
                  {getRoleLabel(user.role || '')}
                </div>
              </div>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center gap-2 rounded-2xl border-2 border-gray-300 px-5 py-3 text-lg font-bold text-gray-800 hover:border-red-300 hover:text-red-700"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
          </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8" role="main" aria-label="Dashboard content">
        {children}
      </main>
    </div>
  );
}
