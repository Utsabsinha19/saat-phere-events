'use client';

import React, { useState } from 'react';
import {
  CreditCard,
  Download,
  CheckCircle2,
  FileText,
  DollarSign,
  PieChart,
  ArrowUpRight,
  ShieldCheck,
  Building,
  Sparkles,
  Lock,
} from 'lucide-react';

interface ExpenseItem {
  id: string;
  category: string;
  vendorName: string;
  allocatedAmount: number; // in INR
  paidAmount: number;
  dueAmount: number;
  status: 'Fully Settled' | 'In Escrow' | 'Milestone Due';
  dueDate: string;
}

export const BudgetTracker: React.FC = () => {
  const [totalBudget, setTotalBudget] = useState(25000000); // 2.50 Cr INR
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<ExpenseItem | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paidTxId, setPaidTxId] = useState('');

  const [expenses, setExpenses] = useState<ExpenseItem[]>([
    {
      id: 'exp-01',
      category: 'Palatial Venue Buyout & Suites',
      vendorName: 'Jagmandir Island Palace & HRH Group',
      allocatedAmount: 9500000,
      paidAmount: 9500000,
      dueAmount: 0,
      status: 'Fully Settled',
      dueDate: 'Completed Aug 15, 2026',
    },
    {
      id: 'exp-02',
      category: '3D Scenography & Floral Decor',
      vendorName: 'Saat Phere Atelier & Royal Dutch Florals',
      allocatedAmount: 6200000,
      paidAmount: 3500000,
      dueAmount: 2700000,
      status: 'Milestone Due',
      dueDate: 'October 10, 2026',
    },
    {
      id: 'exp-03',
      category: 'Michelin-Grade Catering & Mixology',
      vendorName: 'Taj Culinary Masters & Flair Craft Bartenders',
      allocatedAmount: 4200000,
      paidAmount: 2000000,
      dueAmount: 2200000,
      status: 'In Escrow',
      dueDate: 'November 05, 2026',
    },
    {
      id: 'exp-04',
      category: 'Royal Cinematography & 8K Cinema',
      vendorName: 'House on the Clouds Studios',
      allocatedAmount: 1800000,
      paidAmount: 1000000,
      dueAmount: 800000,
      status: 'In Escrow',
      dueDate: 'November 20, 2026',
    },
    {
      id: 'exp-05',
      category: 'Celebrity Vocalists & Sangeet Artists',
      vendorName: 'Kailash Kher Sufi Ensemble & DJ Shadow Dubai',
      allocatedAmount: 2100000,
      paidAmount: 1050000,
      dueAmount: 1050000,
      status: 'Milestone Due',
      dueDate: 'October 25, 2026',
    },
    {
      id: 'exp-06',
      category: 'Aviation, Vintage Fleet & Lake Charters',
      vendorName: 'Udaipur Heritage Boats & Vintage Car Guild',
      allocatedAmount: 1200000,
      paidAmount: 600000,
      dueAmount: 600000,
      status: 'In Escrow',
      dueDate: 'December 01, 2026',
    },
  ]);

  const totalCommitted = expenses.reduce((acc, curr) => acc + curr.allocatedAmount, 0);
  const totalPaid = expenses.reduce((acc, curr) => acc + curr.paidAmount, 0);
  const totalDue = expenses.reduce((acc, curr) => acc + curr.dueAmount, 0);
  const percentCommitted = Math.round((totalCommitted / totalBudget) * 100);
  const percentPaid = Math.round((totalPaid / totalCommitted) * 100);

  const formatLakhs = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(val / 100000).toFixed(2)} Lakh`;
  };

  const handleOpenPayment = (item: ExpenseItem) => {
    setSelectedMilestone(item);
    setPaymentSuccess(false);
    setShowCheckoutModal(true);
  };

  const handleSimulatePayment = () => {
    if (!selectedMilestone) return;
    const tx = 'RZP_LIVE_' + Math.random().toString(36).substring(2, 10).toUpperCase();
    setPaidTxId(tx);
    setPaymentSuccess(true);

    // Update expense record
    setExpenses((prev) =>
      prev.map((item) =>
        item.id === selectedMilestone.id
          ? {
              ...item,
              paidAmount: item.allocatedAmount,
              dueAmount: 0,
              status: 'Fully Settled',
            }
          : item
      )
    );
  };

  const handleDownloadGstReceipt = (item: ExpenseItem) => {
    const receiptText = `=====================================================
SAAT PHERE LUXURY WEDDINGS & CELEBRATIONS PVT. LTD.
GSTIN: 08AAACS9821M1Z4 • SAC CODE: 998596
Registered Office: Civil Lines, Jaipur 302006, Rajasthan
Client: Ananya & Siddharth Singhania
Event: 3-Day Palatial Destination Wedding • Jagmandir Palace, Udaipur
Date: ${new Date().toLocaleDateString('en-IN')}
Receipt No: SPE-GST-${Math.floor(100000 + Math.random() * 900000)}
-----------------------------------------------------
Item Description: ${item.category}
Vendor Partner: ${item.vendorName}
Taxable Value: ₹${(item.allocatedAmount / 1.18).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
CGST (9%): ₹${((item.allocatedAmount / 1.18) * 0.09).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
SGST (9%): ₹${((item.allocatedAmount / 1.18) * 0.09).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
-----------------------------------------------------
TOTAL AMOUNT PAID (INCL. GST): ₹${item.allocatedAmount.toLocaleString('en-IN')}
Payment Mode: Razorpay Escrow / Corporate RTGS Wire
Status: Digitally Signed & Tax Compliant
=====================================================`;

    const blob = new Blob([receiptText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GST_Receipt_${item.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Financial Summary Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
        }}
      >
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '10px',
            padding: '20px',
            borderTop: '4px solid var(--color-gold)',
          }}
        >
          <div style={{ fontSize: '0.78rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Allocated Wedding Budget
          </div>
          <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#111827', marginTop: '6px' }}>
            {formatLakhs(totalBudget)}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#059669', marginTop: '4px', fontWeight: 600 }}>
            Target Cap: ₹2.50 Cr INR
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '10px',
            padding: '20px',
            borderTop: '4px solid var(--color-maroon)',
          }}
        >
          <div style={{ fontSize: '0.78rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Committed Vendor Contracts
          </div>
          <div style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--color-maroon)', marginTop: '6px' }}>
            {formatLakhs(totalCommitted)}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#6B7280', marginTop: '4px' }}>
            {percentCommitted}% of Total Budget Allocated
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '10px',
            padding: '20px',
            borderTop: '4px solid #10B981',
          }}
        >
          <div style={{ fontSize: '0.78rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Total Disbursed & Settled
          </div>
          <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#059669', marginTop: '6px' }}>
            {formatLakhs(totalPaid)}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#059669', marginTop: '4px', fontWeight: 600 }}>
            {percentPaid}% of Contracted Value Paid
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '10px',
            padding: '20px',
            borderTop: '4px solid #F59E0B',
          }}
        >
          <div style={{ fontSize: '0.78rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Milestone Escrow Balance Due
          </div>
          <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#D97706', marginTop: '6px' }}>
            {formatLakhs(totalDue)}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#6B7280', marginTop: '4px' }}>
            Scheduled across 4 remaining phases
          </div>
        </div>
      </div>

      {/* Budget Allocation Progress Bar */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '10px',
          border: '1px solid #E5E7EB',
          padding: '24px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827' }}>
              Capital Allocation by Category
            </h4>
            <p style={{ fontSize: '0.82rem', color: '#6B7280' }}>
              Real-time expenditure tracking aligned with Saat Phere Luxury Production standards
            </p>
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-gold-dark)' }}>
            Total Allocated: {formatLakhs(totalCommitted)}
          </span>
        </div>

        {/* Multi-segmented visual bar */}
        <div style={{ height: '14px', borderRadius: '7px', display: 'flex', overflow: 'hidden', backgroundColor: '#F3F4F6' }}>
          <div style={{ width: '38%', backgroundColor: 'var(--color-maroon)' }} title="Venue (38%)" />
          <div style={{ width: '25%', backgroundColor: 'var(--color-gold)' }} title="Decor & Floral (25%)" />
          <div style={{ width: '17%', backgroundColor: '#059669' }} title="Catering & Mixology (17%)" />
          <div style={{ width: '9%', backgroundColor: '#3B82F6' }} title="Cinematography (9%)" />
          <div style={{ width: '8%', backgroundColor: '#8B5CF6' }} title="Artists & Sound (8%)" />
          <div style={{ width: '3%', backgroundColor: '#64748B' }} title="Logistics (3%)" />
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '14px', fontSize: '0.78rem', color: '#4B5563' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-maroon)' }} />
            <span>Palatial Venue (38%)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-gold)' }} />
            <span>3D Decor & Florals (25%)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#059669' }} />
            <span>Gourmet Catering (17%)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#3B82F6' }} />
            <span>8K Cinema (9%)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#8B5CF6' }} />
            <span>Artists & Music (8%)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#64748B' }} />
            <span>Logistics & Fleet (3%)</span>
          </div>
        </div>
      </div>

      {/* Itemized Table */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '10px',
          border: '1px solid #E5E7EB',
          overflow: 'hidden',
          boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
        }}
      >
        <div style={{ padding: '18px 20px', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827' }}>
              Itemized Vendor Purchase Orders & Milestones
            </h4>
            <p style={{ fontSize: '0.8rem', color: '#6B7280' }}>
              Protected under Saat Phere Tri-Party Escrow Protocol
            </p>
          </div>
          <span className="badge-gold" style={{ fontSize: '0.78rem' }}>
            <ShieldCheck size={14} style={{ display: 'inline', marginRight: '4px' }} />
            100% Tax & GST SAC Compliant
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB', color: '#4B5563', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <th style={{ padding: '14px 18px' }}>Category & Contractor</th>
                <th style={{ padding: '14px 18px' }}>Committed Value</th>
                <th style={{ padding: '14px 18px' }}>Disbursed</th>
                <th style={{ padding: '14px 18px' }}>Balance Due</th>
                <th style={{ padding: '14px 18px' }}>Status & Timeline</th>
                <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                  <td style={{ padding: '16px 18px' }}>
                    <div style={{ fontWeight: 700, color: '#111827' }}>{item.category}</div>
                    <div style={{ fontSize: '0.78rem', color: '#6B7280', marginTop: '2px' }}>
                      {item.vendorName}
                    </div>
                  </td>
                  <td style={{ padding: '16px 18px', fontWeight: 700, color: '#111827' }}>
                    ₹{item.allocatedAmount.toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: '16px 18px', color: '#059669', fontWeight: 600 }}>
                    ₹{item.paidAmount.toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: '16px 18px', color: item.dueAmount > 0 ? '#D97706' : '#6B7280', fontWeight: 600 }}>
                    {item.dueAmount > 0 ? `₹${item.dueAmount.toLocaleString('en-IN')}` : '₹0 (Nil)'}
                  </td>
                  <td style={{ padding: '16px 18px' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: '6px',
                        backgroundColor:
                          item.status === 'Fully Settled'
                            ? '#ECFDF5'
                            : item.status === 'Milestone Due'
                            ? '#FEF3C7'
                            : '#EFF6FF',
                        color:
                          item.status === 'Fully Settled'
                            ? '#065F46'
                            : item.status === 'Milestone Due'
                            ? '#92400E'
                            : '#1E40AF',
                      }}
                    >
                      {item.status}
                    </span>
                    <div style={{ fontSize: '0.74rem', color: '#9CA3AF', marginTop: '3px' }}>
                      {item.dueDate}
                    </div>
                  </td>
                  <td style={{ padding: '16px 18px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '8px' }}>
                      <button
                        onClick={() => handleDownloadGstReceipt(item)}
                        title="Download GST Tax Receipt"
                        style={{
                          backgroundColor: '#F3F4F6',
                          border: '1px solid #D1D5DB',
                          borderRadius: '6px',
                          padding: '6px 10px',
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          color: '#374151',
                        }}
                      >
                        <Download size={13} />
                        GST Receipt
                      </button>

                      {item.dueAmount > 0 && (
                        <button
                          onClick={() => handleOpenPayment(item)}
                          className="btn-gold"
                          style={{
                            padding: '6px 12px',
                            fontSize: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <CreditCard size={13} />
                          Pay Due
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simulated Razorpay / Cashfree Luxury Payment Modal */}
      {showCheckoutModal && selectedMilestone && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.65)',
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
              borderRadius: '14px',
              maxWidth: '540px',
              width: '100%',
              padding: '30px',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
              border: '1.5px solid var(--color-gold)',
            }}
          >
            {!paymentSuccess ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E5E7EB', paddingBottom: '16px', marginBottom: '20px' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-gold-dark)', fontWeight: 700 }}>
                      Razorpay Enterprise Checkout
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--color-maroon)', marginTop: '2px' }}>
                      Milestone Deposit Authorization
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowCheckoutModal(false)}
                    style={{ background: 'none', border: 'none', fontSize: '1.3rem', cursor: 'pointer', color: '#9CA3AF' }}
                  >
                    ✕
                  </button>
                </div>

                <div style={{ backgroundColor: '#FDFBF7', border: '1px solid rgba(212, 175, 55, 0.4)', borderRadius: '8px', padding: '16px', marginBottom: '20px' }}>
                  <div style={{ fontSize: '0.85rem', color: '#6B7280' }}>Disbursement Target:</div>
                  <div style={{ fontWeight: 700, color: '#111827', fontSize: '1.05rem', marginTop: '2px' }}>
                    {selectedMilestone.category}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#4B5563' }}>Vendor: {selectedMilestone.vendorName}</div>

                  <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px dashed #D1D5DB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.9rem', color: '#374151' }}>Due Milestone Amount:</span>
                    <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-maroon)' }}>
                      ₹{selectedMilestone.dueAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#6B7280', textAlign: 'right', marginTop: '2px' }}>
                    (Includes 18% GST SAC 998596 with Input Tax Credit eligibility)
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
                    Select High-Value Payment Gateway Mode:
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', border: '1px solid #E5E7EB', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>
                      <input type="radio" name="paymode" defaultChecked />
                      <div>
                        <strong>RTGS / NEFT Virtual Account Escrow</strong>
                        <div style={{ fontSize: '0.74rem', color: '#6B7280' }}>Zero surcharges • Direct Reserve Bank wire settlement</div>
                      </div>
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', border: '1px solid #E5E7EB', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>
                      <input type="radio" name="paymode" />
                      <div>
                        <strong>Corporate Net Banking (HDFC / ICICI / Kotak Privé)</strong>
                        <div style={{ fontSize: '0.74rem', color: '#6B7280' }}>Instant authorization with multi-level approval</div>
                      </div>
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', border: '1px solid #E5E7EB', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>
                      <input type="radio" name="paymode" />
                      <div>
                        <strong>American Express Centurion / Platinum Card</strong>
                        <div style={{ fontSize: '0.74rem', color: '#6B7280' }}>Concierge fraud protection & reward multiplier</div>
                      </div>
                    </label>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setShowCheckoutModal(false)}
                    style={{ padding: '10px 18px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#FFFFFF', cursor: 'pointer', fontSize: '0.85rem' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSimulatePayment}
                    className="btn-gold"
                    style={{ padding: '10px 24px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Lock size={15} />
                    Authorize & Disburse ₹{selectedMilestone.dueAmount.toLocaleString('en-IN')}
                  </button>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: '#ECFDF5',
                    color: '#059669',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px auto',
                  }}
                >
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#111827', marginBottom: '6px' }}>
                  Payment Transferred to Escrow
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#4B5563', maxWidth: '400px', margin: '0 auto 18px auto', lineHeight: 1.5 }}>
                  The milestone payment of ₹{selectedMilestone.dueAmount.toLocaleString('en-IN')} has been securely deposited into the tri-party production escrow account.
                </p>

                <div style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '14px', marginBottom: '24px', fontSize: '0.8rem', textAlign: 'left' }}>
                  <div><strong>Transaction Reference:</strong> {paidTxId}</div>
                  <div><strong>GST Invoice:</strong> SPE-GST-2026-9821</div>
                  <div><strong>Payment Mode:</strong> Razorpay Tri-Party Verified Escrow</div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                  <button
                    onClick={() => handleDownloadGstReceipt(selectedMilestone)}
                    className="btn-outline"
                    style={{ padding: '10px 18px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Download size={15} />
                    Download GST Tax Invoice
                  </button>
                  <button
                    onClick={() => setShowCheckoutModal(false)}
                    className="btn-gold"
                    style={{ padding: '10px 24px', fontSize: '0.85rem' }}
                  >
                    Done & Return
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
