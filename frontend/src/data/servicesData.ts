import { ServiceItem } from '@/types/service';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'srv-1',
    slug: 'wedding-planning-and-management',
    title: 'Wedding Planning & Management',
    tagline: 'Flawless Orchestration for Your Royal Celebration',
    category: 'Full-Service Planning',
    shortDescription:
      'End-to-end luxury wedding planning encompassing bespoke concept formulation, master timeline design, premium vendor curation, and discreet VIP hospitality.',
    longDescription:
      'At Saat Phere Events, we recognize that an Indian wedding is more than a celebration—it is a timeless confluence of family legacies, heartfelt emotions, and royal traditions. Our full-service wedding management team orchestrates every element with surgical precision and opulent flair. From securing coveted heritage palace venues to managing multi-day production schedules and celebrity entertainment, we transform your dream celebration into an effortless reality.',
    heroImage: '/images/services/wedding-planning-hero.jpg',
    cardImage: '/images/testimonials/mandap-couple.jpg',
    galleryImages: [
      '/images/testimonials/couple-pooja-rohan.jpg',
      '/images/testimonials/hindu-jaimala.jpg',
      '/images/gallery/mandap-glass-udaipur.jpg',
      '/images/gallery/baraat-jaipur.jpg',
    ],
    offerings: [
      {
        title: 'Master Budgeting & Financial Control',
        description: 'Transparent expenditure forecasting with line-item allocation and vendor negotiation.',
        highlights: ['Contract negotiations', 'Cashflow milestone tracking', 'Escrow reconciliation'],
      },
      {
        title: 'Bespoke Creative Theme & Styling',
        description: 'Architectural mood boards, custom invitation suites, and tailored sensory experiences.',
        highlights: ['Color palette curation', 'Couture decor blueprinting', 'Floral scent profiling'],
      },
      {
        title: 'Complete Vendor & Talent Management',
        description: 'Vetting and contracting top-tier photographers, choreographers, caterers, and artists.',
        highlights: ['Celebrity artist procurement', 'Sound & light engineers', 'Artisanal culinary teams'],
      },
      {
        title: 'Day-of White Glove Coordination',
        description: 'Shadow coordinators dedicated to bride, groom, and immediate families around the clock.',
        highlights: ['Personal bridal concierge', 'Live cue-to-cue execution', 'Crisis prevention protocols'],
      },
    ],
    processSteps: [
      { step: 1, title: 'Discovery & Vision Consultation', description: 'Deep dive into your family traditions, design preferences, and hospitality goals.' },
      { step: 2, title: 'Blueprint & Financial Architecture', description: 'Development of custom conceptual decks, 3D venue renders, and allocated budgets.' },
      { step: 3, title: 'Curated Vendor Enlistment', description: 'Contracting premier artisans, floral designers, and production engineers.' },
      { step: 4, title: 'Rehearsals & Flawless Execution', description: 'Multi-tiered dry runs ensuring effortless celebration across all wedding days.' },
    ],
    faqs: [
      {
        question: 'How early should we engage Saat Phere Events before our wedding date?',
        answer: 'For luxury multi-day and destination celebrations, we recommend onboarding 8 to 14 months prior to secure flagship venues and peak auspicious dates.',
      },
      {
        question: 'Do you work with our family preferred vendors?',
        answer: 'Absolutely. We seamlessly integrate with your family-trusted pandits, caterers, or jewelers while providing technical infrastructure.',
      },
    ],
    startingBudgetGuide: 'Tailored Bespoke Engagements',
    popularLocations: ['Udaipur', 'Jaipur', 'Jodhpur', 'Mumbai', 'New Delhi'],
    featured: true,
  },
  {
    id: 'srv-2',
    slug: 'destination-weddings',
    title: 'Destination Weddings',
    tagline: 'Palatial Forts, Coastal Sands & Exotic International Havens',
    category: 'Destination Weddings',
    shortDescription:
      'Immersive destination wedding management featuring turnkey guest logistics, charter flights, 5-star resort buyouts, and multi-cultural hospitality.',
    longDescription:
      'A destination wedding is an unforgettable getaway for you and your loved ones. Saat Phere Events commands deep hospitality partnerships across India’s most celebrated royal palaces (Udaipur, Jaipur, Jodhpur), tranquil beaches of Goa and Kerala, and international luxury destinations like Dubai, Oman, and Thailand. We orchestrate round-the-clock airport welcome desks, customized guest luggage delivery, bespoke room gifting, and themed multi-venue transitions.',
    heroImage: '/images/hero/hero-palace-udaipur.jpg',
    cardImage: '/images/hero/hero-palace-jaipur.jpg',
    galleryImages: [
      '/images/hero/hero-palace-jodhpur.jpg',
      '/images/hero/hero-beach-goa.jpg',
      '/images/services/destination-hero.jpg',
    ],
    offerings: [
      {
        title: 'Palace & Resort Exclusive Buyouts',
        description: 'Negotiating full property takeovers for complete privacy and unrestricted celebration timings.',
        highlights: ['Heritage fort access', 'Exclusive resort isolation', 'Private villas & suites'],
      },
      {
        title: 'Guest Hospitality & Travel Concierge',
        description: 'End-to-end flight booking, airport luxury transfers, and bilingual hospitality desks.',
        highlights: ['Luxury fleet coordination', 'Digital RSVP & room tagging', 'Bespoke welcome hampers'],
      },
      {
        title: 'Local Permitting & Technical Rigging',
        description: 'Navigating municipal clearances, sound permissions, fireworks licensing, and power generators.',
        highlights: ['Heritage site approvals', 'Drone & fireworks permits', 'DG backup power infrastructure'],
      },
    ],
    processSteps: [
      { step: 1, title: 'Destinations Shortlisting', description: 'Curated comparative analysis of 3-5 regal locations matching your vision.' },
      { step: 2, title: 'On-Ground Recce & Food Tastings', description: 'Guided site inspection trip with menu curations and lighting tests.' },
      { step: 3, title: 'Logistics Architecture', description: 'Deployment of specialized guest management app and arrival schedules.' },
      { step: 4, title: 'Grand Onsite Hospitality', description: '24/7 dedicated concierge desk stationed in hotel lobbies.' },
    ],
    faqs: [
      {
        question: 'Which destination spots do you specialize in?',
        answer: 'We have executed flagship celebrations in Udaipur (City Palace, Jagmandir), Jaipur (Rambagh, Fairmont), Jodhpur (Umaid Bhawan), Goa, Dubai, and Antalya.',
      },
    ],
    startingBudgetGuide: 'Bespoke Quote Upon Consultation',
    popularLocations: ['Udaipur', 'Jaipur', 'Goa', 'Muscat', 'Dubai'],
    featured: true,
  },
  {
    id: 'srv-3',
    slug: 'engagement-and-ring-ceremony',
    title: 'Engagement & Ring Ceremony',
    tagline: 'An Intimate Symphony of Love, Diamonds & Warmth',
    category: 'Ceremonial',
    shortDescription:
      'Enchanting ring ceremony decor, couture ring platters, thematic floral arches, and curated family dinner settings.',
    longDescription:
      'The ring exchange marks the first official step of two families coming together. Saat Phere Events designs romantic, sophisticated engagement environments that capture the tenderness of the proposal while honoring Indian customs. From fairy-lit glass gazebos to handcrafted royal ring platters and soulful acoustic musical backdrops, we set an unforgettable tone for your wedding journey.',
    heroImage: '/images/services/engagement-rings.jpg',
    cardImage: '/images/services/engagement-rings.jpg',
    galleryImages: [
      '/images/services/engagement-rings.jpg',
      '/images/testimonials/couple-vikram-sanjana.png',
      '/images/testimonials/hindu-jaimala.jpg',
    ],
    offerings: [
      {
        title: 'Custom Ring Platter & Exchange Stage',
        description: 'Artisanal mechanized or floral ring boxes designed uniquely for the couple.',
        highlights: ['Handmade velvet trays', 'Dry-ice stage entry', 'Cold pyrotechnic sparkle showers'],
      },
      {
        title: 'Romantic Ambient Illumination',
        description: 'Cascading fairy lights, Edison bulbs, and floral candle centerpieces.',
        highlights: ['Warm amber spotlights', 'Mirror dancefloors', 'Custom monogram neon backdrops'],
      },
    ],
    processSteps: [
      { step: 1, title: 'Concept Formulation', description: 'Aligning on formal gala vs boho-chic garden celebration.' },
      { step: 2, title: 'Stage & Seating Drafting', description: 'Custom layouts maximizing intimate sightlines for all elders and guests.' },
      { step: 3, title: 'Production Execution', description: 'Day-of precision setup with rehearsal of ring exchange timing.' },
    ],
    faqs: [
      {
        question: 'Can you organize engagement ceremonies on short notice?',
        answer: 'Yes, our rapid-response team can execute breathtaking engagements within 2 to 4 weeks depending on venue availability.',
      },
    ],
    featured: false,
  },
  {
    id: 'srv-4',
    slug: 'birthday-parties-and-kids-events',
    title: 'Birthday Parties & Kids Events',
    tagline: 'Whimsical Wonderlands & Milestone Celebrations',
    category: 'Private Parties',
    shortDescription:
      'Imaginative themed birthdays, immersive adventure setups, artisanal dessert tables, interactive entertainment, and bespoke return gifts.',
    longDescription:
      'Whether it is a child’s first milestone birthday celebration with fairy-tale castles and balloon arches or a 50th golden jubilee dinner, our celebration designers create wonder. We weave interactive entertainment, live illusionists, customized sweet carts, and interactive craft stations that keep both kids and adults captivated.',
    heroImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1600&q=80',
    cardImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1000&q=80',
    ],
    offerings: [
      {
        title: 'Thematic 3D Scenic Production',
        description: 'Custom fabricated castle gates, enchanted jungle landscapes, and cartoon wonderlands.',
        highlights: ['Life-size prop sculpting', 'Organic balloon garlands', 'Photo op installations'],
      },
      {
        title: 'Interactive Entertainment & Artisans',
        description: 'International magicians, puppet theatre, pottery stations, and caricature artists.',
        highlights: ['Game masters', 'Live science wonders', 'Cotton candy and churro stations'],
      },
    ],
    processSteps: [
      { step: 1, title: 'Theme Selection', description: 'Brainstorming unique concepts based on favorite stories or eras.' },
      { step: 2, title: 'Decor & Entertainment Curation', description: 'Designing interactive zones and gourmet kids menus.' },
      { step: 3, title: 'Celebration Day', description: 'Seamless host-free experience where parents simply enjoy the day.' },
    ],
    faqs: [
      {
        question: 'Do you also cater food for dietary preferences?',
        answer: 'Yes, our partner chefs curate kid-friendly, nut-free, vegan, and organic menus alongside adult gourmet stations.',
      },
    ],
    featured: false,
  },
  {
    id: 'srv-5',
    slug: 'anniversary-and-couple-celebrations',
    title: 'Anniversary & Couple Celebrations',
    tagline: 'Honoring Decades of Devotion with Timeless Luxury',
    category: 'Milestone Celebrations',
    shortDescription:
      'Romantic silver and golden jubilee galas, vow renewals, private candlelit dinner staging, and vintage musical retrospectives.',
    longDescription:
      'Milestone anniversaries deserve the honor of a royal jubilee. Saat Phere Events crafts deeply nostalgic, celebratory evenings that celebrate the couple’s journey. From screening surprise biographical family documentaries to curated vintage decor reminiscent of the couple’s wedding era, we create tearful joy and joyous dance.',
    heroImage: '/images/testimonials/couple-vikram-sanjana.png',
    cardImage: '/images/testimonials/avatar-rajiv-sunita.jpg',
    galleryImages: [
      '/images/testimonials/couple-pooja-rohan.jpg',
      '/images/gallery/wedding-stage.jpg',
    ],
    offerings: [
      {
        title: 'Silver & Gold Jubilee Styling',
        description: 'Refined metallic champagne and ivory palettes with crystal chandeliers.',
        highlights: ['Custom family crests', 'Vintage photo tunnels', 'Orchestral string quartets'],
      },
      {
        title: 'Vow Renewal Ceremonies',
        description: 'Recreating traditional pheras or modern vows in romantic open-air settings.',
        highlights: ['Priest coordination', 'Flower shower confetti', 'Champagne toasts'],
      },
    ],
    processSteps: [
      { step: 1, title: 'Story Gathering', description: 'Interviews with family members to integrate surprise sentimental touches.' },
      { step: 2, title: 'Atmosphere Design', description: 'Selecting heritage lawns or royal banquet halls.' },
      { step: 3, title: 'The Toast', description: 'Flawlessly coordinated tributes, video montages, and dancing.' },
    ],
    faqs: [
      {
        question: 'Can you arrange surprise anniversary events?',
        answer: 'Yes! Over 60% of our anniversary bookings are surprise affairs planned discreetly with the children or friends.',
      },
    ],
    featured: false,
  },
  {
    id: 'srv-6',
    slug: 'haldi-mehendi-and-sangeet',
    title: 'Haldi, Mehendi & Sangeet Ceremonies',
    tagline: 'Vibrant Traditional Festivities, Marigold Canopies & Grand Dance Stages',
    category: 'Pre-Wedding Functions',
    shortDescription:
      'Carnival-style Mehendi lounges, floral jewelry styling, turmeric pool setups, concert-grade Sangeet audio/visual stages, and celebrity choreography.',
    longDescription:
      'The pre-wedding festivities are the heartbeat of the Indian wedding experience. For Haldi, we build sunny yellow marigold cascades, brass urli dunking pools, and organic herbal pastes. For Mehendi, we create Moroccan or Rajasthani bohemian cabanas with henna artists and bangles bazaar. For Sangeet, we produce a concert-level show with custom LED mapping, hydraulic stages, and celebrity emcees.',
    heroImage: '/images/gallery/haldi-marigold.jpg',
    cardImage: '/images/services/mehendi-bridal.jpg',
    galleryImages: [
      '/images/services/haldi-ceremony.jpg',
      '/images/gallery/sangeet-dance.jpg',
      '/images/gallery/mehendi-hands.jpg',
    ],
    offerings: [
      {
        title: 'Haldi Splash & Urli Staging',
        description: 'Floral umbrellas, brass urlis, rose petal showers, and herbal turmeric formulations.',
        highlights: ['Phoolon ki Holi setup', 'Gota patti props', 'Sunglass & dupatta giveaways'],
      },
      {
        title: 'Mehendi Fair & Live Bazaars',
        description: 'Bespoke Rajasthani puppet tents, lac bangle makers, and live folk singing.',
        highlights: ['Celebrity henna artists', 'Vibrant cabanas', 'Chaat & street food carts'],
      },
      {
        title: 'Sangeet Concert Audio & Visuals',
        description: 'High-definition curved LED walls, intelligent moving head beams, and sound arrays.',
        highlights: ['Bollywood choreography sync', 'Smoke & CO2 cryo jets', 'DJ after-party setup'],
      },
    ],
    processSteps: [
      { step: 1, title: 'Color Palette & Theme Selection', description: 'Curating sunflower yellows, emerald greens, and high-energy jewel tones.' },
      { step: 2, title: 'Choreography & Audio Alignment', description: 'Managing rehearsals, track sequencing, and stage cues.' },
      { step: 3, title: 'Carnival & Stage Setup', description: 'Building the festival atmosphere across resort gardens.' },
      { step: 4, title: 'Live Show Direction', description: 'Stage managers directing family entries and surprise dance performances.' },
    ],
    faqs: [
      {
        question: 'Do you provide the sound equipment and acoustic engineers?',
        answer: 'Yes, we supply line-array acoustic systems (L-Acoustics / JBL VTX) tuned for both delicate acoustic sufi and high-energy EDM.',
      },
    ],
    popularLocations: ['Jaipur', 'Udaipur', 'Goa', 'Chandigarh', 'New Delhi'],
    featured: true,
  },
  {
    id: 'srv-7',
    slug: 'reception-and-wedding-decor',
    title: 'Reception & Wedding Decor',
    tagline: 'Monumental Mandaps, Royal Entrance Gates & Haute Floral Architecture',
    category: 'Decor & Production',
    shortDescription:
      'Architectural floral mandaps, mirrored aisle runways, crystal chandelier ceilings, and regal stage backdrops designed to awe.',
    longDescription:
      'Your wedding mandap is the sacred sanctum where seven vows are sealed for eternity. Saat Phere Events designs breathtaking mandap architecture, from floating lotus pavilions on tranquil palace lakes to domed floral structures adorned with tens of thousands of imported Dutch carnations, tuberoses, and orchids. Reception decors feature sweeping grand arches, mood-lit dining tables, and regal seating thrones.',
    heroImage: '/images/gallery/wedding-stage.jpg',
    cardImage: '/images/gallery/mandap-glass-udaipur.jpg',
    galleryImages: [
      '/images/hero/hero-mandap.jpg',
      '/images/services/reception-stage.jpg',
      '/images/gallery/umaid-bhawan-gardens.jpg',
    ],
    offerings: [
      {
        title: 'Architectural Sacred Mandaps',
        description: 'Custom engineered mandap pavilions with fire-safe havan kunds and unobstructed 360-degree guest views.',
        highlights: ['Floating water pavilions', 'Carved heritage jharokhas', 'Glass mirrored mandap decks'],
      },
      {
        title: 'Grand Entrance & Floral Walkways',
        description: '100-foot floral tunnels, brass diyas, and royal chhatri gates welcoming arriving royalty.',
        highlights: ['Real floral chandeliers', 'Scented mist machines', 'Living carpet runways'],
      },
      {
        title: 'Haute Table Styling & Banqueting',
        description: 'Gold-rimmed charger plates, linen napery, custom calligraphed menus, and crystal glassware.',
        highlights: ['Tall candelabra centerpieces', 'Velvet seating banquettes', 'Thematic table numbering'],
      },
    ],
    processSteps: [
      { step: 1, title: '3D Spatial CAD & Renders', description: 'Exact virtual walk-throughs of mandap, stage, and dining layout.' },
      { step: 2, title: 'Floral Sourcing & Prep', description: 'Cold-chain transport of fresh blossoms from Bangalore, Holland, and Thailand.' },
      { step: 3, title: 'Overnight Rigging & Quality Audits', description: 'Multi-shift production team executing precise lighting angles.' },
    ],
    faqs: [
      {
        question: 'Are your floral decors eco-friendly?',
        answer: 'Yes! We actively support sustainable practices by partnering with floral recycling NGOs that compost organic flowers post-event.',
      },
    ],
    popularLocations: ['Udaipur', 'Jaipur', 'Mumbai', 'Kolkata', 'Hyderabad'],
    featured: true,
  },
  {
    id: 'srv-8',
    slug: 'corporate-events-and-private-parties',
    title: 'Corporate Events & Private Parties',
    tagline: 'High-Impact Brand Galas, Product Launches & Executive Summits',
    category: 'Corporate',
    shortDescription:
      'Sophisticated corporate conferences, luxury brand reveals, awards nights, and VIP CEO dinners engineered with seamless technical infrastructure.',
    longDescription:
      'Saat Phere Events brings the same artistic mastery and flawless execution to the corporate world. From high-profile automobile launches and international summit conventions to black-tie anniversary banquets, we ensure your brand message shines with authority and sophistication.',
    heroImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80',
    cardImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1000&q=80',
    ],
    offerings: [
      {
        title: 'Turnkey Summit & Stage AV',
        description: 'Seamless LED video walls, live multi-camera broadcast switching, and simultaneous translation booths.',
        highlights: ['Custom keynote stages', 'Teleprompters & Green Rooms', 'Interactive polling displays'],
      },
      {
        title: 'Executive Hospitality & Registration',
        description: 'QR-code badge printing, VIP lounge hospitality, and speaker protocol management.',
        highlights: ['High-speed check-in kiosks', 'Security protocol integration', 'Gourmet executive dining'],
      },
    ],
    processSteps: [
      { step: 1, title: 'Brand Brief & ROI Objectives', description: 'Translating corporate values and delegate experience into clear run-sheets.' },
      { step: 2, title: 'Technical Blueprinting', description: 'Acoustic modeling, sightline studies, and contingency power planning.' },
      { step: 3, title: 'Flawless Live Direction', description: 'Dedicated stage calling directors orchestrating lighting, audio, and awards.' },
    ],
    faqs: [
      {
        question: 'Do you manage pan-India corporate events?',
        answer: 'Yes, our corporate division manages recurring annual conventions and launches across Tier-1 and Tier-2 convention hubs.',
      },
    ],
    featured: false,
  },
  {
    id: 'srv-9',
    slug: 'theme-parties-and-customized-events',
    title: 'Theme Parties & Customized Events',
    tagline: 'Boundless Imagination Crafted Into Experiential Realities',
    category: 'Bespoke Celebrations',
    shortDescription:
      'Immersive Great Gatsby soirees, Arabian Nights lounges, tropical sundowners, and bespoke private galas built around your fantasies.',
    longDescription:
      'When conventional party formats fall short, Saat Phere Events produces immersive theatrical experiences. Whether transforming a desert campsite into a glowing 1001-Nights oasis or designing an ultra-modern neon futuristic rave for an after-party, our creative directors spare no detail.',
    heroImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1600&q=80',
    cardImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80',
      '/images/gallery/sangeet-dance.jpg',
    ],
    offerings: [
      {
        title: '360-Degree Environmental Scenography',
        description: 'Complete transformation of venue ceilings, floors, wall draperies, and olfactory ambiance.',
        highlights: ['Custom sculpted set pieces', 'Thematic actors & greeters', 'Immersive scent dispensers'],
      },
      {
        title: 'Signature Mixology & Gourmet Concepts',
        description: 'Themed molecular cocktails, theatrical nitrogen food stations, and customized bar facades.',
        highlights: ['Flair bartending troupes', 'Custom branded ice sculptures', 'Thematic dessert installations'],
      },
    ],
    processSteps: [
      { step: 1, title: 'Concept Ideation', description: 'Brainstorming audacious themes and character mood boards.' },
      { step: 2, title: 'Prop Fabrication & Lighting', description: 'Custom theatrical workshop production of specialized decor props.' },
      { step: 3, title: 'The Immersive Reveal', description: 'Guests step into a completely altered fantasy universe.' },
    ],
    faqs: [
      {
        question: 'Can you build custom sets from scratch?',
        answer: 'Yes, our in-house carpentry and 3D fabrication teams can manufacture custom architectural facades, thrones, and arches.',
      },
    ],
    featured: false,
  },
];
