'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { EventType } from '@/types/inquiry';

const EVENT_TYPE_OPTIONS: EventType[] = [
  'Wedding Planning & Management',
  'Destination Wedding',
  'Engagement & Ring Ceremony',
  'Birthday Party & Kids Event',
  'Anniversary & Couple Celebration',
  'Haldi, Mehendi & Sangeet',
  'Reception & Wedding Decor',
  'Corporate Event & Gala',
  'Theme Party & Bespoke Celebration',
];

const BUDGET_OPTIONS = [
  '₹25 Lakhs – ₹50 Lakhs',
  '₹50 Lakhs – ₹75 Lakhs',
  '₹75 Lakhs – ₹1.5 Cr',
  '₹1.5 Cr – ₹3 Cr',
  '₹3 Cr – ₹5 Cr+',
  'Custom / Discuss with Concierge',
];

const GUEST_COUNT_OPTIONS = [
  'Under 100 Guests (Intimate)',
  '100 – 250 Guests (Signature)',
  '250 – 500 Guests (Grand Royal)',
  '500 – 1,000 Guests (Palatial)',
  '1,000+ Guests (Mega Gala)',
];

export const ContactInquiryForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    eventType: 'Wedding Planning & Management' as EventType,
    eventDate: '',
    eventLocation: '',
    guestCount: '250 – 500 Guests (Grand Royal)',
    budgetRange: '₹75 Lakhs – ₹1.5 Cr',
    requirements: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || 'Failed to submit inquiry');
      }

      setSuccess(
        `Thank you, ${formData.fullName}! Your luxury consultation inquiry (#${json.data?.id}) has been recorded. Our Senior Concierge has been alerted and will reach out via WhatsApp/Phone within 4 to 6 business hours.`
      );
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        eventType: 'Wedding Planning & Management',
        eventDate: '',
        eventLocation: '',
        guestCount: '250 – 500 Guests (Grand Royal)',
        budgetRange: '₹75 Lakhs – ₹1.5 Cr',
        requirements: '',
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please call our concierge directly.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        padding: '36px',
        border: '1px solid var(--color-border-gold)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
      }}
    >
      <div style={{ marginBottom: '24px' }}>
        <span className="badge-gold">Official 9-Core Inquiry Portal</span>
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.75rem',
            color: 'var(--color-maroon)',
            marginTop: '8px',
          }}
        >
          Book Your Event Consultation
        </h3>
        <p style={{ fontSize: '0.9rem', color: '#6B7280', marginTop: '4px' }}>
          Please complete the 9 lead parameters below to receive our confidential creative deck & availability review.
        </p>
      </div>

      {success && (
        <div
          style={{
            backgroundColor: '#ECFDF5',
            border: '1px solid #10B981',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            color: '#065F46',
            fontSize: '0.95rem',
          }}
        >
          <CheckCircle2 size={24} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>{success}</div>
        </div>
      )}

      {error && (
        <div
          style={{
            backgroundColor: '#FEF2F2',
            border: '1px solid #EF4444',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            color: '#991B1B',
            fontSize: '0.95rem',
          }}
        >
          <AlertCircle size={24} color="#EF4444" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>{error}</div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {/* Field 1: Full Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="fullName">
              1. Full Name <span className="required">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              required
              className="form-input"
              placeholder="e.g. Maharani Gayatri Devi / Vikram Singhania"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>

          {/* Field 2: Phone Number */}
          <div className="form-group">
            <label className="form-label" htmlFor="phone">
              2. Phone Number (With Country Code) <span className="required">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              required
              className="form-input"
              placeholder="+91 72091 27697"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          {/* Field 3: Email Address */}
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              3. Email Address <span className="required">*</span>
            </label>
            <input
              id="email"
              type="email"
              required
              className="form-input"
              placeholder="name@company.com / couple@gmail.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {/* Field 4: Event Type */}
          <div className="form-group">
            <label className="form-label" htmlFor="eventType">
              4. Event Category <span className="required">*</span>
            </label>
            <select
              id="eventType"
              className="form-select"
              value={formData.eventType}
              onChange={(e) => setFormData({ ...formData, eventType: e.target.value as EventType })}
            >
              {EVENT_TYPE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Field 5: Event Date */}
          <div className="form-group">
            <label className="form-label" htmlFor="eventDate">
              5. Target Event Date <span className="required">*</span>
            </label>
            <input
              id="eventDate"
              type="date"
              required
              className="form-input"
              value={formData.eventDate}
              onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
            />
          </div>

          {/* Field 6: Event Location / City */}
          <div className="form-group">
            <label className="form-label" htmlFor="eventLocation">
              6. Destination / Event City <span className="required">*</span>
            </label>
            <input
              id="eventLocation"
              type="text"
              required
              className="form-input"
              placeholder="e.g. Udaipur, Jaipur, Goa, Dubai, Delhi"
              value={formData.eventLocation}
              onChange={(e) => setFormData({ ...formData, eventLocation: e.target.value })}
            />
          </div>

          {/* Field 7: Expected Number of Guests */}
          <div className="form-group">
            <label className="form-label" htmlFor="guestCount">
              7. Expected Number of Guests <span className="required">*</span>
            </label>
            <select
              id="guestCount"
              className="form-select"
              value={formData.guestCount}
              onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
            >
              {GUEST_COUNT_OPTIONS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          {/* Field 8: Approximate Budget Range */}
          <div className="form-group">
            <label className="form-label" htmlFor="budgetRange">
              8. Target Budget Range <span className="required">*</span>
            </label>
            <select
              id="budgetRange"
              className="form-select"
              value={formData.budgetRange}
              onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
            >
              {BUDGET_OPTIONS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Field 9: Additional Requirements / Vision */}
        <div className="form-group" style={{ marginTop: '4px' }}>
          <label className="form-label" htmlFor="requirements">
            9. Additional Requirements / Vision (Optional)
          </label>
          <textarea
            id="requirements"
            rows={4}
            className="form-textarea"
            placeholder="Share special requests such as preferred heritage properties (e.g. City Palace, Rambagh), multi-day ceremony themes, guest flight coordination, celebrity artist preferences, or traditional rituals."
            value={formData.requirements}
            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
          />
        </div>

        <div style={{ marginTop: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ fontSize: '0.8rem', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={14} color="var(--color-gold)" />
            Data encrypted with 256-bit SSL • 100% Client Discretion Guaranteed
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-gold"
            style={{ minWidth: '240px', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Dispatching Inquiry...
              </>
            ) : (
              <>
                <Send size={18} />
                Submit Consultation Request
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
