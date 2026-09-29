export type InquiryStatus = 'New' | 'Contacted' | 'Quoted' | 'Booked';

export type EventType =
  | 'Wedding Planning & Management'
  | 'Destination Wedding'
  | 'Engagement & Ring Ceremony'
  | 'Birthday Party & Kids Event'
  | 'Anniversary & Couple Celebration'
  | 'Haldi, Mehendi & Sangeet'
  | 'Reception & Wedding Decor'
  | 'Corporate Event & Gala'
  | 'Theme Party & Bespoke Celebration';

export interface InquiryLead {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  eventType: EventType;
  eventDate: string;
  eventLocation: string;
  guestCount: number | string;
  budgetRange: string;
  requirements?: string;
  status: InquiryStatus;
  createdAt: string;
  updatedAt?: string;
  notes?: string;
  estimatedValue?: number;
  source?: string;
}

export interface InquiryCreateInput {
  fullName: string;
  phone: string;
  email: string;
  eventType: EventType;
  eventDate: string;
  eventLocation: string;
  guestCount: number | string;
  budgetRange: string;
  requirements?: string;
}

export interface InquiryMetrics {
  total: number;
  newCount: number;
  contactedCount: number;
  quotedCount: number;
  bookedCount: number;
  conversionRate: string;
}

export interface InquiryFilterParams {
  status?: InquiryStatus | 'All';
  eventType?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
}

