export const SITE_CONFIG = {
  name: 'Saat Phere Events',
  tagline: 'Where Luxury Meets Unforgettable Celebrations',
  origin: 'Proudly Rooted in Bihar',
  description:
    'Bihar’s premier luxury wedding planning and bespoke event management company. Born in Katihar, crafting royal destination weddings, palatial mandap decor, and unforgettable milestone celebrations across India.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'saat-phere-events.vercel.app',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://saat-phere-events.vercel.app',
  logo: '/images/logo-official-transparent.png',
  contact: {
    phone: '+91 72091 27697',
    phoneRaw: '+917209127697',
    whatsapp: '+91 72091 27697',
    whatsappRaw: '917209127697',
    email: 'saatpherektr@gmail.com',
    supportEmail: 'saatpherektr@gmail.com',
    hours: 'Monday – Sunday: 9:00 AM – 9:00 PM IST',
    headquarters: {
      street: 'Daulat Ram Chowk',
      city: 'Katihar',
      state: 'Bihar',
      postalCode: '854105',
      country: 'India',
    },
    branchOffices: [
      { city: 'Patna', address: 'Boring Road / Fraser Road, Patna, Bihar' },
      { city: 'Katihar', address: 'Daulat Ram Chowk, Katihar, Bihar' },
      { city: 'Jaipur', address: 'Civil Lines, Jaipur, Rajasthan' },
      { city: 'Udaipur', address: 'Lake Pichola Road, Udaipur, Rajasthan' },
      { city: 'Goa', address: 'Candolim Coastal Road, North Goa' },
      { city: 'New Delhi', address: 'Aerocity Hospitality District, New Delhi' },
    ]
  },
  socials: {
    instagram: 'https://www.instagram.com/saatphereevents?stkn=MXJhYmp6eGs4M3Izcg==',
    facebook: 'https://facebook.com/saatphereevents',
    youtube: 'https://youtube.com/@saatphereevents?si=jO_PgLXK1N8-T0S3',
    pinterest: 'https://pinterest.com/saatphereevents',
  },
  kpis: {
    targetConversionRate: '4.5%',
    pageSpeedTargetDesktop: 90,
    pageSpeedTargetMobile: 85,
    maxFcpSeconds: 2.0,
  }
};
