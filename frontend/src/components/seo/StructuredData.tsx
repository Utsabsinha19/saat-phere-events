import React from 'react';
import { SITE_CONFIG } from '@/config/site';

export const StructuredData: React.FC = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `${SITE_CONFIG.url}/#localbusiness`,
        name: SITE_CONFIG.name,
        description: SITE_CONFIG.description,
        url: SITE_CONFIG.url,
        logo: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
        image: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
        telephone: SITE_CONFIG.contact.phoneRaw,
        email: SITE_CONFIG.contact.email,
        priceRange: '₹₹₹₹',
        address: {
          '@type': 'PostalAddress',
          streetAddress: SITE_CONFIG.contact.headquarters.street,
          addressLocality: SITE_CONFIG.contact.headquarters.city,
          addressRegion: SITE_CONFIG.contact.headquarters.state,
          postalCode: SITE_CONFIG.contact.headquarters.postalCode,
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '25.5433',
          longitude: '87.5714',
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ],
            opens: '09:00',
            closes: '20:00',
          },
        ],
        sameAs: [
          SITE_CONFIG.socials.instagram,
          SITE_CONFIG.socials.facebook,
          SITE_CONFIG.socials.youtube,
          SITE_CONFIG.socials.pinterest,
        ],
      },
      {
        '@type': 'EventPlanner',
        '@id': `${SITE_CONFIG.url}/#eventplanner`,
        name: SITE_CONFIG.name,
        description:
          'Luxury wedding planning and bespoke event management company offering royal destination weddings in Rajasthan, Goa, and international destinations.',
        url: SITE_CONFIG.url,
        areaServed: [
          'Katihar',
          'Bihar',
          'Jaipur',
          'Udaipur',
          'Jodhpur',
          'Goa',
          'New Delhi',
          'Mumbai',
          'Dubai',
        ],
        knowsAbout: [
          'Royal Destination Weddings',
          'Palace Wedding Venues',
          'Bespoke Mandap Decor',
          'Haldi & Mehendi Ceremonies',
          'Corporate Banquets & Galas',
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
