import PortfolioPage from '@/app/portfolio/page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery & Video Showcase | Saat Phere Events Bihar',
  description:
    'Explore our official photo and video gallery of luxury weddings, Myra/Bhaat rituals, Haldi setups, Baby Shower/Jalwa ceremonies, and grand stage decors across Bihar and India.',
};

export default function GalleryPage() {
  return <PortfolioPage />;
}
