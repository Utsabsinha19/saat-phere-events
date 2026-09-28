# Saat Phere Events – Digital Platform & Enterprise Architecture

> **Official Digital Platform & Brand Specification for Saat Phere Events**  
> Luxury Wedding Planning & Bespoke Event Management  
> Built strictly adhering to the Product Requirements Document (PRD v1.0).

---

## 1. Executive Summary & Brand Identity

* **Theme:** Luxury Indian wedding heritage blended with modern minimalist typography and regal spatial design.
* **Palette:**
  * **Champagne Gold:** `#D4AF37`
  * **Ivory:** `#FFFDD0`
  * **Pure White:** `#FFFFFF`
  * **Deep Maroon:** `#800020`
* **Typography:** *Playfair Display* / *Cormorant Garamond* (Serif display) and *Montserrat* / *Inter* (Sans-serif body).
* **Target Domain:** `www.saatphereevents.com`

---

## 2. Enterprise Project Directory Hierarchy

```
saat_phere_events/
├── docs/                                  # Enterprise Architecture & API Docs
│   ├── architecture/overview.md           # System Architecture & Technical Specifications
│   ├── api/endpoints.md                   # REST API Specification (cURL & Payloads)
│   └── deployment.md                      # NVMe Server & Production Deployment Guide
├── public/                                # Public Static Media & Web Assets
│   └── images/                            # Hero, gallery, and service photography
├── src/
│   ├── app/                               # Next.js App Router (React 19, TypeScript)
│   │   ├── (public pages)/
│   │   │   ├── page.tsx                   # Luxury Home Page with 7 core sections
│   │   │   ├── about/page.tsx             # Brand Story, Leadership & 4-Stage Methodology
│   │   │   ├── services/page.tsx          # 9-Service Discipline Overview
│   │   │   ├── services/[slug]/page.tsx   # Dynamic Dedicated Service Page Templates (SSG)
│   │   │   ├── portfolio/page.tsx         # 6-Category Filterable Gallery & HD Lightbox
│   │   │   ├── packages/page.tsx          # Interactive Quotation Engine (No fixed prices)
│   │   │   └── contact/page.tsx           # Official 9-Field Lead Engine & Google Maps
│   │   ├── admin/                         # Admin Content Management Panel
│   │   │   ├── layout.tsx                 # Dedicated Admin Layout with Sidebar
│   │   │   ├── page.tsx                   # Executive Dashboard & KPI Metrics
│   │   │   ├── inquiries/page.tsx         # Lead Qualification & CSV/Excel Exporter
│   │   │   ├── gallery/page.tsx           # Media Showcase Manager & Uploader
│   │   │   ├── testimonials/page.tsx      # Verified Reviews & Approval Manager
│   │   │   ├── services/page.tsx          # WYSIWYG Content Editor
│   │   │   └── settings/page.tsx          # Domain, Payment & Notification Config
│   │   ├── portal/                        # Phase 2 Client Account Portal
│   │   │   └── page.tsx                   # Milestones, 3D Moodboards & GST Invoices
│   │   ├── api/                           # REST API Endpoints
│   │   │   ├── inquiries/                 # Lead ingestion, status triage, CSV export
│   │   │   ├── quotes/                    # Dynamic proposal calculator
│   │   │   ├── gallery/                   # Media catalog
│   │   │   ├── testimonials/              # Reviews repository
│   │   │   ├── services/                  # Services JSON data
│   │   │   └── health/                    # Enterprise health check
│   │   ├── layout.tsx                     # Global Root Layout (SEO, Nav, WhatsApp FAB, Call Bar)
│   │   ├── robots.ts                      # Automated Robots.txt
│   │   └── sitemap.ts                     # Automated Google XML Sitemap
│   ├── components/                        # Modular Component System
│   │   ├── admin/                         # AdminHeader, AdminSidebar, StatCard, StatusBadge
│   │   ├── common/                        # GoldDivider, SectionHeading, LightboxModal, VideoModal
│   │   ├── forms/                         # ContactInquiryForm (9-field), QuotationCalculator, QuickInquiryModal
│   │   ├── layout/                        # TopBanner, Header, Footer, FloatingWhatsApp, ClickToCall
│   │   ├── sections/home/                 # HeroSection, BrandIntro, ServicesGrid, LuxuryStats, TestimonialsCarousel, InstagramGrid
│   │   └── seo/                           # StructuredData (EventPlanner & LocalBusiness schema)
│   ├── config/                            # Site metadata, navigation tree, and design tokens
│   ├── data/                              # Production seed data (Services, Gallery, Testimonials, Inquiries)
│   ├── lib/                               # Business logic, repositories, email pipelines, payments
│   ├── styles/                            # Vanilla CSS Design System (variables, globals, animations, admin)
│   └── types/                             # Domain TypeScript interfaces
```

---

## 3. The 9 Dedicated Service Disciplines

1. **Wedding Planning & Management** (`/services/wedding-planning-and-management`)
2. **Destination Weddings** (`/services/destination-weddings`)
3. **Engagement & Ring Ceremony** (`/services/engagement-and-ring-ceremony`)
4. **Birthday Parties & Kids Events** (`/services/birthday-parties-and-kids-events`)
5. **Anniversary & Couple Celebrations** (`/services/anniversary-and-couple-celebrations`)
6. **Haldi, Mehendi & Sangeet Ceremonies** (`/services/haldi-mehendi-and-sangeet`)
7. **Reception & Wedding Decor** (`/services/reception-and-wedding-decor`)
8. **Corporate Events & Private Parties** (`/services/corporate-events-and-private-parties`)
9. **Theme Parties & Customized Events** (`/services/theme-parties-and-customized-events`)

---

## 4. Key Functional Features

* **Official 9-Core Field Lead Engine:** Captures Full Name, Phone, Email, Event Type, Target Date, Location/City, Guest Count, Budget Range, and Requirements.
* **Instant Automated Notifications:** Instant dispatch simulation to `info@saatphereevents.com` and personalized client confirmation.
* **Admin Lead Console:** Real-time triage (`New`, `Contacted`, `Quoted`, `Booked`), internal notes log, and 1-click CSV export.
* **Interactive Quotation Engine:** Enables clients to configure preferences and receive proposal tier breakdowns without fixed prices.
* **Instant Communication:** Persistent WhatsApp Floating Action Button (FAB) and sticky mobile Click-to-Call bar.
* **Phase 2 Expansion Ready:** Razorpay payment stubs, GST invoicing (SAC 998596), and client milestone portal.

---

## 5. Getting Started

### Development Mode
```bash
npm run dev
```

### Production Build & Test
```bash
npm run build
npm start
```
