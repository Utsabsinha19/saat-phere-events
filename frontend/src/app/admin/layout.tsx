'use client';

import React from 'react';
import '@/styles/admin.css';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminAuthGuard } from '@/components/admin/AdminAuthGuard';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthGuard>
      <div className="admin-layout">
        <AdminSidebar />
        <div className="admin-main">
          {children}
        </div>
      </div>
    </AdminAuthGuard>
  );
}
