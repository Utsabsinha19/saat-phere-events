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

## 2. Enterprise Project Directory Hierarchy (Monorepo)

```
saat_phere_events/
├── frontend/                              # Next.js 16 Web Client Application
│   ├── public/                            # Public Static Media & Web Assets (Hero, Gallery, Services)
│   ├── src/
│   │   ├── app/                           # Next.js App Router (React 19, TypeScript)
│   │   │   ├── page.tsx                   # Luxury Home Page with 7 core sections
│   │   │   ├── about/page.tsx             # Brand Story, Leadership & Methodology
│   │   │   ├── services/                  # 9 Dedicated Service Discipline Pages
│   │   │   ├── portfolio/page.tsx         # 6-Category Filterable Gallery & HD Lightbox
│   │   │   ├── packages/page.tsx          # Interactive Quotation Engine
│   │   │   ├── contact/page.tsx           # Official 9-Field Lead Engine & Google Maps
│   │   │   ├── admin/                     # Admin CMS, Inquiries, CRM, Gallery, Testimonials
│   │   │   ├── portal/                    # Phase 2 Client Account Portal & Invoicing
│   │   │   ├── studio/                    # 3D Spatial Decor & Mandap Studio (Three.js)
│   │   │   ├── rsvp/                      # VIP Wedding Guest RSVP & Digital Pass Generator
│   │   │   ├── vendors/                   # Verified Luxury Vendor & RFP Network
│   │   │   ├── enterprise/                # Enterprise White-Label & Global Operations
│   │   │   ├── layout.tsx                 # Root Layout (Nav, TopBanner, WhatsApp FAB, Call Bar)
│   │   │   ├── robots.ts                  # Automated Robots.txt
│   │   │   └── sitemap.ts                 # Automated Google XML Sitemap
│   │   ├── components/                    # Modular Component System (Admin, Forms, Layout, Studio)
│   │   ├── config/                        # Design tokens, theme, site metadata
│   │   ├── data/                          # Frontend reference catalogs & seed datasets
│   │   ├── styles/                        # Design System CSS (globals, variables, admin, responsive)
│   │   ├── types/                         # TypeScript Domain Interfaces
│   │   └── lib/                           # Frontend utility helpers & formatters
│   ├── next.config.ts                     # Next.js Config with API Proxy Rewrites to Backend
│   ├── package.json                       # Next.js & React dependencies
│   └── tsconfig.json                      # Frontend TypeScript config
├── backend/                               # Express REST API & Enterprise Services Server
│   ├── src/
│   │   ├── routes/                        # Express API Routers
│   │   │   ├── health.ts                  # Enterprise Health Check endpoint
│   │   │   ├── inquiries.ts               # Lead ingestion, triage, CSV export
│   │   │   ├── quotes.ts                  # Dynamic proposal calculator
│   │   │   ├── gallery.ts                 # Media showcase manager
│   │   │   ├── testimonials.ts            # Reviews repository
│   │   │   ├── services.ts                # Services JSON data
│   │   │   ├── vendors.ts                 # Vendor network & RFP engine
│   │   │   ├── branches.ts                # National franchise branch data
│   │   │   ├── rsvps.ts                   # VIP Guest RSVP engine
│   │   │   ├── crm.ts                     # WhatsApp CRM notifications
│   │   │   ├── payments.ts                # Razorpay orders & webhooks
│   │   │   ├── v1/client.ts               # Client OTP auth, dashboard, RSVP update
│   │   │   ├── v1/enterprise.ts           # Orchestrator, Check-in, Crew, Fintech, Spatial
│   │   │   └── index.ts                   # Master API Route Aggregator
│   │   ├── db/                            # In-memory store & Supabase integrations
│   │   ├── email/                         # Automated notification pipelines
│   │   ├── payments/                      # Razorpay payment gateways & GST invoicing
│   │   ├── validations/                   # Zod schemas for input validation
│   │   ├── data/                          # Production seed databases
│   │   ├── types/                         # Domain TypeScript interfaces
│   │   └── server.ts                      # Express App on PORT 5000 with CORS & middleware
│   ├── supabase/                          # Supabase DB configuration & migrations
│   ├── package.json                       # Express, CORS, Zod, TSX dependencies
│   └── tsconfig.json                      # Backend TypeScript config
├── docs/                                  # Enterprise Architecture & API Docs
│   ├── architecture/overview.md           # System Architecture & Technical Specifications
│   ├── api/endpoints.md                   # REST API Specification (cURL & Payloads)
│   └── deployment.md                      # Production Deployment Guide
└── package.json                           # Root Monorepo Orchestrator (Concurrent Dev Runner)
```

### Running the Monorepo

```bash
# Start both Frontend (port 3000) and Backend (port 5000) concurrently:
npm run dev

# Or start individually:
npm run dev:frontend    # Starts Next.js client on http://localhost:3000
npm run dev:backend     # Starts Express API server on http://localhost:5000

# Build both applications:
npm run build
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
