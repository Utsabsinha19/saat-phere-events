'use client';

import React, { useState, useEffect } from 'react';
import { WhatsAppLogItem, CrmCampaignStats, MessageSequenceType } from '@/types/crm';
import {
  MessageSquare,
  Send,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
  TrendingUp,
  Smartphone,
  Eye,
  CheckCheck,
  RefreshCw,
} from 'lucide-react';

const AUTOMATION_SEQUENCES = [
  {
    type: 'Instant Digital Brochure Welcome',
    trigger: 'Immediate on Web Lead Submission',
    openRate: '98.8%',
    description: 'Sends bespoke welcome PDF dossier, palatial venue lookbook, and direct calendar link for Senior Director consultation.',
  },
  {
    type: 'Consultation Slot Confirmation',
    trigger: 'Status changed to "Contacted"',
    openRate: '96.4%',
    description: 'Dispatches Google Meet / in-person atelier invitation with location pin and agenda summary.',
  },
  {
    type: '3D Decor Moodboard Signoff Alert',
    trigger: 'Production Designer publishes 3D Render',
    openRate: '94.2%',
    description: 'Pushes high-resolution render previews to the couple with one-tap WhatsApp approval buttons.',
  },
  {
    type: 'Payment Milestone Escrow Reminder',
    trigger: 'T-7 Days prior to Production Stage',
    openRate: '92.5%',
    description: 'Sends tax-compliant GST payment links for tri-party escrow deposit via Razorpay Enterprise.',
  },
  {
    type: 'Guest RSVP Countdown Sync',
    trigger: 'T-30 Days to Wedding Date',
    openRate: '91.8%',
    description: 'Sends interactive RSVP cards to guest roster with dietary preferences and hotel suite allocations.',
  },
];

export default function AdminCrmPage() {
  const [logs, setLogs] = useState<WhatsAppLogItem[]>([]);
  const [stats, setStats] = useState<CrmCampaignStats | null>(null);
  const [loading, setLoading] = useState(true);

  // Dispatch modal
  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const [recipientName, setRecipientName] = useState('');
  const [phone, setPhone] = useState('');
  const [sequenceType, setSequenceType] = useState<MessageSequenceType>('Instant Digital Brochure Welcome');
  const [customSnippet, setCustomSnippet] = useState('');

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const fetchCrmData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/crm');
      const data = await res.json();
      if (data.success) {
        setLogs(data.logs);
        setStats(data.stats);
      }
    } catch (err) {
      console.error('Failed to load CRM data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrmData();
  }, []);

  const handleDispatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName || !phone) {
      alert('Please fill recipient name and phone.');
      return;
    }

    try {
      const res = await fetch('/api/crm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientName,
          phone,
          sequenceType,
          contentSnippet: customSnippet || `Namaste ${recipientName}! Your royal wedding concierge update from Saat Phere Events.`,
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setLogs((prev) => [data.data, ...prev]);
        setShowDispatchModal(false);
        setRecipientName('');
        setPhone('');
        setCustomSnippet('');
        showToast(`WhatsApp message dispatched to ${recipientName} (${phone})!`);
      }
    } catch (err) {
      console.error('Dispatch failed:', err);
    }
  };

  return (
    <div style={{ padding: '32px' }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: '#111827',
            color: '#F9FAFB',
            padding: '12px 20px',
            borderRadius: '8px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
            borderLeft: '4px solid var(--color-gold)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.9rem',
          }}
        >
          <CheckCircle2 size={18} color="var(--color-gold)" />
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span className="badge-gold" style={{ fontSize: '0.75rem', marginBottom: '6px', display: 'inline-block' }}>
            Meta Cloud Business API • Live Automation Engine
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--color-maroon)' }}>
            WhatsApp CRM & Client Concierge Telemetry
          </h1>
          <p style={{ fontSize: '0.9rem', color: '#6B7280' }}>
            Automated lead nurturing, instant brochure delivery, RSVP reminders, and milestone payment updates.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={fetchCrmData}
            className="btn-outline"
            style={{ padding: '9px 16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <RefreshCw size={14} />
            Refresh Logs
          </button>
          <button
            onClick={() => setShowDispatchModal(true)}
            className="btn-gold"
            style={{ padding: '9px 20px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Send size={15} />
            Dispatch Direct Notification
          </button>
        </div>
      </div>

      {/* Top Metrics Cards */}
      {stats && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '10px', border: '1px solid #E5E7EB' }}>
            <div style={{ fontSize: '0.78rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Total WhatsApp Dispatches
            </div>
            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#111827', marginTop: '4px' }}>
              {stats.totalDispatches}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#059669', marginTop: '2px', fontWeight: 600 }}>
              Across 5 automated workflows
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '10px', border: '1px solid #E5E7EB' }}>
            <div style={{ fontSize: '0.78rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Meta Delivery Rate
            </div>
            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#059669', marginTop: '4px' }}>
              {stats.deliveryRate}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#6B7280', marginTop: '2px' }}>
              Verified Tier-1 WhatsApp Gateway
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '10px', border: '1px solid #E5E7EB' }}>
            <div style={{ fontSize: '0.78rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Client Read Rate
            </div>
            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--color-gold-dark)', marginTop: '4px' }}>
              {stats.readRate}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#059669', marginTop: '2px', fontWeight: 600 }}>
              Read within 4 minutes average
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '10px', border: '1px solid #E5E7EB' }}>
            <div style={{ fontSize: '0.78rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Client Interaction / Response
            </div>
            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--color-maroon)', marginTop: '4px' }}>
              {stats.responseRate}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#6B7280', marginTop: '2px' }}>
              Interactive CTA conversions
            </div>
          </div>
        </div>
      )}

      {/* Active Automation Sequences */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #E5E7EB', padding: '24px', marginBottom: '32px' }}>
        <div style={{ marginBottom: '18px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111827' }}>
            Active CRM Lifecycle Automation Triggers
          </h3>
          <p style={{ fontSize: '0.82rem', color: '#6B7280' }}>
            Fully automated WhatsApp template sequences registered under Saat Phere Events Meta Cloud WABA.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          {AUTOMATION_SEQUENCES.map((seq, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#F9FAFB',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                padding: '16px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-gold-dark)', textTransform: 'uppercase' }}>
                  Sequence {idx + 1}
                </span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669', backgroundColor: '#ECFDF5', padding: '2px 6px', borderRadius: '4px' }}>
                  {seq.openRate} Read
                </span>
              </div>

              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#111827' }}>{seq.type}</div>
              <div style={{ fontSize: '0.76rem', color: 'var(--color-maroon)', fontWeight: 600, marginTop: '2px' }}>
                Trigger: {seq.trigger}
              </div>
              <p style={{ fontSize: '0.78rem', color: '#6B7280', marginTop: '6px', lineHeight: 1.4 }}>
                {seq.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Live Dispatches Log */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
        <div style={{ padding: '18px 20px', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827' }}>
              Real-Time WhatsApp Dispatches & Delivery Logs
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#6B7280' }}>
              Showing verified receipts from Meta Business API webhook
            </p>
          </div>
          <span style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }} />
            Webhook Stream Active
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB', color: '#4B5563', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <th style={{ padding: '14px 16px' }}>Recipient & Phone</th>
                <th style={{ padding: '14px 16px' }}>Sequence Type</th>
                <th style={{ padding: '14px 16px' }}>Message Preview</th>
                <th style={{ padding: '14px 16px' }}>Status</th>
                <th style={{ padding: '14px 16px' }}>Dispatch Source</th>
                <th style={{ padding: '14px 16px' }}>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 700, color: '#111827' }}>{log.recipientName}</div>
                    <div style={{ fontSize: '0.78rem', color: '#6B7280' }}>{log.phone}</div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-maroon)' }}>
                      {log.sequenceType}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', maxWidth: '320px' }}>
                    <p style={{ fontSize: '0.78rem', color: '#4B5563', lineHeight: 1.4, margin: 0, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {log.contentSnippet}
                    </p>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: '6px',
                        backgroundColor: '#ECFDF5',
                        color: '#065F46',
                      }}
                    >
                      <CheckCheck size={14} color="#059669" />
                      {log.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '0.78rem', color: '#6B7280' }}>
                    {log.triggerSource}
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '0.75rem', color: '#9CA3AF' }}>
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}, {new Date(log.timestamp).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dispatch Modal */}
      {showDispatchModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              maxWidth: '520px',
              width: '100%',
              padding: '28px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--color-maroon)' }}>
                Dispatch Direct WhatsApp Notification
              </h3>
              <button
                onClick={() => setShowDispatchModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#9CA3AF' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleDispatch} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                  Recipient Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Siddharth Singhania"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                  WhatsApp Phone Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="+91 98200 XXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                  Sequence Template
                </label>
                <select
                  value={sequenceType}
                  onChange={(e) => setSequenceType(e.target.value as MessageSequenceType)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
                >
                  <option value="Instant Digital Brochure Welcome">Instant Digital Brochure Welcome</option>
                  <option value="Consultation Slot Confirmation">Consultation Slot Confirmation</option>
                  <option value="3D Decor Moodboard Signoff Alert">3D Decor Moodboard Signoff Alert</option>
                  <option value="Payment Milestone Escrow Reminder">Payment Milestone Escrow Reminder</option>
                  <option value="Guest RSVP Countdown Sync">Guest RSVP Countdown Sync</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                  Custom Message Note (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Leave empty to use official pre-approved Meta WABA template copy..."
                  value={customSnippet}
                  onChange={(e) => setCustomSnippet(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setShowDispatchModal(false)}
                  style={{ padding: '9px 18px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#FFFFFF', cursor: 'pointer', fontSize: '0.85rem' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-gold"
                  style={{ padding: '9px 22px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Send size={14} />
                  Send WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
