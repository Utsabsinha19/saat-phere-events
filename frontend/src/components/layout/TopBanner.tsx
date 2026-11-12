import React from 'react';
import Link from 'next/link';
import { Phone, Mail, Clock, ShieldCheck, Lock } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';

export const TopBanner: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-maroon-dark)',
        color: '#FFFFFF',
        fontSize: '0.8rem',
        borderBottom: '1px solid rgba(212, 175, 55, 0.3)',
        padding: '8px 0',
      }}
    >
      <div className="container top-banner-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span className="top-banner-brand" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--color-gold-light)' }}>
            <ShieldCheck size={14} color="var(--color-gold)" />
            Proudly Rooted in Bihar • Luxury Wedding Planners Across India
          </span>
          <span className="top-banner-hours" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#D1D5DB' }}>
            <Clock size={14} color="var(--color-gold)" />
            {SITE_CONFIG.contact.hours}
          </span>
        </div>

        <div className="top-banner-right" style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a
            href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--color-gold-light)',
              fontWeight: 600,
            }}
          >
            <Phone size={13} color="var(--color-gold)" />
            {SITE_CONFIG.contact.phone}
          </a>
          <a
            className="top-banner-email"
            href={`mailto:${SITE_CONFIG.contact.email}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#FFFFFF',
            }}
          >
            <Mail size={13} color="var(--color-gold)" />
            {SITE_CONFIG.contact.email}
          </a>
          <Link
            href="/admin"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '0.74rem',
              color: '#F3F4F6',
              backgroundColor: 'rgba(212, 175, 55, 0.15)',
              border: '1px solid rgba(212, 175, 55, 0.45)',
              padding: '2px 9px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: 500,
              transition: 'all 0.2s ease',
            }}
            title="Administrator Sign In"
          >
            <Lock size={11} color="var(--color-gold)" />
            <span>Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

