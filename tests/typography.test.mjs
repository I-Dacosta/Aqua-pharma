import assert from "node:assert/strict";
import test from "node:test";
import { chromium } from "playwright";

const baseUrl = process.env.AQUA_SITE_URL ?? "http://localhost:3000";

test("homepage and navigation use one brand font stack", async () => {
    const browser = await chromium.launch({ headless: true });
    try {
        const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
        await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
        const fonts = await page.evaluate(() => {
            const family = (selector) => getComputedStyle(document.querySelector(selector)).fontFamily;
            return {
                body: family("body"),
                heroTitle: family(".hero-reference-title"),
                heroCopy: family(".hero-reference-copy"),
                heroButton: family(".hero-pill"),
                navigation: family('[aria-label="Primary navigation"]'),
                tab: family('#what-we-do [role="tab"]'),
                dropdown: family("nav .absolute.top-full"),
            };
        });

        assert.match(fonts.body, /^"?Avenir"?/);
        for (const [surface, family] of Object.entries(fonts)) {
            assert.equal(family, fonts.body, `${surface} has a different font stack`);
        }

        await page.getByRole("button", { name: "Menu" }).click();
        const menuFont = await page.locator("#menu-offer-heading").evaluate((element) => getComputedStyle(element).fontFamily);
        assert.equal(menuFont, fonts.body);
    } finally {
        await browser.close();
    }
});
