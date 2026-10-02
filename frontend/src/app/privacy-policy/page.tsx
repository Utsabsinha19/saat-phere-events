import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Mail, Phone, Lock, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { GoldDivider } from '@/components/common/GoldDivider';

export const metadata: Metadata = {
  title: 'Privacy Policy | Saat Phere Luxury Events',
  description:
    'Read the official Privacy Policy of Saat Phere Events. Learn how we handle your inquiry information, contact details, and event requirements with strict privacy and discretion.',
  alternates: {
    canonical: 'https://saatphereevents.com/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div style={{ backgroundColor: '#FDFBF7', minHeight: '100vh', paddingBottom: '90px' }}>
      {/* Hero Header */}
      <section
        style={{
          background: 'var(--gradient-royal-overlay), url("/images/hero/hero-palace-jodhpur.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF',
          padding: '110px 20px 80px 20px',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <div className="container" style={{ maxWidth: '800px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '999px',
              backgroundColor: 'rgba(212, 175, 55, 0.2)',
              border: '1px solid rgba(212, 175, 55, 0.45)',
              color: 'var(--color-gold-light)',
              fontSize: '0.82rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '16px',
            }}
          >
            <Shield size={14} color="var(--color-gold-light)" />
            <span>Official Legal Governance</span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.4rem, 4.5vw, 3.5rem)',
              color: '#FFFFFF',
              marginBottom: '14px',
              lineHeight: 1.2,
            }}
          >
            Privacy Policy
          </h1>
          <GoldDivider width="180px" />
          <p
            style={{
              fontSize: '1.05rem',
              color: 'rgba(255, 255, 255, 0.88)',
              lineHeight: 1.6,
              marginTop: '16px',
            }}
          >
            Saat Phere Luxury Events is committed to absolute discretion, client confidentiality, and transparent handling of your celebration details.
          </p>
        </div>
      </section>

      {/* Breadcrumb Navigation */}
      <div style={{ backgroundColor: '#FAF6EF', borderBottom: '1px solid rgba(212, 175, 55, 0.25)', padding: '12px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: '#6B7280' }}>
          <Link href="/" style={{ color: 'var(--color-maroon)', textDecoration: 'none', fontWeight: 600 }}>
            Home
          </Link>
          <span>/</span>
          <span style={{ color: '#9CA3AF' }}>Privacy Policy</span>
        </div>
      </div>

      {/* Main Content Card */}
      <section className="section-padding" style={{ paddingTop: '50px' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <div
            className="luxury-card"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid rgba(212, 175, 55, 0.35)',
              padding: 'clamp(28px, 5vw, 50px)',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.05)',
            }}
          >
            {/* Core Policy Statement */}
            <div style={{ marginBottom: '36px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(128, 0, 32, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-maroon)',
                  }}
                >
                  <Lock size={20} />
                </div>
                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.65rem',
                    color: 'var(--color-maroon)',
                    margin: 0,
                  }}
                >
                  Our Commitment to Your Privacy
                </h2>
              </div>

              <div
                style={{
                  fontSize: '1.08rem',
                  lineHeight: 1.8,
                  color: '#374151',
                  backgroundColor: '#FAF8F4',
                  padding: '24px',
                  borderRadius: '12px',
                  borderLeft: '4px solid var(--color-gold)',
                  marginBottom: '28px',
                }}
              >
                At <strong>Saat Phere Events</strong>, we respect your privacy. Any information shared through our website, such as your name, contact details and event requirements, is used only to respond to your enquiry and provide our services.
              </div>
            </div>

            {/* Privacy Standards Pillars */}
            <div style={{ marginBottom: '40px' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.25rem',
                  color: 'var(--color-maroon)',
                  marginBottom: '16px',
                }}
              >
                Key Privacy Safeguards
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div
                  style={{
                    padding: '16px',
                    borderRadius: '10px',
                    border: '1px solid rgba(212, 175, 55, 0.25)',
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-maroon)', fontWeight: 700, marginBottom: '6px' }}>
                    <CheckCircle size={16} color="var(--color-gold)" />
                    <span>Dedicated Inquiries</span>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: '#6B7280', margin: 0, lineHeight: 1.5 }}>
                    Your details are accessed only by assigned wedding directors to craft bespoke quotations and date reserves.
                  </p>
                </div>

                <div
                  style={{
                    padding: '16px',
                    borderRadius: '10px',
                    border: '1px solid rgba(212, 175, 55, 0.25)',
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-maroon)', fontWeight: 700, marginBottom: '6px' }}>
                    <CheckCircle size={16} color="var(--color-gold)" />
                    <span>No Third-Party Resale</span>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: '#6B7280', margin: 0, lineHeight: 1.5 }}>
                    We never sell, rent, or trade your personal information, phone numbers, or event plans to outside marketing agencies.
                  </p>
                </div>

                <div
                  style={{
                    padding: '16px',
                    borderRadius: '10px',
                    border: '1px solid rgba(212, 175, 55, 0.25)',
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-maroon)', fontWeight: 700, marginBottom: '6px' }}>
                    <CheckCircle size={16} color="var(--color-gold)" />
                    <span>Discretion &amp; NDAs</span>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: '#6B7280', margin: 0, lineHeight: 1.5 }}>
                    High-profile clients, celebrity weddings, and private VIP gatherings are executed with complete non-disclosure discretion.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Contact Query Section */}
            <div
              style={{
                backgroundColor: 'var(--color-maroon)',
                color: '#FFFFFF',
                padding: '28px 24px',
                borderRadius: '12px',
                border: '1px solid var(--color-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '20px',
              }}
            >
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.25rem',
                    color: 'var(--color-gold-light)',
                    marginBottom: '6px',
                  }}
                >
                  For Any Queries or Privacy Clarifications
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'rgba(255, 255, 255, 0.85)', margin: 0 }}>
                  Contact our concierge team directly via official email or telephone:
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a
                  href="mailto:saatpherektr@gmail.com"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid var(--color-gold)',
                    color: '#FFFFFF',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'background 0.2s',
                  }}
                >
                  <Mail size={16} color="var(--color-gold-light)" />
                  <span>saatpherektr@gmail.com</span>
                </a>

                <a
                  href="tel:7209127697"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: 'var(--color-gold)',
                    color: '#000000',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    transition: 'opacity 0.2s',
                  }}
                >
                  <Phone size={16} />
                  <span>7209127697</span>
                </a>
              </div>
            </div>

            {/* Navigation CTAs */}
            <div
              style={{
                marginTop: '40px',
                paddingTop: '24px',
                borderTop: '1px solid rgba(212, 175, 55, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '14px',
              }}
            >
              <Link
                href="/terms-and-conditions"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--color-maroon)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                <span>Read Terms &amp; Conditions</span>
                <ArrowRight size={14} color="var(--color-gold)" />
              </Link>

              <Link
                href="/#get-a-quote"
                className="btn-gold"
                style={{ padding: '8px 20px', fontSize: '0.86rem', textDecoration: 'none' }}
              >
                Plan Your Event
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
