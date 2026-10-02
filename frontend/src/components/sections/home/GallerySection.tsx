'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SectionHeading } from '@/components/common/SectionHeading';
import { GALLERY_DATA } from '@/data/galleryData';
import { Play, Eye, MapPin, Sparkles, X, Film, Image as ImageIcon, ArrowRight } from 'lucide-react';
import { GalleryMediaItem } from '@/types/gallery';

export const GallerySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedMedia, setSelectedMedia] = useState<GalleryMediaItem | null>(null);

  const filters = [
    'All',
    'Photos',
    'Videos',
    'Stage Decors',
    'Myra / Bhaat',
    'Haldi / Mehendi',
    'Jalwa Ceremony',
    'Vintage Procession',
    'Wooden Games',
    'Corporate Events',
  ];

  const filteredItems = GALLERY_DATA.filter((item) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Photos') return item.type === 'image';
    if (activeFilter === 'Videos') return item.type === 'video';
    return item.category === activeFilter;
  });

  return (
    <section id="gallery" className="section-padding" style={{ backgroundColor: '#141414', color: '#FFFFFF' }}>
      <div className="container">
        {/* 4th Look Section Heading */}
        <SectionHeading
          subtitle="Our Real Event Portfolio"
          title="Gallery"
          description="A dedicated showcase of our signature event photographs, real decor craftsmanship in Bihar, and cinematic celebration video reels."
        />

        {/* Filter Pills with Luxury Styling */}
        <div className="gallery-filter-bar">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                style={{
                  padding: '9px 22px',
                  borderRadius: '999px',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  border: isActive ? '1px solid var(--color-gold)' : '1px solid rgba(255, 255, 255, 0.18)',
                  backgroundColor: isActive ? 'var(--color-maroon)' : 'rgba(255, 255, 255, 0.05)',
                  color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.75)',
                  boxShadow: isActive ? '0 4px 15px rgba(212, 175, 55, 0.3)' : 'none',
                }}
              >
                {filter === 'Videos' && <Film size={13} style={{ display: 'inline', marginRight: '6px' }} />}
                {filter === 'Photos' && <ImageIcon size={13} style={{ display: 'inline', marginRight: '6px' }} />}
                {filter}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid — responsive: 1→2→3→4 columns */}
        <div className="gallery-section-grid">
          {filteredItems.map((item) => {
            const isVideo = item.type === 'video';
            return (
              <div
                key={item.id}
                onClick={() => setSelectedMedia(item)}
              className="luxury-card luxury-card-hover gallery-card-item"
                style={{
                  position: 'relative',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: isVideo ? '2px solid var(--color-gold)' : '1px solid rgba(212, 175, 55, 0.3)',
                  backgroundColor: '#1E1E1E',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />

                {/* Dark Vignette Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(180deg, rgba(0,0,0,0.2) 30%, rgba(10,10,10,0.88) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '18px',
                    pointerEvents: 'none',
                  }}
                >
                  {/* Top Badges */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span
                      style={{
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: '999px',
                        background: isVideo
                          ? 'linear-gradient(135deg, rgba(128, 0, 32, 0.95), rgba(212, 175, 55, 0.95))'
                          : 'rgba(0, 0, 0, 0.75)',
                        color: '#FFFFFF',
                        border: '1px solid rgba(212, 175, 55, 0.5)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                      }}
                    >
                      {isVideo ? <Film size={11} /> : <ImageIcon size={11} />}
                      {isVideo ? 'Video Reel' : item.category}
                    </span>

                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: isVideo ? 'var(--color-gold)' : 'rgba(255,255,255,0.2)',
                        color: isVideo ? '#000000' : '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(4px)',
                        boxShadow: isVideo ? '0 0 15px rgba(212, 175, 55, 0.8)' : 'none',
                      }}
                    >
                      {isVideo ? <Play size={16} fill="#000000" /> : <Eye size={16} />}
                    </div>
                  </div>

                  {/* Center Play Button for Videos */}
                  {isVideo && (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <div
                        className="animate-pulse-glow"
                        style={{
                          width: '60px',
                          height: '60px',
                          borderRadius: '50%',
                          background: 'rgba(18, 18, 18, 0.8)',
                          border: '2px solid var(--color-gold)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--color-gold)',
                        }}
                      >
                        <Play size={26} fill="var(--color-gold)" style={{ marginLeft: '4px' }} />
                      </div>
                    </div>
                  )}

                  {/* Bottom Text Information */}
                  <div>
                    <h4
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.2rem',
                        color: '#FFFFFF',
                        marginBottom: '6px',
                        lineHeight: 1.3,
                        textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
                      }}
                    >
                      {item.title}
                    </h4>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.82rem',
                        color: 'var(--color-gold-light)',
                      }}
                    >
                      <MapPin size={13} color="var(--color-gold)" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View Complete Archive CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link
            href="/portfolio"
            className="btn-gold"
            style={{
              padding: '14px 34px',
              fontSize: '0.96rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
            }}
          >
            <span>Explore Complete Portfolio Archive</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Lightbox / Video Player Modal */}
      {selectedMedia && (
        <div
          onClick={() => setSelectedMedia(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.93)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#161616',
              border: '2px solid var(--color-gold)',
              borderRadius: '16px',
              overflow: 'hidden',
              maxWidth: selectedMedia.type === 'video' ? '760px' : '900px',
              width: '100%',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9)',
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 22px',
                borderBottom: '1px solid rgba(212, 175, 55, 0.3)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} color="var(--color-gold)" />
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.12rem',
                    color: 'var(--color-gold-light)',
                    fontWeight: 700,
                  }}
                >
                  {selectedMedia.title}
                </span>
              </div>

              <button
                onClick={() => setSelectedMedia(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#9CA3AF',
                  cursor: 'pointer',
                  padding: '4px',
                }}
                aria-label="Close modal"
              >
                <X size={22} />
              </button>
            </div>

            {/* Media Content */}
            <div style={{ backgroundColor: '#000000', maxHeight: '70vh', overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
              {selectedMedia.type === 'video' && selectedMedia.videoUrl ? (
                <video
                  src={selectedMedia.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  style={{ width: '100%', maxHeight: '68vh', objectFit: 'contain' }}
                >
                  Your browser does not support video playback.
                </video>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={selectedMedia.imageUrl}
                  alt={selectedMedia.title}
                  style={{ width: '100%', maxHeight: '68vh', objectFit: 'contain', display: 'block' }}
                />
              )}
            </div>

            {/* Modal Footer */}
            <div
              style={{
                padding: '18px 22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '14px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: '#1A1A1A',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--color-gold-light)' }}>
                  <MapPin size={14} color="var(--color-gold)" />
                  <span>{selectedMedia.location}</span>
                </div>
                {selectedMedia.description && (
                  <p style={{ fontSize: '0.85rem', color: '#9CA3AF', marginTop: '4px', maxWidth: '480px' }}>
                    {selectedMedia.description}
                  </p>
                )}
              </div>

              {/* Requirement 6: "Get in Touch" */}
              <a
                href="#get-a-quote"
                onClick={() => setSelectedMedia(null)}
                className="btn-gold"
                style={{ padding: '10px 24px', fontSize: '0.88rem', textDecoration: 'none' }}
              >
                Get in Touch for This Setup
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
