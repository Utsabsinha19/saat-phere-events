import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Home, Compass, Sparkles, ArrowRight, MessageCircle, Phone, Calendar, HeartHandshake } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';

export const metadata: Metadata = {
  title: '404 - Page Not Found | Saat Phere Events',
  description:
    'The requested royal celebration or page could not be located. Explore our luxury wedding planning services, portfolios, or connect directly with our concierge.',
};

export default function NotFound() {
  return (
    <div
      style={{
        backgroundColor: '#0C0C0C',
        color: '#FFFFFF',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '80px 20px',
      }}
    >
      {/* Background Decorative Gold Ambient Glows */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(128, 0, 32, 0.2) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        className="container"
        style={{
          maxWidth: '820px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Royal Crest / Emblem Accent */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(212, 175, 55, 0.1)',
            border: '1px solid rgba(212, 175, 55, 0.35)',
            padding: '8px 20px',
            borderRadius: '30px',
            marginBottom: '24px',
          }}
        >
          <Sparkles size={16} color="var(--color-gold)" />
          <span
            style={{
              color: 'var(--color-gold-light)',
              fontSize: '0.85rem',
              fontWeight: 600,
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            Saat Phere Luxury Events • Royal Concierge
          </span>
          <Sparkles size={16} color="var(--color-gold)" />
        </div>

        {/* 404 Big Hero Graphic */}
        <div style={{ position: 'relative', marginBottom: '16px' }}>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(5.5rem, 15vw, 10rem)',
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: '4px',
              background: 'linear-gradient(135deg, #F3E5AB 0%, #D4AF37 50%, #AA8010 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0,
              textShadow: '0 10px 40px rgba(212, 175, 55, 0.2)',
            }}
          >
            404
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              color: 'var(--color-gold-light)',
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              fontWeight: 600,
              marginTop: '8px',
              letterSpacing: '1px',
            }}
          >
            A Royal Path Unknown
          </p>
        </div>

        <p
          style={{
            color: '#D1D5DB',
            fontSize: 'clamp(0.95rem, 2vw, 1.12rem)',
            maxWidth: '640px',
            margin: '0 auto 36px auto',
            lineHeight: 1.75,
          }}
        >
          The celebratory chamber, portfolio gallery, or page you are seeking seems to have been relocated or does not exist. Allow our concierge to escort you back to the grand celebration.
        </p>

        {/* Primary Action Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap',
            marginBottom: '48px',
          }}
        >
          <Link
            href="/"
            className="btn-gold"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 28px',
              fontSize: '0.96rem',
              fontWeight: 700,
              textDecoration: 'none',
              borderRadius: '6px',
            }}
          >
            <Home size={18} />
            Return to Grand Entrance
          </Link>

          <Link
            href="/services"
            className="btn-outline"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 28px',
              fontSize: '0.96rem',
              fontWeight: 600,
              textDecoration: 'none',
              color: 'var(--color-gold-light)',
              borderColor: 'rgba(212, 175, 55, 0.5)',
              borderRadius: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
            }}
          >
            <Compass size={18} color="var(--color-gold)" />
            Explore Royal Services
          </Link>

          <a
            href={`https://wa.me/${SITE_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent(
              'Namaste Saat Phere Events, I encountered a missing page on your website and would like assistance.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 24px',
              fontSize: '0.92rem',
              fontWeight: 600,
              textDecoration: 'none',
              backgroundColor: '#25D366',
              color: '#FFFFFF',
              borderRadius: '6px',
            }}
          >
            <MessageCircle size={18} />
            WhatsApp Concierge
          </a>
        </div>

        {/* Guided Navigation Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
            textAlign: 'left',
            borderTop: '1px solid rgba(212, 175, 55, 0.25)',
            paddingTop: '36px',
          }}
        >
          <Link
            href="/services/wedding-planning"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              borderRadius: '8px',
              padding: '20px',
              textDecoration: 'none',
              color: '#FFFFFF',
              display: 'block',
              transition: 'all 0.3s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-gold)', marginBottom: '8px' }}>
              <HeartHandshake size={18} />
              <span style={{ fontSize: '0.92rem', fontWeight: 700 }}>Royal Weddings</span>
            </div>
            <p style={{ fontSize: '0.84rem', color: '#9CA3AF', margin: 0, lineHeight: 1.5 }}>
              Palatial mandaps, 3D blueprints, and bridal coordination.
            </p>
          </Link>

          <Link
            href="/portfolio"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              borderRadius: '8px',
              padding: '20px',
              textDecoration: 'none',
              color: '#FFFFFF',
              display: 'block',
              transition: 'all 0.3s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-gold)', marginBottom: '8px' }}>
              <Sparkles size={18} />
              <span style={{ fontSize: '0.92rem', fontWeight: 700 }}>Event Portfolio</span>
            </div>
            <p style={{ fontSize: '0.84rem', color: '#9CA3AF', margin: 0, lineHeight: 1.5 }}>
              Explore real decor setups, baraat entries, and reception stages.
            </p>
          </Link>

          <Link
            href="/#get-a-quote"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              borderRadius: '8px',
              padding: '20px',
              textDecoration: 'none',
              color: '#FFFFFF',
              display: 'block',
              transition: 'all 0.3s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-gold)', marginBottom: '8px' }}>
              <Calendar size={18} />
              <span style={{ fontSize: '0.92rem', fontWeight: 700 }}>Instant Quote</span>
            </div>
            <p style={{ fontSize: '0.84rem', color: '#9CA3AF', margin: 0, lineHeight: 1.5 }}>
              Calculate personalized decor budget and date reservations.
            </p>
          </Link>

          <Link
            href="/contact"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              borderRadius: '8px',
              padding: '20px',
              textDecoration: 'none',
              color: '#FFFFFF',
              display: 'block',
              transition: 'all 0.3s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-gold)', marginBottom: '8px' }}>
              <Phone size={18} />
              <span style={{ fontSize: '0.92rem', fontWeight: 700 }}>Official Desk</span>
            </div>
            <p style={{ fontSize: '0.84rem', color: '#9CA3AF', margin: 0, lineHeight: 1.5 }}>
              Katihar &amp; Patna HQ lines, WhatsApp, and private consultations.
            </p>
          </Link>
        </div>

        {/* Footer hotline hint */}
        <div style={{ marginTop: '36px', fontSize: '0.82rem', color: '#6B7280' }}>
          <span>Immediate Concierge Assistance: </span>
          <a
            href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
            style={{ color: 'var(--color-gold-light)', fontWeight: 600, textDecoration: 'none' }}
          >
            {SITE_CONFIG.contact.phone}
          </a>
          <span style={{ margin: '0 8px' }}>•</span>
          <span>Open 7 Days (9:00 AM – 9:00 PM IST)</span>
        </div>
      </div>
    </div>
  );
}

