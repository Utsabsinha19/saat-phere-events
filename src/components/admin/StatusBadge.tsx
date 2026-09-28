import React from 'react';
import { InquiryStatus } from '@/types/inquiry';

interface StatusBadgeProps {
  status: InquiryStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return <span className={`status-badge ${status}`}>{status}</span>;
};
