'use client';

import React, { useState, useEffect } from 'react';
import {
  Clock,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Zap,
  Radio,
  Sparkles,
  Users,
  Check,
} from 'lucide-react';
import { EventCheckpoint, DynamicCrewAlert } from '@/types/enterprise';

export const LiveOrchestrator: React.FC = () => {
  const [checkpoints, setCheckpoints] = useState<EventCheckpoint[]>([]);
  const [alerts, setAlerts] = useState<DynamicCrewAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCheckpointId, setSelectedCheckpointId] = useState<string>('chk-02');
  const [delayInput, setDelayInput] = useState<number>(30);
  const [delayReason, setDelayReason] = useState<string>('Royal vintage car procession delayed by lakefront crowd');
  const [mitigating, setMitigating] = useState(false);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/v1/enterprise/orchestrator');
      const data = await res.json();
      if (data.success) {
        setCheckpoints(data.checkpoints);
        setAlerts(data.alerts);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleInjectDelay = async () => {
    if (!selectedCheckpointId || !delayInput) return;
    setMitigating(true);

    try {
      const res = await fetch('/api/v1/enterprise/orchestrator/delay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          checkpointId: selectedCheckpointId,
          delayMinutes: delayInput,
          reason: delayReason,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccessNotice(data.message);
        fetchData();
        setTimeout(() => setSuccessNotice(null), 5000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setMitigating(false);
    }
  };

  const handleResolveAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, resolved: true } : a))
    );
  };

  if (loading) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', color: 'var(--color-maroon)' }}>
        <Clock className="spin" size={32} style={{ margin: '0 auto 12px' }} />
        <p>Connecting to Live Event AI Orchestrator Node...</p>
      </div>
    );
  }

  const activeCheckpoint = checkpoints.find((c) => c.id === selectedCheckpointId) || checkpoints[1];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      {/* Top Banner Alert / Status */}
      <div
        style={{
          background: 'linear-gradient(135deg, #2A0800 0%, #1A0500 100%)',
          border: '1px solid rgba(212, 175, 55, 0.4)',
          borderRadius: '16px',
          padding: '24px 28px',
          color: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'rgba(212, 175, 55, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-gold)',
            }}
          >
            <Radio size={24} className="pulse" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  display: 'inline-block',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#10B981',
                }}
              />
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--color-gold)' }}>
                Live Event AI Copilot • Active Session
              </span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#FFFDD0', margin: '4px 0 2px' }}>
              Singhania & Rao Royal Wedding • Jagmandir Island, Udaipur
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#D1D5DB' }}>
              Automated Checkpoints Tracking, Kitchen Plating Sync & Dynamic Crew Dispatch
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              padding: '10px 18px',
              borderRadius: '10px',
              border: '1px solid rgba(212, 175, 55, 0.25)',
              textAlign: 'center',
            }}
          >
            <span style={{ fontSize: '0.75rem', color: '#9CA3AF', display: 'block' }}>Active Guests</span>
            <strong style={{ fontSize: '1.2rem', color: 'var(--color-gold)' }}>485 / 500</strong>
          </div>
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              padding: '10px 18px',
              borderRadius: '10px',
              border: '1px solid rgba(212, 175, 55, 0.25)',
              textAlign: 'center',
            }}
          >
            <span style={{ fontSize: '0.75rem', color: '#9CA3AF', display: 'block' }}>Timeline Variance</span>
            <strong style={{ fontSize: '1.2rem', color: '#F59E0B' }}>+40m (Mitigated)</strong>
          </div>
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

      {/* Main 2-Column Grid: Timeline Checkpoints vs Predictive Delay Mitigation */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        {/* Left: Ceremony Checkpoints Feed */}
        <div className="luxury-card" style={{ padding: '28px', backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-maroon)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={20} color="var(--color-gold)" />
              Ceremony Checkpoints Feed
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>Updated 30s ago</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {checkpoints.map((cp) => {
              const isSelected = cp.id === selectedCheckpointId;
              const isCompleted = cp.status === 'completed';
              const isDelayed = cp.status === 'delayed';
              const isInProgress = cp.status === 'in_progress';

              return (
                <div
                  key={cp.id}
                  onClick={() => setSelectedCheckpointId(cp.id)}
                  style={{
                    padding: '16px 20px',
                    borderRadius: '12px',
                    border: isSelected
                      ? '2px solid var(--color-gold)'
                      : '1px solid rgba(0,0,0,0.08)',
                    backgroundColor: isSelected
                      ? 'rgba(212, 175, 55, 0.06)'
                      : isCompleted
                      ? '#F9FAFB'
                      : isDelayed
                      ? '#FFFBEB'
                      : '#FFFFFF',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span
                        style={{
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '6px',
                          backgroundColor: isCompleted
                            ? '#D1FAE5'
                            : isDelayed
                            ? '#FEF3C7'
                            : isInProgress
                            ? '#E0E7FF'
                            : '#F3F4F6',
                          color: isCompleted
                            ? '#065F46'
                            : isDelayed
                            ? '#92400E'
                            : isInProgress
                            ? '#3730A3'
                            : '#4B5563',
                        }}
                      >
                        {cp.scheduledTime}
                      </span>
                      <strong style={{ fontSize: '0.95rem', color: '#111827' }}>
                        {cp.ceremonyName}
                      </strong>
                    </div>

                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        padding: '2px 8px',
                        borderRadius: '12px',
                        textTransform: 'uppercase',
                        backgroundColor: isDelayed ? '#FEE2E2' : '#F3F4F6',
                        color: isDelayed ? '#DC2626' : '#6B7280',
                      }}
                    >
                      {cp.status}
                      {cp.delayMinutes > 0 && ` (+${cp.delayMinutes}m)`}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#6B7280', marginTop: '8px' }}>
                    <span>Lead: <strong>{cp.leadStakeholder}</strong></span>
                    {cp.downstreamImpacts.length > 0 && (
                      <span style={{ color: '#D97706', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Zap size={14} /> {cp.downstreamImpacts.length} AI Mitigations
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Predictive Delay Mitigation Simulator */}
        <div className="luxury-card" style={{ padding: '28px', backgroundColor: '#FFFFFF' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-maroon)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldAlert size={20} color="var(--color-gold)" />
            Predictive Delay Mitigation Copilot
          </h3>

          <p style={{ fontSize: '0.85rem', color: '#4B5563', lineHeight: 1.6, marginBottom: '20px' }}>
            When a ritual or procession encounters an on-site delay, the AI Copilot automatically recalibrates downstream kitchen food temperature holds, sound engineering cues, and artist stage entries to prevent cold buffets or awkward pauses.
          </p>

          <div
            style={{
              backgroundColor: 'rgba(212, 175, 55, 0.08)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              borderRadius: '12px',
              padding: '16px 20px',
              marginBottom: '20px',
            }}
          >
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-gold-dark)', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
              Selected Checkpoint
            </span>
            <strong style={{ fontSize: '1rem', color: 'var(--color-maroon)' }}>
              {activeCheckpoint.ceremonyName}
            </strong>
            <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', color: '#6B7280', marginTop: '6px' }}>
              <span>Scheduled: <strong>{activeCheckpoint.scheduledTime}</strong></span>
              <span>Current Delay: <strong style={{ color: '#DC2626' }}>+{activeCheckpoint.delayMinutes} mins</strong></span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                Simulate Additional Delay (Minutes):
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <input
                  type="range"
                  min="5"
                  max="90"
                  step="5"
                  value={delayInput}
                  onChange={(e) => setDelayInput(Number(e.target.value))}
                  style={{ flex: 1, accentColor: 'var(--color-gold)' }}
                />
                <span
                  style={{
                    minWidth: '60px',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    backgroundColor: '#FEF3C7',
                    color: '#92400E',
                    fontWeight: 700,
                    textAlign: 'center',
                    fontSize: '0.9rem',
                  }}
                >
                  +{delayInput}m
                </span>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                On-Site Cause / Notes:
              </label>
              <input
                type="text"
                value={delayReason}
                onChange={(e) => setDelayReason(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #D1D5DB',
                  fontSize: '0.85rem',
                }}
              />
            </div>
          </div>

          <button
            onClick={handleInjectDelay}
            disabled={mitigating}
            className="btn-gold"
            style={{
              width: '100%',
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontWeight: 700,
            }}
          >
            {mitigating ? (
              'Synthesizing Downstream Mitigations...'
            ) : (
              <>
                <Sparkles size={18} />
                Recalibrate Timeline & Dispatch Crew Alerts
              </>
            )}
          </button>

          {/* Active Downstream Mitigations */}
          <div style={{ marginTop: '24px' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827', marginBottom: '10px' }}>
              Active AI Downstream Mitigations:
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {activeCheckpoint.downstreamImpacts.map((impact, idx) => (
                <div
                  key={idx}
                  style={{
                    fontSize: '0.8rem',
                    color: '#374151',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    backgroundColor: '#F9FAFB',
                    borderLeft: '3px solid var(--color-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <ArrowRight size={14} color="var(--color-gold)" style={{ flexShrink: 0 }} />
                  {impact}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Crew Bottleneck Dispatch Alerts */}
      <div className="luxury-card" style={{ padding: '28px', backgroundColor: '#FFFFFF' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-maroon)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={20} color="var(--color-gold)" />
            Dynamic Crew Dispatch & Bottleneck Threshold Alerts
          </h3>
          <span className="badge-gold">IoT Sensor Telemetry</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          {alerts.map((alert) => (
            <div
              key={alert.id}
              style={{
                padding: '18px 20px',
                borderRadius: '12px',
                border: alert.resolved ? '1px solid #E5E7EB' : '1px solid #F59E0B',
                backgroundColor: alert.resolved ? '#F9FAFB' : '#FFFDF5',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '6px',
                    backgroundColor: alert.severity === 'critical' ? '#FEE2E2' : '#FEF3C7',
                    color: alert.severity === 'critical' ? '#DC2626' : '#92400E',
                  }}
                >
                  {alert.zone} • {alert.severity.toUpperCase()}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{alert.timestamp}</span>
              </div>

              <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#111827', marginBottom: '6px' }}>
                {alert.metric}
              </h4>
              <p style={{ fontSize: '0.8rem', color: '#4B5563', marginBottom: '12px' }}>
                {alert.recommendedAction}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                  Dispatched Personnel: <strong>{alert.dispatchedStaffCount} Marshals</strong>
                </span>

                {alert.resolved ? (
                  <span style={{ fontSize: '0.75rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                    <Check size={14} /> Resolved
                  </span>
                ) : (
                  <button
                    onClick={() => handleResolveAlert(alert.id)}
                    style={{
                      padding: '4px 12px',
                      borderRadius: '6px',
                      border: '1px solid #D1D5DB',
                      backgroundColor: '#FFFFFF',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Acknowledge Resolution
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
