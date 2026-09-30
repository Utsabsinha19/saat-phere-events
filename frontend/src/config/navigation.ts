export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

export const MAIN_NAV: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    href: '/services',
    children: [
      {
        label: 'Wedding Planning',
        href: '/services/wedding-planning',
        description: 'Complete concept development, budgeting & royal coordination',
      },
      {
        label: 'Haldi / Mehndi / Sangeet',
        href: '/services/haldi-mehndi-sangeet',
        description: 'Vibrant marigold florals, live music & high-energy sangeet',
      },
      {
        label: 'Birthday Parties',
        href: '/services/birthday-parties',
        description: 'Custom theme decor, entertainment & milestone birthdays',
      },
      {
        label: 'Reception',
        href: '/services/reception',
        description: 'Grand floral mandaps, crystal illumination & royal stages',
      },
      {
        label: 'Corporate Events',
        href: '/services/corporate-events',
        description: 'Conferences, product launches, and annual corporate galas',
      },
      {
        label: 'Theme Decoration',
        href: '/services/theme-decoration',
        description: 'Bespoke floral styling, arches & 3D spatial stage concepts',
      },
      {
        label: 'Baby Shower',
        href: '/services/baby-shower',
        description: 'Pastel themes, Godh Bharai rituals & family warmth',
      },
      {
        label: 'Wedding Rental Car',
        href: '/services/wedding-rental-car',
        description: 'Vintage classics, luxury sedans & decorated baraat entries',
      },
      {
        label: 'Wooden Games for Weddings',
        href: '/services/wooden-games-for-weddings',
        description: 'Artisanal giant Jenga, Connect-4 & interactive lawn games',
      },
    ],
  },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Packages', href: '/packages' },
  { label: 'Client Portal', href: '/portal' },
  { label: 'Vendors', href: '/vendors' },
  { label: 'Contact', href: '/contact' },
];

export const FOOTER_LINKS = {
  services: [
    { label: 'Wedding Planning', href: '/services/wedding-planning' },
    { label: 'Haldi / Mehndi / Sangeet', href: '/services/haldi-mehndi-sangeet' },
    { label: 'Birthday Parties', href: '/services/birthday-parties' },
    { label: 'Reception & Decor', href: '/services/reception' },
    { label: 'Corporate Events', href: '/services/corporate-events' },
    { label: 'Theme Decoration', href: '/services/theme-decoration' },
    { label: 'Baby Shower', href: '/services/baby-shower' },
    { label: 'Wedding Rental Car', href: '/services/wedding-rental-car' },
    { label: 'Wooden Games', href: '/services/wooden-games-for-weddings' },
  ],
  company: [
    { label: 'Our Brand Story', href: '/about' },
    { label: 'Portfolio Gallery', href: '/portfolio' },
    { label: 'Enterprise Operations OS', href: '/enterprise' },
    { label: 'Artisan & Vendor Guild', href: '/vendors' },
    { label: 'Client Account Portal', href: '/portal' },
    { label: 'Get in Touch', href: '/contact' },
    { label: 'Admin ERP Console', href: '/admin' },
  ],
  destinations: [
    { label: 'Jaipur Heritage Weddings', href: '/services/destination-weddings' },
    { label: 'Udaipur Palatial Celebrations', href: '/services/destination-weddings' },
    { label: 'Jodhpur Royal Forts', href: '/services/destination-weddings' },
    { label: 'Goa Coastal Weddings', href: '/services/destination-weddings' },
  ],
};
