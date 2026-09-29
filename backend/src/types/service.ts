export interface ServiceOffering {
  title: string;
  description: string;
  highlights: string[];
}

export interface ServiceProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: string;
  shortDescription: string;
  longDescription: string;
  heroImage: string;
  cardImage: string;
  galleryImages: string[];
  offerings: ServiceOffering[];
  processSteps: ServiceProcessStep[];
  faqs: ServiceFAQ[];
  startingBudgetGuide?: string;
  popularLocations?: string[];
  featured: boolean;
}
