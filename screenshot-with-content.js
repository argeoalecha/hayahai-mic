import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Navigate to the app
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(3000);
  
  // Search for songs to populate content
  await page.fill('input[placeholder*="Search"]', 'bohemian rhapsody');
  await page.press('input[placeholder*="Search"]', 'Enter');
  await page.waitForTimeout(3000);
  
  // Add songs to queue by clicking on first few results (if any)
  const songButtons = await page.locator('[class*="hover:bg-blue-50"] button').all();
  for (let i = 0; i < Math.min(songButtons.length, 3); i++) {
    await songButtons[i].click();
    await page.waitForTimeout(1000);
  }
  
  // Take screenshots at different viewport sizes with content
  const viewports = [
    { name: 'desktop-content', width: 1920, height: 1080 },
    { name: 'laptop-content', width: 1366, height: 768 },
    { name: 'tablet-content', width: 768, height: 1024 },
    { name: 'mobile-content', width: 375, height: 667 }
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