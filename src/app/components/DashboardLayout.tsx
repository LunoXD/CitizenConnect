import { ReactNode } from 'react';
import { User as UserType } from '../App';
import { LogOut, User, Settings, Bell } from 'lucide-react';

interface DashboardLayoutProps {
  user: UserType;
  onLogout: () => void;
  children: ReactNode;
}

export function DashboardLayout({ user, onLogout, children }: DashboardLayoutProps) {
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'politician':
        return 'bg-purple-100 text-purple-800';
      case 'moderator':
        return 'bg-green-100 text-green-800';
      case 'citizen':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-indigo-600">CitizenConnect</h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(user.role || '')}`}>
                {user.role?.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Settings */}
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>

              {/* User Menu */}
              <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="hidden md:block">
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>

              {/* Logout */}
              <button
                onClick={onLogout}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
