'use client';

import React, { useState } from 'react';
import { SectionHeading } from '@/components/common/SectionHeading';
import { TESTIMONIALS_DATA } from '@/data/testimonialsData';
import { Star, ChevronLeft, ChevronRight, Quote, MapPin, CheckCircle2, Calendar, Users, Camera, X } from 'lucide-react';

export const TestimonialsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<{ url: string; title: string; location: string } | null>(null);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS_DATA[currentIndex];

  return (
    <section id="testimonials" className="section-padding" style={{ backgroundColor: 'var(--color-ivory-light, #FAF8F5)' }}>
      <div className="container">
        <SectionHeading
          subtitle="Real Celebrations"
          title="Words From Our Royal Couples & Families"
          description="Authentic reflections, memories, and photos from couples who entrusted Saat Phere Events with their once-in-a-lifetime destination celebrations."
        />

        <div
          style={{
            maxWidth: '960px',
            margin: '0 auto',
            position: 'relative',
          }}
        >
          {/* Card Container */}
          <div
            className="luxury-card testimonial-card"
            style={{
              backgroundColor: '#FFFFFF',
              position: 'relative',
              borderRadius: '20px',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.06)',
            }}
          >
            {/* Background Quote Watermark */}
            <div
              style={{
                position: 'absolute',
                top: '24px',
                right: '32px',
                color: 'rgba(212, 175, 55, 0.18)',
                pointerEvents: 'none',
              }}
            >
              <Quote size={72} />
            </div>

            {/* Header: Stars & Verified Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '20px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ display: 'flex', gap: '3px' }}>
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="#D4AF37" color="#D4AF37" />
                  ))}
                </div>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-gold-dark, #8A6D1C)', marginLeft: '4px' }}>
                  5.0 / 5.0
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    backgroundColor: '#ECFDF5',
                    color: '#065F46',
                    padding: '4px 10px',
                    borderRadius: '16px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    border: '1px solid #A7F3D0',
                  }}
                >
                  <CheckCircle2 size={13} color="#059669" />
                  Verified Client Review
                </span>
              </div>
            </div>

            {/* Review text */}
            <p
              style={{
                fontSize: '1.18rem',
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                color: '#1F2937',
                lineHeight: 1.75,
                marginBottom: '32px',
                position: 'relative',
                zIndex: 1,
              }}
            >
              &ldquo;{current.reviewText}&rdquo;
            </p>

            {/* Divider */}
            <div
              style={{
                height: '1px',
                backgroundColor: 'rgba(212, 175, 55, 0.2)',
                marginBottom: '24px',
              }}
            />

            {/* Couple Profile & Photo Preview Row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '20px',
              }}
            >
              {/* Couple Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: 0, flex: '1 1 200px' }}>
                <div style={{ position: 'relative' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={current.avatarUrl}
                    alt={current.clientNames}
                    style={{
                      width: '68px',
                      height: '68px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2.5px solid var(--color-gold, #D4AF37)',
                      boxShadow: '0 4px 14px rgba(212, 175, 55, 0.25)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-2px',
                      right: '-2px',
                      backgroundColor: '#059669',
                      borderRadius: '50%',
                      width: '18px',
                      height: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid #FFFFFF',
                    }}
                    title="Verified Client"
                  >
                    <CheckCircle2 size={11} color="#FFFFFF" />
                  </div>
                </div>

                <div>
                  <h4
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: 'var(--color-maroon, #800020)',
                      marginBottom: '2px',
                    }}
                  >
                    {current.clientNames}
                  </h4>
                  <div
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--color-gold-dark, #8A6D1C)',
                      fontWeight: 600,
                      marginBottom: '4px',
                    }}
                  >
                    {current.eventType}
                  </div>
                  <div
                    style={{
                      fontSize: '0.78rem',
                      color: '#6B7280',
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '8px',
                    }}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={12} color="var(--color-gold, #D4AF37)" />
                      {current.weddingLocation}
                    </span>
                    <span>•</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={12} color="var(--color-gold, #D4AF37)" />
                      {current.eventDate}
                    </span>
                    {current.guestCount && (
                      <>
                        <span>•</span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Users size={12} color="var(--color-gold, #D4AF37)" />
                          {current.guestCount}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Real Wedding Celebration Photo Preview & Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {current.venueImage && (
                  <button
                    onClick={() =>
                      setSelectedPhoto({
                        url: current.venueImage!,
                        title: current.clientNames,
                        location: `${current.eventType} • ${current.weddingLocation}`,
                      })
                    }
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      backgroundColor: 'rgba(255, 253, 245, 0.9)',
                      border: '1px solid rgba(212, 175, 55, 0.4)',
                      padding: '6px 12px 6px 8px',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s ease',
                    }}
                    title="Click to view real wedding celebration photo"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={current.venueImage}
                      alt="Real Wedding Celebration"
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '8px',
                        objectFit: 'cover',
                        border: '1px solid var(--color-gold, #D4AF37)',
                      }}
                    />
                    <div>
                      <div
                        style={{
                          fontSize: '0.72rem',
                          textTransform: 'uppercase',
                          fontWeight: 700,
                          letterSpacing: '0.04em',
                          color: 'var(--color-maroon, #800020)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <Camera size={11} color="var(--color-gold, #D4AF37)" />
                        Real Wedding Photo
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#6B7280' }}>Click to view full photo</div>
                    </div>
                  </button>
                )}

                {/* Navigation Arrows */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={prevSlide}
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      border: '1px solid rgba(212, 175, 55, 0.35)',
                      backgroundColor: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-maroon, #800020)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                      transition: 'all 0.2s ease',
                    }}
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextSlide}
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      border: '1px solid var(--color-gold, #D4AF37)',
                      backgroundColor: 'var(--color-maroon, #800020)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      boxShadow: '0 3px 10px rgba(128, 0, 32, 0.25)',
                      transition: 'all 0.2s ease',
                    }}
                    aria-label="Next testimonial"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
            {TESTIMONIALS_DATA.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                style={{
                  width: currentIndex === idx ? '28px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: currentIndex === idx ? 'var(--color-gold, #D4AF37)' : '#D1D5DB',
                  border: 'none',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Real Wedding Photography */}
      {selectedPhoto && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: 'rgba(10, 10, 10, 0.88)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '840px',
              width: '100%',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.4)',
              border: '1px solid var(--color-border-gold, #D4AF37)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                zIndex: 2,
                backgroundColor: 'rgba(0, 0, 0, 0.65)',
                color: '#FFFFFF',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                cursor: 'pointer',
              }}
              aria-label="Close photo preview"
            >
              <X size={20} />
            </button>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.title}
              style={{
                width: '100%',
                maxHeight: '68vh',
                objectFit: 'contain',
                backgroundColor: '#111827',
              }}
            />

            <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--color-maroon, #800020)' }}>
                  {selectedPhoto.title}
                </h4>
                <div style={{ fontSize: '0.85rem', color: '#6B7280' }}>{selectedPhoto.location}</div>
              </div>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  backgroundColor: '#ECFDF5',
                  color: '#065F46',
                  padding: '4px 12px',
                  borderRadius: '14px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  border: '1px solid #A7F3D0',
                }}
              >
                <CheckCircle2 size={13} color="#059669" />
                Real Wedding Photograph
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
