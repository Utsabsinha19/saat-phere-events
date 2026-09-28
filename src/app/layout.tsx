import type { Metadata } from 'next';
import '@/styles/globals.css';
import { SITE_CONFIG } from '@/config/site';
import { TopBanner } from '@/components/layout/TopBanner';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { ClickToCall } from '@/components/layout/ClickToCall';
import { StructuredData } from '@/components/seo/StructuredData';

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} | Luxury Wedding Planners & Bespoke Event Management`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    'luxury wedding planners india',
    'destination weddings rajasthan',
    'udaipur palace weddings',
    'jaipur royal wedding decor',
    'mandap design and florals',
    'saat phere events',
    'high-net-worth event management',
    'sangeet stage production',
    'haldi mehendi celebrations',
  ],
  authors: [{ name: SITE_CONFIG.name }],
  metadataBase: new URL(SITE_CONFIG.url),
  openGraph: {
    title: `${SITE_CONFIG.name} | Luxury Wedding Planners`,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <StructuredData />
        <TopBanner />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <ClickToCall />
      </body>
    </html>
  );
}
