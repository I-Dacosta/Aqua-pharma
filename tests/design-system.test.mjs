import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";
import { chromium } from "playwright";

const require = createRequire(import.meta.url);
const axePath = require.resolve("axe-core/axe.min.js");
const baseUrl = process.env.AQUA_SITE_URL ?? "http://localhost:3000";
const routes = [
    "/", "/about", "/about/media", "/about/pioneering", "/about/team",
    "/concepts", "/concepts/fish", "/concepts/shrimp", "/systems-services",
    "/rd", "/contact", "/sustainability", "/products/bath-treatments",
    "/products/water-conditioning-oxygenation", "/products/dosing-units-services",
];

for (const [width, gutter, h1Size, h2Size] of [[390, 24, 48, 36], [1440, 80, 80, 56]]) {
    test(`homepage has one content edge and heading scale at ${width}px`, async () => {
        const browser = await chromium.launch();
        try {
            const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
            await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
            const measurements = await page.evaluate(() => {
                const measure = (selector) => {
                    const element = document.querySelector(selector);
                    return { x: element.getBoundingClientRect().x, size: parseFloat(getComputedStyle(element).fontSize) };
                };
                return {
                    edges: [
                        "nav.fixed > div", "#hero .hero-reference-layout", "#map-section > div",
                        "#what-we-do > div", "#products > div", "#news > div",
                        "#contact > div > div:first-child", "footer > div",
                    ].map(measure),
                    h1: measure("#hero h1"),
                    h2: ["#map-section h2", "#what-we-do h2", "#products h2", "#news h2", "#contact h2"].map(measure),
                    overflow: document.documentElement.scrollWidth - window.innerWidth,
                };
            });

            assert.equal(measurements.overflow, 0);
            for (const edge of measurements.edges) assert.ok(Math.abs(edge.x - gutter) <= 2, `content edge ${edge.x} differs from ${gutter}`);
            assert.equal(measurements.h1.size, h1Size);
            for (const heading of measurements.h2) assert.equal(heading.size, h2Size);
        } finally {
            await browser.close();
        }
    });
}

for (const width of [390, 1440]) {
    test(`navbar keeps a compact white surface at ${width}px`, async () => {
        const browser = await chromium.launch();
        try {
            const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
            await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });

            const inspect = () => page.locator("nav.fixed").evaluate((nav) => {
                const inner = nav.firstElementChild;
                const logo = nav.querySelector(".nav-logo-lockup");
                const menu = nav.querySelector("button[aria-label]");
                return {
                    background: getComputedStyle(nav).backgroundColor,
                    text: getComputedStyle(inner).color,
                    logo: getComputedStyle(logo).color,
                    menu: getComputedStyle(menu).color,
                    top: inner.getBoundingClientRect().top,
                };
            });

            const assertSurface = async () => {
                const result = await inspect();
                assert.equal(result.background, "rgb(255, 255, 255)");
                assert.equal(result.text, "rgb(38, 45, 98)");
                assert.equal(result.logo, "rgb(38, 45, 98)");
                assert.equal(result.menu, "rgb(38, 45, 98)");
                assert.ok(result.top <= 32, `navbar content begins ${result.top}px from the viewport top`);
            };

            await assertSurface();
            await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
            await page.waitForTimeout(400);
            await assertSurface();

            if (width >= 1280) {
                await page.locator('nav.fixed [aria-label="Primary navigation"] a').first().hover();
                const dropdown = page.locator("nav.fixed > div").last();
                await dropdown.waitFor({ state: "visible" });
                assert.equal(await dropdown.getAttribute("aria-hidden"), "false");
                await dropdown.locator("a").first().hover();
                assert.equal(await dropdown.getAttribute("aria-hidden"), "false");
                await assertSurface();
            }

            await page.locator("nav.fixed button[aria-label]").last().click();
            await page.waitForTimeout(400);
            await assertSurface();
        } finally {
            await browser.close();
        }
    });
}

for (const [width, gutter] of [[390, 24], [1440, 80]]) {
    test(`product detail sections share the site gutter at ${width}px`, async () => {
        const browser = await chromium.launch();
        try {
            const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
            await page.goto(`${baseUrl}/products/bath-treatments`, { waitUntil: "networkidle" });
            for (const selector of ["#product-intro .product-intro-trigger > div", "#product-info > div", "#product-care > div"]) {
                const x = await page.locator(selector).evaluate((element) => element.getBoundingClientRect().x);
                assert.ok(Math.abs(x - gutter) <= 2, `${selector} starts at ${x}, expected ${gutter}`);
            }
        } finally {
            await browser.close();
        }
    });
}

test("primary calls to action use the softer brand accent and remain easy to target", async () => {
    const browser = await chromium.launch();
    try {
        const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
        await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
        const result = await page.evaluate(() => {
            const styles = getComputedStyle(document.documentElement);
            const selectors = [
                "#hero .hero-pill-solid",
                "#what-we-do .brand-button",
                "#products .brand-button",
                "#news .brand-button",
                "#contact button[type=submit]",
            ];
            return {
                deepBlue: styles.getPropertyValue("--brand-blue-dark").trim(),
                actions: selectors.map((selector) => {
                    const element = document.querySelector(selector);
                    if (!element) return { selector, missing: true };
                    const computed = getComputedStyle(element);
                    return { selector, background: computed.backgroundColor, border: computed.borderTopStyle, color: computed.color, height: element.getBoundingClientRect().height };
                }),
            };
        });
        assert.equal(result.deepBlue, "#1d224a");
        for (const action of result.actions) {
            assert.equal(action.background, "rgb(212, 247, 245)", `${action.selector} should use the softer turquoise accent`);
            assert.equal(action.color, "rgb(29, 34, 74)", `${action.selector} needs dark brand text`);
            assert.ok(action.height >= 44, `${action.selector} is too small to target`);
            if (action.selector !== "#hero .hero-pill-solid") {
                assert.equal(action.border, "none", `${action.selector} should not have a visible border`);
            }
        }
        const secondary = await page.locator("#news .brand-button-outline").evaluate((element) => {
            const computed = getComputedStyle(element);
            return { background: computed.backgroundColor, border: computed.borderTopStyle };
        });
        assert.equal(secondary.background, "rgb(109, 198, 224)");
        assert.equal(secondary.border, "none");
        assert.equal(await page.locator('nav.fixed [aria-haspopup="menu"]').evaluate((element) => getComputedStyle(element).borderTopWidth), "0px");
        for (const selector of ["#what-we-do .brand-button", "#products .brand-button", "#news .brand-button", "#contact button[type=submit]"]) {
            await page.locator(selector).first().hover();
            await page.waitForFunction((target) => {
                const style = getComputedStyle(document.querySelector(target));
                return style.backgroundColor === "rgb(29, 34, 74)" && style.color === "rgb(255, 255, 255)";
            }, selector);
            const hovered = await page.locator(selector).first().evaluate((element) => {
                const style = getComputedStyle(element);
                return { background: style.backgroundColor, color: style.color };
            });
            assert.equal(hovered.background, "rgb(29, 34, 74)", `${selector} hover background`);
            assert.equal(hovered.color, "rgb(255, 255, 255)", `${selector} hover text`);
            assert.equal(await page.locator(selector).first().evaluate((element) => getComputedStyle(element).borderTopStyle), "none");
        }
        await page.locator("#contact button[type=submit]").focus();
        const focus = await page.locator("#contact button[type=submit]").evaluate((element) => {
            const computed = getComputedStyle(element);
            return { style: computed.outlineStyle, width: computed.outlineWidth };
        });
        assert.equal(focus.style, "solid");
        assert.equal(focus.width, "3px");
    } finally {
        await browser.close();
    }
});

test("filled actions across inner pages share the softer brand treatment", async () => {
    const browser = await chromium.launch();
    try {
        const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
        for (const path of ["/about", "/about/team", "/about/pioneering", "/sustainability", "/concepts", "/products/bath-treatments"]) {
            await page.goto(`${baseUrl}${path}`, { waitUntil: "networkidle" });
            const actions = await page.locator(".brand-button").evaluateAll((elements) =>
                elements.map((element) => ({
                    background: getComputedStyle(element).backgroundColor,
                    border: getComputedStyle(element).borderTopStyle,
                }))
            );
            assert.ok(actions.length > 0, `${path} has no filled CTA to check`);
            for (const action of actions) {
                assert.equal(action.background, "rgb(212, 247, 245)", `${path} has a filled CTA with a different color`);
                assert.equal(action.border, "none", `${path} has a bordered CTA`);
            }
        }
    } finally {
        await browser.close();
    }
});

test("homepage hydrates without a map fallback mismatch", async () => {
    const browser = await chromium.launch();
    try {
        const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
        const pageErrors = [];
        page.on("pageerror", (error) => pageErrors.push(error.message));
        await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
        assert.deepEqual(pageErrors.filter((message) => message.includes("Hydration failed")), []);
    } finally {
        await browser.close();
    }
});

test("primary pages have no detectable WCAG text contrast failures", async () => {
    const browser = await chromium.launch();
    try {
        const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
        for (const path of routes) {
            await page.goto(`${baseUrl}${path}`, { waitUntil: "networkidle" });
            await page.addScriptTag({ path: axePath });
            const failures = await page.evaluate(async () => {
                const result = await window.axe.run(document, { runOnly: { type: "rule", values: ["color-contrast"] } });
                return result.violations.flatMap((violation) => violation.nodes.map((node) => `${node.target.join(" ")}: ${node.failureSummary?.split("\n")[1]}`));
            });
            assert.deepEqual(failures, [], `${path} has contrast failures:\n${failures.join("\n")}`);
        }
    } finally {
        await browser.close();
    }
});

test("primary pages have no automated WCAG A/AA violations or horizontal overflow", async () => {
    const browser = await chromium.launch();
    try {
        const page = await browser.newPage({ viewport: { width: 320, height: 900 }, reducedMotion: "reduce" });
        for (const width of [320, 390, 768, 1440]) {
            await page.setViewportSize({ width, height: 900 });
            for (const path of routes) {
                await page.goto(`${baseUrl}${path}`, { waitUntil: "domcontentloaded" });
                await page.addScriptTag({ path: axePath });
                const { violations, overflow } = await page.evaluate(async () => {
                    const result = await window.axe.run(document, {
                        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"] },
                    });
                    return {
                        violations: result.violations.map((violation) => ({
                            id: violation.id,
                            targets: violation.nodes.map((node) => node.target.join(" ")),
                        })),
                        overflow: document.documentElement.scrollWidth - window.innerWidth,
                    };
                });
                assert.equal(overflow, 0, `${path} overflows at ${width}px`);
                assert.deepEqual(violations, [], `${path} at ${width}px has automated WCAG violations`);
            }
        }
    } finally {
        await browser.close();
    }
});
