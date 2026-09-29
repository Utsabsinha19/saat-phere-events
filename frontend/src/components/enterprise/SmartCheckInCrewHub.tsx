'use client';

import React, { useState, useEffect } from 'react';
import {
  QrCode,
  Users,
  Smartphone,
  AlertOctagon,
  CheckCircle2,
  Key,
  Gift,
  Shield,
  Clock,
  Radio,
  Check,
  Send,
  Sparkles,
} from 'lucide-react';
import {
  GuestSmartCheckIn,
  CrewTaskCard,
  EmergencyBroadcast,
} from '@/types/enterprise';

export const SmartCheckInCrewHub: React.FC = () => {
  // 1. Smart Check-In State
  const [guests, setGuests] = useState<GuestSmartCheckIn[]>([]);
  const [scanCodeInput, setScanCodeInput] = useState<string>('SP-JAG-2026-003');
  const [scanning, setScanning] = useState(false);
  const [activeScannedGuest, setActiveScannedGuest] = useState<GuestSmartCheckIn | null>(null);
  const [checkInNotice, setCheckInNotice] = useState<string | null>(null);

  // 2. Mobile Crew Operations State
  const [tasks, setTasks] = useState<CrewTaskCard[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>('All');
  const [broadcasts, setBroadcasts] = useState<EmergencyBroadcast[]>([]);
  const [activeBroadcastNotice, setActiveBroadcastNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [resCheckIn, resCrew] = await Promise.all([
        fetch('/api/v1/enterprise/checkin/scan'),
        fetch('/api/v1/enterprise/crew/tasks'),
      ]);
      const dataCheckIn = await resCheckIn.json();
      const dataCrew = await resCrew.json();

      if (dataCheckIn.success) {
        setGuests(dataCheckIn.guests);
        setActiveScannedGuest(dataCheckIn.guests[0]);
      }
      if (dataCrew.success) {
        setTasks(dataCrew.tasks);
        setBroadcasts(dataCrew.broadcasts);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleScanCode = async (codeToUse?: string) => {
    const code = codeToUse || scanCodeInput;
    if (!code) return;
    setScanning(true);

    try {
      const res = await fetch('/api/v1/enterprise/checkin/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qrCode: code }),
      });
      const data = await res.json();
      if (data.success) {
        setActiveScannedGuest(data.guest);
        setCheckInNotice(data.message);
        setGuests((prev) =>
          prev.map((g) => (g.guestId === data.guest.guestId ? data.guest : g))
        );
        setTimeout(() => setCheckInNotice(null), 5000);
      } else {
        alert(data.error || 'Pass code not recognized');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setScanning(false);
    }
  };

  const handleUpdateTaskStatus = async (taskId: string, newStatus: 'pending' | 'in_progress' | 'completed') => {
    try {
      const res = await fetch('/api/v1/enterprise/crew/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskId,
          status: newStatus,
          supervisorSignOff: newStatus === 'completed',
          supervisorName: 'Kunal Ranawat (Chief Director)',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setTasks((prev) =>
          prev.map((t) => (t.id === taskId ? data.task : t))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleTriggerEmergencyBroadcast = (type: 'weather_alert' | 'vvip_arrival' | 'power_backup') => {
    const newBroadcast: EmergencyBroadcast = {
      id: `bc-live-${Date.now()}`,
      type,
      title:
        type === 'weather_alert'
          ? 'URGENT: Sudden Gust Detected Over Lake Pichola'
          : type === 'vvip_arrival'
          ? 'PRIORITY: Royal VVIP Motorcade at Jetty'
          : 'TECHNICAL: Main Power Switchover to Backup Genset',
      message:
        type === 'weather_alert'
          ? 'Anchor perimeter sheer fabrics and lower cantilever floral garlands by 0.5m.'
          : 'Clear pier 1; cue Shehnai and brass fanfares.',
      targetRoles: ['Event Director', 'Decor Lead', 'Sound & AV Engineer', 'Hospitality & Logistics'],
      issuedAt: new Date().toTimeString().split(' ')[0],
      active: true,
      acknowledgedCount: 18,
    };

    setBroadcasts((prev) => [newBroadcast, ...prev]);
    setActiveBroadcastNotice(`Broadcast dispatched to all on-site crew radios and mobile feeds!`);
    setTimeout(() => setActiveBroadcastNotice(null), 5000);
  };

  const filteredTasks = selectedRole === 'All'
    ? tasks
    : tasks.filter((t) => t.role === selectedRole);

  const activeAlertBroadcast = broadcasts.find((b) => b.active);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      {/* Top Emergency Broadcast Marquee */}
      {activeAlertBroadcast && (
        <div
          style={{
            background: 'linear-gradient(90deg, #991B1B 0%, #7F1D1D 100%)',
            border: '2px solid #EF4444',
            borderRadius: '14px',
            padding: '16px 24px',
            color: '#FFFFFF',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '14px',
            boxShadow: '0 8px 25px rgba(239, 68, 68, 0.3)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <AlertOctagon size={28} className="pulse" color="#FCA5A5" />
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: '#FCA5A5' }}>
                Priority On-Site Radio Broadcast • Issued at {activeAlertBroadcast.issuedAt}
              </span>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '2px 0 0' }}>
                {activeAlertBroadcast.title}
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#FEE2E2', margin: '2px 0 0' }}>
                {activeAlertBroadcast.message}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.8rem', backgroundColor: 'rgba(255,255,255,0.15)', padding: '6px 12px', borderRadius: '6px' }}>
              <strong>{activeAlertBroadcast.acknowledgedCount}</strong> Crew Acknowledged
            </span>
          </div>
        </div>
      )}

      {activeBroadcastNotice && (
        <div style={{ backgroundColor: '#ECFDF5', border: '1px solid #10B981', borderRadius: '8px', padding: '12px 18px', color: '#065F46', fontSize: '0.85rem', fontWeight: 600 }}>
          {activeBroadcastNotice}
        </div>
      )}

      {/* ================= SECTION 4.1: SMART GUEST CHECK-IN & RFID PROTOCOL ================= */}
      <div className="luxury-card" style={{ padding: '32px', backgroundColor: '#FFFFFF' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <span className="badge-gold">Section 4.1 Smart Guest Check-In & RFID Protocol</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-maroon)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <QrCode size={24} color="var(--color-gold)" />
              Smart Digital Pass & RFID Hospitality Check-In
            </h3>
          </div>
          <span style={{ fontSize: '0.85rem', color: '#6B7280' }}>
            Taj Lake Palace & Jagmandir Pier Kiosks
          </span>
        </div>

        <p style={{ fontSize: '0.9rem', color: '#4B5563', lineHeight: 1.6, marginBottom: '20px' }}>
          Guests present digital WhatsApp passes upon arrival at destination lake jetties. Kiosks and hospitality staff scan the QR code to instantly issue room keys, assign luxury welcome hampers, and notify the personal concierge.
        </p>

        {checkInNotice && (
          <div
            style={{
              backgroundColor: '#ECFDF5',
              border: '1px solid #10B981',
              borderRadius: '10px',
              padding: '12px 18px',
              color: '#065F46',
              marginBottom: '20px',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontWeight: 600,
            }}
          >
            <CheckCircle2 size={18} color="#10B981" />
            {checkInNotice}
          </div>
        )}

        {/* Scanner Simulation Bar */}
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            marginBottom: '24px',
          }}
        >
          <div style={{ flex: 1, minWidth: '240px' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', marginBottom: '4px', textTransform: 'uppercase' }}>
              Digital Pass QR Code / RFID Chip ID:
            </label>
            <input
              type="text"
              value={scanCodeInput}
              onChange={(e) => setScanCodeInput(e.target.value)}
              placeholder="e.g. SP-JAG-2026-001"
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #D1D5DB',
                fontSize: '0.9rem',
                fontWeight: 600,
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', paddingTop: '18px' }}>
            <button
              onClick={() => handleScanCode()}
              disabled={scanning}
              className="btn-gold"
              style={{
                padding: '10px 20px',
                fontSize: '0.85rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <QrCode size={16} />
              {scanning ? 'Scanning...' : 'Scan & Validate Pass'}
            </button>

            {/* Quick Demo Pre-fills */}
            <button
              onClick={() => {
                setScanCodeInput('SP-JAG-2026-001');
                handleScanCode('SP-JAG-2026-001');
              }}
              style={{
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #D1D5DB',
                backgroundColor: '#FFFFFF',
                fontSize: '0.8rem',
                cursor: 'pointer',
              }}
            >
              VIP: Gayatri Devi
            </button>
            <button
              onClick={() => {
                setScanCodeInput('SP-JAG-2026-003');
                handleScanCode('SP-JAG-2026-003');
              }}
              style={{
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #D1D5DB',
                backgroundColor: '#FFFFFF',
                fontSize: '0.8rem',
                cursor: 'pointer',
              }}
            >
              VIP: Amb. Rohan Verma
            </button>
          </div>
        </div>

        {/* Active Guest Check-In Dossier */}
        {activeScannedGuest && (
          <div
            style={{
              padding: '24px',
              borderRadius: '14px',
              border: '1px solid rgba(212, 175, 55, 0.35)',
              backgroundColor: 'rgba(212, 175, 55, 0.04)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '20px',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span className="badge-gold">{activeScannedGuest.vipTier}</span>
                <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700 }}>
                  Pass ID: {activeScannedGuest.qrCode}
                </span>
              </div>
              <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-maroon)', margin: '4px 0 2px' }}>
                {activeScannedGuest.fullName}
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#4B5563' }}>
                Allocated Suite: <strong>{activeScannedGuest.assignedSuite}</strong>
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', color: '#374151' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Key size={16} color="var(--color-gold-dark)" />
                <span>Smart RFID Keycard: <strong>{activeScannedGuest.rfidWristbandUid || 'Issued'}</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Gift size={16} color="var(--color-gold-dark)" />
                <span>Luxury Hamper: <strong style={{ color: '#059669' }}>Delivered to Suite</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={16} color="var(--color-gold-dark)" />
                <span>Personal Butler: <strong>{activeScannedGuest.personalButler}</strong></span>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span
                style={{
                  display: 'inline-block',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  backgroundColor: '#D1FAE5',
                  color: '#065F46',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                }}
              >
                ✓ Checked In & Suite Key Active
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ================= SECTION 4.2: MOBILE CREW OPERATIONS & TASK FEEDS ================= */}
      <div className="luxury-card" style={{ padding: '32px', backgroundColor: '#FFFFFF' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <span className="badge-gold">Section 4.2 Cross-Platform Mobile Crew Application</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-maroon)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Smartphone size={24} color="var(--color-gold)" />
              Mobile Crew Operations Center & Digital Sign-Offs
            </h3>
          </div>

          {/* Emergency Broadcast Quick Buttons */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => handleTriggerEmergencyBroadcast('weather_alert')}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                backgroundColor: '#FEE2E2',
                color: '#DC2626',
                border: '1px solid #FCA5A5',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <AlertOctagon size={14} /> Weather Alert
            </button>
            <button
              onClick={() => handleTriggerEmergencyBroadcast('vvip_arrival')}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                backgroundColor: '#FEF3C7',
                color: '#92400E',
                border: '1px solid #FDE68A',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Radio size={14} /> VVIP Arrival
            </button>
          </div>
        </div>

        {/* Role Filter Tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
          {['All', 'Event Director', 'Decor Lead', 'Sound & AV Engineer', 'Hospitality & Logistics', 'Rituals & Puja Lead'].map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: 700,
                border: selectedRole === role ? '2px solid var(--color-gold)' : '1px solid #D1D5DB',
                backgroundColor: selectedRole === role ? 'var(--color-maroon)' : '#F9FAFB',
                color: selectedRole === role ? '#FFFFFF' : '#4B5563',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {role}
            </button>
          ))}
        </div>

        {/* Task Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          {filteredTasks.map((task) => {
            const isDone = task.status === 'completed';
            const inProgress = task.status === 'in_progress';

            return (
              <div
                key={task.id}
                style={{
                  padding: '20px',
                  borderRadius: '12px',
                  border: isDone ? '1px solid #D1FAE5' : '1px solid #E5E7EB',
                  backgroundColor: isDone ? '#F9FAF9' : '#FFFFFF',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--color-maroon)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {task.role}
                  </span>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '6px',
                      backgroundColor: task.priority === 'critical' ? '#FEE2E2' : '#FEF3C7',
                      color: task.priority === 'critical' ? '#DC2626' : '#92400E',
                    }}
                  >
                    {task.priority.toUpperCase()}
                  </span>
                </div>

                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827', marginBottom: '6px' }}>
                  {task.title}
                </h4>

                <div style={{ fontSize: '0.8rem', color: '#6B7280', marginBottom: '14px', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Location: <strong>{task.location}</strong></span>
                  <span>Due: <strong>{task.deadline} HRS</strong></span>
                </div>

                {/* Supervisor Sign-Off Badge */}
                {task.supervisorSignOff && (
                  <div style={{ backgroundColor: '#ECFDF5', padding: '6px 10px', borderRadius: '6px', fontSize: '0.75rem', color: '#065F46', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={14} /> Signed off by {task.supervisorName} at {task.signOffTime}
                  </div>
                )}

                {/* Task Action Buttons */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  {!isDone && (
                    <button
                      onClick={() => handleUpdateTaskStatus(task.id, 'in_progress')}
                      style={{
                        flex: 1,
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: '1px solid #D1D5DB',
                        backgroundColor: inProgress ? '#FEF3C7' : '#FFFFFF',
                        color: inProgress ? '#92400E' : '#374151',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {inProgress ? 'In Progress' : 'Start Task'}
                    </button>
                  )}
                  <button
                    onClick={() => handleUpdateTaskStatus(task.id, 'completed')}
                    disabled={isDone}
                    className="btn-gold"
                    style={{
                      flex: 1,
                      padding: '6px 12px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      opacity: isDone ? 0.6 : 1,
                    }}
                  >
                    {isDone ? '✓ Completed' : 'Sign Off & Complete'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
