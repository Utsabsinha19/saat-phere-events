import React from 'react';

interface GoldDividerProps {
  className?: string;
  width?: string;
}

export const GoldDivider: React.FC<GoldDividerProps> = ({ className = '', width = '160px' }) => {
  return (
    <div
      className={`gold-divider-container ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        margin: '16px auto',
        width,
      }}
    >
      <span
        style={{
          flex: 1,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--color-gold))',
        }}
      />
      <span
        style={{
          width: '8px',
          height: '8px',
          transform: 'rotate(45deg)',
          backgroundColor: 'var(--color-gold)',
          boxShadow: '0 0 8px rgba(212, 175, 55, 0.6)',
        }}
      />
      <span
        style={{
          flex: 1,
          height: '1px',
          background: 'linear-gradient(90deg, var(--color-gold), transparent)',
        }}
      />
    </div>
  );
};
