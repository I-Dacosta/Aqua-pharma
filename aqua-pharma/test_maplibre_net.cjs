const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    page.on('console', msg => {
        const text = msg.text();
        if (text.includes('MapLibre') || text.includes('Error') || text.toLowerCase().includes('fail') || text.toLowerCase().includes('warn')) {
            console.log('BROWSER CONSOLE:', text);
        }
    });

    page.on('response', response => {
        const url = response.url();
        const status = response.status();
        if (url.includes('cartocdn') || url.includes('maplibre') || status >= 400) {
            console.log(`NETWORK: ${status} ${url}`);
        }
    });

    page.on('pageerror', error => {
        console.log(`PAGE ERROR: ${error.message}`);
    });

    console.log('Navigating to http://localhost:3000');
    try {
        await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 15000 });
    } catch (e) {
        console.log('Could not reach port 3000. Trying 3001...');
        await page.goto('http://localhost:3001', { waitUntil: 'networkidle', timeout: 15000 });
    }
    
    // Wait a bit for map to initialize and style to load
    await page.waitForTimeout(4000);

    const mapCanvas = await page.$('.maplibregl-canvas');
    if (mapCanvas) {
        const box = await mapCanvas.boundingBox();
        console.log('MapLibre Canvas Bounds:', box);
    } else {
        console.log('MapLibre Canvas NOT FOUND');
    }

    const markers = await page.$$('.map-office-marker');
    console.log('Number of office markers found:', markers.length);

    await browser.close();
})();
