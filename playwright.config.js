require('dotenv').config();
import { defineConfig } from '@playwright/test';

const baseURL = process.env.BASE_URL || 'https://example.com';
if (!baseURL) throw new Error('BASE_URL not set.');

export default defineConfig({
  reporter: [['allure-playwright']],
  use: {
   // baseURL: 'https://www.teenvoice.com/', --hard coded url
   baseURL,
    },
    
});
