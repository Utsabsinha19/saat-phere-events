import React from 'react';
import { Metadata } from 'next';
import { SERVICES_DATA } from '@/data/servicesData';
import { SectionHeading } from '@/components/common/SectionHeading';
import { GoldDivider } from '@/components/common/GoldDivider';
import Link from 'next/link';
import { ArrowUpRight, Sparkles, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Services | 9 Bespoke Wedding & Event Disciplines',
  description:
    'Comprehensive luxury event planning services by Saat Phere Events: Destination Weddings, Mandap Decor, Sangeet Concerts, Corporate Galas, and Milestone Celebrations.',
};

export default function ServicesPage() {
  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Header Banner */}
      <section
        style={{
          background: 'var(--gradient-royal-overlay), url("/images/gallery/mandap-glass-udaipur.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF',
          padding: '100px 20px 80px 20px',
          textAlign: 'center',
        }}
      >
        <div className="container" style={{ maxWidth: '850px' }}>
          <span className="badge-gold" style={{ background: 'rgba(212, 175, 55, 0.25)', color: 'var(--color-gold-light)', marginBottom: '12px' }}>
            Full-Spectrum Event Planning
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
            Nine Specialized Celebration Disciplines
          </h1>
          <GoldDivider width="200px" />
          <p style={{ fontSize: '1.15rem', color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.6, marginTop: '16px' }}>
            Explore our specialized event management practices, each headed by seasoned creative directors and technical production teams.
          </p>
        </div>
      </section>

      {/* Services List Section */}
      <section className="section-padding">
        <div className="container">
          <SectionHeading
            subtitle="Tailored Capabilities"
            title="End-to-End Orchestration"
            description="Click on any service category below to inspect dedicated photo showcases, deliverable breakdowns, FAQs, and custom consultation pathways."
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {SERVICES_DATA.map((srv, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={srv.id}
                  className="luxury-card"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '0',
                    overflow: 'hidden',
                  }}
                >
                  {/* Image Column */}
                  <div
                    style={{
                      position: 'relative',
                      minHeight: '340px',
                      order: isEven ? 1 : 2,
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={srv.cardImage}
                      alt={srv.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '16px',
                        left: '16px',
                      }}
                    >
                      <span className="badge-gold" style={{ background: 'rgba(18, 18, 18, 0.8)', color: 'var(--color-gold-light)' }}>
                        Category 0{index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Content Column */}
                  <div
                    style={{
                      padding: '40px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      order: isEven ? 2 : 1,
                      backgroundColor: '#FFFFFF',
                    }}
                  >
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-gold-dark)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                      {srv.category}
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.9rem',
                        color: 'var(--color-maroon)',
                        marginTop: '6px',
                        marginBottom: '8px',
                        lineHeight: 1.25,
                      }}
                    >
                      {srv.title}
                    </h3>
                    <p style={{ fontStyle: 'italic', fontSize: '0.92rem', color: '#6B7280', marginBottom: '16px' }}>
                      &ldquo;{srv.tagline}&rdquo;
                    </p>
                    <p style={{ fontSize: '0.95rem', color: '#4B5563', lineHeight: 1.6, marginBottom: '20px' }}>
                      {srv.shortDescription}
                    </p>

                    {/* Highlights */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px', marginBottom: '28px' }}>
                      {srv.offerings.slice(0, 2).map((off, oIdx) => (
                        <div key={oIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#374151' }}>
                          <CheckCircle size={15} color="var(--color-gold)" style={{ flexShrink: 0 }} />
                          <span>{off.title}</span>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                      <Link href={`/services/${srv.slug}`} className="btn-primary" style={{ padding: '12px 24px', fontSize: '0.88rem' }}>
                        View Full Service Template
                        <ArrowUpRight size={16} />
                      </Link>

                      <Link href={`/packages?service=${encodeURIComponent(srv.title)}`} className="btn-outline" style={{ padding: '11px 22px', fontSize: '0.88rem' }}>
                        Configure Custom Quote
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
