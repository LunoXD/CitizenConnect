import { useState } from 'react';
import { Users, Shield, Megaphone, Eye, Mail, Lock } from 'lucide-react';
import { User, UserRole } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LandingPageProps {
  onLogin: (user: User) => void;
}

export function LandingPage({ onLogin }: LandingPageProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const roles = [
    {
      id: 'citizen' as UserRole,
      name: 'Citizen',
      icon: Users,
      description: 'Report issues, provide feedback, and receive updates',
      color: 'bg-blue-500',
    },
    {
      id: 'politician' as UserRole,
      name: 'Politician',
      icon: Megaphone,
      description: 'Respond to concerns, post updates, and engage with citizens',
      color: 'bg-purple-500',
    },
    {
      id: 'moderator' as UserRole,
      name: 'Moderator',
      icon: Eye,
      description: 'Monitor interactions and ensure respectful communication',
      color: 'bg-green-500',
    },
    {
      id: 'admin' as UserRole,
      name: 'Admin',
      icon: Shield,
      description: 'Oversee platform operations and manage user roles',
      color: 'bg-red-500',
    },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole && email) {
      // Mock login - in real app this would authenticate with backend
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0],
        email,
        role: selectedRole,
      };
      onLogin(mockUser);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1764136105889-c900461a874c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwYnVpbGRpbmclMjBkZW1vY3JhY3l8ZW58MXx8fHwxNzcxNzUzODQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Government building"
            className="w-full h-[500px] object-cover opacity-20"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              CitizenConnect
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Bridging the gap between citizens and their elected representatives. 
              Report issues, provide feedback, and stay informed about local governance.
            </p>
          </div>
        </div>
      </div>

      {/* Role Selection */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Choose Your Role
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`p-6 rounded-xl border-2 transition-all ${
                  selectedRole === role.id
                    ? 'border-indigo-600 bg-indigo-50 shadow-lg scale-105'
                    : 'border-gray-200 bg-white hover:border-indigo-300 hover:shadow-md'
                }`}
              >
                <div className={`w-16 h-16 ${role.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{role.name}</h3>
                <p className="text-sm text-gray-600">{role.description}</p>
              </button>
            );
          })}
        </div>

        {/* Login Form */}
        {selectedRole && (
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Sign In as {roles.find(r => r.id === selectedRole)?.name}
            </h3>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
              >
                Sign In
              </button>
            </form>

            <p className="mt-4 text-sm text-gray-500 text-center">
              Demo mode: Use any email and password to login
            </p>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-white py-16 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Platform Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Report Issues</h3>
              <p className="text-gray-600">
                Easily report local issues and concerns to your representatives
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Megaphone className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Stay Informed</h3>
              <p className="text-gray-600">
                Receive updates and announcements from elected officials
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Transparent Communication</h3>
              <p className="text-gray-600">
                Foster open dialogue between citizens and politicians
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
