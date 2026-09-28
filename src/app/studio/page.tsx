'use client';

import React, { useState } from 'react';
import { SectionHeading } from '@/components/common/SectionHeading';
import { GoldDivider } from '@/components/common/GoldDivider';
import { MandapCanvas3D, LightingMode, DecorTheme } from '@/components/studio/MandapCanvas3D';
import {
  Sparkles,
  Download,
  Calendar,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Box,
  Eye,
  Sliders,
  Compass,
} from 'lucide-react';

export default function StudioPage() {
  const [selectedTheme, setSelectedTheme] = useState<DecorTheme>('crimson-gold');
  const [selectedLighting, setSelectedLighting] = useState<LightingMode>('royal-evening');
  const [savedConceptNotice, setSavedConceptNotice] = useState<string | null>(null);

  const handleConceptSaved = (summary: { theme: DecorTheme; lighting: LightingMode }) => {
    setSelectedTheme(summary.theme);
    setSelectedLighting(summary.lighting);
    setSavedConceptNotice(`Saved concept: ${summary.theme} under ${summary.lighting} illumination!`);
    setTimeout(() => setSavedConceptNotice(null), 4000);
  };

  const handleDownloadBlueprint = () => {
    const blueprintText = `========================================================================
SAAT PHERE LUXURY ATELIER • 3D SCENOGRAPHY SPECIFICATION BLUEPRINT
Document Ref: SPE-3D-MANDAP-2026-UDZ
Venue: Jagmandir Island Palace Courtyard, Udaipur
Theme: ${selectedTheme.toUpperCase()}
Lighting Simulation: ${selectedLighting.toUpperCase()}
========================================================================

STRUCTURAL & SPATIAL PARAMETERS:
- Elevated Makrana White Marble Stage: 5.5m Radius, 0.4m Elevation
- Palatial Carved Columns: 4.2m Height, Triple-pedestal Gold Capitals
- Symmetrical Cantilevered Silk Canopy with 0.6m Heritage Gold Finial Kalash
- Central Copper Havan Kund with Glare-Shielded Flame Enclosure
- Sovereign Diwan Seating: 2 Ergonomic Velvet Thrones with Zardozi Bolsters

FLORAL & COLD-CHAIN SOURCING:
- Primary Florals: 20,000 Dutch White Carnations & Casablanca Lilies
- Overhead Cascades: Fresh Hand-Strung Madurai Mogra (Jasmine) Canopies
- Cold-Chain Transit: 4°C Temperature-Regulated Logistics from Delhi Airport
- Water Reservoir: 8 Hand-Hammered Antique Brass Urlis with Lotus Blooms

CINEMATOGRAPHIC & ACOUSTIC SPECIFICATIONS:
- 2700K Concealed Warm Anti-Glare LED Strips integrated into column bases
- Zero Spillover Lighting to ensure 8K Cine Cameras capture pure skin tones
- Directional Audio Rig: ASI Heritage Monument Non-Vibrational Sound Mounts
- Decibel Level Compliance: Strictly adhered to local 10:00 PM Palace guidelines

========================================================================
Produced by Saat Phere Scenography & Architecture Atelier
Senior Managing Director: Vikramaditya Rathore
========================================================================`;

    const blob = new Blob([blueprintText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SaatPhere_3D_Mandap_Blueprint_${selectedTheme}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ paddingBottom: '90px' }}>
      {/* Header Banner */}
      <section
        style={{
          background: 'var(--gradient-royal-overlay), url("https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF',
          padding: '80px 20px 50px 20px',
        }}
      >
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge-gold" style={{ background: 'rgba(212, 175, 55, 0.25)', color: 'var(--color-gold-light)' }}>
              Interactive 3D / WebXR Scenography Studio
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', color: '#FFFFFF', marginBottom: '6px' }}>
                3D Mandap & Palatial Decor Studio
              </h1>
              <p style={{ color: 'var(--color-gold-light)', fontSize: '1.05rem', maxWidth: '640px' }}>
                Experience your lakeside wedding stage in real-time 3D. Orbit around the lotus pavilion, switch lighting from Daylight to Royal Evening, and customize floral palettes.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleDownloadBlueprint}
                className="btn-gold"
                style={{ padding: '10px 20px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Download size={16} />
                Download 3D Blueprint PDF
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Studio Workspace */}
      <div className="container" style={{ maxWidth: '1100px', marginTop: '36px' }}>
        {savedConceptNotice && (
          <div
            style={{
              backgroundColor: '#ECFDF5',
              border: '1px solid #10B981',
              borderRadius: '8px',
              padding: '12px 20px',
              marginBottom: '20px',
              color: '#065F46',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '0.9rem',
              fontWeight: 600,
            }}
          >
            <CheckCircle2 size={18} />
            {savedConceptNotice}
          </div>
        )}

        {/* 3D Canvas Box */}
        <div style={{ marginBottom: '32px' }}>
          <MandapCanvas3D onSaveConcept={handleConceptSaved} />
        </div>

        {/* Technical Rider & Production Specifications */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {/* Spatial Architecture */}
          <div className="luxury-card" style={{ padding: '28px', backgroundColor: '#FFFFFF' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'rgba(212, 175, 55, 0.15)', color: 'var(--color-gold-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box size={20} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#111827' }}>
                Spatial Geometry & Staging
              </h3>
            </div>
            <ul style={{ fontSize: '0.85rem', color: '#4B5563', lineHeight: 1.8, paddingLeft: '18px' }}>
              <li><strong>5.5m Makrana Marble Platform:</strong> Beveled gold finish with non-slip ritual surface.</li>
              <li><strong>4 Heritage Pillars:</strong> 4.2m monolithic columns with spiral floral garlands.</li>
              <li><strong>Mughal Kalash Finial:</strong> Triple-gilt brass dome apex anchoring the royal canopy.</li>
              <li><strong>Sacred Copper Havan Kund:</strong> Concealed smoke-suppression and safety ventilation.</li>
            </ul>
          </div>

          {/* Sourcing & Lighting */}
          <div className="luxury-card" style={{ padding: '28px', backgroundColor: '#FFFFFF' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#FDF2F8', color: '#9D174D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={20} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#111827' }}>
                Botanicals & Cinematography
              </h3>
            </div>
            <ul style={{ fontSize: '0.85rem', color: '#4B5563', lineHeight: 1.8, paddingLeft: '18px' }}>
              <li><strong>Cold-Chain Florals:</strong> 20,000 Dutch White Carnations kept at 4°C until ceremony.</li>
              <li><strong>Aromatic Canopies:</strong> Scented Indian Mogra (Jasmine) overhead garlands.</li>
              <li><strong>2700K Glare-Free Ambient:</strong> Engineered to eliminate harsh camera reflection.</li>
              <li><strong>ASI Heritage Protected:</strong> Zero drilling or structural stress on palace masonry.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
