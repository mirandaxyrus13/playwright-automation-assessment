import { defineConfig, devices } from '@playwright/test';
import { ENV } from './src/config/env';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,
  retries: 2,
  workers: 2,
  timeout: 100_000,
  expect: {
    timeout: 10_000,
  },
  reporter: [
    [ 'list' ],
    [ 'junit', { outputFile: 'test-results/junit.xml' } ],
    [ 'html' ]
  ],
  outputDir: 'test-results',
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10_000,
    navigationTimeout: 10_000,
    headless: false,
  },

  projects: [
    {
      name: 'chromium',
      testMatch: /ui\/.*\.(test|spec)\.ts$|ui\/.*-test\.ts$/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: ENV.UI_BASE_URL,
      },
    },
    {
      name: 'firefox',
      testMatch: /ui\/.*\.(test|spec)\.ts$|ui\/.*-test\.ts$/,
      use: {
        ...devices['Desktop Firefox'],
        baseURL: ENV.UI_BASE_URL,
      },
    },
    {
      name: 'webkit',
      testMatch: /ui\/.*\.(test|spec)\.ts$|ui\/.*-test\.ts$/,
      use: {
        ...devices['Desktop Safari'],
        baseURL: ENV.UI_BASE_URL,
      },
    },
    {
      name: 'api',
      testMatch: '**/api/**/*.test.ts',
      use: {
        baseURL: ENV.API_BASE_URL,
        extraHTTPHeaders: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    },
  ],
});