require('dotenv').config();
import { defineConfig } from '@playwright/test';

const baseURL = process.env.BASE_URL || 'https://www.vml.com';
if (!baseURL) throw new Error('BASE_URL not set.');

export default defineConfig({
  reporter: [['allure-playwright']],
  use: {
    baseURL,
    },
});
