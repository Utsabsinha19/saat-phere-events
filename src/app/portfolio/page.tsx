'use client';

import React, { useState } from 'react';
import { GALLERY_DATA } from '@/data/galleryData';
import { SectionHeading } from '@/components/common/SectionHeading';
import { GoldDivider } from '@/components/common/GoldDivider';
import { LightboxModal } from '@/components/common/LightboxModal';
import { VideoModal } from '@/components/common/VideoModal';
import { GalleryCategory, GalleryMediaItem } from '@/types/gallery';
import { Play, Eye, MapPin, Sparkles } from 'lucide-react';

const CATEGORIES: GalleryCategory[] = [
  'All',
  'Mandap Designs',
  'Stage Decors',
  'Floral Styling',
  'Destination Weddings',
  'Haldi / Mehendi',
  'Corporate Events',
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryMediaItem | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<GalleryMediaItem | null>(null);

  const filteredItems =
    activeCategory === 'All'
      ? GALLERY_DATA
      : GALLERY_DATA.filter((item) => item.category === activeCategory);

  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Hero Banner */}
      <section
        style={{
          background: 'var(--gradient-royal-overlay), url("https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF',
          padding: '100px 20px 80px 20px',
          textAlign: 'center',
        }}
      >
        <div className="container" style={{ maxWidth: '850px' }}>
          <span className="badge-gold" style={{ background: 'rgba(212, 175, 55, 0.25)', color: 'var(--color-gold-light)', marginBottom: '12px' }}>
            High-Definition Portfolio
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
            Visual Symphony of Royal Celebrations
          </h1>
          <GoldDivider width="200px" />
          <p style={{ fontSize: '1.15rem', color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.6, marginTop: '16px' }}>
            Explore our curated gallery across six signature design verticals, featuring majestic mandap architecture, crystal-lit stages, and palatial destinations.
          </p>
        </div>
      </section>

      {/* Filterable Gallery Section */}
      <section className="section-padding">
        <div className="container">
          {/* PRD Filterable Categories */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '48px',
            }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '9999px',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  border: activeCategory === cat ? '1px solid var(--color-gold)' : '1px solid #D1D5DB',
                  backgroundColor: activeCategory === cat ? 'var(--color-maroon)' : '#FFFFFF',
                  color: activeCategory === cat ? '#FFFFFF' : '#374151',
                  boxShadow: activeCategory === cat ? 'var(--shadow-gold)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Media Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '24px',
            }}
          >
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="luxury-card"
                style={{
                  position: 'relative',
                  height: item.aspectRatio === 'portrait' ? '460px' : '360px',
                  cursor: 'pointer',
                  overflow: 'hidden',
                }}
                onClick={() => {
                  if (item.type === 'video') {
                    setSelectedVideo(item);
                  } else {
                    setSelectedImage(item);
                  }
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
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />

                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(180deg, rgba(0,0,0,0.15) 30%, rgba(18,18,18,0.88) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '24px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="badge-gold" style={{ background: 'rgba(0,0,0,0.7)', color: 'var(--color-gold-light)' }}>
                      {item.category}
                    </span>

                    {item.type === 'video' ? (
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--color-gold)',
                          color: 'var(--color-dark)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                        }}
                      >
                        <Play size={18} fill="currentColor" />
                      </div>
                    ) : (
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(255,255,255,0.2)',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backdropFilter: 'blur(4px)',
                        }}
                      >
                        <Eye size={16} />
                      </div>
                    )}
                  </div>

                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.35rem',
                        color: '#FFFFFF',
                        marginBottom: '6px',
                      }}
                    >
                      {item.title}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#D1D5DB' }}>
                      <MapPin size={14} color="var(--color-gold)" />
                      {item.location} {item.eventDate && `• ${item.eventDate}`}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox for Photos */}
      {selectedImage && (
        <LightboxModal
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          imageUrl={selectedImage.imageUrl}
          title={selectedImage.title}
          category={selectedImage.category}
          location={selectedImage.location}
          description={selectedImage.description}
        />
      )}

      {/* Video Modal */}
      {selectedVideo && selectedVideo.videoUrl && (
        <VideoModal
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          videoUrl={selectedVideo.videoUrl}
          title={selectedVideo.title}
        />
      )}
    </div>
  );
}
