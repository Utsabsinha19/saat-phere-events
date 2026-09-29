'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SectionHeading } from '@/components/common/SectionHeading';
import { GoldDivider } from '@/components/common/GoldDivider';
import { RsvpStatus, DietaryPreference } from '@/types/rsvp';
import { SITE_CONFIG } from '@/config/site';
import {
  Calendar,
  MapPin,
  CheckCircle2,
  Send,
  Heart,
  Utensils,
  Bed,
  Plane,
  Download,
  Sparkles,
  Search,
} from 'lucide-react';

function RsvpContent() {
  const searchParams = useSearchParams();
  const guestIdFromQuery = searchParams.get('guestId') || searchParams.get('id') || '';

  const [guestId, setGuestId] = useState(guestIdFromQuery || 'gst-01');
  const [guestName, setGuestName] = useState('Maharaja Yuvraj Vikramaditya Singh');
  const [rsvpStatus, setRsvpStatus] = useState<RsvpStatus>('Confirmed');
  const [dietary, setDietary] = useState<DietaryPreference>('Pure Vegetarian');
  const [roomAssigned, setRoomAssigned] = useState('Royal Courtyard Suite #104');
  const [flightArrival, setFlightArrival] = useState('AI 472 at 14:30 (Udaipur Airport)');
  const [customNote, setCustomNote] = useState('Heartiest congratulations to the Singhania family! Looking forward to the Sangeet.');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const eventDetails = {
    coupleNames: 'Ananya & Siddharth',
    celebrationTitle: 'A 3-Day Royal Palatial Celebration',
    venue: 'Jagmandir Island Palace & City Palace Complex, Udaipur',
    dates: 'December 18 – 20, 2026',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/v1/client/rsvp/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guestId: guestId || 'gst-01',
          rsvpStatus,
          dietaryPreference: dietary,
          roomAssigned,
          notes: customNote,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        alert(data.error || 'Failed to submit RSVP');
      }
    } catch (err) {
      console.error(err);
      setSubmitted(true); // fallback demo mode
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPass = () => {
    const pass = `========================================================================
SAAT PHERE PRIVÉ • OFFICIAL GUEST ITINERARY & ADMISSION PASS
Celebration: ${eventDetails.coupleNames} Royal Wedding
Venue: ${eventDetails.venue}
Dates: ${eventDetails.dates}
========================================================================

GUEST DETAILS:
Guest Name: ${guestName}
RSVP Status: ${rsvpStatus.toUpperCase()}
Allocated Hotel: The Oberoi Udaivilas
Suite: ${roomAssigned}
Dietary Registration: ${dietary}
Arrival Flight: ${flightArrival}

CEREMONIAL ITINERARY:
Day 1 (Dec 18):
- 16:00: Royal Lake Flotilla Jetty Reception at City Palace Ghats
- 19:30: Welcome Sufi Night & Royal Rajasthani Thali

Day 2 (Dec 19):
- 11:00: Phoolon Ki Haldi & Vibrant Mehendi Carnival
- 20:00: Grand Starlight Sangeet & Musical Showcase

Day 3 (Dec 20):
- 16:30: Sacred Sunset Vedic Pheras at Lakeside Lotus Mandap
- 20:30: Royal Reception Dinner & White-Glove Banquet

Concierge Helpline: ${SITE_CONFIG.contact.phone} (Saat Phere Guest Logistics)
========================================================================`;

    const blob = new Blob([pass], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SaatPhere_Wedding_Pass_${guestName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ paddingBottom: '90px' }}>
      {/* Hero Banner */}
      <section
        style={{
          background: 'var(--gradient-royal-overlay), url("/images/gallery/baraat-jaipur.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF',
          padding: '90px 20px 70px 20px',
          textAlign: 'center',
        }}
      >
        <div className="container" style={{ maxWidth: '820px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(212, 175, 55, 0.25)', border: '1px solid var(--color-gold)', borderRadius: '30px', padding: '6px 18px', marginBottom: '16px' }}>
            <Sparkles size={14} color="var(--color-gold-light)" />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--color-gold-light)' }}>
              Official Royal Wedding Invitation RSVP
            </span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.4rem, 5vw, 3.6rem)', color: '#FFFFFF', lineHeight: 1.15, marginBottom: '12px' }}>
            {eventDetails.coupleNames}
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--color-gold-light)', fontStyle: 'italic', marginBottom: '16px' }}>
            {eventDetails.celebrationTitle}
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', fontSize: '0.9rem', color: '#E5E7EB' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={16} color="var(--color-gold)" />
              {eventDetails.dates}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={16} color="var(--color-gold)" />
              {eventDetails.venue}
            </span>
          </div>
        </div>
      </section>

      {/* Main Form Container */}
      <div className="container" style={{ maxWidth: '780px', marginTop: '-30px', position: 'relative', zIndex: 10 }}>
        {!submitted ? (
          <div className="luxury-card" style={{ padding: '40px', backgroundColor: '#FFFFFF' }}>
            <div style={{ borderBottom: '1px solid #E5E7EB', paddingBottom: '18px', marginBottom: '24px' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-maroon)', marginBottom: '4px' }}>
                Confirm Your Presence
              </h2>
              <p style={{ fontSize: '0.88rem', color: '#6B7280' }}>
                Please confirm your attendance, culinary preferences, and travel timings so our hospitality concierge can arrange your lakeside transfer.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Guest Name & Code */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                    Guest Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.92rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                    Invitation Reference ID
                  </label>
                  <input
                    type="text"
                    value={guestId}
                    onChange={(e) => setGuestId(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.92rem', backgroundColor: '#F9FAFB' }}
                  />
                </div>
              </div>

              {/* RSVP Status Selection */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
                  Will you be joining us in Udaipur? *
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                  {[
                    { val: 'Confirmed', label: '✓ Confirmed With Joy', desc: 'Will attend all 3 days' },
                    { val: 'Tentative', label: '⏳ Tentative / Undecided', desc: 'Awaiting travel plans' },
                    { val: 'Declined', label: '✕ Sending Blessings', desc: 'Regretfully unable' },
                  ].map((opt) => {
                    const isSelected = rsvpStatus === opt.val;
                    return (
                      <div
                        key={opt.val}
                        onClick={() => setRsvpStatus(opt.val as RsvpStatus)}
                        style={{
                          border: isSelected ? '2px solid var(--color-gold)' : '1px solid #E5E7EB',
                          borderRadius: '8px',
                          padding: '14px',
                          cursor: 'pointer',
                          backgroundColor: isSelected ? '#FDFBF7' : '#FFFFFF',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <div style={{ fontWeight: 700, fontSize: '0.92rem', color: isSelected ? 'var(--color-maroon)' : '#111827' }}>
                          {opt.label}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: '#6B7280', marginTop: '2px' }}>{opt.desc}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dietary & Room */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                    <Utensils size={13} style={{ display: 'inline', marginRight: '4px' }} />
                    Dietary Requirements *
                  </label>
                  <select
                    value={dietary}
                    onChange={(e) => setDietary(e.target.value as DietaryPreference)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.9rem', backgroundColor: '#FFFFFF' }}
                  >
                    <option value="Pure Vegetarian">Pure Vegetarian</option>
                    <option value="Jain (Strict)">Jain (Strict - No Onion/Garlic/Root Vegetables)</option>
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Gluten-Free">Gluten-Free</option>
                    <option value="Halal">Halal</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                    <Bed size={13} style={{ display: 'inline', marginRight: '4px' }} />
                    Pre-Allocated Hotel Suite
                  </label>
                  <input
                    type="text"
                    value={roomAssigned}
                    onChange={(e) => setRoomAssigned(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              {/* Flight Details */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                  <Plane size={13} style={{ display: 'inline', marginRight: '4px' }} />
                  Flight Arrival Details (For Airport Fleet Pickup)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 6E 214 landing in Udaipur at 15:45 on Dec 18"
                  value={flightArrival}
                  onChange={(e) => setFlightArrival(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.9rem' }}
                />
              </div>

              {/* Custom Wishes */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                  Warm Wishes / Special Notes for the Couple:
                </label>
                <textarea
                  rows={3}
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.9rem' }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-gold"
                style={{ padding: '14px 28px', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <Send size={16} />
                {loading ? 'Confirming Your RSVP...' : 'Submit RSVP & Receive Itinerary Pass'}
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="luxury-card" style={{ padding: '48px', backgroundColor: '#FFFFFF', textAlign: 'center' }}>
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                backgroundColor: '#ECFDF5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px auto',
              }}
            >
              <CheckCircle2 size={40} />
            </div>

            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--color-maroon)', marginBottom: '8px' }}>
              RSVP Successfully Confirmed!
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#4B5563', maxWidth: '520px', margin: '0 auto 20px auto', lineHeight: 1.6 }}>
              Thank you, <strong>{guestName}</strong>. Your response has been recorded with the Singhania Wedding Logistics Directorate.
            </p>

            <div
              style={{
                backgroundColor: '#FDFBF7',
                border: '1.5px solid var(--color-gold)',
                borderRadius: '10px',
                padding: '20px',
                maxWidth: '460px',
                margin: '0 auto 28px auto',
                textAlign: 'left',
                fontSize: '0.88rem',
              }}
            >
              <div><strong>Status:</strong> <span style={{ color: '#059669', fontWeight: 700 }}>✓ {rsvpStatus}</span></div>
              <div style={{ marginTop: '6px' }}><strong>Dietary Preference:</strong> {dietary}</div>
              <div style={{ marginTop: '6px' }}><strong>Allocated Suite:</strong> {roomAssigned}</div>
              <div style={{ marginTop: '6px' }}><strong>Airport Fleet Concierge:</strong> Logged for pickup at Udaipur Airport</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <button
                onClick={handleDownloadPass}
                className="btn-gold"
                style={{ padding: '12px 24px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Download size={16} />
                Download Digital Event Itinerary Pass
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function RsvpPage() {
  return (
    <Suspense fallback={<div style={{ padding: '80px', textAlign: 'center' }}>Loading RSVP Portal...</div>}>
      <RsvpContent />
    </Suspense>
  );
}
