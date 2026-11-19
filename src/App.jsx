import React, { useState } from 'react';
import { Lock, X } from 'lucide-react';
import AdminDashboard from './components/AdminDashboard';
import PublicPortal from './components/PublicPortal';
import { PortalProvider, usePortal } from './context/PortalContext';

function PortalApp() {
  const { viewMode, loginAdmin } = usePortal();
  const [loginOpen, setLoginOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    if (loginAdmin(username, password)) {
      setLoginOpen(false);
      setUsername('');
      setPassword('');
      setLoginError('');
      return;
    }
    setLoginError('Invalid username or password.');
  };

  return (
    <>
      {viewMode === 'admin' ? (
        <AdminDashboard />
      ) : (
        <PublicPortal onOpenLogin={() => setLoginOpen(true)} />
      )}

      {loginOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setLoginOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-login-title"
            className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setLoginOpen(false)}
              aria-label="Close admin login"
              className="absolute right-4 top-4 rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            >
              <X size={18} />
            </button>
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-800">
              <Lock size={19} />
            </div>
            <h2 id="admin-login-title" className="text-xl font-bold text-slate-900">
              Administrator Login
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Sign in to manage the public portal.
            </p>
            <form onSubmit={handleLogin} className="mt-5 space-y-4">
              <div>
                <label htmlFor="admin-username" className="mb-1 block text-sm font-medium text-slate-700">
                  Username
                </label>
                <input
                  id="admin-username"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-emerald-800 focus:ring-2 focus:ring-emerald-800/20"
                />
              </div>
              <div>
                <label htmlFor="admin-password" className="mb-1 block text-sm font-medium text-slate-700">
                  Password
                </label>
                <input
                  id="admin-password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-emerald-800 focus:ring-2 focus:ring-emerald-800/20"
                />
              </div>
              {loginError && (
                <p role="alert" className="text-sm font-medium text-red-700">
                  {loginError}
                </p>
              )}
              <button
                type="submit"
                className="w-full rounded-lg bg-emerald-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-900"
              >
                Sign In
              </button>
            </form>
          </section>
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <PortalProvider>
      <PortalApp />
    </PortalProvider>
  );
}