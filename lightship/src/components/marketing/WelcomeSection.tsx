"use client";

import Image from "next/image";
import Link from "next/link";

export function WelcomeSection() {
    return (
        <section className="w-full bg-[#F2F2F2] text-[#282A22] overflow-hidden">
            {/* Top spacer */}
            <div className="h-24 md:h-36 lg:h-48" />

            {/* Header grid: label + intro text */}
            <div className="px-6 md:px-12 lg:px-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-8">
                    {/* Col 1 — label */}
                    <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#282A22]/60 self-start pt-1">
                        Welcome to rennsport
                    </div>

                    {/* Col 2+3 — intro heading */}
                    <h4 className="md:col-span-2 text-2xl md:text-3xl lg:text-[2rem] font-light leading-snug tracking-wide text-[#282A22]">
                        Located in the heart of the Cotswolds, Rennsport pursues perfection.
                        Our team specialise in creating some of the world&apos;s most sought-after
                        Porsche 911 Restomods.
                    </h4>
                </div>
            </div>

            {/* Mid spacer */}
            <div className="h-24 md:h-36 lg:h-48" />

            {/* Image grid — 10vw outer inset each side, 40% column gap */}
            <div
                className="grid grid-cols-1 md:grid-cols-[5fr_2fr] items-start px-[10vw]"
                style={{ columnGap: "40%" }}
            >
                {/* Portrait image — left column */}
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: "3/4" }}>
                    <Image
                        src="https://cdn.prod.website-files.com/6685496347877a8a2ee2b4e9/66e162ebfe1ffcb1ea7d64ae_GFW_9708%201-min.jpg"
                        alt="Rennsport 911 portrait"
                        fill
                        priority
                        sizes="30vw"
                        className="object-cover"
                    />
                </div>

                {/* Content block — right column */}
                <div className="flex flex-col">
                    {/* Secondary image */}
                    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
                        <Image
                            src="https://cdn.prod.website-files.com/6685496347877a8a2ee2b4e9/66e05a2884128a7aa4d8e1ba_GFW_7155%20(1)%20-%20upgrades.jpg"
                            alt="Rennsport upgrades"
                            fill
                            sizes="30vw"
                            className="object-cover"
                        />
                    </div>

                    {/* Text & CTA */}
                    <div className="pt-10 md:pt-14 pb-10 md:pb-0 flex flex-col gap-6">
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-[#282A22]">
                            Redefine your drive
                        </h3>

                        <p className="text-[15px] md:text-base font-light leading-relaxed text-[#282A22]/70">
                            Our journey together begins with a blank slate. We conceptualise your dream and
                            specify how we build a 911 tailored to you. Every detail, from the shape of body
                            to parts, materials, and finishes are curated to echo your style, ensuring that
                            your Rennsport 911 is not just a car, but a signature.
                        </p>

                        <Link
                            href="/about-us"
                            className="inline-flex items-center justify-center self-start px-7 py-3 bg-[#282A22] text-[#F2F2F2] text-sm font-light tracking-widest uppercase hover:bg-black transition-colors duration-300"
                        >
                            About us
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom spacer */}
            <div className="h-24 md:h-36 lg:h-48" />
        </section>
    );
}
