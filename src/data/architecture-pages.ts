export type ArchitectureSection = {
    id: string;
    title: string;
    body: string;
    points?: string[];
    link?: { label: string; href: string };
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
        intro: "Veterinary-grade H₂O₂ parasite treatments for salmon, supported by automated dosing systems, documented protocols and field expertise.",
        image: "/images/wp/products/bath-hero.jpg",
        imageAlt: "Salmon treatment at a sea farm",
        sections: [
            { id: "bath-treatments", title: "Bath Treatments: Tarpaulin & Wellboat", body: "Controlled treatment can take place in a sea cage under tarpaulin or in a wellboat. Our teams plan the set-up, place the hoses, monitor dosing and support the safe completion of treatment.", points: ["Gentle crowding and hose placement", "Pre-dose, titration and controlled main dose", "Documented application under a tarpaulin or in vessel wells"], link: { label: "Explore bath treatments", href: "/products/bath-treatments" } },
            { id: "species-applications", title: "Species and Applications", body: "Our fish concept addresses sea lice and Amoebic Gill Disease (AGD) in salmon farming. Controlled H₂O₂ application is also being developed for seabass and seabream parasite challenges in Mediterranean waters.", points: ["Sea lice, including Caligus and Lepeophtheirus", "Amoebic Gill Disease", "Seabass and seabream trials"] },
            { id: "dosing-systems", title: "Dosing Systems", body: "Automated S, N and W units support accurate application across sea cages and wellboats. Equipment specifications and comparisons live in Systems & Services.", link: { label: "Read more – Systems & Services", href: "/systems-services#dosing-systems" } },
            { id: "field-support", title: "Field Support", body: "Veterinarians, treatment experts and technical teams can assist with diagnostics, planning, calibration, training, equipment maintenance and on-site or remote follow-up." },
            { id: "hse-sds-docs", title: "HSE and SDS Docs", body: "Market-specific fish safety documentation and product stewardship guidance are provided by our HSE team.", link: { label: "Contact our Global HSE manager", href: "/systems-services#hse-product-stewardship" } },
        ],
    },
    shrimp: {
        eyebrow: "Aquaculture Health Concepts / Shrimp",
        title: "Shrimp – Pond Health",
        intro: "SEATRU™ concepts for preventative pond oxygenation and outbreak management, backed by dosing guidance, farm expertise and applied R&D.",
        image: "/images/wp/products/water-chapter-seatru.jpg",
        imageAlt: "Shrimp aquaculture ponds",
        sections: [
            { id: "pond-oxygenation", title: "Pond Oxygenation", body: "Food-grade H₂O₂ is applied through controlled dosing to support dissolved oxygen levels. The system can integrate with oxygen sensors and respond to pond conditions.", link: { label: "Explore water conditioning", href: "/products/water-conditioning-oxygenation" } },
            { id: "outbreak-control", title: "Outbreak Control", body: "For Asia only, our separate PAA-based water-treatment concept supports Vibrio management. This is distinct from the H₂O₂-based pond oxygenation platform." },
            { id: "field-support", title: "Field Support", body: "Farm teams can access protocols, training, dosing guidance and on-site or remote follow-up, with technical and microbiological expertise as needed." },
            { id: "hse-sds-docs", title: "HSE and SDS Docs", body: "Shrimp-sector safety documents are managed separately from fish-sector materials and can be requested for the relevant market.", link: { label: "Contact our Global HSE manager", href: "/systems-services#hse-product-stewardship" } },
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
            { id: "hse-product-stewardship", title: "HSE and Product Stewardship", body: "Safety comes first. We support teams working with H₂O₂ through product stewardship, best-practice guidance, hands-on drills and training with local HSE partners.", link: { label: "Contact our Global HSE manager", href: "/contact#contact" } },
            { id: "safety-guides", title: "Safety guides", body: "Request the latest SEATRU™ and Paramove® safety and best-practice materials from our HSE team.", link: { label: "Request safety guides", href: "/contact#contact" } },
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
