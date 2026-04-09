const { chromium } = require('playwright');
(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    await page.goto('file://' + __dirname + '/test_empty_style.html');
    await page.waitForTimeout(2000);
    await browser.close();
})();
