"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const featuredNews = {
    category: "SEAFOOD EXPO IN BARCELONA",
    title: "A Sustainable Seafood Superstar",
    description: "Join us for an exclusive opportunity to indulge in unforgettable experiences. Meet with the Hima Seafood team and more at the Seafood Expo Barcelona 2025 (May 6th - 8th). You will find us at Hall 4, stand 4C301. We can't wait to see you.",
    image: "https://images.unsplash.com/photo-1544551763-46a01391307b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    link: "#"
};

const newsItems = [
    {
        category: "PRESS RELEASE",
        title: "Hima Seafood to use hydrogen trucks transporting feed and fish",
        description: "Hima Seafood aims for zero-emission transportation for our new aquaculture facility in Rjukan. We have now ensured that the transportation of feed and fish to and from the facility will be done using emission-free hydrogen trucks.",
        image: "https://images.unsplash.com/photo-1596706915017-f27eb66fc7bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        link: "#"
    },
    {
        category: "PRESS RELEASE",
        title: "The sustainability revolution is here, and Hima Seafood is leading the way.",
        description: "Monday 1st of August marked the start of construction for the world's largest land-based Recycling Aquaculture System (\"RAS\") trout facility. It will be based in Rjukan, Norway and is expected to produce 150 tonnes of head-on-gutted (\"HOG\") trout a week, or around 8,000 tonnes per year.",
        image: "https://images.unsplash.com/photo-1518118227690-3cb83e58da00?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        link: "#"
    },
    {
        category: "INNOVATION",
        title: "The world’s largest land-based trout farm will use waste heat from data center",
        description: "Norwegian colocation company Green Mountain and Hima Seafood have entered into an agreement on the reuse of waste heat from the data center in the world's largest land-based trout farm.",
        image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        link: "#"
    },
];

export default function News() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Filter out nulls from refs (just in case)
            const validCards = cardsRef.current.filter(Boolean);

            // Staggered fade up for all article items
            gsap.fromTo(
                validCards,
                {
                    y: 80,
                    opacity: 0,
                },
                {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    },
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    stagger: 0.15,
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="relative z-10 w-full">
            <section ref={sectionRef} className="bg-hima-light py-32 px-8">
            <div className="max-w-[1400px] mx-auto">
                <div className="flex justify-between items-end mb-16">
                    <h2 className="text-lg text-hima-text uppercase tracking-widest text-[#8a8a8a]">
                        News
                    </h2>
                    <a href="#" className="text-hima-gold flex items-center gap-2 hover:opacity-80 transition-opacity font-serif text-lg">
                        All news <span className="text-2xl font-sans font-light">→</span>
                    </a>
                </div>

                {/* Featured Article */}
                <div
                    ref={(el) => { cardsRef.current[0] = el; }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-24 items-center group cursor-pointer"
                >
                    <div className="lg:col-span-7 relative h-[60vh] w-full overflow-hidden">
                        <Image
                            src={featuredNews.image}
                            alt={featuredNews.title}
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                    </div>
                    <div className="lg:col-span-5 flex flex-col justify-center pr-8">
                        <span className="text-xs uppercase tracking-widest text-[#8a8a8a] mb-6">
                            {featuredNews.category}
                        </span>
                        <h3 className="text-4xl md:text-5xl font-serif text-hima-text mb-6 leading-tight group-hover:text-hima-gold transition-colors">
                            {featuredNews.title}
                        </h3>
                        <p className="text-hima-text/80 leading-relaxed mb-10 text-lg">
                            {featuredNews.description}
                        </p>
                        <a href={featuredNews.link} className="text-hima-gold text-sm transition-colors border-b border-hima-gold/30 pb-1 w-max hover:border-hima-gold">
                            Read more
                        </a>
                    </div>
                </div>

                {/* Grid Articles */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {newsItems.map((item, index) => (
                        <div
                            key={index}
                            ref={(el) => {
                                cardsRef.current[index + 1] = el; // Offset by 1 for featured card
                            }}
                            className="group cursor-pointer flex flex-col gap-6"
                        >
                            <div className="w-full h-[40vh] relative overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <span className="text-xs uppercase tracking-widest text-[#8a8a8a]">
                                    {item.category}
                                </span>
                                <h3 className="text-2xl font-serif text-hima-text group-hover:text-hima-gold transition-colors leading-tight">
                                    {item.title}
                                </h3>
                                <p className="text-hima-text/70 leading-relaxed text-sm mt-2 line-clamp-4">
                                    {item.description}
                                </p>
                                <a href={item.link} className="text-hima-gold text-sm mt-2 border-b border-hima-gold/30 pb-1 w-max hover:border-hima-gold transition-colors">
                                    Read more
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            </section>
        </div>
    );
}
