import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 30_000, // 30 seconds time out for testcases - if more than 30 seconds, test will fail
  globalTimeout: 10 * 60 * 1000, // 10 minutes timeout for the entire test suite run
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1, // Retry failed tests up to 2 times for CI runs, 1 for local runs
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://practicesoftwaretesting.com',

    testIdAttribute: 'data-test', // Use data-test-id attribute for selectors

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on', // Collect trace for failed tests
    actionTimeout: 0, // Disable action timeout
    ignoreHTTPSErrors: true, // Ignore HTTPS errors
    video: 'retain-on-failure', // Record videos
    screenshot:'only-on-failure', // Take screenshots only on failure
    headless: true, // Run tests in headless mode
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      dependencies: ["setup"],
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      dependencies: ["setup"],
      use: { ...devices['Desktop Firefox'] },
    },

    // {
    //   name: 'webkit',
    //   dependencies: ["setup"],
    //   use: { ...devices['Desktop Safari'] },
    // },
    
    {
      name: "setup", // This project is used to setup the test data, utilities etc.
      testMatch: /.*\.setup.\.ts/,
    }

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
