import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services | 10 Bespoke Wedding & Event Disciplines | Saat Phere Events',
  description:
    'Explore our ten specialized event management disciplines: Royal Wedding Planning, Marwari & Rajasthani Myra / Bhaat, Haldi & Sangeet Galas, Theme Scenography, Jalwa Ceremony, and Vintage Procession Fleets.',
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
