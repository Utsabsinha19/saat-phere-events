'use client';

import React from 'react';
import Link from 'next/link';
import { SectionHeading } from '@/components/common/SectionHeading';
import { SERVICES_DATA } from '@/data/servicesData';
import { ArrowUpRight } from 'lucide-react';

export const ServicesGrid: React.FC = () => {
  return (
    <section id="services" className="section-padding">
      <div className="container">
        <SectionHeading
          subtitle="Our Master Capabilities"
          title="Nine Bespoke Celebration Disciplines"
          description="From grand royal multi-day palatial unions in Rajasthan to intimate milestone celebrations and corporate galas, discover our nine specialized event divisions."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '30px',
          }}
        >
          {SERVICES_DATA.map((srv, index) => (
            <div
              key={srv.id}
              className="luxury-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              {/* Image banner with overlay */}
              <div style={{ position: 'relative', height: '230px', overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={srv.cardImage}
                  alt={srv.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                  }}
                >
                  <span className="badge-gold" style={{ background: 'rgba(18, 18, 18, 0.75)', color: 'var(--color-gold-light)' }}>
                    0{index + 1} • {srv.category}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div
                style={{
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.45rem',
                      color: 'var(--color-maroon)',
                      marginBottom: '8px',
                      lineHeight: 1.3,
                    }}
                  >
                    {srv.title}
                  </h3>
                  <div
                    style={{
                      fontSize: '0.8rem',
                      fontStyle: 'italic',
                      color: 'var(--color-gold-dark)',
                      marginBottom: '12px',
                    }}
                  >
                    {srv.tagline}
                  </div>
                  <p style={{ fontSize: '0.9rem', color: '#4B5563', lineHeight: 1.6, marginBottom: '20px' }}>
                    {srv.shortDescription}
                  </p>
                </div>

                <div
                  style={{
                    borderTop: '1px solid #F3F4F6',
                    paddingTop: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Link
                    href={`/services/${srv.slug}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      color: 'var(--color-maroon)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Explore Service Spec
                    <ArrowUpRight size={16} color="var(--color-gold)" />
                  </Link>

                  <Link
                    href={`/contact?service=${encodeURIComponent(srv.title)}`}
                    style={{
                      fontSize: '0.8rem',
                      color: '#6B7280',
                      textDecoration: 'underline',
                    }}
                  >
                    Direct Inquiry
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
