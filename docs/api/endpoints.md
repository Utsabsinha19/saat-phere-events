# Saat Phere Events – REST API Endpoints Specification

## 1. Inquiries & Lead Management

### `GET /api/inquiries`
Returns a list of leads with optional filtering and aggregate KPIs.
* **Query Parameters:**
  * `status`: `'New' | 'Contacted' | 'Quoted' | 'Booked' | 'All'`
  * `search`: String matching name, email, phone, city, or category
* **Response:**
```json
{
  "success": true,
  "count": 4,
  "metrics": {
    "total": 4,
    "newCount": 1,
    "contactedCount": 1,
    "quotedCount": 1,
    "bookedCount": 1,
    "conversionRate": "25.0%"
  },
  "data": [ ... ]
}
```

### `POST /api/inquiries`
Submits a new 9-field event lead inquiry and triggers the automated email pipeline.
* **Payload:**
```json
{
  "fullName": "Vikram Singhania",
  "phone": "+91 98201 12345",
  "email": "vikram@singhaniagroup.in",
  "eventType": "Destination Wedding",
  "eventDate": "2026-12-18",
  "eventLocation": "Jagmandir Island Palace, Udaipur",
  "guestCount": "250 – 500 Guests (Grand Royal)",
  "budgetRange": "₹1.5 Cr – ₹3 Cr",
  "requirements": "Require 3-day island palace buyout and charter flight coordination."
}
```

### `PATCH /api/inquiries/[id]`
Updates lead status or staff follow-up notes in the Admin Dashboard.
* **Payload:**
```json
{
  "status": "Quoted",
  "notes": "Sent 3D mandap deck and line-item budget."
}
```

### `GET /api/inquiries/export`
Exports inquiries directly as a downloadable `.csv` file.

---

## 2. Interactive Quotation Engine

### `POST /api/quotes`
Processes event scope parameters, computes the recommended planning tier, and records the request as a lead.
* **Payload:**
```json
{
  "eventType": "Destination Wedding",
  "guestCount": 350,
  "venueType": "Heritage Palace",
  "cityLocation": "Udaipur, Rajasthan",
  "budgetRange": "₹1.5 Cr – ₹3 Cr",
  "selectedServices": [
    "Full Wedding Planning & Day-of Orchestration",
    "Destination Weddings & Guest Hospitality"
  ],
  "fullName": "Siddharth Singhania",
  "phone": "+91 98765 43210",
  "email": "siddharth@singhania.com"
}
```

---

## 3. Gallery, Testimonials & Health

* `GET /api/gallery?category=Mandap+Designs`: Returns media items filtered by category.
* `POST /api/gallery`: Uploads and publishes a new photo or video showcase.
* `GET /api/testimonials`: Returns approved verified reviews.
* `POST /api/testimonials`: Adds client review.
* `GET /api/services`: Returns metadata for all 9 event disciplines.
* `GET /api/health`: Uptime and system component diagnostics.
