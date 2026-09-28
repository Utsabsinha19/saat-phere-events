'use client';

import React, { useState } from 'react';
import { GALLERY_DATA } from '@/data/galleryData';
import { SectionHeading } from '@/components/common/SectionHeading';
import { GoldDivider } from '@/components/common/GoldDivider';
import { LightboxModal } from '@/components/common/LightboxModal';
import { VideoModal } from '@/components/common/VideoModal';
import { GalleryCategory, GalleryMediaItem } from '@/types/gallery';
import {
  Play,
  Eye,
  MapPin,
  Sparkles,
  Sun,
  Sunset,
  Moon,
  Film,
  Volume2,
  VolumeX,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const CATEGORIES: GalleryCategory[] = [
  'All',
  'Mandap Designs',
  'Stage Decors',
  'Floral Styling',
  'Destination Weddings',
  'Haldi / Mehendi',
  'Corporate Events',
];

type LightingMode = 'Daylight Sunshine' | 'Sunset Golden Hour' | 'Evening Royal Illumination';

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('All');
  const [lightingMode, setLightingMode] = useState<LightingMode>('Sunset Golden Hour');
  const [cinemaModeOpen, setCinemaModeOpen] = useState(false);
  const [cinemaAudio, setCinemaAudio] = useState(false);
  const [cinemaIndex, setCinemaIndex] = useState(0);

  const [selectedImage, setSelectedImage] = useState<GalleryMediaItem | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<GalleryMediaItem | null>(null);

  const filteredItems =
    activeCategory === 'All'
      ? GALLERY_DATA
      : GALLERY_DATA.filter((item) => item.category === activeCategory);

  // Dynamic Lighting Style Presets per Section 3.1
  const getLightingStyle = () => {
    switch (lightingMode) {
      case 'Daylight Sunshine':
        return {
          filter: 'brightness(1.08) saturate(1.12) contrast(1.02)',
          overlayGradient:
            'linear-gradient(180deg, rgba(255, 255, 230, 0.12) 0%, rgba(18, 18, 18, 0.8) 100%)',
          ambientLabel: 'Natural Sunlight & Open-Air Day Elegance',
          cardBorder: '1px solid rgba(212, 175, 55, 0.4)',
        };
      case 'Sunset Golden Hour':
        return {
          filter: 'brightness(1.02) saturate(1.3) sepia(0.18)',
          overlayGradient:
            'linear-gradient(180deg, rgba(255, 140, 0, 0.22) 0%, rgba(128, 0, 32, 0.65) 60%, rgba(18, 18, 18, 0.9) 100%)',
          ambientLabel: 'Amber Sunset Flare & Warm Twilight Tones',
          cardBorder: '1px solid #D4AF37',
        };
      case 'Evening Royal Illumination':
        return {
          filter: 'brightness(0.92) contrast(1.18) saturate(1.2)',
          overlayGradient:
            'linear-gradient(180deg, rgba(30, 20, 60, 0.3) 0%, rgba(90, 0, 22, 0.75) 60%, rgba(10, 10, 10, 0.95) 100%)',
          ambientLabel: 'Night Chandelier Glow & Atmospheric Moving Heads',
          cardBorder: '1px solid rgba(212, 175, 55, 0.6)',
        };
    }
  };

  const lighting = getLightingStyle();
  const cinemaVideos = GALLERY_DATA.filter((g) => g.type === 'video' || g.featured);

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
            High-Definition Portfolio & Scenography Engine
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
            Toggle live lighting moods to visualize decor versatility across daylight, sunset, and royal evening illumination. Or launch full-screen Cinema Mode for cinematic highlight reels.
          </p>
        </div>
      </section>

      {/* Control Station: Dynamic Lighting Modes & Cinema Mode Trigger (Section 3.1) */}
      <section
        style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E5E7EB',
          padding: '20px 0',
          position: 'sticky',
          top: 'var(--header-height)',
          zIndex: 90,
          boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          {/* Lighting Mode Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-maroon)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Lighting Preview Mode:
            </span>

            <button
              onClick={() => setLightingMode('Daylight Sunshine')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: 600,
                border: lightingMode === 'Daylight Sunshine' ? '1.5px solid #F59E0B' : '1px solid #E5E7EB',
                backgroundColor: lightingMode === 'Daylight Sunshine' ? '#FEF3C7' : '#FFFFFF',
                color: lightingMode === 'Daylight Sunshine' ? '#92400E' : '#4B5563',
                cursor: 'pointer',
              }}
            >
              <Sun size={14} color="#D97706" />
              Daylight Sunshine
            </button>

            <button
              onClick={() => setLightingMode('Sunset Golden Hour')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: 600,
                border: lightingMode === 'Sunset Golden Hour' ? '1.5px solid var(--color-gold)' : '1px solid #E5E7EB',
                backgroundColor: lightingMode === 'Sunset Golden Hour' ? 'var(--color-ivory)' : '#FFFFFF',
                color: lightingMode === 'Sunset Golden Hour' ? 'var(--color-maroon)' : '#4B5563',
                cursor: 'pointer',
              }}
            >
              <Sunset size={14} color="var(--color-gold)" />
              Sunset Golden Hour
            </button>

            <button
              onClick={() => setLightingMode('Evening Royal Illumination')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: 600,
                border: lightingMode === 'Evening Royal Illumination' ? '1.5px solid #800020' : '1px solid #E5E7EB',
                backgroundColor: lightingMode === 'Evening Royal Illumination' ? 'var(--color-maroon)' : '#FFFFFF',
                color: lightingMode === 'Evening Royal Illumination' ? '#FFFFFF' : '#4B5563',
                cursor: 'pointer',
              }}
            >
              <Moon size={14} color={lightingMode === 'Evening Royal Illumination' ? '#F4E8C1' : '#6B7280'} />
              Royal Evening Illumination
            </button>
          </div>

          {/* Cinema Mode Button */}
          <div>
            <button
              onClick={() => setCinemaModeOpen(true)}
              className="btn-gold"
              style={{
                padding: '8px 18px',
                fontSize: '0.82rem',
                letterSpacing: '0.5px',
              }}
            >
              <Film size={15} />
              Launch Cinema Mode
            </button>
          </div>
        </div>
      </section>

      {/* Filterable Gallery Section */}
      <section className="section-padding">
        <div className="container">
          {/* Active Lighting Description Badge */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.85rem',
                color: 'var(--color-maroon)',
                background: 'var(--color-ivory-light)',
                padding: '6px 16px',
                borderRadius: '9999px',
                border: '1px solid var(--color-border-gold)',
                fontWeight: 600,
              }}
            >
              <Sparkles size={14} color="var(--color-gold)" />
              Atmospheric Grade: {lighting.ambientLabel}
            </span>
          </div>

          {/* PRD Filterable Categories */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '10px',
              marginBottom: '44px',
            }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '9px 22px',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
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

          {/* Media Grid with dynamic lighting filter */}
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
                  border: lighting.cardBorder,
                  transition: 'all 0.4s ease',
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
                  className="hover-zoom"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: lighting.filter,
                    transition: 'filter 0.5s ease, transform 0.5s ease',
                  }}
                />

                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: lighting.overlayGradient,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '24px',
                    transition: 'background 0.5s ease',
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
                        textShadow: '0 2px 8px rgba(0,0,0,0.7)',
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

      {/* Full-Screen Cinema Mode Overlay (PRD Section 3.1) */}
      {cinemaModeOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#0A0A0C',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '30px',
            color: '#FFFFFF',
          }}
        >
          {/* Cinema Topbar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="badge-gold">Cinema Theatre Mode</span>
              <span style={{ fontSize: '0.9rem', color: '#9CA3AF' }}>
                Reel {cinemaIndex + 1} of {cinemaVideos.length}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button
                onClick={() => setCinemaAudio(!cinemaAudio)}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: cinemaAudio ? 'var(--color-gold)' : '#FFFFFF',
                  cursor: 'pointer',
                }}
                aria-label="Toggle ambient spatial audio"
              >
                {cinemaAudio ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </button>

              <button
                onClick={() => setCinemaModeOpen(false)}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                }}
                aria-label="Exit cinema mode"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Main Cinema View */}
          <div
            style={{
              maxWidth: '1020px',
              width: '100%',
              margin: '0 auto',
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(0,0,0,0.9), 0 0 40px rgba(212,175,55,0.2)',
              border: '1px solid var(--color-gold)',
            }}
          >
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
              <iframe
                src={cinemaVideos[cinemaIndex]?.videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'}
                title="Saat Phere Cinema Showcase"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* Cinema Bottom Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1020px', width: '100%', margin: '0 auto' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--color-gold)' }}>
                {cinemaVideos[cinemaIndex]?.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#9CA3AF' }}>
                {cinemaVideos[cinemaIndex]?.location} • Royal Destination Showcase
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setCinemaIndex((prev) => (prev === 0 ? cinemaVideos.length - 1 : prev - 1))}
                className="btn-outline"
                style={{ padding: '8px 16px', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.4)' }}
              >
                <ChevronLeft size={16} />
                Previous Reel
              </button>
              <button
                onClick={() => setCinemaIndex((prev) => (prev === cinemaVideos.length - 1 ? 0 : prev + 1))}
                className="btn-gold"
                style={{ padding: '8px 16px' }}
              >
                Next Reel
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

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
