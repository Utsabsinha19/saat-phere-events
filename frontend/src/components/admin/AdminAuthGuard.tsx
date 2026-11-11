'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import { AdminSignIn } from './AdminSignIn';
import { Loader2, Sparkles } from 'lucide-react';

interface AdminUser {
  email: string;
  role: string;
}

interface AdminAuthContextType {
  user: AdminUser | null;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  user: null,
  logout: async () => {},
});

export const useAdminAuth = () => useContext(AdminAuthContext);

export const AdminAuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Immediate client session check
    try {
      const stored = sessionStorage.getItem('spe_admin_auth');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.email === 'saatpherektr@gmail.com') {
          setUser(parsed);
          setLoading(false);
          return;
        }
      }
    } catch {
      // Ignore parse errors
    }

    // 2. Server-side cookie verification fallback
    const checkServerAuth = async () => {
      try {
        const res = await fetch('/api/admin/auth', { credentials: 'include' });
        if (res.ok) {
          const json = await res.json();
          if (json.authenticated && json.user) {
            setUser(json.user);
            sessionStorage.setItem('spe_admin_auth', JSON.stringify(json.user));
          }
        }
      } catch (err) {
        console.error('Auth verification check failed:', err);
      } finally {
        setLoading(false);
      }
    };

    checkServerAuth();
  }, []);

  const logout = async () => {
    try {
      await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'logout' }),
        credentials: 'include',
      });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('spe_admin_auth');
        localStorage.removeItem('spe_admin_token');
      }
      setUser(null);
    }
  };

  // Loading state with luxury royal branding
  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#0C0C0C',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          gap: '16px',
        }}
      >
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: 'rgba(212, 175, 55, 0.12)',
            border: '2px solid var(--color-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-gold-light)',
          }}
        >
          <Sparkles size={24} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-gold-light)', fontSize: '0.95rem' }}>
          <Loader2 size={18} className="animate-spin" />
          <span>Verifying Executive Authorization...</span>
        </div>
      </div>
    );
  }

  // If not authenticated, render the dedicated SignIn screen
  if (!user) {
    return <AdminSignIn onSuccess={(authedUser) => setUser(authedUser)} />;
  }

  // When authenticated, provide user context to all admin screens
  return (
    <AdminAuthContext.Provider value={{ user, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
