const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  // Directory where the tests are located
  testDir: './',

  // Reporters for test results
  reporter: [
    ['html'], // Generates an HTML report
    ['line'], // Outputs a line report to the console
    ['allure-playwright'], // Generates an Allure report for detailed test results
  ],

  // Default timeout for each test in milliseconds
  timeout: 90000,

  // Retries configuration for tests
  retries: process.env.CI ? 1 : 0, // Retries set to 1 in a CI environment, 0 otherwise

  // Number of workers (parallel test runners)
  workers: process.env.CI ? 2 : 3, // Uses 2 workers in CI, 3 otherwise

  // Define projects to configure different test environments
  projects: [
    {
      name: 'Default', // Name of the project
      use: {
        // Base URL for the tests
        baseURL: process.env.URL || 'https://www.vml.com', // Default URL if not set in the environment variables

        // Headless mode configuration
        headless: true, // Run tests in headless mode (no browser UI)
      },
    },
    {
      name: 'Headless Tests', // Name of the project for headless tests
      use: {
        // Base URL for the tests
        baseURL: process.env.URL || 'https://www.wpp.com', // Default URL if not set in the environment variables

        // Headless mode configuration
        headless: false, // Run tests with browser UI (headless mode off)

        // Browser launch options
        launchOptions: {
          args: ['--disable-http2'], // Disable HTTP/2 to force HTTP/1.1 for the browser
        },
      },
    },
  ],
});
