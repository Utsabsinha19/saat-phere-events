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
    <div className="floating-whatsapp-wrapper">
      {showTooltip && (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border-gold)',
            borderRadius: '10px',
            padding: '10px 14px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
            marginBottom: '8px',
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
              padding: '2px',
            }}
            aria-label="Dismiss WhatsApp tip"
          >
            <X size={12} />
          </button>
          <p style={{ fontWeight: 700, color: 'var(--color-maroon)', marginBottom: '2px', fontSize: '0.82rem' }}>
            Speak with an Event Director
          </p>
          <p style={{ fontSize: '0.74rem', color: '#6B7280', lineHeight: 1.3 }}>
            Instant replies on WhatsApp for bookings &amp; date checks.
          </p>
        </div>
      )}

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: '#25D366',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 20px rgba(37, 211, 102, 0.4)',
          transition: 'all 0.3s ease',
          textDecoration: 'none',
        }}
        className="animate-pulse-glow"
        aria-label="Chat with Saat Phere Events on WhatsApp"
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <MessageCircle size={26} />
      </a>
    </div>
  );
};
