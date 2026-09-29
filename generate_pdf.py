import os
import sys
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    PageBreak,
    KeepTogether,
    HRFlowable,
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#6B7280"))
        
        # Header (pages > 1)
        if self._pageNumber > 1:
            self.drawString(54, 755, "SAAT PHERE EVENTS — MASTER PHOTO & VIDEO PRODUCTION SPECIFICATION")
            self.drawRightString(letter[0] - 54, 755, "CONFIDENTIAL & PROPRIETARY")
            self.setStrokeColor(colors.HexColor("#D4AF37"))
            self.setLineWidth(0.8)
            self.line(54, 747, letter[0] - 54, 747)

        # Footer (all pages)
        self.setStrokeColor(colors.HexColor("#E5E7EB"))
        self.setLineWidth(0.5)
        self.line(54, 45, letter[0] - 54, 45)
        self.drawString(54, 32, "Saat Phere Events Luxury Digital Platform • https://saat-phere-events.vercel.app/")
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(letter[0] - 54, 32, page_str)
        self.restoreState()


def build_pdf(filename="photo&video.pdf"):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=48,
        rightMargin=48,
        topMargin=54,
        bottomMargin=54,
    )

    styles = getSampleStyleSheet()

    # Custom Palette
    c_gold = colors.HexColor("#D4AF37")
    c_maroon = colors.HexColor("#800020")
    c_charcoal = colors.HexColor("#1A1A1A")
    c_gray = colors.HexColor("#4B5563")
    c_light_bg = colors.HexColor("#FDFBF7")
    c_border = colors.HexColor("#E5E7EB")

    title_style = ParagraphStyle(
        "CoverTitle",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=22,
        leading=28,
        textColor=c_maroon,
        spaceAfter=6,
    )

    subtitle_style = ParagraphStyle(
        "CoverSubtitle",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=11,
        leading=16,
        textColor=c_gray,
        spaceAfter=14,
    )

    h1_style = ParagraphStyle(
        "H1",
        parent=styles["Heading1"],
        fontName="Helvetica-Bold",
        fontSize=13,
        leading=17,
        textColor=c_maroon,
        spaceBefore=14,
        spaceAfter=6,
    )

    h2_style = ParagraphStyle(
        "H2",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=10.5,
        leading=14,
        textColor=c_charcoal,
        spaceBefore=10,
        spaceAfter=4,
    )

    body_style = ParagraphStyle(
        "Body",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8.5,
        leading=12,
        textColor=c_charcoal,
        spaceAfter=4,
    )

    bullet_style = ParagraphStyle(
        "Bullet",
        parent=body_style,
        leftIndent=12,
        firstLineIndent=-8,
        spaceAfter=3,
    )

    table_header_style = ParagraphStyle(
        "TableHeader",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=8,
        leading=10,
        textColor=colors.white,
        alignment=0,
    )

    table_cell_style = ParagraphStyle(
        "TableCell",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=7.5,
        leading=10,
        textColor=c_charcoal,
    )

    table_cell_bold = ParagraphStyle(
        "TableCellBold",
        parent=table_cell_style,
        fontName="Helvetica-Bold",
        textColor=c_maroon,
    )

    story = []

    # Title Block
    story.append(Paragraph("SAAT PHERE EVENTS", ParagraphStyle("Brand", fontName="Helvetica-Bold", fontSize=11, leading=14, textColor=c_gold, spaceAfter=2)))
    story.append(Paragraph("Photography & Cinematography Master Production Specification", title_style))
    story.append(Paragraph("Comprehensive Visual Asset Matrix, Technical Standards & Deliverable Shot-List for Real-Time Luxury Standing", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=2, color=c_gold, spaceBefore=0, spaceAfter=14))

    # Executive Summary Box
    summary_text = (
        "<b>Executive Summary & Creative Direction:</b> To cement Saat Phere Events as India's premier luxury wedding "
        "and royal milestone event management firm, every photographic and video asset must project <b>regal palatial grandeur, "
        "authentic emotional depth, and immaculate bespoke craftsmanship</b>. Stock photographs or artificial AI visuals "
        "undermine high-trust HNW conversion. This specification establishes the exact shot-by-shot requirements across all "
        "10 platform sections, totaling <b>125 Still Photographs, 24 Cinematic Video Clips, and 9 3D/HDRI Assets</b>."
    )
    summary_table = Table(
        [[Paragraph(summary_text, body_style)]],
        colWidths=[516],
    )
    summary_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), c_light_bg),
        ('BOX', (0, 0), (-1, -1), 1, c_gold),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('LEFTPADDING', (0, 0), (-1, -1), 10),
        ('RIGHTPADDING', (0, 0), (-1, -1), 10),
    ]))
    story.append(summary_table)
    story.append(Spacer(1, 12))

    # Section 1: Global Technical Standards
    story.append(Paragraph("1. Global Technical Deliverable Standards", h1_style))
    tech_data = [
        [
            Paragraph("Asset Type", table_header_style),
            Paragraph("Primary Format", table_header_style),
            Paragraph("Resolution (Min)", table_header_style),
            Paragraph("Aspect Ratio", table_header_style),
            Paragraph("Frame Rate / Bitrate", table_header_style),
        ],
        [
            Paragraph("Desktop Hero Videos", table_cell_bold),
            Paragraph("WebM / MP4 (H.265)", table_cell_style),
            Paragraph("3840 × 2160 (4K UHD)", table_cell_style),
            Paragraph("16:9 Landscape", table_cell_style),
            Paragraph("60 fps slow-mo, 14-18 Mbps", table_cell_style),
        ],
        [
            Paragraph("Mobile Hero Reels", table_cell_bold),
            Paragraph("WebM / MP4 (H.264)", table_cell_style),
            Paragraph("1080 × 1920 (FHD)", table_cell_style),
            Paragraph("9:16 Vertical", table_cell_style),
            Paragraph("60 fps, 6-8 Mbps", table_cell_style),
        ],
        [
            Paragraph("Section Video Teasers", table_cell_bold),
            Paragraph("MP4 (H.264) / WebM", table_cell_style),
            Paragraph("1920 × 1080 (FHD)", table_cell_style),
            Paragraph("16:9 Landscape", table_cell_style),
            Paragraph("30/60 fps, 8 Mbps", table_cell_style),
        ],
        [
            Paragraph("Hero & Banner Stills", table_cell_bold),
            Paragraph("WebP (lossless/90%)", table_cell_style),
            Paragraph("2560 × 1440", table_cell_style),
            Paragraph("16:9 Landscape", table_cell_style),
            Paragraph("sRGB / Display P3, < 350 KB", table_cell_style),
        ],
        [
            Paragraph("Gallery & Detail Stills", table_cell_bold),
            Paragraph("WebP (88%) / JPG", table_cell_style),
            Paragraph("2000 × 1333 / 1600 × 2000", table_cell_style),
            Paragraph("3:2 & 4:5 Portrait", table_cell_style),
            Paragraph("sRGB, < 250 KB", table_cell_style),
        ],
        [
            Paragraph("Portraits & Avatars", table_cell_bold),
            Paragraph("WebP (90%) / PNG", table_cell_style),
            Paragraph("1200 × 1200", table_cell_style),
            Paragraph("1:1 Square", table_cell_style),
            Paragraph("sRGB, < 120 KB", table_cell_style),
        ],
        [
            Paragraph("3D PBR Textures & HDR", table_cell_bold),
            Paragraph("PNG / WebP / HDR", table_cell_style),
            Paragraph("2048 × 2048 / 4096 × 2048", table_cell_style),
            Paragraph("1:1 & 2:1 Equirectangular", table_cell_style),
            Paragraph("Seamless Tillable Maps", table_cell_style),
        ],
    ]
    t_tech = Table(tech_data, colWidths=[105, 95, 110, 85, 121])
    t_tech.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), c_maroon),
        ('GRID', (0, 0), (-1, -1), 0.5, c_border),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, c_light_bg]),
    ]))
    story.append(t_tech)
    story.append(Spacer(1, 12))

    # Section 2: Master Asset Matrix Summary
    story.append(Paragraph("2. Master Asset Requirements Matrix by Section", h1_style))
    summary_data = [
        [
            Paragraph("Platform Section", table_header_style),
            Paragraph("URL Route", table_header_style),
            Paragraph("Stills", table_header_style),
            Paragraph("Videos", table_header_style),
            Paragraph("3D/Other", table_header_style),
            Paragraph("Total", table_header_style),
        ],
        [Paragraph("1. Homepage Hero Showcase", table_cell_bold), Paragraph("/", table_cell_style), Paragraph("3 Posters", table_cell_style), Paragraph("5 Clips", table_cell_style), Paragraph("—", table_cell_style), Paragraph("<b>8</b>", table_cell_style)],
        [Paragraph("2. Brand Heritage & Leadership", table_cell_bold), Paragraph("/about", table_cell_style), Paragraph("6 Stills", table_cell_style), Paragraph("—", table_cell_style), Paragraph("—", table_cell_style), Paragraph("<b>6</b>", table_cell_style)],
        [Paragraph("3. 9 Dedicated Service Disciplines", table_cell_bold), Paragraph("/services/*", table_cell_style), Paragraph("54 Stills", table_cell_style), Paragraph("9 Teasers", table_cell_style), Paragraph("—", table_cell_style), Paragraph("<b>63</b>", table_cell_style)],
        [Paragraph("4. Portfolio & Lightbox Showcase", table_cell_bold), Paragraph("/portfolio", table_cell_style), Paragraph("36 Stills", table_cell_style), Paragraph("6 Reels", table_cell_style), Paragraph("—", table_cell_style), Paragraph("<b>42</b>", table_cell_style)],
        [Paragraph("5. Verified Couple Testimonials", table_cell_bold), Paragraph("/ & admin", table_cell_style), Paragraph("8 Stills", table_cell_style), Paragraph("2 Films", table_cell_style), Paragraph("—", table_cell_style), Paragraph("<b>10</b>", table_cell_style)],
        [Paragraph("6. 3D Spatial Decor Studio", table_cell_bold), Paragraph("/studio", table_cell_style), Paragraph("—", table_cell_style), Paragraph("—", table_cell_style), Paragraph("9 Maps/HDR", table_cell_style), Paragraph("<b>9</b>", table_cell_style)],
        [Paragraph("7. VIP RSVP & Digital Passes", table_cell_bold), Paragraph("/rsvp & portal", table_cell_style), Paragraph("4 Graphics", table_cell_style), Paragraph("—", table_cell_style), Paragraph("—", table_cell_style), Paragraph("<b>4</b>", table_cell_style)],
        [Paragraph("8. Luxury Vendor Marketplace", table_cell_bold), Paragraph("/vendors", table_cell_style), Paragraph("5 Stills", table_cell_style), Paragraph("—", table_cell_style), Paragraph("—", table_cell_style), Paragraph("<b>5</b>", table_cell_style)],
        [Paragraph("9. Executive Admin & Branch Hubs", table_cell_bold), Paragraph("/admin/*", table_cell_style), Paragraph("5 Stills", table_cell_style), Paragraph("—", table_cell_style), Paragraph("—", table_cell_style), Paragraph("<b>5</b>", table_cell_style)],
        [Paragraph("10. Instagram Social Proof Grid", table_cell_bold), Paragraph("/ (Footer)", table_cell_style), Paragraph("4 Stills", table_cell_style), Paragraph("2 Reels", table_cell_style), Paragraph("—", table_cell_style), Paragraph("<b>6</b>", table_cell_style)],
        [Paragraph("<b>TOTAL ASSETS NEEDED</b>", table_cell_bold), Paragraph("<b>Entire App</b>", table_cell_style), Paragraph("<b>125 Photos</b>", table_cell_bold), Paragraph("<b>24 Videos</b>", table_cell_bold), Paragraph("<b>9 3D Maps</b>", table_cell_bold), Paragraph("<b>158 ASSETS</b>", table_cell_bold)],
    ]
    t_sum = Table(summary_data, colWidths=[150, 96, 65, 65, 75, 65])
    t_sum.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), c_maroon),
        ('GRID', (0, 0), (-1, -1), 0.5, c_border),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 3.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
        ('ROWBACKGROUNDS', (0, 1), (-1, -2), [colors.white, c_light_bg]),
        ('BACKGROUND', (0, -1), (-1, -1), colors.HexColor("#FEF3C7")),
    ]))
    story.append(t_sum)
    story.append(Spacer(1, 14))

    # Page Break for Detailed Section breakdown
    story.append(PageBreak())

    # Section 3: Deep Detailed Section Shot-List
    story.append(Paragraph("3. Detailed Shot-List & Production Specification by Section", h1_style))

    # Sub-section 1: Homepage Hero
    story.append(Paragraph("Section 1: Homepage Hero Showcase (`frontend/src/components/sections/home/HeroSection.tsx`)", h2_style))
    hero_shots = [
        [
            Paragraph("Item", table_header_style),
            Paragraph("Specs", table_header_style),
            Paragraph("Visual Subject & Composition", table_header_style),
            Paragraph("Lighting & Palette", table_header_style),
            Paragraph("Destination Path", table_header_style),
        ],
        [
            Paragraph("Primary Hero Reel", table_cell_bold),
            Paragraph("16:9, 4K<br/>60fps, 45s", table_cell_style),
            Paragraph("Drone sweep over Lake Pichola (Udaipur) at sunset descending to illuminated lotus mandap with flower petal showers.", table_cell_style),
            Paragraph("Warm golden hour transition into dusk; natural torches, warm gold spotlights.", table_cell_style),
            Paragraph("public/videos/hero/<br/>hero-grand-palace-4k.mp4", table_cell_style),
        ],
        [
            Paragraph("Secondary Hero Reel (Baraat)", table_cell_bold),
            Paragraph("16:9, 4K<br/>60fps, 30s", table_cell_style),
            Paragraph("Grand royal Baraat with vintage Rolls Royce, caparisoned elephant, brass royal band in ceremonial turbans.", table_cell_style),
            Paragraph("Nighttime ambient glow with golden sparklers and fireworks in background.", table_cell_style),
            Paragraph("public/videos/hero/<br/>hero-royal-baraat.mp4", table_cell_style),
        ],
        [
            Paragraph("Tertiary Hero Reel (Sangeet)", table_cell_bold),
            Paragraph("16:9, 4K<br/>60fps, 30s", table_cell_style),
            Paragraph("Concert stage with pyrotechnic cold sparks, couple dancing on LED kinetic dance floor amidst falling confetti.", table_cell_style),
            Paragraph("Concert wash lights in royal magenta, gold, and indigo.", table_cell_style),
            Paragraph("public/videos/hero/<br/>hero-sangeet-spectacle.mp4", table_cell_style),
        ],
        [
            Paragraph("Mobile Hero Cuts (x2)", table_cell_bold),
            Paragraph("9:16, FHD<br/>60fps, 20s", table_cell_style),
            Paragraph("Vertical framing: 1) Bride entry under phoolon ki chaadar; 2) Sunset pheras with sacred havan fire glow.", table_cell_style),
            Paragraph("Soft bridal backlight, floating petals, warm fire reflections.", table_cell_style),
            Paragraph("public/videos/hero/<br/>hero-mobile-vertical-*.mp4", table_cell_style),
        ],
        [
            Paragraph("Poster Fallbacks (x3)", table_cell_bold),
            Paragraph("16:9, 2K<br/>WebP <200KB", table_cell_style),
            Paragraph("Crisp 4K frame grabs of illuminated mandap, baraat carriage, and sangeet stage for instant initial paint.", table_cell_style),
            Paragraph("High dynamic range, deep contrast, champagne gold accents.", table_cell_style),
            Paragraph("public/images/hero/<br/>hero-slide-*.webp", table_cell_style),
        ],
    ]
    t_hero = Table(hero_shots, colWidths=[90, 65, 155, 105, 101])
    t_hero.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), c_maroon),
        ('GRID', (0, 0), (-1, -1), 0.5, c_border),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, c_light_bg]),
    ]))
    story.append(t_hero)
    story.append(Spacer(1, 10))

    # Sub-section 2: The 9 Core Services
    story.append(Paragraph("Section 2: The 9 Dedicated Service Disciplines (`frontend/src/app/services/*`)", h2_style))
    story.append(Paragraph("Each discipline requires <b>1 Full-Bleed 16:9 Hero Banner</b>, <b>5 Curated 3:2 Gallery Stills</b>, and <b>1 30-Second Cinematic Teaser Reel</b> (Total: 54 Photos + 9 Videos):", body_style))

    services_list = [
        ("1. Wedding Planning & Management", "Panoramic royal banquet with 600 guests; bridal entry; sindoor ritual; master timeline coordination; midnight fireworks.", "service-wedding-planning-hero.webp", "service-wedding-planning.mp4"),
        ("2. Destination Weddings", "Aerial twilight shot of Jagmandir Island Palace; Lake Pichola boat convoy; Goa cliffside altar; Rambagh peacock dancers; Mussoorie hillside brunch.", "service-destination-weddings-hero.webp", "service-destination-weddings.mp4"),
        ("3. Engagement & Ring Ceremony", "Mirror runway with floating glass candelabras; diamond ring macro in silver box; pyrotechnic ring exchange; champagne tower; violin troupe.", "service-engagement-hero.webp", "service-engagement.mp4"),
        ("4. Birthday Parties & Kids Events", "Pastel carnival theme with carousel backdrop; architectural multi-tier cake; acrylic ball pit; liquid nitrogen ice cream; starlight tunnel.", "service-birthday-parties-hero.webp", "service-birthday-parties.mp4"),
        ("5. Anniversary & Couple Celebrations", "Silver jubilee inside mirror palace (Sheesh Mahal); 25-year memory archival wall; private beach dining; generational family portrait.", "service-anniversary-hero.webp", "service-anniversary.mp4"),
        ("6. Haldi, Mehendi & Sangeet", "Genda phool marigold explosion with yellow smoke bombs; bridal mehendi macro; turmeric splash candid; holographic stage; family flashmob.", "service-haldi-mehendi-hero.webp", "service-haldi-mehendi.mp4"),
        ("7. Reception & Wedding Decor", "Grand ballroom ceiling with 50,000 white blooms & 80 chandeliers; 100ft mirrored imperial table; kinetic lighting; backlit onyx bar.", "service-reception-decor-hero.webp", "service-reception-decor.mp4"),
        ("8. Corporate Events & Galas", "Leadership gala with curved anamorphic LED wall; keynote speaker; awards presentation; holographic credential scanner; synchronized banquet.", "service-corporate-events-hero.webp", "service-corporate-events.mp4"),
        ("9. Theme Parties & Bespoke Events", "Great Gatsby 1920s speakeasy; Mughal Darbar with Persian carpets; Bohemian sunset Coachella brunch; Moroccan souk; Winter wonderland.", "service-theme-parties-hero.webp", "service-theme-parties.mp4"),
    ]

    srv_data = [
        [
            Paragraph("Discipline Name", table_header_style),
            Paragraph("Specific Visual Elements & Key Shots", table_header_style),
            Paragraph("Hero Stills", table_header_style),
            Paragraph("Cinematic Video", table_header_style),
        ]
    ]
    for srv in services_list:
        srv_data.append([
            Paragraph(srv[0], table_cell_bold),
            Paragraph(srv[1], table_cell_style),
            Paragraph(f"1 Hero + 5 Sub<br/><code>{srv[2]}</code>", table_cell_style),
            Paragraph(f"30s 1080p<br/><code>{srv[3]}</code>", table_cell_style),
        ])

    t_srv = Table(srv_data, colWidths=[120, 220, 95, 81])
    t_srv.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), c_maroon),
        ('GRID', (0, 0), (-1, -1), 0.5, c_border),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 3.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, c_light_bg]),
    ]))
    story.append(t_srv)
    story.append(Spacer(1, 10))

    story.append(PageBreak())

    # Sub-section 3: Portfolio & Lightbox Showcase
    story.append(Paragraph("Section 3: Portfolio & 6-Category Lightbox Gallery (`/portfolio`)", h2_style))
    story.append(Paragraph("The portfolio demands <b>36 Master Photographs</b> (6 per category, 3:2 landscape and 4:5 portrait) plus <b>6 Lightbox Feature Videos</b> (45-second 1080p category highlight reels):", body_style))

    port_data = [
        [
            Paragraph("Category", table_header_style),
            Paragraph("Exact Shot Subjects Required (6 Photos per Category)", table_header_style),
            Paragraph("Feature Reel", table_header_style),
        ],
        [
            Paragraph("1. Royal Palatial", table_cell_bold),
            Paragraph("1) City Palace Jaipur wide exterior amber lighting; 2) Bride descending grand marble stair; 3) Groom ceremonial royal chariot; 4) Drone lake reflection of illuminated palace; 5) Courtyard Jaimala over reflecting pool; 6) Royal guard salute salute honoring newlyweds.", table_cell_style),
            Paragraph("45s 1080p<br/><code>video-palatial-spotlight.mp4</code>", table_cell_style),
        ],
        [
            Paragraph("2. Intimate Destination", table_cell_bold),
            Paragraph("1) Sunset cliffside altar in South Goa with natural driftwood; 2) Pine hills candlelit dinner in Mussoorie; 3) Kerala backwaters houseboat welcome party; 4) Desert sand-dune luxury tent camp; 5) 50-guest dinner by infinity pool; 6) Sunrise guest sound bath session.", table_cell_style),
            Paragraph("45s 1080p<br/><code>video-destination-spotlight.mp4</code>", table_cell_style),
        ],
        [
            Paragraph("3. Floral Mandaps", table_cell_bold),
            Paragraph("1) Floating lotus mandap with 10,000 red roses; 2) Ombre floral dome crimson to blush pink; 3) Mirrored mandap reflecting sacred fire; 4) South Indian temple mandap with brass bells; 5) Transparent acrylic wisteria mandap; 6) Macro havan kund with flower rangoli.", table_cell_style),
            Paragraph("45s 1080p<br/><code>video-mandap-spotlight.mp4</code>", table_cell_style),
        ],
        [
            Paragraph("4. Sangeet Spectacles", table_cell_bold),
            Paragraph("1) Stadium stage with kinetic LED triangles; 2) Couple choreographed duet with laser beams; 3) Crowd reaction with confetti burst; 4) Celebrity DJ behind chrome console; 5) Cold-pyro fireworks shooting 20ft high; 6) Neon bar with flair mixologists.", table_cell_style),
            Paragraph("45s 1080p<br/><code>video-sangeet-spotlight.mp4</code>", table_cell_style),
        ],
        [
            Paragraph("5. Couture & Details", table_cell_bold),
            Paragraph("1) Macro Polki diamond and emerald necklace; 2) Hand-embroidered zardozi gold thread sherwani; 3) Designer lehenga skirt spinning in slow-mo; 4) Groom tying silk safa with jeweled kalgi; 5) Boxed gold-foil wedding invite with attar vials; 6) Customized bridal pearl footwear.", table_cell_style),
            Paragraph("45s 1080p<br/><code>video-couture-spotlight.mp4</code>", table_cell_style),
        ],
        [
            Paragraph("6. Culinary & Banquets", table_cell_bold),
            Paragraph("1) Royal Mewari silver thali feast (21 dishes); 2) Live flaming Japanese robata grill; 3) 6-tier French macaron & croquembouche tower; 4) Smoked botanical cocktail under glass cloche; 5) Suspended gold birdcage sweet dessert display; 6) Truffle pasta in parmesan cheese wheel.", table_cell_style),
            Paragraph("45s 1080p<br/><code>video-culinary-spotlight.mp4</code>", table_cell_style),
        ],
    ]
    t_port = Table(port_data, colWidths=[105, 305, 106])
    t_port.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), c_maroon),
        ('GRID', (0, 0), (-1, -1), 0.5, c_border),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 3.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, c_light_bg]),
    ]))
    story.append(t_port)
    story.append(Spacer(1, 10))

    # Sub-section 4: Testimonials, 3D Studio, RSVP, Vendors & Admin
    story.append(Paragraph("Section 4: Supporting Modules (Reviews, 3D Studio, RSVP, Vendors & Branches)", h2_style))

    supp_data = [
        [
            Paragraph("Module & Path", table_header_style),
            Paragraph("Qty & Format", table_header_style),
            Paragraph("Visual Subject & Specifications", table_header_style),
            Paragraph("File Destination", table_header_style),
        ],
        [
            Paragraph("Verified Couple Reviews<br/><code>/ & /admin/testimonials</code>", table_cell_bold),
            Paragraph("4 Portraits (1:1)<br/>4 Venues (16:9)<br/>2 Videos (45s)", table_cell_style),
            Paragraph("Real couples (Singhania, Mehta, Reddy, Kapoor) in bespoke designer attire; background palace architectures (Udaivilas, Rambagh, Falaknuma, ITC Goa); 2 talking-head client films.", table_cell_style),
            Paragraph("public/images/testimonials/<br/>avatar-*.jpg<br/>public/videos/testimonials/", table_cell_style),
        ],
        [
            Paragraph("3D Spatial Decor Studio<br/><code>/studio</code>", table_cell_bold),
            Paragraph("7 PBR Maps (1:1)<br/>2 HDRIs (2:1)", table_cell_style),
            Paragraph("Seamless tillable PBR maps: Gold filigree (Albedo, Normal, Roughness), Makrana marble floor reflections, Red velvet drapes; 2 4K Equirectangular HDRIs (Udaipur sunset & Jaipur night).", table_cell_style),
            Paragraph("public/textures/<br/>public/hdr/", table_cell_style),
        ],
        [
            Paragraph("VIP Guest RSVP & Passes<br/><code>/rsvp & /portal</code>", table_cell_bold),
            Paragraph("4 Graphic Stills<br/>(3:4 & 16:9)", table_cell_style),
            Paragraph("Royal invitation card with Mughal jaali gold borders; 3D SPE crest wax seal with alpha; Lake Pichola arrival dock map; Wooden contactless RFID keycard hamper mockup.", table_cell_style),
            Paragraph("public/images/rsvp/<br/>royal-invite-template.webp<br/>gold-wax-seal.png", table_cell_style),
        ],
        [
            Paragraph("Luxury Vendor Marketplace<br/><code>/vendors</code>", table_cell_bold),
            Paragraph("5 Stills (16:9)", table_cell_style),
            Paragraph("Master culinary chef plating gold leaf; Cinema camera rigged on Ronin gimbal; Florists arranging Dutch hydrangeas; Concert sound & truss console; Sitar and tabla maestro ensemble.", table_cell_style),
            Paragraph("public/images/vendors/<br/>culinary-artisan.webp<br/>cinema-production.webp", table_cell_style),
        ],
        [
            Paragraph("National Branch Hubs<br/><code>/admin/branches</code>", table_cell_bold),
            Paragraph("5 Stills (16:9)", table_cell_style),
            Paragraph("Architectural photos of official hubs: Jaipur Heritage HQ; Udaipur Lake Pichola Hub; New Delhi Aerocity Suite; Mumbai Marine Drive Penthouse; Goa Coastal Studio.", table_cell_style),
            Paragraph("public/images/branches/<br/>jaipur-hq.webp<br/>udaipur-hub.webp", table_cell_style),
        ],
        [
            Paragraph("Instagram Social Proof<br/><code>/ (Homepage Footer)</code>", table_cell_bold),
            Paragraph("4 Stills (4:5)<br/>2 Reels (9:16, 15s)", table_cell_style),
            Paragraph("Editorial candid moments: Bridal lehenga twirl; Father-daughter emotional Jaimala tear; Champagne toast with fireworks; Drone descent onto illuminated mandap; Sunset Haldi laughter.", table_cell_style),
            Paragraph("public/images/instagram/<br/>public/videos/instagram/", table_cell_style),
        ],
    ]
    t_supp = Table(supp_data, colWidths=[110, 85, 205, 116])
    t_supp.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), c_maroon),
        ('GRID', (0, 0), (-1, -1), 0.5, c_border),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 3.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, c_light_bg]),
    ]))
    story.append(t_supp)
    story.append(Spacer(1, 12))

    # Section 4: Production Shooting Guidelines
    story.append(Paragraph("4. Lighting, Wardrobe Styling & Color Grading Protocols", h1_style))
    story.append(Paragraph("<b>Lighting Rules:</b>", h2_style))
    story.append(Paragraph("• <b>Golden Hour Priority (4:30 PM – 6:15 PM):</b> Essential for all lakeside and palace courtyard ceremonies. Captures warm golden amber skies without artificial harshness.", bullet_style))
    story.append(Paragraph("• <b>Night Ambient Warmth (2700K – 3200K):</b> Eliminate cold blue floodlights on heritage stone. Utilize warm tungsten fixtures, real beeswax candles, and copper oil mashaals.", bullet_style))
    story.append(Paragraph("• <b>Bridal Skin Tone Preservation:</b> Color grading LUTs must protect natural warm Indian skin tones, preventing red/yellow clipping during Haldi and Sindoor rituals.", bullet_style))

    story.append(Paragraph("<b>Wardrobe Protocols:</b>", h2_style))
    story.append(Paragraph("• <b>Bride & Groom:</b> Bespoke heritage royal silks, banarasi weaves, and zardozi embroideries. Primary tones: Deep Maroon (`#800020`), Crimson, Champagne Gold (`#D4AF37`), Ivory (`#FFFDD0`).", bullet_style))
    story.append(Paragraph("• <b>Production Crew:</b> Ground team in all-black tailored formal suits with subtle gold lapel pins and discrete acoustic ear-sets, ensuring unobtrusive background presence.", bullet_style))

    story.append(Spacer(1, 10))
    story.append(Paragraph("5. Recommended Camera & Audio Equipment", h1_style))
    story.append(Paragraph("• <b>Cinema Cameras:</b> Sony FX6 / FX3, RED V-Raptor, or ARRI Alexa Mini LF shooting 10-bit 4:2:2 DCI 4K in Log profile.", bullet_style))
    story.append(Paragraph("• <b>Lenses:</b> 50mm f/1.2, 85mm f/1.4, 24-70mm f/2.8 GM II, and 100mm Macro for jewelry/embroidery details.", bullet_style))
    story.append(Paragraph("• <b>Stabilization & Aerial:</b> DJI Ronin 4D / RS3 Pro gimbals; DJI Mavic 3 Pro Cine with Hasselblad camera for majestic palace drone flyovers.", bullet_style))
    story.append(Paragraph("• <b>Audio Architecture:</b> 32-bit float wireless lavaliers for vows; ambient stereo shotgun mics to capture authentic shehnai, dhol beats, and crowd applause.", bullet_style))

    # Build the document
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Successfully generated luxury PDF: {filename}")

if __name__ == "__main__":
    out_file = "photo&video.pdf"
    if len(sys.argv) > 1:
        out_file = sys.argv[1]
    build_pdf(out_file)
