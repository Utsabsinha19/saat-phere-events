import React from 'react';
import { Metadata } from 'next';
import { QuotationCalculator } from '@/components/forms/QuotationCalculator';
import { SectionHeading } from '@/components/common/SectionHeading';
import { GoldDivider } from '@/components/common/GoldDivider';
import { Shield, Sparkles, Award, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Packages & Custom Quote Engine | Saat Phere Luxury Events',
  description:
    'Configure bespoke wedding planning and decor estimates with Saat Phere Events interactive quotation engine without fixed commoditized prices.',
};

export default function PackagesPage() {
  const tiers = [
    {
      name: 'Curated Intimate',
      scope: '50 – 150 Guests',
      focus: 'Heritage villas, private estates & boutique milestone gatherings.',
      features: ['Personal bridal concierge', 'Artisanal local floral decor', 'Acoustic musical curation'],
    },
    {
      name: 'Classic Luxury',
      scope: '150 – 350 Guests',
      focus: '5-Star city banqueting, beachfront resorts & regional heritage forts.',
      features: ['Full line-item master budget', 'Mandap CAD 3D blueprints', 'Complete multi-day coordination'],
    },
    {
      name: 'Signature Elegance',
      scope: '350 – 600 Guests',
      focus: 'Flagship Rajasthan palaces (Udaipur, Jaipur, Jodhpur).',
      features: ['Palace property buyout management', 'Bespoke airport fleet hospitality', 'Concert AV & Sangeet production'],
    },
    {
      name: 'Grand Royal Bespoke',
      scope: '600 – 1,500+ Guests',
      focus: 'Multi-day palatial takeovers, international destinations & VIP security.',
      features: ['Charter flight coordination', 'Celebrity headliner artist bookings', '24/7 dedicated shadow battalions'],
    },
  ];

  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Banner */}
      <section
        style={{
          background: 'var(--gradient-royal-overlay), url("/images/gallery/royal-feast.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF',
          padding: '100px 20px 80px 20px',
          textAlign: 'center',
        }}
      >
        <div className="container" style={{ maxWidth: '850px' }}>
          <span className="badge-gold" style={{ background: 'rgba(212, 175, 55, 0.25)', color: 'var(--color-gold-light)', marginBottom: '12px' }}>
            Customized Pricing Architecture
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
              color: '#FFFFFF',
              marginTop: '10px',
              marginBottom: '16px',
            }}
          >
            Bespoke Investment & Interactive Quote Engine
          </h1>
          <GoldDivider width="200px" />
          <p style={{ fontSize: '1.15rem', color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.6, marginTop: '16px' }}>
            True luxury cannot be reduced to rigid cookie-cutter packages. We construct tailored financial architectures that direct every rupee to maximum visual grandeur and seamless hospitality.
          </p>
        </div>
      </section>

      {/* Quotation Engine Form Section */}
      <section className="section-padding">
        <div className="container" style={{ maxWidth: '1020px' }}>
          <QuotationCalculator />
        </div>
      </section>

      {/* Bespoke Tiers Overview */}
      <section className="section-padding ivory-bg">
        <div className="container">
          <SectionHeading
            subtitle="Tier Benchmarks"
            title="Celebration Scale Frameworks"
            description="Our planning infrastructure scales effortlessly from intimate heritage gatherings to multi-day palatial takeovers."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
            }}
          >
            {tiers.map((t, idx) => (
              <div
                key={idx}
                className="luxury-card"
                style={{ padding: '32px 24px', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-gold-dark)', fontWeight: 700, textTransform: 'uppercase' }}>
                    {t.scope}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.45rem',
                      color: 'var(--color-maroon)',
                      marginTop: '6px',
                      marginBottom: '10px',
                    }}
                  >
                    {t.name}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#4B5563', lineHeight: 1.5, marginBottom: '20px' }}>
                    {t.focus}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '16px' }}>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {t.features.map((f, fIdx) => (
                      <li key={fIdx} style={{ fontSize: '0.85rem', color: '#1F2937', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: 'var(--color-gold)', fontWeight: 700 }}>•</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
