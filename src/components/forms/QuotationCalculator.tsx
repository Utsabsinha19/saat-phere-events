'use client';

import React, { useState } from 'react';
import { Calculator, CheckCircle2, Sparkles, ArrowRight, ShieldAlert, Clock, MapPin, Building, Users } from 'lucide-react';
import { QuotationEstimateBreakdown } from '@/types/quotation';

const VENUE_TYPES = [
  'Heritage Palace',
  '5-Star Luxury Resort',
  'Beachfront Venue',
  'Banqueting Hall',
  'Private Farmhouse',
  'Other',
] as const;

const EVENT_SERVICES = [
  'Full Wedding Planning & Day-of Orchestration',
  'Destination Weddings & Guest Hospitality',
  'Bespoke Mandap & Floral Scenography',
  'Celebrity Artist & Musical Entertainment',
  'High-Definition Sangeet LED & Light Rigging',
  'Gourmet Catering Menu Direction',
  'Bridal Personal Concierge & Styling Shadow',
  'Charter Aircraft & Fleet Transport Logistics',
];

export const QuotationCalculator: React.FC = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    eventType: 'Destination Wedding',
    guestCount: 350,
    venueType: 'Heritage Palace' as typeof VENUE_TYPES[number],
    cityLocation: 'Udaipur, Rajasthan',
    budgetRange: '₹1.5 Cr – ₹3 Cr',
    selectedServices: [
      'Full Wedding Planning & Day-of Orchestration',
      'Destination Weddings & Guest Hospitality',
      'Bespoke Mandap & Floral Scenography',
    ],
    customRequirements: '',
    fullName: '',
    phone: '',
    email: '',
  });

  const [loading, setLoading] = useState(false);
  const [estimate, setEstimate] = useState<QuotationEstimateBreakdown | null>(null);
  const [error, setError] = useState<string | null>(null);

  const toggleService = (srv: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(srv)
        ? prev.selectedServices.filter((s) => s !== srv)
        : [...prev.selectedServices, srv],
    }));
  };

  const handleGenerateQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Failed to calculate quotation');
      }

      setEstimate(json.data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to generate estimate.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid var(--color-border-gold)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.08)',
        overflow: 'hidden',
      }}
    >
      {/* Header bar */}
      <div
        style={{
          background: 'var(--gradient-maroon)',
          color: '#FFFFFF',
          padding: '28px 36px',
          borderBottom: '2px solid var(--color-gold)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <Calculator size={24} color="var(--color-gold)" />
          <span
            style={{
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontSize: '0.8rem',
              color: 'var(--color-gold-light)',
              fontWeight: 700,
            }}
          >
            Saat Phere Interactive Quotation Engine
          </span>
        </div>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#FFFFFF' }}>
          Configure Your Bespoke Celebration Proposal
        </h3>
        <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.95rem', marginTop: '6px' }}>
          Every royal celebration is singular. Configure your preferences without fixed commoditized prices to receive a tailored event architectural deck.
        </p>
      </div>

      <div style={{ padding: '36px' }}>
        {error && (
          <div
            style={{
              backgroundColor: '#FEF2F2',
              border: '1px solid #EF4444',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '24px',
              color: '#991B1B',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <ShieldAlert size={20} />
            <span>{error}</span>
          </div>
        )}

        {!estimate ? (
          <form onSubmit={handleGenerateQuote}>
            {step === 1 ? (
              <div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', marginBottom: '20px', color: 'var(--color-maroon)' }}>
                  Step 1: Event Scope & Venue Preferences
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                  {/* Event Type */}
                  <div className="form-group">
                    <label className="form-label">Primary Celebration</label>
                    <select
                      className="form-select"
                      value={formData.eventType}
                      onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    >
                      <option value="Destination Wedding">Destination Wedding</option>
                      <option value="Wedding Planning & Management">Wedding Planning & Management</option>
                      <option value="Haldi, Mehendi & Sangeet">Haldi, Mehendi & Sangeet</option>
                      <option value="Reception & Wedding Decor">Reception & Wedding Decor</option>
                      <option value="Engagement & Ring Ceremony">Engagement & Ring Ceremony</option>
                      <option value="Anniversary & Couple Celebration">Anniversary & Couple Celebration</option>
                      <option value="Corporate Event & Gala">Corporate Event & Gala</option>
                    </select>
                  </div>

                  {/* Venue Type */}
                  <div className="form-group">
                    <label className="form-label">Preferred Venue Type</label>
                    <select
                      className="form-select"
                      value={formData.venueType}
                      onChange={(e) => setFormData({ ...formData, venueType: e.target.value as typeof VENUE_TYPES[number] })}
                    >
                      {VENUE_TYPES.map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Location / City */}
                  <div className="form-group">
                    <label className="form-label">Target City or Destination</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Udaipur, Jaipur, Goa, Dubai, Delhi"
                      value={formData.cityLocation}
                      onChange={(e) => setFormData({ ...formData, cityLocation: e.target.value })}
                    />
                  </div>

                  {/* Guest Count Slider */}
                  <div className="form-group">
                    <label className="form-label">
                      Estimated Guests: <strong style={{ color: 'var(--color-maroon)' }}>{formData.guestCount} Attendees</strong>
                    </label>
                    <input
                      type="range"
                      min={20}
                      max={2000}
                      step={20}
                      value={formData.guestCount}
                      onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                      style={{ width: '100%', accentColor: 'var(--color-gold)' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#6B7280', marginTop: '4px' }}>
                      <span>20 (Intimate)</span>
                      <span>500 (Grand)</span>
                      <span>2000+ (Palatial)</span>
                    </div>
                  </div>
                </div>

                {/* Service Offerings Checklist */}
                <div style={{ marginTop: '24px' }}>
                  <label className="form-label" style={{ marginBottom: '12px' }}>
                    Select Required Scope Capabilities
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
                    {EVENT_SERVICES.map((srv) => {
                      const isChecked = formData.selectedServices.includes(srv);
                      return (
                        <div
                          key={srv}
                          onClick={() => toggleService(srv)}
                          style={{
                            padding: '12px 16px',
                            borderRadius: '8px',
                            border: isChecked ? '1.5px solid var(--color-gold)' : '1px solid #E5E7EB',
                            backgroundColor: isChecked ? 'var(--color-ivory-light)' : '#FFFFFF',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            style={{ accentColor: 'var(--color-gold)' }}
                          />
                          <span style={{ fontSize: '0.88rem', fontWeight: isChecked ? 600 : 400, color: '#1F2937' }}>
                            {srv}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="btn-primary"
                    style={{ minWidth: '180px' }}
                  >
                    Proceed to Step 2
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', marginBottom: '20px', color: 'var(--color-maroon)' }}>
                  Step 2: Budget Allocation & Confidential Contact
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                  <div className="form-group">
                    <label className="form-label">Approximate Target Budget Range</label>
                    <select
                      className="form-select"
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    >
                      <option value="₹35 Lakhs – ₹75 Lakhs">₹35 Lakhs – ₹75 Lakhs</option>
                      <option value="₹75 Lakhs – ₹1.5 Cr">₹75 Lakhs – ₹1.5 Cr</option>
                      <option value="₹1.5 Cr – ₹3 Cr">₹1.5 Cr – ₹3 Cr</option>
                      <option value="₹3 Cr – ₹5 Cr+">₹3 Cr – ₹5 Cr+</option>
                      <option value="Ultra-HNWI Bespoke (Undisclosed)">Ultra-HNWI Bespoke (Undisclosed)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      placeholder="e.g. Siddharth Singhania"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Direct Phone / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      className="form-input"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      required
                      className="form-input"
                      placeholder="name@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '8px' }}>
                  <label className="form-label">Special Architectural or Cultural Notes</label>
                  <textarea
                    rows={3}
                    className="form-textarea"
                    placeholder="Specific heritage properties preferred, family traditions, or entertainment artists..."
                    value={formData.customRequirements}
                    onChange={(e) => setFormData({ ...formData, customRequirements: e.target.value })}
                  />
                </div>

                <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="btn-outline"
                    style={{ color: '#4B5563', borderColor: '#D1D5DB' }}
                  >
                    Back to Scope
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-gold"
                    style={{ minWidth: '240px' }}
                  >
                    {loading ? (
                      'Generating Proposal Deck...'
                    ) : (
                      <>
                        <Sparkles size={16} />
                        Calculate & Request Proposal
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        ) : (
          /* Estimate Breakdown Display */
          <div className="animate-fade-in">
            <div
              style={{
                backgroundColor: 'var(--color-ivory-light)',
                border: '1.5px solid var(--color-gold)',
                borderRadius: '12px',
                padding: '32px',
                marginBottom: '28px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <span className="badge-gold">Quotation ID: {estimate.id}</span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--color-maroon)', marginTop: '6px' }}>
                    {estimate.estimatedTier} Tier
                  </h3>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.8rem', color: '#6B7280', textTransform: 'uppercase' }}>Recommended Timeline</span>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-dark)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={18} color="var(--color-gold)" />
                    {estimate.recommendedPlanningTimeline}
                  </div>
                </div>
              </div>

              {/* Event Parameters summary cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280', textTransform: 'uppercase' }}>Location</div>
                  <div style={{ fontWeight: 700, color: '#1F2937', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                    <MapPin size={14} color="var(--color-gold)" />
                    {estimate.input.cityLocation}
                  </div>
                </div>

                <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280', textTransform: 'uppercase' }}>Venue Category</div>
                  <div style={{ fontWeight: 700, color: '#1F2937', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                    <Building size={14} color="var(--color-gold)" />
                    {estimate.input.venueType}
                  </div>
                </div>

                <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280', textTransform: 'uppercase' }}>Guest Count</div>
                  <div style={{ fontWeight: 700, color: '#1F2937', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                    <Users size={14} color="var(--color-gold)" />
                    {estimate.input.guestCount} Guests
                  </div>
                </div>
              </div>

              {/* Included Scope Summary */}
              <div>
                <h5 style={{ fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-maroon)', marginBottom: '12px' }}>
                  Curated Executive Scope Deliverables:
                </h5>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {estimate.scopeSummary.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: '#374151' }}>
                      <CheckCircle2 size={16} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                style={{
                  marginTop: '24px',
                  paddingTop: '20px',
                  borderTop: '1px solid var(--color-border-gold)',
                  fontSize: '0.88rem',
                  color: '#4B5563',
                  lineHeight: 1.5,
                }}
              >
                {estimate.preliminaryConsultationNote}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <button
                type="button"
                onClick={() => {
                  setEstimate(null);
                  setStep(1);
                }}
                className="btn-outline"
              >
                Configure Another Proposal
              </button>

              <a href="/contact" className="btn-primary">
                Schedule Director Video Call
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
