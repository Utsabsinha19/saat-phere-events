# Saat Phere Events – Production Deployment Guide

## 1. Environment & Infrastructure (PRD Section 5.1)
* **Server Specification:** Managed High-Speed NVMe SSD Server (Hostinger Cloud, AWS EC2 / ECS, or Vercel Enterprise).
* **SSL Certificate:** Pre-configured 256-bit Let's Encrypt / AWS ACM SSL certificate.
* **Domain Name:** `www.saatphereevents.com`

---

## 2. Environment Variables

### Frontend (`frontend/.env.production` / `frontend/.env.local`)
```env
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://www.saatphereevents.com
NEXT_PUBLIC_API_URL=https://api.saatphereevents.com
NEXT_PUBLIC_GA4_ID=G-SAATPHERE2026
```

### Backend (`backend/.env.production` / `backend/.env`)
```env
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://www.saatphereevents.com

# Notification Email Config (PRD Section 4.1)
ADMIN_ALERT_EMAIL=info@saatphereevents.com
CONCIERGE_HOTLINE=+919876543210

# Phase 2 Payment Gateway (PRD Section 6)
RAZORPAY_KEY_ID=rzp_live_your_key_here
RAZORPAY_KEY_SECRET=your_secret_here
```

---

## 3. Build & Run Commands

```bash
# Install dependencies across all workspaces
npm run install:all

# Production Build
npm run build

# Start production server (runs both frontend on 3000 & backend on 5000)
npm run start
```

