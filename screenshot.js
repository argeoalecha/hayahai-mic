import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set viewport to laptop size
  await page.setViewportSize({ width: 1366, height: 768 });
  
  // Navigate to the app
  await page.goto('http://localhost:5173');
  
  // Wait for the page to load
  await page.waitForTimeout(2000);
  
  // Take screenshot
  await page.screenshot({ 
    path: 'ui-screenshot.png', 
    fullPage: true 
  });
  
  console.log('Screenshot saved as ui-screenshot.png');
  await browser.close();
})();