'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Calendar, ArrowDown, ChevronRight } from 'lucide-react';
import { GoldDivider } from '@/components/common/GoldDivider';

interface HeroSectionProps {
  onOpenConsultation?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenConsultation }) => {
  return (
    <section
      className="hero-section"
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        color: '#FFFFFF',
        textAlign: 'center',
      }}
    >
      {/* Background Media with Royal Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            'url("/images/hero/hero-mandap.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'linear-gradient(180deg, rgba(18, 18, 18, 0.72) 0%, rgba(90, 0, 22, 0.82) 65%, rgba(18, 18, 18, 0.95) 100%)',
          zIndex: 2,
        }}
      />

      {/* Decorative Gold Frame Border */}
      <div className="hero-frame-border" />

      {/* Content Container */}
      <div
        className="container animate-fade-in"
        style={{
          position: 'relative',
          zIndex: 4,
          maxWidth: '960px',
        }}
      >
        <div className="hero-badge-container">
          <span className="badge-gold hero-badge" style={{ background: 'rgba(212, 175, 55, 0.25)', color: 'var(--color-gold-light)', maxWidth: '100%' }}>
            <Sparkles size={12} style={{ display: 'inline', marginRight: '6px', flexShrink: 0 }} />
            <span className="hero-badge-text-full">Bespoke Royal Celebrations & Destination Weddings</span>
            <span className="hero-badge-text-short">Royal Celebrations & Destination Weddings</span>
          </span>
        </div>

        {/* PRD Headline: "Turning Your Special Moments Into Unforgettable Memories" */}
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.2rem, 5.5vw, 4.4rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            color: '#FFFFFF',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
            marginBottom: '16px',
            letterSpacing: '-0.5px',
          }}
        >
          Turning Your Special Moments Into{' '}
          <span className="shimmer-text" style={{ fontStyle: 'italic', fontWeight: 700 }}>
            Unforgettable Memories
          </span>
        </h1>

        <GoldDivider width="240px" />

        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.3rem)',
            color: 'rgba(255, 255, 255, 0.92)',
            maxWidth: '780px',
            margin: '20px auto 36px auto',
            lineHeight: 1.6,
            fontWeight: 300,
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
          }}
        >
          Orchestrating palatial destination weddings, sacred heritage mandap decors, and high-impact celebrations across Rajasthan, Goa, and international destinations.
        </p>

        {/* PRD Primary CTAs */}
        <div className="hero-cta-group">
          {onOpenConsultation ? (
            <button
              onClick={onOpenConsultation}
              className="btn-gold"
            >
              <Calendar size={18} />
              Book Your Event / Free Consultation
            </button>
          ) : (
            <Link
              href="/contact"
              className="btn-gold"
            >
              <Calendar size={18} />
              Book Your Event / Free Consultation
            </Link>
          )}

          <a
            href="#services"
            className="btn-outline"
            style={{
              color: '#FFFFFF',
              borderColor: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            Explore Our Services
            <ChevronRight size={18} />
          </a>
        </div>

        {/* Subtle Scroll Cue */}
        <div style={{ marginTop: '50px' }}>
          <a
            href="#brand-intro"
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'rgba(212, 175, 55, 0.8)',
              fontSize: '0.75rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            <span>Discover Elegance</span>
            <ArrowDown size={16} className="animate-float" style={{ marginTop: '6px' }} />
          </a>
        </div>
      </div>
    </section>
  );
};
