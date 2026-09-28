import React from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { StatCard } from '@/components/admin/StatCard';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { InquiryRepository } from '@/lib/db/store';
import Link from 'next/link';
import {
  Users,
  Sparkles,
  TrendingUp,
  Download,
  Calendar,
  CheckCircle,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { formatDateString } from '@/lib/utils/formatters';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const metrics = await InquiryRepository.getMetrics();
  const recentInquiries = (await InquiryRepository.getAll()).slice(0, 5);

  return (
    <>
      <AdminHeader
        title="Executive Overview"
        subtitle="Saat Phere Events • Real-Time Lead Ingestion & Operations Metrics"
      />

      <div className="admin-content">
        {/* KPI Stats Grid */}
        <div className="admin-stats-grid">
          <StatCard
            label="Total Inquiries"
            value={metrics.total}
            icon={Users}
            subtext="All-time qualified event leads"
            color="var(--color-maroon)"
          />
          <StatCard
            label="New Inquiries"
            value={metrics.newCount}
            icon={Clock}
            subtext="Require immediate triage"
            color="#2563EB"
          />
          <StatCard
            label="Active Quotations"
            value={metrics.quotedCount}
            icon={Sparkles}
            subtext="Proposals out for review"
            color="#7C3AED"
          />
          <StatCard
            label="Lead Conversion"
            value={metrics.conversionRate}
            icon={TrendingUp}
            subtext="Target KPI > 4.5% (PRD Section 1.3)"
            color="#059669"
          />
        </div>

        {/* Quick Actions Toolbar */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            border: '1px solid #E5E7EB',
            padding: '16px 20px',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#374151' }}>
            <span style={{ fontWeight: 600 }}>Quick Actions:</span>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a
              href="/api/inquiries/export"
              className="btn-outline"
              style={{
                padding: '8px 16px',
                fontSize: '0.82rem',
                color: 'var(--color-maroon)',
                borderColor: 'var(--color-maroon)',
              }}
            >
              <Download size={14} />
              Export All Leads to CSV
            </a>

            <Link
              href="/admin/inquiries"
              className="btn-primary"
              style={{ padding: '8px 16px', fontSize: '0.82rem' }}
            >
              <Users size={14} />
              Open Leads Manager
            </Link>

            <Link
              href="/admin/gallery"
              className="btn-gold"
              style={{ padding: '8px 16px', fontSize: '0.82rem' }}
            >
              <Sparkles size={14} />
              Manage Gallery
            </Link>
          </div>
        </div>

        {/* Recent Inquiries Table */}
        <div className="admin-table-container">
          <div className="admin-table-toolbar">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827' }}>
              Recent Inquiries (Last 5 Submissions)
            </h3>
            <Link
              href="/admin/inquiries"
              style={{
                fontSize: '0.82rem',
                color: 'var(--color-maroon)',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              View All Inquiries
              <ArrowRight size={14} />
            </Link>
          </div>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Lead ID</th>
                <th>Client Name</th>
                <th>Event Category</th>
                <th>Target Date</th>
                <th>City / Location</th>
                <th>Budget</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentInquiries.map((inq) => (
                <tr key={inq.id}>
                  <td style={{ fontFamily: 'monospace', fontWeight: 600, color: '#6B7280' }}>
                    {inq.id}
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: '#111827' }}>{inq.fullName}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                      {inq.phone} • {inq.email}
                    </div>
                  </td>
                  <td>{inq.eventType}</td>
                  <td>{formatDateString(inq.eventDate)}</td>
                  <td>{inq.eventLocation}</td>
                  <td style={{ fontWeight: 600, color: 'var(--color-maroon)' }}>{inq.budgetRange}</td>
                  <td>
                    <StatusBadge status={inq.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
