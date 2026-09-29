import React from 'react';
import { Crown, Sparkles, Building2, ShieldCheck } from 'lucide-react';

export const LuxuryStats: React.FC = () => {
  const stats = [
    {
      icon: Crown,
      number: '550+',
      label: 'Royal Weddings Executed',
      detail: 'Pan-India & International Destinations',
    },
    {
      icon: Building2,
      number: '120+',
      label: 'Palatial Buyouts Managed',
      detail: 'Exclusive Island, Fort & Heritage Properties',
    },
    {
      icon: Sparkles,
      number: '18+',
      label: 'Years of Haute Artistry',
      detail: 'Awarded India’s Top Wedding Producers',
    },
    {
      icon: ShieldCheck,
      number: '100%',
      label: 'HNWI Privacy Discretion',
      detail: 'Strict Non-Disclosure Standards',
    },
  ];

  return (
    <section
      style={{
        background: 'var(--gradient-maroon)',
        color: '#FFFFFF',
        borderTop: '2px solid var(--color-gold)',
        borderBottom: '2px solid var(--color-gold)',
      }}
      className="stats-section"
    >
      <div className="container">
        <div
          className="stats-grid"
        >
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} style={{ padding: '16px' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'rgba(212, 175, 55, 0.2)',
                    border: '1px solid var(--color-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px auto',
                    color: 'var(--color-gold-light)',
                  }}
                >
                  <Icon size={26} />
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(2.4rem, 4vw, 3rem)',
                    fontWeight: 800,
                    color: 'var(--color-gold-light)',
                    lineHeight: 1,
                    marginBottom: '8px',
                  }}
                >
                  {s.number}
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '4px' }}>
                  {s.label}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.75)' }}>
                  {s.detail}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
