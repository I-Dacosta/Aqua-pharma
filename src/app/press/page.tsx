import Link from "next/link";
import { Navbar } from "@/components/core/Navbar";
import { Footer } from "@/components/core/Footer";
import { releases } from "@/lib/press";

export const metadata = { title: "Press | Aqua Pharma" };
export default function PressPage() {
    return <main><Navbar /><section className="mx-auto min-h-[70vh] max-w-[100rem] px-6 pb-24 pt-40 md:px-12 lg:px-20"><h1 className="font-heading text-5xl font-light text-(--brand-blue)">Press releases</h1><div className="mt-12">{releases.map(item => <article key={item.slug} className="border-t border-(--brand-blue)/20 py-8"><p className="text-sm text-(--brand-ink-muted)">{item.date}</p><h2 className="mt-3 text-2xl text-(--brand-blue)"><Link href={`/press/${item.slug}`} className="hover:underline">{item.title}</Link></h2><p className="mt-4 max-w-3xl leading-7">{item.description}</p><Link className="brand-button mt-5" href={`/press/${item.slug}`}>Read release →</Link></article>)}</div></section><Footer /></main>;
}
