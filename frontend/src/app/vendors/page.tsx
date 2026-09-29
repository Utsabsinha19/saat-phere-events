'use client';

import React, { useState } from 'react';
import { SectionHeading } from '@/components/common/SectionHeading';
import { GoldDivider } from '@/components/common/GoldDivider';
import {
  ShieldCheck,
  CreditCard,
  Crown,
  Award,
  CheckCircle2,
  Send,
  Building,
  Sparkles,
  FileCheck,
} from 'lucide-react';

export default function VendorPartnershipPage() {
  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId] = useState('');
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    category: 'Floral & Botanical Artistry',
    phone: '',
    email: '',
    city: 'Jaipur',
    gstin: '',
    portfolioUrl: '',
    turnover: '₹50 Lakh - ₹2 Crore',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = 'GUILD-2026-' + Math.floor(1000 + Math.random() * 9000);
    setAppId(id);
    setSubmitted(true);
  };

  return (
    <div style={{ paddingBottom: '90px' }}>
      {/* Hero Banner */}
      <section
        style={{
          background: 'var(--gradient-royal-overlay), url("/images/gallery/sangeet-dance.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF',
          padding: '100px 20px 80px 20px',
          textAlign: 'center',
        }}
      >
        <div className="container" style={{ maxWidth: '860px' }}>
          <span className="badge-gold" style={{ marginBottom: '16px', display: 'inline-block' }}>
            B2B Enterprise Guild • Procurement Network
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', color: '#FFFFFF', lineHeight: 1.15, marginBottom: '16px' }}>
            Join the Saat Phere Elite Artisan Guild
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--color-gold-light)', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6 }}>
            Partner with India&apos;s leading palatial wedding producer. Experience tri-party escrow financial guarantees, zero payment delays, and exclusive access to ₹1 Cr – ₹10 Cr landmark celebrations.
          </p>
        </div>
      </section>

      {/* Guild Pillars */}
      <div className="container" style={{ maxWidth: '1100px', marginTop: '-40px', position: 'relative', zIndex: 10 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
          }}
        >
          <div className="luxury-card" style={{ padding: '28px', backgroundColor: '#FFFFFF' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '10px', backgroundColor: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <CreditCard size={24} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', marginBottom: '6px' }}>
              Escrow Guaranteed Payments
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#4B5563', lineHeight: 1.5 }}>
              Funds for all milestone production steps are locked in advance into verified escrow accounts. Zero payment defaults.
            </p>
          </div>

          <div className="luxury-card" style={{ padding: '28px', backgroundColor: '#FFFFFF' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '10px', backgroundColor: 'rgba(212, 175, 55, 0.15)', color: 'var(--color-gold-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Crown size={24} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', marginBottom: '6px' }}>
              Ultra-Luxury Client Profiles
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#4B5563', lineHeight: 1.5 }}>
              Showcase your artistry before industrialist dynasties, royal lineages, Bollywood celebrities, and international NRI families.
            </p>
          </div>

          <div className="luxury-card" style={{ padding: '28px', backgroundColor: '#FFFFFF' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '10px', backgroundColor: '#EFF6FF', color: '#1E40AF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Building size={24} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', marginBottom: '6px' }}>
              Multi-City Hub Logistics
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#4B5563', lineHeight: 1.5 }}>
              Benefit from our regional warehouse nodes in Jaipur, Udaipur, Delhi, Mumbai, and Goa with shared transport & sound infrastructure.
            </p>
          </div>

          <div className="luxury-card" style={{ padding: '28px', backgroundColor: '#FFFFFF' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '10px', backgroundColor: '#FDF2F8', color: '#9D174D', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Award size={24} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', marginBottom: '6px' }}>
              Verified Guild Credential
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#4B5563', lineHeight: 1.5 }}>
              Receive an official Saat Phere Certified Artisan badge for your digital portfolio and marketing collateral.
            </p>
          </div>
        </div>
      </div>

      {/* Application Form Section */}
      <div className="container" style={{ maxWidth: '840px', marginTop: '64px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <SectionHeading
            subtitle="Procurement Onboarding"
            title="Artisan & Vendor Guild Application"
          />
          <GoldDivider />
          <p style={{ fontSize: '0.95rem', color: '#6B7280', maxWidth: '600px', margin: '0 auto' }}>
            Please submit your credentials. Our Procurement Directorate evaluates portfolios within 48 hours.
          </p>
        </div>

        {!submitted ? (
          <div className="luxury-card" style={{ padding: '40px', backgroundColor: '#FFFFFF' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                    Registered Business / Enterprise Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Rajputana Floral Ateliers LLP"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                    Lead Contact Person & Designation *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikramaditya Rathore (Managing Director)"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                    Artisan Specialization Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.9rem', backgroundColor: '#FFFFFF' }}
                  >
                    <option value="Floral & Botanical Artistry">Floral & Botanical Artistry</option>
                    <option value="Concert Sound & Stage Light">Concert Sound & Stage Light</option>
                    <option value="Gourmet Catering & Mixology">Gourmet Catering & Mixology</option>
                    <option value="Cinematography & Photography">Cinematography & Photography</option>
                    <option value="Celebrity Artists & Entertainment">Celebrity Artists & Entertainment</option>
                    <option value="Luxury Aviation & Fleet Transport">Luxury Aviation & Fleet Transport</option>
                    <option value="Heritage Furniture & Fabrications">Heritage Furniture & Fabrications</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                    Primary Base / Warehouse Hub *
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.9rem', backgroundColor: '#FFFFFF' }}
                  >
                    <option value="Jaipur">Jaipur (Rajasthan)</option>
                    <option value="Udaipur">Udaipur (Rajasthan)</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Mumbai">Mumbai (Maharashtra)</option>
                    <option value="Goa">Goa</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                    Direct WhatsApp Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98200 XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                    Official Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="director@artisan-firm.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                    GSTIN Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 08AAACS9821M1Z4"
                    value={formData.gstin}
                    onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                    Digital Portfolio / Drive Link *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://instagram.com/... or Google Drive"
                    value={formData.portfolioUrl}
                    onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                  Key Luxury Wedding Experience & Capabilities
                </label>
                <textarea
                  rows={3}
                  placeholder="Mention previous palatial properties worked at, cold-chain floral capacity, inventory sizes, or signature specializations..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.9rem' }}
                />
              </div>

              <button
                type="submit"
                className="btn-gold"
                style={{ padding: '14px 28px', fontSize: '1rem', marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <Send size={18} />
                Submit Guild Partner Application
              </button>
            </form>
          </div>
        ) : (
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

            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--color-maroon)', marginBottom: '8px' }}>
              Application Successfully Registered!
            </h3>
            <p style={{ fontSize: '1rem', color: '#4B5563', maxWidth: '520px', margin: '0 auto 20px auto', lineHeight: 1.5 }}>
              Thank you for applying to the Saat Phere Elite Artisan Guild. Your dossier has been routed to our Procurement Directorate for KYC and past event audit.
            </p>

            <div
              style={{
                backgroundColor: '#F9FAFB',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                padding: '16px',
                maxWidth: '440px',
                margin: '0 auto 24px auto',
                fontSize: '0.85rem',
              }}
            >
              <div><strong>Guild Tracking ID:</strong> <span style={{ color: 'var(--color-gold-dark)', fontWeight: 700 }}>{appId}</span></div>
              <div style={{ marginTop: '4px' }}><strong>Category:</strong> {formData.category}</div>
              <div style={{ marginTop: '4px' }}><strong>Hub:</strong> {formData.city}</div>
            </div>

            <p style={{ fontSize: '0.82rem', color: '#6B7280' }}>
              A member of our Vendor Procurement team will connect via WhatsApp at <strong>{formData.phone}</strong> within 48 business hours.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
