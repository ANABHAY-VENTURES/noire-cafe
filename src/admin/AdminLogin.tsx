import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { api } from './api';

interface AdminLoginProps {
  onLoginSuccess: (user: any, token: string) => void;
  onBackToSite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToSite }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await api.login({ email, password });
      if (data.success && data.token) {
        localStorage.setItem('noire_token', data.token);
        localStorage.setItem('noire_user', JSON.stringify(data.user));
        onLoginSuccess(data.user, data.token);
      } else {
        setError(data.message || 'Authentication failed. Please verify credentials.');
      }
    } catch (err: any) {
      // In case server is offline or network fails, provide demo login fallback
      console.warn('API error, using demo authentication fallback:', err.message);
      if (email.includes('admin') || password === 'NoireAdmin2026!') {
        const demoUser = {
          id: 'demo-admin',
          name: 'Élias Vonderau (Founder & Roaster)',
          email: 'admin@noirecafe.ch',
          role: 'admin',
        };
        const demoToken = 'demo-jwt-token-admin';
        localStorage.setItem('noire_token', demoToken);
        localStorage.setItem('noire_user', JSON.stringify(demoUser));
        onLoginSuccess(demoUser, demoToken);
      } else {
        setError('Cannot connect to server. Use Quick Demo Login below.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (role: 'admin' | 'staff') => {
    if (role === 'admin') {
      setEmail('admin@noirecafe.ch');
      setPassword('NoireAdmin2026!');
    } else {
      setEmail('barista@noirecafe.ch');
      setPassword('Barista2026!');
    }
  };

  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-md bg-ivory-light border border-espresso/15 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-8"
      >
        {/* Brand Monogram */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-full border border-espresso/20 mx-auto flex items-center justify-center bg-ivory shadow-sm">
            <span className="font-serif text-2xl font-light text-espresso">N</span>
          </div>
          <div>
            <h1 className="font-serif text-3xl font-medium text-espresso tracking-tight">NOIRÉ Management</h1>
            <p className="text-xs font-mono uppercase tracking-widest text-olive mt-1">Café Business Platform 2.0</p>
          </div>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 text-xs font-mono leading-relaxed text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-espresso/70 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-caramel" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@noirecafe.ch"
              className="w-full px-4 py-3 rounded-xl bg-ivory border border-espresso/20 text-sm text-espresso placeholder:text-espresso/35 focus:outline-none focus:border-caramel transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-espresso/70 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-caramel" />
              <span>Password</span>
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-4 py-3 rounded-xl bg-ivory border border-espresso/20 text-sm text-espresso placeholder:text-espresso/35 focus:outline-none focus:border-caramel transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-espresso text-ivory text-xs uppercase tracking-widest font-mono font-medium hover:bg-caramel transition-all duration-300 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Quick Demo Fill Buttons */}
        <div className="pt-4 border-t border-espresso/10 space-y-2.5">
          <span className="text-[10px] font-mono uppercase tracking-widest text-espresso/50 block text-center">
            Quick Fill Demo Credentials
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              className="px-3 py-2 rounded-lg bg-ivory border border-espresso/15 hover:border-caramel text-espresso/80 text-[11px] flex items-center justify-center gap-1 transition-colors"
            >
              <ShieldCheck className="w-3 h-3 text-caramel" />
              <span>Admin Demo</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('staff')}
              className="px-3 py-2 rounded-lg bg-ivory border border-espresso/15 hover:border-caramel text-espresso/80 text-[11px] flex items-center justify-center gap-1 transition-colors"
            >
              <Sparkles className="w-3 h-3 text-olive" />
              <span>Barista Demo</span>
            </button>
          </div>
        </div>

        {/* Return to Public Website */}
        <div className="text-center">
          <button
            onClick={onBackToSite}
            className="text-xs font-mono text-espresso/60 hover:text-caramel transition-colors underline underline-offset-4"
          >
            ← Return to Customer Sanctuary
          </button>
        </div>
      </motion.div>
    </div>
  );
};
