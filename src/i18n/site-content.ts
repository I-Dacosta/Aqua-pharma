import { defaultLocale, type Locale } from "@/i18n/config";

export type NavigationLink =
  | { name: string; href: string; dropdown?: never; subLinks?: never }
  | { name: string; href?: never; dropdown: "salmon" | "shrimp" | "about"; subLinks: Array<{ name: string; href: string }> };

export type MapMarket = {
  iso: string;
  name: string;
  highlightIso?: string;
  modalTitle: string;
  modalDescription: string;
  address: string;
  region: string;
  email?: string;
};

export type SiteContent = {
  languageSwitcher: {
    label: string;
    options: Array<{ locale: Locale; label: string }>;
  };
  nav: {
    brand: string;
    intro: string;
    description: string;
    contactLabel: string;
    links: NavigationLink[];
  };
  footer: {
    copyright: string;
    privacy: string;
    terms: string;
    transparency: string;
    supplierCodeEn: string;
    supplierCodeEs: string;
    linkedin: string;
  };
  contact: {
    title: string;
    description: string;
    headquartersLabel: string;
    directions: string;
    form: {
      firstName: string;
      lastName: string;
      email: string;
      subject: string;
      message: string;
      consent: string;
      submit: string;
    };
  };
  home: {
    hero: {
      kicker: string;
      titleLines: [string, string];
      description: string;
      explore: string;
      contact: string;
      backdropAlt: string;
      brandAlt: string;
    };
    whatWeDo: {
      kicker: string;
      title: string;
      description: string;
      cta: string;
      imageAlt: string;
      imageCaption: string;
      imageNote: string;
      signals: Array<{
        title: string;
        body: string;
        details: string;
      }>;
    };
    news: {
      title: string;
      viewAll: string;
      readStory: string;
      readArticle: string;
      featured: {
        category: string;
        title: string;
        description: string;
      };
      items: Array<{
        category: string;
        title: string;
        description: string;
      }>;
    };
    productSection: {
      kicker: string;
      title: string;
      subtitle: string;
      description: string;
      enterChapter: string;
    };
    map: {
      sectionTitle: string;
      coverageLabel: string;
      operatingMarketsLabel: string;
      companySummary: string;
      parentSummary: string;
      marketsSuffix: string;
      dragHint: string;
      resetSelection: string;
      fallbackImageAlt: string;
      errors: {
        unsupportedBrowser: string;
        dataUnavailable: string;
        startupFailed: string;
        loadFailed: string;
      };
      markets: MapMarket[];
    };
  };
  productsUi: {
    introLabel: string;
    editorialOverview: string;
    continueChapter: string;
    fieldStoryLabel: string;
    whyItMatters: string;
    careLabel: string;
    backToHome: string;
    downloadLibraryLabel: string;
    downloadLibraryTitle: string;
    openResource: string;
    downloadAsset: string;
    viewAsset: string;
    continueSystem: string;
    relatedPaths: string;
  };
};

const sharedNavigation = {
  en: [
    {
      name: "Salmon Farming",
      dropdown: "salmon" as const,
      subLinks: [
        { name: "Bath Treatments", href: "/products/bath-treatments" },
        { name: "Dosing Units", href: "/products/dosing-units-services" },
      ],
    },
    {
      name: "Shrimp Farming",
      dropdown: "shrimp" as const,
      subLinks: [{ name: "Water Conditioning", href: "/products/water-conditioning-oxygenation" }],
    },
    { name: "Sustainability", href: "/sustainability" },
    {
      name: "About",
      dropdown: "about" as const,
      subLinks: [
        { name: "About Us", href: "/about" },
        { name: "Team", href: "/about/team" },
        { name: "Pioneering", href: "/about/pioneering" },
        { name: "Media", href: "/about/media" },
      ],
    },
  ],
  es: [
    {
      name: "Salmonicultura",
      dropdown: "salmon" as const,
      subLinks: [
        { name: "Tratamientos de baño", href: "/products/bath-treatments" },
        { name: "Unidades de dosificación", href: "/products/dosing-units-services" },
      ],
    },
    {
      name: "Camaronicultura",
      dropdown: "shrimp" as const,
      subLinks: [{ name: "Acondicionamiento del agua", href: "/products/water-conditioning-oxygenation" }],
    },
    { name: "Sostenibilidad", href: "/sustainability" },
    {
      name: "Nosotros",
      dropdown: "about" as const,
      subLinks: [
        { name: "Quiénes somos", href: "/about" },
        { name: "Equipo", href: "/about/team" },
        { name: "Trayectoria", href: "/about/pioneering" },
        { name: "Prensa", href: "/about/media" },
      ],
    },
  ],
  no: [
    {
      name: "Lakseoppdrett",
      dropdown: "salmon" as const,
      subLinks: [
        { name: "Badbehandlinger", href: "/products/bath-treatments" },
        { name: "Doseringsenheter", href: "/products/dosing-units-services" },
      ],
    },
    {
      name: "Rekeoppdrett",
      dropdown: "shrimp" as const,
      subLinks: [{ name: "Vannkondisjonering", href: "/products/water-conditioning-oxygenation" }],
    },
    { name: "Bærekraft", href: "/sustainability" },
    {
      name: "Om oss",
      dropdown: "about" as const,
      subLinks: [
        { name: "Om Aqua Pharma", href: "/about" },
        { name: "Team", href: "/about/team" },
        { name: "Pionerarbeid", href: "/about/pioneering" },
        { name: "Media", href: "/about/media" },
      ],
    },
  ],
};

const marketData: Record<Locale, MapMarket[]> = {
  en: [
    { iso: "AUS", name: "Australia", highlightIso: "AUS", modalTitle: "Australia Market", modalDescription: "Commercial distribution coverage across Australia for Aqua Pharma treatment systems and support.", address: "Sydney, Australia", region: "Oceania", email: "australia@aquapharma.example" },
    { iso: "BEL", name: "Belgium", highlightIso: "BEL", modalTitle: "Belgium Market", modalDescription: "Benelux access point for formulation partnerships, supply coordination, and field support.", address: "Brussels, Belgium", region: "Europe", email: "belgium@aquapharma.example" },
    { iso: "CAN", name: "Canada", highlightIso: "CAN", modalTitle: "Canada Market", modalDescription: "North American delivery coverage for water chemistry systems, dosing workflows, and customer onboarding.", address: "Toronto, Canada", region: "North America", email: "canada@aquapharma.example" },
    { iso: "CHL", name: "Chile", highlightIso: "CHL", modalTitle: "Chile Market", modalDescription: "Regional support for Latin American aquaculture operations, conditioning systems, and treatment rollout.", address: "Santiago, Chile", region: "South America", email: "chile@aquapharma.example" },
    { iso: "ECU", name: "Ecuador", highlightIso: "ECU", modalTitle: "Ecuador Market", modalDescription: "Shrimp and aquaculture market support for formulation deployment, performance checks, and local coordination.", address: "Quito, Ecuador", region: "South America", email: "ecuador@aquapharma.example" },
    { iso: "IDN", name: "Indonesia", highlightIso: "IDN", modalTitle: "Indonesia Market", modalDescription: "Operational coverage for Southeast Asia with support around oxygenation, treatment quality, and local delivery.", address: "Jakarta, Indonesia", region: "Asia", email: "indonesia@aquapharma.example" },
    { iso: "NOR", name: "Norway", highlightIso: "NOR", modalTitle: "Norway Market", modalDescription: "Coverage for cold-water fish farming operations, treatment integration, and partner support in the Nordics.", address: "Oslo, Norway", region: "Europe", email: "norway@aquapharma.example" },
    { iso: "SCT", name: "Scotland", highlightIso: "GBR", modalTitle: "Scotland Market", modalDescription: "Scottish market coverage for salmon farming and partner operations, represented as a focused market point.", address: "Edinburgh, Scotland", region: "Europe", email: "scotland@aquapharma.example" },
    { iso: "USA", name: "USA", highlightIso: "USA", modalTitle: "United States Market", modalDescription: "Commercial and technical support for Aqua Pharma partners across the United States.", address: "Chicago, United States", region: "North America", email: "usa@aquapharma.example" },
  ],
  es: [
    { iso: "AUS", name: "Australia", highlightIso: "AUS", modalTitle: "Mercado de Australia", modalDescription: "Cobertura comercial en Australia para los sistemas de tratamiento y soporte de Aqua Pharma.", address: "Sídney, Australia", region: "Oceanía", email: "australia@aquapharma.example" },
    { iso: "BEL", name: "Bélgica", highlightIso: "BEL", modalTitle: "Mercado de Bélgica", modalDescription: "Punto de acceso Benelux para alianzas de formulación, coordinación de suministro y soporte en campo.", address: "Bruselas, Bélgica", region: "Europa", email: "belgium@aquapharma.example" },
    { iso: "CAN", name: "Canadá", highlightIso: "CAN", modalTitle: "Mercado de Canadá", modalDescription: "Cobertura en Norteamérica para sistemas de química del agua, dosificación y acompañamiento al cliente.", address: "Toronto, Canadá", region: "Norteamérica", email: "canada@aquapharma.example" },
    { iso: "CHL", name: "Chile", highlightIso: "CHL", modalTitle: "Mercado de Chile", modalDescription: "Soporte regional para operaciones acuícolas en Latinoamérica, sistemas de acondicionamiento y despliegue de tratamientos.", address: "Santiago, Chile", region: "Sudamérica", email: "chile@aquapharma.example" },
    { iso: "ECU", name: "Ecuador", highlightIso: "ECU", modalTitle: "Mercado de Ecuador", modalDescription: "Soporte para el mercado camaronero y acuícola con despliegue de formulaciones, verificación de desempeño y coordinación local.", address: "Quito, Ecuador", region: "Sudamérica", email: "ecuador@aquapharma.example" },
    { iso: "IDN", name: "Indonesia", highlightIso: "IDN", modalTitle: "Mercado de Indonesia", modalDescription: "Cobertura operativa para el Sudeste Asiático con apoyo en oxigenación, calidad del tratamiento y entrega local.", address: "Yakarta, Indonesia", region: "Asia", email: "indonesia@aquapharma.example" },
    { iso: "NOR", name: "Noruega", highlightIso: "NOR", modalTitle: "Mercado de Noruega", modalDescription: "Cobertura para la salmonicultura en aguas frías, integración de tratamientos y soporte a socios nórdicos.", address: "Oslo, Noruega", region: "Europa", email: "norway@aquapharma.example" },
    { iso: "SCT", name: "Escocia", highlightIso: "GBR", modalTitle: "Mercado de Escocia", modalDescription: "Cobertura del mercado escocés para salmonicultura y operaciones asociadas, representada como un punto de enfoque.", address: "Edimburgo, Escocia", region: "Europa", email: "scotland@aquapharma.example" },
    { iso: "USA", name: "EE. UU.", highlightIso: "USA", modalTitle: "Mercado de Estados Unidos", modalDescription: "Soporte comercial y técnico para los socios de Aqua Pharma en Estados Unidos.", address: "Chicago, Estados Unidos", region: "Norteamérica", email: "usa@aquapharma.example" },
  ],
  no: [
    { iso: "AUS", name: "Australia", highlightIso: "AUS", modalTitle: "Australia-markedet", modalDescription: "Kommersiell dekning i Australia for Aqua Pharma sine behandlingssystemer og støtte.", address: "Sydney, Australia", region: "Oseania", email: "australia@aquapharma.example" },
    { iso: "BEL", name: "Belgia", highlightIso: "BEL", modalTitle: "Belgia-markedet", modalDescription: "Benelux-knutepunkt for formuleringssamarbeid, forsyningskoordinering og feltstøtte.", address: "Brussel, Belgia", region: "Europa", email: "belgium@aquapharma.example" },
    { iso: "CAN", name: "Canada", highlightIso: "CAN", modalTitle: "Canada-markedet", modalDescription: "Nordamerikansk dekning for vannkjemisystemer, doseringsarbeidsflyt og kundeoppfølging.", address: "Toronto, Canada", region: "Nord-Amerika", email: "canada@aquapharma.example" },
    { iso: "CHL", name: "Chile", highlightIso: "CHL", modalTitle: "Chile-markedet", modalDescription: "Regional støtte for latinamerikanske akvakulturoperasjoner, kondisjoneringssystemer og behandlingsutrulling.", address: "Santiago, Chile", region: "Sør-Amerika", email: "chile@aquapharma.example" },
    { iso: "ECU", name: "Ecuador", highlightIso: "ECU", modalTitle: "Ecuador-markedet", modalDescription: "Støtte til reke- og akvakulturmarkedet med formulering, ytelseskontroll og lokal koordinering.", address: "Quito, Ecuador", region: "Sør-Amerika", email: "ecuador@aquapharma.example" },
    { iso: "IDN", name: "Indonesia", highlightIso: "IDN", modalTitle: "Indonesia-markedet", modalDescription: "Operativ dekning for Sørøst-Asia med støtte rundt oksygenering, behandlingskvalitet og lokal levering.", address: "Jakarta, Indonesia", region: "Asia", email: "indonesia@aquapharma.example" },
    { iso: "NOR", name: "Norge", highlightIso: "NOR", modalTitle: "Norge-markedet", modalDescription: "Dekning for kaldtvannsoppdrett, behandlingsintegrasjon og partnerstøtte i Norden.", address: "Oslo, Norge", region: "Europa", email: "norway@aquapharma.example" },
    { iso: "SCT", name: "Skottland", highlightIso: "GBR", modalTitle: "Skottland-markedet", modalDescription: "Skotsk markedstilstedeværelse for lakseoppdrett og partneroperasjoner, representert som et fokuspunkt.", address: "Edinburgh, Skottland", region: "Europa", email: "scotland@aquapharma.example" },
    { iso: "USA", name: "USA", highlightIso: "USA", modalTitle: "USA-markedet", modalDescription: "Kommersiell og teknisk støtte for Aqua Pharma-partnere i USA.", address: "Chicago, USA", region: "Nord-Amerika", email: "usa@aquapharma.example" },
  ],
};

const siteContentByLocale: Record<Locale, SiteContent> = {
  en: {
    languageSwitcher: { label: "Language", options: [{ locale: "en", label: "EN" }, { locale: "es", label: "ES" }, { locale: "no", label: "NO" }] },
    nav: { brand: "Aqua Pharma", intro: "Aqua Pharma", description: "Prevention and control of disease in aquaculture.", contactLabel: "Contact Us", links: sharedNavigation.en },
    footer: { copyright: "Copyright © 2025 Aqua Pharma", privacy: "Privacy Notice and Cookie Policy", terms: "Terms and Conditions", transparency: "Transparency Act", supplierCodeEn: "APG Supplier Code of Conduct (EN)", supplierCodeEs: "APG Supplier Code of Conduct (ES)", linkedin: "LinkedIn" },
    contact: {
      title: "Contact Us",
      description: "We’re happy to answer any questions and get you introduced to Aqua Pharma. Send us an e-mail, call one of our regional managers or fill out the form.",
      headquartersLabel: "Headquarters",
      directions: "Directions at Google Maps",
      form: { firstName: "First name", lastName: "Last name", email: "Email address", subject: "Subject", message: "Message", consent: "Yes, I accept that my information is stored and processed.", submit: "Send Message" },
    },
    home: {
      hero: {
        kicker: "Chapter 01 / Welfare systems at sea",
        titleLines: ["Welfare", "below water."],
        description: "Aqua Pharma combines field treatment systems, scientific precision, and welfare-first execution to help aquaculture teams operate with more control and less stress on stock.",
        explore: "Explore Solutions",
        contact: "Contact Us",
        backdropAlt: "Aerial view of aquaculture treatment operations at dusk",
        brandAlt: "Aqua Pharma",
      },
      whatWeDo: {
        kicker: "Chapter 02 / What We Do",
        title: "Treatment systems built for the field.",
        description: "Aqua Pharma combines planning, calibrated dosing, and on-site support for aquaculture teams who need accurate treatment execution with less stress on fish and operators.",
        cta: "View treatment chapters",
        imageAlt: "A service vessel alongside a circular salmon pen in calm blue water",
        imageCaption: "Aquaculture treatment operations",
        imageNote: "Precision, planning, and field support in one live operating frame",
        signals: [
          { title: "Prevention first", body: "Protocols and readiness before treatment pressure rises.", details: "Establish treatment readiness protocols that maintain fish welfare while preparing for any scenario." },
          { title: "Precise execution", body: "Calibrated delivery built for live farm conditions.", details: "Every dose is calibrated for the exact conditions at your site—no guesswork, just precision." },
          { title: "Support on site", body: "Operational help close to the treatment moment.", details: "Our team stays close to your operations, ready to provide real-time guidance when needed." },
        ],
      },
      news: {
        title: "Latest News",
        viewAll: "View All News",
        readStory: "Read Full Story",
        readArticle: "Read Article",
        featured: { category: "Partnership & Innovation", title: "Monagold Farm — Advancing Aquaculture Technology", description: "The Monagold farm in Australia is pioneering next-generation aquaculture practices by trialing new feeding and water monitoring technology from AQ1, and collaborating with BioMar on an ongoing feed trial during the current cultivation. This partnership represents our commitment to sustainable, data-driven farming practices." },
        items: [
          { category: "Best Practices", title: "Chile Releases Best Practices Manual for Paramove®", description: "Aqua Pharma Chile has released a comprehensive Best Practices Manual for using Paramove® in immersion treatments to control Caligus rogercresseyi in salmon farming." },
          { category: "Research & Development", title: "First Cultivation Successfully Concluded", description: "On January 31st, 2024, our research facility achieved its first successful harvest, reaching our target DOC 90 with survival rates exceeding 80% in some ponds." },
          { category: "Safety & Operations", title: "Emergency Simulation Exercise Completed", description: "The Aqua Pharma Chile team successfully conducted a comprehensive emergency simulation on November 14, 2025, testing coordination with emergency responders and local authorities." },
        ],
      },
      productSection: {
        kicker: "Chapter 03 / Treatment chapters",
        title: "Three treatment chapters",
        subtitle: "One welfare operating model.",
        description: "Each chapter is shaped around a different operational reality: low-impact therapeutics, water conditioning, and engineered dosing support designed for calmer execution in the field.",
        enterChapter: "Enter chapter",
      },
      map: {
        sectionTitle: "We operate around the world",
        coverageLabel: "Market coverage",
        operatingMarketsLabel: "Operating markets",
        companySummary: "Aqua Pharma operate in 9 countries (Australia, Belgium, Canada, Chile, Ecuador, Indonesia, Norway, Scotland and the USA), with around 50 employees across the globe.",
        parentSummary: "Aqua Pharma Group is structurally backed by two innovative parent companies, Solvay (a global leader in sustainable materials and solutions) and Aquatiq (a Norwegian reference in Food Safety).",
        marketsSuffix: "markets",
        dragHint: "Drag to explore · Hover or click a market",
        resetSelection: "Reset selection",
        fallbackImageAlt: "Aqua Pharma world presence",
        errors: { unsupportedBrowser: "Interactive map unavailable in this browser. Enable hardware acceleration or try Safari or Chrome.", dataUnavailable: "Interactive map data could not be loaded.", startupFailed: "Interactive map failed to start in this browser.", loadFailed: "Interactive map failed to load." },
        markets: marketData.en,
      },
    },
    productsUi: {
      introLabel: "01 / Context",
      editorialOverview: "Editorial Overview",
      continueChapter: "Continue the chapter",
      fieldStoryLabel: "02 / Field Story",
      whyItMatters: "Why it matters",
      careLabel: "03 / Care",
      backToHome: "Back to home",
      downloadLibraryLabel: "Download Library",
      downloadLibraryTitle: "Product collateral from the original site.",
      openResource: "Open resource",
      downloadAsset: "Download asset",
      viewAsset: "View asset",
      continueSystem: "Continue through the system",
      relatedPaths: "Related product paths.",
    },
  },
  es: {
    languageSwitcher: { label: "Idioma", options: [{ locale: "en", label: "EN" }, { locale: "es", label: "ES" }, { locale: "no", label: "NO" }] },
    nav: { brand: "Aqua Pharma", intro: "Aqua Pharma", description: "Prevención y control de enfermedades en acuicultura.", contactLabel: "Contáctanos", links: sharedNavigation.es },
    footer: { copyright: "Copyright © 2025 Aqua Pharma", privacy: "Aviso de privacidad y política de cookies", terms: "Términos y condiciones", transparency: "Ley de transparencia", supplierCodeEn: "Código de conducta APG para proveedores (EN)", supplierCodeEs: "Código de conducta APG para proveedores (ES)", linkedin: "LinkedIn" },
    contact: {
      title: "Contáctanos",
      description: "Con gusto responderemos tus preguntas y te conectaremos con Aqua Pharma. Envíanos un correo, llama a uno de nuestros responsables regionales o completa el formulario.",
      headquartersLabel: "Oficina central",
      directions: "Cómo llegar en Google Maps",
      form: { firstName: "Nombre", lastName: "Apellido", email: "Correo electrónico", subject: "Asunto", message: "Mensaje", consent: "Sí, acepto que mi información sea almacenada y procesada.", submit: "Enviar mensaje" },
    },
    home: {
      hero: {
        kicker: "Capítulo 01 / Sistemas de bienestar en el mar",
        titleLines: ["Bienestar", "bajo el agua."],
        description: "Aqua Pharma combina sistemas de tratamiento en terreno, precisión científica y ejecución centrada en el bienestar para ayudar a los equipos acuícolas a operar con mayor control y menos estrés sobre la biomasa.",
        explore: "Explorar soluciones",
        contact: "Contáctanos",
        backdropAlt: "Vista aérea de operaciones de tratamiento acuícola al atardecer",
        brandAlt: "Aqua Pharma",
      },
      whatWeDo: {
        kicker: "Capítulo 02 / Lo que hacemos",
        title: "Sistemas de tratamiento diseñados para el terreno.",
        description: "Aqua Pharma combina planificación, dosificación calibrada y apoyo en sitio para equipos acuícolas que necesitan una ejecución precisa con menos estrés para peces y operadores.",
        cta: "Ver capítulos de tratamiento",
        imageAlt: "Una embarcación de servicio junto a una jaula circular de salmón en aguas calmas",
        imageCaption: "Operaciones de tratamiento acuícola",
        imageNote: "Precisión, planificación y apoyo en terreno en una misma operación",
        signals: [
          { title: "Prevención primero", body: "Protocolos y preparación antes de que aumente la presión de tratamiento.", details: "Establece protocolos de preparación que mantengan el bienestar de los peces mientras se anticipan distintos escenarios." },
          { title: "Ejecución precisa", body: "Aplicación calibrada para condiciones reales de cultivo.", details: "Cada dosis se calibra para las condiciones exactas de tu operación; sin suposiciones, solo precisión." },
          { title: "Apoyo en sitio", body: "Asistencia operativa cerca del momento del tratamiento.", details: "Nuestro equipo se mantiene cerca de la operación para entregar orientación en tiempo real cuando se necesita." },
        ],
      },
      news: {
        title: "Últimas noticias",
        viewAll: "Ver todas las noticias",
        readStory: "Leer historia completa",
        readArticle: "Leer artículo",
        featured: { category: "Alianzas e innovación", title: "Granja Monagold — Impulsando la tecnología acuícola", description: "La granja Monagold en Australia está impulsando prácticas acuícolas de nueva generación mediante pruebas de nuevas tecnologías de alimentación y monitoreo del agua de AQ1, además de colaborar con BioMar en un ensayo de alimento durante el cultivo actual. Esta alianza refleja nuestro compromiso con una producción sustentable y basada en datos." },
        items: [
          { category: "Buenas prácticas", title: "Chile publica manual de buenas prácticas para Paramove®", description: "Aqua Pharma Chile ha publicado un manual integral de buenas prácticas para el uso de Paramove® en tratamientos por inmersión para controlar Caligus rogercresseyi en salmonicultura." },
          { category: "Investigación y desarrollo", title: "Primer cultivo concluido con éxito", description: "El 31 de enero de 2024, nuestro centro de investigación logró su primera cosecha exitosa, alcanzando el objetivo DOC 90 con tasas de supervivencia superiores al 80% en algunos estanques." },
          { category: "Seguridad y operaciones", title: "Simulacro de emergencia completado", description: "El equipo de Aqua Pharma Chile realizó con éxito un simulacro integral de emergencia el 14 de noviembre de 2025, poniendo a prueba la coordinación con servicios de emergencia y autoridades locales." },
        ],
      },
      productSection: {
        kicker: "Capítulo 03 / Capítulos de tratamiento",
        title: "Tres capítulos de tratamiento",
        subtitle: "Un solo modelo operativo de bienestar.",
        description: "Cada capítulo responde a una realidad operacional distinta: terapias de bajo impacto, acondicionamiento del agua y soporte de dosificación diseñado para una ejecución más serena en terreno.",
        enterChapter: "Entrar al capítulo",
      },
      map: {
        sectionTitle: "Operamos en todo el mundo",
        coverageLabel: "Cobertura de mercado",
        operatingMarketsLabel: "Mercados operativos",
        companySummary: "Aqua Pharma opera en 9 países (Australia, Bélgica, Canadá, Chile, Ecuador, Indonesia, Noruega, Escocia y EE. UU.), con alrededor de 50 empleados en todo el mundo.",
        parentSummary: "Aqua Pharma Group cuenta con el respaldo estructural de dos empresas matrices innovadoras: Solvay (líder global en materiales y soluciones sostenibles) y Aquatiq (referente noruego en seguridad alimentaria).",
        marketsSuffix: "mercados",
        dragHint: "Arrastra para explorar · Pasa el cursor o haz clic en un mercado",
        resetSelection: "Restablecer selección",
        fallbackImageAlt: "Presencia global de Aqua Pharma",
        errors: { unsupportedBrowser: "El mapa interactivo no está disponible en este navegador. Activa la aceleración por hardware o prueba con Safari o Chrome.", dataUnavailable: "No se pudieron cargar los datos del mapa interactivo.", startupFailed: "El mapa interactivo no pudo iniciarse en este navegador.", loadFailed: "No se pudo cargar el mapa interactivo." },
        markets: marketData.es,
      },
    },
    productsUi: {
      introLabel: "01 / Contexto",
      editorialOverview: "Visión editorial",
      continueChapter: "Continuar el capítulo",
      fieldStoryLabel: "02 / Historia en terreno",
      whyItMatters: "Por qué importa",
      careLabel: "03 / Cuidado",
      backToHome: "Volver al inicio",
      downloadLibraryLabel: "Biblioteca de descargas",
      downloadLibraryTitle: "Material del producto proveniente del sitio original.",
      openResource: "Abrir recurso",
      downloadAsset: "Descargar recurso",
      viewAsset: "Ver recurso",
      continueSystem: "Continuar en el sistema",
      relatedPaths: "Rutas de producto relacionadas.",
    },
  },
  no: {
    languageSwitcher: { label: "Språk", options: [{ locale: "en", label: "EN" }, { locale: "es", label: "ES" }, { locale: "no", label: "NO" }] },
    nav: { brand: "Aqua Pharma", intro: "Aqua Pharma", description: "Forebygging og kontroll av sykdom i akvakultur.", contactLabel: "Kontakt oss", links: sharedNavigation.no },
    footer: { copyright: "Copyright © 2025 Aqua Pharma", privacy: "Personvernerklæring og cookie-policy", terms: "Vilkår og betingelser", transparency: "Åpenhetsloven", supplierCodeEn: "APG Supplier Code of Conduct (EN)", supplierCodeEs: "APG Supplier Code of Conduct (ES)", linkedin: "LinkedIn" },
    contact: {
      title: "Kontakt oss",
      description: "Vi svarer gjerne på spørsmål og introduserer deg for Aqua Pharma. Send oss en e-post, ring en av våre regionale ledere eller fyll ut skjemaet.",
      headquartersLabel: "Hovedkontor",
      directions: "Veibeskrivelse i Google Maps",
      form: { firstName: "Fornavn", lastName: "Etternavn", email: "E-postadresse", subject: "Emne", message: "Melding", consent: "Ja, jeg godtar at informasjonen min lagres og behandles.", submit: "Send melding" },
    },
    home: {
      hero: {
        kicker: "Kapittel 01 / Velferdssystemer til sjøs",
        titleLines: ["Velferd", "under vann."],
        description: "Aqua Pharma kombinerer behandlingssystemer i felt, vitenskapelig presisjon og velferdsførst-utførelse for å hjelpe akvakulturteam med mer kontroll og mindre stress på biomassen.",
        explore: "Utforsk løsninger",
        contact: "Kontakt oss",
        backdropAlt: "Luftfoto av akvakulturbehandling i skumringen",
        brandAlt: "Aqua Pharma",
      },
      whatWeDo: {
        kicker: "Kapittel 02 / Hva vi gjør",
        title: "Behandlingssystemer bygget for feltet.",
        description: "Aqua Pharma kombinerer planlegging, kalibrert dosering og støtte på stedet for akvakulturteam som trenger presis behandlingsgjennomføring med mindre stress for fisk og operatører.",
        cta: "Se behandlingskapitlene",
        imageAlt: "Et servicefartøy ved siden av en sirkulær laksemerd i stille blått vann",
        imageCaption: "Akvakulturbehandling i drift",
        imageNote: "Presisjon, planlegging og feltstøtte i én operativ ramme",
        signals: [
          { title: "Forebygging først", body: "Protokoller og beredskap før behandlingspresset øker.", details: "Etabler beredskapsprotokoller som ivaretar fiskevelferd samtidig som man forbereder seg på ulike scenarier." },
          { title: "Presis gjennomføring", body: "Kalibrert levering tilpasset levende driftsforhold.", details: "Hver dose kalibreres for de eksakte forholdene på lokaliteten din – ingen gjetting, bare presisjon." },
          { title: "Støtte på stedet", body: "Operativ hjelp tett på behandlingsøyeblikket.", details: "Teamet vårt holder seg tett på driften og kan gi veiledning i sanntid når det trengs." },
        ],
      },
      news: {
        title: "Siste nytt",
        viewAll: "Se alle nyheter",
        readStory: "Les hele saken",
        readArticle: "Les artikkel",
        featured: { category: "Partnerskap og innovasjon", title: "Monagold Farm — Fremmer akvakulturteknologi", description: "Monagold-gården i Australia tester neste generasjons akvakulturpraksis gjennom ny fôrings- og vannovervåkingsteknologi fra AQ1, samt et pågående fôringsforsøk med BioMar i dagens produksjon. Partnerskapet viser vårt engasjement for bærekraftig, datadrevet drift." },
        items: [
          { category: "Beste praksis", title: "Chile lanserer beste-praksis-manual for Paramove®", description: "Aqua Pharma Chile har lansert en omfattende manual for bruk av Paramove® i nedsenkingsbehandlinger mot Caligus rogercresseyi i lakseoppdrett." },
          { category: "Forskning og utvikling", title: "Første produksjonssyklus fullført med suksess", description: "31. januar 2024 nådde forskningsanlegget vårt sin første vellykkede høsting med DOC 90 og over 80 % overlevelse i enkelte dammer." },
          { category: "Sikkerhet og drift", title: "Beredskapsøvelse fullført", description: "Aqua Pharma Chile gjennomførte 14. november 2025 en omfattende beredskapsøvelse med koordinering mot nødetater og lokale myndigheter." },
        ],
      },
      productSection: {
        kicker: "Kapittel 03 / Behandlingskapitler",
        title: "Tre behandlingskapitler",
        subtitle: "Én velferdsmodell i drift.",
        description: "Hvert kapittel er formet rundt en ulik operativ virkelighet: skånsomme behandlinger, vannkondisjonering og doseringsstøtte utviklet for roligere gjennomføring i felt.",
        enterChapter: "Gå til kapittel",
      },
      map: {
        sectionTitle: "Vi opererer over hele verden",
        coverageLabel: "Markedsdekning",
        operatingMarketsLabel: "Operative markeder",
        companySummary: "Aqua Pharma opererer i 9 land (Australia, Belgia, Canada, Chile, Ecuador, Indonesia, Norge, Skottland og USA), med rundt 50 ansatte over hele verden.",
        parentSummary: "Aqua Pharma Group er strukturelt støttet av to innovative morselskaper, Solvay (en global leder innen bærekraftige materialer og løsninger) og Aquatiq (en norsk referanse innen mattrygghet).",
        marketsSuffix: "markeder",
        dragHint: "Dra for å utforske · Hold over eller klikk på et marked",
        resetSelection: "Nullstill valg",
        fallbackImageAlt: "Aqua Pharma sin globale tilstedeværelse",
        errors: { unsupportedBrowser: "Det interaktive kartet er ikke tilgjengelig i denne nettleseren. Aktiver maskinvareakselerasjon eller prøv Safari eller Chrome.", dataUnavailable: "Data for det interaktive kartet kunne ikke lastes.", startupFailed: "Det interaktive kartet kunne ikke starte i denne nettleseren.", loadFailed: "Det interaktive kartet kunne ikke lastes." },
        markets: marketData.no,
      },
    },
    productsUi: {
      introLabel: "01 / Kontekst",
      editorialOverview: "Redaksjonell oversikt",
      continueChapter: "Fortsett kapitlet",
      fieldStoryLabel: "02 / Feltfortelling",
      whyItMatters: "Hvorfor det betyr noe",
      careLabel: "03 / Omsorg",
      backToHome: "Tilbake til forsiden",
      downloadLibraryLabel: "Nedlastingsbibliotek",
      downloadLibraryTitle: "Produktmateriell fra det opprinnelige nettstedet.",
      openResource: "Åpne ressurs",
      downloadAsset: "Last ned ressurs",
      viewAsset: "Vis ressurs",
      continueSystem: "Fortsett i systemet",
      relatedPaths: "Relaterte produktspor.",
    },
  },
};

export function getSiteContent(locale: Locale = defaultLocale): SiteContent {
  return siteContentByLocale[locale] ?? siteContentByLocale[defaultLocale];
}