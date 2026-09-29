import React from 'react';
import { GoldDivider } from './GoldDivider';

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: 'center' | 'left' | 'right';
  lightMode?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  subtitle,
  title,
  description,
  align = 'center',
  lightMode = false,
}) => {
  return (
    <div
      style={{
        textAlign: align,
        marginBottom: '48px',
        maxWidth: align === 'center' ? '820px' : '100%',
        marginLeft: align === 'center' ? 'auto' : '0',
        marginRight: align === 'center' ? 'auto' : '0',
      }}
    >
      {subtitle && (
        <span
          style={{
            display: 'inline-block',
            color: 'var(--color-gold)',
            fontSize: '0.85rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '2.5px',
            marginBottom: '8px',
          }}
        >
          {subtitle}
        </span>
      )}
      <h2
        style={{
          fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
          fontWeight: 700,
          color: lightMode ? '#FFFFFF' : 'var(--color-maroon)',
          lineHeight: 1.2,
          letterSpacing: '-0.3px',
        }}
      >
        {title}
      </h2>
      <GoldDivider width={align === 'center' ? '180px' : '120px'} />
      {description && (
        <p
          style={{
            fontSize: '1.05rem',
            color: lightMode ? 'rgba(255, 255, 255, 0.85)' : '#4B5563',
            marginTop: '12px',
            lineHeight: 1.6,
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
};
