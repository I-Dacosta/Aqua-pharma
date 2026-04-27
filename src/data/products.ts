import { defaultLocale, type Locale } from "@/i18n/config";

export type ProductSlug =
  | "bath-treatments"
  | "water-conditioning-oxygenation"
  | "dosing-units-services";

export type ProductRecord = {
  id: string;
  slug: ProductSlug;
  title: string;
  href: `/products/${ProductSlug}`;
  image: string;
  detailImage?: string;
  chapterImages: Array<{
    src: string;
    alt: string;
  }>;
  downloads?: Array<{
    eyebrow: string;
    title: string;
    description: string;
    href: string;
    asset: string;
    download?: boolean;
    external?: boolean;
  }>;
  alt: string;
  description: string;
  cta: string;
  eyebrow: string;
  heroSummary: string;
  overviewTitle: string;
  overviewBody: string;
  processTitle: string;
  processBody: string;
  careTitle: string;
  careSubtitle: string;
  homeContext: string;
  homeStatement: string;
  chapters: Array<{
    id: string;
    eyebrow: string;
    title: string;
    body: string;
    kicker: string;
  }>;
  principles: string[];
  principleImages: Array<{
    src: string;
    alt: string;
  }>;
  stats: Array<{
    value: string;
    label: string;
  }>;
};

const enProducts: ProductRecord[] = [
  {
    id: "s-bath",
    slug: "bath-treatments",
    title: "Bath Treatments",
    href: "/products/bath-treatments",
    image: "/images/wp/products/bath-hero.jpg",
    detailImage: "/images/wp/products/bath-detail.jpg",
    chapterImages: [
      {
        src: "/images/wp/products/bath-chapter-veterinary.jpg",
        alt: "Donor chapter visual showing the H2O2 bath treatment concept for veterinary medicine",
      },
      {
        src: "/images/wp/products/bath-chapter-research.jpg",
        alt: "Donor chapter visual showing responsible fish farming and fish welfare handling",
      },
      {
        src: "/images/wp/products/bath-chapter-tarpaulin.jpg",
        alt: "Donor chapter visual showing the tarpaulin treatment concept in operation",
      },
    ],
    alt: "Tarpaulin bath treatment setup at a salmon farm",
    description:
      "Low-impact therapeutic bath treatments based on hydrogen peroxide to control sea lice and other diseases while ensuring fish welfare.",
    cta: "Treatments",
    eyebrow: "Low-impact treatment systems",
    heroSummary:
      "Aqua Pharma offers a bath treatment for effective management of marine ectoparasites in salmon farms. The primary benefit of our concept is the rapid removal of parasites, including eggs of gravid females, without leaving any residue in the fish. This treatment is registered as a veterinary medicine, with full recording and monitoring of its use.",
    overviewTitle: "Rapidly remove parasites with minimal residue left behind.",
    overviewBody:
      "Our bath concept is suitable for both in-pen tarpaulin treatments, ensuring minimal fish handling, as well as for well boats. Aqua Pharma utilises H₂O₂ produced to veterinary medicinal standards, ensuring quality and safety. H₂O₂ naturally occurs in the environment and breaks down into water and oxygen, contributing to eco-friendly water treatment.",
    processTitle: "Veterinary medicine, designed for responsible fish farming.",
    processBody:
      "Compared to other uses, the concentrations of H₂O₂ applied in aquaculture are very low. Dental applications can use up to 6%, wound disinfection 3%, while salmon treatment starts at 0.08% or 0.02% depending on the type of parasite and is further diluted post-treatment to approximately 0.001%.",
    careTitle: "Low-impact bath care",
    careSubtitle:
      "Therapeutic bath treatments designed for responsible parasite control, fish welfare, and documented field use.",
    homeContext: "Salmon farms / Bath treatments",
    homeStatement:
      "Treatment systems built for fish welfare in the exact moment parasite pressure rises.",
    chapters: [
      {
        id: "bath-01",
        eyebrow: "Chapter 01",
        title: "H₂O₂ based parasite treatments, produced to veterinary medicinal standards.",
        body:
          "For salmon, Aqua Pharma utilises H₂O₂ produced to veterinary medicinal standards, ensuring quality and safety. Because H₂O₂ naturally breaks down into water and oxygen, it supports an eco-friendly treatment concept while maintaining documented veterinary control of use.",
        kicker: "Low concentrations, quality-assured treatment, minimal residue.",
      },
      {
        id: "bath-02",
        eyebrow: "Chapter 02",
        title: "Continuous research and development for emerging health challenges.",
        body:
          "Aqua Pharma, jointly owned by Solvay and Aquatiq since 2019, has an integrated supply chain that ensures full traceability from production to point of use. The treatment concept is registered for managing sea lice, but is also effective against amoebic gill disease and other health issues, while new solutions are being developed for winter wounds and increasing gill disease pressure.",
        kicker: "Traceable supply, registered use, ongoing refinement.",
      },
      {
        id: "bath-03",
        eyebrow: "Chapter 03",
        title: "Tarpaulin treatment concept, minimizing handling of fish.",
        body:
          "In addition to well boats, H₂O₂ can be used as a tarpaulin treatment within the pen, making it one of the gentlest solutions available. Fish remain in their natural environment, reducing handling and stress, the tarpaulin confines the treatment and limits environmental exposure, and the method is quick to deploy and adaptable to varying parasite loads, water conditions, and farm requirements.",
        kicker: "Reduced stress, confined treatment, flexible application.",
      },
    ],
    principles: [
      "Suitable for both in-pen tarpaulin treatments and well boats",
      "Registered as a veterinary medicine with full recording and monitoring",
      "Recognized by ASC support and the Solar Impulse Efficient Solutions Label",
    ],
    principleImages: [
      {
        src: "/images/generated/product-care/bath-care-01.png",
        alt: "Tarpaulin bath treatment setup with a service vessel beside a salmon pen",
      },
      {
        src: "/images/generated/product-care/bath-care-02.png",
        alt: "Field monitoring setup with water sample, tablet, and treatment records",
      },
      {
        src: "/images/generated/product-care/bath-care-03.png",
        alt: "Clean salmon sea pen in a fjord environment representing responsible treatment",
      },
    ],
    stats: [
      { value: "0.08%", label: "starting treatment concentration" },
      { value: "0.001%", label: "approx. post-treatment dilution" },
      { value: "9", label: "countries of operation" },
    ],
    downloads: [
      {
        eyebrow: "Norway Brochure",
        title: "Bath Treatments in Partnership with AQS",
        description:
          "Product brochure for the Norway bath treatment offer and operating concept.",
        href: "/downloads/wp/bath/norway-bath-treatments-brochure.pdf",
        asset: "/images/wp/collateral/bath-norway.jpg",
        download: true,
      },
      {
        eyebrow: "Chile Brochure",
        title: "Chile Bath Treatments Brochure",
        description:
          "Regional bath treatment product information for the Chilean aquaculture market.",
        href: "/downloads/wp/bath/chile-bath-treatments-brochure.pdf",
        asset: "/images/wp/collateral/bath-chile.jpg",
        download: true,
      },
      {
        eyebrow: "Salmon Flyer",
        title: "Aqua Pharma Salmon Flyer",
        description:
          "A compact overview of the salmon treatment concept and support offer.",
        href: "/downloads/wp/bath/salmon-flyer.pdf",
        asset: "/images/wp/collateral/bath-flyer.jpg",
        download: true,
      },
      {
        eyebrow: "Field Resource",
        title: "Manual de Buenas Prácticas",
        description:
          "Best-practice field manual packaged from the original Aqua Pharma collateral library.",
        href: "/downloads/wp/bath/manual-de-buenas-practicas.pdf",
        asset: "/images/wp/collateral/bath-video-poster.jpg",
        download: true,
      },
      {
        eyebrow: "QR Resource",
        title: "Bath Treatments QR Sheet",
        description:
          "Quick-access QR graphic from the original technical information set.",
        href: "/images/wp/collateral/bath-qr.png",
        asset: "/images/wp/collateral/bath-qr.png",
        download: true,
      },
    ],
  },
  {
    id: "s-conditioning",
    slug: "water-conditioning-oxygenation",
    title: "Water Conditioning & Oxygenation",
    href: "/products/water-conditioning-oxygenation",
    image: "/images/wp/products/water-hero.jpg",
    detailImage: "/images/wp/products/water-detail.jpg",
    chapterImages: [
      {
        src: "/images/wp/products/water-chapter-preparation.jpg",
        alt: "Donor chapter visual showing pond and water preparation work at a shrimp farm",
      },
      {
        src: "/images/wp/products/water-chapter-oxygenation.jpg",
        alt: "Donor chapter visual showing harvest results tied to preventative oxygenation outcomes",
      },
      {
        src: "/images/wp/products/water-chapter-seatru.jpg",
        alt: "Donor chapter visual showing SEATRU research activity in the field",
      },
    ],
    alt: "Shrimp pond water conditioning operations",
    description:
      "Eco-friendly water conditioning and oxygenation solutions designed to maintain optimal water quality and healthy shrimp.",
    cta: "Technology",
    eyebrow: "Water quality as a health system",
    heroSummary:
      "Disease outbreaks can spread rapidly, often within five days, leading to high mortality rates or complete loss of a farm’s stock. We are adapting our proven concepts from salmon farming to support shrimp farmers in tackling disease management and improving yields.",
    overviewTitle: "Powerful partnerships and advanced technology in pond disease management.",
    overviewBody:
      "With years of experience in Norway, Scotland, Canada, and Chile, Aqua Pharma is committed to providing tailored products, equipment, and services for optimising shrimp health. We offer eco-friendly solutions based on hydrogen peroxide for pond preparation and water treatment.",
    processTitle: "Prevent and control disease through pond and water preparation.",
    processBody:
      "For shrimp, Aqua Pharma utilises H₂O₂ produced to Food Grade standards, ensuring quality and safety. Because it breaks down into water and oxygen, it contributes to eco-friendly water treatment. Precise and timely application is key to maintaining water quality and sustaining shrimp health, and our protocols are based on research from shrimp farms in Ecuador, Indonesia and Australia.",
    careTitle: "Water quality care",
    careSubtitle:
      "Conditioning and oxygenation systems designed to maintain stable pond conditions and healthier shrimp.",
    homeContext: "Shrimp ponds / Water conditioning",
    homeStatement:
      "Protocols, pond preparation, and oxygen support shaped around fragile aquatic ecosystems.",
    chapters: [
      {
        id: "conditioning-01",
        eyebrow: "Chapter 01",
        title: "Pond and water preparation built to prevent and control disease.",
        body:
          "We offer eco-friendly solutions for pond preparation and water treatment, and precise, timely application is central to maintaining water quality and sustaining shrimp health. Building on our salmon farming experience, we are also developing dosing units to simplify the process for farm operations and to make it safer and easier to use correctly.",
        kicker: "Food grade H₂O₂, clear protocols, safer use on farm.",
      },
      {
        id: "conditioning-02",
        eyebrow: "Chapter 02",
        title: "Preventative oxygenation for shrimp health and growth.",
        body:
          "Oxygen is crucial for shrimp health and growth, yet farms often struggle with low dissolved oxygen levels throughout the production cycle. H₂O₂ is commonly used as an emergency measure, but our research suggests that a preventative approach gives better and more stable oxygen results, and Aqua Pharma is developing a safe, cost-effective method for preventative oxygenation of ponds.",
        kicker: "Moving from emergency response to stable oxygen support.",
      },
      {
        id: "conditioning-03",
        eyebrow: "Chapter 03",
        title: "SEATRU™ research project, a new concept to improve production outcomes.",
        body:
          "Every pond is unique, and timely, detailed insights into the complex ecosystem are essential for defining better farm management strategies. Aqua Pharma has invested in shrimp farms in Indonesia and Australia to accelerate the R&D needed to support farmers in improving shrimp harvest outcomes. By connecting findings across sanitisers, oxygen aids, and bioremediation solutions, SEATRU™ aims to bring a new concept to enhance farm yields.",
        kicker: "R&D in live farms, tailored support for better harvests.",
      },
    ],
    principles: [
      "Tailored products, equipment, and services for optimising shrimp health",
      "Research-backed protocols from Ecuador, Indonesia, and Australia",
      "Preventative oxygenation systems under active development",
    ],
    principleImages: [
      {
        src: "/images/generated/product-care/water-care-01.png",
        alt: "Shrimp pond water conditioning equipment being adjusted beside clean pond water",
      },
      {
        src: "/images/generated/product-care/water-care-02.png",
        alt: "Research samples and protocol materials beside shrimp ponds",
      },
      {
        src: "/images/generated/product-care/water-care-03.png",
        alt: "Prototype oxygenation system creating controlled ripples in a shrimp pond",
      },
    ],
    stats: [
      { value: "5", label: "days for outbreaks to spread rapidly" },
      { value: "Food", label: "grade H₂O₂ standard" },
      { value: "SEATRU™", label: "research-led farm concept" },
    ],
  },
  {
    id: "s-dosing",
    slug: "dosing-units-services",
    title: "Dosing Units & Services",
    href: "/products/dosing-units-services",
    image: "/images/wp/products/dosing-hero.jpg",
    detailImage: "/images/wp/products/dosing-detail.jpg",
    chapterImages: [
      {
        src: "/images/wp/products/dosing-chapter-design-photo.jpg",
        alt: "Donor chapter visual showing Aqua Pharma dosing system design on a live vessel",
      },
      {
        src: "/images/wp/products/dosing-chapter-servicing.jpg",
        alt: "Donor chapter visual showing servicing work on Aqua Pharma dosing equipment",
      },
      {
        src: "/images/wp/products/dosing-chapter-technical.jpg",
        alt: "Donor chapter visual showing a top dosing installation for technical deployment",
      },
    ],
    alt: "Aqua Pharma dosing equipment in operation",
    description:
      "Precision dosing equipment and services that ensure safe, effective application of treatments across farms and vessels.",
    cta: "Services",
    eyebrow: "Precision equipment for treatment delivery",
    heroSummary:
      "Choosing the right dosing equipment is key to the health and safety of the team at the farms, and to the success of your treatment. We can help identify and deliver the ideal solution for your business. If it doesn’t exist already, we will make it for you.",
    overviewTitle: "Tailor-made dosing solutions for your specific needs.",
    overviewBody:
      "Aqua Pharma designs and delivers dosing equipment for a wide range of applications, from bath therapeutics for tarpaulins and well boats, to pond treatments and trial set-ups. We help fish and shrimp farmers and their prescribing fish health veterinarians identify the most user-friendly and safest solution.",
    processTitle: "Design and servicing built in-house and delivered for live operations.",
    processBody:
      "The design process is managed in-house by Aqua Pharma Technical. Final designs are manufactured by Aquatiq Hygiene Systems in Lillehammer, Norway and in Oban, Scotland. We also provide regular inspections, treatment-related technical services and bespoke engineering for maritime installations.",
    careTitle: "Precision dosing care",
    careSubtitle:
      "Equipment, inspections, and engineering support for safer treatment delivery across farms and vessels.",
    homeContext: "Live operations / Dosing systems",
    homeStatement:
      "Engineering that turns a prescribed treatment into something safer, calmer, and repeatable in the field.",
    chapters: [
      {
        id: "dosing-01",
        eyebrow: "Chapter 01",
        title: "Design for bath therapeutics, pond treatments, and trial set-ups.",
        body:
          "Aqua Pharma designs and delivers dosing equipment for a wide range of applications, from tarpaulins and well boats to pond treatments. The goal is to help fish and shrimp farmers and their prescribing veterinarians identify the most user-friendly and safest solution for the job.",
        kicker: "Wide application range, safer operation, in-house design.",
      },
      {
        id: "dosing-02",
        eyebrow: "Chapter 02",
        title: "Installed globally and evolving for emerging aquaculture markets.",
        body:
          "Currently, Aqua Pharma has over 30 dosing systems installed and in use for parasite treatments in salmon farms around the world. The team is also developing a new generation of dosing units for emerging aquaculture markets like shrimp farming in Asia.",
        kicker: "30+ systems in use, next-generation development underway.",
      },
      {
        id: "dosing-03",
        eyebrow: "Chapter 03",
        title: "Servicing and bespoke engineering keep the treatment system reliable.",
        body:
          "Choosing the right dosing system makes a great difference on all levels. Aqua Pharma provides regular inspections, treatment-related technical services, and bespoke engineering for maritime installations, making sure the equipment remains practical and dependable in live operations.",
        kicker: "Technical services and bespoke engineering in the field.",
      },
    ],
    principles: [
      "In-house design managed by Aqua Pharma Technical",
      "Manufactured by Aquatiq Hygiene Systems in Norway and Scotland",
      "Regular inspections and bespoke engineering for maritime installations",
    ],
    principleImages: [
      {
        src: "/images/generated/product-care/dosing-care-01.png",
        alt: "Engineering workspace with dosing unit prototype and technical design tools",
      },
      {
        src: "/images/generated/product-care/dosing-care-02.png",
        alt: "Technician assembling stainless dosing equipment in a clean manufacturing space",
      },
      {
        src: "/images/generated/product-care/dosing-care-03.png",
        alt: "Technician inspecting a dosing system on an aquaculture service vessel",
      },
    ],
    stats: [
      { value: "30+", label: "systems installed globally" },
      { value: "In-house", label: "technical design process" },
      { value: "Bespoke", label: "engineering support available" },
    ],
    downloads: [
      {
        eyebrow: "Technical Flyer",
        title: "Dosing Units & Services Flyer",
        description:
          "Downloadable brochure for Aqua Pharma dosing equipment and service support.",
        href: "/downloads/wp/dosing/dosing-flyer.pdf",
        asset: "/images/wp/collateral/dosing-flyer.jpg",
        download: true,
      },
      {
        eyebrow: "Animated Video",
        title: "Tarpaulin Dosing Concept Film",
        description:
          "Watch the original animated explanation of the dosing concept used in salmon farms.",
        href: "https://www.youtube.com/watch?v=6ElJ6rTlLrs&ab_channel=Aquatiq",
        asset: "/images/wp/collateral/dosing-video-poster.jpg",
        external: true,
      },
    ],
  },
];

const productContentByLocale: Record<Locale, ProductRecord[]> = {
  en: enProducts,
  es: [
    {
      ...enProducts[0],
      title: "Tratamientos de baño",
      alt: "Montaje de baño con lona en un centro de cultivo de salmón",
      description:
        "Tratamientos terapéuticos de bajo impacto basados en peróxido de hidrógeno para controlar el piojo de mar y otras enfermedades, resguardando el bienestar de los peces.",
      eyebrow: "Sistemas de tratamiento de bajo impacto",
      heroSummary:
        "Aqua Pharma ofrece un tratamiento de baño para el manejo efectivo de ectoparásitos marinos en salmonicultura. El beneficio principal de nuestro concepto es la rápida eliminación de parásitos, incluidos los huevos de hembras grávidas, sin dejar residuos en el pez. Este tratamiento está registrado como medicamento veterinario, con registro y monitoreo completos de su uso.",
      overviewTitle: "Eliminación rápida de parásitos con residuos mínimos.",
      overviewBody:
        "Nuestro concepto de baño es apto tanto para tratamientos con lona dentro de la jaula, minimizando la manipulación del pez, como para wellboats. Aqua Pharma utiliza H₂O₂ producido bajo estándares de medicamento veterinario, garantizando calidad y seguridad. El H₂O₂ se encuentra naturalmente en el medioambiente y se descompone en agua y oxígeno, aportando a un tratamiento más amigable con el entorno.",
      processTitle: "Medicina veterinaria diseñada para una piscicultura responsable.",
      processBody:
        "En comparación con otros usos, las concentraciones de H₂O₂ aplicadas en acuicultura son muy bajas. En odontología puede llegar al 6 %, en desinfección de heridas al 3 %, mientras que en el tratamiento del salmón se parte en 0,08 % o 0,02 % según el tipo de parásito y luego se diluye tras el tratamiento hasta aproximadamente 0,001 %.",
      careTitle: "Cuidado de baño de bajo impacto",
      careSubtitle:
        "Tratamientos terapéuticos diseñados para un control responsable de parásitos, bienestar animal y uso de campo documentado.",
      homeContext: "Centros salmoneros / Tratamientos de baño",
      homeStatement:
        "Sistemas de tratamiento pensados para el bienestar del pez justo cuando aumenta la presión parasitaria.",
    },
    {
      ...enProducts[1],
      title: "Acondicionamiento y oxigenación del agua",
      alt: "Operaciones de acondicionamiento de agua en estanques camaroneros",
      description:
        "Soluciones ecológicas de acondicionamiento y oxigenación del agua diseñadas para mantener una calidad óptima y camarones saludables.",
      eyebrow: "La calidad del agua como sistema de salud",
      heroSummary:
        "Los brotes de enfermedad pueden propagarse rápidamente, a menudo en cinco días, causando alta mortalidad o pérdida total del stock. Estamos adaptando nuestros conceptos probados en salmonicultura para apoyar a los productores de camarón en el manejo sanitario y la mejora de resultados.",
      overviewTitle:
        "Alianzas sólidas y tecnología avanzada para el manejo sanitario de estanques.",
      overviewBody:
        "Con años de experiencia en Noruega, Escocia, Canadá y Chile, Aqua Pharma está comprometida con entregar productos, equipos y servicios adaptados para optimizar la salud del camarón. Ofrecemos soluciones ecológicas basadas en peróxido de hidrógeno para la preparación del estanque y el tratamiento del agua.",
      processTitle:
        "Prevención y control de enfermedades mediante preparación del estanque y del agua.",
      processBody:
        "Para camarón, Aqua Pharma utiliza H₂O₂ producido bajo estándar Food Grade, garantizando calidad y seguridad. Al descomponerse en agua y oxígeno, contribuye a un tratamiento amigable con el entorno. La aplicación precisa y oportuna es clave para mantener la calidad del agua y sostener la salud del camarón, y nuestros protocolos se basan en investigaciones en Ecuador, Indonesia y Australia.",
      careTitle: "Cuidado de la calidad del agua",
      careSubtitle:
        "Sistemas de acondicionamiento y oxigenación diseñados para mantener estanques estables y camarones más sanos.",
      homeContext: "Estanques camaroneros / Acondicionamiento del agua",
      homeStatement:
        "Protocolos, preparación del estanque y soporte de oxígeno pensados para ecosistemas acuáticos frágiles.",
    },
    {
      ...enProducts[2],
      title: "Unidades de dosificación y servicios",
      alt: "Equipos de dosificación Aqua Pharma en operación",
      description:
        "Equipos y servicios de dosificación de precisión que aseguran una aplicación segura y efectiva de tratamientos en centros y embarcaciones.",
      eyebrow: "Precisión para la entrega del tratamiento",
      heroSummary:
        "Elegir el equipo de dosificación correcto es clave para la salud y seguridad del equipo en los centros y para el éxito del tratamiento. Podemos ayudar a identificar y entregar la solución ideal para tu operación. Si aún no existe, la crearemos contigo.",
      overviewTitle: "Soluciones de dosificación hechas a la medida.",
      overviewBody:
        "Aqua Pharma diseña y entrega equipos de dosificación para una amplia gama de aplicaciones, desde terapias de baño para lonas y wellboats hasta tratamientos de estanques y pruebas piloto. Ayudamos a productores de peces y camarones, junto a sus veterinarios prescriptores, a identificar la solución más segura y fácil de usar.",
      processTitle:
        "Diseño y servicio desarrollados internamente para operaciones reales.",
      processBody:
        "El proceso de diseño es gestionado internamente por Aqua Pharma Technical. Los diseños finales son fabricados por Aquatiq Hygiene Systems en Lillehammer, Noruega, y en Oban, Escocia. También ofrecemos inspecciones regulares, servicios técnicos asociados al tratamiento e ingeniería a medida para instalaciones marítimas.",
      careTitle: "Cuidado de dosificación de precisión",
      careSubtitle:
        "Equipos, inspecciones y soporte de ingeniería para una entrega de tratamiento más segura en centros y embarcaciones.",
      homeContext: "Operaciones vivas / Sistemas de dosificación",
      homeStatement:
        "Ingeniería que convierte una prescripción en una ejecución más segura, serena y repetible en terreno.",
    },
  ],
  no: [
    {
      ...enProducts[0],
      title: "Badbehandlinger",
      alt: "Presenningbehandling ved et lakseanlegg",
      description:
        "Skånsomme terapeutiske badbehandlinger basert på hydrogenperoksid for å kontrollere lakselus og andre sykdommer samtidig som fiskevelferden ivaretas.",
      eyebrow: "Skånsomme behandlingssystemer",
      heroSummary:
        "Aqua Pharma tilbyr en badbehandling for effektiv håndtering av marine ektoparasitter i lakseoppdrett. Den viktigste fordelen med konseptet er rask fjerning av parasitter, inkludert egg fra gravide hunner, uten å etterlate rester i fisken. Behandlingen er registrert som veterinærmedisin, med full registrering og overvåking av bruk.",
      overviewTitle: "Fjern parasitter raskt med minimalt restnivå.",
      overviewBody:
        "Vårt badkonsept egner seg både til presenningsbehandling i merd, som gir minimal håndtering av fisk, og til brønnbåt. Aqua Pharma bruker H₂O₂ produsert etter veterinærmedisinsk standard, noe som sikrer kvalitet og sikkerhet. H₂O₂ forekommer naturlig i miljøet og brytes ned til vann og oksygen, noe som bidrar til miljøvennlig behandling.",
      processTitle: "Veterinærmedisin utviklet for ansvarlig fiskeoppdrett.",
      processBody:
        "Sammenlignet med andre bruksområder er konsentrasjonene av H₂O₂ i akvakultur svært lave. Tannbehandling kan bruke opptil 6 %, sårdesinfeksjon 3 %, mens behandling av laks starter på 0,08 % eller 0,02 % avhengig av parasitttype og fortynnes etter behandling ned til omtrent 0,001 %.",
      careTitle: "Skånsom badbehandling",
      careSubtitle:
        "Terapeutiske badbehandlinger utviklet for ansvarlig parasittkontroll, fiskevelferd og dokumentert feltbruk.",
      homeContext: "Lakseoppdrett / Badbehandlinger",
      homeStatement:
        "Behandlingssystemer bygget for fiskevelferd akkurat når parasitttrykket øker.",
    },
    {
      ...enProducts[1],
      title: "Vannkondisjonering og oksygenering",
      alt: "Vannkondisjonering i rekedammer",
      description:
        "Miljøvennlige løsninger for vannkondisjonering og oksygenering som bidrar til optimal vannkvalitet og sunnere reker.",
      eyebrow: "Vannkvalitet som helsesystem",
      heroSummary:
        "Sykdomsutbrudd kan spre seg raskt, ofte innen fem dager, og føre til høy dødelighet eller total tap av biomasse. Vi tilpasser våre dokumenterte konsepter fra lakseoppdrett for å støtte rekebønder i sykdomshåndtering og bedre resultater.",
      overviewTitle:
        "Sterke partnerskap og avansert teknologi i sykdomshåndtering i dammer.",
      overviewBody:
        "Med erfaring fra Norge, Skottland, Canada og Chile er Aqua Pharma forpliktet til å levere skreddersydde produkter, utstyr og tjenester for å optimalisere rekehelse. Vi tilbyr miljøvennlige løsninger basert på hydrogenperoksid for forberedelse av dammer og behandling av vann.",
      processTitle:
        "Forebygg og kontroller sykdom gjennom forberedelse av dam og vann.",
      processBody:
        "For reker benytter Aqua Pharma H₂O₂ produsert etter Food Grade-standard, som sikrer kvalitet og sikkerhet. Når stoffet brytes ned til vann og oksygen, bidrar det til miljøvennlig vannbehandling. Presis og rettidig bruk er avgjørende for å opprettholde vannkvalitet og støtte rekehelse, og våre protokoller bygger på forskning fra Ecuador, Indonesia og Australia.",
      careTitle: "Omsorg for vannkvalitet",
      careSubtitle:
        "Kondisjonerings- og oksygeneringssystemer utviklet for stabile damforhold og sunnere reker.",
      homeContext: "Rekedammer / Vannkondisjonering",
      homeStatement:
        "Protokoller, damforberedelse og oksygenstøtte formet rundt sårbare akvatiske økosystemer.",
    },
    {
      ...enProducts[2],
      title: "Doseringsenheter og tjenester",
      alt: "Aqua Pharma-doseringsutstyr i drift",
      description:
        "Presist doseringsutstyr og tjenester som sikrer trygg og effektiv bruk av behandlinger på anlegg og fartøy.",
      eyebrow: "Presisjonsutstyr for behandlingsoverføring",
      heroSummary:
        "Å velge riktig doseringsutstyr er avgjørende for helse og sikkerhet for teamene på anleggene og for behandlingsresultatet. Vi kan hjelpe med å finne og levere den ideelle løsningen for virksomheten din. Hvis den ikke finnes allerede, lager vi den.",
      overviewTitle: "Skreddersydde doseringsløsninger for dine behov.",
      overviewBody:
        "Aqua Pharma designer og leverer doseringsutstyr for et bredt spekter av bruksområder, fra badbehandlinger i presenning og brønnbåt til dambehandlinger og forsøksoppsett. Vi hjelper fisk- og rekebønder og deres fiskehelseveterinærer med å finne den mest brukervennlige og sikreste løsningen.",
      processTitle:
        "Design og service utviklet internt for levende operasjoner.",
      processBody:
        "Designprosessen styres internt av Aqua Pharma Technical. Endelige design produseres av Aquatiq Hygiene Systems i Lillehammer og i Oban, Skottland. Vi tilbyr også regelmessige inspeksjoner, behandlingsrelaterte tekniske tjenester og spesialtilpasset engineering for maritime installasjoner.",
      careTitle: "Omsorg for presis dosering",
      careSubtitle:
        "Utstyr, inspeksjoner og engineeringstøtte for tryggere levering av behandling på anlegg og fartøy.",
      homeContext: "Levende operasjoner / Doseringssystemer",
      homeStatement:
        "Engineering som gjør en forskrevet behandling tryggere, roligere og mer repeterbar i felt.",
    },
  ],
};

export const products = productContentByLocale[defaultLocale];

export function getProducts(locale: Locale = defaultLocale) {
  return productContentByLocale[locale] ?? productContentByLocale[defaultLocale];
}

export function getProductBySlug(slug: string, locale: Locale = defaultLocale) {
  return getProducts(locale).find((product) => product.slug === slug);
}
