const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './',
  reporter: [['html'], ['line'], ['allure-playwright']],
  timeout: 30000,
  workers: process.env.CI ? 2 : 4, // Fewer workers in CI for stability
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
        baseURL: 'https://www.ford.com/',
        launchOptions: {
          args: ['--disable-http2'], // Force HTTP/1.1
        },
      },
    },
  ],
});
