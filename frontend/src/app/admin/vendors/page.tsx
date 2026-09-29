'use client';

import React, { useState, useEffect } from 'react';
import { VendorItem, RfpItem, PurchaseOrderItem, VendorCategory } from '@/types/vendor';
import {
  Users,
  FileSpreadsheet,
  ShieldCheck,
  CreditCard,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink,
  DollarSign,
  Briefcase,
  Star,
  Download,
  Building,
} from 'lucide-react';

export default function AdminVendorsPage() {
  const [activeTab, setActiveTab] = useState<'directory' | 'rfps' | 'escrow'>('directory');
  const [vendors, setVendors] = useState<VendorItem[]>([]);
  const [rfps, setRfps] = useState<RfpItem[]>([]);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCompliance, setSelectedCompliance] = useState<string>('All');

  // New RFP Modal state
  const [showRfpModal, setShowRfpModal] = useState(false);
  const [rfpTitle, setRfpTitle] = useState('');
  const [rfpCategory, setRfpCategory] = useState<VendorCategory>('Floral & Botanical Artistry');
  const [rfpDestination, setRfpDestination] = useState('Udaipur & Lake Pichola');
  const [rfpDates, setRfpDates] = useState('Dec 18 - 20, 2026');
  const [rfpScope, setRfpScope] = useState('');

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/vendors');
      const data = await res.json();
      if (data.success) {
        setVendors(data.vendors || []);
        setRfps(data.rfps || []);
        setPurchaseOrders(data.purchaseOrders || []);
      }
    } catch (err) {
      console.error('Failed to load vendors data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleReleaseMilestone = async (poId: string, milestoneIndex: number) => {
    try {
      const res = await fetch('/api/vendors', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'release-milestone',
          poId,
          milestoneIndex,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setPurchaseOrders((prev) =>
          prev.map((po) => (po.id === poId ? data.data : po))
        );
        showToast('Milestone escrow funds successfully disbursed to vendor account!');
      } else {
        alert(data.error || 'Failed to release milestone');
      }
    } catch (err) {
      console.error('Milestone release failed:', err);
    }
  };

  const handleCreateRfp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rfpTitle || !rfpScope) {
      alert('Please fill out the tender title and scope.');
      return;
    }

    try {
      const res = await fetch('/api/vendors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: rfpTitle,
          category: rfpCategory,
          destination: rfpDestination,
          eventDates: rfpDates,
          scopeDescription: rfpScope,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setRfps((prev) => [data.data, ...prev]);
        setShowRfpModal(false);
        setRfpTitle('');
        setRfpScope('');
        showToast('New procurement tender published to vetted vendor network!');
      }
    } catch (err) {
      console.error('Failed to create tender:', err);
    }
  };

  const filteredVendors = vendors.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || v.category === selectedCategory;
    const matchesCompliance = selectedCompliance === 'All' || v.complianceStatus === selectedCompliance;

    return matchesSearch && matchesCategory && matchesCompliance;
  });

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
            Enterprise B2B Procurement Console
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--color-maroon)' }}>
            Vendor & Supplier Guild Management
          </h1>
          <p style={{ fontSize: '0.9rem', color: '#6B7280' }}>
            Vetted luxury artisan directory, tender bidding matrices, and Purchase Order escrow milestone disbursements.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setShowRfpModal(true)}
            className="btn-gold"
            style={{ padding: '10px 20px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Plus size={16} />
            Publish New RFP Tender
          </button>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '28px',
        }}
      >
        <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '10px', border: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: '0.78rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Registered Guild Artisans
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111827', marginTop: '4px' }}>
            {vendors.length}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#059669', marginTop: '2px', fontWeight: 600 }}>
            100% Tax & KYC Vetted
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '10px', border: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: '0.78rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Active Procurement Tenders
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-gold-dark)', marginTop: '4px' }}>
            {rfps.length}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#6B7280', marginTop: '2px' }}>
            Multi-vendor competitive bidding
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '10px', border: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: '0.78rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Active Purchase Orders
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-maroon)', marginTop: '4px' }}>
            {purchaseOrders.length}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#6B7280', marginTop: '2px' }}>
            Protected under tri-party escrow
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '10px', border: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: '0.78rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Escrow Capital Protected
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#059669', marginTop: '4px' }}>
            ₹1.67 Cr
          </div>
          <div style={{ fontSize: '0.78rem', color: '#059669', marginTop: '2px', fontWeight: 600 }}>
            Zero payment default rate
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid #E5E7EB', paddingBottom: '16px', marginBottom: '24px' }}>
        <button
          onClick={() => setActiveTab('directory')}
          style={{
            padding: '9px 18px',
            borderRadius: '8px',
            fontSize: '0.88rem',
            fontWeight: 600,
            backgroundColor: activeTab === 'directory' ? 'var(--color-maroon)' : '#F3F4F6',
            color: activeTab === 'directory' ? '#FFFFFF' : '#374151',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Users size={16} />
          Guild Artisan Directory
        </button>

        <button
          onClick={() => setActiveTab('rfps')}
          style={{
            padding: '9px 18px',
            borderRadius: '8px',
            fontSize: '0.88rem',
            fontWeight: 600,
            backgroundColor: activeTab === 'rfps' ? 'var(--color-maroon)' : '#F3F4F6',
            color: activeTab === 'rfps' ? '#FFFFFF' : '#374151',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <FileSpreadsheet size={16} />
          RFPs & Bidding Matrix ({rfps.length})
        </button>

        <button
          onClick={() => setActiveTab('escrow')}
          style={{
            padding: '9px 18px',
            borderRadius: '8px',
            fontSize: '0.88rem',
            fontWeight: 600,
            backgroundColor: activeTab === 'escrow' ? 'var(--color-maroon)' : '#F3F4F6',
            color: activeTab === 'escrow' ? '#FFFFFF' : '#374151',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <CreditCard size={16} />
          Purchase Orders & Escrow Releases ({purchaseOrders.length})
        </button>
      </div>

      {/* Tab 1: Directory */}
      {activeTab === 'directory' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Search & Filter Bar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', backgroundColor: '#FFFFFF', padding: '16px', borderRadius: '10px', border: '1px solid #E5E7EB' }}>
            <div style={{ position: 'relative', minWidth: '240px', flex: 1 }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
              <input
                type="text"
                placeholder="Search vendor by name, city, or contact..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '8px 12px 8px 36px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.85rem', backgroundColor: '#FFFFFF' }}
            >
              <option value="All">All Categories</option>
              <option value="Floral & Botanical Artistry">Floral & Botanical Artistry</option>
              <option value="Concert Sound & Stage Light">Concert Sound & Stage Light</option>
              <option value="Gourmet Catering & Mixology">Gourmet Catering & Mixology</option>
              <option value="Cinematography & Photography">Cinematography & Photography</option>
              <option value="Celebrity Artists & Entertainment">Celebrity Artists & Entertainment</option>
              <option value="Luxury Aviation & Fleet Transport">Luxury Aviation & Fleet Transport</option>
              <option value="Heritage Furniture & Fabrications">Heritage Furniture & Fabrications</option>
            </select>

            <select
              value={selectedCompliance}
              onChange={(e) => setSelectedCompliance(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.85rem', backgroundColor: '#FFFFFF' }}
            >
              <option value="All">All Compliance Statuses</option>
              <option value="Verified & Insured">Verified & Insured</option>
              <option value="Audit Pending">Audit Pending</option>
              <option value="Contracted Partner">Contracted Partner</option>
            </select>
          </div>

          {/* Vendors Table */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB', color: '#4B5563', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    <th style={{ padding: '14px 16px' }}>Vendor & Category</th>
                    <th style={{ padding: '14px 16px' }}>City Hub</th>
                    <th style={{ padding: '14px 16px' }}>Rating & Track Record</th>
                    <th style={{ padding: '14px 16px' }}>KYC & GSTIN</th>
                    <th style={{ padding: '14px 16px' }}>Compliance Status</th>
                    <th style={{ padding: '14px 16px' }}>Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVendors.map((v) => (
                    <tr key={v.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ fontWeight: 700, color: '#111827' }}>{v.name}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--color-gold-dark)', fontWeight: 600 }}>{v.category}</div>
                      </td>
                      <td style={{ padding: '14px 16px', color: '#4B5563' }}>{v.city}</td>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#D97706', fontWeight: 700 }}>
                          <Star size={14} fill="#D97706" />
                          <span>{v.rating}</span>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                          {v.completedEvents} Royal Weddings
                        </div>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ fontSize: '0.78rem', fontFamily: 'monospace', color: '#374151' }}>
                          GST: {v.gstin}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: '#6B7280' }}>PAN: {v.panNumber}</div>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            padding: '4px 8px',
                            borderRadius: '6px',
                            backgroundColor:
                              v.complianceStatus === 'Verified & Insured'
                                ? '#ECFDF5'
                                : v.complianceStatus === 'Contracted Partner'
                                ? '#EFF6FF'
                                : '#FEF3C7',
                            color:
                              v.complianceStatus === 'Verified & Insured'
                                ? '#065F46'
                                : v.complianceStatus === 'Contracted Partner'
                                ? '#1E40AF'
                                : '#92400E',
                          }}
                        >
                          {v.complianceStatus}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', fontSize: '0.8rem' }}>
                        <div style={{ fontWeight: 600, color: '#111827' }}>{v.contactPerson}</div>
                        <div style={{ color: '#6B7280' }}>{v.phone}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: RFPs & Bidding Matrix */}
      {activeTab === 'rfps' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {rfps.map((rfp) => (
            <div
              key={rfp.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '10px',
                border: '1px solid #E5E7EB',
                padding: '24px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="badge-gold" style={{ fontSize: '0.75rem' }}>
                      {rfp.category}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: '#6B7280' }}>Deadline: {rfp.deadline}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: '#111827', marginTop: '6px' }}>
                    {rfp.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#4B5563', marginTop: '4px' }}>
                    Destination: <strong>{rfp.destination}</strong> • Dates: <strong>{rfp.eventDates}</strong>
                  </p>
                </div>

                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: '6px',
                    backgroundColor: rfp.status === 'Open' ? '#ECFDF5' : '#EFF6FF',
                    color: rfp.status === 'Open' ? '#059669' : '#1E40AF',
                  }}
                >
                  Status: {rfp.status}
                </span>
              </div>

              <p style={{ fontSize: '0.88rem', color: '#374151', backgroundColor: '#F9FAFB', padding: '12px 16px', borderRadius: '6px', marginBottom: '20px', lineHeight: 1.5 }}>
                {rfp.scopeDescription}
              </p>

              {/* Bidding Matrix */}
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>
                  Submitted Vendor Proposals & Comparative Matrix ({rfp.bids.length} Bids):
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                  {rfp.bids.map((bid, idx) => (
                    <div
                      key={idx}
                      style={{
                        border: bid.selected ? '2px solid #059669' : '1px solid #E5E7EB',
                        backgroundColor: bid.selected ? '#F0FDF4' : '#FFFFFF',
                        borderRadius: '8px',
                        padding: '16px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontWeight: 700, color: '#111827', fontSize: '1rem' }}>{bid.vendorName}</div>
                        {bid.selected && (
                          <span style={{ fontSize: '0.7rem', color: '#059669', fontWeight: 700, backgroundColor: '#DCFCE7', padding: '2px 8px', borderRadius: '4px' }}>
                            ✓ Shortlisted
                          </span>
                        )}
                      </div>

                      <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-maroon)', marginTop: '8px' }}>
                        ₹{bid.quoteAmount.toLocaleString('en-IN')}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#6B7280' }}>
                        Turnaround: {bid.timelineDays} Days Production Window
                      </div>
                      <p style={{ fontSize: '0.8rem', color: '#4B5563', marginTop: '8px', fontStyle: 'italic', lineHeight: 1.4 }}>
                        &ldquo;{bid.notes}&rdquo;
                      </p>

                      <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.72rem', color: '#9CA3AF' }}>Submitted: {bid.submittedAt}</span>
                        <button
                          onClick={() => showToast(`Proposal from ${bid.vendorName} awarded and PO drafted!`)}
                          className="btn-gold"
                          style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                        >
                          Award Tender
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Purchase Orders & Escrow Milestone Releases */}
      {activeTab === 'escrow' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {purchaseOrders.map((po) => (
            <div
              key={po.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '10px',
                border: '1px solid #E5E7EB',
                padding: '24px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid #E5E7EB', paddingBottom: '16px', marginBottom: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-maroon)' }}>{po.id}</span>
                    <span className="badge-gold" style={{ fontSize: '0.72rem' }}>{po.vendorCategory}</span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', marginTop: '4px' }}>
                    {po.vendorName}
                  </h3>
                  <div style={{ fontSize: '0.85rem', color: '#6B7280' }}>
                    Event: <strong>{po.eventTitle}</strong>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Net Payable (incl. GST)</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827' }}>
                    ₹{po.netPayable.toLocaleString('en-IN')}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#059669' }}>
                    Status: {po.status}
                  </div>
                </div>
              </div>

              {/* Milestones Escrow Release Table */}
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '10px' }}>
                  Tri-Party Escrow Payment Milestones:
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {po.milestones.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        backgroundColor: m.status === 'Released' ? '#ECFDF5' : '#F9FAFB',
                        border: m.status === 'Released' ? '1px solid #10B981' : '1px solid #E5E7EB',
                        flexWrap: 'wrap',
                        gap: '12px',
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 700, color: '#111827', fontSize: '0.9rem' }}>
                          Milestone {mIdx + 1}: {m.title} ({m.percentage}%)
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                          {m.releaseTxId ? `Disbursed Reference: ${m.releaseTxId}` : `Scheduled Due: ${m.dueDate || 'Upon Milestone Inspection'}`}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-maroon)' }}>
                          ₹{m.amount.toLocaleString('en-IN')}
                        </div>

                        {m.status === 'Released' ? (
                          <span style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <CheckCircle2 size={16} /> Disbursed to Bank
                          </span>
                        ) : (
                          <button
                            onClick={() => handleReleaseMilestone(po.id, mIdx)}
                            className="btn-gold"
                            style={{ padding: '6px 14px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                          >
                            <CreditCard size={13} />
                            Release Milestone Escrow
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* New RFP Modal */}
      {showRfpModal && (
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
              maxWidth: '540px',
              width: '100%',
              padding: '28px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--color-maroon)' }}>
                Publish New Procurement Tender (RFP)
              </h3>
              <button
                onClick={() => setShowRfpModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#9CA3AF' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateRfp} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                  Tender Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Udaipur 3-Day Floral Scenography & Lotus Mandap"
                  value={rfpTitle}
                  onChange={(e) => setRfpTitle(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                    Category
                  </label>
                  <select
                    value={rfpCategory}
                    onChange={(e) => setRfpCategory(e.target.value as VendorCategory)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
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
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                    Destination Hub
                  </label>
                  <input
                    type="text"
                    value={rfpDestination}
                    onChange={(e) => setRfpDestination(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                  Scope of Work & Technical Rider *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detail floral volume, Dutch carnations cold-chain requirements, sound decibel limits, generator backups..."
                  value={rfpScope}
                  onChange={(e) => setRfpScope(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setShowRfpModal(false)}
                  style={{ padding: '9px 18px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#FFFFFF', cursor: 'pointer', fontSize: '0.85rem' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-gold"
                  style={{ padding: '9px 22px', fontSize: '0.85rem' }}
                >
                  Broadcast Tender
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
