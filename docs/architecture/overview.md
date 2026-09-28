# Saat Phere Events – Enterprise Architecture & System Specification

## 1. Architectural Overview
This platform is built according to the **Saat Phere Events Product Requirements Document (PRD v1.0)**. It serves as both a high-converting luxury digital showcase for High-Net-Worth Individuals (HNWIs) and a zero-code Administrative Lead Operations & Content Management Engine.

### 1.1 Key Technical Tenets
- **Framework:** Next.js 16+ (React 19, TypeScript, App Router) with Server & Client Component separation.
- **Design System:** Custom Vanilla CSS Design System implementing the official PRD palette:
  - Champagne Gold (`#D4AF37`)
  - Ivory (`#FFFDD0`)
  - Pure White (`#FFFFFF`)
  - Deep Maroon (`#800020`)
- **Typography:** *Playfair Display* & *Cormorant Garamond* (Serif display headings) paired with *Montserrat* & *Inter* (Crisp sans-serif body).
- **SEO & Google Search Grounding:** Dynamic JSON-LD structured data (`EventPlanner`, `LocalBusiness`), clean URL routing (`/services/[slug]`), automated XML sitemap (`/sitemap.xml`), and robots directive (`/robots.txt`).

---

## 2. Directory & Subfolder Hierarchy

```
saat_phere_events/
├── docs/                                  # Enterprise Architecture & API Docs
│   ├── architecture/
│   │   └── overview.md
│   ├── api/
│   │   └── endpoints.md
│   └── deployment.md
├── public/                                # Public Static Assets
│   └── images/
│       ├── gallery/
│       ├── hero/
│       └── services/
├── src/
│   ├── app/                               # Next.js App Router Pages & APIs
│   │   ├── (public pages)/
│   │   │   ├── about/page.tsx             # Brand Story, Leadership & Methodology
│   │   │   ├── contact/page.tsx           # Official 9-field Form & Google Maps Pin
│   │   │   ├── packages/page.tsx          # Interactive Quotation Engine
│   │   │   ├── portfolio/page.tsx         # 6-Category Filterable Gallery & Lightbox
│   │   │   ├── services/
│   │   │   │   ├── page.tsx               # 9-Service Discipline Index
│   │   │   │   └── [slug]/page.tsx        # Dynamic Dedicated Service Templates
│   │   ├── admin/                         # Admin Content Management Panel
│   │   │   ├── gallery/page.tsx           # Media Showcase Manager & Uploader
│   │   │   ├── inquiries/page.tsx         # Lead Qualification & CSV Exporter
│   │   │   ├── services/page.tsx          # WYSIWYG Content Editor
│   │   │   ├── settings/page.tsx          # Domain, Payment & Notification Config
│   │   │   ├── testimonials/page.tsx      # Reviews Approval Manager
│   │   │   ├── layout.tsx                 # Dedicated Admin Layout & Sidebar
│   │   │   └── page.tsx                   # Executive Dashboard & KPIs
│   │   ├── portal/                        # Phase 2 Client Account Portal
│   │   │   └── page.tsx                   # Couple Milestones, Moodboards & Invoices
│   │   ├── api/                           # REST API Route Handlers
│   │   │   ├── gallery/route.ts           # Media Catalog Endpoints
│   │   │   ├── health/route.ts            # System Health & Uptime
│   │   │   ├── inquiries/
│   │   │   │   ├── route.ts               # Lead Ingestion & Notifications
│   │   │   │   ├── [id]/route.ts          # Status & Notes PATCH
│   │   │   │   └── export/route.ts        # Lead CSV Downloader
│   │   │   ├── quotes/route.ts            # Dynamic Quotation Engine Route
│   │   │   ├── services/route.ts          # Services JSON Data
│   │   │   └── testimonials/route.ts      # Reviews Endpoints
│   │   ├── layout.tsx                     # Root Layout (Nav, Footer, FABs, SEO)
│   │   ├── page.tsx                       # Home Page (Hero, Intro, Grid, Carousel)
│   │   ├── robots.ts                      # Automated Robots.txt
│   │   └── sitemap.ts                     # Automated XML Sitemap
│   ├── components/                        # Modular React UI Components
│   │   ├── admin/                         # Admin UI Primitives
│   │   │   ├── AdminHeader.tsx
│   │   │   ├── AdminSidebar.tsx
│   │   │   ├── StatCard.tsx
│   │   │   └── StatusBadge.tsx
│   │   ├── common/                        # Reusable Brand Elements
│   │   │   ├── GoldDivider.tsx            # Ornamental Indian Diamond Motif
│   │   │   ├── LightboxModal.tsx          # HD Photo Lightbox
│   │   │   ├── SectionHeading.tsx         # Luxury Typography Headings
│   │   │   └── VideoModal.tsx             # Cinematic Video Player
│   │   ├── forms/                         # Enterprise Lead Conversion Forms
│   │   │   ├── ContactInquiryForm.tsx     # The Official 9-Field Lead Engine
│   │   │   ├── QuickInquiryModal.tsx      # Modal Triggered By CTAs
│   │   │   └── QuotationCalculator.tsx    # Interactive Parameter Engine
│   │   ├── layout/                        # Navigation & Global Anchors
│   │   │   ├── ClickToCall.tsx            # Sticky 1-Click Mobile Bar
│   │   │   ├── FloatingWhatsApp.tsx       # Persistent Bottom-Right WhatsApp FAB
│   │   │   ├── Footer.tsx                 # 4-Column Luxury Footer
│   │   │   ├── Header.tsx                 # Glassmorphic Header & Mega Dropdown
│   │   │   └── TopBanner.tsx              # Deep Maroon Royal Announcement Bar
│   │   ├── sections/                      # Page Specific Sections
│   │   │   └── home/
│   │   │       ├── BrandIntro.tsx
│   │   │       ├── HeroSection.tsx
│   │   │       ├── InstagramGrid.tsx
│   │   │       ├── LuxuryStats.tsx
│   │   │       ├── ServicesGrid.tsx
│   │   │       ├── ShowcasePreview.tsx
│   │   │       └── TestimonialsCarousel.tsx
│   │   └── seo/
│   │       └── StructuredData.tsx         # Google JSON-LD Schema
│   ├── config/                            # Enterprise Site Configuration
│   │   ├── navigation.ts                  # Main & Footer Nav Tree
│   │   ├── site.ts                        # Company Metadata, Contacts, KPIs
│   │   └── theme.ts                       # Hex Codes & Font Design Tokens
│   ├── data/                              # Production-Grade Seed Data
│   │   ├── galleryData.ts                 # 12+ HD Photography & Video Showcases
│   │   ├── inquiriesData.ts               # Sample Leads across 4 Status Tiers
│   │   ├── servicesData.ts                # All 9 Service Discipline Specifications
│   │   └── testimonialsData.ts            # Verified HNWI Couple Reviews
│   ├── lib/                               # Core Business Logic & Repositories
│   │   ├── db/
│   │   │   └── store.ts                   # Enterprise Repository Pattern & Store
│   │   ├── email/
│   │   │   ├── adminNotification.ts       # Alert to info@saatphereevents.com
│   │   │   └── clientConfirmation.ts      # Automated Client Receipt Email
│   │   ├── payments/
│   │   │   └── razorpay.ts                # Phase 2 Razorpay & GST Invoice Stubs
│   │   ├── utils/
│   │   │   ├── exportCsv.ts               # Lead CSV Transformer
│   │   │   └── formatters.ts              # INR, Dates, and Slugs
│   │   └── validations/
│   │       ├── inquiry.ts                 # 9-Field Zod Validation Schema
│   │       └── quote.ts                   # Quotation Engine Zod Schema
│   ├── styles/                            # CSS Architecture
│   │   ├── admin.css                      # Executive Dashboard Styling
│   │   ├── animations.css                 # Gold Shimmer & Micro-Interactions
│   │   ├── globals.css                    # Luxury Base Rules & Components
│   │   └── variables.css                  # PRD Design Tokens & Root Variables
│   └── types/                             # Domain TypeScript Types
│       ├── gallery.ts
│       ├── inquiry.ts
│       ├── quotation.ts
│       ├── service.ts
│       └── testimonial.ts
```

---

## 3. Lead Conversion Pipeline (PRD Section 4.1)

```
[Visitor Submits 9-Core Form / Quote Engine]
                   │
                   ▼
       [Zod Schema Validation]
       ├── Validates Phone (+91/int'l)
       ├── Validates Business/Personal Email
       └── Validates Date & Budget Range
                   │
                   ▼
       [InquiryRepository Store]
       ├── Generates Unique Lead ID (#lead-XXXX)
       ├── Tags Initial Status: 'New'
       └── Stores Timestamp & Source Channel
                   │
         ┌─────────┴─────────┐
         ▼                   ▼
[Admin Alert Dispatched]   [Client Confirmation]
info@saatphereevents.com   Immediate personalized
Instant qualification      email acknowledging
details                    receipt & timeline
```
