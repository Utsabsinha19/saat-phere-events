'use client';

import React from 'react';
import {
  ShieldCheck,
  Lock,
  Server,
  Database,
  Cloud,
  Cpu,
  FileCheck,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export const SecurityCompliance: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      {/* Top Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1E1B4B 0%, #0F172A 100%)',
          border: '1px solid rgba(212, 175, 55, 0.4)',
          borderRadius: '16px',
          padding: '28px',
          color: '#FFFFFF',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="badge-gold">Section 5 Enterprise Data Security & Infrastructure</span>
        </div>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#FFFDD0', margin: '4px 0 6px' }}>
          Global Multi-Cloud Enterprise Architecture & Regulatory Compliance
        </h3>
        <p style={{ fontSize: '0.85rem', color: '#D1D5DB', maxWidth: '700px' }}>
          Engineered for international NRI destination clients and sovereign families with zero-trust network boundaries, AES-256 field encryption, and SOC 2 Type II audit readiness.
        </p>
      </div>

      {/* 4 Compliance Certifications Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        <div className="luxury-card" style={{ padding: '20px', backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <ShieldCheck size={24} color="#10B981" />
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#111827' }}>SOC 2 Type II Ready</h4>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#6B7280', lineHeight: 1.5 }}>
            Continuous security audits across customer data confidentiality, availability, and processing integrity.
          </p>
        </div>

        <div className="luxury-card" style={{ padding: '20px', backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <FileCheck size={24} color="var(--color-gold-dark)" />
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#111827' }}>India DPDP Act 2023</h4>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#6B7280', lineHeight: 1.5 }}>
            Full compliance with India&apos;s Digital Personal Data Protection Act with explicit consent vaults and data principal rights.
          </p>
        </div>

        <div className="luxury-card" style={{ padding: '20px', backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <Lock size={24} color="#3B82F6" />
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#111827' }}>AES-256 Encryption</h4>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#6B7280', lineHeight: 1.5 }}>
            All guest financial records, contracts, and RFID keys are encrypted at rest with AWS KMS managed master keys.
          </p>
        </div>

        <div className="luxury-card" style={{ padding: '20px', backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <Server size={24} color="#8B5CF6" />
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#111827' }}>ISO 27001 Certified</h4>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#6B7280', lineHeight: 1.5 }}>
            Enterprise cloud operations hosted across Tier-4 AWS data centers with 99.99% multi-AZ redundancy.
          </p>
        </div>
      </div>

      {/* Cloud Infrastructure Topology Visualizer */}
      <div className="luxury-card" style={{ padding: '32px', backgroundColor: '#FFFFFF' }}>
        <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-maroon)', marginBottom: '16px' }}>
          Cloud Infrastructure Topology (AWS / Edge)
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {/* Edge & Frontend */}
          <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', color: '#1E40AF' }}>
              <Cloud size={20} />
              <strong style={{ fontSize: '0.95rem' }}>Edge Security & Frontend</strong>
            </div>
            <ul style={{ fontSize: '0.8rem', color: '#4B5563', paddingLeft: '18px', lineHeight: 1.8 }}>
              <li>Cloudflare Enterprise WAF with Layer 7 DDoS mitigation</li>
              <li>Next.js App Router Edge SSR with global Vercel CDN</li>
              <li>Sub-15ms edge caching for high-res palatial assets</li>
              <li>Strict CSP, HSTS & TLS 1.3 cipher suites</li>
            </ul>
          </div>

          {/* Microservices */}
          <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', color: '#7C3AED' }}>
              <Cpu size={20} />
              <strong style={{ fontSize: '0.95rem' }}>Kubernetes EKS Container Cluster</strong>
            </div>
            <ul style={{ fontSize: '0.8rem', color: '#4B5563', paddingLeft: '18px', lineHeight: 1.8 }}>
              <li>Node.js (NestJS) microservices for core event ERP</li>
              <li>Python (FastAPI) worker nodes for AI spatial models</li>
              <li>Redis Enterprise real-time pub/sub for crew sync</li>
              <li>Horizontal pod autoscaling based on venue traffic</li>
            </ul>
          </div>

          {/* Managed Storage Layer */}
          <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', color: '#047857' }}>
              <Database size={20} />
              <strong style={{ fontSize: '0.95rem' }}>Managed Multi-AZ Data Layer</strong>
            </div>
            <ul style={{ fontSize: '0.8rem', color: '#4B5563', paddingLeft: '18px', lineHeight: 1.8 }}>
              <li>PostgreSQL AWS RDS with automated cross-region read replica</li>
              <li>AWS S3 & Cloudflare R2 bucket with object locking</li>
              <li>DocuSign / eSign API vault for wedding contracts</li>
              <li>Meta WhatsApp Cloud API for guest itinerary passes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
