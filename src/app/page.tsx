'use client';

import React, { useState } from 'react';
import { HeroSection } from '@/components/sections/home/HeroSection';
import { BrandIntro } from '@/components/sections/home/BrandIntro';
import { ServicesGrid } from '@/components/sections/home/ServicesGrid';
import { ShowcasePreview } from '@/components/sections/home/ShowcasePreview';
import { LuxuryStats } from '@/components/sections/home/LuxuryStats';
import { TestimonialsCarousel } from '@/components/sections/home/TestimonialsCarousel';
import { InstagramGrid } from '@/components/sections/home/InstagramGrid';
import { QuickInquiryModal } from '@/components/forms/QuickInquiryModal';
import Link from 'next/link';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <HeroSection onOpenConsultation={() => setModalOpen(true)} />
      <BrandIntro />
      <ServicesGrid />
      <LuxuryStats />
      <ShowcasePreview />
      <TestimonialsCarousel />

      {/* Royal Consultation Invitation Banner */}
      <section
        style={{
          background: 'var(--gradient-royal-overlay), url("https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF',
          padding: '90px 20px',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '780px' }}>
          <span className="badge-gold" style={{ background: 'rgba(212, 175, 55, 0.25)', color: 'var(--color-gold-light)', marginBottom: '14px' }}>
            <Sparkles size={12} style={{ display: 'inline', marginRight: '6px' }} />
            Dates for 2026 – 2027 Wedding Seasons Now Open
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
              color: '#FFFFFF',
              marginTop: '12px',
              marginBottom: '16px',
            }}
          >
            Begin Crafting Your Unforgettable Celebration
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '32px', lineHeight: 1.6 }}>
            Connect with our Senior Creative Director to discuss venue selections, auspicious date blocks, and tailored floral scenography.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <button
              onClick={() => setModalOpen(true)}
              className="btn-gold"
              style={{ padding: '16px 36px', fontSize: '1rem' }}
            >
              <Calendar size={18} />
              Book Confidential Consultation
            </button>
            <Link
              href="/packages"
              className="btn-outline"
              style={{ padding: '15px 32px', color: '#FFFFFF', borderColor: '#FFFFFF' }}
            >
              Interactive Quotation Engine
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <InstagramGrid />

      <QuickInquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
