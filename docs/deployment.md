# Saat Phere Events – Production Deployment Guide

## 1. Environment & Infrastructure (PRD Section 5.1)
* **Server Specification:** Managed High-Speed NVMe SSD Server (Hostinger Cloud, AWS EC2 / ECS, or Vercel Enterprise).
* **SSL Certificate:** Pre-configured 256-bit Let's Encrypt / AWS ACM SSL certificate.
* **Domain Name:** `www.saatphereevents.com`

---

## 2. Environment Variables (.env.local / .env.production)

```env
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://www.saatphereevents.com

# Notification Email Config (PRD Section 4.1)
ADMIN_ALERT_EMAIL=info@saatphereevents.com
CONCIERGE_HOTLINE=+919876543210

# Phase 2 Payment Gateway (PRD Section 6)
RAZORPAY_KEY_ID=rzp_live_your_key_here
RAZORPAY_KEY_SECRET=your_secret_here

# Analytics & SEO (PRD Section 5.2)
NEXT_PUBLIC_GA4_ID=G-SAATPHERE2026
```

---

## 3. Build & Run Commands

```bash
# Install dependencies
npm install

# Test compilation & route generation
npm run build

# Start production server
npm start
```
