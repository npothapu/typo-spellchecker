const { chromium } = require('playwright');
const { test, expect } = require('@playwright/test');
(async () => {
  // Launch the browser
  const browser = await chromium.launch({ headless: false });
  // const browser = await chromium.launch({ headless: false }); headless should be false for url http://www.wpp.com or http://www.ford.com

  // Create a new page
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to the website
  const url = 'https://www.ford.com';
  await page.goto(url);

  // Extract all href attributes from anchor tags
  const links = await page.$$eval('a', (anchors) =>
    anchors
      .map(anchor => anchor.href) // Extract href attribute
      .filter(href => href.startsWith('https://www.ford.com')) // Keep only valid URLs
  );

  console.log('Extracted Links:', links);

  // Visit each link dynamically
  for (const link of links) {
    try {
      console.log(`Navigating to: ${link}`);
      await page.goto(link); // Navigate to the current link

      // Perform an action on the page
      const pageTitle = await page.title(); // Example: Get the page title
      console.log(`Title of ${link}: ${pageTitle}`);
    } catch (error) {
      console.error(`Failed to navigate to ${link}:`, error.message);
    }
  }

  // Close the browser
  await browser.close();
})();
