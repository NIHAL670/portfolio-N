import { useState } from 'react';
import { auditWebsite } from '../../services/api';
import { Button } from '../ui/Button';
import { Spinner } from '../ui/Spinner';

export function AuditTool() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    setError('');
    setResults(null);
    try {
      const { data } = await auditWebsite(url);
      setResults(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to audit website. Please check the URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 50) return 'text-warning';
    return 'text-danger';
  };

  const getTimeColor = (ms) => {
    if (ms < 1000) return 'text-success';
    if (ms < 3000) return 'text-warning';
    return 'text-danger';
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter your website URL (e.g. example.com)"
          className="flex-1 bg-brand border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-muted focus:border-accent focus:outline-none transition-colors"
        />
        <Button type="submit" disabled={loading} className="flex-shrink-0">
          {loading ? <Spinner size="sm" /> : 'Audit My Site'}
        </Button>
      </form>

      {loading && (
        <div className="text-center py-12">
          <Spinner size="lg" className="mb-4" />
          <p className="text-muted text-sm">Analyzing your website…</p>
        </div>
      )}

      {error && (
        <div className="bg-danger/10 border border-danger/20 rounded-xl p-4 text-danger text-sm">
          {error}
        </div>
      )}

      {results && (
        <div className="space-y-4 animate-fade-in">
          {/* Score */}
          <div className="text-center p-8 rounded-2xl bg-surface border border-white/5">
            <div className={`text-6xl font-heading font-bold mb-2 ${getScoreColor(results.score)}`}>
              {results.score}/100
            </div>
            <p className="text-muted text-sm">Overall Health Score</p>
          </div>

          {/* Checks Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(results.checks).map(([key, check]) => (
              <div key={key} className="flex items-center gap-3 p-4 rounded-xl bg-surface border border-white/5">
                <span className="text-xl">{check.passed ? '✅' : '❌'}</span>
                <span className="text-sm text-gray-300">{check.label}</span>
              </div>
            ))}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-surface border border-white/5">
              <span className="text-xl">⚡</span>
              <span className={`text-sm font-medium ${getTimeColor(results.responseTime)}`}>
                Response Time: {results.responseTime}ms
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
