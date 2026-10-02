'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SERVICES_DATA } from '@/data/servicesData';
import { SectionHeading } from '@/components/common/SectionHeading';
import { GoldDivider } from '@/components/common/GoldDivider';
import { ServiceItem, ServiceVideoItem } from '@/types/service';
import {
  Play,
  Sparkles,
  CheckCircle,
  Image as ImageIcon,
  ArrowRight,
  MapPin,
  X,
  Compass,
  Award,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Film,
} from 'lucide-react';

type FilterCategory =
  | 'All'
  | 'Weddings & Receptions'
  | 'Sacred Traditions'
  | 'Milestones & Celebrations'
  | 'Logistics & Games';

interface ActiveVideoModalState {
  serviceTitle: string;
  slug: string;
  videos: ServiceVideoItem[];
  currentIndex: number;
}

export default function ServicesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');
  const [activeVideo, setActiveVideo] = useState<ActiveVideoModalState | null>(null);
  const [activePhoto, setActivePhoto] = useState<{ src: string; title: string } | null>(null);
  const videoPlayerRef = React.useRef<HTMLVideoElement>(null);

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

  const filterTabs: { label: FilterCategory; count: number }[] = [
    { label: 'All', count: SERVICES_DATA.length },
    {
      label: 'Weddings & Receptions',
      count: SERVICES_DATA.filter((s) =>
        ['wedding-planning', 'reception', 'theme-decoration'].includes(s.slug)
      ).length,
    },
    {
      label: 'Sacred Traditions',
      count: SERVICES_DATA.filter((s) =>
        ['myra-bhaat-ceremony', 'haldi-mehndi-sangeet'].includes(s.slug)
      ).length,
    },
    {
      label: 'Milestones & Celebrations',
      count: SERVICES_DATA.filter((s) =>
        ['baby-shower', 'birthday-parties', 'corporate-events'].includes(s.slug)
      ).length,
    },
    {
      label: 'Logistics & Games',
      count: SERVICES_DATA.filter((s) =>
        ['wedding-rental-car', 'wooden-games-for-weddings'].includes(s.slug)
      ).length,
    },
  ];

  const filteredServices = SERVICES_DATA.filter((srv) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Weddings & Receptions') {
      return ['wedding-planning', 'reception', 'theme-decoration'].includes(srv.slug);
    }
    if (activeFilter === 'Sacred Traditions') {
      return ['myra-bhaat-ceremony', 'haldi-mehndi-sangeet'].includes(srv.slug);
    }
    if (activeFilter === 'Milestones & Celebrations') {
      return ['baby-shower', 'birthday-parties', 'corporate-events'].includes(srv.slug);
    }
    if (activeFilter === 'Logistics & Games') {
      return ['wedding-rental-car', 'wooden-games-for-weddings'].includes(srv.slug);
    }
    return true;
  });

  return (
    <div style={{ backgroundColor: '#FAF8F5', minHeight: '100vh', paddingBottom: '90px' }}>
      {/* 1. Header Banner with Heritage Aura */}
      <section
        style={{
          background: 'var(--gradient-royal-overlay), url("/images/real-events/stage-decor-1.webp")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF',
          padding: '90px 20px 70px 20px',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <div className="container" style={{ maxWidth: '850px' }}>
          <span
            className="badge-gold"
            style={{
              background: 'rgba(212, 175, 55, 0.25)',
              color: 'var(--color-gold-light)',
              marginBottom: '14px',
              fontSize: '0.8rem',
              letterSpacing: '1.2px',
            }}
          >
            Full-Spectrum Royal Event Management
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
              color: '#FFFFFF',
              marginTop: '8px',
              marginBottom: '14px',
              lineHeight: 1.2,
            }}
          >
            Ten Specialized Celebration Disciplines
          </h1>
          <GoldDivider width="180px" />
          <p
            style={{
              fontSize: '1.05rem',
              color: 'rgba(255, 255, 255, 0.92)',
              lineHeight: 1.6,
              marginTop: '14px',
              maxWidth: '720px',
              marginInline: 'auto',
            }}
          >
            From authentic Marwari Myra and Vedic Mandaps to electrifying Sangeet concerts and luxury vintage fleets—each discipline is engineered with palatial elegance.
          </p>

          {/* Quick Trust Highlights */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '18px',
              marginTop: '24px',
              fontSize: '0.84rem',
              color: 'var(--color-gold-light)',
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={14} color="var(--color-gold)" /> In-House Master Scenography
            </span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={14} color="var(--color-gold)" /> Zero Middleman Commissions
            </span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Award size={14} color="var(--color-gold)" /> 250+ Celebrated Galas
            </span>
          </div>
        </div>
      </section>

      {/* 2. Interactive Discipline Showcase Grid */}
      <section className="section-padding" style={{ paddingTop: '50px' }}>
        <div className="container">
          {/* Section Heading */}
          <SectionHeading
            subtitle="Tailored Capabilities"
            title="End-to-End Orchestration"
            description="Explore our specialized practices below. Every discipline features real celebration photography, deliverable breakdowns, and cinematic reels."
          />

          {/* Filter Pills Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '10px',
              marginBottom: '40px',
            }}
          >
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.label;
              return (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => setActiveFilter(tab.label)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '999px',
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    border: isActive
                      ? '1px solid var(--color-gold)'
                      : '1px solid rgba(212, 175, 55, 0.3)',
                    backgroundColor: isActive ? 'var(--color-maroon)' : '#FFFFFF',
                    color: isActive ? '#FFFFFF' : 'var(--color-maroon)',
                    boxShadow: isActive
                      ? '0 4px 14px rgba(128, 0, 32, 0.25)'
                      : 'var(--shadow-sm)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span>{tab.label}</span>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      background: isActive
                        ? 'rgba(255, 255, 255, 0.2)'
                        : 'rgba(212, 175, 55, 0.15)',
                      color: isActive ? '#FFFFFF' : 'var(--color-gold-dark)',
                      padding: '2px 7px',
                      borderRadius: '999px',
                      fontWeight: 700,
                    }}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* High-Efficiency 2-Column Luxury Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '28px',
            }}
          >
            {filteredServices.map((srv: ServiceItem, index: number) => {
              // Extract 1-based index from master data
              const masterIndex = SERVICES_DATA.findIndex((s) => s.id === srv.id) + 1;
              const formattedIndex = masterIndex.toString().padStart(2, '0');

              return (
                <div
                  key={srv.id}
                  className="luxury-card luxury-card-hover"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '1px solid rgba(212, 175, 55, 0.35)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: 'var(--shadow-md)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div>
                    {/* Media Header Container with Fixed Aspect Ratio */}
                    <div
                      style={{
                        position: 'relative',
                        height: '240px',
                        overflow: 'hidden',
                        backgroundColor: '#141414',
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
                          objectPosition: 'center 35%',
                          transition: 'transform 0.6s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                      />

                      {/* Top Badges */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          right: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          zIndex: 2,
                        }}
                      >
                        <span
                          className="badge-gold"
                          style={{
                            background: 'rgba(18, 18, 18, 0.82)',
                            color: 'var(--color-gold-light)',
                            backdropFilter: 'blur(6px)',
                            border: '1px solid rgba(212, 175, 55, 0.45)',
                            padding: '4px 10px',
                            fontSize: '0.74rem',
                            fontWeight: 700,
                          }}
                        >
                          Discipline {formattedIndex}
                        </span>

                        <span
                          style={{
                            background: 'rgba(128, 0, 32, 0.88)',
                            color: '#FFFFFF',
                            backdropFilter: 'blur(6px)',
                            padding: '4px 10px',
                            borderRadius: '999px',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            letterSpacing: '0.5px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                          }}
                        >
                          {srv.category}
                        </span>
                      </div>

                      {/* Video Reel Play Trigger */}
                      {((srv.videos && srv.videos.length > 0) || srv.videoClip) && (
                        <button
                          type="button"
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
                            background:
                              'linear-gradient(135deg, rgba(128, 0, 32, 0.95) 0%, rgba(212, 175, 55, 0.95) 100%)',
                            color: '#FFFFFF',
                            padding: '6px 14px',
                            borderRadius: '999px',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            border: '1px solid rgba(255, 255, 255, 0.85)',
                            cursor: 'pointer',
                            backdropFilter: 'blur(4px)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.35)',
                          }}
                        >
                          <Play size={13} fill="#FFFFFF" />
                          <span>
                            {srv.videos && srv.videos.length > 1
                              ? `Watch Reels (${srv.videos.length})`
                              : 'Watch Reel'}
                          </span>
                        </button>
                      )}
                    </div>

                    {/* Interactive Real Event Photos Strip */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 16px',
                        backgroundColor: '#F5EFE6',
                        borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
                        overflowX: 'auto',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '0.72rem',
                          color: '#78350F',
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        <ImageIcon size={13} color="var(--color-gold-dark)" />
                        <span>Photos:</span>
                      </div>

                      {srv.galleryImages.slice(0, 3).map((img, i) => (
                        <div
                          key={i}
                          onClick={() =>
                            setActivePhoto({
                              src: img,
                              title: `${srv.title} - Showcase Photo ${i + 1}`,
                            })
                          }
                          title="Click to view full photo"
                          style={{
                            width: '42px',
                            height: '30px',
                            borderRadius: '4px',
                            overflow: 'hidden',
                            border: '1px solid rgba(212, 175, 55, 0.4)',
                            flexShrink: 0,
                            cursor: 'pointer',
                            position: 'relative',
                            transition: 'transform 0.2s ease',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.15)')}
                          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={img}
                            alt={`${srv.title} thumbnail ${i + 1}`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                      ))}

                      {srv.galleryImages.length > 3 && (
                        <Link
                          href={`/services/${srv.slug}`}
                          style={{
                            fontSize: '0.7rem',
                            color: 'var(--color-gold-dark)',
                            fontWeight: 700,
                            textDecoration: 'none',
                            marginLeft: 'auto',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          +{srv.galleryImages.length - 3} more →
                        </Link>
                      )}
                    </div>

                    {/* Card Content Body */}
                    <div style={{ padding: '22px 22px 14px 22px' }}>
                      <h2
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1.45rem',
                          color: 'var(--color-maroon)',
                          marginBottom: '4px',
                          lineHeight: 1.28,
                          fontWeight: 600,
                        }}
                      >
                        <Link
                          href={`/services/${srv.slug}`}
                          style={{ color: 'inherit', textDecoration: 'none' }}
                        >
                          {srv.title}
                        </Link>
                      </h2>

                      <p
                        style={{
                          fontStyle: 'italic',
                          fontSize: '0.84rem',
                          color: 'var(--color-gold-dark)',
                          marginBottom: '10px',
                          lineHeight: 1.4,
                        }}
                      >
                        &ldquo;{srv.tagline}&rdquo;
                      </p>

                      <p
                        style={{
                          fontSize: '0.88rem',
                          color: '#4B5563',
                          lineHeight: 1.55,
                          marginBottom: '16px',
                        }}
                      >
                        {srv.shortDescription}
                      </p>

                      {/* Deliverables Checklist */}
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                          gap: '8px',
                          marginBottom: '16px',
                          padding: '12px 14px',
                          backgroundColor: '#FAF7F0',
                          borderRadius: '8px',
                          border: '1px solid rgba(212, 175, 55, 0.2)',
                        }}
                      >
                        {srv.offerings.slice(0, 2).map((off, oIdx) => (
                          <div
                            key={oIdx}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '6px',
                              fontSize: '0.8rem',
                              color: '#374151',
                              fontWeight: 500,
                              lineHeight: 1.35,
                            }}
                          >
                            <CheckCircle
                              size={14}
                              color="var(--color-gold-dark)"
                              style={{ flexShrink: 0, marginTop: '2px' }}
                            />
                            <span>{off.title}</span>
                          </div>
                        ))}
                      </div>

                      {/* Popular Locations Guide */}
                      {srv.popularLocations && srv.popularLocations.length > 0 && (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            fontSize: '0.76rem',
                            color: '#6B7280',
                            marginBottom: '6px',
                            flexWrap: 'wrap',
                          }}
                        >
                          <MapPin size={12} color="var(--color-gold)" style={{ flexShrink: 0 }} />
                          <span>Active across:</span>
                          <span style={{ fontWeight: 600, color: '#374151' }}>
                            {srv.popularLocations.slice(0, 4).join(' • ')}
                            {srv.popularLocations.length > 4 ? ' & circuits' : ''}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div
                    style={{
                      padding: '14px 22px 20px 22px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      borderTop: '1px solid rgba(212, 175, 55, 0.18)',
                      backgroundColor: '#FFFFFF',
                    }}
                  >
                    <Link
                      href={`/services/${srv.slug}`}
                      className="btn-primary"
                      style={{
                        padding: '10px 18px',
                        fontSize: '0.84rem',
                        fontWeight: 600,
                        textDecoration: 'none',
                        flex: 1,
                        textAlign: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <span>Explore Service</span>
                      <ArrowRight size={14} />
                    </Link>

                    <Link
                      href={`/packages?service=${encodeURIComponent(srv.title)}`}
                      className="btn-outline"
                      style={{
                        padding: '9px 16px',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        textDecoration: 'none',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Get Quote
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Global Video Reel Modal with Multi-Video Support */}
      {activeVideo && activeVideo.videos.length > 0 && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(0, 0, 0, 0.88)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
          onClick={() => setActiveVideo(null)}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '820px',
              backgroundColor: '#120B0F',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '2px solid var(--color-gold)',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.9)',
              color: '#FFFFFF',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
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
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.05rem',
                    color: 'var(--color-gold-light)',
                    margin: 0,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {activeVideo.videos[activeVideo.currentIndex]?.title || `${activeVideo.serviceTitle} Reel`}
                </h3>
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
                type="button"
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
              >
                <X size={20} />
              </button>
            </div>

            {/* Video Player with Prev / Next Navigation */}
            <div style={{ position: 'relative', width: '100%', maxHeight: '65vh', backgroundColor: '#000' }}>
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
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '65vh',
                  display: 'block',
                }}
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
                <span>Explore Full Service Portfolio</span>
                <ArrowRight size={14} />
              </Link>

              <Link
                href="/contact"
                onClick={() => setActiveVideo(null)}
                className="btn-gold"
                style={{ padding: '8px 20px', fontSize: '0.84rem', textDecoration: 'none' }}
              >
                Get in Touch for This Service
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 4. Global Photo Lightbox Modal */}
      {activePhoto && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
          onClick={() => setActivePhoto(null)}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '900px',
              maxHeight: '90vh',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '2px solid var(--color-gold)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activePhoto.src}
              alt={activePhoto.title}
              style={{
                width: '100%',
                maxHeight: '80vh',
                objectFit: 'contain',
                display: 'block',
              }}
            />
            <div
              style={{
                padding: '12px 20px',
                backgroundColor: 'rgba(18, 18, 18, 0.95)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ fontSize: '0.9rem', color: 'var(--color-gold-light)', fontWeight: 600 }}>
                {activePhoto.title}
              </span>
              <button
                type="button"
                onClick={() => setActivePhoto(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                }}
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
