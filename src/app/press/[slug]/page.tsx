import { notFound } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import { Navbar } from "@/components/core/Navbar";
import { Footer } from "@/components/core/Footer";
import { releases } from "@/lib/press";

export default async function PressRelease({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const item = releases.find(release => release.slug === slug);
    if (!item) notFound();
    const requestHeaders = await headers();
    const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3002";
    const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
    const share = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${protocol}://${host}/press/${item.slug}`)}`;
    return <main><Navbar /><article className="mx-auto min-h-[70vh] max-w-[70rem] px-6 pb-24 pt-40 md:px-12"><Link href="/press" className="text-(--brand-blue) hover:underline">← Press releases</Link><p className="mt-10 text-sm text-(--brand-ink-muted)">{item.date}</p><h1 className="mt-4 font-heading text-5xl font-light text-(--brand-blue)">{item.title}</h1><p className="mt-8 max-w-3xl text-lg leading-8">{item.description}</p><div className="mt-8 flex flex-wrap gap-3">{item.href && <a href={item.href} className="brand-button" target="_blank" rel="noopener noreferrer">Read original release →</a>}<a href={share} className="brand-button-outline" target="_blank" rel="noopener noreferrer">Share on LinkedIn ↗</a></div></article><Footer /></main>;
}
