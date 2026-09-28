'use client';

import React, { useState, useEffect } from 'react';
import { GuestItem, RsvpStatus, DietaryPreference } from '@/types/rsvp';
import {
  Users,
  UserPlus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  MessageSquare,
  Bed,
  Utensils,
  Download,
  Share2,
} from 'lucide-react';

interface RsvpManagerProps {
  eventId?: string;
}

export const RsvpManager: React.FC<RsvpManagerProps> = ({ eventId = 'evt-udaipur-101' }) => {
  const [guests, setGuests] = useState<GuestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form state
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formGroup, setFormGroup] = useState<'Bride Family' | 'Groom Family' | 'Dignitaries & VIPs' | 'Friends & Colleagues'>('Bride Family');
  const [formAttendees, setFormAttendees] = useState(2);
  const [formDiet, setFormDiet] = useState<DietaryPreference>('Pure Vegetarian');
  const [formHotel, setFormHotel] = useState('The Oberoi Udaivilas');
  const [formRoom, setFormRoom] = useState('');

  const fetchGuests = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/rsvps?eventId=${eventId}`);
      const data = await res.json();
      if (data.success && data.guests) {
        setGuests(data.guests);
      }
    } catch (err) {
      console.error('Failed to load RSVP guests:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuests();
  }, [eventId]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleUpdateStatus = async (guestId: string, newStatus: RsvpStatus) => {
    try {
      const res = await fetch('/api/rsvps', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: guestId, rsvpStatus: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setGuests((prev) =>
          prev.map((g) => (g.id === guestId ? { ...g, rsvpStatus: newStatus } : g))
        );
        showToast(`Guest status updated to ${newStatus}`);
      }
    } catch (err) {
      console.error('Failed to update guest status:', err);
    }
  };

  const handleSendReminder = (guest: GuestItem) => {
    showToast(`WhatsApp RSVP invitation dispatched to ${guest.guestName} (${guest.phone})`);
  };

  const handleAddGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone) {
      alert('Please provide guest name and phone number.');
      return;
    }

    try {
      const res = await fetch('/api/rsvps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId,
          guestName: formName,
          phone: formPhone,
          email: formEmail,
          groupTag: formGroup,
          totalAttendees: formAttendees,
          dietaryPreference: formDiet,
          hotelAllocated: formHotel,
          roomNumber: formRoom || undefined,
          rsvpStatus: 'Confirmed',
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setGuests((prev) => [data.data, ...prev]);
        setShowAddModal(false);
        setFormName('');
        setFormPhone('');
        setFormEmail('');
        setFormRoom('');
        showToast(`Added ${data.data.guestName} to wedding guest list!`);
      }
    } catch (err) {
      console.error('Failed to add guest:', err);
    }
  };

  const filteredGuests = guests.filter((g) => {
    const matchesSearch =
      g.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.phone.includes(searchTerm) ||
      (g.email && g.email.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesGroup = selectedGroup === 'All' || g.groupTag === selectedGroup;
    const matchesStatus = selectedStatus === 'All' || g.rsvpStatus === selectedStatus;

    return matchesSearch && matchesGroup && matchesStatus;
  });

  const totalInvited = guests.length;
  const totalHeadcount = guests.reduce((sum, g) => sum + (g.rsvpStatus === 'Confirmed' ? g.totalAttendees : 0), 0);
  const confirmedCount = guests.filter((g) => g.rsvpStatus === 'Confirmed').length;
  const awaitingCount = guests.filter((g) => g.rsvpStatus === 'Awaiting Response').length;
  const tentativeCount = guests.filter((g) => g.rsvpStatus === 'Tentative').length;

  const exportCsv = () => {
    const headers = ['Name', 'Group', 'Phone', 'Email', 'Headcount', 'RSVP Status', 'Dietary', 'Hotel', 'Room'];
    const rows = guests.map((g) => [
      `"${g.guestName}"`,
      `"${g.groupTag}"`,
      `"${g.phone}"`,
      `"${g.email || ''}"`,
      g.totalAttendees,
      `"${g.rsvpStatus}"`,
      `"${g.dietaryPreference}"`,
      `"${g.hotelAllocated}"`,
      `"${g.roomNumber || ''}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SaatPhere_GuestList_${eventId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Guest list CSV exported successfully.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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

      {/* KPI Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
        }}
      >
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '10px',
            padding: '18px 20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
          }}
        >
          <div style={{ fontSize: '0.78rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Confirmed Headcount
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-maroon)', marginTop: '4px' }}>
            {totalHeadcount} <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#6B7280' }}>Pax</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#059669', marginTop: '2px', fontWeight: 600 }}>
            {confirmedCount} Parties Confirmed
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '10px',
            padding: '18px 20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
          }}
        >
          <div style={{ fontSize: '0.78rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Awaiting Response
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#D97706', marginTop: '4px' }}>
            {awaitingCount}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#6B7280', marginTop: '2px' }}>
            WhatsApp follow-ups active
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '10px',
            padding: '18px 20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
          }}
        >
          <div style={{ fontSize: '0.78rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Tentative / Undecided
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#4B5563', marginTop: '4px' }}>
            {tentativeCount}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#6B7280', marginTop: '2px' }}>
            Awaiting flight bookings
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '10px',
            padding: '18px 20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
          }}
        >
          <div style={{ fontSize: '0.78rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Total Invitations Sent
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-gold-dark)', marginTop: '4px' }}>
            {totalInvited}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#059669', marginTop: '2px', fontWeight: 600 }}>
            {totalInvited > 0 ? Math.round((confirmedCount / totalInvited) * 100) : 0}% Acceptance Rate
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#FFFFFF',
          padding: '16px 20px',
          borderRadius: '10px',
          border: '1px solid #E5E7EB',
        }}
      >
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', flex: 1 }}>
          {/* Search */}
          <div style={{ position: 'relative', minWidth: '220px', flex: 1 }}>
            <Search
              size={16}
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }}
            />
            <input
              type="text"
              placeholder="Search by guest name, phone, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px 9px 36px',
                borderRadius: '6px',
                border: '1px solid #D1D5DB',
                fontSize: '0.88rem',
              }}
            />
          </div>

          {/* Group Filter */}
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            style={{
              padding: '9px 12px',
              borderRadius: '6px',
              border: '1px solid #D1D5DB',
              fontSize: '0.85rem',
              backgroundColor: '#FFFFFF',
            }}
          >
            <option value="All">All Guest Groups</option>
            <option value="Bride Family">Bride Family</option>
            <option value="Groom Family">Groom Family</option>
            <option value="Dignitaries & VIPs">Dignitaries & VIPs</option>
            <option value="Friends & Colleagues">Friends & Colleagues</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{
              padding: '9px 12px',
              borderRadius: '6px',
              border: '1px solid #D1D5DB',
              fontSize: '0.85rem',
              backgroundColor: '#FFFFFF',
            }}
          >
            <option value="All">All RSVP Statuses</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Tentative">Tentative</option>
            <option value="Awaiting Response">Awaiting Response</option>
            <option value="Declined">Declined</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={exportCsv}
            className="btn-outline"
            style={{ padding: '8px 14px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Download size={14} />
            Export CSV
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-gold"
            style={{ padding: '8px 16px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <UserPlus size={15} />
            Add New Guest
          </button>
        </div>
      </div>

      {/* Guest Table */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '10px',
          border: '1px solid #E5E7EB',
          overflow: 'hidden',
          boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB', color: '#4B5563', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <th style={{ padding: '14px 16px' }}>Guest Details</th>
                <th style={{ padding: '14px 16px' }}>Group</th>
                <th style={{ padding: '14px 16px' }}>Headcount</th>
                <th style={{ padding: '14px 16px' }}>RSVP Status</th>
                <th style={{ padding: '14px 16px' }}>Dietary & Suite Allocation</th>
                <th style={{ padding: '14px 16px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} style={{ padding: '32px', textAlign: 'center', color: '#6B7280' }}>
                    Loading guest directory...
                  </td>
                </tr>
              ) : filteredGuests.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: '36px', textAlign: 'center', color: '#6B7280' }}>
                    No guests found matching the selected filters.
                  </td>
                </tr>
              ) : (
                filteredGuests.map((g) => (
                  <tr
                    key={g.id}
                    style={{
                      borderBottom: '1px solid #F3F4F6',
                      transition: 'background-color 0.15s ease',
                    }}
                  >
                    {/* Guest Name & Contact */}
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontWeight: 700, color: '#111827' }}>{g.guestName}</div>
                      <div style={{ fontSize: '0.78rem', color: '#6B7280', marginTop: '2px' }}>
                        {g.phone} {g.email ? `• ${g.email}` : ''}
                      </div>
                      {g.flightArrival && (
                        <div style={{ fontSize: '0.74rem', color: '#9CA3AF', marginTop: '2px' }}>
                          Arrival: {g.flightArrival}
                        </div>
                      )}
                    </td>

                    {/* Group Tag */}
                    <td style={{ padding: '14px 16px' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          padding: '4px 10px',
                          borderRadius: '12px',
                          backgroundColor:
                            g.groupTag === 'Dignitaries & VIPs'
                              ? 'rgba(212, 175, 55, 0.15)'
                              : g.groupTag === 'Bride Family'
                              ? '#FDF2F8'
                              : g.groupTag === 'Groom Family'
                              ? '#EFF6FF'
                              : '#F3F4F6',
                          color:
                            g.groupTag === 'Dignitaries & VIPs'
                              ? 'var(--color-gold-dark)'
                              : g.groupTag === 'Bride Family'
                              ? '#9D174D'
                              : g.groupTag === 'Groom Family'
                              ? '#1E40AF'
                              : '#374151',
                        }}
                      >
                        {g.groupTag}
                      </span>
                    </td>

                    {/* Headcount */}
                    <td style={{ padding: '14px 16px', fontWeight: 600, color: '#111827' }}>
                      {g.totalAttendees} {g.totalAttendees === 1 ? 'Guest' : 'Guests'}
                    </td>

                    {/* RSVP Status */}
                    <td style={{ padding: '14px 16px' }}>
                      <select
                        value={g.rsvpStatus}
                        onChange={(e) => handleUpdateStatus(g.id, e.target.value as RsvpStatus)}
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          padding: '4px 8px',
                          borderRadius: '6px',
                          border: '1px solid',
                          borderColor:
                            g.rsvpStatus === 'Confirmed'
                              ? '#10B981'
                              : g.rsvpStatus === 'Awaiting Response'
                              ? '#F59E0B'
                              : g.rsvpStatus === 'Tentative'
                              ? '#6B7280'
                              : '#EF4444',
                          backgroundColor:
                            g.rsvpStatus === 'Confirmed'
                              ? '#ECFDF5'
                              : g.rsvpStatus === 'Awaiting Response'
                              ? '#FFFBEB'
                              : g.rsvpStatus === 'Tentative'
                              ? '#F9FAFB'
                              : '#FEF2F2',
                          color:
                            g.rsvpStatus === 'Confirmed'
                              ? '#065F46'
                              : g.rsvpStatus === 'Awaiting Response'
                              ? '#92400E'
                              : g.rsvpStatus === 'Tentative'
                              ? '#374151'
                              : '#991B1B',
                          cursor: 'pointer',
                        }}
                      >
                        <option value="Confirmed">✓ Confirmed</option>
                        <option value="Awaiting Response">⏳ Awaiting</option>
                        <option value="Tentative">~ Tentative</option>
                        <option value="Declined">✕ Declined</option>
                      </select>
                    </td>

                    {/* Dietary & Room Allocation */}
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#374151' }}>
                        <Utensils size={13} color="var(--color-gold-dark)" />
                        <span>{g.dietaryPreference}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#6B7280', marginTop: '3px' }}>
                        <Bed size={13} color="#9CA3AF" />
                        <span>
                          {g.hotelAllocated} {g.roomNumber ? `• Suite ${g.roomNumber}` : '• Suite Pending'}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      <button
                        onClick={() => handleSendReminder(g)}
                        title="Dispatch WhatsApp RSVP Reminder"
                        style={{
                          backgroundColor: '#25D366',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '6px 10px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <MessageSquare size={13} />
                        WhatsApp
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Guest Modal */}
      {showAddModal && (
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
                Add New Wedding Guest
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#9CA3AF' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddGuest} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                  Full Guest Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maharaja Yuvraj Vikramaditya Singh"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                    Phone Number (WhatsApp) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98200 XXXXX"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="guest@domain.com"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                    Guest Group Tag
                  </label>
                  <select
                    value={formGroup}
                    onChange={(e) => setFormGroup(e.target.value as any)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
                  >
                    <option value="Bride Family">Bride Family</option>
                    <option value="Groom Family">Groom Family</option>
                    <option value="Dignitaries & VIPs">Dignitaries & VIPs</option>
                    <option value="Friends & Colleagues">Friends & Colleagues</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                    Party Headcount
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={formAttendees}
                    onChange={(e) => setFormAttendees(Number(e.target.value))}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                    Dietary Requirements
                  </label>
                  <select
                    value={formDiet}
                    onChange={(e) => setFormDiet(e.target.value as DietaryPreference)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
                  >
                    <option value="Pure Vegetarian">Pure Vegetarian</option>
                    <option value="Jain (Strict)">Jain (Strict)</option>
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Gluten-Free">Gluten-Free</option>
                    <option value="Halal">Halal</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                    Allocated Hotel
                  </label>
                  <select
                    value={formHotel}
                    onChange={(e) => setFormHotel(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
                  >
                    <option value="The Oberoi Udaivilas">The Oberoi Udaivilas</option>
                    <option value="Taj Lake Palace">Taj Lake Palace</option>
                    <option value="The Leela Palace Udaipur">The Leela Palace Udaipur</option>
                    <option value="Fateh Prakash Palace">Fateh Prakash Palace</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                  Room / Suite Number (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Royal Lake View Suite #214"
                  value={formRoom}
                  onChange={(e) => setFormRoom(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{ padding: '10px 18px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#FFFFFF', cursor: 'pointer', fontSize: '0.85rem' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-gold"
                  style={{ padding: '10px 22px', fontSize: '0.85rem' }}
                >
                  Save & Dispatch Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
