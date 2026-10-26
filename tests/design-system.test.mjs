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

test("homepage includes the hero, market snapshot, solution navigation, and events news", async () => {
    const browser = await chromium.launch();
    try {
        const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
        await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });

        assert.equal(await page.locator("#hero").count(), 1);
        assert.equal(await page.locator("#hero h1").count(), 1);
        assert.equal(await page.locator("#markets-snapshot").count(), 1);
        assert.equal(await page.locator("#quick-nav").count(), 1);
        assert.equal(await page.locator("#news").count(), 1);
        assert.equal(await page.locator("#what-we-do, #products, #contact, #map-section").count(), 0);
        assert.equal(await page.locator("#hero .hero-pill-solid").getAttribute("href"), "/contact");
        assert.equal(await page.locator("#hero .hero-pill-ghost").getAttribute("href"), "#quick-nav");

        const quickNavLinks = await page.locator("#quick-nav article").evaluateAll((items) =>
            items.map((item) => ({
                title: item.querySelector("h3")?.textContent?.trim(),
                href: item.querySelector("a")?.getAttribute("href"),
                cta: item.querySelector(".brand-button")?.textContent?.trim(),
            }))
        );
        assert.deepEqual(quickNavLinks, [
            { title: "Fish - Parasite Control", href: "/concepts/fish", cta: "Explore fish" },
            { title: "Shrimp - Pond Health", href: "/concepts/shrimp", cta: "Explore shrimp" },
            { title: "Systems & Services", href: "/systems-services", cta: "Explore systems" },
        ]);
    } finally {
        await browser.close();
    }
});

test("about page keeps the requested company information architecture", async () => {
    const browser = await chromium.launch();
    try {
        const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
        await page.goto(`${baseUrl}/about`, { waitUntil: "networkidle" });

        assert.equal(await page.locator("main #about-hero h1").count(), 1);
        for (const selector of ["#who-we-are", "#our-mission", "#global-presence", "#team", "#events-news"]) {
            assert.equal(await page.locator(selector).count(), 1, `${selector} should be present once`);
        }
        assert.equal(await page.locator("#history, #values, #contact").count(), 0);
        assert.equal(await page.locator("#team a[href='/about/team']").count(), 1);
    } finally {
        await browser.close();
    }
});

test("concepts hub and fish page expose the requested solution architecture", async () => {
    const browser = await chromium.launch();
    try {
        const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
        await page.goto(`${baseUrl}/concepts`, { waitUntil: "networkidle" });
        assert.equal(await page.locator("h1").count(), 1);
        assert.deepEqual(
            await page.locator("#products article a").evaluateAll((links) => links.map((link) => link.getAttribute("href"))),
            ["/concepts/fish", "/concepts/shrimp", "/systems-services"]
        );

        await page.goto(`${baseUrl}/concepts/fish`, { waitUntil: "networkidle" });
        assert.equal(await page.locator("header h1").count(), 1);
        for (const id of ["bath-treatments", "species-applications", "dosing-systems", "field-support", "hse-sds-docs"]) {
            assert.equal(await page.locator(`#${id}`).count(), 1, `#${id} should be present once`);
        }
        assert.equal(await page.locator("#contact").count(), 0);
        assert.equal(await page.locator("#dosing-systems a[href='/systems-services#dosing-systems']").count(), 1);
    } finally {
        await browser.close();
    }
});

test("shrimp page exposes the requested pond-health architecture", async () => {
    const browser = await chromium.launch();
    try {
        const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
        await page.goto(`${baseUrl}/concepts/shrimp`, { waitUntil: "networkidle" });

        assert.equal(await page.locator("header h1").count(), 1);
        for (const id of ["pond-oxygenation", "outbreak-control", "field-support", "hse-sds-docs"]) {
            assert.equal(await page.locator(`#${id}`).count(), 1, `#${id} should be present once`);
        }
        assert.equal(await page.locator("#contact").count(), 0);
        assert.match(await page.locator("#outbreak-control h2").textContent() ?? "", /Vibrio.*Asia/);
        assert.equal(await page.locator("#hse-sds-docs h2").textContent(), "HSE & SDS Docs");
    } finally {
        await browser.close();
    }
});

test("systems page exposes the requested equipment and services architecture", async () => {
    const browser = await chromium.launch();
    try {
        const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
        await page.goto(`${baseUrl}/systems-services`, { waitUntil: "networkidle" });

        assert.equal(await page.locator("header h1").count(), 1);
        for (const id of ["dosing-systems", "protocols", "on-site-support", "hse-product-stewardship"]) {
            assert.equal(await page.locator(`#${id}`).count(), 1, `#${id} should be present once`);
        }
        assert.equal(await page.locator("#safety-guides, #contact").count(), 0);
        assert.match(await page.locator("#dosing-systems").textContent() ?? "", /S.*N.*W/s);
        assert.match(await page.locator("#hse-product-stewardship").textContent() ?? "", /Safety guides/);
    } finally {
        await browser.close();
    }
});

for (const [width, gutter, h2Size] of [[390, 24, 36], [1440, 80, 56]]) {
    test(`homepage keeps a consistent content edge and section heading scale at ${width}px`, async () => {
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
                        "nav.fixed > div", "#markets-snapshot > div", "#quick-nav > div", "#news > div", "footer > div",
                    ].map(measure),
                    h2: ["#markets-snapshot h2", "#quick-nav h2", "#news h2"].map(measure),
                    overflow: document.documentElement.scrollWidth - window.innerWidth,
                };
            });

            assert.equal(measurements.overflow, 0);
            for (const edge of measurements.edges) assert.ok(Math.abs(edge.x - gutter) <= 2, `content edge ${edge.x} differs from ${gutter}`);
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

test("footer presents a compact, functional utility navigation", async () => {
    const browser = await chromium.launch();
    try {
        const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
        await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });

        const footer = page.locator("footer");
        const utilityLinks = await footer.locator("a").evaluateAll((links) =>
            links.map((link) => ({ text: link.textContent?.trim(), href: link.getAttribute("href") }))
        );
        assert.deepEqual(utilityLinks, [
            { text: "Contact us", href: "/contact" },
            { text: "Find a local expert", href: "/contact#local-experts" },
            { text: "LinkedIn", href: "https://www.linkedin.com/company/aqua-pharma/" },
            { text: "Privacy Policy", href: "https://aqua-pharma.com/wp-content/uploads/2024/09/Aqua-Pharma-Privacy-statement-and-cookie-policy_-Aug-2024.pdf" },
            { text: "Legal Notice", href: "https://aqua-pharma.com/terms-and-conditions/" },
        ]);
        assert.ok((await footer.boundingBox()).height <= 144, "desktop footer should remain a slim utility band");

        await footer.getByRole("button", { name: "Cookie Settings" }).click();
        const dialog = page.getByRole("dialog", { name: "Cookie Settings" });
        await dialog.waitFor({ state: "visible" });
        await dialog.getByLabel("Close cookie settings").click();
        await dialog.waitFor({ state: "hidden" });
    } finally {
        await browser.close();
    }
});

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

test("homepage calls to action use the Aqua cyan accent and remain easy to target", async () => {
    const browser = await chromium.launch();
    try {
        const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
        await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
        const result = await page.evaluate(() => {
            const styles = getComputedStyle(document.documentElement);
            const selectors = [
                "#quick-nav .brand-button",
                "#news .brand-button",
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
            assert.equal(action.background, "rgb(109, 198, 224)", `${action.selector} should use the Aqua cyan accent`);
            assert.equal(action.color, "rgb(29, 34, 74)", `${action.selector} needs dark brand text`);
            assert.ok(action.height >= 44, `${action.selector} is too small to target`);
            assert.equal(action.border, "none", `${action.selector} should not have a visible border`);
        }
        const secondary = await page.locator("#news .brand-button-outline").evaluate((element) => {
            const computed = getComputedStyle(element);
            return { background: computed.backgroundColor, border: computed.borderTopStyle };
        });
        assert.equal(secondary.background, "rgb(109, 198, 224)");
        assert.equal(secondary.border, "none");
        assert.equal(await page.locator('nav.fixed [aria-haspopup="menu"]').evaluate((element) => getComputedStyle(element).borderTopWidth), "0px");
        for (const selector of ["#quick-nav .brand-button", "#news .brand-button"]) {
            await page.locator(selector).first().hover();
            await page.waitForFunction((target) => {
                const style = getComputedStyle(document.querySelector(target));
                return style.backgroundColor === "rgb(0, 158, 224)" && style.color === "rgb(29, 34, 74)";
            }, selector);
            const hovered = await page.locator(selector).first().evaluate((element) => {
                const style = getComputedStyle(element);
                return { background: style.backgroundColor, color: style.color };
            });
            assert.equal(hovered.background, "rgb(0, 158, 224)", `${selector} hover background`);
            assert.equal(hovered.color, "rgb(29, 34, 74)", `${selector} hover text`);
            assert.equal(await page.locator(selector).first().evaluate((element) => getComputedStyle(element).borderTopStyle), "none");
        }
        await page.locator("#quick-nav a").first().focus();
        const focus = await page.locator("#quick-nav a").first().evaluate((element) => {
            const computed = getComputedStyle(element);
            return { style: computed.outlineStyle, width: computed.outlineWidth };
        });
        assert.equal(focus.style, "solid");
        assert.ok(parseFloat(focus.width) >= 2, "quick-navigation links need a visible focus indicator");
    } finally {
        await browser.close();
    }
});

test("market labels and joint-venture statistic use the shared treatment", async () => {
    const browser = await chromium.launch();
    try {
        const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
        await page.goto(`${baseUrl}/contact`, { waitUntil: "networkidle" });

        const marketUi = await page.locator("#map-section").evaluate((section) => {
            const labels = [...section.querySelectorAll(".map-snapshot-label")];
            const legend = section.querySelector(".map-species-legend");
            return {
                labels: labels.map((label) => ({
                    text: label.textContent?.trim() ?? "",
                    size: parseFloat(getComputedStyle(label).fontSize),
                    transform: getComputedStyle(label).textTransform,
                })),
                legendSize: legend ? parseFloat(getComputedStyle(legend).fontSize) : 0,
            };
        });
        assert.equal(marketUi.labels.length, 3);
        for (const label of marketUi.labels) {
            assert.equal(label.text, label.text.toUpperCase());
            assert.equal(label.transform, "uppercase");
            assert.ok(label.size >= 16, "market labels should be enlarged");
        }
        assert.ok(marketUi.legendSize >= 13.1, "market legend should be enlarged by approximately 5%");

        const jointVentureAlignment = await page.locator("#map-section .map-joint-venture-stat").evaluate((container) => {
            const [value, label] = [...container.children];
            const containerRect = container.getBoundingClientRect();
            const valueRect = value.getBoundingClientRect();
            const labelRect = label.getBoundingClientRect();
            const contentCenter = (valueRect.left + labelRect.right) / 2;
            const containerCenter = (containerRect.left + containerRect.right) / 2;

            return {
                centerOffset: Math.abs(contentCenter - containerCenter),
                labelWithinValue: labelRect.top >= valueRect.top && labelRect.bottom <= valueRect.bottom,
            };
        });
        assert.ok(jointVentureAlignment.centerOffset <= 2, "joint-venture statistic should be centered in its desktop column");
        assert.ok(jointVentureAlignment.labelWithinValue, "joint-venture copy should stay beside the 50/50 figure");
    } finally {
        await browser.close();
    }
});

test("filled actions across inner pages share the Aqua cyan treatment", async () => {
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
                assert.equal(action.background, "rgb(109, 198, 224)", `${path} has a filled CTA with a different color`);
                assert.equal(action.border, "none", `${path} has a bordered CTA`);
            }
        }
    } finally {
        await browser.close();
    }
});

test("interactive map hydrates without a fallback mismatch", async () => {
    const browser = await chromium.launch();
    try {
        const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
        const pageErrors = [];
        page.on("pageerror", (error) => pageErrors.push(error.message));
        await page.goto(`${baseUrl}/contact`, { waitUntil: "networkidle" });
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
