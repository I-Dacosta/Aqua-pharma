const { chromium } = require('playwright');
(async () => {
    console.log('START');
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');
    console.log('Navigated');
    await page.waitForTimeout(2000);
    const map = await page.$('#map-section');
    console.log('Map section:', map ? 'Found' : 'Not found');
    const canvas = await page.$('.maplibregl-canvas');
    console.log('Canvas:', canvas ? 'Found' : 'Not found');
    if (canvas) {
        console.log(await canvas.boundingBox());
    }
    await browser.close();
})();
