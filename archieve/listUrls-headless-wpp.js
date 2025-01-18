const { chromium } = require('playwright');

const baseURL = 'http://www.vml.com';

(async () => {
  const browser = await chromium.launch({ headless: true });  // Open in non-headless mode for debugging
  const context = await browser.newContext();
  await context.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
  );
  const page = await context.newPage();

  try {
    // Monitor network responses
    page.on('response', (response) => {
      console.log(`Response: ${response.status()} ${response.url()}`);
    });

    const response = await page.goto(baseURL);
    console.log(`Response Status: ${response.status()}`);

    if (!response.ok()) {
      console.error('Failed to load the page:', response.statusText());
      return;
    }

    // Wait for body content to load
    await page.waitForSelector('body', { timeout: 10000 }); // Wait for body content

    // Optionally, wait for a few seconds to allow JavaScript to render more content
    await page.waitForTimeout(5000);

    const content = await page.content();
    console.log('Page HTML Content:', content);

    // Extract links
    const links = await page.$$eval(
      'a[href]',
      (anchors, base) =>
        anchors
          .map((anchor) => {
            try {
              return new URL(anchor.href, base).href;
            } catch {
              return null;
            }
          })
          .filter(Boolean),
      baseURL
    );

    console.log('Extracted Links:', links);

    // If no links are found, show an error
    if (links.length === 0) {
      console.error('No links found on the page.');
    }

  } catch (error) {
    console.error('An error occurred:', error.message);
  } finally {
    await browser.close();
  }
})();
