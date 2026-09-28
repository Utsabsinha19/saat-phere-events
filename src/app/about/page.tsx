import React from 'react';
import { Metadata } from 'next';
import { SectionHeading } from '@/components/common/SectionHeading';
import { GoldDivider } from '@/components/common/GoldDivider';
import Link from 'next/link';
import { ShieldCheck, Heart, Award, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Brand Story & Royal Event Methodology',
  description:
    'Discover the heritage, philosophy, and creative direction behind Saat Phere Events—India’s pre-eminent luxury wedding and bespoke event producers.',
};

export default function AboutPage() {
  const values = [
    {
      title: 'Devotion to Heritage & Ritual Sanctity',
      desc: 'We treat every ceremony, from the sacred Vedic pheras to regional traditions, with absolute reverence and cultural authenticity.',
    },
    {
      title: 'Architectural Haute Scenography',
      desc: 'Our set and spatial designers construct immersive worlds, blending rare flowers, royal textures, and intelligent light mapping.',
    },
    {
      title: 'Military Precision Logistics',
      desc: 'Discreet, seamless, and punctual execution so families experience uninhibited joy while we handle all behind-the-scenes complexities.',
    },
    {
      title: 'Absolute HNWI Discretion',
      desc: 'We safeguard client identities and guest privacy through stringent non-disclosure contracts and secure internal systems.',
    },
  ];

  const methodologySteps = [
    {
      step: '01',
      title: 'Vision Immersion & Legacy Discovery',
      description: 'We explore your family story, aesthetic sensibilities, and expectations to craft a tailored celebration concept.',
    },
    {
      step: '02',
      title: 'Palatial Scouting & Commercial Strategy',
      description: 'Securing private heritage properties, evaluating technical infrastructure, and establishing line-item master budgets.',
    },
    {
      step: '03',
      title: '3D Spatial CAD & Sensory Prototyping',
      description: 'Walk through full 3D renders of mandap architecture, floral tunnels, and lighting environments before a single flower is cut.',
    },
    {
      step: '04',
      title: 'White-Glove Multi-Day Symphony',
      description: 'A dedicated team of shadow concierges, stage calling directors, and crisis managers ensure an effortless experience.',
    },
  ];

  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Hero Banner */}
      <section
        style={{
          background: 'var(--gradient-royal-overlay), url("https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1600&q=85")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF',
          padding: '100px 20px 80px 20px',
          textAlign: 'center',
        }}
      >
        <div className="container" style={{ maxWidth: '850px' }}>
          <span className="badge-gold" style={{ background: 'rgba(212, 175, 55, 0.25)', color: 'var(--color-gold-light)', marginBottom: '12px' }}>
            Our Heritage & Creative Vision
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
            Crafting Living Poetry For Life’s Grandest Milestones
          </h1>
          <GoldDivider width="200px" />
          <p style={{ fontSize: '1.15rem', color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.6, marginTop: '16px' }}>
            Saat Phere Events was founded on the conviction that a royal wedding is a timeless celebration of love, family honor, and ancestral heritage.
          </p>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="section-padding">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '50px',
              alignItems: 'center',
            }}
          >
            <div>
              <span className="badge-gold">The Genesis</span>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2.4rem',
                  color: 'var(--color-maroon)',
                  marginTop: '12px',
                  marginBottom: '20px',
                  lineHeight: 1.25,
                }}
              >
                Born From The Sacred Vows of Saat Phere
              </h2>
              <p style={{ color: '#4B5563', fontSize: '1rem', lineHeight: 1.7, marginBottom: '18px' }}>
                In Indian wedding traditions, the <em>Saat Phere</em> (seven sacred circumambulations around the holy fire) symbolize seven solemn vows of nourishment, strength, prosperity, joy, family, togetherness, and lifelong friendship.
              </p>
              <p style={{ color: '#4B5563', fontSize: '1rem', lineHeight: 1.7, marginBottom: '24px' }}>
                Saat Phere Events was established to elevate this sacred milestone into an unforgettable, stress-free royal celebration. With deep roots across Rajasthan’s royal circuits (Jaipur, Udaipur, Jodhpur) and premier destination havens, our multi-disciplinary creative studio unites architectural designers, master florists, culinary directors, and logistics veterans.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ borderLeft: '3px solid var(--color-gold)', paddingLeft: '14px' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-maroon)', fontFamily: 'var(--font-serif)' }}>
                    18+ Years
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#6B7280' }}>Master Event Heritage</div>
                </div>
                <div style={{ borderLeft: '3px solid var(--color-gold)', paddingLeft: '14px' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-maroon)', fontFamily: 'var(--font-serif)' }}>
                    550+ Unions
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#6B7280' }}>Celebrated Across The Globe</div>
                </div>
              </div>
            </div>

            {/* Visual Frame */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '2px solid var(--color-gold)',
                  boxShadow: 'var(--shadow-gold)',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85"
                  alt="Saat Phere Royal Wedding Showcase"
                  style={{ width: '100%', height: '480px', objectFit: 'cover' }}
                />
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: '-20px',
                  left: '-20px',
                  backgroundColor: 'var(--color-maroon)',
                  color: '#FFFFFF',
                  padding: '18px 24px',
                  borderRadius: '8px',
                  boxShadow: 'var(--shadow-lg)',
                  maxWidth: '260px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-gold)', fontWeight: 700, fontSize: '0.85rem' }}>
                  <Award size={18} />
                  Top Luxury Planner
                </div>
                <div style={{ fontSize: '0.78rem', color: '#E5E7EB', marginTop: '4px' }}>
                  Recognized among India’s leading destination wedding management houses.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Core Values */}
      <section className="section-padding ivory-bg">
        <div className="container">
          <SectionHeading
            subtitle="The Standard of Excellence"
            title="Our Four Pillars of Distinction"
            description="How we consistently deliver awe-inspiring celebration benchmarks for distinguished families."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
            }}
          >
            {values.map((v, i) => (
              <div key={i} className="luxury-card" style={{ padding: '32px 24px', backgroundColor: '#FFFFFF' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'var(--color-ivory)',
                    border: '1px solid var(--color-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-maroon)',
                    fontWeight: 700,
                    marginBottom: '16px',
                  }}
                >
                  0{i + 1}
                </div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--color-maroon)', marginBottom: '10px' }}>
                  {v.title}
                </h4>
                <p style={{ fontSize: '0.9rem', color: '#4B5563', lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Planning Methodology */}
      <section className="section-padding">
        <div className="container">
          <SectionHeading
            subtitle="Execution Roadmap"
            title="The Saat Phere 4-Stage Planning Methodology"
            description="A disciplined, transparent journey from initial discovery to day-of perfection."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
            }}
          >
            {methodologySteps.map((m, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '12px',
                  padding: '30px 24px',
                  position: 'relative',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div
                  style={{
                    fontSize: '2.5rem',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 900,
                    color: 'rgba(212, 175, 55, 0.3)',
                    lineHeight: 1,
                    marginBottom: '8px',
                  }}
                >
                  {m.step}
                </div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--color-maroon)', marginBottom: '10px' }}>
                  {m.title}
                </h4>
                <p style={{ fontSize: '0.88rem', color: '#4B5563', lineHeight: 1.6 }}>{m.description}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link href="/contact" className="btn-gold" style={{ padding: '14px 32px' }}>
              <Sparkles size={16} />
              Schedule Founder Consultation
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
