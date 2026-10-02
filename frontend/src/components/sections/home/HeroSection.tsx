'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Calendar, ArrowDown, ChevronRight, MapPin } from 'lucide-react';
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
      {/* 1. Blurry Event-Related Image in Background */}
      <div
        className="hero-blurry-backdrop"
        style={{
          position: 'absolute',
          top: '-20px',
          left: '-20px',
          right: '-20px',
          bottom: '-20px',
          backgroundImage: 'url("/images/real-events/stage-decor-1.webp")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(10px) brightness(0.72) saturate(1.2)',
          zIndex: 1,
        }}
      />

      {/* 2. Royal Dark Vignette & Gold Atmospheric Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'radial-gradient(circle at 50% 40%, rgba(18, 18, 18, 0.45) 0%, rgba(45, 0, 11, 0.78) 55%, rgba(14, 14, 14, 0.96) 100%)',
          zIndex: 2,
        }}
      />

      {/* Subtle Golden Ambient Particle Texture */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(rgba(212, 175, 55, 0.15) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.5,
          zIndex: 3,
        }}
      />

      {/* Decorative Gold Frame Border */}
      <div className="hero-frame-border" style={{ zIndex: 3 }} />

      {/* Content Container */}
      <div
        className="container animate-fade-in-up"
        style={{
          position: 'relative',
          zIndex: 4,
          maxWidth: '980px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Bihar Heritage Origin Badge */}
        <div style={{ marginBottom: '16px', width: '100%', display: 'flex', justifyContent: 'center' }}>
          <span
            className="shimmer-gold-badge hero-origin-badge"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 16px',
              borderRadius: '999px',
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#FFF2C6',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
              maxWidth: 'calc(100vw - 48px)',
              textAlign: 'center',
              lineHeight: 1.4,
            }}
          >
            <MapPin size={12} color="var(--color-gold)" style={{ flexShrink: 0 }} />
            {/* Full text on tablet+ */}
            <span className="hero-badge-text-full">Proudly Rooted in Bihar • Specialists in Marwari & Rajasthani Weddings</span>
            {/* Short text on phones */}
            <span className="hero-badge-text-short">Bihar Pioneer • Marwari & Rajasthani Weddings</span>
          </span>
        </div>

        {/* 1st Look Requirement: Big Company Logo presented in a Master Luxury Way */}
        <div
          style={{
            position: 'relative',
            marginBottom: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          {/* Ambient Warm Golden Halo behind the logo */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'min(520px, 92vw)',
              height: '240px',
              background:
                'radial-gradient(ellipse at center, rgba(212, 175, 55, 0.25) 0%, rgba(180, 130, 30, 0.12) 40%, transparent 72%)',
              filter: 'blur(30px)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />

          {/* Luxury Floating Logo with pure transparency & gold radiance */}
          <div
            className="animate-logo-glow"
            style={{
              position: 'relative',
              zIndex: 2,
              padding: '6px',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo-official-transparent.png"
              alt="Saat Phere Events - Official Royal Emblem"
              className="hero-logo-img"
              style={{
                width: 'clamp(200px, 60vw, 480px)',
                height: 'auto',
                maxHeight: 'clamp(160px, 35vw, 270px)',
                objectFit: 'contain',
                display: 'block',
                margin: '0 auto',
                filter:
                  'drop-shadow(0 6px 16px rgba(0, 0, 0, 0.85)) drop-shadow(0 0 24px rgba(212, 175, 55, 0.5)) drop-shadow(0 0 48px rgba(212, 175, 55, 0.22))',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          </div>
        </div>

        {/* 1st Look Requirement: Tagline Below the Logo */}
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.45rem, 4.4vw, 3.4rem)',
            fontWeight: 800,
            lineHeight: 1.2,
            color: '#FFFFFF',
            textShadow: '0 4px 24px rgba(0, 0, 0, 0.8)',
            marginTop: '6px',
            marginBottom: '12px',
            letterSpacing: '0.01em',
            maxWidth: '900px',
          }}
        >
          <span className="shimmer-text">
            “Where Luxury Meets Unforgettable Celebrations”
          </span>
        </h1>

        <GoldDivider width="260px" />

        {/* Description highlighting Bihar pride & royal standards */}
        <p
          style={{
            fontSize: 'clamp(0.88rem, 1.8vw, 1.22rem)',
            color: 'rgba(255, 255, 255, 0.94)',
            maxWidth: '820px',
            margin: '14px auto 22px auto',
            lineHeight: 1.65,
            fontWeight: 300,
            textShadow: '0 2px 12px rgba(0, 0, 0, 0.7)',
          }}
        >
          Bihar’s premier luxury wedding planning atelier &amp; specialists in authentic Marwari, Rajasthani, and cross-cultural weddings. Born in Katihar, orchestrating monumental palatial weddings, sacred Vedic rituals, artisanal decor, and grand milestone celebrations across Bihar, Rajasthan, Goa, and pan-India destinations.
        </p>

        {/* CTA Buttons - Requirement 6: "Get in Touch" instead of "Consultant" / "Book Your Event" */}
        <div
          className="hero-cta-group"
        >
          {onOpenConsultation ? (
            <button
              onClick={onOpenConsultation}
              className="btn-gold"
              style={{
                padding: '16px 36px',
                fontSize: '1rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                boxShadow: '0 8px 24px rgba(212, 175, 55, 0.4)',
              }}
            >
              <Calendar size={18} />
              Get in Touch
            </button>
          ) : (
            <a
              href="#get-a-quote"
              className="btn-gold"
              style={{
                padding: '16px 36px',
                fontSize: '1rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                boxShadow: '0 8px 24px rgba(212, 175, 55, 0.4)',
                textDecoration: 'none',
              }}
            >
              <Calendar size={18} />
              Get in Touch
            </a>
          )}

          <a
            href="#services"
            className="btn-outline"
            style={{
              padding: '15px 32px',
              fontSize: '0.98rem',
              color: '#FFFFFF',
              borderColor: 'rgba(212, 175, 55, 0.8)',
              background: 'rgba(18, 18, 18, 0.4)',
              backdropFilter: 'blur(8px)',
              textDecoration: 'none',
            }}
          >
            <span>Explore Our Services</span>
            <ChevronRight size={18} color="var(--color-gold)" />
          </a>
        </div>

        {/* Scroll Cue to 2nd Look: Why Choose Saat Phere Events */}
        <div style={{ marginTop: '28px' }}>
          <a
            href="#why-choose"
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'rgba(212, 175, 55, 0.9)',
              fontSize: '0.72rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              textDecoration: 'none',
              fontWeight: 600,
              gap: '5px',
            }}
          >
            <span>Explore</span>
            <ArrowDown size={14} className="animate-float" />
          </a>
        </div>
      </div>
    </section>
  );
};
