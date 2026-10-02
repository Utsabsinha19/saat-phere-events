'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { SectionHeading } from '@/components/common/SectionHeading';
import { SERVICES_DATA } from '@/data/servicesData';
import { Play, Sparkles, Image as ImageIcon, ArrowRight, X, ChevronLeft, ChevronRight, Film } from 'lucide-react';
import { ServiceItem, ServiceVideoItem } from '@/types/service';

interface ActiveVideoModalState {
  serviceTitle: string;
  slug: string;
  videos: ServiceVideoItem[];
  currentIndex: number;
}

export const ServicesGrid: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<ActiveVideoModalState | null>(null);
  const [activePhoto, setActivePhoto] = useState<{ src: string; title: string } | null>(null);
  const videoPlayerRef = useRef<HTMLVideoElement>(null);

  const openServiceVideo = (srv: ServiceItem, startIndex: number = 0) => {
    const list: ServiceVideoItem[] =
      srv.videos && srv.videos.length > 0
        ? srv.videos
        : srv.videoClip
        ? [
            {
              src: srv.videoClip,
              poster: srv.videoPoster,
              title: srv.videoTitle || `${srv.title} Video Reel`,
            },
          ]
        : [];

    if (list.length > 0) {
      setActiveVideo({
        serviceTitle: srv.title,
        slug: srv.slug,
        videos: list,
        currentIndex: Math.min(startIndex, list.length - 1),
      });
    }
  };

  const handleSelectReel = (newIdx: number) => {
    if (!activeVideo) return;
    setActiveVideo({ ...activeVideo, currentIndex: newIdx });
    setTimeout(() => {
      if (videoPlayerRef.current) {
        videoPlayerRef.current.currentTime = 0;
        videoPlayerRef.current.play().catch(() => {});
      }
    }, 50);
  };

  return (
    <section id="services" className="section-padding" style={{ backgroundColor: '#FDFBF7' }}>
      <div className="container">
        {/* 3rd Look Section Heading */}
        <SectionHeading
          title="Our Services"
          description="Explore our ten dedicated celebration disciplines. Each service is executed by specialized artisans and accompanied by our real-world photography and cinematic video reels."
        />

        {/* 9 Services Grid — responsive: 1 col → 2 col (≥640px) → 3 col (≥1200px) */}
        <div className="services-section-grid">
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
                  height: 'clamp(180px, 28vw, 260px)',
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
                    {(index + 1).toString().padStart(2, '0')} • {srv.category}
                  </span>
                </div>

                {/* Video Reel Play Trigger Button */}
                {((srv.videos && srv.videos.length > 0) || srv.videoClip) && (
                  <button
                    onClick={() => openServiceVideo(srv, 0)}
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
                    <span>
                      {srv.videos && srv.videos.length > 1
                        ? `Watch Reels (${srv.videos.length})`
                        : 'Watch Video Reel'}
                    </span>
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
                {((srv.videos && srv.videos.length > 0) || srv.videoClip) && (
                  <button
                    onClick={() => openServiceVideo(srv, 0)}
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
                    <span>
                      {srv.videos && srv.videos.length > 1
                        ? `Reels (${srv.videos.length})`
                        : 'Video Clip'}
                    </span>
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

        {/* Global Video Modal with Multi-Video Support */}
        {activeVideo && activeVideo.videos.length > 0 && (
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
              padding: '16px',
              backdropFilter: 'blur(8px)',
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: '#120B0F',
                border: '2px solid var(--color-gold)',
                borderRadius: '16px',
                overflow: 'hidden',
                maxWidth: '780px',
                width: '100%',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.9)',
                color: '#FFFFFF',
              }}
            >
              {/* Modal Top Bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  borderBottom: '1px solid rgba(212, 175, 55, 0.3)',
                  backgroundColor: '#1A0E15',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                  <Sparkles size={16} color="var(--color-gold)" style={{ flexShrink: 0 }} />
                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.05rem',
                      color: 'var(--color-gold-light)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {activeVideo.videos[activeVideo.currentIndex]?.title || `${activeVideo.serviceTitle} Reel`}
                  </span>
                  {activeVideo.videos.length > 1 && (
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: 'var(--color-gold-light)',
                        background: 'rgba(212, 175, 55, 0.15)',
                        padding: '2px 8px',
                        borderRadius: '999px',
                        border: '1px solid rgba(212, 175, 55, 0.35)',
                        flexShrink: 0,
                      }}
                    >
                      {activeVideo.currentIndex + 1} / {activeVideo.videos.length}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#9CA3AF',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  aria-label="Close video"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Video Player Area with Quick Prev / Next */}
              <div style={{ position: 'relative', width: '100%', maxHeight: '65vh', backgroundColor: '#000000' }}>
                <video
                  ref={videoPlayerRef}
                  key={activeVideo.videos[activeVideo.currentIndex]?.src}
                  src={activeVideo.videos[activeVideo.currentIndex]?.src}
                  poster={activeVideo.videos[activeVideo.currentIndex]?.poster}
                  controls
                  autoPlay
                  playsInline
                  onEnded={() => {
                    if (activeVideo.videos.length > 1) {
                      handleSelectReel((activeVideo.currentIndex + 1) % activeVideo.videos.length);
                    }
                  }}
                  style={{ width: '100%', height: 'auto', maxHeight: '65vh', display: 'block' }}
                >
                  Your browser does not support video playback.
                </video>

                {activeVideo.videos.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        handleSelectReel(
                          (activeVideo.currentIndex - 1 + activeVideo.videos.length) % activeVideo.videos.length
                        )
                      }
                      title="Previous Video Reel"
                      aria-label="Previous Video Reel"
                      style={{
                        position: 'absolute',
                        left: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(18, 10, 15, 0.85)',
                        border: '1px solid var(--color-gold)',
                        color: 'var(--color-gold-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 4,
                      }}
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() =>
                        handleSelectReel((activeVideo.currentIndex + 1) % activeVideo.videos.length)
                      }
                      title="Next Video Reel"
                      aria-label="Next Video Reel"
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(18, 10, 15, 0.85)',
                        border: '1px solid var(--color-gold)',
                        color: 'var(--color-gold-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 4,
                      }}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>

              {/* Playlist Strip If Multiple Videos */}
              {activeVideo.videos.length > 1 && (
                <div
                  style={{
                    padding: '12px 18px',
                    backgroundColor: '#160E14',
                    borderTop: '1px solid rgba(212, 175, 55, 0.2)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '8px',
                      fontSize: '0.74rem',
                      color: 'rgba(255, 255, 255, 0.7)',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Film size={12} color="var(--color-gold)" />
                      <strong style={{ color: '#F8E5A7' }}>Available Reels ({activeVideo.videos.length}):</strong>
                    </span>
                    <span style={{ color: 'rgba(212, 175, 55, 0.8)' }}>Click reel to switch & play</span>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      gap: '8px',
                      overflowX: 'auto',
                      paddingBottom: '4px',
                    }}
                  >
                    {activeVideo.videos.map((vid, idx) => {
                      const isCur = idx === activeVideo.currentIndex;
                      return (
                        <button
                          key={vid.src}
                          onClick={() => handleSelectReel(idx)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '6px 12px',
                            borderRadius: '8px',
                            backgroundColor: isCur ? 'rgba(212, 175, 55, 0.22)' : 'rgba(255, 255, 255, 0.05)',
                            border: isCur ? '1.5px solid var(--color-gold)' : '1px solid rgba(255, 255, 255, 0.15)',
                            color: isCur ? '#FCE6A2' : '#D1D5DB',
                            fontSize: '0.76rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            transition: 'all 0.2s ease',
                            flexShrink: 0,
                          }}
                        >
                          <Play size={11} fill={isCur ? 'var(--color-gold)' : '#D1D5DB'} />
                          <span>
                            Reel {idx + 1}: {vid.title || `Clip ${idx + 1}`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Bottom Actions Bar */}
              <div
                style={{
                  padding: '12px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  backgroundColor: '#1A0E15',
                }}
              >
                <Link
                  href={`/services/${activeVideo.slug}`}
                  onClick={() => setActiveVideo(null)}
                  style={{
                    color: 'var(--color-gold-light)',
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span>Explore Detailed Service Details</span>
                  <ArrowRight size={14} />
                </Link>

                <a
                  href="#get-a-quote"
                  onClick={() => setActiveVideo(null)}
                  className="btn-gold"
                  style={{ padding: '8px 20px', fontSize: '0.84rem', textDecoration: 'none' }}
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
