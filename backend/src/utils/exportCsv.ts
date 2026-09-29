import { InquiryLead } from '@/types/inquiry';

export function convertInquiriesToCsv(inquiries: InquiryLead[]): string {
  const headers = [
    'Lead ID',
    'Date Submitted',
    'Full Name',
    'Phone',
    'Email',
    'Event Type',
    'Event Date',
    'Location',
    'Guest Count',
    'Budget Range',
    'Status',
    'Notes',
    'Requirements',
  ];

  const escapeCell = (cell: unknown): string => {
    if (cell === null || cell === undefined) return '""';
    const str = String(cell).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = inquiries.map((inq) => [
    escapeCell(inq.id),
    escapeCell(inq.createdAt),
    escapeCell(inq.fullName),
    escapeCell(inq.phone),
    escapeCell(inq.email),
    escapeCell(inq.eventType),
    escapeCell(inq.eventDate),
    escapeCell(inq.eventLocation),
    escapeCell(inq.guestCount),
    escapeCell(inq.budgetRange),
    escapeCell(inq.status),
    escapeCell(inq.notes || ''),
    escapeCell(inq.requirements || ''),
  ]);

  return [headers.join(','), ...rows.map((row) => row.join(','))].join('\r\n');
}
