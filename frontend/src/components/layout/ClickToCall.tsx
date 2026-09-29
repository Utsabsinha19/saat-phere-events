'use client';

import React from 'react';
import { Phone, Calendar } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';

export const ClickToCall: React.FC = () => {
  return (
    <div className="mobile-sticky-action-bar">

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
