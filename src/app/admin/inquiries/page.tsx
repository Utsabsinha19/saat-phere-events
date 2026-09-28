'use client';

import React, { useState, useEffect } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { InquiryLead, InquiryStatus } from '@/types/inquiry';
import { formatDateString } from '@/lib/utils/formatters';
import {
  Search,
  Download,
  Filter,
  Eye,
  CheckCircle,
  Clock,
  X,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Users,
  Coins,
  FileText,
} from 'lucide-react';

export default function InquiriesManagerPage() {
  const [inquiries, setInquiries] = useState<InquiryLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<InquiryStatus | 'All'>('All');
  const [selectedLead, setSelectedLead] = useState<InquiryLead | null>(null);
  const [updating, setUpdating] = useState(false);
  const [editNotes, setEditNotes] = useState('');

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const url = new URL('/api/inquiries', window.location.origin);
      if (statusFilter !== 'All') url.searchParams.set('status', statusFilter);
      if (searchTerm) url.searchParams.set('search', searchTerm);

      const res = await fetch(url.toString());
      const data = await res.json();
      if (data.success) {
        setInquiries(data.data);
      }
    } catch (err) {
      console.error('Failed to load inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [statusFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchInquiries();
  };

  const handleUpdateStatus = async (newStatus: InquiryStatus) => {
    if (!selectedLead) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/inquiries/${selectedLead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, notes: editNotes }),
      });

      const json = await res.json();
      if (json.success) {
        setSelectedLead(json.data);
        fetchInquiries();
      }
    } catch (err) {
      console.error('Error updating status:', err);
    } finally {
      setUpdating(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedLead) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/inquiries/${selectedLead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: editNotes }),
      });

      const json = await res.json();
      if (json.success) {
        setSelectedLead(json.data);
        fetchInquiries();
      }
    } catch (err) {
      console.error('Error saving notes:', err);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <>
      <AdminHeader
        title="Inquiry Lead Manager"
        subtitle="Manage, qualify, and triage the 9-core lead records captured across the digital platform"
      />

      <div className="admin-content">
        {/* Controls Toolbar */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            border: '1px solid #E5E7EB',
            padding: '16px 20px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          {/* Status Filter Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {(['All', 'New', 'Contacted', 'Quoted', 'Booked'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  border: statusFilter === st ? '1px solid var(--color-gold)' : '1px solid #E5E7EB',
                  backgroundColor: statusFilter === st ? 'var(--color-maroon)' : '#F9FAFB',
                  color: statusFilter === st ? '#FFFFFF' : '#4B5563',
                  cursor: 'pointer',
                }}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Search Bar + Export CSV */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '6px' }}>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Search client, city, phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    padding: '8px 12px 8px 32px',
                    borderRadius: '6px',
                    border: '1px solid #D1D5DB',
                    fontSize: '0.82rem',
                    width: '220px',
                  }}
                />
                <Search size={14} color="#9CA3AF" style={{ position: 'absolute', top: '10px', left: '10px' }} />
              </div>
              <button type="submit" className="btn-primary" style={{ padding: '8px 14px', fontSize: '0.82rem' }}>
                Filter
              </button>
            </form>

            <a
              href={`/api/inquiries/export${statusFilter !== 'All' ? `?status=${statusFilter}` : ''}`}
              className="btn-outline"
              style={{ padding: '8px 16px', fontSize: '0.82rem', color: '#1F2937', borderColor: '#D1D5DB' }}
            >
              <Download size={14} />
              Export CSV
            </a>
          </div>
        </div>

        {/* Inquiries Table */}
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Lead ID</th>
                <th>Client Name</th>
                <th>Event Category</th>
                <th>Event Date</th>
                <th>Location</th>
                <th>Guests</th>
                <th>Budget Range</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={9} style={{ textAlign: 'center', padding: '36px', color: '#6B7280' }}>
                    Loading lead records...
                  </td>
                </tr>
              ) : inquiries.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ textAlign: 'center', padding: '36px', color: '#6B7280' }}>
                    No inquiry records found matching current filters.
                  </td>
                </tr>
              ) : (
                inquiries.map((inq) => (
                  <tr key={inq.id}>
                    <td style={{ fontFamily: 'monospace', fontWeight: 600, color: '#6B7280' }}>
                      {inq.id}
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: '#111827' }}>{inq.fullName}</div>
                      <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                        {inq.phone} • {inq.email}
                      </div>
                    </td>
                    <td>{inq.eventType}</td>
                    <td>{formatDateString(inq.eventDate)}</td>
                    <td>{inq.eventLocation}</td>
                    <td>{inq.guestCount}</td>
                    <td style={{ fontWeight: 600, color: 'var(--color-maroon)' }}>{inq.budgetRange}</td>
                    <td>
                      <StatusBadge status={inq.status} />
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          setSelectedLead(inq);
                          setEditNotes(inq.notes || '');
                        }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          background: '#F3F4F6',
                          border: '1px solid #D1D5DB',
                          padding: '6px 10px',
                          borderRadius: '4px',
                          fontSize: '0.78rem',
                          color: '#374151',
                          cursor: 'pointer',
                        }}
                      >
                        <Eye size={13} />
                        Inspect Lead
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Lead Modal */}
      {selectedLead && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setSelectedLead(null)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '28px',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedLead(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#9CA3AF',
              }}
              aria-label="Close lead detail"
            >
              <X size={20} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span className="badge-gold">Lead Record: {selectedLead.id}</span>
              <StatusBadge status={selectedLead.status} />
            </div>

            <h3 style={{ fontSize: '1.5rem', color: 'var(--color-maroon)', fontFamily: 'var(--font-serif)', marginBottom: '4px' }}>
              {selectedLead.fullName}
            </h3>
            <div style={{ fontSize: '0.8rem', color: '#6B7280', marginBottom: '20px' }}>
              Captured On: {new Date(selectedLead.createdAt).toLocaleString()} via {selectedLead.source || 'Website'}
            </div>

            {/* 9 Core Fields Details Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '14px',
                backgroundColor: '#F9FAFB',
                padding: '18px',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                marginBottom: '20px',
                fontSize: '0.88rem',
              }}
            >
              <div>
                <span style={{ color: '#6B7280', fontSize: '0.75rem', textTransform: 'uppercase' }}>Phone</span>
                <div style={{ fontWeight: 600, color: '#1F2937', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Phone size={14} color="var(--color-gold)" />
                  <a href={`tel:${selectedLead.phone}`}>{selectedLead.phone}</a>
                </div>
              </div>

              <div>
                <span style={{ color: '#6B7280', fontSize: '0.75rem', textTransform: 'uppercase' }}>Email</span>
                <div style={{ fontWeight: 600, color: '#1F2937', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Mail size={14} color="var(--color-gold)" />
                  <a href={`mailto:${selectedLead.email}`}>{selectedLead.email}</a>
                </div>
              </div>

              <div>
                <span style={{ color: '#6B7280', fontSize: '0.75rem', textTransform: 'uppercase' }}>Event Type</span>
                <div style={{ fontWeight: 600, color: '#1F2937' }}>{selectedLead.eventType}</div>
              </div>

              <div>
                <span style={{ color: '#6B7280', fontSize: '0.75rem', textTransform: 'uppercase' }}>Event Date</span>
                <div style={{ fontWeight: 600, color: '#1F2937', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={14} color="var(--color-gold)" />
                  {formatDateString(selectedLead.eventDate)}
                </div>
              </div>

              <div>
                <span style={{ color: '#6B7280', fontSize: '0.75rem', textTransform: 'uppercase' }}>Location / City</span>
                <div style={{ fontWeight: 600, color: '#1F2937', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={14} color="var(--color-gold)" />
                  {selectedLead.eventLocation}
                </div>
              </div>

              <div>
                <span style={{ color: '#6B7280', fontSize: '0.75rem', textTransform: 'uppercase' }}>Expected Guests</span>
                <div style={{ fontWeight: 600, color: '#1F2937', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Users size={14} color="var(--color-gold)" />
                  {selectedLead.guestCount}
                </div>
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <span style={{ color: '#6B7280', fontSize: '0.75rem', textTransform: 'uppercase' }}>Approximate Budget</span>
                <div style={{ fontWeight: 700, color: 'var(--color-maroon)', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Coins size={16} color="var(--color-gold)" />
                  {selectedLead.budgetRange}
                </div>
              </div>
            </div>

            {/* Requirements / Vision Note */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-maroon)', textTransform: 'uppercase', marginBottom: '6px' }}>
                Client Vision / Custom Notes:
              </div>
              <div style={{ backgroundColor: '#F3F4F6', padding: '12px', borderRadius: '6px', fontSize: '0.88rem', color: '#374151', lineHeight: 1.5 }}>
                {selectedLead.requirements || 'No custom notes provided by client.'}
              </div>
            </div>

            {/* Internal Staff Notes */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-maroon)', textTransform: 'uppercase', marginBottom: '6px' }}>
                Internal Executive Notes & Follow-Up Log:
              </div>
              <textarea
                rows={3}
                className="form-textarea"
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                placeholder="Log call updates, quoted amounts, advance tokens, or assigned wedding coordinator..."
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
                <button
                  onClick={handleSaveNotes}
                  disabled={updating}
                  className="btn-outline"
                  style={{ padding: '6px 14px', fontSize: '0.78rem' }}
                >
                  Save Internal Note
                </button>
              </div>
            </div>

            {/* Status Update Action Bar */}
            <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '16px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '10px' }}>
                Update Lead Qualification Stage:
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {(['New', 'Contacted', 'Quoted', 'Booked'] as const).map((st) => (
                  <button
                    key={st}
                    disabled={updating || selectedLead.status === st}
                    onClick={() => handleUpdateStatus(st)}
                    className="btn-outline"
                    style={{
                      padding: '8px 16px',
                      fontSize: '0.8rem',
                      borderColor: selectedLead.status === st ? 'var(--color-gold)' : '#D1D5DB',
                      backgroundColor: selectedLead.status === st ? 'var(--color-ivory-light)' : '#FFFFFF',
                      fontWeight: selectedLead.status === st ? 700 : 500,
                    }}
                  >
                    Set: {st}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
