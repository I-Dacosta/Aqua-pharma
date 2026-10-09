import type { NavigationSection, SiteContent } from "@/i18n/site-content";

export type NavFeatureCard = {
    image: string;
    title: string;
    href: string;
    cta: string;
};

export type NavFeature = {
    heading: string;
    cards: NavFeatureCard[];
};

/** Tile image shown per top-level section in the expanded menu. */
export const NAV_SECTION_IMAGES: Record<string, string> = {
    about: "/images/wp/about/about-team.jpg",
    "aquaculture-0": "/images/bath-treatments.jpg",
    "aquaculture-1": "/images/conditioning-product.jpg",
    systems: "/images/dosing-product.jpg",
    rd: "/images/wp/sustainability/environment.jpg",
};

const SECONDARY_IMAGES: Record<string, string[]> = {
    systems: ["/images/dosing-product.jpg", "/images/bath-product.jpg"],
    rd: ["/images/wp/sustainability/environment.jpg", "/images/wp/about/about-operations.jpg"],
};

export function getNavFeature(section: NavigationSection, content: SiteContent): NavFeature {
    const explore = content.nav.exploreLabel;

    if (section.key === "about") {
        return {
            heading: section.title,
            cards: [
                { image: "/images/wp/about/about-team.jpg", title: section.items?.find((item) => item.href === "/about/team")?.name ?? section.title, href: "/about/team", cta: explore },
                { image: "/images/wp/about/about-operations.jpg", title: section.items?.find((item) => item.href === "/about#map-section")?.name ?? section.title, href: "/about#map-section", cta: explore },
            ],
        };
    }

    if (section.groups?.length) {
        return {
            heading: section.title,
            cards: section.groups.slice(0, 2).map((group, index) => ({
                image: NAV_SECTION_IMAGES[`${section.key}-${index}`] ?? NAV_SECTION_IMAGES.systems,
                title: group.title.split("\n").join(" – "),
                href: group.href,
                cta: explore,
            })),
        };
    }

    const images = SECONDARY_IMAGES[section.key] ?? SECONDARY_IMAGES.systems;

    return {
        heading: section.fullTitle ?? section.title,
        cards: (section.items ?? []).slice(0, 2).map((item, index) => ({
            image: images[index] ?? images[0],
            title: item.name,
            href: item.href,
            cta: explore,
        })),
    };
}
