/**
 * Enterprise SaaS & Autonomous AI Operations Types
 * Conforms strictly to suggestion-v3.md specification for Saat Phere Events
 */

// 1. Generative AI & Spatial Layout Types
export interface SpatialDecorConcept {
  id: string;
  prompt: string;
  themeStyle: 'rajasthani_royal' | 'crystal_lakefront' | 'mughal_heritage' | 'kerala_lotus' | 'contemporary_minimal';
  floralType: string;
  floralDensity: 'subtle' | 'lavish' | 'regal_opulence';
  fabricMaterial: 'velvet_maroon' | 'raw_silk_gold' | 'sheer_organza' | 'brocade_banarasi';
  lightingScheme: 'golden_hour' | 'candlelit_twilight' | 'royal_amber' | 'midnight_starlight';
  pillarCount: number;
  seatingCapacity: number;
  estimatedDecorBudget: number;
  generatedAt: string;
  confidenceScore: number;
  renderUrl?: string;
}

export interface GuestSeatingTable {
  id: string;
  tableName: string;
  tier: 'VVIP Royal Imperial' | 'Groom Family' | 'Bride Family' | 'Youth & Cousins Lounge' | 'NRI Global Dignitaries' | 'Corporate Honors';
  shape: 'circular_banquet' | 'imperial_long_table' | 'crescent_sofa';
  maxSeats: number;
  assignedGuests: SeatedGuest[];
  vibeScore: number; // 0 to 100
  dominantDiet: 'Jain Strict' | 'Pure Vegetarian' | 'Multi-Cuisine' | 'Vegan';
  proximityToMandap: 'Front Row (0-15m)' | 'Center Tier (15-30m)' | 'Terrace Tier (30m+)';
}

export interface SeatedGuest {
  id: string;
  name: string;
  relationship: string;
  diet: string;
  ageGroup: 'Elderly / Dignitary' | 'Adults' | 'Youth / Gen-Z';
  isVip: boolean;
  notes?: string;
}

export interface SolarThermalModel {
  venueId: string;
  venueName: string;
  city: string;
  latitude: number;
  longitude: number;
  timeOfDay: string; // e.g. "17:30"
  sunAzimuthDegrees: number;
  sunElevationDegrees: number;
  luxIntensity: number;
  ambientTempCelsius: number;
  thermalComfortIndex: 'Optimal' | 'Pleasant' | 'Warm - Misting Active' | 'Cool Lake Breeze';
  shadowOrientation: string;
}

// 2. Live On-Site Event AI Orchestrator Types
export interface EventCheckpoint {
  id: string;
  ceremonyName: string;
  scheduledTime: string; // e.g. "17:00"
  actualTime?: string;
  status: 'completed' | 'in_progress' | 'delayed' | 'upcoming';
  delayMinutes: number;
  leadStakeholder: 'Wedding Director' | 'Baraat Coordinator' | 'Head Caterer' | 'Sound Engineer' | 'Pandit Ji';
  downstreamImpacts: string[];
}

export interface DynamicCrewAlert {
  id: string;
  zone: string;
  metric: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  recommendedAction: string;
  dispatchedStaffCount: number;
  timestamp: string;
  resolved: boolean;
}

// 3. Global NRI Fintech & Multi-Currency Types
export type SupportedCurrency = 'INR' | 'USD' | 'GBP' | 'EUR' | 'AED';

export interface FxRateLock {
  baseCurrency: 'INR';
  targetCurrency: SupportedCurrency;
  exchangeRate: number;
  inverseRate: number;
  lockExpiresAt: string;
  lockToken: string;
  guaranteedBy: 'Stripe Global Treasury & Razorpay International';
}

export interface EscrowVendorRelease {
  id: string;
  vendorId: string;
  vendorName: string;
  category: string;
  allocatedAmount: number;
  currency: SupportedCurrency;
  milestoneTrigger: string;
  escrowStatus: 'held_in_escrow' | 'audit_verified' | 'released' | 'withheld';
  dispatchedDate?: string;
  gstInvoiceNumber: string;
}

export interface MultiStateGstSpec {
  eventState: 'Rajasthan' | 'Goa' | 'Delhi NCR' | 'Maharashtra' | 'Karnataka';
  clientLocation: 'Intra-State' | 'Inter-State' | 'NRI International';
  stateCode: string;
  gstin: string;
  sacCode: '998599'; // Event Management Services
  cgstRate: number; // 9% if Intra
  sgstRate: number; // 9% if Intra
  igstRate: number; // 18% if Inter/NRI
}

// 4. Franchise & Multi-Branch Operating Types
export interface FranchiseBranch {
  id: string;
  name: string;
  city: string;
  country: string;
  directorName: string;
  activeEventsCount: number;
  annualGmvInr: number;
  customerSatisfactionScore: number; // out of 5.0
  activeVendorsCount: number;
  currency: SupportedCurrency;
}

export interface ConciergeReferral {
  id: string;
  hotelName: string;
  conciergeDirector: string;
  clientName: string;
  clientOrigin: string; // e.g. "London, UK"
  destinationCity: string;
  estimatedBudgetInr: number;
  commissionRatePercent: number; // e.g. 5.0%
  potentialPayoutInr: number;
  status: 'lead_submitted' | 'consultation_scheduled' | 'contract_signed' | 'commission_dispatched';
  submissionDate: string;
}

// 5. On-Site IoT & Mobile Crew Types
export interface GuestSmartCheckIn {
  qrCode: string;
  guestId: string;
  fullName: string;
  vipTier: 'VVIP Royal Family' | 'Platinum Guest' | 'Gold Guest' | 'Artist & Entourage' | 'Production Crew';
  assignedSuite: string;
  checkInStatus: 'checked_in' | 'pending_arrival' | 'in_transit';
  hamperDelivered: boolean;
  rfidWristbandUid?: string;
  golfCartAssigned: string;
  personalButler: string;
  checkInTimestamp?: string;
}

export interface CrewTaskCard {
  id: string;
  role: 'Event Director' | 'Decor Lead' | 'Sound & AV Engineer' | 'Hospitality & Logistics' | 'Rituals & Puja Lead';
  title: string;
  location: string;
  deadline: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'critical' | 'high' | 'medium';
  supervisorSignOff: boolean;
  supervisorName?: string;
  signOffTime?: string;
}

export interface EmergencyBroadcast {
  id: string;
  type: 'weather_alert' | 'vvip_arrival' | 'power_backup' | 'medical_response';
  title: string;
  message: string;
  targetRoles: string[];
  issuedAt: string;
  active: boolean;
  acknowledgedCount: number;
}
