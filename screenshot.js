import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Navigate to the app (Next.js port)
  await page.goto('http://localhost:3000');
  
  // Wait for the page to load
  await page.waitForTimeout(3000);
  
  // Take screenshots at different viewport sizes
  const viewports = [
    { name: 'desktop', width: 1920, height: 1080 },
    { name: 'laptop', width: 1366, height: 768 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'mobile', width: 375, height: 667 }
  ];
  
  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.waitForTimeout(1000); // Wait for responsive changes
    
    await page.screenshot({ 
      path: `ui-screenshot-${viewport.name}.png`, 
      fullPage: true 
    });
    
    console.log(`Screenshot saved as ui-screenshot-${viewport.name}.png`);
  }
  
  await browser.close();
})();