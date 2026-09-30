import React from 'react';
import { Metadata } from 'next';
import { ContactInquiryForm } from '@/components/forms/ContactInquiryForm';
import { SectionHeading } from '@/components/common/SectionHeading';
import { GoldDivider } from '@/components/common/GoldDivider';
import { SITE_CONFIG } from '@/config/site';
import { Phone, Mail, MapPin, Clock, MessageCircle, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact & Booking | Reserve Royal Event Dates',
  description:
    'Contact Saat Phere Events luxury wedding concierge. Submit the official 9-field event inquiry form, view office locations, and reach direct hotlines.',
};

export default function ContactPage() {
  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Banner */}
      <section
        style={{
          background: 'var(--gradient-royal-overlay), url("/images/hero/hero-palace-jodhpur.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF',
          padding: '100px 20px 80px 20px',
          textAlign: 'center',
        }}
      >
        <div className="container" style={{ maxWidth: '850px' }}>
          <span className="badge-gold" style={{ background: 'rgba(212, 175, 55, 0.25)', color: 'var(--color-gold-light)', marginBottom: '12px' }}>
            Concierge Direct Line
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
            Get in Touch with Saat Phere Events
          </h1>
          <GoldDivider width="200px" />
          <p style={{ fontSize: '1.15rem', color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.6, marginTop: '16px' }}>
            Proudly rooted in Bihar with headquarters in Katihar and operations across Patna, Rajasthan, and Goa. Our directors are available around the clock for confidential wedding and celebration planning.
          </p>
        </div>
      </section>

      {/* Main Content: Info + 9-Field Form */}
      <section className="section-padding">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '48px',
            }}
          >
            {/* Left: Contact Details & Office Pin */}
            <div>
              <span className="badge-gold">Private Offices</span>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2.2rem',
                  color: 'var(--color-maroon)',
                  marginTop: '10px',
                  marginBottom: '18px',
                }}
              >
                Headquarters & Regional Suites
              </h2>
              <p style={{ color: '#4B5563', fontSize: '0.98rem', lineHeight: 1.7, marginBottom: '28px' }}>
                Our corporate headquarters is located at Daulat Ram Chowk, Katihar, Bihar, with nationwide destination wedding and luxury event consultation suites across India.
              </p>

              {/* Contact Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '36px' }}>
                {/* HQ Address */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '8px',
                      background: 'var(--color-ivory)',
                      border: '1px solid var(--color-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-maroon)',
                      flexShrink: 0,
                    }}
                  >
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--color-maroon)', marginBottom: '4px' }}>
                      Corporate Headquarters
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: '#4B5563', lineHeight: 1.5 }}>
                      {SITE_CONFIG.contact.headquarters.street}, {SITE_CONFIG.contact.headquarters.city},{' '}
                      {SITE_CONFIG.contact.headquarters.state} – {SITE_CONFIG.contact.headquarters.postalCode}
                    </p>
                  </div>
                </div>

                {/* Direct Phone */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '8px',
                      background: 'var(--color-ivory)',
                      border: '1px solid var(--color-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-maroon)',
                      flexShrink: 0,
                    }}
                  >
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--color-maroon)', marginBottom: '4px' }}>
                      VIP Concierge Desk
                    </h4>
                    <a
                      href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
                      style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-maroon)' }}
                    >
                      {SITE_CONFIG.contact.phone}
                    </a>
                    <div style={{ fontSize: '0.8rem', color: '#6B7280', marginTop: '2px' }}>
                      {SITE_CONFIG.contact.hours}
                    </div>
                  </div>
                </div>

                {/* Email Inquiries */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '8px',
                      background: 'var(--color-ivory)',
                      border: '1px solid var(--color-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-maroon)',
                      flexShrink: 0,
                    }}
                  >
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--color-maroon)', marginBottom: '4px' }}>
                      Executive Dispatches
                    </h4>
                    <a
                      href={`mailto:${SITE_CONFIG.contact.email}`}
                      style={{ fontSize: '0.95rem', color: 'var(--color-maroon)', fontWeight: 600 }}
                    >
                      {SITE_CONFIG.contact.email}
                    </a>
                  </div>
                </div>

                {/* WhatsApp Chat */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '8px',
                      background: '#E8F5E9',
                      border: '1px solid #25D366',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#25D366',
                      flexShrink: 0,
                    }}
                  >
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--color-maroon)', marginBottom: '4px' }}>
                      Instant WhatsApp Hotline
                    </h4>
                    <a
                      href={`https://wa.me/${SITE_CONFIG.contact.whatsappRaw}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '0.9rem', color: '#059669', fontWeight: 600 }}
                    >
                      Chat with Senior Coordinator →
                    </a>
                  </div>
                </div>
              </div>

              {/* Embedded Google Map (PRD Section 3.6 & 4.2) */}
              <div
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid var(--color-border-gold)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{ padding: '12px 16px', background: '#F9FAFB', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={16} color="var(--color-gold)" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151' }}>
                    Headquarters Pin: Daulat Ram Chowk, Katihar, Bihar – 854105
                  </span>
                </div>
                <iframe
                  src="https://maps.google.com/maps?q=Daulat+Ram+Chowk,+Katihar,+Bihar+854105&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="260"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Saat Phere Events Headquarters Location Map"
                />
              </div>
            </div>

            {/* Right: The Official 9 Core Fields Form */}
            <div>
              <ContactInquiryForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
