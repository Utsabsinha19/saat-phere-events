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
NEXT_PUBLIC_SITE_URL=https://saat-phere-events.vercel.app
NEXT_PUBLIC_SITE_DOMAIN=saat-phere-events.vercel.app
NEXT_PUBLIC_API_URL=https://api.saatphereevents.com
BACKEND_URL=https://api.saatphereevents.com
NEXT_PUBLIC_GA4_ID=G-SAATPHERE2026
```

### Backend (`backend/.env.production` / `backend/.env`)
```env
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://saat-phere-events.vercel.app

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

---

## 4. Vercel Frontend Deployment (`https://saat-phere-events.vercel.app/`)

### Step-by-Step Vercel Setup:

1. **Import Git Repository**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard) -> **Add New...** -> **Project**.
   - Select `Utsabsinha19/saat-phere-events`.

2. **Configure Project Settings**:
   - **Framework Preset**: `Next.js`
   - **Root Directory**: Click `Edit` and select `frontend`.
   - **Build Command**: `next build` (or leave default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

3. **Add Environment Variables in Vercel**:
   In the **Environment Variables** section of the Vercel project settings, add:

   | Key | Value | Notes |
   |---|---|---|
   | `NEXT_PUBLIC_SITE_URL` | `https://saat-phere-events.vercel.app` | Canonical site URL for metadata & sitemaps |
   | `NEXT_PUBLIC_SITE_DOMAIN` | `saat-phere-events.vercel.app` | Domain without https scheme |
   | `NEXT_PUBLIC_API_URL` | `https://api.saatphereevents.com` | Deployed backend API base URL |
   | `BACKEND_URL` | `https://api.saatphereevents.com` | Server-side proxy rewrites target |
   | `NEXT_PUBLIC_GA4_ID` | `G-SAATPHERE2026` | Google Analytics 4 Measurement ID |

4. **Domains Setting**:
   - Go to **Project Settings** -> **Domains**.
   - Ensure `saat-phere-events.vercel.app` is added and assigned to the Production branch (`main` / `master`).

5. **Deploy**:
   - Click **Deploy**. Vercel will build the frontend with static generation and server-side optimization.


