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
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.96)' : 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(10px)',
        borderBottom: isScrolled
          ? '1px solid rgba(212, 175, 55, 0.35)'
          : '1px solid rgba(0, 0, 0, 0.06)',
        boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.08)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <div className="container header-inner-container">
        {/* Brand Logo - Fixed non-wrapping layout */}
        <Link href="/" className="brand-logo-link">
          <div className="brand-logo-title-row">
            <span className="brand-logo-badge">
              7
            </span>
            <span className="brand-logo-text">
              Saat Phere
            </span>
          </div>
          <span className="brand-logo-subtitle">
            Events &amp; Weddings
          </span>
        </Link>

        {/* Desktop Navigation - Hidden under 1200px to prevent wrapping */}
        <nav className="header-desktop-nav">
          {MAIN_NAV.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

            if (item.children) {
              return (
                <div
                  key={item.label}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                >
                  <Link
                    href={item.href}
                    className={`header-nav-item ${isActive ? 'active' : ''}`}
                    style={{ padding: '8px 0' }}
                  >
                    {item.label}
                    <ChevronDown size={14} color="var(--color-gold)" />
                  </Link>

                  {/* Mega Dropdown for 9 Services */}
                  {servicesDropdownOpen && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: '-160px',
                        width: '640px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid var(--color-border-gold)',
                        borderRadius: '8px',
                        boxShadow: '0 20px 30px rgba(0, 0, 0, 0.12)',
                        padding: '20px',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '12px',
                        zIndex: 100,
                      }}
                    >
                      {item.children.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          style={{
                            padding: '10px 12px',
                            borderRadius: '6px',
                            transition: 'all 0.2s ease',
                            backgroundColor: pathname === sub.href ? 'var(--color-ivory-light)' : 'transparent',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--color-ivory-light)';
                          }}
                          onMouseLeave={(e) => {
                            if (pathname !== sub.href) e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                        >
                          <div
                            style={{
                              fontSize: '0.88rem',
                              fontWeight: 700,
                              color: 'var(--color-maroon)',
                              marginBottom: '2px',
                            }}
                          >
                            {sub.label}
                          </div>
                          {sub.description && (
                            <div style={{ fontSize: '0.75rem', color: '#6B7280', lineHeight: 1.3 }}>
                              {sub.description}
                            </div>
                          )}
                        </Link>
                      ))}
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
                {item.label}
                {item.label === 'Enterprise OS' && (
                  <span
                    style={{
                      fontSize: '0.62rem',
                      fontWeight: 800,
                      backgroundColor: 'rgba(212, 175, 55, 0.2)',
                      color: 'var(--color-maroon)',
                      border: '1px solid var(--color-gold)',
                      padding: '1px 5px',
                      borderRadius: '4px',
                      textTransform: 'uppercase',
                    }}
                  >
                    AI OS
                  </span>
                )}
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
            >
              <Sparkles size={14} color="var(--color-gold)" />
              Book Consultation
            </button>
          ) : (
            <Link
              href="/contact"
              className="btn-primary header-consultation-btn"
            >
              <Sparkles size={14} color="var(--color-gold)" />
              Book Consultation
            </Link>
          )}

          {/* Mobile Menu Button - Shown under 1200px */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="header-mobile-toggle"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderTop: '1px solid var(--color-border)',
            borderBottom: '2px solid var(--color-gold)',
            padding: '20px',
            maxHeight: '80vh',
            overflowY: 'auto',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <Link href="/" style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-maroon)' }}>
              Home
            </Link>
            <Link href="/about" style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-maroon)' }}>
              About Us
            </Link>
            <div style={{ paddingLeft: '8px', borderLeft: '2px solid var(--color-gold)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-gold-dark)', marginBottom: '8px' }}>
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
                    color: '#4B5563',
                  }}
                >
                  • {sub.label}
                </Link>
              ))}
            </div>
            <Link href="/portfolio" style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-maroon)' }}>
              Portfolio & Gallery
            </Link>
            <Link href="/studio" style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-maroon)' }}>
              3D Scenography Studio
            </Link>
            <Link href="/enterprise" style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-maroon)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              Enterprise Operations OS
              <span style={{ fontSize: '0.65rem', backgroundColor: 'rgba(212, 175, 55, 0.2)', border: '1px solid var(--color-gold)', padding: '1px 5px', borderRadius: '4px' }}>
                AI OS
              </span>
            </Link>
            <Link href="/packages" style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-maroon)' }}>
              Packages & Custom Quote
            </Link>
            <Link href="/contact" style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-maroon)' }}>
              Contact & Inquiry
            </Link>
            <Link href="/portal" style={{ fontSize: '1rem', fontWeight: 600, color: '#6B7280' }}>
              Client Account Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
