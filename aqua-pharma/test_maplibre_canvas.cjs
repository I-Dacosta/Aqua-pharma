const { chromium } = require('playwright');
(async () => {
    console.log('START');
    const browser = await chromium.launch();
    const page = await browser.newPage();
    page.on('console', msg => console.log('LOG:', msg.text()));
    await page.goto('http://localhost:3000');
    console.log('Navigated');
    await page.waitForTimeout(2000);
    const map = await page.$('#map-section');
    console.log('Map section:', map ? 'Found' : 'Not found');
    const canvas = await page.$('.maplibregl-canvas');
    console.log('Canvas:', canvas ? 'Found' : 'Not found');
    if (canvas) {
        const box = await canvas.boundingBox();
        console.log('Canvas bounds:', box);
    }
    await browser.close();
})();
