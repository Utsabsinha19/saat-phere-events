import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { FileText, Mail, Phone, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { GoldDivider } from '@/components/common/GoldDivider';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Saat Phere Luxury Events',
  description:
    'Review the official Terms & Conditions for Saat Phere Events. Guidelines covering website information, booking confirmations, service scope, and inquiries.',
  alternates: {
    canonical: 'https://saatphereevents.com/terms-and-conditions',
  },
};

export default function TermsAndConditionsPage() {
  const termsList = [
    'Website content, images and information are for general information purposes only.',
    'Event services, packages, pricing and availability are subject to change and will be confirmed after discussion.',
    'Submitting an enquiry does not confirm a booking.',
    'Final bookings are confirmed only after mutual agreement and applicable booking terms.',
    'We reserve the right to update our services, content and these terms when required.',
  ];

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
            <FileText size={14} color="var(--color-gold-light)" />
            <span>Official Client Guidelines</span>
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
            Terms &amp; Conditions
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
            General website usage conditions, booking guidelines, and event coordination policies for Saat Phere Events.
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
          <span style={{ color: '#9CA3AF' }}>Terms &amp; Conditions</span>
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
            {/* Introduction Statement */}
            <div style={{ marginBottom: '32px' }}>
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
                  <FileText size={20} />
                </div>
                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.65rem',
                    color: 'var(--color-maroon)',
                    margin: 0,
                  }}
                >
                  Agreement &amp; Website Usage
                </h2>
              </div>

              <p style={{ fontSize: '1.05rem', color: '#4B5563', lineHeight: 1.7 }}>
                By using the <strong>Saat Phere Events</strong> website, you agree to the following:
              </p>
            </div>

            {/* Terms List Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '36px' }}>
              {termsList.map((term, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '14px',
                    padding: '16px 20px',
                    backgroundColor: '#FAF8F4',
                    borderRadius: '12px',
                    border: '1px solid rgba(212, 175, 55, 0.25)',
                    transition: 'transform 0.2s ease, border-color 0.2s ease',
                  }}
                >
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(212, 175, 55, 0.15)',
                      border: '1px solid var(--color-gold)',
                      color: 'var(--color-maroon)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    {idx + 1}
                  </div>
                  <p style={{ fontSize: '0.96rem', color: '#374151', lineHeight: 1.6, margin: 0 }}>
                    {term}
                  </p>
                </div>
              ))}
            </div>

            {/* Direct Contact Queries Section */}
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
                  For Any Queries or Clarifications
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'rgba(255, 255, 255, 0.85)', margin: 0 }}>
                  Contact us directly via official email or telephone:
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

            {/* Bottom Actions */}
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
                href="/privacy-policy"
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
                <span>Read Privacy Policy</span>
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
