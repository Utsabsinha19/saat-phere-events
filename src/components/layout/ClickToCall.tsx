'use client';

import React from 'react';
import { Phone, Calendar } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';

export const ClickToCall: React.FC = () => {
  return (
    <div
      className="mobile-sticky-action-bar"
      style={{
        display: 'none',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9980,
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid var(--color-border-gold)',
        padding: '10px 16px',
        boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.12)',
      }}
    >
      <style jsx>{`
        @media (max-width: 768px) {
          .mobile-sticky-action-bar {
            display: flex !important;
            gap: 12px;
          }
        }
      `}</style>

      <a
        href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          backgroundColor: 'var(--color-maroon)',
          color: '#FFFFFF',
          padding: '12px',
          borderRadius: '6px',
          fontWeight: 700,
          fontSize: '0.85rem',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}
      >
        <Phone size={16} color="var(--color-gold)" />
        Call Concierge
      </a>

      <a
        href="/contact"
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          background: 'var(--gradient-gold)',
          color: 'var(--color-dark)',
          padding: '12px',
          borderRadius: '6px',
          fontWeight: 700,
          fontSize: '0.85rem',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}
      >
        <Calendar size={16} />
        Inquire Now
      </a>
    </div>
  );
};
