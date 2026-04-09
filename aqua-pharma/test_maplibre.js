const { test, expect } = require('@playwright/test');
(async () => {
    const { chromium } = require('playwright');
    const browser = await chromium.launch();
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    await page.goto('http://localhost:3001');
    const hasCanvas = await page.locator('canvas').count();
    console.log('Number of canvases:', hasCanvas);
    await browser.close();
})();
