import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { SERVICES_DATA } from '@/data/servicesData';
import { SectionHeading } from '@/components/common/SectionHeading';
import { GoldDivider } from '@/components/common/GoldDivider';
import { ContactInquiryForm } from '@/components/forms/ContactInquiryForm';
import { ServiceVideoPlayer } from '@/components/sections/services/ServiceVideoPlayer';
import Link from 'next/link';
import { CheckCircle2, MapPin, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';

function findService(slug: string) {
  return SERVICES_DATA.find(
    (s) =>
      s.slug === slug ||
      (slug === 'myra-bhaat' && s.slug === 'myra-bhaat-ceremony') ||
      (slug === 'baby-shower-jalwa-ceremony' && s.slug === 'baby-shower')
  );
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Dynamic service details page with real-time showcase
export async function generateStaticParams() {
  const baseParams = SERVICES_DATA.map((srv) => ({
    slug: srv.slug,
  }));
  return [
    ...baseParams,
    { slug: 'myra-bhaat' },
    { slug: 'baby-shower-jalwa-ceremony' },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) return { title: 'Service Not Found | Saat Phere Events' };

  return {
    title: `${service.title} | Saat Phere Luxury Events`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = findService(slug);

  if (!service) {
    notFound();
  }

  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* 1. Immersive Header Banner (PRD Section 3.2) */}
      <section
        style={{
          background: `var(--gradient-royal-overlay), url("${service.heroImage}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF',
          padding: '110px 20px 80px 20px',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <div className="container" style={{ maxWidth: '850px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span className="badge-gold" style={{ background: 'rgba(212, 175, 55, 0.25)', color: 'var(--color-gold-light)' }}>
              {service.category}
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              color: '#FFFFFF',
              marginTop: '8px',
              marginBottom: '14px',
              lineHeight: 1.15,
            }}
          >
            {service.title}
          </h1>

          <GoldDivider width="200px" />

          <p
            style={{
              fontSize: '1.2rem',
              fontStyle: 'italic',
              color: 'var(--color-gold-light)',
              marginBottom: '16px',
            }}
          >
            &ldquo;{service.tagline}&rdquo;
          </p>

          <p
            style={{
              fontSize: '1.05rem',
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '720px',
              margin: '0 auto 28px auto',
              lineHeight: 1.6,
            }}
          >
            {service.shortDescription}
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <a href="#inquiry" className="btn-gold" style={{ padding: '14px 30px' }}>
              <Sparkles size={16} />
              Get in Touch
            </a>
            <Link
              href={`/packages?service=${encodeURIComponent(service.title)}`}
              className="btn-outline"
              style={{ color: '#FFFFFF', borderColor: '#FFFFFF', padding: '13px 26px' }}
            >
              Interactive Quote Engine
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Photo Showcase Grid (PRD Section 3.2) */}
      <section className="section-padding ivory-bg">
        <div className="container">
          <SectionHeading
            subtitle="Visual Craftsmanship"
            title="Signature Scenography & Production"
            description={`High-definition gallery of ${service.title.toLowerCase()} executed across premier luxury destinations.`}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
              marginBottom: '36px',
            }}
          >
            {service.galleryImages.map((img, idx) => (
              <div
                key={idx}
                className="luxury-card"
                style={{ height: '320px', overflow: 'hidden', position: 'relative' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt={`${service.title} showcase ${idx + 1}`}
                  className="hover-zoom"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            ))}
          </div>

          {/* Dedicated Video Reel Player (Supports Single or Multi-Video Playlists) */}
          <ServiceVideoPlayer
            serviceTitle={service.title}
            videos={service.videos}
            videoClip={service.videoClip}
            videoPoster={service.videoPoster}
            videoTitle={service.videoTitle}
          />

          {service.popularLocations && service.popularLocations.length > 0 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                flexWrap: 'wrap',
                fontSize: '0.9rem',
                color: '#4B5563',
              }}
            >
              <span style={{ fontWeight: 700, color: 'var(--color-maroon)' }}>Preferred Venues & Circuits:</span>
              {service.popularLocations.map((loc) => (
                <span
                  key={loc}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: '#FFFFFF',
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    border: '1px solid var(--color-border-gold)',
                  }}
                >
                  <MapPin size={13} color="var(--color-gold)" />
                  {loc}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. Comprehensive Service Breakdown (PRD Section 3.2) */}
      <section className="section-padding">
        <div className="container">
          <div style={{ maxWidth: '850px', margin: '0 auto 60px auto', textAlign: 'center' }}>
            <span className="badge-gold">Scope of Execution</span>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2.4rem',
                color: 'var(--color-maroon)',
                marginTop: '10px',
                marginBottom: '16px',
              }}
            >
              Master Deliverables & Deliverables Architecture
            </h2>
            <GoldDivider width="160px" />
            <p style={{ color: '#4B5563', fontSize: '1rem', lineHeight: 1.7 }}>
              {service.longDescription}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
              gap: '28px',
              marginBottom: '60px',
            }}
          >
            {service.offerings.map((off, idx) => (
              <div
                key={idx}
                className="luxury-card"
                style={{
                  padding: '32px 26px',
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'var(--color-ivory)',
                      border: '1px solid var(--color-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-maroon)',
                      fontWeight: 700,
                      marginBottom: '14px',
                      fontSize: '0.85rem',
                    }}
                  >
                    0{idx + 1}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.3rem',
                      color: 'var(--color-maroon)',
                      marginBottom: '10px',
                    }}
                  >
                    {off.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#4B5563', lineHeight: 1.6, marginBottom: '18px' }}>
                    {off.description}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '14px' }}>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-gold-dark)', fontWeight: 700, marginBottom: '8px' }}>
                    Key Inclusions:
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {off.highlights.map((h, hIdx) => (
                      <li key={hIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#1F2937' }}>
                        <CheckCircle2 size={14} color="var(--color-gold)" style={{ flexShrink: 0 }} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Timeline Process Steps */}
          {service.processSteps && service.processSteps.length > 0 && (
            <div style={{ backgroundColor: 'var(--color-ivory-light)', padding: '40px', borderRadius: '12px', border: '1px solid var(--color-border-gold)' }}>
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <span className="badge-gold">Step-by-Step Blueprint</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--color-maroon)', marginTop: '8px' }}>
                  How We Orchestrate Your {service.title}
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                {service.processSteps.map((step) => (
                  <div key={step.step} style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                    <div style={{ color: 'var(--color-gold)', fontWeight: 800, fontSize: '1.3rem', fontFamily: 'var(--font-serif)', marginBottom: '4px' }}>
                      Stage 0{step.step}
                    </div>
                    <div style={{ fontWeight: 700, color: 'var(--color-maroon)', fontSize: '1rem', marginBottom: '6px' }}>
                      {step.title}
                    </div>
                    <p style={{ fontSize: '0.82rem', color: '#6B7280', lineHeight: 1.5 }}>
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs */}
          {service.faqs && service.faqs.length > 0 && (
            <div style={{ marginTop: '60px', maxWidth: '820px', margin: '60px auto 0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                <span className="badge-gold">Expert Answers</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--color-maroon)', marginTop: '6px' }}>
                  Frequently Asked Questions
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {service.faqs.map((faq, fIdx) => (
                  <div key={fIdx} style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <HelpCircle size={18} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-maroon)', marginBottom: '6px' }}>
                          {faq.question}
                        </h4>
                        <p style={{ fontSize: '0.9rem', color: '#4B5563', lineHeight: 1.6 }}>
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. Instant Inquiry CTA & Lead Capture Form (PRD Section 3.2) */}
      <section id="inquiry" className="section-padding" style={{ paddingTop: '20px' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span className="badge-maroon">Immediate Lead Routing</span>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2.4rem',
                color: 'var(--color-maroon)',
                marginTop: '8px',
              }}
            >
              Inquire For {service.title}
            </h2>
            <p style={{ color: '#4B5563', fontSize: '0.95rem', marginTop: '6px' }}>
              Submissions are recorded in our secure Admin CRM and dispatched instantly to our executive directors.
            </p>
          </div>

          <ContactInquiryForm />
        </div>
      </section>
    </div>
  );
}
