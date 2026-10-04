'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';
import { InstagramIcon } from '@/components/common/SocialIcons';
import { SITE_CONFIG } from '@/config/site';

export const InstagramGrid: React.FC = () => {
  const posts = [
    {
      img: '/images/instagram/sangeet-stage-decor.webp',
      title: 'Sangeet Stage Decor & LED Backdrop',
      caption: 'Live Sangeet stage setup with automated beam heads, LED backdrop display, and luxury banquet guest seating. #SaatPhereEvents',
    },
    {
      img: '/images/instagram/royal-dining-canopy.webp',
      title: 'Royal Dining Canopy & Illuminated Lanterns',
      caption: 'Grand royal dining canopy setup featuring multi-hued ceiling drapes, illuminated orbs, and bespoke catering aisle. #SaatPhereEvents',
    },
    {
      img: '/images/instagram/production-crew-briefing.webp',
      title: 'Behind-the-Scenes Production Crew Briefing',
      caption: 'Behind-the-scenes: Production crew and on-ground event managers briefing before the grand guest arrival. #SaatPhereTeam',
    },
    {
      img: '/images/instagram/grand-stage-setup.webp',
      title: 'Concert-Grade Truss Rigging & Stage Launch',
      caption: 'Concert-grade overhead truss rigging, floral garlands, and celebratory balloon release ceremony. #SaatPhereProductions',
    },
    {
      img: '/images/instagram/vip-lounge-setup.webp',
      title: 'VIP Outdoor Lounge & Floral Centerpiece',
      caption: 'VIP outdoor lounge setup: Plush leather seating, floral centerpieces, and traditional red carpet walkway. #SaatPhereEvents',
    },
    {
      img: '/images/instagram/client-consultation.webp',
      title: 'Client & Family Wedding Planning Walkthrough',
      caption: 'Personalized event coordination: In-person planning and timeline walkthrough with the client family. #SaatPhereExperience',
    },
  ];

  return (
    <section className="section-padding">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-gold-dark)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            <InstagramIcon size={18} />
            @saatphereevents on Instagram
          </div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.85rem', color: 'var(--color-maroon)', marginTop: '6px' }}>
            Live From Our Royal Event Setups
          </h3>
          <p style={{ color: '#6B7280', fontSize: '0.92rem' }}>
            Behind-the-scenes glimpses, live mandap rigging, and intimate couple moments.
          </p>
        </div>

        <div
          className="instagram-grid">
          {posts.map((post, idx) => (
            <a
              key={idx}
              href={SITE_CONFIG.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-post"
              style={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                display: 'block',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.img}
                alt={post.title}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.4s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(128, 0, 32, 0.7)',
                  opacity: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '16px',
                  color: '#FFFFFF',
                  textAlign: 'center',
                  fontSize: '0.78rem',
                  transition: 'opacity 0.3s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
              >
                <div>
                  <InstagramIcon size={24} style={{ margin: '0 auto 8px auto', display: 'block' }} />
                  <p>{post.caption}</p>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <a
            href={SITE_CONFIG.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            style={{ fontSize: '0.85rem', padding: '10px 24px' }}
          >
            <InstagramIcon size={16} />
            Follow @saatphereevents on Instagram
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};
