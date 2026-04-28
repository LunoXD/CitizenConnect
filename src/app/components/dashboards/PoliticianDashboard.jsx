import { useEffect, useState } from 'react';
import { DashboardLayout } from './DashboardLayout';
import { AlertTriangle, Send, Megaphone } from 'lucide-react';
import { AnnouncementModal } from '../modals/AnnouncementModal';
import { api } from '../../lib/api';

export function PoliticianDashboard({ user, onLogout }) {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [selectedIssueId, setSelectedIssueId] = useState(null);
  const [responseText, setResponseText] = useState('');
  const [saving, setSaving] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await api.issues.all();
      setIssues(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleRespond = async (issueId) => {
    if (!responseText.trim()) return;
    setSaving(true);
    try {
      const updated = await api.issues.addResponse(issueId, { content: responseText, authorName: user.name, authorEmail: user.email });
      setIssues((prev) => prev.map((issue) => (issue.id === updated.id ? updated : issue)));
      setSelectedIssueId(null);
      setResponseText('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed.');
    } finally {
      setSaving(false);
    }
  };

  const handleAnnouncement = async (announcementData) => {
    setSaving(true);
    try {
      await api.announcements.create({ title: announcementData.title, content: announcementData.content, authorName: user.name, authorEmail: user.email });
      setShowAnnouncementModal(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout user={user} onLogout={onLogout}>
      <div className="space-y-8 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <div>
          <h1 className="text-5xl font-black text-gray-900">Politician Dashboard</h1>
          <p className="mt-3 text-2xl text-gray-700">Respond simply and post one announcement.</p>
        </div>

        {error && <div className="rounded-2xl border-2 border-red-300 bg-red-50 px-6 py-4 text-xl text-red-800">{error}</div>}

        <button onClick={() => setShowAnnouncementModal(true)} className="inline-flex items-center gap-3 rounded-2xl bg-[#FF9933] px-6 py-4 text-2xl font-bold text-white">
          <Megaphone className="h-7 w-7" />
          Make Announcement
        </button>

        {loading ? (
          <div className="text-2xl text-gray-500">Loading...</div>
        ) : issues.length === 0 ? (
          <div className="text-2xl text-gray-600">No issues.</div>
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

                {selectedIssueId === issue.id ? (
                  <div className="mt-5 rounded-2xl border-2 border-blue-300 bg-blue-50 p-5">
                    <textarea value={responseText} onChange={(e) => setResponseText(e.target.value)} placeholder="Write your response..." rows={5} className="w-full rounded-2xl border-2 border-gray-300 p-4 text-xl" />
                    <div className="mt-4 flex flex-wrap gap-3">
                      <button onClick={() => handleRespond(issue.id)} disabled={saving} className="rounded-2xl bg-[#138808] px-6 py-3 text-xl font-bold text-white disabled:opacity-50">
                        Send Response
                      </button>
                      <button onClick={() => { setSelectedIssueId(null); setResponseText(''); }} className="rounded-2xl bg-gray-500 px-6 py-3 text-xl font-bold text-white">
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => setSelectedIssueId(issue.id)} className="mt-5 inline-flex items-center gap-3 rounded-2xl bg-[#138808] px-6 py-4 text-2xl font-bold text-white">
                    <Send className="h-7 w-7" />
                    Respond
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {showAnnouncementModal && <AnnouncementModal onClose={() => setShowAnnouncementModal(false)} onSubmit={handleAnnouncement} isSubmitting={saving} />}
      </div>
    </DashboardLayout>
  );
}