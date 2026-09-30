'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SectionHeading } from '@/components/common/SectionHeading';
import { SERVICES_DATA } from '@/data/servicesData';
import { Play, Sparkles, Image as ImageIcon, ArrowRight, X } from 'lucide-react';
import { ServiceItem } from '@/types/service';

export const ServicesGrid: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<{ src: string; title: string } | null>(null);
  const [activePhoto, setActivePhoto] = useState<{ src: string; title: string } | null>(null);

  return (
    <section id="services" className="section-padding" style={{ backgroundColor: '#FDFBF7' }}>
      <div className="container">
        {/* 3rd Look Section Heading */}
        <SectionHeading
          subtitle="Our 9 Master Capabilities"
          title="Our Services"
          description="Explore our nine dedicated celebration disciplines. Each service is executed by specialized artisans and accompanied by our real-world photography and cinematic video reels."
        />

        {/* 9 Services Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '30px',
          }}
        >
          {SERVICES_DATA.map((srv: ServiceItem, index: number) => (
            <div
              key={srv.id}
              className="luxury-card luxury-card-hover"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                overflow: 'hidden',
                border: '1px solid rgba(212, 175, 55, 0.35)',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              {/* Media Container: Photo + Video Watch Trigger */}
              <div
                style={{
                  position: 'relative',
                  height: '240px',
                  overflow: 'hidden',
                  backgroundColor: '#1A1A1A',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={srv.cardImage}
                  alt={srv.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />

                {/* Service Number & Category Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    zIndex: 2,
                  }}
                >
                  <span
                    className="badge-gold"
                    style={{
                      background: 'rgba(18, 18, 18, 0.82)',
                      color: 'var(--color-gold-light)',
                      backdropFilter: 'blur(6px)',
                      border: '1px solid rgba(212, 175, 55, 0.5)',
                      padding: '4px 10px',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                    }}
                  >
                    0{index + 1} • {srv.category}
                  </span>
                </div>

                {/* Video Reel Play Trigger Button */}
                {srv.videoClip && (
                  <button
                    onClick={() =>
                      setActiveVideo({
                        src: srv.videoClip!,
                        title: srv.videoTitle || `${srv.title} Video Reel`,
                      })
                    }
                    className="animate-pulse-glow"
                    title={`Watch ${srv.title} Video Reel`}
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      zIndex: 3,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'linear-gradient(135deg, rgba(128, 0, 32, 0.9) 0%, rgba(212, 175, 55, 0.95) 100%)',
                      color: '#FFFFFF',
                      padding: '6px 14px',
                      borderRadius: '999px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      border: '1px solid #FFFFFF',
                      cursor: 'pointer',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    <Play size={13} fill="#FFFFFF" />
                    <span>Watch Video Reel</span>
                  </button>
                )}
              </div>

              {/* Relevant Photos Sub-Gallery Strip */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 14px',
                  backgroundColor: '#FAF7F0',
                  borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
                  overflowX: 'auto',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', color: '#78350F', fontWeight: 600, flexShrink: 0, marginRight: '4px' }}>
                  <ImageIcon size={13} color="var(--color-gold-dark)" />
                  <span>Photos:</span>
                </div>
                {srv.galleryImages.slice(0, 3).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePhoto({ src: img, title: `${srv.title} - Photo ${i + 1}` })}
                    style={{
                      width: '44px',
                      height: '36px',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      border: '1px solid rgba(212, 175, 55, 0.4)',
                      padding: 0,
                      cursor: 'pointer',
                      flexShrink: 0,
                    }}
                    title="Click to expand photo"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={`${srv.title} preview ${i + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </button>
                ))}
                {srv.videoClip && (
                  <button
                    onClick={() =>
                      setActiveVideo({
                        src: srv.videoClip!,
                        title: srv.videoTitle || `${srv.title} Video Reel`,
                      })
                    }
                    style={{
                      height: '36px',
                      padding: '0 8px',
                      borderRadius: '4px',
                      background: 'rgba(128, 0, 32, 0.1)',
                      border: '1px dashed var(--color-maroon)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      color: 'var(--color-maroon)',
                      cursor: 'pointer',
                      flexShrink: 0,
                    }}
                  >
                    <Play size={10} fill="var(--color-maroon)" />
                    <span>Video Clip</span>
                  </button>
                )}
              </div>

              {/* Service Card Body */}
              <div
                style={{
                  padding: '24px 20px',
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
                      fontSize: '1.38rem',
                      color: 'var(--color-maroon)',
                      marginBottom: '6px',
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

                  <p
                    style={{
                      fontSize: '0.9rem',
                      color: '#4B5563',
                      lineHeight: 1.6,
                      marginBottom: '18px',
                    }}
                  >
                    {srv.shortDescription}
                  </p>
                </div>

                {/* Footer Actions */}
                <div
                  style={{
                    borderTop: '1px solid #F3F4F6',
                    paddingTop: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '8px',
                  }}
                >
                  <Link
                    href={`/services/${srv.slug}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '0.86rem',
                      fontWeight: 700,
                      color: 'var(--color-maroon)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      textDecoration: 'none',
                    }}
                  >
                    <span>View Service Spec</span>
                    <ArrowRight size={14} color="var(--color-gold)" />
                  </Link>

                  {/* Requirement 6: "Get in Touch" CTA text */}
                  <a
                    href={`#get-a-quote`}
                    style={{
                      fontSize: '0.84rem',
                      fontWeight: 600,
                      color: 'var(--color-gold-dark)',
                      textDecoration: 'underline',
                    }}
                  >
                    Get in Touch
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Video Modal */}
        {activeVideo && (
          <div
            onClick={() => setActiveVideo(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.88)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              backdropFilter: 'blur(8px)',
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: '#141414',
                border: '2px solid var(--color-gold)',
                borderRadius: '14px',
                overflow: 'hidden',
                maxWidth: '720px',
                width: '100%',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  borderBottom: '1px solid rgba(212, 175, 55, 0.3)',
                  color: '#FFFFFF',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={16} color="var(--color-gold)" />
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--color-gold-light)' }}>
                    {activeVideo.title}
                  </span>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#9CA3AF',
                    cursor: 'pointer',
                    padding: '4px',
                  }}
                  aria-label="Close video"
                >
                  <X size={22} />
                </button>
              </div>

              <div style={{ position: 'relative', width: '100%', maxHeight: '70vh', backgroundColor: '#000000' }}>
                <video
                  src={activeVideo.src}
                  controls
                  autoPlay
                  playsInline
                  style={{ width: '100%', height: 'auto', maxHeight: '70vh', display: 'block' }}
                >
                  Your browser does not support video playback.
                </video>
              </div>

              <div style={{ padding: '14px 20px', textAlign: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <a
                  href="#get-a-quote"
                  onClick={() => setActiveVideo(null)}
                  className="btn-gold"
                  style={{ padding: '10px 24px', fontSize: '0.88rem', textDecoration: 'none' }}
                >
                  Get in Touch for This Service
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Global Photo Lightbox Modal */}
        {activePhoto && (
          <div
            onClick={() => setActivePhoto(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.92)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              backdropFilter: 'blur(8px)',
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                maxWidth: '900px',
                width: '100%',
                maxHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <button
                onClick={() => setActivePhoto(null)}
                style={{
                  position: 'absolute',
                  top: '-40px',
                  right: '0',
                  background: 'none',
                  border: 'none',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                }}
                aria-label="Close photo"
              >
                <X size={28} />
              </button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activePhoto.src}
                alt={activePhoto.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '82vh',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  border: '2px solid var(--color-gold)',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.8)',
                }}
              />
              <div style={{ color: 'var(--color-gold-light)', marginTop: '12px', fontSize: '0.95rem', fontWeight: 600 }}>
                {activePhoto.title}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
