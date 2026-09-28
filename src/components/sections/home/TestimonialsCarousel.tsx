'use client';

import React, { useState } from 'react';
import { SectionHeading } from '@/components/common/SectionHeading';
import { TESTIMONIALS_DATA } from '@/data/testimonialsData';
import { Star, ChevronLeft, ChevronRight, Quote, MapPin } from 'lucide-react';

export const TestimonialsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS_DATA[currentIndex];

  return (
    <section id="testimonials" className="section-padding">
      <div className="container">
        <SectionHeading
          subtitle="Celebrated Legacies"
          title="Words From Our Royal Couples & Families"
          description="Read glowing reflections from high-profile couples who entrusted Saat Phere Events with their once-in-a-lifetime moments."
        />

        <div
          style={{
            maxWidth: '920px',
            margin: '0 auto',
            position: 'relative',
          }}
        >
          {/* Card Container */}
          <div
            className="luxury-card"
            style={{
              padding: '48px',
              backgroundColor: '#FFFFFF',
              position: 'relative',
              borderRadius: '16px',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '24px',
                right: '32px',
                color: 'rgba(212, 175, 55, 0.25)',
              }}
            >
              <Quote size={64} />
            </div>

            {/* Stars */}
            <div style={{ display: 'flex', gap: '4px', marginBottom: '18px' }}>
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} size={18} fill="#D4AF37" color="#D4AF37" />
              ))}
            </div>

            {/* Review text */}
            <p
              style={{
                fontSize: '1.2rem',
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                color: '#1F2937',
                lineHeight: 1.7,
                marginBottom: '28px',
              }}
            >
              &ldquo;{current.reviewText}&rdquo;
            </p>

            {/* Couple Profile */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={current.avatarUrl}
                  alt={current.clientNames}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid var(--color-gold)',
                  }}
                />
                <div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--color-maroon)' }}>
                    {current.clientNames}
                  </h4>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-gold-dark)', fontWeight: 600 }}>
                    {current.eventType}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                    <MapPin size={12} color="var(--color-gold)" />
                    {current.weddingLocation} • {current.eventDate}
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={prevSlide}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    border: '1px solid var(--color-border)',
                    backgroundColor: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-maroon)',
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
                    border: '1px solid var(--color-gold)',
                    backgroundColor: 'var(--color-maroon)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                  }}
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={20} />
                </button>
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
                  width: currentIndex === idx ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: currentIndex === idx ? 'var(--color-gold)' : '#D1D5DB',
                  border: 'none',
                  transition: 'all 0.3s ease',
                }}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
