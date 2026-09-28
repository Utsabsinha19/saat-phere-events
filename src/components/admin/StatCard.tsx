import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  subtext?: string;
  color?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon: Icon,
  subtext,
  color = 'var(--color-gold)',
}) => {
  return (
    <div className="admin-stat-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span className="admin-stat-label">{label}</span>
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '8px',
            backgroundColor: 'rgba(212, 175, 55, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color,
          }}
        >
          <Icon size={20} />
        </div>
      </div>
      <div className="admin-stat-val">{value}</div>
      {subtext && <div style={{ fontSize: '0.78rem', color: '#6B7280', marginTop: '4px' }}>{subtext}</div>}
    </div>
  );
};
