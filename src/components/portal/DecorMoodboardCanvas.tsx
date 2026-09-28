'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Palette,
  Sparkles,
  Check,
  CheckCircle2,
  Box,
  Layers,
  ArrowRight,
  Eye,
  Heart,
  Save,
} from 'lucide-react';

interface ColorPaletteOption {
  id: string;
  name: string;
  theme: string;
  colors: { name: string; hex: string }[];
  description: string;
}

const PALETTES: ColorPaletteOption[] = [
  {
    id: 'rajputana-crimson',
    name: 'Rajputana Crimson & Imperial Gold',
    theme: 'Traditional Palatial & Sacred Vedic Vows',
    colors: [
      { name: 'Deep Royal Crimson', hex: '#800020' },
      { name: 'Champagne Imperial Gold', hex: '#D4AF37' },
      { name: 'Warm Ivory Velvet', hex: '#FFFDD0' },
      { name: 'Antiqued Brass', hex: '#B8860B' },
    ],
    description: 'Evokes the timeless grandeur of Udaipur and Jaipur fortresses with heavy hand-embroidered silks and deep floral arches.',
  },
  {
    id: 'ivory-blush',
    name: 'Lakeside Ivory Pearl & Blush Rose',
    theme: 'Lake Pichola Sunset & Romantic Vows',
    colors: [
      { name: 'Pearl White', hex: '#FDFBF7' },
      { name: 'Blush Kashmiri Rose', hex: '#FBCFE8' },
      { name: 'Soft Muted Gold', hex: '#E5C07B' },
      { name: 'Dusty Rose', hex: '#F43F5E' },
    ],
    description: 'Designed for waterfront afternoon pheras, utilizing translucent silks, floating lotus pools, and European pastel florals.',
  },
  {
    id: 'emerald-saffron',
    name: 'Mughal Courtyard: Emerald & Marigold',
    theme: 'Heritage Mehendi & Vibrant Royal Carnival',
    colors: [
      { name: 'Deep Emerald Velvet', hex: '#064E3B' },
      { name: 'Saffron Marigold', hex: '#F59E0B' },
      { name: 'Sunlit Turmeric', hex: '#FBBF24' },
      { name: 'Muted Gold', hex: '#D4AF37' },
    ],
    description: 'Vibrant and energizing, layered with traditional block prints, zardozi cushions, and fragrant yellow-orange marigold cascades.',
  },
  {
    id: 'nocturnal-navy',
    name: 'Nocturnal Starlight: Midnight Navy & Diamond',
    theme: 'Glamorous Sangeet & Afterparty Spectacle',
    colors: [
      { name: 'Midnight Deep Indigo', hex: '#0F172A' },
      { name: 'Sovereign Royal Blue', hex: '#1E3A8A' },
      { name: 'Champagne Shimmer', hex: '#D4AF37' },
      { name: 'Starlight Silver', hex: '#E2E8F0' },
    ],
    description: 'Sleek contemporary opulence with mirror-finish reflective dance floors, crystal chandeliers, and kinetic light ceilings.',
  },
];

const SCENOGRAPHY_ELEMENTS = [
  { id: 'el-1', name: 'Floating Lotus Pool & Mirror Aisle', category: 'Phera Stage' },
  { id: 'el-2', name: '20,000 Dutch White Carnations & Casablanca Lilies', category: 'Florals' },
  { id: 'el-3', name: 'Scented Mogra (Jasmine) Overhead Cascades', category: 'Aromatics' },
  { id: 'el-4', name: 'Belgian Cut-Crystal Grand Chandeliers', category: 'Lighting' },
  { id: 'el-5', name: 'Handcrafted Hammered Brass Urlis with Rose Petals', category: 'Heritage Decor' },
  { id: 'el-6', name: 'Cold-Spark Non-Hazardous Pyro Pillars', category: 'Special FX' },
  { id: 'el-7', name: 'Silver-Plated Royal Thrones & Velvet Bolsters', category: 'Furniture' },
  { id: 'el-8', name: 'Concealed 2700K Warm Glare-Free Ambient Lighting', category: 'Cinematic' },
];

export const DecorMoodboardCanvas: React.FC = () => {
  const [selectedPalette, setSelectedPalette] = useState<string>('rajputana-crimson');
  const [selectedElements, setSelectedElements] = useState<string[]>([
    'el-1',
    'el-2',
    'el-4',
    'el-5',
    'el-8',
  ]);
  const [designerNotes, setDesignerNotes] = useState(
    'We love the deep crimson backdrop for the main mandap, but want the entrance tunnel to feature heavier jasmine scent and warm fairy lights reflecting off the lake water.'
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  const toggleElement = (id: string) => {
    setSelectedElements((prev) =>
      prev.includes(id) ? prev.filter((el) => el !== id) : [...prev, id]
    );
  };

  const handleSavePreferences = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const activePalette = PALETTES.find((p) => p.id === selectedPalette) || PALETTES[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* 3D Studio Promo Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1A050B 0%, #2D0A14 60%, #4A1220 100%)',
          borderRadius: '12px',
          padding: '28px 32px',
          color: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          border: '1.5px solid var(--color-gold)',
        }}
      >
        <div>
          <span className="badge-gold" style={{ fontSize: '0.75rem', marginBottom: '8px', display: 'inline-block' }}>
            <Sparkles size={13} style={{ display: 'inline', marginRight: '4px' }} />
            Enterprise 3D & WebXR Feature
          </span>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#FFFFFF', marginTop: '4px' }}>
            Interactive 3D / AR Decor Studio
          </h3>
          <p style={{ color: '#E5E7EB', fontSize: '0.88rem', maxWidth: '520px', marginTop: '4px' }}>
            Walk through your Jagmandir Island Palace Mandap in real-time 3D. Switch between Daylight Sunshine, Sunset Golden Hour, and Royal Evening Illumination.
          </p>
        </div>

        <Link
          href="/studio"
          className="btn-gold"
          style={{ padding: '12px 24px', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <Box size={18} />
          Launch 3D Decor Studio
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Palette Selector */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '10px',
          border: '1px solid #E5E7EB',
          padding: '28px',
        }}
      >
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-maroon)' }}>
            Curated Palatial Color Harmonization
          </h4>
          <p style={{ fontSize: '0.85rem', color: '#6B7280' }}>
            Select your preferred color narrative to sync with the floral sourcing team and scenography architects.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          {PALETTES.map((pal) => {
            const isSelected = pal.id === selectedPalette;
            return (
              <div
                key={pal.id}
                onClick={() => setSelectedPalette(pal.id)}
                style={{
                  border: isSelected ? '2px solid var(--color-gold)' : '1px solid #E5E7EB',
                  borderRadius: '10px',
                  padding: '16px',
                  cursor: 'pointer',
                  backgroundColor: isSelected ? '#FDFBF7' : '#FFFFFF',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                }}
              >
                {isSelected && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-gold)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Check size={14} />
                  </div>
                )}

                <div style={{ display: 'flex', gap: '6px', height: '36px', borderRadius: '6px', overflow: 'hidden', marginBottom: '12px' }}>
                  {pal.colors.map((c, i) => (
                    <div
                      key={i}
                      style={{ flex: 1, backgroundColor: c.hex }}
                      title={`${c.name} (${c.hex})`}
                    />
                  ))}
                </div>

                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#111827' }}>
                  {pal.name}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-gold-dark)', fontWeight: 600, marginTop: '2px' }}>
                  {pal.theme}
                </div>
                <p style={{ fontSize: '0.78rem', color: '#6B7280', marginTop: '6px', lineHeight: 1.4 }}>
                  {pal.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Selected Palette Swatch Detail */}
        <div style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '16px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '10px' }}>
            Active Hex Specifications for Master Production:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
            {activePalette.colors.map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
                <span style={{ width: '20px', height: '20px', borderRadius: '4px', backgroundColor: c.hex, border: '1px solid #D1D5DB' }} />
                <span><strong>{c.name}:</strong> <code style={{ backgroundColor: '#FFFFFF', padding: '2px 4px', borderRadius: '3px' }}>{c.hex}</code></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scenography Elements Pinboard */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '10px',
          border: '1px solid #E5E7EB',
          padding: '28px',
        }}
      >
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-maroon)' }}>
            Selected Scenography & Production Accents
          </h4>
          <p style={{ fontSize: '0.85rem', color: '#6B7280' }}>
            Click items to toggle inclusion in the master florist & staging work order.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '12px',
            marginBottom: '24px',
          }}
        >
          {SCENOGRAPHY_ELEMENTS.map((el) => {
            const isIncluded = selectedElements.includes(el.id);
            return (
              <div
                key={el.id}
                onClick={() => toggleElement(el.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: isIncluded ? '1.5px solid var(--color-gold)' : '1px solid #E5E7EB',
                  backgroundColor: isIncluded ? '#FDFBF7' : '#FFFFFF',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '4px',
                    border: isIncluded ? 'none' : '1.5px solid #D1D5DB',
                    backgroundColor: isIncluded ? 'var(--color-gold)' : 'transparent',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {isIncluded && <Check size={14} />}
                </div>

                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: isIncluded ? '#111827' : '#4B5563' }}>
                    {el.name}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-gold-dark)', fontWeight: 500 }}>
                    {el.category}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Notes */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
            Production Designer Notes & Custom Requests:
          </label>
          <textarea
            rows={3}
            value={designerNotes}
            onChange={(e) => setDesignerNotes(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #D1D5DB',
              fontSize: '0.88rem',
              lineHeight: 1.5,
              resize: 'vertical',
            }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
          {savedSuccess ? (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#059669', fontSize: '0.85rem', fontWeight: 600 }}>
              <CheckCircle2 size={16} /> Preferences successfully synced to production crew!
            </span>
          ) : (
            <span style={{ fontSize: '0.78rem', color: '#6B7280' }}>
              Changes will automatically update your 3D Mandap simulation.
            </span>
          )}

          <button
            onClick={handleSavePreferences}
            className="btn-gold"
            style={{ padding: '8px 20px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Save size={15} />
            Save Scenography Preferences
          </button>
        </div>
      </div>
    </div>
  );
};
