'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  Shield,
  Heart,
  Mail,
  Phone,
  Globe,
  MapPin,
  Coins,
  Calendar,
} from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';

export const GetAQuoteSection: React.FC = () => {
  const [formData, setFormData] = useState({
    brideGroomName: '',
    email: '',
    phone: '',
    nationality: 'Indian',
    venue: '',
    decorBudget: '₹15 Lakhs – ₹30 Lakhs (Signature Elegance)',
    eventType: 'Wedding Planning',
    eventDate: '',
    specialNotes: '',
    agreedToPrivacy: false,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submittedQuote, setSubmittedQuote] = useState<{
    id: string;
    name: string;
    email: string;
    phone: string;
    service: string;
    venue: string;
    budget: string;
    date: string;
    notes: string;
  } | null>(null);

  const budgetOptions = [
    '₹5 Lakhs – ₹15 Lakhs (Intimate Celebration)',
    '₹15 Lakhs – ₹30 Lakhs (Signature Elegance)',
    '₹30 Lakhs – ₹60 Lakhs (Grand Royal Spectacle)',
    '₹60 Lakhs – ₹1.5 Crore (Imperial Palatial)',
    '₹1.5 Crore+ (Bespoke Heritage Estate)',
    'Custom / Discuss with Senior Director',
  ];

  const nationalityOptions = [
    'Indian',
    'NRI – United States (USA)',
    'NRI – United Kingdom (UK)',
    'NRI – Canada',
    'NRI – UAE / Middle East',
    'NRI – Australia',
    'NRI – Europe',
    'Other / Dual Nationality',
  ];

  const serviceOptions = [
    'Wedding Planning',
    'Haldi / Mehndi / Sangeet',
    'Myra / Bhaat Ceremony',
    'Birthday Parties',
    'Reception',
    'Corporate Events',
    'Theme Decoration',
    'Baby Shower / Jalwa Ceremony',
    'Wedding Rental Car',
    'Wooden Games for Weddings',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreedToPrivacy) {
      setError('Please agree to the Privacy Policy to proceed with your quotation request.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const payload = {
        fullName: formData.brideGroomName,
        email: formData.email,
        phone: formData.phone,
        nationality: formData.nationality,
        eventLocation: formData.venue,
        budgetRange: formData.decorBudget,
        eventType: formData.eventType,
        eventDate: formData.eventDate || new Date().toISOString().split('T')[0],
        requirements: `Nationality: ${formData.nationality} | Venue: ${formData.venue} | Decor Budget: ${formData.decorBudget}. Notes: ${formData.specialNotes || 'None'}`,
        source: 'Get a Quote Section',
      };

      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => ({ success: true, data: { id: `SPE-QUOTE-${Date.now().toString().slice(-4)}` } }));

      if (!res.ok) {
        throw new Error(json.error || 'Failed to submit quote inquiry. Please try again.');
      }

      const quoteId = json.data?.id || `SPE-QUOTE-${Date.now().toString().slice(-4)}`;

      setSubmittedQuote({
        id: quoteId,
        name: formData.brideGroomName,
        email: formData.email,
        phone: formData.phone,
        service: formData.eventType,
        venue: formData.venue,
        budget: formData.decorBudget,
        date: formData.eventDate || new Date().toISOString().split('T')[0],
        notes: formData.specialNotes,
      });

      setSuccess(
        `Thank you, ${formData.brideGroomName}! Your custom quote request (#${quoteId}) has been dispatched to our official executive inbox at saatpherektr@gmail.com and our Senior Creative Director. We will reach out within 4 to 6 business hours.`
      );

      setFormData({
        brideGroomName: '',
        email: '',
        phone: '',
        nationality: 'Indian',
        venue: '',
        decorBudget: '₹15 Lakhs – ₹30 Lakhs (Signature Elegance)',
        eventType: 'Wedding Planning',
        eventDate: '',
        specialNotes: '',
        agreedToPrivacy: false,
      });
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Your quotation request could not be processed. Please reach out to our concierge via WhatsApp or phone.';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="get-a-quote"
      className="section-padding"
      style={{
        backgroundColor: '#0C0C0C',
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '2px solid rgba(212, 175, 55, 0.4)',
        borderBottom: '2px solid rgba(212, 175, 55, 0.4)',
      }}
    >
      {/* Ambient Gold Radial Gradients in Background */}
      <div
        style={{
          position: 'absolute',
          top: '-120px',
          right: '-120px',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-120px',
          left: '-120px',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(128, 0, 32, 0.22) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '1000px' }}>
        {/* 5th Look Header */}
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 18px',
              borderRadius: '999px',
              background: 'rgba(212, 175, 55, 0.15)',
              border: '1px solid rgba(212, 175, 55, 0.5)',
              color: 'var(--color-gold-light)',
              fontSize: '0.82rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              marginBottom: '14px',
            }}
          >
            <Sparkles size={14} color="var(--color-gold)" />
            <span>Bespoke Celebration Proposal</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.1rem, 4vw, 3.2rem)',
              color: '#FFFFFF',
              marginBottom: '16px',
            }}
          >
            Get a <span className="shimmer-text">Quote</span>
          </h2>

          <p
            style={{
              fontSize: '1.05rem',
              color: '#D1D5DB',
              maxWidth: '680px',
              margin: '0 auto',
              lineHeight: 1.65,
            }}
          >
            Tell us about your celebration dreams. From intimate ancestral home ceremonies in Bihar to sprawling destination palace galas, our team curates transparent, tailored proposals with zero hidden costs.
          </p>
        </div>

        {/* Premium Dark Form Card */}
        <div
          style={{
            backgroundColor: '#151515',
            borderRadius: '18px',
            border: '1px solid rgba(212, 175, 55, 0.45)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7), 0 0 25px rgba(212, 175, 55, 0.1)',
            padding: 'clamp(24px, 5vw, 44px)',
          }}
        >
          {success ? (
            <div
              style={{
                textAlign: 'center',
                padding: '40px 20px',
              }}
            >
              <div
                style={{
                  width: '76px',
                  height: '76px',
                  borderRadius: '50%',
                  background: 'rgba(212, 175, 55, 0.15)',
                  border: '2px solid var(--color-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px auto',
                  color: 'var(--color-gold-light)',
                }}
              >
                <CheckCircle2 size={40} />
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.8rem',
                  color: 'var(--color-gold-light)',
                  marginBottom: '14px',
                }}
              >
                Quote Request Received &amp; Dispatched
              </h3>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(212, 175, 55, 0.1)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  color: 'var(--color-gold-light)',
                  fontSize: '0.85rem',
                  marginBottom: '20px',
                }}
              >
                <Mail size={14} color="var(--color-gold)" />
                <span>Routed to: <strong>saatpherektr@gmail.com</strong></span>
              </div>

              <p style={{ color: '#E5E7EB', fontSize: '1.02rem', maxWidth: '640px', margin: '0 auto 28px auto', lineHeight: 1.7 }}>
                {success}
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
                <a
                  href={`https://wa.me/${SITE_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent(
                    `Namaste Saat Phere Events, I just requested a quote on your website (#${submittedQuote?.id || 'QUOTE'}) for my upcoming celebration.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                  style={{ textDecoration: 'none', padding: '14px 26px' }}
                >
                  Connect on WhatsApp Directly
                </a>

                {submittedQuote && (
                  <a
                    href={`mailto:saatpherektr@gmail.com?subject=${encodeURIComponent(
                      `[Custom Quote #${submittedQuote.id}] ${submittedQuote.name} - ${submittedQuote.service}`
                    )}&body=${encodeURIComponent(
                      `Namaste Saat Phere Events Team,\n\nI have requested a custom quote on your website. Here are my celebration details:\n\n` +
                      `• Client Name: ${submittedQuote.name}\n` +
                      `• Phone / WhatsApp: ${submittedQuote.phone}\n` +
                      `• Email: ${submittedQuote.email}\n` +
                      `• Event / Service: ${submittedQuote.service}\n` +
                      `• Event Date: ${submittedQuote.date}\n` +
                      `• Destination/Venue: ${submittedQuote.venue}\n` +
                      `• Budget: ${submittedQuote.budget}\n` +
                      `• Special Notes: ${submittedQuote.notes || 'None'}\n\n` +
                      `Looking forward to receiving your creative proposal.\n\nWarm regards,\n${submittedQuote.name}`
                    )}`}
                    className="btn-outline"
                    style={{
                      color: 'var(--color-gold-light)',
                      borderColor: 'rgba(212, 175, 55, 0.5)',
                      padding: '14px 24px',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <Mail size={16} color="var(--color-gold)" />
                    Open in Gmail / Email App
                  </a>
                )}

                <button
                  onClick={() => {
                    setSuccess(null);
                    setSubmittedQuote(null);
                  }}
                  className="btn-outline"
                  style={{ color: '#FFFFFF', borderColor: 'rgba(255, 255, 255, 0.4)', padding: '14px 22px' }}
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && (
                <div
                  style={{
                    backgroundColor: 'rgba(220, 38, 38, 0.15)',
                    border: '1px solid #EF4444',
                    color: '#FCA5A5',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    marginBottom: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '0.9rem',
                  }}
                >
                  <AlertCircle size={18} color="#EF4444" style={{ flexShrink: 0 }} />
                  <span>{error}</span>
                </div>
              )}

              {/* Grid of Inputs */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '22px',
                  marginBottom: '22px',
                }}
              >
                {/* 1. Bride & Groom Name */}
                <div>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.86rem',
                      fontWeight: 600,
                      color: 'var(--color-gold-light)',
                      marginBottom: '8px',
                    }}
                  >
                    <Heart size={14} color="var(--color-gold)" />
                    <span>Bride & Groom Name (or Host Name) *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.brideGroomName}
                    onChange={(e) => setFormData({ ...formData, brideGroomName: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '13px 16px',
                      backgroundColor: '#202020',
                      border: '1px solid rgba(212, 175, 55, 0.4)',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontSize: '0.94rem',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* 2. Email Address */}
                <div>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.86rem',
                      fontWeight: 600,
                      color: 'var(--color-gold-light)',
                      marginBottom: '8px',
                    }}
                  >
                    <Mail size={14} color="var(--color-gold)" />
                    <span>Email Address *</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '13px 16px',
                      backgroundColor: '#202020',
                      border: '1px solid rgba(212, 175, 55, 0.4)',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontSize: '0.94rem',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* 3. Phone / WhatsApp Number */}
                <div>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.86rem',
                      fontWeight: 600,
                      color: 'var(--color-gold-light)',
                      marginBottom: '8px',
                    }}
                  >
                    <Phone size={14} color="var(--color-gold)" />
                    <span>Phone / WhatsApp Number *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '13px 16px',
                      backgroundColor: '#202020',
                      border: '1px solid rgba(212, 175, 55, 0.4)',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontSize: '0.94rem',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* 4. Nationality */}
                <div>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.86rem',
                      fontWeight: 600,
                      color: 'var(--color-gold-light)',
                      marginBottom: '8px',
                    }}
                  >
                    <Globe size={14} color="var(--color-gold)" />
                    <span>Nationality *</span>
                  </label>
                  <select
                    value={formData.nationality}
                    onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '13px 16px',
                      backgroundColor: '#202020',
                      border: '1px solid rgba(212, 175, 55, 0.4)',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontSize: '0.94rem',
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {nationalityOptions.map((opt) => (
                      <option key={opt} value={opt} style={{ backgroundColor: '#1E1E1E' }}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 5. Venue */}
                <div>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.86rem',
                      fontWeight: 600,
                      color: 'var(--color-gold-light)',
                      marginBottom: '8px',
                    }}
                  >
                    <MapPin size={14} color="var(--color-gold)" />
                    <span>Venue (City, Palace, or Banquet) *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '13px 16px',
                      backgroundColor: '#202020',
                      border: '1px solid rgba(212, 175, 55, 0.4)',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontSize: '0.94rem',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* 6. Décor Budget */}
                <div>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.86rem',
                      fontWeight: 600,
                      color: 'var(--color-gold-light)',
                      marginBottom: '8px',
                    }}
                  >
                    <Coins size={14} color="var(--color-gold)" />
                    <span>Décor Budget *</span>
                  </label>
                  <select
                    value={formData.decorBudget}
                    onChange={(e) => setFormData({ ...formData, decorBudget: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '13px 16px',
                      backgroundColor: '#202020',
                      border: '1px solid rgba(212, 175, 55, 0.4)',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontSize: '0.94rem',
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {budgetOptions.map((opt) => (
                      <option key={opt} value={opt} style={{ backgroundColor: '#1E1E1E' }}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 7. Desired Service / Event Type */}
                <div>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.86rem',
                      fontWeight: 600,
                      color: 'var(--color-gold-light)',
                      marginBottom: '8px',
                    }}
                  >
                    <Sparkles size={14} color="var(--color-gold)" />
                    <span>Primary Service Needed</span>
                  </label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '13px 16px',
                      backgroundColor: '#202020',
                      border: '1px solid rgba(212, 175, 55, 0.4)',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontSize: '0.94rem',
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {serviceOptions.map((srv) => (
                      <option key={srv} value={srv} style={{ backgroundColor: '#1E1E1E' }}>
                        {srv}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 8. Event Date */}
                <div>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.86rem',
                      fontWeight: 600,
                      color: 'var(--color-gold-light)',
                      marginBottom: '8px',
                    }}
                  >
                    <Calendar size={14} color="var(--color-gold)" />
                    <span>Tentative Event Date</span>
                  </label>
                  <input
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '13px 16px',
                      backgroundColor: '#202020',
                      border: '1px solid rgba(212, 175, 55, 0.4)',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontSize: '0.94rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Special Requirements Textarea */}
              <div style={{ marginBottom: '24px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.86rem',
                    fontWeight: 600,
                    color: '#D1D5DB',
                    marginBottom: '8px',
                  }}
                >
                  Special Decor Concepts, Guest Count, or Custom Ritual Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  value={formData.specialNotes}
                  onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    backgroundColor: '#202020',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    fontSize: '0.92rem',
                    outline: 'none',
                    resize: 'vertical',
                  }}
                />
              </div>

              {/* Requirement: Privacy Policy Checkbox */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  marginBottom: '28px',
                  padding: '14px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                }}
              >
                <input
                  type="checkbox"
                  id="privacy-policy-check"
                  required
                  checked={formData.agreedToPrivacy}
                  onChange={(e) => setFormData({ ...formData, agreedToPrivacy: e.target.checked })}
                  style={{
                    marginTop: '3px',
                    width: '18px',
                    height: '18px',
                    accentColor: 'var(--color-gold)',
                    cursor: 'pointer',
                  }}
                />
                <label
                  htmlFor="privacy-policy-check"
                  style={{
                    fontSize: '0.86rem',
                    color: '#D1D5DB',
                    lineHeight: 1.5,
                    cursor: 'pointer',
                  }}
                >
                  I agree to the{' '}
                  <Link
                    href="/privacy-policy"
                    target="_blank"
                    style={{ color: 'var(--color-gold-light)', textDecoration: 'underline' }}
                  >
                    Privacy Policy
                  </Link>{' '}
                  and{' '}
                  <Link
                    href="/terms-and-conditions"
                    target="_blank"
                    style={{ color: 'var(--color-gold-light)', textDecoration: 'underline' }}
                  >
                    Terms &amp; Conditions
                  </Link>
                  , and consent to Saat Phere Events contacting me with a tailored event proposal, quote estimate, and consultation details via phone/WhatsApp.
                </label>
              </div>

              {/* Requirement: Send Button */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '18px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#9CA3AF' }}>
                  <Shield size={14} color="var(--color-gold)" />
                  <span>Strict Confidentiality Guaranteed • No Spam</span>
                </div>

                {/* Requirement 6: "Get in Touch" / Send button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold"
                  style={{
                    padding: '15px 40px',
                    fontSize: '1rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    boxShadow: '0 8px 24px rgba(212, 175, 55, 0.4)',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    minWidth: '220px',
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Sending Request...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Get in Touch • Send Quote</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
