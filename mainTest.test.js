const { test, expect } = require('@playwright/test');
const spellCheckTest = require('./spellCheckTest'); // Import the test logic

// Pass the test object to the function
spellCheckTest(test);
