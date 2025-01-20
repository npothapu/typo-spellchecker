const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

module.exports = function (test) {
  // Describe the test suite for spell check
  test.describe('Spell Check for All Links', () => {
    // Resolve paths for Typo.js and dictionary files
    const typoJsPath = path.resolve('./typo.js');
    const affPath = path.resolve('./dictionaries/en_US/en_US.aff');
    const dicPath = path.resolve('./dictionaries/en_US/en_US.dic');

    // Get URL and dictionary filename from environment variables or use default values
    const url = process.env.URL || 'https://www.vml.com'; // Default to 'https://www.vml.com' if URL is not set
    const dictionaryFilename = process.env.DIC_FILENAME || 'vml';
    const customDicPath = path.resolve(`./dictionaries-company-customized/${dictionaryFilename}.dic`);

    // Variables to hold dictionary contents
    let affContent, dicContent, customWords;

    // Before all tests, load the dictionary files
    test.beforeAll(() => {
      // Load the affix (.aff) and dictionary (.dic) files
      affContent = fs.readFileSync(affPath, 'utf8');
      dicContent = fs.readFileSync(dicPath, 'utf8');
      // Load custom dictionary words
      customWords = fs.readFileSync(customDicPath, 'utf8')
        .split('\n') // Split file by new lines
        .map((word) => word.trim()) // Trim any whitespace
        .filter((word) => word.length > 0); // Filter out empty strings
    });

    // Define the test for checking spelling on all links of the webpage
    test('Check spelling on all links of the webpage', async ({ page, baseURL }) => {
      // Ensure baseURL is valid
      if (!baseURL) throw new Error('Base URL not configured or is invalid.');

      try {
        // Navigate to the base URL with a timeout of 120 seconds
        await page.goto(baseURL, { timeout: 120000 });
        console.log(`Base URL: ${baseURL}`);

        // Extract all href attributes from anchor tags
        const links = await page.$$eval('a', (anchors, url) =>
          anchors
            .map((anchor) => anchor.href) // Map to extract href attribute
            .filter((href) => href.startsWith(url)) // Filter only URLs that start with the base URL
        , url);

        console.log('Extracted Links:', links);

        // Iterate over each link
        for (const link of links) {
          console.log(`Checking link: ${link}`);

          try {
            // Navigate to each link with a timeout of 60 seconds
            await page.goto(link, { timeout: 60000 });

            // Inject Typo.js script for spell checking
            const typoJsCode = fs.readFileSync(typoJsPath, 'utf8');
            await page.addScriptTag({ content: typoJsCode });

            // Initialize Typo.js with the dictionary contents
            await page.evaluate(({ affContent, dicContent, customWords }) => {
              window.typo = new Typo('en_US', affContent, dicContent);
              // Add custom words to the dictionary
              customWords.forEach((word) => {
                window.typo.dictionaryTable[word] = null;
              });
            }, { affContent, dicContent, customWords });

            // Extract the text content of the page
            const pageText = await page.evaluate(() => document.body.innerText);

            // Check for misspelled words using Typo.js
            const misspelledWords = await page.evaluate((text) => {
              // Normalize and split text into words
              const normalizeWord = (word) => word.replace(/[^\w'-]/g, '').toLowerCase();
              const words = text.split(/\s+/).map(normalizeWord).filter(Boolean);
              // Return words that are not in the dictionary
              return words.filter((word) => !window.typo.check(word));
            }, pageText);

            // Log and report misspelled words
            if (misspelledWords.length > 0) {
              console.error(`Misspelled words found on ${link}:`, misspelledWords);
              test.info().attach(`Misspelled Words: ${link}`, {
                body: JSON.stringify(misspelledWords, null, 2),
                contentType: 'application/json',
              });
            } else {
              console.log(`No spelling errors on ${link}`);
            }

            // Assert that there are no spelling errors
            expect.soft(misspelledWords).toEqual([]);
          } catch (error) {
            // Handle errors for individual links
            console.error(`Error checking link ${link}:`, error.message);
          }
        }
      } catch (error) {
        // Handle errors for the base URL navigation
        console.error(`Error navigating to base URL ${baseURL}:`, error.message);
      }
    });
  });
};
