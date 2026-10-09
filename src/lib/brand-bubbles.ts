// Aqua Pharma brand "bubble cluster" motif (the circles above the wordmark).
// Coordinates are normalized to a 1040 x 470 viewBox, traced from the brand
// guideline logo. Reused as a CSS mask so imagery can be revealed through the
// signature circle constellation.

export type BrandBubble = { cx: number; cy: number; r: number };

export const BRAND_BUBBLES_VIEWBOX = { width: 1040, height: 470 } as const;

export const BRAND_BUBBLES: BrandBubble[] = [
    // Anchor / large bubbles
    { cx: 385, cy: 235, r: 58 },
    { cx: 740, cy: 360, r: 62 },
    { cx: 540, cy: 285, r: 42 },
    // Medium
    { cx: 288, cy: 305, r: 30 },
    { cx: 280, cy: 388, r: 34 },
    { cx: 645, cy: 280, r: 26 },
    { cx: 740, cy: 205, r: 28 },
    { cx: 235, cy: 345, r: 22 },
    { cx: 480, cy: 350, r: 20 },
    { cx: 540, cy: 362, r: 22 },
    { cx: 610, cy: 348, r: 22 },
    // Small
    { cx: 355, cy: 350, r: 17 },
    { cx: 715, cy: 250, r: 16 },
    { cx: 165, cy: 358, r: 16 },
    { cx: 400, cy: 344, r: 15 },
    { cx: 795, cy: 240, r: 18 },
    // Tiny accents
    { cx: 432, cy: 330, r: 12 },
    { cx: 385, cy: 392, r: 12 },
    { cx: 120, cy: 388, r: 12 },
    { cx: 175, cy: 410, r: 11 },
    { cx: 200, cy: 360, r: 13 },
    { cx: 865, cy: 250, r: 12 },
];

/**
 * Builds a CSS `mask-image` value (a data-URI SVG of the bubble cluster).
 * Opaque circles reveal the masked element; everything else is clipped away.
 */
export function brandBubbleMaskImage(): string {
    const circles = BRAND_BUBBLES.map(
        (bubble) => `<circle cx='${bubble.cx}' cy='${bubble.cy}' r='${bubble.r}' fill='#fff'/>`
    ).join("");
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${BRAND_BUBBLES_VIEWBOX.width} ${BRAND_BUBBLES_VIEWBOX.height}'>${circles}</svg>`;

    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}
