'use client';

import React, { useState, useEffect } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { TestimonialItem } from '@/types/testimonial';
import { Star, Plus, CheckCircle, Clock, X, MessageSquare } from 'lucide-react';

export default function TestimonialsManagerPage() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [newReview, setNewReview] = useState({
    clientNames: '',
    eventType: 'Destination Wedding',
    weddingLocation: 'Udaipur, Rajasthan',
    reviewText: '',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    featured: true,
  });

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/testimonials');
      const json = await res.json();
      if (json.success) setTestimonials(json.data);
    } catch (err) {
      console.error('Failed to load testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview),
      });

      const json = await res.json();
      if (json.success) {
        setShowAddModal(false);
        setNewReview({
          clientNames: '',
          eventType: 'Destination Wedding',
          weddingLocation: 'Udaipur, Rajasthan',
          reviewText: '',
          rating: 5,
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          featured: true,
        });
        loadTestimonials();
      }
    } catch (err) {
      console.error('Error adding testimonial:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <AdminHeader
        title="Testimonials Manager"
        subtitle="Approve, feature, and publish verified client reflections per PRD Section 4.3"
      />

      <div className="admin-content">
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
            gap: '12px',
          }}
        >
          <div>
            <span style={{ fontWeight: 600, color: '#111827' }}>
              Client Reviews ({testimonials.length})
            </span>
            <p style={{ fontSize: '0.78rem', color: '#6B7280' }}>
              Approved reviews appear in the dynamic homepage testimonial carousel.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="btn-gold"
            style={{ padding: '8px 18px', fontSize: '0.85rem' }}
          >
            <Plus size={16} />
            Add Verified Review
          </button>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Client Names</th>
                <th>Event Type & Location</th>
                <th>Rating</th>
                <th>Review Excerpt</th>
                <th>Status</th>
                <th>Featured</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '30px' }}>
                    Loading reviews...
                  </td>
                </tr>
              ) : (
                testimonials.map((t) => (
                  <tr key={t.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={t.avatarUrl}
                          alt={t.clientNames}
                          style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <span style={{ fontWeight: 600, color: '#111827' }}>{t.clientNames}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 500 }}>{t.eventType}</div>
                      <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>{t.weddingLocation}</div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '2px' }}>
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} size={14} fill="#D4AF37" color="#D4AF37" />
                        ))}
                      </div>
                    </td>
                    <td style={{ maxWidth: '340px', fontSize: '0.82rem', color: '#4B5563' }}>
                      &ldquo;{t.reviewText.substring(0, 110)}...&rdquo;
                    </td>
                    <td>
                      <span className="status-badge Booked">{t.status}</span>
                    </td>
                    <td>
                      {t.featured ? (
                        <span style={{ color: '#059669', fontWeight: 600, fontSize: '0.78rem' }}>★ Home Featured</span>
                      ) : (
                        <span style={{ color: '#9CA3AF', fontSize: '0.78rem' }}>Standard</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showAddModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setShowAddModal(false)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              maxWidth: '560px',
              width: '100%',
              padding: '28px',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowAddModal(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#9CA3AF',
              }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '1.4rem', color: 'var(--color-maroon)', fontFamily: 'var(--font-serif)', marginBottom: '16px' }}>
              Add Client Review & Feedback
            </h3>

            <form onSubmit={handleAddReview}>
              <div className="form-group">
                <label className="form-label">Client / Couple Names *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Radhika & Anant Ambani"
                  value={newReview.clientNames}
                  onChange={(e) => setNewReview({ ...newReview, clientNames: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Event Category</label>
                  <input
                    type="text"
                    className="form-input"
                    value={newReview.eventType}
                    onChange={(e) => setNewReview({ ...newReview, eventType: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Location / Palace</label>
                  <input
                    type="text"
                    className="form-input"
                    value={newReview.weddingLocation}
                    onChange={(e) => setNewReview({ ...newReview, weddingLocation: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Review Quotation *</label>
                <textarea
                  rows={4}
                  required
                  className="form-textarea"
                  placeholder="Client feedback and praise..."
                  value={newReview.reviewText}
                  onChange={(e) => setNewReview({ ...newReview, reviewText: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn-outline"
                  style={{ color: '#4B5563', borderColor: '#D1D5DB' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary"
                >
                  {submitting ? 'Saving...' : 'Publish Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
