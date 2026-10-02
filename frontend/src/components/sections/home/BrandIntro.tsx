'use client';

import React, { useState } from 'react';
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
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const BrandIntro: React.FC = () => {
  const [showAllPillars, setShowAllPillars] = useState(false);
  const [expandedCard1, setExpandedCard1] = useState(false);

  const whyChoosePillars = [
    {
      icon: MapPin,
      badge: 'Bihar Pioneer',
      title: 'Bihar’s Luxury Event Pioneer',
      subtitle: 'Specialists in Marwari & Rajasthani Weddings',
      leadDescription:
        'From authentic Marwari and Rajasthani traditions to celebrations across diverse cultures, we plan and manage every wedding with elegance, attention to detail, and deep respect for traditions.',
      extendedDescription:
        'Born proudly in Katihar and orchestrating celebrations across Patna, Purnia, Bhagalpur, and premier palatial circuits across India.',
      hasReadMore: true,
    },
    {
      icon: Palette,
      badge: 'Bespoke Production',
      title: 'In-House Artisanal Scenography',
      leadDescription:
        'Our in-house master florists, timber craftsmen, and lighting artists craft custom grand mandaps, dramatic stages, and tunnel entries without inflated middleman commissions.',
      hasReadMore: false,
    },
    {
      icon: Compass,
      badge: 'Turnkey Excellence',
      title: 'Flawless 360° Turnkey Logistics',
      leadDescription:
        'From venue negotiation, 3D CAD decor layouts, and guest hospitality to artist booking and precision timeline coordination, every minute is flawlessly executed.',
      hasReadMore: false,
    },
    {
      icon: HeartHandshake,
      badge: 'White-Glove Care',
      title: 'Dedicated Shadow Concierge',
      leadDescription:
        'A dedicated family shadow concierge remains by the bride, groom, and parents throughout the wedding days—managing rituals, refreshments, and stage cues so you simply rejoice.',
      hasReadMore: false,
    },
    {
      icon: ShieldCheck,
      badge: 'Honest Pricing',
      title: 'Transparent Budget Optimization',
      leadDescription:
        'Zero hidden margins, transparent line-item estimates, and flexible packages tailored to deliver supreme visual grandeur for every scale of celebration.',
      hasReadMore: false,
    },
    {
      icon: Award,
      badge: 'Proven Legacy',
      title: '250+ Celebrated Royal Events',
      leadDescription:
        'A proven track record of orchestrating magnificent weddings and high-profile milestone galas trusted by distinguished families and enterprise brands alike.',
      hasReadMore: false,
    },
  ];

  const visiblePillars = showAllPillars ? whyChoosePillars : whyChoosePillars.slice(0, 3);

  return (
    <section id="why-choose" className="section-padding ivory-bg" style={{ position: 'relative', paddingTop: '64px', paddingBottom: '64px' }}>
      <div className="container">
        {/* Section Heading */}
        <SectionHeading
          subtitle="Proudly Rooted in Bihar • Revered Across India"
          title="Why Choose Saat Phere Events?"
          description="Named after the sacred seven vows that unite two souls for eternity, Saat Phere Events represents the pinnacle of luxury wedding and event management, blending regional warmth with royal palatial opulence."
        />

        {/* Compact Luxury Feature Cards Grid */}
        <div
          className="brand-intro-grid"
          style={{
            marginBottom: '24px',
            gap: '22px',
          }}
        >
          {visiblePillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="luxury-card luxury-card-hover brand-intro-card"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '14px',
                  border: '1px solid rgba(212, 175, 55, 0.35)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-sm)',
                  padding: '24px 22px',
                  transition: 'all 0.3s ease',
                }}
              >
                <div>
                  {/* Top Bar: Icon + Badge */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '14px',
                    }}
                  >
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(128, 0, 32, 0.15) 100%)',
                        border: '1px solid var(--color-gold)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-maroon)',
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={22} />
                    </div>

                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        color: 'var(--color-gold-dark)',
                        background: 'var(--color-ivory)',
                        padding: '4px 10px',
                        borderRadius: '999px',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {pillar.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.18rem',
                      color: 'var(--color-maroon)',
                      marginBottom: pillar.subtitle ? '4px' : '8px',
                      lineHeight: 1.3,
                      fontWeight: 600,
                    }}
                  >
                    {pillar.title}
                  </h3>

                  {/* Subtitle if available */}
                  {pillar.subtitle && (
                    <div
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        color: 'var(--color-gold-dark)',
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                        marginBottom: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                      }}
                    >
                      <Sparkles size={12} color="var(--color-gold)" style={{ flexShrink: 0 }} />
                      <span>{pillar.subtitle}</span>
                    </div>
                  )}

                  {/* Content with Read More Toggle for Card 1 */}
                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: '#4B5563',
                      lineHeight: 1.55,
                      margin: 0,
                    }}
                  >
                    {pillar.leadDescription}
                    {pillar.hasReadMore && expandedCard1 && (
                      <span style={{ display: 'inline', marginLeft: '4px', color: '#374151' }}>
                        {' '}{pillar.extendedDescription}
                      </span>
                    )}
                  </p>

                  {/* Inline Read More / Show Less Button */}
                  {pillar.hasReadMore && (
                    <button
                      type="button"
                      onClick={() => setExpandedCard1(!expandedCard1)}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: '6px 0 0 0',
                        color: 'var(--color-gold-dark)',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        textDecoration: 'underline',
                        textUnderlineOffset: '2px',
                      }}
                      aria-expanded={expandedCard1}
                    >
                      <span>{expandedCard1 ? 'Read less' : 'Read more...'}</span>
                      {expandedCard1 ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Compact Toggle: View All 6 Pillars / Show Less */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '36px',
          }}
        >
          <button
            type="button"
            onClick={() => setShowAllPillars(!showAllPillars)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 24px',
              borderRadius: '999px',
              fontSize: '0.84rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              border: '1px solid var(--color-gold)',
              backgroundColor: showAllPillars ? 'var(--color-maroon)' : '#FFFFFF',
              color: showAllPillars ? '#FFFFFF' : 'var(--color-maroon)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <span>
              {showAllPillars
                ? 'Show Top 3 Pillars'
                : 'View All 6 Excellence Pillars (Concierge, Pricing & Legacy)'}
            </span>
            {showAllPillars ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
        </div>

        {/* Refined Bihar Heritage Statement Banner */}
        <div
          style={{
            backgroundColor: '#141414',
            color: '#FFFFFF',
            border: '1.5px solid var(--color-gold)',
            borderRadius: '14px',
            padding: '30px 24px',
            maxWidth: '880px',
            margin: '0 auto',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.22)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-40px',
              right: '-40px',
              width: '160px',
              height: '160px',
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '10px',
            }}
          >
            <Sparkles size={15} color="var(--color-gold)" />
            <span
              style={{
                fontSize: '0.78rem',
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
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: '#FFFFFF',
              fontStyle: 'italic',
              marginBottom: '20px',
              lineHeight: 1.6,
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
              gap: '12px',
            }}
          >
            <a
              href="#get-a-quote"
              className="btn-gold"
              style={{
                padding: '10px 24px',
                fontSize: '0.88rem',
                textDecoration: 'none',
              }}
            >
              <span>Get in Touch with Our Team</span>
              <ArrowRight size={15} />
            </a>

            <Link
              href="/about"
              style={{
                fontSize: '0.88rem',
                color: 'var(--color-gold-light)',
                textDecoration: 'underline',
                padding: '8px 14px',
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
