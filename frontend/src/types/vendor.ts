export type VendorCategory =
  | 'Floral & Botanical Artistry'
  | 'Concert Sound & Stage Light'
  | 'Gourmet Catering & Mixology'
  | 'Cinematography & Photography'
  | 'Celebrity Artists & Entertainment'
  | 'Bridal Styling & Makeup'
  | 'Luxury Aviation & Fleet Transport'
  | 'Heritage Furniture & Fabrications';

export type ComplianceStatus = 'Verified & Insured' | 'Audit Pending' | 'Contracted Partner';

export interface VendorMilestone {
  title: string;
  percentage: number;
  amount: number;
  status: 'In Escrow' | 'Released' | 'Pending Approval';
  dueDate?: string;
  releaseTxId?: string;
}

export interface PurchaseOrderItem {
  id: string;
  vendorId: string;
  vendorName: string;
  vendorCategory: VendorCategory;
  eventId: string;
  eventTitle: string;
  totalAmount: number;
  gstAmount: number;
  netPayable: number;
  status: 'Draft' | 'Issued' | 'In Progress' | 'Completed';
  createdAt: string;
  milestones: VendorMilestone[];
}

export interface RfpBid {
  vendorId: string;
  vendorName: string;
  quoteAmount: number;
  timelineDays: number;
  notes: string;
  submittedAt: string;
  selected?: boolean;
}

export interface RfpItem {
  id: string;
  title: string;
  category: VendorCategory;
  destination: string;
  eventDates: string;
  scopeDescription: string;
  bids: RfpBid[];
  deadline: string;
  status: 'Open' | 'Evaluating' | 'Awarded';
}

export interface VendorItem {
  id: string;
  name: string;
  category: VendorCategory;
  city: string;
  rating: number; // 1.0 - 5.0
  completedEvents: number;
  complianceStatus: ComplianceStatus;
  contactPerson: string;
  phone: string;
  email: string;
  panNumber: string;
  gstin: string;
  verifiedBadges: string[];
}
