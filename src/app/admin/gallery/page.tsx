'use client';

import React, { useState, useEffect } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { GalleryMediaItem, GalleryCategory } from '@/types/gallery';
import { Plus, Trash2, Sparkles, MapPin, Play, Image as ImageIcon, X } from 'lucide-react';

const CATEGORIES: GalleryCategory[] = [
  'Mandap Designs',
  'Stage Decors',
  'Floral Styling',
  'Destination Weddings',
  'Haldi / Mehendi',
  'Corporate Events',
];

export default function GalleryManagerPage() {
  const [items, setItems] = useState<GalleryMediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [newItem, setNewItem] = useState({
    title: '',
    category: 'Mandap Designs' as GalleryCategory,
    type: 'image' as 'image' | 'video',
    imageUrl: '',
    videoUrl: '',
    location: '',
    description: '',
  });

  const loadGallery = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/gallery');
      const json = await res.json();
      if (json.success) setItems(json.data);
    } catch (err) {
      console.error('Failed to load gallery:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });

      const json = await res.json();
      if (json.success) {
        setShowUploadModal(false);
        setNewItem({
          title: '',
          category: 'Mandap Designs',
          type: 'image',
          imageUrl: '',
          videoUrl: '',
          location: '',
          description: '',
        });
        loadGallery();
      }
    } catch (err) {
      console.error('Failed to create gallery item:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <AdminHeader
        title="Gallery & Portfolio Manager"
        subtitle="Manage media showcases, category tagging, and video player integrations per PRD Section 4.3"
      />

      <div className="admin-content">
        {/* Toolbar */}
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
            <span style={{ fontWeight: 600, color: '#111827', fontSize: '0.95rem' }}>
              Media Showcase Items ({items.length})
            </span>
            <p style={{ fontSize: '0.78rem', color: '#6B7280' }}>
              All uploaded photos and videos render dynamically in the public portfolio and lightbox.
            </p>
          </div>

          <button
            onClick={() => setShowUploadModal(true)}
            className="btn-gold"
            style={{ padding: '8px 18px', fontSize: '0.85rem' }}
          >
            <Plus size={16} />
            Upload New Media Showcase
          </button>
        </div>

        {/* Gallery Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {loading ? (
            <div style={{ padding: '40px', color: '#6B7280' }}>Loading media catalogue...</div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  overflow: 'hidden',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                }}
              >
                <div style={{ position: 'relative', height: '180px' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                    <span className="badge-gold" style={{ background: 'rgba(0,0,0,0.75)', color: 'var(--color-gold-light)', fontSize: '0.7rem' }}>
                      {item.category}
                    </span>
                  </div>
                  {item.type === 'video' && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-gold)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#121212',
                      }}
                    >
                      <Play size={13} fill="currentColor" />
                    </div>
                  )}
                </div>

                <div style={{ padding: '16px' }}>
                  <h4 style={{ fontSize: '1rem', color: '#111827', fontWeight: 700, marginBottom: '4px' }}>
                    {item.title}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: '#6B7280', marginBottom: '8px' }}>
                    <MapPin size={12} color="var(--color-gold)" />
                    {item.location}
                  </div>
                  {item.description && (
                    <p style={{ fontSize: '0.8rem', color: '#4B5563', lineHeight: 1.4 }}>
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Upload Media Modal */}
      {showUploadModal && (
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
          onClick={() => setShowUploadModal(false)}
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
              onClick={() => setShowUploadModal(false)}
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
              Upload New Showcase Media
            </h3>

            <form onSubmit={handleCreate}>
              <div className="form-group">
                <label className="form-label">Showcase Title *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Royal Lake Palace Sunset Mandap"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Category *</label>
                  <select
                    className="form-select"
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value as GalleryCategory })}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Media Type</label>
                  <select
                    className="form-select"
                    value={newItem.type}
                    onChange={(e) => setNewItem({ ...newItem, type: e.target.value as 'image' | 'video' })}
                  >
                    <option value="image">Photo Showcase</option>
                    <option value="video">Cinematic Video</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Image URL / High-Res Asset *</label>
                <input
                  type="url"
                  required
                  className="form-input"
                  placeholder="https://images.unsplash.com/..."
                  value={newItem.imageUrl}
                  onChange={(e) => setNewItem({ ...newItem, imageUrl: e.target.value })}
                />
              </div>

              {newItem.type === 'video' && (
                <div className="form-group">
                  <label className="form-label">Video Embed URL (YouTube/Vimeo)</label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://www.youtube.com/embed/..."
                    value={newItem.videoUrl}
                    onChange={(e) => setNewItem({ ...newItem, videoUrl: e.target.value })}
                  />
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Venue Location & City</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Rambagh Palace, Jaipur"
                  value={newItem.location}
                  onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description / Scenography Notes</label>
                <textarea
                  rows={2}
                  className="form-textarea"
                  placeholder="Details about flowers, illumination, or production..."
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
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
                  {submitting ? 'Uploading...' : 'Publish to Gallery'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
