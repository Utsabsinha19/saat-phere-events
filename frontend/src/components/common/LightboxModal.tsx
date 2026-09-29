'use client';

import React from 'react';
import { X, MapPin } from 'lucide-react';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  category: string;
  location?: string;
  description?: string;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  title,
  category,
  location,
  description,
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(10, 10, 10, 0.92)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: 'relative',
          maxWidth: '900px',
          width: '100%',
          backgroundColor: '#1E1E1E',
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid var(--color-gold)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.75)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(0, 0, 0, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '50%',
            color: '#FFFFFF',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            cursor: 'pointer',
          }}
          aria-label="Close image modal"
        >
          <X size={22} />
        </button>

        <div style={{ position: 'relative', maxHeight: '70vh', overflow: 'hidden' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={title}
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '70vh',
              objectFit: 'contain',
              display: 'block',
              margin: '0 auto',
            }}
          />
        </div>

        <div style={{ padding: '24px', color: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span className="badge-gold">{category}</span>
            {location && (
              <span style={{ fontSize: '0.85rem', color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={14} color="var(--color-gold)" />
                {location}
              </span>
            )}
          </div>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--color-gold-light)', marginBottom: '8px' }}>
            {title}
          </h3>
          {description && (
            <p style={{ fontSize: '0.95rem', color: '#D1D5DB', lineHeight: 1.5 }}>
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
