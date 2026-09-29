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
  KeyRound,
  Lock,
  LogOut,
  Smartphone,
  Check,
  Columns,
  List,
} from 'lucide-react';

interface KanbanMilestone {
  id: string;
  title: string;
  category: 'Venue & Logistics' | 'Scenography & Decor' | 'Culinary Tasting' | 'Artists & Entertainment' | 'Execution';
  dueDate: string;
  status: 'Completed' | 'In Progress' | 'Pending';
  assignedManager: string;
  desc: string;
}

export default function ClientPortalPage() {
  const [activeTab, setActiveTab] = useState<'milestones' | 'budget' | 'guests' | 'moodboards' | 'contracts'>('milestones');
  const [timelineView, setTimelineView] = useState<'kanban' | 'list'>('kanban');

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authPhone, setAuthPhone] = useState('+91 98200 12345');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpDispatched, setOtpDispatched] = useState(false);
  const [authNotice, setAuthNotice] = useState<string | null>(null);

  const clientEvent = {
    coupleNames: 'Ananya & Siddharth Singhania',
    eventType: '3-Day Palatial Destination Wedding',
    venue: 'Jagmandir Island Palace & City Palace Complex, Udaipur',
    eventDate: 'December 18 – 20, 2026',
    daysRemaining: 80,
    director: 'Vikramaditya Rathore (Senior Managing Director)',
  };

  const [milestones, setMilestones] = useState<KanbanMilestone[]>([
    {
      id: 'ms-01',
      title: 'Heritage Palace Exclusive Buyout Signed',
      category: 'Venue & Logistics',
      dueDate: 'Aug 2026',
      status: 'Completed',
      assignedManager: 'Vikramaditya Rathore',
      desc: 'Exclusive buyout contract for Jagmandir Island Palace & Lake Pichola boat charters finalized.',
    },
    {
      id: 'ms-02',
      title: '3D Mandap & Scenography Moodboard Approved',
      category: 'Scenography & Decor',
      dueDate: 'Sep 2026',
      status: 'Completed',
      assignedManager: 'Bhavna Chauhan',
      desc: 'Reviewing lakeside floral lotus pavilion and crystal chandelier aisle rendering.',
    },
    {
      id: 'ms-03',
      title: 'Celebrity Sufi & Sangeet Artist Contracting',
      category: 'Artists & Entertainment',
      dueDate: 'Oct 2026',
      status: 'In Progress',
      assignedManager: 'Vikramaditya Rathore',
      desc: 'Securing Kailash Kher Sufi Ensemble, DJ Shadow Dubai, and concert line-array sound engineering rider.',
    },
    {
      id: 'ms-04',
      title: 'Executive Culinary Menu & Spirits Tasting',
      category: 'Culinary Tasting',
      dueDate: 'Nov 2026',
      status: 'Pending',
      assignedManager: 'Chef Hemant Oberoi Team',
      desc: 'Private chef multi-course tasting session in Udaipur for the family with molecular mixology bar preview.',
    },
    {
      id: 'ms-05',
      title: 'Final Guest Count & Room Allocation Lock',
      category: 'Venue & Logistics',
      dueDate: 'Nov 25, 2026',
      status: 'Pending',
      assignedManager: 'Aditya Singhal',
      desc: 'Locking Udaivilas & Lake Palace suite master rooming list and charter arrivals.',
    },
    {
      id: 'ms-06',
      title: 'Grand Royal Wedding Celebration & Execution',
      category: 'Execution',
      dueDate: 'Dec 18-20, 2026',
      status: 'Pending',
      assignedManager: 'Operations Directorate',
      desc: 'Multi-day celebration with full white-glove logistics, royal flotillas, and shadow concierges.',
    },
  ]);

  const handleSendOtp = async () => {
    try {
      const res = await fetch('/api/v1/client/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneOrEmail: authPhone }),
      });
      const data = await res.json();
      setOtpDispatched(true);
      setAuthNotice(`Verification OTP dispatched via WhatsApp to ${authPhone} (Demo code: 777777)`);
    } catch (e) {
      setOtpDispatched(true);
      setAuthNotice('Demo code: 777777');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await fetch('/api/v1/client/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneOrEmail: authPhone, otp: enteredOtp || '777777' }),
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        setShowAuthModal(false);
        setOtpDispatched(false);
        setEnteredOtp('');
        setAuthNotice(null);
      } else {
        alert(data.error || 'Invalid OTP');
      }
    } catch (e) {
      setIsAuthenticated(true);
      setShowAuthModal(false);
    }
  };

  const handleToggleMilestone = (id: string, newStatus: KanbanMilestone['status']) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
    );
  };

  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Banner */}
      <section
        style={{
          background: 'var(--gradient-royal-overlay), url("/images/hero/hero-beach-goa.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF',
          padding: '80px 20px 60px 20px',
        }}
      >
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '8px' }}>
            <span className="badge-gold" style={{ background: 'rgba(212, 175, 55, 0.25)', color: 'var(--color-gold-light)' }}>
              Client Command Console • Saat Phere Privé
            </span>

            {isAuthenticated ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#D1D5DB' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                <span>Session: <strong>Singhania Family Office</strong></span>
                <button
                  onClick={() => setIsAuthenticated(false)}
                  title="Sign Out"
                  style={{ background: 'none', border: 'none', color: 'var(--color-gold-light)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px', marginLeft: '6px' }}
                >
                  <LogOut size={13} /> Exit
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="btn-gold"
                style={{ padding: '6px 14px', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <KeyRound size={13} />
                Client Passwordless Login
              </button>
            )}
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

        {/* Tab 1: Milestones (Kanban & List views) */}
        {activeTab === 'milestones' && (
          <div className="luxury-card" style={{ padding: '36px', backgroundColor: '#FFFFFF' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-maroon)', marginBottom: '4px' }}>
                  Interactive Production Planning Timeline
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#6B7280' }}>
                  Lead Event Director: <strong>{clientEvent.director}</strong>
                </p>
              </div>

              {/* View Switcher */}
              <div style={{ display: 'flex', gap: '6px', backgroundColor: '#F3F4F6', padding: '4px', borderRadius: '8px' }}>
                <button
                  onClick={() => setTimelineView('kanban')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: timelineView === 'kanban' ? '#FFFFFF' : 'transparent',
                    color: timelineView === 'kanban' ? '#111827' : '#6B7280',
                    boxShadow: timelineView === 'kanban' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  }}
                >
                  <Columns size={14} />
                  Kanban Board
                </button>
                <button
                  onClick={() => setTimelineView('list')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: timelineView === 'list' ? '#FFFFFF' : 'transparent',
                    color: timelineView === 'list' ? '#111827' : '#6B7280',
                    boxShadow: timelineView === 'list' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  }}
                >
                  <List size={14} />
                  List View
                </button>
              </div>
            </div>

            {timelineView === 'kanban' ? (
              /* Kanban View */
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '20px',
                }}
              >
                {/* Column: Completed */}
                <div style={{ backgroundColor: '#F9FAFB', borderRadius: '10px', padding: '16px', border: '1px solid #E5E7EB' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#065F46', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle2 size={16} color="#059669" />
                      Completed
                    </span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, backgroundColor: '#ECFDF5', color: '#065F46', padding: '2px 8px', borderRadius: '12px' }}>
                      {milestones.filter((m) => m.status === 'Completed').length}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {milestones.filter((m) => m.status === 'Completed').map((m) => (
                      <div key={m.id} style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '14px', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-gold-dark)', textTransform: 'uppercase' }}>
                          {m.category}
                        </span>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827', marginTop: '4px' }}>{m.title}</h4>
                        <p style={{ fontSize: '0.8rem', color: '#4B5563', marginTop: '6px', lineHeight: 1.4 }}>{m.desc}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', paddingTop: '8px', borderTop: '1px solid #F3F4F6', fontSize: '0.72rem', color: '#6B7280' }}>
                          <span>{m.dueDate}</span>
                          <span>{m.assignedManager}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column: In Progress */}
                <div style={{ backgroundColor: '#FFFBEB', borderRadius: '10px', padding: '16px', border: '1px solid #FDE68A' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#92400E', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={16} color="#D97706" />
                      In Progress
                    </span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, backgroundColor: '#FEF3C7', color: '#92400E', padding: '2px 8px', borderRadius: '12px' }}>
                      {milestones.filter((m) => m.status === 'In Progress').length}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {milestones.filter((m) => m.status === 'In Progress').map((m) => (
                      <div key={m.id} style={{ backgroundColor: '#FFFFFF', border: '1.5px solid var(--color-gold)', borderRadius: '8px', padding: '14px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-maroon)', textTransform: 'uppercase' }}>
                          {m.category}
                        </span>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827', marginTop: '4px' }}>{m.title}</h4>
                        <p style={{ fontSize: '0.8rem', color: '#4B5563', marginTop: '6px', lineHeight: 1.4 }}>{m.desc}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', paddingTop: '8px', borderTop: '1px solid #F3F4F6', fontSize: '0.72rem', color: '#6B7280' }}>
                          <span>Target: {m.dueDate}</span>
                          <button
                            onClick={() => handleToggleMilestone(m.id, 'Completed')}
                            style={{ background: 'none', border: 'none', color: '#059669', fontWeight: 700, cursor: 'pointer', fontSize: '0.72rem' }}
                          >
                            Mark Complete ✓
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column: Pending */}
                <div style={{ backgroundColor: '#F9FAFB', borderRadius: '10px', padding: '16px', border: '1px solid #E5E7EB' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#4B5563', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={16} color="#6B7280" />
                      Pending / Upcoming
                    </span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, backgroundColor: '#E5E7EB', color: '#374151', padding: '2px 8px', borderRadius: '12px' }}>
                      {milestones.filter((m) => m.status === 'Pending').length}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {milestones.filter((m) => m.status === 'Pending').map((m) => (
                      <div key={m.id} style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '14px', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase' }}>
                          {m.category}
                        </span>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827', marginTop: '4px' }}>{m.title}</h4>
                        <p style={{ fontSize: '0.8rem', color: '#4B5563', marginTop: '6px', lineHeight: 1.4 }}>{m.desc}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', paddingTop: '8px', borderTop: '1px solid #F3F4F6', fontSize: '0.72rem', color: '#6B7280' }}>
                          <span>Due: {m.dueDate}</span>
                          <button
                            onClick={() => handleToggleMilestone(m.id, 'In Progress')}
                            style={{ background: 'none', border: 'none', color: 'var(--color-maroon)', fontWeight: 700, cursor: 'pointer', fontSize: '0.72rem' }}
                          >
                            Start Phase →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* List View */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {milestones.map((m, idx) => (
                  <div
                    key={m.id}
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
                          m.status === 'Completed' ? '#ECFDF5' : m.status === 'In Progress' ? '#FEF3C7' : '#F3F4F6',
                        border:
                          m.status === 'Completed'
                            ? '1px solid #10B981'
                            : m.status === 'In Progress'
                            ? '1px solid var(--color-gold)'
                            : '1px solid #D1D5DB',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color:
                          m.status === 'Completed' ? '#059669' : m.status === 'In Progress' ? 'var(--color-gold-dark)' : '#9CA3AF',
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {m.status === 'Completed' ? <CheckCircle2 size={18} /> : idx + 1}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <h4 style={{ fontSize: '1.05rem', color: '#111827', fontWeight: 700 }}>{m.title}</h4>
                        <span style={{ fontSize: '0.78rem', color: '#6B7280', fontWeight: 600 }}>{m.dueDate}</span>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: '#4B5563', marginTop: '4px', lineHeight: 1.5 }}>
                        {m.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
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

      {/* Passwordless OTP Login Modal */}
      {showAuthModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '14px',
              maxWidth: '460px',
              width: '100%',
              padding: '32px',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
              border: '1.5px solid var(--color-gold)',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(212, 175, 55, 0.15)',
                  border: '1px solid var(--color-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px auto',
                  color: 'var(--color-maroon)',
                }}
              >
                <KeyRound size={26} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--color-maroon)' }}>
                Saat Phere Privé Login
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#6B7280' }}>
                Secure passwordless OTP authentication via WhatsApp or SMS
              </p>
            </div>

            {authNotice && (
              <div style={{ backgroundColor: '#ECFDF5', border: '1px solid #10B981', borderRadius: '6px', padding: '10px 14px', fontSize: '0.8rem', color: '#065F46', marginBottom: '16px' }}>
                {authNotice}
              </div>
            )}

            {!otpDispatched ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                    Registered Mobile / WhatsApp Number *
                  </label>
                  <input
                    type="text"
                    value={authPhone}
                    onChange={(e) => setAuthPhone(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.9rem' }}
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="btn-gold"
                  style={{ padding: '12px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <Smartphone size={16} />
                  Dispatch 6-Digit WhatsApp OTP
                </button>

                <div style={{ textAlign: 'center', margin: '8px 0', fontSize: '0.78rem', color: '#9CA3AF' }}>
                  — OR —
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsAuthenticated(true);
                    setShowAuthModal(false);
                  }}
                  className="btn-outline"
                  style={{ padding: '10px', fontSize: '0.85rem' }}
                >
                  1-Click Demo Login as Singhania Family
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                    Enter 6-Digit Verification Code:
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="777777"
                    value={enteredOtp}
                    onChange={(e) => setEnteredOtp(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1.5px solid var(--color-gold)', fontSize: '1.4rem', textAlign: 'center', letterSpacing: '6px', fontWeight: 700 }}
                  />
                </div>

                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="btn-gold"
                  style={{ padding: '12px', fontSize: '0.9rem' }}
                >
                  Verify Code & Enter Portal
                </button>

                <button
                  type="button"
                  onClick={() => setOtpDispatched(false)}
                  style={{ background: 'none', border: 'none', fontSize: '0.78rem', color: '#6B7280', cursor: 'pointer' }}
                >
                  Use a different phone number
                </button>
              </div>
            )}

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button
                type="button"
                onClick={() => setShowAuthModal(false)}
                style={{ background: 'none', border: 'none', fontSize: '0.8rem', color: '#9CA3AF', cursor: 'pointer' }}
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
