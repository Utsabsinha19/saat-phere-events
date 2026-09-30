'use client';

import React, { useState } from 'react';
import { HeroSection } from '@/components/sections/home/HeroSection';
import { BrandIntro } from '@/components/sections/home/BrandIntro';
import { ServicesGrid } from '@/components/sections/home/ServicesGrid';
import { GallerySection } from '@/components/sections/home/GallerySection';
import { GetAQuoteSection } from '@/components/sections/home/GetAQuoteSection';
import { LuxuryStats } from '@/components/sections/home/LuxuryStats';
import { TestimonialsCarousel } from '@/components/sections/home/TestimonialsCarousel';
import { InstagramGrid } from '@/components/sections/home/InstagramGrid';
import { QuickInquiryModal } from '@/components/forms/QuickInquiryModal';
import Link from 'next/link';
import { Sparkles, Calendar, ArrowRight, MessageSquare } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* 1st Look: Grand Hero Showcase with Big Logo, Blurry Backdrop & Tagline */}
      <HeroSection onOpenConsultation={() => setModalOpen(true)} />

      {/* 2nd Look: Why Choose Saat Phere Events? (Bihar Roots & Royal Mastery) */}
      <BrandIntro />

      {/* 3rd Look: Our Services (9 Disciplines with Photos & Videos) */}
      <ServicesGrid />

      {/* 4th Look: Dedicated Gallery (Photos & Video Reels Showcase) */}
      <GallerySection />

      {/* 5th Look: Get a Quote (Premium Dark-Aesthetic Section) */}
      <GetAQuoteSection />

      {/* Social Proof & Happy Royal Couples */}
      <TestimonialsCarousel />

      {/* Bihar & Pan-India Scale & Statistics */}
      <LuxuryStats />

      {/* Royal Get in Touch Invitation Banner */}
      <section
        style={{
          background: 'var(--gradient-royal-overlay), url("/images/real-events/decor-3.webp")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF',
          padding: '90px 20px',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '820px' }}>
          <span
            className="badge-gold"
            style={{
              background: 'rgba(212, 175, 55, 0.25)',
              color: 'var(--color-gold-light)',
              marginBottom: '14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Sparkles size={13} />
            Dates for 2026 – 2027 Wedding Seasons Now Open Across Bihar & India
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4.2vw, 3.2rem)',
              color: '#FFFFFF',
              marginTop: '14px',
              marginBottom: '16px',
            }}
          >
            Begin Crafting Your Unforgettable Celebration
          </h2>

          <p style={{ fontSize: '1.08rem', color: 'rgba(255, 255, 255, 0.92)', marginBottom: '32px', lineHeight: 1.65 }}>
            Connect with our Senior Creative Director in Katihar & Patna to discuss venue selections, auspicious date blocks, and tailored floral scenography.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}>
            {/* Requirement 6: CTA text "Get in Touch" */}
            <button
              onClick={() => setModalOpen(true)}
              className="btn-gold"
              style={{ padding: '16px 36px', fontSize: '1rem', fontWeight: 700 }}
            >
              <Calendar size={18} />
              Get in Touch
            </button>

            <a
              href={`https://wa.me/${SITE_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent(
                'Namaste Saat Phere Events, I would like to get in touch regarding planning an upcoming celebration.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{ padding: '15px 32px', color: '#FFFFFF', borderColor: '#FFFFFF', textDecoration: 'none' }}
            >
              <MessageSquare size={16} />
              WhatsApp Concierge
            </a>
          </div>
        </div>
      </section>

      {/* Instagram Community Feed */}
      <InstagramGrid />

      {/* Modal for Quick Inquiries */}
      <QuickInquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
