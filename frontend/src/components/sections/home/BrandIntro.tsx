'use client';

import React from 'react';
import Link from 'next/link';
import { SectionHeading } from '@/components/common/SectionHeading';
import {
  Award,
  Compass,
  HeartHandshake,
  Sparkles,
  MapPin,
  ShieldCheck,
  Palette,
  ArrowRight,
} from 'lucide-react';

export const BrandIntro: React.FC = () => {
  const whyChoosePillars = [
    {
      icon: MapPin,
      badge: 'Bihar Origin',
      title: 'Bihar’s Luxury Event Pioneer',
      description:
        'Born proudly in Katihar and serving Patna, Purnia, Bhagalpur, and all across Bihar. We deeply honor regional customs, Maithil & Bhojpuri traditions, and elevate them to royal palatial standards.',
    },
    {
      icon: Palette,
      badge: 'Bespoke Production',
      title: 'In-House Artisanal Scenography',
      description:
        'Our in-house master florists, timber craftsmen, and lighting artists craft custom grand mandaps, dramatic stages, and tunnel entries without inflated middleman commissions.',
    },
    {
      icon: Compass,
      badge: 'Turnkey Excellence',
      title: 'Flawless 360° Turnkey Logistics',
      description:
        'From venue negotiation, 3D CAD decor layouts, and guest hospitality to artist booking and precision timeline coordination, every minute is flawlessly executed.',
    },
    {
      icon: HeartHandshake,
      badge: 'White-Glove Care',
      title: 'Dedicated Shadow Concierge',
      description:
        'A dedicated family shadow concierge remains by the bride, groom, and parents throughout the wedding days—managing rituals, refreshments, and stage cues so you simply rejoice.',
    },
    {
      icon: ShieldCheck,
      badge: 'Honest Pricing',
      title: 'Transparent Budget Optimization',
      description:
        'Zero hidden margins, transparent line-item estimates, and flexible packages tailored to deliver supreme visual grandeur for every scale of celebration.',
    },
    {
      icon: Award,
      badge: 'Proven Legacy',
      title: '250+ Celebrated Royal Events',
      description:
        'A proven track record of orchestrating magnificent weddings and high-profile milestone galas trusted by distinguished families and enterprise brands alike.',
    },
  ];

  return (
    <section id="why-choose" className="section-padding ivory-bg" style={{ position: 'relative' }}>
      <div className="container">
        {/* 2nd Look Requirement: "Why Choose Saat Phere Events?" */}
        <SectionHeading
          subtitle="Proudly Rooted in Bihar • Revered Across India"
          title="Why Choose Saat Phere Events?"
          description="Named after the sacred seven vows that unite two souls for eternity, Saat Phere Events represents the pinnacle of luxury wedding and event management. Originating in Bihar, we blend heartfelt regional warmth with royal palatial opulence."
        />

        {/* 6 Luxury Feature Cards Grid — responsive: 1→2→3 columns */}
        <div className="brand-intro-grid">
          {whyChoosePillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="luxury-card luxury-card-hover brand-intro-card"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid rgba(212, 175, 55, 0.35)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '18px',
                    }}
                  >
                    <div
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(128, 0, 32, 0.15) 100%)',
                        border: '1px solid var(--color-gold)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-maroon)',
                      }}
                    >
                      <Icon size={26} />
                    </div>

                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        color: 'var(--color-gold-dark)',
                        background: 'var(--color-ivory)',
                        padding: '4px 10px',
                        borderRadius: '999px',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                      }}
                    >
                      {pillar.badge}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.25rem',
                      color: 'var(--color-maroon)',
                      marginBottom: '10px',
                      lineHeight: 1.35,
                    }}
                  >
                    {pillar.title}
                  </h3>

                  <p style={{ fontSize: '0.92rem', color: '#4B5563', lineHeight: 1.62 }}>
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bihar Heritage Statement Banner */}
        <div
          style={{
            backgroundColor: '#141414',
            color: '#FFFFFF',
            border: '2px solid var(--color-gold)',
            borderRadius: '16px',
            padding: '40px 32px',
            maxWidth: '920px',
            margin: '0 auto',
            textAlign: 'center',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.25)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-40px',
              right: '-40px',
              width: '180px',
              height: '180px',
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '14px',
            }}
          >
            <Sparkles size={16} color="var(--color-gold)" />
            <span
              style={{
                fontSize: '0.82rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                color: 'var(--color-gold-light)',
              }}
            >
              The Saat Phere Commitment
            </span>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.1rem, 2.2vw, 1.35rem)',
              color: '#FFFFFF',
              fontStyle: 'italic',
              marginBottom: '24px',
              lineHeight: 1.65,
            }}
          >
            &ldquo;On your wedding day, your only responsibility is to cherish every sacred ritual and heartbeat, while our team orchestrates the entire universe around you with royal grace.&rdquo;
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '14px',
            }}
          >
            <a
              href="#get-a-quote"
              className="btn-gold"
              style={{
                padding: '12px 28px',
                fontSize: '0.92rem',
                textDecoration: 'none',
              }}
            >
              <span>Get in Touch with Our Team</span>
              <ArrowRight size={16} />
            </a>

            <Link
              href="/about"
              style={{
                fontSize: '0.9rem',
                color: 'var(--color-gold-light)',
                textDecoration: 'underline',
                padding: '10px 16px',
              }}
            >
              Explore Our Story & Bihar Roots →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
