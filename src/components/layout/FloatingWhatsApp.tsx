'use client';

import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const defaultMessage = encodeURIComponent(
    'Hello Saat Phere Events Concierge, I would like to inquire about wedding planning services.'
  );
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappRaw}?text=${defaultMessage}`;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 9990,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
      }}
    >
      {showTooltip && (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border-gold)',
            borderRadius: '8px',
            padding: '10px 14px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
            marginBottom: '10px',
            maxWidth: '220px',
            fontSize: '0.82rem',
            color: '#1F2937',
            position: 'relative',
          }}
        >
          <button
            onClick={() => setShowTooltip(false)}
            style={{
              position: 'absolute',
              top: '4px',
              right: '4px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#9CA3AF',
            }}
            aria-label="Dismiss WhatsApp tip"
          >
            <X size={12} />
          </button>
          <p style={{ fontWeight: 600, color: 'var(--color-maroon)', marginBottom: '2px' }}>
            Speak with an Event Director
          </p>
          <p style={{ fontSize: '0.75rem', color: '#6B7280' }}>
            Instant replies on WhatsApp for bookings & date checks.
          </p>
        </div>
      )}

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#25D366',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(37, 211, 102, 0.45)',
          transition: 'all 0.3s ease',
          textDecoration: 'none',
        }}
        className="animate-pulse-glow"
        aria-label="Chat with Saat Phere Events on WhatsApp"
      >
        <MessageCircle size={32} />
      </a>
    </div>
  );
};
