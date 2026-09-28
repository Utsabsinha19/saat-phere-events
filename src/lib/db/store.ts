import { InquiryLead, InquiryCreateInput, InquiryStatus, InquiryFilterParams } from '@/types/inquiry';
import { GalleryMediaItem, GalleryCategory } from '@/types/gallery';
import { TestimonialItem } from '@/types/testimonial';
import { ServiceItem } from '@/types/service';
import { INITIAL_INQUIRIES } from '@/data/inquiriesData';
import { GALLERY_DATA } from '@/data/galleryData';
import { TESTIMONIALS_DATA } from '@/data/testimonialsData';
import { SERVICES_DATA } from '@/data/servicesData';

// Global memory cache preserving state across Next.js server actions / API calls in dev/prod
declare global {
  // eslint-disable-next-line no-var
  var __SPE_DB__: {
    inquiries: InquiryLead[];
    gallery: GalleryMediaItem[];
    testimonials: TestimonialItem[];
    services: ServiceItem[];
  } | undefined;
}

if (!global.__SPE_DB__) {
  global.__SPE_DB__ = {
    inquiries: [...INITIAL_INQUIRIES],
    gallery: [...GALLERY_DATA],
    testimonials: [...TESTIMONIALS_DATA],
    services: [...SERVICES_DATA],
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

    // Conversion rate: Booked / Total
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
