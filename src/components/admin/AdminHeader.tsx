'use client';

import React from 'react';
import { Bell, ShieldCheck, User } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="admin-topbar">
      <div>
        <h1 style={{ fontSize: '1.35rem', color: '#111827', fontWeight: 700 }}>{title}</h1>
        {subtitle && <p style={{ fontSize: '0.82rem', color: '#6B7280' }}>{subtitle}</p>}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#059669', background: '#ECFDF5', padding: '6px 12px', borderRadius: '9999px', border: '1px solid #A7F3D0' }}>
          <ShieldCheck size={14} />
          SSL Encrypted • RBAC Live
        </div>

        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <Bell size={18} color="#6B7280" />
          <span
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              backgroundColor: 'var(--color-maroon)',
              color: '#FFFFFF',
              borderRadius: '50%',
              width: '14px',
              height: '14px',
              fontSize: '0.65rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
            }}
          >
            4
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderLeft: '1px solid #E5E7EB', paddingLeft: '16px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-maroon)',
              color: 'var(--color-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
            }}
          >
            <User size={16} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1F2937' }}>Lead Concierge</div>
            <div style={{ fontSize: '0.72rem', color: '#9CA3AF' }}>{SITE_CONFIG.contact.email}</div>
          </div>
        </div>
      </div>
    </header>
  );
};
