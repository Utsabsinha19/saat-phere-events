'use client';

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Sun,
  Users,
  Box,
  Compass,
  CheckCircle2,
  RefreshCw,
  Layers,
  ArrowRight,
  Shield,
  HeartHandshake,
} from 'lucide-react';
import {
  SpatialDecorConcept,
  GuestSeatingTable,
  SolarThermalModel,
} from '@/types/enterprise';
import { SOLAR_SIMULATION_VENUES } from '@/data/enterpriseData';

export const SpatialAiStudio: React.FC = () => {
  // 1. Prompt-to-3D State
  const [prompt, setPrompt] = useState<string>(
    'Royal Rajasthani Mandap with Marigold Suspensions and Velvet Maroon Seating under Sunset Lighting'
  );
  const [concepts, setConcepts] = useState<SpatialDecorConcept[]>([]);
  const [activeConcept, setActiveConcept] = useState<SpatialDecorConcept | null>(null);
  const [generatingConcept, setGeneratingConcept] = useState(false);

  // 2. Seating Matrix State
  const [tables, setTables] = useState<GuestSeatingTable[]>([]);
  const [harmonyScore, setHarmonyScore] = useState<number>(98);
  const [optimizingSeating, setOptimizingSeating] = useState(false);
  const [seatingNotice, setSeatingNotice] = useState<string | null>(null);

  // 3. Solar & Thermal Simulation State
  const [selectedVenue, setSelectedVenue] = useState<string>('jagmandir-udaipur');
  const [timeIndex, setTimeIndex] = useState<number>(2); // default 17:30 Sunset

  useEffect(() => {
    fetchInitialSpatialData();
  }, []);

  const fetchInitialSpatialData = async () => {
    try {
      const [resDecor, resSeating] = await Promise.all([
        fetch('/api/v1/enterprise/spatial/decor'),
        fetch('/api/v1/enterprise/spatial/seating'),
      ]);
      const dataDecor = await resDecor.json();
      const dataSeating = await resSeating.json();

      if (dataDecor.success && dataDecor.concepts.length > 0) {
        setConcepts(dataDecor.concepts);
        setActiveConcept(dataDecor.concepts[0]);
      }
      if (dataSeating.success && dataSeating.tables) {
        setTables(dataSeating.tables);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleGenerateConcept = async (customPrompt?: string) => {
    const textToUse = customPrompt || prompt;
    if (!textToUse) return;
    setGeneratingConcept(true);

    try {
      const res = await fetch('/api/v1/enterprise/spatial/decor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: textToUse }),
      });
      const data = await res.json();
      if (data.success) {
        setConcepts((prev) => [data.concept, ...prev]);
        setActiveConcept(data.concept);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGeneratingConcept(false);
    }
  };

  const handleOptimizeSeating = async () => {
    setOptimizingSeating(true);
    try {
      const res = await fetch('/api/v1/enterprise/spatial/seating', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'optimize' }),
      });
      const data = await res.json();
      if (data.success) {
        setTables(data.tables);
        setHarmonyScore(data.harmonyScore);
        setSeatingNotice(data.summary);
        setTimeout(() => setSeatingNotice(null), 6000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setOptimizingSeating(false);
    }
  };

  const solarDataList = SOLAR_SIMULATION_VENUES[selectedVenue] || SOLAR_SIMULATION_VENUES['jagmandir-udaipur'];
  const currentSolarModel: SolarThermalModel = solarDataList[timeIndex] || solarDataList[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* ================= SECTION 1: PROMPT-TO-3D CONCEPT GENERATOR ================= */}
      <div className="luxury-card" style={{ padding: '32px', backgroundColor: '#FFFFFF' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="badge-gold">Section 2.1 Generative AI Spatial Studio</span>
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-maroon)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Sparkles size={24} color="var(--color-gold)" />
              Generative AI Prompt-to-3D Decor Studio
            </h3>
          </div>
          <span style={{ fontSize: '0.85rem', color: '#6B7280' }}>
            WebGL Procedural Parameters • 3D Scenography Engine
          </span>
        </div>

        <p style={{ fontSize: '0.9rem', color: '#4B5563', lineHeight: 1.6, marginBottom: '20px' }}>
          Describe any bespoke royal mandap or palatial reception vision in natural language. Our spatial Gen-AI model synthesizes structural pillars, botanical cold-chain floral specs, heritage textiles, and lighting coordinates ready for WebXR rendering.
        </p>

        {/* Prompt Input Box */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ position: 'relative' }}>
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Royal Rajasthani Mandap with Marigold Suspensions and Velvet Maroon Seating under Sunset Lighting..."
              style={{
                width: '100%',
                padding: '16px 20px',
                borderRadius: '12px',
                border: '2px solid rgba(212, 175, 55, 0.4)',
                fontSize: '0.95rem',
                color: '#111827',
                fontFamily: 'inherit',
                outline: 'none',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              }}
            />
          </div>

          {/* Quick Preset Prompts */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>
              Royal Presets:
            </span>
            {[
              'Royal Rajasthani Mandap with Marigold Suspensions and Velvet Maroon Seating',
              'Minimalist Crystal Floating Mandap on Lake Pichola with Cascading White Orchids',
              'Mughal Heritage Octagonal Courtyard with Red Rose Chandelier & Antique Torches',
            ].map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setPrompt(preset);
                  handleGenerateConcept(preset);
                }}
                style={{
                  fontSize: '0.75rem',
                  padding: '5px 12px',
                  borderRadius: '20px',
                  border: '1px solid rgba(212, 175, 55, 0.35)',
                  backgroundColor: 'rgba(212, 175, 55, 0.08)',
                  color: 'var(--color-maroon)',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                {preset.split(' ')[0]} {preset.split(' ')[1]} {preset.split(' ')[2]}...
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
          <button
            onClick={() => handleGenerateConcept()}
            disabled={generatingConcept}
            className="btn-gold"
            style={{
              padding: '12px 28px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontWeight: 700,
              fontSize: '0.95rem',
            }}
          >
            {generatingConcept ? (
              <>
                <RefreshCw size={18} className="spin" />
                Synthesizing Spatial 3D Scenography...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Generate Interactive 3D Concept
              </>
            )}
          </button>
        </div>

        {/* Synthesized Concept Display */}
        {activeConcept && (
          <div
            style={{
              borderRadius: '16px',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              backgroundColor: '#FAFAF9',
              padding: '24px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className="badge-maroon" style={{ textTransform: 'uppercase' }}>
                  {activeConcept.themeStyle.replace('_', ' ')}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700 }}>
                  AI Confidence: {Math.round(activeConcept.confidenceScore * 100)}%
                </span>
              </div>

              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--color-maroon)', marginBottom: '8px' }}>
                &ldquo;{activeConcept.prompt}&rdquo;
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginTop: '16px' }}>
                <div style={{ background: '#FFFFFF', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                  <span style={{ fontSize: '0.75rem', color: '#6B7280', display: 'block' }}>Pillars & Staging</span>
                  <strong style={{ fontSize: '0.9rem', color: '#111827' }}>{activeConcept.pillarCount} Monolithic Columns</strong>
                </div>
                <div style={{ background: '#FFFFFF', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                  <span style={{ fontSize: '0.75rem', color: '#6B7280', display: 'block' }}>Textile & Drapes</span>
                  <strong style={{ fontSize: '0.9rem', color: '#111827' }}>{activeConcept.fabricMaterial.replace('_', ' ').toUpperCase()}</strong>
                </div>
                <div style={{ background: '#FFFFFF', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                  <span style={{ fontSize: '0.75rem', color: '#6B7280', display: 'block' }}>Florals</span>
                  <strong style={{ fontSize: '0.85rem', color: '#111827' }}>{activeConcept.floralType}</strong>
                </div>
                <div style={{ background: '#FFFFFF', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                  <span style={{ fontSize: '0.75rem', color: '#6B7280', display: 'block' }}>Estimated Sourcing Budget</span>
                  <strong style={{ fontSize: '0.95rem', color: 'var(--color-gold-dark)' }}>
                    ₹{(activeConcept.estimatedDecorBudget / 100000).toFixed(1)} Lakhs
                  </strong>
                </div>
              </div>
            </div>

            {/* Visual Preview / WebXR Launcher */}
            <div
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                position: 'relative',
                height: '240px',
                background: 'linear-gradient(135deg, #2A0800 0%, #150000 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#FFFFFF',
                textAlign: 'center',
                padding: '20px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              }}
            >
              <Box size={40} color="var(--color-gold)" style={{ marginBottom: '12px' }} />
              <h5 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#FFFDD0', marginBottom: '6px' }}>
                Procedural 3D WebGL Mesh Ready
              </h5>
              <p style={{ fontSize: '0.8rem', color: '#D1D5DB', maxWidth: '280px', marginBottom: '16px' }}>
                Lighting: {activeConcept.lightingScheme.replace('_', ' ')} • Real-time flower physics applied.
              </p>
              <a
                href="/studio"
                className="btn-gold"
                style={{
                  padding: '8px 20px',
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                Launch in 3D WebXR Studio <ArrowRight size={14} />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* ================= SECTION 2: ALGORITHMIC SEATING & VIBE OPTIMIZATION ================= */}
      <div className="luxury-card" style={{ padding: '32px', backgroundColor: '#FFFFFF' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <span className="badge-gold">Section 2.1 Spatial AI Engine</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-maroon)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Users size={24} color="var(--color-gold)" />
              Algorithmic Guest Seating & Vibe Optimization Matrix
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                padding: '8px 16px',
                borderRadius: '12px',
                border: '1px solid rgba(16, 185, 129, 0.3)',
              }}
            >
              <HeartHandshake size={20} color="#10B981" />
              <div>
                <span style={{ fontSize: '0.7rem', color: '#065F46', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>
                  Harmony Vibe Score
                </span>
                <strong style={{ fontSize: '1.1rem', color: '#047857' }}>{harmonyScore}% Optimal</strong>
              </div>
            </div>

            <button
              onClick={handleOptimizeSeating}
              disabled={optimizingSeating}
              className="btn-gold"
              style={{
                padding: '10px 20px',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 700,
              }}
            >
              <Sparkles size={16} />
              {optimizingSeating ? 'Rebalancing Vibe Matrix...' : 'Run AI Vibe Optimization'}
            </button>
          </div>
        </div>

        <p style={{ fontSize: '0.9rem', color: '#4B5563', lineHeight: 1.6, marginBottom: '20px' }}>
          Calculates guest proximity, age group cohesion, dietary segregations (preventing accidental non-veg mixing for strict Jain guests), and optimal waiter banquet routes with zero line-of-sight obstruction to the Sacred Mandap.
        </p>

        {seatingNotice && (
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
            {seatingNotice}
          </div>
        )}

        {/* Visual Seating Tables Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {tables.map((table) => (
            <div
              key={table.id}
              style={{
                padding: '20px',
                borderRadius: '14px',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--color-maroon)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {table.tier}
                  </span>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111827', margin: '2px 0 0' }}>
                    {table.tableName}
                  </h4>
                </div>
                <span
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '8px',
                    backgroundColor: '#ECFDF5',
                    color: '#065F46',
                  }}
                >
                  {table.vibeScore}% Vibe
                </span>
              </div>

              <div style={{ fontSize: '0.8rem', color: '#6B7280', marginBottom: '14px', display: 'flex', gap: '14px' }}>
                <span>Proximity: <strong>{table.proximityToMandap}</strong></span>
                <span>Diet: <strong>{table.dominantDiet}</strong></span>
              </div>

              {/* Guest Badges */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {table.assignedGuests.map((guest) => (
                  <div
                    key={guest.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      backgroundColor: '#F9FAFB',
                      border: '1px solid #E5E7EB',
                      fontSize: '0.8rem',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <strong style={{ color: '#1F2937' }}>{guest.name}</strong>
                        {guest.isVip && (
                          <span style={{ fontSize: '0.65rem', backgroundColor: '#FEF3C7', color: '#92400E', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
                            VIP
                          </span>
                        )}
                      </div>
                      <span style={{ color: '#6B7280', fontSize: '0.75rem' }}>{guest.relationship}</span>
                    </div>

                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        padding: '2px 8px',
                        borderRadius: '6px',
                        backgroundColor:
                          guest.diet === 'Jain Strict'
                            ? '#FEF3C7'
                            : guest.diet === 'Pure Vegetarian'
                            ? '#D1FAE5'
                            : '#F3F4F6',
                        color:
                          guest.diet === 'Jain Strict'
                            ? '#92400E'
                            : guest.diet === 'Pure Vegetarian'
                            ? '#065F46'
                            : '#374151',
                      }}
                    >
                      {guest.diet}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= SECTION 3: SOLAR & THERMAL VENUE SIMULATION ================= */}
      <div className="luxury-card" style={{ padding: '32px', backgroundColor: '#FFFFFF' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <span className="badge-gold">Solar Orientation & Thermal Comfort Model</span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-maroon)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Sun size={24} color="#F59E0B" />
              Destination Venue Solar Path & Thermal Comfort Simulator
            </h3>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151' }}>Destination Venue:</label>
            <select
              value={selectedVenue}
              onChange={(e) => setSelectedVenue(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid #D1D5DB',
                fontSize: '0.85rem',
                color: '#111827',
                fontWeight: 600,
              }}
            >
              <option value="jagmandir-udaipur">Jagmandir Island Palace, Udaipur</option>
              <option value="suryagarh-jaisalmer">Suryagarh Fort, Jaisalmer</option>
              <option value="falaknuma-hyderabad">Taj Falaknuma Palace, Hyderabad</option>
              <option value="umaid-bhawan-jodhpur">Umaid Bhawan Palace, Jodhpur</option>
            </select>
          </div>
        </div>

        <p style={{ fontSize: '0.9rem', color: '#4B5563', lineHeight: 1.6, marginBottom: '20px' }}>
          Models real-time sun azimuth, solar elevation angle, and temperature comfort index across ceremonial courtyards to ensure shade umbrellas during morning Haldi and golden-hour sunset backdrops for the Varmala exchange.
        </p>

        {/* Time of Day Slider */}
        <div
          style={{
            backgroundColor: '#F9FAFB',
            padding: '20px 24px',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            marginBottom: '24px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#374151' }}>
              Ceremony Schedule Timeline (Time of Day):
            </span>
            <span
              style={{
                fontSize: '1rem',
                fontWeight: 800,
                color: 'var(--color-maroon)',
                padding: '4px 12px',
                borderRadius: '8px',
                backgroundColor: 'rgba(212, 175, 55, 0.15)',
              }}
            >
              {currentSolarModel.timeOfDay} HRS
            </span>
          </div>

          <input
            type="range"
            min="0"
            max={solarDataList.length - 1}
            step="1"
            value={timeIndex}
            onChange={(e) => setTimeIndex(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--color-gold)', cursor: 'pointer' }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#6B7280', marginTop: '6px' }}>
            <span>10:00 (Haldi Morning)</span>
            <span>13:00 (Royal Shahi Lunch)</span>
            <span>17:30 (Sunset Varmala)</span>
            <span>20:30 (Pheras & Night Gala)</span>
          </div>
        </div>

        {/* 4-Stat Solar & Thermal Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          <div style={{ padding: '16px', borderRadius: '10px', backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <span style={{ fontSize: '0.75rem', color: '#6B7280', display: 'block' }}>Sun Elevation & Azimuth</span>
            <strong style={{ fontSize: '1.2rem', color: '#111827' }}>
              {currentSolarModel.sunElevationDegrees}° Elev • {currentSolarModel.sunAzimuthDegrees}° Azm
            </strong>
          </div>

          <div style={{ padding: '16px', borderRadius: '10px', backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <span style={{ fontSize: '0.75rem', color: '#6B7280', display: 'block' }}>Solar Lux Intensity</span>
            <strong style={{ fontSize: '1.2rem', color: '#F59E0B' }}>
              {currentSolarModel.luxIntensity.toLocaleString('en-IN')} Lux
            </strong>
          </div>

          <div style={{ padding: '16px', borderRadius: '10px', backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <span style={{ fontSize: '0.75rem', color: '#6B7280', display: 'block' }}>Ambient Temperature</span>
            <strong style={{ fontSize: '1.2rem', color: '#DC2626' }}>
              {currentSolarModel.ambientTempCelsius}°C
            </strong>
          </div>

          <div style={{ padding: '16px', borderRadius: '10px', backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <span style={{ fontSize: '0.75rem', color: '#6B7280', display: 'block' }}>Thermal Comfort Index</span>
            <strong style={{ fontSize: '1.1rem', color: '#059669' }}>
              {currentSolarModel.thermalComfortIndex}
            </strong>
          </div>
        </div>

        {/* Projected Shadow Direction */}
        <div style={{ marginTop: '16px', padding: '12px 18px', borderRadius: '8px', backgroundColor: '#FFFBEB', border: '1px solid #FDE68A', fontSize: '0.85rem', color: '#92400E', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Compass size={18} />
          <span><strong>Projected Shadow & Glare Orientation:</strong> {currentSolarModel.shadowOrientation}</span>
        </div>
      </div>
    </div>
  );
};
