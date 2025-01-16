require('dotenv').config();
const { defineConfig } = require('@playwright/test');

const baseURL = process.env.BASE_URL || 'https://example.com';
if (!baseURL) throw new Error('BASE_URL not set.');

module.exports = defineConfig({
  testDir: './', 
  reporter: [['html'],['line'],['allure-playwright']],
  use: {
   baseURL: process.env.URL || 'https://www.wpp.com',
   customVariable: 'vml', //declare a custom dictionary
    },
    
});
