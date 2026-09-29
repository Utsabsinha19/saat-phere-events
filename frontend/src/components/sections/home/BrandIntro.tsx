import React from 'react';
import Link from 'next/link';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Award, Compass, HeartHandshake, Sparkles, ArrowRight } from 'lucide-react';

export const BrandIntro: React.FC = () => {
  const pillars = [
    {
      icon: Award,
      title: 'Architectural Heritage',
      description: 'Honoring centuries-old Indian royal wedding customs with magnificent mandap architecture and floral artistry.',
    },
    {
      icon: Compass,
      title: 'Flawless White-Glove Logistics',
      description: 'Turnkey guest arrivals, palace buyouts, charter aviation, and 24/7 dedicated family shadow concierges.',
    },
    {
      icon: HeartHandshake,
      title: 'Uncompromising Confidentiality',
      description: 'Strict non-disclosure protocols and private security guards trusted by High-Net-Worth families and dignitaries.',
    },
  ];

  return (
    <section id="brand-intro" className="section-padding ivory-bg">
      <div className="container">
        <SectionHeading
          subtitle="The Saat Phere Philosophy"
          title="Where Royal Traditions Meet Modern Haute Event Production"
          description="Named after the sacred seven vows that unite two souls for a lifetime, Saat Phere Events represents the pinnacle of Indian luxury celebration management. We orchestrate immersive sensory worlds where no fantasy is too grand."
        />

        <div className="brand-intro-grid">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
              className="luxury-card brand-intro-card"
                style={{
                  textAlign: 'center',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'var(--color-ivory)',
                    border: '1px solid var(--color-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px auto',
                    color: 'var(--color-maroon)',
                  }}
                >
                  <Icon size={28} />
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.35rem',
                    color: 'var(--color-maroon)',
                    marginBottom: '12px',
                  }}
                >
                  {p.title}
                </h3>
                <p style={{ fontSize: '0.92rem', color: '#4B5563', lineHeight: 1.6 }}>
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>

        <div
          style={{
            textAlign: 'center',
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border-gold)',
            borderRadius: '12px',
            padding: '32px',
            maxWidth: '820px',
            margin: '0 auto',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '10px' }}>
            <Sparkles size={16} color="var(--color-gold)" />
            <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-gold-dark)' }}>
              Bespoke Event Direction
            </span>
          </div>
          <p style={{ fontSize: '1.05rem', color: '#1F2937', fontStyle: 'italic', marginBottom: '20px' }}>
            &ldquo;Our promise is simple: on your wedding day, your only responsibility is to feel the magic of every heartbeat while we orchestrate the universe around you.&rdquo;
          </p>
          <Link href="/about" className="btn-primary" style={{ padding: '12px 24px', fontSize: '0.88rem' }}>
            Read Our Founder’s Story & Methodology
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
};
