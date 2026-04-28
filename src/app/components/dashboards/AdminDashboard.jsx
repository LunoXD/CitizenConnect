import { useEffect, useState } from 'react';
import { DashboardLayout } from './DashboardLayout';
import { Users, Shield } from 'lucide-react';
import { api } from '../../lib/api';

export function AdminDashboard({ user, onLogout }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [workingId, setWorkingId] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await api.admin.users(user.email);
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleStatus = async (userId, status) => {
    setWorkingId(userId);
    try {
      const updated = await api.admin.updateUserStatus(userId, status, user.email);
      setUsers((prev) => prev.map((item) => (item.id === userId ? updated : item)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed.');
    } finally {
      setWorkingId(null);
    }
  };

  const handleRole = async (userId, role) => {
    setWorkingId(userId);
    try {
      const updated = await api.admin.updateUserRole(userId, role, user.email);
      setUsers((prev) => prev.map((item) => (item.id === userId ? updated : item)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed.');
    } finally {
      setWorkingId(null);
    }
  };

  const stats = [
    { label: 'Total Users', value: users.length, icon: Users },
    { label: 'Admins', value: users.filter((item) => item.role === 'admin').length, icon: Shield },
  ];

  return (
    <DashboardLayout user={user} onLogout={onLogout}>
      <div className="space-y-8 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <div>
          <h1 className="text-5xl font-black text-gray-900">Admin Dashboard</h1>
          <p className="mt-3 text-2xl text-gray-700">Manage users in a simple list.</p>
        </div>

        {error && <div className="rounded-2xl border-2 border-red-300 bg-red-50 px-6 py-4 text-xl text-red-800">{error}</div>}

        <div className="grid gap-5 md:grid-cols-2">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="rounded-3xl border-2 border-gray-300 bg-gray-50 p-6">
                <div className="flex items-center gap-4">
                  <Icon className="h-12 w-12 text-[#FF9933]" />
                  <div>
                    <div className="text-2xl text-gray-700">{stat.label}</div>
                    <div className="text-5xl font-black text-gray-900">{stat.value}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {loading ? (
          <div className="text-2xl text-gray-500">Loading...</div>
        ) : users.length === 0 ? (
          <div className="text-2xl text-gray-600">No users.</div>
        ) : (
          <div className="space-y-6">
            {users.map((item) => (
              <div key={item.id} className="rounded-2xl border-2 border-gray-300 bg-gray-50 p-6">
                <h2 className="text-3xl font-bold text-gray-900">{item.name}</h2>
                <p className="mt-2 text-xl text-gray-700">{item.email}</p>
                <div className="mt-4 flex flex-wrap gap-3 text-lg">
                  <span className="rounded-xl bg-white px-4 py-2 font-semibold text-gray-700">Role: {item.role}</span>
                  <span className={`rounded-xl px-4 py-2 font-semibold ${item.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    Status: {item.status}
                  </span>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <select value={item.status} onChange={(e) => handleStatus(item.id, e.target.value)} disabled={workingId === item.id} className="rounded-2xl border-2 border-gray-300 bg-white px-5 py-4 text-xl font-bold disabled:opacity-50">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <select value={item.role} onChange={(e) => handleRole(item.id, e.target.value)} disabled={workingId === item.id} className="rounded-2xl border-2 border-gray-300 bg-white px-5 py-4 text-xl font-bold disabled:opacity-50">
                    <option value="citizen">Citizen</option>
                    <option value="moderator">Moderator</option>
                    <option value="politician">Politician</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}