import { useEffect, useState } from 'react';
import { DashboardLayout } from './DashboardLayout';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { api } from '../../lib/api';

export function ModeratorDashboard({ user, onLogout }) {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [workingId, setWorkingId] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await api.issues.all();
      setIssues((Array.isArray(data) ? data : []).filter((issue) => String(issue.status || '').toLowerCase() !== 'resolved'));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleUpdate = async (issueId, status) => {
    setWorkingId(issueId);
    try {
      const updated = await api.issues.updateStatus(issueId, status);
      setIssues((prev) => prev.map((issue) => (issue.id === updated.id ? updated : issue)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed.');
    } finally {
      setWorkingId(null);
    }
  };

  return (
    <DashboardLayout user={user} onLogout={onLogout}>
      <div className="space-y-8 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <div>
          <h1 className="text-5xl font-black text-gray-900">Moderator Dashboard</h1>
          <p className="mt-3 text-2xl text-gray-700">Review issues in a simple list.</p>
        </div>

        {error && <div className="rounded-2xl border-2 border-red-300 bg-red-50 px-6 py-4 text-xl text-red-800">{error}</div>}

        {loading ? (
          <div className="text-2xl text-gray-500">Loading...</div>
        ) : issues.length === 0 ? (
          <div className="text-2xl text-gray-600">No issues to review.</div>
        ) : (
          <div className="space-y-6">
            {issues.map((issue) => (
              <div key={issue.id} className="rounded-2xl border-2 border-gray-300 bg-gray-50 p-6">
                <h2 className="text-3xl font-bold text-gray-900">{issue.title}</h2>
                <p className="mt-3 text-xl text-gray-700">{issue.description}</p>
                <div className="mt-4 flex flex-wrap gap-3 text-lg">
                  <span className="rounded-xl bg-yellow-100 px-4 py-2 font-bold text-yellow-800">
                    <AlertTriangle className="mr-2 inline h-5 w-5" />
                    {String(issue.status).replace('_', ' ').toUpperCase()}
                  </span>
                  <span className="rounded-xl bg-white px-4 py-2 font-semibold text-gray-700">{issue.category}</span>
                </div>
                <div className="mt-6 flex flex-wrap gap-4">
                  <button onClick={() => handleUpdate(issue.id, 'in_progress')} disabled={workingId === issue.id} className="inline-flex items-center gap-2 rounded-2xl bg-[#138808] px-6 py-4 text-2xl font-bold text-white disabled:opacity-50">
                    <CheckCircle className="h-6 w-6" />
                    Approve
                  </button>
                  <button onClick={() => handleUpdate(issue.id, 'rejected')} disabled={workingId === issue.id} className="inline-flex items-center gap-2 rounded-2xl bg-red-600 px-6 py-4 text-2xl font-bold text-white disabled:opacity-50">
                    <XCircle className="h-6 w-6" />
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}