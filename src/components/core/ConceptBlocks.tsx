import Link from "next/link";

export type Offer = { title: string; fields: { label: string; value: string }[] };

export function OfferCard({ offer }: { offer: Offer }) {
    return <article className="border-t-2 border-(--brand-cyan) pt-5"><h3 className="text-2xl text-(--brand-blue)">{offer.title}</h3><dl className="mt-5 space-y-4">{offer.fields.map(field => <div key={field.label}><dt className="text-sm font-semibold text-(--brand-blue)">{field.label}</dt><dd className="mt-1 leading-7 text-(--brand-dark)/80">{field.value}</dd></div>)}</dl></article>;
}

export function SustainabilityNote() {
    return <aside className="mt-8 border-l-2 border-(--brand-cyan) pl-5"><h3 className="font-semibold text-(--brand-blue)">Sustainability</h3><p className="mt-2 leading-7 text-(--brand-dark)/80">H₂O₂ breaks down into water and oxygen after use. CO₂-neutral products are available on request.</p></aside>;
}

export function HseBlock({ sector }: { sector: "fish" | "shrimp" | "systems" }) {
    const description = sector === "systems" ? "Request the latest SEATRU™ and Paramove® safety guides from our HSE team." : `Request ${sector}-sector Safety Data Sheets for your market from our HSE team.`;
    return <div className="mt-6"><p className="leading-7 text-(--brand-dark)/80">{description}</p><a className="brand-button mt-6" href="mailto:fernando.suardi@aqua-pharma.com?subject=HSE%20and%20product%20stewardship%20enquiry">Contact our Global HSE manager →</a><p className="mt-4 text-sm text-(--brand-ink-muted)">Ask the HSE team about available document languages.</p></div>;
}

export function DosingSummary() {
    return <div className="mt-7"><ul className="grid gap-3 sm:grid-cols-3">{["S · Medium capacity", "N · High capacity", "W · Wellboat"].map(unit => <li key={unit} className="border-t border-(--brand-blue)/20 pt-3 text-(--brand-blue)">{unit}</li>)}</ul><Link href="/systems-services#dosing-systems" className="brand-button mt-6">Read more — Systems & Services →</Link></div>;
}
