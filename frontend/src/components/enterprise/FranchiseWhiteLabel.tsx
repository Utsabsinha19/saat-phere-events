'use client';

import React, { useState, useEffect } from 'react';
import {
  Building2,
  Award,
  Globe2,
  DollarSign,
  TrendingUp,
  Users,
  CheckCircle2,
  Plus,
  Send,
  Star,
  Hotel,
} from 'lucide-react';
import {
  FranchiseBranch,
  ConciergeReferral,
} from '@/types/enterprise';

export const FranchiseWhiteLabel: React.FC = () => {
  const [branches, setBranches] = useState<FranchiseBranch[]>([]);
  const [referrals, setReferrals] = useState<ConciergeReferral[]>([]);
  const [selectedBranchId, setSelectedBranchId] = useState<string>('branch-udr');
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // New Referral Form State
  const [hotelName, setHotelName] = useState('The Oberoi Udaivilas Concierge');
  const [conciergeDirector, setConciergeDirector] = useState('Head Concierge Raghuvir');
  const [clientName, setClientName] = useState('');
  const [clientOrigin, setClientOrigin] = useState('London, UK');
  const [destinationCity, setDestinationCity] = useState('Udaipur');
  const [budgetInr, setBudgetInr] = useState(15000000);
  const [submitting, setSubmitting] = useState(false);
  const [referralNotice, setReferralNotice] = useState<string | null>(null);

  useEffect(() => {
    fetchFranchiseData();
  }, []);

  const fetchFranchiseData = async () => {
    try {
      const res = await fetch('/api/v1/enterprise/franchise');
      const data = await res.json();
      if (data.success) {
        setBranches(data.branches);
        setReferrals(data.referrals);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateReferral = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName) return;
    setSubmitting(true);

    try {
      const res = await fetch('/api/v1/enterprise/franchise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hotelName,
          conciergeDirector,
          clientName,
          clientOrigin,
          destinationCity,
          estimatedBudgetInr: budgetInr,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setReferrals((prev) => [data.referral, ...prev]);
        setReferralNotice(data.message);
        setShowReferralModal(false);
        setClientName('');
        setTimeout(() => setReferralNotice(null), 5000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const activeBranch = branches.find((b) => b.id === selectedBranchId) || branches[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* ================= SECTION 3.2: MULTI-BRANCH FRANCHISE OS ================= */}
      <div className="luxury-card" style={{ padding: '32px', backgroundColor: '#FFFFFF' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <span className="badge-gold">Section 3.2 Multi-Branch White-Label OS</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-maroon)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Building2 size={24} color="var(--color-gold)" />
              Regional Franchise Hub & Multi-Branch P&L Isolation
            </h3>
          </div>
          <span style={{ fontSize: '0.85rem', color: '#6B7280' }}>
            Consolidated Corporate Master View vs Regional View
          </span>
        </div>

        <p style={{ fontSize: '0.9rem', color: '#4B5563', lineHeight: 1.6, marginBottom: '20px' }}>
          Grants regional franchise managing directors in Jaipur, Udaipur, Delhi NCR, Mumbai, Dubai, and London dedicated operational dashboards while consolidating corporate GMV, lead attribution, and vendor quality scores at headquarters.
        </p>

        {/* Branch Selector Tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
          {branches.map((b) => (
            <button
              key={b.id}
              onClick={() => setSelectedBranchId(b.id)}
              style={{
                padding: '10px 18px',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '0.85rem',
                border: selectedBranchId === b.id ? '2px solid var(--color-gold)' : '1px solid #E5E7EB',
                backgroundColor: selectedBranchId === b.id ? 'rgba(212, 175, 55, 0.12)' : '#FFFFFF',
                color: selectedBranchId === b.id ? 'var(--color-maroon)' : '#4B5563',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {b.name.split(' ')[0]} ({b.city})
            </button>
          ))}
        </div>

        {/* Active Branch Performance Metrics */}
        {activeBranch && (
          <div
            style={{
              borderRadius: '16px',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              backgroundColor: '#F9FAFB',
              padding: '24px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-maroon)', margin: 0 }}>
                  {activeBranch.name}
                </h4>
                <span style={{ fontSize: '0.85rem', color: '#6B7280' }}>
                  Managing Director: <strong>{activeBranch.directorName}</strong> • Currency: <strong>{activeBranch.currency}</strong>
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#FEF3C7', padding: '6px 14px', borderRadius: '20px' }}>
                <Star size={16} color="#D97706" fill="#D97706" />
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#92400E' }}>
                  {activeBranch.customerSatisfactionScore} / 5.0 CSAT
                </span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '10px', border: '1px solid #E5E7EB' }}>
                <span style={{ fontSize: '0.75rem', color: '#6B7280', display: 'block' }}>Annual Gross Merchandise Value (GMV)</span>
                <strong style={{ fontSize: '1.25rem', color: 'var(--color-gold-dark)' }}>
                  ₹{(activeBranch.annualGmvInr / 10000000).toFixed(1)} Crores
                </strong>
              </div>
              <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '10px', border: '1px solid #E5E7EB' }}>
                <span style={{ fontSize: '0.75rem', color: '#6B7280', display: 'block' }}>Active High-Value Weddings</span>
                <strong style={{ fontSize: '1.25rem', color: '#111827' }}>
                  {activeBranch.activeEventsCount} Destination Events
                </strong>
              </div>
              <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '10px', border: '1px solid #E5E7EB' }}>
                <span style={{ fontSize: '0.75rem', color: '#6B7280', display: 'block' }}>Verified Artisan & Vendor Guild</span>
                <strong style={{ fontSize: '1.25rem', color: '#059669' }}>
                  {activeBranch.activeVendorsCount} Audited Vendors
                </strong>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ================= SUB-AGENCY & HOTEL CONCIERGE REFERRAL NETWORK ================= */}
      <div className="luxury-card" style={{ padding: '32px', backgroundColor: '#FFFFFF' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <span className="badge-gold">Sub-Agency & Concierge Guild</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-maroon)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Hotel size={24} color="var(--color-gold)" />
              5-Star Hotel Concierge & Boutique Planner Referral Network
            </h3>
          </div>

          <button
            onClick={() => setShowReferralModal(true)}
            className="btn-gold"
            style={{
              padding: '10px 20px',
              fontSize: '0.85rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Plus size={16} /> Submit High-Value Client Referral
          </button>
        </div>

        <p style={{ fontSize: '0.9rem', color: '#4B5563', lineHeight: 1.6, marginBottom: '20px' }}>
          Luxury hotel concierge desks (Taj Lake Palace, Oberoi Udaivilas, Leela Palace, Rambagh Palace) and affiliate planners submit client referrals for royal destination weddings, earning a standardized 5.0% commission upon contract signing.
        </p>

        {referralNotice && (
          <div
            style={{
              backgroundColor: '#ECFDF5',
              border: '1px solid #10B981',
              borderRadius: '10px',
              padding: '12px 18px',
              color: '#065F46',
              marginBottom: '20px',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontWeight: 600,
            }}
          >
            <CheckCircle2 size={18} color="#10B981" />
            {referralNotice}
          </div>
        )}

        {/* Referrals Ledger Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '2px solid #E5E7EB', textAlign: 'left' }}>
                <th style={{ padding: '12px 16px', color: '#4B5563' }}>Referring Concierge Desk</th>
                <th style={{ padding: '12px 16px', color: '#4B5563' }}>Client Family</th>
                <th style={{ padding: '12px 16px', color: '#4B5563' }}>Origin & Destination</th>
                <th style={{ padding: '12px 16px', color: '#4B5563' }}>Estimated Budget</th>
                <th style={{ padding: '12px 16px', color: '#4B5563' }}>5% Commission Payout</th>
                <th style={{ padding: '12px 16px', color: '#4B5563', textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((ref) => {
                const isSigned = ref.status === 'contract_signed';
                return (
                  <tr key={ref.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
                    <td style={{ padding: '14px 16px' }}>
                      <strong style={{ color: '#111827', display: 'block' }}>{ref.hotelName}</strong>
                      <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{ref.conciergeDirector}</span>
                    </td>
                    <td style={{ padding: '14px 16px', color: '#1F2937', fontWeight: 600 }}>
                      {ref.clientName}
                    </td>
                    <td style={{ padding: '14px 16px', color: '#4B5563' }}>
                      {ref.clientOrigin} → {ref.destinationCity}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <strong style={{ color: 'var(--color-maroon)' }}>
                        ₹{(ref.estimatedBudgetInr / 10000000).toFixed(2)} Cr
                      </strong>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <strong style={{ color: '#059669' }}>
                        ₹{ref.potentialPayoutInr.toLocaleString('en-IN')}
                      </strong>
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '6px',
                          backgroundColor: isSigned ? '#D1FAE5' : '#FEF3C7',
                          color: isSigned ? '#065F46' : '#92400E',
                        }}
                      >
                        {ref.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Referral Modal */}
      {showReferralModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
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
              borderRadius: '16px',
              padding: '32px',
              maxWidth: '520px',
              width: '100%',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-maroon)' }}>
                Submit Hotel Concierge Client Referral
              </h3>
              <button
                onClick={() => setShowReferralModal(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#6B7280' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateReferral} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                  Referring Hotel Concierge Desk:
                </label>
                <select
                  value={hotelName}
                  onChange={(e) => setHotelName(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.85rem' }}
                >
                  <option value="Taj Lake Palace Concierge Desk">Taj Lake Palace Concierge Desk, Udaipur</option>
                  <option value="The Oberoi Udaivilas Concierge">The Oberoi Udaivilas Concierge, Udaipur</option>
                  <option value="Rambagh Palace Jaipur Front Desk">Rambagh Palace Jaipur Front Desk</option>
                  <option value="The Leela Palace Chanakyapuri">The Leela Palace Chanakyapuri, New Delhi</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                  Concierge Director / Lead Name:
                </label>
                <input
                  type="text"
                  value={conciergeDirector}
                  onChange={(e) => setConciergeDirector(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                  Client Family Name:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Mittal Family"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                    Client Origin:
                  </label>
                  <input
                    type="text"
                    value={clientOrigin}
                    onChange={(e) => setClientOrigin(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.85rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                    Destination:
                  </label>
                  <input
                    type="text"
                    value={destinationCity}
                    onChange={(e) => setDestinationCity(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                  Estimated Budget (INR):
                </label>
                <input
                  type="number"
                  step="500000"
                  value={budgetInr}
                  onChange={(e) => setBudgetInr(Number(e.target.value))}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.85rem' }}
                />
                <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600, marginTop: '4px', display: 'block' }}>
                  Estimated 5% Commission Payout: ₹{Math.round((budgetInr * 0.05)).toLocaleString('en-IN')}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowReferralModal(false)}
                  style={{ padding: '10px 18px', borderRadius: '8px', border: '1px solid #D1D5DB', backgroundColor: '#FFFFFF', fontSize: '0.85rem', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-gold"
                  style={{ padding: '10px 24px', fontSize: '0.85rem', fontWeight: 700 }}
                >
                  {submitting ? 'Registering...' : 'Register Referral'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
