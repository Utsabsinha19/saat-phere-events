'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
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
          <div className="brand-logo-text-block" style={{ textAlign: 'center', alignItems: 'center' }}>
            <span className="brand-logo-title" style={{ textAlign: 'center' }}>Saat Phere</span>
            <span className="brand-logo-subtitle" style={{ textAlign: 'center', width: '100%', display: 'block' }}>Events</span>
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

                  {/* Mega Dropdown for 10 Event Disciplines */}
                  {servicesDropdownOpen && (
                    <div
                      ref={dropdownRef}
                      className="services-mega-dropdown"
                      role="menu"
                      aria-label="Our 10 Event Disciplines"
                      style={{
                        position: 'absolute',
                        top: 'calc(100% + 6px)',
                        left: 'clamp(-180px, -10vw, -10px)',
                        width: '700px',
                        maxWidth: 'calc(100vw - 32px)',
                        boxSizing: 'border-box',
                        backgroundColor: 'rgba(18, 10, 15, 0.98)',
                        border: '1px solid rgba(212, 175, 55, 0.45)',
                        borderRadius: '12px',
                        boxShadow: '0 24px 60px rgba(0, 0, 0, 0.85), 0 0 20px rgba(212, 175, 55, 0.12)',
                        backdropFilter: 'blur(24px)',
                        padding: '16px 20px',
                        zIndex: 1001,
                        whiteSpace: 'normal',
                      }}
                    >
                      {/* Dropdown Header */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: '10px',
                          paddingBottom: '8px',
                          borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
                          whiteSpace: 'normal',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Sparkles size={14} color="var(--color-gold)" />
                          <span
                            style={{
                              fontSize: '0.74rem',
                              fontWeight: 800,
                              letterSpacing: '0.08em',
                              color: '#F8E5A7',
                              textTransform: 'uppercase',
                            }}
                          >
                            Our 10 Event Disciplines
                          </span>
                        </div>
                        <span
                          style={{
                            fontSize: '0.68rem',
                            fontWeight: 600,
                            color: 'rgba(255, 255, 255, 0.65)',
                            letterSpacing: '0.04em',
                            background: 'rgba(212, 175, 55, 0.12)',
                            padding: '2px 8px',
                            borderRadius: '999px',
                            border: '1px solid rgba(212, 175, 55, 0.25)',
                          }}
                        >
                          Bespoke • In-House Production
                        </span>
                      </div>

                      {/* 2-column Grid with Full Word Wrapping */}
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                          gap: '6px 16px',
                          width: '100%',
                          boxSizing: 'border-box',
                          whiteSpace: 'normal',
                        }}
                      >
                        {item.children.map((sub) => {
                          const isCurrent = pathname === sub.href;
                          return (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              onClick={() => setServicesDropdownOpen(false)}
                              style={{
                                padding: '7px 10px',
                                borderRadius: '8px',
                                transition: 'all 0.18s ease',
                                backgroundColor: isCurrent ? 'rgba(212, 175, 55, 0.18)' : 'rgba(255, 255, 255, 0.02)',
                                display: 'block',
                                textDecoration: 'none',
                                minWidth: 0,
                                boxSizing: 'border-box',
                                whiteSpace: 'normal',
                                borderLeft: isCurrent ? '3px solid var(--color-gold)' : '3px solid transparent',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.14)';
                                e.currentTarget.style.borderLeftColor = 'var(--color-gold)';
                              }}
                              onMouseLeave={(e) => {
                                if (!isCurrent) {
                                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                                  e.currentTarget.style.borderLeftColor = 'transparent';
                                }
                              }}
                            >
                              <div
                                style={{
                                  fontSize: '0.86rem',
                                  fontWeight: 700,
                                  color: '#FCE6A2',
                                  marginBottom: '2px',
                                  lineHeight: 1.3,
                                  whiteSpace: 'normal',
                                }}
                              >
                                {sub.label}
                              </div>
                              {sub.description && (
                                <div
                                  style={{
                                    fontSize: '0.74rem',
                                    color: 'rgba(255, 255, 255, 0.72)',
                                    lineHeight: 1.42,
                                    whiteSpace: 'normal',
                                    wordBreak: 'normal',
                                    overflowWrap: 'break-word',
                                  }}
                                >
                                  {sub.description}
                                </div>
                              )}
                            </Link>
                          );
                        })}
                      </div>

                      {/* Footer CTA Bar */}
                      <div
                        style={{
                          marginTop: '12px',
                          paddingTop: '10px',
                          borderTop: '1px solid rgba(212, 175, 55, 0.25)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          whiteSpace: 'normal',
                        }}
                      >
                        <Link
                          href="/services"
                          onClick={() => setServicesDropdownOpen(false)}
                          style={{
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            color: 'var(--color-gold-light)',
                            textDecoration: 'none',
                            letterSpacing: '0.03em',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <span>Explore All 10 Disciplines & Portfolios</span>
                          <span style={{ fontSize: '1rem', lineHeight: 1 }}>→</span>
                        </Link>

                        <Link
                          href="/packages"
                          onClick={() => setServicesDropdownOpen(false)}
                          style={{
                            fontSize: '0.74rem',
                            color: 'rgba(255, 255, 255, 0.75)',
                            textDecoration: 'underline',
                          }}
                        >
                          Custom Quote Calculator →
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
            backgroundColor: 'rgba(18, 10, 15, 0.98)',
            borderTop: '1px solid rgba(212, 175, 55, 0.25)',
            borderBottom: '2px solid var(--color-gold)',
            padding: '20px',
            maxHeight: '85vh',
            overflowY: 'auto',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: '1rem', fontWeight: 600, color: '#FCE6A2', textDecoration: 'none' }}
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: '1rem', fontWeight: 600, color: '#FCE6A2', textDecoration: 'none' }}
            >
              About Us
            </Link>

            {/* Mobile Services Section with Full Descriptions */}
            <div
              style={{
                padding: '12px 10px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(212, 175, 55, 0.25)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '10px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={13} color="var(--color-gold)" />
                  <span
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      color: '#F8E5A7',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Our 10 Event Disciplines:
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '0.66rem',
                    color: 'rgba(212, 175, 55, 0.95)',
                    background: 'rgba(212, 175, 55, 0.12)',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                  }}
                >
                  All In-House
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {servicesNav?.children?.map((sub) => {
                  const isCurrent = pathname === sub.href;
                  return (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        display: 'block',
                        padding: '8px 10px',
                        borderRadius: '6px',
                        backgroundColor: isCurrent ? 'rgba(212, 175, 55, 0.18)' : 'rgba(255, 255, 255, 0.03)',
                        borderLeft: isCurrent ? '3px solid var(--color-gold)' : '2px solid rgba(212, 175, 55, 0.25)',
                        textDecoration: 'none',
                        transition: 'background-color 0.18s ease',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '0.88rem',
                          fontWeight: 700,
                          color: '#FCE6A2',
                          lineHeight: 1.3,
                        }}
                      >
                        {sub.label}
                      </div>
                      {sub.description && (
                        <div
                          style={{
                            fontSize: '0.74rem',
                            color: 'rgba(255, 255, 255, 0.7)',
                            lineHeight: 1.4,
                            marginTop: '2px',
                            whiteSpace: 'normal',
                            wordBreak: 'normal',
                            overflowWrap: 'break-word',
                          }}
                        >
                          {sub.description}
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>

              <Link
                href="/services"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginTop: '10px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: 'var(--color-gold-light)',
                  textDecoration: 'none',
                }}
              >
                <span>Explore All 10 Disciplines & Portfolios</span>
                <span>→</span>
              </Link>
            </div>

            <Link
              href="/portfolio"
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: '1rem', fontWeight: 600, color: '#FCE6A2', textDecoration: 'none' }}
            >
              Portfolio & Gallery
            </Link>

            <Link
              href="/packages"
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: '1rem', fontWeight: 600, color: '#FCE6A2', textDecoration: 'none' }}
            >
              Packages & Custom Quote
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: '1rem', fontWeight: 600, color: '#FCE6A2', textDecoration: 'none' }}
            >
              Contact & Inquiry
            </Link>
            <Link
              href="/portal"
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: '1rem', fontWeight: 600, color: '#9CA3AF', textDecoration: 'none' }}
            >
              Client Account Portal
            </Link>

            {/* Quick Contact Action in Drawer */}
            <div style={{ marginTop: '10px', paddingTop: '14px', borderTop: '1px solid rgba(212, 175, 55, 0.25)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a
                href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
                className="btn-primary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  textDecoration: 'none',
                  padding: '10px 16px',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                }}
              >
                <Phone size={14} />
                <span>Call {SITE_CONFIG.contact.phone}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
