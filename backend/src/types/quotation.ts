export interface QuotationCalculationInput {
  eventType: string;
  guestCount: number;
  venueType: 'Heritage Palace' | '5-Star Luxury Resort' | 'Beachfront Venue' | 'Banqueting Hall' | 'Private Farmhouse' | 'Other';
  cityLocation: string;
  budgetRange: string;
  selectedServices: string[];
  customRequirements?: string;
  fullName: string;
  phone: string;
  email: string;
}

export interface QuotationEstimateBreakdown {
  id: string;
  generatedDate: string;
  input: QuotationCalculationInput;
  estimatedTier: 'Grand Royal Bespoke' | 'Signature Elegance' | 'Classic Luxury' | 'Curated Intimate';
  recommendedPlanningTimeline: string;
  scopeSummary: string[];
  preliminaryConsultationNote: string;
}
