'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Clock,
  Building2,
  DollarSign,
  Smartphone,
  ShieldCheck,
  Radio,
  Layers,
  ChevronRight,
  Users,
} from 'lucide-react';
import { LiveOrchestrator } from '@/components/enterprise/LiveOrchestrator';
import { SpatialAiStudio } from '@/components/enterprise/SpatialAiStudio';
import { NriFintechEngine } from '@/components/enterprise/NriFintechEngine';
import { SmartCheckInCrewHub } from '@/components/enterprise/SmartCheckInCrewHub';
import { FranchiseWhiteLabel } from '@/components/enterprise/FranchiseWhiteLabel';
import { SecurityCompliance } from '@/components/enterprise/SecurityCompliance';

type EnterpriseTab = 'orchestrator' | 'spatial-ai' | 'fintech' | 'checkin-crew' | 'franchise' | 'security';

export default function EnterpriseOperationsPage() {
  const [activeTab, setActiveTab] = useState<EnterpriseTab>('orchestrator');

  const tabs = [
    {
      id: 'orchestrator' as EnterpriseTab,
      label: 'Live AI Orchestrator',
      icon: <Clock size={18} />,
      badge: 'Real-Time Copilot',
    },
    {
      id: 'spatial-ai' as EnterpriseTab,
      label: 'Gen-AI Spatial & Seating',
      icon: <Sparkles size={18} />,
      badge: 'Text-to-3D & Vibe AI',
    },
    {
      id: 'fintech' as EnterpriseTab,
      label: 'NRI Cross-Border Fintech',
      icon: <DollarSign size={18} />,
      badge: 'FX Lock & Multi-State GST',
    },
    {
      id: 'checkin-crew' as EnterpriseTab,
      label: 'Smart IoT & Mobile Crew',
      icon: <Smartphone size={18} />,
      badge: 'QR Check-In & Radio',
    },
    {
      id: 'franchise' as EnterpriseTab,
      label: 'Franchise & Concierge OS',
      icon: <Building2 size={18} />,
      badge: 'Multi-Branch & Referrals',
    },
    {
      id: 'security' as EnterpriseTab,
      label: 'Security & Compliance',
      icon: <ShieldCheck size={18} />,
      badge: 'SOC2 & DPDP Act',
    },
  ];

  return (
    <div style={{ backgroundColor: '#FAF9F6', minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Royal Palatial Enterprise Header */}
      <section
        style={{
          background: 'linear-gradient(135deg, #2A0800 0%, #170300 100%)',
          color: '#FFFFFF',
          padding: '60px 20px 40px 20px',
          borderBottom: '1px solid rgba(212, 175, 55, 0.3)',
        }}
      >
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span
              className="badge-gold"
              style={{
                background: 'rgba(212, 175, 55, 0.25)',
                color: 'var(--color-gold-light)',
                border: '1px solid var(--color-gold)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Radio size={12} className="pulse" />
              Autonomous Global Event Operating System • Phase 3 (v3.0)
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <h1
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  color: '#FFFDD0',
                  margin: '4px 0 8px',
                }}
              >
                Saat Phere Global Enterprise OS
              </h1>
              <p style={{ color: 'var(--color-gold-light)', fontSize: '1rem', maxWidth: '720px', lineHeight: 1.6 }}>
                AI-orchestrated, multi-tenant operations suite powering palatial weddings across Udaipur, Jaipur, Goa, Dubai, and London. Unifying generative spatial layout design, cross-border treasury FX locks, live ceremony delay mitigation, and on-site IoT crew automation.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link
                href="/studio"
                className="btn-gold"
                style={{
                  padding: '10px 20px',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  textDecoration: 'none',
                }}
              >
                <Sparkles size={16} /> 3D WebXR Studio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="container" style={{ maxWidth: '1200px', marginTop: '30px' }}>
        {/* Navigation Tabs Bar */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '10px',
            marginBottom: '30px',
            borderBottom: '2px solid rgba(212, 175, 55, 0.2)',
          }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  borderRadius: '12px 12px 0 0',
                  border: 'none',
                  borderBottom: isActive ? '3px solid var(--color-gold)' : '3px solid transparent',
                  backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                  color: isActive ? 'var(--color-maroon)' : '#6B7280',
                  fontWeight: isActive ? 800 : 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 -4px 12px rgba(0,0,0,0.03)' : 'none',
                }}
              >
                <span style={{ color: isActive ? 'var(--color-gold-dark)' : 'inherit' }}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
                <span
                  style={{
                    fontSize: '0.65rem',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    backgroundColor: isActive ? 'rgba(212, 175, 55, 0.15)' : '#F3F4F6',
                    color: isActive ? 'var(--color-maroon)' : '#9CA3AF',
                    fontWeight: 700,
                  }}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div>
          {activeTab === 'orchestrator' && <LiveOrchestrator />}
          {activeTab === 'spatial-ai' && <SpatialAiStudio />}
          {activeTab === 'fintech' && <NriFintechEngine />}
          {activeTab === 'checkin-crew' && <SmartCheckInCrewHub />}
          {activeTab === 'franchise' && <FranchiseWhiteLabel />}
          {activeTab === 'security' && <SecurityCompliance />}
        </div>
      </div>
    </div>
  );
}
