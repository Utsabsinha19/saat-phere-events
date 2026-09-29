'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Sparkles } from 'lucide-react';
import { InstagramIcon, FacebookIcon, YoutubeIcon } from '@/components/common/SocialIcons';
import { SITE_CONFIG } from '@/config/site';
import { FOOTER_LINKS } from '@/config/navigation';
import { GoldDivider } from '@/components/common/GoldDivider';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: '#121212',
        color: '#FFFFFF',
        borderTop: '3px solid var(--color-gold)',
        paddingTop: '70px',
        paddingBottom: '30px',
      }}
    >
      <div className="container">
        {/* Top Footer Grid */}
        <div
          className="footer-grid">
          {/* Column 1: Brand & Philosophy */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--gradient-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-maroon)',
                  fontWeight: 900,
                  fontSize: '1.1rem',
                  fontFamily: 'var(--font-serif)',
                }}
              >
                7
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.4rem',
                  fontWeight: 800,
                  color: 'var(--color-gold-light)',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}
              >
                Saat Phere
              </span>
            </div>
            <p
              style={{
                fontSize: '0.88rem',
                color: '#9CA3AF',
                lineHeight: 1.6,
                marginBottom: '20px',
              }}
            >
              India’s premier luxury wedding planning and bespoke event management agency. Transforming sacred vows and special milestones into unforgettable royal celebrations.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: '#D1D5DB' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={16} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>
                  {SITE_CONFIG.contact.headquarters.street}, {SITE_CONFIG.contact.headquarters.city},{' '}
                  {SITE_CONFIG.contact.headquarters.state} – {SITE_CONFIG.contact.headquarters.postalCode}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={16} color="var(--color-gold)" style={{ flexShrink: 0 }} />
                <a href={`tel:${SITE_CONFIG.contact.phoneRaw}`} style={{ color: 'var(--color-gold-light)' }}>
                  {SITE_CONFIG.contact.phone}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} color="var(--color-gold)" style={{ flexShrink: 0 }} />
                <a href={`mailto:${SITE_CONFIG.contact.email}`} style={{ color: '#FFFFFF' }}>
                  {SITE_CONFIG.contact.email}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: 9 Event Services */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.15rem',
                color: 'var(--color-gold)',
                marginBottom: '18px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >
              Our Services
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {FOOTER_LINKS.services.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    style={{
                      fontSize: '0.88rem',
                      color: '#9CA3AF',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-gold)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#9CA3AF')}
                  >
                    <span style={{ color: 'var(--color-gold)', fontSize: '0.75rem' }}>›</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.15rem',
                color: 'var(--color-gold)',
                marginBottom: '18px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {FOOTER_LINKS.company.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    style={{
                      fontSize: '0.88rem',
                      color: '#9CA3AF',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-gold)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#9CA3AF')}
                  >
                    <span style={{ color: 'var(--color-gold)', fontSize: '0.75rem' }}>›</span>
                    <span>{item.label}</span>
                    {item.href === '/enterprise' && (
                      <span
                        style={{
                          fontSize: '0.62rem',
                          fontWeight: 800,
                          backgroundColor: 'rgba(212, 175, 55, 0.18)',
                          color: 'var(--color-gold)',
                          border: '1px solid var(--color-gold)',
                          padding: '1px 5px',
                          borderRadius: '4px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.4px',
                        }}
                      >
                        AI OS
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Royal Destinations & Social Channels */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.15rem',
                color: 'var(--color-gold)',
                marginBottom: '18px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >
              Royal Venues
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#9CA3AF', marginBottom: '14px' }}>
              Palace buyouts and heritage forts in Udaipur, Jaipur, Jodhpur, Jaisalmer, Goa & Dubai.
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              <a
                href={SITE_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(212, 175, 55, 0.15)',
                  border: '1px solid var(--color-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-gold)',
                }}
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href={SITE_CONFIG.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(212, 175, 55, 0.15)',
                  border: '1px solid var(--color-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-gold)',
                }}
                aria-label="Facebook"
              >
                <FacebookIcon size={18} />
              </a>
              <a
                href={SITE_CONFIG.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(212, 175, 55, 0.15)',
                  border: '1px solid var(--color-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-gold)',
                }}
                aria-label="YouTube"
              >
                <YoutubeIcon size={18} />
              </a>
            </div>
            <div style={{ marginTop: '24px' }}>
              <Link
                href="/contact"
                className="btn-gold"
                style={{ padding: '10px 18px', fontSize: '0.8rem', width: '100%' }}
              >
                <Sparkles size={14} />
                Get Free Consultation
              </Link>
            </div>
          </div>
        </div>

        <GoldDivider width="100%" />

        {/* Bottom Bar */}
        <div
          className="footer-bottom"
        >
          <div>
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All Rights Reserved. ISO 9001:2015 Certified.
          </div>
          <div className="footer-bottom-links">
            <span>{SITE_CONFIG.domain}</span>
            <Link href="/about" style={{ color: '#9CA3AF' }}>
              Privacy &amp; Discretion
            </Link>
            <Link href="/contact" style={{ color: '#9CA3AF' }}>
              Emergency Inquiries
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
