'use client';

import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  Globe,
  Lock,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  ArrowRight,
  FileText,
  Building,
  RefreshCw,
} from 'lucide-react';
import {
  SupportedCurrency,
  FxRateLock,
  EscrowVendorRelease,
  MultiStateGstSpec,
} from '@/types/enterprise';

export const NriFintechEngine: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<SupportedCurrency>('USD');
  const [currentLock, setCurrentLock] = useState<FxRateLock | null>(null);
  const [allLocks, setAllLocks] = useState<Record<string, FxRateLock>>({});
  const [escrowReleases, setEscrowReleases] = useState<EscrowVendorRelease[]>([]);
  const [gstConfigs, setGstConfigs] = useState<Record<string, MultiStateGstSpec>>({});
  const [selectedGstState, setSelectedGstState] = useState<string>('Rajasthan');
  const [budgetInr, setBudgetInr] = useState<number>(15000000); // ₹1.5 Crore Singhania Wedding
  const [loading, setLoading] = useState(true);
  const [releasingId, setReleasingId] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  useEffect(() => {
    fetchFintechData();
  }, [selectedCurrency]);

  const fetchFintechData = async () => {
    try {
      const res = await fetch(`/api/v1/enterprise/fintech/fx-rates?currency=${selectedCurrency}`);
      const data = await res.json();
      if (data.success) {
        setCurrentLock(data.currentLock);
        setAllLocks(data.allLocks);
        setEscrowReleases(data.escrowReleases);
        setGstConfigs(data.gstConfigs);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleReleaseEscrow = async (releaseId: string) => {
    setReleasingId(releaseId);
    try {
      const res = await fetch('/api/v1/enterprise/fintech/escrow-release', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ releaseId }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccessNotice(data.message);
        setEscrowReleases((prev) =>
          prev.map((r) => (r.id === releaseId ? data.release : r))
        );
        setTimeout(() => setSuccessNotice(null), 5000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setReleasingId(null);
    }
  };

  const currentGst = gstConfigs[selectedGstState] || {
    eventState: 'Rajasthan',
    clientLocation: 'Intra-State',
    stateCode: '08',
    gstin: '08AAECS7744K1Z2',
    sacCode: '998599',
    cgstRate: 9,
    sgstRate: 9,
    igstRate: 0,
  };

  const exchangeRate = currentLock ? currentLock.exchangeRate : 0.0118;
  const convertedTotal = Math.round(budgetInr * exchangeRate);

  const baseAmountInr = Number((budgetInr / 1.18).toFixed(2));
  const gstTotalInr = Number((budgetInr - baseAmountInr).toFixed(2));
  const cgstAmountInr = currentGst.cgstRate > 0 ? Number((gstTotalInr / 2).toFixed(2)) : 0;
  const sgstAmountInr = currentGst.sgstRate > 0 ? Number((gstTotalInr / 2).toFixed(2)) : 0;
  const igstAmountInr = currentGst.igstRate > 0 ? gstTotalInr : 0;

  if (loading) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', color: 'var(--color-maroon)' }}>
        <RefreshCw className="spin" size={32} style={{ margin: '0 auto 12px' }} />
        <p>Loading NRI Cross-Border Treasury & FX Rate Locks...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      {/* Top Banner: Guaranteed FX Rate Lock */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1C1917 0%, #292524 100%)',
          border: '1px solid rgba(212, 175, 55, 0.4)',
          borderRadius: '16px',
          padding: '28px',
          color: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge-gold">Stripe Global Treasury & Razorpay International Underwritten</span>
            <span style={{ fontSize: '0.75rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Lock size={12} /> 48-Hour FX Rate Lock Guaranteed
            </span>
          </div>

          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#FFFDD0', margin: '4px 0' }}>
            NRI Destination Wedding Multi-Currency Gateway
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#D1D5DB', maxWidth: '600px' }}>
            Protects international families from currency volatility between proposal booking and final execution with real-time hedging locks.
          </p>
        </div>

        {/* Currency Switcher Buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {(['USD', 'GBP', 'EUR', 'AED', 'INR'] as SupportedCurrency[]).map((cur) => (
            <button
              key={cur}
              onClick={() => setSelectedCurrency(cur)}
              style={{
                padding: '10px 18px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.85rem',
                border: selectedCurrency === cur ? '2px solid var(--color-gold)' : '1px solid rgba(255,255,255,0.2)',
                backgroundColor: selectedCurrency === cur ? 'var(--color-gold)' : 'rgba(255,255,255,0.06)',
                color: selectedCurrency === cur ? 'var(--color-maroon)' : '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {cur}
            </button>
          ))}
        </div>
      </div>

      {successNotice && (
        <div
          style={{
            backgroundColor: '#ECFDF5',
            border: '1px solid #10B981',
            borderRadius: '10px',
            padding: '14px 20px',
            color: '#065F46',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontWeight: 600,
            fontSize: '0.9rem',
          }}
        >
          <CheckCircle2 size={20} color="#10B981" />
          {successNotice}
        </div>
      )}

      {/* FX Rates & Live Conversion Card */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Left: Active Lock Voucher */}
        <div className="luxury-card" style={{ padding: '28px', backgroundColor: '#FFFFFF' }}>
          <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-maroon)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Globe size={20} color="var(--color-gold)" />
            Active FX Rate Lock Certificate
          </h4>

          {currentLock && (
            <div style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>Lock Token Voucher:</span>
                <code style={{ fontSize: '0.8rem', color: 'var(--color-maroon)', fontWeight: 700 }}>
                  {currentLock.lockToken}
                </code>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>Guaranteed Conversion:</span>
                <strong style={{ fontSize: '1rem', color: '#111827' }}>
                  1 {currentLock.targetCurrency} = ₹{currentLock.inverseRate.toFixed(2)} INR
                </strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>Lock Guarantee Underwriter:</span>
                <span style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 600 }}>
                  {currentLock.guaranteedBy}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed #D1D5DB', paddingTop: '12px', marginTop: '12px' }}>
                <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>Total Event Budget in {selectedCurrency}:</span>
                <strong style={{ fontSize: '1.25rem', color: 'var(--color-maroon)' }}>
                  {selectedCurrency === 'INR' ? '₹1,50,00,000' : `${selectedCurrency} ${convertedTotal.toLocaleString()}`}
                </strong>
              </div>
            </div>
          )}
        </div>

        {/* Right: Automated Multi-State GST Compliance */}
        <div className="luxury-card" style={{ padding: '28px', backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-maroon)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={20} color="var(--color-gold)" />
              Automated Multi-State GST Engine
            </h4>
            <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>SAC Code: 998599</span>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
              Destination Wedding State Jurisdiction:
            </label>
            <select
              value={selectedGstState}
              onChange={(e) => setSelectedGstState(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #D1D5DB',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#111827',
              }}
            >
              <option value="Rajasthan">Rajasthan (State Code: 08 • Intra-State CGST+SGST)</option>
              <option value="Goa">Goa (State Code: 30 • Inter-State IGST 18%)</option>
              <option value="Delhi NCR">Delhi NCR (State Code: 07 • Inter-State IGST 18%)</option>
              <option value="Maharashtra">Maharashtra (State Code: 27 • Inter-State IGST 18%)</option>
            </select>
          </div>

          <div style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '8px' }}>
              <span style={{ color: '#6B7280' }}>Taxable Base Amount:</span>
              <strong>₹{baseAmountInr.toLocaleString('en-IN')}</strong>
            </div>

            {currentGst.cgstRate > 0 ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '8px' }}>
                  <span style={{ color: '#6B7280' }}>CGST ({currentGst.cgstRate}%):</span>
                  <strong style={{ color: '#059669' }}>₹{cgstAmountInr.toLocaleString('en-IN')}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '8px' }}>
                  <span style={{ color: '#6B7280' }}>SGST ({currentGst.sgstRate}%):</span>
                  <strong style={{ color: '#059669' }}>₹{sgstAmountInr.toLocaleString('en-IN')}</strong>
                </div>
              </>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '8px' }}>
                <span style={{ color: '#6B7280' }}>IGST (18% Inter-State Destination):</span>
                <strong style={{ color: '#059669' }}>₹{igstAmountInr.toLocaleString('en-IN')}</strong>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', borderTop: '1px dashed #D1D5DB', paddingTop: '10px', marginTop: '10px' }}>
              <strong style={{ color: '#111827' }}>Total Contract Value (Inc. 18% GST):</strong>
              <strong style={{ color: 'var(--color-maroon)' }}>₹{budgetInr.toLocaleString('en-IN')}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Milestone Escrow & Multi-Vendor Distribution */}
      <div className="luxury-card" style={{ padding: '28px', backgroundColor: '#FFFFFF' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-maroon)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={20} color="var(--color-gold)" />
              Milestone Escrow & Multi-Vendor Payout Distribution
            </h4>
            <p style={{ fontSize: '0.8rem', color: '#6B7280', margin: '2px 0 0' }}>
              Automated smart-contract escrow releases funds to florists, caterers, and production crews upon verified milestone inspection.
            </p>
          </div>
          <span className="badge-gold">Tri-Party Escrow Vault</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '2px solid #E5E7EB', textAlign: 'left' }}>
                <th style={{ padding: '12px 16px', color: '#4B5563' }}>Vendor Partner</th>
                <th style={{ padding: '12px 16px', color: '#4B5563' }}>Category</th>
                <th style={{ padding: '12px 16px', color: '#4B5563' }}>Escrow Allocated</th>
                <th style={{ padding: '12px 16px', color: '#4B5563' }}>Milestone Trigger</th>
                <th style={{ padding: '12px 16px', color: '#4B5563' }}>Status</th>
                <th style={{ padding: '12px 16px', color: '#4B5563', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {escrowReleases.map((release) => {
                const isReleased = release.escrowStatus === 'released';
                return (
                  <tr key={release.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
                    <td style={{ padding: '14px 16px' }}>
                      <strong style={{ color: '#111827', display: 'block' }}>{release.vendorName}</strong>
                      <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>GST: {release.gstInvoiceNumber}</span>
                    </td>
                    <td style={{ padding: '14px 16px', color: '#4B5563' }}>{release.category}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <strong style={{ color: 'var(--color-maroon)' }}>
                        ₹{release.allocatedAmount.toLocaleString('en-IN')}
                      </strong>
                    </td>
                    <td style={{ padding: '14px 16px', color: '#6B7280', fontSize: '0.8rem' }}>
                      {release.milestoneTrigger}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '6px',
                          backgroundColor: isReleased ? '#D1FAE5' : '#FEF3C7',
                          color: isReleased ? '#065F46' : '#92400E',
                        }}
                      >
                        {isReleased ? 'DISPATCHED' : 'HELD IN ESCROW'}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      {isReleased ? (
                        <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <CheckCircle2 size={14} /> Released on {release.dispatchedDate}
                        </span>
                      ) : (
                        <button
                          onClick={() => handleReleaseEscrow(release.id)}
                          disabled={releasingId === release.id}
                          className="btn-gold"
                          style={{
                            padding: '6px 14px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                          }}
                        >
                          {releasingId === release.id ? 'Releasing...' : 'Approve & Release'}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
