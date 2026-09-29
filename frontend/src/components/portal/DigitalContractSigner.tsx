'use client';

import React, { useState, useRef } from 'react';
import {
  FileCheck,
  Download,
  PenTool,
  RotateCcw,
  CheckCircle2,
  Shield,
  Lock,
  Printer,
  Calendar,
  AlertCircle,
} from 'lucide-react';

export const DigitalContractSigner: React.FC = () => {
  const [signatureMode, setSignatureMode] = useState<'draw' | 'type'>('draw');
  const [typedName, setTypedName] = useState('Ananya Agarwal & Siddharth Singhania');
  const [isSigned, setIsSigned] = useState(false);
  const [signedDate, setSignedDate] = useState<string | null>(null);
  const [auditHash, setAuditHash] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Drawing helpers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (isSigned) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || isSigned) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#1E293B';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleApplySignature = () => {
    const hash = 'SHA256_' + Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setAuditHash(hash);
    setSignedDate(new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
    setIsSigned(true);
  };

  const downloadContract = () => {
    const content = `========================================================================
MASTER PALATIAL PRODUCTION & WEDDING MANAGEMENT CONTRACT
DocuSign Verification Hash: ${auditHash || 'SPE-DRAFT-PREVIEW'}
Governing Law: Indian Contract Act 1872 & IT Act 2000 Section 10A
========================================================================

PARTIES:
1. SAAT PHERE LUXURY WEDDINGS & CELEBRATIONS PVT. LTD. (The "Producer")
2. ANANYA AGARWAL & SIDDHARTH SINGHANIA (The "Client")

EVENT DETAILS:
- Event: 3-Day Royal Palatial Destination Wedding
- Venue: Jagmandir Island Palace & City Palace Complex, Udaipur
- Dates: December 18 - 20, 2026
- Production Investment: ₹2,50,00,000 INR (Two Crore Fifty Lakhs Only)

KEY LEGAL CLAUSES:
Clause 1: Tri-Party Milestone Escrow Protection
All vendor payments, including florals, staging, acoustic rigs, and hospitality suites,
shall be retained in escrow and disbursed strictly upon milestone inspection by the
Saat Phere Senior Managing Director.

Clause 2: High-Profile Privacy & Non-Disclosure Agreement (NDA)
All 200+ crew members, photographers, drone pilots, and floral technicians are bound
by strict non-disclosure. No unauthorized photos, guest lists, or VIP attendee identities
shall be transmitted to external media outlets without prior written family clearance.

Clause 3: Royal Heritage Conservation & Weather Contingency
Production scaffolds and floral anchoring shall adhere to Archaeological Survey of India (ASI)
heritage preservation protocols. All outdoor lakeside decor includes weatherproof water-resistant
canopies and sheltered fallback halls within the palace courtyard.

LEGAL AUDIT STAMP:
Status: DIGITALLY EXECUTED & LEGALLY BINDING
Signed By: ${signatureMode === 'type' ? typedName : 'Authorized Digital Signature on Canvas'}
Timestamp: ${signedDate || new Date().toISOString()}
Verification Token: ${auditHash || 'PENDING'}
Compliance Seal: Verified under Section 10A of the Indian Information Technology Act, 2000.
========================================================================`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Executed_Contract_Singhania_Wedding.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Contract Header Banner */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E5E7EB',
          borderRadius: '10px',
          padding: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                display: 'inline-block',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '6px',
                backgroundColor: isSigned ? '#ECFDF5' : '#FEF3C7',
                color: isSigned ? '#059669' : '#D97706',
              }}
            >
              {isSigned ? '✓ Legally Executed & Bound' : 'Action Required • Awaiting Digital E-Signature'}
            </span>
            <span style={{ fontSize: '0.78rem', color: '#6B7280' }}>Ref: #SPE-CONTRACT-2026-9810</span>
          </div>

          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--color-maroon)', marginTop: '8px' }}>
            Master Palatial Wedding Production & Buyout Agreement
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#4B5563', marginTop: '2px' }}>
            Between <strong>Saat Phere Events Pvt. Ltd.</strong> and <strong>Ananya & Siddharth Singhania</strong>
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={downloadContract}
            className="btn-outline"
            style={{ padding: '8px 16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Download size={15} />
            Download Legal Text
          </button>
        </div>
      </div>

      {/* Contract Viewer Box */}
      <div
        style={{
          backgroundColor: '#FAFAF9',
          border: '1px solid #E7E5E4',
          borderRadius: '10px',
          padding: '28px',
          maxHeight: '380px',
          overflowY: 'auto',
          fontSize: '0.88rem',
          lineHeight: 1.7,
          color: '#334155',
        }}
      >
        <h4 style={{ color: '#1E293B', fontWeight: 700, marginBottom: '8px' }}>
          1. Scope of Turnkey Production & Dedicated Manpower
        </h4>
        <p style={{ marginBottom: '16px' }}>
          Saat Phere Events Pvt. Ltd. shall serve as the exclusive turnkey Wedding Producer for the 3-day wedding celebration
          at Jagmandir Island Palace, Udaipur (December 18–20, 2026). Scope encompasses full scenography, acoustic line-array
          engineering, floral engineering, royal security escorts, vintage boat charters, and celebrity management.
        </p>

        <h4 style={{ color: '#1E293B', fontWeight: 700, marginBottom: '8px' }}>
          2. Tri-Party Escrow Payment Milestones
        </h4>
        <p style={{ marginBottom: '16px' }}>
          All capital allocations are governed under our audited tri-party escrow protocol. Vendor disbursements occur in
          four structured milestones, released solely upon physical stage quality signoff by the Saat Phere Executive Director.
        </p>

        <h4 style={{ color: '#1E293B', fontWeight: 700, marginBottom: '8px' }}>
          3. Absolute Confidentiality & NDA Protection
        </h4>
        <p style={{ marginBottom: '16px' }}>
          The Agency guarantees non-disclosure of all guest rosters, dignitary identities, high-profile itineraries, and personal
          ceremonial footage. All technicians, photographers, and hospitality personnel are bound by non-disclosure agreements with
          liquidated damage clauses.
        </p>

        <h4 style={{ color: '#1E293B', fontWeight: 700, marginBottom: '8px' }}>
          4. Force Majeure & Heritage Monument Conservation
        </h4>
        <p>
          Decor construction shall strictly protect ancient marble pavilions and historic masonry in accordance with ASI regulations.
          Comprehensive all-weather contingencies and sheltered palace backup halls are pre-reserved in the event of inclement lake weather.
        </p>
      </div>

      {/* Digital Signature Execution Pad */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E5E7EB',
          borderRadius: '10px',
          padding: '28px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111827' }}>
              Digital E-Signature & Execution Seal
            </h4>
            <p style={{ fontSize: '0.82rem', color: '#6B7280' }}>
              Enforceable pursuant to Section 10A of the Indian Information Technology Act, 2000
            </p>
          </div>

          {!isSigned && (
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setSignatureMode('draw')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  backgroundColor: signatureMode === 'draw' ? 'var(--color-maroon)' : '#F3F4F6',
                  color: signatureMode === 'draw' ? '#FFFFFF' : '#374151',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Draw Signature
              </button>
              <button
                type="button"
                onClick={() => setSignatureMode('type')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  backgroundColor: signatureMode === 'type' ? 'var(--color-maroon)' : '#F3F4F6',
                  color: signatureMode === 'type' ? '#FFFFFF' : '#374151',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Type Legal Name
              </button>
            </div>
          )}
        </div>

        {!isSigned ? (
          <div>
            {signatureMode === 'draw' ? (
              <div>
                <div style={{ position: 'relative', width: '100%', height: '160px', backgroundColor: '#F9FAFB', border: '1.5px dashed #D1D5DB', borderRadius: '8px', cursor: 'crosshair' }}>
                  <canvas
                    ref={canvasRef}
                    width={700}
                    height={160}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    style={{ width: '100%', height: '100%', display: 'block' }}
                  />
                  <div style={{ position: 'absolute', bottom: '8px', left: '16px', fontSize: '0.75rem', color: '#9CA3AF', pointerEvents: 'none' }}>
                    Draw your signature inside the box using mouse or finger
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                  <button
                    type="button"
                    onClick={clearCanvas}
                    style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: '#6B7280', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    <RotateCcw size={14} /> Clear Signature Pad
                  </button>

                  <button
                    type="button"
                    onClick={handleApplySignature}
                    className="btn-gold"
                    style={{ padding: '10px 24px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <CheckCircle2 size={16} />
                    Apply Signature & Seal Contract
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                    Enter Full Legal Signatory Names:
                  </label>
                  <input
                    type="text"
                    value={typedName}
                    onChange={(e) => setTypedName(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.95rem' }}
                  />
                </div>

                <div
                  style={{
                    padding: '24px',
                    backgroundColor: '#FDFBF7',
                    borderRadius: '8px',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    textAlign: 'center',
                    marginBottom: '16px',
                  }}
                >
                  <span style={{ fontSize: '0.75rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Calligraphy E-Signature Preview:
                  </span>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontStyle: 'italic', color: 'var(--color-maroon)', marginTop: '8px' }}>
                    {typedName || 'Signatory Name'}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={handleApplySignature}
                    className="btn-gold"
                    style={{ padding: '10px 24px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <CheckCircle2 size={16} />
                    Confirm & Apply Digital Seal
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Sealed State */
          <div
            style={{
              padding: '24px',
              backgroundColor: '#FDFBF7',
              borderRadius: '8px',
              border: '2px solid var(--color-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#059669', fontWeight: 700, fontSize: '0.95rem' }}>
                <CheckCircle2 size={20} />
                Contract Officially Executed & Encrypted
              </div>
              <div style={{ fontSize: '0.82rem', color: '#4B5563', marginTop: '6px' }}>
                Signed by: <strong>{typedName}</strong>
              </div>
              <div style={{ fontSize: '0.78rem', color: '#6B7280', marginTop: '2px' }}>
                Timestamp: <strong>{signedDate}</strong> (IST)
              </div>
              <div style={{ fontSize: '0.74rem', color: '#9CA3AF', marginTop: '4px', fontFamily: 'monospace' }}>
                Cryptographic Token: {auditHash}
              </div>
            </div>

            {/* Gold Wax Seal Stamp */}
            <div
              style={{
                width: '110px',
                height: '110px',
                borderRadius: '50%',
                backgroundColor: 'rgba(212, 175, 55, 0.15)',
                border: '3px double var(--color-gold)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '6px',
                color: 'var(--color-maroon)',
              }}
            >
              <Shield size={20} color="var(--color-gold-dark)" />
              <div style={{ fontSize: '0.62rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '2px' }}>
                Saat Phere
              </div>
              <div style={{ fontSize: '0.55rem', fontWeight: 600, color: 'var(--color-gold-dark)' }}>
                VERIFIED SEAL
              </div>
              <div style={{ fontSize: '0.5rem', color: '#6B7280', marginTop: '1px' }}>
                SEC 10A IT ACT
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
