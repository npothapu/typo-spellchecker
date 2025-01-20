// mainTest.test.js
const { chromium } = require('playwright');
const { test } = require('@playwright/test');

test.describe('Dynamic URL Test', () => {
  test('Extract and visit links', async ({ baseURL }) => {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigate to the website
    await page.goto(baseURL);

    // Extract all href attributes from anchor tags
    const links = await page.$$eval('a', (anchors, baseUrl) =>
      anchors
        .map(anchor => anchor.href) // Extract href attribute
        .filter(href => href.startsWith(baseUrl)) // Keep only valid URLs
    , baseURL);

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
  });
});
