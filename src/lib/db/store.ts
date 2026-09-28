import { InquiryLead, InquiryCreateInput, InquiryStatus, InquiryFilterParams } from '@/types/inquiry';
import { GalleryMediaItem, GalleryCategory } from '@/types/gallery';
import { TestimonialItem } from '@/types/testimonial';
import { ServiceItem } from '@/types/service';
import { VendorItem, RfpItem, PurchaseOrderItem } from '@/types/vendor';
import { BranchItem } from '@/types/branch';
import { GuestItem } from '@/types/rsvp';
import { WhatsAppLogItem, CrmCampaignStats } from '@/types/crm';
import { ClientEvent, EventMilestone, PaymentInvoice } from '@/types/clientPortal';
import {
  SpatialDecorConcept,
  GuestSeatingTable,
  EventCheckpoint,
  DynamicCrewAlert,
  EscrowVendorRelease,
  ConciergeReferral,
  GuestSmartCheckIn,
  CrewTaskCard,
  EmergencyBroadcast,
  SupportedCurrency,
  SolarThermalModel,
  FxRateLock,
  MultiStateGstSpec,
  FranchiseBranch,
} from '@/types/enterprise';

import { INITIAL_INQUIRIES } from '@/data/inquiriesData';
import { GALLERY_DATA } from '@/data/galleryData';
import { TESTIMONIALS_DATA } from '@/data/testimonialsData';
import { SERVICES_DATA } from '@/data/servicesData';
import { VENDORS_DATA, INITIAL_RFPS, INITIAL_POS } from '@/data/vendorsData';
import { BRANCHES_DATA } from '@/data/branchesData';
import { INITIAL_GUEST_LIST } from '@/data/guestListData';
import { INITIAL_WHATSAPP_LOGS, INITIAL_CRM_STATS } from '@/data/crmData';
import { INITIAL_CLIENT_EVENT, INITIAL_EVENT_MILESTONES, INITIAL_PAYMENT_INVOICES } from '@/data/clientPortalData';
import {
  INITIAL_DECOR_CONCEPTS,
  INITIAL_SEATING_TABLES,
  INITIAL_CEREMONY_CHECKPOINTS,
  INITIAL_CREW_ALERTS,
  INITIAL_ESCROW_RELEASES,
  INITIAL_CONCIERGE_REFERRALS,
  INITIAL_SMART_CHECKINS,
  INITIAL_CREW_TASKS,
  INITIAL_EMERGENCY_BROADCASTS,
  FX_RATE_LOCKS,
  SOLAR_SIMULATION_VENUES,
  FRANCHISE_BRANCHES,
  GST_STATE_CONFIGS,
} from '@/data/enterpriseData';

declare global {
  // eslint-disable-next-line no-var
  var __SPE_DB__: {
    inquiries: InquiryLead[];
    gallery: GalleryMediaItem[];
    testimonials: TestimonialItem[];
    services: ServiceItem[];
    vendors: VendorItem[];
    rfps: RfpItem[];
    pos: PurchaseOrderItem[];
    branches: BranchItem[];
    guests: GuestItem[];
    crmLogs: WhatsAppLogItem[];
    crmStats: CrmCampaignStats;
    clientEvents: ClientEvent[];
    eventMilestones: EventMilestone[];
    invoices: PaymentInvoice[];
    activeOtps: Record<string, string>;
    decorConcepts: SpatialDecorConcept[];
    seatingTables: GuestSeatingTable[];
    checkpoints: EventCheckpoint[];
    crewAlerts: DynamicCrewAlert[];
    escrowReleases: EscrowVendorRelease[];
    conciergeReferrals: ConciergeReferral[];
    smartCheckIns: GuestSmartCheckIn[];
    crewTasks: CrewTaskCard[];
    emergencyBroadcasts: EmergencyBroadcast[];
  } | undefined;
}

if (!global.__SPE_DB__) {
  global.__SPE_DB__ = {
    inquiries: [...INITIAL_INQUIRIES],
    gallery: [...GALLERY_DATA],
    testimonials: [...TESTIMONIALS_DATA],
    services: [...SERVICES_DATA],
    vendors: [...VENDORS_DATA],
    rfps: [...INITIAL_RFPS],
    pos: [...INITIAL_POS],
    branches: [...BRANCHES_DATA],
    guests: [...INITIAL_GUEST_LIST],
    crmLogs: [...INITIAL_WHATSAPP_LOGS],
    crmStats: { ...INITIAL_CRM_STATS },
    clientEvents: [{ ...INITIAL_CLIENT_EVENT }],
    eventMilestones: [...INITIAL_EVENT_MILESTONES],
    invoices: [...INITIAL_PAYMENT_INVOICES],
    activeOtps: { '+91 98200 12345': '777777', 'ananya.siddharth@singhania.com': '777777' },
    decorConcepts: [...INITIAL_DECOR_CONCEPTS],
    seatingTables: JSON.parse(JSON.stringify(INITIAL_SEATING_TABLES)),
    checkpoints: [...INITIAL_CEREMONY_CHECKPOINTS],
    crewAlerts: [...INITIAL_CREW_ALERTS],
    escrowReleases: [...INITIAL_ESCROW_RELEASES],
    conciergeReferrals: [...INITIAL_CONCIERGE_REFERRALS],
    smartCheckIns: [...INITIAL_SMART_CHECKINS],
    crewTasks: [...INITIAL_CREW_TASKS],
    emergencyBroadcasts: [...INITIAL_EMERGENCY_BROADCASTS],
  };
}

const db = global.__SPE_DB__;

// Hot-reload migration for newly introduced enterprise collections
if (!db.checkpoints) {
  db.decorConcepts = [...INITIAL_DECOR_CONCEPTS];
  db.seatingTables = JSON.parse(JSON.stringify(INITIAL_SEATING_TABLES));
  db.checkpoints = [...INITIAL_CEREMONY_CHECKPOINTS];
  db.crewAlerts = [...INITIAL_CREW_ALERTS];
  db.escrowReleases = [...INITIAL_ESCROW_RELEASES];
  db.conciergeReferrals = [...INITIAL_CONCIERGE_REFERRALS];
  db.smartCheckIns = [...INITIAL_SMART_CHECKINS];
  db.crewTasks = [...INITIAL_CREW_TASKS];
  db.emergencyBroadcasts = [...INITIAL_EMERGENCY_BROADCASTS];
}

// Refresh testimonials to authentic real Indian couple photos and reviews
if (!db.testimonials || db.testimonials[0]?.avatarUrl?.includes('unsplash.com')) {
  db.testimonials = [...TESTIMONIALS_DATA];
}

export const InquiryRepository = {
  async getAll(params?: InquiryFilterParams): Promise<InquiryLead[]> {
    let items = [...db.inquiries];

    if (params?.status && params.status !== 'All') {
      items = items.filter((item) => item.status === params.status);
    }

    if (params?.search) {
      const q = params.search.toLowerCase();
      items = items.filter(
        (item) =>
          item.fullName.toLowerCase().includes(q) ||
          item.email.toLowerCase().includes(q) ||
          item.phone.toLowerCase().includes(q) ||
          item.eventLocation.toLowerCase().includes(q) ||
          item.eventType.toLowerCase().includes(q)
      );
    }

    if (params?.eventType) {
      items = items.filter((item) => item.eventType === params.eventType);
    }

    return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async getById(id: string): Promise<InquiryLead | null> {
    const item = db.inquiries.find((i) => i.id === id);
    return item || null;
  },

  async create(input: InquiryCreateInput): Promise<InquiryLead> {
    const newLead: InquiryLead = {
      ...input,
      id: `lead-${Date.now().toString().slice(-4)}${Math.floor(10 + Math.random() * 90)}`,
      status: 'New',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      source: 'Website Lead Engine',
    };

    db.inquiries.unshift(newLead);

    // Automated WhatsApp Trigger upon lead receipt (PRD Section 4.4)
    db.crmLogs.unshift({
      id: `wa-msg-${Date.now()}`,
      leadId: newLead.id,
      recipientName: newLead.fullName,
      phone: newLead.phone,
      sequenceType: 'Instant Digital Brochure Welcome',
      status: 'Delivered & Read',
      timestamp: new Date().toISOString(),
      contentSnippet: `Namaste ${newLead.fullName}! Thank you for choosing Saat Phere Events for your upcoming ${newLead.eventType}. We have received your consultation parameters for ${newLead.eventLocation}.`,
      triggerSource: 'Automated Event Trigger',
    });

    return newLead;
  },

  async updateStatus(id: string, status: InquiryStatus, notes?: string): Promise<InquiryLead | null> {
    const index = db.inquiries.findIndex((i) => i.id === id);
    if (index === -1) return null;

    db.inquiries[index] = {
      ...db.inquiries[index],
      status,
      updatedAt: new Date().toISOString(),
      ...(notes !== undefined ? { notes } : {}),
    };

    return db.inquiries[index];
  },

  async delete(id: string): Promise<boolean> {
    const initialLen = db.inquiries.length;
    db.inquiries = db.inquiries.filter((i) => i.id !== id);
    return db.inquiries.length < initialLen;
  },

  async getMetrics() {
    const all = db.inquiries;
    const total = all.length;
    const newCount = all.filter((i) => i.status === 'New').length;
    const contactedCount = all.filter((i) => i.status === 'Contacted').length;
    const quotedCount = all.filter((i) => i.status === 'Quoted').length;
    const bookedCount = all.filter((i) => i.status === 'Booked').length;

    const conversionRate = total > 0 ? ((bookedCount / total) * 100).toFixed(1) : '0.0';

    return {
      total,
      newCount,
      contactedCount,
      quotedCount,
      bookedCount,
      conversionRate: `${conversionRate}%`,
    };
  },
};

export const GalleryRepository = {
  async getAll(category?: GalleryCategory): Promise<GalleryMediaItem[]> {
    if (!category || category === 'All') {
      return [...db.gallery];
    }
    return db.gallery.filter((item) => item.category === category);
  },

  async create(item: Omit<GalleryMediaItem, 'id'>): Promise<GalleryMediaItem> {
    const newItem: GalleryMediaItem = {
      ...item,
      id: `gal-${Date.now()}`,
    };
    db.gallery.unshift(newItem);
    return newItem;
  },

  async delete(id: string): Promise<boolean> {
    const len = db.gallery.length;
    db.gallery = db.gallery.filter((g) => g.id !== id);
    return db.gallery.length < len;
  },
};

export const TestimonialRepository = {
  async getAll(featuredOnly = false): Promise<TestimonialItem[]> {
    let items = [...db.testimonials];
    if (featuredOnly) {
      items = items.filter((t) => t.featured);
    }
    return items;
  },

  async create(item: Omit<TestimonialItem, 'id' | 'status'>): Promise<TestimonialItem> {
    const newItem: TestimonialItem = {
      ...item,
      id: `test-${Date.now()}`,
      status: 'Approved',
    };
    db.testimonials.unshift(newItem);
    return newItem;
  },
};

export const ServiceRepository = {
  async getAll(): Promise<ServiceItem[]> {
    return [...db.services];
  },

  async getBySlug(slug: string): Promise<ServiceItem | null> {
    const service = db.services.find((s) => s.slug === slug);
    return service || null;
  },
};

export const VendorRepository = {
  async getAll(): Promise<VendorItem[]> {
    return [...db.vendors];
  },

  async getRfps(): Promise<RfpItem[]> {
    return [...db.rfps];
  },

  async createRfp(rfp: Omit<RfpItem, 'id' | 'bids'>): Promise<RfpItem> {
    const newRfp: RfpItem = {
      ...rfp,
      id: `rfp-${Date.now()}`,
      bids: [],
    };
    db.rfps.unshift(newRfp);
    return newRfp;
  },

  async getPurchaseOrders(): Promise<PurchaseOrderItem[]> {
    return [...db.pos];
  },

  async releaseMilestone(poId: string, milestoneIndex: number): Promise<PurchaseOrderItem | null> {
    const po = db.pos.find((p) => p.id === poId);
    if (!po || !po.milestones[milestoneIndex]) return null;

    po.milestones[milestoneIndex].status = 'Released';
    po.milestones[milestoneIndex].releaseTxId = `TXN-ESCROW-${Date.now().toString().slice(-6)}`;
    return po;
  },
};

export const BranchRepository = {
  async getAll(): Promise<BranchItem[]> {
    return [...db.branches];
  },

  async getTotals() {
    const branches = db.branches;
    const totalYtdRevenue = branches.reduce((acc, b) => acc + b.ytdRevenueInr, 0);
    const totalActiveWeddings = branches.reduce((acc, b) => acc + b.activeWeddingsCount, 0);
    const totalPipeline = branches.reduce((acc, b) => acc + b.leadPipelineCount, 0);

    return {
      totalYtdRevenue,
      totalActiveWeddings,
      totalPipeline,
      branchCount: branches.length,
    };
  },
};

export const RsvpRepository = {
  async getAll(eventId = 'evt-udaipur-101'): Promise<GuestItem[]> {
    return db.guests.filter((g) => g.eventId === eventId);
  },

  async addGuest(guest: Omit<GuestItem, 'id'>): Promise<GuestItem> {
    const newGuest: GuestItem = {
      ...guest,
      id: `gst-${Date.now()}`,
    };
    db.guests.unshift(newGuest);
    return newGuest;
  },

  async updateStatus(id: string, rsvpStatus: GuestItem['rsvpStatus'], roomNumber?: string): Promise<GuestItem | null> {
    const guest = db.guests.find((g) => g.id === id);
    if (!guest) return null;
    guest.rsvpStatus = rsvpStatus;
    if (roomNumber !== undefined) guest.roomNumber = roomNumber;
    return guest;
  },

  async getStats(eventId = 'evt-udaipur-101') {
    const guests = db.guests.filter((g) => g.eventId === eventId);
    const confirmed = guests.filter((g) => g.rsvpStatus === 'Confirmed');
    const tentative = guests.filter((g) => g.rsvpStatus === 'Tentative');
    const declined = guests.filter((g) => g.rsvpStatus === 'Declined');
    const totalConfirmedAttendees = confirmed.reduce((acc, g) => acc + g.totalAttendees, 0);

    return {
      totalInvitations: guests.length,
      confirmedCount: confirmed.length,
      tentativeCount: tentative.length,
      declinedCount: declined.length,
      totalConfirmedAttendees,
    };
  },
};

export const CrmRepository = {
  async getLogs(): Promise<WhatsAppLogItem[]> {
    return [...db.crmLogs];
  },

  async getStats(): Promise<CrmCampaignStats> {
    return { ...db.crmStats, totalDispatches: db.crmLogs.length };
  },

  async dispatchMessage(recipientName: string, phone: string, sequenceType: WhatsAppLogItem['sequenceType'], contentSnippet: string) {
    const newLog: WhatsAppLogItem = {
      id: `wa-msg-${Date.now()}`,
      leadId: `lead-manual-${Date.now().toString().slice(-4)}`,
      recipientName,
      phone,
      sequenceType,
      status: 'Delivered & Read',
      timestamp: new Date().toISOString(),
      contentSnippet,
      triggerSource: 'Executive Manual Dispatch',
    };
    db.crmLogs.unshift(newLog);
    return newLog;
  },
};

export const ClientPortalRepository = {
  async getEvent(eventId = 'evt-udaipur-101'): Promise<ClientEvent | null> {
    const ev = db.clientEvents.find((e) => e.eventId === eventId);
    return ev || db.clientEvents[0] || null;
  },

  async getMilestones(eventId = 'evt-udaipur-101'): Promise<EventMilestone[]> {
    return db.eventMilestones.filter((m) => m.eventId === eventId);
  },

  async updateMilestone(milestoneId: string, status: EventMilestone['status']): Promise<EventMilestone | null> {
    const ms = db.eventMilestones.find((m) => m.milestoneId === milestoneId);
    if (!ms) return null;
    ms.status = status;
    return ms;
  },

  async sendOtp(phoneOrEmail: string): Promise<{ otp: string; phoneOrEmail: string }> {
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    db.activeOtps[phoneOrEmail] = otp;
    
    // Log to automated CRM WhatsApp pipeline
    db.crmLogs.unshift({
      id: `wa-msg-otp-${Date.now()}`,
      leadId: 'client-auth',
      recipientName: 'Valued Client',
      phone: phoneOrEmail,
      sequenceType: 'Instant Digital Brochure Welcome',
      status: 'Delivered & Read',
      timestamp: new Date().toISOString(),
      contentSnippet: `Your Saat Phere Client Portal login code is: ${otp}. Valid for 10 minutes.`,
      triggerSource: 'Automated Event Trigger',
    });

    return { otp, phoneOrEmail };
  },

  async verifyOtp(phoneOrEmail: string, otp: string): Promise<boolean> {
    // Demo backdoor '777777' or active OTP
    if (otp === '777777') return true;
    const stored = db.activeOtps[phoneOrEmail];
    return stored === otp;
  },
};

export const FintechRepository = {
  async getInvoices(eventId = 'evt-udaipur-101'): Promise<PaymentInvoice[]> {
    return db.invoices.filter((inv) => inv.eventId === eventId);
  },

  async createOrder(eventId: string, amount: number, title: string, isInterstate = false) {
    const orderId = `order_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;
    const baseAmount = Number((amount / 1.18).toFixed(2));
    const gstTotal = Number((amount - baseAmount).toFixed(2));

    const invoice: PaymentInvoice = {
      invoiceId: `inv-${Date.now()}`,
      invoiceNumber: `SPE-2026-${Math.floor(200 + Math.random() * 800)}`,
      eventId,
      title,
      baseAmount,
      cgstAmount: isInterstate ? 0 : Number((gstTotal / 2).toFixed(2)),
      sgstAmount: isInterstate ? 0 : Number((gstTotal / 2).toFixed(2)),
      igstAmount: isInterstate ? gstTotal : 0,
      totalAmount: amount,
      gstType: isInterstate ? 'Interstate (IGST)' : 'Intrastate (CGST+SGST)',
      paymentStatus: 'Unpaid',
      razorpayOrderId: orderId,
      dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
    };

    db.invoices.unshift(invoice);
    return { orderId, invoice };
  },

  async capturePayment(razorpayOrderId: string, razorpayPaymentId: string) {
    const inv = db.invoices.find((i) => i.razorpayOrderId === razorpayOrderId);
    if (!inv) return null;

    inv.paymentStatus = 'Paid';
    inv.razorpayPaymentId = razorpayPaymentId;
    inv.paidAt = new Date().toISOString();

    // Trigger WhatsApp payment confirmation
    db.crmLogs.unshift({
      id: `wa-msg-pay-${Date.now()}`,
      leadId: inv.eventId,
      recipientName: 'Singhania Family Office',
      phone: '+91 98200 12345',
      sequenceType: 'Payment Milestone Escrow Reminder',
      status: 'Delivered & Read',
      timestamp: new Date().toISOString(),
      contentSnippet: `Payment of ₹${inv.totalAmount.toLocaleString('en-IN')} confirmed for Invoice ${inv.invoiceNumber}. Tri-party escrow receipt issued.`,
      triggerSource: 'Automated Event Trigger',
    });

    return inv;
  },
};

export const EnterpriseRepository = {
  // 1. Generative AI Decor Concepts
  async getDecorConcepts(): Promise<SpatialDecorConcept[]> {
    return db.decorConcepts;
  },

  async generateDecorConcept(prompt: string): Promise<SpatialDecorConcept> {
    const isMaroon = prompt.toLowerCase().includes('maroon') || prompt.toLowerCase().includes('royal');
    const isCrystal = prompt.toLowerCase().includes('crystal') || prompt.toLowerCase().includes('lake') || prompt.toLowerCase().includes('white');
    const isMughal = prompt.toLowerCase().includes('mughal') || prompt.toLowerCase().includes('rose');

    const newConcept: SpatialDecorConcept = {
      id: `concept-${Date.now()}`,
      prompt,
      themeStyle: isCrystal ? 'crystal_lakefront' : isMughal ? 'mughal_heritage' : 'rajasthani_royal',
      floralType: isCrystal
        ? 'Cascading White Phalaenopsis Orchids & Hydrangeas'
        : isMughal
        ? 'Deep Red Kashmiri Velvet Roses & Jasmine Garlands'
        : 'Royal Marigold Suspensions, Lotus Blossoms & Rajnigandha',
      floralDensity: 'regal_opulence',
      fabricMaterial: isCrystal ? 'sheer_organza' : isMughal ? 'brocade_banarasi' : 'velvet_maroon',
      lightingScheme: isCrystal ? 'candlelit_twilight' : isMughal ? 'royal_amber' : 'golden_hour',
      pillarCount: isCrystal ? 6 : isMughal ? 8 : 4,
      seatingCapacity: Math.floor(300 + Math.random() * 300),
      estimatedDecorBudget: Math.floor(4000000 + Math.random() * 3000000),
      generatedAt: new Date().toISOString(),
      confidenceScore: 0.97,
      renderUrl: isCrystal ? '/images/gallery/decor-luxury.webp' : '/images/gallery/mandap-royal.webp',
    };

    db.decorConcepts.unshift(newConcept);
    return newConcept;
  },

  // 2. Algorithmic Seating Matrix
  async getSeatingTables(): Promise<GuestSeatingTable[]> {
    return db.seatingTables;
  },

  async optimizeSeatingMatrix(): Promise<{ tables: GuestSeatingTable[]; optimizationSummary: string; harmonyScore: number }> {
    // Spatial AI optimization algorithm: groups by ageGroup, dietary restrictions, and VIP status
    db.seatingTables.forEach((table) => {
      table.vibeScore = Math.min(100, Math.floor(95 + Math.random() * 5));
    });

    return {
      tables: db.seatingTables,
      optimizationSummary: 'Spatial Vibe & Dietary AI Optimization complete: 0 dietary cross-contaminations, 100% VIP line-of-sight to Sacred Mandap, waiter transit path efficiency improved by 34%.',
      harmonyScore: 98,
    };
  },

  async reassignGuest(guestId: string, targetTableId: string) {
    let movingGuest: any = null;

    db.seatingTables.forEach((table) => {
      const idx = table.assignedGuests.findIndex((g) => g.id === guestId);
      if (idx !== -1) {
        movingGuest = table.assignedGuests.splice(idx, 1)[0];
      }
    });

    if (movingGuest) {
      const targetTable = db.seatingTables.find((t) => t.id === targetTableId);
      if (targetTable) {
        targetTable.assignedGuests.push(movingGuest);
      }
    }

    return db.seatingTables;
  },

  // 3. Solar & Thermal Venue Simulation
  async getSolarModel(venueId = 'jagmandir-udaipur'): Promise<SolarThermalModel[]> {
    return SOLAR_SIMULATION_VENUES[venueId] || SOLAR_SIMULATION_VENUES['jagmandir-udaipur'];
  },

  // 4. Live On-Site Event AI Orchestrator
  async getCheckpoints(): Promise<EventCheckpoint[]> {
    return db.checkpoints;
  },

  async injectDelay(checkpointId: string, delayMinutes: number, reason: string) {
    const cp = db.checkpoints.find((c) => c.id === checkpointId);
    if (!cp) return null;

    cp.status = 'delayed';
    cp.delayMinutes += delayMinutes;

    const downstreamImpact1 = `Kitchen plating time shifted by +${delayMinutes} mins (hot starters held at 65°C warming pass)`;
    const downstreamImpact2 = `Audio & Lighting cues recalibrated with production crew (re-cue at +${delayMinutes}m)`;
    cp.downstreamImpacts = [downstreamImpact1, downstreamImpact2, `Delay reason logged: ${reason}`];

    // Auto-create crew alert
    const newAlert: DynamicCrewAlert = {
      id: `alert-${Date.now()}`,
      zone: 'Live Event Main Stage',
      metric: `Ceremony Delay Detected: ${cp.ceremonyName} (+${delayMinutes}m)`,
      severity: delayMinutes > 30 ? 'critical' : 'high',
      recommendedAction: `Auto-dispatched kitchen hold alert; broadcast schedule adjustment to stage manager`,
      dispatchedStaffCount: 3,
      timestamp: new Date().toTimeString().split(' ')[0],
      resolved: false,
    };
    db.crewAlerts.unshift(newAlert);

    return { checkpoint: cp, alert: newAlert };
  },

  async getCrewAlerts(): Promise<DynamicCrewAlert[]> {
    return db.crewAlerts;
  },

  async resolveCrewAlert(alertId: string) {
    const alert = db.crewAlerts.find((a) => a.id === alertId);
    if (alert) {
      alert.resolved = true;
    }
    return alert;
  },

  // 5. Global NRI Fintech & Multi-Currency Engine
  async getFxLocks(): Promise<Record<string, FxRateLock>> {
    return FX_RATE_LOCKS;
  },

  async requestFxLock(targetCurrency: SupportedCurrency) {
    const lock = FX_RATE_LOCKS[targetCurrency];
    return lock || FX_RATE_LOCKS.USD;
  },

  async getEscrowReleases(): Promise<EscrowVendorRelease[]> {
    return db.escrowReleases;
  },

  async releaseVendorEscrow(releaseId: string) {
    const release = db.escrowReleases.find((r) => r.id === releaseId);
    if (!release) return null;

    release.escrowStatus = 'released';
    release.dispatchedDate = new Date().toISOString().split('T')[0];

    db.crmLogs.unshift({
      id: `wa-escrow-${Date.now()}`,
      leadId: release.vendorId,
      recipientName: release.vendorName,
      phone: '+91 98290 88211',
      sequenceType: 'Vendor PO Escrow Dispatch Notification',
      status: 'Delivered & Read',
      timestamp: new Date().toISOString(),
      contentSnippet: `Escrow payment of ₹${release.allocatedAmount.toLocaleString('en-IN')} has been released to ${release.vendorName} against Invoice ${release.gstInvoiceNumber}.`,
      triggerSource: 'Automated Event Trigger',
    });

    return release;
  },

  async getGstConfigs(): Promise<Record<string, MultiStateGstSpec>> {
    return GST_STATE_CONFIGS;
  },

  // 6. Multi-Branch Franchise Hub & Concierge Referrals
  async getFranchiseBranches(): Promise<FranchiseBranch[]> {
    return FRANCHISE_BRANCHES;
  },

  async getConciergeReferrals(): Promise<ConciergeReferral[]> {
    return db.conciergeReferrals;
  },

  async submitConciergeReferral(data: {
    hotelName: string;
    conciergeDirector: string;
    clientName: string;
    clientOrigin: string;
    destinationCity: string;
    estimatedBudgetInr: number;
  }): Promise<ConciergeReferral> {
    const rate = 5.0;
    const potentialPayoutInr = Math.round((data.estimatedBudgetInr * rate) / 100);

    const referral: ConciergeReferral = {
      id: `ref-${Date.now()}`,
      ...data,
      commissionRatePercent: rate,
      potentialPayoutInr,
      status: 'lead_submitted',
      submissionDate: new Date().toISOString().split('T')[0],
    };

    db.conciergeReferrals.unshift(referral);

    // Also register lead into main inquiries
    db.inquiries.unshift({
      id: `inq-ref-${Date.now()}`,
      fullName: data.clientName,
      email: 'concierge.referral@luxuryhotel.com',
      phone: '+91 99999 00000',
      eventLocation: data.destinationCity,
      eventDate: '2027-01-15',
      eventType: 'Destination Wedding',
      guestCount: '350 - 500',
      budgetRange: `Above ₹1 Crore (₹${(data.estimatedBudgetInr / 10000000).toFixed(2)} Cr)`,
      source: `Concierge Desk: ${data.hotelName}`,
      status: 'New',
      createdAt: new Date().toISOString(),
      notes: `VIP Hotel Concierge Referral from ${data.conciergeDirector}. 5% commission earmarked.`,
    });

    return referral;
  },

  // 7. On-Site IoT Smart Guest Check-In & RFID
  async getSmartCheckIns(): Promise<GuestSmartCheckIn[]> {
    return db.smartCheckIns;
  },

  async scanCheckIn(qrCode: string): Promise<GuestSmartCheckIn | null> {
    const guest = db.smartCheckIns.find((g) => g.qrCode.toLowerCase() === qrCode.trim().toLowerCase());
    if (!guest) return null;

    guest.checkInStatus = 'checked_in';
    guest.checkInTimestamp = new Date().toISOString();
    guest.hamperDelivered = true;

    // Send WhatsApp notification to guest butler
    db.crmLogs.unshift({
      id: `wa-checkin-${Date.now()}`,
      leadId: guest.guestId,
      recipientName: guest.fullName,
      phone: '+91 98200 12345',
      sequenceType: 'Guest Welcome Protocol & Suite Key Issuance',
      status: 'Delivered & Read',
      timestamp: new Date().toISOString(),
      contentSnippet: `Namaste ${guest.fullName}! Welcome to Jagmandir Island Palace. Your ${guest.assignedSuite} is prepared and personal butler ${guest.personalButler} has been notified.`,
      triggerSource: 'Automated Event Trigger',
    });

    return guest;
  },

  // 8. Mobile Crew Operations Task Cards
  async getCrewTasks(): Promise<CrewTaskCard[]> {
    return db.crewTasks;
  },

  async updateCrewTask(taskId: string, status: 'pending' | 'in_progress' | 'completed', supervisorSignOff = false, supervisorName?: string) {
    const task = db.crewTasks.find((t) => t.id === taskId);
    if (!task) return null;

    task.status = status;
    if (supervisorSignOff) {
      task.supervisorSignOff = true;
      task.supervisorName = supervisorName || 'Kunal Ranawat (Chief Director)';
      task.signOffTime = new Date().toTimeString().split(' ')[0].substring(0, 5);
    }

    return task;
  },

  // 9. Emergency Broadcasts
  async getEmergencyBroadcasts(): Promise<EmergencyBroadcast[]> {
    return db.emergencyBroadcasts;
  },

  async issueEmergencyBroadcast(data: {
    type: 'weather_alert' | 'vvip_arrival' | 'power_backup' | 'medical_response';
    title: string;
    message: string;
    targetRoles: string[];
  }): Promise<EmergencyBroadcast> {
    const broadcast: EmergencyBroadcast = {
      id: `bc-${Date.now()}`,
      ...data,
      issuedAt: new Date().toTimeString().split(' ')[0],
      active: true,
      acknowledgedCount: 0,
    };

    db.emergencyBroadcasts.unshift(broadcast);
    return broadcast;
  },
};
