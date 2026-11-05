export type ArchitectureSection = {
    id: string;
    title: string;
    body: string;
    points?: string[];
    link?: { label: string; href: string };
    image?: { src: string; alt: string };
};

export type ArchitecturePage = {
    eyebrow: string;
    title: string;
    intro: string;
    image: string;
    imageAlt: string;
    sections: ArchitectureSection[];
};

export const architecturePages = {
    fish: {
        eyebrow: "Aquaculture Health Concepts / Fish",
        title: "Fish – Parasite Control",
        intro: "Founded in Norway in 2009, Aqua Pharma has expanded its salmon activities to Scotland, Canada and Chile, built around H₂O₂-based parasite treatments, dosing systems and field support. Our salmon concept provides veterinary-grade treatment for sea lice and Amoebic Gill Disease (AGD), alongside automated dosing and expert support.",
        image: "/images/wp/products/bath-hero.jpg",
        imageAlt: "Salmon treatment at a sea farm",
        sections: [
            { id: "bath-treatments", title: "Bath Treatments: Tarpaulin & Wellboat", body: "Controlled treatment can take place in a sea cage under tarpaulin or in a wellboat. Our teams plan the set-up, place the hoses, monitor dosing and support the safe completion of treatment.", points: ["1. Gentle crowding of fish", "2. Placing the hoses", "3. Enclosing the cage with a tarpaulin for treatment", "Pre-dose: oxygen and hydrogen peroxide are applied, mixed with compressed air and measured by titration.", "Main dose: dosing and treatment are monitored with titration before releasing the tarpaulin in accordance with the treatment protocol.", "H₂O₂ breaks down into water and oxygen after use. CO₂-neutral products are available on request."], link: { label: "Explore bath treatments", href: "/products/bath-treatments" } },
            { id: "species-applications", title: "Species & Applications", body: "Our fish concept addresses sea lice and Amoebic Gill Disease (AGD) in salmon farming. Controlled H₂O₂ application is also being developed for seabass and seabream parasite challenges in Mediterranean waters.", points: ["Sea lice, including Caligus and Lepeophtheirus", "Amoebic Gill Disease", "Seabass and seabream trials"] },
            { id: "dosing-systems", title: "Dosing Systems", body: "Automated S, N and W units support accurate application across sea cages and wellboats. Equipment specifications and comparisons live in Systems & Services.", link: { label: "Read more – Systems & Services", href: "/systems-services#dosing-systems" } },
            { id: "field-support", title: "Field Support", body: "Veterinarians, treatment experts and technical teams can assist with diagnostics, planning, calibration, training, equipment maintenance and on-site or remote follow-up.", points: ["HSE stewardship and training", "Calibration, bath treatment support and field training", "Equipment maintenance and storage inspections", "Parasite diagnostics and treatment protocols", "Microbial management and diagnostic services", "Disinfection, biosecurity and R&D trials"] },
            { id: "hse-sds-docs", title: "HSE & SDS Docs", body: "Market-specific fish safety documentation and product stewardship guidance are provided by our HSE team.", link: { label: "Contact our Global HSE manager", href: "/systems-services#hse-product-stewardship" } },
            { id: "markets-contacts", title: "Markets & Contacts", body: "Connect with our teams in Canada, Chile, Greece, Norway and Scotland.", link: { label: "Find a local expert", href: "/contact#local-experts" } },
        ],
    },
    shrimp: {
        eyebrow: "Aquaculture Health Concepts / Shrimp",
        title: "Shrimp – Pond Health",
        intro: "We provide H₂O₂-based solutions for preventative pond oxygenation and are developing our SEATRU™ concepts for shrimp farming in Ecuador, Indonesia and Australia, backed by our own R&D facilities. Our shrimp platform combines H₂O₂-based oxygenation with a separate PAA-based Vibrio management concept for Asia, supported by dosing systems, farm expertise and technical support.",
        image: "/images/wp/products/water-chapter-seatru.jpg",
        imageAlt: "Shrimp aquaculture ponds",
        sections: [
            { id: "pond-oxygenation", title: "Pond Oxygenation", body: "SEATRU™ for Pond Oxygenation: food-grade H₂O₂ with dissolved-oxygen sensor integration.", points: ["Use: increase dissolved oxygen levels in shrimp ponds", "Product: food-grade H₂O₂ for preventative oxygenation", "Application: controlled pond dosing during the relevant production phase", "Set-up: dosing designed to work with dissolved-oxygen sensors and pond conditions", "H₂O₂ breaks down into water and oxygen after use. CO₂-neutral products are available on request."], link: { label: "Explore water conditioning", href: "/products/water-conditioning-oxygenation" } },
            { id: "outbreak-control", title: "Outbreak Control: Vibrio, Asia only", body: "SEATRU™ for Vibrio management is a separate PAA-based pond water-treatment concept for Asia only. It is distinct from H₂O₂-based pond oxygenation.", points: ["Use: pond water conditioning", "Product: PAA-based water treatment", "Application: controlled dosing in ponds", "Support: protocols, training, dosing guidance and follow-up"] },
            { id: "field-support", title: "Field Support", body: "Protocols, training, dosing guidance and on-site follow-up for shrimp farms.", points: ["HSE: product stewardship and training", "Farm support and field training", "Technical: equipment maintenance and service", "Logistics: storage facility inspections", "Veterinarians: parasite diagnostics and treatment protocols", "Microbiologists: microbial management and diagnostics", "Technical sales: disinfection and biosecurity", "Biologists, microbiologists and veterinarians: R&D trials"] },
            { id: "hse-sds-docs", title: "HSE & SDS Docs", body: "Request shrimp-sector Safety Data Sheets for your market from our HSE team. These documents are managed separately from fish-sector materials.", link: { label: "Contact our Global HSE manager", href: "/systems-services#hse-product-stewardship" } },
            { id: "rd-markets-contacts", title: "R&D / Markets & Contacts", body: "Our shrimp concepts are being developed in Ecuador, Indonesia and Australia, supported by research facilities and local expertise.", image: { src: "/images/wp/media/seatru.jpg", alt: "SEATRU research team" }, link: { label: "Read more about R&D", href: "/rd#seatru-research-facilities" } },
        ],
    },
    systems: {
        eyebrow: "Integrated equipment and expertise",
        title: "Systems & Services",
        intro: "Automated dosing, treatment protocols, operator training and practical support for fish and shrimp farming operations.",
        image: "/images/wp/products/dosing-hero.jpg",
        imageAlt: "Aqua Pharma automated dosing equipment",
        sections: [
            { id: "dosing-systems", title: "Dosing Systems", body: "The S, N and W range supports controlled application in sea cages and wellboats. Units are PLC-controlled and monitored, with remote-control and data-logging capability.", points: ["S — medium capacity, 2,500 Lpm", "N — high capacity, 6,000 Lpm, with pre-dilution", "W — wellboat capacity, 750 Lpm"], link: { label: "View equipment details", href: "/products/dosing-units-services" } },
            { id: "protocols", title: "Protocols", body: "Documented standard operating procedures cover sea lice, AGD, seabass and seabream, pond oxygenation and Asia-only Vibrio management." },
            { id: "on-site-support", title: "On-Site Support", body: "Experts help with treatment planning, application, operator training, equipment service and follow-up, on site or remotely.", link: { label: "Contact us", href: "/contact" } },
            { id: "hse-product-stewardship", title: "HSE & Product Stewardship", body: "Safety comes first. We support teams working with H₂O₂ through product stewardship, best-practice guidance, hands-on drills and training with local HSE partners.", points: ["Safety guides — request the latest SEATRU™ and Paramove® safety and best-practice materials from our HSE team."], link: { label: "Contact our Global HSE manager", href: "/contact#contact" } },
        ],
    },
    rd: {
        eyebrow: "Applied research",
        title: "Research & Development",
        intro: "Aqua Pharma develops and tests fish and shrimp health concepts under practical farm conditions, combining research facilities with field experience.",
        image: "/images/wp/media/seatru.jpg",
        imageAlt: "SEATRU research and aquaculture development",
        sections: [
            { id: "seatru-research-facilities", title: "SEATRU Research Facilities", body: "Our applied-research work spans Indonesia, Australia and Ecuador, from small-scale SEATRU™ development to commercial farm trials and local supply planning.", points: ["Indonesia — small-scale R&D facility", "Australia — Monagold Farm test platform", "Ecuador — local stock and concept development"] },
            { id: "trial-research-pictures", title: "Applications – Trial Research Pictures", body: "Field trials inform dosing protocols, dispersal systems and species-specific treatment pathways, including work with seabass in Greek waters.", link: { label: "Explore fish applications", href: "/concepts/fish#species-applications" } },
        ],
    },
} satisfies Record<string, ArchitecturePage>;
