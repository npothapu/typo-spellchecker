const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const config = require('./config'); // Import the config module
const errors = [];

test.describe('Spell Check Test', () => {
  const typoJsPath = path.resolve('./typo.js');
  const affPath = path.resolve('./dictionaries/en_US/en_US.aff');
  const dicPath = path.resolve('./dictionaries/en_US/en_US.dic');
 // const customDicPath = path.resolve('./dictionaries-company-customized/teenvoice.dic'); // Path to custom dictionary
  const customDicPath = path.resolve('./dictionaries-company-customized/vml.dic'); // Path to custom dictionary

  let affContent, dicContent, customWords;

  test.beforeAll(() => {
    // Load dictionary files
    affContent = fs.readFileSync(affPath, 'utf8');
    dicContent = fs.readFileSync(dicPath, 'utf8');
    customWords = fs.readFileSync(customDicPath, 'utf8')
      .split('\n')
      .map(word => word.trim())
      .filter(word => word.length > 0); // Load custom dictionary and filter valid words
  });

  test('Check spelling on webpage', async ({ page, baseURL }) => {
    if (!baseURL) throw new Error('Base URL not configured.');
    await test.step('Navigate to webpage', async () => {
      await page.goto(baseURL);
      console.log(`Navigated to: ${baseURL}`);
    });

    await test.step('Inject Typo.js', async () => {
      const typoJsCode = fs.readFileSync(typoJsPath, 'utf8');
      await page.addScriptTag({ content: typoJsCode });
    });

    await test.step('Initialize Typo.js with custom dictionary', async () => {
      await page.evaluate(({ affContent, dicContent, customWords }) => {
        // Initialize Typo.js
        window.typo = new Typo('en_US', affContent, dicContent);

        // Add custom words to the dictionary
        customWords.forEach(word => {
          window.typo.dictionaryTable[word] = null; // Mark custom words as valid
        });
      }, { affContent, dicContent, customWords });
    });

    const pageText = await test.step('Extract page text', async () => {
      return page.evaluate(() => document.body.innerText);
    });

    const misspelledWords = await test.step('Check for misspelled words', async () => {
      return page.evaluate((text) => {
        // Normalize text: Remove punctuation and convert to lowercase
        const normalizeWord = (word) => word.replace(/[^\w'-]/g, '').toLowerCase();
        const words = text.split(/\s+/).map(normalizeWord).filter(Boolean); // Filter out empty strings
        return words.filter((word) => !window.typo.check(word));
      }, pageText);
    });

    // Attach results to Allure report
    await test.step('Generate Allure report', async () => {
      test.info().attach(`Misspelled Words:${config.baseUrl}`, {
        body: JSON.stringify(misspelledWords, null, 2),
        contentType: 'application/json',
      });
    });

    // Assert no spelling errors
    expect.soft(misspelledWords).toEqual([]);
  });
});
