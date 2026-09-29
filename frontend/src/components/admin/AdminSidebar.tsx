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
  Crown,
  Briefcase,
  Building2,
  Smartphone,
} from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();

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

      <div style={{ padding: '16px 20px', borderTop: '1px solid #1F2A37' }}>
        <Link
          href="/"
          target="_blank"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--color-gold)',
            fontSize: '0.85rem',
            textDecoration: 'none',
          }}
        >
          <ExternalLink size={14} />
          View Live Website
        </Link>
      </div>
    </aside>
  );
};
