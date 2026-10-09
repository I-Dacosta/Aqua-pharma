import assert from "node:assert/strict";
import test from "node:test";
import { chromium } from "playwright";

const baseUrl = process.env.AQUA_SITE_URL ?? "http://localhost:3000";

for (const [path, sectionId] of [["/", "news"], ["/about", "events-news"]]) {
    test(`${path} shows dated archive news when there are no upcoming events`, async () => {
        const browser = await chromium.launch({ headless: true });
        try {
            const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
            await page.goto(`${baseUrl}${path}`, { waitUntil: "networkidle" });
            const section = page.locator(`#${sectionId}`);
            const stories = section.locator("article");

            assert.equal(await stories.count(), 3);
            assert.match(await section.innerText(), /October 2022/i);
            assert.match(await section.innerText(), /Shetland/);
            assert.match(await section.innerText(), /SEATRU/);
            assert.match(await section.innerText(), /Chile/);
            for (const story of await stories.all()) {
                assert.ok(await story.locator("a[href]").count() > 0);
            }
            assert.equal(await stories.locator("img").count(), 3);
        } finally {
            await browser.close();
        }
    });
}
