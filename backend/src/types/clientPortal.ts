export interface ClientEvent {
  eventId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  eventType: string; // 'Destination Wedding', 'Haldi/Mehendi', etc.
  eventDate: string;
  venueCity: string;
  venueName: string;
  totalBudget: number; // in INR
  daysRemaining: number;
  assignedDirector: string;
  status: 'In Planning' | 'Production Ready' | 'Executed';
  createdAt: string;
}

export interface EventMilestone {
  milestoneId: string;
  eventId: string;
  title: string;
  category: 'Venue & Logistics' | 'Scenography & Decor' | 'Culinary Tasting' | 'Artists & Entertainment' | 'Execution';
  dueDate: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  assignedManager: string;
  description: string;
}

export interface PaymentInvoice {
  invoiceId: string;
  invoiceNumber: string; // e.g. 'SPE-2026-089'
  eventId: string;
  title: string;
  baseAmount: number; // in INR
  cgstAmount: number; // 9%
  sgstAmount: number; // 9%
  igstAmount: number; // 18% (for interstate)
  totalAmount: number;
  gstType: 'Intrastate (CGST+SGST)' | 'Interstate (IGST)';
  paymentStatus: 'Paid' | 'Unpaid' | 'Refunded';
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  paidAt?: string;
  dueDate: string;
  createdAt: string;
}
