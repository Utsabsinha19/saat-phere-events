'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Image as ImageIcon,
  MessageSquare,
  Sparkles,
  Settings,
  ExternalLink,
  Briefcase,
  Building2,
  Smartphone,
  LogOut,
  ShieldCheck,
} from 'lucide-react';
import { useAdminAuth } from './AdminAuthGuard';

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const { user, logout } = useAdminAuth();

  const navItems = [
    { label: 'Executive Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Inquiry Leads Manager', href: '/admin/inquiries', icon: Users },
    { label: 'Vendors & RFPs', href: '/admin/vendors', icon: Briefcase },
    { label: 'Regional Branches', href: '/admin/branches', icon: Building2 },
    { label: 'WhatsApp CRM', href: '/admin/crm', icon: Smartphone },
    { label: 'Gallery & Portfolio', href: '/admin/gallery', icon: ImageIcon },
    { label: 'Client Testimonials', href: '/admin/testimonials', icon: MessageSquare },
    { label: 'Services & Content', href: '/admin/services', icon: Sparkles },
    { label: 'Settings & Integrations', href: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <Link href="/" target="_blank" style={{ display: 'block', marginBottom: '8px' }} title="Visit Website">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo.png"
            alt="Saat Phere Events"
            style={{
              height: '46px',
              width: 'auto',
              objectFit: 'contain',
              display: 'block',
              filter: 'drop-shadow(0 2px 6px rgba(212, 175, 55, 0.3))',
            }}
          />
        </Link>
        <div style={{ fontSize: '0.72rem', color: '#9CA3AF', letterSpacing: '1px', textTransform: 'uppercase' }}>
          Operations &amp; CMS Console
        </div>
      </div>

      <nav className="admin-nav">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Info & Actions */}
      <div
        style={{
          padding: '16px 20px',
          borderTop: '1px solid #1F2A37',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 10px',
            backgroundColor: 'rgba(212, 175, 55, 0.08)',
            border: '1px solid rgba(212, 175, 55, 0.2)',
            borderRadius: '8px',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #D4AF37, #B8860B)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1A0B2E',
              fontSize: '0.75rem',
              fontWeight: 800,
              flexShrink: 0,
            }}
          >
            SP
          </div>
          <div style={{ overflow: 'hidden', flex: 1 }}>
            <div
              style={{
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#F9FAFB',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              Executive Director
            </div>
            <div
              style={{
                fontSize: '0.66rem',
                color: '#D4AF37',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <ShieldCheck size={11} />
              Admin Portal Active
            </div>
          </div>
        </div>

        <button
          onClick={() => logout()}
          type="button"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            width: '100%',
            padding: '9px 12px',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '6px',
            color: '#FCA5A5',
            fontSize: '0.82rem',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
            e.currentTarget.style.color = '#FFFFFF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
            e.currentTarget.style.color = '#FCA5A5';
          }}
          title="Sign out of Admin Console"
        >
          <LogOut size={14} />
          Sign Out
        </button>

        <Link
          href="/"
          target="_blank"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--color-gold)',
            fontSize: '0.82rem',
            textDecoration: 'none',
            paddingTop: '4px',
          }}
        >
          <ExternalLink size={14} />
          View Live Website
        </Link>
      </div>
    </aside>
  );
};
