'use client';

import React, { useState, useEffect } from 'react';
import { BranchItem } from '@/types/branch';
import {
  Building2,
  MapPin,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Phone,
  Mail,
  Box,
  Truck,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface WarehouseStock {
  itemName: string;
  category: string;
  qty: number;
  condition: 'Mint / Showroom' | 'De-rigged & Inspected' | 'Deployed on Stage';
}

const REGIONAL_INVENTORY: Record<string, WarehouseStock[]> = {
  'br-katihar': [
    { itemName: 'Mughal Sheesh Mahal Mirror Arches', category: 'Mandap Structures', qty: 6, condition: 'Mint / Showroom' },
    { itemName: 'Hand-Hammered Antique Brass Urlis (4ft)', category: 'Heritage Decor', qty: 24, condition: 'Mint / Showroom' },
    { itemName: 'L-Acoustics K2 Line Array Rig', category: 'Concert Audio', qty: 4, condition: 'De-rigged & Inspected' },
    { itemName: 'Belgian Cut-Crystal Grand Chandeliers (8ft)', category: 'Scenography Lighting', qty: 12, condition: 'Mint / Showroom' },
    { itemName: 'Velvet Rajputana Sovereign Thrones', category: 'Palatial Seating', qty: 16, condition: 'Mint / Showroom' },
  ],
  'br-jaipur': [
    { itemName: 'Mughal Sheesh Mahal Mirror Arches', category: 'Mandap Structures', qty: 6, condition: 'Mint / Showroom' },
    { itemName: 'Hand-Hammered Antique Brass Urlis (4ft)', category: 'Heritage Decor', qty: 24, condition: 'Mint / Showroom' },
    { itemName: 'L-Acoustics K2 Line Array Rig', category: 'Concert Audio', qty: 4, condition: 'De-rigged & Inspected' },
    { itemName: 'Belgian Cut-Crystal Grand Chandeliers (8ft)', category: 'Scenography Lighting', qty: 12, condition: 'Mint / Showroom' },
    { itemName: 'Velvet Rajputana Sovereign Thrones', category: 'Palatial Seating', qty: 16, condition: 'Mint / Showroom' },
  ],
  'br-udaipur': [
    { itemName: 'Floating Lake Pichola Lotus Platform Pontoon', category: 'Waterfront Staging', qty: 2, condition: 'Mint / Showroom' },
    { itemName: 'Water-Resistant Amber 2700K Architectural Illuminators', category: 'Ambient Lighting', qty: 48, condition: 'Deployed on Stage' },
    { itemName: 'Traditional Mewari Royal Shahi Shamianas', category: 'Canopies', qty: 8, condition: 'Mint / Showroom' },
    { itemName: 'Laser & Cold-Pyro Safe Launchers', category: 'Special FX', qty: 12, condition: 'De-rigged & Inspected' },
  ],
  'br-delhi': [
    { itemName: 'German Heavy-Duty Weatherproof Air-Conditioned Hangars', category: 'Mega Structures', qty: 4, condition: 'Mint / Showroom' },
    { itemName: 'Kinetic Dynamic LED Ceiling Matrix Panels', category: 'Stage Tech', qty: 64, condition: 'De-rigged & Inspected' },
    { itemName: 'Bespoke Mirrored Sangeet Dance Floor (40x40ft)', category: 'Dance Floors', qty: 3, condition: 'Mint / Showroom' },
  ],
  'br-mumbai': [
    { itemName: 'Bespoke Glass Mirrored Cocktail Island Bars', category: 'Hospitality', qty: 6, condition: 'Mint / Showroom' },
    { itemName: 'Grand Crystal Candelabras with Safe Flameless Glow', category: 'Table Scaping', qty: 36, condition: 'Mint / Showroom' },
    { itemName: 'VIP Red Carpet Velvet Stanchions & Brass Ropes', category: 'Logistics', qty: 80, condition: 'Mint / Showroom' },
  ],
  'br-goa': [
    { itemName: 'Bamboo & Driftwood Tropical Pergolas', category: 'Beachfront Decor', qty: 6, condition: 'Mint / Showroom' },
    { itemName: 'Waterproof Coastal Sound Subwoofers', category: 'Beach Audio', qty: 8, condition: 'De-rigged & Inspected' },
    { itemName: 'Fairy Light Star-Canopy Tunnels (100m)', category: 'Illumination', qty: 10, condition: 'Deployed on Stage' },
  ],
};

export default function AdminBranchesPage() {
  const [branches, setBranches] = useState<BranchItem[]>([]);
  const [totals, setTotals] = useState<{
    totalYtdRevenue: number;
    totalActiveWeddings: number;
    totalPipeline: number;
    branchCount: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  // Inventory modal
  const [selectedBranchForStock, setSelectedBranchForStock] = useState<BranchItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/branches');
        const data = await res.json();
        if (data.success) {
          setBranches(data.branches);
          setTotals(data.totals);
        }
      } catch (err) {
        console.error('Failed to load branches:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, []);

  const formatCr = (val: number) => {
    return `₹${(val / 10000000).toFixed(2)} Cr`;
  };

  const handleSimulateTransfer = (itemName: string) => {
    showToast(`Transfer order for "${itemName}" dispatched via pan-India logistics fleet!`);
  };

  return (
    <div style={{ padding: '32px' }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: '#111827',
            color: '#F9FAFB',
            padding: '12px 20px',
            borderRadius: '8px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
            borderLeft: '4px solid var(--color-gold)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.9rem',
          }}
        >
          <CheckCircle2 size={18} color="var(--color-gold)" />
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <span className="badge-gold" style={{ fontSize: '0.75rem', marginBottom: '6px', display: 'inline-block' }}>
          Multi-City Franchise & Regional Command Console
        </span>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--color-maroon)' }}>
          Pan-India Regional Operations & Warehouses
        </h1>
        <p style={{ fontSize: '0.9rem', color: '#6B7280' }}>
          Live telemetry across Katihar Headquarters, Jaipur Heritage Atelier, Udaipur Palatial Lake Hub, Delhi NCR, Mumbai, and Goa.
        </p>
      </div>

      {/* KPI Cards */}
      {totals && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '10px', border: '1px solid #E5E7EB', borderTop: '4px solid var(--color-gold)' }}>
            <div style={{ fontSize: '0.78rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Pan-India YTD Gross Revenue
            </div>
            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#111827', marginTop: '4px' }}>
              {formatCr(totals.totalYtdRevenue)}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#059669', marginTop: '2px', fontWeight: 600 }}>
              +34.2% YoY Growth
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '10px', border: '1px solid #E5E7EB', borderTop: '4px solid var(--color-maroon)' }}>
            <div style={{ fontSize: '0.78rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Active Palatial Productions
            </div>
            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--color-maroon)', marginTop: '4px' }}>
              {totals.totalActiveWeddings} <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#6B7280' }}>Weddings</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: '#6B7280', marginTop: '2px' }}>
              Across 5 regional hubs
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '10px', border: '1px solid #E5E7EB', borderTop: '4px solid #10B981' }}>
            <div style={{ fontSize: '0.78rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Qualified Lead Pipeline
            </div>
            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#059669', marginTop: '4px' }}>
              {totals.totalPipeline}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#6B7280', marginTop: '2px' }}>
              High-intent consultations
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '10px', border: '1px solid #E5E7EB', borderTop: '4px solid #3B82F6' }}>
            <div style={{ fontSize: '0.78rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              On-Ground Crew & Concierges
            </div>
            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#1E40AF', marginTop: '4px' }}>
              {branches.reduce((acc, b) => acc + b.teamSize, 0)} <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#6B7280' }}>Personnel</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: '#059669', marginTop: '2px', fontWeight: 600 }}>
              Full-time certified production leads
            </div>
          </div>
        </div>
      )}

      {/* Regional Branch Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {branches.map((branch) => (
          <div
            key={branch.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E5E7EB',
              padding: '28px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid #F3F4F6', paddingBottom: '18px', marginBottom: '20px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '6px',
                      backgroundColor:
                        branch.type === 'Headquarters Atelier'
                          ? 'rgba(212, 175, 55, 0.18)'
                          : branch.type === 'Destination Concierge Hub'
                          ? '#EFF6FF'
                          : '#F3F4F6',
                      color:
                        branch.type === 'Headquarters Atelier'
                          ? 'var(--color-gold-dark)'
                          : branch.type === 'Destination Concierge Hub'
                          ? '#1E40AF'
                          : '#374151',
                    }}
                  >
                    {branch.type}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={14} /> {branch.city}
                  </span>
                </div>

                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#111827', marginTop: '6px' }}>
                  {branch.branchName}
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#6B7280', marginTop: '2px' }}>
                  {branch.address}
                </p>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: '#6B7280', textTransform: 'uppercase' }}>Branch YTD Revenue</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-maroon)' }}>
                  {formatCr(branch.ytdRevenueInr)}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 600 }}>
                  {branch.activeWeddingsCount} Active Weddings • {branch.leadPipelineCount} Leads
                </div>
              </div>
            </div>

            {/* Branch Details Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.78rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Branch Leadership & Contact
                </div>
                <div style={{ fontWeight: 700, color: '#111827', fontSize: '0.95rem', marginTop: '4px' }}>
                  {branch.managerName} (Lead Director)
                </div>
                <div style={{ fontSize: '0.82rem', color: '#4B5563', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Phone size={13} color="var(--color-gold-dark)" /> {branch.phone}
                </div>
                <div style={{ fontSize: '0.82rem', color: '#4B5563', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Mail size={13} color="var(--color-gold-dark)" /> {branch.email}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.78rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Flagship Palaces & Venues Governed
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                  {branch.flagshipVenues.map((v, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '0.74rem',
                        backgroundColor: '#F9FAFB',
                        border: '1px solid #E5E7EB',
                        borderRadius: '4px',
                        padding: '3px 8px',
                        color: '#374151',
                      }}
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <button
                  onClick={() => setSelectedBranchForStock(branch)}
                  className="btn-gold"
                  style={{ padding: '9px 18px', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <Box size={16} />
                  Inspect Warehouse Inventory
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Warehouse Inventory Modal */}
      {selectedBranchForStock && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '14px',
              maxWidth: '680px',
              width: '100%',
              padding: '28px',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
              maxHeight: '85vh',
              overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #E5E7EB', paddingBottom: '16px', marginBottom: '20px' }}>
              <div>
                <span className="badge-gold" style={{ fontSize: '0.72rem' }}>
                  Warehouse Hub Telemetry
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: 'var(--color-maroon)', marginTop: '4px' }}>
                  {selectedBranchForStock.city} Equipment Depot
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#6B7280' }}>
                  {selectedBranchForStock.address}
                </p>
              </div>
              <button
                onClick={() => setSelectedBranchForStock(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.3rem', cursor: 'pointer', color: '#9CA3AF' }}
              >
                ✕
              </button>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>
                Stocked Scenography, Audio & Structural Rigs:
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {(REGIONAL_INVENTORY[selectedBranchForStock.id] || []).map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      backgroundColor: '#F9FAFB',
                      border: '1px solid #E5E7EB',
                      flexWrap: 'wrap',
                      gap: '10px',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, color: '#111827', fontSize: '0.88rem' }}>
                        {item.itemName}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                        Category: {item.category} • Condition: <strong>{item.condition}</strong>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-maroon)' }}>
                        {item.qty} Units
                      </span>

                      <button
                        onClick={() => handleSimulateTransfer(item.itemName)}
                        title="Simulate Inter-Branch Depot Transfer"
                        style={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #D1D5DB',
                          borderRadius: '6px',
                          padding: '6px 10px',
                          fontSize: '0.74rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          color: '#374151',
                        }}
                      >
                        <Truck size={13} />
                        Transfer Stock
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setSelectedBranchForStock(null)}
                className="btn-gold"
                style={{ padding: '8px 20px', fontSize: '0.85rem' }}
              >
                Close Telemetry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
