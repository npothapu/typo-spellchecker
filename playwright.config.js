require('dotenv').config();
const { defineConfig } = require('@playwright/test');

const baseURL = process.env.BASE_URL || 'https://example.com';
if (!baseURL) throw new Error('BASE_URL not set.');

module.exports = defineConfig({
  reporter: [['html'],['line'],['allure-playwright']],
  use: {
   // baseURL: 'https://www.teenvoice.com/', --hard coded url
   baseURL: process.env.URL || 'https://www.google.com',
   customVariable: 'vml', //declare a custom dictionary
    },
    
});
