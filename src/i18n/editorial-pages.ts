import { defaultLocale, type Locale } from "@/i18n/config";

type EditorialPagesContent = {
  about: {
    metadata: { title: string; description: string };
    hero: { kicker: string; title: string; description: string; imageAlt: string };
    company: { kicker: string; title: string; bodyPrimary: string; bodySecondary: string };
    stats: Array<{ stat: string; label: string }>;
    values: {
      kicker: string;
      title: string;
      careTitle: string;
      careBody: string;
      dareTitle: string;
      dareBody: string;
    };
    history: {
      kicker: string;
      title: string;
      entries: Array<{ era: string; label: string; body: string }>;
    };
    archive: {
      kicker: string;
      title: string;
      description: string;
      items: Array<{ src: string; alt: string; label: string }>;
    };
    explore: { text: string; teamCta: string; innovationCta: string };
  };
  team: {
    metadata: { title: string; description: string };
    hero: { kicker: string; title: string; description: string; imageAlt: string };
    intro: { kicker: string; title: string; body: string };
    cta: { kicker: string; title: string; button: string };
    sectionTitles: Record<string, string>;
  };
  pioneering: {
    metadata: { title: string; description: string };
    hero: { kicker: string; title: string; description: string; imageAlt: string };
    intro: { kicker: string; title: string; body: string };
    timeline: {
      kicker: string;
      entries: Array<{ year: string; label: string; body: string; image?: string; alt?: string }>;
    };
    imageBreakAlt: string;
    outcomes: { kicker: string; title: string; items: Array<{ title: string; body: string }> };
    forward: { kicker: string; title: string; body: string; aboutCta: string; teamCta: string };
  };
  media: {
    metadata: { title: string; description: string };
    hero: { kicker: string; title: string; description: string; imageAlt: string };
    releasesKicker: string;
    readLabel: string;
    releases: Array<{
      date: string;
      title: string;
      description: string;
      category: string;
      href?: string;
      image: string;
    }>;
    mediaKit: {
      kicker: string;
      title: string;
      body: string;
      items: Array<{ label: string; sub: string; href: string }>;
    };
    press: { kicker: string; title: string; body: string };
  };
  sustainability: {
    metadata: { title: string; description: string };
    hero: { kicker: string; title: string; description: string; imageAlt: string };
    sections: {
      health: { kicker: string; title: string; body: string; imageAlt: string };
      environment: { kicker: string; title: string; body: string; imageAlt: string };
      commitments: { kicker: string; title: string; body: string; imageAlt: string };
      recognition: {
        kicker: string;
        title: string;
        ascLabel: string;
        ascTitle: string;
        ascBody: string;
        solarLabel: string;
        solarTitle: string;
        solarBody: string;
        solarCta: string;
        recognitionImageAlt: string;
        solarImageAlt: string;
      };
    };
    forward: { kicker: string; title: string; body: string; innovationCta: string; aboutCta: string };
  };
};

const english: EditorialPagesContent = {
  about: {
    metadata: {
      title: "About Us | Aqua Pharma",
      description: "Learn about Aqua Pharma's mission, values, and 50+ years of innovation in aquaculture",
    },
    hero: {
      kicker: "About Aqua Pharma",
      title: "Veterinary Care\nBelow Water.",
      description: "Leading veterinary services for aquaculture — designing and developing solutions for fish and shrimp health globally.",
      imageAlt: "Aqua Pharma aquaculture operations",
    },
    company: {
      kicker: "Who We Are",
      title: "A science-led company shaped by the sea.",
      bodyPrimary: "Aqua Pharma is a leading veterinary services provider for the aquaculture industry. We design and develop solutions for fish and shrimp health globally. We operate in 9 countries — Australia, Belgium, Canada, Chile, Ecuador, Indonesia, Norway, Scotland and the USA — with around 50 employees across the world.",
      bodySecondary: "The main market for Aqua Pharma is salmon farming, but we also develop treatment solutions for other species: shrimp, kingfish, trout, seabass, and seabream. Aqua Pharma Group is structurally backed by two innovative parent companies — Solvay (a global leader in sustainable materials and solutions) and Aquatiq (a Norwegian reference in Food Safety).",
    },
    stats: [
      { stat: "9", label: "Countries" },
      { stat: "50+", label: "Experts" },
      { stat: "50+", label: "Years" },
      { stat: "30+", label: "Dosing Systems" },
    ],
    values: {
      kicker: "Our Values",
      title: "We Care. We Dare.",
      careTitle: "We Care",
      careBody: "Aqua Pharma goes beyond basic expectations and continuously improves in prevention and control methods, where technology allows it. We contribute to maintaining a responsible aquaculture industry by evolving our systems to support producers in meeting their objectives.",
      dareTitle: "We Dare",
      dareBody: "Our vision \"What it Takes\" reflects our employees' attitude in their daily work and is the inspiration behind all our activities. Aqua Pharma always goes beyond the customer's expectations, bringing innovative thinking to old problems. We promote quality and take pride in the work we do — committed to our team and our customers, constantly working towards safe and sustainable approaches for management of life below water.",
    },
    history: {
      kicker: "Our History",
      title: "Five decades\nin the water.",
      entries: [
        { era: "1970", label: "Origins", body: "First salmon farming begins in Norway — pens in the sea. A new industry is born, creating an urgent need for veterinary healthcare solutions for farmed fish populations at scale." },
        { era: "Late 1980s", label: "Industry Emerges", body: "Aquaculture expands rapidly with salmon and trout. Increasing fish density in cages accelerates the spread of disease. Salmon production loses approximately $1 billion a year to sea lice — a pressing challenge that will define Aqua Pharma's purpose." },
        { era: "2009", label: "Aqua Pharma Founded", body: "Aquatiq Norway — experts in food safety — enter the scene, setting up Aqua Pharma. They develop a concept for safe and sustainable bath treatments for both tarpaulin and well boat treatments. Solvay supports product knowledge." },
        { era: "2010 – 2018", label: "Global Expansion", body: "Other countries quickly follow, with operations set up in all the main salmon farming countries across Europe, North America, South America, and South-East Asia." },
        { era: "2019 – Present", label: "Aqua Pharma Group", body: "In September 2019, a joint venture between Aquatiq and Solvay is created, and Aqua Pharma becomes Aqua Pharma Group. The partnership will accelerate research initiatives and support further growth in new aquaculture markets." },
      ],
    },
    archive: {
      kicker: "From the Archive",
      title: "The people, systems, and field realities that shaped the company.",
      description: "These source images from the original Aqua Pharma site document the operational context behind the company's growth: live farm conditions, early treatment systems, pioneering field work, and the global team supporting customers in-market.",
      items: [
        { src: "/images/wp/about/about-history.jpg", alt: "Early aquaculture history", label: "History" },
        { src: "/images/wp/about/about-operations.jpg", alt: "Operational work in the field", label: "Operations" },
        { src: "/images/wp/about/about-pioneering.jpg", alt: "Pioneering treatment development", label: "Pioneering" },
        { src: "/images/wp/about/about-team.jpg", alt: "Aqua Pharma team in Chile", label: "Team" },
      ],
    },
    explore: {
      text: "Learn more about the people and ideas behind Aqua Pharma",
      teamCta: "Meet the Team",
      innovationCta: "Innovation Story",
    },
  },
  team: {
    metadata: {
      title: "Our Team | Aqua Pharma",
      description: "Meet the global team of experts dedicated to aquaculture innovation",
    },
    hero: {
      kicker: "Our Team",
      title: "A Global Team\nof Experts",
      description: "Veterinary professionals, scientists, and specialists dedicated to advancing aquaculture health worldwide.",
      imageAlt: "Aqua Pharma team operations in the field",
    },
    intro: {
      kicker: "About the Team",
      title: "Expertise on every shore.",
      body: "Our team brings together decades of combined expertise in aquaculture healthcare, research, operations, and customer support — committed to delivering exceptional service and innovation to farmers across the globe.",
    },
    cta: {
      kicker: "Connect",
      title: "Have a question? We're here.",
      button: "Get In Touch",
    },
    sectionTitles: {
      Management: "Management",
      "Business Unit — South America": "Business Unit — South America",
      "Business Unit — North Atlantic": "Business Unit — North Atlantic",
      "Business Unit — South-East Asia": "Business Unit — South-East Asia",
      "Technical & HSE": "Technical & HSE",
      "Research & Development": "Research & Development",
      "Business Services": "Business Services",
    },
  },
  pioneering: {
    metadata: {
      title: "A History of Pioneering | Aqua Pharma",
      description: "Our journey of pioneering innovation in aquaculture — from the first well boat treatments in 2009 to next-generation sustainable solutions.",
    },
    hero: {
      kicker: "Innovation History",
      title: "A History\nof Pioneering",
      description: "Precision treatment and fish welfare — how it all started.",
      imageAlt: "Aqua Pharma pioneering well boat operations",
    },
    intro: {
      kicker: "Our Approach",
      title: "We innovate around real farm conditions, not lab abstractions.",
      body: "Since our founding, Aqua Pharma has been at the forefront of aquaculture innovation. Each milestone represents a practical breakthrough — shaped by the realities of farm operations and driven by our commitment to fish welfare and environmental responsibility.",
    },
    timeline: {
      kicker: "Innovation Timeline",
      entries: [
        { year: "2009", label: "Well Boats", image: "/images/wp/pioneering/well-boats.jpg", alt: "Well boat treatment system", body: "This is where it all started. Each well boat became equipped with one or two ISOs and a closed dosing system to ensure the highest safety standards. The well boat dosing unit determines the exact treatment volume required, bringing pharmaceutical precision directly to the farm site." },
        { year: "2009 –", label: "Titrations & Calibrations", image: "/images/wp/pioneering/titrations.jpg", alt: "Titration and calibration process", body: "Aqua Pharma's concept has the great advantage that the required concentration of product used can be easily examined by a quick titration. This method also allows the customer to assess and adjust the dosing mixture. The system takes multiple samples from the well to estimate flow and distribution, determining the right treatment volume needed. Auto-titration systems are available to further simplify the process." },
        { year: "2013", label: "Tarpaulin Treatments", image: "/images/wp/pioneering/tarpaulins.png", alt: "Tarpaulin treatment concept", body: "In 2013, the tarpaulin treatment concept was introduced. These bath treatments require less handling of the fish, are faster, and are regarded as among the gentlest treatments available with respect to fish welfare. Fish remain in their natural environment, reducing stress and supporting better welfare, while the tarpaulin limits exposure to the surrounding environment." },
        { year: "2013 –", label: "Dosing Innovation", image: "/images/wp/pioneering/dosing-innovation.png", alt: "Pioneering dosing unit design", body: "The high safety results developed for the well boat treatments were duplicated and adapted for tarpaulin treatments. Different designs were developed depending on the size of the treatment vessels. Common to all systems is that dosing occurs in a closed system until the treatment substance reaches the cage." },
        { year: "2014 –", label: "Pre-Dose Concept", image: "/images/wp/pioneering/pre-dose.jpg", alt: "Pre-dose concept for tarpaulin treatments", body: "The calibration systems from the well boat experience were brought over to tarpaulin treatments. The calibration system for tarpaulin allows the user to start with just a small dose, collect samples and calculate the filling volume in the tarp prior to the main dose. By doing so, margins and fish welfare are maximised." },
        { year: "2019 –", label: "Aqua Pharma Group", body: "In September 2019, a joint venture between Aquatiq and Solvay creates Aqua Pharma Group, accelerating research initiatives and supporting further growth in new markets. The BREEZE initiative — combining hydrogen peroxide treatment with acoustic technology — wins the European Sustainable Aquaculture Competition in 2021. SEATRU™ launches in 2022 to bring the same precision to shrimp farming." },
      ],
    },
    imageBreakAlt: "Aquaculture fish farm operations at sea",
    outcomes: {
      kicker: "What It Changed",
      title: "The outcomes behind the milestones.",
      items: [
        { title: "Industry Leadership", body: "Aqua Pharma technologies and operational methods are used across aquaculture markets worldwide, shaping how modern treatment programs are delivered." },
        { title: "Research & Development", body: "Dedicated R&D investment keeps our work grounded in science while pushing practical treatment systems forward — from BREEZE to SEATRU™." },
        { title: "Environmental Commitment", body: "Our transition toward lower-impact and non-antimicrobial approaches reflects a deliberate commitment to sustainable aquaculture. H₂O₂ breaks down into water and oxygen — no residue left behind." },
        { title: "Global Operational Impact", body: "Over 30 dosing systems installed across 9 countries. Thousands of farm operations benefit from systems designed to improve fish welfare, productivity, and consistency at scale." },
      ],
    },
    forward: {
      kicker: "Looking Forward",
      title: "The next chapter is already in the water.",
      body: "Aqua Pharma continues to explore biotechnology, automation, and sustainable farming practices. Our commitment to innovation doesn't stop — driven by science, shaped by operations, and guided by the health of life below water.",
      aboutCta: "About Aqua Pharma",
      teamCta: "Meet the Team →",
    },
  },
  media: {
    metadata: {
      title: "In The Press | Aqua Pharma",
      description: "Latest news, press releases, and media coverage about Aqua Pharma",
    },
    hero: {
      kicker: "In the Press",
      title: "News & Stories",
      description: "Updates from Aqua Pharma on innovations, partnerships, and our impact on global aquaculture.",
      imageAlt: "Aqua Pharma media and press coverage",
    },
    releasesKicker: "Press Releases",
    readLabel: "Read →",
    releases: [
      { date: "October 2022", title: "Trials of Pioneering New Anti-Sea Lice Treatment Concept Carried Out in Shetland", description: "A new anti-sea lice treatment concept under development to help make aquaculture more sustainable has successfully completed environmental safety trials of the state-of-the-art equipment in Scotland. The BREEZE consortium carried out the week-long trials at a salmon farm in Shetland, owned and operated by Scottish Sea Farms.", category: "Research", href: "https://aqua-pharma.com/wp-content/uploads/2021/02/BREEZE-Press-Release-27OCT2022-v2-1.pdf", image: "/images/wp/media/breeze-trials.jpg" },
      { date: "June 2022", title: "SEATRU™ Kicks Off With 2-Year Research Program", description: "Aqua Pharma are joining forces with microbial fingerprinting experts KYTOS to develop SEATRU™ — a unique new service platform offering shrimp farmers worldwide effective microbial control through precise dosing recommendations. The initiative kicks off in July 2022 with a two-year research project in Indonesia with local partner eFishery.", category: "Product Launch", href: "https://aqua-pharma.com/wp-content/uploads/2021/02/SEATRU%E2%84%A2-Press-Release-JUNE2022.pdf", image: "/images/wp/media/seatru.jpg" },
      { date: "May 2022", title: "Aqua Pharma Expands: Opens New Office in Chile and New Subsidiary for Salmon Farming", description: "The Norwegian supplier of hydrogen peroxide completes a major expansion in Chile, opening new offices in Puerto Montt. From this year, Aqua Pharma will also offer food safety services to the national industry through its aquaculture subsidiary, Aquatiq.", category: "Expansion", href: "https://www.salmonexpert.cl/article/aqua-pharma-en-expansion-abre-oficinas-en-chile-y-nueva-filial-para-salmonicultura/", image: "/images/wp/media/chile-expansion.jpg" },
      { date: "June 2021", title: "BREEZE Concept Wins European Sustainable Aquaculture Competition", description: "The BREEZE initiative developed by a consortium made up of Aqua Pharma Group, Pulcea, and the Norwegian University of Science & Technology was selected by EIT Food for inclusion in its 2021 Business Plan for Sustainable Aquaculture. BREEZE combines hydrogen peroxide treatment with acoustic technology pioneered by Pulcea to improve the efficiency of sea lice removal.", category: "Recognition", href: "https://aqua-pharma.com/about/pioneering/", image: "/images/wp/media/breeze-award.jpg" },
      { date: "May 2020", title: "Aqua Pharma Invests in Start-Up Technology Company Pulcea", description: "The development of an innovative new treatment method to control lice in farmed salmon has moved a step closer with the merging of interests between two experts. Pulcea, developing the use of sound energy to improve efficiency of existing sea lice treatments, has received investments from Aqua Pharma to accelerate delivery from testing through to commercialisation.", category: "Partnership", href: "https://aqua-pharma.com/aqua-pharma-takes-50-stake-in-lice-pioneer-pulcea/", image: "/images/wp/media/pulcea.png" },
      { date: "September 2019", title: "Stronger Together — A New Governance Structure for Aqua Pharma Group", description: "Paramove producer Solvay and Norwegian Food Hygiene expert Aquatiq have concluded a joint-venture agreement regarding Aqua Pharma Group, reinforcing their long-term collaboration to serve aquaculture customers. With this strong shareholder alliance, Aqua Pharma will put an even stronger focus on R&D and new treatment development for a diverse range of aquaculture segments.", category: "Partnership", href: "https://aqua-pharma.com/solvay-kjoper-seg-inn-i-aqua-pharma-group/", image: "/images/wp/media/stronger-together.jpg" },
    ],
    mediaKit: {
      kicker: "Media Kit",
      title: "Resources for journalists & media.",
      body: "For journalists, bloggers, and outlets covering aquaculture innovation — company backgrounders, executive bios, product images, and historical information available on request.",
      items: [
        { label: "Bath Treatments Brochure", sub: "Download PDF", href: "/downloads/wp/bath/norway-bath-treatments-brochure.pdf" },
        { label: "Dosing Flyer", sub: "Download PDF", href: "/downloads/wp/dosing/dosing-flyer.pdf" },
        { label: "Product Download Library", sub: "Browse Resources", href: "/products/bath-treatments#product-downloads" },
      ],
    },
    press: {
      kicker: "Press Inquiries",
      title: "Let's tell the story together.",
      body: "For interview requests, press release distribution, or media partnerships, reach out to our communications team directly.",
    },
  },
  sustainability: {
    metadata: {
      title: "Sustainability | Aqua Pharma",
      description: "Our commitment to responsible farming and environmental protection",
    },
    hero: {
      kicker: "Sustainability",
      title: "Passion for\nPure.",
      description: "Responsible farming — how we contribute to a cleaner, safer, and highly sustainable ocean lifecycle.",
      imageAlt: "Aqua Pharma sustainability operations at sea",
    },
    sections: {
      health: {
        kicker: "Health & Safety",
        title: "Health & Safety",
        body: "High safety standards and continuous improvement are an integral part of the Aqua Pharma Group work ethic and commitment. Each employee is expected to contribute to the safety of the workplace by being alert and aware of the rules, policies, and procedures, and by reporting any unsafe conditions. We are also committed to safeguarding people along the supply chain.",
        imageAlt: "Health and safety work in aquaculture operations",
      },
      environment: {
        kicker: "Environment",
        title: "Safeguarding the ecosystem.",
        body: "The Aquaculture industry is dedicated to minimising its impact on the environment. Aqua Pharma Group is committed to support the industry in this continuous process by delivering concepts and services that guarantee the wellbeing of the environment and the people who work in the industry.",
        imageAlt: "Environmental stewardship in aquaculture",
      },
      commitments: {
        kicker: "Global Commitments",
        title: "We Support the UN Sustainable Development Goals",
        body: "At Aqua Pharma Group, we believe that the respect of human lives stands above everything else. We support the UN Sustainable Development Goals where we can have a material impact. Our ambition is simple: to support farmers in lowering environmental impact and increase fish welfare, while bringing factual proof.",
        imageAlt: "UN Sustainable Development Goals supported by Aqua Pharma",
      },
      recognition: {
        kicker: "Industry Marks",
        title: "Recognition",
        ascLabel: "Aquaculture Stewardship Council",
        ascTitle: "ASC Supporter",
        ascBody: "We proudly support the ASC, certifying farms that care for the environment. Our products help prevent and control disease, directly contributing to more sustainable aquaculture worldwide.",
        solarLabel: "Solar Impulse Foundation",
        solarTitle: "Efficient Solution Label",
        solarBody: "The Paramove® concept holds the Efficient Solution label (2019), recognizing the technological feasibility, environmental benefits, and economic profitability of our sea lice treatment.",
        solarCta: "See Video",
        recognitionImageAlt: "Recognition imagery from Aqua Pharma sustainability work",
        solarImageAlt: "Solar Impulse Efficient Solution label",
      },
    },
    forward: {
      kicker: "Our Commitment",
      title: "Wellbeing\nbelow water,\nevery day.",
      body: "Sustainability is not a destination — it's a practice. Aqua Pharma continues to invest in solutions that protect ecosystems, improve fish welfare, and safeguard the industry's long-term future.",
      innovationCta: "Our Innovation Story",
      aboutCta: "About Us",
    },
  },
};

const spanish: EditorialPagesContent = {
  about: {
    ...english.about,
    metadata: {
      title: "Nosotros | Aqua Pharma",
      description: "Conoce la misión, los valores y más de 50 años de innovación acuícola de Aqua Pharma",
    },
    hero: {
      kicker: "Sobre Aqua Pharma",
      title: "Cuidado veterinario\nbajo el agua.",
      description: "Servicios veterinarios líderes para la acuicultura, diseñando y desarrollando soluciones para la salud de peces y camarones a nivel global.",
      imageAlt: "Operaciones acuícolas de Aqua Pharma",
    },
    company: {
      kicker: "Quiénes somos",
      title: "Una empresa guiada por la ciencia y moldeada por el mar.",
      bodyPrimary: "Aqua Pharma es un proveedor líder de servicios veterinarios para la industria acuícola. Diseñamos y desarrollamos soluciones para la salud de peces y camarones a nivel global. Operamos en 9 países — Australia, Bélgica, Canadá, Chile, Ecuador, Indonesia, Noruega, Escocia y EE. UU. — con alrededor de 50 colaboradores en todo el mundo.",
      bodySecondary: "El mercado principal de Aqua Pharma es la salmonicultura, pero también desarrollamos soluciones de tratamiento para otras especies: camarón, seriola, trucha, lubina y dorada. Aqua Pharma Group cuenta con el respaldo estructural de dos empresas matrices innovadoras: Solvay (líder global en materiales y soluciones sostenibles) y Aquatiq (referente noruego en seguridad alimentaria).",
    },
    stats: [
      { stat: "9", label: "Países" },
      { stat: "50+", label: "Expertos" },
      { stat: "50+", label: "Años" },
      { stat: "30+", label: "Sistemas de dosificación" },
    ],
    values: {
      kicker: "Nuestros valores",
      title: "Nos importa. Nos atrevemos.",
      careTitle: "Nos importa",
      careBody: "Aqua Pharma va más allá de lo básico y mejora continuamente en métodos de prevención y control donde la tecnología lo permite. Contribuimos a una acuicultura responsable al evolucionar nuestros sistemas para apoyar a los productores en el cumplimiento de sus objetivos.",
      dareTitle: "Nos atrevemos",
      dareBody: "Nuestra visión \"What it Takes\" refleja la actitud diaria de nuestros colaboradores e inspira todas nuestras actividades. Aqua Pharma siempre va más allá de las expectativas del cliente, aportando pensamiento innovador a problemas conocidos. Promovemos la calidad y nos enorgullece el trabajo que hacemos, comprometidos con nuestro equipo y nuestros clientes, avanzando constantemente hacia enfoques seguros y sostenibles para la gestión de la vida bajo el agua.",
    },
    history: {
      kicker: "Nuestra historia",
      title: "Cinco décadas\nen el agua.",
      entries: [
        { era: "1970", label: "Orígenes", body: "La salmonicultura comienza en Noruega con jaulas en el mar. Nace una nueva industria y, con ella, una necesidad urgente de soluciones sanitarias veterinarias para poblaciones de peces cultivados a escala." },
        { era: "Finales de los 80", label: "La industria emerge", body: "La acuicultura crece rápidamente con salmón y trucha. La mayor densidad de peces en las jaulas acelera la propagación de enfermedades. La producción de salmón pierde aproximadamente mil millones de dólares al año por el piojo de mar, un desafío que definirá el propósito de Aqua Pharma." },
        { era: "2009", label: "Fundación de Aqua Pharma", body: "Aquatiq Norway, expertos en inocuidad alimentaria, entra en escena y crea Aqua Pharma. Desarrolla un concepto de tratamientos de baño seguros y sostenibles para lonas y wellboats. Solvay aporta conocimiento de producto." },
        { era: "2010 – 2018", label: "Expansión global", body: "Otros países siguieron rápidamente, con operaciones en los principales mercados salmoneros de Europa, Norteamérica, Sudamérica y el Sudeste Asiático." },
        { era: "2019 – Actualidad", label: "Aqua Pharma Group", body: "En septiembre de 2019 se crea una empresa conjunta entre Aquatiq y Solvay y Aqua Pharma pasa a ser Aqua Pharma Group. La alianza acelera la investigación y el crecimiento en nuevos mercados acuícolas." },
      ],
    },
    archive: {
      kicker: "Desde el archivo",
      title: "Las personas, los sistemas y las realidades de campo que dieron forma a la empresa.",
      description: "Estas imágenes fuente del sitio original de Aqua Pharma documentan el contexto operativo detrás del crecimiento de la empresa: condiciones reales de cultivo, primeros sistemas de tratamiento, trabajo pionero en terreno y el equipo global que apoya a los clientes en sus mercados.",
      items: [
        { src: "/images/wp/about/about-history.jpg", alt: "Historia temprana de la acuicultura", label: "Historia" },
        { src: "/images/wp/about/about-operations.jpg", alt: "Trabajo operativo en terreno", label: "Operaciones" },
        { src: "/images/wp/about/about-pioneering.jpg", alt: "Desarrollo pionero de tratamientos", label: "Pioneros" },
        { src: "/images/wp/about/about-team.jpg", alt: "Equipo Aqua Pharma en Chile", label: "Equipo" },
      ],
    },
    explore: {
      text: "Conoce más sobre las personas e ideas detrás de Aqua Pharma",
      teamCta: "Conoce al equipo",
      innovationCta: "Historia de innovación",
    },
  },
  team: {
    ...english.team,
    metadata: {
      title: "Nuestro equipo | Aqua Pharma",
      description: "Conoce al equipo global de expertos dedicado a la innovación acuícola",
    },
    hero: {
      kicker: "Nuestro equipo",
      title: "Un equipo global\nde expertos",
      description: "Profesionales veterinarios, científicos y especialistas dedicados a impulsar la salud acuícola en todo el mundo.",
      imageAlt: "Operaciones del equipo Aqua Pharma en terreno",
    },
    intro: {
      kicker: "Sobre el equipo",
      title: "Experiencia en cada costa.",
      body: "Nuestro equipo reúne décadas de experiencia combinada en salud acuícola, investigación, operaciones y soporte a clientes, comprometido con ofrecer servicio excepcional e innovación a productores de todo el mundo.",
    },
    cta: {
      kicker: "Conecta",
      title: "¿Tienes una pregunta? Estamos aquí.",
      button: "Contáctanos",
    },
    sectionTitles: {
      Management: "Dirección",
      "Business Unit — South America": "Unidad de negocio — Sudamérica",
      "Business Unit — North Atlantic": "Unidad de negocio — Atlántico Norte",
      "Business Unit — South-East Asia": "Unidad de negocio — Sudeste Asiático",
      "Technical & HSE": "Técnica y HSE",
      "Research & Development": "Investigación y desarrollo",
      "Business Services": "Servicios corporativos",
    },
  },
  pioneering: {
    ...english.pioneering,
    metadata: {
      title: "Una historia pionera | Aqua Pharma",
      description: "Nuestro recorrido de innovación pionera en acuicultura, desde los primeros tratamientos en wellboat en 2009 hasta soluciones sostenibles de nueva generación.",
    },
    hero: {
      kicker: "Historia de innovación",
      title: "Una historia\npionera",
      description: "Tratamiento preciso y bienestar animal: así empezó todo.",
      imageAlt: "Operaciones pioneras de wellboat de Aqua Pharma",
    },
    intro: {
      kicker: "Nuestro enfoque",
      title: "Innovamos alrededor de condiciones reales de cultivo, no de abstracciones de laboratorio.",
      body: "Desde nuestra fundación, Aqua Pharma ha estado a la vanguardia de la innovación acuícola. Cada hito representa un avance práctico, moldeado por la realidad operativa de los centros y guiado por nuestro compromiso con el bienestar animal y la responsabilidad ambiental.",
    },
    timeline: {
      kicker: "Línea de tiempo de innovación",
      entries: [
        { year: "2009", label: "Wellboats", image: "/images/wp/pioneering/well-boats.jpg", alt: "Sistema de tratamiento en wellboat", body: "Aquí comenzó todo. Cada wellboat se equipó con uno o dos ISOs y un sistema cerrado de dosificación para asegurar los más altos estándares de seguridad. La unidad de dosificación del wellboat determina el volumen exacto de tratamiento requerido, llevando precisión farmacéutica directamente al centro." },
        { year: "2009 –", label: "Titulaciones y calibraciones", image: "/images/wp/pioneering/titrations.jpg", alt: "Proceso de titulación y calibración", body: "El concepto de Aqua Pharma tiene la gran ventaja de que la concentración requerida del producto puede examinarse fácilmente mediante una titulación rápida. Este método también permite al cliente evaluar y ajustar la mezcla de dosificación. El sistema toma múltiples muestras del pozo para estimar flujo y distribución, determinando el volumen correcto de tratamiento. Existen sistemas de auto-titulación para simplificar aún más el proceso." },
        { year: "2013", label: "Tratamientos con lona", image: "/images/wp/pioneering/tarpaulins.png", alt: "Concepto de tratamiento con lona", body: "En 2013 se introdujo el concepto de tratamiento con lona. Estos baños requieren menos manipulación de peces, son más rápidos y se consideran entre las alternativas más suaves respecto del bienestar animal. Los peces permanecen en su entorno natural, reduciendo estrés y apoyando un mejor bienestar, mientras la lona limita la exposición al entorno circundante." },
        { year: "2013 –", label: "Innovación en dosificación", image: "/images/wp/pioneering/dosing-innovation.png", alt: "Diseño pionero de unidad de dosificación", body: "Los altos resultados de seguridad desarrollados para los tratamientos en wellboat se duplicaron y adaptaron a los tratamientos con lona. Se desarrollaron distintos diseños según el tamaño de las embarcaciones de tratamiento. En todos los sistemas, la dosificación ocurre en un circuito cerrado hasta que la sustancia llega a la jaula." },
        { year: "2014 –", label: "Concepto de pre-dosis", image: "/images/wp/pioneering/pre-dose.jpg", alt: "Concepto de pre-dosis para tratamientos con lona", body: "Los sistemas de calibración de la experiencia en wellboat se trasladaron a los tratamientos con lona. El sistema de calibración para lona permite iniciar con una dosis pequeña, tomar muestras y calcular el volumen de llenado antes de la dosis principal. Con ello se maximizan los márgenes y el bienestar animal." },
        { year: "2019 –", label: "Aqua Pharma Group", body: "En septiembre de 2019, una empresa conjunta entre Aquatiq y Solvay crea Aqua Pharma Group, acelerando la investigación y respaldando un mayor crecimiento en nuevos mercados. La iniciativa BREEZE — que combina tratamiento con peróxido de hidrógeno y tecnología acústica — gana la Competencia Europea de Acuicultura Sostenible en 2021. SEATRU™ se lanza en 2022 para llevar la misma precisión al cultivo de camarones." },
      ],
    },
    imageBreakAlt: "Operaciones de cultivo marino en el mar",
    outcomes: {
      kicker: "Qué cambió",
      title: "Los resultados detrás de los hitos.",
      items: [
        { title: "Liderazgo de industria", body: "Las tecnologías y métodos operacionales de Aqua Pharma se utilizan en mercados acuícolas de todo el mundo, moldeando cómo se implementan hoy los programas modernos de tratamiento." },
        { title: "Investigación y desarrollo", body: "La inversión dedicada en I+D mantiene nuestro trabajo anclado en la ciencia mientras impulsa sistemas prácticos de tratamiento, desde BREEZE hasta SEATRU™." },
        { title: "Compromiso ambiental", body: "Nuestra transición hacia enfoques de menor impacto y no antimicrobianos refleja un compromiso deliberado con una acuicultura sostenible. El H₂O₂ se descompone en agua y oxígeno: sin residuos remanentes." },
        { title: "Impacto operacional global", body: "Más de 30 sistemas de dosificación instalados en 9 países. Miles de operaciones se benefician de sistemas diseñados para mejorar bienestar, productividad y consistencia a escala." },
      ],
    },
    forward: {
      kicker: "Mirando hacia adelante",
      title: "El próximo capítulo ya está en el agua.",
      body: "Aqua Pharma continúa explorando biotecnología, automatización y prácticas de cultivo sostenibles. Nuestro compromiso con la innovación no se detiene: está impulsado por la ciencia, moldeado por la operación y guiado por la salud de la vida bajo el agua.",
      aboutCta: "Sobre Aqua Pharma",
      teamCta: "Conoce al equipo →",
    },
  },
  media: {
    ...english.media,
    metadata: {
      title: "En la prensa | Aqua Pharma",
      description: "Últimas noticias, comunicados y cobertura mediática sobre Aqua Pharma",
    },
    hero: {
      kicker: "En la prensa",
      title: "Noticias e historias",
      description: "Actualizaciones de Aqua Pharma sobre innovaciones, alianzas e impacto en la acuicultura global.",
      imageAlt: "Cobertura de prensa y medios de Aqua Pharma",
    },
    releasesKicker: "Comunicados",
    readLabel: "Leer →",
    releases: [
      { ...english.media.releases[0], date: "Octubre 2022", category: "Investigación", title: "Pruebas del pionero nuevo concepto anti-piojo de mar realizadas en Shetland", description: "Un nuevo concepto de tratamiento anti-piojo de mar en desarrollo para ayudar a una acuicultura más sostenible completó con éxito pruebas de seguridad ambiental del equipamiento de última generación en Escocia. El consorcio BREEZE realizó las pruebas durante una semana en un centro de salmón en Shetland, propiedad de Scottish Sea Farms." },
      { ...english.media.releases[1], date: "Junio 2022", category: "Lanzamiento", title: "SEATRU™ inicia un programa de investigación de 2 años", description: "Aqua Pharma une fuerzas con los expertos en huella microbiana de KYTOS para desarrollar SEATRU™, una nueva plataforma de servicio que ofrecerá a productores de camarón de todo el mundo control microbiano efectivo mediante recomendaciones precisas de dosificación. La iniciativa comienza en julio de 2022 con un proyecto de investigación de dos años en Indonesia junto a eFishery." },
      { ...english.media.releases[2], date: "Mayo 2022", category: "Expansión", title: "Aqua Pharma se expande: abre nueva oficina en Chile y nueva filial para salmonicultura", description: "El proveedor noruego de peróxido de hidrógeno concreta una expansión relevante en Chile con nuevas oficinas en Puerto Montt. Desde este año, Aqua Pharma también ofrecerá servicios de inocuidad alimentaria a la industria nacional a través de su filial acuícola, Aquatiq." },
      { ...english.media.releases[3], date: "Junio 2021", category: "Reconocimiento", title: "El concepto BREEZE gana competencia europea de acuicultura sostenible", description: "La iniciativa BREEZE, desarrollada por un consorcio integrado por Aqua Pharma Group, Pulcea y la Universidad Noruega de Ciencia y Tecnología, fue seleccionada por EIT Food para su Plan de Negocios 2021 en acuicultura sostenible. BREEZE combina tratamiento con peróxido de hidrógeno y tecnología acústica pionera de Pulcea para mejorar la eficiencia de remoción de piojos de mar." },
      { ...english.media.releases[4], date: "Mayo 2020", category: "Alianza", title: "Aqua Pharma invierte en la start-up tecnológica Pulcea", description: "El desarrollo de un nuevo método innovador para controlar el piojo en salmón cultivado dio un paso más con la convergencia entre dos expertos. Pulcea, que desarrolla el uso de energía sonora para mejorar la eficiencia de tratamientos existentes, recibió inversión de Aqua Pharma para acelerar el paso desde las pruebas a la comercialización." },
      { ...english.media.releases[5], date: "Septiembre 2019", category: "Alianza", title: "Más fuertes juntos: nueva estructura de gobernanza para Aqua Pharma Group", description: "El productor de Paramove, Solvay, y el experto noruego en higiene alimentaria Aquatiq concluyeron un acuerdo de joint venture sobre Aqua Pharma Group, reforzando una colaboración de largo plazo para servir a clientes acuícolas. Con esta sólida alianza accionaria, Aqua Pharma profundiza su foco en I+D y en nuevos desarrollos terapéuticos para diversos segmentos acuícolas." },
    ],
    mediaKit: {
      kicker: "Kit de prensa",
      title: "Recursos para periodistas y medios.",
      body: "Para periodistas, creadores y medios que cubren innovación acuícola: antecedentes corporativos, biografías ejecutivas, imágenes de producto e información histórica disponibles a solicitud.",
      items: [
        { label: "Folleto de tratamientos de baño", sub: "Descargar PDF", href: "/downloads/wp/bath/norway-bath-treatments-brochure.pdf" },
        { label: "Folleto de dosificación", sub: "Descargar PDF", href: "/downloads/wp/dosing/dosing-flyer.pdf" },
        { label: "Biblioteca de descargas de producto", sub: "Explorar recursos", href: "/products/bath-treatments#product-downloads" },
      ],
    },
    press: {
      kicker: "Consultas de prensa",
      title: "Contemos la historia juntos.",
      body: "Para solicitudes de entrevistas, distribución de comunicados o alianzas con medios, comunícate directamente con nuestro equipo de comunicaciones.",
    },
  },
  sustainability: {
    ...english.sustainability,
    metadata: {
      title: "Sostenibilidad | Aqua Pharma",
      description: "Nuestro compromiso con una producción responsable y la protección ambiental",
    },
    hero: {
      kicker: "Sostenibilidad",
      title: "Pasión por\nlo puro.",
      description: "Producción responsable: cómo contribuimos a un ciclo oceánico más limpio, seguro y profundamente sostenible.",
      imageAlt: "Operaciones de sostenibilidad de Aqua Pharma en el mar",
    },
    sections: {
      health: {
        kicker: "Salud y seguridad",
        title: "Salud y seguridad",
        body: "Los altos estándares de seguridad y la mejora continua son parte integral de la ética de trabajo y del compromiso de Aqua Pharma Group. Cada colaborador debe contribuir a la seguridad del lugar de trabajo, manteniéndose alerta, conociendo reglas, políticas y procedimientos, y reportando condiciones inseguras. También estamos comprometidos con resguardar a las personas a lo largo de la cadena de suministro.",
        imageAlt: "Trabajo de salud y seguridad en operaciones acuícolas",
      },
      environment: {
        kicker: "Medioambiente",
        title: "Resguardando el ecosistema.",
        body: "La industria acuícola está dedicada a minimizar su impacto en el medioambiente. Aqua Pharma Group está comprometida con apoyar ese proceso continuo mediante conceptos y servicios que garanticen el bienestar del entorno y de las personas que trabajan en la industria.",
        imageAlt: "Gestión ambiental en acuicultura",
      },
      commitments: {
        kicker: "Compromisos globales",
        title: "Apoyamos los Objetivos de Desarrollo Sostenible de la ONU",
        body: "En Aqua Pharma Group creemos que el respeto por la vida humana está por encima de todo. Apoyamos los Objetivos de Desarrollo Sostenible de la ONU allí donde podemos generar un impacto material. Nuestra ambición es simple: ayudar a los productores a reducir impacto ambiental y aumentar bienestar animal, con evidencia concreta.",
        imageAlt: "Objetivos de Desarrollo Sostenible de la ONU apoyados por Aqua Pharma",
      },
      recognition: {
        kicker: "Señales de industria",
        title: "Reconocimiento",
        ascLabel: "Aquaculture Stewardship Council",
        ascTitle: "Apoyo a ASC",
        ascBody: "Apoyamos con orgullo a ASC, certificando centros que cuidan el medioambiente. Nuestros productos ayudan a prevenir y controlar enfermedades, contribuyendo directamente a una acuicultura más sostenible a nivel mundial.",
        solarLabel: "Solar Impulse Foundation",
        solarTitle: "Efficient Solution Label",
        solarBody: "El concepto Paramove® cuenta con el sello Efficient Solution (2019), que reconoce la factibilidad tecnológica, los beneficios ambientales y la rentabilidad económica de nuestro tratamiento contra el piojo de mar.",
        solarCta: "Ver video",
        recognitionImageAlt: "Imágenes de reconocimiento del trabajo de sostenibilidad de Aqua Pharma",
        solarImageAlt: "Sello Solar Impulse Efficient Solution",
      },
    },
    forward: {
      kicker: "Nuestro compromiso",
      title: "Bienestar\nbajo el agua,\ncada día.",
      body: "La sostenibilidad no es un destino, sino una práctica. Aqua Pharma sigue invirtiendo en soluciones que protegen ecosistemas, mejoran el bienestar animal y resguardan el futuro de largo plazo de la industria.",
      innovationCta: "Nuestra historia de innovación",
      aboutCta: "Sobre nosotros",
    },
  },
};

const norwegian: EditorialPagesContent = {
  about: {
    ...english.about,
    metadata: {
      title: "Om oss | Aqua Pharma",
      description: "Lær om Aqua Pharmas oppdrag, verdier og mer enn 50 år med innovasjon i akvakultur",
    },
    hero: {
      kicker: "Om Aqua Pharma",
      title: "Veterinær omsorg\nunder vann.",
      description: "Ledende veterinærtjenester for akvakultur — vi designer og utvikler løsninger for fiske- og rekehelse globalt.",
      imageAlt: "Aqua Pharma akvakulturoperasjoner",
    },
    company: {
      kicker: "Hvem vi er",
      title: "Et vitenskapsdrevet selskap formet av havet.",
      bodyPrimary: "Aqua Pharma er en ledende leverandør av veterinærtjenester til akvakulturnæringen. Vi designer og utvikler løsninger for fiske- og rekehelse globalt. Vi opererer i 9 land — Australia, Belgia, Canada, Chile, Ecuador, Indonesia, Norge, Skottland og USA — med rundt 50 ansatte verden over.",
      bodySecondary: "Hovedmarkedet for Aqua Pharma er lakseoppdrett, men vi utvikler også behandlingsløsninger for andre arter: reker, kingfish, ørret, havabbor og havbrasme. Aqua Pharma Group er strukturelt støttet av to innovative morselskaper — Solvay (en global leder innen bærekraftige materialer og løsninger) og Aquatiq (en norsk referanse innen mattrygghet).",
    },
    stats: [
      { stat: "9", label: "Land" },
      { stat: "50+", label: "Eksperter" },
      { stat: "50+", label: "År" },
      { stat: "30+", label: "Doseringssystemer" },
    ],
    values: {
      kicker: "Våre verdier",
      title: "Vi bryr oss. Vi tør.",
      careTitle: "Vi bryr oss",
      careBody: "Aqua Pharma går lenger enn grunnleggende forventninger og forbedrer kontinuerlig forebyggings- og kontrollmetoder der teknologien tillater det. Vi bidrar til å opprettholde en ansvarlig akvakulturnæring ved å utvikle systemene våre slik at produsentene kan nå målene sine.",
      dareTitle: "Vi tør",
      dareBody: "Vår visjon \"What it Takes\" gjenspeiler medarbeidernes holdning i det daglige arbeidet og inspirerer alt vi gjør. Aqua Pharma går alltid utover kundens forventninger og bringer nytenkning til gamle problemer. Vi fremmer kvalitet og er stolte av arbeidet vi gjør — forpliktet til teamet vårt og kundene våre, og jobber kontinuerlig mot trygge og bærekraftige tilnærminger til forvaltning av livet under vann.",
    },
    history: {
      kicker: "Vår historie",
      title: "Fem tiår\ni vannet.",
      entries: [
        { era: "1970", label: "Opprinnelse", body: "De første lakseoppdrettene begynner i Norge — merder i sjøen. En ny industri blir født, og behovet for veterinære helseløsninger for oppdrettsfisk i stor skala blir akutt." },
        { era: "Sent på 1980-tallet", label: "Industrien vokser frem", body: "Akvakultur vokser raskt med laks og ørret. Økt fisketetthet i merdene akselererer sykdomsspredning. Lakseproduksjonen taper omtrent én milliard dollar i året på lakselus — en utfordring som skal definere Aqua Pharmas formål." },
        { era: "2009", label: "Aqua Pharma grunnlegges", body: "Aquatiq Norway — eksperter på mattrygghet — kommer på banen og etablerer Aqua Pharma. De utvikler et konsept for trygge og bærekraftige badbehandlinger både for presenning og brønnbåt. Solvay støtter med produktkunnskap." },
        { era: "2010 – 2018", label: "Global ekspansjon", body: "Andre land følger raskt etter, og virksomheten etableres i de viktigste laksemarkedene i Europa, Nord-Amerika, Sør-Amerika og Sørøst-Asia." },
        { era: "2019 – i dag", label: "Aqua Pharma Group", body: "I september 2019 etableres et joint venture mellom Aquatiq og Solvay, og Aqua Pharma blir til Aqua Pharma Group. Partnerskapet skal akselerere forskning og støtte videre vekst i nye akvakulturmarkeder." },
      ],
    },
    archive: {
      kicker: "Fra arkivet",
      title: "Menneskene, systemene og feltrealitetene som formet selskapet.",
      description: "Disse kildene fra det opprinnelige Aqua Pharma-nettstedet dokumenterer den operative konteksten bak selskapets vekst: forhold i levende anlegg, tidlige behandlingssystemer, pionerarbeid i felt og det globale teamet som støtter kundene i markedet.",
      items: [
        { src: "/images/wp/about/about-history.jpg", alt: "Tidlig akvakulturhistorie", label: "Historie" },
        { src: "/images/wp/about/about-operations.jpg", alt: "Operativt arbeid i felt", label: "Operasjoner" },
        { src: "/images/wp/about/about-pioneering.jpg", alt: "Pionerarbeid med behandlingsutvikling", label: "Pionerarbeid" },
        { src: "/images/wp/about/about-team.jpg", alt: "Aqua Pharma-teamet i Chile", label: "Team" },
      ],
    },
    explore: {
      text: "Lær mer om menneskene og ideene bak Aqua Pharma",
      teamCta: "Møt teamet",
      innovationCta: "Innovasjonshistorie",
    },
  },
  team: {
    ...english.team,
    metadata: {
      title: "Vårt team | Aqua Pharma",
      description: "Møt det globale ekspertteamet som jobber med innovasjon i akvakultur",
    },
    hero: {
      kicker: "Vårt team",
      title: "Et globalt team\nav eksperter",
      description: "Veterinærfaglige profiler, forskere og spesialister som er dedikert til å løfte akvakulturhelsen verden over.",
      imageAlt: "Aqua Pharma-team i feltarbeid",
    },
    intro: {
      kicker: "Om teamet",
      title: "Kompetanse på hver kystlinje.",
      body: "Teamet vårt samler tiår med samlet erfaring innen akvakulturhelse, forskning, drift og kundestøtte — forpliktet til å levere eksepsjonell service og innovasjon til oppdrettere over hele verden.",
    },
    cta: {
      kicker: "Kontakt",
      title: "Har du et spørsmål? Vi er her.",
      button: "Ta kontakt",
    },
    sectionTitles: {
      Management: "Ledelse",
      "Business Unit — South America": "Forretningsenhet — Sør-Amerika",
      "Business Unit — North Atlantic": "Forretningsenhet — Nord-Atlanteren",
      "Business Unit — South-East Asia": "Forretningsenhet — Sørøst-Asia",
      "Technical & HSE": "Teknisk og HMS",
      "Research & Development": "Forskning og utvikling",
      "Business Services": "Forretningstjenester",
    },
  },
  pioneering: {
    ...english.pioneering,
    metadata: {
      title: "En historie om pionerarbeid | Aqua Pharma",
      description: "Vår reise med pionerarbeid i akvakultur — fra de første brønnbåtbehandlingene i 2009 til neste generasjons bærekraftige løsninger.",
    },
    hero: {
      kicker: "Innovasjonshistorie",
      title: "En historie\nom pionerarbeid",
      description: "Presis behandling og fiskevelferd — slik startet det.",
      imageAlt: "Aqua Pharma pionerarbeid på brønnbåt",
    },
    intro: {
      kicker: "Vår tilnærming",
      title: "Vi innoverer rundt reelle driftsforhold, ikke laboratorieabstraksjoner.",
      body: "Siden oppstarten har Aqua Pharma stått i front for innovasjon i akvakultur. Hver milepæl representerer et praktisk gjennombrudd — formet av realitetene i oppdrettsdrift og drevet av vårt engasjement for fiskevelferd og miljøansvar.",
    },
    timeline: {
      kicker: "Innovasjonstidslinje",
      entries: [
        { year: "2009", label: "Brønnbåter", image: "/images/wp/pioneering/well-boats.jpg", alt: "Behandlingssystem på brønnbåt", body: "Her startet det hele. Hver brønnbåt ble utstyrt med én eller to ISOs og et lukket doseringssystem for å sikre de høyeste sikkerhetsstandardene. Doseringsenheten bestemmer nøyaktig behandlingsvolum og bringer farmasøytisk presisjon direkte ut til anlegget." },
        { year: "2009 –", label: "Titrering og kalibrering", image: "/images/wp/pioneering/titrations.jpg", alt: "Titrerings- og kalibreringsprosess", body: "Aqua Pharmas konsept har den store fordelen at nødvendig produktkonsentrasjon enkelt kan kontrolleres ved en rask titrering. Metoden lar også kunden vurdere og justere doseringsblandingen. Systemet tar flere prøver fra brønnen for å estimere strømning og fordeling, og avgjør riktig behandlingsvolum. Auto-titreringssystemer finnes for å gjøre prosessen enda enklere." },
        { year: "2013", label: "Presenningsbehandlinger", image: "/images/wp/pioneering/tarpaulins.png", alt: "Presenningsbasert behandlingskonsept", body: "I 2013 ble presenningskonseptet introdusert. Disse badbehandlingene krever mindre håndtering av fisken, går raskere og regnes blant de mest skånsomme behandlingene for fiskevelferd. Fisken blir i sitt naturlige miljø, noe som reduserer stress og støtter bedre velferd, mens presenningen begrenser eksponeringen mot omgivelsene." },
        { year: "2013 –", label: "Doseringsinnovasjon", image: "/images/wp/pioneering/dosing-innovation.png", alt: "Pionerdesign for doseringsenhet", body: "De høye sikkerhetsresultatene utviklet for brønnbåtbehandlinger ble kopiert og tilpasset presenningsbehandlinger. Ulike design ble utviklet avhengig av behandlingsfartøyenes størrelse. Felles for alle systemene er at doseringen skjer i et lukket system helt til behandlingsstoffet når merden." },
        { year: "2014 –", label: "For-doseringskonsept", image: "/images/wp/pioneering/pre-dose.jpg", alt: "For-doseringskonsept for presenningsbehandlinger", body: "Kalibreringssystemene fra brønnbåterfaringen ble tatt med over til presenningsbehandlinger. Kalibreringssystemet for presenning gjør det mulig å starte med en liten dose, ta prøver og beregne fyllvolumet i presenningen før hoveddosen. På den måten maksimeres sikkerhetsmarginer og fiskevelferd." },
        { year: "2019 –", label: "Aqua Pharma Group", body: "I september 2019 oppretter Aquatiq og Solvay Aqua Pharma Group som et joint venture, noe som akselererer forskning og støtter videre vekst i nye markeder. BREEZE-initiativet — som kombinerer hydrogenperoksidbehandling med akustisk teknologi — vinner den europeiske konkurransen for bærekraftig akvakultur i 2021. SEATRU™ lanseres i 2022 for å bringe den samme presisjonen til rekeoppdrett." },
      ],
    },
    imageBreakAlt: "Fiskeoppdrett i sjøen",
    outcomes: {
      kicker: "Hva det endret",
      title: "Resultatene bak milepælene.",
      items: [
        { title: "Bransjelederskap", body: "Aqua Pharmas teknologier og operative metoder brukes i akvakulturmarkeder over hele verden og former hvordan moderne behandlingsprogrammer leveres." },
        { title: "Forskning og utvikling", body: "Dedikerte investeringer i FoU holder arbeidet vårt forankret i vitenskap samtidig som de driver praktiske behandlingssystemer fremover — fra BREEZE til SEATRU™." },
        { title: "Miljøforpliktelse", body: "Overgangen vår mot løsninger med lavere påvirkning og uten antimikrobielle stoffer gjenspeiler et bevisst engasjement for bærekraftig akvakultur. H₂O₂ brytes ned til vann og oksygen — ingen rester igjen." },
        { title: "Global operativ effekt", body: "Over 30 doseringssystemer installert i 9 land. Tusenvis av operasjoner drar nytte av systemer som er utviklet for å forbedre fiskevelferd, produktivitet og konsistens i stor skala." },
      ],
    },
    forward: {
      kicker: "Videre fremover",
      title: "Det neste kapitlet er allerede i vannet.",
      body: "Aqua Pharma fortsetter å utforske bioteknologi, automatisering og bærekraftige oppdrettspraksiser. Vårt engasjement for innovasjon stopper ikke — det er drevet av vitenskap, formet av drift og ledet av helsen til livet under vann.",
      aboutCta: "Om Aqua Pharma",
      teamCta: "Møt teamet →",
    },
  },
  media: {
    ...english.media,
    metadata: {
      title: "I pressen | Aqua Pharma",
      description: "Siste nytt, pressemeldinger og medieomtale om Aqua Pharma",
    },
    hero: {
      kicker: "I pressen",
      title: "Nyheter og historier",
      description: "Oppdateringer fra Aqua Pharma om innovasjoner, partnerskap og vår påvirkning på global akvakultur.",
      imageAlt: "Aqua Pharma i media og presse",
    },
    releasesKicker: "Pressemeldinger",
    readLabel: "Les →",
    releases: [
      { ...english.media.releases[0], date: "Oktober 2022", category: "Forskning", title: "Forsøk med nytt pioner-konsept mot lakselus gjennomført i Shetland", description: "Et nytt behandlingskonsept mot lakselus, under utvikling for å gjøre akvakultur mer bærekraftig, har fullført miljøsikkerhetsforsøk med toppmoderne utstyr i Skottland. BREEZE-konsortiet gjennomførte en uke med forsøk ved et lakseanlegg i Shetland, eid og drevet av Scottish Sea Farms." },
      { ...english.media.releases[1], date: "Juni 2022", category: "Produktlansering", title: "SEATRU™ starter et toårig forskningsprogram", description: "Aqua Pharma går sammen med eksperter på mikrobielle fingeravtrykk i KYTOS for å utvikle SEATRU™ — en ny tjenesteplattform som skal gi rekebønder verden over effektiv mikrobiell kontroll gjennom presise doseringsanbefalinger. Initiativet starter i juli 2022 med et toårig forskningsprosjekt i Indonesia sammen med eFishery." },
      { ...english.media.releases[2], date: "Mai 2022", category: "Ekspansjon", title: "Aqua Pharma ekspanderer: åpner nytt kontor i Chile og nytt datterselskap for lakseoppdrett", description: "Den norske leverandøren av hydrogenperoksid fullfører en større ekspansjon i Chile og åpner nye kontorer i Puerto Montt. Fra dette året vil Aqua Pharma også tilby mattrygghetstjenester til den nasjonale industrien gjennom sitt akvakulturselskap, Aquatiq." },
      { ...english.media.releases[3], date: "Juni 2021", category: "Anerkjennelse", title: "BREEZE-konseptet vinner europeisk konkurranse for bærekraftig akvakultur", description: "BREEZE-initiativet, utviklet av et konsortium bestående av Aqua Pharma Group, Pulcea og NTNU, ble valgt ut av EIT Food for inkludering i deres forretningsplan for bærekraftig akvakultur i 2021. BREEZE kombinerer hydrogenperoksidbehandling med akustisk teknologi utviklet av Pulcea for å forbedre effektiviteten i fjerning av lakselus." },
      { ...english.media.releases[4], date: "Mai 2020", category: "Partnerskap", title: "Aqua Pharma investerer i teknologiselskapet Pulcea", description: "Utviklingen av en ny og innovativ behandlingsmetode mot lus i oppdrettslaks har kommet et steg videre gjennom sammenslåing av interesser mellom to eksperter. Pulcea, som utvikler bruk av lydenergi for å forbedre effekten av eksisterende lusebehandlinger, har mottatt investeringer fra Aqua Pharma for å akselerere veien fra testing til kommersialisering." },
      { ...english.media.releases[5], date: "September 2019", category: "Partnerskap", title: "Sterkere sammen — ny styringsstruktur for Aqua Pharma Group", description: "Paramove-produsenten Solvay og den norske eksperten på mathygiene Aquatiq har inngått en joint venture-avtale rundt Aqua Pharma Group, som styrker et langsiktig samarbeid for å betjene akvakulturkunder. Med denne sterke eieralliansen vil Aqua Pharma rette enda større fokus mot FoU og utvikling av nye behandlinger for et bredt spekter av akvakultursegmenter." },
    ],
    mediaKit: {
      kicker: "Mediepakke",
      title: "Ressurser for journalister og medier.",
      body: "For journalister, bloggere og medier som dekker innovasjon i akvakultur — selskapsbakgrunn, lederbiografier, produktbilder og historisk materiale tilgjengelig på forespørsel.",
      items: [
        { label: "Brosjyre for badbehandlinger", sub: "Last ned PDF", href: "/downloads/wp/bath/norway-bath-treatments-brochure.pdf" },
        { label: "Doseringsflyer", sub: "Last ned PDF", href: "/downloads/wp/dosing/dosing-flyer.pdf" },
        { label: "Produktbibliotek for nedlastinger", sub: "Se ressurser", href: "/products/bath-treatments#product-downloads" },
      ],
    },
    press: {
      kicker: "Pressehenvendelser",
      title: "La oss fortelle historien sammen.",
      body: "For intervjuforespørsler, distribusjon av pressemeldinger eller mediepartnerskap, ta direkte kontakt med kommunikasjonsteamet vårt.",
    },
  },
  sustainability: {
    ...english.sustainability,
    metadata: {
      title: "Bærekraft | Aqua Pharma",
      description: "Vårt engasjement for ansvarlig oppdrett og miljøbeskyttelse",
    },
    hero: {
      kicker: "Bærekraft",
      title: "Lidenskap for\nrenhet.",
      description: "Ansvarlig oppdrett — slik bidrar vi til et renere, tryggere og mer bærekraftig havkretsløp.",
      imageAlt: "Aqua Pharma bærekraftsarbeid til sjøs",
    },
    sections: {
      health: {
        kicker: "Helse og sikkerhet",
        title: "Helse og sikkerhet",
        body: "Høye sikkerhetsstandarder og kontinuerlig forbedring er en integrert del av Aqua Pharma Groups arbeidsmoral og forpliktelse. Hver medarbeider forventes å bidra til et trygt arbeidsmiljø ved å være oppmerksom på regler, retningslinjer og prosedyrer og ved å rapportere usikre forhold. Vi er også forpliktet til å ivareta mennesker gjennom hele verdikjeden.",
        imageAlt: "Helse- og sikkerhetsarbeid i akvakulturoperasjoner",
      },
      environment: {
        kicker: "Miljø",
        title: "Å ivareta økosystemet.",
        body: "Akvakulturnæringen er dedikert til å minimere miljøpåvirkningen sin. Aqua Pharma Group er forpliktet til å støtte denne kontinuerlige prosessen ved å levere konsepter og tjenester som sikrer trivselen til både miljøet og menneskene som arbeider i næringen.",
        imageAlt: "Miljøforvaltning i akvakultur",
      },
      commitments: {
        kicker: "Globale forpliktelser",
        title: "Vi støtter FNs bærekraftsmål",
        body: "I Aqua Pharma Group mener vi at respekt for menneskeliv står over alt annet. Vi støtter FNs bærekraftsmål der vi kan ha en materiell påvirkning. Ambisjonen vår er enkel: å hjelpe oppdrettere med å redusere miljøpåvirkning og øke fiskevelferd, samtidig som vi bringer faktabaserte bevis.",
        imageAlt: "FNs bærekraftsmål støttet av Aqua Pharma",
      },
      recognition: {
        kicker: "Bransjemerker",
        title: "Anerkjennelse",
        ascLabel: "Aquaculture Stewardship Council",
        ascTitle: "ASC-støttespiller",
        ascBody: "Vi støtter stolt ASC, som sertifiserer anlegg som tar vare på miljøet. Produktene våre bidrar til å forebygge og kontrollere sykdom, og støtter dermed mer bærekraftig akvakultur over hele verden.",
        solarLabel: "Solar Impulse Foundation",
        solarTitle: "Efficient Solution Label",
        solarBody: "Paramove®-konseptet har Efficient Solution-merket (2019), som anerkjenner den teknologiske gjennomførbarheten, miljøgevinstene og den økonomiske lønnsomheten i vår behandling mot lakselus.",
        solarCta: "Se video",
        recognitionImageAlt: "Anerkjennelsesbilder fra Aqua Pharmas bærekraftsarbeid",
        solarImageAlt: "Solar Impulse Efficient Solution-merke",
      },
    },
    forward: {
      kicker: "Vårt engasjement",
      title: "Velferd\nunder vann,\nhver dag.",
      body: "Bærekraft er ikke en destinasjon — det er en praksis. Aqua Pharma fortsetter å investere i løsninger som beskytter økosystemer, forbedrer fiskevelferd og sikrer næringens langsiktige fremtid.",
      innovationCta: "Vår innovasjonshistorie",
      aboutCta: "Om oss",
    },
  },
};

const contentByLocale: Record<Locale, EditorialPagesContent> = {
  en: english,
  es: spanish,
  no: norwegian,
};

export function getEditorialPagesContent(locale: Locale = defaultLocale) {
  return contentByLocale[locale] ?? contentByLocale[defaultLocale];
}
