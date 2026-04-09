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
  alt: string;
  description: string;
  cta: string;
  eyebrow: string;
  heroSummary: string;
  overviewTitle: string;
  overviewBody: string;
  processTitle: string;
  processBody: string;
  chapters: Array<{
    id: string;
    eyebrow: string;
    title: string;
    body: string;
    kicker: string;
  }>;
  principles: string[];
  stats: Array<{
    value: string;
    label: string;
  }>;
};

export const products: ProductRecord[] = [
  {
    id: "s-bath",
    slug: "bath-treatments",
    title: "Bath Treatments",
    href: "/products/bath-treatments",
    image: "/bath.jpg",
    alt: "Bath Treatments",
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
    stats: [
      { value: "0.08%", label: "starting treatment concentration" },
      { value: "0.001%", label: "approx. post-treatment dilution" },
      { value: "9", label: "countries of operation" },
    ],
  },
  {
    id: "s-conditioning",
    slug: "water-conditioning-oxygenation",
    title: "Water Conditioning & Oxygenation",
    href: "/products/water-conditioning-oxygenation",
    image: "/shrimp.jpg",
    alt: "Water Conditioning & Oxygenation",
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
    image: "/dosing.jpg",
    alt: "Dosing units and services",
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
    stats: [
      { value: "30+", label: "systems installed globally" },
      { value: "In-house", label: "technical design process" },
      { value: "Bespoke", label: "engineering support available" },
    ],
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}