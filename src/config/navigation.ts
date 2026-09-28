export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

export const MAIN_NAV: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  {
    label: 'Services',
    href: '/services',
    children: [
      {
        label: 'Wedding Planning & Management',
        href: '/services/wedding-planning-and-management',
        description: 'Complete concept development, budgeting & day-of coordination',
      },
      {
        label: 'Destination Weddings',
        href: '/services/destination-weddings',
        description: 'Palatial Rajasthan, beachside Goa & international venues',
      },
      {
        label: 'Engagement & Ring Ceremony',
        href: '/services/engagement-and-ring-ceremony',
        description: 'Romantic stage designs, platters & warm guest reception',
      },
      {
        label: 'Haldi, Mehendi & Sangeet',
        href: '/services/haldi-mehendi-and-sangeet',
        description: 'Vibrant marigold florals, live music & carnival setups',
      },
      {
        label: 'Reception & Wedding Decor',
        href: '/services/reception-and-wedding-decor',
        description: 'Grand floral mandaps, ambient illumination & royal stages',
      },
      {
        label: 'Anniversary Celebrations',
        href: '/services/anniversary-and-couple-celebrations',
        description: 'Intimate milestone dinners & silver/gold jubilee galas',
      },
      {
        label: 'Birthday & Kids Events',
        href: '/services/birthday-parties-and-kids-events',
        description: 'Custom theme decor, entertainment & delightful catering',
      },
      {
        label: 'Corporate Events & Galas',
        href: '/services/corporate-events-and-private-parties',
        description: 'Product launches, banquets, and annual corporate nights',
      },
      {
        label: 'Theme Parties & Bespoke Events',
        href: '/services/theme-parties-and-customized-events',
        description: 'Custom high-concept experiential celebrations',
      },
    ],
  },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Packages & Quote', href: '/packages' },
  { label: 'Contact', href: '/contact' },
];

export const FOOTER_LINKS = {
  services: [
    { label: 'Wedding Planning', href: '/services/wedding-planning-and-management' },
    { label: 'Destination Weddings', href: '/services/destination-weddings' },
    { label: 'Haldi, Mehendi & Sangeet', href: '/services/haldi-mehendi-and-sangeet' },
    { label: 'Reception & Mandap Decor', href: '/services/reception-and-wedding-decor' },
    { label: 'Corporate Galas', href: '/services/corporate-events-and-private-parties' },
    { label: 'Custom Quote Calculator', href: '/packages' },
  ],
  company: [
    { label: 'Our Brand Story', href: '/about' },
    { label: 'Portfolio Gallery', href: '/portfolio' },
    { label: 'Client Testimonials', href: '/#testimonials' },
    { label: 'Schedule Consultation', href: '/contact' },
    { label: 'Client Account Portal', href: '/portal' },
    { label: 'Admin Dashboard', href: '/admin' },
  ],
  destinations: [
    { label: 'Jaipur Heritage Weddings', href: '/services/destination-weddings' },
    { label: 'Udaipur Palatial Celebrations', href: '/services/destination-weddings' },
    { label: 'Jodhpur Royal Forts', href: '/services/destination-weddings' },
    { label: 'Goa Coastal Weddings', href: '/services/destination-weddings' },
  ],
};
