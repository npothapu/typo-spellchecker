const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './',
  reporter: [['html'], ['line'], ['allure-playwright']],
  timeout: 30000,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1, //This sets retries to 2 in a CI environment (process.env.CI is truthy) and 1 otherwise.
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : 3, // Fewer workers in CI for stability: sets workers to 2 in CI, 3 otherwise.
  
  projects: [
    {
      name: 'Default',
      use: {
        baseURL: process.env.URL || 'https://www.vml.com',
      },
    },
    {
      name: 'Ford Tests',  //
      use: {
        baseURL: process.env.URL || 'https://www.ford.com/help/contact/',
        launchOptions: {
          args: ['--disable-http2'], // Force HTTP/1.1
        },
      },
    },
  ],
});
