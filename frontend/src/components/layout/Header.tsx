'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, Sparkles, Phone } from 'lucide-react';
import { MAIN_NAV } from '@/config/navigation';
import { SITE_CONFIG } from '@/config/site';

interface HeaderProps {
  onOpenConsultation?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [pathname]);

  const servicesNav = MAIN_NAV.find((item) => item.label === 'Services');

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: isScrolled ? 'rgba(16, 10, 14, 0.96)' : 'rgba(20, 12, 16, 0.98)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.28)',
        boxShadow: isScrolled ? '0 8px 30px rgba(0, 0, 0, 0.55)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <div className="container header-inner-container">
        {/* Brand Logo - Horizontal Luxury Lockup */}
        <Link href="/" className="brand-logo-link" aria-label="Saat Phere Events Home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/crest-official.png"
            alt="Saat Phere Events Official Royal Crest"
            className="brand-logo-emblem"
          />
          <div className="brand-logo-text-block">
            <span className="brand-logo-title">Saat Phere</span>
            <span className="brand-logo-subtitle">Events • Royal Weddings</span>
          </div>
        </Link>

        {/* Desktop Navigation - Hidden under 1200px to prevent wrapping */}
        <nav className="header-desktop-nav">
          {MAIN_NAV.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

            if (item.children) {
              return (
                <div
                  key={item.label}
                  style={{
                    position: 'relative',
                    display: 'inline-flex',
                    alignItems: 'center',
                    height: '100%',
                  }}
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                >
                  <Link
                    href={item.href}
                    className={`header-nav-item ${isActive ? 'active' : ''}`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      size={13}
                      color="var(--color-gold)"
                      style={{
                        flexShrink: 0,
                        transition: 'transform 0.2s ease',
                        transform: servicesDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    />
                  </Link>

                  {/* Mega Dropdown for 9 Services */}
                  {servicesDropdownOpen && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 'calc(100% + 6px)',
                        left: '-20px',
                        /* Fixed width so browser knows the container size BEFORE
                           computing grid column widths — fixes the max-content overlap bug */
                        width: '560px',
                        maxWidth: 'calc(100vw - 40px)',
                        boxSizing: 'border-box',
                        backgroundColor: 'rgba(22, 14, 18, 0.98)',
                        border: '1px solid rgba(212, 175, 55, 0.35)',
                        borderRadius: '10px',
                        boxShadow: '0 20px 45px rgba(0, 0, 0, 0.7)',
                        backdropFilter: 'blur(16px)',
                        padding: '16px',
                        zIndex: 1001,
                      }}
                    >
                      {/* Dropdown header */}
                      <div style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        color: 'var(--color-gold-light)',
                        textTransform: 'uppercase',
                        marginBottom: '12px',
                        paddingBottom: '8px',
                        borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
                      }}>
                        Our 9 Event Services
                      </div>

                      {/* 2-column grid */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                        gap: '4px 16px',
                        width: '100%',
                        boxSizing: 'border-box',
                      }}>
                        {item.children.map((sub, idx) => {
                          const isLast = idx === item.children!.length - 1;
                          const isOdd = item.children!.length % 2 !== 0;
                          return (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              style={{
                                padding: '8px 10px',
                                borderRadius: '7px',
                                transition: 'background-color 0.18s ease',
                                backgroundColor: pathname === sub.href ? 'rgba(212, 175, 55, 0.15)' : 'transparent',
                                gridColumn: (isLast && isOdd) ? '1 / -1' : undefined,
                                display: 'block',
                                textDecoration: 'none',
                                /* Critical: grid cells MUST have min-width:0 + overflow:hidden
                                   to prevent content from escaping the column boundary */
                                minWidth: 0,
                                overflow: 'hidden',
                                boxSizing: 'border-box',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.12)';
                              }}
                              onMouseLeave={(e) => {
                                if (pathname !== sub.href) e.currentTarget.style.backgroundColor = 'transparent';
                              }}
                            >
                              <div
                                style={{
                                  fontSize: '0.84rem',
                                  fontWeight: 700,
                                  color: '#FCE6A2',
                                  marginBottom: '2px',
                                  lineHeight: 1.3,
                                  overflowWrap: 'break-word',
                                  wordBreak: 'break-word',
                                }}
                              >
                                {sub.label}
                              </div>
                              {sub.description && (
                                <div style={{
                                  fontSize: '0.72rem',
                                  color: 'rgba(255, 255, 255, 0.65)',
                                  lineHeight: 1.4,
                                  overflowWrap: 'break-word',
                                  wordBreak: 'break-word',
                                }}>
                                  {sub.description}
                                </div>
                              )}
                            </Link>
                          );
                        })}
                      </div>

                      {/* Footer CTA */}
                      <div style={{
                        marginTop: '12px',
                        paddingTop: '10px',
                        borderTop: '1px solid rgba(212, 175, 55, 0.25)',
                        textAlign: 'center',
                      }}>
                        <Link
                          href="/services"
                          style={{
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            color: 'var(--color-gold-light)',
                            textDecoration: 'none',
                            letterSpacing: '0.04em',
                          }}
                        >
                          View All Services →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`header-nav-item ${isActive ? 'active' : ''}`}
              >
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="header-actions-group">
          <a
            href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
            className="header-phone-cta"
          >
            <Phone size={13} color="var(--color-gold)" />
            {SITE_CONFIG.contact.phone}
          </a>

          {onOpenConsultation ? (
            <button
              onClick={onOpenConsultation}
              className="btn-primary header-consultation-btn"
              title="Get in Touch"
            >
              <Sparkles size={14} color="var(--color-gold)" style={{ flexShrink: 0 }} />
              <span className="header-btn-text-full">Get in Touch</span>
              <span className="header-btn-text-tablet">Get in Touch</span>
              <span className="header-btn-text-mobile">Contact</span>
            </button>
          ) : (
            <Link
              href="/contact"
              className="btn-primary header-consultation-btn"
              title="Get in Touch"
            >
              <Sparkles size={14} color="var(--color-gold)" style={{ flexShrink: 0 }} />
              <span className="header-btn-text-full">Get in Touch</span>
              <span className="header-btn-text-tablet">Get in Touch</span>
              <span className="header-btn-text-mobile">Contact</span>
            </Link>
          )}

          {/* Mobile Menu Button - Shown under 1200px */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="header-mobile-toggle"
            aria-label="Toggle navigation"
            style={{ color: 'var(--color-gold)' }}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="header-mobile-drawer"
          style={{
            backgroundColor: 'rgba(20, 12, 16, 0.98)',
            borderTop: '1px solid rgba(212, 175, 55, 0.25)',
            borderBottom: '2px solid var(--color-gold)',
            padding: '20px',
            maxHeight: '80vh',
            overflowY: 'auto',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <Link href="/" style={{ fontSize: '1rem', fontWeight: 600, color: '#FCE6A2' }}>
              Home
            </Link>
            <Link href="/about" style={{ fontSize: '1rem', fontWeight: 600, color: '#FCE6A2' }}>
              About Us
            </Link>
            <div style={{ paddingLeft: '8px', borderLeft: '2px solid var(--color-gold)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-gold-light)', marginBottom: '8px' }}>
                OUR 9 EVENT SERVICES:
              </div>
              {servicesNav?.children?.map((sub) => (
                <Link
                  key={sub.label}
                  href={sub.href}
                  style={{
                    display: 'block',
                    padding: '6px 0',
                    fontSize: '0.9rem',
                    color: 'rgba(255, 255, 255, 0.85)',
                  }}
                >
                  • {sub.label}
                </Link>
              ))}
            </div>
            <Link href="/portfolio" style={{ fontSize: '1rem', fontWeight: 600, color: '#FCE6A2' }}>
              Portfolio & Gallery
            </Link>

            <Link href="/packages" style={{ fontSize: '1rem', fontWeight: 600, color: '#FCE6A2' }}>
              Packages & Custom Quote
            </Link>
            <Link href="/contact" style={{ fontSize: '1rem', fontWeight: 600, color: '#FCE6A2' }}>
              Contact & Inquiry
            </Link>
            <Link href="/portal" style={{ fontSize: '1rem', fontWeight: 600, color: '#9CA3AF' }}>
              Client Account Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
