'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, AlertCircle, Loader2, Sparkles, ArrowLeft } from 'lucide-react';

interface AdminSignInProps {
  onSuccess: (user: { email: string; role: string }) => void;
}

export const AdminSignIn: React.FC<AdminSignInProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'login',
          email: email.trim(),
          password: password.trim(),
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Access Denied: Invalid credentials.');
      }

      // Store in session storage as client backup
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('spe_admin_auth', JSON.stringify(json.user));
        if (json.token) {
          localStorage.setItem('spe_admin_token', json.token);
        }
      }

      onSuccess(json.user);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Authentication failed. Please check your credentials.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#0C0C0C',
        color: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '30px 16px',
      }}
    >
      {/* Ambient Radial Gradients */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          right: '-15%',
          width: '550px',
          height: '550px',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-15%',
          left: '-15%',
          width: '550px',
          height: '550px',
          background: 'radial-gradient(circle, rgba(128, 0, 32, 0.22) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          backgroundColor: '#141414',
          borderRadius: '16px',
          border: '1px solid rgba(212, 175, 55, 0.35)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(212, 175, 55, 0.1)',
          padding: '40px 32px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Brand Crest & Title */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'rgba(212, 175, 55, 0.12)',
              border: '2px solid var(--color-gold)',
              margin: '0 auto 16px auto',
              color: 'var(--color-gold-light)',
            }}
          >
            <ShieldCheck size={32} />
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--color-gold-light)',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '6px',
            }}
          >
            <Sparkles size={12} color="var(--color-gold)" />
            <span>Saat Phere Events</span>
            <Sparkles size={12} color="var(--color-gold)" />
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.65rem',
              color: '#FFFFFF',
              margin: '0 0 6px 0',
              fontWeight: 700,
            }}
          >
            Executive Admin Console
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#9CA3AF', margin: 0 }}>
            Restricted Portal • Authorized Personnel Only
          </p>
        </div>

        {/* Error Alert Banner */}
        {error && (
          <div
            style={{
              backgroundColor: 'rgba(220, 38, 38, 0.15)',
              border: '1px solid #DC2626',
              borderRadius: '8px',
              padding: '12px 14px',
              marginBottom: '22px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              color: '#FCA5A5',
              fontSize: '0.86rem',
              lineHeight: 1.5,
            }}
          >
            <AlertCircle size={18} color="#EF4444" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>{error}</div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div style={{ marginBottom: '18px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: 'var(--color-gold-light)',
                marginBottom: '8px',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
              }}
            >
              Executive Email *
            </label>
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9CA3AF',
                  pointerEvents: 'none',
                }}
              >
                <Mail size={18} />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="saatpherektr@gmail.com"
                style={{
                  width: '100%',
                  padding: '13px 14px 13px 44px',
                  backgroundColor: '#202020',
                  border: '1px solid rgba(212, 175, 55, 0.35)',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  fontSize: '0.94rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
              />
            </div>
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: '24px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: 'var(--color-gold-light)',
                marginBottom: '8px',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
              }}
            >
              Access Password *
            </label>
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9CA3AF',
                  pointerEvents: 'none',
                }}
              >
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                style={{
                  width: '100%',
                  padding: '13px 46px 13px 44px',
                  backgroundColor: '#202020',
                  border: '1px solid rgba(212, 175, 55, 0.35)',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  fontSize: '0.94rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#9CA3AF',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                }}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-gold"
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '0.96rem',
              fontWeight: 700,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Verifying Credentials...</span>
              </>
            ) : (
              <>
                <Lock size={16} />
                <span>Verify &amp; Enter Console</span>
              </>
            )}
          </button>
        </form>

        {/* Security Notice */}
        <div
          style={{
            marginTop: '24px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: '0.74rem', color: '#6B7280', margin: '0 0 14px 0', lineHeight: 1.5 }}>
            Access is strictly restricted to <strong>saatpherektr@gmail.com</strong>.
            All unauthorized login attempts are recorded and monitored.
          </p>

          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.82rem',
              color: 'var(--color-gold-light)',
              textDecoration: 'none',
            }}
          >
            <ArrowLeft size={14} />
            <span>Return to Public Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
