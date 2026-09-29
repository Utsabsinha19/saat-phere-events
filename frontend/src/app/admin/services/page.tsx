'use client';

import React, { useState, useEffect } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ServiceItem } from '@/types/service';
import { Edit, Check, ExternalLink, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ServicesManagerPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTagline, setEditTagline] = useState('');
  const [editDesc, setEditDesc] = useState('');

  const loadServices = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/services');
      const json = await res.json();
      if (json.success) setServices(json.data);
    } catch (err) {
      console.error('Failed to load services:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleStartEdit = (srv: ServiceItem) => {
    setEditingId(srv.id);
    setEditTagline(srv.tagline);
    setEditDesc(srv.shortDescription);
  };

  const handleSaveEdit = (id: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, tagline: editTagline, shortDescription: editDesc } : s))
    );
    setEditingId(null);
  };

  return (
    <>
      <AdminHeader
        title="Services & Content Editor"
        subtitle="Manage descriptions, taglines, and offerings for all 9 dedicated event service templates"
      />

      <div className="admin-content">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {loading ? (
            <div style={{ padding: '40px', color: '#6B7280' }}>Loading services catalogue...</div>
          ) : (
            services.map((srv, index) => (
              <div
                key={srv.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  padding: '24px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="badge-gold">0{index + 1}</span>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--color-maroon)', fontFamily: 'var(--font-serif)' }}>
                      {srv.title}
                    </h3>
                    <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>({srv.category})</span>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Link
                      href={`/services/${srv.slug}`}
                      target="_blank"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.8rem',
                        color: 'var(--color-maroon)',
                        textDecoration: 'underline',
                      }}
                    >
                      <ExternalLink size={14} />
                      View Public Template
                    </Link>

                    {editingId === srv.id ? (
                      <button
                        onClick={() => handleSaveEdit(srv.id)}
                        className="btn-primary"
                        style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                      >
                        <Check size={14} />
                        Save Changes
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStartEdit(srv)}
                        className="btn-outline"
                        style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                      >
                        <Edit size={14} />
                        Edit Content
                      </button>
                    )}
                  </div>
                </div>

                {editingId === srv.id ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
                    <div>
                      <label className="form-label">Service Subtitle / Tagline</label>
                      <input
                        type="text"
                        className="form-input"
                        value={editTagline}
                        onChange={(e) => setEditTagline(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="form-label">Short Description</label>
                      <textarea
                        rows={2}
                        className="form-textarea"
                        value={editDesc}
                        onChange={(e) => setEditDesc(e.target.value)}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: '0.88rem', fontStyle: 'italic', color: 'var(--color-gold-dark)', marginBottom: '8px' }}>
                      &ldquo;{srv.tagline}&rdquo;
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#4B5563', lineHeight: 1.5 }}>
                      {srv.shortDescription}
                    </p>
                    <div style={{ display: 'flex', gap: '16px', marginTop: '14px', fontSize: '0.8rem', color: '#6B7280' }}>
                      <span>Offerings: <strong>{srv.offerings.length} Modules</strong></span>
                      <span>Process Steps: <strong>{srv.processSteps.length} Stages</strong></span>
                      <span>FAQs: <strong>{srv.faqs.length} Items</strong></span>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
