import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/core/Navbar";
import { Footer } from "@/components/core/Footer";
import { ContactSection } from "@/components/core/ContactSection";
import type { ArchitecturePage } from "@/data/architecture-pages";

export function ArchitectureLanding({ page }: { page: ArchitecturePage }) {
    return (
        <main className="bg-(--brand-paper) text-(--brand-dark)">
            <Navbar />
            <header className="relative flex min-h-[70svh] items-end overflow-hidden bg-(--brand-blue) px-6 pb-16 pt-36 text-white md:px-12 lg:px-20">
                <Image src={page.image} alt={page.imageAlt} fill priority sizes="100vw" className="object-cover opacity-65" />
                <div className="absolute inset-0 bg-black/35" />
                <div className="relative mx-auto w-full max-w-[100rem]">
                    <p className="text-[0.8rem] uppercase text-white/80">{page.eyebrow}</p>
                    <h1 className="mt-5 max-w-[15ch] font-heading text-[clamp(3rem,7vw,7rem)] font-light leading-[0.98]">{page.title}</h1>
                    <p className="mt-7 max-w-[44rem] text-[clamp(1rem,1.4vw,1.3rem)] font-light leading-relaxed text-white/90">{page.intro}</p>
                </div>
            </header>

            <nav aria-label="On this page" className="sticky top-20 z-30 overflow-x-auto border-b border-(--brand-blue)/15 bg-(--brand-paper)/95 px-6 backdrop-blur-sm md:top-32 md:px-12 lg:px-20">
                <div className="mx-auto flex w-max max-w-[100rem] gap-7 py-5 text-[0.82rem] text-(--brand-blue) lg:mx-0">
                    {page.sections.map((section) => <a key={section.id} href={`#${section.id}`} className="whitespace-nowrap hover:underline">{section.title}</a>)}
                </div>
            </nav>

            {page.sections.map((section, index) => (
                <section key={section.id} id={section.id} className={`scroll-mt-44 border-b border-(--brand-blue)/10 px-6 py-20 md:scroll-mt-52 md:px-12 lg:px-20 ${index % 2 ? "bg-white" : "bg-(--brand-paper)"}`}>
                    <div className="mx-auto grid max-w-[100rem] gap-8 lg:grid-cols-[minmax(16rem,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
                        <h2 className="max-w-[16ch] font-heading text-[clamp(2rem,3.2vw,3.5rem)] font-light leading-[1.08] text-(--brand-blue)">{section.title}</h2>
                        <div className="max-w-[48rem]">
                            <p className="text-[1.08rem] font-light leading-[1.8] text-(--brand-dark)/75">{section.body}</p>
                            {section.points?.length ? <ul className="mt-7 space-y-3 border-t border-(--brand-blue)/15 pt-6 text-[0.98rem] leading-relaxed text-(--brand-dark)/75">{section.points.map((point) => <li key={point} className="flex gap-3"><span aria-hidden="true" className="text-(--brand-glaucous)">→</span>{point}</li>)}</ul> : null}
                            {section.link ? <Link href={section.link.href} className="brand-button mt-8">{section.link.label}<ArrowRight aria-hidden="true" size={16} /></Link> : null}
                        </div>
                    </div>
                </section>
            ))}

            <ContactSection />
            <Footer />
        </main>
    );
}
