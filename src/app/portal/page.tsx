'use client';

import React, { useState } from 'react';
import { SectionHeading } from '@/components/common/SectionHeading';
import { GoldDivider } from '@/components/common/GoldDivider';
import { RsvpManager } from '@/components/portal/RsvpManager';
import { BudgetTracker } from '@/components/portal/BudgetTracker';
import { DigitalContractSigner } from '@/components/portal/DigitalContractSigner';
import { DecorMoodboardCanvas } from '@/components/portal/DecorMoodboardCanvas';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  FileCheck,
  Heart,
  Image as ImageIcon,
  Shield,
  Sparkles,
  Users,
  DollarSign,
  Palette,
} from 'lucide-react';

export default function ClientPortalPage() {
  const [activeTab, setActiveTab] = useState<'milestones' | 'budget' | 'guests' | 'moodboards' | 'contracts'>('milestones');

  const clientEvent = {
    coupleNames: 'Ananya & Siddharth Singhania',
    eventType: '3-Day Palatial Destination Wedding',
    venue: 'Jagmandir Island Palace, Udaipur',
    eventDate: 'December 18 - 20, 2026',
    daysRemaining: 80,
    director: 'Vikramaditya Rathore (Senior Managing Director)',
  };

  const milestones = [
    {
      title: 'Heritage Palace Exclusive Buyout Signed',
      date: 'Completed • Aug 2026',
      status: 'done',
      desc: 'Exclusive buyout contract for Jagmandir Island Palace & Lake Pichola boat charters finalized.',
    },
    {
      title: '3D Mandap & Scenography Moodboard Approved',
      date: 'Completed • Sep 2026',
      status: 'done',
      desc: 'Reviewing lakeside floral lotus pavilion and crystal chandelier aisle rendering.',
    },
    {
      title: 'Celebrity Sufi & Sangeet Artist Contracting',
      date: 'Current Stage • Oct 2026',
      status: 'active',
      desc: 'Securing headline vocalists and concert-grade line-array sound engineers.',
    },
    {
      title: 'Executive Culinary Menu & Spirits Tasting',
      date: 'Upcoming • Nov 2026',
      status: 'pending',
      desc: 'Private chef multi-course tasting session in Udaipur for the family.',
    },
    {
      title: 'Grand Royal Wedding Celebration & Execution',
      date: 'Target • Dec 18-20, 2026',
      status: 'pending',
      desc: 'Multi-day celebration with full white-glove logistics and shadow concierges.',
    },
  ];

  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Banner */}
      <section
        style={{
          background: 'var(--gradient-royal-overlay), url("https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF',
          padding: '80px 20px 60px 20px',
        }}
      >
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge-gold" style={{ background: 'rgba(212, 175, 55, 0.25)', color: 'var(--color-gold-light)' }}>
              Client Command Console • Saat Phere Privé
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#FFFFFF', marginBottom: '6px' }}>
                Welcome, {clientEvent.coupleNames}
              </h1>
              <p style={{ color: 'var(--color-gold-light)', fontSize: '1.05rem', fontStyle: 'italic' }}>
                {clientEvent.eventType} • {clientEvent.venue}
              </p>
            </div>

            {/* Countdown Badge */}
            <div
              style={{
                backgroundColor: 'rgba(18, 18, 18, 0.85)',
                border: '1.5px solid var(--color-gold)',
                borderRadius: '12px',
                padding: '16px 24px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#D1D5DB', letterSpacing: '1px' }}>
                Celebration Countdown
              </div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-gold)', fontFamily: 'var(--font-serif)', lineHeight: 1.1 }}>
                {clientEvent.daysRemaining} Days
              </div>
              <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{clientEvent.eventDate}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Portal View */}
      <div className="container" style={{ maxWidth: '1100px', marginTop: '36px' }}>
        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid #E5E7EB', paddingBottom: '16px', marginBottom: '32px', overflowX: 'auto' }}>
          <button
            onClick={() => setActiveTab('milestones')}
            style={{
              padding: '10px 18px',
              borderRadius: '8px',
              fontSize: '0.88rem',
              fontWeight: 600,
              backgroundColor: activeTab === 'milestones' ? 'var(--color-maroon)' : '#F3F4F6',
              color: activeTab === 'milestones' ? '#FFFFFF' : '#374151',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              whiteSpace: 'nowrap',
            }}
          >
            <Clock size={16} />
            Master Milestones
          </button>

          <button
            onClick={() => setActiveTab('budget')}
            style={{
              padding: '10px 18px',
              borderRadius: '8px',
              fontSize: '0.88rem',
              fontWeight: 600,
              backgroundColor: activeTab === 'budget' ? 'var(--color-maroon)' : '#F3F4F6',
              color: activeTab === 'budget' ? '#FFFFFF' : '#374151',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              whiteSpace: 'nowrap',
            }}
          >
            <DollarSign size={16} />
            Budget & Invoices
          </button>

          <button
            onClick={() => setActiveTab('guests')}
            style={{
              padding: '10px 18px',
              borderRadius: '8px',
              fontSize: '0.88rem',
              fontWeight: 600,
              backgroundColor: activeTab === 'guests' ? 'var(--color-maroon)' : '#F3F4F6',
              color: activeTab === 'guests' ? '#FFFFFF' : '#374151',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              whiteSpace: 'nowrap',
            }}
          >
            <Users size={16} />
            RSVPs & Guest Directory
          </button>

          <button
            onClick={() => setActiveTab('moodboards')}
            style={{
              padding: '10px 18px',
              borderRadius: '8px',
              fontSize: '0.88rem',
              fontWeight: 600,
              backgroundColor: activeTab === 'moodboards' ? 'var(--color-maroon)' : '#F3F4F6',
              color: activeTab === 'moodboards' ? '#FFFFFF' : '#374151',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              whiteSpace: 'nowrap',
            }}
          >
            <Palette size={16} />
            3D Decor & Moodboards
          </button>

          <button
            onClick={() => setActiveTab('contracts')}
            style={{
              padding: '10px 18px',
              borderRadius: '8px',
              fontSize: '0.88rem',
              fontWeight: 600,
              backgroundColor: activeTab === 'contracts' ? 'var(--color-maroon)' : '#F3F4F6',
              color: activeTab === 'contracts' ? '#FFFFFF' : '#374151',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              whiteSpace: 'nowrap',
            }}
          >
            <FileCheck size={16} />
            Digital E-Contracts
          </button>
        </div>

        {/* Tab 1: Milestones */}
        {activeTab === 'milestones' && (
          <div className="luxury-card" style={{ padding: '36px', backgroundColor: '#FFFFFF' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-maroon)', marginBottom: '8px' }}>
              Master Production Progress Tracker
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#6B7280', marginBottom: '28px' }}>
              Lead Event Director: <strong>{clientEvent.director}</strong>
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {milestones.map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                    paddingBottom: '20px',
                    borderBottom: idx !== milestones.length - 1 ? '1px solid #F3F4F6' : 'none',
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor:
                        m.status === 'done' ? '#ECFDF5' : m.status === 'active' ? '#FEF3C7' : '#F3F4F6',
                      border:
                        m.status === 'done'
                          ? '1px solid #10B981'
                          : m.status === 'active'
                          ? '1px solid var(--color-gold)'
                          : '1px solid #D1D5DB',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color:
                        m.status === 'done' ? '#059669' : m.status === 'active' ? 'var(--color-gold-dark)' : '#9CA3AF',
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {m.status === 'done' ? <CheckCircle2 size={18} /> : idx + 1}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <h4 style={{ fontSize: '1.1rem', color: '#111827', fontWeight: 700 }}>{m.title}</h4>
                      <span style={{ fontSize: '0.78rem', color: '#6B7280', fontWeight: 600 }}>{m.date}</span>
                    </div>
                    <p style={{ fontSize: '0.88rem', color: '#4B5563', marginTop: '4px', lineHeight: 1.5 }}>
                      {m.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Budget & Invoices */}
        {activeTab === 'budget' && <BudgetTracker />}

        {/* Tab 3: RSVPs & Guest Directory */}
        {activeTab === 'guests' && <RsvpManager />}

        {/* Tab 4: 3D Decor & Moodboard */}
        {activeTab === 'moodboards' && <DecorMoodboardCanvas />}

        {/* Tab 5: Digital E-Contracts */}
        {activeTab === 'contracts' && <DigitalContractSigner />}
      </div>
    </div>
  );
}
