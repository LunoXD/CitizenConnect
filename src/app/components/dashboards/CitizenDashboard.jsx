import { useEffect, useState } from 'react';
import { DashboardLayout } from './DashboardLayout';
import { Plus, MessageSquare, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { IssueReportModal } from '../modals/IssueReportModal';
import { FeedbackModal } from '../modals/FeedbackModal';
import { api } from '../../lib/api';

export function CitizenDashboard({ user, onLogout }) {
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submittingIssue, setSubmittingIssue] = useState(false);
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  const [issues, setIssues] = useState([]);
  const [updates, setUpdates] = useState([]);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const [myIssues, announcements] = await Promise.all([api.issues.mine(user.email), api.announcements.all()]);
      setIssues(Array.isArray(myIssues) ? myIssues : []);
      setUpdates(Array.isArray(announcements) ? announcements : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, [user.email]);

  const handleIssueSubmit = async (issueData) => {
    setSubmittingIssue(true);
    try {
      const created = await api.issues.create({
        title: issueData.title,
        description: issueData.description,
        category: issueData.category,
        location: issueData.location,
        reporterEmail: user.email,
      });
      setIssues((prev) => [created, ...prev]);
      setShowIssueModal(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit issue.');
    } finally {
      setSubmittingIssue(false);
    }
  };

  const handleUpvote = async (issueId) => {
    try {
      const updated = await api.issues.upvote(issueId);
      setIssues((prev) => prev.map((issue) => (issue.id === updated.id ? updated : issue)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upvote.');
    }
  };

  const handleFeedbackSubmit = async (feedbackData) => {
    setSubmittingFeedback(true);
    try {
      await api.feedback.create({
        rating: feedbackData.rating,
        feedback: feedbackData.feedback,
        category: feedbackData.category,
        authorName: user.name,
        email: user.email,
      });
      setShowFeedbackModal(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit feedback.');
    } finally {
      setSubmittingFeedback(false);
    }
  };

  const getStatusColor = (status) => {
    switch (String(status).toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (String(status).toLowerCase()) {
      case 'pending': return Clock;
      case 'in-progress':
      case 'in_progress': return AlertTriangle;
      case 'resolved': return CheckCircle;
      default: return Clock;
    }
  };

  return (
    <DashboardLayout user={user} onLogout={onLogout}>
      <div className="space-y-8 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <div>
          <h1 className="text-5xl font-black text-gray-900">Citizen Dashboard</h1>
          <p className="mt-3 text-2xl text-gray-700">Report one issue or read plain updates.</p>
        </div>

        {error && <div className="rounded-2xl border-2 border-red-300 bg-red-50 px-6 py-4 text-xl text-red-800">{error}</div>}

        <div className="flex flex-wrap gap-4">
          <button onClick={() => setShowIssueModal(true)} disabled={submittingIssue} className="inline-flex items-center gap-3 rounded-2xl bg-[#FF9933] px-6 py-4 text-2xl font-bold text-white disabled:opacity-50">
            <Plus className="h-7 w-7" />
            Report Issue
          </button>
          <button onClick={() => setShowFeedbackModal(true)} className="inline-flex items-center gap-3 rounded-2xl bg-[#138808] px-6 py-4 text-2xl font-bold text-white">
            <MessageSquare className="h-7 w-7" />
            Give Feedback
          </button>
        </div>

        <div>
          <h2 className="text-4xl font-black text-gray-900 mb-6">My Issues</h2>
          {loading ? (
            <div className="text-2xl text-gray-500">Loading...</div>
          ) : issues.length === 0 ? (
            <div className="text-2xl text-gray-600">No issues yet.</div>
          ) : (
            <div className="space-y-5">
              {issues.map((issue) => {
                const StatusIcon = getStatusIcon(issue.status);
                return (
                  <div key={issue.id} className="rounded-2xl border-2 border-gray-300 bg-gray-50 p-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex-1">
                        <h3 className="text-3xl font-bold text-gray-900">{issue.title}</h3>
                        <p className="mt-3 text-xl text-gray-700">{issue.description}</p>
                        <div className="mt-4 flex flex-wrap gap-3 text-lg">
                          <span className={`rounded-xl px-4 py-2 font-bold ${getStatusColor(issue.status)}`}>
                            <StatusIcon className="mr-2 inline h-5 w-5" />
                            {String(issue.status).replace('_', ' ')}
                          </span>
                          <span className="rounded-xl bg-white px-4 py-2 font-semibold text-gray-700">{issue.category}</span>
                          <span className="rounded-xl bg-white px-4 py-2 font-semibold text-gray-700">{issue.location}</span>
                        </div>
                      </div>
                      <button onClick={() => handleUpvote(issue.id)} className="rounded-2xl border-2 border-gray-300 bg-white px-6 py-4 text-2xl font-bold text-gray-900">
                        👍 {issue.upvotes}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-4xl font-black text-gray-900 mb-6">Updates</h2>
          {loading ? (
            <div className="text-2xl text-gray-500">Loading...</div>
          ) : updates.length === 0 ? (
            <div className="text-2xl text-gray-600">No announcements yet.</div>
          ) : (
            <div className="space-y-5">
              {updates.map((update) => (
                <div key={update.id} className="rounded-2xl border-2 border-gray-300 bg-gray-50 p-6">
                  <h3 className="text-3xl font-bold text-gray-900">{update.title}</h3>
                  <p className="mt-2 text-xl text-gray-700">by {update.authorName}</p>
                  <p className="mt-4 text-xl text-gray-800">{update.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {showIssueModal && <IssueReportModal onClose={() => setShowIssueModal(false)} onSubmit={handleIssueSubmit} isSubmitting={submittingIssue} />}
        {showFeedbackModal && <FeedbackModal onClose={() => setShowFeedbackModal(false)} onSubmit={handleFeedbackSubmit} isSubmitting={submittingFeedback} />}
      </div>
    </DashboardLayout>
  );
}