const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

module.exports = function (test) {
  test.describe('Spell Check for All Links', () => {
    const typoJsPath = path.resolve('./typo.js');
    const affPath = path.resolve('./dictionaries/en_US/en_US.aff');
    const dicPath = path.resolve('./dictionaries/en_US/en_US.dic');

    const url = process.env.URL;
    const dictionaryFilename = process.env.DIC_FILENAME || 'wpp';
    const customDicPath = path.resolve(`./dictionaries-company-customized/${dictionaryFilename}.dic`);

    let affContent, dicContent, customWords;

    test.beforeAll(() => {
      // Load dictionary files
      affContent = fs.readFileSync(affPath, 'utf8');
      dicContent = fs.readFileSync(dicPath, 'utf8');
      customWords = fs.readFileSync(customDicPath, 'utf8')
        .split('\n')
        .map((word) => word.trim())
        .filter((word) => word.length > 0);
    });

    test('Check spelling on all links of the webpage', async ({ page, baseURL }) => {
      if (!baseURL) throw new Error('Base URL not configured or is invalid.');

      // Navigate to the website
      await page.goto(baseURL);
      //await page.waitForLoadState('networkidle'); // Ensure the page is fully loaded

    // Extract and normalize all href attributes from anchor tags
  const links = await page.$$eval(
    'a',
    (anchors, base) => anchors.map(anchor => new URL(anchor.href, base).href),
    baseURL // Pass the base URL for relative link resolution
  );

  console.log('Extracted Links:', links);

      for (const link of links) {
        //console.log(`Checking link: ${link}`);

        try {
          console.log(`Navigating to: ${link}`);
          await page.goto(link);

          // Inject Typo.js for spell checking
          const typoJsCode = fs.readFileSync(typoJsPath, 'utf8');
          await page.addScriptTag({ content: typoJsCode });

          // Initialize Typo.js with the custom dictionary
          await page.evaluate(({ affContent, dicContent, customWords }) => {
            window.typo = new Typo('en_US', affContent, dicContent);
            customWords.forEach((word) => {
              window.typo.dictionaryTable[word] = null;
            });
          }, { affContent, dicContent, customWords });

          // Extract page text
          const pageText = await page.evaluate(() => document.body.innerText);

          // Check for misspelled words
          const misspelledWords = await page.evaluate((text) => {
            const normalizeWord = (word) => word.replace(/[^\w'-]/g, '').toLowerCase();
            const words = text.split(/\s+/).map(normalizeWord).filter(Boolean);
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

          // Assert no spelling errors
          expect.soft(misspelledWords).toEqual([]);
        } catch (error) {
          console.error(`Failed to navigate to ${link}:`, error.message);
        }
      }
    });
  });
};
