// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  // Maximum time one test can run for => timeout 
  /** Default Timeout are 
  * 1. Test Timeout - This means this is overall time, the test will execute(after that, the test will fail)
  * 2. Expect Timeout - This means this is assertion time, the test will wait for assertion untill this time(after that, the test will fail)
  */

  /**
  * There are few more timeout
  * 1. Action Timeout - all actions (click, check, fill) - all these will respect the action timeout config (if doesn't appear in 10sec, then it will fail)
  *   a. If we don't have the action timeout specified, then the Test Timeout will be considered for overall test execution timeout
  * 2. Navigation Timeout - 
  */
  // Maximum time one test can run for => timeout 
  timeout: 40 * 1000, //40secs
  expect: {
    timeout: 10 * 1000, //10secs
  },
  reporter: "html",
  use: {
    browserName: "chromium",
    headless: false,
    actionTimeout: 10 * 1000, //10secs
    navigationTimeout: 30 * 1000, //30secs
  },
});

