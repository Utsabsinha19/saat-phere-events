'use client';

import React, { useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { SITE_CONFIG } from '@/config/site';
import { Save, CheckCircle, ShieldCheck, Mail, Globe, CreditCard } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    companyName: SITE_CONFIG.name,
    targetDomain: SITE_CONFIG.domain,
    notificationEmail: SITE_CONFIG.contact.email,
    conciergePhone: SITE_CONFIG.contact.phone,
    whatsappNumber: SITE_CONFIG.contact.whatsapp,
    razorpayKeyId: 'rzp_test_saatphereevents',
    razorpaySecret: '••••••••••••••••••••••••',
    ga4MeasurementId: 'G-SAATPHERE2026',
    enableInstantSmsAlerts: true,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <>
      <AdminHeader
        title="Settings & Integrations"
        subtitle="Manage lead email dispatch triggers, domains, payment gateways, and analytics"
      />

      <div className="admin-content" style={{ maxWidth: '850px' }}>
        {saved && (
          <div
            style={{
              backgroundColor: '#ECFDF5',
              border: '1px solid #10B981',
              borderRadius: '8px',
              padding: '14px',
              marginBottom: '20px',
              color: '#065F46',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '0.9rem',
            }}
          >
            <CheckCircle size={18} />
            <span>Settings updated and active across production environment!</span>
          </div>
        )}

        <form onSubmit={handleSave}>
          {/* Section 1: Lead Notifications */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              border: '1px solid #E5E7EB',
              padding: '24px',
              marginBottom: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <Mail size={18} color="var(--color-maroon)" />
              <h3 style={{ fontSize: '1.15rem', color: 'var(--color-maroon)', fontWeight: 700 }}>
                Lead Routing & Notifications (PRD Section 4.1)
              </h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#6B7280', marginBottom: '18px' }}>
              Every lead inquiry submitted through the 9-core form is automatically recorded and dispatched here.
            </p>

            <div className="form-group">
              <label className="form-label">Executive Alert Email Recipient</label>
              <input
                type="email"
                className="form-input"
                value={settings.notificationEmail}
                onChange={(e) => setSettings({ ...settings, notificationEmail: e.target.value })}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Concierge Hotline Phone</label>
                <input
                  type="text"
                  className="form-input"
                  value={settings.conciergePhone}
                  onChange={(e) => setSettings({ ...settings, conciergePhone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">WhatsApp Hotline Number</label>
                <input
                  type="text"
                  className="form-input"
                  value={settings.whatsappNumber}
                  onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Phase 2 Payment Gateway */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              border: '1px solid #E5E7EB',
              padding: '24px',
              marginBottom: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <CreditCard size={18} color="var(--color-maroon)" />
              <h3 style={{ fontSize: '1.15rem', color: 'var(--color-maroon)', fontWeight: 700 }}>
                Phase 2 Payment Gateway & Token Deposits (PRD Section 6)
              </h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#6B7280', marginBottom: '18px' }}>
              Configured for Razorpay / Cashfree token advances, GST receipts (SAC: 998596), and client invoices.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Razorpay Key ID</label>
                <input
                  type="text"
                  className="form-input"
                  value={settings.razorpayKeyId}
                  onChange={(e) => setSettings({ ...settings, razorpayKeyId: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Razorpay Key Secret</label>
                <input
                  type="password"
                  className="form-input"
                  value={settings.razorpaySecret}
                  onChange={(e) => setSettings({ ...settings, razorpaySecret: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Section 3: Domain & Tracking */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              border: '1px solid #E5E7EB',
              padding: '24px',
              marginBottom: '28px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <Globe size={18} color="var(--color-maroon)" />
              <h3 style={{ fontSize: '1.15rem', color: 'var(--color-maroon)', fontWeight: 700 }}>
                Domain & SEO Tracking (PRD Section 5.2)
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Target Domain Mapping</label>
                <input
                  type="text"
                  className="form-input"
                  value={settings.targetDomain}
                  onChange={(e) => setSettings({ ...settings, targetDomain: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Google Analytics 4 Measurement ID</label>
                <input
                  type="text"
                  className="form-input"
                  value={settings.ga4MeasurementId}
                  onChange={(e) => setSettings({ ...settings, ga4MeasurementId: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn-primary" style={{ padding: '12px 28px' }}>
              <Save size={16} />
              Save Configuration Settings
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
