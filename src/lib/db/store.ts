import { InquiryLead, InquiryCreateInput, InquiryStatus, InquiryFilterParams } from '@/types/inquiry';
import { GalleryMediaItem, GalleryCategory } from '@/types/gallery';
import { TestimonialItem } from '@/types/testimonial';
import { ServiceItem } from '@/types/service';
import { VendorItem, RfpItem, PurchaseOrderItem } from '@/types/vendor';
import { BranchItem } from '@/types/branch';
import { GuestItem } from '@/types/rsvp';
import { WhatsAppLogItem, CrmCampaignStats } from '@/types/crm';

import { INITIAL_INQUIRIES } from '@/data/inquiriesData';
import { GALLERY_DATA } from '@/data/galleryData';
import { TESTIMONIALS_DATA } from '@/data/testimonialsData';
import { SERVICES_DATA } from '@/data/servicesData';
import { VENDORS_DATA, INITIAL_RFPS, INITIAL_POS } from '@/data/vendorsData';
import { BRANCHES_DATA } from '@/data/branchesData';
import { INITIAL_GUEST_LIST } from '@/data/guestListData';
import { INITIAL_WHATSAPP_LOGS, INITIAL_CRM_STATS } from '@/data/crmData';

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
  };
}

const db = global.__SPE_DB__;

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
