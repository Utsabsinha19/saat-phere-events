'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';
import { InstagramIcon } from '@/components/common/SocialIcons';
import { SITE_CONFIG } from '@/config/site';

export const InstagramGrid: React.FC = () => {
  const posts = [
    {
      img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
      caption: 'Lakeside vows under 20,000 blossoms at Jagmandir Island Palace. #SaatPhereMoments',
    },
    {
      img: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
      caption: 'The sunny Haldi splash: Brass urlis and Phoolon ki Holi in the royal courtyard.',
    },
    {
      img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
      caption: 'Concert-grade Sangeet night with automated moving heads & crystal chandeliers.',
    },
    {
      img: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=600&q=80',
      caption: 'A 100-foot floral tunnel leading to the royal dining hall at Rambagh Palace.',
    },
    {
      img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80',
      caption: 'Barefoot luxury: Sunset coastal wedding setup overlooking the Arabian Sea.',
    },
    {
      img: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=600&q=80',
      caption: 'Desert twilight: Golden sandstone mandap surrounded by 1,001 oil lamps.',
    },
  ];

  return (
    <section className="section-padding" style={{ paddingBottom: '40px' }}>
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
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          {posts.map((post, idx) => (
            <a
              key={idx}
              href={SITE_CONFIG.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: 'relative',
                height: '220px',
                borderRadius: '8px',
                overflow: 'hidden',
                display: 'block',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.img}
                alt="Instagram post"
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
