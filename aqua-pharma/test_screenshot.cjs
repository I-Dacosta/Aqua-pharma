const { chromium } = require('playwright');
(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    try {
        await page.goto('http://localhost:3000');
        await page.waitForTimeout(3000);
        await page.screenshot({ path: 'test_render.png', fullPage: true });
        console.log('Screenshot saved to test_render.png');
        
        // Dump the HTML
        const html = await page.content();
        console.log('HTML SNIPPET:', html.substring(0, 1000));
        
        const overlay = await page.$('nextjs-portal');
        if (overlay) {
            console.log('Next.js Error Overlay detected!');
        }
    } catch (e) {
        console.log('Err:', e.message);
    }
    await browser.close();
})();
