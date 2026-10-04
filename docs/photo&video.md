# Saat Phere Events – Master Photography & Cinematography Asset Specification

> **Official Creative & Production Directive for Saat Phere Events**  
> **Platform Target:** `https://saat-phere-events.vercel.app/` & Enterprise Ecosystem  
> **Brand Palette:** Champagne Gold (`#D4AF37`), Royal Maroon (`#800020`), Ivory Cream (`#FFFDD0`), Charcoal Slate (`#1A1A1A`)  
> **Aesthetic Philosophy:** Regal Indian Heritage blended with Contemporary White-Glove Luxury & Editorial Vogue Aesthetics.

---

## 1. Executive Summary & Creative Vision

To position **Saat Phere Events** as India’s foremost high-net-worth wedding planning and bespoke luxury event brand, every photographic and video asset must evoke **authenticity, grand architectural scale, deep cultural reverence, and meticulous bespoke craftsmanship**. 

Stock photos with artificial generic smiles or AI-generated uncanny textures dilute high-trust luxury conversion. This master specification defines the exact **location shoots, shot compositions, quantities, resolutions, aspect ratios, lighting temperatures, and file naming conventions** required to bring the entire digital platform to life.

---

## 2. Global Technical Standards & Deliverable Formats

| Asset Type | Primary Format | Fallback Format | Resolution (Min) | Aspect Ratio | Frame Rate / Bitrate |
|---|---|---|---|---|---|
| **Desktop Hero Videos** | WebM (VP9) | MP4 (H.265 / H.264) | 3840 × 2160 (4K UHD) | 16:9 Landscape | 60 fps (smooth slow-mo), 12-18 Mbps |
| **Mobile Hero Videos** | WebM (VP9) | MP4 (H.264) | 1080 × 1920 (FHD) | 9:16 Vertical | 60 fps, 6-8 Mbps |
| **Section Video Teasers** | MP4 (H.264) | WebM | 1920 × 1080 (FHD) | 16:9 Landscape | 30/60 fps, 8 Mbps |
| **Social Reels / Stories** | MP4 (H.264) | WebM | 1080 × 1920 (FHD) | 9:16 Vertical | 60 fps, 8-10 Mbps |
| **Hero & Banner Stills** | WebP (lossless/90%) | JPEG (Progressive) | 2560 × 1440 / 1920 × 1080 | 16:9 Landscape | sRGB / Display P3, < 350 KB |
| **Gallery & Detail Stills**| WebP (88%) | JPEG (Progressive) | 2000 × 1333 / 1600 × 2000 | 3:2 Landscape & 4:5 Portrait | sRGB, < 250 KB |
| **Portraits & Avatars** | WebP (90%) | PNG | 800 × 800 / 1200 × 1200 | 1:1 Square | sRGB, < 120 KB |
| **3D PBR Textures** | PNG / WebP | JPG | 2048 × 2048 / 4096 × 4096 | 1:1 Square | Seamless Tillable Maps (Albedo, Normal, Roughness) |

---

## 3. Comprehensive Section-by-Section Breakdown

---

### Section 1: Homepage Hero Showcase (Cinematic Header)
* **Component Path:** `frontend/src/components/sections/home/HeroSection.tsx`
* **Route:** `/` (Top of Page)
* **Objective:** Deliver an unforgettable, regal first impression within 2.5 seconds of page load.

| Deliverable | Qty | Aspect Ratio | Visual Subject & Composition | Lighting & Art Direction | Target Destination Path |
|---|---|---|---|---|---|
| **Primary Cinematic Hero Video** | 1 | 16:9 (4K) | Majestic slow-motion drone flyover of Lake Pichola (Udaipur) at sunset, sweeping down onto a grand illuminated lotus mandap with glowing diyas and flower petal showers. | Warm golden hour transition into dusk; natural torches (mashaals), warm gold spotlights (`#D4AF37`). | `frontend/public/videos/hero/hero-grand-palace-4k.mp4` |
| **Secondary Hero Reel (Baraat)** | 1 | 16:9 (4K) | Royal Baraat procession with vintage vintage Rolls Royce / caparisoned elephant, brass royal band in ceremonial turbans, groom in ivory zardozi sherwani. | Rich nighttime ambient lighting with golden fireworks and sparklers in deep background. | `frontend/public/videos/hero/hero-royal-baraat.mp4` |
| **Tertiary Hero Reel (Sangeet)** | 1 | 16:9 (4K) | Massive open-air palace stage with concert lighting, pyrotechnic cold sparks, couple dancing on an LED kinetic dance floor amidst confetti. | Dynamic concert wash lights in royal magenta, gold, and indigo. | `frontend/public/videos/hero/hero-sangeet-spectacle.mp4` |
| **Mobile Hero Video (Vertical)** | 2 | 9:16 (FHD) | Vertical cuts optimized for mobile: 1) Bride’s royal entry under a phoolon ki chaadar; 2) Sunset pheras with sacred havan fire reflections. | Soft bridal backlight, floating rose petal atmosphere, golden flame glow. | `frontend/public/videos/hero/hero-mobile-vertical-1.mp4`<br>`frontend/public/videos/hero/hero-mobile-vertical-2.mp4` |
| **Static Poster Fallbacks** | 3 | 16:9 (2K) | High-definition still captures from the videos for immediate render before video buffers. | Crisp, high dynamic range, compressed WebP format under 200 KB. | `frontend/public/images/hero/hero-slide-1.webp`<br>`frontend/public/images/hero/hero-slide-2.webp`<br>`frontend/public/images/hero/hero-slide-3.webp` |

---

### Section 2: Brand Heritage, Story & 4-Stage Methodology
* **Component Path:** `frontend/src/components/sections/home/BrandIntro.tsx` & `frontend/src/app/about/page.tsx`
* **Route:** `/` and `/about`
* **Objective:** Establish the pedigree, craftsmanship, and white-glove methodology behind Saat Phere Events.

| Deliverable | Qty | Aspect Ratio | Visual Subject & Composition | Lighting & Art Direction | Target Destination Path |
|---|---|---|---|---|---|
| **Founder & Creative Director Portrait** | 1 | 4:5 Portrait | Elegant executive portrait of the founder/director standing in an arched palace colonnade or luxury design studio, holding a leather-bound event portfolio. | Soft studio Rembrandt lighting, bespoke bandhgala jacket, neutral palatial stone background. | `frontend/public/images/about/leadership-director.webp` |
| **Bridal Concierge & Stylist Portrait** | 1 | 4:5 Portrait | Senior bridal shadow coordinator consulting with bride over hand-embroidered Banarasi fabric swatches and jewelry layout. | High-key soft natural morning window light, refined ivory wardrobe. | `frontend/public/images/about/leadership-concierge.webp` |
| **Stage 1: Discovery & Vastu Consultation** | 1 | 16:9 | Intimate consultation room with antique brass globe, copper Vastu compass, moodboard swatches, and artisanal tea service. | Warm interior tungsten lighting (2700K), depth of field on architectural blueprints. | `frontend/public/images/about/methodology-discovery.webp` |
| **Stage 2: 3D Spatial CAD Architecture** | 1 | 16:9 | High-end designer studio desk showing 3D digital mandap wireframes on dual 4K monitors alongside actual carved stone pillars. | Cool ambient screen glow mixed with warm brass desk lamp. | `frontend/public/images/about/methodology-spatial.webp` |
| **Stage 3: Bespoke Vendor Master Curation** | 1 | 16:9 | Curated flat-lay of exotic imported blossoms (Dutch orchids, Kenyan garden roses, Indian tuberose) alongside luxury silverware. | Crisp daylight balanced macro shot, tactile depth. | `frontend/public/images/about/methodology-curation.webp` |
| **Stage 4: Flawless White-Glove Execution** | 1 | 16:9 | Headset-wearing event director orchestrating ground crew behind the scenes 30 minutes before palace gates open. | Dramatic dusk lighting, immaculate palace courtyard lit with thousands of tea lights. | `frontend/public/images/about/methodology-execution.webp` |

---

### Section 3: The 9 Dedicated Service Disciplines
* **Component Path:** `frontend/src/app/services/[slug]/page.tsx` & `frontend/src/data/servicesData.ts`
* **Route:** `/services` and `/services/[slug]`
* **Total Assets Required:** 9 Hero Banners + 45 Service Gallery Photos + 9 Video Teasers

#### 1. Wedding Planning & Management (`/services/wedding-planning-and-management`)
* **Hero Banner (1 Photo, 16:9):** Grand panoramic shot of a 600-guest royal wedding banquet with elevated mandap and tiered floral aisles (`service-wedding-planning-hero.webp`).
* **Sub-Gallery (5 Photos, 3:2):**
  1. Bride walking down the aisle with brother holding velvet chaadar (`wp-01-bridal-entry.webp`).
  2. Groom putting sindoor on bride’s forehead under a canopy of jasmine (`wp-02-sindoor-ritual.webp`).
  3. Master timeline clipboard with bridal concierge checking ear-pieces (`wp-03-concierge-coordination.webp`).
  4. Luxury guest lounge with upholstered diwans and personalized silver monogram napkins (`wp-04-guest-lounge.webp`).
  5. Midnight fireworks cascade over the palace ramparts behind the couple (`wp-05-midnight-fireworks.webp`).
* **Video Teaser (1 Clip, 16:9, 30s):** Comprehensive wedding retrospective film capturing setup to emotional vidai (`service-wedding-planning.mp4`).

#### 2. Destination Weddings (`/services/destination-weddings`)
* **Hero Banner (1 Photo, 16:9):** Iconic aerial view of Jagmandir Island Palace in Udaipur at twilight, glowing with fairy lights across the water (`service-destination-weddings-hero.webp`).
* **Sub-Gallery (5 Photos, 3:2):**
  1. Lake boat convoy ferrying royal wedding guests with traditional umbrellas (`dw-01-lake-pichola-boats.webp`).
  2. Goa beachfront cliffside mandap overlooking breaking waves at sunset (`dw-02-goa-cliffside-mandap.webp`).
  3. Rambagh Palace Jaipur courtyard with peacock dancers greeting guests (`dw-03-jaipur-palace-welcome.webp`).
  4. Luxury chartered airport welcome lounge with marigold garlands and chilled tender coconut (`dw-04-airport-concierge.webp`).
  5. Mussoorie Himalayan hillside open-air pre-wedding brunch with pine valley panorama (`dw-05-himalayan-brunch.webp`).
* **Video Teaser (1 Clip, 16:9, 30s):** Multi-destination cinematic montage showing Udaipur, Jaipur, and Goa (`service-destination-weddings.mp4`).

#### 3. Engagement & Ring Ceremony (`/services/engagement-and-ring-ceremony`)
* **Hero Banner (1 Photo, 16:9):** Mirror-finish runway flanked by floating glass candelabras leading to a circular geometric ring arch (`service-engagement-hero.webp`).
* **Sub-Gallery (5 Photos, 3:2):**
  1. Macro shot of solitaire diamond ring placed inside an antique velvet-lined silver box (`eng-01-ring-macro.webp`).
  2. Couple exchanging rings with cascading gold pyrotechnics behind them (`eng-02-ring-exchange.webp`).
  3. Monogrammed champagne tower pouring with dry ice smoke swirling at the base (`eng-03-champagne-tower.webp`).
  4. Outdoor candlelit lawn cocktail setup with glass orbs hanging from banyan trees (`eng-04-candlelit-cocktail.webp`).
  5. Acoustic violin troupe serenading the couple on an elevated gazebo (`eng-05-acoustic-violins.webp`).
* **Video Teaser (1 Clip, 16:9, 30s):** High-energy ring exchange celebration and champagne popping (`service-engagement.mp4`).

#### 4. Birthday Parties & Kids Events (`/services/birthday-parties-and-kids-events`)
* **Hero Banner (1 Photo, 16:9):** Opulent pastel carnival or enchanted woodland theme with custom life-size carousel backdrop (`service-birthday-parties-hero.webp`).
* **Sub-Gallery (5 Photos, 3:2):**
  1. Multi-tiered bespoke architectural cake with edible gold foil detailing (`bday-01-artisan-cake.webp`).
  2. Immersive kid-friendly ball pit with illuminated acrylic tunnels and hot-air balloons (`bday-02-ball-pit-balloons.webp`).
  3. Interactive nitrogen ice cream & waffle atelier with chef hats for children (`bday-03-nitrogen-dessert.webp`).
  4. Enchanted fairy-tale castle entry tunnel with fiber-optic starlight ceiling (`bday-04-starlight-tunnel.webp`).
  5. Personalized wooden gifting trunks with velvet ribbon packaging (`bday-05-bespoke-favors.webp`).
* **Video Teaser (1 Clip, 16:9, 20s):** Playful, high-vibrancy reel of children laughing and sensory theme activations (`service-birthday-parties.mp4`).

#### 5. Anniversary & Couple Celebrations (`/services/anniversary-and-couple-celebrations`)
* **Hero Banner (1 Photo, 16:9):** Silver/Golden jubilee royal gala inside a vintage mirror palace (Sheesh Mahal) with warm candle glow (`service-anniversary-hero.webp`).
* **Sub-Gallery (5 Photos, 3:2):**
  1. Mature couple sharing an emotional dance under a crystal chandelier canopy (`ann-01-jubilee-dance.webp`).
  2. Heritage archival photo wall mapping the couple’s 25-year journey in gold filigree frames (`ann-02-heritage-memory-wall.webp`).
  3. Private beach pavilion dining table set for two with rose petals trailing into the sea (`ann-03-private-beach-table.webp`).
  4. Royal silver tableware with customized family crest engraved cutlery (`ann-04-crested-silverware.webp`).
  5. Family generational portrait spanning grandparents to grandchildren in royal matching silks (`ann-05-generational-portrait.webp`).
* **Video Teaser (1 Clip, 16:9, 25s):** Emotional, heartfelt highlight reel with voiceover snippet of anniversary vows (`service-anniversary.mp4`).

#### 6. Haldi, Mehendi & Sangeet Ceremonies (`/services/haldi-mehendi-and-sangeet`)
* **Hero Banner (1 Photo, 16:9):** Vibrant explosion of marigolds (genda phool), brass urlis, and color-smoke flares around the couple on an ornate wooden swing (`service-haldi-mehendi-hero.webp`).
* **Sub-Gallery (5 Photos, 3:2):**
  1. Bride getting intricate bridal mehendi applied up to her elbows, adorned with fresh floral jewelry (`hms-01-bridal-mehendi.webp`).
  2. Turmeric paste and rosewater splashing over groom with cousins celebrating (`hms-02-haldi-splash-candid.webp`).
  3. Traditional Rajasthani folk singer with dholak and kalbelia dancers around a floral fountain (`hms-03-folk-troupe.webp`).
  4. Sangeet stage design with dynamic holographic LED panels and mirror-studded backdrops (`hms-04-sangeet-stage-setup.webp`).
  5. High-octane flashmob dance performance by family with handheld sparkler fountains (`hms-05-sangeet-dance-mob.webp`).
* **Video Teaser (1 Clip, 16:9, 30s):** Fast-cut rhythmic reel with dhol beats transitioning from Haldi sunshine to Sangeet neon glamour (`service-haldi-mehendi.mp4`).

#### 7. Reception & Wedding Decor (`/services/reception-and-wedding-decor`)
* **Hero Banner (1 Photo, 16:9):** Jaw-dropping ballroom ceiling canopy woven with 50,000 imported white blossoms and 80 hanging crystal chandeliers (`service-reception-decor-hero.webp`).
* **Sub-Gallery (5 Photos, 3:2):**
  1. 100-foot mirrored imperial banquet table with cascading floral runners and tall taper candles (`dec-01-imperial-tablescape.webp`).
  2. Kinetic light installation that pulses synchronously with live orchestra crescendos (`dec-02-kinetic-lighting.webp`).
  3. Dramatic floral arch tunnel entry with floor-level dry-ice mist and amber spotlights (`dec-03-mist-floral-tunnel.webp`).
  4. Velvet cocktail bar with backlit translucent onyx stone counter and artisanal mixology barware (`dec-04-onyx-cocktail-bar.webp`).
  5. Sculptural carved floral peacock centerpiece measuring 8 feet tall (`dec-05-floral-sculpture.webp`).
* **Video Teaser (1 Clip, 16:9, 30s):** Cinematic architectural tour revealing empty venue decor before guest arrivals (`service-reception-decor.mp4`).

#### 8. Corporate Events & Private Parties (`/services/corporate-events-and-private-parties`)
* **Hero Banner (1 Photo, 16:9):** Sleek high-tech corporate annual leadership gala with curved anamorphic LED wall and minimalist luxury seating (`service-corporate-events-hero.webp`).
* **Sub-Gallery (5 Photos, 3:2):**
  1. Keynote speaker on a minimalist gold-trimmed stage with razor-sharp branding (`corp-01-keynote-stage.webp`).
  2. High-level networking cocktail terrace overlooking city skyline with lounge pods (`corp-02-skyline-networking.webp`).
  3. Crystal award trophy presentation with dramatic follow-spotlights (`corp-03-awards-presentation.webp`).
  4. Custom branded holographic entrance portal scanning VIP credentials (`corp-04-holographic-entry.webp`).
  5. Five-star sit-down plated fine dining course with white-glove synchronized service (`corp-05-synchronized-banquet.webp`).
* **Video Teaser (1 Clip, 16:9, 20s):** Crisp, professional, dynamic montage showcasing corporate precision (`service-corporate-events.mp4`).

#### 9. Theme Parties & Customized Events (`/services/theme-parties-and-customized-events`)
* **Hero Banner (1 Photo, 16:9):** The Great Gatsby 1920s theme featuring a black & gold velvet speakeasy, feather plumes, and vintage jazz brass (`service-theme-parties-hero.webp`).
* **Sub-Gallery (5 Photos, 3:2):**
  1. Royal Mughal Darbar night with embroidered silk bolsters, hookahs, and Persian carpets (`theme-01-mughal-darbar.webp`).
  2. Bohemian Sunset Coachella brunch with macramé teepees, pampas grass, and acoustic guitars (`theme-02-boho-pampas-brunch.webp`).
  3. Moroccan Souk night market with colorful stained-glass lanterns, spiced tea carts, and belly dancers (`theme-03-moroccan-souk.webp`).
  4. Neon Retro Disco lounge with suspended mirror balls and vintage arcade cocktails (`theme-04-neon-disco-lounge.webp`).
  5. Winter Wonderland gala with realistic ice sculptures and faux-snow falling gently (`theme-05-winter-ice-wonderland.webp`).
* **Video Teaser (1 Clip, 16:9, 25s):** Eclectic, fun-filled theme party recap with distinct vintage coloring (`service-theme-parties.mp4`).

---

### Section 4: Filterable HD Portfolio & Lightbox Gallery
* **Component Path:** `frontend/src/app/portfolio/page.tsx` & `frontend/src/data/galleryData.ts`
* **Route:** `/portfolio`
* **Objective:** Give prospective couples visual proof of extraordinary execution across all 6 core categories.
* **Total Assets Required:** 36 High-Resolution Master Photographs + 6 Lightbox Feature Videos

```
Categories:
1. Royal Palatial (6 Photos, 1 Video)
2. Intimate Destination (6 Photos, 1 Video)
3. Floral Mandaps (6 Photos, 1 Video)
4. Sangeet Spectacles (6 Photos, 1 Video)
5. Couture & Details (6 Photos, 1 Video)
6. Culinary & Banquets (6 Photos, 1 Video)
```

#### Detailed Shot Specification for Portfolio:
1. **Royal Palatial:**
   * `gallery-palatial-01.webp`: Wide-angle perspective of City Palace Jaipur lit in deep amber at night.
   * `gallery-palatial-02.webp`: Bride descending marble palace staircase with a 15-foot train trailing behind.
   * `gallery-palatial-03.webp`: Groom arrival on vintage ceremonial chariot accompanied by royal mace-bearers.
   * `gallery-palatial-04.webp`: Nighttime drone view of illuminated palace island reflecting on still water.
   * `gallery-palatial-05.webp`: Courtyard Jaimala exchange on an elevated platform over a reflecting pool.
   * `gallery-palatial-06.webp`: Royal guard salute honoring the newlyweds at the palace arches.
   * `video-palatial-spotlight.mp4` (1080p, 45s): High-production palace cinematic trailer.

2. **Intimate Destination:**
   * `gallery-destination-01.webp`: Sunset cliffside altar in South Goa with natural driftwood and pastel hydrangeas.
   * `gallery-destination-02.webp`: Hillside terrace dinner under fairy lights in Mussoorie amidst pine hills.
   * `gallery-destination-03.webp`: Kerala backwaters houseboat welcome party with coconut palm garlands.
   * `gallery-destination-04.webp`: Desert sand-dune luxury tent camp with brass lanterns in Jaisalmer.
   * `gallery-destination-05.webp`: Intimate 50-guest candlelit dinner overlooking Mediterranean-style infinity pool.
   * `gallery-destination-06.webp`: Sunrise yoga and sound-bath session for destination wedding guests.
   * `video-destination-spotlight.mp4` (1080p, 45s): Romantic destination wedding vignettes.

3. **Floral Mandaps:**
   * `gallery-mandap-01.webp`: Floating lotus-shaped mandap with 10,000 red roses and gold pillars.
   * `gallery-mandap-02.webp`: Ombre floral dome transitioning from deep crimson to blush pink and ivory.
   * `gallery-mandap-03.webp`: Open-canopy mirrored mandap reflecting skies and sacred fire smoke.
   * `gallery-mandap-04.webp`: Traditional South Indian temple mandap woven with fresh tuberoses and temple brass bells.
   * `gallery-mandap-05.webp`: Modern acrylic transparent mandap with hanging wisteria blossoms.
   * `gallery-mandap-06.webp`: Detail shot of the sacred havan kund adorned with ghee lamps and flower rangoli.
   * `video-mandap-spotlight.mp4` (1080p, 45s): Mandap construction and golden hour ritual footage.

4. **Sangeet Spectacles:**
   * `gallery-sangeet-01.webp`: Massive stadium-scale stage with kinetic triangular LED screens.
   * `gallery-sangeet-02.webp`: Bride and groom performing choreographed duet with synchronized laser beams.
   * `gallery-sangeet-03.webp`: Crowd reaction shot with cousins dancing on shoulders amidst confetti burst.
   * `gallery-sangeet-04.webp`: Celebrity singer / DJ performing behind an elevated chrome DJ booth.
   * `gallery-sangeet-05.webp`: Cold-pyro fireworks shooting 20 feet high during the finale song.
   * `gallery-sangeet-06.webp`: Neon cocktail bar with backlit acrylic bottle towers and flair bartenders.
   * `video-sangeet-spotlight.mp4` (1080p, 45s): High-energy EDM/Bhangra concert style highlight reel.

5. **Couture & Details:**
   * `gallery-couture-01.webp`: Extreme macro shot of uncut Polki diamond and emerald bridal necklace.
   * `gallery-couture-02.webp`: Hand-embroidered raw silk groom sherwani with real gold zardozi thread.
   * `gallery-couture-03.webp`: Sabyasachi / Manish Malhotra bridal lehenga skirt spinning in slow motion.
   * `gallery-couture-04.webp`: Groom tying silk safa (turban) with antique jeweled kalgi ornament.
   * `gallery-couture-05.webp`: Artisanal gold-foil wedding invite boxed with royal attar perfume vials.
   * `gallery-couture-06.webp`: Bridal footwear customized with hand-stitched wedding dates and pearls.
   * `video-couture-spotlight.mp4` (1080p, 45s): Slow-motion cinematic macro details film.

6. **Culinary & Banquets:**
   * `gallery-culinary-01.webp`: Royal Mewari silver thali feast with 21 handcrafted delicacies.
   * `gallery-culinary-02.webp`: Live Japanese robata grill station with flaming skewers in front of guests.
   * `gallery-culinary-03.webp`: 6-tier hand-painted French macaron and croquembouche tower.
   * `gallery-culinary-04.webp`: Mixologist pouring smoked botanical gin cocktail inside a glass cloche.
   * `gallery-culinary-05.webp`: Dessert pavilion with suspended gold birdcages filled with artisanal sweets.
   * `gallery-culinary-06.webp`: Midnight truffle pasta served out of a 24-month aged parmesan cheese wheel.
   * `video-culinary-spotlight.mp4` (1080p, 45s): Gourmet food styling and banquet theater film.

---

### Section 5: Real Verified Testimonials & Client Review Films
* **Component Path:** `frontend/src/data/testimonialsData.ts` & `frontend/src/components/sections/home/TestimonialsCarousel.tsx`
* **Route:** `/` and `/admin/testimonials`
* **Objective:** Establish social proof with authentic couple imagery rather than generic avatars.

| Deliverable | Qty | Ratio | Couple Names & Context | Visual Subject | File Destination |
|---|---|---|---|---|---|
| **Couple Portrait 1** | 1 | 1:1 | Ananya & Siddharth Singhania (Udaipur Royal Wedding) | Regal close-up candid of couple smiling in matching pastel Sabyasachi wedding attire. | `frontend/public/images/testimonials/avatar-ananya-siddharth.jpg` |
| **Venue Backdrop 1** | 1 | 16:9 | The Oberoi Udaivilas, Udaipur | Nighttime reflection of illuminated domes over the pool. | `frontend/public/images/testimonials/mandap-couple.jpg` |
| **Couple Portrait 2** | 1 | 1:1 | Pooja & Rohan Mehta (Rambagh Palace, Jaipur) | Groom holding bride from behind during royal photoshoot, genuine emotional laughter. | `frontend/public/images/testimonials/avatar-pooja-rohan.jpg` |
| **Venue Backdrop 2** | 1 | 16:9 | Rambagh Palace, Jaipur | Palace lawn gardens with peacock fountain and fairy-lit banyan trees. | `frontend/public/images/testimonials/couple-pooja-rohan.jpg` |
| **Couple Portrait 3** | 1 | 1:1 | Vikram & Sanjana Reddy (Taj Falaknuma Palace) | Couple walking down Falaknuma’s 101-seat dining hall in regal Hyderabadi bridal wear. | `frontend/public/images/testimonials/avatar-vikram-sanjana.jpg` |
| **Venue Backdrop 3** | 1 | 16:9 | Taj Falaknuma Palace, Hyderabad | Panoramic night view of the grand palace staircase. | `frontend/public/images/testimonials/couple-vikram-sanjana.png` |
| **Couple Portrait 4** | 1 | 1:1 | Dr. Rajiv & Sunita Kapoor (Goa Beachfront) | Couple embracing with ocean breeze moving the bride’s veil during sunset pheras. | `frontend/public/images/testimonials/avatar-rajiv-sunita.jpg` |
| **Venue Backdrop 4** | 1 | 16:9 | ITC Grand Goa Resort | Sunset beach with soft pastel pink clouds and tropical palms. | `frontend/public/images/testimonials/hindu-jaimala.jpg` |
| **Couple Video Testimonials** | 2 | 16:9 (1080p, 45s) | Singhania & Mehta Couples | Authentic interview clip of couple sharing how Saat Phere Events solved logistics and created dream decor. | `frontend/public/videos/testimonials/ananya-siddharth-review.mp4`<br>`frontend/public/videos/testimonials/pooja-rohan-review.mp4` |

---

### Section 6: Interactive 3D Spatial Decor Studio
* **Component Path:** `frontend/src/app/studio/page.tsx` & `frontend/src/components/studio/MandapCanvas3D.tsx`
* **Route:** `/studio`
* **Objective:** Provide high-fidelity procedural PBR textures to make the Three.js 3D Mandap Builder look hyper-realistic.

| Deliverable | Qty | Resolution | Type | Visual Subject | File Destination |
|---|---|---|---|---|---|
| **Gold Filigree PBR Map** | 3 (Albedo, Normal, Roughness) | 2048 × 2048 | 1:1 Seamless | Detailed carved Indian gold foil and polished brass leaf texture for mandap pillars. | `frontend/public/textures/gold-filigree-albedo.webp`<br>`frontend/public/textures/gold-filigree-normal.webp`<br>`frontend/public/textures/gold-filigree-roughness.webp` |
| **Marble Floor Reflection Map** | 2 (Diffuse, Roughness) | 2048 × 2048 | 1:1 Seamless | White Makrana marble with subtle golden-grey veins and high specular reflection. | `frontend/public/textures/marble-palace-diffuse.webp`<br>`frontend/public/textures/marble-palace-roughness.webp` |
| **Red Velvet Cloth Drape** | 2 (Normal, Height) | 2048 × 2048 | 1:1 Seamless | Micro-fiber velvet wrinkles and heavy silk folds for canopy cloth simulations. | `frontend/public/textures/velvet-drapes-normal.webp` |
| **HDRI Environment Panoramas** | 2 | 4096 × 2048 | 2:1 Equirectangular | 1) Udaipur Lake Pichola sunset skybox; 2) Jaipur Royal Palace illuminated courtyard skybox. | `frontend/public/hdr/udaipur-sunset-equirect.hdr`<br>`frontend/public/hdr/jaipur-palace-night-equirect.hdr` |

---

### Section 7: VIP Guest RSVP & Digital Wedding Passes
* **Component Path:** `frontend/src/app/rsvp/page.tsx`
* **Route:** `/rsvp`
* **Objective:** Give guests a royal concierge boarding pass experience with printable badges and digital passes.

| Deliverable | Qty | Aspect Ratio | Visual Subject | File Destination |
|---|---|---|---|---|---|
| **Digital Royal Invitation Card** | 1 | 3:4 (1200x1600) | Deep maroon background with hand-drawn gold Mughal jaali borders, embossed crest, and elegant serif typography. | `frontend/public/images/rsvp/royal-invite-template.webp` |
| **Custom Wax Seal Monogram** | 1 | 1:1 (PNG with Alpha) | 3D rendered wax seal in dark maroon with stamped gold "SPE" royal insignia. | `frontend/public/images/rsvp/gold-wax-seal.png` |
| **Venue Arrival Dock Illustration** | 1 | 16:9 (1920x1080) | Artistic map illustration showing Udaipur airport, private jetty, and Jagmandir boat route with gold pin icons. | `frontend/public/images/rsvp/udaipur-logistics-map.webp` |
| **Digital Keycard Pass Mockup** | 1 | 16:9 | High-res image of contactless wooden RFID royal room keycard inside custom gift box. | `frontend/public/images/rsvp/keycard-hamper-mockup.webp` |

---

### Section 8: Luxury Vendor & RFP Marketplace
* **Component Path:** `frontend/src/app/vendors/page.tsx` & `frontend/src/data/vendorsData.ts`
* **Route:** `/vendors`
* **Objective:** Display credible elite vendor portfolios for white-glove catering, photography, floral rigging, and sound engineering.

| Deliverable | Qty | Ratio | Vendor Specialization | Visual Subject | File Destination |
|---|---|---|---|---|---|
| **Vendor Card 1** | 1 | 16:9 | Royal Mewari Culinary Atelier | Chef in immaculate whites plating gold leaf desserts. | `frontend/public/images/vendors/culinary-artisan.webp` |
| **Vendor Card 2** | 1 | 16:9 | Lumina Cine-Studios | Red V-Raptor cinema camera rigged on Ronin gimbal filming wedding vows. | `frontend/public/images/vendors/cinema-production.webp` |
| **Vendor Card 3** | 1 | 16:9 | Royal Petal Imports | Florists hand-arranging imported Dutch hydrangeas on a 15-foot frame. | `frontend/public/images/vendors/floral-sculptors.webp` |
| **Vendor Card 4** | 1 | 16:9 | Apex Sound & Truss Rigging | Professional concert line-array sound rig and laser technicians at console. | `frontend/public/images/vendors/sound-lighting-rig.webp` |
| **Vendor Card 5** | 1 | 16:9 | Sitar & Sufi Symphony Ensemble | World-renowned sitar and tabla maestros performing in silk kurtas. | `frontend/public/images/vendors/musical-ensemble.webp` |

---

### Section 9: Executive Admin CMS & Live Operations Hub
* **Component Path:** `frontend/src/app/admin/*`
* **Route:** `/admin`, `/admin/inquiries`, `/admin/crm`, `/admin/branches`
* **Objective:** Provide operational graphics, branch photography, and downloadable report mockups.

| Deliverable | Qty | Ratio | Context | Visual Subject | File Destination |
|---|---|---|---|---|---|
| **Branch Office Jaipur HQ** | 1 | 16:9 | National Branch Directory | Colonial heritage building exterior with polished brass "Saat Phere Events" nameplate. | `frontend/public/images/branches/jaipur-hq.webp` |
| **Branch Office Udaipur Hub** | 1 | 16:9 | National Branch Directory | Lake-facing modern boutique studio with floor-to-ceiling glass and mandap prototypes. | `frontend/public/images/branches/udaipur-hub.webp` |
| **Branch Office New Delhi** | 1 | 16:9 | National Branch Directory | Luxury Aerocity corporate executive boardroom with marble conference table. | `frontend/public/images/branches/delhi-office.webp` |
| **Branch Office Mumbai** | 1 | 16:9 | National Branch Directory | Penthouse consultation suite in South Mumbai with sea view. | `frontend/public/images/branches/mumbai-suite.webp` |
| **Branch Office Goa** | 1 | 16:9 | National Branch Directory | Tropical Portuguese villa studio with open courtyard and floral display. | `frontend/public/images/branches/goa-desk.webp` |

---

### Section 10: Instagram Social Proof Grid & Viral Wedding Reels
* **Component Path:** `frontend/src/components/sections/home/InstagramGrid.tsx`
* **Route:** `/` (Footer section)
* **Objective:** Showcase dynamic social activity, candid behind-the-scenes moments, and contemporary bride culture.

| Deliverable | Qty | Ratio | Visual Subject & Mood | Caption / Hook | File Destination |
|---|---|---|---|---|---|
| **Insta Post 1 (Photo)** | 1 | 4:5 | Bride doing twirl in 16-panel hand-embroidered maroon lehenga inside palace corridor. | "When royalty meets timeless grace at Rambagh Palace." | `frontend/public/images/instagram/insta-01-twirl.webp` |
| **Insta Post 2 (Video)** | 1 | 9:16 (15s) | Emotional father-daughter moment during Jaimala ritual, wiping a happy tear. | "The moments we plan for a lifetime. #EmotionalVows" | `frontend/public/videos/instagram/insta-02-father-daughter.mp4` |
| **Insta Post 3 (Photo)** | 1 | 4:5 | Close-up of champagne flute toast with grand fireworks reflecting in the glass. | "Cheers to forever under the stars of Lake Pichola." | `frontend/public/images/instagram/insta-03-champagne-fireworks.webp` |
| **Insta Post 4 (Video)** | 1 | 9:16 (15s) | Drone shot descending from clouds straight onto illuminated floating mandap at night. | "Architecture built for one sacred night. #LotusMandap" | `frontend/public/videos/instagram/insta-04-drone-mandap.mp4` |
| **Insta Post 5 (Photo)** | 1 | 4:5 | Sunset Haldi laughter with bride covered in yellow marigolds and turmeric petals. | "Sunshine, laughter, and haldi hues." | `frontend/public/images/instagram/insta-05-haldi-laughter.webp` |
| **Insta Post 6 (Photo)** | 1 | 4:5 | Groom leading his baraat with smoke bombs and brass band in old city Udaipur. | "The most energetic baraat entry of 2026." | `frontend/public/images/instagram/insta-06-royal-baraat.webp` |

---

## 4. Overall Master Production Budget & Asset Matrix Summary

| Section | Still Photos Required | Video Clips Required | 3D Textures / Maps | Total Media Assets |
|---|---|---|---|---|
| **1. Homepage Hero Showcase** | 3 Posters | 5 Videos (3 Desktop + 2 Mobile) | 0 | 8 |
| **2. Brand Heritage & About** | 6 Photos | 0 | 0 | 6 |
| **3. 9 Service Disciplines** | 54 Photos (9 Hero + 45 Sub) | 9 Videos (30s Teasers) | 0 | 63 |
| **4. Portfolio & Lightbox** | 36 Photos (6 per category) | 6 Videos (Category Reels) | 0 | 42 |
| **5. Verified Testimonials** | 8 Photos (4 Couples + 4 Venues) | 2 Videos (Couple Reviews) | 0 | 10 |
| **6. 3D Spatial Decor Studio** | 0 | 0 | 7 PBR Textures + 2 HDRIs | 9 |
| **7. VIP RSVP & Digital Passes** | 4 Graphics/Mockups | 0 | 0 | 4 |
| **8. Vendor Marketplace** | 5 Photos | 0 | 0 | 5 |
| **9. Admin & Branch Hubs** | 5 Photos | 0 | 0 | 5 |
| **10. Instagram Social Grid** | 4 Photos | 2 Vertical Reels | 0 | 6 |
| **TOTALS** | **125 Photographs** | **24 Video Clips** | **9 3D/HDRI Assets** | **158 Production Assets** |

---

## 5. Lighting, Wardrobe, and Color Grading Guidelines

### Lighting Philosophy
* **Golden Hour (4:30 PM – 6:15 PM):** Mandatory for all lakeside and palace courtyard ceremonies to capture the authentic Rajasthan pink and gold sky tones.
* **Nighttime Ambient Warmth (2700K – 3200K):** Avoid harsh modern blue LEDs for traditional ceremonies. Use warm tungsten spotlights, real beeswax candles, and oil mashaals to illuminate architecture.
* **Bridal Skin Tones:** Always protected with custom LUTs that preserve warm golden Indian undertones without oversaturating turmeric yellow or sindoor red.

### Wardrobe & Styling Protocols
* **Bride:** Authentic bridal couture (Sabyasachi, Manish Malhotra, Raw Mango, Tarun Tahiliani style) in deep royal maroon, vermilion, rani pink, or antique gold brocade.
* **Groom:** Tailored raw silk achkans and bandhgalas with authentic safas (turbans) and heritage jewelry (kalgi, kantha necklaces).
* **Crew & Ground Staff:** Must always wear all-black bespoke formal attire with subtle gold lapel pins and discrete clear acoustic earpieces.

---

## 6. Directory Structure Setup in Project

To maintain clean code architecture and optimized Next.js static asset serving, all files must be organized into:

```
frontend/public/
├── images/
│   ├── hero/                  # hero-slide-1.webp, hero-slide-2.webp, hero-slide-3.webp
│   ├── about/                 # leadership-director.webp, methodology-*.webp
│   ├── services/              # service-*-hero.webp, individual sub-discipline photos
│   ├── gallery/               # gallery-palatial-*, gallery-destination-*, etc.
│   ├── testimonials/          # avatar-*.jpg, mandap-couple.jpg, venue backdrops
│   ├── rsvp/                  # royal-invite-template.webp, gold-wax-seal.png
│   ├── vendors/               # culinary-artisan.webp, cinema-production.webp
│   ├── branches/              # jaipur-hq.webp, udaipur-hub.webp, delhi-office.webp
│   └── instagram/             # insta-01-twirl.webp, insta-03-champagne-fireworks.webp
├── videos/
│   ├── hero/                  # hero-grand-palace-4k.mp4, hero-mobile-vertical-1.mp4
│   ├── services/              # service-wedding-planning.mp4, service-destination-weddings.mp4
│   ├── portfolio/             # video-palatial-spotlight.mp4, video-sangeet-spotlight.mp4
│   ├── testimonials/          # ananya-siddharth-review.mp4
│   └── instagram/             # insta-02-father-daughter.mp4, insta-04-drone-mandap.mp4
├── textures/                  # gold-filigree-*.webp, marble-palace-*.webp
└── hdr/                       # udaipur-sunset-equirect.hdr
```

---

*Document Version: 1.0.0 Enterprise • Approved by Creative Architecture Team*
