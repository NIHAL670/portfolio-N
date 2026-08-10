import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { FcGoogle } from 'react-icons/fc';
import { login } from '../../services/api';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export function AdminLogin({ error: externalError }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(externalError ? 'Access denied. This Google account is not authorized.' : '');
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-brand">
      <div className="w-full max-w-sm p-8 rounded-2xl bg-surface border border-white/5 text-center">
        <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center text-white font-heading font-bold text-2xl mx-auto mb-6">
          C
        </div>
        <h1 className="text-2xl font-heading font-bold text-white mb-2">Admin Access</h1>
        <p className="text-muted text-sm mb-8">Only authorized team members can access this area.</p>

        {error && (
          <div className="bg-danger/10 border border-danger/20 rounded-xl p-3 text-danger text-sm mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-4 mb-8 text-left">
          <div>
            <label className="block text-sm font-medium text-muted mb-1.5 ml-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-brand border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
              placeholder="admin@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted mb-1.5 ml-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-brand border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
              placeholder="••••••••"
              required
            />
          </div>
          <Button type="submit" className="w-full" isLoading={isLoading}>
            Sign In with Email
          </Button>
        </form>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/5"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-surface px-2 text-muted">Or continue with</span>
          </div>
        </div>

        <Button onClick={handleGoogleLogin} className="w-full gap-3 bg-white text-gray-800 hover:bg-gray-100" type="button">
          <FcGoogle size={20} />
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}
