import React from 'react';
import Link from 'next/link';
import { Phone, Mail, Clock, ShieldCheck } from 'lucide-react';
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
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--color-gold-light)' }}>
            <ShieldCheck size={14} color="var(--color-gold)" />
            Bespoke Luxury Wedding Planners • Pan-India & International
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#D1D5DB' }}>
            <Clock size={14} color="var(--color-gold)" />
            {SITE_CONFIG.contact.hours}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
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
              fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.6)',
              textDecoration: 'underline',
            }}
          >
            Admin Portal
          </Link>
        </div>
      </div>
    </div>
  );
};
