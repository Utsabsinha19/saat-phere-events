'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SectionHeading } from '@/components/common/SectionHeading';
import { GALLERY_DATA } from '@/data/galleryData';
import { LightboxModal } from '@/components/common/LightboxModal';
import { Eye, ArrowRight, MapPin } from 'lucide-react';
import { GalleryMediaItem } from '@/types/gallery';

export const ShowcasePreview: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryMediaItem | null>(null);

  const categories = ['All', 'Mandap Designs', 'Destination Weddings', 'Haldi / Mehendi', 'Stage Decors'];

  const filteredItems =
    activeCategory === 'All'
      ? GALLERY_DATA.slice(0, 6)
      : GALLERY_DATA.filter((i) => i.category === activeCategory).slice(0, 6);

  return (
    <section className="section-padding ivory-bg">
      <div className="container">
        <SectionHeading
          subtitle="Portfolio Highlights"
          title="Flagship Mandaps & Palatial Celebrations"
          description="Explore our handpicked curation of royal weddings executed across Jagmandir Palace Udaipur, Rambagh Palace Jaipur, and coastal Goa."
        />

        {/* Category Filter Pills */}
        <div
          className="showcase-filter"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '8px 20px',
                borderRadius: '9999px',
                fontSize: '0.85rem',
                fontWeight: 600,
                border: activeCategory === cat ? '1px solid var(--color-gold)' : '1px solid #D1D5DB',
                backgroundColor: activeCategory === cat ? 'var(--color-maroon)' : '#FFFFFF',
                color: activeCategory === cat ? '#FFFFFF' : '#374151',
                boxShadow: activeCategory === cat ? 'var(--shadow-gold)' : 'none',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Showcase Grid */}
        <div
          className="showcase-grid"
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="luxury-card showcase-card"
              style={{ position: 'relative', cursor: 'pointer' }}
              onClick={() => setSelectedImage(item)}
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

              {/* Gradient Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(0,0,0,0.1) 40%, rgba(18,18,18,0.85) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '20px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="badge-gold" style={{ background: 'rgba(0,0,0,0.7)', color: 'var(--color-gold-light)' }}>
                    {item.category}
                  </span>
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
                </div>

                <div>
                  <h4
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.25rem',
                      color: '#FFFFFF',
                      marginBottom: '6px',
                    }}
                  >
                    {item.title}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#D1D5DB' }}>
                    <MapPin size={13} color="var(--color-gold)" />
                    {item.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Portfolio Button */}
        <div style={{ textAlign: 'center' }}>
          <Link href="/portfolio" className="btn-primary" style={{ padding: '14px 32px' }}>
            <Eye size={18} color="var(--color-gold)" />
            View Complete HD Portfolio Gallery
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

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
    </section>
  );
};
