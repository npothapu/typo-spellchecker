const { chromium } = require('playwright');

const baseURL = 'https://unitedsoybean.org';
// const baseURL = 'https://www.wpp.com';
// const baseURL = 'https://www.vml.com';

(async () => {
  const browser = await chromium.launch({ headless: true }); // Open in non-headless mode for debugging
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle'); // Ensure full page load

    // Debug: Print page content
    const content = await page.content();
    console.log('Page HTML Content:', content);

    // Wait for anchors to load (if dynamic)
    await page.waitForSelector('a[href]', { timeout: 30000 }); // Increased timeout to 30 seconds

    // Extract and normalize links
    const links = await page.$$eval(
      'a[href]', // Select anchor tags with href
      (anchors, base) =>
        anchors
          .map((anchor) => {
            try {
              return new URL(anchor.href, base).href;
            } catch {
              return null; // Skip invalid URLs
            }
          })
          .filter(Boolean), // Remove null values
      baseURL
    );

    console.log('Extracted Links:', links);

    if (links.length === 0) {
      console.error('No links found on the page.');
      return;
    }

    for (const link of links) {
      try {
        console.log(`Navigating to: ${link}`);
        await page.goto(link, { waitUntil: 'domcontentloaded' });
        const pageTitle = await page.title();
        console.log(`Title of ${link}: ${pageTitle}`);
      } catch (error) {
        console.error(`Failed to navigate to ${link}:`, error.message);
      }
    }
  } catch (error) {
    console.error('An error occurred:', error.message);
  } finally {
    await browser.close();
  }
})();
